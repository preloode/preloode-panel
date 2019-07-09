<%@ include file="head.jsp" %>
<%@ include file="header.jsp" %>
<div id="content" ng-controller="settingPage">
    <div id="loading" ng-show="loading.view">
        <div class="wrapper">
            <div class="circle"></div>
            <div class="circle-1"></div>
        </div>
    </div>
    <div id="response" ng-if="response.view" ng-class="response.class"><p>{{response.message}}</p></div>
    <div class="wrapper">
        <div class="navigation">
            <div class="breadcrumb">
                <p><a href="${url.base}/">Home</a><i class="next-white square-10 margin-left-5"></i></p>
                <p><a href="${url.base}/setting/">Setting</a><i class="next-white square-10 margin-left-5"></i></p>
                <p><a href="${url.base}/setting/page/">Page</a><i class="next-white square-10 margin-left-5"></i></p>
                <p>Entry</p>
                <div class="clearfix"></div>
            </div>
        </div>
        <form method="POST" action="" ng-init="initializeData('${entry._id}')">
            <div class="accordion">
                <p class="accordion-navigation" data-index="1">Detail<span><i class="plus-white square-10"></i></span>
                </p>
                <div class="accordion-content data-entry" data-index="1">
                    <div class="title">
                        <p><span class="required">* </span>Name</p>
                    </div>
                    <div class="data">
                        <input name="setting-page-name" type="text" placeholder="Name"<c:if
                                test="${!empty entry._id}"> readonly</c:if> ng-keyup="checkName()"
                               ng-model="name.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="name.response.view" ng-class="name.response.class">{{name.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>URL</p>
                    </div>
                    <div class="data">
                        <input name="setting-page-url" type="text" placeholder="URL" ng-keyup="checkUrl()"
                               ng-model="url.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="url.response.view" ng-class="url.response.class">{{url.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Sequence</p>
                    </div>
                    <div class="data">
                        <input name="setting-page-sequence" type="text" placeholder="Sequence"
                               ng-keyup="checkSequence()" ng-model="sequence.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="sequence.response.view" ng-class="sequence.response.class">
                            {{sequence.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required">* </span>Status</p>
                    </div>
                    <div class="data">
                        <md-input-container>
                            <md-select ng-change="checkStatus()" ng-model="status.selected" placeholder="Status">
                                <md-option ng-repeat="option in status.option" ng-value="option">
                                    {{option.name}}
                                </md-option>
                            </md-select>
                        </md-input-container>
                    </div>
                    <div class="response">
                        <p ng-show="status.response.view" ng-class="status.response.class">{{status.response.value}}</p>
                    </div>
                    <div class="title" ng-show="createdDate.view">
                        <p><span class="required"></span>Created Date</p>
                    </div>
                    <div class="data" ng-show="createdDate.view">
                        <input name="setting-page-created-date" type="text" placeholder="Created Date" readonly
                               ng-model="createdDate.value"/>
                    </div>
                    <div class="response" ng-show="createdDate.view"></div>
                    <div class="title" ng-show="modifiedDate.view">
                        <p><span class="required"></span>Modified Date</p>
                    </div>
                    <div class="data" ng-show="modifiedDate.view">
                        <input name="setting-page-modified-date" type="text" placeholder="Modified Date" readonly
                               ng-model="modifiedDate.value"/>
                    </div>
                    <div class="response" ng-show="modifiedDate.view"></div>
                </div>
                <c:if test="${!empty entry._id}">
                    <p class="accordion-navigation" data-index="2">Domain<span><i
                            class="plus-white square-10"></i></span></p>
                    <div class="accordion-content data-entry" data-index="2">
                        <div class="title">
                            <p><span class="required">* </span>Website URL</p>
                        </div>
                        <div class="data">
                            <md-input-container>
                                <md-select ng-change="checkWebsiteUrl(); changeValueIndex()"
                                           ng-model="websiteUrl.selected" placeholder="Website URL">
                                    <md-option ng-repeat="option in websiteUrl.option" ng-value="option">
                                        {{option.name}}
                                    </md-option>
                                </md-select>
                            </md-input-container>
                        </div>
                        <div class="response">
                            <p ng-show="websiteUrl.response.view" ng-class="websiteUrl.response.class">
                                {{websiteUrl.response.value}}</p>
                        </div>
                        <div class="title">
                            <p><span class="required"></span>Title</p>
                        </div>
                        <div class="data">
                            <input name="setting-page-title" type="text" placeholder="Title" ng-keyup="checkTitle()"
                                   ng-model="title.value.value[valueIndex]"/>
                        </div>
                        <div class="response">
                            <p ng-show="title.response.view" ng-class="title.response.class">
                                {{title.response.value}}</p>
                        </div>
                        <div class="title">
                            <p><span class="required"></span>Description</p>
                        </div>
                        <div class="data">
                            <textarea class="data" name="setting-page-description" placeholder="Description"
                                      ng-model="description.value.value[valueIndex]"></textarea>
                        </div>
                        <div class="response"></div>
                        <div class="title">
                            <p><span class="required"></span>Content</p>
                        </div>
                        <div class="data">
                            <textarea id="tinymce-1" name="setting-page-content" placeholder="Content"></textarea>
                        </div>
                        <div class="response"></div>
                        <div class="title">
                            <p><span class="required"></span>Meta Title</p>
                        </div>
                        <div class="data">
                            <input name="setting-page-meta-title" type="text" placeholder="Meta Title"
                                   ng-keyup="checkMetaTitle()" ng-model="metaTitle.value.value[valueIndex]"/>
                        </div>
                        <div class="response">
                            <p ng-show="metaTitle.response.view" ng-class="metaTitle.response.class">
                                {{metaTitle.response.value}}</p>
                        </div>
                        <div class="title">
                            <p><span class="required"></span>Meta Description</p>
                        </div>
                        <div class="data">
                            <textarea name="setting-page-meta-description" placeholder="Meta Description"
                                      ng-model="metaDescription.value.value[valueIndex]"></textarea>
                        </div>
                        <div class="response">
                            <p ng-show="metaDescription.response.view" ng-class="metaDescription.response.class">
                                {{metaDescription.response.value}}</p>
                        </div>
                        <div class="title">
                            <p><span class="required"></span>Meta Keyword</p>
                        </div>
                        <div class="data">
                            <input name="setting-page-meta-keyword" type="text" placeholder="Meta Keyword"
                                   ng-keyup="checkMetaKeyword()" ng-model="metaKeyword.value.value[valueIndex]"/>
                        </div>
                        <div class="response">
                            <p ng-show="metaKeyword.response.view" ng-class="metaKeyword.response.class">
                                {{metaKeyword.response.value}}</p>
                        </div>
                        <div class="title">
                            <p><span class="required"></span>OG Title</p>
                        </div>
                        <div class="data">
                            <input name="setting-page-og-title" type="text" placeholder="OG Title"
                                   ng-keyup="checkOgTitle()" ng-model="ogTitle.value.value[valueIndex]"/>
                        </div>
                        <div class="response">
                            <p ng-show="ogTitle.response.view" ng-class="ogTitle.response.class">
                                {{ogTitle.response.value}}</p>
                        </div>
                        <div class="title">
                            <p><span class="required"></span>OG Description</p>
                        </div>
                        <div class="data">
                            <textarea name="setting-page-og-description" placeholder="OG Description"
                                      ng-model="ogDescription.value.value[valueIndex]"></textarea>
                        </div>
                        <div class="response">
                            <p ng-show="ogDescription.response.view" ng-class="ogDescription.response.class">
                                {{ogDescription.response.value}}</p>
                        </div>
                    </div>
                </c:if>
            </div>
            <div class="button">
                <c:choose>
                    <c:when test="${!empty entry._id}">
                        <button class="edit" name="setting-page-edit" ng-click="edit($event)"><i
                                class="pencil-white square-15 margin-right-5"></i>Edit
                        </button>
                    </c:when>
                    <c:otherwise>
                        <button class="add" name="setting-page-insert" ng-click="insert($event)"><i
                                class="plus-white square-15 margin-right-5"></i>Add
                        </button>
                    </c:otherwise>
                </c:choose>
            </div>
        </form>
    </div>
</div>
<%@ include file="footer.jsp" %>
