<%@ include file="head.jsp" %>
<div id="wrapper" ng-controller="rsaEncryption">
    <div id="loading" ng-show="loading.view">
        <div class="wrapper">
            <div class="circle"></div>
            <div class="circle-1"></div>
        </div>
    </div>
    <div id="response" ng-if="response.view" ng-class="response.class"><p>{{response.message}}</p></div>
    <div class="rsa-encryption">
        <form method="post" action="">
            <p class="title"><span class="required">* </span>Key Size</p>
            <ui-select ng-change="checkKeySize()" ng-model="keySize.selected" theme="select2">
                <ui-select-match>
                    <span ng-bind="$select.selected.name"></span>
                </ui-select-match>
                <ui-select-choices repeat="item in (keySize.option | filter : $select.search) track by item.bit">
                    <span ng-bind="item.name"></span>
                </ui-select-choices>
            </ui-select>
            <div class="response" ng-if="keySize.response.view" ng-class="keySize.response.class"><p>
                {{keySize.response.value}}</p></div>
            <div class="clearfix"></div>
            <button class="generate-key-pair" name="generate-key-pair" ng-click="generateKeyPair($event)">Generate Key
                Pair
            </button>
        </form>
        <div class="private-key" ng-if="privateKey.view">
            <p class="title">Private Key</p>
            <p class="data">{{privateKey.value}}</p>
            <div class="clearfix"></div>
        </div>
        <div class="public-key" ng-if="publicKey.view">
            <p class="title">Public Key</p>
            <p class="data">{{publicKey.value}}</p>
            <div class="clearfix"></div>
        </div>
    </div>
    <%@ include file="footer.jsp" %>
