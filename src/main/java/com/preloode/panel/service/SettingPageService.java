package com.preloode.panel.service;

import com.mongodb.client.MongoCursor;
import com.preloode.panel.component.Filter;
import com.preloode.panel.component.Image;
import com.preloode.panel.component.Pagination;
import com.preloode.panel.configuration.Path;
import com.preloode.panel.configuration.Url;
import com.preloode.panel.repository.PageLogDataRepository;
import com.preloode.panel.repository.PageRepository;
import com.preloode.panel.repository.UrlRepository;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class SettingPageService {


    @Autowired
    private Path path;

    @Autowired
    private Url url;

    @Autowired
    private Pagination pagination;

    @Autowired
    private Filter filter;

    @Autowired
    private Image image;

    @Autowired
    private AdministratorLogService administratorLogService;

    @Autowired
    private PageLogDataRepository pageLogDataRepository;

    @Autowired
    private PageRepository pageRepository;

    @Autowired
    private UrlRepository urlRepository;


    public String createPaginationLink(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_page");
        String size = this.pagination.load(request, paginationAccount);

        return this.pagination.createLink(request, "/setting/page", page, Integer.parseInt(size), (this.pageRepository.count()));

    }


    public Map<String, Object> delete(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Setting page failed deleted");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> pageIterator = this.pageRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (pageIterator.hasNext()) {

            Map<String, Object> pageMap = pageIterator.next();

            Document deleteOneEq = new Document("_id", pageMap.get("_id"));
            this.pageRepository.deleteOne(deleteOneEq);

            String[] content = pageMap.get("content").toString().split("src=\"");

            for (String string : content) {

                if (string.contains(this.path.getImage())) {

                    String[] path = string.split("\"");
                    String[] image = path[0].split(this.path.getImage() + "/blog/tinymce/");

                    if (image.length == 2) {

                        this.image.delete(request, this.path.getImage() + "/blog/tinymce", image[1]);

                    }

                }

            }

            Document insertLogAdministrator = new Document("id", preloodeAccount.get("_id"))
                    .append("username", preloodeAccount.get("username"));
            Document insertLogTarget = new Document("target", new Document("id", pageMap.get("_id"))
                    .append("name", pageMap.get("name")));
            this.administratorLogService.insert(request, insertLogAdministrator, "", "Delete setting page", insertLogTarget);

            result.put("response", "Setting page successfully deleted");
            result.put("result", true);

        } else {

            result.put("response", "Setting page doesn't exist");

        }

        return result;

    }


    public Map<String, Object> filterPagination(HttpServletResponse response, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Pagination failed filtered");
                put("result", false);
            }

        };

        Map<String, Object> writeAccount = new HashMap<String, Object>();
        writeAccount.put("id", preloodeAccount.get("_id"));
        writeAccount.put("cookie", "preloode_filter_page");
        Boolean filterWrite = this.filter.write(response, writeAccount, data);

        if (filterWrite) {

            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> initializeData(Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Data failed initialized");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> pageIterator = this.pageRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (pageIterator.hasNext()) {

            Map<String, Object> pageMap = pageIterator.next();

            pageMap.put("sequence", pageMap.get("sequence").toString());

            result.put("data", pageMap);

        }

        findEq = new Document("status", "Active");
        MongoCursor<Document> urlIterator = this.urlRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> urlList = new ArrayList<Object>();

        while (urlIterator.hasNext()) {

            urlList.add(urlIterator.next());

        }

        result.put("url", urlList);
        result.put("result", true);

        return result;

    }


    public Map<String, Object> initializePagination(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Pagination failed initialized");
                put("result", false);
            }

        };

        Map<String, Object> loadAccount = new HashMap<String, Object>();
        loadAccount.put("id", preloodeAccount.get("_id"));
        loadAccount.put("cookie", "preloode_filter_page");
        Map<String, Object> filterMap = this.filter.load(request, loadAccount);

        if (filterMap.containsKey("result")) {

            result.put("filter", filterMap);

        }

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_page");
        String paginationEntry = this.pagination.load(request, paginationAccount);

        result.put("page", page);
        result.put("pagination", paginationEntry);
        result.put("result", true);

        return result;

    }


    public Map<String, Object> insert(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Setting page failed added");
                put("result", false);
            }

        };

        if (data.get("sequence").toString().isEmpty()) {

            data.put("sequence", "0");

        }

        data.put("sequence", new BigDecimal(data.get("sequence").toString().replaceAll("[^0-9.]", "")).setScale(0, BigDecimal.ROUND_CEILING));

        data.put("url", data.get("url").toString().replaceAll("[^A-Za-z0-9- ]", ""));

        if (data.get("url").toString().isEmpty()) {

            data.put("url", data.get("name").toString().replaceAll("[^A-Za-z0-9- ]", ""));
            data.put("url", data.get("url").toString().replaceAll(" ", "-"));
            data.put("url", data.get("url").toString().toLowerCase());

        }

        Map<String, Object> validation = new HashMap<String, Object>() {

            {
                put("name", false);
            }

        };

        Document findEq = new Document("name", data.get("name"));
        MongoCursor<Document> pageValidationIterator = this.pageRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (!pageValidationIterator.hasNext()) {

            validation.put("name", true);

        } else {

            result.put("response", "Name already exist");

        }

        Boolean valid = true;

        for (Map.Entry<String, Object> map : validation.entrySet()) {

            if (map.getValue().equals(false)) {

                valid = false;

                break;

            }

        }

        if (valid) {

            findEq = new Document("url", data.get("url"));
            MongoCursor<Document> settingPageIterator = this.pageRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            Integer i = 1;
            String url = data.get("url").toString();

            while (settingPageIterator.hasNext()) {

                url = data.get("url").toString();

                if (data.get("url").toString().substring(data.get("url").toString().length() - 1).equals("/")) {

                    url = data.get("url").toString().substring(0, data.get("url").toString().length() - 1);

                }

                url = url + "-" + i;

                findEq = new Document("url", url);
                settingPageIterator = this.pageRepository.findEqSort(findEq, new Document("created.timestamp", -1));

                i++;

            }

            data.put("url", url);

            Document insertOneData = data;
            Document insertOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                    .append("username", preloodeAccount.get("username"));
            String blogInsertId = this.pageRepository.insertOne(request, insertOneData, insertOneAdministrator);

            Document insertLogTarget = new Document("target", new Document("id", blogInsertId)
                    .append("name", data.get("name")));
            this.administratorLogService.insert(request, insertOneAdministrator, "", "Add setting page", insertLogTarget);

            result.put("response", "Setting page successfully added");
            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> loadEntry(String id) {

        Map<String, Object> result = new HashMap<String, Object>();

        Document findEq = new Document("_id", id);
        MongoCursor<Document> pageIterator = this.pageRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (pageIterator.hasNext()) {

            result = pageIterator.next();

            result.put("sequence", result.get("sequence").toString());

        }

        return result;

    }


    public MongoCursor<Document> loadPagination(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_page");
        String size = this.pagination.load(request, paginationAccount);

        Map<String, Object> queryAccount = new HashMap<String, Object>();
        queryAccount.put("id", preloodeAccount.get("_id"));
        queryAccount.put("cookie", "preloode_filter_page");
        Document filterDocument = this.filter.query(request, queryAccount);

        return this.pageRepository.findPagination(filterDocument, new Document("created.timestamp", -1), (page - 1), Integer.parseInt(size));

    }


    public Map<String, Object> removeFilterPagination(HttpServletRequest request, HttpServletResponse response, Map<String, Object> preloodeAccount) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Filter failed removed");
                put("result", false);
            }

        };

        Map<String, Object> removeAccount = new HashMap<String, Object>();
        removeAccount.put("id", preloodeAccount.get("_id"));
        removeAccount.put("cookie", "preloode_filter_page");
        Boolean filterRemove = this.filter.remove(request, response, removeAccount);

        if (filterRemove) {

            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> setPagination(HttpServletResponse response, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Pagination failed set");
                put("result", false);
            }

        };

        Map<String, Object> writeAccount = new HashMap<String, Object>();
        writeAccount.put("id", preloodeAccount.get("_id"));
        writeAccount.put("cookie", "preloode_pagination_page");
        Boolean paginationSet = this.pagination.set(response, writeAccount, data.get("pagination").toString());

        if (paginationSet) {

            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> tinymceUploadFile(HttpServletRequest request, MultipartHttpServletRequest multipartRequest) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("location", "");
            }

        };

        Map<String, Object> tinymceUpload = this.image.upload(request, multipartRequest, this.path.getImage() + "/setting/page/tinymce", 10024);

        if (tinymceUpload.get("result").equals(true)) {

            ArrayList<String> files = (ArrayList<String>) tinymceUpload.get("file");

            for (String string : files) {

                this.image.resize(request, this.path.getImage() + "/setting/page/tinymce", string, 1920, 1920);

                result.put("location", this.url.getImage() + "/setting/page/tinymce/" + string);

            }

        }

        return result;

    }


    public Map<String, Object> update(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Setting page failed edited");
                put("result", false);
            }

        };

        if (data.get("sequence").toString().isEmpty()) {

            data.put("sequence", "0");

        }

        data.put("sequence", new BigDecimal(data.get("sequence").toString().replaceAll("[^0-9.]", "")).setScale(0, BigDecimal.ROUND_CEILING));

        if (data.get("url").toString().isEmpty()) {

            data.put("url", data.get("name").toString().replaceAll("[^A-Za-z0-9 ]", ""));
            data.put("url", data.get("url").toString().replaceAll("[ ]", "-").toLowerCase());

        }

        if (!data.get("url").toString().substring(data.get("url").toString().length() - 1).equals("/")) {

            data.put("url", data.get("url").toString() + "/");

        }

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> pageIterator = this.pageRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (pageIterator.hasNext()) {

            Map<String, Object> pageMap = pageIterator.next();

            Map<String, Object> validation = new HashMap<String, Object>() {

                {
                    put("name", false);
                }

            };

            findEq = new Document("name", data.get("name"));
            Document findNe = new Document("_id", pageMap.get("_id"));
            MongoCursor<Document> pageValidationIterator = this.pageRepository.findEqNeSort(findEq, findNe, new Document("created.timestamp", -1));

            if (!pageValidationIterator.hasNext()) {

                validation.put("name", true);

            } else {

                result.put("response", "Name already exist");

            }

            Boolean valid = true;

            for (Map.Entry<String, Object> map : validation.entrySet()) {

                if (map.getValue().equals(false)) {

                    valid = false;

                    break;

                }

            }

            if (valid) {

                Document updateOneEq = new Document("_id", pageMap.get("_id"));
                Document updateOneData = data;
                Document updateOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                        .append("username", preloodeAccount.get("username"));
                this.pageRepository.updateOne(request, updateOneEq, updateOneData, updateOneAdministrator);

                Document logData = (Document) pageMap;
                logData.put("page_id", pageMap.get("_id"));
                logData.remove("_id");
                logData.remove("created");
                logData.remove("modified");
                this.pageLogDataRepository.insertOne(request, logData, updateOneAdministrator);

                Document insertLogTarget = new Document("target", new Document("id", pageMap.get("_id"))
                        .append("name", pageMap.get("name")));
                this.administratorLogService.insert(request, updateOneAdministrator, "", "Edit setting page", insertLogTarget);

                result.put("response", "Setting page successfully edited");
                result.put("result", true);

            }

        } else {

            result.put("response", "Setting page doesn't exist");

        }

        return result;

    }


}
