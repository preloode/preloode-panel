<%@ include file="head.jsp" %>
<div id="wrapper" ng-controller="login">
    <div id="loading" ng-show="loading.view">
        <div class="wrapper">
            <div class="circle"></div>
            <div class="circle-1"></div>
        </div>
    </div>
    <div id="response" ng-if="response.view" ng-class="response.class"><p>{{response.message}}</p></div>
    <div class="login">
        <div class="back" ng-click="backward()">
            <i class="back-white square-30 back" ng-show="password.view"></i>
        </div>
        <div class="picture">
            <img class="responsive user" ng-src="{{account.file}}"
                 alt="${config.setting.name} Administrator Profile Picture">
        </div>
        <div class="name">{{account.name}}</div>
        <form method="POST" action="">
            <div class="animation-input">
                <input class="username" name="preloode-login-username" type="text" placeholder="Username"
                       ng-show="username.view" ng-keypress="checkUsername($event)" ng-model="username.value">
                <input class="password" name="preloode-login-password" type="password" placeholder="Password"
                       ng-show="password.view" ng-keypress="checkPassword($event)" ng-model="password.value">
            </div>
            <div class="animation-button">
                <button class="next" name="next" ng-show="username.view" ng-click="checkUsername($event)">Next</button>
                <button class="login" name="login" type="submit" ng-show="password.view"
                        ng-click="checkPassword($event)">Sign In
                </button>
            </div>
        </form>
    </div>
    <%@ include file="footer.jsp" %>
