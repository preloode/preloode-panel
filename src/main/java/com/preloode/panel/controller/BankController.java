package com.preloode.panel.controller;

import com.preloode.panel.component.*;
import com.preloode.panel.configuration.Setting;
import com.preloode.panel.configuration.Url;
import com.preloode.panel.service.BankService;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value = "/bank")
public class BankController {


    @Autowired
    private Url url;

    @Autowired
    private Client client;

    @Autowired
    private Account account;

    @Autowired
    private Head head;

    @Autowired
    private Layout layout;

    @Autowired
    private Privilege privilege;

    @Autowired
    private BankService bankService;

    private Map<String, Object> preloodeAccount;

    private Integer page;


    @ModelAttribute("layout")
    public Map<String, Object> layout(HttpServletRequest request) {

        return this.layout.initializeMenu(request);

    }


    @ModelAttribute("preloodeAccount")
    public Map<String, Object> preloodeAccount(HttpServletRequest request, HttpServletResponse response) {

        this.client.checkAccess(request, response);

        this.preloodeAccount = this.account.initializeAccount(request);

        return this.preloodeAccount;

    }


    @ModelAttribute("setting")
    public Setting setting() {

        return this.head.initialize("Bank");

    }


    @ModelAttribute("url")
    public Url url() {

        return this.url;

    }


    @RequestMapping(value = "", method = RequestMethod.GET)
    public String index(HttpServletRequest request, Map<String, Object> data) {

        if (this.preloodeAccount.get("result").equals(true)) {

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "bank", "view");

            if (privilegeCheck) {

                this.page = 1;

                data.put("link", this.bankService.createPaginationLink(request, this.preloodeAccount, this.page));
                data.put("menu", this.privilege.menu(this.preloodeAccount));
                data.put("page", this.page);
                data.put("pagination", this.bankService.loadPagination(request, this.preloodeAccount, this.page));

                return "bank";

            } else {

                return "restricted-access";

            }

        }

        return "redirect:/login/";

    }


    @RequestMapping(value = "/{page:^(?!entry).+}", method = RequestMethod.GET)
    public String page(HttpServletRequest request, @PathVariable("page") String page, Map<String, Object> data) {

        if (this.preloodeAccount.get("result").equals(true)) {

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "bank", "view");

            if (privilegeCheck) {

                this.page = Integer.parseInt(page.replaceAll("[^0-9]", ""));

                data.put("link", this.bankService.createPaginationLink(request, this.preloodeAccount, this.page));
                data.put("menu", this.privilege.menu(this.preloodeAccount));
                data.put("page", this.page);
                data.put("pagination", this.bankService.loadPagination(request, this.preloodeAccount, this.page));

                return "bank";

            } else {

                return "restricted-access";

            }

        }

        return "redirect:/login/";

    }


    @RequestMapping(value = "/entry", method = RequestMethod.GET)
    public String add(Map<String, Object> data) {

        if (this.preloodeAccount.get("result").equals(true)) {

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "bank", "add");

            if (privilegeCheck) {

                data.put("menu", this.privilege.menu(this.preloodeAccount));

                return "bank-entry";

            } else {

                return "restricted-access";

            }

        }

        return "redirect:/login/";

    }


    @RequestMapping(value = "/entry/{id}", method = RequestMethod.GET)
    public String edit(@PathVariable("id") String id, Map<String, Object> data) {

        if (this.preloodeAccount.get("result").equals(true)) {

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "bank", "edit");

            if (privilegeCheck) {

                data.put("entry", this.bankService.loadEntry(id.replaceAll("[^A-Za-z0-9]", "")));
                data.put("menu", this.privilege.menu(this.preloodeAccount));

                return "bank-entry";

            } else {

                return "restricted-access";

            }

        }

        return "redirect:/login/";

    }


    @RequestMapping(value = "/initialize-pagination")
    @ResponseBody
    public Map<String, Object> initializePagination(HttpServletRequest request) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("result", false);
            }

        };

        if (!this.preloodeAccount.isEmpty()) {

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "bank", "view");

            if (privilegeCheck) {

                result = this.bankService.initializePagination(request, this.preloodeAccount, this.page);

            } else {

                result.put("response", "You don't have a privilege");

            }

        } else {

            result.put("response", "Your login session wasn't detected");

        }

        return result;

    }


    @RequestMapping(value = "/filter-pagination")
    @ResponseBody
    public Map<String, Object> filterPagination(HttpServletResponse response, @RequestBody Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("result", false);
            }

        };

        if (!this.preloodeAccount.isEmpty()) {

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "bank", "view");

            if (privilegeCheck) {

                result = this.bankService.filterPagination(response, this.preloodeAccount, data);

            } else {

                result.put("response", "You don't have a privilege");

            }

        } else {

            result.put("response", "Your login session wasn't detected");

        }

        return result;

    }


    @RequestMapping(value = "/set-pagination")
    @ResponseBody
    public Map<String, Object> setPagination(HttpServletResponse response, @RequestBody Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("result", false);
            }

        };

        if (!this.preloodeAccount.isEmpty()) {

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "bank", "view");

            if (privilegeCheck) {

                result = this.bankService.setPagination(response, this.preloodeAccount, data);

            } else {

                result.put("response", "You don't have a privilege");

            }

        } else {

            result.put("response", "Your login session wasn't detected");

        }

        return result;

    }


    @RequestMapping(value = "/remove-filter-pagination")
    @ResponseBody
    public Map<String, Object> removeFilterPagination(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("result", false);
            }

        };

        if (!this.preloodeAccount.isEmpty()) {

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "bank", "view");

            if (privilegeCheck) {

                result = this.bankService.removeFilterPagination(request, response, this.preloodeAccount);

            } else {

                result.put("response", "You don't have a privilege");

            }

        } else {

            result.put("response", "Your login session wasn't detected");

        }

        return result;

    }


    @RequestMapping(value = "/initialize-data")
    @ResponseBody
    public Map<String, Object> initializeData(@RequestBody Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("result", false);
            }

        };

        if (!this.preloodeAccount.isEmpty()) {

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "bank", "view");

            if (privilegeCheck) {

                result = this.bankService.initializeData(data);

            } else {

                result.put("response", "You don't have a privilege");

            }

        } else {

            result.put("response", "Your login session wasn't detected");

        }

        return result;

    }


    @RequestMapping(value = "/upload-file")
    @ResponseBody
    public Map<String, Object> uploadFile(HttpServletRequest request, MultipartHttpServletRequest multipartRequest) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("result", false);
            }

        };

        if (!this.preloodeAccount.isEmpty()) {

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "bank", "view");

            if (privilegeCheck) {

                result = this.bankService.uploadFile(request, multipartRequest);

            } else {

                result.put("response", "You don't have a privilege");

            }

        } else {

            result.put("response", "Your login session was not detected");

        }

        return result;

    }


    @RequestMapping(value = "/insert")
    @ResponseBody
    public Map<String, Object> insert(HttpServletRequest request, @RequestBody Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("result", false);
            }

        };

        if (!this.preloodeAccount.isEmpty()) {

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "bank", "add");

            if (privilegeCheck) {

                result = this.bankService.insert(request, this.preloodeAccount, data);

            } else {

                result.put("response", "You don't have a privilege");

            }

        } else {

            result.put("response", "Your login session was not detected");

        }

        return result;

    }


    @RequestMapping(value = "/update")
    @ResponseBody
    public Map<String, Object> update(HttpServletRequest request, @RequestBody Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("result", false);
            }

        };

        if (!this.preloodeAccount.isEmpty()) {

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "bank", "edit");

            if (privilegeCheck) {

                result = this.bankService.update(request, this.preloodeAccount, data);

            } else {

                result.put("response", "You don't have a privilege");

            }

        } else {

            result.put("response", "Your login session was not detected");

        }

        return result;

    }


    @RequestMapping(value = "/delete")
    @ResponseBody
    public Map<String, Object> delete(HttpServletRequest request, @RequestBody Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("result", false);
            }

        };

        if (!this.preloodeAccount.isEmpty()) {

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "bank", "delete");

            if (privilegeCheck) {

                result = this.bankService.delete(request, this.preloodeAccount, data);

            } else {

                result.put("response", "You don't have a privilege");

            }

        } else {

            result.put("response", "Your login session was not detected");

        }

        return result;

    }


}
