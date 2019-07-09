document.addEventListener("DOMContentLoaded", function (event) {


    tinymce.init({
        "branding": false,
        "convert_urls": true,
        "height": 300,
        "images_upload_url": document.getElementById("config").getAttribute("data-base-url") + "/promotion/tinymce-upload",
        "image_advtab": true,
        "plugins": "preview searchreplace autolink directionality visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern",
        "relative_urls": false,
        "remove_script_host": false,
        "selector": "#tinymce-1",
        "toolbar1": "formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat"
    });


});


app.controller("promotion", ["$scope", "$window", "$log", "promotion", function ($scope, $window, $log, promotion) {


    $scope.amount = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": "",
        "view": false
    };

    $scope.cap = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.createdDate = {
        "value": "",
        "view": false
    };

    $scope.description = {
        "value": ""
    };

    $scope.file = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "upload": {
            "file": "",
            "result": false
        },
        "value": ""
    };

    $scope.filter = {
        "createdDate": {
            value: ""
        },
        "id": {
            value: ""
        },
        "name": {
            value: ""
        },
        "game": {
            "option": [
                {"id": "", "name": "Game"}
            ],
            "value": ""
        },
        "release": {
            "option": [
                {"id": "", "name": "Release"},
                {"name": "Deposit"},
                {"name": "First Deposit"},
                {"name": "Next Deposit"},
                {"name": "No Deposit"},
                {"name": "Daily"},
                {"name": "Weekly"},
                {"name": "Monthly"},
                {"name": "Yearly"}
            ],
            "value": ""
        },
        "status": {
            "option": [
                {"name": "Status"},
                {"name": "Active"},
                {"name": "Inactive"}
            ],
            "value": ""
        },
        "type": {
            "option": [
                {"id": "", "name": "Type"},
                {"name": "Percentage"},
                {"name": "Fix Amount"}
            ],
            "value": ""
        }
    };

    $scope.filter.game.selected = $scope.filter.game.option[0];

    $scope.filter.release.selected = $scope.filter.release.option[0];

    $scope.filter.status.selected = $scope.filter.status.option[0];

    $scope.filter.type.selected = $scope.filter.type.option[0];

    $scope.game = {
        "option": [],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": {
            "id": "",
            "name": "",
            "type": {
                "id": "",
                "name": ""
            }
        }
    };

    $scope.id = {
        "value": ""
    };

    $scope.minimumDeposit = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.modifiedDate = {
        "value": "",
        "view": false
    };

    $scope.name = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.percentage = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": "",
        "view": false
    };

    $scope.release = {
        "option": [
            {"name": "Release"},
            {"name": "Deposit"},
            {"name": "First Deposit"},
            {"name": "Next Deposit"},
            {"name": "No Deposit"},
            {"name": "Daily"},
            {"name": "Weekly"},
            {"name": "Monthly"},
            {"name": "Yearly"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.release.selected = $scope.release.option[0];

    $scope.rollover = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.sequence = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.site = {
        "page": "",
        "pagination": ""
    };

    $scope.status = {
        "option": [
            {"name": "Status"},
            {"name": "Active"},
            {"name": "Inactive"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.status.selected = $scope.status.option[0];

    $scope.type = {
        "option": [
            {"name": "Type"},
            {"name": "Percentage"},
            {"name": "Fix Amount"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.type.selected = $scope.type.option[0];

    $scope.valid = {
        "amount": false,
        "cap": false,
        "file": false,
        "game": false,
        "minimumDeposit": false,
        "name": false,
        "percentage": false,
        "release": false,
        "rollover": false,
        "sequence": false,
        "status": false,
        "type": false,
        "winlose": false
    };

    $scope.winlose = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };


    $scope.checkAmount = function () {

        if (!$scope.amount.value.match(/^[0-9,.]+$/)) {

            $scope.amount.response.value = "Please enter decimal";
            $scope.amount.response.class = "error";
            $scope.amount.response.view = true;
            $scope.valid.amount = false;

        } else {

            $scope.amount.response.view = false;
            $scope.valid.amount = true;

        }

        $scope.amount.value = library.numeral.initializeSeparator($scope.amount.value);

    }


    $scope.checkbox = function (id, status) {

        angular.forEach($scope.game.option, function (value, key) {

            if (value.id == id) {

                if (status) {

                    $scope.game.option[key].status = false;

                } else {

                    $scope.game.option[key].status = true;

                }

            }

        });

    }


    $scope.checkCap = function () {

        if ($scope.cap.value != "") {

            if (!$scope.cap.value.match(/^[0-9,.]+$/)) {

                $scope.cap.response.value = "Please enter decimal cap";
                $scope.cap.response.class = "error";
                $scope.cap.response.view = true;
                $scope.valid.cap = false;

            } else {

                $scope.cap.response.view = false;
                $scope.valid.cap = true;

            }

        } else {

            $scope.cap.response.view = false;
            $scope.valid.cap = true;

        }

        $scope.cap.value = library.numeral.initializeSeparator($scope.cap.value);

    }


    $scope.checkData = function () {

        if ($scope.type.selected.name == "Fix Amount") {

            $scope.checkAmount();

            $scope.valid.percentage = true;

        } else if ($scope.type.selected.name == "Percentage") {

            $scope.checkPercentage();

            $scope.valid.amount = true;

        } else {

            $scope.valid.amount = true;
            $scope.valid.percentage = true;

        }

        $scope.checkCap();

        $scope.checkFile();

        $scope.checkGame();

        $scope.checkMinimumDeposit();

        $scope.checkName();

        $scope.checkRelease();

        $scope.checkRollover();

        $scope.checkSequence();

        $scope.checkStatus();

        $scope.checkType();

        $scope.checkWinlose();

    }


    $scope.checkFile = function () {

        if ($scope.file.value != "") {

            if ($scope.file.value.length > 255) {

                $scope.file.response.value = "Please enter maximum 255 characters";
                $scope.file.response.class = "error";
                $scope.file.response.view = true;
                $scope.valid.file = false;

            } else {

                $scope.file.response.view = false;
                $scope.valid.file = true;

            }

        } else {

            $scope.file.response.view = false;
            $scope.valid.file = true;

        }

    }


    $scope.checkGame = function () {

        if ($scope.game.value.id == "") {

            $scope.game.response.value = "Please select at least 1 promotion game";
            $scope.game.response.class = "error";
            $scope.game.response.view = true;
            $scope.valid.game = false;

        } else {

            $scope.game.response.view = false;
            $scope.valid.game = true;

        }

    }


    $scope.checkMinimumDeposit = function () {

        if ($scope.minimumDeposit.value != "") {

            if (!$scope.minimumDeposit.value.match(/^[0-9,.]+$/)) {

                $scope.minimumDeposit.response.value = "Please enter decimal minimum deposit";
                $scope.minimumDeposit.response.class = "error";
                $scope.minimumDeposit.response.view = true;
                $scope.valid.minimumDeposit = false;

            } else {

                $scope.minimumDeposit.response.view = false;
                $scope.valid.minimumDeposit = true;

            }

        } else {

            $scope.minimumDeposit.response.view = false;
            $scope.valid.minimumDeposit = true;

        }

        $scope.minimumDeposit.value = library.numeral.initializeSeparator($scope.minimumDeposit.value);

    }


    $scope.checkName = function () {

        if ($scope.name.value.length < 2 || $scope.name.value.length > 100) {

            $scope.name.response.value = "Please enter between 2 - 100 characters";
            $scope.name.response.class = "error";
            $scope.name.response.view = true;
            $scope.valid.name = false;

        } else {

            $scope.name.response.view = false;
            $scope.valid.name = true;

        }

        $scope.name.value = $scope.name.value.trim();

    }


    $scope.checkPercentage = function () {

        if (!$scope.percentage.value.match(/^[0-9,.]+$/)) {

            $scope.percentage.response.value = "Please enter decimal percentage";
            $scope.percentage.response.class = "error";
            $scope.percentage.response.view = true;
            $scope.valid.percentage = false;

        } else {

            $scope.percentage.response.view = false;
            $scope.valid.percentage = true;

        }

        $scope.percentage.value = library.numeral.initializeSeparator($scope.percentage.value);

    }


    $scope.checkRelease = function () {

        if ($scope.release.selected.name == "Release") {

            $scope.release.response.value = "Please select promotion release";
            $scope.release.response.class = "error";
            $scope.release.response.view = true;
            $scope.valid.release = false;

        } else {

            $scope.release.response.view = false;
            $scope.valid.release = true;

        }

    }


    $scope.checkRollover = function () {

        if ($scope.rollover.value != "") {

            if (!$scope.rollover.value.match(/^[0-9,.]+$/)) {

                $scope.rollover.response.value = "Please enter decimal rollover";
                $scope.rollover.response.class = "error";
                $scope.rollover.response.view = true;
                $scope.valid.rollover = false;

            } else {

                $scope.rollover.response.view = false;
                $scope.valid.rollover = true;

            }

        } else {

            $scope.rollover.response.view = false;
            $scope.valid.rollover = true;

        }

        $scope.rollover.value = library.numeral.initializeSeparator($scope.rollover.value);

    }


    $scope.checkSequence = function () {

        if ($scope.sequence.value != "") {

            if (!$scope.sequence.value.match(/^[0-9,]+$/)) {

                $scope.sequence.response.value = "Please enter only number";
                $scope.sequence.response.class = "error";
                $scope.sequence.response.view = true;
                $scope.valid.sequence = false;

            } else {

                $scope.sequence.response.view = false;
                $scope.valid.sequence = true;

            }

        } else {

            $scope.sequence.response.view = false;
            $scope.valid.sequence = true;

        }

        $scope.sequence.value = library.numeral.initializeSeparator($scope.sequence.value);

    }


    $scope.checkStatus = function () {

        if ($scope.status.selected.name == "Status") {

            $scope.status.response.value = "Please select promotion status";
            $scope.status.response.class = "error";
            $scope.status.response.view = true;
            $scope.valid.status = false;

        } else {

            $scope.status.response.view = false;
            $scope.valid.status = true;

        }

    }


    $scope.checkType = function () {

        if ($scope.type.selected.name == "Type") {

            $scope.type.response.value = "Please select promotion type";
            $scope.type.response.class = "error";
            $scope.type.response.view = true;
            $scope.valid.type = false;

        } else {

            if ($scope.type.selected.name == "Fix Amount") {

                $scope.amount.view = true;
                $scope.percentage.view = false;

            } else {

                $scope.amount.view = false;
                $scope.percentage.view = true;

            }

            $scope.type.response.view = false;
            $scope.valid.type = true;

        }

    }


    $scope.checkWinlose = function () {

        if ($scope.winlose.value != "") {

            if (!$scope.winlose.value.match(/^[0-9,.]+$/)) {

                $scope.winlose.response.value = "Please enter decimal winlose";
                $scope.winlose.response.class = "error";
                $scope.winlose.response.view = true;
                $scope.valid.winlose = false;

            } else {

                $scope.winlose.response.view = false;
                $scope.valid.winlose = true;

            }

        } else {

            $scope.winlose.response.view = false;
            $scope.valid.winlose = true;

        }

        $scope.winlose.value = library.numeral.initializeSeparator($scope.winlose.value);

    }


    $scope.delete = function (id, event) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "id": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/promotion/delete"
        };
        promotion.rest(rest, function (response) {

            if (response.result) {

                $scope.response.class = "success";

                document.getElementsByClassName(id)[0].remove();

            } else {

                $scope.response.class = "error";

            }

            $scope.loading.view = false;

            $scope.response.message = response.response;
            $scope.response.view = true;

            $scope.hideResponse();

        });

        event.preventDefault();

    }


    $scope.edit = function (event) {

        $scope.initializeGame();

        $scope.checkData();

        var valid = true;

        angular.forEach($scope.valid, function (value, key) {

            if (!value) {

                valid = false;

                return false;

            }

        });

        if (valid) {

            $scope.loading.view = true;

            var rest = {
                "data": {
                    "amount": $scope.amount.value,
                    "cap": $scope.cap.value,
                    "description": tinyMCE.get("tinymce-1").getContent(),
                    "file": $scope.file.value,
                    "game": {
                        "id": $scope.game.value.id,
                        "name": $scope.game.value.name,
                        "type": {
                            "id": $scope.game.value.type.id,
                            "name": $scope.game.value.type.name
                        }
                    },
                    "id": $scope.id.value,
                    "minimum_deposit": $scope.minimumDeposit.value,
                    "name": $scope.name.value,
                    "percentage": $scope.percentage.value,
                    "release": $scope.release.selected.name,
                    "rollover": $scope.rollover.value,
                    "sequence": $scope.sequence.value,
                    "status": $scope.status.selected.name,
                    "type": $scope.type.selected.name,
                    "winlose": $scope.winlose.value
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/promotion/update"
            };
            promotion.rest(rest, function (response) {

                if (response.result) {

                    $scope.response.class = "success";

                } else {

                    $scope.response.class = "error";

                }

                $scope.loading.view = false;

                $scope.response.message = response.response;
                $scope.response.view = true;

                $scope.hideResponse();

            });

        } else {

            $scope.response.class = "error";
            $scope.response.message = "Please enter a valid data";
            $scope.response.view = true;

            $scope.hideResponse();

        }

        event.preventDefault();

    }


    $scope.filterPagination = function (event) {

        $scope.loading.view = true;

        var filterCreatedDate = $scope.filter.createdDate.value.split(" to ");

        if (filterCreatedDate.length < 2) {

            filterCreatedDate.push("");

        }

        var data = {
            "_id": ["equal", $scope.filter.id.value],
            "created.timestamp": ["between", "date", filterCreatedDate[0], filterCreatedDate[1]],
            "game.id": ["equal", $scope.filter.game.selected.id],
            "name": ["like", $scope.filter.name.value],
            "release": ["equal", ""],
            "status": ["equal", ""],
            "type": ["equal", ""]
        };

        if ($scope.filter.release.selected.name != "Release") {

            data["release"][1] = $scope.filter.release.selected.name;

        }

        if ($scope.filter.status.selected.name != "Status") {

            data["status"][1] = $scope.filter.status.selected.name;

        }

        if ($scope.filter.type.selected.name != "Type") {

            data["type"][1] = $scope.filter.type.selected.name;

        }

        var rest = {
            "data": data,
            "url": document.getElementById("config").getAttribute("data-base-url") + "/promotion/filter-pagination"
        };
        promotion.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/promotion/";

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


    $scope.forceUpload = function () {

        document.getElementsByClassName("promotion-file")[0].click();

    }


    $scope.goToPage = function (event) {

        if (event.which == 13) {

            $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/promotion/page-" + $scope.site.page;

        }

        event.preventDefault();

    }


    $scope.initializeData = function (id) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "id": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/promotion/initialize-data"
        }
        promotion.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("data")) {

                    $scope.cap.value = library.numeral.initializeSeparator(response.data.cap);

                    var createdTimestamp = new Date(response.data.created.timestamp);
                    $scope.createdDate.value = createdTimestamp.getFullYear() + "-" + ("0" + (createdTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + createdTimestamp.getDate()).slice(-2) + " " + ("0" + createdTimestamp.getHours()).slice(-2) + ":" + ("0" + createdTimestamp.getMinutes()).slice(-2) + ":" + ("0" + createdTimestamp.getSeconds()).slice(-2);
                    $scope.createdDate.view = true;

                    if (response.data.file != "") {

                        $scope.file.upload.file = response.data.file;
                        $scope.file.upload.result = true;
                        $scope.file.value = response.data.file;

                    }

                    $scope.id.value = response.data._id;
                    $scope.minimumDeposit.value = library.numeral.initializeSeparator(response.data.minimum_deposit);

                    var modifiedTimestamp = new Date(response.data.modified.timestamp);
                    $scope.modifiedDate.value = modifiedTimestamp.getFullYear() + "-" + ("0" + (modifiedTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + modifiedTimestamp.getDate()).slice(-2) + " " + ("0" + modifiedTimestamp.getHours()).slice(-2) + ":" + ("0" + modifiedTimestamp.getMinutes()).slice(-2) + ":" + ("0" + modifiedTimestamp.getSeconds()).slice(-2);
                    $scope.modifiedDate.view = true;

                    $scope.name.value = response.data.name;
                    $scope.rollover.value = library.numeral.initializeSeparator(response.data.rollover);
                    $scope.sequence.value = library.numeral.initializeSeparator(response.data.sequence);

                    angular.forEach($scope.release.option, function (value, key) {

                        if (value.name == response.data.release) {

                            $scope.release.selected = $scope.release.option[key];

                            return false;

                        }

                    });

                    angular.forEach($scope.status.option, function (value, key) {

                        if (value.name == response.data.status) {

                            $scope.status.selected = $scope.status.option[key];

                            return false;

                        }

                    });

                    angular.forEach($scope.type.option, function (value, key) {

                        if (value.name == response.data.type) {

                            $scope.type.selected = $scope.type.option[key];

                            if (value.name == "Fix Amount") {

                                $scope.amount.value = library.numeral.initializeSeparator(response.data.amount);
                                $scope.amount.view = true;

                            } else {

                                $scope.percentage.value = library.numeral.initializeSeparator(response.data.percentage);
                                $scope.percentage.view = true;

                            }

                            return false;

                        }

                    });

                }

                angular.forEach(response.game, function (value, key) {

                    $scope.game.option.push({
                        "id": value._id,
                        "name": value.name,
                        "status": false,
                        "typeId": value.type.id,
                        "typeName": value.type.name
                    });

                    if (response.hasOwnProperty("data")) {

                        for (var i = 0; i < response.data.game.id.length; i++) {

                            if (value._id == response.data.game.id[i]) {

                                $scope.game.option[key].status = true;

                                return false;

                            }

                        }

                    }

                });

            } else {

                $scope.response.class = "error";
                $scope.response.message = response.response;
                $scope.response.view = true;

            }

            $scope.loading.view = false;

            $scope.hideResponse();

        });

    }


    $scope.initializeGame = function () {

        $scope.game.value = {
            "id": "",
            "name": "",
            "type": {
                "id": "",
                "name": ""
            }
        };

        angular.forEach($scope.game.option, function (value, key) {

            if (value.status) {

                $scope.game.value.id += "#" + value.id;
                $scope.game.value.name += "#" + value.name;
                $scope.game.value.type.id += "#" + value.typeId;
                $scope.game.value.type.name += "#" + value.typeName;

            }

        });

        if ($scope.game.value.id != "") {

            $scope.game.value.id = $scope.game.value.id.slice(1);

        }

        if ($scope.game.value.name != "") {

            $scope.game.value.name = $scope.game.value.name.slice(1);

        }

        if ($scope.game.value.type.id != "") {

            $scope.game.value.type.id = $scope.game.value.type.id.slice(1);

        }

        if ($scope.game.value.type.name != "") {

            $scope.game.value.type.name = $scope.game.value.type.name.slice(1);

        }

    }


    $scope.initializePagination = function () {

        $scope.loading.view = true;

        var rest = {
            "data": {},
            "url": document.getElementById("config").getAttribute("data-base-url") + "/promotion/initialize-pagination"
        };
        promotion.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("filter")) {

                    $scope.filter.id.value = response.filter._id[1];
                    $scope.filter.name.value = response.filter.name[1];

                    angular.forEach($scope.filter.release.option, function (value, key) {

                        if (value.name == response.filter.release[1]) {

                            $scope.filter.release.selected = $scope.filter.release.option[key];

                            return false;

                        }

                    });

                    angular.forEach($scope.filter.status.option, function (value, key) {

                        if (value.name == response.filter.status[1]) {

                            $scope.filter.status.selected = $scope.filter.status.option[key];

                            return false;

                        }

                    });

                    angular.forEach($scope.filter.type.option, function (value, key) {

                        if (value.name == response.filter.type[1]) {

                            $scope.filter.type.selected = $scope.filter.type.option[key];

                            return false;

                        }

                    });

                    if (response.filter.created_timestamp.length > 3) {

                        if (response.filter.created_timestamp[2] != "" && response.filter.created_timestamp[3] != "") {

                            var startTimestamp = new Date(response.filter.created_timestamp[2]);
                            var endTimestamp = new Date(response.filter.created_timestamp[3]);
                            $scope.filter.createdDate.value = startTimestamp.getFullYear() + "-" + ("0" + (startTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + startTimestamp.getDate()).slice(-2) + " to " + endTimestamp.getFullYear() + "-" + ("0" + (endTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + endTimestamp.getDate()).slice(-2);

                        }

                    }

                }

                angular.forEach(response.game, function (value, key) {

                    $scope.filter.game.option.push({
                        "id": value._id,
                        "name": value.type.name + " - " + value.name
                    });

                    if (response.hasOwnProperty("filter")) {

                        if (value._id == response.filter.game_id[1]) {

                            $scope.filter.game.selected = $scope.filter.game.option[key + 1];

                        }

                    }

                });

                $scope.site.page = response.page;
                $scope.site.pagination = response.pagination;

            } else {

                $scope.response.class = "error";
                $scope.response.message = response.response;
                $scope.response.view = true;

            }

            $scope.loading.view = false;

            $scope.hideResponse();

        });

    }


    $scope.insert = function (event) {

        $scope.initializeGame();

        $scope.checkData();

        var valid = true;

        angular.forEach($scope.valid, function (value, key) {

            if (!value) {

                valid = false;

                return false;

            }

        });

        if (valid) {

            $scope.loading.view = true;

            var rest = {
                "data": {
                    "amount": $scope.amount.value,
                    "cap": $scope.cap.value,
                    "description": tinyMCE.get("tinymce-1").getContent(),
                    "file": $scope.file.value,
                    "game": {
                        "id": $scope.game.value.id,
                        "name": $scope.game.value.name,
                        "type": {
                            "id": $scope.game.value.type.id,
                            "name": $scope.game.value.type.name
                        }
                    },
                    "minimum_deposit": $scope.minimumDeposit.value,
                    "name": $scope.name.value,
                    "percentage": $scope.percentage.value,
                    "release": $scope.release.selected.name,
                    "rollover": $scope.rollover.value,
                    "sequence": $scope.sequence.value,
                    "status": $scope.status.selected.name,
                    "type": $scope.type.selected.name,
                    "winlose": $scope.winlose.value
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/promotion/insert"
            };
            promotion.rest(rest, function (response) {

                if (response.result) {

                    $scope.response.class = "success";

                } else {

                    $scope.response.class = "error";

                }

                $scope.loading.view = false;

                $scope.response.message = response.response;
                $scope.response.view = true;

                $scope.hideResponse();

            });

        } else {

            $scope.response.class = "error";
            $scope.response.message = "Please enter a valid data";
            $scope.response.view = true;

            $scope.hideResponse();

        }

        event.preventDefault();

    }


    $scope.loadDetail = function (id) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "id": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/promotion/initialize-data"
        }
        promotion.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("data")) {

                    var createdTimestamp = new Date(response.data.created.timestamp);
                    $scope.createdDate.value = createdTimestamp.getFullYear() + "-" + ("0" + (createdTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + createdTimestamp.getDate()).slice(-2) + " " + ("0" + createdTimestamp.getHours()).slice(-2) + ":" + ("0" + createdTimestamp.getMinutes()).slice(-2) + ":" + ("0" + createdTimestamp.getSeconds()).slice(-2);

                    $scope.credit.value = library.numeral.initializeSeparator(response.data.credit);
                    $scope.description.value = response.data.description;

                    if (response.data.file != "") {

                        $scope.file.upload.file = response.data.file;
                        $scope.file.upload.result = true;
                        $scope.file.value = document.getElementById("config").getAttribute("data-image-url") + "/promotion/" + response.data.file;

                    }

                    $scope.id.value = response.data._id;

                    var modifiedTimestamp = new Date(response.data.modified.timestamp);
                    $scope.modifiedDate.value = modifiedTimestamp.getFullYear() + "-" + ("0" + (modifiedTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + modifiedTimestamp.getDate()).slice(-2) + " " + ("0" + modifiedTimestamp.getHours()).slice(-2) + ":" + ("0" + modifiedTimestamp.getMinutes()).slice(-2) + ":" + ("0" + modifiedTimestamp.getSeconds()).slice(-2);

                    $scope.name.value = response.data.name;
                    $scope.sequence.value = response.data.sequence;
                    $scope.status.value = response.data.status;
                    $scope.type.value = response.data.type.name;

                }

                $scope.popup.view = true;
                $scope.popup.game = true;

                $scope.rebuild();

            } else {

                $scope.response.class = "error";
                $scope.response.message = response.response;
                $scope.response.view = true;

            }

            $scope.loading.view = false;

            $scope.hideResponse();

        });

    }


    $scope.removeFilterPagination = function (event) {

        $scope.loading.view = true;

        var rest = {
            "data": {},
            "url": document.getElementById("config").getAttribute("data-base-url") + "/promotion/remove-filter-pagination"
        };
        promotion.rest(rest, function (response) {

            if (response.result) {

                $window.location.reload();

            } else {

                $scope.response.class = "error";
                $scope.response.message = response.response;
                $scope.response.view = true;

            }

            $scope.hideResponse();

        });

        event.preventDefault();

    }


    $scope.setPagination = function (event) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "pagination": $scope.site.pagination
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/promotion/set-pagination"
        };
        promotion.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/promotion/";

            } else {

                $scope.response.class = "error";
                $scope.response.message = response.response;
                $scope.response.view = true;

            }

            $scope.hideResponse();

        });

        event.preventDefault();

    }


    $scope.uploadFile = function () {

        $scope.loading.view = true;

        var formData = new FormData();

        angular.forEach($scope.files, function (value) {

            formData.append("file", value);

        });

        var rest = {
            "data": formData,
            "url": document.getElementById("config").getAttribute("data-base-url") + "/promotion/upload-file"
        };
        promotion.restMultipart(rest, function (response) {

            if (response.result) {

                $scope.response.class = "success";
                $scope.file.value = response.file[0];
                $scope.file.upload.file = response.file[0];
                $scope.file.upload.result = true;

            } else {

                $scope.response.class = "error";

            }

            $scope.loading.view = false;

            $scope.response.message = response.response;
            $scope.response.view = true;

            $scope.hideResponse();

        });

    }


}]);


app.provider("promotion", function () {


    this.$get = ["$http", function ($http) {


        var promotion = {};


        promotion.rest = function (rest, callback) {

            $http({
                "data": rest.data,
                "headers": {"Content-Type": "application/json"},
                "method": "POST",
                "url": rest.url
            }).then(function (response) {

                callback(response.data);

            });

        }


        promotion.restMultipart = function (rest, callback) {

            $http({
                "data": rest.data,
                "headers": {"Content-Type": undefined, "Process-Data": false},
                "method": "POST",
                "transformRequest": angular.identity,
                "url": rest.url
            }).then(function (response) {

                callback(response.data);

            });

        }


        return promotion;


    }];


});


app.directive("promotionDetail", function () {


    var promotion = {};


    promotion.templateUrl = document.getElementById("config").getAttribute("data-base-url") + "/resource/html/promotion-detail-popup.html";


    return promotion;


});


app.directive("promotionFilePreview", function () {


    var promotion = {};


    promotion.template = "<img class=\"responsive\" ng-src=\"" + document.getElementById("config").getAttribute("data-image-url") + "/promotion/{{file.upload.file}}\" />";


    return promotion;


});
                