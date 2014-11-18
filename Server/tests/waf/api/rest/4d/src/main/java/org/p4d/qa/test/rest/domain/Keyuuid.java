package org.p4d.qa.test.rest.domain;

import org.wakanda.qa.commons.server.rest.domain.BasicEntity;

public class Keyuuid extends BasicEntity {

    private String ID_uuid;

    private String as_string;

    private Double as_number;

    private Integer fk_master3;

    private String Lien_7;

    public String getID_uuid() {
        return this.ID_uuid;
    }

    public void setID_uuid(String ID_uuid) {
        this.ID_uuid = ID_uuid;
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

    public Integer getFk_master3() {
        return this.fk_master3;
    }

    public void setFk_master3(Integer fk_master3) {
        this.fk_master3 = fk_master3;
    }

    public String getLien_7() {
        return this.Lien_7;
    }

    public void setLien_7(String Lien_7) {
        this.Lien_7 = Lien_7;
    }
}
