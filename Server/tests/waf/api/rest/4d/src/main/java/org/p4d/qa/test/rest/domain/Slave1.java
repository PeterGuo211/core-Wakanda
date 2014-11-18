package org.p4d.qa.test.rest.domain;

import org.wakanda.qa.commons.server.rest.domain.BasicEntity;

public class Slave1 extends BasicEntity {

    private Integer ID;

    private String as_string;

    private Integer as_long;

    private Integer id_complex;

    private Integer fk_master3;

    private Integer id_updateComplex;

    private String Lien_3;

    private String Lien_10;

    private String Link_12;

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

    public Integer getAs_long() {
        return this.as_long;
    }

    public void setAs_long(Integer as_long) {
        this.as_long = as_long;
    }

    public Integer getId_complex() {
        return this.id_complex;
    }

    public void setId_complex(Integer id_complex) {
        this.id_complex = id_complex;
    }

    public Integer getFk_master3() {
        return this.fk_master3;
    }

    public void setFk_master3(Integer fk_master3) {
        this.fk_master3 = fk_master3;
    }

    public Integer getId_updateComplex() {
        return this.id_updateComplex;
    }

    public void setId_updateComplex(Integer id_updateComplex) {
        this.id_updateComplex = id_updateComplex;
    }

    public String getLien_3() {
        return this.Lien_3;
    }

    public void setLien_3(String Lien_3) {
        this.Lien_3 = Lien_3;
    }

    public String getLien_10() {
        return this.Lien_10;
    }

    public void setLien_10(String Lien_10) {
        this.Lien_10 = Lien_10;
    }

    public String getLink_12() {
        return this.Link_12;
    }

    public void setLink_12(String Link_12) {
        this.Link_12 = Link_12;
    }
}
