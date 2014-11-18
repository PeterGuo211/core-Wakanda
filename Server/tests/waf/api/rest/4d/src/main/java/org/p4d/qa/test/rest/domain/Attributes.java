package org.p4d.qa.test.rest.domain;

import org.wakanda.qa.commons.server.rest.domain.BasicEntity;

public class Attributes extends BasicEntity {

    private Integer ID;

    private String as_string;

    private Double as_number;

    private Integer id_master2;

    private String Lien_2;

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

    public Double getAs_number() {
        return this.as_number;
    }

    public void setAs_number(Double as_number) {
        this.as_number = as_number;
    }

    public Integer getId_master2() {
        return this.id_master2;
    }

    public void setId_master2(Integer id_master2) {
        this.id_master2 = id_master2;
    }

    public String getLien_2() {
        return this.Lien_2;
    }

    public void setLien_2(String Lien_2) {
        this.Lien_2 = Lien_2;
    }
}
