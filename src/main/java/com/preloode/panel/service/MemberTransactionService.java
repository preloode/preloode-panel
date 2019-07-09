package com.preloode.panel.service;

import com.mongodb.client.MongoCursor;
import com.preloode.panel.component.Filter;
import com.preloode.panel.component.Pagination;
import com.preloode.panel.repository.GameRepository;
import com.preloode.panel.repository.MemberRepository;
import com.preloode.panel.repository.MemberTransactionRepository;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@Service
public class MemberTransactionService {


    @Autowired
    private Pagination pagination;

    @Autowired
    private Filter filter;

    @Autowired
    private AdministratorLogService administratorLogService;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MemberTransactionRepository memberTransactionRepository;


    public String createPaginationLink(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_member_transaction");
        String size = this.pagination.load(request, paginationAccount);

        return this.pagination.createLink(request, "/member/transaction", page, Integer.parseInt(size), (this.memberTransactionRepository.count()));

    }


    public Map<String, Object> delete(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Member transaction failed deleted");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> memberTransactionIterator = this.memberTransactionRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (memberTransactionIterator.hasNext()) {

            Map<String, Object> memberTransactionMap = memberTransactionIterator.next();

            Document deleteOneEq = new Document("_id", memberTransactionMap.get("_id"));
            this.memberTransactionRepository.deleteOne(deleteOneEq);

            Map<String, Object> memberTransactionMemberMap = (Map<String, Object>) memberTransactionMap.get("member");

            Document insertLogAdministrator = new Document("id", preloodeAccount.get("_id"))
                    .append("username", preloodeAccount.get("username"));
            Document insertLogTarget = new Document("target", new Document("id", memberTransactionMap.get("_id"))
                    .append("name", memberTransactionMemberMap.get("username")));
            this.administratorLogService.insert(request, insertLogAdministrator, "", "Delete member transaction", insertLogTarget);

            result.put("response", "Member transaction successfully deleted");
            result.put("result", true);

        } else {

            result.put("response", "Member transaction doesn't exist");

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
        writeAccount.put("cookie", "preloode_filter_member_transaction");
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
        MongoCursor<Document> memberTransactionIterator = this.memberTransactionRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (memberTransactionIterator.hasNext()) {

            Map<String, Object> memberTransactionMap = memberTransactionIterator.next();

            result.put("data", memberTransactionMap);

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
        loadAccount.put("cookie", "preloode_filter_member_transaction");
        Map<String, Object> filterMap = this.filter.load(request, loadAccount);

        if (filterMap.containsKey("result")) {

            result.put("filter", filterMap);

        }

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_member_transaction");
        String paginationEntry = this.pagination.load(request, paginationAccount);

        result.put("page", page);
        result.put("pagination", paginationEntry);
        result.put("result", true);

        return result;

    }


    public Map<String, Object> insert(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Member transaction failed added");
                put("result", false);
            }

        };

        Map<String, Object> validation = new HashMap<String, Object>() {

            {
                put("game", false);
                put("member", false);
            }

        };

        Map<String, Object> memberTransactionGameMap = (Map<String, Object>) data.get("game");

        Document findEq = new Document("_id", memberTransactionGameMap.get("id"));
        MongoCursor<Document> memberTransactionValidationIterator = this.gameRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (memberTransactionValidationIterator.hasNext()) {

            validation.put("game", true);

        } else {

            result.put("response", "Game doesn't exist");

        }

        Map<String, Object> memberTransactionMemberMap = (Map<String, Object>) data.get("member");

        findEq = new Document("_id", memberTransactionMemberMap.get("id"));
        memberTransactionValidationIterator = this.memberRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (memberTransactionValidationIterator.hasNext()) {

            validation.put("member", true);

        } else {

            result.put("response", "Member doesn't exist");

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
            String memberTransactionInsertId = this.memberTransactionRepository.insertOne(request, insertOneData, insertOneAdministrator);

            Document insertLogTarget = new Document("target", new Document("id", memberTransactionInsertId)
                    .append("name", memberTransactionMemberMap.get("username")));
            this.administratorLogService.insert(request, insertOneAdministrator, "", "Add member transaction", insertLogTarget);

            result.put("response", "Member transaction successfully added");
            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> loadEntry(String id) {

        Map<String, Object> result = new HashMap<String, Object>();

        Document findEq = new Document("_id", id);
        MongoCursor<Document> memberTransactionIterator = this.memberTransactionRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (memberTransactionIterator.hasNext()) {

            result = memberTransactionIterator.next();

        }

        return result;

    }


    public MongoCursor<Document> loadPagination(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_member_transaction");
        String size = this.pagination.load(request, paginationAccount);

        Map<String, Object> queryAccount = new HashMap<String, Object>();
        queryAccount.put("id", preloodeAccount.get("_id"));
        queryAccount.put("cookie", "preloode_filter_member_transaction");
        Document filterDocument = this.filter.query(request, queryAccount);

        return this.memberRepository.findPagination(filterDocument, new Document("created.timestamp", -1), (page - 1), Integer.parseInt(size));

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
        removeAccount.put("cookie", "preloode_filter_member_transaction");
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
        writeAccount.put("cookie", "preloode_pagination_member_transaction");
        Boolean paginationSet = this.pagination.set(response, writeAccount, data.get("pagination").toString());

        if (paginationSet) {

            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> update(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Member transaction failed edited");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> memberTransactionIterator = this.memberTransactionRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (memberTransactionIterator.hasNext()) {

            Map<String, Object> memberTransactionMap = memberTransactionIterator.next();

            Map<String, Object> validation = new HashMap<String, Object>() {

                {
                    put("game", false);
                    put("member", false);
                }

            };

            Map<String, Object> memberTransactionGameMap = (Map<String, Object>) data.get("game");

            findEq = new Document("_id", memberTransactionGameMap.get("id"));
            MongoCursor<Document> memberTransactionValidationIterator = this.gameRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (memberTransactionValidationIterator.hasNext()) {

                validation.put("game", true);

            } else {

                result.put("response", "Game doesn't exist");

            }

            Map<String, Object> memberTransactionMemberMap = (Map<String, Object>) data.get("member");

            findEq = new Document("_id", memberTransactionMemberMap.get("id"));
            memberTransactionValidationIterator = this.memberRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (memberTransactionValidationIterator.hasNext()) {

                validation.put("member", true);

            } else {

                result.put("response", "Member doesn't exist");

            }

            Boolean valid = true;

            for (Map.Entry<String, Object> map : validation.entrySet()) {

                if (map.getValue().equals(false)) {

                    valid = false;

                    break;

                }

            }

            if (valid) {

                Document updateOneEq = new Document("_id", memberTransactionMap.get("_id"));
                Document updateOneData = data;
                Document updateOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                        .append("username", preloodeAccount.get("username"));
                this.memberTransactionRepository.updateOne(request, updateOneEq, updateOneData, updateOneAdministrator);

                Document insertLogTarget = new Document("target", new Document("id", memberTransactionMap.get("_id"))
                        .append("name", memberTransactionMemberMap.get("username")));
                this.administratorLogService.insert(request, updateOneAdministrator, "", "Edit member transaction", insertLogTarget);

                result.put("response", "Member transaction successfully edited");
                result.put("result", true);

            }

        } else {

            result.put("response", "Member transaction doesn't exist");

        }

        return result;

    }


}
