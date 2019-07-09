<%@ include file="head.jsp" %>
<%@ include file="header.jsp" %>
<div id="content" ng-controller="transaction">
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
                <p><a href="${url.base}/transaction/">Transaction</a><i class="next-white square-10 margin-left-5"></i>
                </p>
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
                        <p><span class="required">* </span>Type</p>
                    </div>
                    <div class="data">
                        <md-input-container>
                            <md-select ng-change="checkType()" ng-model="type.selected" placeholder="Type">
                                <md-option ng-repeat="option in type.option" ng-value="option">
                                    {{option.name}}
                                </md-option>
                            </md-select>
                        </md-input-container>
                    </div>
                    <div class="response">
                        <p ng-show="type.response.view" ng-class="type.response.class">{{type.response.value}}</p>
                    </div>
                    <div class="title" ng-show="fromBank.view">
                        <p><span class="required">* </span>From Bank</p>
                    </div>
                    <div class="data" ng-show="fromBank.view">
                        <md-input-container>
                            <md-select
                                    ng-change="checkFromBank(); loadBankAccount('fromBankAccount', fromBank.selected.id)"
                                    ng-model="fromBank.selected" placeholder="From Bank">
                                <md-option ng-repeat="option in fromBank.option" ng-value="option">
                                    {{option.name}}
                                </md-option>
                            </md-select>
                        </md-input-container>
                    </div>
                    <div class="response" ng-show="fromBank.view">
                        <p ng-show="fromBank.response.view" ng-class="fromBank.response.class">
                            {{fromBank.response.value}}</p>
                    </div>
                    <div class="title" ng-show="fromBankAccount.view">
                        <p><span class="required">* </span>From Bank Account</p>
                    </div>
                    <div class="data" ng-show="fromBankAccount.view">
                        <md-input-container>
                            <md-select ng-change="checkFromBankAccount()" ng-model="fromBankAccount.selected"
                                       placeholder="From Bank Account">
                                <md-option ng-repeat="option in fromBankAccount.option" ng-value="option">
                                    {{option.name}}
                                </md-option>
                            </md-select>
                        </md-input-container>
                    </div>
                    <div class="response" ng-show="fromBankAccount.view">
                        <p ng-show="fromBankAccount.response.view" ng-class="fromBankAccount.response.class">
                            {{fromBankAccount.response.value}}</p>
                    </div>
                    <div class="title" ng-show="toBank.view">
                        <p><span class="required">* </span>To Bank</p>
                    </div>
                    <div class="data" ng-show="toBank.view">
                        <md-input-container>
                            <md-select ng-change="checkToBank(); loadBankAccount('toBankAccount', toBank.selected.id)"
                                       ng-model="toBank.selected" placeholder="To Bank">
                                <md-option ng-repeat="option in toBank.option" ng-value="option">
                                    {{option.name}}
                                </md-option>
                            </md-select>
                        </md-input-container>
                    </div>
                    <div class="response" ng-show="toBank.view">
                        <p ng-show="toBank.response.view" ng-class="toBank.response.class">{{toBank.response.value}}</p>
                    </div>
                    <div class="title" ng-show="toBankAccount.view">
                        <p><span class="required">* </span>To Bank Account</p>
                    </div>
                    <div class="data" ng-show="toBankAccount.view">
                        <md-input-container>
                            <md-select ng-change="checkToBankAccount()" ng-model="toBankAccount.selected"
                                       placeholder="To Bank Account">
                                <md-option ng-repeat="option in toBankAccount.option" ng-value="option">
                                    {{option.name}}
                                </md-option>
                            </md-select>
                        </md-input-container>
                    </div>
                    <div class="response" ng-show="toBankAccount.view">
                        <p ng-show="toBankAccount.response.view" ng-class="toBankAccount.response.class">
                            {{toBankAccount.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required">* </span>Amount</p>
                    </div>
                    <div class="data">
                        <input name="transaction-amount" type="text" placeholder="Amount" ng-keyup="checkAmount()"
                               ng-model="amount.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="amount.response.view" ng-class="amount.response.class">{{amount.response.value}}</p>
                    </div>
                    <div class="title file">
                        <p><span class="required"></span>File</p>
                    </div>
                    <div class="data">
                        <input class="game-transaction-file" name="transaction-file" type="file" file-input="files"/>
                        <div class="file-list" ng-if="file.upload.result">
                            <transaction-file-preview></transaction-file-preview>
                        </div>
                        <div class="upload-file" ng-click="forceUpload()"><i
                                class="cloud-white square-15 margin-right-5"></i>Upload
                        </div>
                    </div>
                    <div class="response">
                        <p ng-show="file.response.view" ng-class="file.response.class">{{file.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Description</p>
                    </div>
                    <div class="data">
                        <textarea class="data" name="transaction-description" placeholder="Description"
                                  ng-model="description.value"></textarea>
                    </div>
                    <div class="response"></div>
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
                        <input name="transaction-created-date" type="text" placeholder="Created Date" readonly
                               ng-model="createdDate.value"/>
                    </div>
                    <div class="response" ng-show="createdDate.view"></div>
                    <div class="title" ng-show="modifiedDate.view">
                        <p><span class="required"></span>Modified Date</p>
                    </div>
                    <div class="data" ng-show="modifiedDate.view">
                        <input name="transaction-modified-date" type="text" placeholder="Modified Date" readonly
                               ng-model="modifiedDate.value"/>
                    </div>
                    <div class="response" ng-show="modifiedDate.view"></div>
                </div>
            </div>
            <div class="button">
                <c:choose>
                    <c:when test="${!empty entry._id}">
                        <button class="edit" name="transaction-edit" ng-click="edit($event)"><i
                                class="pencil-white square-15 margin-right-5"></i>Edit
                        </button>
                    </c:when>
                    <c:otherwise>
                        <button class="add" name="transaction-insert" ng-click="insert($event)"><i
                                class="plus-white square-15 margin-right-5"></i>Add
                        </button>
                    </c:otherwise>
                </c:choose>
            </div>
        </form>
    </div>
</div>
<%@ include file="footer.jsp" %>
