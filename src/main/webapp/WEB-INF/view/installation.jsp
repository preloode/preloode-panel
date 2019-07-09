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
        <form method="post" action="" ng-if="status == 'Installation'">
            <p class="note">To get a fresh installation please click the button below.</p>
            <button class="install" name="install" ng-click="install($event)">Install</button>
        </form>
        <form method="post" action="" ng-if="status == 'Initialize Demo Data'">
            <p class="note">To get a fresh installation please click the button below.</p>
            <button class="initialize-demo-data" name="initialize-demo-data" ng-click="initializeDemoData($event)">
                Initialize Demo Data
            </button>
            <button class="go-to-panel" name="go-to-panel" ng-click="goToPanel($event)">Go To Panel</button>
        </form>
    </div>
    <%@ include file="footer.jsp" %>
