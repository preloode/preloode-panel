<%@ include file="head.jsp" %>
<%@ include file="header.jsp" %>
<div id="content" ng-controller="member">
    <div id="popup" ng-show="popup.view">
        <div class="wrapper" ng-show="popup.view">
            <div class="close">
                <i class="remove-white square-15" ng-click="closePopup()"></i>
            </div>
            <div class="popup" ng-scrollbar rebuild-on-resize rebuild-on="rebuild:scrollbar">
                <member-detail ng-if="popup.member"></member-detail>
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
                <p>Member</p>
                <div class="clearfix"></div>
            </div>
            <div class="action">
                <a class="add" href="${url.base}/member/entry/"><i class="plus-white square-15 margin-right-5"></i>Add
                    New</a>
            </div>
        </div>
        <div class="filter">
            <form class="filter" method="POST" action="">
                <input class="id" name="member-filter-id" type="text" placeholder="ID" ng-model="filter.id.value"/>
                <input name="member-filter-first-name" type="text" placeholder="First Name"
                       ng-model="filter.firstName.value"/>
                <input name="member-filter-middle-name" type="text" placeholder="Middle Name"
                       ng-model="filter.middleName.value"/>
                <input name="member-filter-last-name" type="text" placeholder="Last Name"
                       ng-model="filter.lastName.value"/>
                <md-input-container>
                    <md-select ng-model="filter.gender.selected" placeholder="Gender">
                        <md-option ng-repeat="option in filter.gender.option" ng-value="option">
                            {{option.name}}
                        </md-option>
                    </md-select>
                </md-input-container>
                <md-input-container>
                    <md-select ng-model="filter.country.selected" placeholder="Country">
                        <md-option ng-repeat="option in filter.country.option" ng-value="option">
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
                    <md-select ng-model="filter.group.selected" placeholder="Group">
                        <md-option ng-repeat="option in filter.group.option" ng-value="option">
                            {{option.name}}
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
                <input name="member-filter-game-username" type="text" placeholder="Game Username"
                       ng-model="filter.gameUsername.value"/>
                <md-input-container>
                    <md-select ng-model="filter.paymentBank.selected" placeholder="Bank">
                        <md-option ng-repeat="option in filter.paymentBank.option" ng-value="option">
                            {{option.name}}
                        </md-option>
                    </md-select>
                </md-input-container>
                <input name="member-filter-payment-bank-account-name" type="text" placeholder="Bank Account Name"
                       ng-model="filter.paymentBankAccountName.value"/>
                <input name="member-filter-payment-bank-account-number" type="text" placeholder="Bank Account Number"
                       ng-model="filter.paymentBankAccountNumber.value"/>
                <md-input-container>
                    <md-select ng-model="filter.status.selected" placeholder="Status">
                        <md-option ng-repeat="option in filter.status.option" ng-value="option">
                            {{option.name}}
                        </md-option>
                    </md-select>
                </md-input-container>
                <input class="date-range-picker" name="member-filter-created-timestamp" type="text"
                       placeholder="Created Date Range" ng-model="filter.createdDate.value"/>
                <button class="filter" name="member-filter" ng-click="filterPagination($event)"><i
                        class="filter-white square-15 margin-right-5"></i>Filter
                </button>
                <button class="remove-filter" name="member-remove-filter" ng-click="removeFilterPagination($event)"><i
                        class="refresh-white square-15 margin-right-5"></i>Remove Filter
                </button>
                <div class="clearfix"></div>
            </form>
        </div>
        <div class="content">
            <form class="page-entry" method="POST" action="">
                <p>Page Entry</p>
                <input name="member-page-entry" type="text" placeholder="Page" ng-model="site.pagination"/>
                <button name="member-page" ng-click="setPagination($event)"><i
                        class="cloud-white square-15 margin-right-5"></i>Set Page
                </button>
                <div class="clearfix"></div>
            </form>
            <table class="data-list">
                <tr>
                    <th class="index"><p>#</p></th>
                    <th><p>Username</p></th>
                    <th><p>Name</p></th>
                    <th><p>Gender</p></th>
                    <th><p>Type</p></th>
                    <th><p>Group</p></th>
                    <th><p>Game</p></th>
                    <th><p>Status</p></th>
                    <th><p>Last Modified Date</p></th>
                    <th class="action"><p>Action</p></th>
                </tr>
                <c:forEach items="${pagination}" var="pagination" varStatus="status">
                    <c:set var="gameName" value=""></c:set>
                    <c:forEach items="${pagination.game.name}" var="value">
                        <c:set var="gameName" value="${gameName}, ${value}"></c:set>
                    </c:forEach>
                    <c:set var="type" value=""></c:set>
                    <c:forEach items="${pagination.type}" var="value">
                        <c:set var="type" value="${type}, ${value}"></c:set>
                    </c:forEach>
                    <tr class="${pagination._id}" ng-dblclick="loadDetail('${pagination._id}')">
                        <td><p>${page + status.index}</p></td>
                        <td><p>${pagination.username}</p></td>
                        <td><p>${pagination.name.first}
                            <c:if test="${!empty pagination.name.middle}"> ${pagination.name.middle}</c:if>
                            <c:if test="${!empty pagination.name.last}"> ${pagination.name.last}</c:if></p></td>
                        <td><p>${pagination.gender}</p></td>
                        <td><p>${type.replaceFirst(', ', '')}</p></td>
                        <td><p>${pagination.group.name}</p></td>
                        <td><p>${gameName.replaceFirst(', ', '')}</p></td>
                        <td><p>${pagination.status}</p></td>
                        <td><p><fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss"
                                               value="${pagination.modified.timestamp}"/></p></td>
                        <td class="action">
                            <div>
                                <a href="${url.base}/member/entry/${pagination._id}/"><i
                                        class="pencil-white square-15"></i></a>
                                <form method="POST" action="">
                                    <button class="delete" name="delete" ng-click="delete('${pagination._id}', $event)">
                                        <i class="trash-white square-15"></i></button>
                                </form>
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
