package com.preloode.panel.service;

import com.mongodb.client.MongoCursor;
import com.preloode.panel.component.Client;
import com.preloode.panel.component.DateTime;
import com.preloode.panel.component.RsaEncryption;
import com.preloode.panel.repository.AdministratorLogRepository;
import com.preloode.panel.repository.AdministratorRepository;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Service
public class LoginService {


    @Autowired
    private Client client;

    @Autowired
    private DateTime dateTime;

    @Autowired
    private RsaEncryption rsaEncryption;

    @Autowired
    private AdministratorRepository administratorRepository;

    @Autowired
    private AdministratorLogRepository administratorLogRepository;


    public Map<String, Object> checkPassword(HttpServletRequest request, HttpServletResponse response, HttpSession session, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Check password failed");
                put("result", false);
            }

        };

        String username = session.getAttribute("username").toString();
        String authentication = this.rsaEncryption.encrypt(request, "preloode" + this.dateTime.getTimestamp(request));

        Document findEq = new Document("username", username);
        MongoCursor<Document> administratorIterator = this.administratorRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (administratorIterator.hasNext()) {

            Map<String, Object> administratorMap = administratorIterator.next();

            Map<String, Object> administratorPasswordMap = (Map<String, Object>) administratorMap.get("password");

            String administratorMainPassword = this.rsaEncryption.decrypt(request, administratorPasswordMap.get("main").toString());
            String administratorRecoveryPassword = this.rsaEncryption.decrypt(request, administratorPasswordMap.get("recovery").toString());
            String dataPassword = this.rsaEncryption.decrypt(request, data.get("password").toString());

            if (administratorMainPassword.equals(dataPassword) || administratorRecoveryPassword.equals(dataPassword)) {

                if (administratorMap.get("status").equals("Active")) {

                    findEq = new Document("administrator.id", administratorMap.get("_id"));
                    MongoCursor<Document> administratorLogIterator = this.administratorLogRepository.findEqSort(findEq, new Document("created.timestamp", -1));

                    if (administratorLogIterator.hasNext()) {

                        Map<String, Object> administratorLogMap = administratorLogIterator.next();

                        if (administratorLogMap.get("log").equals("Login")) {

                            Document insertOneData = new Document("administrator", new Document("id", administratorMap.get("_id"))
                                    .append("username", administratorMap.get("username")))
                                    .append("authentication", administratorLogMap.get("authentication"))
                                    .append("client", new Document("browser_id", this.client.getBrowser().get("id"))
                                            .append("browser_manufacturer", this.client.getBrowser().get("manufacturer"))
                                            .append("browser_name", this.client.getBrowser().get("name"))
                                            .append("browser_rendering_engine", this.client.getBrowser().get("renderingEngine"))
                                            .append("browser_type", this.client.getBrowser().get("type"))
                                            .append("browser_version", this.client.getBrowser().get("version"))
                                            .append("device_id", this.client.getDevice().get("id"))
                                            .append("device_manufacturer", this.client.getDevice().get("manufacturer"))
                                            .append("device_operating_system", this.client.getDevice().get("operatingSystem"))
                                            .append("device_type", this.client.getDevice().get("type"))
                                            .append("id", this.client.getId())
                                            .append("ip", this.client.getIp())
                                            .append("mac", this.client.getMac()))
                                    .append("description", "")
                                    .append("log", "Logout")
                                    .append("target", new Document("id", administratorMap.get("_id"))
                                            .append("name", administratorMap.get("username")));
                            Document insertOneAdministrator = new Document("id", "0")
                                    .append("username", "System");
                            this.administratorLogRepository.insertOne(request, insertOneData, insertOneAdministrator);

                        }

                    }

                    Document insertOneData = new Document("administrator", new Document("id", administratorMap.get("_id"))
                            .append("username", administratorMap.get("username")))
                            .append("authentication", authentication)
                            .append("client", new Document("browser_id", this.client.getBrowser().get("id"))
                                    .append("browser_manufacturer", this.client.getBrowser().get("manufacturer"))
                                    .append("browser_name", this.client.getBrowser().get("name"))
                                    .append("browser_rendering_engine", this.client.getBrowser().get("renderingEngine"))
                                    .append("browser_type", this.client.getBrowser().get("type"))
                                    .append("browser_version", this.client.getBrowser().get("version"))
                                    .append("device_id", this.client.getDevice().get("id"))
                                    .append("device_manufacturer", this.client.getDevice().get("manufacturer"))
                                    .append("device_operating_system", this.client.getDevice().get("operatingSystem"))
                                    .append("device_type", this.client.getDevice().get("type"))
                                    .append("id", this.client.getId())
                                    .append("ip", this.client.getIp())
                                    .append("mac", this.client.getMac()))
                            .append("description", "")
                            .append("log", "Login")
                            .append("target", new Document("id", administratorMap.get("_id"))
                                    .append("name", administratorMap.get("username")));
                    Document insertOneAdministrator = new Document("id", "0")
                            .append("username", "System");
                    this.administratorLogRepository.insertOne(request, insertOneData, insertOneAdministrator);

                    Cookie cookie = new Cookie("preloode_account", authentication);
                    cookie.setPath("/");
                    cookie.setMaxAge(365 * 24 * 60 * 60);
                    response.addCookie(cookie);

                    session.removeAttribute("username");

                    result.put("result", true);

                } else {

                    result.put("response", "Account Inactivated");

                }

            } else {

                result.put("response", "Invalid Password");

            }

        } else {

            result.put("response", "Username doesn't exist");

        }

        return result;

    }


    public Map<String, Object> checkUsername(HttpSession session, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Check username failed");
                put("result", false);
            }

        };

        Document findEq = new Document("username", data.get("username"));
        MongoCursor<Document> administratorIterator = this.administratorRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (administratorIterator.hasNext()) {

            Map<String, Object> administratorMap = administratorIterator.next();
            Map<String, Object> administratorNameMap = (Map<String, Object>) administratorMap.get("name");

            String name = administratorNameMap.get("first").toString();

            if (!administratorNameMap.get("middle").equals("")) {

                name += " " + administratorNameMap.get("middle");

            }

            if (!administratorNameMap.get("last").equals("")) {

                name += " " + administratorNameMap.get("last");

            }

            result.put("username", administratorMap.get("username"));
            result.put("name", name);
            result.put("file", administratorMap.get("file"));
            result.put("result", true);

            session.setAttribute("username", administratorMap.get("username"));

        } else {

            result.put("response", "Username doesn't exist");

        }

        return result;

    }


    public Map<String, Object> logout(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Logout failed");
                put("result", false);
            }

        };

        Cookie[] cookies = request.getCookies();

        if (cookies != null) {

            Boolean logout = false;

            for (Cookie cookie : cookies) {

                if (cookie.getName().equals("preloode_account")) {

                    Document findEq = new Document("authentication", cookie.getValue());
                    MongoCursor<Document> administratorLogIterator = this.administratorLogRepository.findEqSort(findEq, new Document("created.timestamp", -1));

                    if (administratorLogIterator.hasNext()) {

                        Map<String, Object> administratorLogMap = administratorLogIterator.next();

                        if (administratorLogMap.get("log").equals("Login")) {

                            Map<String, Object> administratorLogAdministratorMap = (Map<String, Object>) administratorLogMap.get("administrator");

                            Document insertOneData = new Document("administrator", new Document("id", administratorLogAdministratorMap.get("id"))
                                    .append("username", administratorLogAdministratorMap.get("username")))
                                    .append("authentication", administratorLogMap.get("authentication"))
                                    .append("client", new Document("browser_id", this.client.getBrowser().get("id"))
                                            .append("browser_manufacturer", this.client.getBrowser().get("manufacturer"))
                                            .append("browser_name", this.client.getBrowser().get("name"))
                                            .append("browser_rendering_engine", this.client.getBrowser().get("renderingEngine"))
                                            .append("browser_type", this.client.getBrowser().get("type"))
                                            .append("browser_version", this.client.getBrowser().get("version"))
                                            .append("device_id", this.client.getDevice().get("id"))
                                            .append("device_manufacturer", this.client.getDevice().get("manufacturer"))
                                            .append("device_operating_system", this.client.getDevice().get("operatingSystem"))
                                            .append("device_type", this.client.getDevice().get("type"))
                                            .append("id", this.client.getId())
                                            .append("ip", this.client.getIp())
                                            .append("mac", this.client.getMac()))
                                    .append("description", "")
                                    .append("log", "Logout")
                                    .append("target", new Document("id", administratorLogAdministratorMap.get("_id"))
                                            .append("name", administratorLogAdministratorMap.get("username")));
                            Document insertOneAdministrator = new Document("id", "0")
                                    .append("username", "System");
                            this.administratorLogRepository.insertOne(request, insertOneData, insertOneAdministrator);

                            result.put("result", true);

                            logout = true;

                        }

                    }

                }

            }

            if (logout) {

                for (Cookie cookie : cookies) {

                    cookie.setValue(null);
                    cookie.setPath("/");
                    cookie.setMaxAge(0);
                    response.addCookie(cookie);

                }

            }

        }

        return result;

    }


}
