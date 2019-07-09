app.controller("bankAccount", ["$scope", "$window", "$log", "bankAccount", function ($scope, $window, $log, bankAccount) {


    $scope.bank = {
        "option": [
            {"id": "", "name": "Bank"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        }
    };

    $scope.bank.selected = $scope.bank.option[0];

    $scope.city = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.country = {
        "option": [
            {"name": "Country"},
            {"name": "Cambodia"},
            {"name": "China"},
            {"name": "Indonesia"},
            {"name": "Malaysia"},
            {"name": "Philippines"},
            {"name": "Taiwan"},
            {"name": "Thailand"},
            {"name": "Other"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        }
    };

    $scope.country.selected = $scope.country.option[0];

    $scope.createdDate = {
        "value": "",
        "view": false
    };

    $scope.emailAddress = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
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
        "country": {
            "option": [
                {"name": "Country"},
                {"name": "Cambodia"},
                {"name": "China"},
                {"name": "Indonesia"},
                {"name": "Malaysia"},
                {"name": "Philippines"},
                {"name": "Taiwan"},
                {"name": "Thailand"},
                {"name": "Other"}
            ],
            "value": ""
        },
        "createdDate": {
            "value": ""
        },
        "firstName": {
            "value": ""
        },
        "gender": {
            "option": [
                {"name": "Gender"},
                {"name": "Male"},
                {"name": "Female"},
                {"name": "Other"}
            ],
            "value": ""
        },
        "id": {
            "value": ""
        },
        "lastName": {
            "value": ""
        },
        "middleName": {
            "value": ""
        },
        "number": {
            "value": ""
        },
        "status": {
            "option": [
                {"name": "Status"},
                {"name": "Active"},
                {"name": "Inactive"},
                {"name": "Suspended"}
            ],
            "value": ""
        },
        "type": {
            "option": [
                {"name": "Type"},
                {"name": "Deposit"},
                {"name": "Withdrawal"},
                {"name": "Expense"},
                {"name": "Saving"}
            ],
            "value": ""
        }
    };

    $scope.filter.country.selected = $scope.filter.country.option[0];

    $scope.filter.gender.selected = $scope.filter.gender.option[0];

    $scope.filter.status.selected = $scope.filter.status.option[0];

    $scope.filter.type.selected = $scope.filter.type.option[0];

    $scope.firstName = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.gender = {
        "option": [
            {"name": "Gender"},
            {"name": "Male"},
            {"name": "Female"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        }
    };

    $scope.gender.selected = $scope.gender.option[0];

    $scope.id = {
        "value": ""
    };

    $scope.lastName = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.middleName = {
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

    $scope.number = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.password = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.phoneNumber = {
        "countryCode": {
            "option": [
                {"number": "+60"},
                {"number": "+62"},
                {"number": "+66"}
            ]
        },
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.phoneNumber.countryCode.selected = $scope.phoneNumber.countryCode.option[0];

    $scope.pin = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.province = {
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
        }
    };

    $scope.status.selected = $scope.status.option[0];

    $scope.streetAddress = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.type = {
        "option": [
            {"name": "Deposit"},
            {"name": "Withdrawal"},
            {"name": "Expense"},
            {"name": "Saving"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "status": "Unchecked All",
        "value": []
    };

    $scope.username = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.valid = {
        "bank": false,
        "city": false,
        "country": false,
        "emailAddress": false,
        "file": false,
        "firstName": false,
        "gender": false,
        "lastName": false,
        "middleName": false,
        "number": false,
        "password": false,
        "phoneNumber": false,
        "pin": false,
        "province": false,
        "sequence": false,
        "status": false,
        "streetAddress": false,
        "type": false,
        "username": false,
        "zipCode": false
    };

    $scope.zipCode = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };


    $scope.checkBank = function () {

        if ($scope.bank.selected.id == "") {

            $scope.bank.response.value = "Please select bank account bank";
            $scope.bank.response.class = "error";
            $scope.bank.response.view = true;
            $scope.valid.bank = false;

        } else {

            $scope.bank.response.view = false;
            $scope.valid.bank = true;

        }

    }


    $scope.checkCity = function () {

        if ($scope.city.value != "") {

            if ($scope.city.value.length > 20) {

                $scope.city.response.value = "Please enter maximum 20 characters";
                $scope.city.response.class = "error";
                $scope.city.response.view = true;
                $scope.valid.city = false;

            } else {

                $scope.city.response.view = false;
                $scope.valid.city = true;

            }

        } else {

            $scope.city.response.view = false;
            $scope.valid.city = true;

        }

        $scope.city.value = $scope.city.value.trim();

    }


    $scope.checkCountry = function () {

        if ($scope.country.selected.name == "Country") {

            $scope.country.response.value = "Please select bank account country";
            $scope.country.response.class = "error";
            $scope.country.response.view = true;
            $scope.valid.country = false;

        } else {

            $scope.country.response.view = false;
            $scope.valid.country = true;

        }

    }


    $scope.checkData = function () {

        $scope.checkBank();

        $scope.checkCity();

        $scope.checkCountry();

        $scope.checkEmailAddress();

        $scope.checkFile();

        $scope.checkFirstName();

        $scope.checkGender();

        $scope.checkLastName();

        $scope.checkMiddleName();

        $scope.checkNumber();

        $scope.checkPassword();

        $scope.checkPhoneNumber();

        $scope.checkPin();

        $scope.checkProvince();

        $scope.checkSequence();

        $scope.checkStatus();

        $scope.checkStreetAddress();

        $scope.checkType();

        $scope.checkUsername();

        $scope.checkZipCode();

    }


    $scope.checkEmailAddress = function () {

        if ($scope.emailAddress.value != "") {

            if (!$scope.emailAddress.value.match(/^([0-9A-Za-z_\-\.]){1,}\@([0-9A-Za-z_\-\.]){1,}\.([A-Za-z]){2,}$/) || $scope.emailAddress.value.length > 50) {

                $scope.emailAddress.response.value = "Please enter valid email address";
                $scope.emailAddress.response.class = "error";
                $scope.emailAddress.response.view = true;
                $scope.valid.emailAddress = false;

            } else {

                $scope.emailAddress.response.view = false;
                $scope.valid.emailAddress = true;

            }

        } else {

            $scope.emailAddress.response.view = false;
            $scope.valid.emailAddress = true;

        }

        $scope.emailAddress.value = $scope.emailAddress.value.trim();

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


    $scope.checkFirstName = function () {

        if ($scope.firstName.value.length < 2 || $scope.firstName.value.length > 20) {

            $scope.firstName.response.value = "Please enter between 2 - 20 characters";
            $scope.firstName.response.class = "error";
            $scope.firstName.response.view = true;
            $scope.valid.firstName = false;

        } else {

            $scope.firstName.response.view = false;
            $scope.valid.firstName = true;

        }

        $scope.firstName.value = $scope.firstName.value.trim();

    }


    $scope.checkGender = function () {

        if ($scope.gender.selected.name == "Gender") {

            $scope.gender.response.value = "Please select bank account gender";
            $scope.gender.response.class = "error";
            $scope.gender.response.view = true;
            $scope.valid.gender = false;

        } else {

            $scope.gender.response.view = false;
            $scope.valid.gender = true;

        }

    }


    $scope.checkLastName = function () {

        if ($scope.lastName.value != "") {

            if ($scope.lastName.value.length < 2 || $scope.lastName.value.length > 20) {

                $scope.lastName.response.value = "Please enter between 2 - 20 characters";
                $scope.lastName.response.class = "error";
                $scope.lastName.response.view = true;
                $scope.valid.lastName = false;

            } else {

                $scope.lastName.response.view = false;
                $scope.valid.lastName = true;

            }

        } else {

            $scope.lastName.response.view = false;
            $scope.valid.lastName = true;

        }

        $scope.lastName.value = $scope.lastName.value.trim();

    }


    $scope.checkMiddleName = function () {

        if ($scope.middleName.value != "") {

            if ($scope.middleName.value.length < 2 || $scope.middleName.value.length > 20) {

                $scope.middleName.response.value = "Please enter between 2 - 20 characters";
                $scope.middleName.response.class = "error";
                $scope.middleName.response.view = true;
                $scope.valid.middleName = false;

            } else {

                $scope.middleName.response.view = false;
                $scope.valid.middleName = true;

            }

        } else {

            $scope.middleName.response.view = false;
            $scope.valid.middleName = true;

        }

        $scope.middleName.value = $scope.middleName.value.trim();

    }


    $scope.checkNumber = function () {

        if (!$scope.number.value.match(/^[0-9]+$/) || $scope.number.value.length < 10 || $scope.number.value.length > 16) {

            $scope.number.response.value = "Please enter between 10 - 16 numbers";
            $scope.number.response.class = "error";
            $scope.number.response.view = true;
            $scope.valid.number = false;

        } else {

            $scope.number.response.view = false;
            $scope.valid.number = true;

        }

        $scope.number.value = $scope.number.value.trim();

    }


    $scope.checkPassword = function () {

        if ($scope.password.value != "") {

            if ($scope.password.value.length < 2 || $scope.password.value.length > 20) {

                $scope.password.response.value = "Please enter between 2 - 20 characters";
                $scope.password.response.class = "error";
                $scope.password.response.view = true;
                $scope.valid.password = false;

            } else {

                $scope.password.response.view = false;
                $scope.valid.password = true;

            }

        } else {

            $scope.password.response.view = false;
            $scope.valid.password = true;

        }

        $scope.password.value = $scope.password.value.trim();

    }


    $scope.checkPhoneNumber = function () {

        if ($scope.phoneNumber.value != "") {

            if ($scope.phoneNumber.value.startsWith("0")) {

                $scope.phoneNumber.response.value = "Please enter without leading zero";
                $scope.phoneNumber.response.class = "error";
                $scope.phoneNumber.response.view = true;
                $scope.valid.phoneNumber = false;

            } else if (!$scope.phoneNumber.value.match(/^[0-9]+$/) || $scope.phoneNumber.value.length < 9 || $scope.phoneNumber.value.length > 14) {

                $scope.phoneNumber.response.value = "Please enter valid mobile phone number";
                $scope.phoneNumber.response.class = "error";
                $scope.phoneNumber.response.view = true;
                $scope.valid.phoneNumber = false;

            } else {

                $scope.phoneNumber.response.view = false;
                $scope.valid.phoneNumber = true;

            }

        } else {

            $scope.phoneNumber.response.view = false;
            $scope.valid.phoneNumber = true;

        }

        $scope.phoneNumber.value = $scope.phoneNumber.value.trim();

    }


    $scope.checkPin = function () {

        if ($scope.pin.value != "") {

            if (!$scope.pin.value.match(/^[0-9]+$/) || $scope.pin.value.length < 6 || $scope.pin.value.length > 6) {

                $scope.pin.response.value = "Please enter 6 number";
                $scope.pin.response.class = "error";
                $scope.pin.response.view = true;
                $scope.valid.pin = false;

            } else {

                $scope.pin.response.view = false;
                $scope.valid.pin = true;

            }

        } else {

            $scope.pin.response.view = false;
            $scope.valid.pin = true;

        }

        $scope.pin.value = $scope.pin.value.trim();

    }


    $scope.checkProvince = function () {

        if ($scope.province.value != "") {

            if ($scope.province.value.length > 20) {

                $scope.province.response.value = "Please enter maximum 20 characters";
                $scope.province.response.class = "error";
                $scope.province.response.view = true;
                $scope.valid.province = false;

            } else {

                $scope.province.response.view = false;
                $scope.valid.province = true;

            }

        } else {

            $scope.province.response.view = false;
            $scope.valid.province = true;

        }

        $scope.province.value = $scope.province.value.trim();

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

            $scope.status.response.value = "Please select bank account status";
            $scope.status.response.class = "error";
            $scope.status.response.view = true;
            $scope.valid.status = false;

        } else {

            $scope.status.response.view = false;
            $scope.valid.status = true;

        }

    }


    $scope.checkStreetAddress = function () {

        if ($scope.streetAddress.value != "") {

            if ($scope.streetAddress.value.length > 255) {

                $scope.streetAddress.response.value = "Please enter maximum 255 characters";
                $scope.streetAddress.response.class = "error";
                $scope.streetAddress.response.view = true;
                $scope.valid.streetAddress = false;

            } else {

                $scope.streetAddress.response.view = false;
                $scope.valid.streetAddress = true;

            }

        } else {

            $scope.streetAddress.response.view = false;
            $scope.valid.streetAddress = true;

        }

        $scope.streetAddress.value = $scope.streetAddress.value.trim();

    }


    $scope.checkType = function () {

        if ($scope.type.value.length == 0) {

            $scope.type.response.value = "Please select at least 1 bank account type";
            $scope.type.response.class = "error";
            $scope.type.response.view = true;
            $scope.valid.type = false;

        } else {

            $scope.type.response.view = false;
            $scope.valid.type = true;

        }

    }


    $scope.checkUsername = function () {

        if ($scope.username.value != "") {

            if (/\s/.test($scope.username.value)) {

                $scope.username.response.value = "Please don't enter whitespace";
                $scope.username.response.class = "error";
                $scope.username.response.view = true;
                $scope.valid.username = false;

            } else if ($scope.username.value.length < 3 || $scope.username.value.length > 20) {

                $scope.username.response.value = "Please enter between 3 - 20 characters";
                $scope.username.response.class = "error";
                $scope.username.response.view = true;
                $scope.valid.username = false;

            } else {

                $scope.username.response.view = false;
                $scope.valid.username = true;

            }

        } else {

            $scope.username.response.view = false;
            $scope.valid.username = true;

        }

        $scope.username.value = $scope.username.value.trim();

    }


    $scope.checkZipCode = function () {

        if ($scope.zipCode.value != "") {

            if (!$scope.zipCode.value.match(/^[0-9-]+$/) || $scope.zipCode.value.length != 5) {

                $scope.zipCode.response.value = "Please enter valid postcode";
                $scope.zipCode.response.class = "error";
                $scope.zipCode.response.view = true;
                $scope.valid.zipCode = false;

            } else {

                $scope.zipCode.response.view = false;
                $scope.valid.zipCode = true;

            }

        } else {

            $scope.zipCode.response.view = false;
            $scope.valid.zipCode = true;

        }

        $scope.zipCode.value = $scope.zipCode.value.trim();

    }


    $scope.delete = function (id, event) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "id": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/bank/account/delete"
        };
        bankAccount.rest(rest, function (response) {

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
                    "bank": {
                        "id": $scope.bank.selected.id,
                        "name": $scope.bank.selected.name,
                    },
                    "city": $scope.city.value,
                    "contact": {
                        "email_address": $scope.emailAddress.value,
                        "phone_number": input.phoneNumber
                    },
                    "country": $scope.country.selected.name,
                    "file": $scope.file.value,
                    "gender": $scope.gender.selected.name,
                    "id": $scope.id.value,
                    "name": {
                        "first": $scope.firstName.value,
                        "last": $scope.lastName.value,
                        "middle": $scope.middleName.value
                    },
                    "number": $scope.number.value,
                    "password": $scope.password.value,
                    "pin": $scope.pin.value,
                    "province": $scope.province.value,
                    "sequence": $scope.sequence.value,
                    "status": $scope.status.selected.name,
                    "street_address": $scope.streetAddress.value,
                    "type": $scope.type.value,
                    "username": $scope.username.value,
                    "zip_code": $scope.zipCode.value
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/bank/account/update"
            };
            bankAccount.rest(rest, function (response) {

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
            "country": ["equal", ""],
            "created.timestamp": ["between", "date", filterCreatedDate[0], filterCreatedDate[1]],
            "gender": ["equal", ""],
            "name.first": ["like", $scope.filter.firstName.value],
            "name.last": ["like", $scope.filter.lastName.value],
            "name.middle": ["like", $scope.filter.middleName.value],
            "number": ["equal", $scope.filter.number.value],
            "status": ["equal", ""],
            "type": ["equal", ""]
        };

        if ($scope.filter.country.selected.name != "Country") {

            data["country"][1] = $scope.filter.country.selected.name;

        }

        if ($scope.filter.gender.selected.name != "Gender") {

            data["gender"][1] = $scope.filter.gender.selected.name;

        }

        if ($scope.filter.status.selected.name != "Status") {

            data["status"][1] = $scope.filter.status.selected.name;

        }

        if ($scope.filter.type.selected.name != "Type") {

            data["type"][1] = $scope.filter.type.selected.name;

        }

        var rest = {
            "data": data,
            "url": document.getElementById("config").getAttribute("data-base-url") + "/bank/account/filter-pagination"
        };
        bankAccount.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/bank/account/";

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

        document.getElementsByClassName("bank-account-file")[0].click();

    }


    $scope.goToPage = function (event) {

        if (event.which == 13) {

            $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/bank/account/page-" + $scope.site.page + "/";

        }

        event.preventDefault();

    }


    $scope.initializeData = function (id) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "id": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/bank/account/initialize-data"
        }
        bankAccount.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("data")) {

                    $scope.city.value = response.data.city;
                    var createdTimestamp = new Date(response.data.created.timestamp);
                    $scope.createdDate.value = createdTimestamp.getFullYear() + "-" + ("0" + (createdTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + createdTimestamp.getDate()).slice(-2) + " " + ("0" + createdTimestamp.getHours()).slice(-2) + ":" + ("0" + createdTimestamp.getMinutes()).slice(-2) + ":" + ("0" + createdTimestamp.getSeconds()).slice(-2);
                    $scope.createdDate.view = true;

                    $scope.emailAddress.value = response.data.contact.email_address;

                    if (response.data.file != "") {

                        $scope.file.upload.file = response.data.file;
                        $scope.file.upload.result = true;
                        $scope.file.value = document.getElementById("config").getAttribute("data-image-url") + "/bank/account/" + response.data.file;

                    }

                    $scope.firstName.value = response.data.name.first;
                    $scope.id.value = response.data._id;
                    $scope.lastName.value = response.data.name.last;
                    $scope.middleName.value = response.data.name.middle;

                    var modifiedTimestamp = new Date(response.data.modified.timestamp);
                    $scope.modifiedDate.value = modifiedTimestamp.getFullYear() + "-" + ("0" + (modifiedTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + modifiedTimestamp.getDate()).slice(-2) + " " + ("0" + modifiedTimestamp.getHours()).slice(-2) + ":" + ("0" + modifiedTimestamp.getMinutes()).slice(-2) + ":" + ("0" + modifiedTimestamp.getSeconds()).slice(-2);
                    $scope.modifiedDate.view = true;

                    $scope.number.value = response.data.number;
                    $scope.password.value = response.data.password;
                    $scope.phoneNumber.value = response.data.contact.phone_number.slice(3);
                    $scope.pin.value = response.data.pin;
                    $scope.province.value = response.data.province;
                    $scope.sequence.value = response.data.sequence;
                    $scope.streetAddress.value = response.data.street_address;
                    $scope.type.value = response.data.type;
                    $scope.username.value = response.data.username;
                    $scope.zipCode.value = response.data.zip_code;

                    angular.forEach($scope.country.option, function (value, key) {

                        if (value.name == response.data.country) {

                            $scope.country.selected = $scope.country.option[key];

                            return false;

                        }

                    });

                    angular.forEach($scope.gender.option, function (value, key) {

                        if (value.name == response.data.gender) {

                            $scope.gender.selected = $scope.gender.option[key];

                            return false;

                        }

                    });

                    angular.forEach($scope.phoneNumber.countryCode.option, function (value, key) {

                        if (value.number == response.data.contact.phone_number.slice(0, 3)) {

                            $scope.phoneNumber.countryCode.selected = $scope.phoneNumber.countryCode.option[key];

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

                angular.forEach(response.bank, function (value, key) {

                    $scope.bank.option.push({
                        "id": value._id,
                        "name": value.name
                    });

                    if (response.hasOwnProperty("data")) {

                        if (value._id == response.data.bank.id) {

                            $scope.bank.selected = $scope.bank.option[key + 1];

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


    $scope.initializeInput = function () {

        var result = {
            "phoneNumber": $scope.phoneNumber.value,
        };

        if ($scope.phoneNumber.value != "") {

            result.phoneNumber = $scope.phoneNumber.countryCode.selected.number + $scope.phoneNumber.value;

        }

        return result;

    }


    $scope.initializePagination = function () {

        $scope.loading.view = true;

        var rest = {
            "data": {},
            "url": document.getElementById("config").getAttribute("data-base-url") + "/bank/account/initialize-pagination"
        };
        bankAccount.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("filter")) {

                    $scope.filter.id.value = response.filter._id[1];
                    $scope.filter.firstName.value = response.filter.name_first[1];
                    $scope.filter.lastName.value = response.filter.name_last[1];
                    $scope.filter.middleName.value = response.filter.name_middle[1];
                    $scope.filter.number.value = response.filter.number[1];

                    angular.forEach($scope.filter.country.option, function (value, key) {

                        if (value.name == response.filter.country[1]) {

                            $scope.filter.country.selected = $scope.filter.country.option[key];

                            return false;

                        }

                    });

                    angular.forEach($scope.filter.gender.option, function (value, key) {

                        if (value.name == response.filter.gender[1]) {

                            $scope.filter.gender.selected = $scope.filter.gender.option[key];

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
                    "bank": {
                        "id": $scope.bank.selected.id,
                        "name": $scope.bank.selected.name,
                    },
                    "city": $scope.city.value,
                    "contact": {
                        "email_address": $scope.emailAddress.value,
                        "phone_number": input.phoneNumber
                    },
                    "country": $scope.country.selected.name,
                    "file": $scope.file.value,
                    "gender": $scope.gender.selected.name,
                    "name": {
                        "first": $scope.firstName.value,
                        "last": $scope.lastName.value,
                        "middle": $scope.middleName.value
                    },
                    "number": $scope.number.value,
                    "password": $scope.password.value,
                    "pin": $scope.pin.value,
                    "province": $scope.province.value,
                    "sequence": $scope.sequence.value,
                    "status": $scope.status.selected.name,
                    "street_address": $scope.streetAddress.value,
                    "type": $scope.type.value,
                    "username": $scope.username.value,
                    "zip_code": $scope.zipCode.value
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/bank/account/insert"
            };
            bankAccount.rest(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/bank/account/initialize-data"
        }
        bankAccount.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("data")) {

                    $scope.bank.value = response.data.bank.name;
                    $scope.city.value = response.data.city;
                    $scope.country.value = response.data.country;

                    var createdTimestamp = new Date(response.data.created.timestamp);
                    $scope.createdDate.value = createdTimestamp.getFullYear() + "-" + ("0" + (createdTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + createdTimestamp.getDate()).slice(-2) + " " + ("0" + createdTimestamp.getHours()).slice(-2) + ":" + ("0" + createdTimestamp.getMinutes()).slice(-2) + ":" + ("0" + createdTimestamp.getSeconds()).slice(-2);

                    if (response.data.file != "") {

                        $scope.file.upload.file = response.data.file;
                        $scope.file.upload.result = true;
                        $scope.file.value = document.getElementById("config").getAttribute("data-image-url") + "/bank/account/" + response.data.file;

                    }

                    $scope.firstName.value = response.data.name.first;
                    $scope.gender.value = response.data.gender;
                    $scope.id.value = response.data._id;
                    $scope.lastName.value = response.data.name.last;
                    $scope.middleName.value = response.data.name.middle;

                    var modifiedTimestamp = new Date(response.data.modified.timestamp);
                    $scope.modifiedDate.value = modifiedTimestamp.getFullYear() + "-" + ("0" + (modifiedTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + modifiedTimestamp.getDate()).slice(-2) + " " + ("0" + modifiedTimestamp.getHours()).slice(-2) + ":" + ("0" + modifiedTimestamp.getMinutes()).slice(-2) + ":" + ("0" + modifiedTimestamp.getSeconds()).slice(-2);

                    $scope.number.value = response.data.number;
                    $scope.province.value = response.data.province;
                    $scope.sequence.value = response.data.sequence;
                    $scope.status.value = response.data.status;
                    $scope.streetAddress.value = response.data.streetAddress;
                    $scope.type.value = $scope.type.value.slice(2);
                    $scope.zipCode.value = response.data.zip_code;

                    angular.forEach($scope.type.option, function (value, key) {

                        angular.forEach(response.data.type, function (valueChild, keyChild) {

                            if (value.name == valueChild) {

                                $scope.type.option[key].status = true;

                                return false;

                            }

                        });

                    });

                }

                $scope.popup.view = true;
                $scope.popup.bankAccount = true;

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/bank/account/remove-filter-pagination"
        };
        bankAccount.rest(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/bank/account/set-pagination"
        };
        bankAccount.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/bank/account/";

            } else {

                $scope.response.class = "error";
                $scope.response.message = response.response;
                $scope.response.view = true;

            }

            $scope.hideResponse();

        });

        event.preventDefault();

    }


    $scope.typeToggleCheckbox = function (type, selected) {

        var index = selected.indexOf(type.name);

        if (index > -1) {

            selected.splice(index, 1);

        } else {

            selected.push(type.name);

        }

        if ($scope.type.value.length == 0) {

            $scope.type.status = "Unchecked All";

        } else if ($scope.type.value.length > 0 && $scope.type.value.length < $scope.type.option.length) {

            $scope.type.status = "Checked In Part";

        } else if ($scope.type.value.length == $scope.type.option.length) {

            $scope.type.status = "Checked All";

        }

    }


    $scope.typeToggleAllCheckbox = function () {

        if ($scope.type.value.length == $scope.type.option.length) {

            $scope.type.value = [];
            $scope.type.status = "Unchecked All";

        } else if ($scope.type.value.length >= 0) {

            $scope.type.value = [];

            angular.forEach($scope.type.option, function (value, key) {

                $scope.type.value.push(value.name);

            });

            $scope.type.status = "Checked All";

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/bank/account/upload-file"
        };
        bankAccount.restMultipart(rest, function (response) {

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


app.provider("bankAccount", function () {


    this.$get = ["$http", function ($http) {


        var bankAccount = {};


        bankAccount.rest = function (rest, callback) {

            $http({
                "data": rest.data,
                "headers": {"Content-Type": "application/json"},
                "method": "POST",
                "url": rest.url
            }).then(function (response) {

                callback(response.data);

            });

        }


        bankAccount.restMultipart = function (rest, callback) {

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


        return bankAccount;


    }];


});


app.directive("bankAccountDetail", function () {


    var bankAccount = {};


    bankAccount.templateUrl = document.getElementById("config").getAttribute("data-base-url") + "/resource/html/bank-account-detail-popup.html";


    return bankAccount;


});


app.directive("bankAccountFilePreview", function () {


    var bankAccount = {};


    bankAccount.template = "<img class=\"responsive\" ng-src=\"" + document.getElementById("config").getAttribute("data-image-url") + "/bank/account/{{file.upload.file}}\" />";


    return bankAccount;


});
