package com.preloode.panel.model;

import com.preloode.panel.component.DateTime;

import javax.enterprise.inject.Model;

@Model
public class Created {


    public Object administrator;

    public DateTime timestamp;


    public Object getAdministrator() {

        return this.administrator;

    }


    public void setAdministrator(Object administrator) {

        this.administrator = administrator;

    }


    public DateTime getTimestamp() {

        return this.timestamp;

    }


    public void setTimestamp(DateTime timestamp) {

        this.timestamp = timestamp;

    }


}
