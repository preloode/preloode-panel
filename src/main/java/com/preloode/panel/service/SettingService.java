package com.preloode.panel.service;

import com.mongodb.client.MongoCursor;
import com.preloode.panel.component.DateTime;
import com.preloode.panel.component.Image;
import com.preloode.panel.component.Log;
import com.preloode.panel.configuration.Path;
import com.preloode.panel.repository.SettingLogDataRepository;
import com.preloode.panel.repository.SettingRepository;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class SettingService {


    @Autowired
    private DateTime dateTime;

    @Autowired
    private Path path;

    @Autowired
    private Image image;

    @Autowired
    private Log log;

    @Autowired
    private AdministratorLogService administratorLogService;

    @Autowired
    private SettingLogDataRepository settingLogDataRepository;

    @Autowired
    private SettingRepository settingRepository;


    public Map<String, Object> initializeData(Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Data failed initialized");
                put("result", false);
            }

        };

        MongoCursor<Document> settingIterator = this.settingRepository.findSort(new Document("created.timestamp", -1));

        if (settingIterator.hasNext()) {

            Map<String, Object> settingMap = settingIterator.next();

            Map<String, Object> depositSettingMap = (Map<String, Object>) settingMap.get("deposit");

            depositSettingMap.put("average_time", depositSettingMap.get("average_time").toString());
            depositSettingMap.put("maximum", depositSettingMap.get("maximum").toString());
            depositSettingMap.put("minimum", depositSettingMap.get("minimum").toString());

            settingMap.put("deposit", depositSettingMap);

            Map<String, Object> withdrawalSettingMap = (Map<String, Object>) settingMap.get("withdrawal");

            withdrawalSettingMap.put("average_time", withdrawalSettingMap.get("average_time").toString());
            withdrawalSettingMap.put("maximum", withdrawalSettingMap.get("maximum").toString());
            withdrawalSettingMap.put("minimum", withdrawalSettingMap.get("minimum").toString());

            settingMap.put("withdrawal", withdrawalSettingMap);

            result.put("data", settingMap);

        }

        result.put("result", true);

        return result;

    }


    public Map<String, Object> update(HttpServletRequest request, Map<String, Object> preloodeAccount, Document data) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Setting failed edited");
                put("result", false);
            }

        };

        Map<String, Object> depositDataMap = (Map<String, Object>) data.get("deposit");

        if (depositDataMap.get("average_time").toString().isEmpty()) {

            depositDataMap.put("average_time", "0");

        }

        depositDataMap.put("average_time", new BigDecimal(depositDataMap.get("average_time").toString().replaceAll("[^0-9.]", "")).setScale(0, BigDecimal.ROUND_CEILING));

        if (depositDataMap.get("maximum").toString().isEmpty()) {

            depositDataMap.put("maximum", "0");

        }

        depositDataMap.put("maximum", new BigDecimal(depositDataMap.get("maximum").toString().replaceAll("[^0-9.]", "")).setScale(2, BigDecimal.ROUND_CEILING));

        if (depositDataMap.get("minimum").toString().isEmpty()) {

            depositDataMap.put("minimum", "0");

        }

        depositDataMap.put("minimum", new BigDecimal(depositDataMap.get("minimum").toString().replaceAll("[^0-9.]", "")).setScale(2, BigDecimal.ROUND_CEILING));

        data.put("deposit", depositDataMap);

        Map<String, Object> maintenanceDataMap = (Map<String, Object>) data.get("maintenance");

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        this.dateTime.setTimezone(simpleDateFormat);

        try {

            maintenanceDataMap.put("finish", new Date(simpleDateFormat.parse(maintenanceDataMap.get("finish").toString()).getTime()));
            maintenanceDataMap.put("next", new Date(simpleDateFormat.parse(maintenanceDataMap.get("next").toString()).getTime()));

        } catch (Exception exception) {

            this.log.exception(request, exception);

        }

        data.put("maintenance", maintenanceDataMap);

        Map<String, Object> withdrawalDataMap = (Map<String, Object>) data.get("withdrawal");

        if (withdrawalDataMap.get("average_time").toString().isEmpty()) {

            withdrawalDataMap.put("average_time", "0");

        }

        withdrawalDataMap.put("average_time", new BigDecimal(withdrawalDataMap.get("average_time").toString().replaceAll("[^0-9.]", "")).setScale(0, BigDecimal.ROUND_CEILING));

        if (withdrawalDataMap.get("maximum").toString().isEmpty()) {

            withdrawalDataMap.put("maximum", "0");

        }

        withdrawalDataMap.put("maximum", new BigDecimal(withdrawalDataMap.get("maximum").toString().replaceAll("[^0-9.]", "")).setScale(2, BigDecimal.ROUND_CEILING));

        if (withdrawalDataMap.get("minimum").toString().isEmpty()) {

            withdrawalDataMap.put("minimum", "0");

        }

        withdrawalDataMap.put("minimum", new BigDecimal(withdrawalDataMap.get("minimum").toString().replaceAll("[^0-9.]", "")).setScale(2, BigDecimal.ROUND_CEILING));

        data.put("withdrawal", withdrawalDataMap);

        Document findEq = new Document("_id", data.get("id"));
        MongoCursor<Document> settingIterator = this.settingRepository.findEqSort(findEq, new Document("created.timestamp", -1));

        if (settingIterator.hasNext()) {

            Map<String, Object> settingMap = settingIterator.next();

            if (!settingMap.get("file").equals(data.get("file"))) {

                this.image.delete(request, this.path.getImage() + "/setting", settingMap.get("file").toString());

            }

            Document updateOneEq = new Document("_id", settingMap.get("_id"));
            Document updateOneData = data;
            Document updateOneAdministrator = new Document("id", preloodeAccount.get("_id"))
                    .append("username", preloodeAccount.get("username"));
            this.settingRepository.updateOne(request, updateOneEq, updateOneData, updateOneAdministrator);

            Document logData = (Document) settingMap;
            logData.put("setting_id", settingMap.get("_id"));
            logData.remove("_id");
            logData.remove("created");
            logData.remove("modified");
            this.settingLogDataRepository.insertOne(request, logData, updateOneAdministrator);

            Document insertLogTarget = new Document("target", new Document("id", settingMap.get("_id"))
                    .append("name", "Setting"));
            this.administratorLogService.insert(request, updateOneAdministrator, "", "Edit setting", insertLogTarget);

            result.put("response", "Setting successfully edited");
            result.put("result", true);

        } else {

            result.put("response", "Setting doesn't exist");

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

        result = this.image.upload(request, multipartRequest, this.path.getImage() + "/setting", 10024);

        if (result.get("result").equals(true)) {

            ArrayList<String> files = (ArrayList<String>) result.get("file");

            for (String string : files) {

                this.image.resize(request, this.path.getImage() + "/setting", string, 1920, 1920);

            }

        }

        return result;

    }


}
