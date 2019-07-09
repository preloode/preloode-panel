package com.preloode.panel.service;

import com.mongodb.client.MongoCursor;
import com.preloode.panel.component.Filter;
import com.preloode.panel.component.Image;
import com.preloode.panel.component.Pagination;
import com.preloode.panel.configuration.Path;
import com.preloode.panel.repository.BankRepository;
import com.preloode.panel.repository.GameRepository;
import com.preloode.panel.repository.MemberGroupRepository;
import com.preloode.panel.repository.MemberRepository;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class MemberService {


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
    private GameRepository gameRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MemberGroupRepository memberGroupRepository;


    public Map<String, Object> checkBankAccount(Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Bank account failed checked");
                put("result", false);
            }

        };

        Document findEq = new Document("bank.id", data.get("bankId")).append("bank.account.name", data.get("name")).append("bank.account.number", data.get("number"));
        MongoCursor<Document> memberIterator = this.memberRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (!memberIterator.hasNext()) {

            result.put("id", new ObjectId().toString());
            result.put("result", true);

        } else {

            result.put("response", "Bank account already exist");

        }

        return result;

    }


    public String createPaginationLink(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_member");
        String size = this.pagination.load(request, paginationAccount);

        return this.pagination.createLink(request, "/member", page, Integer.parseInt(size), (this.memberRepository.count()));

    }


    public Map<String, Object> delete(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Member failed deleted");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> memberIterator = this.memberRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (memberIterator.hasNext()) {

            Map<String, Object> memberMap = memberIterator.next();

            Document deleteOneEq = new Document("_id", memberMap.get("_id"));
            this.memberRepository.deleteOne(deleteOneEq);

            this.image.delete(request, this.path.getImage() + "/member", memberMap.get("file").toString());

            Document insertLogAdministrator = new Document("id", preloodeAccount.get("_id"))
                    .append("username", preloodeAccount.get("username"));
            Document insertLogTarget = new Document("target", new Document("id", memberMap.get("_id"))
                    .append("name", memberMap.get("username")));
            this.administratorLogService.insert(request, insertLogAdministrator, "", "Delete member", insertLogTarget);

            result.put("response", "Member successfully deleted");
            result.put("result", true);

        } else {

            result.put("response", "Member doesn't exist");

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
        writeAccount.put("cookie", "preloode_filter_member");
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
        MongoCursor<Document> memberIterator = this.memberRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (memberIterator.hasNext()) {

            Map<String, Object> memberMap = memberIterator.next();

            result.put("data", memberMap);

        }

        findEq = new Document("status", "Active");
        MongoCursor<Document> bankIterator = this.bankRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> bankList = new ArrayList<Object>();

        while (bankIterator.hasNext()) {

            bankList.add(bankIterator.next());

        }

        result.put("bank", bankList);

        findEq = new Document("status", "Active");
        MongoCursor<Document> gameIterator = this.gameRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> gameList = new ArrayList<Object>();

        while (gameIterator.hasNext()) {

            gameList.add(gameIterator.next());

        }

        result.put("game", gameList);

        findEq = new Document("status", "Active");
        MongoCursor<Document> memberGroupIterator = this.memberGroupRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> memberGroupList = new ArrayList<Object>();

        while (memberGroupIterator.hasNext()) {

            memberGroupList.add(memberGroupIterator.next());

        }

        result.put("group", memberGroupList);
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
        loadAccount.put("cookie", "preloode_filter_member");
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
        MongoCursor<Document> gameIterator = this.gameRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> gameList = new ArrayList<Object>();

        while (gameIterator.hasNext()) {

            gameList.add(gameIterator.next());

        }

        result.put("game", gameList);

        findEq = new Document("status", "Active");
        MongoCursor<Document> memberGroupIterator = this.memberGroupRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> memberGroupList = new ArrayList<Object>();

        while (memberGroupIterator.hasNext()) {

            memberGroupList.add(memberGroupIterator.next());

        }

        result.put("group", memberGroupList);

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_member");
        String paginationEntry = this.pagination.load(request, paginationAccount);

        result.put("page", page);
        result.put("pagination", paginationEntry);
        result.put("result", true);

        return result;

    }


    public Map<String, Object> insert(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Member failed added");
                put("result", false);
            }

        };

        Map<String, Object> validation = new HashMap<String, Object>() {

            {
                put("emailAddress", true);
                put("group", false);
                put("phoneNumber", true);
                put("username", false);
            }

        };

        Document findEq = new Document("username", data.get("username"));
        MongoCursor<Document> memberValidationIterator = this.memberRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (!memberValidationIterator.hasNext()) {

            validation.put("username", true);

        } else {

            result.put("response", "Username already exist");

        }

        Map<String, Object> memberGroupMap = (Map<String, Object>) data.get("group");

        findEq = new Document("_id", memberGroupMap.get("id"));
        memberValidationIterator = this.memberGroupRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (memberValidationIterator.hasNext()) {

            validation.put("group", true);

        } else {

            result.put("response", "Group doesn't exist");

        }

        Map<String, Object> dataContact = (Map<String, Object>) data.get("contact");

        if (!dataContact.get("email_address").equals("")) {

            findEq = new Document("contact.email_address", dataContact.get("email_address"));
            memberValidationIterator = this.memberRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (memberValidationIterator.hasNext()) {

                validation.put("emailAddress", false);
                result.put("response", "Email address already exist");

            }

        }

        if (!dataContact.get("phone_number").equals("")) {

            findEq = new Document("contact.phone_number", dataContact.get("phone_number"));
            memberValidationIterator = this.memberRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (memberValidationIterator.hasNext()) {

                validation.put("phoneNumber", false);
                result.put("response", "Phone number already exist");

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
            String memberInsertId = this.memberRepository.insertOne(request, insertOneData, insertOneAdministrator);

            Document insertLogTarget = new Document("target", new Document("id", memberInsertId)
                    .append("name", data.get("username")));
            this.administratorLogService.insert(request, insertOneAdministrator, "", "Add member", insertLogTarget);

            result.put("response", "Member successfully added");
            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> loadEntry(String id) {

        Map<String, Object> result = new HashMap<String, Object>();

        Document findEq = new Document("_id", id);
        MongoCursor<Document> memberIterator = this.memberRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (memberIterator.hasNext()) {

            result = memberIterator.next();

        }

        return result;

    }


    public MongoCursor<Document> loadPagination(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_member");
        String size = this.pagination.load(request, paginationAccount);

        Map<String, Object> queryAccount = new HashMap<String, Object>();
        queryAccount.put("id", preloodeAccount.get("_id"));
        queryAccount.put("cookie", "preloode_filter_member");
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
        removeAccount.put("cookie", "preloode_filter_member");
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
        writeAccount.put("cookie", "preloode_pagination_member");
        Boolean paginationSet = this.pagination.set(response, writeAccount, data.get("pagination").toString());

        if (paginationSet) {

            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> update(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Member failed edited");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> memberIterator = this.memberRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (memberIterator.hasNext()) {

            Map<String, Object> memberMap = memberIterator.next();

            Map<String, Object> validation = new HashMap<String, Object>() {

                {
                    put("emailAddress", true);
                    put("group", false);
                    put("phoneNumber", true);
                    put("username", false);
                }

            };

            findEq = new Document("username", data.get("username"));
            Document findNe = new Document("_id", memberMap.get("_id"));
            MongoCursor<Document> memberValidationIterator = this.memberRepository.findEqNeSort(findEq, findNe, new Document("created.timestamp", -1));

            if (!memberValidationIterator.hasNext()) {

                validation.put("username", true);

            } else {

                result.put("response", "Username already exist");

            }

            Map<String, Object> memberGroupMap = (Map<String, Object>) data.get("group");

            findEq = new Document("_id", memberGroupMap.get("id"));
            memberValidationIterator = this.memberGroupRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (memberValidationIterator.hasNext()) {

                validation.put("group", true);

            } else {

                result.put("response", "Group doesn't exist");

            }

            Map<String, Object> dataContact = (Map<String, Object>) data.get("contact");

            if (!dataContact.get("email_address").equals("")) {

                findEq = new Document("contact.email_address", dataContact.get("email_address"));
                memberValidationIterator = this.memberRepository.findEqNeSort(findEq, findNe, new Document("created.timestamp", -1));

                if (memberValidationIterator.hasNext()) {

                    validation.put("emailAddress", false);
                    result.put("response", "Email address already exist");

                }

            }

            if (!dataContact.get("phone_number").equals("")) {

                findEq = new Document("contact.phone_number", dataContact.get("phone_number"));
                memberValidationIterator = this.memberRepository.findEqNeSort(findEq, findNe, new Document("created.timestamp", -1));

                if (memberValidationIterator.hasNext()) {

                    validation.put("phoneNumber", false);
                    result.put("response", "Phone number already exist");

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

                if (!memberMap.get("file").equals(data.get("file"))) {

                    this.image.delete(request, this.path.getImage() + "/member", memberMap.get("file").toString());

                }

                Document updateOneEq = new Document("_id", memberMap.get("_id"));
                Document updateOneData = data;
                Document updateOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                        .append("username", preloodeAccount.get("username"));
                this.memberRepository.updateOne(request, updateOneEq, updateOneData, updateOneAdministrator);

                Document insertLogTarget = new Document("target", new Document("id", memberMap.get("_id"))
                        .append("name", memberMap.get("username")));
                this.administratorLogService.insert(request, updateOneAdministrator, "", "Edit member", insertLogTarget);

                result.put("response", "Member successfully edited");
                result.put("result", true);

            }

        } else {

            result.put("response", "Member doesn't exist");

        }

        return result;

    }


    public Map<String, Object> uploadIdentity(HttpServletRequest request, MultipartHttpServletRequest multipartRequest) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Identity failed uploaded");
                put("result", false);
            }

        };

        result = this.image.upload(request, multipartRequest, this.path.getImage() + "/member/identity/", 5012);

        if (result.get("result").equals(true)) {

            ArrayList<String> files = (ArrayList<String>) result.get("file");

            for (String string : files) {

                this.image.resize(request, this.path.getImage() + "/member/identity/", string, 1920, 1920);

            }

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

        result = this.image.upload(request, multipartRequest, this.path.getImage() + "/member", 5012);

        if (result.get("result").equals(true)) {

            ArrayList<String> files = (ArrayList<String>) result.get("file");

            for (String string : files) {

                this.image.cropSquare(request, this.path.getImage() + "/member", string);
                this.image.resize(request, this.path.getImage() + "/member", string, 1920, 1920);

            }

        }

        return result;

    }


}
