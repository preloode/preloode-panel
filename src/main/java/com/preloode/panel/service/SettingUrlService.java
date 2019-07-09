package com.preloode.panel.service;

import com.mongodb.client.MongoCursor;
import com.preloode.panel.component.Filter;
import com.preloode.panel.component.Pagination;
import com.preloode.panel.repository.UrlLogDataRepository;
import com.preloode.panel.repository.UrlRepository;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Service
public class SettingUrlService {


    @Autowired
    private Pagination pagination;

    @Autowired
    private Filter filter;

    @Autowired
    private AdministratorLogService administratorLogService;

    @Autowired
    private UrlLogDataRepository urlLogDataRepository;

    @Autowired
    private UrlRepository urlRepository;


    public String createPaginationLink(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_url");
        String size = this.pagination.load(request, paginationAccount);

        return this.pagination.createLink(request, "/setting/url", page, Integer.parseInt(size), (this.urlRepository.count()));

    }


    public Map<String, Object> delete(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Setting URL failed deleted");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> urlIterator = this.urlRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (urlIterator.hasNext()) {

            Map<String, Object> urlMap = urlIterator.next();

            Document deleteOneEq = new Document("_id", urlMap.get("_id"));
            this.urlRepository.deleteOne(deleteOneEq);

            Document insertLogAdministrator = new Document("id", preloodeAccount.get("_id"))
                    .append("username", preloodeAccount.get("username"));
            Document insertLogTarget = new Document("target", new Document("id", urlMap.get("_id"))
                    .append("name", urlMap.get("name")));
            this.administratorLogService.insert(request, insertLogAdministrator, "", "Delete setting URL", insertLogTarget);

            result.put("response", "Setting URL successfully deleted");
            result.put("result", true);

        } else {

            result.put("response", "Setting URL doesn't exist");

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
        writeAccount.put("cookie", "preloode_filter_url");
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
        MongoCursor<Document> urlIterator = this.urlRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (urlIterator.hasNext()) {

            Map<String, Object> urlMap = urlIterator.next();

            urlMap.put("sequence", urlMap.get("sequence").toString());

            result.put("data", urlMap);

        }

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
        loadAccount.put("cookie", "preloode_filter_url");
        Map<String, Object> filterMap = this.filter.load(request, loadAccount);

        if (filterMap.containsKey("result")) {

            result.put("filter", filterMap);

        }

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_url");
        String paginationEntry = this.pagination.load(request, paginationAccount);

        result.put("page", page);
        result.put("pagination", paginationEntry);
        result.put("result", true);

        return result;

    }


    public Map<String, Object> insert(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Setting URL failed added");
                put("result", false);
            }

        };

        if (data.get("sequence").toString().isEmpty()) {

            data.put("sequence", "0");

        }

        data.put("sequence", new BigDecimal(data.get("sequence").toString().replaceAll("[^0-9.]", "")).setScale(0, BigDecimal.ROUND_CEILING));

        data.put("url", data.get("url").toString().replaceAll("[^A-Za-z0-9-_.]", ""));

        if (data.get("url").toString().substring(data.get("url").toString().length() - 1).equals("/")) {

            data.put("url", data.get("url").toString().substring(0, data.get("url").toString().length() - 1));

        }

        Map<String, Object> validation = new HashMap<String, Object>() {

            {
                put("name", false);
                put("url", false);
            }

        };

        Document findEq = new Document("name", data.get("name"));
        MongoCursor<Document> urlValidationIterator = this.urlRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (!urlValidationIterator.hasNext()) {

            validation.put("name", true);

        } else {

            result.put("response", "Name already exist");

        }

        findEq = new Document("url", data.get("url"));
        urlValidationIterator = this.urlRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (!urlValidationIterator.hasNext()) {

            validation.put("url", true);

        } else {

            result.put("response", "URL already exist");

        }

        Boolean valid = true;

        for (Map.Entry<String, Object> map : validation.entrySet()) {

            if (map.getValue().equals(false)) {

                valid = false;

                break;

            }

        }

        if (valid) {

            Document insertOneData = data;
            Document insertOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                    .append("username", preloodeAccount.get("username"));
            String urlInsertId = this.urlRepository.insertOne(request, insertOneData, insertOneAdministrator);

            Document insertLogTarget = new Document("target", new Document("id", urlInsertId)
                    .append("name", data.get("name")));
            this.administratorLogService.insert(request, insertOneAdministrator, "", "Add setting URL", insertLogTarget);

            result.put("response", "Setting URL successfully added");
            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> loadEntry(String id) {

        Map<String, Object> result = new HashMap<String, Object>();

        Document findEq = new Document("_id", id);
        MongoCursor<Document> urlIterator = this.urlRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (urlIterator.hasNext()) {

            result = urlIterator.next();

        }

        return result;

    }


    public MongoCursor<Document> loadPagination(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_url");
        String size = this.pagination.load(request, paginationAccount);

        Map<String, Object> queryAccount = new HashMap<String, Object>();
        queryAccount.put("id", preloodeAccount.get("_id"));
        queryAccount.put("cookie", "preloode_filter_url");
        Document filterDocument = this.filter.query(request, queryAccount);

        return this.urlRepository.findPagination(filterDocument, new Document("created.timestamp", -1), (page - 1), Integer.parseInt(size));

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
        removeAccount.put("cookie", "preloode_filter_url");
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
        writeAccount.put("cookie", "preloode_pagination_url");
        Boolean paginationSet = this.pagination.set(response, writeAccount, data.get("pagination").toString());

        if (paginationSet) {

            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> update(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Setting URL failed edited");
                put("result", false);
            }

        };

        if (data.get("sequence").toString().isEmpty()) {

            data.put("sequence", "0");

        }

        data.put("sequence", new BigDecimal(data.get("sequence").toString().replaceAll("[^0-9.]", "")).setScale(0, BigDecimal.ROUND_CEILING));

        data.put("url", data.get("url").toString().replaceAll("[^A-Za-z0-9-_.]", ""));

        if (data.get("url").toString().substring(data.get("url").toString().length() - 1).equals("/")) {

            data.put("url", data.get("url").toString().substring(0, data.get("url").toString().length() - 1));

        }

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> urlIterator = this.urlRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (urlIterator.hasNext()) {

            Map<String, Object> urlMap = urlIterator.next();

            Map<String, Object> validation = new HashMap<String, Object>() {

                {
                    put("name", false);
                    put("url", false);
                }

            };

            findEq = new Document("name", data.get("name"));
            Document findNe = new Document("_id", urlMap.get("_id"));
            MongoCursor<Document> urlValidationIterator = this.urlRepository.findEqNeSort(findEq, findNe, new Document("created.timestamp", -1));

            if (!urlValidationIterator.hasNext()) {

                validation.put("name", true);

            } else {

                result.put("response", "Name already exist");

            }

            findEq = new Document("url", data.get("url"));
            urlValidationIterator = this.urlRepository.findEqNeSort(findEq, findNe, new Document("created.timestamp", -1));

            if (!urlValidationIterator.hasNext()) {

                validation.put("url", true);

            } else {

                result.put("response", "URL already exist");

            }

            Boolean valid = true;

            for (Map.Entry<String, Object> map : validation.entrySet()) {

                if (map.getValue().equals(false)) {

                    valid = false;

                    break;

                }

            }

            if (valid) {

                Document updateOneEq = new Document("_id", urlMap.get("_id"));
                Document updateOneData = data;
                Document updateOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                        .append("username", preloodeAccount.get("username"));
                this.urlRepository.updateOne(request, updateOneEq, updateOneData, updateOneAdministrator);

                Document logData = (Document) urlMap;
                logData.put("blog_id", urlMap.get("_id"));
                logData.remove("_id");
                logData.remove("created");
                logData.remove("modified");
                this.urlLogDataRepository.insertOne(request, logData, updateOneAdministrator);

                Document insertLogTarget = new Document("target", new Document("id", urlMap.get("_id"))
                        .append("name", urlMap.get("name")));
                this.administratorLogService.insert(request, updateOneAdministrator, "", "Edit setting URL", insertLogTarget);

                result.put("response", "Setting URL successfully edited");
                result.put("result", true);

            }

        } else {

            result.put("response", "Setting URL doesn't exist");

        }

        return result;

    }


}
