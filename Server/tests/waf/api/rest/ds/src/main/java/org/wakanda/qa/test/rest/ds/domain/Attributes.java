/**
 * 
 */
package org.wakanda.qa.test.rest.ds.domain;

import org.wakanda.qa.commons.server.rest.domain.BasicEntity;

import com.google.gson.annotations.SerializedName;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class Attributes extends BasicEntity {

	@SerializedName("as_string")
	private String aSString;

	@SerializedName("as_number")
	private Double aSNumber;

	@SerializedName("ac_string")
	private String aCString;

	@SerializedName("ac_number")
	private String aCNumber;

	@SerializedName("ar_master2")
	private Master2 aRMaster2;

	@SerializedName("aa_master2__as_string")
	private String aAMaster2ASString;

	@SerializedName("aaa_master2__ar_master1__as_number")
	private String aAAMaster2ARMaster1ASNumber;

	public Attributes(String key) {
		super(key);
	}

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

	public String getACString() {
		return aCString;
	}

	public void setACString(String aCString) {
		this.aCString = aCString;
	}

	public String getACNumber() {
		return aCNumber;
	}

	public void setACNumber(String aCNumber) {
		this.aCNumber = aCNumber;
	}

	public Master2 getARMaster2() {
		return aRMaster2;
	}

	public void setARMaster2(Master2 aRMaster2) {
		this.aRMaster2 = aRMaster2;
	}

	public String getAAMaster2ASString() {
		return aAMaster2ASString;
	}

	public void setAAMaster2ASString(String aAMaster2ASString) {
		this.aAMaster2ASString = aAMaster2ASString;
	}

	public String getAAAMaster2ARMaster1ASNumber() {
		return aAAMaster2ARMaster1ASNumber;
	}

	public void setAAAMaster2ARMaster1ASNumber(
			String aAAMaster2ARMaster1ASNumber) {
		this.aAAMaster2ARMaster1ASNumber = aAAMaster2ARMaster1ASNumber;
	}

}
