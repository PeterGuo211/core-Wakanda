/**
 * 
 */
package org.wakanda.qa.test.rest.ds.domain;

import java.util.Date;

import org.wakanda.qa.commons.server.rest.domain.BasicEntity;
import org.wakanda.qa.commons.server.rest.domain.deferred.Blob;
import org.wakanda.qa.commons.server.rest.domain.deferred.Image;
import org.wakanda.qa.commons.server.rest.domain.deferred.OneToNLink;

import com.google.gson.annotations.SerializedName;

/**
 * @author ouissam.gouni@4d.com
 *
 */
public class UpdateComplex extends BasicEntity {
	
	@SerializedName("as_string")
	private String aSString;
	
	@SerializedName("as_bool")
	private Boolean aSBool;
	
	@SerializedName("as_byte")
	private Byte aSByte;
	
	@SerializedName("as_word")
	private Short aSWord;
	
	@SerializedName("as_long")
	private Integer aSLong;
	
	@SerializedName("as_long64")
	private Long aSLong64;
	
	@SerializedName("as_number")
	private Double aSNumber;
	
	@SerializedName("as_duration")
	private Integer aSDuration;
	
	@SerializedName("as_uuid")
	private String aSUuid;
	
	@SerializedName("as_date")
	private Date aSDate;
	
	@SerializedName("as_blob")
	private Blob aSBlob;
	
	@SerializedName("as_image")
	private Image aSImage;
		
	@SerializedName("ar_master1")
	private Master1 aRMaster1;
	
	@SerializedName("ars_slave1")
	private OneToNLink aRSSlave1;
	
	
	public UpdateComplex(String key) {
		super(key);
	}

	public String getASString() {
		return aSString;
	}

	public void setASString(String aSString) {
		this.aSString = aSString;
	}

	public Boolean getASBool() {
		return aSBool;
	}

	public void setASBool(Boolean aSBool) {
		this.aSBool = aSBool;
	}

	public Byte getASByte() {
		return aSByte;
	}

	public void setASByte(Byte aSByte) {
		this.aSByte = aSByte;
	}

	public Short getASWord() {
		return aSWord;
	}

	public void setASWord(Short aSWord) {
		this.aSWord = aSWord;
	}

	public Integer getASLong() {
		return aSLong;
	}

	public void setASLong(Integer aSLong) {
		this.aSLong = aSLong;
	}

	public Long getASLong64() {
		return aSLong64;
	}

	public void setASLong64(Long aSLong64) {
		this.aSLong64 = aSLong64;
	}

	public Double getASNumber() {
		return aSNumber;
	}

	public void setASNumber(Double aSNumber) {
		this.aSNumber = aSNumber;
	}

	public Integer getASDuration() {
		return aSDuration;
	}

	public void setASDuration(Integer aSDuration) {
		this.aSDuration = aSDuration;
	}

	public String getASUuid() {
		return aSUuid;
	}

	public void setASUuid(String aSUuid) {
		this.aSUuid = aSUuid;
	}

	public Date getASDate() {
		return aSDate;
	}

	public void setASDate(Date aSDate) {
		this.aSDate = aSDate;
	}

	public Blob getASBlob() {
		return aSBlob;
	}

	public void setASBlob(Blob aSBlob) {
		this.aSBlob = aSBlob;
	}

	public Image getASImage() {
		return aSImage;
	}

	public void setASImage(Image aSImage) {
		this.aSImage = aSImage;
	}
	
	public Master1 getaRMaster1() {
		return aRMaster1;
	}

	public void setaRMaster1(Master1 aRMaster1) {
		this.aRMaster1 = aRMaster1;
	}

	public OneToNLink getARSSlave1() {
		return aRSSlave1;
	}

	public void setARSSlave1(OneToNLink aRSSlave1) {
		this.aRSSlave1 = aRSSlave1;
	}

}
