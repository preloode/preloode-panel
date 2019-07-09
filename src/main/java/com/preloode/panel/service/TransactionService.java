package com.preloode.panel.service;

import com.mongodb.client.MongoCursor;
import com.preloode.panel.component.Filter;
import com.preloode.panel.component.Image;
import com.preloode.panel.component.Log;
import com.preloode.panel.component.Pagination;
import com.preloode.panel.configuration.Path;
import com.preloode.panel.repository.BankAccountRepository;
import com.preloode.panel.repository.BankRepository;
import com.preloode.panel.repository.TransactionRepository;
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
public class TransactionService {


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
    private TransactionRepository transactionRepository;


    public String createPaginationLink(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_transaction");
        String size = this.pagination.load(request, paginationAccount);

        return this.pagination.createLink(request, "/transaction", page, Integer.parseInt(size), (this.transactionRepository.count()));

    }


    public Map<String, Object> delete(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Transaction failed deleted");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> transactionIterator = this.transactionRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (transactionIterator.hasNext()) {

            Map<String, Object> transactionMap = transactionIterator.next();

            Document deleteOneEq = new Document("_id", transactionMap.get("_id"));
            this.transactionRepository.deleteOne(deleteOneEq);

            this.image.delete(request, this.path.getImage() + "/transaction", transactionMap.get("file").toString());

            Document insertLogAdministrator = new Document("id", preloodeAccount.get("_id"))
                    .append("username", preloodeAccount.get("username"));
            Document insertLogTarget = new Document("target", new Document("id", transactionMap.get("_id"))
                    .append("type", transactionMap.get("type")));
            this.administratorLogService.insert(request, insertLogAdministrator, "", "Delete transaction", insertLogTarget);

            result.put("response", "Transaction successfully deleted");
            result.put("result", true);

        } else {

            result.put("response", "Transaction doesn't exist");

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
        writeAccount.put("cookie", "preloode_filter_transaction");
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
        MongoCursor<Document> transactionIterator = this.transactionRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (transactionIterator.hasNext()) {

            Map<String, Object> transactionMap = transactionIterator.next();

            result.put("data", transactionMap);

            Map<String, Object> transactionFromBankMap = (Map<String, Object>) transactionMap.get("from_bank");

            findEq = new Document("bank.id", transactionFromBankMap.get("id")).append("status", "Active");
            MongoCursor<Document> bankAccountIterator = this.bankAccountRepository.findEqSort(findEq, new Document("sequence", 1));

            ArrayList<Object> bankAccountList = new ArrayList<Object>();

            while (bankAccountIterator.hasNext()) {

                bankAccountList.add(bankAccountIterator.next());

            }

            result.put("fromBankAccount", bankAccountList);

            Map<String, Object> transactionToBankMap = (Map<String, Object>) transactionMap.get("to_bank");

            findEq = new Document("bank.id", transactionToBankMap.get("id")).append("status", "Active");
            bankAccountIterator = this.bankAccountRepository.findEqSort(findEq, new Document("sequence", 1));

            bankAccountList = new ArrayList<Object>();

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
        loadAccount.put("cookie", "preloode_filter_transaction");
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

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_transaction");
        String paginationEntry = this.pagination.load(request, paginationAccount);

        result.put("page", page);
        result.put("pagination", paginationEntry);
        result.put("result", true);

        return result;

    }


    public Map<String, Object> insert(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Transaction failed added");
                put("result", false);
            }

        };

        data.put("amount", data.get("amount").toString().replaceAll("[^0-9.]", ""));
        data.put("calculation", "Active");

        Map<String, Object> validation = new HashMap<String, Object>() {

            {
                put("fromBank", false);
                put("fromBankAccount", false);
                put("toBank", false);
                put("toBankAccount", false);
            }

        };

        Map<String, Object> dataFromBankMap = (Map<String, Object>) data.get("from_bank");
        Map<String, Object> dataFromBankAccountMap = (Map<String, Object>) dataFromBankMap.get("account");
        Map<String, Object> dataToBankMap = (Map<String, Object>) data.get("to_bank");
        Map<String, Object> dataToBankAccountMap = (Map<String, Object>) dataToBankMap.get("account");

        Document findEq = new Document("_id", dataFromBankMap.get("id"));
        MongoCursor<Document> transactionValidationIterator = this.bankRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (data.get("type").equals("Adjustment")) {

            if (!dataToBankMap.get("id").toString().isEmpty() && !dataToBankAccountMap.get("id").toString().isEmpty()) {

                validation.put("fromBank", true);

            } else {

                if (transactionValidationIterator.hasNext()) {

                    validation.put("fromBank", true);

                } else {

                    result.put("response", "From bank doesn't exist");

                }

            }

        } else {

            if (transactionValidationIterator.hasNext()) {

                validation.put("fromBank", true);

            } else {

                result.put("response", "From bank doesn't exist");

            }

        }

        findEq = new Document("_id", dataFromBankAccountMap.get("id"));
        transactionValidationIterator = this.bankAccountRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (data.get("type").equals("Adjustment")) {

            if (!dataToBankMap.get("id").toString().isEmpty() && !dataToBankAccountMap.get("id").toString().isEmpty()) {

                validation.put("fromBankAccount", true);

            } else {

                if (transactionValidationIterator.hasNext()) {

                    Map<String, Object> transactionValidationMap = transactionValidationIterator.next();

                    if (new BigDecimal("0").compareTo(new BigDecimal(data.get("amount").toString())) >= 0) {

                        validation.put("fromBankAccount", true);

                    } else {

                        result.put("response", "Not enough from bank account credit");

                    }

                } else {

                    result.put("response", "From bank account doesn't exist");

                }

            }

        } else {

            if (transactionValidationIterator.hasNext()) {

                Map<String, Object> transactionValidationMap = transactionValidationIterator.next();

                if (new BigDecimal("0").compareTo(new BigDecimal(data.get("amount").toString())) == 1) {

                    validation.put("fromBankAccount", true);

                } else {

                    result.put("response", "Not enough from bank account credit");

                }

            } else {

                result.put("response", "From bank account doesn't exist");

            }

        }

        findEq = new Document("_id", dataToBankMap.get("id"));
        transactionValidationIterator = this.bankRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (data.get("type").equals("Adjustment")) {

            if (!dataFromBankMap.get("id").toString().isEmpty() && !dataFromBankAccountMap.get("id").toString().isEmpty()) {

                validation.put("toBank", true);

            } else {

                if (transactionValidationIterator.hasNext()) {

                    validation.put("toBank", true);

                } else {

                    result.put("response", "To bank doesn't exist");

                }

            }

        } else if (data.get("type").equals("Expense")) {

            validation.put("toBank", true);

        } else {

            if (transactionValidationIterator.hasNext()) {

                validation.put("toBank", true);

            } else {

                result.put("response", "To bank doesn't exist");

            }

        }

        findEq = new Document("_id", dataToBankAccountMap.get("id"));
        transactionValidationIterator = this.bankAccountRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (data.get("type").equals("Adjustment")) {

            if (!dataFromBankMap.get("id").toString().isEmpty() && !dataFromBankAccountMap.get("id").toString().isEmpty()) {

                validation.put("toBankAccount", true);

            } else {

                if (transactionValidationIterator.hasNext()) {

                    validation.put("toBankAccount", true);

                } else {

                    result.put("response", "To bank account doesn't exist");

                }

            }

        } else if (data.get("type").equals("Expense")) {

            validation.put("toBankAccount", true);

        } else {

            if (transactionValidationIterator.hasNext()) {

                validation.put("toBankAccount", true);

            } else {

                result.put("response", "To bank account doesn't exist");

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

            Document insertOneData = data;
            Document insertOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                    .append("username", preloodeAccount.get("username"));
            String transactionInsertId = this.transactionRepository.insertOne(request, insertOneData, insertOneAdministrator);

            Document insertLogTarget = new Document("target", new Document("id", transactionInsertId)
                    .append("type", data.get("type")));
            this.administratorLogService.insert(request, insertOneAdministrator, "", "Add transaction", insertLogTarget);

            result.put("response", "Transaction successfully added");
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

        Document findEq = new Document("bank.id", data.get("bankId")).append("status", "Active");
        MongoCursor<Document> bankAccountIterator = this.bankAccountRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> bankAccountList = new ArrayList<Object>();

        while (bankAccountIterator.hasNext()) {

            bankAccountList.add(bankAccountIterator.next());

        }

        result.put("bankAccount", bankAccountList);
        result.put("result", true);

        return result;

    }


    public Map<String, Object> loadEntry(String id) {

        Map<String, Object> result = new HashMap<String, Object>();

        Document findEq = new Document("_id", id);
        MongoCursor<Document> transactionIterator = this.transactionRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (transactionIterator.hasNext()) {

            result = transactionIterator.next();

        }

        return result;

    }


    public MongoCursor<Document> loadPagination(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_transaction");
        String size = this.pagination.load(request, paginationAccount);

        Map<String, Object> queryAccount = new HashMap<String, Object>();
        queryAccount.put("id", preloodeAccount.get("_id"));
        queryAccount.put("cookie", "preloode_filter_transaction");
        Document filterDocument = this.filter.query(request, queryAccount);

        return this.transactionRepository.findPagination(filterDocument, new Document("created.timestamp", -1), (page - 1), Integer.parseInt(size));

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
        removeAccount.put("cookie", "preloode_filter_transaction");
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
        writeAccount.put("cookie", "preloode_pagination_transaction");
        Boolean paginationSet = this.pagination.set(response, writeAccount, data.get("pagination").toString());

        if (paginationSet) {

            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> update(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Transaction failed edited");
                put("result", false);
            }

        };

        data.put("amount", data.get("amount").toString().replaceAll("[^0-9.]", ""));

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> transactionIterator = this.transactionRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (transactionIterator.hasNext()) {

            Map<String, Object> transactionMap = transactionIterator.next();

            Map<String, Object> validation = new HashMap<String, Object>() {

                {
                    put("fromBank", false);
                    put("fromBankAccount", false);
                    put("toBank", false);
                    put("toBankAccount", false);
                }

            };

            Map<String, Object> dataFromBankMap = (Map<String, Object>) data.get("from_bank");
            Map<String, Object> dataFromBankAccountMap = (Map<String, Object>) dataFromBankMap.get("account");
            Map<String, Object> dataToBankMap = (Map<String, Object>) data.get("to_bank");
            Map<String, Object> dataToBankAccountMap = (Map<String, Object>) dataToBankMap.get("account");

            Map<String, Object> transactionFromBankMap = (Map<String, Object>) transactionMap.get("from_bank");
            Map<String, Object> transactionFromBankAccountMap = (Map<String, Object>) transactionFromBankMap.get("account");
            Map<String, Object> transactionToBankMap = (Map<String, Object>) transactionMap.get("to_bank");
            Map<String, Object> transactionToBankAccountMap = (Map<String, Object>) transactionToBankMap.get("account");

            findEq = new Document("_id", dataFromBankMap.get("id"));
            MongoCursor<Document> transactionValidationIterator = this.bankRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (data.get("type").equals("Adjustment")) {

                if (!dataToBankMap.get("id").toString().isEmpty() && !dataToBankAccountMap.get("id").toString().isEmpty()) {

                    validation.put("fromBank", true);

                } else {

                    if (transactionValidationIterator.hasNext()) {

                        validation.put("fromBank", true);

                    } else {

                        result.put("response", "From bank doesn't exist");

                    }

                }

            } else {

                if (transactionValidationIterator.hasNext()) {

                    validation.put("fromBank", true);

                } else {

                    result.put("response", "From bank doesn't exist");

                }

            }

            findEq = new Document("_id", dataFromBankAccountMap.get("id"));
            transactionValidationIterator = this.bankAccountRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (data.get("type").equals("Adjustment")) {

                if (!dataToBankMap.get("id").toString().isEmpty() && !dataToBankAccountMap.get("id").toString().isEmpty()) {

                    validation.put("fromBankAccount", true);

                } else {

                    if (transactionValidationIterator.hasNext()) {

                        Map<String, Object> transactionValidationMap = transactionValidationIterator.next();

                        if (!transactionFromBankMap.get("id").toString().isEmpty() && !transactionFromBankAccountMap.get("id").toString().isEmpty()) {

                            //bankAccountCreditValidation = bankAccountCreditValidation.add(new BigDecimal(transactionMap.get("amount").toString()));
                        } else if (!transactionToBankMap.get("id").toString().isEmpty() && !transactionToBankAccountMap.get("id").toString().isEmpty()) {

                            //bankAccountCreditValidation = bankAccountCreditValidation.subtract(new BigDecimal(transactionMap.get("amount").toString()));
                        }

                        if (new BigDecimal("0").compareTo(new BigDecimal(data.get("amount").toString())) >= 0) {

                            validation.put("fromBankAccount", true);

                        } else {

                            result.put("response", "Not enough from bank account credit");

                        }

                    } else {

                        result.put("response", "From bank account doesn't exist");

                    }

                }

            } else {

                if (transactionValidationIterator.hasNext()) {

                    Map<String, Object> transactionValidationMap = transactionValidationIterator.next();

                    if (!transactionFromBankMap.get("id").toString().isEmpty() && !transactionFromBankAccountMap.get("id").toString().isEmpty()) {

                        //bankAccountCreditValidation = bankAccountCreditValidation.add(new BigDecimal(transactionMap.get("amount").toString()));
                    } else if (!transactionToBankMap.get("id").toString().isEmpty() && !transactionToBankAccountMap.get("id").toString().isEmpty()) {

                        //bankAccountCreditValidation = bankAccountCreditValidation.subtract(new BigDecimal(transactionMap.get("amount").toString()));
                    }

                    if (new BigDecimal("0").compareTo(new BigDecimal(data.get("amount").toString())) >= 0) {

                        validation.put("fromBankAccount", true);

                    } else {

                        result.put("response", "Not enough from bank account credit");

                    }

                } else {

                    result.put("response", "From bank account doesn't exist");

                }

            }

            findEq = new Document("_id", dataToBankMap.get("id"));
            transactionValidationIterator = this.bankRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (data.get("type").equals("Adjustment")) {

                if (!dataFromBankMap.get("id").toString().isEmpty() && !dataFromBankAccountMap.get("id").toString().isEmpty()) {

                    validation.put("toBank", true);

                } else {

                    if (transactionValidationIterator.hasNext()) {

                        validation.put("toBank", true);

                    } else {

                        result.put("response", "To bank doesn't exist");

                    }

                }

            } else if (data.get("type").equals("Expense")) {

                validation.put("toBank", true);

            } else {

                if (transactionValidationIterator.hasNext()) {

                    validation.put("toBank", true);

                } else {

                    result.put("response", "To bank doesn't exist");

                }

            }

            findEq = new Document("_id", dataToBankAccountMap.get("id"));
            transactionValidationIterator = this.bankAccountRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (data.get("type").equals("Adjustment")) {

                if (!dataFromBankMap.get("id").toString().isEmpty() && !dataFromBankAccountMap.get("id").toString().isEmpty()) {

                    validation.put("toBankAccount", true);

                } else {

                    if (transactionValidationIterator.hasNext()) {

                        validation.put("toBankAccount", true);

                    } else {

                        result.put("response", "To bank account doesn't exist");

                    }

                }

            } else if (data.get("type").equals("Expense")) {

                validation.put("toBankAccount", true);

            } else {

                if (transactionValidationIterator.hasNext()) {

                    validation.put("toBankAccount", true);

                } else {

                    result.put("response", "To bank account doesn't exist");

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

                if (!transactionMap.get("file").equals(data.get("file"))) {

                    this.image.delete(request, this.path.getImage() + "/transaction", transactionMap.get("file").toString());

                }

                Document updateOneEq = new Document("_id", transactionMap.get("_id"));
                Document updateOneData = data;
                Document updateOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                        .append("username", preloodeAccount.get("username"));
                this.transactionRepository.updateOne(request, updateOneEq, updateOneData, updateOneAdministrator);

                Document insertLogTarget = new Document("target", new Document("id", transactionMap.get("_id"))
                        .append("type", transactionMap.get("type")));
                this.administratorLogService.insert(request, updateOneAdministrator, "", "Edit transaction", insertLogTarget);

                result.put("response", "Transaction successfully edited");
                result.put("result", true);

            }

        } else {

            result.put("response", "Transaction doesn't exist");

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

        result = this.image.upload(request, multipartRequest, this.path.getImage() + "/transaction", 10024);

        if (result.get("result").equals(true)) {

            ArrayList<String> files = (ArrayList<String>) result.get("file");

            for (String string : files) {

                this.image.resize(request, this.path.getImage() + "/transaction", string, 1920, 1920);

            }

        }

        return result;

    }


}
