/**
 * 
 */
package org.wakanda.qa.test.dataperm;

import org.wakanda.qa.commons.server.Util;

/**
 * @author ouissam.gouni@4d.com
 *
 */
public class ErrorCode {

	public static final int NO_PERM_EXEC = getErrorCode("noPermExec");
	public static final int NO_PERM_READ = getErrorCode("noPermRead");
	public static final int NO_PERM_DELETE = getErrorCode("noPermDelete");
	public static final int NO_PERM_UPDATE = getErrorCode("noPermUpdate");
	public static final int CANNOT_SAVE_ENTITY = getErrorCode("cannotSaveEntity");
	
	private static int getErrorCode(String name){
		return  Util.getPropertiesConfiguration(ErrorCode.class, "errorcodes.properties").getInt(name);
	}
	
}
