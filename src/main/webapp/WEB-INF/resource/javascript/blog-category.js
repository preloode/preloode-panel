document.addEventListener("DOMContentLoaded", function (event) {


    tinymce.init({
        "branding": false,
        "convert_urls": true,
        "height": 300,
        "images_upload_url": document.getElementById("config").getAttribute("data-base-url") + "/blog/category/tinymce-upload",
        "image_advtab": true,
        "plugins": "preview searchreplace autolink directionality visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern",
        "relative_urls": false,
        "remove_script_host": false,
        "selector": "#tinymce-1",
        "toolbar1": "formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat"
    });


    tinymce.init({
        "branding": false,
        "convert_urls": true,
        "height": 300,
        "images_upload_url": document.getElementById("config").getAttribute("data-base-url") + "/blog/category/tinymce-upload",
        "image_advtab": true,
        "plugins": "preview searchreplace autolink directionality visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern",
        "relative_urls": false,
        "remove_script_host": false,
        "selector": "#tinymce-2",
        "toolbar1": "formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat"
    });


});


app.controller("blogCategory", ["$scope", "$window", "$log", "blogCategory", function ($scope, $window, $log, blogCategory) {


    $scope.createdDate = {
        "value": "",
        "view": false
    };

    $scope.content = {
        "value": ""
    };

    $scope.description = {
        "value": ""
    };

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
        "value": ""
    };

    $scope.metaKeyword = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.metaTitle = {
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

    $scope.ogDescription = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.ogTitle = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.parent = {
        "option": [
            {"icon": "", "id": "", "name": "Parent", "path": "", "url": ""},
            {"icon": "", "id": "0", "name": "Root", "path": "", "url": ""}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.parent.selected = $scope.parent.option[0];

    $scope.rateAmount = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.rateContributor = {
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

    $scope.thumbnail = {
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

    $scope.url = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.valid = {
        "fileName": false,
        "fileSource": false,
        "fileUrl": false,
        "metaDescription": false,
        "metaKeyword": false,
        "metaTitle": false,
        "name": false,
        "ogDescription": false,
        "ogTitle": false,
        "parent": false,
        "rateAmount": false,
        "rateContributor": false,
        "sequence": false,
        "status": false,
        "thumbnail": false,
        "url": false
    };


    $scope.checkData = function () {

        $scope.checkFileName();

        $scope.checkFileSource();

        $scope.checkFileUrl();

        $scope.checkMetaDescription();

        $scope.checkMetaKeyword();

        $scope.checkMetaTitle();

        $scope.checkName();

        $scope.checkOgDescription();

        $scope.checkOgTitle();

        $scope.checkParent();

        $scope.checkRateAmount();

        $scope.checkRateContributor();

        $scope.checkSequence();

        $scope.checkStatus();

        $scope.checkThumbnail();

        $scope.checkUrl()

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

                $scope.fileSource.response.value = "Please select blog category file source";
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


    $scope.checkMetaDescription = function () {

        if ($scope.metaDescription.value != "") {

            if ($scope.metaDescription.value.length > 255) {

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

        if ($scope.metaKeyword.value != "") {

            if ($scope.metaKeyword.value.length > 255) {

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

        if ($scope.metaTitle.value != "") {

            if ($scope.metaTitle.value.length > 255) {

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


    $scope.checkOgDescription = function () {

        if ($scope.ogDescription.value != "") {

            if ($scope.ogDescription.value.length > 255) {

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

        if ($scope.ogTitle.value != "") {

            if ($scope.ogTitle.value.length > 255) {

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


    $scope.checkParent = function () {

        if ($scope.parent.selected.id == "") {

            $scope.parent.response.value = "Please select blog category parent";
            $scope.parent.response.class = "error";
            $scope.parent.response.view = true;
            $scope.valid.parent = false;

        } else {

            $scope.parent.response.view = false;
            $scope.valid.parent = true;

        }

    }


    $scope.checkRateAmount = function () {

        if ($scope.rateAmount.value != "") {

            if (!$scope.rateAmount.value.match(/^[0-9,.]+$/)) {

                $scope.rateAmount.response.value = "Please enter decimal rate amount";
                $scope.rateAmount.response.class = "error";
                $scope.rateAmount.response.view = true;
                $scope.valid.rateAmount = false;

            } else {

                $scope.rateAmount.response.view = false;
                $scope.valid.rateAmount = true;

            }

        } else {

            $scope.rateAmount.response.view = false;
            $scope.valid.rateAmount = true;

        }

        $scope.rateAmount.value = library.numeral.initializeSeparator($scope.rateAmount.value);

    }


    $scope.checkRateContributor = function () {

        if ($scope.rateContributor.value != "") {

            if (!$scope.rateContributor.value.match(/^[0-9,.]+$/)) {

                $scope.rateContributor.response.value = "Please enter only number";
                $scope.rateContributor.response.class = "error";
                $scope.rateContributor.response.view = true;
                $scope.valid.rateContributor = false;

            } else {

                $scope.rateContributor.response.view = false;
                $scope.valid.rateContributor = true;

            }

        } else {

            $scope.rateContributor.response.view = false;
            $scope.valid.rateContributor = true;

        }

        $scope.rateContributor.value = library.numeral.initializeSeparator($scope.rateContributor.value);

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

            $scope.status.response.value = "Please select blog category status";
            $scope.status.response.class = "error";
            $scope.status.response.view = true;
            $scope.valid.status = false;

        } else {

            $scope.status.response.view = false;
            $scope.valid.status = true;

        }

    }


    $scope.checkThumbnail = function () {

        if ($scope.thumbnail.value != "") {

            if ($scope.thumbnail.value.length > 255) {

                $scope.thumbnail.response.value = "Please enter maximum 255 characters";
                $scope.thumbnail.response.class = "error";
                $scope.thumbnail.response.view = true;
                $scope.valid.thumbnail = false;

            } else {

                $scope.thumbnail.response.view = false;
                $scope.valid.thumbnail = true;

            }

        } else {

            $scope.thumbnail.response.view = false;
            $scope.valid.thumbnail = true;

        }

    }


    $scope.checkUrl = function () {

        if ($scope.url.value != "") {

            if ($scope.url.value.length < 2 || $scope.url.value.length > 255) {

                $scope.url.response.value = "Please enter between 2 - 255 characters";
                $scope.url.response.class = "error";
                $scope.url.response.view = true;
                $scope.valid.url = false;

            } else if ($scope.url.value.startsWith("https://")) {

                $scope.url.response.value = "Please enter without https://";
                $scope.url.response.class = "error";
                $scope.url.response.view = true;
                $scope.valid.url = false;

            } else if ($scope.url.value.startsWith("http://")) {

                $scope.url.response.value = "Please enter without http://";
                $scope.url.response.class = "error";
                $scope.url.response.view = true;
                $scope.valid.url = false;

            } else if ($scope.url.value.startsWith("www.")) {

                $scope.url.response.value = "Please enter without www.";
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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/blog/category/delete"
        };
        blogCategory.rest(rest, function (response) {

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

            var input = $scope.initializeInput();

            var rest = {
                "data": {
                    "content": tinyMCE.get("tinymce-1").getContent(),
                    "description": tinyMCE.get("tinymce-2").getContent(),
                    "file": {
                        "name": input.fileName,
                        "source": $scope.fileSource.selected.name
                    },
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
                    parent: {
                        "id": $scope.parent.selected.id,
                        "name": $scope.parent.selected.name,
                        "path": $scope.parent.selected.path,
                        "url": $scope.parent.selected.url
                    },
                    "rate": {
                        "amount": $scope.rateAmount.value,
                        "contributor": $scope.rateContributor.value
                    },
                    "sequence": $scope.sequence.value,
                    "status": $scope.status.selected.name,
                    "thumbnail": $scope.thumbnail.value,
                    "url": $scope.url.value
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/blog/category/update"
            };
            blogCategory.rest(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/blog/category/filter-pagination"
        };
        blogCategory.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/blog/category/";

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

        document.getElementsByClassName("blog-category-file")[0].click();

    }


    $scope.forceUploadThumbnail = function () {

        document.getElementsByClassName("blog-category-thumbnail")[0].click();

    }


    $scope.goToPage = function (event) {

        if (event.which == 13) {

            $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/blog/category/page-" + $scope.site.page + "/";

        }

        event.preventDefault();

    }


    $scope.initializeData = function (id) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "id": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/blog/category/initialize-data"
        }
        blogCategory.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("data")) {

                    var createdTimestamp = new Date(response.data.created.timestamp);
                    $scope.createdDate.value = createdTimestamp.getFullYear() + "-" + ("0" + (createdTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + createdTimestamp.getDate()).slice(-2) + " " + ("0" + createdTimestamp.getHours()).slice(-2) + ":" + ("0" + createdTimestamp.getMinutes()).slice(-2) + ":" + ("0" + createdTimestamp.getSeconds()).slice(-2);
                    $scope.createdDate.view = true;

                    if (response.data.file.name != "") {

                        if (response.data.file.source == "Local Image") {

                            $scope.fileName.upload.file = response.data.file.name;
                            $scope.fileName.upload.result = true;
                            $scope.fileName.value = response.data.file.name;

                        } else {

                            $scope.fileUrl.value = response.data.file.name;

                        }

                    }

                    angular.forEach($scope.fileSource.option, function (value, key) {

                        if (value.name == response.data.file.source) {

                            $scope.fileSource.selected = $scope.fileSource.option[key];

                            return false;

                        }

                    });

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
                    $scope.rateAmount.value = library.numeral.initializeSeparator(response.data.rate.amount);
                    $scope.rateContributor.value = library.numeral.initializeSeparator(response.data.rate.contributor);

                    angular.forEach($scope.status.option, function (value, key) {

                        if (value.name == response.data.status) {

                            $scope.status.selected = $scope.status.option[key];

                            return false;

                        }

                    });

                    $scope.sequence.value = response.data.sequence;

                    if (response.data.thumbnail != "") {

                        $scope.thumbnail.upload.file = response.data.thumbnail;
                        $scope.thumbnail.upload.result = true;
                        $scope.thumbnail.value = response.data.thumbnail;

                    }

                    $scope.url.value = response.data.url;

                }

                var selectedId = "";

                if (response.hasOwnProperty("data")) {

                    if (response.data.parent.id == 0) {

                        $scope.parent.selected = $scope.parent.option[1];

                    } else {

                        selectedId = response.data.parent.id;

                    }

                }

                $scope.parentOptionHierarchy(response.category, 0, 0, $scope.id.value, selectedId);

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/blog/category/initialize-pagination"
        };
        blogCategory.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("filter")) {

                    if (response.filter.created_timestamp.length > 3) {

                        if (response.filter.created_timestamp[2] != "" && response.filter.created_timestamp[3] != "") {

                            var startTimestamp = new Date(response.filter.created_timestamp[2]);
                            var endTimestamp = new Date(response.filter.created_timestamp[3]);
                            $scope.filter.createdDate.value = startTimestamp.getFullYear() + "-" + ("0" + (startTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + startTimestamp.getDate()).slice(-2) + " to " + endTimestamp.getFullYear() + "-" + ("0" + (endTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + endTimestamp.getDate()).slice(-2);

                        }

                    }

                    $scope.filter.id.value = response.filter._id[1];
                    $scope.filter.name.value = response.filter.name[1];

                    angular.forEach($scope.filter.status.option, function (value, key) {

                        if (value.name == response.filter.status[1]) {

                            $scope.filter.status.selected = $scope.filter.status.option[key];

                            return false;

                        }

                    });

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

            var input = $scope.initializeInput();

            var rest = {
                "data": {
                    "content": tinyMCE.get("tinymce-1").getContent(),
                    "description": tinyMCE.get("tinymce-2").getContent(),
                    "file": {
                        "name": input.fileName,
                        "source": $scope.fileSource.selected.name
                    },
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
                    parent: {
                        "id": $scope.parent.selected.id,
                        "name": $scope.parent.selected.name,
                        "path": $scope.parent.selected.path,
                        "url": $scope.parent.selected.url
                    },
                    "rate": {
                        "amount": $scope.rateAmount.value,
                        "contributor": $scope.rateContributor.value
                    },
                    "sequence": $scope.sequence.value,
                    "status": $scope.status.selected.name,
                    "thumbnail": $scope.thumbnail.value,
                    "url": $scope.url.value
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/blog/category/insert"
            };
            blogCategory.rest(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/blog/category/initialize-data"
        }
        blogCategory.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("data")) {

                    $scope.content.value = response.data.content;

                    var createdTimestamp = new Date(response.data.created.timestamp);
                    $scope.createdDate.value = createdTimestamp.getFullYear() + "-" + ("0" + (createdTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + createdTimestamp.getDate()).slice(-2) + " " + ("0" + createdTimestamp.getHours()).slice(-2) + ":" + ("0" + createdTimestamp.getMinutes()).slice(-2) + ":" + ("0" + createdTimestamp.getSeconds()).slice(-2);
                    $scope.createdDate.view = true;

                    $scope.description.value = response.data.description;

                    if (response.data.file != "") {

                        $scope.file.upload.file = response.data.file;
                        $scope.file.upload.result = true;
                        $scope.file.value = document.getElementById("config").getAttribute("data-base-url") + "/resource/image/blog/category/" + response.data.file;

                    }

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
                    $scope.parent.value = response.data.parent.name;
                    $scope.rateAmount.value = response.data.rate.amount;
                    $scope.rateContributor.value = response.data.rate.contributor;
                    $scope.sequence.value = response.data.sequence;
                    $scope.status.value = response.data.status;

                    if (response.data.thumbnail != "") {

                        $scope.thumbnail.upload.file = response.data.thumbnail;
                        $scope.thumbnail.upload.result = true;
                        $scope.thumbnail.value = document.getElementById("config").getAttribute("data-base-url") + "/resource/image/blog/category/thumbnail/" + response.data.thumbnail;

                    }

                    $scope.url.value = response.data.url;

                }

                $scope.popup.view = true;
                $scope.popup.blogCategory = true;

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


    $scope.parentOptionHierarchy = function (list, parentId, level = 0, currentId, selectedId) {

        angular.forEach(list, function (value, key) {

            if (value.parent.id == parentId) {

                var icon = "";

                for (var i = 0; i <= level; i++) {

                    icon += "<i class=\"double-arrow-right-white square-10 margin-right-5\"></i>";

                }

                if (value._id != currentId) {

                    $scope.parent.option.push({
                        "icon": icon,
                        "id": value._id,
                        "name": value.name,
                        "path": value.path,
                        "url": value.url
                    });

                }

                if (value._id == selectedId) {

                    $scope.parent.selected = $scope.parent.option[$scope.parent.option.length - 1];

                }

                level++

                $scope.parentOptionHierarchy(list, value._id, level, currentId, selectedId);

                level--;

            }

        });

    }


    $scope.removeFilterPagination = function (event) {

        $scope.loading.view = true;

        var rest = {
            "data": {},
            "url": document.getElementById("config").getAttribute("data-base-url") + "/blog/category/remove-filter-pagination"
        };
        blogCategory.rest(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/blog/category/set-pagination"
        };
        blogCategory.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/blog/category/";

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/blog/category/upload-file"
        };
        blogCategory.restMultipart(rest, function (response) {

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


    $scope.uploadThumbnail = function () {

        $scope.loading.view = true;

        var formData = new FormData();

        angular.forEach($scope.files, function (value) {

            formData.append("file", value);

        });

        var rest = {
            "data": formData,
            "url": document.getElementById("config").getAttribute("data-base-url") + "/blog/category/upload-thumbnail"
        };
        blogCategory.restMultipart(rest, function (response) {

            if (response.result) {

                $scope.response.class = "success";
                $scope.thumbnail.value = response.file[0];
                $scope.thumbnail.upload.file = response.file[0];
                $scope.thumbnail.upload.result = true;

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


app.provider("blogCategory", function () {


    this.$get = ["$http", function ($http) {


        var blogCategory = {};


        blogCategory.rest = function (rest, callback) {

            $http({
                "data": rest.data,
                "headers": {"Content-Type": "application/json"},
                "method": "POST",
                "url": rest.url
            }).then(function (response) {

                callback(response.data);

            });

        }


        blogCategory.restMultipart = function (rest, callback) {

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


        return blogCategory;


    }];


});


app.directive("blogCategoryDetail", function () {


    var blogCategory = {};


    blogCategory.templateUrl = document.getElementById("config").getAttribute("data-base-url") + "/resource/html/blog-category-detail-popup.html";


    return blogCategory;


});


app.directive("blogCategoryFilePreview", function () {


    var blogCategory = {};


    blogCategory.template = "<img class=\"responsive\" ng-src=\"" + document.getElementById("config").getAttribute("data-image-url") + "/blog/category/{{file.upload.file}}\" />";


    return blogCategory;


});


app.directive("blogCategoryThumbnailPreview", function () {


    var blogCategory = {};


    blogCategory.template = "<img class=\"responsive\" ng-src=\"" + document.getElementById("config").getAttribute("data-image-url") + "/blog/category/thumbnail/{{thumbnail.upload.file}}\" />";


    return blogCategory;


});
