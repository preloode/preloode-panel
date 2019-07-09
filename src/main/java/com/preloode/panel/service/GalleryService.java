package com.preloode.panel.service;

import com.mongodb.client.MongoCursor;
import com.preloode.panel.component.Filter;
import com.preloode.panel.component.Image;
import com.preloode.panel.component.Pagination;
import com.preloode.panel.configuration.Path;
import com.preloode.panel.configuration.Url;
import com.preloode.panel.repository.GalleryRepository;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class GalleryService {


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
    private GalleryRepository galleryRepository;


    public String createPaginationLink(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_gallery");
        String size = this.pagination.load(request, paginationAccount);

        return this.pagination.createLink(request, "/gallery", page, Integer.parseInt(size), (this.galleryRepository.count()));

    }


    public Map<String, Object> delete(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Gallery failed deleted");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> galleryIterator = this.galleryRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (galleryIterator.hasNext()) {

            Map<String, Object> galleryMap = galleryIterator.next();

            Document deleteOneEq = new Document("_id", galleryMap.get("_id"));
            this.galleryRepository.deleteOne(deleteOneEq);

            this.image.delete(request, this.path.getImage() + "/gallery", galleryMap.get("file").toString());
            this.image.delete(request, this.path.getImage() + "/gallery/thumbnail", galleryMap.get("thumbnail").toString());

            Document insertLogAdministrator = new Document("id", preloodeAccount.get("_id"))
                    .append("username", preloodeAccount.get("username"));
            Document insertLogTarget = new Document("target", new Document("id", galleryMap.get("_id"))
                    .append("name", galleryMap.get("name")));
            this.administratorLogService.insert(request, insertLogAdministrator, "", "Delete gallery", insertLogTarget);

            result.put("response", "Gallery successfully deleted");
            result.put("result", true);

        } else {

            result.put("response", "Gallery doesn't exist");

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
        writeAccount.put("cookie", "preloode_filter_gallery");
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
        MongoCursor<Document> galleryIterator = this.galleryRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (galleryIterator.hasNext()) {

            Map<String, Object> galleryMap = galleryIterator.next();

            Map<String, Object> galleryRateMap = (Map<String, Object>) galleryMap.get("rate");

            galleryRateMap.put("amount", galleryRateMap.get("amount").toString());
            galleryRateMap.put("contributor", galleryRateMap.get("contributor").toString());

            galleryMap.put("rate", galleryRateMap);

            galleryMap.put("sequence", galleryMap.get("sequence").toString());

            result.put("data", galleryMap);

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
        loadAccount.put("cookie", "preloode_filter_gallery");
        Map<String, Object> filterMap = this.filter.load(request, loadAccount);

        if (filterMap.containsKey("result")) {

            result.put("filter", filterMap);

        }

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_gallery");
        String paginationEntry = this.pagination.load(request, paginationAccount);

        result.put("page", page);
        result.put("pagination", paginationEntry);
        result.put("result", true);

        return result;

    }


    public Map<String, Object> insert(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Gallery failed added");
                put("result", false);
            }

        };

        Map<String, Object> rateDataMap = (Map<String, Object>) data.get("rate");

        if (rateDataMap.get("amount").toString().isEmpty()) {

            rateDataMap.put("amount", new BigDecimal("0.00").toString());

        }

        if (rateDataMap.get("contributor").toString().isEmpty()) {

            rateDataMap.put("contributor", new BigInteger("0").toString());

        }

        data.put("rate", rateDataMap);

        if (data.get("url").toString().isEmpty()) {

            data.put("url", data.get("name").toString().replaceAll("[^A-Za-z0-9 ]", ""));
            data.put("url", data.get("url").toString().replaceAll("[ ]", "-") + "/");
            data.put("url", data.get("url").toString().toLowerCase());

        }

        if (!data.get("url").toString().substring(data.get("url").toString().length() - 1).equals("/")) {

            data.put("url", data.get("url").toString() + "/");

        }

        Map<String, Object> validation = new HashMap<String, Object>() {

            {
                put("name", false);
            }

        };

        Document findEq = new Document("name", data.get("name"));
        MongoCursor<Document> galleryValidationIterator = this.galleryRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (!galleryValidationIterator.hasNext()) {

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
            MongoCursor<Document> galleryRepositoryIterator = this.galleryRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            Integer i = 1;
            String url = data.get("url").toString();

            while (galleryRepositoryIterator.hasNext()) {

                url = data.get("url").toString();

                if (data.get("url").toString().substring(data.get("url").toString().length() - 1).equals("/")) {

                    url = data.get("url").toString().substring(0, data.get("url").toString().length() - 1);

                }

                url = url + "-" + i;

                findEq = new Document("url", url);
                galleryRepositoryIterator = this.galleryRepository.findEqSort(findEq, new Document("created.timestamp", -1));

                i++;

            }

            data.put("url", url);

            Document insertOneData = data;
            Document insertOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                    .append("username", preloodeAccount.get("username"));
            String galleryInsertId = this.galleryRepository.insertOne(request, insertOneData, insertOneAdministrator);

            Document insertLogTarget = new Document("target", new Document("id", galleryInsertId)
                    .append("name", data.get("name")));
            this.administratorLogService.insert(request, insertOneAdministrator, "", "Add gallery", insertLogTarget);

            result.put("response", "Gallery successfully added");
            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> loadEntry(String id) {

        Map<String, Object> result = new HashMap<String, Object>();

        Document findEq = new Document("_id", id);
        MongoCursor<Document> galleryIterator = this.galleryRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (galleryIterator.hasNext()) {

            result = galleryIterator.next();

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
        paginationAccount.put("cookie", "preloode_pagination_gallery");
        String size = this.pagination.load(request, paginationAccount);

        Map<String, Object> queryAccount = new HashMap<String, Object>();
        queryAccount.put("id", preloodeAccount.get("_id"));
        queryAccount.put("cookie", "preloode_filter_gallery");
        Document filterDocument = this.filter.query(request, queryAccount);

        return this.galleryRepository.findPagination(filterDocument, new Document("created.timestamp", -1), (page - 1), Integer.parseInt(size));

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
        removeAccount.put("cookie", "preloode_filter_gallery");
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
        writeAccount.put("cookie", "preloode_pagination_gallery");
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

                this.image.resize(request, this.path.getImage() + "/gallery/tinymce", string, 1920, 1920);

                result.put("location", this.url.getImage() + "/gallery/tinymce/" + string);

            }

        }

        return result;

    }


    public Map<String, Object> update(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Gallery failed edited");
                put("result", false);
            }

        };

        Map<String, Object> rateDataMap = (Map<String, Object>) data.get("rate");

        if (rateDataMap.get("amount").toString().isEmpty()) {

            rateDataMap.put("amount", new BigDecimal("0.00").toString());

        }

        if (rateDataMap.get("contributor").toString().isEmpty()) {

            rateDataMap.put("contributor", new BigInteger("0").toString());

        }

        data.put("rate", rateDataMap);

        if (data.get("url").toString().isEmpty()) {

            data.put("url", data.get("name").toString().replaceAll("[^A-Za-z0-9 ]", ""));
            data.put("url", data.get("url").toString().replaceAll("[ ]", "-") + "/");
            data.put("url", data.get("url").toString().toLowerCase());

        }

        if (!data.get("url").toString().substring(data.get("url").toString().length() - 1).equals("/")) {

            data.put("url", data.get("url").toString() + "/");

        }

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> galleryIterator = this.galleryRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (galleryIterator.hasNext()) {

            Map<String, Object> galleryMap = galleryIterator.next();

            Map<String, Object> validation = new HashMap<String, Object>() {

                {
                    put("name", false);
                }

            };

            findEq = new Document("title", data.get("title"));
            Document findNe = new Document("_id", galleryMap.get("_id"));
            MongoCursor<Document> galleryValidationIterator = this.galleryRepository.findEqNeSort(findEq, findNe, new Document("created.timestamp", -1));

            if (!galleryValidationIterator.hasNext()) {

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
                findNe = new Document("_id", galleryMap.get("_id"));
                MongoCursor<Document> galleryRepositoryIterator = this.galleryRepository.findEqNeSort(findEq, findNe, new Document("created.timestamp", -1));

                Integer i = 1;
                String url = data.get("url").toString();

                while (galleryRepositoryIterator.hasNext()) {

                    url = data.get("url").toString();

                    if (data.get("url").toString().substring(data.get("url").toString().length() - 1).equals("/")) {

                        url = data.get("url").toString().substring(0, data.get("url").toString().length() - 1);

                    }

                    url = url + "-" + i;

                    findEq = new Document("url", url);
                    galleryRepositoryIterator = this.galleryRepository.findEqNeSort(findEq, findNe, new Document("created.timestamp", -1));

                    i++;

                }

                data.put("url", url);

                if (!galleryMap.get("file").equals(data.get("file"))) {

                    this.image.delete(request, this.path.getImage() + "/gallery", galleryMap.get("file").toString());

                }

                Document updateOneEq = new Document("_id", galleryMap.get("_id"));
                Document updateOneData = data;
                Document updateOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                        .append("username", preloodeAccount.get("username"));
                this.galleryRepository.updateOne(request, updateOneEq, updateOneData, updateOneAdministrator);

                Document insertLogTarget = new Document("target", new Document("id", galleryMap.get("_id"))
                        .append("name", galleryMap.get("name")));
                this.administratorLogService.insert(request, updateOneAdministrator, "", "Edit gallery", insertLogTarget);

                result.put("response", "Gallery successfully edited");
                result.put("result", true);

            }

        } else {

            result.put("response", "Gallery doesn't exist");

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

        result = this.image.upload(request, multipartRequest, this.path.getImage() + "/gallery", 10024);

        if (result.get("result").equals(true)) {

            ArrayList<String> files = (ArrayList<String>) result.get("file");

            for (String string : files) {

                this.image.resize(request, this.path.getImage() + "/gallery", string, 1920, 1920);

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

        result = this.image.upload(request, multipartRequest, this.path.getImage() + "/gallery/thumbnail", 10024);

        if (result.get("result").equals(true)) {

            ArrayList<String> files = (ArrayList<String>) result.get("file");

            for (String string : files) {

                this.image.resize(request, this.path.getImage() + "/gallery/thumbnail", string, 1920, 1920);

            }

        }

        return result;

    }


}
