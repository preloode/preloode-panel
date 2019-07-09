package com.preloode.panel.model;

import javax.enterprise.inject.Model;

@Model
public class Client {

    public String browser_id;

    public String browser_manufacturer;

    public String browser_name;

    public String browser_rendering_engine;

    public String browser_type;

    public String browser_version;

    public String device_id;

    public String device_manufacturer;

    public String device_operating_system;

    public String device_type;

    public String id;

    public String ip;

    public String mac;


    public String getBrowser_id() {

        return this.browser_id;

    }


    public void setBrowser_id(String browser_id) {

        this.browser_id = browser_id;

    }


    public String getBrowser_manufacturer() {

        return this.browser_manufacturer;

    }


    public void setBrowser_manufacturer(String browser_manufacturer) {

        this.browser_manufacturer = browser_manufacturer;

    }


    public String getBrowser_name() {

        return this.browser_name;

    }


    public void setBrowser_name(String browser_name) {

        this.browser_name = browser_name;

    }


    public String getBrowser_rendering_engine() {

        return this.browser_rendering_engine;

    }


    public void setBrowser_rendering_engine(String browser_rendering_engine) {

        this.browser_rendering_engine = browser_rendering_engine;

    }


    public String getBrowser_type() {

        return this.browser_type;

    }


    public void setBrowser_type(String browser_type) {

        this.browser_type = browser_type;

    }


    public String getBrowser_version() {

        return this.browser_version;

    }


    public void setBrowser_version(String browser_version) {

        this.browser_version = browser_version;

    }


    public String getDevice_id() {

        return this.device_id;

    }


    public void setDevice_id(String device_id) {

        this.device_id = device_id;

    }


    public String getDevice_manufacturer() {

        return this.device_manufacturer;

    }


    public void setDevice_manufacturer(String device_manufacturer) {

        this.device_manufacturer = device_manufacturer;

    }


    public String getDevice_operating_system() {

        return this.device_operating_system;

    }


    public void setDevice_operating_system(String device_operating_system) {

        this.device_operating_system = device_operating_system;

    }


    public String getDevice_type() {

        return this.device_type;

    }


    public void setDevice_type(String device_type) {

        this.device_type = device_type;

    }


    public String getId() {

        return this.id;

    }


    public void setId(String id) {

        this.id = id;

    }


    public String getIp() {

        return this.ip;

    }


    public void setIp(String ip) {

        this.ip = ip;

    }


    public String getMac() {

        return this.mac;

    }


    public void setMac(String mac) {

        this.mac = mac;

    }


}
