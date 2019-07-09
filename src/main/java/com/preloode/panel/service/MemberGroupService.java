package com.preloode.panel.service;

import com.mongodb.client.MongoCursor;
import com.preloode.panel.component.Filter;
import com.preloode.panel.component.Pagination;
import com.preloode.panel.repository.BankAccountRepository;
import com.preloode.panel.repository.BankRepository;
import com.preloode.panel.repository.MemberGroupRepository;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class MemberGroupService {


    @Autowired
    private Pagination pagination;

    @Autowired
    private Filter filter;

    @Autowired
    private AdministratorLogService administratorLogService;

    @Autowired
    private BankRepository bankRepository;

    @Autowired
    private BankAccountRepository bankAccountRepository;

    @Autowired
    private MemberGroupRepository memberGroupRepository;


    public String createPaginationLink(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_member_group");
        String size = this.pagination.load(request, paginationAccount);

        return this.pagination.createLink(request, "/member/group", page, Integer.parseInt(size), (this.memberGroupRepository.count()));

    }


    public Map<String, Object> delete(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Member group failed deleted");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> memberGroupIterator = this.memberGroupRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (memberGroupIterator.hasNext()) {

            Map<String, Object> memberGroupMap = memberGroupIterator.next();

            Document deleteOneEq = new Document("_id", memberGroupMap.get("_id"));
            this.memberGroupRepository.deleteOne(deleteOneEq);

            Document insertLogAdministrator = new Document("id", preloodeAccount.get("_id"))
                    .append("username", preloodeAccount.get("username"));
            Document insertLogTarget = new Document("target", new Document("id", memberGroupMap.get("_id"))
                    .append("name", memberGroupMap.get("name")));
            this.administratorLogService.insert(request, insertLogAdministrator, "", "Delete member group", insertLogTarget);

            result.put("response", "Member group successfully deleted");
            result.put("result", true);

        } else {

            result.put("response", "Member group doesn't exist");

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
        writeAccount.put("cookie", "preloode_filter_member_group");
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
        MongoCursor<Document> memberGroupIterator = this.memberGroupRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (memberGroupIterator.hasNext()) {

            Map<String, Object> memberGroupMap = memberGroupIterator.next();

            result.put("data", memberGroupMap);

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
        loadAccount.put("cookie", "preloode_filter_member_group");
        Map<String, Object> filterMap = this.filter.load(request, loadAccount);

        if (filterMap.containsKey("result")) {

            result.put("filter", filterMap);

        }

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_member_group");
        String paginationEntry = this.pagination.load(request, paginationAccount);

        result.put("page", page);
        result.put("pagination", paginationEntry);
        result.put("result", true);

        return result;

    }


    public Map<String, Object> insert(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Member group failed added");
                put("result", false);
            }

        };

        data.put("sequence", data.get("sequence").toString().replaceAll("[^0-9]", ""));

        Map<String, Object> validation = new HashMap<String, Object>() {

            {
                put("name", false);
            }

        };

        Document findEq = new Document("name", data.get("name"));
        MongoCursor<Document> memberGroupValidationIterator = this.memberGroupRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (!memberGroupValidationIterator.hasNext()) {

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
            String memberGroupInsertId = this.memberGroupRepository.insertOne(request, insertOneData, insertOneAdministrator);

            Document insertLogTarget = new Document("target", new Document("id", memberGroupInsertId)
                    .append("name", data.get("name")));
            this.administratorLogService.insert(request, insertOneAdministrator, "", "Add member group", insertLogTarget);

            result.put("response", "Member group successfully added");
            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> loadPaymentBankAccount(Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Payment bank account failed loaded");
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
        MongoCursor<Document> memberGroupIterator = this.memberGroupRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (memberGroupIterator.hasNext()) {

            result = memberGroupIterator.next();

        }

        return result;

    }


    public MongoCursor<Document> loadPagination(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_member_group");
        String size = this.pagination.load(request, paginationAccount);

        Map<String, Object> queryAccount = new HashMap<String, Object>();
        queryAccount.put("id", preloodeAccount.get("_id"));
        queryAccount.put("cookie", "preloode_filter_member_group");
        Document filterDocument = this.filter.query(request, queryAccount);

        return this.memberGroupRepository.findPagination(filterDocument, new Document("created.timestamp", -1), (page - 1), Integer.parseInt(size));

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
        removeAccount.put("cookie", "preloode_filter_member_group");
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
        writeAccount.put("cookie", "preloode_pagination_member_group");
        Boolean paginationSet = this.pagination.set(response, writeAccount, data.get("pagination").toString());

        if (paginationSet) {

            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> update(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Member group failed edited");
                put("result", false);
            }

        };

        data.put("sequence", data.get("sequence").toString().replaceAll("[^0-9]", ""));

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> memberGroupIterator = this.memberGroupRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (memberGroupIterator.hasNext()) {

            Map<String, Object> memberGroupMap = memberGroupIterator.next();

            Map<String, Object> validation = new HashMap<String, Object>() {

                {
                    put("name", false);
                }

            };

            findEq = new Document("name", data.get("name"));
            Document findNe = new Document("_id", memberGroupMap.get("_id"));
            MongoCursor<Document> memberGroupValidationIterator = this.memberGroupRepository.findEqNeSort(findEq, findNe, new Document("created.timestamp", -1));

            if (!memberGroupValidationIterator.hasNext()) {

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

                Document updateOneEq = new Document("_id", memberGroupMap.get("_id"));
                Document updateOneData = data;
                Document updateOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                        .append("username", preloodeAccount.get("username"));
                this.memberGroupRepository.updateOne(request, updateOneEq, updateOneData, updateOneAdministrator);

                Document insertLogTarget = new Document("target", new Document("id", memberGroupMap.get("_id"))
                        .append("name", memberGroupMap.get("name")));
                this.administratorLogService.insert(request, updateOneAdministrator, "", "Edit member group", insertLogTarget);

                result.put("response", "Member group successfully edited");
                result.put("result", true);

            }

        } else {

            result.put("response", "Member group doesn't exist");

        }

        return result;

    }


}
