<%@ include file="head.jsp" %>
<div id="wrapper" ng-controller="installation">
    <div id="loading" ng-show="loading.view">
        <div class="wrapper">
            <div class="circle"></div>
            <div class="circle-1"></div>
        </div>
    </div>
    <div id="response" ng-if="response.view" ng-class="response.class"><p>{{response.message}}</p></div>
    <div class="installation">
        <form method="post" action="">
            <p class="note">To get a fresh installation please click the button below.</p>
            <button class="install" name="uninstall" ng-click="uninstall($event)">Uninstall</button>
        </form>
    </div>
    <%@ include file="footer.jsp" %>
