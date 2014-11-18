package org.p4d.qa.test.rest.domain;

import org.wakanda.qa.commons.server.rest.domain.BasicEntity;

public class Simple extends BasicEntity {

    private Integer ID;

    private String as_string;

    private Integer as_long;

    private java.util.Date as_date;

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

    public java.util.Date getAs_date() {
        return this.as_date;
    }

    public void setAs_date(java.util.Date as_date) {
        this.as_date = as_date;
    }
}
