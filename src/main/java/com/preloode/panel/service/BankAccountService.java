package com.preloode.panel.service;

import com.mongodb.client.MongoCursor;
import com.preloode.panel.component.Filter;
import com.preloode.panel.component.Image;
import com.preloode.panel.component.Pagination;
import com.preloode.panel.configuration.Path;
import com.preloode.panel.repository.BankAccountLogDataRepository;
import com.preloode.panel.repository.BankAccountRepository;
import com.preloode.panel.repository.BankRepository;
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
public class BankAccountService {


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
    private BankAccountLogDataRepository bankAccountLogDataRepository;

    @Autowired
    private BankAccountRepository bankAccountRepository;


    public String createPaginationLink(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_bank_account");
        String size = this.pagination.load(request, paginationAccount);

        return this.pagination.createLink(request, "/bank/account", page, Integer.parseInt(size), (this.bankAccountRepository.count()));

    }


    public Map<String, Object> delete(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Bank account failed deleted");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> bankAccountIterator = this.bankAccountRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (bankAccountIterator.hasNext()) {

            Map<String, Object> bankAccountMap = bankAccountIterator.next();

            Document deleteOneEq = new Document("_id", bankAccountMap.get("_id"));
            this.bankRepository.deleteOne(deleteOneEq);

            this.image.delete(request, this.path.getImage() + "/bank/account", bankAccountMap.get("file").toString());

            Map<String, Object> bankAccountNameMap = (Map<String, Object>) bankAccountMap.get("name");

            String account = bankAccountMap.get("number") + " - " + bankAccountNameMap.get("first");

            if (!bankAccountNameMap.get("middle").toString().isEmpty()) {

                account += " " + bankAccountNameMap.get("middle");

            }

            if (!bankAccountNameMap.get("last").toString().isEmpty()) {

                account += " " + bankAccountNameMap.get("last");

            }

            Document insertLogAdministrator = new Document("id", preloodeAccount.get("_id"))
                    .append("username", preloodeAccount.get("username"));
            Document insertLogTarget = new Document("target", new Document("id", bankAccountMap.get("_id"))
                    .append("account", account));
            this.administratorLogService.insert(request, insertLogAdministrator, "", "Delete bank account", insertLogTarget);

            result.put("response", "Bank account successfully deleted");
            result.put("result", true);

        } else {

            result.put("response", "Bank account doesn't exist");

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
        writeAccount.put("cookie", "preloode_filter_bank_account");
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
        MongoCursor<Document> bankAccountIterator = this.bankAccountRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (bankAccountIterator.hasNext()) {

            Map<String, Object> bankAccountMap = bankAccountIterator.next();

            bankAccountMap.put("sequence", bankAccountMap.get("sequence").toString());

            result.put("data", bankAccountMap);

        }

        findEq = new Document("status", "Active");
        MongoCursor<Document> bankIterator = this.bankRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> bankList = new ArrayList<Object>();

        while (bankIterator.hasNext()) {

            bankList.add(bankIterator.next());

        }

        result.put("bank", bankList);
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
        loadAccount.put("cookie", "preloode_filter_bank_account");
        Map<String, Object> filterMap = this.filter.load(request, loadAccount);

        if (filterMap.containsKey("result")) {

            result.put("filter", filterMap);

        }

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_bank_account");
        String paginationEntry = this.pagination.load(request, paginationAccount);

        result.put("page", page);
        result.put("pagination", paginationEntry);
        result.put("result", true);

        return result;

    }


    public Map<String, Object> insert(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Bank account failed added");
                put("result", false);
            }

        };

        data.put("credit", new BigDecimal("0.00"));

        Map<String, Object> validation = new HashMap<String, Object>() {

            {
                put("account", false);
            }

        };

        Map<String, Object> bankMap = (Map<String, Object>) data.get("bank");
        Map<String, Object> nameMap = (Map<String, Object>) data.get("name");

        Document findEq = new Document("bank.id", bankMap.get("id")).append("name.first", nameMap.get("first")).append("name.middle", nameMap.get("middle")).append("name.last", nameMap.get("last")).append("number", data.get("number"));
        MongoCursor<Document> bankAccountValidationIterator = this.bankAccountRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (!bankAccountValidationIterator.hasNext()) {

            validation.put("account", true);

        } else {

            result.put("response", "Account already exist");

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
            String bankInsertId = this.bankAccountRepository.insertOne(request, insertOneData, insertOneAdministrator);

            String name = nameMap.get("first").toString();

            if (!nameMap.get("middle").toString().isEmpty()) {

                name += " " + nameMap.get("middle");

            }

            if (!nameMap.get("last").toString().isEmpty()) {

                name += " " + nameMap.get("last");

            }

            Document insertLogTarget = new Document("target", new Document("id", bankInsertId)
                    .append("account", bankMap.get("name") + " - " + data.get("number") + " - " + name));
            this.administratorLogService.insert(request, insertOneAdministrator, "", "Add bank account", insertLogTarget);

            result.put("response", "Bank account successfully added");
            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> loadEntry(String id) {

        Map<String, Object> result = new HashMap<String, Object>();

        Document findEq = new Document("_id", id);
        MongoCursor<Document> bankAccountIterator = this.bankAccountRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (bankAccountIterator.hasNext()) {

            result = bankAccountIterator.next();

            result.put("sequence", result.get("sequence").toString());

        }

        return result;

    }


    public MongoCursor<Document> loadPagination(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_bank_account");
        String size = this.pagination.load(request, paginationAccount);

        Map<String, Object> queryAccount = new HashMap<String, Object>();
        queryAccount.put("id", preloodeAccount.get("_id"));
        queryAccount.put("cookie", "preloode_filter_bank_account");
        Document filterDocument = this.filter.query(request, queryAccount);

        return this.bankAccountRepository.findPagination(filterDocument, new Document("created.timestamp", -1), (page - 1), Integer.parseInt(size));

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
        removeAccount.put("cookie", "preloode_filter_bank_account");
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
        writeAccount.put("cookie", "preloode_pagination_bank_account");
        Boolean paginationSet = this.pagination.set(response, writeAccount, data.get("pagination").toString());

        if (paginationSet) {

            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> update(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Bank account failed edited");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> bankAccountIterator = this.bankAccountRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (bankAccountIterator.hasNext()) {

            Map<String, Object> bankAccountMap = bankAccountIterator.next();

            Map<String, Object> validation = new HashMap<String, Object>() {

                {
                    put("account", false);
                }

            };

            Map<String, Object> bankMap = (Map<String, Object>) data.get("bank");
            Map<String, Object> nameMap = (Map<String, Object>) data.get("name");

            findEq = new Document("bank.id", bankMap.get("id")).append("name.first", nameMap.get("first")).append("name.middle", nameMap.get("middle")).append("name.last", nameMap.get("last")).append("number", data.get("number"));
            Document findNe = new Document("_id", bankAccountMap.get("_id"));
            MongoCursor<Document> bankAccountValidationIterator = this.bankAccountRepository.findEqNeSort(findEq, findNe, new Document("created.timestamp", -1));

            if (!bankAccountValidationIterator.hasNext()) {

                validation.put("account", true);

            } else {

                result.put("response", "Account already exist");

            }

            Boolean valid = true;

            for (Map.Entry<String, Object> map : validation.entrySet()) {

                if (map.getValue().equals(false)) {

                    valid = false;

                    break;

                }

            }

            if (valid) {

                if (!bankAccountMap.get("file").equals(data.get("file"))) {

                    this.image.delete(request, this.path.getImage() + "/bank/account", bankAccountMap.get("file").toString());

                }

                Document updateOneEq = new Document("_id", bankAccountMap.get("_id"));
                Document updateOneData = data;
                Document updateOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                        .append("username", preloodeAccount.get("username"));
                this.bankAccountRepository.updateOne(request, updateOneEq, updateOneData, updateOneAdministrator);

                Document logData = (Document) bankAccountMap;
                logData.put("bank_account_id", bankAccountMap.get("_id"));
                logData.remove("_id");
                logData.remove("created");
                logData.remove("modified");
                this.bankAccountLogDataRepository.insertOne(request, logData, updateOneAdministrator);

                String name = nameMap.get("first").toString();

                if (!nameMap.get("middle").toString().isEmpty()) {

                    name += " " + nameMap.get("middle");

                }

                if (!nameMap.get("last").toString().isEmpty()) {

                    name += " " + nameMap.get("last");

                }

                Document insertLogTarget = new Document("target", new Document("id", bankAccountMap.get("_id"))
                        .append("account", bankMap.get("name") + " - " + data.get("number") + " - " + name));
                this.administratorLogService.insert(request, updateOneAdministrator, "", "Edit bank account", insertLogTarget);

                result.put("response", "Bank account successfully edited");
                result.put("result", true);

            }

        } else {

            result.put("response", "Bank account doesn't exist");

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

        result = this.image.upload(request, multipartRequest, this.path.getImage() + "/bank/account", 10024);

        if (result.get("result").equals(true)) {

            ArrayList<String> files = (ArrayList<String>) result.get("file");

            for (String string : files) {

                this.image.resize(request, this.path.getImage() + "/bank/account", string, 1920, 1920);

            }

        }

        return result;

    }


}
