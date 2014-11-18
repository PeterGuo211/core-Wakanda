package org.p4d.qa.test.rest.domain;

import org.wakanda.qa.commons.server.rest.domain.BasicEntity;

public class Keystring extends BasicEntity {

    private String ID_string;

    private String as_string;

    private Double as_number;

    private Integer fk_master3;

    private String Lien_6;

    public String getID_string() {
        return this.ID_string;
    }

    public void setID_string(String ID_string) {
        this.ID_string = ID_string;
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

    public String getLien_6() {
        return this.Lien_6;
    }

    public void setLien_6(String Lien_6) {
        this.Lien_6 = Lien_6;
    }
}
