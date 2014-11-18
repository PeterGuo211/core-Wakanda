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
#ifndef __Settings_ria__
#define __Settings_ria__




typedef XBOX::VString RIASettingsID;

extern const XBOX::VString	kRIA_SettingsXMLRootElement;



/** @brief	Each settings file may contain one or more kind of settings, such as project settings or http settings.
			Each kind of settings has a identifier of type RIASettingsID. */

class VRIASettingsFile : public XBOX::VObject, public XBOX::IRefCountable
{
public:
	static	VRIASettingsFile*		LoadSettingsFile( XBOX::VError& outError, const XBOX::VFilePath& inFilePath, XBOX::VFolder* inDTDsFolder = NULL);
						
			bool					HasSettings( const RIASettingsID& inSettingsID) const;
			/** @brief	RetainSettings() method may return NULL is the file does not contain the settings. */
			const XBOX::VValueBag*	RetainSettings( const RIASettingsID& inSettingsID) const;
			XBOX::VValueBag*		RetainSettings( const RIASettingsID& inSettingsID);
			const XBOX::VBagArray*	RetainMultipleSettings (const RIASettingsID& inSettingsID) const;
			XBOX::VBagArray*		RetainMultipleSettings (const RIASettingsID& inSettingsID);

			bool					HasSettings( const XBOX::VValueBag::StKey& inSettingsID) const;
			/** @brief	RetainSettings() method may return NULL is the file does not contain the settings. */
			const XBOX::VValueBag*	RetainSettings( const XBOX::VValueBag::StKey& inSettingsID) const;
			XBOX::VValueBag*		RetainSettings( const XBOX::VValueBag::StKey& inSettingsID);
			const XBOX::VBagArray*	RetainMultipleSettings( const XBOX::VValueBag::StKey& inSettingsID) const;
			XBOX::VBagArray*		RetainMultipleSettings( const XBOX::VValueBag::StKey& inSettingsID);

			void					GetFilePath( XBOX::VFilePath& outPath) const { outPath = fFilePath; }
			XBOX::VError			Save();

private:
			VRIASettingsFile() {;}
			VRIASettingsFile( const XBOX::VFilePath& inFilePath);
			VRIASettingsFile( const VRIASettingsFile& inOther) {;}
	virtual ~VRIASettingsFile();
			VRIASettingsFile& operator=( const VRIASettingsFile& inOther) {return *this;}

			XBOX::VError			_LoadSettings( XBOX::VFolder* inDTDsFolder = NULL);

			XBOX::VFilePath			fFilePath;
			XBOX::VValueBag			fRootBag;
};




class VRIASettingsCollection : public XBOX::VObject, public XBOX::IRefCountable
{
public:
			VRIASettingsCollection();
	virtual ~VRIASettingsCollection();

			XBOX::VError			AppendAndLoadSettingsFile( const XBOX::VFilePath& inFilePath, XBOX::VFolder* inDTDsFolder = NULL);

			bool					HasSettings( const RIASettingsID& inSettingsID) const;
			/** @brief	Ask each settings file for the settings bag, beginning with the first file which has been added using AppendAndLoadSettingsFile().
						RetainSettings() method may return NULL is none of the settings of the collection contains the settings. */
			const XBOX::VValueBag*	RetainSettings( const RIASettingsID& inSettingsID) const;
			XBOX::VValueBag*		RetainSettings( const RIASettingsID& inSettingsID);

			const XBOX::VBagArray*	RetainMultipleSettings (const RIASettingsID& inSettingsID) const;
			XBOX::VBagArray*		RetainMultipleSettings (const RIASettingsID& inSettingsID);

			/** @brief	Returns the settings file which contains the setting. */
			const VRIASettingsFile*	RetainSettingsFile( const RIASettingsID& inSettingsID) const;
			VRIASettingsFile*		RetainSettingsFile( const RIASettingsID& inSettingsID);

			bool					HasSettings( const XBOX::VValueBag::StKey& inSettingID) const;

			/** @brief	Ask each settings file for the settings bag, beginning with the first file which has been added using AppendAndLoadSettingsFile().
						RetainSettings() method may return NULL is none of the settings of the collection contains the settings. */
			const XBOX::VValueBag*	RetainSettings( const XBOX::VValueBag::StKey& inSettingID) const;
			XBOX::VValueBag*		RetainSettings( const XBOX::VValueBag::StKey& inSettingID);

			const XBOX::VBagArray*	RetainMultipleSettings( const XBOX::VValueBag::StKey& inSettingID) const;
			XBOX::VBagArray*		RetainMultipleSettings( const XBOX::VValueBag::StKey& inSettingID);

			/** @brief	Returns the settings file which contains the setting. */
			const VRIASettingsFile*	RetainSettingsFile( const XBOX::VValueBag::StKey& inSettingID) const;
			VRIASettingsFile*		RetainSettingsFile( const XBOX::VValueBag::StKey& inSettingID);

			void					Clear();

private:
			std::vector< XBOX::VRefPtr<VRIASettingsFile> >		fSettingsFiles;		// collection of settings file,
																					// the first loaded settings file is the first item of the collection
	mutable	XBOX::VCriticalSection								fMutex;
};



#endif