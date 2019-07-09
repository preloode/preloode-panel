package com.preloode.panel.repository;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCursor;
import com.preloode.panel.component.Mongo;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

@Repository
public class AdministratorRepository {


    /* _id
    city
    contact {
        email_address
        line_id
        phone_number
        wechat_id
        whatsapp_number
    }
    country
    created {
        administrator {
            _id
            username
        }
        timestamp
    }
    file
    gender
    language
    modified {
        administrator {
            _id
            username
        }
        timestamp
    }
    name {
        first
        last
        middle
    }
    password {
        main
        recovery
    }
    privilege {
        administrator
        administrator_role
        bank
        bank_account
        blog
        blog_category
        gallery
        game
        game_type
        lottery
        player
        player_group
        player_transaction
        promotion
        report
        setting
        setting_page
        setting_slider
        setting_url
        sportsbook
        transaction
        transaction_request
    }
    province
    role {
        _id
        name
    }
    status
    street_address
    username
    zip_code */
    @Autowired
    private Mongo mongo;

    private String collection;


    public String getCollection() {

        return collection;

    }


    public void setCollection(String collection) {

        this.collection = collection;

    }


    @PostConstruct
    public void initialize() {

        String collection = "administrator";
        this.setCollection(collection);

    }


    public long count() {

        return this.mongo.count(this.collection);

    }


    public void deleteOne(Document eq) {

        this.mongo.deleteOne(this.collection, eq);

    }


    public FindIterable<Document> find() {

        return this.mongo.find(this.collection);

    }


    public MongoCursor<Document> findEqInSort(Document eq, Document in, Document sort) {

        return this.mongo.findEqInSort(this.collection, eq, in, sort);

    }


    public MongoCursor<Document> findEqLteSort(Document eq, Document lte, Document sort) {

        return this.mongo.findEqLteSort(this.collection, eq, lte, sort);

    }


    public MongoCursor<Document> findEqNeInSort(Document eq, Document ne, Document in, Document sort) {

        return this.mongo.findEqNeInSort(this.collection, eq, ne, in, sort);

    }


    public MongoCursor<Document> findEqNeSort(Document eq, Document ne, Document sort) {

        return this.mongo.findEqNeSort(this.collection, eq, ne, sort);

    }


    public MongoCursor<Document> findEqSort(Document eq, Document sort) {

        return this.mongo.findEqSort(this.collection, eq, sort);

    }


    public MongoCursor<Document> findPagination(Document filter, Document sort, Integer page, Integer size) {

        MongoCursor<Document> result = this.mongo.findPagination(this.collection, filter, sort, page, size);

        return result;

    }


    public MongoCursor<Document> findSort(Document sort) {

        return this.mongo.findSort(this.collection, sort);

    }


    public String insertOne(HttpServletRequest request, Document data, Document administrator) {

        return this.mongo.insertOne(request, this.collection, data, administrator);

    }


    public void updateOne(HttpServletRequest request, Document eq, Document data, Document administrator) {

        this.mongo.updateOne(request, this.collection, eq, data, administrator);

    }


}
