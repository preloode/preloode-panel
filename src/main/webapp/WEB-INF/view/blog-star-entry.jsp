<%@ include file="head.jsp" %>
<%@ include file="header.jsp" %>
<div id="content" ng-controller="blogStar">
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
                <p><a href="${url.base}/blog/star/">Star</a><i class="next-white square-10 margin-left-5"></i></p>
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
                        <input name="blog-star-name" type="text" placeholder="Name" ng-keyup="checkName()"
                               ng-model="name.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="name.response.view" ng-class="name.response.class">{{name.response.value}}</p>
                    </div>
                    <div class="title file">
                        <p><span class="required"></span>Thumbnail</p>
                    </div>
                    <div class="data">
                        <input class="blog-star-thumbnail" name="blog-star-thumbnail" type="file"
                               thumbnail-input="files"/>
                        <div class="thumbnail-list" ng-if="thumbnail.upload.result">
                            <blog-star-thumbnail-preview></blog-star-thumbnail-preview>
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
                        <textarea id="tinymce-1" name="blog-star-description"
                                  placeholder="Description">${entry.description}</textarea>
                    </div>
                    <div class="response"></div>
                    <div class="title">
                        <p><span class="required"></span>Content</p>
                    </div>
                    <div class="data">
                        <textarea id="tinymce-2" name="blog-star-content"
                                  placeholder="Content">${entry.content}</textarea>
                    </div>
                    <div class="response"></div>
                    <div class="title">
                        <p><span class="required"></span>URL</p>
                    </div>
                    <div class="data">
                        <input name="blog-star-url" type="text" placeholder="URL" ng-keyup="checkUrl()"
                               ng-model="url.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="url.response.view" ng-class="url.response.class">{{url.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Meta Title</p>
                    </div>
                    <div class="data">
                        <input name="blog-star-meta-title" type="text" placeholder="Meta Title"
                               ng-keyup="checkMetaTitle()" ng-model="metaTitle.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="metaTitle.response.view" ng-class="metaTitle.response.class">
                            {{metaTitle.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Meta Description</p>
                    </div>
                    <div class="data">
                        <textarea name="blog-star-meta-description" placeholder="Meta Description"
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
                        <input name="blog-star-meta-keyword" type="text" placeholder="Meta Keyword"
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
                        <input name="blog-star-og-title" type="text" placeholder="OG Title" ng-keyup="checkOgTitle()"
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
                        <textarea name="blog-star-og-description" placeholder="OG Description"
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
                        <input name="blog-star-rate-amount" type="text" placeholder="Rate Amount"
                               ng-keyup="checkRateAmount()" ng-model="rateAmount.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="rateAmount.response.view" ng-class="rateAmount.response.class">
                            {{rateAmount.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Rate Contributor</p>
                    </div>
                    <div class="data">
                        <input name="blog-star-rate-contributor" type="text" placeholder="Rate Contributor"
                               ng-keyup="checkRateContributor()" ng-model="rateContributor.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="rateContributor.response.view" ng-class="rateContributor.response.class">
                            {{rateContributor.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Sequence</p>
                    </div>
                    <div class="data">
                        <input name="blog-star-sequence" type="text" placeholder="Sequence" ng-keyup="checkSequence()"
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
                    <div class="response" ng-if="status.response.view" ng-class="status.response.class"><p>
                        {{status.response.value}}</p></div>
                    <div class="title" ng-show="createdDate.view">
                        <p><span class="required"></span>Created Date</p>
                    </div>
                    <div class="data" ng-show="createdDate.view">
                        <input name="blog-star-created-date" type="text" placeholder="Created Date" readonly
                               ng-model="createdDate.value"/>
                    </div>
                    <div class="response" ng-show="createdDate.view"></div>
                    <div class="title" ng-show="modifiedDate.view">
                        <p><span class="required"></span>Modified Date</p>
                    </div>
                    <div class="data" ng-show="modifiedDate.view">
                        <input name="blog-star-modified-date" type="text" placeholder="Modified Date" readonly
                               ng-model="modifiedDate.value"/>
                    </div>
                    <div class="response" ng-show="modifiedDate.view"></div>
                </div>
                <p class="accordion-navigation" data-index="2">File<span><i class="plus-white square-10"></i></span></p>
                <div class="accordion-content data-entry" data-index="2">
                    <div class="title">
                        <p><span class="required"></span>Source</p>
                    </div>
                    <div class="data">
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
                        <input class="blog-star-file" name="blog-star-file" type="file" file-input="files"/>
                        <div class="file-list" ng-if="fileName.upload.result">
                            <blog-star-file-preview></blog-star-file-preview>
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
                        <input name="blog-star-url" type="text" placeholder="URL" ng-keyup="checkFileUrl()"
                               ng-model="fileUrl.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="fileUrl.response.view" ng-class="fileUrl.response.class">
                            {{fileUrl.response.value}}</p>
                    </div>
                </div>
            </div>
            <div class="button">
                <c:choose>
                    <c:when test="${!empty entry._id}">
                        <button class="edit" name="blog-star-edit" ng-click="edit($event)"><i
                                class="pencil-white square-15 margin-right-5"></i>Edit
                        </button>
                    </c:when>
                    <c:otherwise>
                        <button class="add" name="blog-star-insert" ng-click="insert($event)"><i
                                class="plus-white square-15 margin-right-5"></i>Add
                        </button>
                    </c:otherwise>
                </c:choose>
            </div>
        </form>
    </div>
</div>
<%@ include file="footer.jsp" %>
