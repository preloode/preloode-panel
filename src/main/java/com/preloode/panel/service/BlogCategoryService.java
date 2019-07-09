package com.preloode.panel.service;

import com.mongodb.client.MongoCursor;
import com.preloode.panel.component.Filter;
import com.preloode.panel.component.Image;
import com.preloode.panel.component.Pagination;
import com.preloode.panel.configuration.Path;
import com.preloode.panel.configuration.Url;
import com.preloode.panel.repository.BlogCategoryLogDataRepository;
import com.preloode.panel.repository.BlogCategoryRepository;
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
public class BlogCategoryService {


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
    private BlogCategoryLogDataRepository blogCategoryLogDataRepository;

    @Autowired
    private BlogCategoryRepository blogCategoryRepository;


    public String createPaginationLink(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_blog_category");
        String size = this.pagination.load(request, paginationAccount);

        return this.pagination.createLink(request, "/blog/category", page, Integer.parseInt(size), (this.blogCategoryRepository.count()));

    }


    public Map<String, Object> delete(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Blog category failed deleted");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> blogCategoryIterator = this.blogCategoryRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (blogCategoryIterator.hasNext()) {

            Map<String, Object> blogCategoryMap = blogCategoryIterator.next();

            Document deleteOneEq = new Document("_id", blogCategoryMap.get("_id"));
            this.blogCategoryRepository.deleteOne(deleteOneEq);

            this.image.delete(request, this.path.getImage() + "/blog/category", blogCategoryMap.get("file").toString());
            this.image.delete(request, this.path.getImage() + "/blog/category/thumbnail", blogCategoryMap.get("thumbnail").toString());

            String[] content = blogCategoryMap.get("content").toString().split("src=\"");

            for (String string : content) {

                if (string.contains(this.path.getImage())) {

                    String[] path = string.split("\"");
                    String[] image = path[0].split(this.path.getImage() + "/blog/category/tinymce/");

                    if (image.length == 2) {

                        this.image.delete(request, this.path.getImage() + "/blog/category/tinymce", image[1]);

                    }

                }

            }

            String[] description = blogCategoryMap.get("description").toString().split("src=\"");

            for (String string : description) {

                if (string.contains(this.path.getImage())) {

                    String[] path = string.split("\"");
                    String[] image = path[0].split(this.path.getImage() + "/blog/category/tinymce/");

                    if (image.length == 2) {

                        this.image.delete(request, this.path.getImage() + "/blog/category/tinymce", image[1]);

                    }

                }

            }

            Document insertLogAdministrator = new Document("id", preloodeAccount.get("_id"))
                    .append("username", preloodeAccount.get("username"));
            Document insertLogTarget = new Document("target", new Document("id", blogCategoryMap.get("_id"))
                    .append("name", blogCategoryMap.get("name")));
            this.administratorLogService.insert(request, insertLogAdministrator, "", "Delete blog category", insertLogTarget);

            result.put("response", "Blog category successfully deleted");
            result.put("result", true);

        } else {

            result.put("response", "Blog category doesn't exist");

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
        writeAccount.put("cookie", "preloode_filter_blog_category");
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
        MongoCursor<Document> blogCategoryIterator = this.blogCategoryRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (blogCategoryIterator.hasNext()) {

            Map<String, Object> blogCategoryMap = blogCategoryIterator.next();

            Map<String, Object> rateBlogCategoryMap = (Map<String, Object>) blogCategoryMap.get("rate");

            rateBlogCategoryMap.put("amount", rateBlogCategoryMap.get("amount").toString());
            rateBlogCategoryMap.put("contributor", rateBlogCategoryMap.get("contributor").toString());

            blogCategoryMap.put("rate", rateBlogCategoryMap);

            blogCategoryMap.put("sequence", blogCategoryMap.get("sequence").toString());

            result.put("data", blogCategoryMap);

        }

        findEq = new Document("status", "Active");
        blogCategoryIterator = this.blogCategoryRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> blogCategoryList = new ArrayList<Object>();

        while (blogCategoryIterator.hasNext()) {

            blogCategoryList.add(blogCategoryIterator.next());

        }

        result.put("category", blogCategoryList);
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
        loadAccount.put("cookie", "preloode_filter_blog_category");
        Map<String, Object> filterMap = this.filter.load(request, loadAccount);

        if (filterMap.containsKey("result")) {

            result.put("filter", filterMap);

        }

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_blog_category");
        String paginationEntry = this.pagination.load(request, paginationAccount);

        result.put("page", page);
        result.put("pagination", paginationEntry);
        result.put("result", true);

        return result;

    }


    public Map<String, Object> insert(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Blog category failed added");
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

        data.put("url", data.get("url").toString().replaceAll("[^A-Za-z0-9- ]", ""));

        if (data.get("url").toString().isEmpty()) {

            data.put("url", data.get("name").toString().replaceAll("[^A-Za-z0-9 ]", ""));
            data.put("url", data.get("url").toString().replaceAll(" ", "-"));
            data.put("url", data.get("url").toString().toLowerCase());

        }

        Map<String, Object> validation = new HashMap<String, Object>() {

            {
                put("name", false);
                put("parent", false);
            }

        };

        Map<String, Object> parentDataMap = (Map<String, Object>) data.get("parent");

        Document findEq = new Document("name", data.get("name")).append("parent.id", parentDataMap.get("id"));
        MongoCursor<Document> blogCategoryValidationIterator = this.blogCategoryRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (!blogCategoryValidationIterator.hasNext()) {

            validation.put("name", true);

        } else {

            result.put("response", "Name already exist");

        }

        findEq = new Document("_id", parentDataMap.get("id"));
        blogCategoryValidationIterator = this.blogCategoryRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (blogCategoryValidationIterator.hasNext()) {

            validation.put("parent", true);

        } else {

            if (parentDataMap.get("id").toString().equals("0")) {

                validation.put("parent", true);

            } else {

                result.put("response", "Parent doesn't exist");

            }

        }

        Boolean valid = true;

        for (Map.Entry<String, Object> map : validation.entrySet()) {

            if (map.getValue().equals(false)) {

                valid = false;

                break;

            }

        }

        if (valid) {

            findEq = new Document("url", data.get("url")).append("parent.id", parentDataMap.get("id"));
            MongoCursor<Document> blogCategoryRepositoryIterator = this.blogCategoryRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            Integer i = 1;
            String url = data.get("url").toString();

            while (blogCategoryRepositoryIterator.hasNext()) {

                url = data.get("url").toString();

                if (data.get("url").toString().substring(data.get("url").toString().length() - 1).equals("/")) {

                    url = data.get("url").toString().substring(0, data.get("url").toString().length() - 1);

                }

                url = url + "-" + i;

                findEq = new Document("url", url).append("parent.id", parentDataMap.get("id"));
                blogCategoryRepositoryIterator = this.blogCategoryRepository.findEqSort(findEq, new Document("created.timestamp", -1));

                i++;

            }

            data.put("url", url);

            if (parentDataMap.get("id").toString().equals("0")) {

                data.put("path", data.get("url"));

            } else {

                data.put("path", parentDataMap.get("path").toString() + "/" + data.get("url"));

            }

            Document insertOneData = data;
            Document insertOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                    .append("username", preloodeAccount.get("username"));
            String blogCategoryInsertId = this.blogCategoryRepository.insertOne(request, insertOneData, insertOneAdministrator);

            Document insertLogTarget = new Document("target", new Document("id", blogCategoryInsertId)
                    .append("name", data.get("name")));
            this.administratorLogService.insert(request, insertOneAdministrator, "", "Add blog category", insertLogTarget);

            result.put("response", "Blog category successfully added");
            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> loadEntry(String id) {

        Map<String, Object> result = new HashMap<String, Object>();

        Document findEq = new Document("_id", id);
        MongoCursor<Document> blogCategoryIterator = this.blogCategoryRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (blogCategoryIterator.hasNext()) {

            result = blogCategoryIterator.next();

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
        paginationAccount.put("cookie", "preloode_pagination_blog_category");
        String size = this.pagination.load(request, paginationAccount);

        Map<String, Object> queryAccount = new HashMap<String, Object>();
        queryAccount.put("id", preloodeAccount.get("_id"));
        queryAccount.put("cookie", "preloode_filter_blog_category");
        Document filterDocument = this.filter.query(request, queryAccount);

        return this.blogCategoryRepository.findPagination(filterDocument, new Document("created.timestamp", -1), (page - 1), Integer.parseInt(size));

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
        removeAccount.put("cookie", "preloode_filter_blog_category");
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
        writeAccount.put("cookie", "preloode_pagination_blog_category");
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

        Map<String, Object> tinymceUpload = this.image.upload(request, multipartRequest, this.path.getImage() + "/blog/category/tinymce", 10024);

        if (tinymceUpload.get("result").equals(true)) {

            ArrayList<String> files = (ArrayList<String>) tinymceUpload.get("file");

            for (String string : files) {

                this.image.resize(request, this.path.getImage() + "/blog/category/tinymce", string, 1920, 1920);

                result.put("location", this.url.getImage() + "/blog/category/tinymce/" + string);

            }

        }

        return result;

    }


    public Map<String, Object> update(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Blog category failed edited");
                put("result", false);
            }

        };

        Map<String, Object> dataRateMap = (Map<String, Object>) data.get("rate");

        if (dataRateMap.get("amount").toString().isEmpty()) {

            dataRateMap.put("amount", "0.00");

        }

        dataRateMap.put("amount", new BigDecimal(dataRateMap.get("amount").toString().replaceAll("[^0-9.]", "")).setScale(0, BigDecimal.ROUND_CEILING));

        if (dataRateMap.get("contributor").toString().isEmpty()) {

            dataRateMap.put("contributor", "0.00");

        }

        dataRateMap.put("contributor", new BigDecimal(dataRateMap.get("contributor").toString().replaceAll("[^0-9.]", "")).setScale(0, BigDecimal.ROUND_CEILING));

        data.put("rate", dataRateMap);

        if (data.get("sequence").toString().isEmpty()) {

            data.put("sequence", "0");

        }

        data.put("sequence", new BigDecimal(data.get("sequence").toString().replaceAll("[^0-9.]", "")).setScale(0, BigDecimal.ROUND_CEILING));

        data.put("url", data.get("url").toString().replaceAll("[^A-Za-z0-9- ]", ""));

        if (data.get("url").toString().isEmpty()) {

            data.put("url", data.get("name").toString().replaceAll("[^A-Za-z0-9 ]", ""));
            data.put("url", data.get("url").toString().replaceAll(" ", "-"));
            data.put("url", data.get("url").toString().toLowerCase());

        }

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> blogCategoryIterator = this.blogCategoryRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (blogCategoryIterator.hasNext()) {

            Map<String, Object> blogCategoryMap = blogCategoryIterator.next();

            Map<String, Object> validation = new HashMap<String, Object>() {

                {
                    put("name", false);
                    put("parent", false);
                }

            };

            Map<String, Object> parentDataMap = (Map<String, Object>) data.get("parent");

            findEq = new Document("name", data.get("name")).append("parent.id", parentDataMap.get("id"));
            Document findNe = new Document("_id", blogCategoryMap.get("_id"));
            MongoCursor<Document> blogCategoryValidationIterator = this.blogCategoryRepository.findEqNeSort(findEq, findNe, new Document("created.timestamp", -1));

            if (!blogCategoryValidationIterator.hasNext()) {

                validation.put("name", true);

            } else {

                result.put("response", "Name already exist");

            }

            findEq = new Document("_id", parentDataMap.get("id"));
            blogCategoryValidationIterator = this.blogCategoryRepository.findEqNeSort(findEq, findNe, new Document("created.timestamp", -1));

            if (blogCategoryValidationIterator.hasNext()) {

                validation.put("parent", true);

            } else {

                if (parentDataMap.get("id").equals("0")) {

                    validation.put("parent", true);

                } else {

                    result.put("response", "Parent doesn't exist");

                }

            }

            Boolean valid = true;

            for (Map.Entry<String, Object> map : validation.entrySet()) {

                if (map.getValue().equals(false)) {

                    valid = false;

                    break;

                }

            }

            if (valid) {

                findEq = new Document("url", data.get("url")).append("parent.id", parentDataMap.get("id"));
                MongoCursor<Document> blogCategoryRepositoryIterator = this.blogCategoryRepository.findEqNeSort(findEq, findNe, new Document("created.timestamp", -1));

                Integer i = 1;
                String url = data.get("url").toString();

                while (blogCategoryRepositoryIterator.hasNext()) {

                    url = data.get("url").toString();

                    if (data.get("url").toString().substring(data.get("url").toString().length() - 1).equals("/")) {

                        url = data.get("url").toString().substring(0, data.get("url").toString().length() - 1);

                    }

                    url = url + "-" + i;

                    findEq = new Document("url", url).append("parent.id", parentDataMap.get("id"));
                    blogCategoryRepositoryIterator = this.blogCategoryRepository.findEqSort(findEq, new Document("created.timestamp", -1));

                    i++;

                }

                data.put("url", url);

                if (parentDataMap.get("id").toString().equals("0")) {

                    data.put("path", data.get("url"));

                } else {

                    data.put("path", parentDataMap.get("path").toString() + "/" + data.get("url"));

                }

                if (!blogCategoryMap.get("file").equals(data.get("file"))) {

                    this.image.delete(request, this.path.getImage() + "/blog/category", blogCategoryMap.get("file").toString());

                }

                Document updateOneEq = new Document("_id", blogCategoryMap.get("_id"));
                Document updateOneData = data;
                Document updateOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                        .append("username", preloodeAccount.get("username"));
                this.blogCategoryRepository.updateOne(request, updateOneEq, updateOneData, updateOneAdministrator);

                Document logData = (Document) blogCategoryMap;
                logData.put("blog_category_id", blogCategoryMap.get("_id"));
                logData.remove("_id");
                logData.remove("created");
                logData.remove("modified");
                this.blogCategoryLogDataRepository.insertOne(request, logData, updateOneAdministrator);

                Document insertLogTarget = new Document("target", new Document("id", blogCategoryMap.get("_id"))
                        .append("name", blogCategoryMap.get("name")));
                this.administratorLogService.insert(request, updateOneAdministrator, "", "Edit blog category", insertLogTarget);

                result.put("response", "Blog category successfully edited");
                result.put("result", true);

            }

        } else {

            result.put("response", "Blog category doesn't exist");

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

        result = this.image.upload(request, multipartRequest, this.path.getImage() + "/blog/category", 10024);

        if (result.get("result").equals(true)) {

            ArrayList<String> files = (ArrayList<String>) result.get("file");

            for (String string : files) {

                this.image.resize(request, this.path.getImage() + "/blog/category", string, 1920, 1920);

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

        result = this.image.upload(request, multipartRequest, this.path.getImage() + "/blog/category/thumbnail", 10024);

        if (result.get("result").equals(true)) {

            ArrayList<String> files = (ArrayList<String>) result.get("file");

            for (String string : files) {

                this.image.resize(request, this.path.getImage() + "/blog/category/thumbnail", string, 1920, 1920);

            }

        }

        return result;

    }


}
