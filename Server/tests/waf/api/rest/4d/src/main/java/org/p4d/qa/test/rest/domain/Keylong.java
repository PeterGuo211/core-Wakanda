package org.p4d.qa.test.rest.domain;

import org.wakanda.qa.commons.server.rest.domain.BasicEntity;

public class Keylong extends BasicEntity {

    private Integer ID_long;

    private String as_string;

    private Double as_number;

    private Integer fk_master3;

    private String Lien_9;

    public Integer getID_long() {
        return this.ID_long;
    }

    public void setID_long(Integer ID_long) {
        this.ID_long = ID_long;
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

    public String getLien_9() {
        return this.Lien_9;
    }

    public void setLien_9(String Lien_9) {
        this.Lien_9 = Lien_9;
    }
}
