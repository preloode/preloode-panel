package com.preloode.panel.service;

import com.mongodb.client.MongoCursor;
import com.preloode.panel.component.Filter;
import com.preloode.panel.component.Image;
import com.preloode.panel.component.Pagination;
import com.preloode.panel.configuration.Path;
import com.preloode.panel.repository.AdministratorLogDataRepository;
import com.preloode.panel.repository.AdministratorRepository;
import com.preloode.panel.repository.AdministratorRoleRepository;
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
public class AdministratorService {


    @Autowired
    private Path path;

    @Autowired
    private Filter filter;

    @Autowired
    private Image image;

    @Autowired
    private Pagination pagination;

    @Autowired
    private AdministratorLogService administratorLogService;

    @Autowired
    private AdministratorLogDataRepository administratorLogDataRepository;

    @Autowired
    private AdministratorRepository administratorRepository;

    @Autowired
    private AdministratorRoleRepository administratorRoleRepository;


    public String createPaginationLink(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_administrator");
        String size = this.pagination.load(request, paginationAccount);

        return this.pagination.createLink(request, "/administrator", page, Integer.parseInt(size), (this.administratorRepository.count() - 1));

    }


    public Map<String, Object> delete(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Administrator failed deleted");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> administratorIterator = this.administratorRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (administratorIterator.hasNext()) {

            Map<String, Object> administratorMap = administratorIterator.next();

            Document deleteOneEq = new Document("_id", administratorMap.get("_id"));
            this.administratorRepository.deleteOne(deleteOneEq);

            this.image.delete(request, this.path.getImage() + "/administrator", administratorMap.get("file").toString());

            Document insertLogAdministrator = new Document("id", preloodeAccount.get("_id"))
                    .append("username", preloodeAccount.get("username"));
            Document insertLogTarget = new Document("target", new Document("id", administratorMap.get("_id"))
                    .append("name", administratorMap.get("username")));
            this.administratorLogService.insert(request, insertLogAdministrator, "", "Delete administrator", insertLogTarget);

            result.put("response", "Administrator successfully deleted");
            result.put("result", true);

        } else {

            result.put("response", "Administrator doesn't exist");

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
        writeAccount.put("cookie", "preloode_filter_administrator");
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
        MongoCursor<Document> administratorIterator = this.administratorRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (administratorIterator.hasNext()) {

            result.put("data", administratorIterator.next());

        }

        findEq = new Document("status", "Active");
        MongoCursor<Document> administratorRoleIterator = this.administratorRoleRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> administratorRoleList = new ArrayList<Object>();

        while (administratorRoleIterator.hasNext()) {

            administratorRoleList.add(administratorRoleIterator.next());

        }

        result.put("role", administratorRoleList);
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
        loadAccount.put("cookie", "preloode_filter_administrator");
        Map<String, Object> filterMap = this.filter.load(request, loadAccount);

        if (filterMap.containsKey("result")) {

            result.put("filter", filterMap);

        }

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_administrator");
        String paginationEntry = this.pagination.load(request, paginationAccount);

        result.put("page", page);
        result.put("pagination", paginationEntry);

        Document findEq = new Document("status", "Active");
        MongoCursor<Document> administratorRoleIterator = this.administratorRoleRepository.findEqSort(findEq, new Document("sequence", 1));

        ArrayList<Object> administratorRoleList = new ArrayList<Object>();

        while (administratorRoleIterator.hasNext()) {

            administratorRoleList.add(administratorRoleIterator.next());

        }

        result.put("role", administratorRoleList);
        result.put("result", true);

        return result;

    }


    public Map<String, Object> insert(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Administrator failed added");
                put("result", false);
            }

        };

        Map<String, Object> validation = new HashMap<String, Object>() {

            {
                put("emailAddress", true);
                put("phoneNumber", true);
                put("role", false);
                put("username", false);
            }

        };

        Document findEq = new Document("username", data.get("username"));
        MongoCursor<Document> administratorValidationIterator = this.administratorRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (!administratorValidationIterator.hasNext()) {

            validation.put("username", true);

        } else {

            result.put("response", "Username already exist");

        }

        Map<String, Object> dataRoleMap = (Map<String, Object>) data.get("role");

        findEq = new Document("_id", dataRoleMap.get("id"));
        administratorValidationIterator = this.administratorRoleRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (administratorValidationIterator.hasNext()) {

            validation.put("role", true);

        } else {

            result.put("response", "Role doesn't exist");

        }

        Map<String, Object> dataContactMap = (Map<String, Object>) data.get("contact");

        if (!dataContactMap.get("email_address").equals("")) {

            findEq = new Document("contact.email_address", dataContactMap.get("email_address"));
            administratorValidationIterator = this.administratorRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (administratorValidationIterator.hasNext()) {

                validation.put("emailAddress", false);
                result.put("response", "Email address already exist");

            }

        }

        if (!dataContactMap.get("phone_number").equals("")) {

            findEq = new Document("contact.phone_number", dataContactMap.get("phone_number"));
            administratorValidationIterator = this.administratorRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (administratorValidationIterator.hasNext()) {

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
            String administratorInsertId = this.administratorRepository.insertOne(request, insertOneData, insertOneAdministrator);

            Document insertLogTarget = new Document("target", new Document("id", administratorInsertId)
                    .append("name", data.get("username")));
            this.administratorLogService.insert(request, insertOneAdministrator, "", "Add administrator", insertLogTarget);

            result.put("response", "Administrator successfully added");
            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> loadEntry(String id) {

        Map<String, Object> result = new HashMap<String, Object>();

        Document findEq = new Document("_id", id);
        MongoCursor<Document> administratorIterator = this.administratorRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (administratorIterator.hasNext()) {

            result = administratorIterator.next();

        }

        return result;

    }


    public MongoCursor<Document> loadPagination(HttpServletRequest request, Map<String, Object> preloodeAccount, Integer page) {

        Map<String, Object> paginationAccount = new HashMap<String, Object>();
        paginationAccount.put("id", preloodeAccount.get("_id"));
        paginationAccount.put("cookie", "preloode_pagination_administrator");
        String size = this.pagination.load(request, paginationAccount);

        Map<String, Object> queryAccount = new HashMap<String, Object>();
        queryAccount.put("id", preloodeAccount.get("_id"));
        queryAccount.put("cookie", "preloode_filter_administrator");
        Document filterDocument = this.filter.query(request, queryAccount);

        return this.administratorRepository.findPagination(filterDocument, new Document("created.timestamp", -1), (page - 1), Integer.parseInt(size));

    }


    public Map<String, Object> loadPrivilegeCheckbox(Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Privilege failed loaded");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> administratorRoleIterator = this.administratorRoleRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (administratorRoleIterator.hasNext()) {

            result.put("privilege", administratorRoleIterator.next());
            result.put("result", true);

        }

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
        removeAccount.put("cookie", "preloode_filter_administrator");
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
        writeAccount.put("cookie", "preloode_pagination_administrator");
        Boolean paginationSet = this.pagination.set(response, writeAccount, data.get("pagination").toString());

        if (paginationSet) {

            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> update(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Administrator failed edited");
                put("result", false);
            }

        };

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> administratorIterator = this.administratorRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (administratorIterator.hasNext()) {

            Map<String, Object> administratorMap = administratorIterator.next();

            Map<String, Object> validation = new HashMap<String, Object>() {

                {
                    put("emailAddress", true);
                    put("phoneNumber", true);
                    put("role", false);
                    put("username", false);
                }

            };

            findEq = new Document("username", data.get("username"));
            Document findNe = new Document("_id", administratorMap.get("_id"));
            MongoCursor<Document> administratorValidationIterator = this.administratorRepository.findEqNeSort(findEq, findNe, new Document("created.timestamp", -1));

            if (!administratorValidationIterator.hasNext()) {

                validation.put("username", true);

            } else {

                result.put("response", "Username already exist");

            }

            Map<String, Object> administratorRoleMap = (Map<String, Object>) data.get("role");

            findEq = new Document("_id", administratorRoleMap.get("id"));
            administratorValidationIterator = this.administratorRoleRepository.findEqSort(findEq, new Document("created.timestamp", -1));

            if (administratorValidationIterator.hasNext()) {

                validation.put("role", true);

            } else {

                result.put("response", "Role doesn't exist");

            }

            Map<String, Object> dataContactMap = (Map<String, Object>) data.get("contact");

            if (!dataContactMap.get("email_address").equals("")) {

                findEq = new Document("contact.email_address", dataContactMap.get("email_address"));
                administratorValidationIterator = this.administratorRepository.findEqNeSort(findEq, findNe, new Document("created.timestamp", -1));

                if (administratorValidationIterator.hasNext()) {

                    validation.put("emailAddress", false);
                    result.put("response", "Email address already exist");

                }

            }

            if (!dataContactMap.get("phone_number").equals("")) {

                findEq = new Document("contact.phone_number", dataContactMap.get("phone_number"));
                administratorValidationIterator = this.administratorRepository.findEqNeSort(findEq, findNe, new Document("created.timestamp", -1));

                if (administratorValidationIterator.hasNext()) {

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

                if (!administratorMap.get("file").equals(data.get("file"))) {

                    this.image.delete(request, this.path.getImage() + "/administrator", administratorMap.get("file").toString());

                }

                Document updateOneEq = new Document("_id", administratorMap.get("_id"));
                Document updateOneData = data;
                Document updateOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                        .append("username", preloodeAccount.get("username"));
                this.administratorRepository.updateOne(request, updateOneEq, updateOneData, updateOneAdministrator);

                Document logData = (Document) administratorMap;
                logData.put("administrator_id", administratorMap.get("_id"));
                logData.remove("_id");
                logData.remove("created");
                logData.remove("modified");
                this.administratorLogDataRepository.insertOne(request, logData, updateOneAdministrator);

                Document insertLogTarget = new Document("target", new Document("id", administratorMap.get("_id"))
                        .append("name", administratorMap.get("username")));
                this.administratorLogService.insert(request, updateOneAdministrator, "", "Edit administrator", insertLogTarget);

                result.put("response", "Administrator successfully edited");
                result.put("result", true);

            }

        } else {

            result.put("response", "Administrator doesn't exist");

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

        result = this.image.upload(request, multipartRequest, this.path.getImage() + "/administrator", 5012);

        if (result.get("result").equals(true)) {

            ArrayList<String> files = (ArrayList<String>) result.get("file");

            for (String string : files) {

                this.image.cropSquare(request, this.path.getImage() + "/administrator", string);
                this.image.resize(request, this.path.getImage() + "/administrator", string, 300, 300);

            }

        }

        return result;

    }


}
