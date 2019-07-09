package com.preloode.panel.service;

import com.mongodb.client.MongoCursor;
import com.preloode.panel.component.Filter;
import com.preloode.panel.component.Pagination;
import com.preloode.panel.repository.AdministratorRoleLogDataRepository;
import com.preloode.panel.repository.AdministratorRoleRepository;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Service
public class AdministratorRoleService {


    @Autowired
    private Pagination pagination;

    @Autowired
    private Filter filter;

    @Autowired
    private AdministratorLogService administratorLogService;

    @Autowired
    private AdministratorRoleLogDataRepository administratorRoleLogDataRepository;

    @Autowired
    private AdministratorRoleRepository administratorRoleRepository;


    public String createPaginationLink(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_administrator_role");
        String size = this.pagination.load(request, paginationAccount);

        return this.pagination.createLink(request, "/administrator/role", page, Integer.parseInt(size), (this.administratorRoleRepository.count()));

    }


    public Map<String, Object> delete(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Administrator role failed deleted");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> administratorRoleIterator = this.administratorRoleRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (administratorRoleIterator.hasNext()) {

            Map<String, Object> administratorRoleMap = administratorRoleIterator.next();

            Document deleteOneEq = new Document("_id", administratorRoleMap.get("_id"));
            this.administratorRoleRepository.deleteOne(deleteOneEq);

            Document insertLogAdministrator = new Document("id", preloodeAccount.get("_id"))
                    .append("username", preloodeAccount.get("username"));
            Document insertLogTarget = new Document("target", new Document("id", administratorRoleMap.get("_id"))
                    .append("name", administratorRoleMap.get("name")));
            this.administratorLogService.insert(request, insertLogAdministrator, "", "Delete administrator role", insertLogTarget);

            result.put("response", "Administrator role successfully deleted");
            result.put("result", true);

        } else {

            result.put("response", "Administrator role doesn't exist");

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
        writeAccount.put("cookie", "preloode_filter_administrator_role");
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
        MongoCursor<Document> administratorRoleIterator = this.administratorRoleRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (administratorRoleIterator.hasNext()) {

            Map<String, Object> administratorRoleMap = administratorRoleIterator.next();

            administratorRoleMap.put("sequence", administratorRoleMap.get("sequence").toString());

            result.put("data", administratorRoleMap);

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
        loadAccount.put("cookie", "preloode_filter_administrator_role");
        Map<String, Object> filterMap = this.filter.load(request, loadAccount);

        if (filterMap.containsKey("result")) {

            result.put("filter", filterMap);

        }

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_administrator_role");
        String paginationEntry = this.pagination.load(request, paginationAccount);

        result.put("page", page);
        result.put("pagination", paginationEntry);
        result.put("result", true);

        return result;

    }


    public Map<String, Object> insert(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Administrator role failed added");
                put("result", false);
            }

        };

        if (data.get("sequence").toString().isEmpty()) {

            data.put("sequence", "0");

        }

        data.put("sequence", new BigDecimal(data.get("sequence").toString().replaceAll("[^0-9.]", "")).setScale(0, BigDecimal.ROUND_CEILING));

        Map<String, Object> validation = new HashMap<String, Object>() {

            {
                put("name", false);
            }

        };

        Document findEq = new Document("name", data.get("name"));
        MongoCursor<Document> administratorRoleValidationIterator = this.administratorRoleRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (!administratorRoleValidationIterator.hasNext()) {

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
            String administratorRoleInsertId = this.administratorRoleRepository.insertOne(request, insertOneData, insertOneAdministrator);

            Document insertLogTarget = new Document("target", new Document("id", administratorRoleInsertId)
                    .append("name", data.get("name")));
            this.administratorLogService.insert(request, insertOneAdministrator, "", "Add administrator role", insertLogTarget);

            result.put("response", "Administrator role successfully added");
            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> loadEntry(String id) {

        Map<String, Object> result = new HashMap<String, Object>();

        Document findEq = new Document("_id", id);
        MongoCursor<Document> administratorRoleIterator = this.administratorRoleRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (administratorRoleIterator.hasNext()) {

            result = administratorRoleIterator.next();

            result.put("sequence", result.get("sequence").toString());

        }

        return result;

    }


    public MongoCursor<Document> loadPagination(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_administrator_role");
        String size = this.pagination.load(request, paginationAccount);

        Map<String, Object> queryAccount = new HashMap<String, Object>();
        queryAccount.put("id", preloodeAccount.get("_id"));
        queryAccount.put("cookie", "preloode_filter_administrator_role");
        Document filterDocument = this.filter.query(request, queryAccount);

        return this.administratorRoleRepository.findPagination(filterDocument, new Document("created.timestamp", -1), (page - 1), Integer.parseInt(size));

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
        removeAccount.put("cookie", "preloode_filter_administrator_role");
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
        writeAccount.put("cookie", "preloode_pagination_administrator_role");
        Boolean paginationSet = this.pagination.set(response, writeAccount, data.get("pagination").toString());

        if (paginationSet) {

            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> update(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Administrator role failed edited");
                put("result", false);
            }

        };

        if (data.get("sequence").toString().isEmpty()) {

            data.put("sequence", "0");

        }

        data.put("sequence", new BigDecimal(data.get("sequence").toString().replaceAll("[^0-9.]", "")).setScale(0, BigDecimal.ROUND_CEILING));

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> administratorRoleIterator = this.administratorRoleRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (administratorRoleIterator.hasNext()) {

            Map<String, Object> administratorRoleMap = administratorRoleIterator.next();

            Map<String, Object> validation = new HashMap<String, Object>() {

                {
                    put("name", false);
                }

            };

            findEq = new Document("name", data.get("name"));
            Document findNe = new Document("_id", administratorRoleMap.get("_id"));
            MongoCursor<Document> administratorRoleValidationIterator = this.administratorRoleRepository.findEqNeSort(findEq, findNe, new Document("created.timestamp", -1));

            if (!administratorRoleValidationIterator.hasNext()) {

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

                Document updateOneEq = new Document("_id", administratorRoleMap.get("_id"));
                Document updateOneData = data;
                Document updateOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                        .append("username", preloodeAccount.get("username"));
                this.administratorRoleRepository.updateOne(request, updateOneEq, updateOneData, updateOneAdministrator);

                Document logData = (Document) administratorRoleMap;
                logData.put("administrator_role_id", administratorRoleMap.get("_id"));
                logData.remove("_id");
                logData.remove("created");
                logData.remove("modified");
                this.administratorRoleLogDataRepository.insertOne(request, logData, updateOneAdministrator);

                Document insertLogTarget = new Document("target", new Document("id", administratorRoleMap.get("_id"))
                        .append("name", administratorRoleMap.get("name")));
                this.administratorLogService.insert(request, updateOneAdministrator, "", "Edit administrator role", insertLogTarget);

                result.put("response", "Administrator role successfully edited");
                result.put("result", true);

            }

        } else {

            result.put("response", "Administrator role doesn't exist");

        }

        return result;

    }


}
