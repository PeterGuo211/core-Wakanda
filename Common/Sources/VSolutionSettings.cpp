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
#include "VRIASettingsKeys.h"
#include "VRIASettingsFile.h"
#include "VSolutionSettings.h"


USING_TOOLBOX_NAMESPACE



VSolutionSettings::VSolutionSettings()
{
}


VSolutionSettings::~VSolutionSettings()
{
}


bool VSolutionSettings::HasSolutionSettings() const
{
	return HasSettings( RIASettingID::solution);
}


bool VSolutionSettings::GetStopIfProjectFails() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::solution);
	bool result = RIASettingsKeys::Solution::stopIfProjectFails.GetUsingPath( bag);
	ReleaseRefCountable( &bag);
	return result;
}


bool VSolutionSettings::GetGarbageCollect() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::solution);
	bool result = RIASettingsKeys::Solution::garbageCollect.Get( bag);
	ReleaseRefCountable( &bag);
	return result;
}


void VSolutionSettings::GetAuthenticationType( XBOX::VString& outType) const
{
	const VValueBag *bag = RetainSettings( RIASettingID::solution);
	RIASettingsKeys::Solution::authenticationType.GetUsingPath( bag, outType);
	ReleaseRefCountable( &bag);
}


void VSolutionSettings::GetDirectoryCacheFolder( XBOX::VString& outPath) const
{
	const VValueBag *bag = RetainSettings( RIASettingID::solution);
	const VValueBag *directorySettings = (bag != NULL) ? bag->RetainUniqueElement( RIASettingsKeys::Solution::directory) : NULL;
	outPath = RIASettingsKeys::Solution::cacheFolderPath.Get( directorySettings);
	ReleaseRefCountable( &directorySettings);
	ReleaseRefCountable( &bag);
}


void VSolutionSettings::GetLogFolder( XBOX::VString& outPath) const
{
	const VValueBag *bag = RetainSettings( RIASettingID::solution);
	const VValueBag *logSettings = (bag != NULL) ? bag->RetainUniqueElement( RIASettingsKeys::Solution::log) : NULL;
	outPath = RIASettingsKeys::Solution::folderPath.Get( logSettings);
	ReleaseRefCountable( &logSettings);
	ReleaseRefCountable( &bag);
}


bool VSolutionSettings::HasDatabaseSettings() const
{
	return HasSettings( RIASettingID::database);
}


bool VSolutionSettings::GetAdaptiveCache() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::database);
	bool result = RIASettingsKeys::Database::adaptiveCache.Get( bag);
	ReleaseRefCountable( &bag);
	return result;
}


sLONG VSolutionSettings::GetMemoryForOtherApplications() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::database);
	sLONG result = RIASettingsKeys::Database::memoryForOtherApplications.Get( bag);
	ReleaseRefCountable( &bag);
	return result;
}


sLONG VSolutionSettings::GetMemoryForCache() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::database);
	sLONG result = RIASettingsKeys::Database::memoryForCache.Get( bag);
	ReleaseRefCountable( &bag);
	return result;
}


sLONG VSolutionSettings::GetMinimumCacheSize() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::database);
	sLONG result = RIASettingsKeys::Database::minimumSize.Get( bag);
	ReleaseRefCountable( &bag);
	return result;
}


sLONG VSolutionSettings::GetMaximumCacheSize() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::database);
	sLONG result = RIASettingsKeys::Database::maximumSize.Get( bag);
	ReleaseRefCountable( &bag);
	return result;
}


sLONG VSolutionSettings::GetFixedCacheSize() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::database);
	sLONG result = RIASettingsKeys::Database::fixedSize.Get( bag);
	ReleaseRefCountable( &bag);
	return result;
}


bool VSolutionSettings::GetKeepCacheInMemory() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::database);
	bool result = RIASettingsKeys::Database::keepCacheInMemory.Get( bag);
	ReleaseRefCountable( &bag);
	return result;
}


sLONG VSolutionSettings::GetFlushDataInterval() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::database);
	sLONG result = RIASettingsKeys::Database::flushDataCacheInterval.Get( bag);
	ReleaseRefCountable( &bag);
	return result;
}