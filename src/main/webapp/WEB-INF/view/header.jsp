<div id="wrapper">
    <div id="menu-icon" style="transform : translateX(${layout.mainMenuIconTranslateX})">
        <i class="menu-white square-20"></i>
    </div>
    <div id="menu" style="transform : translateX(${layout.mainMenuTranslateX})" ng-mousemove="rebuild()" ng-scrollbar
         rebuild-on-resize rebuild-on="rebuild:scrollbar">
        <ul class="main-menu">
            <li class="menu">
                <a href="${url.base}/"><p><i class="dashboard-white square-20 margin-right-10"></i>Dashboard</p></a>
                <div class="clearfix"></div>
                <span></span>
            </li>
            <li class="separator"></li>
            <c:if test="${menu.administrator.toString() == '7'}">
                <li class="menu" data-index="1">
                    <a href="${url.base}/administrator/">
                        <p><i class="user-white square-20 margin-right-10"></i>Administrator</p>
                    </a>
                    <p class="menu-toggle" data-index="1" ng-click="rebuild()"><i class="toggle-white square-15"></i>
                    </p>
                    <div class="clearfix"></div>
                    <span></span>
                </li>
                <li class="separator"></li>
                <c:if test="${menu.administrator_role.toString() == '7'}">
                    <li class="menu child-menu" data-index="1">
                        <a href="${url.base}/administrator/role/">
                            <p><i class="toggle-white square-15 margin-right-5"></i><i
                                    class="user-role-white square-20 margin-right-10"></i>Role</p>
                        </a>
                        <div class="clearfix"></div>
                        <span></span>
                    </li>
                    <li class="separator child-menu" data-index="1"></li>
                    <li class="menu child-menu hidden" data-index="1">
                        <a href="${url.base}/administrator/role/entry/">
                            <p><i class="toggle-white square-15 margin-right-5"></i><i
                                    class="user-role-white square-20 margin-right-10"></i><!-- Role Entry --></p>
                        </a>
                    </li>
                </c:if>
            </c:if>
            <c:if test="${menu.game.toString() == '7'}">
                <li class="menu" data-index="2">
                    <a href="${url.base}/game/">
                        <p><i class="game-white square-20 margin-right-10"></i>Game</p>
                    </a>
                    <p class="menu-toggle" data-index="2" ng-click="rebuild()"><i class="toggle-white square-15"></i>
                    </p>
                    <div class="clearfix"></div>
                    <span></span>
                </li>
                <li class="separator"></li>
                <c:if test="${menu.game_transaction.toString() == '7'}">
                    <li class="menu child-menu" data-index="2">
                        <a href="${url.base}/game/transaction/">
                            <p><i class="toggle-white square-15 margin-right-5"></i><i
                                    class="transaction-white square-20 margin-right-10"></i>Transaction</p>
                        </a>
                        <div class="clearfix"></div>
                        <span></span>
                    </li>
                    <li class="separator child-menu" data-index="2"></li>
                    <li class="menu child-menu hidden" data-index="2">
                        <a href="${url.base}/game/transaction/entry/">
                            <p><i class="toggle-white square-15 margin-right-5"></i><i
                                    class="transaction-white square-20 margin-right-10"></i><!-- Transaction Entry -->
                            </p>
                        </a>
                    </li>
                </c:if>
            </c:if>
            <c:if test="${menu.sportsbook.toString() == '7'}">
                <li class="menu" data-index="3">
                    <a href="${url.base}/sportsbook/">
                        <p><i class="soccer-white square-20 margin-right-10"></i>Sportsbook</p>
                    </a>
                    <p class="menu-toggle" data-index="3" ng-click="rebuild()"><i class="toggle-white square-15"></i>
                    </p>
                    <div class="clearfix"></div>
                    <span></span>
                </li>
                <li class="separator"></li>
            </c:if>
            <c:if test="${menu.lottery.toString() == '7'}">
                <li class="menu" data-index="4">
                    <a href="${url.base}/lottery/">
                        <p><i class="pool-white square-20 margin-right-10"></i>Lottery</p>
                    </a>
                    <p class="menu-toggle" data-index="4" ng-click="rebuild()"><i class="toggle-white square-15"></i>
                    </p>
                    <div class="clearfix"></div>
                    <span></span>
                </li>
                <li class="separator"></li>
            </c:if>
            <c:if test="${menu.bank.toString() == '7'}">
                <li class="menu" data-index="5">
                    <a href="${url.base}/bank/">
                        <p><i class="bank-white square-20 margin-right-10"></i>Bank</p>
                    </a>
                    <p class="menu-toggle" data-index="5" ng-click="rebuild()"><i class="toggle-white square-15"></i>
                    </p>
                    <div class="clearfix"></div>
                    <span></span>
                </li>
                <li class="separator"></li>
                <c:if test="${menu.bank_account.toString() == '7'}">
                    <li class="menu child-menu" data-index="5">
                        <a href="${url.base}/bank/account/">
                            <p><i class="toggle-white square-15 margin-right-5"></i><i
                                    class="bank-account-white square-20 margin-right-10"></i>Account</p>
                        </a>
                        <div class="clearfix"></div>
                        <span></span>
                    </li>
                    <li class="separator child-menu" data-index="5"></li>
                    <li class="menu child-menu hidden" data-index="5">
                        <a href="${url.base}/bank/account/entry/">
                            <p><i class="toggle-white square-15 margin-right-5"></i><i
                                    class="bank-account-white square-20 margin-right-10"></i><!-- Account Entry --></p>
                        </a>
                    </li>
                </c:if>
            </c:if>
            <c:if test="${menu.member.toString() == '7'}">
                <li class="menu" data-index="6">
                    <a href="${url.base}/member/">
                        <p><i class="member-white square-20 margin-right-10"></i>Member</p>
                    </a>
                    <p class="menu-toggle" data-index="6" ng-click="rebuild()"><i class="toggle-white square-15"></i>
                    </p>
                    <div class="clearfix"></div>
                    <span></span>
                </li>
                <li class="separator"></li>
                <c:if test="${menu.member_group.toString() == '7'}">
                    <li class="menu child-menu" data-index="6">
                        <a href="${url.base}/member/group/">
                            <p><i class="toggle-white square-15 margin-right-5"></i><i
                                    class="group-white square-20 margin-right-10"></i>Group</p>
                        </a>
                        <div class="clearfix"></div>
                        <span></span>
                    </li>
                    <li class="separator child-menu" data-index="6"></li>
                </c:if>
                <c:if test="${menu.member_transaction.toString() == '7'}">
                    <li class="menu child-menu" data-index="6">
                        <a href="${url.base}/member/transaction/">
                            <p><i class="toggle-white square-15 margin-right-5"></i><i
                                    class="transaction-white square-20 margin-right-10"></i>Transaction</p>
                        </a>
                        <div class="clearfix"></div>
                        <span></span>
                    </li>
                    <li class="separator child-menu" data-index="6"></li>
                    <li class="menu child-menu hidden" data-index="5">
                        <a href="${url.base}/member/transaction/entry/">
                            <p><i class="toggle-white square-15 margin-right-5"></i><i
                                    class="user-role-white square-20 margin-right-10"></i><!-- Transaction Entry --></p>
                        </a>
                    </li>
                </c:if>
            </c:if>
            <c:if test="${menu.promotion.toString() == '7'}">
                <li class="menu">
                    <a href="${url.base}/promotion/">
                        <p><i class="promotion-white square-20 margin-right-10"></i>Promotion</p>
                    </a>
                    <div class="clearfix"></div>
                    <span></span>
                </li>
                <li class="separator"></li>
            </c:if>
            <c:if test="${menu.transaction.toString() == '7'}">
                <li class="menu" data-index="7">
                    <a href="${url.base}/transaction/">
                        <p><i class="transaction-white square-20 margin-right-10"></i>Transaction</p>
                    </a>
                    <p class="menu-toggle" data-index="7" ng-click="rebuild()"><i
                            class="toggle-white square-15 margin-right-10"></i></p>
                    <div class="clearfix"></div>
                    <span></span>
                </li>
                <li class="separator"></li>
                <c:if test="${menu.transaction_request.toString() == '7'}">
                    <li class="menu child-menu" data-index="7">
                        <a href="${url.base}/transaction/request/">
                            <p><i class="toggle-white square-15 margin-right-5"></i><i
                                    class="flow-white square-20 margin-right-10"></i>Request</p>
                        </a>
                        <div class="clearfix"></div>
                        <span></span>
                    </li>
                    <li class="separator child-menu" data-index="7"></li>
                    <li class="menu child-menu hidden" data-index="7">
                        <a href="${url.base}/transaction/request/entry/">
                            <p><i class="toggle-white square-15 margin-right-5"></i><i
                                    class="flow-white square-20 margin-right-10"></i><!-- Request Entry --></p>
                        </a>
                    </li>
                </c:if>
            </c:if>
            <c:if test="${menu.report.toString() == '7'}">
                <li class="menu">
                    <a href="${url.base}/report/">
                        <p><i class="report-white square-20 margin-right-10"></i>Report</p>
                    </a>
                    <div class="clearfix"></div>
                    <span></span>
                </li>
                <li class="separator"></li>
            </c:if>
            <c:if test="${menu.setting.toString() == '7'}">
                <li class="menu" data-index="8">
                    <a href="${url.base}/setting/">
                        <p><i class="setting-white square-20 margin-right-10"></i>Setting</p>
                    </a>
                    <p class="menu-toggle" data-index="8" ng-click="rebuild()"><i
                            class="toggle-white square-15 margin-right-10"></i></p>
                    <div class="clearfix"></div>
                    <span></span>
                </li>
                <li class="separator"></li>
                <c:if test="${menu.setting_url.toString() == '7'}">
                    <li class="menu child-menu" data-index="8">
                        <a href="${url.base}/setting/url/">
                            <p><i class="toggle-white square-15 margin-right-5"></i><i
                                    class="link-white square-20 margin-right-10"></i>URL</p>
                        </a>
                        <div class="clearfix"></div>
                        <span></span>
                    </li>
                    <li class="separator child-menu" data-index="8"></li>
                    <li class="menu child-menu hidden" data-index="8">
                        <a href="${url.base}/setting/url/entry/">
                            <p><i class="toggle-white square-15 margin-right-5"></i><i
                                    class="link-white square-20 margin-right-10"></i><!-- URL Entry --></p>
                        </a>
                    </li>
                </c:if>
                <c:if test="${menu.setting_slider.toString() == '7'}">
                    <li class="menu child-menu" data-index="8">
                        <a href="${url.base}/setting/slider/">
                            <p><i class="toggle-white square-15 margin-right-5"></i><i
                                    class="picture-white square-20 margin-right-10"></i>Slider</p>
                        </a>
                        <div class="clearfix"></div>
                        <span></span>
                    </li>
                    <li class="separator child-menu" data-index="8"></li>
                    <li class="menu child-menu hidden" data-index="8">
                        <a href="${url.base}/setting/slider/entry/">
                            <p><i class="toggle-white square-15 margin-right-5"></i><i
                                    class="picture-white square-20 margin-right-10"></i><!-- Slider Entry --></p>
                        </a>
                    </li>
                </c:if>
                <c:if test="${menu.setting_page.toString() == '7'}">
                    <li class="menu child-menu" data-index="8">
                        <a href="${url.base}/setting/page/">
                            <p><i class="toggle-white square-15 margin-right-5"></i><i
                                    class="article-white square-20 margin-right-10"></i>Page</p>
                        </a>
                        <div class="clearfix"></div>
                        <span></span>
                    </li>
                    <li class="separator child-menu" data-index="8"></li>
                </c:if>
            </c:if>
            <c:if test="${menu.gallery.toString() == '7'}">
                <li class="menu">
                    <a href="${url.base}/gallery/">
                        <p><i class="picture-white square-20 margin-right-10"></i>Gallery</p>
                    </a>
                    <div class="clearfix"></div>
                    <span></span>
                </li>
                <li class="separator"></li>
            </c:if>
            <c:if test="${menu.blog.toString() == '7'}">
                <li class="menu" data-index="9">
                    <a href="${url.base}/blog/">
                        <p><i class="article-white square-20 margin-right-10"></i>Blog</p>
                    </a>
                    <p class="menu-toggle" data-index="9" ng-click="rebuild()"><i class="toggle-white square-15"></i>
                    </p>
                    <div class="clearfix"></div>
                    <span></span>
                </li>
                <li class="separator"></li>
                <c:if test="${menu.blog_category.toString() == '7'}">
                    <li class="menu child-menu" data-index="9">
                        <a href="${url.base}/blog/category/">
                            <p><i class="toggle-white square-15 margin-right-5"></i><i
                                    class="category-white square-20 margin-right-10"></i>Category</p>
                        </a>
                        <div class="clearfix"></div>
                        <span></span>
                    </li>
                    <li class="separator child-menu" data-index="9"></li>
                    <li class="menu child-menu hidden" data-index="9">
                        <a href="${url.base}/blog/category/entry/">
                            <p><i class="toggle-white square-15 margin-right-5"></i><i
                                    class="category-white square-20 margin-right-10"></i><!-- Category Entry --></p>
                        </a>
                    </li>
                </c:if>
                <li class="separator"></li>
                <c:if test="${menu.blog_star.toString() == '7'}">
                    <li class="menu child-menu" data-index="9">
                        <a href="${url.base}/blog/star/">
                            <p><i class="toggle-white square-15 margin-right-5"></i><i
                                    class="star-white square-20 margin-right-10"></i>Star</p>
                        </a>
                        <div class="clearfix"></div>
                        <span></span>
                    </li>
                    <li class="separator child-menu" data-index="9"></li>
                    <li class="menu child-menu hidden" data-index="9">
                        <a href="${url.base}/blog/star/entry/">
                            <p><i class="toggle-white square-15 margin-right-5"></i><i
                                    class="star-white square-20 margin-right-10"></i><!-- Star Entry --></p>
                        </a>
                    </li>
                </c:if>
            </c:if>
        </ul>
    </div>
    <div id="header">
        <div class="logo">
            <a href="${url.base}">
                <h1><img class="responsive" src="${url.image}/logo.png" alt="${setting.name} Logo"/></h1>
            </a>
        </div>
        <div class="account">
            <c:choose>
                <c:when test="${!empty preloodeAccount.file}">
                    <img class="responsive" src="${url.image}/administrator/${preloodeAccount.file}"
                         alt="${setting.name} Administrator Profile Picture"/>
                </c:when>
                <c:otherwise>
                    <img class="responsive" src="${url.image}/administrator/administrator-picture.png"
                         alt="${setting.name} Administrator Profile Picture"/>
                </c:otherwise>
            </c:choose>
            <p>${preloodeAccount.name.first}
            <c:if test="${!empty preloodeAccount.name.middle}"> ${preloodeAccount.name.middle}</c:if>
            <c:if test="${!empty preloodeAccount.name.last}"> ${preloodeAccount.name.last}</c:if></p>
        </div>
        <div class="notification">
            <i class="bell-white square-20"></i><span></span>
        </div>
        <div class="logout" ng-click="logout()">
            <i class="power-white square-20"></i>
        </div>
    </div>
