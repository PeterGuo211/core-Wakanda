package org.p4d.qa.test.rest.domain;

import org.wakanda.qa.commons.server.rest.domain.BasicEntity;

public class Keynumber extends BasicEntity {

    private Double ID_number;

    private String as_string;

    private Double as_number;

    private Integer fk_master3;

    private String Lien_8;

    public Double getID_number() {
        return this.ID_number;
    }

    public void setID_number(Double ID_number) {
        this.ID_number = ID_number;
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

    public String getLien_8() {
        return this.Lien_8;
    }

    public void setLien_8(String Lien_8) {
        this.Lien_8 = Lien_8;
    }
}
