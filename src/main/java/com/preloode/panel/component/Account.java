package com.preloode.panel.component;

import com.mongodb.client.MongoCursor;
import com.preloode.panel.repository.AdministratorLogRepository;
import com.preloode.panel.repository.AdministratorRepository;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Component
public class Account {


    @Autowired
    private Client client;

    @Autowired
    private AdministratorRepository administratorRepository;

    @Autowired
    private AdministratorLogRepository administratorLogRepository;


    public Boolean checkLogin(HttpServletRequest request) {

        Boolean result = false;

        this.client.getDetail(request);

        Cookie[] cookies = request.getCookies();

        if (cookies != null) {

            for (Cookie cookie : cookies) {

                if (cookie.getName().equals("preloode_account")) {

                    Document findEq = new Document("authentication", cookie.getValue());
                    MongoCursor<Document> administratorLogIterator = this.administratorLogRepository.findEqSort(findEq, new Document("created.timestamp", -1));

                    while (administratorLogIterator.hasNext()) {

                        Map<String, Object> administratorLogMap = administratorLogIterator.next();

                        Map<String, Object> administratorLogClientMap = (Map<String, Object>) administratorLogMap.get("client");

                        if (administratorLogMap.get("log").equals("Login") && administratorLogClientMap.get("browser_id").equals(this.client.getBrowser().get("id")) && administratorLogClientMap.get("browser_manufacturer").equals(this.client.getBrowser().get("manufacturer")) && administratorLogClientMap.get("browser_name").equals(this.client.getBrowser().get("name")) && administratorLogClientMap.get("browser_rendering_engine").equals(this.client.getBrowser().get("renderingEngine")) && administratorLogClientMap.get("browser_type").equals(this.client.getBrowser().get("type")) && administratorLogClientMap.get("browser_version").equals(this.client.getBrowser().get("version")) && administratorLogClientMap.get("device_id").equals(this.client.getDevice().get("id")) && administratorLogClientMap.get("device_manufacturer").equals(this.client.getDevice().get("manufacturer")) && administratorLogClientMap.get("device_operating_system").equals(this.client.getDevice().get("operatingSystem")) && administratorLogClientMap.get("device_type").equals(this.client.getDevice().get("type")) && administratorLogClientMap.get("id").equals(this.client.getId()) && administratorLogClientMap.get("ip").equals(this.client.getIp()) && administratorLogClientMap.get("mac").equals(this.client.getMac())) {

                            result = true;

                        } else if (administratorLogMap.get("log").equals("Logout")) {

                            result = false;

                        }

                    }

                    break;

                }

            }

        }

        return result;

    }


    public Map<String, Object> initializeAccount(HttpServletRequest request) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("result", false);
            }

        };

        Cookie[] cookies = request.getCookies();

        this.client.getDetail(request);

        if (cookies != null) {

            for (Cookie cookie : cookies) {

                if (cookie.getName().equals("preloode_account")) {

                    Boolean login = false;

                    Document findEq = new Document("authentication", cookie.getValue());
                    MongoCursor<Document> administratorLogIterator = this.administratorLogRepository.findEqSort(findEq, new Document("created.timestamp", -1));

                    Map<String, Object> administratorLogLogin = new HashMap<String, Object>();

                    while (administratorLogIterator.hasNext()) {

                        Map<String, Object> administratorLogMap = administratorLogIterator.next();

                        Map<String, Object> administratorLogClientMap = (Map<String, Object>) administratorLogMap.get("client");

                        if (administratorLogMap.get("log").equals("Login") && administratorLogClientMap.get("browser_id").equals(this.client.getBrowser().get("id")) && administratorLogClientMap.get("browser_manufacturer").equals(this.client.getBrowser().get("manufacturer")) && administratorLogClientMap.get("browser_name").equals(this.client.getBrowser().get("name")) && administratorLogClientMap.get("browser_rendering_engine").equals(this.client.getBrowser().get("renderingEngine")) && administratorLogClientMap.get("browser_type").equals(this.client.getBrowser().get("type")) && administratorLogClientMap.get("browser_version").equals(this.client.getBrowser().get("version")) && administratorLogClientMap.get("device_id").equals(this.client.getDevice().get("id")) && administratorLogClientMap.get("device_manufacturer").equals(this.client.getDevice().get("manufacturer")) && administratorLogClientMap.get("device_operating_system").equals(this.client.getDevice().get("operatingSystem")) && administratorLogClientMap.get("device_type").equals(this.client.getDevice().get("type")) && administratorLogClientMap.get("id").equals(this.client.getId()) && administratorLogClientMap.get("ip").equals(this.client.getIp()) && administratorLogClientMap.get("mac").equals(this.client.getMac())) {

                            administratorLogLogin = administratorLogMap;

                            login = true;

                        } else if (administratorLogMap.get("log").equals("Logout")) {

                            login = false;

                        }

                    }

                    if (login) {

                        Map<String, Object> administratorLogAdministratorMap = (Map<String, Object>) administratorLogLogin.get("administrator");

                        findEq = new Document("_id", administratorLogAdministratorMap.get("id").toString());
                        MongoCursor<Document> administratorIterator = this.administratorRepository.findEqSort(findEq, new Document("created.timestamp", -1));

                        if (administratorIterator.hasNext()) {

                            result = administratorIterator.next();
                            result.put("result", true);

                        }

                    }

                    break;

                }

            }

        }

        return result;

    }


}
