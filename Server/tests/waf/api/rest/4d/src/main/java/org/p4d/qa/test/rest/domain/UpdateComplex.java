package org.p4d.qa.test.rest.domain;

import org.wakanda.qa.commons.server.rest.domain.BasicEntity;

public class UpdateComplex extends BasicEntity {

    private Integer ID;

    private String as_string;

    private Boolean as_bool;

    private Short as_word;

    private Integer as_long;

    private Long as_long64;

    private Double as_number;

    private Integer as_duration;

    private String as_uuid;

    private java.util.Date as_date;

    private org.wakanda.qa.commons.server.rest.domain.deferred.Blob as_blob;

    private org.wakanda.qa.commons.server.rest.domain.deferred.Image as_image;

    private String Link_12_return;
    
	
	public UpdateComplex(String key) {
		super(key);
	}

    public Integer getID() {
        return this.ID;
    }

    public void setID(Integer ID) {
        this.ID = ID;
    }

    public String getAs_string() {
        return this.as_string;
    }

    public void setAs_string(String as_string) {
        this.as_string = as_string;
    }

    public Boolean getAs_bool() {
        return this.as_bool;
    }

    public void setAs_bool(Boolean as_bool) {
        this.as_bool = as_bool;
    }

    public Short getAs_word() {
        return this.as_word;
    }

    public void setAs_word(Short as_word) {
        this.as_word = as_word;
    }

    public Integer getAs_long() {
        return this.as_long;
    }

    public void setAs_long(Integer as_long) {
        this.as_long = as_long;
    }

    public Long getAs_long64() {
        return this.as_long64;
    }

    public void setAs_long64(Long as_long64) {
        this.as_long64 = as_long64;
    }

    public Double getAs_number() {
        return this.as_number;
    }

    public void setAs_number(Double as_number) {
        this.as_number = as_number;
    }

    public Integer getAs_duration() {
        return this.as_duration;
    }

    public void setAs_duration(Integer as_duration) {
        this.as_duration = as_duration;
    }

    public String getAs_uuid() {
        return this.as_uuid;
    }

    public void setAs_uuid(String as_uuid) {
        this.as_uuid = as_uuid;
    }

    public java.util.Date getAs_date() {
        return this.as_date;
    }

    public void setAs_date(java.util.Date as_date) {
        this.as_date = as_date;
    }

    public org.wakanda.qa.commons.server.rest.domain.deferred.Blob getAs_blob() {
        return this.as_blob;
    }

    public void setAs_blob(org.wakanda.qa.commons.server.rest.domain.deferred.Blob as_blob) {
        this.as_blob = as_blob;
    }

    public org.wakanda.qa.commons.server.rest.domain.deferred.Image getAs_image() {
        return this.as_image;
    }

    public void setAs_image(org.wakanda.qa.commons.server.rest.domain.deferred.Image as_image) {
        this.as_image = as_image;
    }

    public String getLink_12_return() {
        return this.Link_12_return;
    }

    public void setLink_12_return(String Link_12_return) {
        this.Link_12_return = Link_12_return;
    }
}
