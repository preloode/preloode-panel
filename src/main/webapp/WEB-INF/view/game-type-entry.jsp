<%@ include file="head.jsp" %>
<%@ include file="header.jsp" %>
<div id="content" ng-controller="gameType">
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
                <p><a href="${url.base}/game/">Game</a><i class="next-white square-10 margin-left-5"></i></p>
                <p><a href="${url.base}/game/type/">Type</a><i class="next-white square-10 margin-left-5"></i></p>
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
                        <input name="game-type-name" type="text" placeholder="Name" ng-keyup="checkName()"
                               ng-model="name.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="name.response.view" ng-class="name.response.class">{{name.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Description</p>
                    </div>
                    <div class="data">
                        <textarea id="tinymce-1" name="game-type-description"
                                  placeholder="Description">${entry.description}</textarea>
                    </div>
                    <div class="response"></div>
                    <div class="title">
                        <p><span class="required"></span>Sequence</p>
                    </div>
                    <div class="data">
                        <input name="game-type-sequence" type="text" placeholder="Sequence" ng-keyup="checkSequence()"
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
                        <ui-select ng-change="checkStatus()" ng-model="status.selected" theme="select2">
                            <ui-select-match>
                                <span ng-bind="$select.selected.name"></span>
                            </ui-select-match>
                            <ui-select-choices
                                    repeat="item in (status.option | filter : $select.search) track by item.name">
                                <span ng-bind="item.name"></span>
                            </ui-select-choices>
                        </ui-select>
                    </div>
                    <div class="response">
                        <p ng-show="status.response.view" ng-class="status.response.class">{{status.response.value}}</p>
                    </div>
                    <div class="title" ng-show="createdDate.view">
                        <p><span class="required"></span>Created Date</p>
                    </div>
                    <div class="data" ng-show="createdDate.view">
                        <input name="game-type-created-date" type="text" placeholder="Created Date" readonly
                               ng-model="createdDate.value"/>
                    </div>
                    <div class="response" ng-show="createdDate.view"></div>
                    <div class="title" ng-show="modifiedDate.view">
                        <p><span class="required"></span>Modified Date</p>
                    </div>
                    <div class="data" ng-show="modifiedDate.view">
                        <input name="game-type-modified-date" type="text" placeholder="Modified Date" readonly
                               ng-model="modifiedDate.value"/>
                    </div>
                    <div class="response" ng-show="modifiedDate.view"></div>
                </div>
            </div>
            <div class="button">
                <c:choose>
                    <c:when test="${!empty entry._id}">
                        <button class="edit" name="game-type-edit" ng-click="edit($event)"><i
                                class="pencil-white square-15 margin-right-5"></i>Edit
                        </button>
                    </c:when>
                    <c:otherwise>
                        <c:if test="${preloodeAccount.username == 'preloode'}">
                            <button class="add" name="game-type-insert" ng-click="insert($event)"><i
                                    class="plus-white square-15 margin-right-5"></i>Add
                            </button>
                        </c:if>
                    </c:otherwise>
                </c:choose>
            </div>
        </form>
    </div>
</div>
<%@ include file="footer.jsp" %>
