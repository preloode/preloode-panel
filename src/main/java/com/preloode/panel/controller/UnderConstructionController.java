package com.preloode.panel.controller;

import com.preloode.panel.component.Head;
import com.preloode.panel.configuration.Setting;
import com.preloode.panel.configuration.Url;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Map;

@Controller
@RequestMapping(value = "/under-construction")
public class UnderConstructionController {


    @Autowired
    private Url url;

    @Autowired
    private Head head;


    @ModelAttribute("setting")
    public Setting setting() {

        return this.head.initialize("Under Construction");

    }


    @ModelAttribute("url")
    public Url url() {

        return this.url;

    }


    @RequestMapping(value = "", method = RequestMethod.GET)
    public String index(Map<String, Object> data) {

        return "under-construction";

    }


}
