package com.preloode.panel.model;

import javax.enterprise.inject.Model;

@Model
public class ResponseAdministratorPagination extends Response {


    public AdministratorFilter filter;

    public Integer page;

    public String pagination;

    public AdministratorRole role;


    public AdministratorFilter getFilter() {

        return this.filter;

    }


    public void setFilter(AdministratorFilter filter) {

        this.filter = filter;

    }


    public Integer getPage() {

        return this.page;

    }


    public void setPage(Integer page) {

        this.page = page;

    }


    public String getPagination() {

        return this.pagination;

    }


    public void setPagination(String pagination) {

        this.pagination = pagination;

    }


    public AdministratorRole getRole() {

        return this.role;

    }


    public void setRole(AdministratorRole role) {

        this.role = role;

    }


}
