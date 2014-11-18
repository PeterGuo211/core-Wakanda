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
#ifndef __VProjectSettings__
#define __VProjectSettings__



class VProjectSettings : public VRIASettingsCollection
{
public:
			VProjectSettings();
	virtual ~VProjectSettings();

			// If outHasSetting is false, the returned value is the default value.
	
			// Specific project settings accessors
			bool					HasProjectSettings() const;

			void					GetPublishName( XBOX::VString& outPublishName) const;

			bool					GetAdministrator() const;

			void					GetHostName( XBOX::VString& outHostName) const;

			void					GetPattern( XBOX::VString& outPattern) const;

			void					GetListeningAddress( XBOX::VString& outListeningAddress) const;

		#if  WITH_SANDBOXED_PROJECT
			void					GetDirectoryCacheFolder( XBOX::VString& outPath) const;

			void					GetLogFolder( XBOX::VString& outPath) const;
		#endif

			// Specific HTTP Server settings accessors
			bool					HasHTTPServerSettings() const;

			bool					GetHTTPServerStarted() const;

			sLONG					GetListeningPort() const;

			sLONG					GetListeningSSLPort() const;

			bool					GetAllowSSL() const;

			bool					GetSSLMandatory() const;

            bool                    GetAllowHTTPOnLocal() const;

            bool					GetUseCache() const;

			sLONG					GetCacheMaxSize() const;

			sLONG					GetCachedObjectMaxSize();
			
			bool					GetAcceptKeepAliveConnections() const;

			sLONG					GetKeepAliveMaxConnections() const;

			sLONG					GetKeepAliveTimeOut() const;
			
			void					GetLogFolderPath( XBOX::VString& outFolderPath) const;

			void					GetLogFileName( XBOX::VString& outFileName) const;

			void					GetLogFormat( XBOX::VString& outLogFormat) const;

			void					GetLogTokens( XBOX::VectorOfVString& outTokens) const;

			sLONG					GetLogMaxSize() const;

			bool					GetAllowCompression() const;

			sLONG					GetCompressionMinThreshold() const;

			sLONG					GetCompressionMaxThreshold() const;

			//Specific Database journal settings accessor
			bool					HasDatabaseJournalSettings()const;

			void					GetDatabaseJournalPath(XBOX::VString& outJournalPath)const;					

			//sLONG					GetDatabaseJournalMaxSize()const;

			bool					GetDatabaseJournalEnabled()const;

			const XBOX::VValueBag*	RetainDatabaseBackupSettings()const;

			//Specific Database recovery settings accessor
			bool					HasDatabaseRecoverySettings()const;

			bool					GetRecoverFromJournalOnIncompleteDatabase()const;					

			bool					GetRecoverFromLastBackupOnCorruptedDatabase()const;



			// Specific JavaScript settings accessors
			bool					HasJavaScriptSettings() const;

			bool					GetReuseJavaScriptContexts() const;

			sLONG					GetContextPoolSize() const;

			bool					GetEnableJavaScriptDebugger() const;

			// Services settings accessors
			bool					HasServicesSettings() const;

			bool					HasServiceSettings( const XBOX::VString& inServiceName) const;

			const XBOX::VBagArray*	RetainServicesSettings() const;

			const XBOX::VValueBag*	RetainServiceSettings( const XBOX::VString& inServiceName) const;
};



#endif