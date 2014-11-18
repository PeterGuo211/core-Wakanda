/**
 * 
 */
package org.wakanda.qa.test.rest.ds.domain;

import org.wakanda.qa.commons.server.rest.domain.BasicRelatedEntity;
import org.wakanda.qa.commons.server.rest.domain.deferred.NToOneLink;

import com.google.gson.annotations.SerializedName;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class Master1 extends BasicRelatedEntity {

	@SerializedName("as_string")
	private String aSString;

	@SerializedName("as_number")
	private Double aSNumber;

	@SerializedName("ar_master2")
	private NToOneLink aRMaster2;

	public String getASString() {
		return aSString;
	}

	public void setASString(String aSString) {
		this.aSString = aSString;
	}


	public Double getASNumber() {
		return aSNumber;
	}

	public void setASNumber(Double aSNumber) {
		this.aSNumber = aSNumber;
	}

	public NToOneLink getARMaster2() {
		return aRMaster2;
	}

	public void setARMaster2(NToOneLink aRMaster2) {
		this.aRMaster2 = aRMaster2;
	}

}
