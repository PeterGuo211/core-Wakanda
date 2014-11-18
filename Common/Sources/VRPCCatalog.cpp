/*
* This file is part of Wakanda software, licensed by 4D under
*  (i) the GNU General Public License version 3 (GNU GPL v3), or
*  (ii) the Affero General Public License version 3 (AGPL v3) or
*  (iii) a commercial license.
* This file remains the exclusive property of 4D and/or its licensors
* and is protected by national and international legislations.
* In any event, Licensee's compliance with the terms and conditions
* of the applicable license constitutes a prerequisite to any use of this file.
* Except as otherwise expressly stated in the applicable license,
* such license does not include any other license or rights on this file,
* 4D's and/or its licensors' trademarks and/or other proprietary rights.
* Consequently, no title, copyright or other proprietary rights
* other than those specified in the applicable license is granted.
*/
#include "headers4d.h"
#include "Language Syntax/LanguageSyntaxBagKeys.h"
#include "Language Syntax/CLanguageSyntax.h"
#include "VRPCCatalog.h"


USING_TOOLBOX_NAMESPACE



namespace RPCSchemaValues
{
	const VString	kMethod( L"method");
};


namespace RPCSchemaBagKeys
{
	CREATE_BAGKEY_NO_DEFAULT( description, XBOX::VString);
	CREATE_BAGKEY_NO_DEFAULT( type, XBOX::VString);
	CREATE_BAGKEY_NO_DEFAULT( returns, XBOX::VString);
	CREATE_BAGKEY( params);
	CREATE_BAGKEY_NO_DEFAULT( name, XBOX::VString);
	CREATE_BAGKEY_NO_DEFAULT_SCALAR( required, XBOX::VBoolean, bool);
};



VRPCSchema::VRPCSchema() : fBag(NULL)
{
}


VRPCSchema::VRPCSchema( VValueBag* inBag)
{
	fBag = RetainRefCountable( inBag);
}


VRPCSchema::~VRPCSchema()
{
	QuickReleaseRefCountable( fBag);
}


VRPCSchema* VRPCSchema::CreateEmptySchema()
{
	VRPCSchema *schema = NULL;

	VValueBag *bag = new VValueBag();
	if (bag != NULL)
	{
		bag->SetAttribute( RPCSchemaBagKeys::type, RPCSchemaValues::kMethod);
		schema = new VRPCSchema( bag);
		QuickReleaseRefCountable( bag);
	}
	return schema;
}


VRPCSchema* VRPCSchema::CreateFromBag( VValueBag* inBag)
{
	return new VRPCSchema( inBag);
}


VRPCSchema* VRPCSchema::CreateFromScriptDocCommentFields( std::vector< IScriptDocCommentField*> inFields, bool& outPublished)
{
	outPublished = true;
	VRPCSchema *schema = CreateEmptySchema();

	if (schema != NULL && schema->fBag != NULL)
	{
		for (std::vector< IScriptDocCommentField*>::iterator fieldsIter = inFields.begin() ; fieldsIter != inFields.end() ; ++fieldsIter)
		{
			VValueBag *contents = (*fieldsIter)->GetContents();
			if (contents != NULL)
			{
				switch ((*fieldsIter)->GetKind())
				{
					case IScriptDocCommentField::kComment:
					{
						VString desc;

						if (contents->GetString( ScriptDocKeys::Comment, desc))
							RPCSchemaBagKeys::description.Set( schema->fBag, desc);

						break;
					}

					case IScriptDocCommentField::kParam:
					{
						VValueBag *paramBag = new VValueBag();
						if (paramBag != NULL)
						{
							VString str;

							if (contents->GetString( ScriptDocKeys::Name, str))
								RPCSchemaBagKeys::name.Set( paramBag, str);
							if (contents->GetString( ScriptDocKeys::Types, str))
								RPCSchemaBagKeys::type.Set( paramBag, str);
							if (contents->GetString( ScriptDocKeys::Comment, str))
								RPCSchemaBagKeys::description.Set( paramBag, str);

							bool optional = false;
							if  (contents->GetBool( ScriptDocKeys::IsOptional, optional))
								RPCSchemaBagKeys::required.Set( paramBag, !optional);

							schema->fBag->AddElement( RPCSchemaBagKeys::params, paramBag);

							paramBag->Release();
						}
						break;
					}

					case IScriptDocCommentField::kReturn:
					{
						VString str;

						if (contents->GetString( ScriptDocKeys::Types, str))
							RPCSchemaBagKeys::type.Set( schema->fBag, str);
						if (contents->GetString( ScriptDocKeys::Comment, str))
							RPCSchemaBagKeys::description.Set( schema->fBag, str);

						break;
					}

					case IScriptDocCommentField::kType:
					{
						VString types;

						if (contents->GetString( ScriptDocKeys::Types, types))
							RPCSchemaBagKeys::type.Set( schema->fBag, types);

						break;
					}

					case IScriptDocCommentField::kUnknown:
					{
						VString tag;
						if (contents->GetString( ScriptDocKeys::Tag, tag))
						{
							if (tag.EqualToString( L"noRpc", true))
							{
								VString data;
								if (contents->GetString( ScriptDocKeys::Data, data))
								{
									data.RemoveWhiteSpaces();
									if (data.EqualToString( L"true", true) || data.BeginsWith( L"true ", true))
										outPublished = false;
								}
							}
						}
						break;
					}

					default:
						break;
				}
				contents->Release();
			}
		}
	}
	return schema;
}


VError VRPCSchema::GetJSONString( VString& outString) const
{
	VError err = VE_OK;

	outString.Clear();
	if (fBag != NULL)
	{
		err = fBag->GetJSONString( outString, JSON_Default);
	}
	return err;
}



// ----------------------------------------------------------------------------



VRPCSchemaIdentifier::VRPCSchemaIdentifier()
{
}


VRPCSchemaIdentifier::VRPCSchemaIdentifier( const XBOX::VString& inPath)
{
	VIndex found = inPath.FindUniChar( L'/', inPath.GetLength(), true);
	if (found > 0)
	{
		inPath.GetSubString( 1, found - 1, fModulePath);
		inPath.GetSubString( found + 1, inPath.GetLength() - found, fMethodName);
	}
	else
	{
		fMethodName.FromString( inPath);
	}
}


VRPCSchemaIdentifier::VRPCSchemaIdentifier( const XBOX::VString& inMethodName, const XBOX::VString& inModulePath)
: fModulePath( inModulePath), fMethodName( inMethodName)
{
}


VRPCSchemaIdentifier::VRPCSchemaIdentifier( const VRPCSchemaIdentifier& inSource)
: fMethodName( inSource.fMethodName), fModulePath( inSource.fModulePath)
{
}


VRPCSchemaIdentifier::~VRPCSchemaIdentifier()
{
}


XBOX::VString VRPCSchemaIdentifier::GetMethodName() const
{
	return fMethodName;
}


XBOX::VString VRPCSchemaIdentifier::GetModulePath() const
{
	return fModulePath;
}


bool VRPCSchemaIdentifier::IsValid() const
{
	return !fMethodName.IsEmpty() && !fModulePath.IsEmpty();
}


VRPCSchemaIdentifier& VRPCSchemaIdentifier::operator=( const VRPCSchemaIdentifier& inSource)
{
	fMethodName = inSource.fMethodName;
	fModulePath = inSource.fModulePath;
	return *this;
}


bool VRPCSchemaIdentifier::operator==( const VRPCSchemaIdentifier& inSource) const
{
	return (fMethodName == inSource.fMethodName) && (fModulePath == inSource.fModulePath);
}


bool VRPCSchemaIdentifier::operator<( const VRPCSchemaIdentifier& inSource) const
{
	if (fMethodName < inSource.fMethodName)
		return true;

	if (fMethodName > inSource.fMethodName)
		return false;

	return (fModulePath < inSource.fModulePath);
}



// ----------------------------------------------------------------------------



VRPCCatalogFile::VRPCCatalogFile( const VFile* inFile)
: fFileStamp(1), fSchemasStamp(0)
{
	fFile = RetainRefCountable( inFile);
}


VRPCCatalogFile::~VRPCCatalogFile()
{
	ReleaseRefCountable( &fFile);
}


VError VRPCCatalogFile::Update( bool inForceUpdate, bool *outUpdateRequired)
{
	VError err = VE_OK;

	bool updateRequired = (fSchemasStamp == 0) || (fSchemasStamp != fFileStamp);
	if (inForceUpdate || updateRequired)
	{
		fSchemas.clear();

		if (fFile != NULL && fFile->Exists() && fFile->ConformsTo( RIAFileKind::kRPCCatalogFileKind))
		{
			VFileStream stream( fFile);
			
			err = stream.OpenReading();
			if (err == VE_OK)
			{
				VString jsonString;
				err = stream.GetText( jsonString);
				if (err == VE_OK)
				{
					VValueBag bag;
					err = bag.FromJSONString( jsonString);
					if (err == VE_OK)
					{
						VIndex count = bag.GetElementNamesCount();
						for (VIndex pos = 1 ; pos <= count ; ++pos)
						{
							VString methodName;
							VBagArray *bagArray = bag.GetNthElementName( pos, &methodName);
							if (bagArray != NULL)
							{
								bool found = false;
								for (VIndex elementPos = 1 ; elementPos <= bagArray->GetCount() && !found ; ++elementPos)
								{
									VValueBag *schemaBag = bagArray->GetNth( elementPos);
									if (schemaBag != NULL)
									{
										VString type;
										if (schemaBag->GetString( RPCSchemaBagKeys::type, type) && type.EqualToString( RPCSchemaValues::kMethod, false))
										{
											found = true;

											VRPCSchema *schema = VRPCSchema::CreateFromBag( schemaBag);
											fSchemas[ VRPCSchemaIdentifier( methodName, L"") ] = schema;
											QuickReleaseRefCountable( schema);
										}
									}
								}
							}
						}
					}
				}
			}
			stream.CloseReading();
		}
		else
		{
			err = VE_FILE_BAD_KIND;
		}

		if (err == VE_OK)
			fSchemasStamp = fFileStamp;
	}

	if (outUpdateRequired != NULL)
		*outUpdateRequired = updateRequired;

	return err;
}


const MapOfRPCSchema& VRPCCatalogFile::GetSchemas() const
{
	return fSchemas;
}


const VFile* VRPCCatalogFile::GetFile() const
{
	return fFile;
}


void VRPCCatalogFile::Touch()
{
	++fFileStamp;
}



// ----------------------------------------------------------------------------



VRPCModule::VRPCModule()
{
}


VRPCModule::VRPCModule( const XBOX::VString& inPath)
: fPath(inPath)
{
}


VRPCModule::~VRPCModule()
{
}


XBOX::VError VRPCModule::Load( XBOX::VJSContext& inContext)
{
	VError err = VE_OK;

	fSchemas.clear();
	
	VJSException	exception;
	VJSObject object( inContext.GetGlobalObject());

	VJSValue pathParam( inContext);
	pathParam.SetString( fPath);
	std::vector<VJSValue> params;
	params.push_back( pathParam);

	VJSValue module( inContext);
	if (object.CallMemberFunction( L"require", &params, &module, exception))
	{
		std::vector<VString> propertNames;
		VJSObject moduleObject = module.GetObject( &exception );

		if (exception.IsEmpty())
		{
			moduleObject.GetPropertyNames( propertNames);

			for (std::vector<VString>::iterator propIter = propertNames.begin() ; (propIter != propertNames.end()) && (err == VE_OK) ; ++propIter)
			{
				VJSValue prop = moduleObject.GetProperty( *propIter, exception);
				if (exception.IsEmpty())
				{
					if (prop.IsFunction())
					{
						VRPCSchema *schema = VRPCSchema::CreateEmptySchema();
						if (schema != NULL)
						{
							fSchemas[ VRPCSchemaIdentifier( *propIter, fPath) ] = schema;
							ReleaseRefCountable( &schema);
						}
						else
						{
							err = vThrowError( VE_MEMORY_FULL);
						}
					}
				}
				else
				{
					err = VE_RIA_JS_CALL_TO_REQUIRE_FAILED;
				}
			}
		}
		else
		{
			err = VE_RIA_JS_CALL_TO_REQUIRE_FAILED;
		}
	}
	else
	{
		err = VE_RIA_JS_CALL_TO_REQUIRE_FAILED;
	}

	if (err == VE_RIA_JS_CALL_TO_REQUIRE_FAILED)
	{
		exception.ThrowVErrorForException( inContext );
		err = vThrowError( VE_RIA_JS_CALL_TO_REQUIRE_FAILED);
	}

	return err;
}


XBOX::VError VRPCModule::AppendMethod( const XBOX::VString& inName)
{
	VError err = VE_OK;

	if (!inName.IsEmpty())
	{
		VRPCSchema *schema = VRPCSchema::CreateEmptySchema();
		if (schema != NULL)
		{
			fSchemas[ VRPCSchemaIdentifier( inName, fPath) ] = schema;
			ReleaseRefCountable( &schema);
		}
		else
		{
			err = vThrowError( VE_MEMORY_FULL);
		}
	}
	else
	{
		err = VE_INVALID_PARAMETER;
	}

	return err;
}


const MapOfRPCSchema& VRPCModule::GetSchemas() const
{
	return fSchemas;
}



// ----------------------------------------------------------------------------



class VFileComparisonPredicate : public VObject
{
public:
	VFileComparisonPredicate( const VFile* inFile) { fFile = inFile; }

	bool operator() ( const VFile *inFile)
	{
		if (fFile == NULL || inFile == NULL)
			return false;
		else
			return fFile->IsSameFile( inFile);
	}

private:
	const VFile	*fFile;
};



class VRPCCatalogFileComparisonPredicate : public VObject
{
public:
	VRPCCatalogFileComparisonPredicate( const VRPCCatalogFile* inFile) { fFile = inFile; }

	bool operator() ( const VRPCCatalogFile *inFile)
	{
		if (fFile == NULL || fFile->GetFile() == NULL || inFile == NULL || inFile->GetFile() == NULL)
			return false;
		else
			return fFile->GetFile()->IsSameFile( inFile->GetFile());
	}

private:
	const VRPCCatalogFile	*fFile;
};



VRPCCatalog::VRPCCatalog()
{
}


VRPCCatalog::~VRPCCatalog()
{
}


VError VRPCCatalog::SetCatalogFilesList( const VectorOfVFile& inFiles)
{
	VError err = VE_OK;

	if (fMutex.Lock())
	{
		VectorOfRPCCatalogFile newCatalogFiles;

	#if VERSIONDEBUG
		sLONG updateCount = 0;
	#endif

		std::vector<VFile*> files;
		for (VectorOfVFile::const_iterator iter = inFiles.begin() ; iter != inFiles.end() ; ++iter)
			files.push_back( iter->Get());

		for (VectorOfRPCCatalogFile_iter iter = fCatalogFiles.begin() ; iter != fCatalogFiles.end() ; ++iter)
		{
			VRPCCatalogFile *catalogFile = iter->Get();
			if (testAssert(catalogFile != NULL))
			{
				// Check if this file is still a catalog file
				std::vector<VFile*>::iterator found = std::find_if( files.begin(), files.end(), VFileComparisonPredicate( catalogFile->GetFile()));
				if (found != files.end())
				{
					// Update the catalog file
					bool updateRequired = false;
					err = catalogFile->Update( false, &updateRequired);
					if (err == VE_OK)
						newCatalogFiles.push_back( catalogFile);
					files.erase( found);

				#if VERSIONDEBUG
					if (updateRequired)
						++updateCount;
				#endif
				}
			}
		}

		// Append the new catalog files
		for (std::vector<VFile*>::iterator iter = files.begin() ; iter != files.end() ; ++iter)
		{
			VRPCCatalogFile *catalogFile = new VRPCCatalogFile( *iter);
			if (catalogFile != NULL)
			{
				bool updateRequired = false;
				err = catalogFile->Update( false, &updateRequired);
				if (err == VE_OK)
					newCatalogFiles.push_back( catalogFile);
				catalogFile->Release();

			#if VERSIONDEBUG
				if (updateRequired)
					++updateCount;
			#endif
			}
			else
			{
				err = VE_MEMORY_FULL;
			}
		}

		fCatalogFiles.clear();
		for (VectorOfRPCCatalogFile_iter iter = newCatalogFiles.begin() ; iter != newCatalogFiles.end() ; ++iter)
			fCatalogFiles.push_back( iter->Get());

	#if VERSIONDEBUG
		if (updateCount > 0)
		{
			VString msg;
			msg.AppendLong( updateCount);
			msg.AppendCString( " catalog files have been updated in the RPC Catalog\r\n");
			DebugMsg( msg);
		}
	#endif

		fMutex.Unlock();
	}
	return VE_OK;
}


XBOX::VError VRPCCatalog::LoadModule( const XBOX::VString& inPath, XBOX::VJSContext& inContext)
{
	VError err = VE_OK;

	if (fMutex.Lock())
	{
		VRPCModule *module = new VRPCModule( inPath);
		if (module != NULL)
		{
			err = module->Load( inContext);
			if (err == VE_OK)
				fModules[inPath] = module;
			ReleaseRefCountable( &module);
		}
		else
		{
			err = vThrowError( VE_MEMORY_FULL);
		}

		fMutex.Unlock();
	}

	return err;
}


XBOX::VError VRPCCatalog::AppendModuleMethod( const XBOX::VString& inPath)
{
	VError err = VE_OK;

	if (fMutex.Lock())
	{
		VRPCSchemaIdentifier identifier( inPath);

		if (identifier.IsValid())
		{
			MapOfRPCModule_iter found = fModules.find( identifier.GetModulePath());
			if (found != fModules.end())
			{
				err = found->second->AppendMethod( identifier.GetMethodName());
			}
			else
			{
				VRPCModule *module = new VRPCModule( identifier.GetModulePath());
				if (module != NULL)
				{
					err = module->AppendMethod( identifier.GetMethodName());
					if (err == VE_OK)
						fModules[identifier.GetModulePath()] = module;
					ReleaseRefCountable( &module);
				}
				else
				{
					err = vThrowError( VE_MEMORY_FULL);
				}
			}
		}
		else
		{
			err = vThrowError( VE_RIA_RPC_INVALID_METHOD_PATH);
		}

		fMutex.Unlock();
	}

	return err;
}


XBOX::VError VRPCCatalog::RetainSchemasByModule( const XBOX::VString& inModulePath, MapOfRPCSchema& outSchemas) const
{
	VError err = VE_OK;

	if (fMutex.Lock())
	{
		MapOfRPCModule_citer found = fModules.find( inModulePath);
		if (found != fModules.end())
		{
			outSchemas.insert( found->second->GetSchemas().begin(), found->second->GetSchemas().end());
		}
		else
		{
			err = vThrowError( VE_RIA_RPC_MODULE_NOT_FOUND);
		}

		fMutex.Unlock();
	}

	return err;
}


void VRPCCatalog::Clear()
{
	if (fMutex.Lock())
	{
		fCatalogFiles.clear();
		fMutex.Unlock();
	}
}


VRPCCatalogFile* VRPCCatalog::RetainCatalogFile( const XBOX::VFile* inFile) const
{
	VRPCCatalogFile *result = NULL;

	if (fMutex.Lock())
	{
		result = RetainRefCountable( _GetCatalogFileByFile( inFile));
		fMutex.Unlock();
	}
	return result;
}


void VRPCCatalog::BuildCatalog( const VString& inMethodName, const VRPCSchema& inSchema, VString& outCatalog)
{
	VJSONSingleObjectWriter writer;
	VString jsonSchema;
	inSchema.GetJSONString( jsonSchema);
	writer.AddMember( inMethodName, jsonSchema, JSON_AlreadyEscapedChars);
	writer.GetObject( outCatalog);
}


void VRPCCatalog::BuildCatalog( const MapOfRPCSchema& inSchemas, VString& outCatalog)
{
	VJSONSingleObjectWriter writer;
	VString name, jsonSchema;

	for (MapOfRPCSchema::const_iterator iter = inSchemas.begin() ; iter != inSchemas.end() ; ++iter)
	{
		VRPCSchema *schema = iter->second.Get();
		if (schema != NULL)
		{
			schema->GetJSONString( jsonSchema);
			writer.AddMember( iter->first.GetMethodName(), jsonSchema, JSON_AlreadyEscapedChars);
		}
	}

	writer.GetObject( outCatalog);
}


VRPCSchema* VRPCCatalog::_GetSchemaFromCatalogFile( const VRPCSchemaIdentifier& inIdentifier) const
{
	VRPCSchema *schema = NULL;

	for (VectorOfRPCCatalogFile_citer itfile = fCatalogFiles.begin() ; itfile != fCatalogFiles.end() && schema == NULL ; ++itfile)
	{
		VRPCCatalogFile *file = itfile->Get();
		if (testAssert(file != NULL))
		{
			MapOfRPCSchema_citer found = file->GetSchemas().find( inIdentifier);
			if (found != file->GetSchemas().end())
				schema = found->second.Get();
		}
	}
	return schema;
}


VRPCCatalogFile* VRPCCatalog::_GetCatalogFileByFile( const VFile* inFile) const
{
	VRPCCatalogFile *result = NULL;
	
	VRPCCatalogFile file( inFile);
	VectorOfRPCCatalogFile_citer found = std::find_if( fCatalogFiles.begin(), fCatalogFiles.end(), VRPCCatalogFileComparisonPredicate( &file));
	if (found != fCatalogFiles.end())
	{
		result = found->Get();
		xbox_assert(result != NULL);
	}
	return result;
}


void VRPCCatalog::_OverrideSchemasFromCatalogFiles( MapOfRPCSchema& inSchemas) const
{
	for (MapOfRPCSchema_iter itschema = inSchemas.begin() ; itschema != inSchemas.end() ; ++itschema)
	{
		if (!itschema->second.IsNull())
		{
			VRPCSchema *schema = _GetSchemaFromCatalogFile( itschema->first);
			if (schema != NULL)
			{
				itschema->second = schema;
			}
		}
	}
}
