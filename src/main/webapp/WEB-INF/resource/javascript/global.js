/* Initialize preloode library */
var library = new class_library();


/* Disable debugger */
//window.alert = function() {};
//console.log = function() {};


function preventRestoreOriginalView() {

    var anchor = Array.prototype.slice.call(document.getElementsByTagName("a"));

    anchor.forEach(function (value, key) {

        value.addEventListener("click", function (event) {

            event.stopPropagation();

        });

    });

    var input = Array.prototype.slice.call(document.getElementsByTagName("input"));

    input.forEach(function (value, key) {

        value.addEventListener("click", function (event) {

            event.stopPropagation();

        });

    });

    var button = Array.prototype.slice.call(document.getElementsByTagName("button"));

    button.forEach(function (value, key) {

        value.addEventListener("click", function (event) {

            event.stopPropagation();

        });

    });

}


function restoreOriginalView(event) {

    if (event.button == 0) {

        var menu = document.getElementById("menu");

        if (menu) {

            var position = document.getElementById("menu").getBoundingClientRect();
            var width = document.getElementById("menu").clientWidth;
            var iconWidth = document.getElementById("menu-icon").getElementsByTagName("i")[0].clientWidth;
            var iconPadding = parseInt(window.getComputedStyle(document.getElementById("menu-icon"), null).getPropertyValue("padding-right")) * 2;

            if (position.left == 0) {

                document.getElementById("menu").style.transform = "translateX(-100%)";
                document.getElementById("menu-icon").style.transform = "translateX(-" + (width - (iconWidth + iconPadding)) + "px)";

                var now = new Date();
                var expires = now.setTime(now.getTime() + (365 * 24 * 60 * 60 * 1000));
                expires = new Date(expires);
                document.cookie = "preloode_main_menu=" + JSON.stringify("Closed") + "; expires=" + expires + "; path=/";

            }

        }

    }

}


function toggleChildMenu(element) {

    var index = element.parentNode.getAttribute("data-index");

    var childMenu = document.getElementsByClassName("child-menu");

    for (var i = 0; i < childMenu.length; i++) {

        if (childMenu[i].getAttribute("data-index") == index) {

            if (childMenu[i].style.height == "40px" || childMenu[i].style.height == "3px") {

                childMenu[i].style.height = 0;
                childMenu[i].style.opacity = 0;
                element.getElementsByTagName("i")[0].style.transform = "none";

            } else {

                if (!/separator/.test(childMenu[i].getAttribute("class"))) {

                    childMenu[i].style.height = "40px";
                    childMenu[i].style.opacity = 1;

                } else {

                    childMenu[i].style.height = "3px";

                }

                element.getElementsByTagName("i")[0].style.transform = "rotate(90deg)";

            }

        }

    }

}


function toggleMenu(element) {

    var cookie = "";

    var position = document.getElementById("menu").getBoundingClientRect();
    var width = document.getElementById("menu").clientWidth;
    var iconWidth = element.getElementsByTagName("i")[0].clientWidth;
    var iconPadding = parseInt(window.getComputedStyle(element, null).getPropertyValue("padding-right")) * 2;

    if (position.left < 0) {

        document.getElementById("menu").style.transform = "translateX(0)";
        element.style.transform = "translateX(0)";

        cookie = "Wide Open";

    } else {

        document.getElementById("menu").style.transform = "translateX(-100%)";
        element.style.transform = "translateX(-" + (width - (iconWidth + iconPadding)) + "px)";

        cookie = "Closed";

    }

    var now = new Date();
    var expires = now.setTime(now.getTime() + (365 * 24 * 60 * 60 * 1000));
    expires = new Date(expires);
    document.cookie = "preloode_main_menu=" + JSON.stringify(cookie) + "; expires=" + expires + "; path=/";

}


document.addEventListener("DOMContentLoaded", function (event) {


    library.layout.initialize();


    var menu = document.getElementById("menu");
    var menuIcon = document.getElementById("menu-icon");

    if (menuIcon) {

        menuIcon.addEventListener("click", function (event) {

            event.stopPropagation();

            toggleMenu(this);

        });

    }

    if (menu) {

        menu.addEventListener("click", function (event) {

            event.stopPropagation();

        });

    }


    var toggle = document.getElementsByClassName("menu-toggle");

    for (var i = 0; i < toggle.length; i++) {

        toggle[i].addEventListener("click", function () {

            toggleChildMenu(this);

        });

    }


    flatpickr(".date-picker", {
        "dateFormat": "Y-m-d",
    });

    flatpickr(".date-range-picker", {
        "dateFormat": "Y-m-d",
        "mode": "range"
    });

    flatpickr(".date-time-picker", {
        "dateFormat": "Y-m-d H:i:ss",
        "enableTime": true,
    });


    library.accordion.initialize("accordion", {
        "openOnlyOneAtATime": false
    });


    preventRestoreOriginalView();


    document.addEventListener("click", function (event) {

        restoreOriginalView(event);

    });


});


window.addEventListener("resize", function (event) {


    library.layout.initialize();


});


var app = angular.module("app", ["ngMaterial", "ngSanitize", "ngAnimate", "ngScrollbar"]);


app.config(["$httpProvider", function ($httpProvider) {


    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];


}]);


app.controller("global", ["$scope", "$timeout", "$parse", "$window", "$log", "global", function ($scope, $timeout, $parse, $window, $log, global) {


    $scope.loading = {
        "view": false
    };

    $scope.popup = {
        "administrator": false,
        "administratorRole": false,
        "bank": false,
        "bankAccount": false,
        "blog": false,
        "blogCategory": false,
        "blogStar": false,
        "gallery": false,
        "game": false,
        "gameTransaction": false,
        "gameType": false,
        "member": false,
        "memberGroup": false,
        "memberTransaction": false,
        "promotion": false,
        "settingPage": false,
        "settingSlider": false,
        "settingUrl": false,
        "transaction": false,
        "transactionRequest": false,
        "view": false
    };

    $scope.response = {
        "class": "",
        "message": "",
        "view": false
    };


    $scope.closePopup = function () {

        angular.forEach($scope.popup, function (value, key) {

            var model = $parse(key);
            model.assign($scope.popup, false);

        });

    }


    $scope.hideResponse = function () {

        $timeout(function () {

            $scope.response.view = false;
            $scope.$digest();

        }, 7000);

    }


    $scope.initializeLayout = function () {

        angular.element(document).ready(function () {

            library.accordion.initialize("accordion", {
                "openOnlyOneAtATime": false
            });

            library.layout.initialize();

        });

    }


    $scope.logout = function () {

        $scope.loading.view = true;

        var rest = {
            "data": {},
            "url": document.getElementById("config").getAttribute("data-base-url") + "/login/logout"
        };
        global.rest(rest, function (response) {

            if (response.result) {

                $window.location.reload();

            }

            $scope.loading.view = false;

        });

    }


    $scope.rebuild = function () {

        $scope.$broadcast("rebuild:scrollbar");

    }


}]);


app.provider("global", function () {


    this.$get = ["$http", function ($http) {


        var global = {};


        global.rest = function (rest, callback) {

            $http({
                "data": rest.data,
                "headers": {"Content-Type": "application/json"},
                "method": "POST",
                "url": rest.url
            }).then(function (response) {

                callback(response.data);

            });

        }


        return global;


    }];


});


app.directive("fileInput", function ($parse) {


    var fileInput = {};


    fileInput.link = function ($scope, element, attrs) {

        element.on("change", function (event) {

            $parse(attrs.fileInput).assign($scope, element[0].files);
            $scope.$digest();

            $scope.uploadFile();

        })

    }


    return fileInput;


});


app.directive("thumbnailInput", function ($parse) {


    var thumbnailInput = {};


    thumbnailInput.link = function ($scope, element, attrs) {

        element.on("change", function (event) {

            $parse(attrs.thumbnailInput).assign($scope, element[0].files);
            $scope.$digest();

            $scope.uploadThumbnail();

        })

    }


    return thumbnailInput;


});


app.filter("lowerCase", function () {


    return function (data) {

        var result = "";

        if (data != "") {

            result = data.toLowerCase();

        }

        return result;

    }


});


app.filter("lowerCaseHyphen", function () {


    return function (data) {

        var result = "";

        if (data != "") {

            result = data.toLowerCase().replace(" ", "-");

        }

        return result;

    }


});


app.filter("lowerCaseUnderscore", function () {


    return function (data) {

        var result = "";

        if (data != "") {

            result = data.toLowerCase().replace(" ", "_");

        }

        return result;

    }


});
