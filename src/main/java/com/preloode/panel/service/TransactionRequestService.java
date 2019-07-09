package com.preloode.panel.service;

import com.mongodb.client.MongoCursor;
import com.preloode.panel.component.Filter;
import com.preloode.panel.component.Image;
import com.preloode.panel.component.Log;
import com.preloode.panel.component.Pagination;
import com.preloode.panel.configuration.Path;
import com.preloode.panel.repository.*;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class TransactionRequestService {


    @Autowired
    private Path path;

    @Autowired
    private Filter filter;

    @Autowired
    private Image image;

    @Autowired
    private Log log;

    @Autowired
    private Pagination pagination;

    @Autowired
    private AdministratorLogService administratorLogService;

    @Autowired
    private BankRepository bankRepository;

    @Autowired
    private BankAccountRepository bankAccountRepository;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private GameTypeRepository gameTypeRepository;

    @Autowired
    private MemberRepository playerRepository;

    @Autowired
    private MemberGroupRepository playerGroupRepository;

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private TransactionRequestRepository transactionRequestRepository;


    public String createPaginationLink(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_transaction_request");
        String size = this.pagination.load(request, paginationAccount);

        return this.pagination.createLink(request, "/transaction/request", page, Integer.parseInt(size), (this.transactionRequestRepository.count()));

    }


    public Map<String, Object> delete(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Transaction request failed deleted");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> transactionRequestIterator = this.transactionRequestRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (transactionRequestIterator.hasNext()) {

            Map<String, Object> transactionRequestMap = transactionRequestIterator.next();

            Document deleteOneEq = new Document("_id", transactionRequestMap.get("_id"));
            this.transactionRequestRepository.deleteOne(deleteOneEq);

            this.image.delete(request, this.path.getImage() + "/transaction/request", transactionRequestMap.get("file").toString());

            Document insertLogAdministrator = new Document("id", preloodeAccount.get("_id"))
                    .append("username", preloodeAccount.get("username"));
            Document insertLogTarget = new Document("target", new Document("id", transactionRequestMap.get("_id"))
                    .append("type", transactionRequestMap.get("type")));
            this.administratorLogService.insert(request, insertLogAdministrator, "", "Delete transaction request", insertLogTarget);

            result.put("response", "Transaction request successfully deleted");
            result.put("result", true);

        } else {

            result.put("response", "Transaction request doesn't exist");

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
        writeAccount.put("cookie", "preloode_filter_transaction_request");
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
        MongoCursor<Document> transactionRequestIterator = this.transactionRequestRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (transactionRequestIterator.hasNext()) {

            Map<String, Object> transactionRequestMap = transactionRequestIterator.next();

            result.put("data", transactionRequestMap);

            Map<String, Object> transactionRequestGameMap = (Map<String, Object>) transactionRequestMap.get("game");
            Map<String, Object> transactionRequestGameTypeMap = (Map<String, Object>) transactionRequestGameMap.get("type");

            findEq = new Document("type.id", transactionRequestGameTypeMap.get("id")).append("status", "Active");
            MongoCursor<Document> gameIterator = this.gameRepository.findEqSort(findEq, new Document("sequence", 1));

            ArrayList<Object> gameList = new ArrayList<Object>();

            while (gameIterator.hasNext()) {

                gameList.add(gameIterator.next());

            }

            result.put("game", gameList);

            findEq = new Document("game.id", transactionRequestGameMap.get("id")).append("status", "Active");
            MongoCursor<Document> playerIterator = this.playerRepository.findEqSort(findEq, new Document("sequence", 1));

            ArrayList<Object> playerList = new ArrayList<Object>();

            while (playerIterator.hasNext()) {

                playerList.add(playerIterator.next());

            }

            result.put("player", playerList);

            findEq = new Document("game.id", transactionRequestGameMap.get("id")).append("status", "Active");
            Document findLte = new Document("minimum_deposit", transactionRequestMap.get("amount"));
            MongoCursor<Document> promotionIterator = this.promotionRepository.findEqLteSort(findEq, findLte, new Document("sequence", 1));

            ArrayList<Object> promotionList = new ArrayList<Object>();

            while (promotionIterator.hasNext()) {

                promotionList.add(promotionIterator.next());

            }

            result.put("promotion", promotionList);

            Map<String, Object> transactionRequestToBankMap = (Map<String, Object>) transactionRequestMap.get("to_bank");

            findEq = new Document("bank.id", transactionRequestToBankMap.get("id")).append("status", "Active");
            MongoCursor<Document> bankAccountIterator = this.bankAccountRepository.findEqSort(findEq, new Document("sequence", 1));

            ArrayList<Object> bankAccountList = new ArrayList<Object>();

            while (bankAccountIterator.hasNext()) {

                bankAccountList.add(bankAccountIterator.next());

            }

            result.put("toBankAccount", bankAccountList);

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
        loadAccount.put("cookie", "preloode_filter_transaction_request");
        Map<String, Object> filterMap = this.filter.load(request, loadAccount);

        if (filterMap.containsKey("result")) {

            result.put("filter", filterMap);

        }

        Document findEq = new Document("status", "Active");
        MongoCursor<Document> bankIterator = this.bankRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> bankList = new ArrayList<Object>();

        while (bankIterator.hasNext()) {

            bankList.add(bankIterator.next());

        }

        result.put("bank", bankList);

        findEq = new Document("status", "Active");
        MongoCursor<Document> bankAccountIterator = this.bankAccountRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> bankAccountList = new ArrayList<Object>();

        while (bankAccountIterator.hasNext()) {

            bankAccountList.add(bankAccountIterator.next());

        }

        result.put("bankAccount", bankAccountList);

        findEq = new Document("status", "Active");
        MongoCursor<Document> gameIterator = this.gameRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> gameList = new ArrayList<Object>();

        while (gameIterator.hasNext()) {

            gameList.add(gameIterator.next());

        }

        result.put("game", gameList);

        findEq = new Document("status", "Active");
        MongoCursor<Document> playerIterator = this.playerRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        ArrayList<Object> playerList = new ArrayList<Object>();

        while (playerIterator.hasNext()) {

            playerList.add(playerIterator.next());

        }

        result.put("player", playerList);

        findEq = new Document("status", "Active");
        MongoCursor<Document> promotionIterator = this.promotionRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> promotionList = new ArrayList<Object>();

        while (promotionIterator.hasNext()) {

            promotionList.add(promotionIterator.next());

        }

        result.put("promotion", promotionList);

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_transaction_request");
        String paginationEntry = this.pagination.load(request, paginationAccount);

        result.put("page", page);
        result.put("pagination", paginationEntry);
        result.put("result", true);

        return result;

    }


    public Map<String, Object> insert(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Transaction request failed added");
                put("result", false);
            }

        };

        BigDecimal amount = new BigDecimal(data.get("amount").toString().replaceAll("[^0-9.]", "")).setScale(2, BigDecimal.ROUND_CEILING);
        data.put("amount", amount.toString());
        data.put("calculation", "Active");
        data.put("status", "Pending");

        Map<String, Object> validation = new HashMap<String, Object>() {

            {
                put("fromPlayer", false);
                put("fromPlayerBankAccount", false);
                put("game", true);
                put("gameType", true);
                put("promotion", true);
                put("toBank", false);
                put("toBankAccount", false);
                put("toPlayer", false);
                put("toPlayerBankAccount", false);
            }

        };

        Map<String, Object> dataFromPlayerMap = (Map<String, Object>) data.get("from_player");

        Document findEq = new Document("_id", dataFromPlayerMap.get("id"));
        MongoCursor<Document> transactionRequestValidationIterator = this.playerRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (data.get("type").equals("Deposit")) {

            if (transactionRequestValidationIterator.hasNext()) {

                validation.put("fromPlayer", true);

            } else {

                result.put("response", "From player doesn't exist");

            }

        } else {

            validation.put("fromPlayer", true);

        }

        Map<String, Object> dataFromPlayerBankMap = (Map<String, Object>) dataFromPlayerMap.get("bank");
        Map<String, Object> dataFromPlayerBankAccountMap = (Map<String, Object>) dataFromPlayerBankMap.get("account");

        findEq = new Document("_id", dataFromPlayerMap.get("id")).append("bank.id", dataFromPlayerBankMap.get("id")).append("bank.account.id", dataFromPlayerBankAccountMap.get("id"));
        transactionRequestValidationIterator = this.playerRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (data.get("type").equals("Deposit")) {

            if (transactionRequestValidationIterator.hasNext()) {

                validation.put("fromPlayerBankAccount", true);

            } else {

                result.put("response", "From player bank account doesn't exist");

            }

        } else {

            validation.put("fromPlayerBankAccount", true);

        }

        Map<String, Object> dataGameMap = (Map<String, Object>) data.get("game");

        if (!dataGameMap.get("id").toString().isEmpty()) {

            findEq = new Document("_id", dataGameMap.get("id"));
            transactionRequestValidationIterator = this.gameRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (!transactionRequestValidationIterator.hasNext()) {

                validation.put("game", false);
                result.put("response", "Game doesn't exist");

            }

        }

        Map<String, Object> dataGameTypeMap = (Map<String, Object>) dataGameMap.get("type");

        if (!dataGameTypeMap.get("id").toString().isEmpty()) {

            findEq = new Document("_id", dataGameTypeMap.get("id"));
            transactionRequestValidationIterator = this.gameTypeRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (!transactionRequestValidationIterator.hasNext()) {

                validation.put("gameType", false);
                result.put("response", "Game type doesn't exist");

            }

        }

        Map<String, Object> dataPromotionMap = (Map<String, Object>) data.get("promotion");

        dataPromotionMap.put("amount", new BigDecimal("0.00"));

        if (dataPromotionMap.get("name").equals("Promotion")) {

            dataPromotionMap.put("name", "");

        }

        if (data.get("type").equals("Deposit")) {

            if (!dataPromotionMap.get("id").equals("")) {

                findEq = new Document("_id", dataPromotionMap.get("id"));
                transactionRequestValidationIterator = this.promotionRepository.findEqSort(findEq, new Document("created.timestamp", -1));

                if (transactionRequestValidationIterator.hasNext()) {

                    Map<String, Object> promotionMap = transactionRequestValidationIterator.next();

                    if (promotionMap.get("type").equals("Fix Amount")) {

                        dataPromotionMap.put("amount", promotionMap.get("amount"));

                    } else {

                        BigDecimal promotionAmount = new BigDecimal(data.get("amount").toString()).multiply(new BigDecimal(promotionMap.get("percentage").toString())).divide(new BigDecimal("100"), 2, RoundingMode.CEILING);
                        dataPromotionMap.put("amount", promotionAmount);

                    }

                } else {

                    validation.put("promotion", false);
                    result.put("response", "Promotion doesn't exist");

                }

            }

        } else {

            validation.put("promotion", true);

        }

        dataPromotionMap.put("amount", dataPromotionMap.get("amount").toString());
        data.put("promotion", dataPromotionMap);

        Map<String, Object> dataToBankMap = (Map<String, Object>) data.get("to_bank");

        if (data.get("type").equals("Deposit")) {

            findEq = new Document("_id", dataToBankMap.get("id"));
            transactionRequestValidationIterator = this.bankRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (transactionRequestValidationIterator.hasNext()) {

                validation.put("toBank", true);

            } else {

                result.put("response", "To bank doesn't exist");

            }

        } else {

            validation.put("toBank", true);

        }

        Map<String, Object> dataToBankAccountMap = (Map<String, Object>) dataToBankMap.get("account");

        if (data.get("type").equals("Deposit")) {

            findEq = new Document("_id", dataToBankAccountMap.get("id"));
            transactionRequestValidationIterator = this.bankAccountRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (transactionRequestValidationIterator.hasNext()) {

                validation.put("toBankAccount", true);

            } else {

                result.put("response", "To bank account doesn't exist");

            }

        } else {

            validation.put("toBankAccount", true);

        }

        Map<String, Object> dataToPlayerMap = (Map<String, Object>) data.get("to_player");

        if (data.get("type").equals("Withdrawal")) {

            findEq = new Document("_id", dataToPlayerMap.get("id"));
            transactionRequestValidationIterator = this.playerRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (transactionRequestValidationIterator.hasNext()) {

                validation.put("toPlayer", true);

            } else {

                result.put("response", "To player doesn't exist");

            }

        } else {

            validation.put("toPlayer", true);

        }

        Map<String, Object> dataToPlayerBankMap = (Map<String, Object>) dataToPlayerMap.get("bank");
        Map<String, Object> dataToPlayerBankAccountMap = (Map<String, Object>) dataToPlayerBankMap.get("account");

        if (data.get("type").equals("Withdrawal")) {

            findEq = new Document("_id", dataToPlayerMap.get("id")).append("bank.id", dataToPlayerBankMap.get("id")).append("bank.account.id", dataToPlayerBankAccountMap.get("id"));
            transactionRequestValidationIterator = this.playerRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (transactionRequestValidationIterator.hasNext()) {

                validation.put("toPlayerBankAccount", true);

            } else {

                result.put("response", "To player bank account doesn't exist");

            }

        } else {

            validation.put("toPlayerBankAccount", true);

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
            String transactionRequestInsertId = this.transactionRequestRepository.insertOne(request, insertOneData, insertOneAdministrator);

            Document insertLogTarget = new Document("target", new Document("id", transactionRequestInsertId)
                    .append("type", data.get("type")));
            this.administratorLogService.insert(request, insertOneAdministrator, "", "Add transaction request", insertLogTarget);

            result.put("response", "Transaction request successfully added");
            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> loadBankAccount(Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Bank account failed loaded");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("playerGroupId"));
        MongoCursor<Document> playerGroupIterator = this.playerGroupRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<String> playerGroupBankAccountIdList = new ArrayList<String>();

        if (playerGroupIterator.hasNext()) {

            Map<String, Object> playerGroupMap = playerGroupIterator.next();
            Map<String, Object> playerGroupBankMap = (Map<String, Object>) playerGroupMap.get("bank");
            Map<String, Object> playerGroupBankAccountMap = (Map<String, Object>) playerGroupBankMap.get("account");
            playerGroupBankAccountIdList = (ArrayList<String>) playerGroupBankAccountMap.get("id");

        }

        findEq = new Document("bank.id", data.get("bankId")).append("status", "Active").append("type", data.get("type"));
        MongoCursor<Document> bankAccountIterator = this.bankAccountRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> bankAccountList = new ArrayList<Object>();

        while (bankAccountIterator.hasNext()) {

            Map<String, Object> bankAccountMap = bankAccountIterator.next();

            if (playerGroupBankAccountIdList.contains(bankAccountMap.get("_id").toString())) {

                bankAccountList.add(bankAccountMap);

            }

        }

        result.put("bankAccount", bankAccountList);
        result.put("result", true);

        return result;

    }


    public Map<String, Object> loadEntry(String id) {

        Map<String, Object> result = new HashMap<String, Object>();

        Document findEq = new Document("_id", id);
        MongoCursor<Document> transactionRequestIterator = this.transactionRequestRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (transactionRequestIterator.hasNext()) {

            result = transactionRequestIterator.next();

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
        paginationAccount.put("cookie", "preloode_pagination_transaction_request");
        String size = this.pagination.load(request, paginationAccount);

        Map<String, Object> queryAccount = new HashMap<String, Object>();
        queryAccount.put("id", preloodeAccount.get("_id"));
        queryAccount.put("cookie", "preloode_filter_transaction_request");
        Document filterDocument = this.filter.query(request, queryAccount);

        return this.transactionRequestRepository.findPagination(filterDocument, new Document("created.timestamp", -1), (page - 1), Integer.parseInt(size));

    }


    public Map<String, Object> loadPlayer(Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Player failed loaded");
                put("result", false);
            }

        };

        Document findEq = new Document("game.id", data.get("gameId")).append("status", "Active");
        MongoCursor<Document> playerIterator = this.playerRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> playerList = new ArrayList<Object>();

        while (playerIterator.hasNext()) {

            playerList.add(playerIterator.next());

        }

        result.put("player", playerList);
        result.put("result", true);

        return result;

    }


    public Map<String, Object> loadPlayerBankAccount(Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Player bank account failed loaded");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("playerId")).append("status", "Active");
        MongoCursor<Document> playerIterator = this.playerRepository.findEqSort(findEq, new Document("sequence", 1));

        Map<String, Object> playerBankMap = new HashMap<String, Object>();

        if (playerIterator.hasNext()) {

            Map<String, Object> playerMap = playerIterator.next();
            playerBankMap = (Map<String, Object>) playerMap.get("bank");

        }

        result.put("playerBank", playerBankMap);
        result.put("result", true);

        return result;

    }


    public Map<String, Object> loadPromotion(Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Promotion failed loaded");
                put("result", false);
            }

        };

        data.put("amount", data.get("amount").toString().replaceAll("[^0-9.]", ""));

        Document findEq = new Document("game.id", data.get("gameId")).append("status", "Active");
        Document findLte = new Document("minimum_deposit", data.get("amount"));
        MongoCursor<Document> promotionIterator = this.promotionRepository.findEqLteSort(findEq, findLte, new Document("sequence", 1));

        ArrayList<Object> promotionList = new ArrayList<Object>();

        while (promotionIterator.hasNext()) {

            promotionList.add(promotionIterator.next());

        }

        result.put("promotion", promotionList);
        result.put("result", true);

        return result;

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
        removeAccount.put("cookie", "preloode_filter_transaction_request");
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
        writeAccount.put("cookie", "preloode_pagination_transaction_request");
        Boolean paginationSet = this.pagination.set(response, writeAccount, data.get("pagination").toString());

        if (paginationSet) {

            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> update(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Transaction request failed edited");
                put("result", false);
            }

        };

        BigDecimal amount = new BigDecimal(data.get("amount").toString().replaceAll("[^0-9.]", "")).setScale(2, BigDecimal.ROUND_CEILING);
        data.put("amount", amount.toString());

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> transactionRequestIterator = this.transactionRequestRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (transactionRequestIterator.hasNext()) {

            Map<String, Object> transactionMap = transactionRequestIterator.next();

            data.put("calculation", transactionMap.get("calculation"));
            data.put("status", transactionMap.get("status"));

            Map<String, Object> validation = new HashMap<String, Object>() {

                {
                    put("fromPlayer", false);
                    put("fromPlayerBankAccount", false);
                    put("game", true);
                    put("gameType", true);
                    put("promotion", true);
                    put("toBank", false);
                    put("toBankAccount", false);
                    put("toPlayer", false);
                    put("toPlayerBankAccount", false);
                }

            };

            Map<String, Object> dataFromPlayerMap = (Map<String, Object>) data.get("from_player");

            findEq = new Document("_id", dataFromPlayerMap.get("id"));
            MongoCursor<Document> transactionRequestValidationIterator = this.playerRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (data.get("type").equals("Deposit")) {

                if (transactionRequestValidationIterator.hasNext()) {

                    validation.put("fromPlayer", true);

                } else {

                    result.put("response", "From player doesn't exist");

                }

            } else {

                validation.put("fromPlayer", true);

            }

            Map<String, Object> dataFromPlayerBankMap = (Map<String, Object>) dataFromPlayerMap.get("bank");
            Map<String, Object> dataFromPlayerBankAccountMap = (Map<String, Object>) dataFromPlayerBankMap.get("account");

            findEq = new Document("_id", dataFromPlayerMap.get("id")).append("bank.id", dataFromPlayerBankMap.get("id")).append("bank.account.id", dataFromPlayerBankAccountMap.get("id"));
            transactionRequestValidationIterator = this.playerRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (data.get("type").equals("Deposit")) {

                if (transactionRequestValidationIterator.hasNext()) {

                    validation.put("fromPlayerBankAccount", true);

                } else {

                    result.put("response", "From player bank account doesn't exist");

                }

            } else {

                validation.put("fromPlayerBankAccount", true);

            }

            Map<String, Object> dataGameMap = (Map<String, Object>) data.get("game");

            if (!dataGameMap.get("id").toString().isEmpty()) {

                findEq = new Document("_id", dataGameMap.get("id"));
                transactionRequestValidationIterator = this.gameRepository.findEqSort(findEq, new Document("created.timestamp", -1));

                if (!transactionRequestValidationIterator.hasNext()) {

                    validation.put("game", false);
                    result.put("response", "Game doesn't exist");

                }

            }

            Map<String, Object> dataGameTypeMap = (Map<String, Object>) dataGameMap.get("type");

            if (!dataGameTypeMap.get("id").toString().isEmpty()) {

                findEq = new Document("_id", dataGameTypeMap.get("id"));
                transactionRequestValidationIterator = this.gameTypeRepository.findEqSort(findEq, new Document("created.timestamp", -1));

                if (!transactionRequestValidationIterator.hasNext()) {

                    validation.put("gameType", false);
                    result.put("response", "Game type doesn't exist");

                }

            }

            Map<String, Object> dataPromotionMap = (Map<String, Object>) data.get("promotion");

            dataPromotionMap.put("amount", new BigDecimal("0.00"));

            if (dataPromotionMap.get("name").equals("Promotion")) {

                dataPromotionMap.put("name", "");

            }

            if (data.get("type").equals("Deposit")) {

                if (!dataPromotionMap.get("id").equals("")) {

                    findEq = new Document("_id", dataPromotionMap.get("id"));
                    transactionRequestValidationIterator = this.promotionRepository.findEqSort(findEq, new Document("created.timestamp", -1));

                    if (transactionRequestValidationIterator.hasNext()) {

                        Map<String, Object> promotionMap = transactionRequestValidationIterator.next();

                        if (promotionMap.get("type").equals("Fix Amount")) {

                            dataPromotionMap.put("amount", promotionMap.get("amount"));

                        } else {

                            BigDecimal promotionAmount = new BigDecimal(data.get("amount").toString()).multiply(new BigDecimal(promotionMap.get("percentage").toString())).divide(new BigDecimal("100"), 2, RoundingMode.CEILING);
                            dataPromotionMap.put("amount", promotionAmount);

                        }

                    } else {

                        validation.put("promotion", false);
                        result.put("response", "Promotion doesn't exist");

                    }

                }

            } else {

                validation.put("promotion", true);

            }

            dataPromotionMap.put("amount", dataPromotionMap.get("amount").toString());
            data.put("promotion", dataPromotionMap);

            Map<String, Object> dataToBankMap = (Map<String, Object>) data.get("to_bank");

            if (data.get("type").equals("Deposit")) {

                findEq = new Document("_id", dataToBankMap.get("id"));
                transactionRequestValidationIterator = this.bankRepository.findEqSort(findEq, new Document("created.timestamp", -1));

                if (transactionRequestValidationIterator.hasNext()) {

                    validation.put("toBank", true);

                } else {

                    result.put("response", "To bank doesn't exist");

                }

            } else {

                validation.put("toBank", true);

            }

            Map<String, Object> dataToBankAccountMap = (Map<String, Object>) dataToBankMap.get("account");

            if (data.get("type").equals("Deposit")) {

                findEq = new Document("_id", dataToBankAccountMap.get("id"));
                transactionRequestValidationIterator = this.bankAccountRepository.findEqSort(findEq, new Document("created.timestamp", -1));

                if (transactionRequestValidationIterator.hasNext()) {

                    validation.put("toBankAccount", true);

                } else {

                    result.put("response", "To bank account doesn't exist");

                }

            } else {

                validation.put("toBankAccount", true);

            }

            Map<String, Object> dataToPlayerMap = (Map<String, Object>) data.get("to_player");

            if (data.get("type").equals("Withdrawal")) {

                findEq = new Document("_id", dataToPlayerMap.get("id"));
                transactionRequestValidationIterator = this.playerRepository.findEqSort(findEq, new Document("created.timestamp", -1));

                if (transactionRequestValidationIterator.hasNext()) {

                    validation.put("toPlayer", true);

                } else {

                    result.put("response", "To player doesn't exist");

                }

            } else {

                validation.put("toPlayer", true);

            }

            Map<String, Object> dataToPlayerBankMap = (Map<String, Object>) dataToPlayerMap.get("bank");
            Map<String, Object> dataToPlayerBankAccountMap = (Map<String, Object>) dataToPlayerBankMap.get("account");

            if (data.get("type").equals("Withdrawal")) {

                findEq = new Document("_id", dataToPlayerMap.get("id")).append("bank.id", dataToPlayerBankMap.get("id")).append("bank.account.id", dataToPlayerBankAccountMap.get("id"));
                transactionRequestValidationIterator = this.playerRepository.findEqSort(findEq, new Document("created.timestamp", -1));

                if (transactionRequestValidationIterator.hasNext()) {

                    validation.put("toPlayerBankAccount", true);

                } else {

                    result.put("response", "To player bank account doesn't exist");

                }

            } else {

                validation.put("toPlayerBankAccount", true);

            }

            Boolean valid = true;

            for (Map.Entry<String, Object> map : validation.entrySet()) {

                if (map.getValue().equals(false)) {

                    valid = false;

                    break;

                }

            }

            if (valid) {

                if (!transactionMap.get("file").equals(data.get("file"))) {

                    this.image.delete(request, this.path.getImage() + "/transaction", transactionMap.get("file").toString());

                }

                Document updateOneEq = new Document("_id", transactionMap.get("_id"));
                Document updateOneData = data;
                Document updateOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                        .append("username", preloodeAccount.get("username"));
                this.transactionRequestRepository.updateOne(request, updateOneEq, updateOneData, updateOneAdministrator);

                Document insertLogTarget = new Document("target", new Document("id", transactionMap.get("_id"))
                        .append("type", transactionMap.get("type")));
                this.administratorLogService.insert(request, updateOneAdministrator, "", "Edit transaction", insertLogTarget);

                result.put("response", "Transaction request successfully edited");
                result.put("result", true);

            }

        } else {

            result.put("response", "Transaction request doesn't exist");

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

        result = this.image.upload(request, multipartRequest, this.path.getImage() + "/transaction/request", 10024);

        if (result.get("result").equals(true)) {

            ArrayList<String> files = (ArrayList<String>) result.get("file");

            for (String string : files) {

                this.image.resize(request, this.path.getImage() + "/transaction/request", string, 1920, 1920);

            }

        }

        return result;

    }


}
