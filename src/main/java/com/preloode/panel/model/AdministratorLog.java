package com.preloode.panel.model;

import javax.enterprise.inject.Model;

@Model
public class AdministratorLog {


    public Administrator administrator;

    public String authentication;

    public Client client;

    public Created created;

    public String description;

    public String log;

    public Modified modified;

    public LogTarget target;


    public Administrator getAdministrator() {

        return this.administrator;

    }


    public void setAdministrator(Administrator administrator) {

        this.administrator = administrator;

    }


    public String getAuthentication() {

        return this.authentication;

    }


    public void setAuthentication(String authentication) {

        this.authentication = authentication;

    }


    public Client getClient() {

        return this.client;

    }


    public void setClient(Client client) {

        this.client = client;

    }


    public Created getCreated() {

        return this.created;

    }


    public void setCreated(Created created) {

        this.created = created;

    }


    public String getDescription() {

        return this.description;

    }


    public void setDescription(String description) {

        this.description = description;

    }


    public String getLog() {

        return this.log;

    }


    public void setLog(String log) {

        this.log = log;

    }


    public Modified getModified() {

        return this.modified;

    }


    public void setModified(Modified modified) {

        this.modified = modified;

    }


    public LogTarget getTarget() {

        return this.target;

    }


    public void setTarget(LogTarget target) {

        this.target = target;

    }


}
