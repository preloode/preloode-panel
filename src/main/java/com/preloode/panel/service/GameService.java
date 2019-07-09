package com.preloode.panel.service;

import com.mongodb.client.MongoCursor;
import com.preloode.panel.component.Filter;
import com.preloode.panel.component.Image;
import com.preloode.panel.component.Pagination;
import com.preloode.panel.configuration.Path;
import com.preloode.panel.configuration.Url;
import com.preloode.panel.repository.GameLogDataRepository;
import com.preloode.panel.repository.GameRepository;
import com.preloode.panel.repository.GameTypeRepository;
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
public class GameService {


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
    private GameLogDataRepository gameLogDataRepository;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private GameTypeRepository gameTypeRepository;


    public String createPaginationLink(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_game");
        String size = this.pagination.load(request, paginationAccount);

        return this.pagination.createLink(request, "/game", page, Integer.parseInt(size), (this.gameRepository.count()));

    }


    public Map<String, Object> delete(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Game failed deleted");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> gameIterator = this.gameRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (gameIterator.hasNext()) {

            Map<String, Object> gameMap = gameIterator.next();

            Document deleteOneEq = new Document("_id", gameMap.get("_id"));
            this.gameRepository.deleteOne(deleteOneEq);

            this.image.delete(request, this.path.getImage() + "/game", gameMap.get("file").toString());

            String[] description = gameMap.get("description").toString().split("src=\"");

            for (String string : description) {

                if (string.contains(this.path.getImage())) {

                    String[] path = string.split("\"");
                    String[] image = path[0].split(this.path.getImage() + "/game/tinymce/");

                    if (image.length == 2) {

                        this.image.delete(request, this.path.getImage() + "/game/tinymce", image[1]);

                    }

                }

            }

            Document insertLogAdministrator = new Document("id", preloodeAccount.get("_id"))
                    .append("username", preloodeAccount.get("username"));
            Document insertLogTarget = new Document("target", new Document("id", gameMap.get("_id"))
                    .append("name", gameMap.get("name")));
            this.administratorLogService.insert(request, insertLogAdministrator, "", "Delete game", insertLogTarget);

            result.put("response", "Game successfully deleted");
            result.put("result", true);

        } else {

            result.put("response", "Game doesn't exist");

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
        writeAccount.put("cookie", "preloode_filter_game");
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
        MongoCursor<Document> gameIterator = this.gameRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (gameIterator.hasNext()) {

            Map<String, Object> gameMap = gameIterator.next();

            Map<String, Object> gameCreditMap = (Map<String, Object>) gameMap.get("credit");

            gameCreditMap.put("main", gameCreditMap.get("main").toString());
            gameCreditMap.put("promotion", gameCreditMap.get("promotion").toString());

            gameMap.put("credit", gameCreditMap);

            gameMap.put("sequence", gameMap.get("sequence").toString());

            result.put("data", gameMap);

        }

        findEq = new Document("status", "Active");
        MongoCursor<Document> gameTypeIterator = this.gameTypeRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> gameTypeList = new ArrayList<Object>();

        while (gameTypeIterator.hasNext()) {

            gameTypeList.add(gameTypeIterator.next());

        }

        result.put("type", gameTypeList);
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
        loadAccount.put("cookie", "preloode_filter_game");
        Map<String, Object> filterMap = this.filter.load(request, loadAccount);

        if (filterMap.containsKey("result")) {

            result.put("filter", filterMap);

        }

        Document findEq = new Document("status", "Active");
        MongoCursor<Document> gameTypeIterator = this.gameTypeRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> gameTypeList = new ArrayList<Object>();

        while (gameTypeIterator.hasNext()) {

            gameTypeList.add(gameTypeIterator.next());

        }

        result.put("type", gameTypeList);

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_game");
        String paginationEntry = this.pagination.load(request, paginationAccount);

        result.put("page", page);
        result.put("pagination", paginationEntry);
        result.put("result", true);

        return result;

    }


    public Map<String, Object> insert(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Game failed added");
                put("result", false);
            }

        };

        Map<String, Object> dataCreditMap = new HashMap<String, Object>() {

            {
                put("main", new BigDecimal("0.00"));
                put("promotion", new BigDecimal("0.00"));
            }

        };

        data.put("credit", dataCreditMap);

        if (data.get("sequence").toString().isEmpty()) {

            data.put("sequence", "0");

        }

        data.put("sequence", new BigDecimal(data.get("sequence").toString().replaceAll("[^0-9.]", "")).setScale(0, BigDecimal.ROUND_CEILING));

        Map<String, Object> validation = new HashMap<String, Object>() {

            {
                put("name", false);
                put("type", false);
            }

        };

        Map<String, Object> dataTypeMap = (Map<String, Object>) data.get("type");

        Document findEq = new Document("name", data.get("name")).append("type.id", dataTypeMap.get("id"));
        MongoCursor<Document> gameValidationIterator = this.gameRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (!gameValidationIterator.hasNext()) {

            validation.put("name", true);

        } else {

            result.put("response", "Name already exist");

        }

        findEq = new Document("_id", dataTypeMap.get("id"));
        gameValidationIterator = this.gameTypeRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (gameValidationIterator.hasNext()) {

            validation.put("type", true);

        } else {

            result.put("response", "Type doesn't exist");

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
            String gameInsertId = this.gameRepository.insertOne(request, insertOneData, insertOneAdministrator);

            Document insertLogTarget = new Document("target", new Document("id", gameInsertId)
                    .append("name", data.get("name")));
            this.administratorLogService.insert(request, insertOneAdministrator, "", "Add game", insertLogTarget);

            result.put("response", "Game successfully added");
            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> loadEntry(String id) {

        Map<String, Object> result = new HashMap<String, Object>();

        Document findEq = new Document("_id", id);
        MongoCursor<Document> gameIterator = this.gameRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (gameIterator.hasNext()) {

            result = gameIterator.next();

            Map<String, Object> resultCreditMap = (Map<String, Object>) result.get("credit");

            resultCreditMap.put("main", resultCreditMap.get("main").toString());
            resultCreditMap.put("promotion", resultCreditMap.get("promotion").toString());

            result.put("credit", resultCreditMap);

            result.put("sequence", result.get("sequence").toString());

        }

        return result;

    }


    public MongoCursor<Document> loadPagination(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_game");
        String size = this.pagination.load(request, paginationAccount);

        Map<String, Object> queryAccount = new HashMap<String, Object>();
        queryAccount.put("id", preloodeAccount.get("_id"));
        queryAccount.put("cookie", "preloode_filter_game");
        Document filterDocument = this.filter.query(request, queryAccount);

        return this.gameRepository.findPagination(filterDocument, new Document("created.timestamp", -1), (page - 1), Integer.parseInt(size));

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
        removeAccount.put("cookie", "preloode_filter_game");
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
        writeAccount.put("cookie", "preloode_pagination_game");
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

        Map<String, Object> tinymceUpload = this.image.upload(request, multipartRequest, this.path.getImage() + "/game/tinymce", 10024);

        if (tinymceUpload.get("result").equals(true)) {

            ArrayList<String> files = (ArrayList<String>) tinymceUpload.get("file");

            for (String string : files) {

                this.image.resize(request, this.path.getImage() + "/game/tinymce", string, 1920, 1920);

                result.put("location", this.url.getImage() + "/game/tinymce/" + string);

            }

        }

        return result;

    }


    public Map<String, Object> update(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Game failed edited");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> gameIterator = this.gameRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (gameIterator.hasNext()) {

            Map<String, Object> gameMap = gameIterator.next();

            Map<String, Object> validation = new HashMap<String, Object>() {

                {
                    put("name", false);
                    put("type", false);
                }

            };

            Map<String, Object> dataTypeMap = (Map<String, Object>) data.get("type");

            findEq = new Document("name", data.get("name")).append("type.id", dataTypeMap.get("id"));
            Document findNe = new Document("_id", gameMap.get("_id"));
            MongoCursor<Document> gameValidationIterator = this.gameRepository.findEqNeSort(findEq, findNe, new Document("created.timestamp", -1));

            if (!gameValidationIterator.hasNext()) {

                validation.put("name", true);

            } else {

                result.put("response", "Name already exist");

            }

            findEq = new Document("_id", dataTypeMap.get("id"));
            gameValidationIterator = this.gameTypeRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (gameValidationIterator.hasNext()) {

                validation.put("type", true);

            } else {

                result.put("response", "Type doesn't exist");

            }

            Boolean valid = true;

            for (Map.Entry<String, Object> map : validation.entrySet()) {

                if (map.getValue().equals(false)) {

                    valid = false;

                    break;

                }

            }

            if (valid) {

                if (!gameMap.get("file").equals(data.get("file"))) {

                    this.image.delete(request, this.path.getImage() + "/game", gameMap.get("file").toString());

                }

                Document updateOneEq = new Document("_id", gameMap.get("_id"));
                Document updateOneData = data;
                Document updateOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                        .append("username", preloodeAccount.get("username"));
                this.gameRepository.updateOne(request, updateOneEq, updateOneData, updateOneAdministrator);

                Document logData = (Document) gameMap;
                logData.put("game_id", gameMap.get("_id"));
                logData.remove("_id");
                logData.remove("created");
                logData.remove("modified");
                this.gameLogDataRepository.insertOne(request, logData, updateOneAdministrator);

                Document insertLogTarget = new Document("target", new Document("id", gameMap.get("_id"))
                        .append("name", gameMap.get("name")));
                this.administratorLogService.insert(request, updateOneAdministrator, "", "Edit game", insertLogTarget);

                result.put("response", "Game successfully edited");
                result.put("result", true);

            }

        } else {

            result.put("response", "Game doesn't exist");

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

        result = this.image.upload(request, multipartRequest, this.path.getImage() + "/game", 10024);

        if (result.get("result").equals(true)) {

            ArrayList<String> files = (ArrayList<String>) result.get("file");

            for (String string : files) {

                this.image.resize(request, this.path.getImage() + "/game", string, 1920, 1920);

            }

        }

        return result;

    }


}
