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
#include "VRIASettingsFile.h"


USING_TOOLBOX_NAMESPACE


const VString	kRIA_SettingsXMLRootElement( "settings");


static
void AppendBagArray (XBOX::VBagArray& inBagArray, XBOX::VBagArray& outBagArray)
{
	for (XBOX::VIndex index = 1; index <= inBagArray.GetCount(); ++index)
	{
		XBOX::VValueBag *valueBag = inBagArray.GetNth (index);
		if (valueBag != NULL)
			outBagArray.AddTail (valueBag);
	}
}


VRIASettingsFile::VRIASettingsFile(const VFilePath& inFilePath)
: fFilePath(inFilePath)
{
}


VRIASettingsFile::~VRIASettingsFile()
{
}


VRIASettingsFile* VRIASettingsFile::LoadSettingsFile( XBOX::VError& outError, const XBOX::VFilePath& inFilePath, XBOX::VFolder* inDTDsFolder)
{
	outError = VE_OK;
	
	VRIASettingsFile *file = new VRIASettingsFile( inFilePath);
	if (file != NULL)
	{
		outError = file->_LoadSettings( inDTDsFolder);
		if (outError != VE_OK)
			ReleaseRefCountable( &file);
	}
	else
	{
		outError = VE_MEMORY_FULL;
	}
	return file;
}


bool VRIASettingsFile::HasSettings( const RIASettingsID& inSettingsID) const
{
	const VValueBag *bag = RetainSettings( inSettingsID);
	bool res = (bag != NULL);
	QuickReleaseRefCountable( bag);
	return res;
}


const VValueBag* VRIASettingsFile::RetainSettings( const RIASettingsID& inSettingsID) const
{
	const VValueBag* bag = NULL;

	const VBagArray *bagArray = fRootBag.RetainElements( inSettingsID);
	if (bagArray != NULL && bagArray->GetCount() > 0)
	{
		bag = RetainRefCountable( bagArray->GetNth(1));		// take only the first element
	}
	QuickReleaseRefCountable( bagArray);

	return bag;
}


VValueBag* VRIASettingsFile::RetainSettings( const RIASettingsID& inSettingsID)
{
	VValueBag* bag = NULL;

	VBagArray *bagArray = fRootBag.RetainElements( inSettingsID);
	if (bagArray != NULL && bagArray->GetCount() > 0)
	{
		bag = RetainRefCountable( bagArray->GetNth(1));		// take only the first element
	}
	QuickReleaseRefCountable( bagArray);

	return bag;
}


const XBOX::VBagArray* VRIASettingsFile::RetainMultipleSettings (const RIASettingsID& inSettingsID) const
{
	return fRootBag.RetainElements (inSettingsID);
}


XBOX::VBagArray* VRIASettingsFile::RetainMultipleSettings (const RIASettingsID& inSettingsID)
{
	return fRootBag.RetainElements (inSettingsID);
}


bool VRIASettingsFile::HasSettings( const XBOX::VValueBag::StKey& inSettingsID) const
{
	const VValueBag *bag = RetainSettings( inSettingsID);
	bool res = (bag != NULL);
	ReleaseRefCountable( &bag);
	return res;
}


const VValueBag* VRIASettingsFile::RetainSettings( const XBOX::VValueBag::StKey& inSettingsID) const
{
	const VValueBag* bag = NULL;

	const VBagArray *bagArray = fRootBag.RetainElements( inSettingsID);
	if (bagArray != NULL && bagArray->GetCount() > 0)
	{
		bag = RetainRefCountable( bagArray->GetNth(1));		// take only the first element
	}
	ReleaseRefCountable( &bagArray);

	return bag;
}


VValueBag* VRIASettingsFile::RetainSettings( const XBOX::VValueBag::StKey& inSettingsID)
{
	VValueBag* bag = NULL;

	VBagArray *bagArray = fRootBag.RetainElements( inSettingsID);
	if (bagArray != NULL && bagArray->GetCount() > 0)
	{
		bag = RetainRefCountable( bagArray->GetNth(1));		// take only the first element
	}
	ReleaseRefCountable( &bagArray);

	return bag;
}


const XBOX::VBagArray* VRIASettingsFile::RetainMultipleSettings (const XBOX::VValueBag::StKey& inSettingsID) const
{
	return fRootBag.RetainElements (inSettingsID);
}


XBOX::VBagArray* VRIASettingsFile::RetainMultipleSettings (const XBOX::VValueBag::StKey& inSettingsID)
{
	return fRootBag.RetainElements (inSettingsID);
}


VError VRIASettingsFile::Save()
{
	// NOTE: vWriteBagToFileInXML dump the bag without indentation
	VError err = VE_OK;

	VFile file(fFilePath);
	if (file.Exists())
	{
		err = WriteBagToFileInXML( fRootBag, kRIA_SettingsXMLRootElement, &file, true);
	}
	else
	{
		err = VE_FILE_NOT_FOUND;
	}	

	return err;
}


VError VRIASettingsFile::_LoadSettings( VFolder* inDTDsFolder)
{
	VError err = VE_OK;

	fRootBag.Destroy();
	
	VFile file(fFilePath);
	if (file.Exists())
	{
		err = LoadBagFromXML( file, kRIA_SettingsXMLRootElement, fRootBag,  XML_ValidateNever, NULL, NULL);
	}
	else
	{
		err = VE_FILE_NOT_FOUND;
	}
	return err;
}




VRIASettingsCollection::VRIASettingsCollection()
{
}


VRIASettingsCollection::~VRIASettingsCollection()
{
	fSettingsFiles.clear();
}


VError VRIASettingsCollection::AppendAndLoadSettingsFile( const VFilePath& inFilePath, XBOX::VFolder* inDTDsFolder)
{
	VError err = VE_OK;

	if (fMutex.Lock())
	{
		VRIASettingsFile *file = VRIASettingsFile::LoadSettingsFile( err, inFilePath, inDTDsFolder);
		if (file != NULL && err == VE_OK)
		{
			fSettingsFiles.push_back( VRefPtr<VRIASettingsFile>(file));
		}
		QuickReleaseRefCountable( file);
		fMutex.Unlock();
	}
	return err;
}


bool VRIASettingsCollection::HasSettings( const RIASettingsID& inSettingsID) const
{
	bool res = false;

	if (fMutex.Lock())
	{
		for (std::vector< XBOX::VRefPtr<VRIASettingsFile> >::const_iterator iter = fSettingsFiles.begin() ; iter != fSettingsFiles.end() && !res ; ++iter)
		{
			if (!iter->IsNull())
				res = (*iter)->HasSettings( inSettingsID);
		}
		fMutex.Unlock();
	}
	return res;
}


const VValueBag* VRIASettingsCollection::RetainSettings( const RIASettingsID& inSettingsID) const
{
	const VValueBag *bag = NULL;

	if (fMutex.Lock())
	{
		for (std::vector< XBOX::VRefPtr<VRIASettingsFile> >::const_iterator iter = fSettingsFiles.begin() ; iter != fSettingsFiles.end() && bag == NULL ; ++iter)
		{
			if (!iter->IsNull())
				bag = (*iter)->RetainSettings( inSettingsID);
		}
		fMutex.Unlock();
	}
	return bag;
}


VValueBag* VRIASettingsCollection::RetainSettings( const RIASettingsID& inSettingsID)
{
	VValueBag *bag = NULL;

	if (fMutex.Lock())
	{
		for (std::vector< XBOX::VRefPtr<VRIASettingsFile> >::iterator iter = fSettingsFiles.begin() ; iter != fSettingsFiles.end() && bag == NULL ; ++iter)
		{
			if (!iter->IsNull())
				bag = (*iter)->RetainSettings( inSettingsID);
		}
		fMutex.Unlock();
	}
	return bag;
}


const XBOX::VBagArray* VRIASettingsCollection::RetainMultipleSettings (const RIASettingsID& inSettingsID) const
{
	VBagArray *result = NULL;

	if (fMutex.Lock())
	{
		for (std::vector<XBOX::VRefPtr<VRIASettingsFile> >::const_iterator iter = fSettingsFiles.begin() ; iter != fSettingsFiles.end(); ++iter)
		{
			if (!iter->IsNull())
			{
				VBagArray *bagArray = (*iter)->RetainMultipleSettings (inSettingsID);
				if (bagArray)
				{
					if (bagArray->GetCount() == 0)
						continue;

					if (result == NULL)
						result = new XBOX::VBagArray();

					if (result)
						AppendBagArray (*bagArray, *result);

					bagArray->Release();
				}
			}
		}
		fMutex.Unlock();
	}

	return const_cast<VBagArray *>(result);
}


XBOX::VBagArray* VRIASettingsCollection::RetainMultipleSettings (const RIASettingsID& inSettingsID)
{
	VBagArray *result = NULL;

	if (fMutex.Lock())
	{
		for (std::vector<XBOX::VRefPtr<VRIASettingsFile> >::const_iterator iter = fSettingsFiles.begin() ; iter != fSettingsFiles.end(); ++iter)
		{
			if (!iter->IsNull())
			{
				VBagArray *bagArray = (*iter)->RetainMultipleSettings (inSettingsID);
				if (bagArray)
				{
					if (bagArray->GetCount() == 0)
						continue;

					if (result == NULL)
						result = new XBOX::VBagArray();

					if (result)
						AppendBagArray (*bagArray, *result);

					bagArray->Release();
				}
			}
		}
		fMutex.Unlock();
	}

	return result;
}


const VRIASettingsFile*	VRIASettingsCollection::RetainSettingsFile( const RIASettingsID& inSettingsID) const
{
	const VRIASettingsFile *file = NULL;

	if (fMutex.Lock())
	{
		for (std::vector< XBOX::VRefPtr<VRIASettingsFile> >::const_iterator iter = fSettingsFiles.begin() ; iter != fSettingsFiles.end() && file == NULL ; ++iter)
		{
			if (!iter->IsNull() && (*iter)->HasSettings( inSettingsID))
			{
				file = *iter;
				file->Retain();
			}
		}
		fMutex.Unlock();
	}
	return file;
}


VRIASettingsFile* VRIASettingsCollection::RetainSettingsFile( const RIASettingsID& inSettingsID)
{
	VRIASettingsFile *file = NULL;

	if (fMutex.Lock())
	{
		for (std::vector< XBOX::VRefPtr<VRIASettingsFile> >::const_iterator iter = fSettingsFiles.begin() ; iter != fSettingsFiles.end() && file == NULL ; ++iter)
		{
			if (!iter->IsNull() && (*iter)->HasSettings( inSettingsID))
			{
				file = *iter;
				file->Retain();
			}
		}
		fMutex.Unlock();
	}
	return file;
}

bool VRIASettingsCollection::HasSettings( const XBOX::VValueBag::StKey& inSettingsID) const
{
	bool res = false;

	if (fMutex.Lock())
	{
		for (std::vector< XBOX::VRefPtr<VRIASettingsFile> >::const_iterator iter = fSettingsFiles.begin() ; iter != fSettingsFiles.end() && !res ; ++iter)
		{
			if (!iter->IsNull())
				res = (*iter)->HasSettings( inSettingsID);
		}
		fMutex.Unlock();
	}
	return res;
}


const XBOX::VValueBag* VRIASettingsCollection::RetainSettings( const XBOX::VValueBag::StKey& inSettingsID) const
{
	const VValueBag *bag = NULL;

	if (fMutex.Lock())
	{
		for (std::vector< XBOX::VRefPtr<VRIASettingsFile> >::const_iterator iter = fSettingsFiles.begin() ; iter != fSettingsFiles.end() && bag == NULL ; ++iter)
		{
			if (!iter->IsNull())
				bag = (*iter)->RetainSettings( inSettingsID);
		}
		fMutex.Unlock();
	}
	return bag;
}


XBOX::VValueBag* VRIASettingsCollection::RetainSettings( const XBOX::VValueBag::StKey& inSettingsID)
{
	VValueBag *bag = NULL;

	if (fMutex.Lock())
	{
		for (std::vector< XBOX::VRefPtr<VRIASettingsFile> >::iterator iter = fSettingsFiles.begin() ; iter != fSettingsFiles.end() && bag == NULL ; ++iter)
		{
			if (!iter->IsNull())
				bag = (*iter)->RetainSettings( inSettingsID);
		}
		fMutex.Unlock();
	}
	return bag;
}


const XBOX::VBagArray* VRIASettingsCollection::RetainMultipleSettings( const XBOX::VValueBag::StKey& inSettingsID) const
{
	VBagArray *result = NULL;

	if (fMutex.Lock())
	{
		for (std::vector<XBOX::VRefPtr<VRIASettingsFile> >::const_iterator iter = fSettingsFiles.begin() ; iter != fSettingsFiles.end(); ++iter)
		{
			if (!iter->IsNull())
			{
				VBagArray *bagArray = (*iter)->RetainMultipleSettings (inSettingsID);
				if (bagArray)
				{
					if (bagArray->GetCount() == 0)
						continue;

					if (result == NULL)
						result = new XBOX::VBagArray();

					if (result)
						AppendBagArray (*bagArray, *result);

					bagArray->Release();
				}
			}
		}
		fMutex.Unlock();
	}

	return const_cast<VBagArray *>(result);
}


XBOX::VBagArray* VRIASettingsCollection::RetainMultipleSettings( const XBOX::VValueBag::StKey& inSettingsID)
{
	VBagArray *result = NULL;

	if (fMutex.Lock())
	{
		for (std::vector<XBOX::VRefPtr<VRIASettingsFile> >::const_iterator iter = fSettingsFiles.begin() ; iter != fSettingsFiles.end(); ++iter)
		{
			if (!iter->IsNull())
			{
				VBagArray *bagArray = (*iter)->RetainMultipleSettings (inSettingsID);
				if (bagArray)
				{
					if (bagArray->GetCount() == 0)
						continue;

					if (result == NULL)
						result = new XBOX::VBagArray();

					if (result)
						AppendBagArray (*bagArray, *result);

					bagArray->Release();
				}
			}
		}
		fMutex.Unlock();
	}

	return result;
}


const VRIASettingsFile* VRIASettingsCollection::RetainSettingsFile( const XBOX::VValueBag::StKey& inSettingsID) const
{
	const VRIASettingsFile *file = NULL;

	if (fMutex.Lock())
	{
		for (std::vector< XBOX::VRefPtr<VRIASettingsFile> >::const_iterator iter = fSettingsFiles.begin() ; iter != fSettingsFiles.end() && file == NULL ; ++iter)
		{
			if (!iter->IsNull() && (*iter)->HasSettings( inSettingsID))
			{
				file = *iter;
				file->Retain();
			}
		}
		fMutex.Unlock();
	}
	return file;
}


VRIASettingsFile* VRIASettingsCollection::RetainSettingsFile( const XBOX::VValueBag::StKey& inSettingsID)
{
	VRIASettingsFile *file = NULL;

	if (fMutex.Lock())
	{
		for (std::vector< XBOX::VRefPtr<VRIASettingsFile> >::const_iterator iter = fSettingsFiles.begin() ; iter != fSettingsFiles.end() && file == NULL ; ++iter)
		{
			if (!iter->IsNull() && (*iter)->HasSettings( inSettingsID))
			{
				file = *iter;
				file->Retain();
			}
		}
		fMutex.Unlock();
	}
	return file;
}


void VRIASettingsCollection::Clear()
{
	fSettingsFiles.clear();
}


