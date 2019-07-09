<%@ include file="head.jsp" %>
<%@ include file="header.jsp" %>
<div id="content" ng-controller="memberGroup">
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
                <p><a href="${url.base}/member/">Member</a><i class="next-white square-10 margin-left-5"></i></p>
                <p><a href="${url.base}/member/group/">Group</a><i class="next-white square-10 margin-left-5"></i></p>
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
                        <input name="member-group-name" type="text" placeholder="Name" ng-keyup="checkName()"
                               ng-model="name.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="name.response.view" ng-class="name.response.class">{{name.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Sequence</p>
                    </div>
                    <div class="data">
                        <input name="member-group-sequence" type="text" placeholder="Sequence"
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
                        <input name="member-group-created-date" type="text" placeholder="Created Date" readonly
                               ng-model="createdDate.value"/>
                    </div>
                    <div class="response" ng-show="createdDate.view"></div>
                    <div class="title" ng-show="modifiedDate.view">
                        <p><span class="required"></span>Modified Date</p>
                    </div>
                    <div class="data" ng-show="modifiedDate.view">
                        <input name="member-group-modified-date" type="text" placeholder="Modified Date" readonly
                               ng-model="modifiedDate.value"/>
                    </div>
                    <div class="response" ng-show="modifiedDate.view"></div>
                </div>
                <p class="accordion-navigation" data-index="2">Bank Account<span><i
                        class="plus-white square-10"></i></span></p>
                <div class="accordion-content" data-index="2">
                    <div class="data-entry">
                        <div class="title">
                            <p><span class="required">* </span>Bank</p>
                        </div>
                        <div class="data">
                            <md-input-container>
                                <md-select ng-change="checkPaymentBank(); loadPaymentBankAccount(bank.selected.id)"
                                           ng-model="paymentBank.selected" placeholder="Bank">
                                    <md-option ng-repeat="option in paymentBank.option" ng-value="option">
                                        {{option.name}}
                                    </md-option>
                                </md-select>
                            </md-input-container>
                        </div>
                        <div class="response">
                            <p ng-show="paymentBank.response.view" ng-class="paymentBank.response.class">
                                {{paymentBank.response.value}}</p>
                        </div>
                        <div class="title">
                            <p><span class="required">* </span>Bank Account</p>
                        </div>
                        <div class="data">
                            <md-input-container>
                                <md-select ng-change="checkPaymentBankAccount()" ng-model="paymentBankAccount.selected"
                                           placeholder="Bank Account">
                                    <md-option ng-repeat="option in status.option" ng-value="option">
                                        {{option.name}}
                                    </md-option>
                                </md-select>
                            </md-input-container>
                        </div>
                        <div class="response">
                            <p ng-show="paymentBankAccount.response.view" ng-class="paymentBankAccount.response.class">
                                {{paymentBankAccount.response.value}}</p>
                        </div>
                    </div>
                    <button class="add" name="member-group-payment-bank-account-insert"
                            ng-click="insertPaymentBankAccount($event)"><i
                            class="plus-white square-15 margin-right-5"></i>Add Bank Account
                    </button>
                    <div class="data-table">
                        <div class="bank-account" ng-if="!listPaymentBankAccount.view"><p>You haven't added bank account
                            yet</p></div>
                        <table class="bank-account" ng-if="listPaymentBankAccount.view">
                            <tr>
                                <th class="index"><p>#</p></th>
                                <th><p>Bank Name</p></th>
                                <th><p>Bank Account Number</p></th>
                                <th><p>Bank Account Name</p></th>
                                <th class="action"><p>Action</p></th>
                            </tr>
                            <tr ng-repeat="listPaymentBankAccountValue in listPaymentBankAccount.value.account.id">
                                <td><p>{{$index + 1}}</p></td>
                                <td><p>{{listPaymentBankAccount.value.name[$index]}}</p></td>
                                <td><p>{{listPaymentBankAccount.value.account.number[$index]}}</p></td>
                                <td><p>{{listPaymentBankAccount.value.account.name[$index]}}</p></td>
                                <td>
                                    <button class="delete" name="member-group-payment-bank-account-delete"
                                            ng-click="deletePaymentBankAccount($index, $event)"><i
                                            class="trash-white square-15"></i></button>
                                </td>
                            </tr>
                        </table>
                        <div class="response">
                            <p ng-show="listPaymentBankAccount.response.view"
                               ng-class="listPaymentBankAccount.response.class">
                                {{listPaymentBankAccount.response.value}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="button">
                <c:choose>
                    <c:when test="${!empty entry._id}">
                        <button class="edit" name="member-group-edit" ng-click="edit($event)"><i
                                class="pencil-white square-15 margin-right-5"></i>Edit
                        </button>
                    </c:when>
                    <c:otherwise>
                        <button class="add" name="member-group-insert" ng-click="insert($event)"><i
                                class="plus-white square-15 margin-right-5"></i>Add
                        </button>
                    </c:otherwise>
                </c:choose>
            </div>
        </form>
    </div>
</div>
<%@ include file="footer.jsp" %>
