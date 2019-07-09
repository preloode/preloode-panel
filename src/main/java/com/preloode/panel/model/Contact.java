package com.preloode.panel.model;

import javax.enterprise.inject.Model;

@Model
public class Contact {


    public String email_address;

    public String line_id;

    public String phone_number;

    public String wechat_id;

    public String whatsapp_number;


    public String getEmail_address() {

        return this.email_address;

    }


    public void setEmail_address(String email_address) {

        this.email_address = email_address;

    }


    public String getLine_id() {

        return this.line_id;

    }


    public void setLine_id(String line_id) {

        this.line_id = line_id;

    }


    public String getPhone_number() {

        return this.phone_number;

    }


    public void setPhone_number(String phone_number) {

        this.phone_number = phone_number;

    }


    public String getWechat_id() {

        return this.wechat_id;

    }


    public void setWechat_id(String wechat_id) {

        this.wechat_id = wechat_id;

    }


    public String getWhatsapp_number() {

        return this.whatsapp_number;

    }


    public void setWhatsapp_number(String whatsapp_number) {

        this.whatsapp_number = whatsapp_number;

    }


}
