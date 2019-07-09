package com.preloode.panel.controller;

import com.preloode.panel.component.Account;
import com.preloode.panel.component.Client;
import com.preloode.panel.component.Head;
import com.preloode.panel.configuration.Setting;
import com.preloode.panel.configuration.Url;
import com.preloode.panel.service.LoginService;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Map;

@Controller
@RequestMapping(value = "/login")
public class LoginController {


    @Autowired
    private Url url;

    @Autowired
    private Client client;

    @Autowired
    private Account account;

    @Autowired
    private Head head;

    @Autowired
    private LoginService loginService;

    private Boolean login;


    @ModelAttribute("login")
    public Boolean login(HttpServletRequest request, HttpServletResponse response) {

        this.client.checkAccess(request, response);

        this.login = this.account.checkLogin(request);

        return this.login;

    }


    @ModelAttribute("setting")
    public Setting setting() {

        return this.head.initialize("Login");

    }


    @ModelAttribute("url")
    public Url url() {

        return this.url;

    }


    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(Map<String, Object> data) {

        if (!this.login) {

            return "login";

        }

        return "redirect:/";

    }


    @RequestMapping(value = "", method = RequestMethod.POST)
    public String indexRedirect() {

        return "redirect:/";

    }


    @RequestMapping(value = "/check-username")
    @ResponseBody
    public Map<String, Object> checkUsername(HttpSession session, @RequestBody Document data) {

        return this.loginService.checkUsername(session, data);

    }


    @RequestMapping(value = "/check-password")
    @ResponseBody
    public Map<String, Object> checkPassword(HttpServletRequest request, HttpServletResponse response, HttpSession session, @RequestBody Document data) {

        return this.loginService.checkPassword(request, response, session, data);

    }


    @RequestMapping(value = "/logout")
    @ResponseBody
    public Map<String, Object> logout(HttpServletRequest request, HttpServletResponse response) {

        return this.loginService.logout(request, response);

    }


}
