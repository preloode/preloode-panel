package com.preloode.panel.model;

import javax.enterprise.inject.Model;

@Model
public class Password {


    public String main;

    public String recovery;


    public String getMain() {

        return this.main;

    }


    public void setMain(String main) {

        this.main = main;

    }


    public String getRecovery() {

        return this.recovery;

    }


    public void setRecovery(String recovery) {

        this.recovery = recovery;

    }


}
