package com.preloode.panel.model;

import javax.enterprise.inject.Model;

@Model
public class LogTarget {


    public String _id;

    public String name;


    public String get_id() {

        return this._id;

    }


    public void set_id(String _id) {

        this._id = _id;

    }


    public String getName() {

        return this.name;

    }


    public void setName(String name) {

        this.name = name;

    }


}
