/**
 * 
 */
package org.wakanda.qa.test.dataperm.settings;

import java.io.File;
import java.net.URL;

import org.wakanda.qa.commons.server.Util;
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
				try {
					String relative = Util.getPropertiesConfiguration(Configuration.class,
							"settings.properties").getString("solution");
					URL url = Configuration.class.getResource(relative);
					String absPath = new File(url.toURI())
							.getCanonicalPath();
					return absPath;
				} catch (Exception e) {
					e.printStackTrace();
				}
				return null;
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
