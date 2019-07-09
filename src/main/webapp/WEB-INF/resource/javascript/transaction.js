app.controller("transaction", ["$scope", "$window", "$log", "transaction", function ($scope, $window, $log, transaction) {


    $scope.amount = {
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
        "fromBank": {
            "option": [
                {"id": "", "name": "From Bank"}
            ],
            value: ""
        },
        "fromBankAccount": {
            "option": [
                {"id": "", "name": "From Bank Account", "number": ""}
            ],
            value: ""
        },
        "id": {
            value: ""
        },
        "status": {
            "option": [
                {"name": "Status"},
                {"name": "Approved"},
                {"name": "Rejected"},
                {"name": "Pending"}
            ],
            "value": ""
        },
        "toBank": {
            "option": [
                {"id": "", "name": "To Bank"}
            ],
            value: ""
        },
        "toBankAccount": {
            "option": [
                {"id": "", "name": "To Bank Account", "number": ""}
            ],
            value: ""
        },
        "type": {
            "option": [
                {"name": "Type"},
                {"name": "Adjustment"},
                {"name": "Expense"},
                {"name": "Internal"},
                {"name": "Saving"}
            ],
            "value": ""
        }
    };

    $scope.filter.fromBank.selected = $scope.filter.fromBank.option[0];

    $scope.filter.fromBankAccount.selected = $scope.filter.fromBankAccount.option[0];

    $scope.filter.status.selected = $scope.filter.status.option[0];

    $scope.filter.toBank.selected = $scope.filter.toBank.option[0];

    $scope.filter.toBankAccount.selected = $scope.filter.toBankAccount.option[0];

    $scope.filter.type.selected = $scope.filter.type.option[0];

    $scope.fromBank = {
        "option": [
            {"id": "", "name": "From Bank"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": "",
        "view": false
    };

    $scope.fromBank.selected = $scope.fromBank.option[0];

    $scope.fromBankAccount = {
        "option": [
            {"id": "", "name": "From Bank Account", "number": ""}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": "",
        "view": false
    };

    $scope.fromBankAccount.selected = $scope.fromBankAccount.option[0];

    $scope.id = {
        "value": ""
    };

    $scope.modifiedDate = {
        "value": "",
        "view": false
    };

    $scope.site = {
        "page": "",
        "pagination": ""
    };

    $scope.status = {
        "option": [
            {"name": "Status"},
            {"name": "Approved"},
            {"name": "Rejected"},
            {"name": "Pending"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.status.selected = $scope.status.option[0];

    $scope.toBank = {
        "option": [
            {"id": "", "name": "To Bank"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": "",
        "view": false
    };

    $scope.toBank.selected = $scope.toBank.option[0];

    $scope.toBankAccount = {
        "option": [
            {"id": "", "name": "To Bank Account", "number": ""}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": "",
        "view": false
    };

    $scope.toBankAccount.selected = $scope.toBankAccount.option[0];

    $scope.type = {
        "option": [
            {"name": "Type"},
            {"name": "Adjustment"},
            {"name": "Expense"},
            {"name": "Internal"},
            {"name": "Saving"}
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
        "file": false,
        "fromBank": false,
        "fromBankAccount": false,
        "status": false,
        "toBank": false,
        "toBankAccount": false,
        "type": false
    };


    $scope.checkAmount = function () {

        if (!$scope.amount.value.match(/^[0-9,.]+$/)) {

            $scope.amount.response.value = "Please enter decimal amount";
            $scope.amount.response.class = "error";
            $scope.amount.response.view = true;
            $scope.valid.amount = false;

        } else {

            $scope.amount.response.view = false;
            $scope.valid.amount = true;

        }

        $scope.amount.value = library.numeral.initializeSeparator($scope.amount.value);

    }


    $scope.checkData = function () {

        if ($scope.type.selected.name != "Type") {

            if ($scope.type.selected.name == "Adjustment") {

                if ($scope.fromBank.selected.id != "" && $scope.fromBankAccount.selected.id != "") {

                    $scope.checkFromBank();

                    $scope.checkFromBankAccount();

                    $scope.valid.toBank = true;
                    $scope.valid.toBankAccount = true;

                } else if ($scope.toBank.selected.id != "" && $scope.toBankAccount.selected.id != "") {

                    $scope.checkToBank();

                    $scope.checkToBankAccount();

                    $scope.valid.fromBank = true;
                    $scope.valid.fromBankAccount = true;

                } else {

                    $scope.checkFromBank();

                    $scope.checkFromBankAccount();

                    $scope.checkToBank();

                    $scope.checkToBankAccount();

                }

            } else if ($scope.type.selected.name == "Expense") {

                $scope.checkFromBank();

                $scope.checkFromBankAccount();

                $scope.valid.toBank = true;
                $scope.valid.toBankAccount = true;

            } else {

                $scope.checkFromBank();

                $scope.checkFromBankAccount();

                $scope.checkToBank();

                $scope.checkToBankAccount();

            }

        }

        $scope.checkAmount();

        $scope.checkFile();

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


    $scope.checkFromBank = function () {

        if ($scope.fromBank.selected.id == "") {

            $scope.fromBank.response.value = "Please select transaction from bank";
            $scope.fromBank.response.class = "error";
            $scope.fromBank.response.view = true;
            $scope.valid.fromBank = false;

        } else {

            $scope.fromBank.response.view = false;
            $scope.valid.fromBank = true;

        }

    }


    $scope.checkFromBankAccount = function () {

        if ($scope.fromBankAccount.selected.id == "") {

            $scope.fromBankAccount.response.value = "Please select transaction from bank account";
            $scope.fromBankAccount.response.class = "error";
            $scope.fromBankAccount.response.view = true;
            $scope.valid.fromBankAccount = false;

        } else {

            $scope.fromBankAccount.response.view = false;
            $scope.valid.fromBankAccount = true;

        }

    }


    $scope.checkStatus = function () {

        if ($scope.status.selected.name == "Status") {

            $scope.status.response.value = "Please select transaction status";
            $scope.status.response.class = "error";
            $scope.status.response.view = true;
            $scope.valid.status = false;

        } else {

            $scope.status.response.view = false;
            $scope.valid.status = true;

        }

    }


    $scope.checkToBank = function () {

        if ($scope.toBank.selected.id == "") {

            $scope.toBank.response.value = "Please select transaction to bank";
            $scope.toBank.response.class = "error";
            $scope.toBank.response.view = true;
            $scope.valid.toBank = false;

        } else {

            $scope.toBank.response.view = false;
            $scope.valid.toBank = true;

        }

    }


    $scope.checkToBankAccount = function () {

        if ($scope.toBankAccount.selected.id == "") {

            $scope.toBankAccount.response.value = "Please select transaction to bank account";
            $scope.toBankAccount.response.class = "error";
            $scope.toBankAccount.response.view = true;
            $scope.valid.toBankAccount = false;

        } else {

            $scope.toBankAccount.response.view = false;
            $scope.valid.toBankAccount = true;

        }

    }


    $scope.checkType = function () {

        if ($scope.type.selected.name == "Type") {

            $scope.fromBank.view = false;
            $scope.fromBankAccount.view = false;
            $scope.toBank.view = false;
            $scope.toBankAccount.view = false;

            $scope.type.response.value = "Please select transaction type";
            $scope.type.response.class = "error";
            $scope.type.response.view = true;
            $scope.valid.type = false;

        } else {

            if ($scope.type.selected.name == "Expense") {

                $scope.fromBank.view = true;
                $scope.fromBankAccount.view = true;
                $scope.toBank.view = false;
                $scope.toBankAccount.view = false;

            } else {

                $scope.fromBank.view = true;
                $scope.fromBankAccount.view = true;
                $scope.toBank.view = true;
                $scope.toBankAccount.view = true;

            }

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/transaction/delete"
        };
        transaction.rest(rest, function (response) {

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

            var fromBankAccountNameArray = $scope.fromBankAccount.selected.name.split(" - ");

            var fromBankAccountName = "";

            if (fromBankAccountNameArray.length > 1) {

                fromBankAccountName = fromBankAccountNameArray[fromBankAccountNameArray.length - 1];

            }

            var toBankAccountNameArray = $scope.toBankAccount.selected.name.split(" - ");

            var toBankAccountName = "";

            if (toBankAccountNameArray.length > 1) {

                toBankAccountName = toBankAccountNameArray[toBankAccountNameArray.length - 1];

            }

            var rest = {
                "data": {
                    "amount": $scope.amount.value,
                    "description": $scope.description.value,
                    "file": $scope.file.value,
                    "from_bank": {
                        "account": {
                            "id": $scope.fromBankAccount.selected.id,
                            "name": fromBankAccountName,
                            "number": $scope.fromBankAccount.selected.number
                        },
                        "id": $scope.fromBank.selected.id,
                        "name": $scope.fromBank.selected.name
                    },
                    "id": $scope.id.value,
                    "status": $scope.status.selected.name,
                    "to_bank": {
                        "account": {
                            "id": $scope.toBankAccount.selected.id,
                            "name": toBankAccountName,
                            "number": $scope.toBankAccount.selected.number
                        },
                        "id": $scope.toBank.selected.id,
                        "name": $scope.toBank.selected.name
                    },
                    "type": $scope.type.selected.name
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/transaction/update"
            };
            transaction.rest(rest, function (response) {

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
            "from_bank.id": ["equal", $scope.filter.fromBank.selected.id],
            "status": ["equal", ""],
            "to_bank.id": ["equal", $scope.filter.toBank.selected.id],
            "to_bank.account.id": ["equal", $scope.filter.toBankAccount.selected.id],
            "type": ["equal", ""]
        };

        if ($scope.filter.status.selected.name != "Status") {

            data["status"][1] = $scope.filter.status.selected.name;

        }

        if ($scope.filter.type.selected.name != "Type") {

            data["type"][1] = $scope.filter.type.selected.name;

        }

        var rest = {
            "data": data,
            "url": document.getElementById("config").getAttribute("data-base-url") + "/transaction/filter-pagination"
        };
        transaction.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/transaction/";

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

        document.getElementsByClassName("transaction-file")[0].click();

    }


    $scope.goToPage = function (event) {

        if (event.which == 13) {

            $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/transaction/page-" + $scope.site.page;

        }

        event.preventDefault();

    }


    $scope.initializeData = function (id) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "id": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/transaction/initialize-data"
        }
        transaction.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("data")) {

                    $scope.amount.value = library.numeral.initializeSeparator(response.data.amount);

                    var createdTimestamp = new Date(response.data.created.timestamp);
                    $scope.createdDate.value = createdTimestamp.getFullYear() + "-" + ("0" + (createdTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + createdTimestamp.getDate()).slice(-2) + " " + ("0" + createdTimestamp.getHours()).slice(-2) + ":" + ("0" + createdTimestamp.getMinutes()).slice(-2) + ":" + ("0" + createdTimestamp.getSeconds()).slice(-2);
                    $scope.createdDate.view = true;

                    $scope.description.value = response.data.description;

                    if (response.data.file != "") {

                        $scope.file.upload.file = response.data.file;
                        $scope.file.upload.result = true;
                        $scope.file.value = response.data.file;

                    }

                    $scope.id.value = response.data._id;

                    var modifiedTimestamp = new Date(response.data.modified.timestamp);
                    $scope.modifiedDate.value = modifiedTimestamp.getFullYear() + "-" + ("0" + (modifiedTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + modifiedTimestamp.getDate()).slice(-2) + " " + ("0" + modifiedTimestamp.getHours()).slice(-2) + ":" + ("0" + modifiedTimestamp.getMinutes()).slice(-2) + ":" + ("0" + modifiedTimestamp.getSeconds()).slice(-2);
                    $scope.modifiedDate.view = true;

                    angular.forEach($scope.status.option, function (value, key) {

                        if (value.name == response.data.status) {

                            $scope.status.selected = $scope.status.option[key];

                            return false;

                        }

                    });

                    angular.forEach($scope.type.option, function (value, key) {

                        if (value.name == response.data.type) {

                            $scope.type.selected = $scope.type.option[key];

                            return false;

                        }

                    });

                    if (response.data.type == "Expense") {

                        $scope.fromBank.view = true;
                        $scope.fromBankAccount.view = true;
                        $scope.toBank.view = false;
                        $scope.toBankAccount.view = false;

                    } else {

                        $scope.fromBank.view = true;
                        $scope.fromBankAccount.view = true;
                        $scope.toBank.view = true;
                        $scope.toBankAccount.view = true;

                    }

                }

                if (response.hasOwnProperty("fromBankAccount")) {

                    angular.forEach(response.fromBankAccount, function (value, key) {

                        var name = value.bank.name + " - " + value.number + " - " + value.name.first;

                        if (value.name.middle != "") {

                            name += " " + value.name.middle;

                        }

                        if (value.name.last != "") {

                            name += " " + value.name.last;

                        }

                        $scope.fromBankAccount.option.push({
                            "id": value._id,
                            "name": name,
                            "number": value.number
                        });

                        if (response.hasOwnProperty("data")) {

                            if (value._id == response.data.from_bank.account.id) {

                                $scope.fromBankAccount.selected = $scope.fromBankAccount.option[key + 1];

                            }

                        }

                    });

                }

                if (response.hasOwnProperty("toBankAccount")) {

                    angular.forEach(response.toBankAccount, function (value, key) {

                        var name = value.bank.name + " - " + value.number + " - " + value.name.first;

                        if (value.name.middle != "") {

                            name += " " + value.name.middle;

                        }

                        if (value.name.last != "") {

                            name += " " + value.name.last;

                        }

                        $scope.toBankAccount.option.push({
                            "id": value._id,
                            "name": name,
                            "number": value.number
                        });

                        if (response.hasOwnProperty("data")) {

                            if (value._id == response.data.to_bank.account.id) {

                                $scope.toBankAccount.selected = $scope.toBankAccount.option[key + 1];

                            }

                        }

                    });

                }

                angular.forEach(response.bank, function (value, key) {

                    $scope.fromBank.option.push({
                        "id": value._id,
                        "name": value.name
                    });

                    $scope.toBank.option.push({
                        "id": value._id,
                        "name": value.name
                    });

                    if (response.hasOwnProperty("data")) {

                        if (value._id == response.data.from_bank.id) {

                            $scope.fromBank.selected = $scope.fromBank.option[key + 1];

                        }

                        if (value._id == response.data.to_bank.id) {

                            $scope.toBank.selected = $scope.toBank.option[key + 1];

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/transaction/initialize-pagination"
        };
        transaction.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("filter")) {

                    $scope.filter.id.value = response.filter._id[1];

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

                angular.forEach(response.bank, function (value, key) {

                    $scope.filter.fromBank.option.push({
                        "id": value._id,
                        "name": value.name
                    });

                    $scope.filter.toBank.option.push({
                        "id": value._id,
                        "name": value.name
                    });

                    if (response.hasOwnProperty("filter")) {

                        if (value._id == response.filter.from_bank_id[1]) {

                            $scope.filter.fromBank.selected = $scope.filter.fromBank.option[key + 1];

                        }

                        if (value._id == response.filter.to_bank_id[1]) {

                            $scope.filter.toBank.selected = $scope.filter.toBank.option[key + 1];

                        }

                    }

                });

                angular.forEach(response.bankAccount, function (value, key) {

                    var name = value.bank.name + " - " + value.number + " - " + value.name.first;

                    if (value.name.middle != "") {

                        name += " " + value.name.middle;

                    }

                    if (value.name.last != "") {

                        name += " " + value.name.last;

                    }

                    $scope.filter.fromBankAccount.option.push({
                        "id": value._id,
                        "name": name,
                        "number": value.number
                    });

                    $scope.filter.toBankAccount.option.push({
                        "id": value._id,
                        "name": name,
                        "number": value.number
                    });

                    if (response.hasOwnProperty("filter")) {

                        if (value._id == response.filter.from_bank_account_id[1]) {

                            $scope.filter.fromBankAccount.selected = $scope.filter.fromBankAccount.option[key + 1];

                        }

                        if (value._id == response.filter.to_bank_account_id[1]) {

                            $scope.filter.toBankAccount.selected = $scope.filter.toBankAccount.option[key + 1];

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

            var fromBankAccountNameArray = $scope.fromBankAccount.selected.name.split(" - ");

            var fromBankAccountName = "";

            if (fromBankAccountNameArray.length > 1) {

                fromBankAccountName = fromBankAccountNameArray[fromBankAccountNameArray.length - 1];

            }

            var toBankAccountNameArray = $scope.toBankAccount.selected.name.split(" - ");

            var toBankAccountName = "";

            if (toBankAccountNameArray.length > 1) {

                toBankAccountName = toBankAccountNameArray[toBankAccountNameArray.length - 1];

            }

            var rest = {
                "data": {
                    "amount": $scope.amount.value,
                    "description": $scope.description.value,
                    "file": $scope.file.value,
                    "from_bank": {
                        "account": {
                            "id": $scope.fromBankAccount.selected.id,
                            "name": fromBankAccountName,
                            "number": $scope.fromBankAccount.selected.number
                        },
                        "id": $scope.fromBank.selected.id,
                        "name": $scope.fromBank.selected.name
                    },
                    "status": $scope.status.selected.name,
                    "to_bank": {
                        "account": {
                            "id": $scope.toBankAccount.selected.id,
                            "name": toBankAccountName,
                            "number": $scope.toBankAccount.selected.number
                        },
                        "id": $scope.toBank.selected.id,
                        "name": $scope.toBank.selected.name
                    },
                    "type": $scope.type.selected.name
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/transaction/insert"
            };
            transaction.rest(rest, function (response) {

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


    $scope.loadBankAccount = function (field, id) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "bankId": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/transaction/load-bank-account"
        }
        transaction.rest(rest, function (response) {

            if (response.result) {

                if (field == "fromBankAccount") {

                    $scope.fromBankAccount.option = [
                        {"id": "", "name": "From Bank Account", "number": ""}
                    ];

                    $scope.fromBankAccount.selected = $scope.fromBankAccount.option[0];

                } else {

                    $scope.toBankAccount.option = [
                        {"id": "", "name": "To Bank Account", "number": ""}
                    ];

                    $scope.toBankAccount.selected = $scope.toBankAccount.option[0];

                }

                if (response.hasOwnProperty("bankAccount")) {

                    angular.forEach(response.bankAccount, function (value, key) {

                        var name = value.bank.name + " - " + value.number + " - " + value.name.first;

                        if (value.name.middle != "") {

                            name += " " + value.name.middle;

                        }

                        if (value.name.last != "") {

                            name += " " + value.name.last;

                        }

                        if (field == "fromBankAccount") {

                            $scope.fromBankAccount.option.push({
                                "id": value._id,
                                "name": name,
                                "number": value.number
                            });

                        } else {

                            $scope.toBankAccount.option.push({
                                "id": value._id,
                                "name": name,
                                "number": value.number
                            });

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


    $scope.loadDetail = function (id) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "id": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/transaction/initialize-data"
        }
        transaction.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("data")) {

                    $scope.amount.value = library.numeral.initializeSeparator(response.data.amount);
                    $scope.calculation.value = response.data.calculation;

                    var createdTimestamp = new Date(response.data.created.timestamp);
                    $scope.createdDate.value = createdTimestamp.getFullYear() + "-" + ("0" + (createdTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + createdTimestamp.getDate()).slice(-2) + " " + ("0" + createdTimestamp.getHours()).slice(-2) + ":" + ("0" + createdTimestamp.getMinutes()).slice(-2) + ":" + ("0" + createdTimestamp.getSeconds()).slice(-2);

                    $scope.description.value = response.data.description;

                    if (response.data.file != "") {

                        $scope.file.upload.file = response.data.file;
                        $scope.file.upload.result = true;
                        $scope.file.value = document.getElementById("config").getAttribute("data-image-url") + "/game/transaction/" + response.data.file;

                    }

                    $scope.fromBank.value = response.data.from_bank.name;
                    $scope.fromBankAccount.value = response.data.from_bank.account.number + " - " + response.data.from_bank.account.name;
                    $scope.fromPlayer.value = response.data.from_player.username;
                    $scope.game.value = response.data.game.name;
                    $scope.gameType.value = response.data.game.type.name;
                    $scope.id.value = response.data._id;

                    var modifiedTimestamp = new Date(response.data.modified.timestamp);
                    $scope.modifiedDate.value = modifiedTimestamp.getFullYear() + "-" + ("0" + (modifiedTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + modifiedTimestamp.getDate()).slice(-2) + " " + ("0" + modifiedTimestamp.getHours()).slice(-2) + ":" + ("0" + modifiedTimestamp.getMinutes()).slice(-2) + ":" + ("0" + modifiedTimestamp.getSeconds()).slice(-2);

                    $scope.status.value = response.data.status;
                    $scope.toPlayer.value = response.data.to_player.username;
                    $scope.type.value = response.data.type;

                }

                $scope.popup.view = true;
                $scope.popup.gameTransaction = true;

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/transaction/remove-filter-pagination"
        };
        transaction.rest(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/transaction/set-pagination"
        };
        transaction.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/transaction/";

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/transaction/upload-file"
        };
        transaction.restMultipart(rest, function (response) {

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


app.provider("transaction", function () {


    this.$get = ["$http", function ($http) {


        var transaction = {};


        transaction.rest = function (rest, callback) {

            $http({
                "data": rest.data,
                "headers": {"Content-Type": "application/json"},
                "method": "POST",
                "url": rest.url
            }).then(function (response) {

                callback(response.data);

            });

        }


        transaction.restMultipart = function (rest, callback) {

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


        return transaction;


    }];


});


app.directive("transactionDetail", function () {


    var transaction = {};


    transaction.templateUrl = document.getElementById("config").getAttribute("data-base-url") + "/resource/html/transaction-detail-popup.html";


    return transaction;


});


app.directive("transactionFilePreview", function () {


    var transaction = {};


    transaction.template = "<img class=\"responsive\" ng-src=\"" + document.getElementById("config").getAttribute("data-image-url") + "/transaction/{{file.upload.file}}\" />";


    return transaction;


});
