<%@ include file="head.jsp" %>
<%@ include file="header.jsp" %>
<div id="content" ng-controller="blog">
    <div id="popup" ng-show="popup.view">
        <div class="wrapper" ng-show="popup.view">
            <div class="close">
                <i class="remove-white square-15" ng-click="closePopup()"></i>
            </div>
            <div class="popup" ng-scrollbar rebuild-on-resize rebuild-on="rebuild:scrollbar">
                <blog-detail ng-if="popup.blog"></blog-detail>
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
                <p>Blog</p>
                <div class="clearfix"></div>
            </div>
            <div class="action">
                <a class="add" href="${url.base}/blog/entry/"><i class="plus-white square-15 margin-right-5"></i>Add New</a>
            </div>
        </div>
        <div class="filter">
            <form class="filter" method="POST" action="">
                <input class="id" name="blog-filter-id" type="text" placeholder="ID" ng-model="filter.id.value"/>
                <input name="blog-filter-title" type="text" placeholder="Title" ng-model="filter.title.value"/>
                <md-input-container>
                    <md-select ng-model="filter.category.selected" placeholder="Category">
                        <md-option ng-repeat="option in filter.category.option" ng-value="option">
                            <span ng-bind-html="option.icon + option.name"></span>
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
                <input class="date-range-picker" name="blog-filter-created-timestamp" type="text"
                       placeholder="Created Date Range" ng-model="filter.createdDate.value"/>
                <button class="filter" name="blog-filter" ng-click="filterPagination($event)"><i
                        class="filter-white square-15 margin-right-5"></i>Filter
                </button>
                <button class="remove-filter" name="blog-remove-filter" ng-click="removeFilterPagination($event)"><i
                        class="refresh-white square-15 margin-right-5"></i>Remove Filter
                </button>
                <div class="clearfix"></div>
            </form>
        </div>
        <div class="content">
            <form class="page-entry" method="POST" action="">
                <p>Page Entry</p>
                <input name="blog-page-entry" type="text" placeholder="Page" ng-model="site.pagination"/>
                <button name="blog-page" ng-click="setPagination($event)"><i
                        class="cloud-white square-15 margin-right-5"></i>Set Page
                </button>
                <div class="clearfix"></div>
            </form>
            <table class="data-list">
                <tr>
                    <th class="index"><p>#</p></th>
                    <th><p>Title</p></th>
                    <th><p>Category</p></th>
                    <th><p>Thumbnail</p></th>
                    <th><p>Rate</p></th>
                    <th><p>Sequence</p></th>
                    <th><p>Status</p></th>
                    <th><p>Last Modified Date</p></th>
                    <th class="action"><p>Action</p></th>
                </tr>
                <c:forEach items="${pagination}" var="pagination" varStatus="status">
                    <c:set var="category" value=""></c:set>
                    <c:forEach items="${pagination.category.name}" var="value">
                        <c:set var="category" value="${category}, ${value}"></c:set>
                    </c:forEach>
                    <tr class="${pagination._id}" ng-dblclick="loadDetail('${pagination._id}')">
                        <td><p>${page + status.index}</p></td>
                        <td><p>${pagination.title}</p></td>
                        <td><p>${category.replaceFirst(', ', '')}</p></td>
                        <td><p><c:if test="${!empty pagination.thumbnail}"><img class="responsive"
                                                                                src="${url.panel}/resource/image/blog/thumbnail/${pagination.thumbnail}"
                                                                                alt="${setting.name} Blog Thumbnail"/></c:if>
                        </p></td>
                        <td><p>${pagination.rate.result}</p></td>
                        <td><p><fmt:formatNumber type="number" value="${pagination.sequence}"/></p></td>
                        <td><p>${pagination.status}</p></td>
                        <td><p><fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss"
                                               value="${pagination.modified.timestamp}"/></p></td>
                        <td class="action">
                            <div>
                                <a href="${url.base}/blog/entry/${pagination._id}/"><i
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
