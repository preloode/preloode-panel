package com.preloode.panel.model;

import javax.enterprise.inject.Model;

@Model
public class Administrator {


    public String _id;

    public String city;

    public Contact contact;

    public String country;

    public Created created;

    public String file;

    public String gender;

    public String language;

    public Modified modified;

    public Name name;

    public Password password;

    public Privilege privilege;

    public String province;

    public AdministratorRole role;

    public String status;

    public String street_address;

    public String username;

    public String zip_code;


    public String get_id() {

        return this._id;

    }


    public void set_id(String _id) {

        this._id = _id;

    }


    public String getCity() {

        return this.city;

    }


    public void setCity(String city) {

        this.city = city;

    }


    public Contact getContact() {

        return this.contact;

    }


    public void setContact(Contact contact) {

        this.contact = contact;

    }


    public String getCountry() {

        return this.country;

    }


    public void setCountry(String country) {

        this.country = country;

    }


    public Created getCreated() {

        return this.created;

    }


    public void setCreated(Created created) {

        this.created = created;

    }


    public String getFile() {

        return this.file;

    }


    public void setFile(String file) {

        this.file = file;

    }


    public String getGender() {

        return this.gender;

    }


    public void setGender(String gender) {

        this.gender = gender;

    }


    public String getLanguage() {

        return this.language;

    }


    public void setLanguage(String language) {

        this.language = language;

    }


    public Modified getModified() {

        return this.modified;

    }


    public void setModified(Modified modified) {

        this.modified = modified;

    }


    public Name getName() {

        return this.name;

    }


    public void setName(Name name) {

        this.name = name;

    }


    public Password getPassword() {

        return this.password;

    }


    public void setPassword(Password password) {

        this.password = password;

    }


    public Privilege getPrivilege() {

        return this.privilege;

    }


    public void setPrivilege(Privilege privilege) {

        this.privilege = privilege;

    }


    public String getProvince() {

        return this.province;

    }


    public void setProvince(String province) {

        this.province = province;

    }


    public AdministratorRole getRole() {

        return this.role;

    }


    public void setRole(AdministratorRole role) {

        this.role = role;

    }


    public String getStatus() {

        return this.status;

    }


    public void setStatus(String status) {

        this.status = status;

    }


    public String getStreet_address() {

        return this.street_address;

    }


    public void setStreet_address(String street_address) {

        this.street_address = street_address;

    }


    public String getUsername() {

        return this.username;

    }


    public void setUsername(String username) {

        this.username = username;

    }


    public String getZip_code() {

        return this.zip_code;

    }


    public void setZip_code(String zip_code) {

        this.zip_code = zip_code;

    }


}
