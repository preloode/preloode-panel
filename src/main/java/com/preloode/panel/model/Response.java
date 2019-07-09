package com.preloode.panel.model;

import javax.enterprise.inject.Model;

@Model
public class Response {


    public String response;

    public Boolean result;


    public String getResponse() {

        return this.response;

    }


    public void setResponse(String response) {

        this.response = response;

    }


    public Boolean getResult() {

        return this.result;

    }


    public void setResult(Boolean result) {

        this.result = result;

    }


}
