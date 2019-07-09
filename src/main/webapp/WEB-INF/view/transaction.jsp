<%@ include file="head.jsp" %>
<%@ include file="header.jsp" %>
<div id="content" ng-controller="transaction">
    <div id="popup" ng-show="popup.view">
        <div class="wrapper" ng-show="popup.view">
            <div class="close">
                <i class="remove-white square-15" ng-click="closePopup()"></i>
            </div>
            <div class="popup" ng-scrollbar rebuild-on-resize rebuild-on="rebuild:scrollbar">
                <transaction-detail ng-if="popup.transaction"></transaction-detail>
            </div>
        </div>
    </div>
    <div id="loading" ng-show="loading.view">
        <div class="wrapper">
            <div class="circle"></div>
            <div class="circle-1"></div>
        </div>
    </div>
    <div id="response" ng-if="response.view" ng-class="response.class"><p>{{response.message}}</p></div>
    <div class="wrapper" ng-init="initializePagination()">
        <div class="navigation">
            <div class="breadcrumb">
                <p><a href="${url.base}/">Home</a><i class="next-white square-10 margin-left-5"></i></p>
                <p>Transaction</p>
                <div class="clearfix"></div>
            </div>
            <div class="action">
                <a class="add" href="${url.base}/transaction/entry/"><i class="plus-white square-15 margin-right-5"></i>Add
                    New</a>
            </div>
        </div>
        <div class="filter">
            <form class="filter" method="POST" action="">
                <input class="id" name="transaction-filter-id" type="text" placeholder="ID" ng-model="filter.id.value"/>
                <md-input-container>
                    <md-select ng-model="filter.fromBank.selected" placeholder="From Bank">
                        <md-option ng-repeat="option in filter.fromBank.option" ng-value="option">
                            {{option.name}}
                        </md-option>
                    </md-select>
                </md-input-container>
                <md-input-container>
                    <md-select ng-model="filter.fromBankAccount.selected" placeholder="From Bank Account">
                        <md-option ng-repeat="option in filter.fromBankAccount.option" ng-value="option">
                            {{option.name}}
                        </md-option>
                    </md-select>
                </md-input-container>
                <md-input-container>
                    <md-select ng-model="filter.fromPlayer.selected" placeholder="From Player">
                        <md-option ng-repeat="option in filter.fromPlayer.option" ng-value="option">
                            {{option.username}}
                        </md-option>
                    </md-select>
                </md-input-container>
                <md-input-container>
                    <md-select ng-model="filter.toBank.selected" placeholder="To Bank">
                        <md-option ng-repeat="option in filter.toBank.option" ng-value="option">
                            {{option.name}}
                        </md-option>
                    </md-select>
                </md-input-container>
                <md-input-container>
                    <md-select ng-model="filter.toBankAccount.selected" placeholder="To Bank Account">
                        <md-option ng-repeat="option in filter.toBankAccount.option" ng-value="option">
                            {{option.name}}
                        </md-option>
                    </md-select>
                </md-input-container>
                <md-input-container>
                    <md-select ng-model="filter.toPlayer.selected" placeholder="To Player">
                        <md-option ng-repeat="option in filter.toPlayer.option" ng-value="option">
                            {{option.username}}
                        </md-option>
                    </md-select>
                </md-input-container>
                <md-input-container>
                    <md-select ng-model="filter.game.selected" placeholder="Game">
                        <md-option ng-repeat="option in filter.game.option" ng-value="option">
                            {{option.name}}
                        </md-option>
                    </md-select>
                </md-input-container>
                <md-input-container>
                    <md-select ng-model="filter.type.selected" placeholder="Type">
                        <md-option ng-repeat="option in filter.type.option" ng-value="option">
                            {{option.name}}
                        </md-option>
                    </md-select>
                </md-input-container>
                <md-input-container>
                    <md-select ng-model="filter.promotion.selected" placeholder="Promotion">
                        <md-option ng-repeat="option in filter.promotion.option" ng-value="option">
                            {{option.name}}
                        </md-option>
                    </md-select>
                </md-input-container>
                <md-input-container>
                    <md-select ng-model="filter.status.selected" placeholder="Status">
                        <md-option ng-repeat="option in filter.status.option" ng-value="option">
                            {{option.name}}
                        </md-option>
                    </md-select>
                </md-input-container>
                <input class="date-range-picker" name="transaction-filter-created-timestamp" type="text"
                       placeholder="Created Date Range" ng-model="filter.createdDate.value"/>
                <button class="filter" name="transaction-filter" ng-click="filterPagination($event)"><i
                        class="filter-white square-15 margin-right-5"></i>Filter
                </button>
                <button class="remove-filter" name="transaction-remove-filter"
                        ng-click="removeFilterPagination($event)"><i class="refresh-white square-15 margin-right-5"></i>Remove
                    Filter
                </button>
                <div class="clearfix"></div>
            </form>
        </div>
        <div class="content">
            <form class="page-entry" method="POST" action="">
                <p>Page Entry</p>
                <input name="transaction-page-entry" type="text" placeholder="Page" ng-model="site.pagination"/>
                <button name="transaction-page" ng-click="setPagination($event)"><i
                        class="cloud-white square-15 margin-right-5"></i>Set Page
                </button>
                <div class="clearfix"></div>
            </form>
            <table class="data-list">
                <tr>
                    <th class="index"><p>#</p></th>
                    <th><p>From</p></th>
                    <th><p>To</p></th>
                    <th><p>Amount</p></th>
                    <th><p>Type</p></th>
                    <th><p>Status</p></th>
                    <th><p>Last Modified Date</p></th>
                    <th class="action"><p>Action</p></th>
                </tr>
                <c:forEach items="${pagination}" var="pagination" varStatus="status">
                    <tr class="${pagination._id}" ng-dblclick="loadDetail('${pagination._id}')">
                        <td><p>${page + status.index}</p></td>
                        <td>
                            <c:choose>
                                <c:when test="${!empty pagination.from_bank.id}">
                                    <p>${pagination.from_bank.name} - ${pagination.from_bank.account.number}
                                        - ${pagination.from_bank.account.name}</p>
                                </c:when>
                                <c:otherwise>
                                    <p>---</p>
                                </c:otherwise>
                            </c:choose>
                        </td>
                        <td>
                            <c:choose>
                                <c:when test="${!empty pagination.to_bank.id}">
                                    <p>${pagination.to_bank.name} - ${pagination.to_bank.account.number}
                                        - ${pagination.to_bank.account.name}</p>
                                </c:when>
                                <c:otherwise>
                                    <p>---</p>
                                </c:otherwise>
                            </c:choose>
                        </td>
                        <td><p><fmt:formatNumber type="number" minFractionDigits="2" value="${pagination.amount}"/></p>
                        </td>
                        <td><p>${pagination.type}</p></td>
                        <td><p>${pagination.status}</p></td>
                        <td><p><fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss"
                                               value="${pagination.modified.timestamp}"/></p></td>
                        <td class="action">
                            <div>
                                <c:if test="${preloodeAccount.username == 'preloode'}">
                                    <a href="${url.base}/transaction/entry/${pagination._id}/"><i
                                            class="pencil-white square-15"></i></a>
                                    <form method="POST" action="">
                                        <button class="delete" name="delete"
                                                ng-click="delete('${pagination._id}', $event)"><i
                                                class="trash-white square-15"></i></button>
                                    </form>
                                </c:if>
                            </div>
                        </td>
                    </tr>
                </c:forEach>
            </table>
            <div class="pagination">
                ${link}
                <div class="clearfix"></div>
            </div>
        </div>
    </div>
</div>
<%@ include file="footer.jsp" %>
