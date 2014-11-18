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
#ifndef __VRPCCatalog__
#define __VRPCCatalog__


class IScriptDocCommentField;
class CLanguageSyntaxComponent;
class ISymbolTable;

namespace Symbols
{
	class ISymbol;
};



/*
	The JSON schema string looks like to:

		  "{"description":"Divide one number by another",
			"type":"method",
			"returns":"number",
			"params":[{"type":"number","name":"dividend","required":true},
					  {"type":"number","name":"divisor","required":true}]}"
*/


namespace RPCSchemaValues
{
	extern const XBOX::VString	kMethod;
};


namespace RPCSchemaBagKeys
{
	EXTERN_BAGKEY_NO_DEFAULT( description, XBOX::VString);
	EXTERN_BAGKEY_NO_DEFAULT( type, XBOX::VString);
	EXTERN_BAGKEY_NO_DEFAULT( returns, XBOX::VString);
	EXTERN_BAGKEY( params);
	EXTERN_BAGKEY_NO_DEFAULT( name, XBOX::VString);
	EXTERN_BAGKEY_NO_DEFAULT_SCALAR( required, XBOX::VBoolean, bool);
};


class VRPCSchema : public XBOX::VObject, public XBOX::IRefCountable
{
public:
	virtual ~VRPCSchema();

	static	VRPCSchema*			CreateEmptySchema();
			/** @brief	The bag is retained.
						The caller is responsible for the validity of the bag. */
	static	VRPCSchema*			CreateFromBag( XBOX::VValueBag* inBag);
			/** @brief	The method may be published for rpc or not according to the script doc fields. */
	static	VRPCSchema*			CreateFromScriptDocCommentFields( std::vector< IScriptDocCommentField*> inFields, bool& outPublished);

			XBOX::VError		GetJSONString( XBOX::VString& outString) const;

private:
			VRPCSchema();
			VRPCSchema( XBOX::VValueBag* inBag);

			XBOX::VValueBag		*fBag;
};



// ----------------------------------------------------------------------------


/*	The RPC schema identifier is typically the RPC method path which contains a module path and a method name.
	Examples of method path:	- "moduleName/methodName" if the parent module folder is the modules folder root
								- "aFolder/moduleName/methodName" if the module is in the folder "aFolder" of the modules folder
	Examples of module path:	- "moduleName"
								- "aFolder/moduleName"
*/

class VRPCSchemaIdentifier : public XBOX::VObject
{
public:
			VRPCSchemaIdentifier();
			VRPCSchemaIdentifier( const XBOX::VString& inPath);
			VRPCSchemaIdentifier( const XBOX::VString& inMethodName, const XBOX::VString& inModulePath);
			VRPCSchemaIdentifier( const VRPCSchemaIdentifier& inSource);
	virtual	~VRPCSchemaIdentifier();

			XBOX::VString			GetMethodName() const;
			XBOX::VString			GetModulePath() const;

			bool					IsValid() const;

			VRPCSchemaIdentifier&	operator=( const VRPCSchemaIdentifier& inSource);
			bool					operator==( const VRPCSchemaIdentifier& inSource) const;
			bool					operator<( const VRPCSchemaIdentifier& inSource) const;

private:
			XBOX::VString			fModulePath;
			XBOX::VString			fMethodName;
};



typedef std::map< VRPCSchemaIdentifier, XBOX::VRefPtr<VRPCSchema> >					MapOfRPCSchema;
typedef std::map< VRPCSchemaIdentifier, XBOX::VRefPtr<VRPCSchema> >::iterator		MapOfRPCSchema_iter;
typedef std::map< VRPCSchemaIdentifier, XBOX::VRefPtr<VRPCSchema> >::const_iterator	MapOfRPCSchema_citer;



// ----------------------------------------------------------------------------



class VRPCCatalogFile : public XBOX::VObject, public XBOX::IRefCountable
{
public:
			/** @brief	The file is retained */
			VRPCCatalogFile( const XBOX::VFile* inFile);
	virtual	~VRPCCatalogFile();

			/** @brief	Parse the JSON schema catalog file and extract the RPC schema for each method */
			XBOX::VError				Update( bool inForceUpdate, bool *outUpdateRequired);

			const MapOfRPCSchema&		GetSchemas() const;

			const XBOX::VFile*			GetFile() const;

			/** @brief	Call Touch() when the file which contains the JSON schema catalog has been modified */
			void						Touch();

private:
			const XBOX::VFile			*fFile;
			uLONG						fFileStamp;
			
			MapOfRPCSchema				fSchemas;
			uLONG						fSchemasStamp;
};



// ----------------------------------------------------------------------------



class VRPCModule : public XBOX::VObject, public XBOX::IRefCountable
{
public:
			VRPCModule();
			VRPCModule( const XBOX::VString& inPath);
	virtual	~VRPCModule();

			XBOX::VError				Load( XBOX::VJSContext& inContext);

			XBOX::VError				AppendMethod( const XBOX::VString& inName);

			const MapOfRPCSchema&		GetSchemas() const;

private:
			XBOX::VString				fPath;
			MapOfRPCSchema				fSchemas;
};



// ----------------------------------------------------------------------------



typedef std::vector< XBOX::VRefPtr<VRPCCatalogFile> >					VectorOfRPCCatalogFile;
typedef std::vector< XBOX::VRefPtr<VRPCCatalogFile> >::iterator			VectorOfRPCCatalogFile_iter;
typedef std::vector< XBOX::VRefPtr<VRPCCatalogFile> >::const_iterator	VectorOfRPCCatalogFile_citer;

typedef std::map< XBOX::VString, XBOX::VRefPtr<VRPCModule> >					MapOfRPCModule;
typedef std::map< XBOX::VString, XBOX::VRefPtr<VRPCModule> >::iterator			MapOfRPCModule_iter;
typedef std::map< XBOX::VString, XBOX::VRefPtr<VRPCModule> >::const_iterator	MapOfRPCModule_citer;



class VRPCCatalog : public XBOX::VObject, public XBOX::IRefCountable
{
public:
			VRPCCatalog();
	virtual ~VRPCCatalog();

			// Catalog building methods

			/** @brief	Update the list of catalog files of the RPC catalog: some catalog files may be added, removed or updated */
			XBOX::VError				SetCatalogFilesList( const XBOX::VectorOfVFile& inFiles);

			// RPC Modules support
			
			/** @brief	Create a schema for each functions of the module */
			XBOX::VError				LoadModule( const XBOX::VString& inPath, XBOX::VJSContext& inContext);

			XBOX::VError				AppendModuleMethod( const XBOX::VString& inPath);

			XBOX::VError				RetainSchemasByModule( const XBOX::VString& inModulePath, MapOfRPCSchema& outSchemas) const;

			// RPC Schemas high level accessors

			/** @brief	Clear the list of catalog files and the list of methods files */
			void						Clear();

			// Methods and catalog files low level accessors
			VRPCCatalogFile*			RetainCatalogFile( const XBOX::VFile* inFile) const;

			// Utilities

			/** @brief	Returns a JSON formatted string which contains the RPC methods catalog */
	static	void						BuildCatalog( const XBOX::VString& inMethodName, const VRPCSchema& inSchema, XBOX::VString& outCatalog);
	static	void						BuildCatalog( const MapOfRPCSchema& inSchemas, XBOX::VString& outCatalog);

private:
			/** @brief	Returns the schema of the named method which is defined in a catalog file */
			VRPCSchema*					_GetSchemaFromCatalogFile( const VRPCSchemaIdentifier& inIdentifier) const;

			VRPCCatalogFile*			_GetCatalogFileByFile( const XBOX::VFile* inFile) const;

			/** @brief	Overrride the schemas list with the content of catalog files */
			void						_OverrideSchemasFromCatalogFiles( MapOfRPCSchema& inSchemas) const;

			VectorOfRPCCatalogFile		fCatalogFiles;
			MapOfRPCModule				fModules;
	mutable	XBOX::VCriticalSection		fMutex;
};


#endif