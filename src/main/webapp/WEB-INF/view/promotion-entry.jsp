<%@ include file="head.jsp" %>
<%@ include file="header.jsp" %>
<div id="content" ng-controller="promotion">
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
                <p><a href="${url.base}/promotion/">Promotion</a><i class="next-white square-10 margin-left-5"></i></p>
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
                        <input name="promotion-name" type="text" placeholder="Name" ng-keyup="checkName()"
                               ng-model="name.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="name.response.view" ng-class="name.response.class">{{name.response.value}}</p>
                    </div>
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
                    <div class="title" ng-show="percentage.view">
                        <p><span class="required">* </span>Percentage</p>
                    </div>
                    <div class="data" ng-show="percentage.view">
                        <input name="promotion-percentage" type="text" placeholder="Percentage"
                               ng-keyup="checkPercentage()" ng-model="percentage.value"/>
                    </div>
                    <div class="response" ng-show="percentage.view">
                        <p ng-show="percentage.response.view" ng-class="percentage.response.class">
                            {{percentage.response.value}}</p>
                    </div>
                    <div class="title" ng-show="amount.view">
                        <p><span class="required">* </span>Amount</p>
                    </div>
                    <div class="data" ng-show="amount.view">
                        <input name="promotion-amount" type="text" placeholder="Amount" ng-keyup="checkAmount()"
                               ng-model="amount.value"/>
                    </div>
                    <div class="response" ng-show="amount.view">
                        <p ng-show="amount.response.view" ng-class="amount.response.class">{{amount.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Minimum Deposit</p>
                    </div>
                    <div class="data">
                        <input name="promotion-minimum-deposit" type="text" placeholder="Minimum Deposit"
                               ng-keyup="checkMinimumDeposit()" ng-model="minimumDeposit.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="minimumDeposit.response.view" ng-class="minimumDeposit.response.class">
                            {{minimumDeposit.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Rollover</p>
                    </div>
                    <div class="data">
                        <input name="promotion-rollover" type="text" placeholder="Rollover" ng-keyup="checkRollover()"
                               ng-model="rollover.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="rollover.response.view" ng-class="rollover.response.class">
                            {{rollover.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Winlose</p>
                    </div>
                    <div class="data">
                        <input name="promotion-winlose" type="text" placeholder="Winlose" ng-keyup="checkWinlose()"
                               ng-model="winlose.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="winlose.response.view" ng-class="winlose.response.class">
                            {{winlose.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Cap</p>
                    </div>
                    <div class="data">
                        <input name="promotion-cap" type="text" placeholder="Cap" ng-keyup="checkCap()"
                               ng-model="cap.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="cap.response.view" ng-class="cap.response.class">{{cap.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required">* </span>Game</p>
                    </div>
                    <div class="data">
                        <div class="item" ng-repeat="game in game.option">
                            <input class="data" name="promotion-game" type="checkbox" ng-checked="game.status"/>
                            <div class="checkbox" ng-click="checkbox(game.id, game.status)"><i
                                    class="check-white square-10" ng-if="game.status"></i></div>
                            <p>{{game.typeName}} - {{game.name}}</p>
                        </div>
                    </div>
                    <div class="response">
                        <p ng-show="game.response.view" ng-class="game.response.class">{{game.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required">* </span>Release</p>
                    </div>
                    <div class="data">
                        <md-input-container>
                            <md-select ng-change="checkRelease()" ng-model="release.selected" placeholder="Release">
                                <md-option ng-repeat="option in release.option" ng-value="option">
                                    {{option.name}}
                                </md-option>
                            </md-select>
                        </md-input-container>
                    </div>
                    <div class="response">
                        <p ng-show="release.response.view" ng-class="release.response.class">
                            {{release.response.value}}</p>
                    </div>
                    <div class="title file">
                        <p><span class="required"></span>File</p>
                    </div>
                    <div class="data">
                        <input class="promotion-file" name="promotion-file" type="file" file-input="files"/>
                        <div class="file-list" ng-if="file.upload.result">
                            <promotion-file-preview></promotion-file-preview>
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
                        <textarea id="tinymce-1" name="promotion-description"
                                  placeholder="Description">${entry.description}</textarea>
                    </div>
                    <div class="response"></div>
                    <div class="title">
                        <p><span class="required"></span>Sequence</p>
                    </div>
                    <div class="data">
                        <input name="promotion-sequence" type="text" placeholder="Sequence" ng-keyup="checkSequence()"
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
                        <input name="promotion-created-date" type="text" placeholder="Created Date" readonly
                               ng-model="createdDate.value"/>
                    </div>
                    <div class="response" ng-show="createdDate.view"></div>
                    <div class="title" ng-show="modifiedDate.view">
                        <p><span class="required"></span>Modified Date</p>
                    </div>
                    <div class="data" ng-show="modifiedDate.view">
                        <input name="promotion-modified-date" type="text" placeholder="Modified Date" readonly
                               ng-model="modifiedDate.value"/>
                    </div>
                    <div class="response" ng-show="modifiedDate.view"></div>
                </div>
            </div>
            <div class="button">
                <c:choose>
                    <c:when test="${!empty entry._id}">
                        <button class="edit" name="promotion-edit" ng-click="edit($event)"><i
                                class="pencil-white square-15 margin-right-5"></i>Edit
                        </button>
                    </c:when>
                    <c:otherwise>
                        <button class="add" name="promotion-insert" ng-click="insert($event)"><i
                                class="plus-white square-15 margin-right-5"></i>Add
                        </button>
                    </c:otherwise>
                </c:choose>
            </div>
        </form>
    </div>
</div>
<%@ include file="footer.jsp" %>
