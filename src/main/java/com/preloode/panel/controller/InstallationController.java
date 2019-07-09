package com.preloode.panel.controller;

import com.preloode.panel.component.Account;
import com.preloode.panel.component.Head;
import com.preloode.panel.configuration.Setting;
import com.preloode.panel.configuration.Url;
import com.preloode.panel.service.InstallationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value = "/installation")
public class InstallationController {


    @Autowired
    private Setting setting;

    @Autowired
    private Url url;

    @Autowired
    private Account account;

    @Autowired
    private Head head;

    @Autowired
    private InstallationService installationService;

    private Map<String, Object> preloodeAccount;


    @ModelAttribute("preloodeAccount")
    public Map<String, Object> preloodeAccount(HttpServletRequest request) {

        this.preloodeAccount = this.account.initializeAccount(request);

        return this.preloodeAccount;

    }


    @ModelAttribute("setting")
    public Setting setting() {

        return this.head.initialize("Installation");

    }


    @ModelAttribute("url")
    public Url url() {

        return this.url;

    }


    @RequestMapping(value = "", method = RequestMethod.GET)
    public String index(Map<String, Object> data) {

        Boolean installation = this.installationService.checkInstallation();

        if (!installation) {

            return "installation";

        }

        this.setting.setMetaTitle("Page Not Found");

        return "page-not-found";

    }


    @RequestMapping(value = "/uninstallation", method = RequestMethod.GET)
    public String setting(Map<String, Object> data) {

        if (this.preloodeAccount.get("result").equals(true)) {

            if (this.preloodeAccount.get("username").equals("preloode")) {

                return "uninstallation";

            } else {

                this.setting.setMetaTitle("Page Not Found");

                return "page-not-found";

            }

        }

        this.setting.setMetaTitle("Page Not Found");

        return "page-not-found";

    }


    @RequestMapping(value = "/install")
    @ResponseBody
    public Map<String, Object> install(HttpServletRequest request) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("result", false);
            }

        };

        Boolean installation = this.installationService.checkInstallation();

        if (!installation) {

            result = this.installationService.install(request);

        }

        return result;

    }


    @RequestMapping(value = "/initialize-demo-data")
    @ResponseBody
    public Map<String, Object> initializeDemoData(HttpServletRequest request, HttpSession session) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("result", false);
            }

        };

        result = this.installationService.initializeDemoData(request, session);

        return result;

    }


    @RequestMapping(value = "/uninstall")
    @ResponseBody
    public Map<String, Object> uninstall(HttpServletRequest request) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("result", false);
            }

        };

        this.preloodeAccount = this.account.initializeAccount(request);

        if (this.preloodeAccount.get("result").equals(true)) {

            if (this.preloodeAccount.get("username").equals("preloode")) {

                result = this.installationService.uninstall(request);

            }

        }

        return result;

    }


}
