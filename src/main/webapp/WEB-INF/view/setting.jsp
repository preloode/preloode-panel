<%@ include file="head.jsp" %>
<%@ include file="header.jsp" %>
<div id="content" ng-controller="setting">
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
                <p>Setting</p>
                <div class="clearfix"></div>
            </div>
        </div>
        <form method="POST" action="" ng-init="initializeData('${entry._id}')">
            <div class="accordion">
                <p class="accordion-navigation" data-index="1">Website<span><i class="plus-white square-10"></i></span>
                </p>
                <div class="accordion-content data-entry" data-index="1">
                    <div class="title">
                        <p><span class="required">* </span>Name</p>
                    </div>
                    <div class="data">
                        <input name="setting-name" type="text" placeholder="Name" ng-keyup="checkName()"
                               ng-model="name.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="name.response.view" ng-class="name.response.class">{{name.response.value}}</p>
                    </div>
                    <div class="title file">
                        <p><span class="required"></span>Favicon</p>
                    </div>
                    <div class="data">
                        <input class="setting-thumbnail" name="setting-thumbnail" type="file" thumbnail-input="files"/>
                        <div class="thumbnail-list" ng-if="thumbnail.upload.result">
                            <setting-thumbnail-preview></setting-thumbnail-preview>
                        </div>
                        <div class="upload-file" ng-click="forceUploadThumbnail()"><i
                                class="cloud-white square-15 margin-right-5"></i>Upload
                        </div>
                    </div>
                    <div class="response">
                        <p ng-show="thumbnail.response.view" ng-class="thumbnail.response.class">
                            {{file.response.value}}</p>
                    </div>
                    <div class="title file">
                        <p><span class="required"></span>Logo</p>
                    </div>
                    <div class="data">
                        <input class="setting-file" name="setting-file" type="file" file-input="files"/>
                        <div class="file-list" ng-if="file.upload.result">
                            <setting-file-preview></setting-file-preview>
                        </div>
                        <div class="upload-file" ng-click="forceUpload()"><i
                                class="cloud-white square-15 margin-right-5"></i>Upload
                        </div>
                    </div>
                    <div class="response">
                        <p ng-show="file.response.view" ng-class="file.response.class">{{file.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Meta Title</p>
                    </div>
                    <div class="data">
                        <input name="setting-meta-title" type="text" placeholder="Meta Title"
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
                        <textarea name="setting-meta-description" placeholder="Meta Description"
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
                        <input name="setting-meta-keyword" type="text" placeholder="Meta Keyword"
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
                        <input name="setting-og-title" type="text" placeholder="OG Title" ng-keyup="checkOgTitle()"
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
                        <textarea name="setting-og-description" placeholder="OG Description"
                                  ng-model="ogDescription.value"></textarea>
                    </div>
                    <div class="response">
                        <p ng-show="ogDescription.response.view" ng-class="ogDescription.response.class">
                            {{ogDescription.response.value}}</p>
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
                </div>
                <p class="accordion-navigation" data-index="2">Registration<span><i
                        class="plus-white square-10"></i></span></p>
                <div class="accordion-content data-entry" data-index="2">
                    <div class="title">
                        <p><span class="required"></span>Email Activation</p>
                    </div>
                    <div class="data">
                        <md-switch ng-change="initializeInput()" ng-model="activationEmail.name"
                                   aria-label="Email Activation" ng-true-value="'Enabled'" ng-false-value="'Disabled'"
                                   class="md-warn">{{activationEmail.name}}
                        </md-switch>
                    </div>
                    <div class="response"></div>
                    <div class="title">
                        <p><span class="required"></span>SMS Activation</p>
                    </div>
                    <div class="data">
                        <md-switch ng-change="initializeInput()" ng-model="activationSms.name"
                                   aria-label="SMS Activation" ng-true-value="'Enabled'" ng-false-value="'Disabled'"
                                   class="md-warn">{{activationSms.name}}
                        </md-switch>
                    </div>
                    <div class="response"></div>
                </div>
                <p class="accordion-navigation" data-index="3">Transaction<span><i
                        class="plus-white square-10"></i></span></p>
                <div class="accordion-content data-entry" data-index="3">
                    <div class="title">
                        <p><span class="required"></span>Minimum Deposit</p>
                    </div>
                    <div class="data">
                        <input name="setting-minimum-deposit" type="text" placeholder="Minimum Deposit"
                               ng-keyup="checkMinimumDeposit()" ng-model="minimumDeposit.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="minimumDeposit.response.view" ng-class="minimumDeposit.response.class">
                            {{minimumDeposit.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Maximum Deposit</p>
                    </div>
                    <div class="data">
                        <input name="setting-maximum-deposit" type="text" placeholder="Maximum Deposit"
                               ng-keyup="checkMaximumDeposit()" ng-model="maximumDeposit.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="maximumDeposit.response.view" ng-class="maximumDeposit.response.class">
                            {{maximumDeposit.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Deposit Average Time</p>
                    </div>
                    <div class="data">
                        <input name="setting-deposit-average-time" type="text" placeholder="Deposit Average Time"
                               ng-keyup="checkDepositAverageTime()" ng-model="depositAverageTime.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="depositAverageTime.response.view" ng-class="depositAverageTime.response.class">
                            {{depositAverageTime.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Minimum Withdrawal</p>
                    </div>
                    <div class="data">
                        <input name="setting-minimum-withdrawal" type="text" placeholder="Minimum Withdrawal"
                               ng-keyup="checkMinimumWithdrawal()" ng-model="minimumWithdrawal.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="minimumWithdrawal.response.view" ng-class="minimumWithdrawal.response.class">
                            {{minimumDeposit.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Maximum Withdrawal</p>
                    </div>
                    <div class="data">
                        <input name="setting-maximum-withdrawal" type="text" placeholder="Maximum Withdrawal"
                               ng-keyup="checkMaximumWithdrawal()" ng-model="maximumWithdrawal.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="maximumWithdrawal.response.view" ng-class="maximumWithdrawal.response.class">
                            {{maximumWithdrawal.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Withdrawal Average Time</p>
                    </div>
                    <div class="data">
                        <input name="setting-withdrawal-average-time" type="text" placeholder="Withdrawal Average Time"
                               ng-keyup="checkWithdrawalAverageTime()" ng-model="withdrawalAverageTime.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="withdrawalAverageTime.response.view"
                           ng-class="withdrawalAverageTime.response.class">{{withdrawalAverageTime.response.value}}</p>
                    </div>
                </div>
                <p class="accordion-navigation" data-index="4">Blog<span><i class="plus-white square-10"></i></span></p>
                <div class="accordion-content data-entry" data-index="4">
                    <div class="title">
                        <p><span class="required"></span>Like</p>
                    </div>
                    <div class="data">
                        <md-switch ng-change="initializeInput()" ng-model="like.name" aria-label="Like"
                                   ng-true-value="'Enabled'" ng-false-value="'Disabled'" class="md-warn">{{like.name}}
                        </md-switch>
                    </div>
                    <div class="response"></div>
                    <div class="title">
                        <p><span class="required"></span>Rating</p>
                    </div>
                    <div class="data">
                        <md-switch ng-change="initializeInput()" ng-model="rating.name" aria-label="Rating"
                                   ng-true-value="'Enabled'" ng-false-value="'Disabled'" class="md-warn">{{rating.name}}
                        </md-switch>
                    </div>
                    <div class="response"></div>
                    <div class="title">
                        <p><span class="required"></span>Comment</p>
                    </div>
                    <div class="data">
                        <md-switch ng-change="initializeInput()" ng-model="comment.name" aria-label="Comment"
                                   ng-true-value="'Enabled'" ng-false-value="'Disabled'" class="md-warn">
                            {{comment.name}}
                        </md-switch>
                    </div>
                    <div class="response"></div>
                </div>
                <p class="accordion-navigation" data-index="5">Maintenance<span><i
                        class="plus-white square-10"></i></span></p>
                <div class="accordion-content data-entry" data-index="5">
                    <div class="title">
                        <p><span class="required"></span>Finish</p>
                    </div>
                    <div class="data">
                        <input class="date-time-picker" name="setting-maintenance-finish" type="text"
                               placeholder="Maintenance Finish" ng-keyup="checkMaintenanceFinish()"
                               ng-model="maintenanceFinish.value"/>
                    </div>
                    <div class="response"></div>
                    <div class="title">
                        <p><span class="required"></span>Next</p>
                    </div>
                    <div class="data">
                        <input class="date-time-picker" name="setting-maintenance-next" type="text"
                               placeholder="Maintenance Next" ng-keyup="checkMaintenanceNext()"
                               ng-model="maintenanceNext.value"/>
                    </div>
                    <div class="response"></div>
                </div>
            </div>
            <div class="button">
                <button class="edit" name="setting-edit" ng-click="edit($event)"><i
                        class="pencil-white square-15 margin-right-5"></i>Edit
                </button>
            </div>
        </form>
    </div>
</div>
<%@ include file="footer.jsp" %>
