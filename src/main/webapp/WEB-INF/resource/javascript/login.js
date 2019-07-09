function initializeLoginLayout() {

    var height = window.innerHeight - document.getElementById("footer").offsetHeight;
    var loginHeight = parseInt(document.getElementsByClassName("login")[0].offsetHeight);

    if (loginHeight < height) {

        var paddingTop = (height - loginHeight) / 2;
        document.getElementsByClassName("login")[0].style.paddingTop = paddingTop + "px";

        height = loginHeight + paddingTop + document.getElementById("footer").offsetHeight;

        if (height < window.innerHeight) {

            var paddingBottom = window.innerHeight - height;
            document.getElementsByClassName("login")[0].style.paddingBottom = paddingBottom + "px";

        }

    } else {

        document.getElementsByClassName("login")[0].removeAttribute("style");

    }

}


document.addEventListener("DOMContentLoaded", function (event) {


    initializeLoginLayout();


    document.getElementsByClassName("username")[0].onload = function () {

        document.getElementsByClassName("username")[0].focus();

    };


});


window.addEventListener("resize", function (event) {


    initializeLoginLayout();


});


app.controller("login", ["$scope", "$log", "login", function ($scope, $log, login) {


    $scope.account = {
        "file": document.getElementById("config").getAttribute("data-image-url") + "/administrator/administrator-picture.png",
        "name": "Guest"
    };

    $scope.password = {
        "value": "",
        "view": false
    };

    $scope.redirect = false;

    $scope.username = {
        "value": "",
        "view": true
    };


    $scope.backward = function () {

        $scope.response.view = false;
        $scope.username.view = true;
        $scope.password.view = false;
        $scope.account.file = document.getElementById("config").getAttribute("data-image-url") + "/administrator/administrator-picture.png";
        $scope.account.name = "Guest";

        angular.element(document).ready(function () {

            document.getElementsByClassName("username")[0].focus();

        });

    }


    $scope.checkUsername = function (event) {

        if (event.which == 1 || event.which == 13) {

            $scope.loading.view = true;

            var rest = {
                "data": {
                    "username": $scope.username.value
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/login/check-username"
            }
            login.rest(rest, function (response) {

                if (response.result) {

                    $scope.response.view = false;
                    $scope.username.view = false;
                    $scope.password.view = true;
                    $scope.account.file = document.getElementById("config").getAttribute("data-image-url") + "/administrator/" + response.file;
                    $scope.account.name = response.name;

                    angular.element(document).ready(function () {

                        document.getElementsByClassName("password")[0].focus();

                    });

                } else {

                    $scope.response.class = "error";
                    $scope.response.message = response.response;
                    $scope.response.view = true;

                }

                $scope.loading.view = false;

                $scope.hideResponse();

            });

            event.preventDefault();

        }

    }


    $scope.checkPassword = function (event) {

        if (event.which == 1 || event.which == 13) {

            $scope.loading.view = true;

            var rest = {
                "data": {
                    "password": library.rsaEncryption.encrypt($scope.password.value)
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/login/check-password"
            }
            login.rest(rest, function (response) {

                if (response.result) {

                    $scope.redirect = true;

                    document.getElementsByTagName("form")[0].submit();

                } else {

                    $scope.response.class = "error";
                    $scope.response.message = response.response;
                    $scope.response.view = true;

                }

                $scope.loading.view = false;

                $scope.hideResponse();

            });

            if (!$scope.redirect) {

                event.preventDefault();

            }

        }

    }


}]);


app.provider("login", function () {


    this.$get = ["$http", function ($http) {


        var login = {};


        login.rest = function (rest, callback) {

            $http({
                "data": rest.data,
                "headers": {"Content-Type": "application/json"},
                "method": "POST",
                "url": rest.url
            }).then(function (response) {

                callback(response.data);

            });

        }


        return login;


    }];


});
