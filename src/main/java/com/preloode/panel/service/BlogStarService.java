package com.preloode.panel.service;

import com.mongodb.client.MongoCursor;
import com.preloode.panel.component.Filter;
import com.preloode.panel.component.Image;
import com.preloode.panel.component.Pagination;
import com.preloode.panel.configuration.Path;
import com.preloode.panel.configuration.Url;
import com.preloode.panel.repository.BlogStarLogDataRepository;
import com.preloode.panel.repository.BlogStarRepository;
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
public class BlogStarService {


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
    private BlogStarLogDataRepository blogStarLogDataRepository;

    @Autowired
    private BlogStarRepository blogStarRepository;


    public String createPaginationLink(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_blog_star");
        String size = this.pagination.load(request, paginationAccount);

        return this.pagination.createLink(request, "/blog/star", page, Integer.parseInt(size), (this.blogStarRepository.count()));

    }


    public Map<String, Object> delete(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Blog star failed deleted");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> blogStarIterator = this.blogStarRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (blogStarIterator.hasNext()) {

            Map<String, Object> blogStarMap = blogStarIterator.next();

            Document deleteOneEq = new Document("_id", blogStarMap.get("_id"));
            this.blogStarRepository.deleteOne(deleteOneEq);

            this.image.delete(request, this.path.getImage() + "/blog/star", blogStarMap.get("file").toString());
            this.image.delete(request, this.path.getImage() + "/blog/star/thumbnail", blogStarMap.get("thumbnail").toString());

            String[] content = blogStarMap.get("content").toString().split("src=\"");

            for (String string : content) {

                if (string.contains(this.path.getImage())) {

                    String[] path = string.split("\"");
                    String[] image = path[0].split(this.path.getImage() + "/blog/star/tinymce/");

                    if (image.length == 2) {

                        this.image.delete(request, this.path.getImage() + "/blog/star/tinymce", image[1]);

                    }

                }

            }

            String[] description = blogStarMap.get("description").toString().split("src=\"");

            for (String string : description) {

                if (string.contains(this.path.getImage())) {

                    String[] path = string.split("\"");
                    String[] image = path[0].split(this.path.getImage() + "/blog/star/tinymce/");

                    if (image.length == 2) {

                        this.image.delete(request, this.path.getImage() + "/blog/star/tinymce", image[1]);

                    }

                }

            }

            Document insertLogAdministrator = new Document("id", preloodeAccount.get("_id"))
                    .append("username", preloodeAccount.get("username"));
            Document insertLogTarget = new Document("target", new Document("id", blogStarMap.get("_id"))
                    .append("name", blogStarMap.get("name")));
            this.administratorLogService.insert(request, insertLogAdministrator, "", "Delete blog star", insertLogTarget);

            result.put("response", "Blog star successfully deleted");
            result.put("result", true);

        } else {

            result.put("response", "Blog star doesn't exist");

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
        writeAccount.put("cookie", "preloode_filter_blog_star");
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
        MongoCursor<Document> blogStarIterator = this.blogStarRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (blogStarIterator.hasNext()) {

            Map<String, Object> blogStarMap = blogStarIterator.next();

            Map<String, Object> blogStarRateMap = (Map<String, Object>) blogStarMap.get("rate");

            blogStarRateMap.put("amount", blogStarRateMap.get("amount").toString());
            blogStarRateMap.put("contributor", blogStarRateMap.get("contributor").toString());

            blogStarMap.put("rate", blogStarRateMap);

            blogStarMap.put("sequence", blogStarMap.get("sequence").toString());

            result.put("data", blogStarMap);

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
        loadAccount.put("cookie", "preloode_filter_blog_star");
        Map<String, Object> filterMap = this.filter.load(request, loadAccount);

        if (filterMap.containsKey("result")) {

            result.put("filter", filterMap);

        }

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_blog_star");
        String paginationEntry = this.pagination.load(request, paginationAccount);

        result.put("page", page);
        result.put("pagination", paginationEntry);
        result.put("result", true);

        return result;

    }


    public Map<String, Object> insert(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Blog star failed added");
                put("result", false);
            }

        };

        Map<String, Object> dataRateMap = (Map<String, Object>) data.get("rate");

        if (dataRateMap.get("amount").toString().isEmpty()) {

            dataRateMap.put("amount", "0");

        }

        dataRateMap.put("amount", new BigDecimal(dataRateMap.get("amount").toString().replaceAll("[^0-9.]", "")).setScale(0, BigDecimal.ROUND_CEILING));

        if (dataRateMap.get("contributor").toString().isEmpty()) {

            dataRateMap.put("contributor", "0");

        }

        dataRateMap.put("contributor", new BigDecimal(dataRateMap.get("contributor").toString().replaceAll("[^0-9.]", "")).setScale(0, BigDecimal.ROUND_CEILING));

        data.put("rate", dataRateMap);

        if (data.get("sequence").toString().isEmpty()) {

            data.put("sequence", "0");

        }

        data.put("sequence", new BigDecimal(data.get("sequence").toString().replaceAll("[^0-9.]", "")).setScale(0, BigDecimal.ROUND_CEILING));

        if (data.get("url").toString().isEmpty()) {

            data.put("url", data.get("name").toString().replaceAll("[^A-Za-z0-9- ]", ""));
            data.put("url", data.get("url").toString().replaceAll(" ", "-"));
            data.put("url", data.get("url").toString().toLowerCase());

        }

        Map<String, Object> dataViewMap = new HashMap<String, Object>() {

            {
                put("raw", new BigDecimal("0"));
                put("unique", new BigDecimal("0"));
            }

        };

        data.put("view", dataViewMap);

        Map<String, Object> validation = new HashMap<String, Object>() {

            {
                put("name", false);
            }

        };

        Document findEq = new Document("name", data.get("name"));
        MongoCursor<Document> blogStarValidationIterator = this.blogStarRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (!blogStarValidationIterator.hasNext()) {

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
            MongoCursor<Document> blogStarUrlIterator = this.blogStarRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            Integer i = 1;
            String url = data.get("url").toString();

            while (blogStarUrlIterator.hasNext()) {

                url = data.get("url").toString();

                if (data.get("url").toString().substring(data.get("url").toString().length() - 1).equals("/")) {

                    url = data.get("url").toString().substring(0, data.get("url").toString().length() - 1);

                }

                url = url + "-" + i + "/";

                findEq = new Document("url", url);
                blogStarUrlIterator = this.blogStarRepository.findEqSort(findEq, new Document("created.timestamp", -1));

                i++;

            }

            data.put("url", url);

            data.put("path", url);

            Document insertOneData = data;
            Document insertOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                    .append("username", preloodeAccount.get("username"));
            String blogStarInsertId = this.blogStarRepository.insertOne(request, insertOneData, insertOneAdministrator);

            Document insertLogTarget = new Document("target", new Document("id", blogStarInsertId)
                    .append("name", data.get("name")));
            this.administratorLogService.insert(request, insertOneAdministrator, "", "Add blog star", insertLogTarget);

            result.put("response", "Blog star successfully added");
            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> loadEntry(String id) {

        Map<String, Object> result = new HashMap<String, Object>();

        Document findEq = new Document("_id", id);
        MongoCursor<Document> blogIterator = this.blogStarRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (blogIterator.hasNext()) {

            result = blogIterator.next();

            Map<String, Object> resultRateMap = (Map<String, Object>) result.get("rate");

            resultRateMap.put("amount", resultRateMap.get("amount").toString());
            resultRateMap.put("contributor", resultRateMap.get("contributor").toString());

            result.put("rate", resultRateMap);

            result.put("sequence", result.get("sequence").toString());

        }

        return result;

    }


    public MongoCursor<Document> loadPagination(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_blog_star");
        String size = this.pagination.load(request, paginationAccount);

        Map<String, Object> queryAccount = new HashMap<String, Object>();
        queryAccount.put("id", preloodeAccount.get("_id"));
        queryAccount.put("cookie", "preloode_filter_blog_star");
        Document filterDocument = this.filter.query(request, queryAccount);

        return this.blogStarRepository.findPagination(filterDocument, new Document("created.timestamp", -1), (page - 1), Integer.parseInt(size));

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
        removeAccount.put("cookie", "preloode_filter_blog_star");
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
        writeAccount.put("cookie", "preloode_pagination_blog_star");
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

        Map<String, Object> tinymceUpload = this.image.upload(request, multipartRequest, this.path.getImage() + "/blog/star/tinymce", 10024);

        if (tinymceUpload.get("result").equals(true)) {

            ArrayList<String> files = (ArrayList<String>) tinymceUpload.get("file");

            for (String string : files) {

                this.image.resize(request, this.path.getImage() + "/blog/star/tinymce", string, 1920, 1920);

                result.put("location", this.url.getImage() + "/blog/star/tinymce/" + string);

            }

        }

        return result;

    }


    public Map<String, Object> update(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Blog star failed edited");
                put("result", false);
            }

        };

        Map<String, Object> dataRateMap = (Map<String, Object>) data.get("rate");

        if (dataRateMap.get("amount").toString().isEmpty()) {

            dataRateMap.put("amount", "0");

        }

        dataRateMap.put("amount", new BigDecimal(dataRateMap.get("amount").toString().replaceAll("[^0-9.]", "")).setScale(0, BigDecimal.ROUND_CEILING));

        if (dataRateMap.get("contributor").toString().isEmpty()) {

            dataRateMap.put("contributor", "0");

        }

        dataRateMap.put("contributor", new BigDecimal(dataRateMap.get("contributor").toString().replaceAll("[^0-9.]", "")).setScale(0, BigDecimal.ROUND_CEILING));

        data.put("rate", dataRateMap);

        if (data.get("sequence").toString().isEmpty()) {

            data.put("sequence", "0");

        }

        data.put("sequence", new BigDecimal(data.get("sequence").toString().replaceAll("[^0-9.]", "")).setScale(0, BigDecimal.ROUND_CEILING));

        if (data.get("url").toString().isEmpty()) {

            data.put("url", data.get("title").toString().replaceAll("[^A-Za-z0-9- ]", ""));
            data.put("url", data.get("url").toString().replaceAll(" ", "-"));
            data.put("url", data.get("url").toString().toLowerCase());

        }

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> blogStarIterator = this.blogStarRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (blogStarIterator.hasNext()) {

            Map<String, Object> blogStarMap = blogStarIterator.next();

            Map<String, Object> validation = new HashMap<String, Object>() {

                {
                    put("name", false);
                }

            };

            findEq = new Document("name", data.get("name"));
            Document findNe = new Document("_id", blogStarMap.get("_id"));
            MongoCursor<Document> blogStarValidationIterator = this.blogStarRepository.findEqNeSort(findEq, findNe, new Document("created.timestamp", -1));

            if (!blogStarValidationIterator.hasNext()) {

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
                findNe = new Document("_id", blogStarMap.get("_id"));
                MongoCursor<Document> blogStarUrlIterator = this.blogStarRepository.findEqNeSort(findEq, findNe, new Document("created.timestamp", -1));

                Integer i = 1;
                String url = data.get("url").toString();

                while (blogStarUrlIterator.hasNext()) {

                    url = data.get("url").toString();

                    if (data.get("url").toString().substring(data.get("url").toString().length() - 1).equals("/")) {

                        url = data.get("url").toString().substring(0, data.get("url").toString().length() - 1);

                    }

                    url = url + "-" + i + "/";

                    findEq = new Document("url", url);
                    blogStarUrlIterator = this.blogStarRepository.findEqNeSort(findEq, findNe, new Document("created.timestamp", -1));

                    i++;

                }

                data.put("url", url);

                data.put("path", url);

                if (!blogStarMap.get("file").equals(data.get("file"))) {

                    this.image.delete(request, this.path.getImage() + "/blog/star", blogStarMap.get("file").toString());

                }

                Document updateOneEq = new Document("_id", blogStarMap.get("_id"));
                Document updateOneData = data;
                Document updateOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                        .append("username", preloodeAccount.get("username"));
                this.blogStarRepository.updateOne(request, updateOneEq, updateOneData, updateOneAdministrator);

                Document logData = (Document) blogStarMap;
                logData.put("blog_star_id", blogStarMap.get("_id"));
                logData.remove("_id");
                logData.remove("created");
                logData.remove("modified");
                this.blogStarLogDataRepository.insertOne(request, logData, updateOneAdministrator);

                Document insertLogTarget = new Document("target", new Document("id", blogStarMap.get("_id"))
                        .append("name", blogStarMap.get("name")));
                this.administratorLogService.insert(request, updateOneAdministrator, "", "Edit blog star", insertLogTarget);

                result.put("response", "Blog star successfully edited");
                result.put("result", true);

            }

        } else {

            result.put("response", "Blog star doesn't exist");

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

        result = this.image.upload(request, multipartRequest, this.path.getImage() + "/blog/star", 10024);

        if (result.get("result").equals(true)) {

            ArrayList<String> files = (ArrayList<String>) result.get("file");

            for (String string : files) {

                this.image.resize(request, this.path.getImage() + "/blog/star", string, 1920, 1920);

            }

        }

        return result;

    }


    public Map<String, Object> uploadThumbnail(HttpServletRequest request, MultipartHttpServletRequest multipartRequest) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Thumbnail failed uploaded");
                put("result", false);
            }

        };

        result = this.image.upload(request, multipartRequest, this.path.getImage() + "/blog/star/thumbnail", 10024);

        if (result.get("result").equals(true)) {

            ArrayList<String> files = (ArrayList<String>) result.get("file");

            for (String string : files) {

                this.image.resize(request, this.path.getImage() + "/blog/star/thumbnail", string, 1920, 1920);

            }

        }

        return result;

    }


}
