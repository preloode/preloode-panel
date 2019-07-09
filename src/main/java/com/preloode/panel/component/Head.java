package com.preloode.panel.component;

import com.preloode.panel.configuration.Setting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class Head {


    @Autowired
    private Setting setting;


    public Setting initialize(String name) {

        ArrayList<String> css = new ArrayList<String>();
        css.add(name.replaceAll(" ", "-").toLowerCase() + ".css");
        this.setting.setCss(css);

        ArrayList<String> javascript = new ArrayList<String>();
        javascript.add(name.replaceAll(" ", "-").toLowerCase() + ".js");
        this.setting.setJavascript(javascript);

        this.setting.setMetaTitle(name);

        return this.setting;

    }


}
