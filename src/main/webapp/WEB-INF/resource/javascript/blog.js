document.addEventListener("DOMContentLoaded", function (event) {


    tinymce.init({
        "branding": false,
        "convert_urls": true,
        "height": 300,
        "images_upload_url": document.getElementById("config").getAttribute("data-base-url") + "/blog/tinymce-upload",
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
        "images_upload_url": document.getElementById("config").getAttribute("data-base-url") + "/blog/tinymce-upload",
        "image_advtab": true,
        "plugins": "preview searchreplace autolink directionality visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern",
        "relative_urls": false,
        "remove_script_host": false,
        "selector": "#tinymce-2",
        "toolbar1": "formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat"
    });


});


app.controller("blog", ["$scope", "$window", "$log", "blog", function ($scope, $window, $log, blog) {


    $scope.category = {
        "option": [],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": {
            "id": [],
            "name": [],
            "path": [],
            "url": []
        }
    };

    $scope.content = {
        "value": ""
    };

    $scope.createdDate = {
        "value": "",
        "view": false
    };

    $scope.description = {
        "value": ""
    };

    $scope.dislikeAmount = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.dislikeContributorAmount = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.dislikeContributorId = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
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
            {"name": "Very Stream"},
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
        "category": {
            "option": [
                {"icon": "", "id": "", "name": "Category"}
            ],
            "value": ""
        },
        "createdDate": {
            value: ""
        },
        "id": {
            value: ""
        },
        "star": {
            "option": [
                {"id": "", "name": "Star"}
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
        "title": {
            value: ""
        }
    };

    $scope.filter.category.selected = $scope.filter.category.option[0];

    $scope.filter.status.selected = $scope.filter.status.option[0];

    $scope.id = {
        "value": ""
    };

    $scope.likeAmount = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.likeContributorAmount = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.likeContributorId = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
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

    $scope.rateAmount = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.rateContributorAmount = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.rateContributorId = {
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

    $scope.star = {
        "option": [],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": {
            "id": [],
            "name": [],
            "path": [],
            "url": []
        }
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

    $scope.title = {
        "response": {
            "class": "",
            "value": "",
            "view": false
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
        "category": false,
        "dislikeAmount": false,
        "dislikeContributorAmount": false,
        "fileName": false,
        "fileSource": false,
        "fileUrl": false,
        "likeAmount": false,
        "likeContributorAmount": false,
        "metaDescription": false,
        "metaKeyword": false,
        "metaTitle": false,
        "ogDescription": false,
        "ogTitle": false,
        "rateAmount": false,
        "rateContributorAmount": false,
        "sequence": false,
        "star": false,
        "status": false,
        "thumbnail": false,
        "title": false,
        "url": false
    };


    $scope.categoryFilterOptionHierarchy = function (list, parentId, level = 0, currentId, selectedId) {

        angular.forEach(list, function (value, key) {

            if (value.parent.id == parentId) {

                var icon = "";

                for (var i = 0; i <= level; i++) {

                    icon += "<i class=\"double-arrow-right-white square-10 margin-right-5\"></i>";

                }

                if (value._id != currentId) {

                    $scope.filter.category.option.push({
                        "icon": icon,
                        "id": value._id,
                        "name": value.name
                    });

                }

                if (value._id == selectedId) {

                    $scope.filter.category.selected = $scope.filter.category.option[$scope.filter.category.option.length - 1];

                }

                level++

                $scope.categoryFilterOptionHierarchy(list, value._id, level, currentId, selectedId);

                level--;

            }

        });

    }


    $scope.categoryOptionHierarchy = function (list, parentId, level = 0) {

        angular.forEach(list, function (value, key) {

            if (value.parent.id == parentId) {

                var icon = "";

                for (var i = 0; i <= level; i++) {

                    icon += "<i class=\"double-arrow-right-white square-10 margin-right-5\"></i>";

                }

                $scope.category.option.push({
                    "icon": icon,
                    "id": value._id,
                    "name": value.name,
                    "path": value.path,
                    "url": value.url
                });

                level++

                $scope.categoryOptionHierarchy(list, value._id, level);

                level--;

            }

        });

    }


    $scope.categoryToggleCheckbox = function (category) {

        var index = $scope.category.value.id.indexOf(category.id);

        if (index > -1) {

            $scope.category.value.id.splice(index, 1);
            $scope.category.value.name.splice(index, 1);
            $scope.category.value.path.splice(index, 1);
            $scope.category.value.url.splice(index, 1);

        } else {

            $scope.category.value.id.push(category.id);
            $scope.category.value.name.push(category.name);
            $scope.category.value.path.push(category.path);
            $scope.category.value.url.push(category.url);

        }

    }


    $scope.checkCategory = function () {

        if ($scope.category.value.id.length == 0) {

            $scope.category.response.value = "Please select at least 1 blog category";
            $scope.category.response.class = "error";
            $scope.category.response.view = true;
            $scope.valid.category = false;

        } else {

            $scope.category.response.view = false;
            $scope.valid.category = true;

        }

    }


    $scope.checkData = function () {

        $scope.checkCategory();

        $scope.checkDislikeAmount();

        $scope.checkDislikeContributorAmount();

        $scope.checkFileName();

        $scope.checkFileSource();

        $scope.checkFileUrl();

        $scope.checkLikeAmount();

        $scope.checkLikeContributorAmount();

        $scope.checkMetaDescription();

        $scope.checkMetaKeyword();

        $scope.checkMetaTitle();

        $scope.checkOgDescription();

        $scope.checkOgTitle();

        $scope.checkRateAmount();

        $scope.checkRateContributorAmount();

        $scope.checkSequence();

        $scope.checkStar();

        $scope.checkStatus();

        $scope.checkThumbnail();

        $scope.checkTitle();

        $scope.checkUrl();

    }


    $scope.checkDislikeAmount = function () {

        if ($scope.dislikeAmount.value != "") {

            if (!$scope.dislikeAmount.value.match(/^[0-9,.]+$/)) {

                $scope.dislikeAmount.response.value = "Please enter decimal rate amount";
                $scope.dislikeAmount.response.class = "error";
                $scope.dislikeAmount.response.view = true;
                $scope.valid.dislikeAmount = false;

            } else {

                $scope.dislikeAmount.response.view = false;
                $scope.valid.dislikeAmount = true;

            }

        } else {

            $scope.dislikeAmount.response.view = false;
            $scope.valid.dislikeAmount = true;

        }

        $scope.dislikeAmount.value = library.numeral.initializeSeparator($scope.dislikeAmount.value);

    }


    $scope.checkDislikeContributorAmount = function () {

        if ($scope.dislikeContributorAmount.value != "") {

            if (!$scope.dislikeContributorAmount.value.match(/^[0-9,.]+$/)) {

                $scope.dislikeContributorAmount.response.value = "Please enter only number";
                $scope.dislikeContributorAmount.response.class = "error";
                $scope.dislikeContributorAmount.response.view = true;
                $scope.valid.dislikeContributorAmount = false;

            } else {

                $scope.dislikeContributorAmount.response.view = false;
                $scope.valid.dislikeContributorAmount = true;

            }

        } else {

            $scope.dislikeContributorAmount.response.view = false;
            $scope.valid.dislikeContributorAmount = true;

        }

        $scope.dislikeContributorAmount.value = library.numeral.initializeSeparator($scope.dislikeContributorAmount.value);

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

                $scope.fileSource.response.value = "Please select blog file source";
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


    $scope.checkLikeAmount = function () {

        if ($scope.likeAmount.value != "") {

            if (!$scope.likeAmount.value.match(/^[0-9,.]+$/)) {

                $scope.likeAmount.response.value = "Please enter decimal rate amount";
                $scope.likeAmount.response.class = "error";
                $scope.likeAmount.response.view = true;
                $scope.valid.likeAmount = false;

            } else {

                $scope.likeAmount.response.view = false;
                $scope.valid.likeAmount = true;

            }

        } else {

            $scope.likeAmount.response.view = false;
            $scope.valid.likeAmount = true;

        }

        $scope.likeAmount.value = library.numeral.initializeSeparator($scope.likeAmount.value);

    }


    $scope.checkLikeContributorAmount = function () {

        if ($scope.likeContributorAmount.value != "") {

            if (!$scope.likeContributorAmount.value.match(/^[0-9,.]+$/)) {

                $scope.likeContributorAmount.response.value = "Please enter only number";
                $scope.likeContributorAmount.response.class = "error";
                $scope.likeContributorAmount.response.view = true;
                $scope.valid.likeContributorAmount = false;

            } else {

                $scope.likeContributorAmount.response.view = false;
                $scope.valid.likeContributorAmount = true;

            }

        } else {

            $scope.likeContributorAmount.response.view = false;
            $scope.valid.likeContributorAmount = true;

        }

        $scope.likeContributorAmount.value = library.numeral.initializeSeparator($scope.likeContributorAmount.value);

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


    $scope.checkRateContributorAmount = function () {

        if ($scope.rateContributorAmount.value != "") {

            if (!$scope.rateContributorAmount.value.match(/^[0-9,.]+$/)) {

                $scope.rateContributorAmount.response.value = "Please enter only number";
                $scope.rateContributorAmount.response.class = "error";
                $scope.rateContributorAmount.response.view = true;
                $scope.valid.rateContributorAmount = false;

            } else {

                $scope.rateContributorAmount.response.view = false;
                $scope.valid.rateContributorAmount = true;

            }

        } else {

            $scope.rateContributorAmount.response.view = false;
            $scope.valid.rateContributorAmount = true;

        }

        $scope.rateContributorAmount.value = library.numeral.initializeSeparator($scope.rateContributorAmount.value);

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


    $scope.checkStar = function () {

        if ($scope.star.value.id.length == 0) {

            $scope.star.response.view = false;
            $scope.valid.star = true;

        } else {

            $scope.star.response.view = false;
            $scope.valid.star = true;

        }

    }


    $scope.checkStatus = function () {

        if ($scope.status.selected.name == "Status") {

            $scope.status.response.value = "Please select blog status";
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


    $scope.checkTitle = function () {

        if ($scope.title.value.length < 2 || $scope.title.value.length > 255) {

            $scope.title.response.value = "Please enter between 2 - 20 characters";
            $scope.title.response.class = "error";
            $scope.title.response.view = true;
            $scope.valid.title = false;

        } else {

            $scope.title.response.view = false;
            $scope.valid.title = true;

        }

        $scope.title.value = $scope.title.value.trim();

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/blog/delete"
        };
        blog.rest(rest, function (response) {

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
                    "category": {
                        "id": $scope.category.value.id,
                        "name": $scope.category.value.name,
                        "path": $scope.category.value.path,
                        "url": $scope.category.value.url
                    },
                    "content": tinyMCE.get("tinymce-2").getContent(),
                    "description": tinyMCE.get("tinymce-1").getContent(),
                    "dislike": {
                        "amount": $scope.dislikeAmount.value,
                        "contributor": {
                            "amount": $scope.dislikeContributorAmount.value,
                            "id": $scope.dislikeContributorId.value
                        }
                    },
                    "file": {
                        "name": input.fileName,
                        "source": $scope.fileSource.selected.name
                    },
                    "id": $scope.id.value,
                    "like": {
                        "amount": $scope.likeAmount.value,
                        "contributor": {
                            "amount": $scope.likeContributorAmount.value,
                            "id": $scope.likeContributorId.value
                        }
                    },
                    "meta": {
                        "description": $scope.metaDescription.value,
                        "keyword": $scope.metaKeyword.value,
                        "title": $scope.metaTitle.value
                    },
                    "og": {
                        "description": $scope.ogDescription.value,
                        "title": $scope.ogTitle.value
                    },
                    "rate": {
                        "amount": $scope.rateAmount.value,
                        "contributor": {
                            "amount": $scope.rateContributorAmount.value,
                            "id": $scope.rateContributorId.value
                        }
                    },
                    "sequence": $scope.sequence.value,
                    "star": {
                        "id": $scope.star.value.id,
                        "name": $scope.star.value.name,
                        "path": $scope.star.value.path,
                        "url": $scope.star.value.url
                    },
                    "status": $scope.status.selected.name,
                    "thumbnail": $scope.thumbnail.value,
                    "title": $scope.title.value,
                    "url": $scope.url.value
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/blog/update"
            };
            blog.rest(rest, function (response) {

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
            "category.id": ["equal", $scope.filter.category.selected.id],
            "created.timestamp": ["between", "date", filterCreatedDate[0], filterCreatedDate[1]],
            "status": ["equal", ""],
            "title": ["like", $scope.filter.title.value]
        };

        if ($scope.filter.status.selected.name != "Status") {

            data["status"][1] = $scope.filter.status.selected.name;

        }

        var rest = {
            "data": data,
            "url": document.getElementById("config").getAttribute("data-base-url") + "/blog/filter-pagination"
        };
        blog.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/blog/";

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

        document.getElementsByClassName("blog-file")[0].click();

    }


    $scope.forceUploadThumbnail = function () {

        document.getElementsByClassName("blog-thumbnail")[0].click();

    }


    $scope.goToPage = function (event) {

        if (event.which == 13) {

            $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/blog/page-" + $scope.site.page + "/";

        }

        event.preventDefault();

    }


    $scope.initializeData = function (id) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "id": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/blog/initialize-data"
        }
        blog.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("data")) {

                    for (var i = 0; i < response.data.category.id.length; i++) {

                        $scope.category.value.id.push(response.data.category.id[i]);
                        $scope.category.value.name.push(response.data.category.name[i]);
                        $scope.category.value.path.push(response.data.category.path[i]);
                        $scope.category.value.url.push(response.data.category.url[i]);

                    }

                    var createdTimestamp = new Date(response.data.created.timestamp);
                    $scope.createdDate.value = createdTimestamp.getFullYear() + "-" + ("0" + (createdTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + createdTimestamp.getDate()).slice(-2) + " " + ("0" + createdTimestamp.getHours()).slice(-2) + ":" + ("0" + createdTimestamp.getMinutes()).slice(-2) + ":" + ("0" + createdTimestamp.getSeconds()).slice(-2);
                    $scope.createdDate.view = true;

                    $scope.dislikeAmount.value = response.data.dislike.amount;
                    $scope.dislikeContributorAmount.value = response.data.dislike.contributor.amount;
                    $scope.dislikeContributorId.value = response.data.dislike.contributor.id;

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
                    $scope.likeAmount.value = response.data.like.amount;
                    $scope.likeContributorAmount.value = response.data.like.contributor.amount;
                    $scope.likeContributorId.value = response.data.like.contributor.id;
                    $scope.metaDescription.value = response.data.meta.description;
                    $scope.metaKeyword.value = response.data.meta.keyword;
                    $scope.metaTitle.value = response.data.meta.title;

                    var modifiedTimestamp = new Date(response.data.modified.timestamp);
                    $scope.modifiedDate.value = modifiedTimestamp.getFullYear() + "-" + ("0" + (modifiedTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + modifiedTimestamp.getDate()).slice(-2) + " " + ("0" + modifiedTimestamp.getHours()).slice(-2) + ":" + ("0" + modifiedTimestamp.getMinutes()).slice(-2) + ":" + ("0" + modifiedTimestamp.getSeconds()).slice(-2);
                    $scope.modifiedDate.view = true;

                    $scope.ogDescription.value = response.data.og.description;
                    $scope.ogTitle.value = response.data.og.title;
                    $scope.rateAmount.value = response.data.rate.amount;
                    $scope.rateContributorAmount.value = response.data.rate.contributor.amount;
                    $scope.rateContributorId.value = response.data.rate.contributor.id;
                    $scope.sequence.value = response.data.sequence;

                    angular.forEach($scope.status.option, function (value, key) {

                        if (value.name == response.data.status) {

                            $scope.status.selected = $scope.status.option[key];

                            return false;

                        }

                    });

                    if (response.data.thumbnail != "") {

                        $scope.thumbnail.upload.file = response.data.thumbnail;
                        $scope.thumbnail.upload.result = true;
                        $scope.thumbnail.value = response.data.thumbnail;

                    }

                    $scope.title.value = response.data.title;
                    $scope.url.value = response.data.url;

                }

                $scope.categoryOptionHierarchy(response.category, 0, 0);

                angular.forEach(response.star, function (value, key) {

                    $scope.star.option.push({
                        "id": value._id,
                        "name": value.name,
                        "path": value.path,
                        "url": value.url
                    });

                    if (response.hasOwnProperty("data")) {

                        angular.forEach(response.data.star.id, function (valueLevel1, keyLevel1) {

                            if (value._id == valueLevel1) {

                                $scope.star.value.id.push($scope.star.option[key].id);
                                $scope.star.value.name.push($scope.star.option[key].name);
                                $scope.star.value.path.push($scope.star.option[key].path);
                                $scope.star.value.url.push($scope.star.option[key].url);

                                return false;

                            }

                        });

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

        } else if ($scope.fileSource.selected.name == "Very Stream") {

            var url = result.fileName.split("/stream/");

            if (url.length > 1) {

                url = url[1].split("/");

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/blog/initialize-pagination"
        };
        blog.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("filter")) {

                    if (response.filter.created_timestamp.length > 3) {

                        if (response.filter.created_timestamp[2] != "" && response.filter.created_timestamp[3] != "") {

                            var startTimestamp = new Date(response.filter.created_timestamp[2]);
                            var endTimestamp = new Date(response.filter.created_timestamp[3]);
                            $scope.filter.createdDate.value = startTimestamp.getFullYear() + "-" + ("0" + (startTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + startTimestamp.getDate()).slice(-2) + " to " + endTimestamp.getFullYear() + "-" + ("0" + (endTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + endTimestamp.getDate()).slice(-2);

                        }

                    }

                    $scope.filter.id.value = response.filter.id[1];

                    angular.forEach($scope.filter.status.option, function (value, key) {

                        if (value.name == response.filter.status[1]) {

                            $scope.filter.status.selected = $scope.filter.status.option[key];

                            return false;

                        }

                    });

                    $scope.filter.title.value = response.filter.title[1];

                }

                var selectedId = "";

                if (response.hasOwnProperty("filter")) {

                    selectedId = response.filter.category_id[1];

                }

                $scope.categoryFilterOptionHierarchy(response.category, 0, 0, $scope.id.value, selectedId);

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
                    "category": {
                        "id": $scope.category.value.id,
                        "name": $scope.category.value.name,
                        "path": $scope.category.value.path,
                        "url": $scope.category.value.url
                    },
                    "content": tinyMCE.get("tinymce-2").getContent(),
                    "description": tinyMCE.get("tinymce-1").getContent(),
                    "dislike": {
                        "amount": $scope.dislikeAmount.value,
                        "contributor": {
                            "amount": $scope.dislikeContributorAmount.value,
                            "id": $scope.dislikeContributorId.value
                        }
                    },
                    "file": {
                        "name": input.fileName,
                        "source": $scope.fileSource.selected.name
                    },
                    "like": {
                        "amount": $scope.likeAmount.value,
                        "contributor": {
                            "amount": $scope.likeContributorAmount.value,
                            "id": $scope.likeContributorId.value
                        }
                    },
                    "meta": {
                        "description": $scope.metaDescription.value,
                        "keyword": $scope.metaKeyword.value,
                        "title": $scope.metaTitle.value
                    },
                    "og": {
                        "description": $scope.ogDescription.value,
                        "title": $scope.ogTitle.value
                    },
                    "rate": {
                        "amount": $scope.rateAmount.value,
                        "contributor": {
                            "amount": $scope.rateContributorAmount.value,
                            "id": $scope.rateContributorId.value
                        }
                    },
                    "sequence": $scope.sequence.value,
                    "star": {
                        "id": $scope.star.value.id,
                        "name": $scope.star.value.name,
                        "path": $scope.star.value.path,
                        "url": $scope.star.value.url
                    },
                    "status": $scope.status.selected.name,
                    "thumbnail": $scope.thumbnail.value,
                    "title": $scope.title.value,
                    "url": $scope.url.value
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/blog/insert"
            };
            blog.rest(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/blog/initialize-data"
        }
        blog.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("data")) {

                    $scope.content.value = response.data.content;

                    var createdTimestamp = new Date(response.data.created.timestamp);
                    $scope.createdDate.value = createdTimestamp.getFullYear() + "-" + ("0" + (createdTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + createdTimestamp.getDate()).slice(-2) + " " + ("0" + createdTimestamp.getHours()).slice(-2) + ":" + ("0" + createdTimestamp.getMinutes()).slice(-2) + ":" + ("0" + createdTimestamp.getSeconds()).slice(-2);
                    $scope.createdDate.view = true;

                    $scope.description.value = response.data.description;
                    $scope.dislikeAmount.value = response.data.dislike.amount;
                    $scope.dislikeContributorAmount.value = response.data.dislike.contributor.amount;

                    if (response.data.file.name != "") {

                        if (response.data.file.source == "Local Image") {

                            $scope.fileName.upload.file = response.data.file.name;
                            $scope.fileName.upload.result = true;
                            $scope.fileName.value = document.getElementById("config").getAttribute("data-base-url") + "/resource/image/blog/" + response.data.file.name;

                        } else {

                            $scope.fileUrl.value = response.data.file.name;

                        }

                    }

                    $scope.fileSource.value = response.data.file.source;
                    $scope.fileUrl.value = response.data.file.url;
                    $scope.id.value = response.data._id;
                    $scope.likeAmount.value = response.data.like.amount;
                    $scope.likeContributorAmount.value = response.data.like.contributor.amount;

                    var modifiedTimestamp = new Date(response.data.modified.timestamp);
                    $scope.modifiedDate.value = modifiedTimestamp.getFullYear() + "-" + ("0" + (modifiedTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + modifiedTimestamp.getDate()).slice(-2) + " " + ("0" + modifiedTimestamp.getHours()).slice(-2) + ":" + ("0" + modifiedTimestamp.getMinutes()).slice(-2) + ":" + ("0" + modifiedTimestamp.getSeconds()).slice(-2);
                    $scope.modifiedDate.view = true;

                    $scope.metaDescription.value = response.data.meta.description;
                    $scope.metaKeyword.value = response.data.meta.keyword;
                    $scope.metaTitle.value = response.data.meta.title;
                    $scope.ogDescription.value = response.data.og.description;
                    $scope.ogTitle.value = response.data.og.title;
                    $scope.rateAmount.value = response.data.rate.amount;
                    $scope.rateContributorAmount.value = response.data.rate.contributor.amount;
                    $scope.sequence.value = response.data.sequence;

                    for (var i = 0; i < response.data.star.id.length; i++) {

                        $scope.star.value.id.push(response.data.star.id[i]);
                        $scope.star.value.name.push(response.data.star.name[i]);
                        $scope.star.value.path.push(response.data.star.path[i]);
                        $scope.star.value.url.push(response.data.star.url[i]);

                    }

                    $scope.status.value = response.data.status;

                    if (response.data.thumbnail != "") {

                        $scope.thumbnail.upload.file = response.data.thumbnail;
                        $scope.thumbnail.upload.result = true;
                        $scope.thumbnail.value = document.getElementById("config").getAttribute("data-base-url") + "/resource/image/blog/thumbnail/" + response.data.thumbnail;

                    }

                    $scope.title.value = response.data.title;
                    $scope.url.value = response.data.url;

                }

                var selectedId = [];

                if (response.hasOwnProperty("data")) {

                    selectedId = response.data.category.id;

                }

                $scope.categoryOptionHierarchy(response.category, 0, 0, $scope.id.value, selectedId);

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/blog/remove-filter-pagination"
        };
        blog.rest(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/blog/set-pagination"
        };
        blog.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/blog/";

            } else {

                $scope.response.class = "error";
                $scope.response.message = response.response;
                $scope.response.view = true;

            }

            $scope.hideResponse();

        });

        event.preventDefault();

    }


    $scope.starToggleCheckbox = function (star) {

        var index = $scope.star.value.id.indexOf(star.id);

        if (index > -1) {

            $scope.star.value.id.splice(index, 1);
            $scope.star.value.name.splice(index, 1);
            $scope.star.value.path.splice(index, 1);
            $scope.star.value.url.splice(index, 1);

        } else {

            $scope.star.value.id.push(star.id);
            $scope.star.value.name.push(star.name);
            $scope.star.value.path.push(star.path);
            $scope.star.value.url.push(star.url);

        }

    }


    $scope.uploadFile = function () {

        $scope.loading.view = true;

        var formData = new FormData();

        angular.forEach($scope.files, function (value) {

            formData.append("file", value);

        });

        var rest = {
            "data": formData,
            "url": document.getElementById("config").getAttribute("data-base-url") + "/blog/upload-file"
        };
        blog.restMultipart(rest, function (response) {

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


    $scope.uploadThumbnail = function () {

        $scope.loading.view = true;

        var formData = new FormData();

        angular.forEach($scope.files, function (value) {

            formData.append("file", value);

        });

        var rest = {
            "data": formData,
            "url": document.getElementById("config").getAttribute("data-base-url") + "/blog/upload-thumbnail"
        };
        blog.restMultipart(rest, function (response) {

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


app.provider("blog", function () {


    this.$get = ["$http", function ($http) {


        var blog = {};


        blog.rest = function (rest, callback) {

            $http({
                "data": rest.data,
                "headers": {"Content-Type": "application/json"},
                "method": "POST",
                "url": rest.url
            }).then(function (response) {

                callback(response.data);

            });

        }


        blog.restMultipart = function (rest, callback) {

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


        return blog;


    }];


});


app.directive("blogDetail", function () {


    var blog = {};


    blog.templateUrl = document.getElementById("config").getAttribute("data-base-url") + "/resource/html/blog-detail-popup.html";


    return blog;


});


app.directive("blogFilePreview", function () {


    var blog = {};


    blog.template = "<img class=\"responsive\" ng-src=\"" + document.getElementById("config").getAttribute("data-image-url") + "/blog/{{fileName.upload.file}}\" />";


    return blog;


});


app.directive("blogThumbnailPreview", function () {


    var blog = {};


    blog.template = "<img class=\"responsive\" ng-src=\"" + document.getElementById("config").getAttribute("data-image-url") + "/blog/thumbnail/{{thumbnail.upload.file}}\" />";


    return blog;


});
