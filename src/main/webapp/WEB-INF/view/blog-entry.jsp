<%@ include file="head.jsp" %>
<%@ include file="header.jsp" %>
<div id="content" ng-controller="blog">
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
                <p><a href="${url.base}/blog/">Blog</a><i class="next-white square-10 margin-left-5"></i></p>
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
                        <p><span class="required">* </span>Title</p>
                    </div>
                    <div class="data">
                        <input name="blog-title" type="text" placeholder="Title" ng-keyup="checkTitle()"
                               ng-model="title.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="title.response.view" ng-class="title.response.class">{{title.response.value}}</p>
                    </div>
                    <div class="title file">
                        <p><span class="required"></span>Thumbnail</p>
                    </div>
                    <div class="data">
                        <input class="blog-thumbnail" name="blog-thumbnail" type="file" thumbnail-input="files"/>
                        <div class="thumbnail-list" ng-show="thumbnail.upload.result">
                            <blog-thumbnail-preview></blog-thumbnail-preview>
                        </div>
                        <div class="upload-file" ng-click="forceUploadThumbnail()"><i
                                class="cloud-white square-15 margin-right-5"></i>Upload
                        </div>
                    </div>
                    <div class="response">
                        <p ng-show="thumbnail.response.view" ng-class="thumbnail.response.class">
                            {{thumbnail.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Description</p>
                    </div>
                    <div class="data">
                        <textarea id="tinymce-1" name="blog-description"
                                  placeholder="Description">${entry.description}</textarea>
                    </div>
                    <div class="response"></div>
                    <div class="title">
                        <p><span class="required"></span>Content</p>
                    </div>
                    <div class="data">
                        <textarea id="tinymce-2" name="blog-content" placeholder="Content">${entry.content}</textarea>
                    </div>
                    <div class="response"></div>
                    <div class="title">
                        <p><span class="required"></span>URL</p>
                    </div>
                    <div class="data">
                        <input name="blog-url" type="text" placeholder="URL" ng-keyup="checkUrl()"
                               ng-model="url.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="url.response.view" ng-class="url.response.class">{{url.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Meta Title</p>
                    </div>
                    <div class="data">
                        <input name="blog-meta-title" type="text" placeholder="Meta Title" ng-keyup="checkMetaTitle()"
                               ng-model="metaTitle.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="metaTitle.response.view" ng-class="metaTitle.response.class">
                            {{metaTitle.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Meta Description</p>
                    </div>
                    <div class="data">
                        <textarea name="blog-meta-description" placeholder="Meta Description"
                                  ng-model="metaDescription.value"></textarea>
                    </div>
                    <div class="response">
                        <p ng-show="metaDescription.response.view" ng-class="metaDescription.response.class">
                            {{metaDescription.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Meta Keyword</p>
                    </div>
                    <div class="data">
                        <input name="blog-meta-keyword" type="text" placeholder="Meta Keyword"
                               ng-keyup="checkMetaKeyword()" ng-model="metaKeyword.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="metaKeyword.response.view" ng-class="metaKeyword.response.class">
                            {{metaKeyword.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>OG Title</p>
                    </div>
                    <div class="data">
                        <input name="blog-og-title" type="text" placeholder="OG Title" ng-keyup="checkOgTitle()"
                               ng-model="ogTitle.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="ogTitle.response.view" ng-class="ogTitle.response.class">
                            {{ogTitle.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>OG Description</p>
                    </div>
                    <div class="data">
                        <textarea name="blog-og-description" placeholder="OG Description"
                                  ng-model="ogDescription.value"></textarea>
                    </div>
                    <div class="response">
                        <p ng-show="ogDescription.response.view" ng-class="ogDescription.response.class">
                            {{ogDescription.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Rate Amount</p>
                    </div>
                    <div class="data">
                        <input name="blog-rate-amount" type="text" placeholder="Rate Amount"
                               ng-keyup="checkRateAmount()" ng-model="rateAmount.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="rateAmount.response.view" ng-class="rateAmount.response.class">
                            {{rateAmount.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Rate Contributor Amount</p>
                    </div>
                    <div class="data">
                        <input name="blog-rate-contributor" type="text" placeholder="Rate Contributor"
                               ng-keyup="checkRateContributorAmount()" ng-model="rateContributorAmount.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="rateContributorAmount.response.view"
                           ng-class="rateContributorAmount.response.class">{{rateContributoAmount.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Like Amount</p>
                    </div>
                    <div class="data">
                        <input name="blog-like-amount" type="text" placeholder="Like Amount"
                               ng-keyup="checkLikeAmount()" ng-model="likeAmount.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="likeAmount.response.view" ng-class="likeAmount.response.class">
                            {{likeAmount.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Like Contributor Amount</p>
                    </div>
                    <div class="data">
                        <input name="blog-like-contributor" type="text" placeholder="Like Contributor"
                               ng-keyup="checkLikeContributorAmount()" ng-model="likeContributorAmount.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="likeContributorAmount.response.view"
                           ng-class="likeContributorAmount.response.class">{{likeContributoAmount.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Dislike Amount</p>
                    </div>
                    <div class="data">
                        <input name="blog-dislike-amount" type="text" placeholder="Dislike Amount"
                               ng-keyup="checkDislikeAmount()" ng-model="dislikeAmount.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="dislikeAmount.response.view" ng-class="dislikeAmount.response.class">
                            {{dislikeAmount.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Dislike Contributor Amount</p>
                    </div>
                    <div class="data">
                        <input name="blog-dislike-contributor" type="text" placeholder="Dislike Contributor"
                               ng-keyup="checkDislikeContributorAmount()" ng-model="dislikeContributorAmount.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="dislikeContributorAmount.response.view"
                           ng-class="dislikeContributorAmount.response.class">
                            {{dislikeContributoAmount.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Sequence</p>
                    </div>
                    <div class="data">
                        <input name="blog-sequence" type="text" placeholder="Sequence" ng-keyup="checkSequence()"
                               ng-model="sequence.value"/>
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
                        <input name="blog-created-date" type="text" placeholder="Created Date" readonly
                               ng-model="createdDate.value"/>
                    </div>
                    <div class="response" ng-show="createdDate.view"></div>
                    <div class="title" ng-show="modifiedDate.view">
                        <p><span class="required"></span>Modified Date</p>
                    </div>
                    <div class="data" ng-show="modifiedDate.view">
                        <input name="blog-modified-date" type="text" placeholder="Modified Date" readonly
                               ng-model="modifiedDate.value"/>
                    </div>
                    <div class="response" ng-show="modifiedDate.view"></div>
                </div>
                <p class="accordion-navigation" data-index="2">File<span><i class="plus-white square-10"></i></span></p>
                <div class="accordion-content data-entry" data-index="2">
                    <div class="title">
                        <p><span class="required"></span>Source</p>
                    </div>
                    <div class="data select">
                        <md-input-container>
                            <md-select ng-change="checkFileSource()" ng-model="fileSource.selected"
                                       placeholder="Source">
                                <md-option ng-repeat="option in fileSource.option" ng-value="option">
                                    {{option.name}}
                                </md-option>
                            </md-select>
                        </md-input-container>
                    </div>
                    <div class="response">
                        <p ng-show="fileSource.response.view" ng-class="fileSource.response.class">
                            {{fileSource.response.value}}</p>
                    </div>
                    <div class="title file">
                        <p><span class="required"></span>File</p>
                    </div>
                    <div class="data">
                        <input class="blog-file" name="blog-file" type="file" file-input="files"/>
                        <div class="file-list" ng-show="fileName.upload.result">
                            <blog-file-preview></blog-file-preview>
                        </div>
                        <div class="upload-file" ng-click="forceUpload()"><i
                                class="cloud-white square-15 margin-right-5"></i>Upload
                        </div>
                    </div>
                    <div class="response">
                        <p ng-show="fileName.response.view" ng-class="fileName.response.class">
                            {{fileName.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>URL</p>
                    </div>
                    <div class="data">
                        <input name="blog-url" type="text" placeholder="URL" ng-keyup="checkFileUrl()"
                               ng-model="fileUrl.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="fileUrl.response.view" ng-class="fileUrl.response.class">
                            {{fileUrl.response.value}}</p>
                    </div>
                </div>
                <p class="accordion-navigation" data-index="3">Category<span><i class="plus-white square-10"></i></span>
                </p>
                <div class="accordion-content" data-index="3">
                    <div class="category" ng-repeat="categoryItem in category.option">
                        <p ng-bind-html="categoryItem.icon"></p>
                        <md-checkbox ng-checked="category.value.id.indexOf(categoryItem.id) > -1"
                                     ng-click="categoryToggleCheckbox(categoryItem)">{{categoryItem.name}}
                        </md-checkbox>
                        <div class="clearfix"></div>
                    </div>
                    <div class="response" ng-if="category.response.view" ng-class="category.response.class"><p>
                        {{category.response.value}}</p></div>
                    <div class="clearfix"></div>
                </div>
                <p class="accordion-navigation" data-index="4">Star<span><i class="plus-white square-10"></i></span></p>
                <div class="accordion-content" data-index="4">
                    <div class="category" ng-repeat="starItem in star.option">
                        <p ng-bind-html="starItem.icon"></p>
                        <md-checkbox ng-checked="star.value.id.indexOf(starItem.id) > -1"
                                     ng-click="starToggleCheckbox(starItem)">{{starItem.name}}
                        </md-checkbox>
                        <div class="clearfix"></div>
                    </div>
                    <div class="response" ng-if="star.response.view" ng-class="star.response.class"><p>
                        {{star.response.value}}</p></div>
                    <div class="clearfix"></div>
                </div>
            </div>
            <div class="button">
                <c:choose>
                    <c:when test="${!empty entry._id}">
                        <button class="edit" name="blog-edit" ng-click="edit($event)"><i
                                class="pencil-white square-15 margin-right-5"></i>Edit
                        </button>
                    </c:when>
                    <c:otherwise>
                        <button class="add" name="blog-insert" ng-click="insert($event)"><i
                                class="plus-white square-15 margin-right-5"></i>Add
                        </button>
                    </c:otherwise>
                </c:choose>
            </div>
        </form>
    </div>
</div>
<%@ include file="footer.jsp" %>
