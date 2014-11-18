package org.p4d.qa.test.rest.domain;

import org.wakanda.qa.commons.server.rest.domain.BasicEntity;

public class Master1 extends BasicEntity {

    private Integer ID;

    private String as_string;

    private Double as_number;

    private String Lien_1_retour;

    private String Link_11_return;

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

    public String getLien_1_retour() {
        return this.Lien_1_retour;
    }

    public void setLien_1_retour(String Lien_1_retour) {
        this.Lien_1_retour = Lien_1_retour;
    }

    public String getLink_11_return() {
        return this.Link_11_return;
    }

    public void setLink_11_return(String Link_11_return) {
        this.Link_11_return = Link_11_return;
    }
}
