app.controller("settingSlider", ["$scope", "$window", "$log", "settingSlider", function ($scope, $window, $log, settingSlider) {


    $scope.createdDate = {
        "value": "",
        "view": false
    };

    $scope.fileAlternativeText = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    }

    $scope.fileName = {
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

    $scope.fileSource = {
        "option": [
            {"name": "Source"},
            {"name": "Local Audio"},
            {"name": "Local Image"},
            {"name": "Local Video"},
            {"name": "Openload"},
            {"name": "Other"},
            {"name": "Preloode"},
            {"name": "Rapid Video"},
            {"name": "Youtube"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.fileSource.selected = $scope.fileSource.option[0];

    $scope.fileUrl = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    }

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
        "page": {
            "option": []
        },
        "status": {
            "option": [
                {"name": "Status"},
                {"name": "Active"},
                {"name": "Inactive"}
            ],
            "value": ""
        }
    };

    $scope.filter.page.selected = $scope.filter.page.option[0];

    $scope.filter.status.selected = $scope.filter.status.option[0];

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
    }

    $scope.page = {
        "option": [],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "status": "Unchecked All",
        "value": {
            "id": [],
            "name": []
        }
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

    $scope.url = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    }

    $scope.valid = {
        "fileAlternativeText": false,
        "fileName": false,
        "fileSource": false,
        "fileUrl": false,
        "name": false,
        "page": false,
        "sequence": false,
        "status": false,
        "url": false
    };


    $scope.checkData = function () {

        $scope.checkFileAlternativeText();

        $scope.checkFileName();

        $scope.checkFileSource();

        $scope.checkFileUrl();

        $scope.checkName();

        $scope.checkPage();

        $scope.checkSequence();

        $scope.checkStatus();

        $scope.checkUrl();

    }


    $scope.checkFileAlternativeText = function () {

        if ($scope.fileAlternativeText.value != "") {

            if ($scope.fileAlternativeText.value.length > 255) {

                $scope.fileAlternativeText.response.value = "Please enter maximum 255 characters";
                $scope.fileAlternativeText.response.class = "error";
                $scope.fileAlternativeText.response.view = true;
                $scope.valid.fileAlternativeText = false;

            } else {

                $scope.fileAlternativeText.response.view = false;
                $scope.valid.fileAlternativeText = true;

            }

        } else {

            $scope.fileAlternativeText.response.view = false;
            $scope.valid.fileAlternativeText = true;

        }

    }


    $scope.checkFileName = function () {

        if ($scope.fileName.value != "") {

            if ($scope.fileName.value.length > 255) {

                $scope.fileName.response.value = "Please enter maximum 255 characters";
                $scope.fileName.response.class = "error";
                $scope.fileName.response.view = true;
                $scope.valid.fileName = false;

            } else {

                $scope.fileName.response.view = false;
                $scope.valid.fileName = true;

            }

        } else {

            $scope.fileName.response.view = false;
            $scope.valid.fileName = true;

        }

    }


    $scope.checkFileSource = function () {

        if ($scope.fileName.value != "" || $scope.fileUrl.value != "") {

            if ($scope.fileSource.selected.name == "Source") {

                $scope.fileSource.response.value = "Please select setting slider file source";
                $scope.fileSource.response.class = "error";
                $scope.fileSource.response.view = true;
                $scope.valid.fileSource = false;

            } else {

                $scope.fileSource.response.view = false;
                $scope.valid.fileSource = true;

            }

        } else {

            $scope.fileSource.response.view = false;
            $scope.valid.fileSource = true;

        }

    }


    $scope.checkFileUrl = function () {

        if ($scope.fileUrl.value != "") {

            if ($scope.fileUrl.value.length > 255) {

                $scope.fileUrl.response.value = "Please enter maximum 255 characters";
                $scope.fileUrl.response.class = "error";
                $scope.fileUrl.response.view = true;
                $scope.valid.fileUrl = false;

            } else {

                $scope.fileUrl.response.view = false;
                $scope.valid.fileUrl = true;

            }

        } else {

            $scope.fileUrl.response.view = false;
            $scope.valid.fileUrl = true;

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


    $scope.checkPage = function () {

        if ($scope.page.value.id.length == 0) {

            $scope.page.response.value = "Please select at least 1 setting slider page";
            $scope.page.response.class = "error";
            $scope.page.response.view = true;
            $scope.valid.page = false;

        } else {

            $scope.page.response.view = false;
            $scope.valid.page = true;

        }

    }


    $scope.checkSequence = function () {

        if ($scope.sequence.value != "") {

            if (!$scope.sequence.value.match(/^[0-9,.]+$/)) {

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

            $scope.status.response.value = "Please select setting slider status";
            $scope.status.response.class = "error";
            $scope.status.response.view = true;
            $scope.valid.status = false;

        } else {

            $scope.status.response.view = false;
            $scope.valid.status = true;

        }

    }


    $scope.checkUrl = function () {

        if ($scope.url.value != "") {

            if ($scope.url.value.length < 2 || $scope.url.value.length > 255) {

                $scope.url.response.value = "Please enter between 2 - 255 characters";
                $scope.url.response.class = "error";
                $scope.url.response.view = true;
                $scope.valid.url = false;

            } else {

                $scope.url.response.view = false;
                $scope.valid.url = true;

            }

        } else {

            $scope.url.response.view = false;
            $scope.valid.url = true;

        }

    }


    $scope.delete = function (id, event) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "id": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/setting/slider/delete"
        };
        settingSlider.rest(rest, function (response) {

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

        $scope.initializeFileUrl();

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

            var input = $scope.initializeInput();

            var rest = {
                "data": {
                    "file": {
                        "alternative_text": $scope.fileAlternativeText.value,
                        "name": input.fileName,
                        "source": $scope.fileSource.selected.name
                    },
                    "id": $scope.id.value,
                    "name": $scope.name.value,
                    "page": $scope.page.value,
                    "sequence": $scope.sequence.value,
                    "status": $scope.status.selected.name,
                    "url": $scope.url.value
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/setting/slider/update"
            };
            settingSlider.rest(rest, function (response) {

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
            "page.id": ["equal", $scope.filter.page.selected.id],
            "status": ["equal", ""]
        };

        if ($scope.filter.status.selected.name != "Status") {

            data["status"][1] = $scope.filter.status.selected.name;

        }

        var rest = {
            "data": data,
            "url": document.getElementById("config").getAttribute("data-base-url") + "/setting/slider/filter-pagination"
        };
        settingSlider.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/setting/slider/";

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

        document.getElementsByClassName("setting-slider-file")[0].click();

    }


    $scope.goToPage = function (event) {

        if (event.which == 13) {

            $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/setting/slider/page-" + $scope.site.page;

        }

        event.preventDefault();

    }


    $scope.initializeData = function (id) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "id": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/setting/slider/initialize-data"
        }
        settingSlider.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("data")) {

                    var createdTimestamp = new Date(response.data.created.timestamp);
                    $scope.createdDate.value = createdTimestamp.getFullYear() + "-" + ("0" + (createdTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + createdTimestamp.getDate()).slice(-2) + " " + ("0" + createdTimestamp.getHours()).slice(-2) + ":" + ("0" + createdTimestamp.getMinutes()).slice(-2) + ":" + ("0" + createdTimestamp.getSeconds()).slice(-2);
                    $scope.createdDate.view = true;

                    $scope.fileAlternativeText.value = response.data.file.alternative_text;

                    if (response.data.file.name != "") {

                        if (response.data.file.source == "Local Image") {

                            $scope.fileName.upload.file = response.data.file.name;
                            $scope.fileName.upload.result = true;
                            $scope.fileName.value = response.data.file.name;

                        } else {

                            $scope.fileUrl.value = response.data.file.name;

                        }

                    }

                    $scope.id.value = response.data._id;

                    var modifiedTimestamp = new Date(response.data.modified.timestamp);
                    $scope.modifiedDate.value = modifiedTimestamp.getFullYear() + "-" + ("0" + (modifiedTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + modifiedTimestamp.getDate()).slice(-2) + " " + ("0" + modifiedTimestamp.getHours()).slice(-2) + ":" + ("0" + modifiedTimestamp.getMinutes()).slice(-2) + ":" + ("0" + modifiedTimestamp.getSeconds()).slice(-2);
                    $scope.modifiedDate.view = true;

                    $scope.name.value = response.data.name;

                    for (var i = 0; i < response.data.page.id.length; i++) {

                        $scope.page.value.id.push(response.data.page.id[i]);
                        $scope.page.value.name.push(response.data.page.name[i]);

                    }

                    $scope.sequence.value = response.data.sequence;

                    $scope.url.value = response.data.url;

                    angular.forEach($scope.fileSource.option, function (value, key) {

                        if (value.name == response.data.file.source) {

                            $scope.fileSource.selected = $scope.fileSource.option[key];

                            return false;

                        }

                    });

                    angular.forEach($scope.status.option, function (value, key) {

                        if (value.name == response.data.status) {

                            $scope.status.selected = $scope.status.option[key];

                            return false;

                        }

                    });

                }

                angular.forEach(response.page, function (value, key) {

                    $scope.page.option.push({
                        "id": value._id,
                        "name": value.name
                    });

                });

                if ($scope.page.value.id.length == 0) {

                    $scope.page.status = "Unchecked All";

                } else if ($scope.page.value.id.length > 0 && $scope.page.value.id.length < $scope.page.option.length) {

                    $scope.page.status = "Checked In Part";

                } else if ($scope.page.value.id.length == $scope.page.option.length) {

                    $scope.page.status = "Checked All";

                }

            } else {

                $scope.response.class = "error";
                $scope.response.message = response.response;
                $scope.response.view = true;

            }

            $scope.loading.view = false;

            $scope.hideResponse();

        });

    }


    $scope.initializeInput = function () {

        var result = {
            "fileName": $scope.fileName.value,
        };

        if ($scope.fileSource.selected.name == "Source") {

            result.fileName = "";

        } else if ($scope.fileSource.selected.name == "Local Audio" || $scope.fileSource.selected.name == "Local Image" || $scope.fileSource.selected.name == "Local Video") {

            result.fileName = $scope.fileName.value;

        } else {

            result.fileName = $scope.fileUrl.value;

        }

        if ($scope.fileSource.selected.name == "Openload") {

            var url = result.fileName.split("/f/");

            if (url.length > 1) {

                url = url[1].split("/");

            }

            result.fileName = url[0];

        } else if ($scope.fileSource.selected.name == "Rapid Video") {

            var url = result.fileName.split("/v/");

            if (url.length > 1) {

                url[0] = url[1];

            }

            result.fileName = url[0];

        } else if ($scope.fileSource.selected.name == "Youtube") {

            var url = result.fileName.split("/watch?v=");

            if (url.length > 1) {

                url[0] = url[1];

            }

            result.fileName = url[0];

        }

        return result;

    }


    $scope.initializePagination = function () {

        $scope.loading.view = true;

        var rest = {
            "data": {},
            "url": document.getElementById("config").getAttribute("data-base-url") + "/setting/slider/initialize-pagination"
        };
        settingSlider.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("filter")) {

                    $scope.filter.id.value = response.filter._id[1];
                    $scope.filter.name.value = response.filter.name[1];

                    angular.forEach($scope.filter.page.option, function (value, key) {

                        if (value.name == response.filter.page[1]) {

                            $scope.filter.page.selected = $scope.filter.page.option[key];

                            return false;

                        }

                    });

                    angular.forEach($scope.filter.status.option, function (value, key) {

                        if (value.name == response.filter.status[1]) {

                            $scope.filter.status.selected = $scope.filter.status.option[key];

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

                angular.forEach(response.page, function (value, key) {

                    $scope.filter.page.option.push({
                        "id": value._id,
                        "name": value.name
                    });

                    if (response.hasOwnProperty("filter")) {

                        if (value._id == response.filter.page_id[1]) {

                            $scope.filter.page.selected = $scope.filter.page.option[key + 1];

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

            var input = $scope.initializeInput();

            var rest = {
                "data": {
                    "file": {
                        "alternative_text": $scope.fileAlternativeText.value,
                        "name": input.fileName,
                        "source": $scope.fileSource.selected.name
                    },
                    "name": $scope.name.value,
                    "page": $scope.page.value,
                    "sequence": $scope.sequence.value,
                    "status": $scope.status.selected.name,
                    "url": $scope.url.value
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/setting/slider/insert"
            };
            settingSlider.rest(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/setting/slider/initialize-data"
        }
        settingSlider.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("data")) {

                    var createdTimestamp = new Date(response.data.created.timestamp);
                    $scope.createdDate.value = createdTimestamp.getFullYear() + "-" + ("0" + (createdTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + createdTimestamp.getDate()).slice(-2) + " " + ("0" + createdTimestamp.getHours()).slice(-2) + ":" + ("0" + createdTimestamp.getMinutes()).slice(-2) + ":" + ("0" + createdTimestamp.getSeconds()).slice(-2);
                    $scope.createdDate.view = true;

                    $scope.fileAlternativeText.value = response.data.file.alternative_text;

                    if (response.data.file.name != "") {

                        if (response.data.file.source == "Local Image") {

                            $scope.fileName.upload.file = response.data.file.name;
                            $scope.fileName.upload.result = true;
                            $scope.fileName.value = document.getElementById("config").getAttribute("data-base-url") + "/resource/image/setting/slider/" + response.data.file.name;

                        } else {

                            $scope.fileUrl.value = response.data.file.name;

                        }

                    }

                    $scope.fileSource.value = response.data.file.source;

                    $scope.id.value = response.data._id;

                    var modifiedTimestamp = new Date(response.data.modified.timestamp);
                    $scope.modifiedDate.value = modifiedTimestamp.getFullYear() + "-" + ("0" + (modifiedTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + modifiedTimestamp.getDate()).slice(-2) + " " + ("0" + modifiedTimestamp.getHours()).slice(-2) + ":" + ("0" + modifiedTimestamp.getMinutes()).slice(-2) + ":" + ("0" + modifiedTimestamp.getSeconds()).slice(-2);
                    $scope.modifiedDate.view = true;

                    $scope.name.value = response.data.name;

                    for (var i = 0; i < response.data.page.id.length; i++) {

                        $scope.page.value.id.push(response.data.page.id[i]);
                        $scope.page.value.name.push(response.data.page.name[i]);

                    }

                    $scope.sequence.value = response.data.sequence;
                    $scope.status.value = response.data.status;

                    $scope.url.value = response.data.url;

                }

                $scope.popup.view = true;
                $scope.popup.blog = true;

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


    $scope.pageToggleCheckbox = function (page) {

        var index = $scope.page.value.id.indexOf(page.id);

        if (index > -1) {

            $scope.page.value.id.splice(index, 1);
            $scope.page.value.name.splice(index, 1);

        } else {

            $scope.page.value.id.push(page.id);
            $scope.page.value.name.push(page.name);

        }

        if ($scope.page.value.id.length == 0) {

            $scope.page.status = "Unchecked All";

        } else if ($scope.page.value.id.length > 0 && $scope.page.value.id.length < $scope.page.option.length) {

            $scope.page.status = "Checked In Part";

        } else if ($scope.page.value.id.length == $scope.page.option.length) {

            $scope.page.status = "Checked All";

        }

    }


    $scope.pageToggleAllCheckbox = function () {

        if ($scope.page.value.id.length == $scope.page.option.length) {

            $scope.page.value.id = [];
            $scope.page.value.name = [];
            $scope.page.status = "Unchecked All";

        } else if ($scope.page.value.id.length >= 0) {

            $scope.page.value.id = [];
            $scope.page.value.name = [];

            angular.forEach($scope.page.option, function (value, key) {

                $scope.page.value.id.push(value.id);
                $scope.page.value.name.push(value.name);

            });

            $scope.page.status = "Checked All";

        }

    }


    $scope.removeFilterPagination = function (event) {

        $scope.loading.view = true;

        var rest = {
            "data": {},
            "url": document.getElementById("config").getAttribute("data-base-url") + "/setting/slider/remove-filter-pagination"
        };
        settingSlider.rest(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/setting/slider/set-pagination"
        };
        settingSlider.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/setting/slider/";

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/setting/slider/upload-file"
        };
        settingSlider.restMultipart(rest, function (response) {

            if (response.result) {

                $scope.response.class = "success";
                $scope.fileName.value = response.file[0];
                $scope.fileName.upload.file = response.file[0];
                $scope.fileName.upload.result = true;

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


app.provider("settingSlider", function () {


    this.$get = ["$http", function ($http) {


        var settingSlider = {};


        settingSlider.rest = function (rest, callback) {

            $http({
                "data": rest.data,
                "headers": {"Content-Type": "application/json"},
                "method": "POST",
                "url": rest.url
            }).then(function (response) {

                callback(response.data);

            });

        }


        settingSlider.restMultipart = function (rest, callback) {

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


        return settingSlider;


    }];


});


app.directive("settingSliderDetail", function () {


    var settingSlider = {};


    settingSlider.templateUrl = document.getElementById("config").getAttribute("data-base-url") + "/resource/html/setting-slider-detail-popup.html";


    return settingSlider;


});


app.directive("settingSliderFilePreview", function () {


    var settingSlider = {};


    settingSlider.template = "<img class=\"responsive\" ng-src=\"" + document.getElementById("config").getAttribute("data-image-url") + "/setting/slider/{{fileName.upload.file}}\" />";


    return settingSlider;


});
