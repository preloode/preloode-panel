package com.preloode.panel.repository;

import com.mongodb.client.MongoIterable;
import com.preloode.panel.component.Mongo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class InstallationRepository {


    @Autowired
    private Mongo mongo;


    public MongoIterable<String> checkCollection() {

        return this.mongo.listCollection();

    }


    public void createCollection() {

        ArrayList<String> createCollection = new ArrayList<String>() {

            {
                add("administrator");
                add("administrator_log");
                add("administrator_log_data");
                add("administrator_role");
                add("administrator_role_log_data");
                add("bank");
                add("bank_log_data");
                add("bank_account");
                add("bank_account_log_data");
                add("blog");
                add("blog_log_data");
                add("blog_category");
                add("blog_category_log_data");
                add("blog_comment");
                add("blog_comment_log_data");
                add("blog_star");
                add("blog_star_log_data");
                add("gallery");
                add("gallery_log_data");
                add("game");
                add("game_log_data");
                add("game_transaction");
                add("game_transaction_log_data");
                add("game_type");
                add("game_type_log_data");
                add("member");
                add("member_log");
                add("member_log_data");
                add("member_group");
                add("member_group_log_data");
                add("member_transaction");
                add("member_transaction_log_data");
                add("page");
                add("page_log_data");
                add("pools");
                add("pools_log_data");
                add("promotion");
                add("promotion_log_data");
                add("setting");
                add("setting_log_data");
                add("slider");
                add("slider_log_data");
                add("transaction");
                add("transaction_log_data");
                add("transaction_request");
                add("transaction_request_log_data");
                add("url");
                add("url_log_data");
            }

        };

        for (String string : createCollection) {

            this.mongo.createCollection(string);

        }

    }


    public void dropCollection(MongoIterable<String> collection) {

        for (String string : collection) {

            this.mongo.dropCollection(string);

        }

    }


}
