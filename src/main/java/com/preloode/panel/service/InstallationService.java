package com.preloode.panel.service;

import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoIterable;
import com.preloode.panel.component.DateTime;
import com.preloode.panel.component.RsaEncryption;
import com.preloode.panel.repository.*;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class InstallationService {


    @Autowired
    private DateTime dateTime;

    @Autowired
    private RsaEncryption rsaEncryption;

    @Autowired
    private AdministratorRepository administratorRepository;

    @Autowired
    private AdministratorRoleRepository administratorRoleRepository;

    @Autowired
    private BankAccountRepository bankAccountRepository;

    @Autowired
    private BankRepository bankRepository;

    @Autowired
    private BlogCategoryRepository blogCategoryRepository;

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private GameTypeRepository gameTypeRepository;

    @Autowired
    private InstallationRepository installationRepository;

    @Autowired
    private MemberGroupRepository memberGroupRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PageRepository pageRepository;

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private SettingRepository settingRepository;

    @Autowired
    private UrlRepository urlRepository;


    public Boolean checkInstallation() {

        Boolean result = false;

        MongoCursor<Document> settingIterator = this.settingRepository.findSort(new Document("created.timestamp", -1));

        if (settingIterator.hasNext()) {

            Map<String, Object> statusMap = settingIterator.next();

            if (statusMap.get("installation").equals("Installed")) {

                result = true;

            }

        }

        return result;

    }


    public Map<String, Object> initializeData(HttpServletRequest request) {

        HttpSession session = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest().getSession();

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Initialize data failed");
                put("result", false);
            }

        };

        Document insertOneData = new Document("name", "Super Administrator")
                .append("privilege", new Document("administrator", "7777")
                        .append("administrator_role", "7777")
                        .append("bank", "7777")
                        .append("bank_account", "7777")
                        .append("blog", "7777")
                        .append("blog_category", "7777")
                        .append("blog_star", "7777")
                        .append("gallery", "7777")
                        .append("game", "7777")
                        .append("game_transaction", "7777")
                        .append("game_type", "7777")
                        .append("lottery", "7777")
                        .append("member", "7777")
                        .append("member_group", "7777")
                        .append("member_transaction", "7777")
                        .append("promotion", "7777")
                        .append("report", "7777")
                        .append("setting", "7777")
                        .append("setting_page", "7777")
                        .append("setting_slider", "7777")
                        .append("setting_url", "7777")
                        .append("sportsbook", "7777")
                        .append("transaction", "7777")
                        .append("transaction_request", "7777"))
                .append("sequence", new BigDecimal("1"))
                .append("status", "Active");
        Document insertOneAdministrator = new Document("id", "0")
                .append("username", "System");
        String administratorRoleInsertId = this.administratorRoleRepository.insertOne(request, insertOneData, insertOneAdministrator);

        String password = this.rsaEncryption.encrypt(request, "RizkyPratama@1989");

        insertOneData = new Document("city", "Bogor")
                .append("contact", new Document("email_address", "preloode@preloode.com")
                        .append("line_id", "preloode")
                        .append("phone_number", "+6285724646711")
                        .append("wechat_id", "preloode")
                        .append("whatsapp_number", "+6285724646711"))
                .append("country", "Indonesia")
                .append("file", "preloode-avatar.jpg")
                .append("gender", "Male")
                .append("language", "English")
                .append("name", new Document("first", "Rizky")
                        .append("last", "Pratama")
                        .append("middle", ""))
                .append("password", new Document("main", password)
                        .append("recovery", password))
                .append("privilege", new Document("administrator", "7777")
                        .append("administrator_role", "7777")
                        .append("bank", "7777")
                        .append("bank_account", "7777")
                        .append("blog", "7777")
                        .append("blog_category", "7777")
                        .append("blog_star", "7777")
                        .append("gallery", "7777")
                        .append("game", "7777")
                        .append("game_transaction", "7777")
                        .append("game_type", "7777")
                        .append("lottery", "7777")
                        .append("member", "7777")
                        .append("member_group", "7777")
                        .append("member_transaction", "7777")
                        .append("promotion", "7777")
                        .append("report", "7777")
                        .append("setting", "7777")
                        .append("setting_page", "7777")
                        .append("setting_slider", "7777")
                        .append("setting_url", "7777")
                        .append("sportsbook", "7777")
                        .append("transaction", "7777")
                        .append("transaction_request", "7777"))
                .append("province", "West Java")
                .append("role", new Document("id", administratorRoleInsertId)
                        .append("name", "Super Administrator"))
                .append("status", "Active")
                .append("street_address", "Taman Nolina Indah Blok F7")
                .append("username", "preloode")
                .append("zip_code", "43253");
        this.administratorRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("name", "Sportsbook")
                .append("sequence", new BigDecimal("1"))
                .append("status", "Active");
        session.setAttribute("gameTypeSportsbookInsertId", this.gameTypeRepository.insertOne(request, insertOneData, insertOneAdministrator));

        insertOneData = new Document("name", "Live Casino")
                .append("sequence", new BigDecimal("2"))
                .append("status", "Active");
        session.setAttribute("gameTypeLiveCasinoInsertId", this.gameTypeRepository.insertOne(request, insertOneData, insertOneAdministrator));

        insertOneData = new Document("name", "Slots")
                .append("sequence", new BigDecimal("3"))
                .append("status", "Active");
        session.setAttribute("gameTypeSlotsInsertId", this.gameTypeRepository.insertOne(request, insertOneData, insertOneAdministrator));

        insertOneData = new Document("name", "Games")
                .append("sequence", new BigDecimal("4"))
                .append("status", "Active");
        session.setAttribute("gameTypeGamesInsertId", this.gameTypeRepository.insertOne(request, insertOneData, insertOneAdministrator));

        insertOneData = new Document("name", "Lottery")
                .append("sequence", new BigDecimal("5"))
                .append("status", "Active");
        session.setAttribute("gameTypeLotteryInsertId", this.gameTypeRepository.insertOne(request, insertOneData, insertOneAdministrator));

        insertOneData = new Document("name", "Member")
                .append("payment", new Document("bank", new Document("account", new Document("id", new ArrayList<String>())
                        .append("name", new ArrayList<String>())
                        .append("number", new ArrayList<String>()))
                        .append("id", new ArrayList<String>())
                        .append("name", new ArrayList<String>()))
                        .append("method", "Bank Account Transfer"))
                .append("sequence", new BigDecimal("1"))
                .append("status", "Active");
        this.memberGroupRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("activation", new Document("email", "Active")
                .append("sms", "Inactive"))
                .append("comment", "Active")
                .append("deposit", new Document("average_time", "2")
                        .append("maximum", new BigDecimal("1000000000"))
                        .append("minimum", new BigDecimal("50000")))
                .append("file", new Document("favicon", "")
                        .append("logo", ""))
                .append("installation", "Installed")
                .append("like", "Active")
                .append("maintenance", new Document("finish", this.dateTime.getTimestamp(request))
                        .append("next", this.dateTime.getTimestamp(request)))
                .append("meta", new Document("description", "Preloode panel, data management system with a simple layout and high end feature. Customize your own data management system with us!")
                        .append("keyword", "preloode,data,admin,panel,admin panel,data admin panel,preloode data admin panel,preloode data admin panel,management,system,management system,data management system,data management system,simple layout,high end feature,customize data panel,customize management system")
                        .append("title", "Preloode Panel"))
                .append("name", "Preloode Panel")
                .append("og", new Document("description", "Preloode panel, data management system with a simple layout and high end feature. Customize your own data management system with us!")
                        .append("title", "Preloode Panel"))
                .append("rating", "Active")
                .append("status", "Online")
                .append("withdrawal", new Document("average_time", new BigDecimal("5"))
                        .append("maximum", new BigDecimal("5000000000"))
                        .append("minimum", new BigDecimal("100000")));
        this.settingRepository.insertOne(request, insertOneData, insertOneAdministrator);

        final String url = "localhost";
        insertOneData = new Document("name", "Localhost")
                .append("sequence", new BigDecimal("1"))
                .append("status", "Active")
                .append("url", url);
        final String urlInsertId = this.urlRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("content", new Document("url", new Document("id", new ArrayList<String>() {

            {
                add(urlInsertId);
            }

        })
                .append("url", new ArrayList<String>() {

                    {
                        add(url);
                    }

                }))
                .append("value", new ArrayList<String>() {

                    {
                        add("");
                    }

                }))
                .append("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                .append("meta", new Document("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                        .append("keyword", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                }))
                        .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                })))
                .append("name", "Index")
                .append("og", new Document("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                        .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                })))
                .append("sequence", new BigDecimal("1"))
                .append("status", "Active")
                .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                .append("url", "");
        this.pageRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("content", new Document("url", new Document("id", new ArrayList<String>() {

            {
                add(urlInsertId);
            }

        })
                .append("url", new ArrayList<String>() {

                    {
                        add(url);
                    }

                }))
                .append("value", new ArrayList<String>() {

                    {
                        add("");
                    }

                }))
                .append("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                .append("meta", new Document("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                        .append("keyword", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                }))
                        .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                })))
                .append("name", "Login")
                .append("og", new Document("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                        .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                })))
                .append("sequence", new BigDecimal("2"))
                .append("status", "Active")
                .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                .append("url", "login");
        this.pageRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("content", new Document("url", new Document("id", new ArrayList<String>() {

            {
                add(urlInsertId);
            }

        })
                .append("url", new ArrayList<String>() {

                    {
                        add(url);
                    }

                }))
                .append("value", new ArrayList<String>() {

                    {
                        add("");
                    }

                }))
                .append("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                .append("meta", new Document("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                        .append("keyword", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                }))
                        .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                })))
                .append("name", "Register")
                .append("og", new Document("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                        .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                })))
                .append("sequence", new BigDecimal("3"))
                .append("status", "Active")
                .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                .append("url", "register");
        this.pageRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("content", new Document("url", new Document("id", new ArrayList<String>() {

            {
                add(urlInsertId);
            }

        })
                .append("url", new ArrayList<String>() {

                    {
                        add(url);
                    }

                }))
                .append("value", new ArrayList<String>() {

                    {
                        add("");
                    }

                }))
                .append("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                .append("meta", new Document("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                        .append("keyword", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                }))
                        .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                })))
                .append("name", "Deposit")
                .append("og", new Document("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                        .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                })))
                .append("sequence", new BigDecimal("4"))
                .append("status", "Active")
                .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                .append("url", "deposit");
        this.pageRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("content", new Document("url", new Document("id", new ArrayList<String>() {

            {
                add(urlInsertId);
            }

        })
                .append("url", new ArrayList<String>() {

                    {
                        add(url);
                    }

                }))
                .append("value", new ArrayList<String>() {

                    {
                        add("");
                    }

                }))
                .append("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                .append("meta", new Document("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                        .append("keyword", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                }))
                        .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                })))
                .append("name", "Withdrawal")
                .append("og", new Document("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                        .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                })))
                .append("sequence", new BigDecimal("5"))
                .append("status", "Active")
                .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                .append("url", "withdrawal");
        this.pageRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("content", new Document("url", new Document("id", new ArrayList<String>() {

            {
                add(urlInsertId);
            }

        })
                .append("url", new ArrayList<String>() {

                    {
                        add(url);
                    }

                }))
                .append("value", new ArrayList<String>() {

                    {
                        add("");
                    }

                }))
                .append("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                .append("meta", new Document("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                        .append("keyword", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                }))
                        .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                })))
                .append("name", "Game")
                .append("og", new Document("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                        .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                })))
                .append("sequence", new BigDecimal("6"))
                .append("status", "Active")
                .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                .append("url", "game");
        this.pageRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("content", new Document("url", new Document("id", new ArrayList<String>() {

            {
                add(urlInsertId);
            }

        })
                .append("url", new ArrayList<String>() {

                    {
                        add(url);
                    }

                }))
                .append("value", new ArrayList<String>() {

                    {
                        add("");
                    }

                }))
                .append("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                .append("meta", new Document("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                        .append("keyword", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                }))
                        .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                })))
                .append("name", "Sportsbook")
                .append("og", new Document("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                        .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                })))
                .append("sequence", new BigDecimal("7"))
                .append("status", "Active")
                .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                .append("url", "sportsbook");
        this.pageRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("content", new Document("url", new Document("id", new ArrayList<String>() {

            {
                add(urlInsertId);
            }

        })
                .append("url", new ArrayList<String>() {

                    {
                        add(url);
                    }

                }))
                .append("value", new ArrayList<String>() {

                    {
                        add("");
                    }

                }))
                .append("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                .append("meta", new Document("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                        .append("keyword", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                }))
                        .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                })))
                .append("name", "Lottery")
                .append("og", new Document("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                        .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                })))
                .append("sequence", new BigDecimal("8"))
                .append("status", "Active")
                .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                .append("url", "lottery");
        this.pageRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("content", new Document("url", new Document("id", new ArrayList<String>() {

            {
                add(urlInsertId);
            }

        })
                .append("url", new ArrayList<String>() {

                    {
                        add(url);
                    }

                }))
                .append("value", new ArrayList<String>() {

                    {
                        add("");
                    }

                }))
                .append("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                .append("meta", new Document("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                        .append("keyword", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                }))
                        .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                })))
                .append("name", "Promotion")
                .append("og", new Document("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                        .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                })))
                .append("sequence", new BigDecimal("9"))
                .append("status", "Active")
                .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                .append("url", "promotion");
        this.pageRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("content", new Document("url", new Document("id", new ArrayList<String>() {

            {
                add(urlInsertId);
            }

        })
                .append("url", new ArrayList<String>() {

                    {
                        add(url);
                    }

                }))
                .append("value", new ArrayList<String>() {

                    {
                        add("");
                    }

                }))
                .append("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                .append("meta", new Document("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                        .append("keyword", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                }))
                        .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                })))
                .append("name", "Live Score")
                .append("og", new Document("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                        .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                })))
                .append("sequence", new BigDecimal("10"))
                .append("status", "Active")
                .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                .append("url", "live-score");
        this.pageRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("content", new Document("url", new Document("id", new ArrayList<String>() {

            {
                add(urlInsertId);
            }

        })
                .append("url", new ArrayList<String>() {

                    {
                        add(url);
                    }

                }))
                .append("value", new ArrayList<String>() {

                    {
                        add("");
                    }

                }))
                .append("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                .append("meta", new Document("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                        .append("keyword", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                }))
                        .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                })))
                .append("name", "Term Of Service")
                .append("og", new Document("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                        .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                })))
                .append("sequence", new BigDecimal("11"))
                .append("status", "Active")
                .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                .append("url", "term-of-service");
        this.pageRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("content", new Document("url", new Document("id", new ArrayList<String>() {

            {
                add(urlInsertId);
            }

        })
                .append("url", new ArrayList<String>() {

                    {
                        add(url);
                    }

                }))
                .append("value", new ArrayList<String>() {

                    {
                        add("");
                    }

                }))
                .append("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                .append("meta", new Document("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                        .append("keyword", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                }))
                        .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                })))
                .append("name", "About Us")
                .append("og", new Document("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                        .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                })))
                .append("sequence", new BigDecimal("12"))
                .append("status", "Active")
                .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                .append("url", "about-us");
        this.pageRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("content", new Document("url", new Document("id", new ArrayList<String>() {

            {
                add(urlInsertId);
            }

        })
                .append("url", new ArrayList<String>() {

                    {
                        add(url);
                    }

                }))
                .append("value", new ArrayList<String>() {

                    {
                        add("");
                    }

                }))
                .append("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                .append("meta", new Document("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                        .append("keyword", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                }))
                        .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                })))
                .append("name", "F.A.Q.")
                .append("og", new Document("description", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                        .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                            {
                                add(urlInsertId);
                            }

                        })
                                .append("url", new ArrayList<String>() {

                                    {
                                        add(url);
                                    }

                                }))
                                .append("value", new ArrayList<String>() {

                                    {
                                        add("");
                                    }

                                })))
                .append("sequence", new BigDecimal("13"))
                .append("status", "Active")
                .append("title", new Document("url", new Document("id", new ArrayList<String>() {

                    {
                        add(urlInsertId);
                    }

                })
                        .append("url", new ArrayList<String>() {

                            {
                                add(url);
                            }

                        }))
                        .append("value", new ArrayList<String>() {

                            {
                                add("");
                            }

                        }))
                .append("url", "faq");
        this.pageRepository.insertOne(request, insertOneData, insertOneAdministrator);

        result.put("result", true);

        return result;

    }


    public Map<String, Object> initializeDemoData(HttpServletRequest request, HttpSession session) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Initialize data failed");
                put("result", false);
            }

        };

        Document insertOneData = new Document("name", "Master Administrator")
                .append("privilege", new Document("administrator", "7777")
                        .append("administrator_role", "7777")
                        .append("bank", "7777")
                        .append("bank_account", "7777")
                        .append("blog", "7777")
                        .append("blog_category", "7777")
                        .append("blog_star", "7777")
                        .append("gallery", "7777")
                        .append("game", "7777")
                        .append("game_transaction", "7777")
                        .append("game_type", "7777")
                        .append("lottery", "7777")
                        .append("member", "7777")
                        .append("member_group", "7777")
                        .append("member_transaction", "7777")
                        .append("promotion", "7777")
                        .append("report", "7777")
                        .append("setting", "7777")
                        .append("setting_page", "7777")
                        .append("setting_slider", "7777")
                        .append("setting_url", "7777")
                        .append("sportsbook", "7777")
                        .append("transaction", "7777")
                        .append("transaction_request", "7777"))
                .append("sequence", new BigDecimal("2"))
                .append("status", "Active");
        Document insertOneAdministrator = new Document("id", "0")
                .append("username", "System");
        String masterAdministratorRoleInsertId = this.administratorRoleRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("name", "Finance")
                .append("privilege", new Document("administrator", "7000")
                        .append("administrator_role", "7000")
                        .append("bank", "7777")
                        .append("bank_account", "7777")
                        .append("blog", "7000")
                        .append("blog_category", "7000")
                        .append("blog_star", "7777")
                        .append("gallery", "7000")
                        .append("game", "7000")
                        .append("game_transaction", "7777")
                        .append("game_type", "7000")
                        .append("lottery", "7000")
                        .append("member", "7777")
                        .append("member_group", "7777")
                        .append("member_transaction", "7777")
                        .append("promotion", "7777")
                        .append("report", "7777")
                        .append("setting", "7000")
                        .append("setting_page", "7000")
                        .append("setting_slider", "7000")
                        .append("setting_url", "7000")
                        .append("sportsbook", "7000")
                        .append("transaction", "7777")
                        .append("transaction_request", "7777"))
                .append("sequence", new BigDecimal("3"))
                .append("status", "Active");
        insertOneAdministrator = new Document("id", "0")
                .append("username", "System");
        String financeAdministratorRoleInsertId = this.administratorRoleRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("name", "Customer Service")
                .append("privilege", new Document("administrator", "7000")
                        .append("administrator_role", "7000")
                        .append("bank", "7000")
                        .append("bank_account", "7000")
                        .append("blog", "7000")
                        .append("blog_category", "7000")
                        .append("blog_star", "7777")
                        .append("gallery", "7000")
                        .append("game", "7000")
                        .append("game_transaction", "7770")
                        .append("game_type", "7000")
                        .append("lottery", "7000")
                        .append("member", "7770")
                        .append("member_group", "7000")
                        .append("member_transaction", "7770")
                        .append("promotion", "7000")
                        .append("report", "7000")
                        .append("setting", "7000")
                        .append("setting_page", "7000")
                        .append("setting_slider", "7000")
                        .append("setting_url", "7000")
                        .append("sportsbook", "7000")
                        .append("transaction", "7000")
                        .append("transaction_request", "7000"))
                .append("sequence", new BigDecimal("4"))
                .append("status", "Active");
        insertOneAdministrator = new Document("id", "0")
                .append("username", "System");
        String customerServiceAdministratorRoleInsertId = this.administratorRoleRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("name", "Content Administrator")
                .append("privilege", new Document("administrator", "7000")
                        .append("administrator_role", "7000")
                        .append("bank", "7000")
                        .append("bank_account", "7000")
                        .append("blog", "7777")
                        .append("blog_category", "7777")
                        .append("blog_star", "7777")
                        .append("gallery", "7000")
                        .append("game", "7000")
                        .append("game_transaction", "7000")
                        .append("game_type", "7000")
                        .append("lottery", "7000")
                        .append("member", "7000")
                        .append("member_group", "7000")
                        .append("member_transaction", "7000")
                        .append("promotion", "7000")
                        .append("report", "7000")
                        .append("setting", "7000")
                        .append("setting_page", "7000")
                        .append("setting_slider", "7000")
                        .append("setting_url", "7000")
                        .append("sportsbook", "7000")
                        .append("transaction", "7000")
                        .append("transaction_request", "7000"))
                .append("sequence", new BigDecimal("5"))
                .append("status", "Active");
        insertOneAdministrator = new Document("id", "0")
                .append("username", "System");
        String contentAdministratorRoleInsertId = this.administratorRoleRepository.insertOne(request, insertOneData, insertOneAdministrator);

        String password = this.rsaEncryption.encrypt(request, "Brokenbone89.");

        insertOneData = new Document("city", "Jakarta Pusat")
                .append("contact", new Document("email_address", "masteradmin@preloode.com")
                        .append("line_id", "masteradmin")
                        .append("phone_number", "000000000000")
                        .append("wechat_id", "masteradmin")
                        .append("whatsapp_number", "000000000000"))
                .append("country", "Indonesia")
                .append("file", "")
                .append("gender", "Male")
                .append("language", "English")
                .append("name", new Document("first", "Master")
                        .append("last", "Administrator")
                        .append("middle", ""))
                .append("password", new Document("main", password)
                        .append("recovery", password))
                .append("privilege", new Document("administrator", "7777")
                        .append("administrator_role", "7777")
                        .append("bank", "7777")
                        .append("bank_account", "7777")
                        .append("blog", "7777")
                        .append("blog_category", "7777")
                        .append("blog_star", "7777")
                        .append("gallery", "7777")
                        .append("game", "7777")
                        .append("game_transaction", "7777")
                        .append("game_type", "7777")
                        .append("lottery", "7777")
                        .append("member", "7777")
                        .append("member_group", "7777")
                        .append("member_transaction", "7777")
                        .append("promotion", "7777")
                        .append("report", "7777")
                        .append("setting", "7777")
                        .append("setting_page", "7777")
                        .append("setting_slider", "7777")
                        .append("setting_url", "7777")
                        .append("sportsbook", "7777")
                        .append("transaction", "7777")
                        .append("transaction_request", "7777"))
                .append("province", "DKI Jakarta")
                .append("role", new Document("id", masterAdministratorRoleInsertId)
                        .append("name", "Master Administrator"))
                .append("status", "Active")
                .append("street_address", "Jln. Cempaka Putih Tengah Raya Kel. Cempaka Putih Timur Kec. Cempaka Putih")
                .append("username", "masteradmin")
                .append("zip_code", "10510");
        this.administratorRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("city", "Jakarta Pusat")
                .append("contact", new Document("email_address", "finance@preloode.com")
                        .append("line_id", "finance")
                        .append("phone_number", "000000000001")
                        .append("wechat_id", "finance")
                        .append("whatsapp_number", "000000000001"))
                .append("country", "Indonesia")
                .append("file", "")
                .append("gender", "Female")
                .append("language", "English")
                .append("name", new Document("first", "Finance")
                        .append("last", "Administrator")
                        .append("middle", ""))
                .append("password", new Document("main", password)
                        .append("recovery", password))
                .append("privilege", new Document("administrator", "7000")
                        .append("administrator_role", "7000")
                        .append("bank", "7777")
                        .append("bank_account", "7777")
                        .append("blog", "7000")
                        .append("blog_category", "7000")
                        .append("blog_star", "7777")
                        .append("gallery", "7000")
                        .append("game", "7000")
                        .append("game_transaction", "7777")
                        .append("game_type", "7000")
                        .append("lottery", "7000")
                        .append("member", "7777")
                        .append("member_group", "7777")
                        .append("member_transaction", "7777")
                        .append("promotion", "7777")
                        .append("report", "7777")
                        .append("setting", "7000")
                        .append("setting_page", "7000")
                        .append("setting_slider", "7000")
                        .append("setting_url", "7000")
                        .append("sportsbook", "7000")
                        .append("transaction", "7777")
                        .append("transaction_request", "7777"))
                .append("province", "DKI Jakarta")
                .append("role", new Document("id", financeAdministratorRoleInsertId)
                        .append("name", "Finance"))
                .append("status", "Active")
                .append("street_address", "Jln. Cempaka Putih Tengah Raya Kel. Cempaka Putih Timur Kec. Cempaka Putih")
                .append("username", "finance")
                .append("zip_code", "10510");
        this.administratorRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("city", "Jakarta Pusat")
                .append("contact", new Document("email_address", "customerservice@preloode.com")
                        .append("line_id", "customerservice")
                        .append("phone_number", "000000000002")
                        .append("wechat_id", "customerservice")
                        .append("whatsapp_number", "000000000002"))
                .append("country", "Indonesia")
                .append("file", "")
                .append("gender", "Female")
                .append("language", "English")
                .append("name", new Document("first", "Customer")
                        .append("last", "Administrator")
                        .append("middle", "Service"))
                .append("password", new Document("main", password)
                        .append("recovery", password))
                .append("privilege", new Document("administrator", "7000")
                        .append("administrator_role", "7000")
                        .append("bank", "7000")
                        .append("bank_account", "7000")
                        .append("blog", "7000")
                        .append("blog_category", "7000")
                        .append("blog_star", "7777")
                        .append("gallery", "7000")
                        .append("game", "7000")
                        .append("game_transaction", "7770")
                        .append("game_type", "7000")
                        .append("lottery", "7000")
                        .append("member", "7770")
                        .append("member_group", "7000")
                        .append("member_transaction", "7770")
                        .append("promotion", "7000")
                        .append("report", "7000")
                        .append("setting", "7000")
                        .append("setting_page", "7000")
                        .append("setting_slider", "7000")
                        .append("setting_url", "7000")
                        .append("sportsbook", "7000")
                        .append("transaction", "7000")
                        .append("transaction_request", "7000"))
                .append("province", "DKI Jakarta")
                .append("role", new Document("id", customerServiceAdministratorRoleInsertId)
                        .append("name", "Customer Service"))
                .append("status", "Active")
                .append("street_address", "Jln. Cempaka Putih Tengah Raya Kel. Cempaka Putih Timur Kec. Cempaka Putih")
                .append("username", "customerservice")
                .append("zip_code", "10510");
        this.administratorRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("city", "Jakarta Pusat")
                .append("contact", new Document("email_address", "contentadmin@preloode.com")
                        .append("line_id", "contentadmin")
                        .append("phone_number", "000000000003")
                        .append("wechat_id", "contentadmin")
                        .append("whatsapp_number", "000000000003"))
                .append("country", "Indonesia")
                .append("file", "")
                .append("gender", "Male")
                .append("language", "English")
                .append("name", new Document("first", "Content")
                        .append("last", "Administrator")
                        .append("middle", ""))
                .append("password", new Document("main", password)
                        .append("recovery", password))
                .append("privilege", new Document("administrator", "7000")
                        .append("administrator_role", "7000")
                        .append("bank", "7000")
                        .append("bank_account", "7000")
                        .append("blog", "7777")
                        .append("blog_category", "7777")
                        .append("blog_star", "7777")
                        .append("gallery", "7000")
                        .append("game", "7000")
                        .append("game_transaction", "7000")
                        .append("game_type", "7000")
                        .append("lottery", "7000")
                        .append("member", "7000")
                        .append("member_group", "7000")
                        .append("member_transaction", "7000")
                        .append("promotion", "7000")
                        .append("report", "7000")
                        .append("setting", "7000")
                        .append("setting_page", "7000")
                        .append("setting_slider", "7000")
                        .append("setting_url", "7000")
                        .append("sportsbook", "7000")
                        .append("transaction", "7000")
                        .append("transaction_request", "7000"))
                .append("province", "DKI Jakarta")
                .append("role", new Document("id", contentAdministratorRoleInsertId)
                        .append("name", "Content Administrator"))
                .append("status", "Active")
                .append("street_address", "Jln. Cempaka Putih Tengah Raya Kel. Cempaka Putih Timur Kec. Cempaka Putih")
                .append("username", "contentadmin")
                .append("zip_code", "10510");
        this.administratorRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("file", "")
                .append("name", "BCA")
                .append("sequence", new BigDecimal("1"))
                .append("status", "Active");
        String bcaBankInsertId = this.bankRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("file", "")
                .append("name", "MANDIRI")
                .append("sequence", new BigDecimal("2"))
                .append("status", "Active");
        String mandiriBankInsertId = this.bankRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("file", "")
                .append("name", "BNI")
                .append("sequence", new BigDecimal("3"))
                .append("status", "Active");
        String bniBankInsertId = this.bankRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("file", "")
                .append("name", "BRI")
                .append("sequence", new BigDecimal("4"))
                .append("status", "Active");
        String briBankInsertId = this.bankRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("bank", new Document("id", bcaBankInsertId)
                .append("name", "BCA"))
                .append("city", "")
                .append("contact", new Document("email_address", "")
                        .append("phone_number", ""))
                .append("country", "Indonesia")
                .append("credit", new BigDecimal("0"))
                .append("file", "")
                .append("gender", "Male")
                .append("name", new Document("first", "Jusuf")
                        .append("last", "Anwar")
                        .append("middle", ""))
                .append("number", "6090455565")
                .append("password", "")
                .append("pin", "")
                .append("province", "")
                .append("sequence", new BigDecimal("1"))
                .append("status", "Active")
                .append("street_address", "")
                .append("type", new ArrayList<String>() {

                    {
                        add("Deposit");
                    }

                })
                .append("username", "")
                .append("zip_code", "")
                .append("credit", new BigDecimal("0.00"));
        this.bankAccountRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("bank", new Document("id", bcaBankInsertId)
                .append("name", "BCA"))
                .append("city", "")
                .append("contact", new Document("email_address", "")
                        .append("phone_number", ""))
                .append("country", "Indonesia")
                .append("credit", new BigDecimal("0"))
                .append("file", "")
                .append("gender", "Male")
                .append("name", new Document("first", "Yenny")
                        .append("last", "Maranti")
                        .append("middle", ""))
                .append("number", "8415206131")
                .append("password", "")
                .append("pin", "")
                .append("province", "")
                .append("sequence", new BigDecimal("2"))
                .append("status", "Active")
                .append("street_address", "")
                .append("type", new ArrayList<String>() {

                    {
                        add("Deposit");
                    }

                })
                .append("username", "")
                .append("zip_code", "")
                .append("credit", new BigDecimal("0.00"));
        this.bankAccountRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("bank", new Document("id", bcaBankInsertId)
                .append("name", "BCA"))
                .append("city", "")
                .append("contact", new Document("email_address", "")
                        .append("phone_number", ""))
                .append("country", "Indonesia")
                .append("credit", new BigDecimal("0"))
                .append("file", "")
                .append("gender", "Female")
                .append("name", new Document("first", "Kokom")
                        .append("last", "Suhaimah")
                        .append("middle", ""))
                .append("number", "0231287816")
                .append("password", "")
                .append("pin", "")
                .append("province", "")
                .append("sequence", new BigDecimal("3"))
                .append("status", "Active")
                .append("street_address", "")
                .append("type", new ArrayList<String>() {

                    {
                        add("Deposit");
                    }

                })
                .append("username", "")
                .append("zip_code", "")
                .append("credit", new BigDecimal("0.00"));
        this.bankAccountRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("bank", new Document("id", bcaBankInsertId)
                .append("name", "BCA"))
                .append("city", "")
                .append("contact", new Document("email_address", "")
                        .append("phone_number", ""))
                .append("country", "Indonesia")
                .append("credit", new BigDecimal("0"))
                .append("file", "")
                .append("gender", "Female")
                .append("name", new Document("first", "Lusi")
                        .append("last", "Octaviani")
                        .append("middle", ""))
                .append("number", "2290043371")
                .append("password", "")
                .append("pin", "")
                .append("province", "")
                .append("sequence", new BigDecimal("4"))
                .append("status", "Active")
                .append("street_address", "")
                .append("type", new ArrayList<String>() {

                    {
                        add("Deposit");
                    }

                })
                .append("username", "")
                .append("zip_code", "")
                .append("credit", new BigDecimal("0.00"));
        this.bankAccountRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("bank", new Document("id", bcaBankInsertId)
                .append("name", "BCA"))
                .append("city", "")
                .append("contact", new Document("email_address", "")
                        .append("phone_number", ""))
                .append("country", "Indonesia")
                .append("credit", new BigDecimal("0"))
                .append("file", "")
                .append("gender", "Male")
                .append("name", new Document("first", "Yudi")
                        .append("last", "Pramana")
                        .append("middle", ""))
                .append("number", "8715033905")
                .append("password", "")
                .append("pin", "")
                .append("province", "")
                .append("sequence", new BigDecimal("5"))
                .append("status", "Active")
                .append("street_address", "")
                .append("type", new ArrayList<String>() {

                    {
                        add("Deposit");
                    }

                })
                .append("username", "")
                .append("zip_code", "")
                .append("credit", new BigDecimal("0.00"));
        this.bankAccountRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("bank", new Document("id", mandiriBankInsertId)
                .append("name", "MANDIRI"))
                .append("city", "")
                .append("contact", new Document("email_address", "")
                        .append("phone_number", ""))
                .append("country", "Indonesia")
                .append("credit", new BigDecimal("0"))
                .append("file", "")
                .append("gender", "Female")
                .append("name", new Document("first", "Bella")
                        .append("last", "Oktavia")
                        .append("middle", ""))
                .append("number", "9000014486477")
                .append("password", "")
                .append("pin", "")
                .append("province", "")
                .append("sequence", new BigDecimal("6"))
                .append("status", "Active")
                .append("street_address", "")
                .append("type", new ArrayList<String>() {

                    {
                        add("Deposit");
                    }

                })
                .append("username", "")
                .append("zip_code", "")
                .append("credit", new BigDecimal("0.00"));
        this.bankAccountRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("bank", new Document("id", mandiriBankInsertId)
                .append("name", "MANDIRI"))
                .append("city", "")
                .append("contact", new Document("email_address", "")
                        .append("phone_number", ""))
                .append("country", "Indonesia")
                .append("credit", new BigDecimal("0"))
                .append("file", "")
                .append("gender", "Female")
                .append("name", new Document("first", "Lisa")
                        .append("last", "Marya")
                        .append("middle", ""))
                .append("number", "1140011389403")
                .append("password", "")
                .append("pin", "")
                .append("province", "")
                .append("sequence", new BigDecimal("7"))
                .append("status", "Active")
                .append("street_address", "")
                .append("type", new ArrayList<String>() {

                    {
                        add("Deposit");
                    }

                })
                .append("username", "")
                .append("zip_code", "")
                .append("credit", new BigDecimal("0.00"));
        this.bankAccountRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("bank", new Document("id", mandiriBankInsertId)
                .append("name", "MANDIRI"))
                .append("city", "")
                .append("contact", new Document("email_address", "")
                        .append("phone_number", ""))
                .append("country", "Indonesia")
                .append("credit", new BigDecimal("0"))
                .append("file", "")
                .append("gender", "Male")
                .append("name", new Document("first", "Mahmud")
                        .append("last", "Dahlan")
                        .append("middle", ""))
                .append("number", "1150006680252")
                .append("password", "")
                .append("pin", "")
                .append("province", "")
                .append("sequence", new BigDecimal("8"))
                .append("status", "Active")
                .append("street_address", "")
                .append("type", new ArrayList<String>() {

                    {
                        add("Deposit");
                    }

                })
                .append("username", "")
                .append("zip_code", "")
                .append("credit", new BigDecimal("0.00"));
        this.bankAccountRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("bank", new Document("id", mandiriBankInsertId)
                .append("name", "MANDIRI"))
                .append("city", "")
                .append("contact", new Document("email_address", "")
                        .append("phone_number", ""))
                .append("country", "Indonesia")
                .append("credit", new BigDecimal("0"))
                .append("file", "")
                .append("gender", "Male")
                .append("name", new Document("first", "Mukhlis")
                        .append("last", "")
                        .append("middle", ""))
                .append("number", "1580003195450")
                .append("password", "")
                .append("pin", "")
                .append("province", "")
                .append("sequence", new BigDecimal("9"))
                .append("status", "Active")
                .append("street_address", "")
                .append("type", new ArrayList<String>() {

                    {
                        add("Deposit");
                    }

                })
                .append("username", "")
                .append("zip_code", "")
                .append("credit", new BigDecimal("0.00"));
        this.bankAccountRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("bank", new Document("id", mandiriBankInsertId)
                .append("name", "MANDIRI"))
                .append("city", "")
                .append("contact", new Document("email_address", "")
                        .append("phone_number", ""))
                .append("country", "Indonesia")
                .append("credit", new BigDecimal("0"))
                .append("file", "")
                .append("gender", "Male")
                .append("name", new Document("first", "Andri")
                        .append("last", "")
                        .append("middle", ""))
                .append("number", "1180010430899")
                .append("password", "")
                .append("pin", "")
                .append("province", "")
                .append("sequence", new BigDecimal("10"))
                .append("status", "Active")
                .append("street_address", "")
                .append("type", new ArrayList<String>() {

                    {
                        add("Deposit");
                    }

                })
                .append("username", "")
                .append("zip_code", "")
                .append("credit", new BigDecimal("0.00"));
        this.bankAccountRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("bank", new Document("id", bniBankInsertId)
                .append("name", "BNI"))
                .append("city", "")
                .append("contact", new Document("email_address", "")
                        .append("phone_number", ""))
                .append("country", "Indonesia")
                .append("credit", new BigDecimal("0"))
                .append("file", "")
                .append("gender", "Male")
                .append("name", new Document("first", "Vijai")
                        .append("last", "")
                        .append("middle", ""))
                .append("number", "0654626160")
                .append("password", "")
                .append("pin", "")
                .append("province", "")
                .append("sequence", new BigDecimal("11"))
                .append("status", "Active")
                .append("street_address", "")
                .append("type", new ArrayList<String>() {

                    {
                        add("Deposit");
                    }

                })
                .append("username", "")
                .append("zip_code", "")
                .append("credit", new BigDecimal("0.00"));
        this.bankAccountRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("bank", new Document("id", bniBankInsertId)
                .append("name", "BNI"))
                .append("city", "")
                .append("contact", new Document("email_address", "")
                        .append("phone_number", ""))
                .append("country", "Indonesia")
                .append("credit", new BigDecimal("0"))
                .append("file", "")
                .append("gender", "Male")
                .append("name", new Document("first", "Ardi")
                        .append("last", "Raharja")
                        .append("middle", ""))
                .append("number", "0654626160")
                .append("password", "")
                .append("pin", "")
                .append("province", "")
                .append("sequence", new BigDecimal("12"))
                .append("status", "Active")
                .append("street_address", "")
                .append("type", new ArrayList<String>() {

                    {
                        add("Deposit");
                    }

                })
                .append("username", "")
                .append("zip_code", "")
                .append("credit", new BigDecimal("0.00"));
        this.bankAccountRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("bank", new Document("id", bniBankInsertId)
                .append("name", "BNI"))
                .append("city", "")
                .append("contact", new Document("email_address", "")
                        .append("phone_number", ""))
                .append("country", "Indonesia")
                .append("credit", new BigDecimal("0"))
                .append("file", "")
                .append("gender", "Male")
                .append("name", new Document("first", "Agus")
                        .append("last", "Hidayat")
                        .append("middle", ""))
                .append("number", "0464456067")
                .append("password", "")
                .append("pin", "")
                .append("province", "")
                .append("sequence", new BigDecimal("13"))
                .append("status", "Active")
                .append("street_address", "")
                .append("type", new ArrayList<String>() {

                    {
                        add("Deposit");
                    }

                })
                .append("username", "")
                .append("zip_code", "")
                .append("credit", new BigDecimal("0.00"));
        this.bankAccountRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("bank", new Document("id", bniBankInsertId)
                .append("name", "BNI"))
                .append("city", "")
                .append("contact", new Document("email_address", "")
                        .append("phone_number", ""))
                .append("country", "Indonesia")
                .append("credit", new BigDecimal("0"))
                .append("file", "")
                .append("gender", "Male")
                .append("name", new Document("first", "Rico")
                        .append("last", "Duari")
                        .append("middle", ""))
                .append("number", "0352044287")
                .append("password", "")
                .append("pin", "")
                .append("province", "")
                .append("sequence", new BigDecimal("14"))
                .append("status", "Active")
                .append("street_address", "")
                .append("type", new ArrayList<String>() {

                    {
                        add("Deposit");
                    }

                })
                .append("username", "")
                .append("zip_code", "")
                .append("credit", new BigDecimal("0.00"));
        this.bankAccountRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("bank", new Document("id", bniBankInsertId)
                .append("name", "BNI"))
                .append("city", "")
                .append("contact", new Document("email_address", "")
                        .append("phone_number", ""))
                .append("country", "Indonesia")
                .append("credit", new BigDecimal("0"))
                .append("file", "")
                .append("gender", "Male")
                .append("name", new Document("first", "Antonius")
                        .append("last", "Hendrawan")
                        .append("middle", ""))
                .append("number", "0352070806")
                .append("password", "")
                .append("pin", "")
                .append("province", "")
                .append("sequence", new BigDecimal("15"))
                .append("status", "Active")
                .append("street_address", "")
                .append("type", new ArrayList<String>() {

                    {
                        add("Deposit");
                    }

                })
                .append("username", "")
                .append("zip_code", "")
                .append("credit", new BigDecimal("0.00"));
        this.bankAccountRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("bank", new Document("id", briBankInsertId)
                .append("name", "BRI"))
                .append("city", "")
                .append("contact", new Document("email_address", "")
                        .append("phone_number", ""))
                .append("country", "Indonesia")
                .append("credit", new BigDecimal("0"))
                .append("file", "")
                .append("gender", "Male")
                .append("name", new Document("first", "Lim")
                        .append("last", "Jin")
                        .append("middle", "Lie"))
                .append("number", "050501012896508")
                .append("password", "")
                .append("pin", "")
                .append("province", "")
                .append("sequence", new BigDecimal("16"))
                .append("status", "Active")
                .append("street_address", "")
                .append("type", new ArrayList<String>() {

                    {
                        add("Deposit");
                    }

                })
                .append("username", "")
                .append("zip_code", "")
                .append("credit", new BigDecimal("0.00"));
        this.bankAccountRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("bank", new Document("id", briBankInsertId)
                .append("name", "BRI"))
                .append("city", "")
                .append("contact", new Document("email_address", "")
                        .append("phone_number", ""))
                .append("country", "Indonesia")
                .append("credit", new BigDecimal("0"))
                .append("file", "")
                .append("gender", "Male")
                .append("name", new Document("first", "Anto")
                        .append("last", "Ardianto")
                        .append("middle", ""))
                .append("number", "119601000115564")
                .append("password", "")
                .append("pin", "")
                .append("province", "")
                .append("sequence", new BigDecimal("17"))
                .append("status", "Active")
                .append("street_address", "")
                .append("type", new ArrayList<String>() {

                    {
                        add("Deposit");
                    }

                })
                .append("username", "")
                .append("zip_code", "")
                .append("credit", new BigDecimal("0.00"));
        this.bankAccountRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("bank", new Document("id", briBankInsertId)
                .append("name", "BRI"))
                .append("city", "")
                .append("contact", new Document("email_address", "")
                        .append("phone_number", ""))
                .append("country", "Indonesia")
                .append("credit", new BigDecimal("0"))
                .append("file", "")
                .append("gender", "Male")
                .append("name", new Document("first", "Anto")
                        .append("last", "Ardianto")
                        .append("middle", ""))
                .append("number", "119601000115564")
                .append("password", "")
                .append("pin", "")
                .append("province", "")
                .append("sequence", new BigDecimal("17"))
                .append("status", "Active")
                .append("street_address", "")
                .append("type", new ArrayList<String>() {

                    {
                        add("Deposit");
                    }

                })
                .append("username", "")
                .append("zip_code", "")
                .append("credit", new BigDecimal("0.00"));
        this.bankAccountRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("bank", new Document("id", briBankInsertId)
                .append("name", "BRI"))
                .append("city", "")
                .append("contact", new Document("email_address", "")
                        .append("phone_number", ""))
                .append("country", "Indonesia")
                .append("credit", new BigDecimal("0"))
                .append("file", "")
                .append("gender", "Male")
                .append("name", new Document("first", "Setio")
                        .append("last", "Andika")
                        .append("middle", ""))
                .append("number", "009801099467507")
                .append("password", "")
                .append("pin", "")
                .append("province", "")
                .append("sequence", new BigDecimal("18"))
                .append("status", "Active")
                .append("street_address", "")
                .append("type", new ArrayList<String>() {

                    {
                        add("Deposit");
                    }

                })
                .append("username", "")
                .append("zip_code", "")
                .append("credit", new BigDecimal("0.00"));
        this.bankAccountRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("bank", new Document("id", briBankInsertId)
                .append("name", "BRI"))
                .append("city", "")
                .append("contact", new Document("email_address", "")
                        .append("phone_number", ""))
                .append("country", "Indonesia")
                .append("credit", new BigDecimal("0"))
                .append("file", "")
                .append("gender", "Female")
                .append("name", new Document("first", "Angel")
                        .append("last", "")
                        .append("middle", ""))
                .append("number", "096301008921509")
                .append("password", "")
                .append("pin", "")
                .append("province", "")
                .append("sequence", new BigDecimal("19"))
                .append("status", "Active")
                .append("street_address", "")
                .append("type", new ArrayList<String>() {

                    {
                        add("Deposit");
                    }

                })
                .append("username", "")
                .append("zip_code", "")
                .append("credit", new BigDecimal("0.00"));
        this.bankAccountRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("bank", new Document("id", briBankInsertId)
                .append("name", "BRI"))
                .append("city", "")
                .append("contact", new Document("email_address", "")
                        .append("phone_number", ""))
                .append("country", "Indonesia")
                .append("credit", new BigDecimal("0"))
                .append("file", "")
                .append("gender", "Female")
                .append("name", new Document("first", "Eki")
                        .append("last", "Suherman")
                        .append("middle", ""))
                .append("number", "330901002249500")
                .append("password", "")
                .append("pin", "")
                .append("province", "")
                .append("sequence", new BigDecimal("20"))
                .append("status", "Active")
                .append("street_address", "")
                .append("type", new ArrayList<String>() {

                    {
                        add("Deposit");
                    }

                })
                .append("username", "")
                .append("zip_code", "")
                .append("credit", new BigDecimal("0.00"));
        this.bankAccountRepository.insertOne(request, insertOneData, insertOneAdministrator);

        Map<String, Object> gameInsertId = new HashMap<String, Object>();

        insertOneData = new Document("description", "<p>SBOBET description</p>")
                .append("file", "")
                .append("name", "SBOBET")
                .append("sequence", new BigDecimal("1"))
                .append("status", "Active")
                .append("type", new Document("id", session.getAttribute("gameTypeSportsbookInsertId").toString())
                        .append("name", "Sportsbook"))
                .append("credit", new Document("main", new BigDecimal("0.00"))
                        .append("promotion", new BigDecimal("0.00")));
        gameInsertId.put("sbobetSportsbook", this.gameRepository.insertOne(request, insertOneData, insertOneAdministrator));

        insertOneData = new Document("description", "<p>MAXBET description</p>")
                .append("file", "")
                .append("name", "MAXBET")
                .append("sequence", new BigDecimal("2"))
                .append("status", "Active")
                .append("type", new Document("id", session.getAttribute("gameTypeSportsbookInsertId").toString())
                        .append("name", "Sportsbook"))
                .append("credit", new Document("main", new BigDecimal("0.00"))
                        .append("promotion", new BigDecimal("0.00")));
        gameInsertId.put("maxbetSportsbook", this.gameRepository.insertOne(request, insertOneData, insertOneAdministrator));

        insertOneData = new Document("description", "<p>IGKBET description</p>")
                .append("file", "")
                .append("name", "IGKBET")
                .append("sequence", new BigDecimal("3"))
                .append("status", "Active")
                .append("type", new Document("id", session.getAttribute("gameTypeSportsbookInsertId").toString())
                        .append("name", "Sportsbook"))
                .append("credit", new Document("main", new BigDecimal("0.00"))
                        .append("promotion", new BigDecimal("0.00")));
        gameInsertId.put("igkbetSportsbook", this.gameRepository.insertOne(request, insertOneData, insertOneAdministrator));

        insertOneData = new Document("description", "<p>SBOBET description</p>")
                .append("file", "")
                .append("name", "SBOBET")
                .append("sequence", new BigDecimal("4"))
                .append("status", "Active")
                .append("type", new Document("id", session.getAttribute("gameTypeLiveCasinoInsertId").toString())
                        .append("name", "Live Casino"))
                .append("credit", new Document("main", new BigDecimal("0.00"))
                        .append("promotion", new BigDecimal("0.00")));
        gameInsertId.put("sbobetLiveCasino", this.gameRepository.insertOne(request, insertOneData, insertOneAdministrator));

        insertOneData = new Document("description", "<p>MAXBET description</p>")
                .append("file", "")
                .append("name", "MAXBET")
                .append("sequence", new BigDecimal("5"))
                .append("status", "Active")
                .append("type", new Document("id", session.getAttribute("gameTypeLiveCasinoInsertId").toString())
                        .append("name", "Live Casino"))
                .append("credit", new Document("main", new BigDecimal("0.00"))
                        .append("promotion", new BigDecimal("0.00")));
        gameInsertId.put("maxbetLiveCasino", this.gameRepository.insertOne(request, insertOneData, insertOneAdministrator));

        insertOneData = new Document("description", "<p>ALLBET description</p>")
                .append("file", "")
                .append("name", "ALLBET")
                .append("sequence", "6")
                .append("status", "Active")
                .append("type", new Document("id", session.getAttribute("gameTypeLiveCasinoInsertId").toString())
                        .append("name", "Live Casino"))
                .append("credit", new Document("main", new BigDecimal("0.00"))
                        .append("promotion", new BigDecimal("0.00")));
        gameInsertId.put("allbetLiveCasino", this.gameRepository.insertOne(request, insertOneData, insertOneAdministrator));

        insertOneData = new Document("description", "<p>ASIA GAMING description</p>")
                .append("file", "")
                .append("name", "ASIA GAMING")
                .append("sequence", new BigDecimal("7"))
                .append("status", "Active")
                .append("type", new Document("id", session.getAttribute("gameTypeLiveCasinoInsertId").toString())
                        .append("name", "Live Casino"))
                .append("credit", new Document("main", new BigDecimal("0.00"))
                        .append("promotion", new BigDecimal("0.00")));
        gameInsertId.put("asiaGamingLiveCasino", this.gameRepository.insertOne(request, insertOneData, insertOneAdministrator));

        insertOneData = new Document("description", "<p>JOKER description</p>")
                .append("file", "")
                .append("name", "JOKER")
                .append("sequence", new BigDecimal("8"))
                .append("status", "Active")
                .append("type", new Document("id", session.getAttribute("gameTypeSlotsInsertId").toString())
                        .append("name", "Slots"))
                .append("credit", new Document("main", new BigDecimal("0.00"))
                        .append("promotion", new BigDecimal("0.00")));
        gameInsertId.put("jokerSlots", this.gameRepository.insertOne(request, insertOneData, insertOneAdministrator));

        insertOneData = new Document("description", "<p>PRAGMATIC description</p>")
                .append("file", "")
                .append("name", "PRAGMATIC")
                .append("sequence", new BigDecimal("9"))
                .append("status", "Active")
                .append("type", new Document("id", session.getAttribute("gameTypeSlotsInsertId").toString())
                        .append("name", "Slots"))
                .append("credit", new Document("main", new BigDecimal("0.00"))
                        .append("promotion", new BigDecimal("0.00")));
        gameInsertId.put("pragmaticSlots", this.gameRepository.insertOne(request, insertOneData, insertOneAdministrator));

        insertOneData = new Document("description", "<p>ISIN 4D description</p>")
                .append("file", "")
                .append("name", "ISIN 4D")
                .append("sequence", new BigDecimal("10"))
                .append("status", "Active")
                .append("type", new Document("id", session.getAttribute("gameTypeLotteryInsertId").toString())
                        .append("name", "Lottery"))
                .append("credit", new Document("main", new BigDecimal("0.00"))
                        .append("promotion", new BigDecimal("0.00")));
        gameInsertId.put("isin4dLottery", this.gameRepository.insertOne(request, insertOneData, insertOneAdministrator));

        ArrayList<String> allGameInsertId = new ArrayList<String>();
        allGameInsertId.add(gameInsertId.get("sbobetSportsbook").toString());
        allGameInsertId.add(gameInsertId.get("maxbetSportsbook").toString());
        allGameInsertId.add(gameInsertId.get("igkbetSportsbook").toString());
        allGameInsertId.add(gameInsertId.get("sbobetLiveCasino").toString());
        allGameInsertId.add(gameInsertId.get("maxbetLiveCasino").toString());
        allGameInsertId.add(gameInsertId.get("allbetLiveCasino").toString());
        allGameInsertId.add(gameInsertId.get("asiaGamingLiveCasino").toString());
        allGameInsertId.add(gameInsertId.get("jokerSlots").toString());
        allGameInsertId.add(gameInsertId.get("pragmaticSlots").toString());
        allGameInsertId.add(gameInsertId.get("isin4dLottery").toString());

        ArrayList<String> allGameName = new ArrayList<String>() {

            {
                add("SBOBET");
                add("MAXBET");
                add("IGKBET");
                add("SBOBET");
                add("MAXBET");
                add("ALLBET");
                add("ASIA GAMING");
                add("JOKER");
                add("PRAGMATIC");
                add("ISIN 4D");
            }

        };

        ArrayList<String> allGameTypeId = new ArrayList<String>();
        allGameTypeId.add(session.getAttribute("gameTypeSportsbookInsertId").toString());
        allGameTypeId.add(session.getAttribute("gameTypeSportsbookInsertId").toString());
        allGameTypeId.add(session.getAttribute("gameTypeSportsbookInsertId").toString());
        allGameTypeId.add(session.getAttribute("gameTypeLiveCasinoInsertId").toString());
        allGameTypeId.add(session.getAttribute("gameTypeLiveCasinoInsertId").toString());
        allGameTypeId.add(session.getAttribute("gameTypeLiveCasinoInsertId").toString());
        allGameTypeId.add(session.getAttribute("gameTypeLiveCasinoInsertId").toString());
        allGameTypeId.add(session.getAttribute("gameTypeSlotsInsertId").toString());
        allGameTypeId.add(session.getAttribute("gameTypeSlotsInsertId").toString());
        allGameTypeId.add(session.getAttribute("gameTypeLotteryInsertId").toString());

        ArrayList<String> allGameTypeName = new ArrayList<String>() {

            {
                add("Sportsbook");
                add("Sportsbook");
                add("Sportsbook");
                add("Live Casino");
                add("Live Casino");
                add("Live Casino");
                add("Live Casino");
                add("Slots");
                add("Slots");
                add("Lottery");
            }

        };

        ArrayList<String> liveCasinoGameInsertId = new ArrayList<String>();
        liveCasinoGameInsertId.add(gameInsertId.get("sbobetLiveCasino").toString());
        liveCasinoGameInsertId.add(gameInsertId.get("maxbetLiveCasino").toString());
        liveCasinoGameInsertId.add(gameInsertId.get("allbetLiveCasino").toString());
        liveCasinoGameInsertId.add(gameInsertId.get("asiaGamingLiveCasino").toString());

        ArrayList<String> liveCasinoGameName = new ArrayList<String>() {

            {
                add("SBOBET");
                add("MAXBET");
                add("ALLBET");
                add("ASIA GAMING");
            }

        };

        ArrayList<String> liveCasinoGameTypeId = new ArrayList<String>();
        liveCasinoGameTypeId.add(session.getAttribute("gameTypeLiveCasinoInsertId").toString());
        liveCasinoGameTypeId.add(session.getAttribute("gameTypeLiveCasinoInsertId").toString());
        liveCasinoGameTypeId.add(session.getAttribute("gameTypeLiveCasinoInsertId").toString());
        liveCasinoGameTypeId.add(session.getAttribute("gameTypeLiveCasinoInsertId").toString());

        ArrayList<String> liveCasinoGameTypeName = new ArrayList<String>() {

            {
                add("Live Casino");
                add("Live Casino");
                add("Live Casino");
                add("Live Casino");
            }

        };

        ArrayList<String> nonLiveCasinoGameInsertId = new ArrayList<String>();
        nonLiveCasinoGameInsertId.add(gameInsertId.get("sbobetSportsbook").toString());
        nonLiveCasinoGameInsertId.add(gameInsertId.get("maxbetSportsbook").toString());
        nonLiveCasinoGameInsertId.add(gameInsertId.get("igkbetSportsbook").toString());
        nonLiveCasinoGameInsertId.add(gameInsertId.get("jokerSlots").toString());
        nonLiveCasinoGameInsertId.add(gameInsertId.get("pragmaticSlots").toString());
        nonLiveCasinoGameInsertId.add(gameInsertId.get("isin4dLottery").toString());

        ArrayList<String> nonLiveCasinoGameName = new ArrayList<String>() {

            {
                add("SBOBET");
                add("MAXBET");
                add("IGKBET");
                add("JOKER");
                add("PRAGMATIC");
                add("ISIN 4D");
            }

        };

        ArrayList<String> nonLiveCasinoGameTypeId = new ArrayList<String>();
        allGameTypeId.add(session.getAttribute("gameTypeSportsbookInsertId").toString());
        allGameTypeId.add(session.getAttribute("gameTypeSportsbookInsertId").toString());
        allGameTypeId.add(session.getAttribute("gameTypeSportsbookInsertId").toString());
        allGameTypeId.add(session.getAttribute("gameTypeSlotsInsertId").toString());
        allGameTypeId.add(session.getAttribute("gameTypeSlotsInsertId").toString());
        allGameTypeId.add(session.getAttribute("gameTypeLotteryInsertId").toString());

        ArrayList<String> nonLiveCasinoGameTypeName = new ArrayList<String>() {

            {
                add("Sportsbook");
                add("Sportsbook");
                add("Sportsbook");
                add("Slots");
                add("Slots");
                add("Lottery");
            }

        };

        insertOneData = new Document("amount", new BigDecimal("0.00"))
                .append("cap", new BigDecimal("500000.00"))
                .append("description", "<p>Welcome Bonus 100% Description</p>")
                .append("file", "")
                .append("game", new Document("id", allGameInsertId)
                        .append("name", allGameName)
                        .append("type", new Document("id", allGameTypeId)
                                .append("name", allGameTypeName)))
                .append("minimum_deposit", new BigDecimal("100000.00"))
                .append("name", "Welcome Bonus 100%")
                .append("percentage", new BigDecimal("100.00"))
                .append("release", "First Deposit")
                .append("rollover", new BigDecimal("15.00"))
                .append("sequence", new BigDecimal("1"))
                .append("status", "Active")
                .append("type", "Percentage")
                .append("winlose", new BigDecimal("0.00"));
        this.promotionRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("amount", new BigDecimal("100000.00"))
                .append("cap", new BigDecimal("0.00"))
                .append("description", "<p>Freebet 100 Description</p>")
                .append("file", "")
                .append("game", new Document("id", allGameInsertId)
                        .append("name", allGameName)
                        .append("type", new Document("id", allGameTypeId)
                                .append("name", allGameTypeName)))
                .append("minimum_deposit", new BigDecimal("0.00"))
                .append("name", "Freebet 100")
                .append("percentage", new BigDecimal("0.00"))
                .append("release", "No Deposit")
                .append("rollover", new BigDecimal("15.00"))
                .append("sequence", new BigDecimal("2"))
                .append("status", "Active")
                .append("type", "Fix Amount")
                .append("winlose", new BigDecimal("0.00"));
        this.promotionRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("amount", new BigDecimal("0.00"))
                .append("cap", new BigDecimal("0.00"))
                .append("description", "<p>Commission 0.7% Description</p>")
                .append("file", "")
                .append("game", new Document("id", liveCasinoGameInsertId)
                        .append("name", liveCasinoGameName)
                        .append("type", new Document("id", liveCasinoGameTypeId)
                                .append("name", liveCasinoGameTypeName)))
                .append("minimum_deposit", new BigDecimal("100000.00"))
                .append("name", "Commission 0.7%")
                .append("percentage", new BigDecimal("0.70"))
                .append("release", "Weekly")
                .append("rollover", new BigDecimal("0.00"))
                .append("sequence", new BigDecimal("3"))
                .append("status", "Active")
                .append("type", "Percentage")
                .append("winlose", new BigDecimal("0.00"));
        this.promotionRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("amount", new BigDecimal("0.00"))
                .append("cap", new BigDecimal("0.00"))
                .append("description", "<p>Cashback 7% Description</p>")
                .append("file", "")
                .append("game", new Document("id", nonLiveCasinoGameInsertId)
                        .append("name", nonLiveCasinoGameName)
                        .append("type", new Document("id", nonLiveCasinoGameTypeId)
                                .append("name", nonLiveCasinoGameTypeName)))
                .append("minimum_deposit", new BigDecimal("100000.00"))
                .append("name", "Cashback 7%")
                .append("percentage", new BigDecimal("7.00"))
                .append("release", "Weekly")
                .append("rollover", new BigDecimal("0.00"))
                .append("sequence", new BigDecimal("4"))
                .append("status", "Active")
                .append("type", "Percentage")
                .append("winlose", new BigDecimal("0.00"));
        this.promotionRepository.insertOne(request, insertOneData, insertOneAdministrator);

        insertOneData = new Document("amount", new BigDecimal("0.00"))
                .append("cap", new BigDecimal("0.00"))
                .append("description", "<p>Referral Commission 3% Description</p>")
                .append("file", "")
                .append("game", new Document("id", allGameInsertId)
                        .append("name", allGameName)
                        .append("type", new Document("id", allGameTypeId)
                                .append("name", allGameTypeName)))
                .append("minimum_deposit", new BigDecimal("0.00"))
                .append("name", "Referral Commission 3%")
                .append("percentage", new BigDecimal("3.00"))
                .append("release", "Monthly")
                .append("rollover", new BigDecimal("0.00"))
                .append("sequence", new BigDecimal("5"))
                .append("status", "Active")
                .append("type", "Percentage")
                .append("winlose", new BigDecimal("0.00"));
        this.promotionRepository.insertOne(request, insertOneData, insertOneAdministrator);

        Map<String, Object> blogCategoryInsertId = new HashMap<String, Object>();

        Map<String, Object> blogCategoryPath = new HashMap<String, Object>() {

            {
                put("news", "news");
            }

        };

        Map<String, Object> blogCategoryUrl = new HashMap<String, Object>() {

            {
                put("news", "news");
            }

        };

        insertOneData = new Document("content", "<p>News category content</p>")
                .append("description", "<p>News category description</p>")
                .append("file", new Document("name", "news-category.jpg")
                        .append("source", "Local Image"))
                .append("meta", new Document("description", "News blog category description")
                        .append("keyword", "news,blog,category")
                        .append("title", "News Category"))
                .append("name", "News")
                .append("og", new Document("description", "News blog category og description")
                        .append("title", "News Category"))
                .append("parent", new Document("id", "0")
                        .append("name", "Root")
                        .append("path", "")
                        .append("url", ""))
                .append("path", blogCategoryPath.get("news"))
                .append("rate", new Document("amount", new BigDecimal("5000"))
                        .append("contributor", new BigDecimal("1000")))
                .append("sequence", new BigDecimal("1"))
                .append("status", "Active")
                .append("thumbnail", "news-category.jpg")
                .append("url", blogCategoryUrl.get("news"));
        blogCategoryInsertId.put("news", this.blogCategoryRepository.insertOne(request, insertOneData, insertOneAdministrator));

        blogCategoryPath.put("league", "league");
        blogCategoryUrl.put("league", "league");

        insertOneData = new Document("content", "<p>League category content</p>")
                .append("description", "<p>League category description</p>")
                .append("file", new Document("name", "league-category.jpg")
                        .append("source", "Local Image"))
                .append("meta", new Document("description", "League blog category description")
                        .append("keyword", "league,blog,category")
                        .append("title", "League Category"))
                .append("name", "League")
                .append("og", new Document("description", "League blog category og description")
                        .append("title", "League Category"))
                .append("parent", new Document("id", "0")
                        .append("name", "Root")
                        .append("path", "")
                        .append("url", ""))
                .append("path", blogCategoryPath.get("league"))
                .append("rate", new Document("amount", new BigDecimal("5000"))
                        .append("contributor", new BigDecimal("1000")))
                .append("sequence", new BigDecimal("2"))
                .append("status", "Active")
                .append("thumbnail", "league-category.jpg")
                .append("url", blogCategoryUrl.get("league"));
        blogCategoryInsertId.put("league", this.blogCategoryRepository.insertOne(request, insertOneData, insertOneAdministrator));

        blogCategoryPath.put("transfer", "transfer");
        blogCategoryUrl.put("transfer", "transfer");

        insertOneData = new Document("content", "<p>Transfer category content</p>")
                .append("description", "<p>Transfer category description</p>")
                .append("file", new Document("name", "transfer-category.jpg")
                        .append("source", "Local Image"))
                .append("meta", new Document("description", "Transfer blog category description")
                        .append("keyword", "transfer,blog,category")
                        .append("title", "Transfer Category"))
                .append("name", "Transfer")
                .append("og", new Document("description", "Transfer blog category og description")
                        .append("title", "Transfer Category"))
                .append("parent", new Document("id", "0")
                        .append("name", "Root")
                        .append("path", "")
                        .append("url", ""))
                .append("path", blogCategoryPath.get("transfer"))
                .append("rate", new Document("amount", new BigDecimal("5000"))
                        .append("contributor", new BigDecimal("1000")))
                .append("sequence", new BigDecimal("3"))
                .append("status", "Active")
                .append("thumbnail", "transfer-category.jpg")
                .append("url", blogCategoryUrl.get("transfer"));
        blogCategoryInsertId.put("transfer", this.blogCategoryRepository.insertOne(request, insertOneData, insertOneAdministrator));

        blogCategoryPath.put("team", "team");
        blogCategoryUrl.put("team", "team");

        insertOneData = new Document("content", "<p>Team category content</p>")
                .append("description", "<p>Team category description</p>")
                .append("file", new Document("name", "team-category.jpg")
                        .append("source", "Local Image"))
                .append("meta", new Document("description", "Team blog category description")
                        .append("keyword", "team,blog,category")
                        .append("title", "Team Category"))
                .append("name", "Team")
                .append("og", new Document("description", "Team blog category og description")
                        .append("title", "Team Category"))
                .append("parent", new Document("id", "0")
                        .append("name", "Root")
                        .append("path", "")
                        .append("url", ""))
                .append("path", blogCategoryPath.get("team"))
                .append("rate", new Document("amount", new BigDecimal("5000"))
                        .append("contributor", new BigDecimal("1000")))
                .append("sequence", new BigDecimal("4"))
                .append("status", "Active")
                .append("thumbnail", "team-category.jpg")
                .append("url", blogCategoryUrl.get("team"));
        blogCategoryInsertId.put("team", this.blogCategoryRepository.insertOne(request, insertOneData, insertOneAdministrator));

        blogCategoryPath.put("leaguePremierLeague", "league/premier-league");
        blogCategoryUrl.put("leaguePremierLeague", "premier-league");

        insertOneData = new Document("content", "<p>Premier league category content</p>")
                .append("description", "<p>Premier league category description</p>")
                .append("file", new Document("name", "premier-league-category.jpg")
                        .append("source", "Local Image"))
                .append("meta", new Document("description", "Premier league blog category description")
                        .append("keyword", "premier,league,blog,category")
                        .append("title", "Premier League Category"))
                .append("name", "Premier League")
                .append("og", new Document("description", "Premier league blog category og description")
                        .append("title", "Premier League Category"))
                .append("parent", new Document("id", blogCategoryInsertId.get("league"))
                        .append("name", "League")
                        .append("path", blogCategoryPath.get("league"))
                        .append("url", blogCategoryUrl.get("league")))
                .append("path", blogCategoryPath.get("leaguePremierLeague"))
                .append("rate", new Document("amount", new BigDecimal("4500"))
                        .append("contributor", new BigDecimal("1000")))
                .append("sequence", new BigDecimal("5"))
                .append("status", "Active")
                .append("thumbnail", "premier-league-category.png")
                .append("url", blogCategoryUrl.get("leaguePremierLeague"));
        blogCategoryInsertId.put("leaguePremierLeague", this.blogCategoryRepository.insertOne(request, insertOneData, insertOneAdministrator));

        blogCategoryPath.put("leagueLaLiga", "league/la-liga");
        blogCategoryUrl.put("leagueLaLiga", "la-liga");

        insertOneData = new Document("content", "<p>La liga category content</p>")
                .append("description", "<p>La liga category description</p>")
                .append("file", new Document("name", "la-liga-category.jpg")
                        .append("source", "Local Image"))
                .append("meta", new Document("description", "La liga blog category description")
                        .append("keyword", "laliga,blog,category")
                        .append("title", "La Liga Category"))
                .append("name", "La Liga")
                .append("og", new Document("description", "La liga blog category og description")
                        .append("title", "La Liga Category"))
                .append("parent", new Document("id", blogCategoryInsertId.get("league"))
                        .append("name", "League")
                        .append("path", blogCategoryPath.get("league"))
                        .append("url", blogCategoryUrl.get("league")))
                .append("path", blogCategoryPath.get("leagueLaLiga"))
                .append("rate", new Document("amount", new BigDecimal("4500"))
                        .append("contributor", new BigDecimal("1000")))
                .append("sequence", new BigDecimal("6"))
                .append("status", "Active")
                .append("thumbnail", "la-liga-category.jpg")
                .append("url", blogCategoryUrl.get("leagueLaLiga"));
        blogCategoryInsertId.put("leagueLaLiga", this.blogCategoryRepository.insertOne(request, insertOneData, insertOneAdministrator));

        ArrayList<String> newsCategoryId = new ArrayList<String>();
        newsCategoryId.add(blogCategoryInsertId.get("news").toString());

        ArrayList<String> newsCategoryPath = new ArrayList<String>();
        newsCategoryPath.add(blogCategoryPath.get("news").toString());

        ArrayList<String> newsCategoryUrl = new ArrayList<String>();
        newsCategoryUrl.add(blogCategoryUrl.get("news").toString());

        ArrayList<String> blogPath = new ArrayList<String>();
        blogPath.add(blogCategoryPath.get("news") + "/thats-why-real-madrid-want-him-hazard-shows-galactico-credentials-yet-again");

        insertOneData = new Document("category", new Document("id", newsCategoryId)
                .append("name", new ArrayList<String>() {

                    {
                        add("News");

                    }

                })
                .append("path", newsCategoryPath)
                .append("url", newsCategoryUrl))
                .append("content", "<p>Sometimes it's easy to take a footballer for granted, but a piece of magic against West Ham United reminded all who watch Chelsea that Eden Hazard is the Premier League's most exciting footballer.</p>\n<p>His 16 goals and 12 assists mean he has been the league's most effective attacker this season, but it is his ability to bring the 'wow factor' that makes him one of the world's most loved players.</p>\n<p>A quick turn was followed by a turbo-charged dribble to break the midfield line controlled by Declan Rice and Mark Noble, before Hazard then switched it from his right to left foot to bamboozle West Ham's centre-backs and blast a first-time left-footed strike past Lukasz Fabianski.</p>")
                .append("description", "<p>Sometimes it's easy to take a footballer for granted, but a piece of magic against West Ham United reminded all who watch Chelsea that Eden Hazard is the Premier League's most exciting footballer.</p>")
                .append("dislike", new Document("amount", BigDecimal.ZERO)
                        .append("contributor", new Document("amount", BigDecimal.ZERO)
                                .append("id", new ArrayList<String>())))
                .append("file", new Document("name", "eden-hazard-chelsean8qpmnd4tfkt11t0kkapmq8im.jpg")
                        .append("source", "Local Image"))
                .append("like", new Document("amount", BigDecimal.ZERO)
                        .append("contributor", new Document("amount", BigDecimal.ZERO)
                                .append("id", new ArrayList<String>())))
                .append("meta", new Document("description", "Sometimes it's easy to take a footballer for granted, but a piece of magic against West Ham United reminded all who watch Chelsea that Eden Hazard is the Premier League's most exciting footballer.")
                        .append("keyword", "real madrid,hazard,galactico")
                        .append("title", "That's Why Real Madrid Want Him! Hazard Shows Galactico Credentials Yet Again"))
                .append("og", new Document("description", "Sometimes it's easy to take a footballer for granted, but a piece of magic against West Ham United reminded all who watch Chelsea that Eden Hazard is the Premier League's most exciting footballer.")
                        .append("title", "That's Why Real Madrid Want Him! Hazard Shows Galactico Credentials Yet Again"))
                .append("path", blogPath)
                .append("rate", new Document("amount", new BigDecimal("3500"))
                        .append("contributor", new Document("amount", new BigDecimal("1000"))
                                .append("id", new ArrayList<String>())))
                .append("sequence", new BigDecimal("1"))
                .append("star", new Document("id", "0")
                        .append("name", "")
                        .append("path", "")
                        .append("url", ""))
                .append("status", "Active")
                .append("thumbnail", "eden-hazard-chelsean8qpmnd4tfkt11t0kkapmq8im.jpg")
                .append("title", "That's Why Real Madrid Want Him! Hazard Shows Galactico Credentials Yet Again")
                .append("url", "thats-why-real-madrid-want-him-hazard-shows-galactico-credentials-yet-again")
                .append("view", new Document("id", new ArrayList<String>())
                        .append("raw", BigDecimal.ZERO)
                        .append("session_id", new ArrayList<String>())
                        .append("unique", BigDecimal.ZERO));
        this.blogRepository.insertOne(request, insertOneData, insertOneAdministrator);

        blogPath = new ArrayList<String>();
        blogPath.add(blogCategoryPath.get("news") + "/they-are-wrong--hazard-only-focused-on-chelsea-amid-chants-he-will-sign-for-real-madrid");

        insertOneData = new Document("category", new Document("id", newsCategoryId)
                .append("name", new ArrayList<String>() {

                    {
                        add("News");

                    }

                })
                .append("path", newsCategoryPath)
                .append("url", newsCategoryUrl))
                .append("content", "<p>Eden Hazard insists he is only focusing on Chelsea after dismissing chants from West Ham fans saying he was on his way to Real Madrid.</p>\n<p>Hammers supporters claimed the Belgian&rsquo;s move to the Santiago Bernabeu was virtually a done deal during their side&rsquo;s match with the Blues at Stamford Bridge on Monday.</p>\n<p>Hazard has continually been linked with a move to the Spanish giants this summer with his Chelsea contract due to expire in 2020.</p>")
                .append("description", "<p>Eden Hazard insists he is only focusing on Chelsea after dismissing chants from West Ham fans saying he was on his way to Real Madrid.</p>")
                .append("dislike", new Document("amount", BigDecimal.ZERO)
                        .append("contributor", new Document("amount", BigDecimal.ZERO)
                                .append("id", new ArrayList<String>())))
                .append("file", new Document("name", "eden-hazard-chelsea-2018-19dmerrn7ay4q7143wg2dqhay75.jpg")
                        .append("source", "Local Image"))
                .append("like", new Document("amount", BigDecimal.ZERO)
                        .append("contributor", new Document("amount", BigDecimal.ZERO)
                                .append("id", new ArrayList<String>())))
                .append("meta", new Document("description", "Eden Hazard insists he is only focusing on Chelsea after dismissing chants from West Ham fans saying he was on his way to Real Madrid.")
                        .append("keyword", "hazard,chelsea,west ham,real madrid")
                        .append("title", "'They Are Wrong!' - Hazard Only Focused On Chelsea Amid Chants He Will Sign For Real Madrid"))
                .append("og", new Document("description", "Eden Hazard insists he is only focusing on Chelsea after dismissing chants from West Ham fans saying he was on his way to Real Madrid.")
                        .append("title", "'They Are Wrong!' - Hazard Only Focused On Chelsea Amid Chants He Will Sign For Real Madrid"))
                .append("path", blogPath)
                .append("rate", new Document("amount", new BigDecimal("3500"))
                        .append("contributor", new Document("amount", new BigDecimal("1000"))
                                .append("id", new ArrayList<String>())))
                .append("sequence", new BigDecimal("2"))
                .append("star", new Document("id", "0")
                        .append("name", "")
                        .append("path", "")
                        .append("url", ""))
                .append("status", "Active")
                .append("thumbnail", "eden-hazard-chelsea-2018-19dmerrn7ay4q7143wg2dqhay75.jpg")
                .append("title", "'They Are Wrong!' - Hazard Only Focused On Chelsea Amid Chants He Will Sign For Real Madrid")
                .append("url", "they-are-wrong--hazard-only-focused-on-chelsea-amid-chants-he-will-sign-for-real-madrid")
                .append("view", new Document("id", new ArrayList<String>())
                        .append("raw", BigDecimal.ZERO)
                        .append("session_id", new ArrayList<String>())
                        .append("unique", BigDecimal.ZERO));
        this.blogRepository.insertOne(request, insertOneData, insertOneAdministrator);

        ArrayList<String> transferCategoryId = new ArrayList<String>();
        transferCategoryId.add(blogCategoryInsertId.get("transfer").toString());

        ArrayList<String> transferCategoryPath = new ArrayList<String>();
        transferCategoryPath.add(blogCategoryPath.get("transfer").toString());

        ArrayList<String> transferCategoryUrl = new ArrayList<String>();
        transferCategoryUrl.add(blogCategoryUrl.get("transfer").toString());

        blogPath = new ArrayList<String>();
        blogPath.add(blogCategoryPath.get("transfer") + "/100m-is-too-cheap-for-hazard-wed-need-two-players-to-replace-him--sarri");

        insertOneData = new Document("category", new Document("id", transferCategoryId)
                .append("name", new ArrayList<String>() {

                    {
                        add("Transfer");

                    }

                })
                .append("path", transferCategoryPath)
                .append("url", transferCategoryUrl))
                .append("content", "<p>Maurizio Sarri believes Eden Hazard is worth more than &pound;100million but said Chelsea will respect his wishes if he wants to leave for Real Madrid.</p>\n<p>Belgium international Hazard struck a brilliant brace, including a sensational solo opener, in a 2-0 victory over West Ham on Monday that lifted Chelsea to third in the Premier League.</p>\n<p>The sublime individual performance came amid intense speculation that La Liga giants Madrid are preparing a long-anticipated transfer bid.</p>")
                .append("description", "<p>Maurizio Sarri believes Eden Hazard is worth more than &pound;100million but said Chelsea will respect his wishes if he wants to leave for Real Madrid.</p>")
                .append("dislike", new Document("amount", BigDecimal.ZERO)
                        .append("contributor", new Document("amount", BigDecimal.ZERO)
                                .append("id", new ArrayList<String>())))
                .append("file", new Document("name", "hazard-sarri-chelseasnfsdztnkt4d1kzaklm9f5bcd.jpg")
                        .append("source", "Local Image"))
                .append("like", new Document("amount", BigDecimal.ZERO)
                        .append("contributor", new Document("amount", BigDecimal.ZERO)
                                .append("id", new ArrayList<String>())))
                .append("meta", new Document("description", "Maurizio Sarri believes Eden Hazard is worth more than Â£100million but said Chelsea will respect his wishes if he wants to leave for Real Madrid.")
                        .append("keyword", "maurizio,sarri,eden,hazard,chelsea,real madrid")
                        .append("title", "Â£100m Is Too Cheap For Hazard, We'd Need Two Players To Replace Him - Sarri"))
                .append("og", new Document("description", "Maurizio Sarri believes Eden Hazard is worth more than Â£100million but said Chelsea will respect his wishes if he wants to leave for Real Madrid.")
                        .append("title", "Â£100m Is Too Cheap For Hazard, We'd Need Two Players To Replace Him - Sarri"))
                .append("path", blogPath)
                .append("rate", new Document("amount", new BigDecimal("3500"))
                        .append("contributor", new Document("amount", new BigDecimal("1000"))
                                .append("id", new ArrayList<String>())))
                .append("sequence", new BigDecimal("3"))
                .append("star", new Document("id", "0")
                        .append("name", "")
                        .append("path", "")
                        .append("url", ""))
                .append("status", "Active")
                .append("thumbnail", "hazard-sarri-chelseasnfsdztnkt4d1kzaklm9f5bcd.jpg")
                .append("title", "Â£100m Is Too Cheap For Hazard, We'd Need Two Players To Replace Him - Sarri")
                .append("url", "100m-is-too-cheap-for-hazard-wed-need-two-players-to-replace-him--sarri")
                .append("view", new Document("id", new ArrayList<String>())
                        .append("raw", BigDecimal.ZERO)
                        .append("session_id", new ArrayList<String>())
                        .append("unique", BigDecimal.ZERO));
        this.blogRepository.insertOne(request, insertOneData, insertOneAdministrator);

        ArrayList<String> leagueCategoryId = new ArrayList<String>();
        leagueCategoryId.add(blogCategoryInsertId.get("league").toString());

        ArrayList<String> leagueCategoryPath = new ArrayList<String>();
        leagueCategoryPath.add(blogCategoryPath.get("league").toString());

        ArrayList<String> leagueCategoryUrl = new ArrayList<String>();
        leagueCategoryUrl.add(blogCategoryUrl.get("league").toString());

        blogPath = new ArrayList<String>();
        blogPath.add(blogCategoryPath.get("league") + "/mexico-gold-cup-roster-predicted-who-will-make-tata-martinos-23man-squad");

        insertOneData = new Document("category", new Document("id", leagueCategoryId)
                .append("name", new ArrayList<String>() {

                    {
                        add("League");

                    }

                })
                .append("path", leagueCategoryPath)
                .append("url", leagueCategoryUrl))
                .append("content", "<p>The Argentine had only two friendly matches in charge and now has to make some tough choices. Goal predicts who will be on the plane to LA this summer.&nbsp; </p>\n<p>The March international break is behind us and nothing but the Gold Cup lays ahead. It's almost time for Mexico manager Tata Martino to announce his list for the regional tournament.&nbsp;</p>\n<p>We didn't have much time to get a feel for what Martino is looking for, but the Argentine didn't have much time to figure out what his players have to offer. The message from players after camp was the same. Jonathan dos Santos, Roberto Alvarado and Diego Lainez were among those who said the key to getting back in the Gold Cup is impressing at the club level in the next month and a half.</p>")
                .append("description", "<p>The Argentine had only two friendly matches in charge and now has to make some tough choices. Goal predicts who will be on the plane to LA this summer.</p>")
                .append("dislike", new Document("amount", BigDecimal.ZERO)
                        .append("contributor", new Document("amount", BigDecimal.ZERO)
                                .append("id", new ArrayList<String>())))
                .append("file", new Document("name", "hirving-lozano-mexico-20191xg9e54s53r8j1dybuuqrnjtjl.jpg")
                        .append("source", "Local Image"))
                .append("like", new Document("amount", BigDecimal.ZERO)
                        .append("contributor", new Document("amount", BigDecimal.ZERO)
                                .append("id", new ArrayList<String>())))
                .append("meta", new Document("description", "The Argentine had only two friendly matches in charge and now has to make some tough choices. Goal predicts who will be on the plane to LA this summer.")
                        .append("keyword", "argentine,goal predict,la,summer")
                        .append("title", "Mexico Gold Cup Roster Predicted: Who Will Make Tata Martino's 23-Man Squad?"))
                .append("og", new Document("description", "The Argentine had only two friendly matches in charge and now has to make some tough choices. Goal predicts who will be on the plane to LA this summer.")
                        .append("title", "Mexico Gold Cup Roster Predicted: Who Will Make Tata Martino's 23-Man Squad?"))
                .append("path", blogPath)
                .append("rate", new Document("amount", new BigDecimal("3500"))
                        .append("contributor", new Document("amount", new BigDecimal("1000"))
                                .append("id", new ArrayList<String>())))
                .append("sequence", new BigDecimal("4"))
                .append("star", new Document("id", "0")
                        .append("name", "")
                        .append("path", "")
                        .append("url", ""))
                .append("status", "Active")
                .append("thumbnail", "hirving-lozano-mexico-20191xg9e54s53r8j1dybuuqrnjtjl.jpg")
                .append("title", "Mexico Gold Cup Roster Predicted: Who Will Make Tata Martino's 23-Man Squad?")
                .append("url", "mexico-gold-cup-roster-predicted-who-will-make-tata-martinos-23man-squad")
                .append("view", new Document("id", new ArrayList<String>())
                        .append("raw", BigDecimal.ZERO)
                        .append("session_id", new ArrayList<String>())
                        .append("unique", BigDecimal.ZERO));
        this.blogRepository.insertOne(request, insertOneData, insertOneAdministrator);

        blogPath = new ArrayList<String>();
        blogPath.add(blogCategoryPath.get("league") + "/messis-clothes-were-too-big-but-he-still-left-a-trail-of-bodies-behind--banega-recalls-facing-wonderkid");

        insertOneData = new Document("category", new Document("id", leagueCategoryId)
                .append("name", new ArrayList<String>() {

                    {
                        add("League");

                    }

                })
                .append("path", leagueCategoryPath)
                .append("url", leagueCategoryUrl))
                .append("content", "<p>Lionel Messi possessed his trademark spark as a youngster and \"left a trail of bodies&nbsp;behind him\" even though his clothes did not fit, recalls the 31-year-old's Argentina team-mate Ever Banega.</p>\n<p>Banega was a contemporary of the five-time Ballon d'Or winner in the Newell's Old Boys academy&nbsp;and claims he often played against Messi despite being a year younger.&nbsp;</p>\n<p>The Barcelona star recently returned to action for Argentina in their 3-1 loss to Venezuela last week, although he picked up a groin injury during that game and has received criticism for his part in the disappointing result.</p>")
                .append("description", "<p>Lionel Messi possessed his trademark spark as a youngster and \"left a trail of bodies&nbsp;behind him\" even though his clothes did not fit, recalls the 31-year-old's Argentina team-mate Ever Banega.</p>")
                .append("dislike", new Document("amount", BigDecimal.ZERO)
                        .append("contributor", new Document("amount", BigDecimal.ZERO)
                                .append("id", new ArrayList<String>())))
                .append("file", new Document("name", "lionel-messi-argentina-venezuela-friendly-220320196lzkj1whzjcz1srsq4b6xyhqo.jpg")
                        .append("source", "Local Image"))
                .append("like", new Document("amount", BigDecimal.ZERO)
                        .append("contributor", new Document("amount", BigDecimal.ZERO)
                                .append("id", new ArrayList<String>())))
                .append("meta", new Document("description", "Lionel Messi possessed his trademark spark as a youngster and \"left a trail of bodies behind him\" even though his clothes did not fit, recalls the 31-year-old's Argentina team-mate Ever Banega.")
                        .append("keyword", "lionel messi,argentina,ever banega")
                        .append("title", "'Messi's Clothes Were Too Big But He Still Left A Trail Of Bodies Behind' â€“ Banega Recalls Facing Wonderkid"))
                .append("og", new Document("description", "Lionel Messi possessed his trademark spark as a youngster and \"left a trail of bodies behind him\" even though his clothes did not fit, recalls the 31-year-old's Argentina team-mate Ever Banega.")
                        .append("title", "'Messi's Clothes Were Too Big But He Still Left A Trail Of Bodies Behind' â€“ Banega Recalls Facing Wonderkid"))
                .append("path", blogPath)
                .append("rate", new Document("amount", new BigDecimal("3500"))
                        .append("contributor", new Document("amount", new BigDecimal("1000"))
                                .append("id", new ArrayList<String>())))
                .append("sequence", new BigDecimal("5"))
                .append("star", new Document("id", "0")
                        .append("name", "")
                        .append("path", "")
                        .append("url", ""))
                .append("status", "Active")
                .append("thumbnail", "lionel-messi-argentina-venezuela-friendly-220320196lzkj1whzjcz1srsq4b6xyhqo.jpg")
                .append("title", "'Messi's Clothes Were Too Big But He Still Left A Trail Of Bodies Behind' â€“ Banega Recalls Facing Wonderkid")
                .append("url", "messis-clothes-were-too-big-but-he-still-left-a-trail-of-bodies-behind--banega-recalls-facing-wonderkid")
                .append("view", new Document("id", new ArrayList<String>())
                        .append("raw", BigDecimal.ZERO)
                        .append("session_id", new ArrayList<String>())
                        .append("unique", BigDecimal.ZERO));
        this.blogRepository.insertOne(request, insertOneData, insertOneAdministrator);

        ArrayList<String> premierLeagueCategoryId = new ArrayList<String>();
        premierLeagueCategoryId.add(blogCategoryInsertId.get("league").toString());
        premierLeagueCategoryId.add(blogCategoryInsertId.get("leaguePremierLeague").toString());

        ArrayList<String> premierLeagueCategoryPath = new ArrayList<String>();
        premierLeagueCategoryPath.add(blogCategoryPath.get("league").toString());
        premierLeagueCategoryPath.add(blogCategoryPath.get("leaguePremierLeague").toString());

        ArrayList<String> premierLeagueCategoryUrl = new ArrayList<String>();
        premierLeagueCategoryUrl.add(blogCategoryUrl.get("league").toString());
        premierLeagueCategoryUrl.add(blogCategoryUrl.get("leaguePremierLeague").toString());

        blogPath = new ArrayList<String>();
        blogPath.add(blogCategoryPath.get("league") + "/chelsea-issue-response-to-drinkwater-drinkdriving-reports");
        blogPath.add(blogCategoryPath.get("leaguePremierLeague") + "/chelsea-issue-response-to-drinkwater-drinkdriving-reports");

        insertOneData = new Document("category", new Document("id", premierLeagueCategoryId)
                .append("name", new ArrayList<String>() {

                    {
                        add("League");
                        add("Premier League");

                    }

                })
                .append("path", premierLeagueCategoryPath)
                .append("url", premierLeagueCategoryUrl))
                .append("content", "<p>Chelsea are aware of reports that Danny Drinkwater was arrested on Monday for suspected drink-driving.</p>\n<p><em>The Sun</em> claims the midfielder was arrested following crashing into another vehicle after leaving a party early on Monday morning.</p>\n<p>The crash left debris scattered all over the roadway while also flattening a fence.</p>")
                .append("description", "<p>Chelsea are aware of reports that Danny Drinkwater was arrested on Monday for suspected drink-driving.</p>")
                .append("dislike", new Document("amount", BigDecimal.ZERO)
                        .append("contributor", new Document("amount", BigDecimal.ZERO)
                                .append("id", new ArrayList<String>())))
                .append("file", new Document("name", "danny-drinkwater-chelseainbgod1a3jnl1vihsvyamsafz.jpg")
                        .append("source", "Local Image"))
                .append("like", new Document("amount", BigDecimal.ZERO)
                        .append("contributor", new Document("amount", BigDecimal.ZERO)
                                .append("id", new ArrayList<String>())))
                .append("meta", new Document("description", "Chelsea are aware of reports that Danny Drinkwater was arrested on Monday for suspected drink-driving.")
                        .append("keyword", "chelsea,drinkwater,drink-driving")
                        .append("title", "Chelsea Issue Response To Drinkwater Drink-Driving Reports"))
                .append("og", new Document("description", "Chelsea are aware of reports that Danny Drinkwater was arrested on Monday for suspected drink-driving.")
                        .append("title", "Chelsea Issue Response To Drinkwater Drink-Driving Reports"))
                .append("path", blogPath)
                .append("rate", new Document("amount", new BigDecimal("3500"))
                        .append("contributor", new Document("amount", new BigDecimal("1000"))
                                .append("id", new ArrayList<String>())))
                .append("sequence", new BigDecimal("6"))
                .append("star", new Document("id", "0")
                        .append("name", "")
                        .append("path", "")
                        .append("url", ""))
                .append("status", "Active")
                .append("thumbnail", "danny-drinkwater-chelseainbgod1a3jnl1vihsvyamsafz.jpg")
                .append("title", "Chelsea Issue Response To Drinkwater Drink-Driving Reports")
                .append("url", "chelsea-issue-response-to-drinkwater-drinkdriving-reports")
                .append("view", new Document("id", new ArrayList<String>())
                        .append("raw", BigDecimal.ZERO)
                        .append("session_id", new ArrayList<String>())
                        .append("unique", BigDecimal.ZERO));
        this.blogRepository.insertOne(request, insertOneData, insertOneAdministrator);

        blogPath = new ArrayList<String>();
        blogPath.add(blogCategoryPath.get("league") + "/he-deserves-it--van-dijk-admits-to-voting-for-sterling-to-win-player-of-the-year");
        blogPath.add(blogCategoryPath.get("leaguePremierLeague") + "/he-deserves-it--van-dijk-admits-to-voting-for-sterling-to-win-player-of-the-year");

        insertOneData = new Document("category", new Document("id", premierLeagueCategoryId)
                .append("name", new ArrayList<String>() {

                    {
                        add("League");
                        add("Premier League");

                    }

                })
                .append("path", premierLeagueCategoryPath)
                .append("url", premierLeagueCategoryUrl))
                .append("content", "<p>Liverpool defender Virgil van Dijk has revealed he voted for Raheem Sterling to win Player of the Year and says the Manchester City forward would be a worthy recipient.</p>\n<p>Van Dijk and Sterling are among the favourites to take home the award after enjoying fine seasons at their respective clubs.</p>\n<p>Voting between the duo is expected to be tight, mirroring the title race itself, with Liverpool currently just two points ahead of City at the top of the Premier League.</p>")
                .append("description", "<p>Liverpool defender Virgil van Dijk has revealed he voted for Raheem Sterling to win Player of the Year and says the Manchester City forward would be a worthy recipient.</p>")
                .append("dislike", new Document("amount", BigDecimal.ZERO)
                        .append("contributor", new Document("amount", BigDecimal.ZERO)
                                .append("id", new ArrayList<String>())))
                .append("file", new Document("name", "raheem-sterling-virgil-van-dijk1ca97dwxrd4za1s0ewue5x75o5.jpg")
                        .append("source", "Local Image"))
                .append("like", new Document("amount", BigDecimal.ZERO)
                        .append("contributor", new Document("amount", BigDecimal.ZERO)
                                .append("id", new ArrayList<String>())))
                .append("meta", new Document("description", "Liverpool defender Virgil van Dijk has revealed he voted for Raheem Sterling to win Player of the Year and says the Manchester City forward would be a worthy recipient.")
                        .append("keyword", "van dijk,sterling,player of the year")
                        .append("title", "'He Deserves It' - Van Dijk Admits To Voting For Sterling To Win Player Of The Year"))
                .append("og", new Document("description", "Liverpool defender Virgil van Dijk has revealed he voted for Raheem Sterling to win Player of the Year and says the Manchester City forward would be a worthy recipient.")
                        .append("title", "'He Deserves It' - Van Dijk Admits To Voting For Sterling To Win Player Of The Year"))
                .append("path", blogPath)
                .append("rate", new Document("amount", new BigDecimal("3500"))
                        .append("contributor", new Document("amount", new BigDecimal("1000"))
                                .append("id", new ArrayList<String>())))
                .append("sequence", new BigDecimal("7"))
                .append("star", new Document("id", "0")
                        .append("name", "")
                        .append("path", "")
                        .append("url", ""))
                .append("status", "Active")
                .append("thumbnail", "raheem-sterling-virgil-van-dijk1ca97dwxrd4za1s0ewue5x75o5.jpg")
                .append("title", "'He Deserves It' - Van Dijk Admits To Voting For Sterling To Win Player Of The Year")
                .append("url", "he-deserves-it--van-dijk-admits-to-voting-for-sterling-to-win-player-of-the-year")
                .append("view", new Document("id", new ArrayList<String>())
                        .append("raw", BigDecimal.ZERO)
                        .append("session_id", new ArrayList<String>())
                        .append("unique", BigDecimal.ZERO));
        this.blogRepository.insertOne(request, insertOneData, insertOneAdministrator);

        result.put("result", true);

        return result;

    }


    public Map<String, Object> install(HttpServletRequest request) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Installation failed");
                put("result", false);
            }

        };

        MongoIterable<String> collection = this.installationRepository.checkCollection();

        this.installationRepository.dropCollection(collection);

        this.installationRepository.createCollection();

        Map<String, Object> initializeData = this.initializeData(request);

        if (initializeData.get("result").equals(true)) {

            result.put("result", true);

        }

        return result;

    }


    public Map<String, Object> uninstall(HttpServletRequest request) {

        Map<String, Object> result = new HashMap<String, Object>() {

            {
                put("response", "Uninstallation failed");
                put("result", false);
            }

        };

        MongoCursor<Document> settingIterator = this.settingRepository.findSort(new Document("created.timestamp", -1));

        if (settingIterator.hasNext()) {

            Map<String, Object> settingMap = settingIterator.next();

            Document updateOneEq = new Document("_id", settingMap.get("_id"));
            Document updateOneData = new Document("installation", "Uninstalled");
            Document updateOneAdministrator = new Document("id", "0")
                    .append("username", "System");
            this.settingRepository.updateOne(request, updateOneEq, updateOneData, updateOneAdministrator);

            result.put("result", true);
            result.put("response", "Preloode panel successfully uninstalled");

        } else {

            result.put("response", "Setting doesn't exist");

        }

        return result;

    }


}
