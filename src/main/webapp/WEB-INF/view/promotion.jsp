<%@ include file="head.jsp" %>
<%@ include file="header.jsp" %>
<div id="content" ng-controller="promotion">
    <div id="popup" ng-show="popup.view">
        <div class="wrapper" ng-show="popup.view">
            <div class="close">
                <i class="remove-white square-15" ng-click="closePopup()"></i>
            </div>
            <div class="popup" ng-scrollbar rebuild-on-resize rebuild-on="rebuild:scrollbar">
                <promotion-detail ng-if="popup.promotion"></promotion-detail>
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
                <p>Promotion</p>
                <div class="clearfix"></div>
            </div>
            <div class="action">
                <a class="add" href="${url.base}/promotion/entry/"><i class="plus-white square-15 margin-right-5"></i>Add
                    New</a>
            </div>
        </div>
        <div class="filter">
            <form class="filter" method="POST" action="">
                <input class="id" name="promotion-filter-id" type="text" placeholder="ID" ng-model="filter.id.value"/>
                <input name="promotion-filter-name" type="text" placeholder="Name" ng-model="filter.name.value"/>
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
                    <md-select ng-model="filter.release.selected" placeholder="Release">
                        <md-option ng-repeat="option in filter.release.option" ng-value="option">
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
                <input class="date-range-picker" name="promotion-filter-created-timestamp" type="text"
                       placeholder="Created Date Range" ng-model="filter.createdDate.value"/>
                <button class="filter" name="promotion-filter" ng-click="filterPagination($event)"><i
                        class="filter-white square-15 margin-right-5"></i>Filter
                </button>
                <button class="remove-filter" name="promotion-remove-filter" ng-click="removeFilterPagination($event)">
                    <i class="refresh-white square-15 margin-right-5"></i>Remove Filter
                </button>
                <div class="clearfix"></div>
            </form>
        </div>
        <div class="content">
            <form class="page-entry" method="POST" action="">
                <p>Page Entry</p>
                <input name="promotion-page-entry" type="text" placeholder="Page" ng-model="site.pagination"/>
                <button name="promotion-page" ng-click="setPagination($event)"><i
                        class="cloud-white square-15 margin-right-5"></i>Set Page
                </button>
                <div class="clearfix"></div>
            </form>
            <table class="data-list">
                <tr>
                    <th class="index"><p>#</p></th>
                    <th><p>Name</p></th>
                    <th><p>Game</p></th>
                    <th><p>Sequence</p></th>
                    <th><p>Status</p></th>
                    <th><p>Last Modified Date</p></th>
                    <th class="action"><p>Action</p></th>
                </tr>
                <c:forEach items="${pagination}" var="pagination" varStatus="status">
                    <c:set var="gameName" value=""></c:set>
                    <c:forEach items="${pagination.game.name}" var="value" varStatus="statusLevel1">
                        <c:set var="gameName"
                               value="${gameName}, ${pagination.game.type.name[statusLevel1.index]} - ${value}"></c:set>
                    </c:forEach>
                    <tr class="${pagination._id}" ng-dblclick="loadDetail('${pagination._id}')">
                        <td><p>${page + status.index}</p></td>
                        <td><p>${pagination.name}</p></td>
                        <td><p>${gameName.replaceFirst(', ', '')}</p></td>
                        <td><p><fmt:formatNumber type="number" value="${pagination.sequence}"/></p></td>
                        <td><p>${pagination.status}</p></td>
                        <td><p><fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss"
                                               value="${pagination.modified.timestamp}"/></p></td>
                        <td class="action">
                            <div>
                                <a href="${url.base}/promotion/entry/${pagination._id}/"><i
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
