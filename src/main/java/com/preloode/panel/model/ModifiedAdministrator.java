package com.preloode.panel.model;

import javax.enterprise.inject.Model;

@Model
public class ModifiedAdministrator {


    public String _id;

    public String username;


    public String getId() {

        return this._id;

    }


    public void setId(String _id) {

        this._id = _id;

    }


    public String getUsername() {

        return this.username;

    }


    public void setUsername(String username) {

        this.username = username;

    }


}
