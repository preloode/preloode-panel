package com.preloode.panel.model;

import javax.enterprise.inject.Model;

@Model
public class Name {


    public String first;

    public String last;

    public String middle;


    public String getFirst() {

        return this.first;

    }


    public void setFirst(String first) {

        this.first = first;

    }


    public String getLast() {

        return this.last;

    }


    public void setLast(String last) {

        this.last = last;

    }


    public String getMiddle() {

        return this.middle;

    }


    public void setMiddle(String middle) {

        this.middle = middle;

    }


}
