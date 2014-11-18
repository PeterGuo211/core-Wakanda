package org.p4d.qa.test.rest.domain;

import org.wakanda.qa.commons.server.rest.domain.BasicEntity;

public class Master2 extends BasicEntity {

    private Integer ID;

    private String as_string;

    private Double as_number;

    private Integer id_master1;

    private String Lien_1;

    private String Lien_2_retour;

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

    public Integer getId_master1() {
        return this.id_master1;
    }

    public void setId_master1(Integer id_master1) {
        this.id_master1 = id_master1;
    }

    public String getLien_1() {
        return this.Lien_1;
    }

    public void setLien_1(String Lien_1) {
        this.Lien_1 = Lien_1;
    }

    public String getLien_2_retour() {
        return this.Lien_2_retour;
    }

    public void setLien_2_retour(String Lien_2_retour) {
        this.Lien_2_retour = Lien_2_retour;
    }
}
