package com.preloode.panel.service;

import com.mongodb.client.MongoCursor;
import com.preloode.panel.component.Filter;
import com.preloode.panel.component.Image;
import com.preloode.panel.component.Pagination;
import com.preloode.panel.configuration.Path;
import com.preloode.panel.repository.PageRepository;
import com.preloode.panel.repository.SliderLogDataRepository;
import com.preloode.panel.repository.SliderRepository;
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
public class SettingSliderService {


    @Autowired
    private Path path;

    @Autowired
    private Pagination pagination;

    @Autowired
    private Filter filter;

    @Autowired
    private Image image;

    @Autowired
    private AdministratorLogService administratorLogService;

    @Autowired
    private PageRepository pageRepository;

    @Autowired
    private SliderLogDataRepository sliderLogDataRepository;

    @Autowired
    private SliderRepository sliderRepository;


    public String createPaginationLink(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_slider");
        String size = this.pagination.load(request, paginationAccount);

        return this.pagination.createLink(request, "/setting/slider", page, Integer.parseInt(size), (this.sliderRepository.count()));

    }


    public Map<String, Object> delete(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Setting slider failed deleted");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> sliderIterator = this.sliderRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (sliderIterator.hasNext()) {

            Map<String, Object> sliderMap = sliderIterator.next();

            Document deleteOneEq = new Document("_id", sliderMap.get("_id"));
            this.sliderRepository.deleteOne(deleteOneEq);

            this.image.delete(request, this.path.getImage() + "/setting/slider", sliderMap.get("file").toString());

            Document insertLogAdministrator = new Document("id", preloodeAccount.get("_id"))
                    .append("username", preloodeAccount.get("username"));
            Document insertLogTarget = new Document("target", new Document("id", sliderMap.get("_id"))
                    .append("name", sliderMap.get("name")));
            this.administratorLogService.insert(request, insertLogAdministrator, "", "Delete setting slider", insertLogTarget);

            result.put("response", "Setting slider successfully deleted");
            result.put("result", true);

        } else {

            result.put("response", "Setting slider doesn't exist");

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
        writeAccount.put("cookie", "preloode_filter_slider");
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
        MongoCursor<Document> sliderIterator = this.sliderRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (sliderIterator.hasNext()) {

            Map<String, Object> sliderMap = sliderIterator.next();

            sliderMap.put("sequence", sliderMap.get("sequence").toString());

            result.put("data", sliderMap);

        }

        findEq = new Document("status", "Active");
        MongoCursor<Document> pageIterator = this.pageRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> pageList = new ArrayList<Object>();

        while (pageIterator.hasNext()) {

            pageList.add(pageIterator.next());

        }

        result.put("page", pageList);
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
        loadAccount.put("cookie", "preloode_filter_slider");
        Map<String, Object> filterMap = this.filter.load(request, loadAccount);

        if (filterMap.containsKey("result")) {

            result.put("filter", filterMap);

        }

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_slider");
        String paginationEntry = this.pagination.load(request, paginationAccount);

        result.put("page", page);
        result.put("pagination", paginationEntry);

        Document findEq = new Document("status", "Active");
        MongoCursor<Document> pageIterator = this.pageRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> pageList = new ArrayList<Object>();

        while (pageIterator.hasNext()) {

            pageList.add(pageIterator.next());

        }

        result.put("page", pageList);
        result.put("result", true);

        return result;

    }


    public Map<String, Object> insert(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Setting slider failed added");
                put("result", false);
            }

        };

        if (data.get("sequence").toString().isEmpty()) {

            data.put("sequence", "0");

        }

        data.put("sequence", new BigDecimal(data.get("sequence").toString().replaceAll("[^0-9.]", "")).setScale(0, BigDecimal.ROUND_CEILING));

        Map<String, Object> validation = new HashMap<String, Object>() {

            {
                put("name", false);
            }

        };

        Document findEq = new Document("name", data.get("name"));
        MongoCursor<Document> sliderValidationIterator = this.sliderRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (!sliderValidationIterator.hasNext()) {

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

            Document insertOneData = data;
            Document insertOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                    .append("username", preloodeAccount.get("username"));
            String sliderInsertId = this.sliderRepository.insertOne(request, insertOneData, insertOneAdministrator);

            Document insertLogTarget = new Document("target", new Document("id", sliderInsertId)
                    .append("name", data.get("name")));
            this.administratorLogService.insert(request, insertOneAdministrator, "", "Add setting slider", insertLogTarget);

            result.put("response", "Setting slider successfully added");
            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> loadEntry(String id) {

        Map<String, Object> result = new HashMap<String, Object>();

        Document findEq = new Document("_id", id);
        MongoCursor<Document> sliderIterator = this.sliderRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (sliderIterator.hasNext()) {

            result = sliderIterator.next();

            result.put("sequence", result.get("sequence").toString());

        }

        return result;

    }


    public MongoCursor<Document> loadPagination(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_slider");
        String size = this.pagination.load(request, paginationAccount);

        Map<String, Object> queryAccount = new HashMap<String, Object>();
        queryAccount.put("id", preloodeAccount.get("_id"));
        queryAccount.put("cookie", "preloode_filter_slider");
        Document filterDocument = this.filter.query(request, queryAccount);

        return this.sliderRepository.findPagination(filterDocument, new Document("created.timestamp", -1), (page - 1), Integer.parseInt(size));

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
        removeAccount.put("cookie", "preloode_filter_slider");
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
        writeAccount.put("cookie", "preloode_pagination_slider");
        Boolean paginationSet = this.pagination.set(response, writeAccount, data.get("pagination").toString());

        if (paginationSet) {

            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> update(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Setting slider failed edited");
                put("result", false);
            }

        };

        if (data.get("sequence").toString().isEmpty()) {

            data.put("sequence", "0");

        }

        data.put("sequence", new BigDecimal(data.get("sequence").toString().replaceAll("[^0-9.]", "")).setScale(0, BigDecimal.ROUND_CEILING));

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> sliderIterator = this.sliderRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (sliderIterator.hasNext()) {

            Map<String, Object> sliderMap = sliderIterator.next();

            Map<String, Object> validation = new HashMap<String, Object>() {

                {
                    put("name", false);
                }

            };

            findEq = new Document("name", data.get("name"));
            Document findNe = new Document("_id", sliderMap.get("_id"));
            MongoCursor<Document> sliderValidationIterator = this.sliderRepository.findEqNeSort(findEq, findNe, new Document("created.timestamp", -1));

            if (!sliderValidationIterator.hasNext()) {

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

                if (!sliderMap.get("file").equals(data.get("file"))) {

                    this.image.delete(request, this.path.getImage() + "/setting/slider", sliderMap.get("file").toString());

                }

                Document updateOneEq = new Document("_id", sliderMap.get("_id"));
                Document updateOneData = data;
                Document updateOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                        .append("username", preloodeAccount.get("username"));
                this.sliderRepository.updateOne(request, updateOneEq, updateOneData, updateOneAdministrator);

                Document logData = (Document) sliderMap;
                logData.put("slider_id", sliderMap.get("_id"));
                logData.remove("_id");
                logData.remove("created");
                logData.remove("modified");
                this.sliderLogDataRepository.insertOne(request, logData, updateOneAdministrator);

                Document insertLogTarget = new Document("target", new Document("id", sliderMap.get("_id"))
                        .append("name", sliderMap.get("name")));
                this.administratorLogService.insert(request, updateOneAdministrator, "", "Edit setting slider", insertLogTarget);

                result.put("response", "Setting slider successfully edited");
                result.put("result", true);

            }

        } else {

            result.put("response", "Setting slider doesn't exist");

        }

        return result;

    }


    public Map<String, Object> uploadFile(HttpServletRequest request, MultipartHttpServletRequest multipartRequest) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "File failed uploaded");
                put("result", false);
            }

        };

        result = this.image.upload(request, multipartRequest, this.path.getImage() + "/setting/slider", 10024);

        if (result.get("result").equals(true)) {

            ArrayList<String> files = (ArrayList<String>) result.get("file");

            for (String string : files) {

                this.image.resize(request, this.path.getImage() + "/setting/slider", string, 1920, 1920);

            }

        }

        return result;

    }


}
