/**
 * 
 */
package org.wakanda.qa.test.dataperm.settings;

import org.apache.http.HttpHost;
import org.wakanda.qa.commons.server.Util;

/**
 * @author ouissam.gouni@4d.com
 *
 */
public class Targets{
	
	public static final HttpHost NO_PERM = getTarget("portNoPerm");
	public static final HttpHost PERM = getTarget("portPerm");
	public static final HttpHost PERM_INHERITED = getTarget("portPermInherited");
	public static final HttpHost READ_INHERITED = getTarget("portReadInherited");
	public static final HttpHost CREATE_INHERITED = getTarget("portCreateInherited");
	public static final HttpHost UPDATE_INHERITED = getTarget("portUpdateInherited");
	public static final HttpHost REMOVE_INHERITED = getTarget("portRemoveInherited");
	public static final HttpHost EXECUTE_INHERITED_MODEL = getTarget("portExecuteInheritedModel");
	public static final HttpHost EXECUTE_INHERITED_DATACLASS = getTarget("portExecuteInheritedDataClass");
	public static final HttpHost PROMOTE_INHERITED_DATACLASS = getTarget("portPromoteInheritedDataClass");
	public static final HttpHost PROMOTE_INHERITED_MODEL_READ = getTarget("portPromoteInheritedModelRead");
	public static final HttpHost PROMOTE_INHERITED_MODEL_CREATE = getTarget("portPromoteInheritedModelCreate");
	public static final HttpHost PROMOTE_INHERITED_MODEL_UPDATE = getTarget("portPromoteInheritedModelUpdate");
	public static final HttpHost PROMOTE_INHERITED_MODEL_REMOVE = getTarget("portPromoteInheritedModelRemove");
	public static final HttpHost FORCE_READ = getTarget("portForceRead");
	public static final HttpHost FORCE_CREATE = getTarget("portForceCreate");
	public static final HttpHost FORCE_UPDATE = getTarget("portForceUpdate");
	public static final HttpHost FORCE_REMOVE = getTarget("portForceRemove");
	public static final HttpHost FORCE_EXECUTE_MODEL = getTarget("portForceExecuteModel");
	public static final HttpHost FORCE_EXECUTE_DATACLASS = getTarget("portForceExecuteDataClass");
	public static final HttpHost FORCE_PROMOTE_MODEL = getTarget("portForcePromoteModel");
	public static final HttpHost FORCE_PROMOTE_DATACLASS = getTarget("portForcePromoteDataClass");
	public static final HttpHost READ_OVERRIDE = getTarget("portReadOverride");
	public static final HttpHost CREATE_OVERRIDE = getTarget("portCreateOverride");
	public static final HttpHost UPDATE_OVERRIDE = getTarget("portUpdateOverride");
	public static final HttpHost REMOVE_OVERRIDE = getTarget("portRemoveOverride");
	public static final HttpHost EXECUTE_OVERRIDE = getTarget("portExecuteOverride");
	public static final HttpHost PROMOTE_OVERRIDE = getTarget("portPromoteOverride");
	
	private static HttpHost getTarget(String name) {
		int port = Util.getPropertiesConfiguration(Targets.class, "targets.properties").getInt(name);
		String hostName = Configuration.getInstance().getHttpSettings().getDefaultHostName();
		return new HttpHost(hostName, port);
	}
}
