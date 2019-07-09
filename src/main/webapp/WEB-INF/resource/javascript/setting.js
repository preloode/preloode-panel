document.addEventListener("DOMContentLoaded", function (event) {


    tinymce.init({
        "branding": false,
        "convert_urls": true,
        "height": 300,
        "images_upload_url": document.getElementById("config").getAttribute("data-base-url") + "/setting/tinymce-upload",
        "image_advtab": true,
        "plugins": "preview searchreplace autolink directionality visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern",
        "relative_urls": false,
        "remove_script_host": false,
        "selector": "#tinymce-1",
        "toolbar1": "formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat"
    });


});


app.controller("setting", ["$scope", "$log", "setting", function ($scope, $log, setting) {


    $scope.activationEmail = {
        "name": "Disabled",
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": "Inactive"
    }

    $scope.activationSms = {
        "name": "Disabled",
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": "Inactive"
    }

    $scope.comment = {
        "name": "Disabled",
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": "Inactive"
    }

    $scope.createdDate = {
        "value": "",
        "view": false
    };

    $scope.depositAverageTime = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    }

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

    $scope.id = {
        "value": ""
    };

    $scope.like = {
        "name": "Disabled",
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": "Inactive"
    };

    $scope.maintenanceFinish = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.maintenanceNext = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.maximumDeposit = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    }

    $scope.maximumWithdrawal = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    }

    $scope.minimumDeposit = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    }

    $scope.minimumWithdrawal = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    }

    $scope.metaDescription = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    }

    $scope.metaKeyword = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    }

    $scope.metaTitle = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
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
        "value": ""
    }

    $scope.ogTitle = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    }

    $scope.rating = {
        "name": "Disbaled",
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": "Inactive"
    };

    $scope.status = {
        "option": [
            {"name": "Status"},
            {"name": "Online"},
            {"name": "Offline"},
            {"name": "Under Construction"}
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

    $scope.valid = {
        "activationEmail": false,
        "activationSms": false,
        "comment": false,
        "file": false,
        "like": false,
        "metaDescription": false,
        "metaKeyword": false,
        "metaTitle": false,
        "name": false,
        "ogDescription": false,
        "ogTitle": false,
        "rating": false,
        "status": false,
        "thumbnail": false,
        "withdrawalAverageTime": false
    };

    $scope.withdrawalAverageTime = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    }


    $scope.checkData = function () {

        $scope.checkActivationEmail();

        $scope.checkActivationSms();

        $scope.checkComment();

        $scope.checkDepositAverageTime();

        $scope.checkFile();

        $scope.checkMaximumDeposit();

        $scope.checkMaximumWithdrawal();

        $scope.checkMetaDescription();

        $scope.checkMetaKeyword();

        $scope.checkMetaTitle();

        $scope.checkMinimumDeposit();

        $scope.checkMinimumWithdrawal();

        $scope.checkName();

        $scope.checkOgDescription();

        $scope.checkOgTitle();

        $scope.checkRating();

        $scope.checkStatus();

        $scope.checkThumbnail();

        $scope.checkWithdrawalAverageTime();

    }


    $scope.checkActivationEmail = function () {

        if ($scope.activationEmail.value == "") {

            $scope.activationEmail.response.value = "Please select registration activation email";
            $scope.activationEmail.response.class = "error";
            $scope.activationEmail.response.view = true;
            $scope.valid.activationEmail = false;

        } else {

            $scope.activationEmail.response.view = false;
            $scope.valid.activationEmail = true;

        }

    }


    $scope.checkActivationSms = function () {

        if ($scope.activationSms.value == "") {

            $scope.activationSms.response.value = "Please select registration activation sms";
            $scope.activationSms.response.class = "error";
            $scope.activationSms.response.view = true;
            $scope.valid.activationSms = false;

        } else {

            $scope.activationSms.response.view = false;
            $scope.valid.activationSms = true;

        }

    }


    $scope.checkComment = function () {

        if ($scope.comment.value == "") {

            $scope.comment.response.value = "Please select blog comment";
            $scope.comment.response.class = "error";
            $scope.comment.response.view = true;
            $scope.valid.comment = false;

        } else {

            $scope.comment.response.view = false;
            $scope.valid.comment = true;

        }

    }


    $scope.checkDepositAverageTime = function () {

        if ($scope.depositAverageTime.value != "") {

            if (!$scope.depositAverageTime.value.match(/^[0-9,.]+$/)) {

                $scope.depositAverageTime.response.value = "Please enter only number";
                $scope.depositAverageTime.response.class = "error";
                $scope.depositAverageTime.response.view = true;
                $scope.valid.depositAverageTime = false;

            } else {

                $scope.depositAverageTime.response.view = false;
                $scope.valid.depositAverageTime = true;

            }

        } else {

            $scope.depositAverageTime.response.view = false;
            $scope.valid.depositAverageTime = true;

        }

        $scope.depositAverageTime.value = library.numeral.initializeSeparator($scope.depositAverageTime.value);

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


    $scope.checkMaximumDeposit = function () {

        if ($scope.maximumDeposit.value != "") {

            if (!$scope.maximumDeposit.value.match(/^[0-9,.]+$/)) {

                $scope.maximumDeposit.response.value = "Please enter only number";
                $scope.maximumDeposit.response.class = "error";
                $scope.maximumDeposit.response.view = true;
                $scope.valid.maximumDeposit = false;

            } else {

                $scope.maximumDeposit.response.view = false;
                $scope.valid.maximumDeposit = true;

            }

        } else {

            $scope.maximumDeposit.response.view = false;
            $scope.valid.maximumDeposit = true;

        }

        $scope.maximumDeposit.value = library.numeral.initializeSeparator($scope.maximumDeposit.value);

    }


    $scope.checkMaximumWithdrawal = function () {

        if ($scope.maximumWithdrawal.value != "") {

            if (!$scope.maximumWithdrawal.value.match(/^[0-9,.]+$/)) {

                $scope.maximumWithdrawal.response.value = "Please enter only number";
                $scope.maximumWithdrawal.response.class = "error";
                $scope.maximumWithdrawal.response.view = true;
                $scope.valid.maximumWithdrawal = false;

            } else {

                $scope.maximumWithdrawal.response.view = false;
                $scope.valid.maximumWithdrawal = true;

            }

        } else {

            $scope.maximumWithdrawal.response.view = false;
            $scope.valid.maximumWithdrawal = true;

        }

        $scope.maximumWithdrawal.value = library.numeral.initializeSeparator($scope.maximumWithdrawal.value);

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


    $scope.checkMinimumDeposit = function () {

        if ($scope.minimumDeposit.value != "") {

            if (!$scope.minimumDeposit.value.match(/^[0-9,.]+$/)) {

                $scope.minimumDeposit.response.value = "Please enter only number";
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


    $scope.checkMinimumWithdrawal = function () {

        if ($scope.minimumWithdrawal.value != "") {

            if (!$scope.minimumWithdrawal.value.match(/^[0-9,.]+$/)) {

                $scope.minimumWithdrawal.response.value = "Please enter only number";
                $scope.minimumWithdrawal.response.class = "error";
                $scope.minimumWithdrawal.response.view = true;
                $scope.valid.minimumWithdrawal = false;

            } else {

                $scope.minimumWithdrawal.response.view = false;
                $scope.valid.minimumWithdrawal = true;

            }

        } else {

            $scope.minimumWithdrawal.response.view = false;
            $scope.valid.minimumWithdrawal = true;

        }

        $scope.minimumWithdrawal.value = library.numeral.initializeSeparator($scope.minimumWithdrawal.value);

    }


    $scope.checkName = function () {

        if ($scope.name.value.length < 2 || $scope.name.value.length > 255) {

            $scope.name.response.value = "Please enter between 2 - 255 characters";
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


    $scope.checkRating = function () {

        if ($scope.rating.value == "") {

            $scope.rating.response.value = "Please select blog rating";
            $scope.rating.response.class = "error";
            $scope.rating.response.view = true;
            $scope.valid.rating = false;

        } else {

            $scope.rating.response.view = false;
            $scope.valid.rating = true;

        }

    }


    $scope.checkStatus = function () {

        if ($scope.status.selected.name == "Status") {

            $scope.status.response.value = "Please select website status";
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


    $scope.checkWithdrawalAverageTime = function () {

        if ($scope.withdrawalAverageTime.value != "") {

            if (!$scope.withdrawalAverageTime.value.match(/^[0-9,.]+$/)) {

                $scope.withdrawalAverageTime.response.value = "Please enter only number";
                $scope.withdrawalAverageTime.response.class = "error";
                $scope.withdrawalAverageTime.response.view = true;
                $scope.valid.withdrawalAverageTime = false;

            } else {

                $scope.withdrawalAverageTime.response.view = false;
                $scope.valid.withdrawalAverageTime = true;

            }

        } else {

            $scope.withdrawalAverageTime.response.view = false;
            $scope.valid.withdrawalAverageTime = true;

        }

        $scope.withdrawalAverageTime.value = library.numeral.initializeSeparator($scope.withdrawalAverageTime.value);

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

        var valid = true;

        if (valid) {

            $scope.loading.view = true;

            var rest = {
                "data": {
                    "activation": {
                        "email": $scope.activationEmail.value,
                        "sms": $scope.activationSms.value
                    },
                    "comment": $scope.comment.value,
                    "deposit": {
                        "average_time": $scope.depositAverageTime.value,
                        "maximum": $scope.maximumDeposit.value,
                        "minimum": $scope.minimumDeposit.value
                    },
                    "file": {
                        "favicon": $scope.thumbnail.value,
                        "logo": $scope.file.value
                    },
                    "id": $scope.id.value,
                    "like": $scope.like.value,
                    "maintenance": {
                        "finish": $scope.maintenanceFinish.value,
                        "next": $scope.maintenanceNext.value
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
                    "rating": $scope.rating.value,
                    "status": $scope.status.selected.name,
                    "withdrawal": {
                        "average_time": $scope.withdrawalAverageTime.value,
                        "maximum": $scope.maximumWithdrawal.value,
                        "minimum": $scope.minimumWithdrawal.value
                    }
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/setting/update"
            };
            setting.rest(rest, function (response) {

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


    $scope.forceUpload = function () {

        document.getElementsByClassName("setting-file")[0].click();

    }


    $scope.forceUploadThumbnail = function () {

        document.getElementsByClassName("setting-thumbnail")[0].click();

    }


    $scope.initializeData = function (id) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "id": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/setting/initialize-data"
        }
        setting.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("data")) {

                    $scope.activationEmail.value = response.data.activation.email;

                    if (response.data.activation.email == "Inactive") {

                        $scope.activationEmail.name = "Disabled";

                    } else if (response.data.activation.email == "Active") {

                        $scope.activationEmail.name = "Enabled";

                    }

                    $scope.activationSms.value = response.data.activation.sms;

                    if (response.data.activation.sms == "Inactive") {

                        $scope.activationSms.name = "Disabled";

                    } else if (response.data.activation.sms == "Active") {

                        $scope.activationSms.name = "Enabled";

                    }

                    $scope.comment.value = response.data.comment;

                    if (response.data.comment == "Inactive") {

                        $scope.comment.name = "Disabled";

                    } else if (response.data.comment == "Active") {

                        $scope.comment.name = "Enabled";

                    }

                    var createdTimestamp = new Date(response.data.created.timestamp);
                    $scope.createdDate.value = createdTimestamp.getFullYear() + "-" + ("0" + (createdTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + createdTimestamp.getDate()).slice(-2) + " " + ("0" + createdTimestamp.getHours()).slice(-2) + ":" + ("0" + createdTimestamp.getMinutes()).slice(-2) + ":" + ("0" + createdTimestamp.getSeconds()).slice(-2);
                    $scope.createdDate.view = true;

                    $scope.depositAverageTime.value = library.numeral.initializeSeparator(response.data.deposit.average_time);

                    if (response.data.file.logo != "") {

                        $scope.file.upload.file = response.data.file.logo;
                        $scope.file.upload.result = true;
                        $scope.file.value = response.data.file.logo;

                    }

                    $scope.id.value = response.data._id;
                    $scope.like.value = response.data.like;

                    if (response.data.like == "Inactive") {

                        $scope.like.name = "Inactive";

                    } else if (response.data.like == "Active") {

                        $scope.like.name = "Enabled";

                    }

                    var maintenanceFinish = new Date(response.data.maintenance.finish);
                    $scope.maintenanceFinish.value = maintenanceFinish.getFullYear() + "-" + ("0" + (maintenanceFinish.getMonth() + 1)).slice(-2) + "-" + ("0" + maintenanceFinish.getDate()).slice(-2) + " " + ("0" + maintenanceFinish.getHours()).slice(-2) + ":" + ("0" + maintenanceFinish.getMinutes()).slice(-2) + ":" + ("0" + maintenanceFinish.getSeconds()).slice(-2);

                    var maintenanceNext = new Date(response.data.maintenance.next);
                    $scope.maintenanceNext.value = maintenanceNext.getFullYear() + "-" + ("0" + (maintenanceNext.getMonth() + 1)).slice(-2) + "-" + ("0" + maintenanceNext.getDate()).slice(-2) + " " + ("0" + maintenanceNext.getHours()).slice(-2) + ":" + ("0" + maintenanceNext.getMinutes()).slice(-2) + ":" + ("0" + maintenanceNext.getSeconds()).slice(-2);

                    $scope.maximumDeposit.value = library.numeral.initializeSeparator(response.data.deposit.maximum);
                    $scope.maximumWithdrawal.value = library.numeral.initializeSeparator(response.data.withdrawal.maximum);
                    $scope.metaDescription.value = response.data.meta.description;
                    $scope.metaKeyword.value = response.data.meta.keyword;
                    $scope.metaTitle.value = response.data.meta.title;
                    $scope.minimumDeposit.value = library.numeral.initializeSeparator(response.data.deposit.minimum);
                    $scope.minimumWithdrawal.value = library.numeral.initializeSeparator(response.data.withdrawal.minimum);

                    var modifiedTimestamp = new Date(response.data.modified.timestamp);
                    $scope.modifiedDate.value = modifiedTimestamp.getFullYear() + "-" + ("0" + (modifiedTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + modifiedTimestamp.getDate()).slice(-2) + " " + ("0" + modifiedTimestamp.getHours()).slice(-2) + ":" + ("0" + modifiedTimestamp.getMinutes()).slice(-2) + ":" + ("0" + modifiedTimestamp.getSeconds()).slice(-2);
                    $scope.modifiedDate.view = true;

                    $scope.name.value = response.data.name;
                    $scope.ogDescription.value = response.data.og.description;
                    $scope.ogTitle.value = response.data.og.title;
                    $scope.rating.value = response.data.rating;

                    if (response.data.rating == "Inactive") {

                        $scope.rating.name = "Disabled";

                    } else if (response.data.rating == "Active") {

                        $scope.rating.name = "Enabled";

                    }

                    if (response.data.file.favicon != "") {

                        $scope.thumbnail.upload.file = response.data.file.favicon;
                        $scope.thumbnail.upload.result = true;
                        $scope.thumbnail.value = response.data.file.favicon;

                    }

                    $scope.withdrawalAverageTime.value = library.numeral.initializeSeparator(response.data.withdrawal.average_time);

                    angular.forEach($scope.status.option, function (value, key) {

                        if (value.name == response.data.status) {

                            $scope.status.selected = $scope.status.option[key];

                            return false;

                        }

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

        if ($scope.activationEmail.name == "Disabled") {

            $scope.activationEmail.value = "Inactive";

        } else if ($scope.activationEmail.name == "Enabled") {

            $scope.activationEmail.value = "Active";

        }

        if ($scope.activationSms.name == "Disabled") {

            $scope.activationSms.value = "Inactive";

        } else if ($scope.activationSms.name == "Enabled") {

            $scope.activationSms.value = "Active";

        }

        if ($scope.comment.name == "Disabled") {

            $scope.comment.value = "Inactive";

        } else if ($scope.comment.name == "Enabled") {

            $scope.comment.value = "Active";

        }

        if ($scope.like.name == "Disabled") {

            $scope.like.value = "Inactive";

        } else if ($scope.like.name == "Enabled") {

            $scope.like.value = "Active";

        }

        if ($scope.rating.name == "Disabled") {

            $scope.rating.value = "Inactive";

        } else if ($scope.rating.name == "Enabled") {

            $scope.rating.value = "Active";

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/setting/upload-file"
        };
        setting.restMultipart(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/setting/upload-file"
        };
        setting.restMultipart(rest, function (response) {

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


app.provider("setting", function () {


    this.$get = ["$http", function ($http) {


        var setting = {};


        setting.rest = function (rest, callback) {

            $http({
                "data": rest.data,
                "headers": {"Content-Type": "application/json"},
                "method": "POST",
                "url": rest.url
            }).then(function (response) {

                callback(response.data);

            });

        }


        setting.restMultipart = function (rest, callback) {

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


        return setting;


    }];


});


app.directive("settingFilePreview", function () {


    var blog = {};


    blog.template = "<img class=\"responsive\" ng-src=\"" + document.getElementById("config").getAttribute("data-image-url") + "/setting/{{file.upload.file}}\" />";


    return blog;


});


app.directive("settingThumbnailPreview", function () {


    var setting = {};


    setting.template = "<img class=\"responsive\" ng-src=\"" + document.getElementById("config").getAttribute("data-image-url") + "/setting/{{thumbnail.upload.file}}\" />";


    return setting;


});
