document.addEventListener("DOMContentLoaded", function (event) {


    tinymce.init({
        "branding": false,
        "convert_urls": true,
        "height": 300,
        "images_upload_url": document.getElementById("config").getAttribute("data-base-url") + "/setting/page/tinymce-upload",
        "image_advtab": true,
        "plugins": "preview searchreplace autolink directionality visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern",
        "relative_urls": false,
        "remove_script_host": false,
        "selector": "#tinymce-1",
        "toolbar1": "formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat"
    });


});


app.controller("settingPage", ["$scope", "$window", "$log", "settingPage", function ($scope, $window, $log, settingPage) {


    $scope.content = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": {
            "url": {
                "id": [],
                "url": []
            },
            "value": []
        }
    };

    $scope.createdDate = {
        "value": "",
        "view": false
    };

    $scope.description = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": {
            "url": {
                "id": [],
                "url": []
            },
            "value": []
        }
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
        }
    };

    $scope.filter.status.selected = $scope.filter.status.option[0];

    $scope.id = {
        "value": ""
    };

    $scope.metaDescription = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": {
            "url": {
                "id": [],
                "url": []
            },
            "value": []
        }
    }

    $scope.metaKeyword = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": {
            "url": {
                "id": [],
                "url": []
            },
            "value": []
        }
    }

    $scope.metaTitle = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": {
            "url": {
                "id": [],
                "url": []
            },
            "value": []
        }
    }

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

    $scope.ogDescription = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": {
            "url": {
                "id": [],
                "url": []
            },
            "value": []
        }
    }

    $scope.ogTitle = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": {
            "url": {
                "id": [],
                "url": []
            },
            "value": []
        }
    }

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

    $scope.title = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": {
            "url": {
                "id": [],
                "url": []
            },
            "value": []
        }
    };

    $scope.url = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    }

    $scope.valid = {
        "content": false,
        "description": false,
        "metaDescription": false,
        "metaKeyword": false,
        "metaTitle": false,
        "name": false,
        "ogDescription": false,
        "ogTitle": false,
        "sequence": false,
        "status": false,
        "title": false,
        "url": false,
        "websiteUrl": false
    };

    $scope.valueIndex = 0;

    $scope.websiteUrl = {
        "option": [],
        "response": {
            "class": "",
            "value": "",
            "view": false
        }
    };


    $scope.changeValueIndex = function () {

        $scope.valueIndex = $scope.title.value.url.id.indexOf($scope.websiteUrl.selected.id);

        if ($scope.valueIndex < 0) {

            $scope.valueIndex = $scope.title.value.url.id.length;

        }

        angular.element(document).ready(function () {

            tinymce.get("tinymce-1").setContent($scope.content.value.value[$scope.valueIndex]);

        });

    }


    $scope.checkContent = function () {

        if (tinyMCE.get("tinymce-1").getContent() != "") {

            $scope.content.response.view = false;
            $scope.valid.content = true;

        } else {

            $scope.content.response.view = false;
            $scope.valid.content = true;

        }

    }


    $scope.checkData = function () {

        if ($scope.id.value != "") {

            $scope.checkContent();

            $scope.checkDescription();

            $scope.checkMetaDescription();

            $scope.checkMetaKeyword();

            $scope.checkMetaTitle();

            $scope.checkOgDescription();

            $scope.checkOgTitle();

            $scope.checkTitle();

            $scope.checkWebsiteUrl();

        } else {

            $scope.valid.content = true;
            $scope.valid.description = true;
            $scope.valid.metaDescription = true;
            $scope.valid.metaKeyword = true;
            $scope.valid.metaTitle = true;
            $scope.valid.ogDescription = true;
            $scope.valid.ogTitle = true;
            $scope.valid.title = true;
            $scope.valid.websiteUrl = true;

        }

        $scope.checkName();

        $scope.checkSequence();

        $scope.checkStatus();

        $scope.checkUrl();

    }


    $scope.checkDescription = function () {

        if ($scope.description.value.value[$scope.valueIndex] != "") {

            if ($scope.description.value.value[$scope.valueIndex].length > 255) {

                $scope.description.response.value = "Please enter maximum 255 characters";
                $scope.description.response.class = "error";
                $scope.description.response.view = true;
                $scope.valid.description = false;

            } else {

                $scope.description.response.view = false;
                $scope.valid.description = true;

            }

        } else {

            $scope.description.response.view = false;
            $scope.valid.description = true;

        }

    }


    $scope.checkMetaDescription = function () {

        if ($scope.metaDescription.value.value[$scope.valueIndex] != "") {

            if ($scope.metaDescription.value.value[$scope.valueIndex].length > 255) {

                $scope.metaDescription.response.value = "Please enter maximum 255 characters";
                $scope.metaDescription.response.class = "error";
                $scope.metaDescription.response.view = true;
                $scope.valid.metaDescription = false;

            } else {

                $scope.metaDescription.response.view = false;
                $scope.valid.metaDescription = true;

            }

        } else {

            $scope.metaDescription.response.view = false;
            $scope.valid.metaDescription = true;

        }

    }


    $scope.checkMetaKeyword = function () {

        if ($scope.metaKeyword.value.value[$scope.valueIndex] != "") {

            if ($scope.metaKeyword.value.value[$scope.valueIndex].length > 255) {

                $scope.metaKeyword.response.value = "Please enter maximum 255 characters";
                $scope.metaKeyword.response.class = "error";
                $scope.metaKeyword.response.view = true;
                $scope.valid.metaKeyword = false;

            } else {

                $scope.metaKeyword.response.view = false;
                $scope.valid.metaKeyword = true;

            }

        } else {

            $scope.metaKeyword.response.view = false;
            $scope.valid.metaKeyword = true;

        }

    }


    $scope.checkMetaTitle = function () {

        if ($scope.metaTitle.value.value[$scope.valueIndex] != "") {

            if ($scope.metaTitle.value.value[$scope.valueIndex].length > 255) {

                $scope.metaTitle.response.value = "Please enter maximum 255 characters";
                $scope.metaTitle.response.class = "error";
                $scope.metaTitle.response.view = true;
                $scope.valid.metaTitle = false;

            } else {

                $scope.metaTitle.response.view = false;
                $scope.valid.metaTitle = true;

            }

        } else {

            $scope.metaTitle.response.view = false;
            $scope.valid.metaTitle = true;

        }

    }


    $scope.checkName = function () {

        if ($scope.name.value.length < 2 || $scope.name.value.length > 255) {

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


    $scope.checkOgDescription = function () {

        if ($scope.ogDescription.value.value[$scope.valueIndex] != "") {

            if ($scope.ogDescription.value.value[$scope.valueIndex].length > 255) {

                $scope.ogDescription.response.value = "Please enter maximum 255 characters";
                $scope.ogDescription.response.class = "error";
                $scope.ogDescription.response.view = true;
                $scope.valid.ogDescription = false;

            } else {

                $scope.ogDescription.response.view = false;
                $scope.valid.ogDescription = true;

            }

        } else {

            $scope.ogDescription.response.view = false;
            $scope.valid.ogDescription = true;

        }

    }


    $scope.checkOgTitle = function () {

        if ($scope.ogTitle.value.value[$scope.valueIndex] != "") {

            if ($scope.ogTitle.value.value[$scope.valueIndex].length > 255) {

                $scope.ogTitle.response.value = "Please enter maximum 255 characters";
                $scope.ogTitle.response.class = "error";
                $scope.ogTitle.response.view = true;
                $scope.valid.ogTitle = false;

            } else {

                $scope.ogTitle.response.view = false;
                $scope.valid.ogTitle = true;

            }

        } else {

            $scope.ogTitle.response.view = false;
            $scope.valid.ogTitle = true;

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

            $scope.status.response.value = "Please select setting page status";
            $scope.status.response.class = "error";
            $scope.status.response.view = true;
            $scope.valid.status = false;

        } else {

            $scope.status.response.view = false;
            $scope.valid.status = true;

        }

    }


    $scope.checkTitle = function () {

        if ($scope.title.value.value[$scope.valueIndex] != "") {

            if ($scope.title.value.value[$scope.valueIndex].length > 255) {

                $scope.title.response.value = "Please enter maximum 255 characters";
                $scope.title.response.class = "error";
                $scope.title.response.view = true;
                $scope.valid.title = false;

            } else {

                $scope.title.response.view = false;
                $scope.valid.title = true;

            }

        } else {

            $scope.title.response.view = false;
            $scope.valid.title = true;

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


    $scope.checkWebsiteUrl = function () {

        if ($scope.websiteUrl.selected.id == "") {

            $scope.websiteUrl.response.value = "Please select setting page website url";
            $scope.websiteUrl.response.class = "error";
            $scope.websiteUrl.response.view = true;
            $scope.valid.websiteUrl = false;

        } else {

            $scope.websiteUrl.response.view = false;
            $scope.valid.websiteUrl = true;

        }

    }


    $scope.delete = function (id, event) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "id": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/setting/page/delete"
        };
        settingPage.rest(rest, function (response) {

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

            $scope.initializeInput();

            var rest = {
                "data": {
                    "content": $scope.content.value,
                    "description": $scope.description.value,
                    "id": $scope.id.value,
                    "meta": {
                        "description": $scope.metaDescription.value,
                        "keyword": $scope.metaKeyword.value,
                        "title": $scope.metaTitle.value
                    },
                    "name": $scope.name.value,
                    "og": {
                        "description": $scope.ogDescription.value,
                        "title": $scope.ogTitle.value
                    },
                    "sequence": $scope.sequence.value,
                    "status": $scope.status.selected.name,
                    "title": $scope.title.value,
                    "url": $scope.url.value
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/setting/page/update"
            };
            settingPage.rest(rest, function (response) {

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
            "status": ["equal", ""]
        };

        if ($scope.filter.status.selected.name != "Status") {

            data["status"][1] = $scope.filter.status.selected.name;

        }

        var rest = {
            "data": data,
            "url": document.getElementById("config").getAttribute("data-base-url") + "/setting/page/filter-pagination"
        };
        settingPage.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/setting/page/";

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


    $scope.goToPage = function (event) {

        if (event.which == 13) {

            $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/setting/page/page-" + $scope.site.page + "/";

        }

        event.preventDefault();

    }


    $scope.initializeData = function (id) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "id": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/setting/page/initialize-data"
        }
        settingPage.rest(rest, function (response) {

            if (response.result) {

                angular.forEach(response.url, function (value, key) {

                    $scope.websiteUrl.option.push({
                        "id": value._id,
                        "name": value.name,
                        "url": value.url
                    });

                });

                $scope.websiteUrl.selected = $scope.websiteUrl.option[0];

                if (response.hasOwnProperty("data")) {

                    $scope.valueIndex = response.data.title.url.id.indexOf($scope.websiteUrl.selected.id);

                    if ($scope.valueIndex < 0) {

                        $scope.valueIndex = response.data.title.url.id.length;

                    }

                    $scope.content.value = response.data.content;

                    var createdTimestamp = new Date(response.data.created.timestamp);
                    $scope.createdDate.value = createdTimestamp.getFullYear() + "-" + ("0" + (createdTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + createdTimestamp.getDate()).slice(-2) + " " + ("0" + createdTimestamp.getHours()).slice(-2) + ":" + ("0" + createdTimestamp.getMinutes()).slice(-2) + ":" + ("0" + createdTimestamp.getSeconds()).slice(-2);
                    $scope.createdDate.view = true;

                    $scope.description.value = response.data.description;
                    $scope.id.value = response.data._id;
                    $scope.metaDescription.value = response.data.meta.description;
                    $scope.metaKeyword.value = response.data.meta.keyword;
                    $scope.metaTitle.value = response.data.meta.title;

                    var modifiedTimestamp = new Date(response.data.modified.timestamp);
                    $scope.modifiedDate.value = modifiedTimestamp.getFullYear() + "-" + ("0" + (modifiedTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + modifiedTimestamp.getDate()).slice(-2) + " " + ("0" + modifiedTimestamp.getHours()).slice(-2) + ":" + ("0" + modifiedTimestamp.getMinutes()).slice(-2) + ":" + ("0" + modifiedTimestamp.getSeconds()).slice(-2);
                    $scope.modifiedDate.view = true;

                    $scope.name.value = response.data.name;
                    $scope.ogDescription.value = response.data.og.description;
                    $scope.ogTitle.value = response.data.og.title;
                    $scope.sequence.value = response.data.sequence;
                    $scope.title.value = response.data.title;
                    $scope.url.value = response.data.url;

                    angular.forEach($scope.status.option, function (value, key) {

                        if (value.name == response.data.status) {

                            $scope.status.selected = $scope.status.option[key];

                            return false;

                        }

                    });

                    angular.element(document).ready(function () {

                        tinymce.get("tinymce-1").setContent($scope.content.value.value[$scope.valueIndex]);

                    });

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

        if ($scope.id.value != "") {

            $scope.content.value.value[$scope.valueIndex] = tinyMCE.get("tinymce-1").getContent();

        }

        angular.forEach($scope.websiteUrl.option, function (value, key) {

            if ($scope.title.value.url.id.indexOf(value.id) < 0) {

                $scope.content.value.url.id.push(value.id);
                $scope.content.value.url.url.push(value.url);
                $scope.content.value.value.push("");

                $scope.description.value.url.id.push(value.id);
                $scope.description.value.url.url.push(value.url);
                $scope.description.value.value.push("");

                $scope.metaDescription.value.url.id.push(value.id);
                $scope.metaDescription.value.url.url.push(value.url);
                $scope.metaDescription.value.value.push("");

                $scope.metaKeyword.value.url.id.push(value.id);
                $scope.metaKeyword.value.url.url.push(value.url);
                $scope.metaKeyword.value.value.push("");

                $scope.metaTitle.value.url.id.push(value.id);
                $scope.metaTitle.value.url.url.push(value.url);
                $scope.metaTitle.value.value.push("");

                $scope.ogDescription.value.url.id.push(value.id);
                $scope.ogDescription.value.url.url.push(value.url);
                $scope.ogDescription.value.value.push("");

                $scope.ogTitle.value.url.id.push(value.id);
                $scope.ogTitle.value.url.url.push(value.url);
                $scope.ogTitle.value.value.push("");

                $scope.title.value.url.id.push(value.id);
                $scope.title.value.url.url.push(value.url);
                $scope.title.value.value.push("");

            }

        });

    }


    $scope.initializePagination = function () {

        $scope.loading.view = true;

        var rest = {
            "data": {},
            "url": document.getElementById("config").getAttribute("data-base-url") + "/setting/page/initialize-pagination"
        };
        settingPage.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("filter")) {

                    $scope.filter.id.value = response.filter._id[1];
                    $scope.filter.name.value = response.filter.name[1];

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

            $scope.initializeInput();

            var rest = {
                "data": {
                    "content": $scope.content.value,
                    "description": $scope.description.value,
                    "meta": {
                        "description": $scope.metaDescription.value,
                        "keyword": $scope.metaKeyword.value,
                        "title": $scope.metaTitle.value
                    },
                    "name": $scope.name.value,
                    "og": {
                        "description": $scope.ogDescription.value,
                        "title": $scope.ogTitle.value
                    },
                    "sequence": $scope.sequence.value,
                    "status": $scope.status.selected.name,
                    "title": $scope.title.value,
                    "url": $scope.url.value
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/setting/page/insert"
            };
            settingPage.rest(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/setting/page/initialize-data"
        }
        settingPage.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("data")) {

                    $scope.content.value = response.data.content;

                    var createdTimestamp = new Date(response.data.created.timestamp);
                    $scope.createdDate.value = createdTimestamp.getFullYear() + "-" + ("0" + (createdTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + createdTimestamp.getDate()).slice(-2) + " " + ("0" + createdTimestamp.getHours()).slice(-2) + ":" + ("0" + createdTimestamp.getMinutes()).slice(-2) + ":" + ("0" + createdTimestamp.getSeconds()).slice(-2);
                    $scope.createdDate.view = true;

                    $scope.description.value = response.data.description;
                    $scope.id.value = response.data._id;

                    var modifiedTimestamp = new Date(response.data.modified.timestamp);
                    $scope.modifiedDate.value = modifiedTimestamp.getFullYear() + "-" + ("0" + (modifiedTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + modifiedTimestamp.getDate()).slice(-2) + " " + ("0" + modifiedTimestamp.getHours()).slice(-2) + ":" + ("0" + modifiedTimestamp.getMinutes()).slice(-2) + ":" + ("0" + modifiedTimestamp.getSeconds()).slice(-2);
                    $scope.modifiedDate.view = true;

                    $scope.metaDescription.value = response.data.meta.description;
                    $scope.metaKeyword.value = response.data.meta.keyword;
                    $scope.metaTitle.value = response.data.meta.title;
                    $scope.name.value = response.data.name;
                    $scope.ogDescription.value = response.data.og.description;
                    $scope.ogTitle.value = response.data.og.title;
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


    $scope.removeFilterPagination = function (event) {

        $scope.loading.view = true;

        var rest = {
            "data": {},
            "url": document.getElementById("config").getAttribute("data-base-url") + "/setting/page/remove-filter-pagination"
        };
        settingPage.rest(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/setting/page/set-pagination"
        };
        settingPage.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/setting/page/";

            } else {

                $scope.response.class = "error";
                $scope.response.message = response.response;
                $scope.response.view = true;

            }

            $scope.hideResponse();

        });

        event.preventDefault();

    }


}]);


app.provider("settingPage", function () {


    this.$get = ["$http", function ($http) {


        var settingPage = {};


        settingPage.rest = function (rest, callback) {

            $http({
                "data": rest.data,
                "headers": {"Content-Type": "application/json"},
                "method": "POST",
                "url": rest.url
            }).then(function (response) {

                callback(response.data);

            });

        }


        settingPage.restMultipart = function (rest, callback) {

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


        return settingPage;


    }];


});


app.directive("settingPageDetail", function () {


    var settingPage = {};


    settingPage.templateUrl = document.getElementById("config").getAttribute("data-base-url") + "/resource/html/setting-page-detail-popup.html";


    return settingPage;


});
