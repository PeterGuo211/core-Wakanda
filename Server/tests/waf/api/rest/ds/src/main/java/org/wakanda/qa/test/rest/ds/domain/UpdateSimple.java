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
public class UpdateSimple extends BasicEntity {

	@SerializedName("as_string")
	private String aSString;

	@SerializedName("as_long")
	private Integer aSLong;

	@SerializedName("as_date")
	private String aSDate;
	
	@SerializedName("ar_master1")
	private Master1 aRMaster1;

	public UpdateSimple(String key) {
		super(key);
	}

	public String getASString() {
		return aSString;
	}

	public void setASString(String aSString) {
		this.aSString = aSString;
	}

	public Integer getASLong() {
		return aSLong;
	}

	public void setASLong(Integer aSLong) {
		this.aSLong = aSLong;
	}

	public String getASDate() {
		return aSDate;
	}

	public void setASDate(String aSDate) {
		this.aSDate = aSDate;
	}
	
	public Master1 getARMaster1() {
		return aRMaster1;
	}

	public void setARMaster1(Master1 aRMaster1) {
		this.aRMaster1 = aRMaster1;
	}
	
}
