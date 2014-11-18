package org.p4d.qa.test.rest.domain;

import org.wakanda.qa.commons.server.rest.domain.BasicEntity;

public class Keylong64 extends BasicEntity {

    private Long ID_long64;

    private String as_string;

    private Double as_number;

    private Integer fk_master3;

    private String Lien_5;

    public Long getID_long64() {
        return this.ID_long64;
    }

    public void setID_long64(Long ID_long64) {
        this.ID_long64 = ID_long64;
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

    public String getLien_5() {
        return this.Lien_5;
    }

    public void setLien_5(String Lien_5) {
        this.Lien_5 = Lien_5;
    }
}
