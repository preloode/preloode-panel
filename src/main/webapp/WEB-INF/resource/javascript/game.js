document.addEventListener("DOMContentLoaded", function (event) {


    tinymce.init({
        "branding": false,
        "convert_urls": true,
        "height": 300,
        "images_upload_url": document.getElementById("config").getAttribute("data-base-url") + "/game/tinymce-upload",
        "image_advtab": true,
        "plugins": "preview searchreplace autolink directionality visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern",
        "relative_urls": false,
        "remove_script_host": false,
        "selector": "#tinymce-1",
        "toolbar1": "formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat"
    });


});


app.controller("game", ["$scope", "$window", "$log", "game", function ($scope, $window, $log, game) {


    $scope.createdDate = {
        "value": "",
        "view": false
    };

    $scope.creditMain = {
        "value": ""
    };

    $scope.creditPromotion = {
        "value": ""
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
                {"id": "", "name": "Type"}
            ],
            "value": ""
        }
    };

    $scope.filter.status.selected = $scope.filter.status.option[0];

    $scope.filter.type.selected = $scope.filter.type.option[0];

    $scope.id = {
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
            {"id": "", "name": "Type"}
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
        "file": false,
        "name": false,
        "sequence": false,
        "status": false,
        "type": false
    };


    $scope.checkData = function () {

        $scope.checkFile();

        $scope.checkName();

        $scope.checkSequence();

        $scope.checkStatus();

        $scope.checkType();

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


    $scope.checkName = function () {

        if ($scope.name.value.length < 2 || $scope.name.value.length > 20) {

            $scope.name.response.value = "Please enter between 2 - 20 characters";
            $scope.name.response.class = "error";
            $scope.name.response.view = true;
            $scope.valid.name = false;

        } else {

            $scope.name.response.view = false;
            $scope.valid.name = true;

        }

        $scope.name.value = $scope.name.value.trim();

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

            $scope.status.response.value = "Please select game status";
            $scope.status.response.class = "error";
            $scope.status.response.view = true;
            $scope.valid.status = false;

        } else {

            $scope.status.response.view = false;
            $scope.valid.status = true;

        }

    }


    $scope.checkType = function () {

        if ($scope.type.selected.id == "") {

            $scope.type.response.value = "Please select game type";
            $scope.type.response.class = "error";
            $scope.type.response.view = true;
            $scope.valid.type = false;

        } else {

            $scope.type.response.view = false;
            $scope.valid.type = true;

        }

    }


    $scope.delete = function (id, event) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "id": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/game/delete"
        };
        game.rest(rest, function (response) {

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
                    "description": tinyMCE.get("tinymce-1").getContent(),
                    "file": $scope.file.value,
                    "id": $scope.id.value,
                    "name": $scope.name.value,
                    "sequence": $scope.sequence.value,
                    "status": $scope.status.selected.name,
                    "type": {
                        "id": $scope.type.selected.id,
                        "name": $scope.type.selected.name
                    }
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/game/update"
            };
            game.rest(rest, function (response) {

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
            "name": ["like", $scope.filter.name.value],
            "status": ["equal", ""],
            "type.id": ["equal", $scope.filter.type.selected.id]
        };

        if ($scope.filter.status.selected.name != "Status") {

            data["status"][1] = $scope.filter.status.selected.name;

        }

        var rest = {
            "data": data,
            "url": document.getElementById("config").getAttribute("data-base-url") + "/game/filter-pagination"
        };
        game.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/game/";

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

        document.getElementsByClassName("game-file")[0].click();

    }


    $scope.goToPage = function (event) {

        if (event.which == 13) {

            $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/game/page-" + $scope.site.page + "/";

        }

        event.preventDefault();

    }


    $scope.initializeData = function (id) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "id": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/game/initialize-data"
        }
        game.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("data")) {

                    var createdTimestamp = new Date(response.data.created.timestamp);
                    $scope.createdDate.value = createdTimestamp.getFullYear() + "-" + ("0" + (createdTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + createdTimestamp.getDate()).slice(-2) + " " + ("0" + createdTimestamp.getHours()).slice(-2) + ":" + ("0" + createdTimestamp.getMinutes()).slice(-2) + ":" + ("0" + createdTimestamp.getSeconds()).slice(-2);
                    $scope.createdDate.view = true;

                    if (response.data.file != "") {

                        $scope.file.upload.file = response.data.file;
                        $scope.file.upload.result = true;
                        $scope.file.value = response.data.file;

                    }

                    $scope.id.value = response.data._id;

                    var modifiedTimestamp = new Date(response.data.modified.timestamp);
                    $scope.modifiedDate.value = modifiedTimestamp.getFullYear() + "-" + ("0" + (modifiedTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + modifiedTimestamp.getDate()).slice(-2) + " " + ("0" + modifiedTimestamp.getHours()).slice(-2) + ":" + ("0" + modifiedTimestamp.getMinutes()).slice(-2) + ":" + ("0" + modifiedTimestamp.getSeconds()).slice(-2);
                    $scope.modifiedDate.view = true;

                    $scope.name.value = response.data.name;
                    $scope.sequence.value = response.data.sequence;

                    angular.forEach($scope.status.option, function (value, key) {

                        if (value.name == response.data.status) {

                            $scope.status.selected = $scope.status.option[key];

                            return false;

                        }

                    });

                }

                angular.forEach(response.type, function (value, key) {

                    $scope.type.option.push({
                        "id": value._id,
                        "name": value.name
                    });

                    if (response.hasOwnProperty("data")) {

                        if (value._id == response.data.type.id) {

                            $scope.type.selected = $scope.type.option[key + 1];

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


    $scope.initializePagination = function () {

        $scope.loading.view = true;

        var rest = {
            "data": {},
            "url": document.getElementById("config").getAttribute("data-base-url") + "/game/initialize-pagination"
        };
        game.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("filter")) {

                    if (response.filter.created_timestamp != "") {

                        var createdTimestamp = response.filter.created_timestamp.split(" to ");

                        if (createdTimestamp.length == 2) {

                            var startTimestamp = new Date(createdTimestamp[0]);
                            var endTimestamp = new Date(createdTimestamp[1]);
                            $scope.filter.createdDate.value = startTimestamp.getFullYear() + "-" + ("0" + (startTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + startTimestamp.getDate()).slice(-2) + " to " + endTimestamp.getFullYear() + "-" + ("0" + (endTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + endTimestamp.getDate()).slice(-2);

                        }

                    }

                    $scope.filter.id.value = response.filter.id;
                    $scope.filter.name.value = response.filter.name;

                    angular.forEach($scope.filter.status.option, function (value, key) {

                        if (value.name == response.filter.status) {

                            $scope.filter.status.selected = $scope.filter.status.option[key];

                            return false;

                        }

                    });

                }

                angular.forEach(response.type, function (value, key) {

                    $scope.filter.type.option.push({
                        "id": value._id,
                        "name": value.name
                    });

                    if (response.hasOwnProperty("filter")) {

                        if (value._id == response.filter.type_id) {

                            $scope.filter.type.selected = $scope.filter.type.option[key + 1];

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
                    "description": tinyMCE.get("tinymce-1").getContent(),
                    "file": $scope.file.value,
                    "name": $scope.name.value,
                    "sequence": $scope.sequence.value,
                    "status": $scope.status.selected.name,
                    "type": {
                        "id": $scope.type.selected.id,
                        "name": $scope.type.selected.name
                    }
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/game/insert"
            };
            game.rest(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/game/initialize-data"
        }
        game.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("data")) {

                    var createdTimestamp = new Date(response.data.created.timestamp);
                    $scope.createdDate.value = createdTimestamp.getFullYear() + "-" + ("0" + (createdTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + createdTimestamp.getDate()).slice(-2) + " " + ("0" + createdTimestamp.getHours()).slice(-2) + ":" + ("0" + createdTimestamp.getMinutes()).slice(-2) + ":" + ("0" + createdTimestamp.getSeconds()).slice(-2);

                    $scope.creditMain.value = library.numeral.initializeSeparator(response.data.credit.main);
                    $scope.creditPromotion.value = library.numeral.initializeSeparator(response.data.credit.promotion);
                    $scope.description.value = response.data.description;

                    if (response.data.file != "") {

                        $scope.file.upload.file = response.data.file;
                        $scope.file.upload.result = true;
                        $scope.file.value = document.getElementById("config").getAttribute("data-image-url") + "/game/" + response.data.file;

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/game/remove-filter-pagination"
        };
        game.rest(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/game/set-pagination"
        };
        game.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/game/";

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/game/upload-file"
        };
        game.restMultipart(rest, function (response) {

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


app.provider("game", function () {


    this.$get = ["$http", function ($http) {


        var game = {};


        game.rest = function (rest, callback) {

            $http({
                "data": rest.data,
                "headers": {"Content-Type": "application/json"},
                "method": "POST",
                "url": rest.url
            }).then(function (response) {

                callback(response.data);

            });

        }


        game.restMultipart = function (rest, callback) {

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


        return game;


    }];


});


app.directive("gameDetail", function () {


    var game = {};


    game.templateUrl = document.getElementById("config").getAttribute("data-base-url") + "/resource/html/game-detail-popup.html";


    return game;


});


app.directive("gameFilePreview", function () {


    var game = {};


    game.template = "<img class=\"responsive\" ng-src=\"" + document.getElementById("config").getAttribute("data-image-url") + "/game/{{file.upload.file}}\" />";


    return game;


});
