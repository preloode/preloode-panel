package com.preloode.panel.service;

import com.mongodb.client.MongoCursor;
import com.preloode.panel.component.Filter;
import com.preloode.panel.component.Image;
import com.preloode.panel.component.Pagination;
import com.preloode.panel.configuration.Path;
import com.preloode.panel.configuration.Url;
import com.preloode.panel.repository.BlogCategoryRepository;
import com.preloode.panel.repository.BlogLogDataRepository;
import com.preloode.panel.repository.BlogRepository;
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
public class BlogService {


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
    private BlogCategoryRepository blogCategoryRepository;

    @Autowired
    private BlogLogDataRepository blogLogDataRepository;

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private BlogStarRepository blogStarRepository;


    public String createPaginationLink(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_blog");
        String size = this.pagination.load(request, paginationAccount);

        return this.pagination.createLink(request, "/blog", page, Integer.parseInt(size), (this.blogRepository.count()));

    }


    public Map<String, Object> delete(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Blog failed deleted");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> blogIterator = this.blogRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (blogIterator.hasNext()) {

            Map<String, Object> blogMap = blogIterator.next();

            Document deleteOneEq = new Document("_id", blogMap.get("_id"));
            this.blogRepository.deleteOne(deleteOneEq);

            this.image.delete(request, this.path.getImage() + "/blog", blogMap.get("file").toString());
            this.image.delete(request, this.path.getImage() + "/blog/thumbnail", blogMap.get("thumbnail").toString());

            String[] content = blogMap.get("content").toString().split("src=\"");

            for (String string : content) {

                if (string.contains(this.path.getImage())) {

                    String[] path = string.split("\"");
                    String[] image = path[0].split(this.path.getImage() + "/blog/tinymce/");

                    if (image.length == 2) {

                        this.image.delete(request, this.path.getImage() + "/blog/tinymce", image[1]);

                    }

                }

            }

            String[] description = blogMap.get("description").toString().split("src=\"");

            for (String string : description) {

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
            Document insertLogTarget = new Document("target", new Document("id", blogMap.get("_id"))
                    .append("name", blogMap.get("name")));
            this.administratorLogService.insert(request, insertLogAdministrator, "", "Delete blog", insertLogTarget);

            result.put("response", "Blog successfully deleted");
            result.put("result", true);

        } else {

            result.put("response", "Blog doesn't exist");

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
        writeAccount.put("cookie", "preloode_filter_blog");
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
        MongoCursor<Document> blogIterator = this.blogRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (blogIterator.hasNext()) {

            Map<String, Object> blogMap = blogIterator.next();

            Map<String, Object> blogRateMap = (Map<String, Object>) blogMap.get("rate");

            blogRateMap.put("amount", blogRateMap.get("amount").toString());

            Map<String, Object> blogRateContributorMap = (Map<String, Object>) blogRateMap.get("contributor");

            blogRateContributorMap.put("amount", blogRateContributorMap.get("amount").toString());

            blogRateMap.put("contributor", blogRateContributorMap);

            blogMap.put("rate", blogRateMap);

            blogMap.put("sequence", blogMap.get("sequence").toString());

            result.put("data", blogMap);

        }

        findEq = new Document("status", "Active");
        MongoCursor<Document> blogCategoryIterator = this.blogCategoryRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> blogCategoryList = new ArrayList<Object>();

        while (blogCategoryIterator.hasNext()) {

            blogCategoryList.add(blogCategoryIterator.next());

        }

        result.put("category", blogCategoryList);

        findEq = new Document("status", "Active");
        MongoCursor<Document> blogStarIterator = this.blogStarRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> blogStarList = new ArrayList<Object>();

        while (blogStarIterator.hasNext()) {

            blogStarList.add(blogStarIterator.next());

        }

        result.put("star", blogStarList);
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
        loadAccount.put("cookie", "preloode_filter_blog");
        Map<String, Object> filterMap = this.filter.load(request, loadAccount);

        if (filterMap.containsKey("result")) {

            result.put("filter", filterMap);

        }

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_blog");
        String paginationEntry = this.pagination.load(request, paginationAccount);

        result.put("page", page);
        result.put("pagination", paginationEntry);

        Document findEq = new Document("status", "Active");
        MongoCursor<Document> blogCategoryIterator = this.blogCategoryRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> blogCategoryList = new ArrayList<Object>();

        while (blogCategoryIterator.hasNext()) {

            blogCategoryList.add(blogCategoryIterator.next());

        }

        result.put("category", blogCategoryList);
        result.put("result", true);

        return result;

    }


    public Map<String, Object> insert(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Blog failed added");
                put("result", false);
            }

        };

        Map<String, Object> categoryDataMap = (Map<String, Object>) data.get("category");

        ArrayList<String> categoryIdDataList = (ArrayList<String>) categoryDataMap.get("id");

        data.put("dislike", BigDecimal.ZERO);

        data.put("like", BigDecimal.ZERO);

        Map<String, Object> dataRateMap = (Map<String, Object>) data.get("rate");

        if (dataRateMap.get("amount").toString().isEmpty()) {

            dataRateMap.put("amount", "0");

        }

        dataRateMap.put("amount", new BigDecimal(dataRateMap.get("amount").toString().replaceAll("[^0-9.]", "")).setScale(0, BigDecimal.ROUND_CEILING));

        Map<String, Object> dataRateContributorMap = (Map<String, Object>) dataRateMap.get("contributor");

        if (dataRateContributorMap.get("amount").toString().isEmpty()) {

            dataRateContributorMap.put("amount", "0");

        }

        dataRateContributorMap.put("amount", new BigDecimal(dataRateMap.get("contributor").toString().replaceAll("[^0-9.]", "")).setScale(0, BigDecimal.ROUND_CEILING));

        dataRateMap.put("contributor", dataRateContributorMap);

        data.put("rate", dataRateMap);

        if (data.get("sequence").toString().isEmpty()) {

            data.put("sequence", "0");

        }

        data.put("sequence", new BigDecimal(data.get("sequence").toString().replaceAll("[^0-9.]", "")).setScale(0, BigDecimal.ROUND_CEILING));

        data.put("url", data.get("url").toString().replaceAll("[^A-Za-z0-9- ]", ""));

        if (data.get("url").toString().isEmpty()) {

            data.put("url", data.get("title").toString().replaceAll("[^A-Za-z0-9- ]", ""));
            data.put("url", data.get("url").toString().replaceAll(" ", "-"));
            data.put("url", data.get("url").toString().toLowerCase());

        }

        Map<String, Object> dataViewMap = new HashMap<String, Object>() {

            {
                put("id", new ArrayList<String>());
                put("raw", BigDecimal.ZERO);
                put("session_id", new ArrayList<String>());
                put("unique", BigDecimal.ZERO);
            }

        };

        data.put("view", dataViewMap);

        Map<String, Object> validation = new HashMap<String, Object>() {

            {
                put("title", false);
            }

        };

        Document findEq = new Document("title", data.get("title"));
        Document findIn = new Document("category.id", categoryIdDataList);
        MongoCursor<Document> blogValidationIterator = this.blogRepository.findEqInSort(findEq, findIn, new Document("created.timestamp", -1));

        if (!blogValidationIterator.hasNext()) {

            validation.put("title", true);

        } else {

            result.put("response", "Title already exist");

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
            findIn = new Document("category.id", categoryIdDataList);
            MongoCursor<Document> blogUrlIterator = this.blogRepository.findEqInSort(findEq, findIn, new Document("created.timestamp", -1));

            Integer i = 1;
            String url = data.get("url").toString();

            while (blogUrlIterator.hasNext()) {

                url = data.get("url").toString();

                if (data.get("url").toString().substring(data.get("url").toString().length() - 1).equals("/")) {

                    url = data.get("url").toString().substring(0, data.get("url").toString().length() - 1);

                }

                url = url + "-" + i;

                findEq = new Document("url", url);
                blogUrlIterator = this.blogRepository.findEqInSort(findEq, findIn, new Document("created.timestamp", -1));

                i++;

            }

            data.put("url", url);

            Map<String, Object> dataCategoryMap = (Map<String, Object>) data.get("category");

            ArrayList<String> dataCategoryPathList = (ArrayList<String>) dataCategoryMap.get("path");

            ArrayList<String> path = new ArrayList<String>();

            for (String string : dataCategoryPathList) {

                if (string.isEmpty()) {

                    path.add(data.get("url").toString());

                } else {

                    path.add(string + "/" + data.get("url"));

                }

            }

            data.put("path", path);

            Document insertOneData = data;
            Document insertOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                    .append("username", preloodeAccount.get("username"));
            String blogInsertId = this.blogRepository.insertOne(request, insertOneData, insertOneAdministrator);

            Document insertLogTarget = new Document("target", new Document("id", blogInsertId)
                    .append("name", data.get("title")));
            this.administratorLogService.insert(request, insertOneAdministrator, "", "Add blog", insertLogTarget);

            result.put("response", "Blog successfully added");
            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> loadEntry(String id) {

        Map<String, Object> result = new HashMap<String, Object>();

        Document findEq = new Document("_id", id);
        MongoCursor<Document> blogIterator = this.blogRepository.findEqSort(findEq, new Document("created.timestamp", -1));

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
        paginationAccount.put("cookie", "preloode_pagination_blog");
        String size = this.pagination.load(request, paginationAccount);

        Map<String, Object> queryAccount = new HashMap<String, Object>();
        queryAccount.put("id", preloodeAccount.get("_id"));
        queryAccount.put("cookie", "preloode_filter_blog");
        Document filterDocument = this.filter.query(request, queryAccount);

        return this.blogRepository.findPagination(filterDocument, new Document("created.timestamp", -1), (page - 1), Integer.parseInt(size));

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
        removeAccount.put("cookie", "preloode_filter_blog");
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
        writeAccount.put("cookie", "preloode_pagination_blog");
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

        Map<String, Object> tinymceUpload = this.image.upload(request, multipartRequest, this.path.getImage() + "/blog/tinymce", 10024);

        if (tinymceUpload.get("result").equals(true)) {

            ArrayList<String> files = (ArrayList<String>) tinymceUpload.get("file");

            for (String string : files) {

                this.image.resize(request, this.path.getImage() + "/blog/tinymce", string, 1920, 1920);

                result.put("location", this.url.getImage() + "/blog/tinymce/" + string);

            }

        }

        return result;

    }


    public Map<String, Object> update(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Blog failed edited");
                put("result", false);
            }

        };

        Map<String, Object> categoryDataMap = (Map<String, Object>) data.get("category");

        ArrayList<String> categoryIdDataList = (ArrayList<String>) categoryDataMap.get("id");

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

        data.put("url", data.get("url").toString().replaceAll("[^A-Za-z0-9- ]", ""));

        if (data.get("url").toString().isEmpty()) {

            data.put("url", data.get("title").toString().replaceAll("[^A-Za-z0-9- ]", ""));
            data.put("url", data.get("url").toString().replaceAll(" ", "-"));
            data.put("url", data.get("url").toString().toLowerCase());

        }

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> blogIterator = this.blogRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (blogIterator.hasNext()) {

            Map<String, Object> blogMap = blogIterator.next();

            Map<String, Object> validation = new HashMap<String, Object>() {

                {
                    put("title", false);
                }

            };

            findEq = new Document("title", data.get("title"));
            Document findNe = new Document("_id", blogMap.get("_id"));
            Document findIn = new Document("category.id", categoryIdDataList);
            MongoCursor<Document> blogValidationIterator = this.blogRepository.findEqNeInSort(findEq, findNe, findIn, new Document("created.timestamp", -1));

            if (!blogValidationIterator.hasNext()) {

                validation.put("title", true);

            } else {

                result.put("response", "Title already exist");

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
                MongoCursor<Document> blogUrlIterator = this.blogRepository.findEqNeInSort(findEq, findNe, findIn, new Document("created.timestamp", -1));

                Integer i = 1;
                String url = data.get("url").toString();

                while (blogUrlIterator.hasNext()) {

                    url = data.get("url").toString();

                    if (data.get("url").toString().substring(data.get("url").toString().length() - 1).equals("/")) {

                        url = data.get("url").toString().substring(0, data.get("url").toString().length() - 1);

                    }

                    url = url + "-" + i;

                    findEq = new Document("url", url);
                    blogUrlIterator = this.blogRepository.findEqNeInSort(findEq, findNe, findIn, new Document("created.timestamp", -1));

                    i++;

                }

                data.put("url", url);

                Map<String, Object> dataCategoryMap = (Map<String, Object>) data.get("category");

                ArrayList<String> dataCategoryPathList = (ArrayList<String>) dataCategoryMap.get("path");

                ArrayList<String> path = new ArrayList<String>();

                for (String string : dataCategoryPathList) {

                    if (string.isEmpty()) {

                        path.add(data.get("url").toString());

                    } else {

                        path.add(string + "/" + data.get("url"));

                    }

                }

                data.put("path", path);

                if (!blogMap.get("file").equals(data.get("file"))) {

                    this.image.delete(request, this.path.getImage() + "/blog", blogMap.get("file").toString());

                }

                Document updateOneEq = new Document("_id", blogMap.get("_id"));
                Document updateOneData = data;
                Document updateOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                        .append("username", preloodeAccount.get("username"));
                this.blogRepository.updateOne(request, updateOneEq, updateOneData, updateOneAdministrator);

                Document logData = (Document) blogMap;
                logData.put("blog_id", blogMap.get("_id"));
                logData.remove("_id");
                logData.remove("created");
                logData.remove("modified");
                this.blogLogDataRepository.insertOne(request, logData, updateOneAdministrator);

                Document insertLogTarget = new Document("target", new Document("id", blogMap.get("_id"))
                        .append("name", blogMap.get("title")));
                this.administratorLogService.insert(request, updateOneAdministrator, "", "Edit blog", insertLogTarget);

                result.put("response", "Blog successfully edited");
                result.put("result", true);

            }

        } else {

            result.put("response", "Blog doesn't exist");

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

        result = this.image.upload(request, multipartRequest, this.path.getImage() + "/blog", 10024);

        if (result.get("result").equals(true)) {

            ArrayList<String> files = (ArrayList<String>) result.get("file");

            for (String string : files) {

                this.image.resize(request, this.path.getImage() + "/blog", string, 1920, 1920);

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

        result = this.image.upload(request, multipartRequest, this.path.getImage() + "/blog/thumbnail", 10024);

        if (result.get("result").equals(true)) {

            ArrayList<String> files = (ArrayList<String>) result.get("file");

            for (String string : files) {

                this.image.resize(request, this.path.getImage() + "/blog/thumbnail", string, 1920, 1920);

            }

        }

        return result;

    }


}
