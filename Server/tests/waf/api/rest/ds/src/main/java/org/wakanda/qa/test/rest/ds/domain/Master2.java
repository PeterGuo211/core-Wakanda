/**
 * 
 */
package org.wakanda.qa.test.rest.ds.domain;

import org.wakanda.qa.commons.server.rest.domain.BasicRelatedEntity;
import org.wakanda.qa.commons.server.rest.domain.deferred.OneToNLink;

import com.google.gson.annotations.SerializedName;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class Master2 extends BasicRelatedEntity {

	@SerializedName("as_string")
	private String aSString;

	@SerializedName("as_number")
	private Double aSNumber;

	@SerializedName("ar_master1")
	private Master1 aRMaster1;
	
	@SerializedName("ars_attributes")
	private OneToNLink aRSAttributes;

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

	public Master1 getARMaster1() {
		return aRMaster1;
	}

	public void setARMaster1(Master1 aRMaster1) {
		this.aRMaster1 = aRMaster1;
	}

	public OneToNLink getARSAttributes() {
		return aRSAttributes;
	}

	public void setaRSAttributes(OneToNLink aRSAttributes) {
		this.aRSAttributes = aRSAttributes;
	}
	
}
