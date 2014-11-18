package org.p4d.qa.test.rest.settings;

import java.io.IOException;
import java.io.InputStream;

import org.apache.commons.configuration.PropertiesConfiguration;
import org.apache.commons.io.IOUtils;
import org.wakanda.qa.commons.server.Util;

/**
 * @author soufiane.tigrioui@4d.com
 * 
 */
public class Settings {

	public static PropertiesConfiguration getSettings() {
		return Util.getPropertiesConfiguration(Settings.class,
				"settings.properties");
	}

	/**
	 * Returns the content of the given test resource as String.
	 * 
	 * @param name
	 * @return
	 * @throws IOException
	 */
	public static String getExpectedContent(String name) throws IOException {
		String rPath = "../in/" + name + ".json";
		InputStream is = Settings.class.getResourceAsStream(rPath);
		if (is == null) {
			throw new IOException("Resource not found in " + rPath);
		}
		return IOUtils.toString(is);
	}

}
