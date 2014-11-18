package org.p4d.qa.test.rest.domain;

import org.wakanda.qa.commons.server.rest.domain.BasicEntity;

public class Stamp extends BasicEntity {

    private Integer ID;

    private String as_string;

    private Integer as_long;

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
}
