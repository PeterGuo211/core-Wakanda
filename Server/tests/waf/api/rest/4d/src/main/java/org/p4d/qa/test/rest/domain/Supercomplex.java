package org.p4d.qa.test.rest.domain;

import org.wakanda.qa.commons.server.rest.domain.BasicEntity;

public class Supercomplex extends BasicEntity {

    private Integer ID;

    private String asi_string;

    private Boolean asi_bool;

    private Short asi_word;

    private Integer asi_long;

    private Long asi_long64;

    private Double asi_number;

    private Integer asi_duration;

    private String asi_uuid;

    private java.util.Date asi_date;

    private org.wakanda.qa.commons.server.rest.domain.deferred.Blob asi_blob;

    private org.wakanda.qa.commons.server.rest.domain.deferred.Image asi_image;

    private Integer id_masterComplex;

    private Integer id_Slave1;

    public Integer getID() {
        return this.ID;
    }

    public void setID(Integer ID) {
        this.ID = ID;
    }

    public String getAsi_string() {
        return this.asi_string;
    }

    public void setAsi_string(String asi_string) {
        this.asi_string = asi_string;
    }

    public Boolean getAsi_bool() {
        return this.asi_bool;
    }

    public void setAsi_bool(Boolean asi_bool) {
        this.asi_bool = asi_bool;
    }

    public Short getAsi_word() {
        return this.asi_word;
    }

    public void setAsi_word(Short asi_word) {
        this.asi_word = asi_word;
    }

    public Integer getAsi_long() {
        return this.asi_long;
    }

    public void setAsi_long(Integer asi_long) {
        this.asi_long = asi_long;
    }

    public Long getAsi_long64() {
        return this.asi_long64;
    }

    public void setAsi_long64(Long asi_long64) {
        this.asi_long64 = asi_long64;
    }

    public Double getAsi_number() {
        return this.asi_number;
    }

    public void setAsi_number(Double asi_number) {
        this.asi_number = asi_number;
    }

    public Integer getAsi_duration() {
        return this.asi_duration;
    }

    public void setAsi_duration(Integer asi_duration) {
        this.asi_duration = asi_duration;
    }

    public String getAsi_uuid() {
        return this.asi_uuid;
    }

    public void setAsi_uuid(String asi_uuid) {
        this.asi_uuid = asi_uuid;
    }

    public java.util.Date getAsi_date() {
        return this.asi_date;
    }

    public void setAsi_date(java.util.Date asi_date) {
        this.asi_date = asi_date;
    }

    public org.wakanda.qa.commons.server.rest.domain.deferred.Blob getAsi_blob() {
        return this.asi_blob;
    }

    public void setAsi_blob(org.wakanda.qa.commons.server.rest.domain.deferred.Blob asi_blob) {
        this.asi_blob = asi_blob;
    }

    public org.wakanda.qa.commons.server.rest.domain.deferred.Image getAsi_image() {
        return this.asi_image;
    }

    public void setAsi_image(org.wakanda.qa.commons.server.rest.domain.deferred.Image asi_image) {
        this.asi_image = asi_image;
    }

    public Integer getId_masterComplex() {
        return this.id_masterComplex;
    }

    public void setId_masterComplex(Integer id_masterComplex) {
        this.id_masterComplex = id_masterComplex;
    }

    public Integer getId_Slave1() {
        return this.id_Slave1;
    }

    public void setId_Slave1(Integer id_Slave1) {
        this.id_Slave1 = id_Slave1;
    }
}
