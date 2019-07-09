function initializeInstallationLayout() {

    var height = window.innerHeight - document.getElementById("footer").offsetHeight;
    var installationHeight = document.getElementsByClassName("installation")[0].offsetHeight;

    if (installationHeight < height) {

        var padding = (height - installationHeight) / 2;
        document.getElementsByClassName("installation")[0].style.paddingTop = padding + "px";

        height = document.getElementsByClassName("installation")[0].offsetHeight + document.getElementById("footer").offsetHeight;

        if (window.innerHeight > height) {

            padding = window.innerHeight - height;
            document.getElementsByClassName("installation")[0].style.paddingBottom = padding + "px";

        }

    } else {

        document.getElementsByClassName("installation")[0].removeAttribute("style");

    }

}


document.addEventListener("DOMContentLoaded", function (event) {


    initializeInstallationLayout();


});


window.addEventListener("resize", function (event) {


    initializeInstallationLayout();


});


app.controller("installation", ["$scope", "$window", "$log", "installation", function ($scope, $window, $log, installation) {


    $scope.redirect = false;

    $scope.status = "Installation";


    $scope.goToPanel = function (event) {

        $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/";

        event.preventDefault();

    }


    $scope.initializeDemoData = function (event) {

        $scope.loading.view = true;

        var rest = {
            "data": {},
            "url": document.getElementById("config").getAttribute("data-base-url") + "/installation/initialize-demo-data"
        }
        installation.rest(rest, function (response) {

            if (response.result) {

                $scope.redirect = true;

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/";

            } else {

                $scope.response.class = "error";
                $scope.response.message = response.response;
                $scope.response.view = true;

                $scope.hideResponse();

            }

            $scope.loading.view = false;

        });

        if (!$scope.redirect) {

            event.preventDefault();

        }

    }


    $scope.install = function (event) {

        $scope.loading.view = true;

        var rest = {
            "data": {},
            "url": document.getElementById("config").getAttribute("data-base-url") + "/installation/install"
        }
        installation.rest(rest, function (response) {

            if (response.result) {

                $scope.status = "Initialize Demo Data";

            } else {

                $scope.response.class = "error";
                $scope.response.message = response.response;
                $scope.response.view = true;

                $scope.hideResponse();

            }

            $scope.loading.view = false;

        });

        event.preventDefault();

    }


    $scope.uninstall = function (event) {

        $scope.loading.view = true;

        var rest = {
            "data": {},
            "url": document.getElementById("config").getAttribute("data-base-url") + "/installation/uninstall"
        }
        installation.rest(rest, function (response) {

            if (response.result) {

                $scope.redirect = true;

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/installation/";

            } else {

                $scope.response.class = "error";
                $scope.response.message = response.response;
                $scope.response.view = true;

                $scope.hideResponse();

            }

            $scope.loading.view = false;

        });

        if (!$scope.redirect) {

            event.preventDefault();

        }

    }


}]);


app.provider("installation", function () {


    this.$get = ["$http", function ($http) {


        var installation = {};


        installation.rest = function (rest, callback) {

            $http({
                "data": rest.data,
                "headers": {"Content-Type": "application/json"},
                "method": "POST",
                "url": rest.url
            }).then(function (response) {

                callback(response.data);

            });

        }


        return installation;


    }];


});
