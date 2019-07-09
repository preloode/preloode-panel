package com.preloode.panel.controller;

import com.preloode.panel.component.*;
import com.preloode.panel.configuration.Setting;
import com.preloode.panel.configuration.Url;
import com.preloode.panel.service.GalleryService;
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
@RequestMapping(value = "/gallery")
public class GalleryController {


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
    private GalleryService galleryService;

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

        return this.head.initialize("Gallery");

    }


    @ModelAttribute("url")
    public Url url() {

        return this.url;

    }


    @RequestMapping(value = "", method = RequestMethod.GET)
    public String index(HttpServletRequest request, Map<String, Object> data) {

        if (this.preloodeAccount.get("result").equals(true)) {

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "gallery", "view");

            if (privilegeCheck) {

                this.page = 1;

                data.put("link", this.galleryService.createPaginationLink(request, this.preloodeAccount, this.page));
                data.put("menu", this.privilege.menu(this.preloodeAccount));
                data.put("page", this.page);
                data.put("pagination", this.galleryService.loadPagination(request, this.preloodeAccount, this.page));

                return "gallery";

            } else {

                return "restricted-access";

            }

        }

        return "redirect:/login/";

    }


    @RequestMapping(value = "/{page:^(?!entry).+}", method = RequestMethod.GET)
    public String page(HttpServletRequest request, @PathVariable("page") String page, Map<String, Object> data) {

        if (this.preloodeAccount.get("result").equals(true)) {

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "gallery", "view");

            if (privilegeCheck) {

                this.page = Integer.parseInt(page.replaceAll("[^0-9]", ""));

                data.put("link", this.galleryService.createPaginationLink(request, this.preloodeAccount, this.page));
                data.put("menu", this.privilege.menu(this.preloodeAccount));
                data.put("page", this.page);
                data.put("pagination", this.galleryService.loadPagination(request, this.preloodeAccount, this.page));

                return "gallery";

            } else {

                return "restricted-access";

            }

        }

        return "redirect:/login/";

    }


    @RequestMapping(value = "/entry", method = RequestMethod.GET)
    public String add(Map<String, Object> data) {

        if (this.preloodeAccount.get("result").equals(true)) {

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "gallery", "add");

            if (privilegeCheck) {

                data.put("menu", this.privilege.menu(this.preloodeAccount));

                return "gallery-entry";

            } else {

                return "restricted-access";

            }

        }

        return "redirect:/login/";

    }


    @RequestMapping(value = "/entry/{id}", method = RequestMethod.GET)
    public String edit(@PathVariable("id") String id, Map<String, Object> data) {

        if (this.preloodeAccount.get("result").equals(true)) {

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "gallery", "edit");

            if (privilegeCheck) {

                data.put("entry", this.galleryService.loadEntry(id.replaceAll("[^A-Za-z0-9]", "")));
                data.put("menu", this.privilege.menu(this.preloodeAccount));

                return "gallery-entry";

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

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "gallery", "view");

            if (privilegeCheck) {

                result = this.galleryService.initializePagination(request, this.preloodeAccount, this.page);

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

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "gallery", "view");

            if (privilegeCheck) {

                result = this.galleryService.filterPagination(response, this.preloodeAccount, data);

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

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "gallery", "view");

            if (privilegeCheck) {

                result = this.galleryService.setPagination(response, this.preloodeAccount, data);

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

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "gallery", "view");

            if (privilegeCheck) {

                result = this.galleryService.removeFilterPagination(request, response, this.preloodeAccount);

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

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "gallery", "view");

            if (privilegeCheck) {

                result = this.galleryService.initializeData(data);

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

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "gallery", "view");

            if (privilegeCheck) {

                result = this.galleryService.uploadFile(request, multipartRequest);

            } else {

                result.put("response", "You don't have a privilege");

            }

        } else {

            result.put("response", "Your login session was not detected");

        }

        return result;

    }


    @RequestMapping(value = "/upload-thumbnail")
    @ResponseBody
    public Map<String, Object> uploadThumbnail(HttpServletRequest request, MultipartHttpServletRequest multipartRequest) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("result", false);
            }

        };

        if (!this.preloodeAccount.isEmpty()) {

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "gallery", "view");

            if (privilegeCheck) {

                result = this.galleryService.uploadThumbnail(request, multipartRequest);

            } else {

                result.put("response", "You don't have a privilege");

            }

        } else {

            result.put("response", "Your login session was not detected");

        }

        return result;

    }


    @RequestMapping(value = "/tinymce-upload")
    @ResponseBody
    public Map<String, Object> tinymceUpload(HttpServletRequest request, MultipartHttpServletRequest multipartRequest) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("result", false);
            }

        };

        if (!this.preloodeAccount.isEmpty()) {

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "gallery", "view");

            if (privilegeCheck) {

                result = this.galleryService.tinymceUploadFile(request, multipartRequest);

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

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "gallery", "add");

            if (privilegeCheck) {

                result = this.galleryService.insert(request, this.preloodeAccount, data);

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

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "gallery", "edit");

            if (privilegeCheck) {

                result = this.galleryService.update(request, this.preloodeAccount, data);

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

            Boolean privilegeCheck = this.privilege.check(this.preloodeAccount, "gallery", "delete");

            if (privilegeCheck) {

                result = this.galleryService.delete(request, this.preloodeAccount, data);

            } else {

                result.put("response", "You don't have a privilege");

            }

        } else {

            result.put("response", "Your login session was not detected");

        }

        return result;

    }


}
