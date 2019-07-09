package com.preloode.panel.service;

import com.mongodb.client.MongoCursor;
import com.preloode.panel.component.Filter;
import com.preloode.panel.component.Image;
import com.preloode.panel.component.Pagination;
import com.preloode.panel.configuration.Path;
import com.preloode.panel.configuration.Url;
import com.preloode.panel.repository.GameRepository;
import com.preloode.panel.repository.PromotionRepository;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Service
public class PromotionService {


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
    private GameRepository gameRepository;

    @Autowired
    private PromotionRepository promotionRepository;


    public String createPaginationLink(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_promotion");
        String size = this.pagination.load(request, paginationAccount);

        return this.pagination.createLink(request, "/promotion", page, Integer.parseInt(size), (this.promotionRepository.count()));

    }


    public Map<String, Object> delete(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Promotion failed deleted");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> promotionIterator = this.promotionRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (promotionIterator.hasNext()) {

            Map<String, Object> promotionMap = promotionIterator.next();

            Document deleteOneEq = new Document("_id", promotionMap.get("_id"));
            this.promotionRepository.deleteOne(deleteOneEq);

            this.image.delete(request, this.path.getImage() + "/promotion", promotionMap.get("file").toString());

            String[] description = promotionMap.get("description").toString().split("src=\"");

            for (String string : description) {

                if (string.contains(this.path.getImage())) {

                    String[] path = string.split("\"");
                    String[] image = path[0].split(this.path.getImage() + "/promotion/tinymce/");

                    if (image.length == 2) {

                        this.image.delete(request, this.path.getImage() + "/promotion/tinymce", image[1]);

                    }

                }

            }

            Document insertLogAdministrator = new Document("id", preloodeAccount.get("_id"))
                    .append("username", preloodeAccount.get("username"));
            Document insertLogTarget = new Document("target", new Document("id", promotionMap.get("_id"))
                    .append("name", promotionMap.get("name")));
            this.administratorLogService.insert(request, insertLogAdministrator, "", "Delete promotion", insertLogTarget);

            result.put("response", "Promotion successfully deleted");
            result.put("result", true);

        } else {

            result.put("response", "Promotion doesn't exist");

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
        writeAccount.put("cookie", "preloode_filter_promotion");
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
        MongoCursor<Document> promotionIterator = this.promotionRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (promotionIterator.hasNext()) {

            Map<String, Object> promotionMap = promotionIterator.next();

            result.put("data", promotionMap);

        }

        findEq = new Document("status", "Active");
        MongoCursor<Document> gameIterator = this.gameRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> gameList = new ArrayList<Object>();

        while (gameIterator.hasNext()) {

            gameList.add(gameIterator.next());

        }

        result.put("game", gameList);
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
        loadAccount.put("cookie", "preloode_filter_promotion");
        Map<String, Object> filterMap = this.filter.load(request, loadAccount);

        if (filterMap.containsKey("result")) {

            result.put("filter", filterMap);

        }

        Document findEq = new Document("status", "Active");
        MongoCursor<Document> gameIterator = this.gameRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> gameList = new ArrayList<Object>();

        while (gameIterator.hasNext()) {

            gameList.add(gameIterator.next());

        }

        result.put("game", gameList);

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_promotion");
        String paginationEntry = this.pagination.load(request, paginationAccount);

        result.put("page", page);
        result.put("pagination", paginationEntry);
        result.put("result", true);

        return result;

    }


    public Map<String, Object> insert(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Promotion failed added");
                put("result", false);
            }

        };

        if (data.get("amount").toString().isEmpty()) {

            data.put("amount", "0.00");

        }

        BigDecimal amount = new BigDecimal(data.get("amount").toString().replaceAll("[^0-9.]", "")).setScale(2, BigDecimal.ROUND_CEILING);
        data.put("amount", amount.toString());

        if (data.get("cap").toString().isEmpty()) {

            data.put("cap", "0.00");

        }

        BigDecimal cap = new BigDecimal(data.get("cap").toString().replaceAll("[^0-9.]", "")).setScale(2, BigDecimal.ROUND_CEILING);
        data.put("cap", cap.toString());

        Map<String, Object> dataGameMap = (Map<String, Object>) data.get("game");
        Map<String, Object> dataGameTypeMap = (Map<String, Object>) dataGameMap.get("type");

        dataGameTypeMap.put("id", new ArrayList<String>(Arrays.asList(dataGameTypeMap.get("id").toString().split("#"))));
        dataGameTypeMap.put("name", new ArrayList<String>(Arrays.asList(dataGameTypeMap.get("name").toString().split("#"))));
        dataGameMap.put("id", new ArrayList<String>(Arrays.asList(dataGameMap.get("id").toString().split("#"))));
        dataGameMap.put("name", new ArrayList<String>(Arrays.asList(dataGameMap.get("name").toString().split("#"))));
        dataGameMap.put("type", dataGameTypeMap);
        data.put("game", dataGameMap);

        if (data.get("minimum_deposit").toString().isEmpty()) {

            data.put("minimum_deposit", "0.00");

        }

        BigDecimal minimumDeposit = new BigDecimal(data.get("minimum_deposit").toString().replaceAll("[^0-9.]", "")).setScale(2, BigDecimal.ROUND_CEILING);
        data.put("minimum_deposit", minimumDeposit.toString());

        if (data.get("percentage").toString().isEmpty()) {

            data.put("percentage", "0.00");

        }

        BigDecimal percentage = new BigDecimal(data.get("percentage").toString().replaceAll("[^0-9.]", "")).setScale(2, BigDecimal.ROUND_CEILING);
        data.put("percentage", percentage.toString());

        if (data.get("rollover").toString().isEmpty()) {

            data.put("rollover", "0.00");

        }

        BigDecimal rollover = new BigDecimal(data.get("rollover").toString().replaceAll("[^0-9.]", "")).setScale(2, BigDecimal.ROUND_CEILING);
        data.put("rollover", rollover.toString());

        data.put("sequence", data.get("sequence").toString().replaceAll("[^0-9]", ""));

        if (data.get("winlose").toString().isEmpty()) {

            data.put("winlose", "0.00");

        }

        BigDecimal winlose = new BigDecimal(data.get("winlose").toString().replaceAll("[^0-9.]", "")).setScale(2, BigDecimal.ROUND_CEILING);
        data.put("winlose", winlose.toString());

        Map<String, Object> validation = new HashMap<String, Object>() {

            {
                put("name", false);
            }

        };

        Document findEq = new Document("name", data.get("name"));
        MongoCursor<Document> promotionValidationIterator = this.promotionRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (!promotionValidationIterator.hasNext()) {

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
            String promotionInsertId = this.promotionRepository.insertOne(request, insertOneData, insertOneAdministrator);

            Document insertLogTarget = new Document("target", new Document("id", promotionInsertId)
                    .append("name", data.get("name")));
            this.administratorLogService.insert(request, insertOneAdministrator, "", "Add promotion", insertLogTarget);

            result.put("response", "Promotion successfully added");
            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> loadEntry(String id) {

        Map<String, Object> result = new HashMap<String, Object>();

        Document findEq = new Document("_id", id);
        MongoCursor<Document> promotionIterator = this.promotionRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (promotionIterator.hasNext()) {

            result = promotionIterator.next();

        }

        return result;

    }


    public MongoCursor<Document> loadPagination(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_promotion");
        String size = this.pagination.load(request, paginationAccount);

        Map<String, Object> queryAccount = new HashMap<String, Object>();
        queryAccount.put("id", preloodeAccount.get("_id"));
        queryAccount.put("cookie", "preloode_filter_promotion");
        Document filterDocument = this.filter.query(request, queryAccount);

        return this.promotionRepository.findPagination(filterDocument, new Document("created.timestamp", -1), (page - 1), Integer.parseInt(size));

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
        removeAccount.put("cookie", "preloode_filter_promotion");
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
        writeAccount.put("cookie", "preloode_pagination_promotion");
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

        Map<String, Object> tinymceUpload = this.image.upload(request, multipartRequest, this.path.getImage() + "/promotion/tinymce", 10024);

        if (tinymceUpload.get("result").equals(true)) {

            ArrayList<String> files = (ArrayList<String>) tinymceUpload.get("file");

            for (String string : files) {

                this.image.resize(request, this.path.getImage() + "/promotion/tinymce", string, 1920, 1920);

                result.put("location", this.url.getImage() + "/promotion/tinymce/" + string);

            }

        }

        return result;

    }


    public Map<String, Object> update(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Promotion failed edited");
                put("result", false);
            }

        };

        if (data.get("amount").toString().isEmpty()) {

            data.put("amount", "0.00");

        }

        BigDecimal amount = new BigDecimal(data.get("amount").toString().replaceAll("[^0-9.]", "")).setScale(2, BigDecimal.ROUND_CEILING);
        data.put("amount", amount.toString());

        if (data.get("cap").toString().isEmpty()) {

            data.put("cap", "0.00");

        }

        BigDecimal cap = new BigDecimal(data.get("cap").toString().replaceAll("[^0-9.]", "")).setScale(2, BigDecimal.ROUND_CEILING);
        data.put("cap", cap.toString());

        Map<String, Object> dataGameMap = (Map<String, Object>) data.get("game");
        Map<String, Object> dataGameTypeMap = (Map<String, Object>) dataGameMap.get("type");

        dataGameTypeMap.put("id", new ArrayList<String>(Arrays.asList(dataGameTypeMap.get("id").toString().split("#"))));
        dataGameTypeMap.put("name", new ArrayList<String>(Arrays.asList(dataGameTypeMap.get("name").toString().split("#"))));
        dataGameMap.put("id", new ArrayList<String>(Arrays.asList(dataGameMap.get("id").toString().split("#"))));
        dataGameMap.put("name", new ArrayList<String>(Arrays.asList(dataGameMap.get("name").toString().split("#"))));
        dataGameMap.put("type", dataGameTypeMap);
        data.put("game", dataGameMap);

        if (data.get("minimum_deposit").toString().isEmpty()) {

            data.put("minimum_deposit", "0.00");

        }

        BigDecimal minimumDeposit = new BigDecimal(data.get("minimum_deposit").toString().replaceAll("[^0-9.]", "")).setScale(2, BigDecimal.ROUND_CEILING);
        data.put("minimum_deposit", minimumDeposit.toString());

        if (data.get("percentage").toString().isEmpty()) {

            data.put("percentage", "0.00");

        }

        BigDecimal percentage = new BigDecimal(data.get("percentage").toString().replaceAll("[^0-9.]", "")).setScale(2, BigDecimal.ROUND_CEILING);
        data.put("percentage", percentage.toString());

        if (data.get("rollover").toString().isEmpty()) {

            data.put("rollover", "0.00");

        }

        BigDecimal rollover = new BigDecimal(data.get("rollover").toString().replaceAll("[^0-9.]", "")).setScale(2, BigDecimal.ROUND_CEILING);
        data.put("rollover", rollover.toString());

        data.put("sequence", data.get("sequence").toString().replaceAll("[^0-9]", ""));

        if (data.get("winlose").toString().isEmpty()) {

            data.put("winlose", "0.00");

        }

        BigDecimal winlose = new BigDecimal(data.get("winlose").toString().replaceAll("[^0-9.]", "")).setScale(2, BigDecimal.ROUND_CEILING);
        data.put("winlose", winlose.toString());

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> promotionIterator = this.promotionRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (promotionIterator.hasNext()) {

            Map<String, Object> promotionMap = promotionIterator.next();

            Map<String, Object> validation = new HashMap<String, Object>() {

                {
                    put("name", false);
                }

            };

            findEq = new Document("name", data.get("name"));
            Document findNe = new Document("_id", promotionMap.get("_id"));
            MongoCursor<Document> promotionValidationIterator = this.promotionRepository.findEqNeSort(findEq, findNe, new Document("created.timestamp", -1));

            if (!promotionValidationIterator.hasNext()) {

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

                if (!promotionMap.get("file").equals(data.get("file"))) {

                    this.image.delete(request, this.path.getImage() + "/promotion", promotionMap.get("file").toString());

                }

                Document updateOneEq = new Document("_id", promotionMap.get("_id"));
                Document updateOneData = data;
                Document updateOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                        .append("username", preloodeAccount.get("username"));
                this.promotionRepository.updateOne(request, updateOneEq, updateOneData, updateOneAdministrator);

                Document insertLogTarget = new Document("target", new Document("id", promotionMap.get("_id"))
                        .append("name", promotionMap.get("name")));
                this.administratorLogService.insert(request, updateOneAdministrator, "", "Edit promotion", insertLogTarget);

                result.put("response", "Promotion successfully edited");
                result.put("result", true);

            }

        } else {

            result.put("response", "Promotion doesn't exist");

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

        result = this.image.upload(request, multipartRequest, this.path.getImage() + "/promotion", 10024);

        if (result.get("result").equals(true)) {

            ArrayList<String> files = (ArrayList<String>) result.get("file");

            for (String string : files) {

                this.image.resize(request, this.path.getImage() + "/promotion", string, 1920, 1920);

            }

        }

        return result;

    }


}
