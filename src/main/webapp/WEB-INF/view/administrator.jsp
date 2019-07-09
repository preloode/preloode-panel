<%@ include file="head.jsp" %>
<%@ include file="header.jsp" %>
<div id="content" ng-controller="administrator">
    <div id="popup" ng-show="popup.view">
        <div class="wrapper" ng-show="popup.view">
            <div class="close">
                <i class="remove-white square-15" ng-click="closePopup()"></i>
            </div>
            <div class="popup" ng-scrollbar rebuild-on-resize rebuild-on="rebuild:scrollbar">
                <administrator-detail ng-if="popup.administrator"></administrator-detail>
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
                <p>Administrator</p>
                <div class="clearfix"></div>
            </div>
            <div class="action">
                <a class="add" href="${url.base}/administrator/entry/"><i
                        class="plus-white square-15 margin-right-5"></i>Add New</a>
            </div>
        </div>
        <div class="filter">
            <form class="filter" method="POST" action="">
                <input class="id" name="administrator-filter-id" type="text" placeholder="ID"
                       ng-model="filter.id.value"/>
                <input name="administrator-filter-username" type="text" placeholder="Username"
                       ng-model="filter.username.value"/>
                <input name="administrator-filter-first-name" type="text" placeholder="First Name"
                       ng-model="filter.firstName.value"/>
                <input name="administrator-filter-middle-name" type="text" placeholder="Middle Name"
                       ng-model="filter.middleName.value"/>
                <input name="administrator-filter-last-name" type="text" placeholder="Last Name"
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
                    <md-select ng-model="filter.role.selected" placeholder="Role">
                        <md-option ng-repeat="option in filter.role.option" ng-value="option">
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
                <input class="date-range-picker" name="administrator-filter-created-timestamp" type="text"
                       placeholder="Created Date Range" ng-model="filter.createdDate.value"/>
                <button class="filter" name="administrator-filter" ng-click="filterPagination($event)"><i
                        class="filter-white square-15 margin-right-5"></i>Filter
                </button>
                <button class="remove-filter" name="administrator-remove-filter"
                        ng-click="removeFilterPagination($event)"><i class="refresh-white square-15 margin-right-5"></i>Remove
                    Filter
                </button>
                <div class="clearfix"></div>
            </form>
        </div>
        <div class="content">
            <form class="page-entry" method="POST" action="">
                <p>Page Entry</p>
                <input name="administrator-page-entry" type="text" placeholder="Page" ng-model="site.pagination"/>
                <button name="administrator-page" ng-click="setPagination($event)"><i
                        class="cloud-white square-15 margin-right-5"></i>Set Page
                </button>
            </form>
            <table class="data-list">
                <tr>
                    <th class="index"><p>#</p></th>
                    <th><p>Username</p></th>
                    <th><p>Name</p></th>
                    <th><p>Gender</p></th>
                    <th><p>Role</p></th>
                    <th><p>Status</p></th>
                    <th><p>Last Modified Date</p></th>
                    <th class="action"><p>Action</p></th>
                </tr>
                <c:forEach items="${pagination}" var="pagination" varStatus="status">
                    <c:if test="${pagination.username != 'preloode'}">
                        <tr class="${pagination._id}" ng-dblclick="loadDetail('${pagination._id}')">
                            <td><p>${page + status.index}</p></td>
                            <td><p>${pagination.username}</p></td>
                            <td><p>${pagination.name.first}
                                <c:if test="${!empty pagination.name.middle}"> ${pagination.name.middle}</c:if>
                                <c:if test="${!empty pagination.name.last}"> ${pagination.name.last}</c:if></p></td>
                            <td><p>${pagination.gender}</p></td>
                            <td><p>${pagination.role.name}</p></td>
                            <td><p>${pagination.status}</p></td>
                            <td><p><fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss"
                                                   value="${pagination.modified.timestamp}"/></p></td>
                            <td class="action">
                                <div>
                                    <a href="${pageContext.request.contextPath}/administrator/entry/${pagination._id}/"><i
                                            class="pencil-white square-15"></i></a>
                                    <form method="POST" action="">
                                        <button class="delete" name="delete"
                                                ng-click="delete('${pagination._id}', $event)"><i
                                                class="trash-white square-15"></i></button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    </c:if>
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
