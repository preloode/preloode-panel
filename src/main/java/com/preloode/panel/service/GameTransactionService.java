package com.preloode.panel.service;

import com.mongodb.client.MongoCursor;
import com.preloode.panel.component.Filter;
import com.preloode.panel.component.Image;
import com.preloode.panel.component.Pagination;
import com.preloode.panel.configuration.Path;
import com.preloode.panel.repository.*;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class GameTransactionService {


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
    private BankRepository bankRepository;

    @Autowired
    private BankAccountRepository bankAccountRepository;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private GameTransactionRepository gameTransactionRepository;

    @Autowired
    private GameTypeRepository gameTypeRepository;

    @Autowired
    private MemberRepository playerRepository;


    public String createPaginationLink(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_game_transaction");
        String size = this.pagination.load(request, paginationAccount);

        return this.pagination.createLink(request, "/game/transaction", page, Integer.parseInt(size), (this.gameTransactionRepository.count()));

    }


    public Map<String, Object> delete(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Game transaction failed deleted");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> gameTransactionIterator = this.gameTransactionRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (gameTransactionIterator.hasNext()) {

            Map<String, Object> gameTransactionMap = gameTransactionIterator.next();

            Document deleteOneEq = new Document("_id", gameTransactionMap.get("_id"));
            this.gameTransactionRepository.deleteOne(deleteOneEq);

            this.image.delete(request, this.path.getImage() + "/game/transaction", gameTransactionMap.get("file").toString());

            Document insertLogAdministrator = new Document("id", preloodeAccount.get("_id"))
                    .append("username", preloodeAccount.get("username"));
            Document insertLogTarget = new Document("target", new Document("id", gameTransactionMap.get("_id"))
                    .append("name", gameTransactionMap.get("name")));
            this.administratorLogService.insert(request, insertLogAdministrator, "", "Delete game transaction", insertLogTarget);

            result.put("response", "Game transaction successfully deleted");
            result.put("result", true);

        } else {

            result.put("response", "Game transaction doesn't exist");

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
        writeAccount.put("cookie", "preloode_filter_game_transaction");
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
        MongoCursor<Document> gameTransactionIterator = this.gameTransactionRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (gameTransactionIterator.hasNext()) {

            Map<String, Object> gameTransactionMap = gameTransactionIterator.next();

            result.put("data", gameTransactionMap);

            Map<String, Object> gameTransactionGameMap = (Map<String, Object>) gameTransactionMap.get("game");
            Map<String, Object> gameTransactionGameTypeMap = (Map<String, Object>) gameTransactionGameMap.get("type");

            findEq = new Document("type.id", gameTransactionGameTypeMap.get("id")).append("status", "Active");
            MongoCursor<Document> gameIterator = this.gameRepository.findEqSort(findEq, new Document("sequence", 1));

            ArrayList<Object> gameList = new ArrayList<Object>();

            while (gameIterator.hasNext()) {

                gameList.add(gameIterator.next());

            }

            result.put("game", gameList);

        }

        findEq = new Document("status", "Active");
        MongoCursor<Document> bankIterator = this.bankRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> bankList = new ArrayList<Object>();

        while (bankIterator.hasNext()) {

            bankList.add(bankIterator.next());

        }

        result.put("bank", bankList);

        findEq = new Document("status", "Active");
        MongoCursor<Document> gameTypeIterator = this.gameTypeRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> gameTypeList = new ArrayList<Object>();

        while (gameTypeIterator.hasNext()) {

            gameTypeList.add(gameTypeIterator.next());

        }

        result.put("gameType", gameTypeList);
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
        loadAccount.put("cookie", "preloode_filter_game_transaction");
        Map<String, Object> filterMap = this.filter.load(request, loadAccount);

        if (filterMap.containsKey("result")) {

            result.put("filter", filterMap);

        }

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_game_transaction");
        String paginationEntry = this.pagination.load(request, paginationAccount);

        result.put("page", page);
        result.put("pagination", paginationEntry);
        result.put("result", true);

        return result;

    }


    public Map<String, Object> insert(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Game transaction failed added");
                put("result", false);
            }

        };

        Map<String, Object> validation = new HashMap<String, Object>() {

            {
                put("fromBank", false);
                put("fromBankAccount", false);
                put("fromPlayer", false);
                put("game", false);
                put("gameType", false);
                put("toPlayer", false);
            }

        };

        if (data.get("type").equals("Commission")) {

            validation.put("fromBank", true);
            validation.put("fromBankAccount", true);
            validation.put("fromPlayer", true);
            validation.put("toPlayer", true);

        } else if (data.get("type").equals("Deposit") || data.get("type").equals("Promotion")) {

            Map<String, Object> toPlayerMap = (Map<String, Object>) data.get("to_player");

            Document findEq = new Document("_id", toPlayerMap.get("id"));
            MongoCursor<Document> gameTransactionValidationIterator = this.playerRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (gameTransactionValidationIterator.hasNext()) {

                validation.put("toPlayer", true);

            } else {

                result.put("response", "To player doesn't exist");

            }

            validation.put("fromBank", true);
            validation.put("fromBankAccount", true);
            validation.put("fromPlayer", true);

        } else if (data.get("type").equals("Top Up")) {

            Map<String, Object> fromBankMap = (Map<String, Object>) data.get("from_bank");

            Document findEq = new Document("_id", fromBankMap.get("id"));
            MongoCursor<Document> gameTransactionValidationIterator = this.bankRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (gameTransactionValidationIterator.hasNext()) {

                validation.put("fromBank", true);

            } else {

                result.put("response", "From bank doesn't exist");

            }

            Map<String, Object> fromBankAccountMap = (Map<String, Object>) fromBankMap.get("account");

            findEq = new Document("_id", fromBankAccountMap.get("id"));
            gameTransactionValidationIterator = this.bankAccountRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (gameTransactionValidationIterator.hasNext()) {

                validation.put("fromBankAccount", true);

            } else {

                result.put("response", "From bank account doesn't exist");

            }

            validation.put("fromPlayer", true);
            validation.put("toPlayer", true);

        } else if (data.get("type").equals("Withdrawal")) {

            Map<String, Object> fromPlayerMap = (Map<String, Object>) data.get("from_player");

            Document findEq = new Document("_id", fromPlayerMap.get("id"));
            MongoCursor<Document> gameTransactionValidationIterator = this.playerRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (gameTransactionValidationIterator.hasNext()) {

                validation.put("fromPlayer", true);

            } else {

                result.put("response", "From player doesn't exist");

            }

            validation.put("fromBank", true);
            validation.put("fromBankAccount", true);
            validation.put("toPlayer", true);

        }

        Map<String, Object> gameMap = (Map<String, Object>) data.get("game");

        Document findEq = new Document("_id", gameMap.get("id"));
        MongoCursor<Document> gameTransactionValidationIterator = this.gameRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (gameTransactionValidationIterator.hasNext()) {

            validation.put("game", true);

        } else {

            result.put("response", "Game doesn't exist");

        }

        Map<String, Object> gameTypeMap = (Map<String, Object>) gameMap.get("type");

        findEq = new Document("_id", gameTypeMap.get("id"));
        gameTransactionValidationIterator = this.gameTypeRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (gameTransactionValidationIterator.hasNext()) {

            validation.put("gameType", true);

        } else {

            result.put("response", "Game type doesn't exist");

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
            String gameTransactionInsertId = this.gameTransactionRepository.insertOne(request, insertOneData, insertOneAdministrator);

            Document insertLogTarget = new Document("target", new Document("id", gameTransactionInsertId)
                    .append("name", data.get("name")));
            this.administratorLogService.insert(request, insertOneAdministrator, "", "Add game transaction", insertLogTarget);

            result.put("response", "Game transaction successfully added");
            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> loadEntry(String id) {

        Map<String, Object> result = new HashMap<String, Object>();

        Document findEq = new Document("_id", id);
        MongoCursor<Document> gameTransactionIterator = this.gameTransactionRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (gameTransactionIterator.hasNext()) {

            result = gameTransactionIterator.next();

        }

        return result;

    }


    public Map<String, Object> loadGame(Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Game failed loaded");
                put("result", false);
            }

        };

        Document findEq = new Document("type.id", data.get("typeId")).append("status", "Active");
        MongoCursor<Document> gameIterator = this.gameRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> gameList = new ArrayList<Object>();

        while (gameIterator.hasNext()) {

            gameList.add(gameIterator.next());

        }

        result.put("game", gameList);
        result.put("result", true);

        return result;

    }


    public MongoCursor<Document> loadPagination(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_game_transaction");
        String size = this.pagination.load(request, paginationAccount);

        Map<String, Object> queryAccount = new HashMap<String, Object>();
        queryAccount.put("id", preloodeAccount.get("_id"));
        queryAccount.put("cookie", "preloode_filter_game_transaction");
        Document filterDocument = this.filter.query(request, queryAccount);

        return this.gameTransactionRepository.findPagination(filterDocument, new Document("created.timestamp", -1), (page - 1), Integer.parseInt(size));

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
        removeAccount.put("cookie", "preloode_filter_game_transaction");
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
        writeAccount.put("cookie", "preloode_pagination_game_transaction");
        Boolean paginationSet = this.pagination.set(response, writeAccount, data.get("pagination").toString());

        if (paginationSet) {

            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> update(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Game transaction failed edited");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> gameTransactionIterator = this.gameTransactionRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (gameTransactionIterator.hasNext()) {

            Map<String, Object> gameTransactionMap = gameTransactionIterator.next();

            Map<String, Object> validation = new HashMap<String, Object>() {

                {
                    put("fromBank", false);
                    put("fromBankAccount", false);
                    put("fromPlayer", false);
                    put("game", false);
                    put("gameType", false);
                    put("toPlayer", false);
                }

            };

            if (data.get("type").equals("Commission")) {

                validation.put("fromBank", true);
                validation.put("fromBankAccount", true);
                validation.put("fromPlayer", true);
                validation.put("toPlayer", true);

            } else if (data.get("type").equals("Deposit") || data.get("type").equals("Promotion")) {

                Map<String, Object> toPlayerMap = (Map<String, Object>) data.get("to_player");

                findEq = new Document("_id", toPlayerMap.get("id"));
                MongoCursor<Document> gameTransactionValidationIterator = this.playerRepository.findEqSort(findEq, new Document("created.timestamp", -1));

                if (gameTransactionValidationIterator.hasNext()) {

                    validation.put("toPlayer", true);

                } else {

                    result.put("response", "To player doesn't exist");

                }

                validation.put("fromBank", true);
                validation.put("fromBankAccount", true);
                validation.put("fromPlayer", true);

            } else if (data.get("type").equals("Top Up")) {

                Map<String, Object> fromBankMap = (Map<String, Object>) data.get("from_bank");

                findEq = new Document("_id", fromBankMap.get("id"));
                MongoCursor<Document> gameTransactionValidationIterator = this.bankRepository.findEqSort(findEq, new Document("created.timestamp", -1));

                if (gameTransactionValidationIterator.hasNext()) {

                    validation.put("fromBank", true);

                } else {

                    result.put("response", "From bank doesn't exist");

                }

                Map<String, Object> fromBankAccountMap = (Map<String, Object>) fromBankMap.get("account");

                findEq = new Document("_id", fromBankAccountMap.get("id"));
                gameTransactionValidationIterator = this.bankAccountRepository.findEqSort(findEq, new Document("created.timestamp", -1));

                if (gameTransactionValidationIterator.hasNext()) {

                    validation.put("fromBankAccount", true);

                } else {

                    result.put("response", "From bank account doesn't exist");

                }

                validation.put("fromPlayer", true);
                validation.put("toPlayer", true);

            } else if (data.get("type").equals("Withdrawal")) {

                Map<String, Object> fromPlayerMap = (Map<String, Object>) data.get("from_player");

                findEq = new Document("_id", fromPlayerMap.get("id"));
                MongoCursor<Document> gameTransactionValidationIterator = this.playerRepository.findEqSort(findEq, new Document("created.timestamp", -1));

                if (gameTransactionValidationIterator.hasNext()) {

                    validation.put("fromPlayer", true);

                } else {

                    result.put("response", "From player doesn't exist");

                }

                validation.put("fromBank", true);
                validation.put("fromBankAccount", true);
                validation.put("toPlayer", true);

            }

            Map<String, Object> gameMap = (Map<String, Object>) data.get("game");

            findEq = new Document("_id", gameMap.get("id"));
            MongoCursor<Document> gameTransactionValidationIterator = this.gameRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (gameTransactionValidationIterator.hasNext()) {

                validation.put("game", true);

            } else {

                result.put("response", "Game doesn't exist");

            }

            Map<String, Object> gameTypeMap = (Map<String, Object>) gameMap.get("type");

            findEq = new Document("_id", gameTypeMap.get("id"));
            gameTransactionValidationIterator = this.gameTypeRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (gameTransactionValidationIterator.hasNext()) {

                validation.put("gameType", true);

            } else {

                result.put("response", "Game type doesn't exist");

            }

            Boolean valid = true;

            for (Map.Entry<String, Object> map : validation.entrySet()) {

                if (map.getValue().equals(false)) {

                    valid = false;

                    break;

                }

            }

            if (valid) {

                Document updateOneEq = new Document("_id", gameTransactionMap.get("_id"));
                Document updateOneData = data;
                ;
                Document updateOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                        .append("username", preloodeAccount.get("username"));
                this.gameTransactionRepository.updateOne(request, updateOneEq, updateOneData, updateOneAdministrator);

                Document insertLogTarget = new Document("target", new Document("id", gameTransactionMap.get("_id"))
                        .append("name", gameTransactionMap.get("name")));
                this.administratorLogService.insert(request, updateOneAdministrator, "", "Edit game type", insertLogTarget);

                result.put("response", "Game transaction successfully edited");
                result.put("result", true);

            }

        } else {

            result.put("response", "Game transaction doesn't exist");

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

        result = this.image.upload(request, multipartRequest, this.path.getImage() + "/game/transaction", 10024);

        if (result.get("result").equals(true)) {

            ArrayList<String> files = (ArrayList<String>) result.get("file");

            for (String string : files) {

                this.image.resize(request, this.path.getImage() + "/game/transaction", string, 1920, 1920);

            }

        }

        return result;

    }


}
