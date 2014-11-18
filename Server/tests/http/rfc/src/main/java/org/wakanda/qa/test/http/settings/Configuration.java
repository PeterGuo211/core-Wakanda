/**
 * 
 */
package org.wakanda.qa.test.http.settings;

import org.apache.http.client.HttpClient;
import org.wakanda.qa.commons.server.http.Requestor;
import org.wakanda.qa.commons.server.settings.DefaultConfiguration;
import org.wakanda.qa.commons.server.settings.DefaultServerAdminSettings;
import org.wakanda.qa.commons.server.settings.IServerAdminSettings;

/**
 * @author ouissam.gouni@4d.com
 *
 */
public class Configuration extends DefaultConfiguration {

	@Override
	public IServerAdminSettings getServerAdminSettings() {
		return new DefaultServerAdminSettings(){
			@Override
			public String getSolutionPath() {
				return Settings.getSolutionPath();
			}
		};
	}
	
	@Override
	public Requestor getRequestor() {
		return new Requestor(getHttpSettings()) {
			@Override
			public HttpClient getHttpClient() {
				return new org.wakanda.qa.test.http.settings.HttpClient();
			}
		};
	}
	
	private static Configuration instance = null;
	
	public static Configuration getInstance(){
		if(instance==null){
			instance = new Configuration();
		}
		return instance;
	}

}
