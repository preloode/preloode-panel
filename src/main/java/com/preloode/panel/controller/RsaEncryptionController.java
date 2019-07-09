package com.preloode.panel.controller;

import com.preloode.panel.component.Head;
import com.preloode.panel.configuration.Setting;
import com.preloode.panel.configuration.Url;
import com.preloode.panel.service.RsaEncryptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value = "/rsa-encryption")
public class RsaEncryptionController {


    @Autowired
    private Url url;

    @Autowired
    private Head head;

    @Autowired
    private RsaEncryptionService rsaEncryptionService;


    @ModelAttribute("setting")
    public Setting setting() {

        return this.head.initialize("RSA Encryption");

    }


    @ModelAttribute("url")
    public Url url() {

        return this.url;

    }


    @RequestMapping(value = "", method = RequestMethod.GET)
    public String index(Map<String, Object> data) {

        return "rsa-encryption";

    }


    @RequestMapping(value = "/generate-key-pair")
    @ResponseBody
    public Map<String, Object> generateKeyPair(HttpServletRequest request) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("result", false);
            }

        };

        result = this.rsaEncryptionService.generateKeyPair(request);

        return result;

    }


    @RequestMapping(value = "/get-key-pair")
    @ResponseBody
    public Map<String, Object> getKeyPair() {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("result", false);
            }

        };

        result = this.rsaEncryptionService.getKeyPair();

        return result;

    }


}
