package com.preloode.panel.service;

import com.preloode.panel.component.RsaEncryption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Service
public class RsaEncryptionService {


    @Autowired
    private RsaEncryption rsaEncryption;


    public Map<String, Object> generateKeyPair(HttpServletRequest request) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Generate key pair failed");
                put("result", false);
            }

        };

        Map<String, Object> keyPair = this.rsaEncryption.generateKeyPair(request);

        if (keyPair.get("result").equals(true)) {

            result.put("privateKey", keyPair.get("privateKey"));
            result.put("publicKey", keyPair.get("publicKey"));
            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> getKeyPair() {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Get key pair failed");
                put("result", false);
            }

        };

        result.put("privateKey", this.rsaEncryption.getPrivateKeyString());
        result.put("publicKey", this.rsaEncryption.getPublicKeyString());
        result.put("result", true);

        return result;

    }


}
