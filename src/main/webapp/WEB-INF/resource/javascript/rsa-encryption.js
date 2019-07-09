function initializeRsaEncryptionLayout() {

    var height = window.innerHeight - document.getElementById("footer").offsetHeight;
    var installationHeight = document.getElementsByClassName("rsa-encryption")[0].offsetHeight;

    if (installationHeight < height) {

        var padding = (height - installationHeight) / 2;
        document.getElementsByClassName("rsa-encryption")[0].style.paddingTop = padding + "px";

        height = document.getElementsByClassName("rsa-encryption")[0].offsetHeight + document.getElementById("footer").offsetHeight;

        if (window.innerHeight > height) {

            padding = window.innerHeight - height;
            document.getElementsByClassName("rsa-encryption")[0].style.paddingBottom = padding + "px";

        }

    } else {

        document.getElementsByClassName("rsa-encryption")[0].removeAttribute("style");

    }

}


document.addEventListener("DOMContentLoaded", function (event) {


    initializeRsaEncryptionLayout();


});


window.addEventListener("resize", function (event) {


    initializeRsaEncryptionLayout();


});


app.controller("rsaEncryption", ["$scope", "$log", "rsaEncryption", function ($scope, $log, rsaEncryption) {


    $scope.keySize = {
        "option": [
            {"bit": "256", "name": "256 bits"},
            {"bit": "512", "name": "512 bits"},
            {"bit": "1024", "name": "1024 bits"},
            {"bit": "2048", "name": "2048 bits"},
            {"bit": "4096", "name": "4096 bits"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        }
    };

    $scope.keySize.selected = $scope.keySize.option[0];

    $scope.privateKey = {
        "value": "",
        "view": false
    };

    $scope.publicKey = {
        "value": "",
        "view": false
    };


    $scope.generateKeyPair = function (event) {

        $scope.loading.view = true;

        var rest = {
            "data": {},
            "url": document.getElementById("config").getAttribute("data-base-url") + "/rsa-encryption/generate-key-pair"
        }
        rsaEncryption.rest(rest, function (response) {

            if (response.result) {

                $scope.privateKey.value = response.privateKey;
                $scope.privateKey.view = true;
                $scope.publicKey.value = response.publicKey;
                $scope.publicKey.view = true;

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


}]);


app.provider("rsaEncryption", function () {


    this.$get = ["$http", function ($http) {


        var rsaEncryption = {};


        rsaEncryption.rest = function (rest, callback) {

            $http({
                "data": rest.data,
                "headers": {"Content-Type": "application/json"},
                "method": "POST",
                "url": rest.url
            }).then(function (response) {

                callback(response.data);

            });

        }


        return rsaEncryption;


    }];


});
