package org.p4d.qa.test.rest.domain;

import org.wakanda.qa.commons.server.rest.domain.BasicEntity;

public class Updatesimple extends BasicEntity {

    private Integer ID;

    private String as_string;

    private Integer as_long;

    private java.util.Date as_date;

    private String Master1;

    private String Link_11;

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

    public String getMaster1() {
        return this.Master1;
    }

    public void setMaster1(String Master1) {
        this.Master1 = Master1;
    }

    public String getLink_11() {
        return this.Link_11;
    }

    public void setLink_11(String Link_11) {
        this.Link_11 = Link_11;
    }
}
