package com.preloode.panel.model;

import javax.enterprise.inject.Model;
import java.math.BigDecimal;

@Model
public class AdministratorRole {


    public String _id;

    public Created created;

    public Modified modified;

    public String name;

    public Privilege privilege;

    public BigDecimal sequence;

    public String status;


    public String get_id() {

        return this._id;

    }


    public void set_id(String _id) {

        this._id = _id;

    }


    public Created getCreated() {

        return this.created;

    }


    public void setCreated(Created created) {

        this.created = created;

    }


    public Modified getModified() {

        return this.modified;

    }


    public void setModified(Modified modified) {

        this.modified = modified;

    }


    public String getName() {

        return this.name;

    }


    public void setName(String name) {

        this.name = name;

    }


    public Privilege getPrivilege() {

        return this.privilege;

    }


    public void setPrivilege(Privilege privilege) {

        this.privilege = privilege;

    }


    public BigDecimal getSequence() {

        return this.sequence;

    }


    public void setSequence(BigDecimal sequence) {

        this.sequence = sequence;

    }


    public String getStatus() {

        return this.status;

    }


    public void setStatus(String status) {

        this.status = status;

    }


}
