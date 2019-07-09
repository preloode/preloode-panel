app.controller("transactionRequest", ["$scope", "$window", "$log", "transactionRequest", function ($scope, $window, $log, transactionRequest) {


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
        "fromPlayer": {
            "option": [
                {"id": "", "username": "From Player"}
            ],
            value: ""
        },
        "game": {
            "option": [
                {"id": "", "name": "Game"}
            ],
            value: ""
        },
        "id": {
            value: ""
        },
        "promotion": {
            "option": [
                {"id": "", "name": "Promotion"}
            ],
            value: ""
        },
        "status": {
            "option": [
                {"name": "Status"},
                {"name": "Approved"},
                {"name": "Processing"},
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
        "toPlayer": {
            "option": [
                {"id": "", "username": "To Player"}
            ],
            value: ""
        },
        "type": {
            "option": [
                {"name": "Type"},
                {"name": "Deposit"},
                {"name": "Withdrawal"}
            ],
            "value": ""
        }
    };

    $scope.filter.fromBank.selected = $scope.filter.fromBank.option[0];

    $scope.filter.fromBankAccount.selected = $scope.filter.fromBankAccount.option[0];

    $scope.filter.fromPlayer.selected = $scope.filter.fromPlayer.option[0];

    $scope.filter.game.selected = $scope.filter.game.option[0];

    $scope.filter.promotion.selected = $scope.filter.promotion.option[0];

    $scope.filter.status.selected = $scope.filter.status.option[0];

    $scope.filter.toBank.selected = $scope.filter.toBank.option[0];

    $scope.filter.toBankAccount.selected = $scope.filter.toBankAccount.option[0];

    $scope.filter.toPlayer.selected = $scope.filter.toPlayer.option[0];

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

    $scope.fromPlayer = {
        "option": [
            {"groupId": "", "id": "", "username": "From Player"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": "",
        "view": false
    };

    $scope.fromPlayer.selected = $scope.fromPlayer.option[0];

    $scope.fromPlayerBankAccount = {
        "option": [
            {"bankId": "", "bankName": "", "id": "", "name": "From Player Bank Account", "number": ""}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": "",
        "view": false
    };

    $scope.fromPlayerBankAccount.selected = $scope.fromPlayerBankAccount.option[0];

    $scope.game = {
        "option": [
            {"id": "", "name": "Game"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": "",
        "view": false
    };

    $scope.game.selected = $scope.game.option[0];

    $scope.gameType = {
        "option": [
            {"id": "", "name": "Game Type"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": "",
        "view": false
    };

    $scope.gameType.selected = $scope.gameType.option[0];

    $scope.id = {
        "value": ""
    };

    $scope.modifiedDate = {
        "value": "",
        "view": false
    };

    $scope.promotion = {
        "option": [
            {"id": "", "name": "Promotion"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": "",
        "view": false
    };

    $scope.promotion.selected = $scope.promotion.option[0];

    $scope.site = {
        "page": "",
        "pagination": ""
    };

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

    $scope.toPlayer = {
        "option": [
            {"groupId": "", "id": "", "username": "To Player"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": "",
        "view": false
    };

    $scope.toPlayer.selected = $scope.toPlayer.option[0];

    $scope.toPlayerBankAccount = {
        "option": [
            {"bankId": "", "bankName": "", "id": "", "name": "To Player Bank Account", "number": ""}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": "",
        "view": false
    };

    $scope.toPlayerBankAccount.selected = $scope.toPlayerBankAccount.option[0];

    $scope.type = {
        "option": [
            {"name": "Type"},
            {"name": "Deposit"},
            {"name": "Withdrawal"}
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
        "fromPlayer": false,
        "fromPlayerBankAccount": false,
        "game": false,
        "gameType": false,
        "promotion": false,
        "toBank": false,
        "toBankAccount": false,
        "toPlayer": false,
        "toPlayerBankAccount": false,
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

            if ($scope.type.selected.name == "Deposit") {

                $scope.checkFromPlayer();

                $scope.checkFromPlayerBankAccount();

                $scope.checkPromotion();

                $scope.checkToBank();

                $scope.checkToBankAccount();

                $scope.valid.toPlayer = true;
                $scope.valid.toPlayerBankAccount = true;

            } else {

                $scope.checkToPlayer();

                $scope.checkToPlayerBankAccount();

                $scope.valid.fromPlayer = true;
                $scope.valid.fromPlayerBankAccount = true;
                $scope.valid.promotion = true;
                $scope.valid.toBank = true;
                $scope.valid.toBankAccount = true;

            }

        }

        $scope.checkAmount();

        $scope.checkFile();

        $scope.checkGame();

        $scope.checkGameType();

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


    $scope.checkFromPlayer = function () {

        if ($scope.fromPlayer.selected.id == "") {

            $scope.fromPlayer.response.value = "Please select transaction request from player";
            $scope.fromPlayer.response.class = "error";
            $scope.fromPlayer.response.view = true;
            $scope.valid.fromPlayer = false;

        } else {

            $scope.fromPlayer.response.view = false;
            $scope.valid.fromPlayer = true;

        }

    }

    $scope.checkFromPlayerBankAccount = function () {

        if ($scope.fromPlayerBankAccount.selected.id == "") {

            $scope.fromPlayerBankAccount.response.value = "Please select transaction request from player bank account";
            $scope.fromPlayerBankAccount.response.class = "error";
            $scope.fromPlayerBankAccount.response.view = true;
            $scope.valid.fromPlayerBankAccount = false;

        } else {

            $scope.fromPlayerBankAccount.response.view = false;
            $scope.valid.fromPlayerBankAccount = true;

        }

    }


    $scope.checkGame = function () {

        if ($scope.game.selected.id == "") {

            $scope.game.response.view = false;
            $scope.valid.game = true;

        } else {

            $scope.game.response.view = false;
            $scope.valid.game = true;

        }

    }


    $scope.checkGameType = function () {

        if ($scope.gameType.selected.id == "") {

            $scope.gameType.response.view = false;
            $scope.valid.gameType = true;

        } else {

            $scope.gameType.response.view = false;
            $scope.valid.gameType = true;

        }

    }


    $scope.checkPromotion = function () {

        if ($scope.promotion.selected.id == "") {

            $scope.promotion.response.view = false;
            $scope.valid.promotion = true;

        } else {

            $scope.promotion.response.view = false;
            $scope.valid.promotion = true;

        }

    }


    $scope.checkToBank = function () {

        if ($scope.toBank.selected.id == "") {

            $scope.toBank.response.value = "Please select transaction request to bank";
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

            $scope.toBankAccount.response.value = "Please select transaction request to bank account";
            $scope.toBankAccount.response.class = "error";
            $scope.toBankAccount.response.view = true;
            $scope.valid.toBankAccount = false;

        } else {

            $scope.toBankAccount.response.view = false;
            $scope.valid.toBankAccount = true;

        }

    }


    $scope.checkToPlayer = function () {

        if ($scope.toPlayer.selected.id == "") {

            $scope.toPlayer.response.value = "Please select transaction request to player";
            $scope.toPlayer.response.class = "error";
            $scope.toPlayer.response.view = true;
            $scope.valid.toPlayer = false;

        } else {

            $scope.toPlayer.response.view = false;
            $scope.valid.toPlayer = true;

        }

    }


    $scope.checkToPlayerBankAccount = function () {

        if ($scope.toPlayerBankAccount.selected.id == "") {

            $scope.toPlayerBankAccount.response.value = "Please select transaction request to player bank account";
            $scope.toPlayerBankAccount.response.class = "error";
            $scope.toPlayerBankAccount.response.view = true;
            $scope.valid.toPlayerBankAccount = false;

        } else {

            $scope.toPlayerBankAccount.response.view = false;
            $scope.valid.toPlayerBankAccount = true;

        }

    }


    $scope.checkType = function () {

        if ($scope.type.selected.name == "Type") {

            $scope.fromPlayer.view = false;
            $scope.promotion.view = false;
            $scope.toBank.view = false;
            $scope.toBankAccount.view = false;
            $scope.toPlayer.view = false;

            $scope.type.response.value = "Please select transaction request type";
            $scope.type.response.class = "error";
            $scope.type.response.view = true;
            $scope.valid.type = false;

        } else {

            if ($scope.type.selected.name == "Deposit") {

                $scope.fromPlayer.view = true;
                $scope.fromPlayerBankAccount.view = true;
                $scope.promotion.view = true;
                $scope.toBank.view = true;
                $scope.toBankAccount.view = true;
                $scope.toPlayer.view = false;
                $scope.toPlayerBankAccount.view = false;

            } else {

                $scope.fromPlayer.view = false;
                $scope.fromPlayerBankAccount.view = false;
                $scope.promotion.view = false;
                $scope.toBank.view = false;
                $scope.toBankAccount.view = false;
                $scope.toPlayer.view = true;
                $scope.toPlayerBankAccount.view = true;

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/transaction/request/delete"
        };
        transactionRequest.rest(rest, function (response) {

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

            var fromPlayerBankAccountNameArray = $scope.fromPlayerBankAccount.selected.name.split(" - ");

            var fromPlayerBankAccountName = "";

            if (fromPlayerBankAccountNameArray.length > 1) {

                fromPlayerBankAccountName = fromPlayerBankAccountNameArray[fromPlayerBankAccountNameArray.length - 1];

            }

            var toBankAccountNameArray = $scope.toBankAccount.selected.name.split(" - ");

            var toBankAccountName = "";

            if (toBankAccountNameArray.length > 1) {

                toBankAccountName = toBankAccountNameArray[toBankAccountNameArray.length - 1];

            }

            var toPlayerBankAccountNameArray = $scope.toPlayerBankAccount.selected.name.split(" - ");

            var toPlayerBankAccountName = "";

            if (toPlayerBankAccountNameArray.length > 1) {

                toPlayerBankAccountName = toPlayerBankAccountNameArray[toPlayerBankAccountNameArray.length - 1];

            }

            var rest = {
                "data": {
                    "amount": $scope.amount.value,
                    "description": $scope.description.value,
                    "file": $scope.file.value,
                    "from_player": {
                        "bank": {
                            "account": {
                                "id": $scope.fromPlayerBankAccount.selected.id,
                                "name": fromPlayerBankAccountName,
                                "number": $scope.fromPlayerBankAccount.selected.number
                            },
                            "id": $scope.fromPlayerBankAccount.selected.bankId,
                            "name": $scope.fromPlayerBankAccount.selected.bankName
                        },
                        "id": $scope.fromPlayer.selected.id,
                        "username": $scope.fromPlayer.selected.username
                    },
                    "game": {
                        "id": $scope.game.selected.id,
                        "name": $scope.game.selected.name,
                        "type": {
                            "id": $scope.gameType.selected.id,
                            "name": $scope.gameType.selected.name
                        }
                    },
                    "id": $scope.id.value,
                    "promotion": {
                        "id": $scope.promotion.selected.id,
                        "name": $scope.promotion.selected.name
                    },
                    "to_bank": {
                        "account": {
                            "id": $scope.toBankAccount.selected.id,
                            "name": toBankAccountName,
                            "number": $scope.toBankAccount.selected.number
                        },
                        "id": $scope.toBank.selected.id,
                        "name": $scope.toBank.selected.name
                    },
                    "to_player": {
                        "bank": {
                            "account": {
                                "id": $scope.toPlayerBankAccount.selected.id,
                                "name": toPlayerBankAccountName,
                                "number": $scope.toPlayerBankAccount.selected.number
                            },
                            "id": $scope.toPlayerBankAccount.selected.bankId,
                            "name": $scope.toPlayerBankAccount.selected.bankName
                        },
                        "id": $scope.toPlayer.selected.id,
                        "username": $scope.toPlayer.selected.username
                    },
                    "type": $scope.type.selected.name
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/transaction/request/update"
            };
            transactionRequest.rest(rest, function (response) {

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
            "from_bank.account.id": ["equal", $scope.filter.fromBankAccount.selected.id],
            "from_player.id": ["equal", $scope.filter.fromPlayer.selected.id],
            "game.id": ["equal", $scope.filter.game.selected.id],
            "promotion.id": ["equal", $scope.filter.promotion.selected.id],
            "status": ["equal", ""],
            "to_bank.id": ["equal", $scope.filter.toBank.selected.id],
            "to_bank.account.id": ["equal", $scope.filter.toBankAccount.selected.id],
            "to_player.id": ["equal", $scope.filter.toPlayer.selected.id],
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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/transaction/request/filter-pagination"
        };
        transactionRequest.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/transaction/request/";

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

        document.getElementsByClassName("transaction-request-file")[0].click();

    }


    $scope.goToPage = function (event) {

        if (event.which == 13) {

            $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/transaction/request/page-" + $scope.site.page;

        }

        event.preventDefault();

    }


    $scope.initializeData = function (id) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "id": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/transaction/request/initialize-data"
        }
        transactionRequest.rest(rest, function (response) {

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

                    angular.forEach($scope.type.option, function (value, key) {

                        if (value.name == response.data.type) {

                            $scope.type.selected = $scope.type.option[key];

                            return false;

                        }

                    });

                    angular.forEach(response.game, function (value, key) {

                        $scope.game.option.push({
                            "id": value._id,
                            "name": value.name
                        });

                        if (value._id == response.data.game.id) {

                            $scope.game.selected = $scope.game.option[key + 1];

                        }

                    });

                    angular.forEach(response.player, function (value, key) {

                        $scope.fromPlayer.option.push({
                            "groupId": value.group.id,
                            "id": value._id,
                            "username": value.username
                        });

                        $scope.toPlayer.option.push({
                            "groupId": value.group.id,
                            "id": value._id,
                            "username": value.username
                        });

                        if (value._id == response.data.from_player.id) {

                            $scope.fromPlayer.selected = $scope.fromPlayer.option[key + 1];

                            for (var i = 0; i < value.bank.account.id.length; i++) {

                                var name = value.bank.name[i] + " - " + value.bank.account.number[i] + " - " + value.bank.account.name[i];

                                $scope.fromPlayerBankAccount.option.push({
                                    "bankId": value.bank.id[i],
                                    "bankName": value.bank.name[i],
                                    "id": value.bank.account.id[i],
                                    "name": name,
                                    "number": value.bank.account.number[i]
                                });

                                if (value.bank.account.id[i] == response.data.from_player.bank.account.id) {

                                    $scope.fromPlayerBankAccount.selected = $scope.fromPlayerBankAccount.option[i + 1];

                                }

                            }

                        }

                        if (value._id == response.data.to_player.id) {

                            $scope.toPlayer.selected = $scope.toPlayer.option[key + 1];

                            for (var i = 0; i < value.bank.account.id.length; i++) {

                                var name = value.bank.name[i] + " - " + value.bank.account.number[i] + " - " + value.bank.account.name[i];

                                $scope.toPlayerBankAccount.option.push({
                                    "bankId": value.bank.id[i],
                                    "bankName": value.bank.name[i],
                                    "id": value.bank.account.id[i],
                                    "name": name,
                                    "number": value.bank.account.number[i]
                                });

                                if (value.bank.account.id[i] == response.data.to_player.bank.account.id) {

                                    $scope.toPlayerBankAccount.selected = $scope.toPlayerBankAccount.option[i + 1];

                                }

                            }

                        }

                    });

                    angular.forEach(response.promotion, function (value, key) {

                        $scope.promotion.option.push({
                            "id": value._id,
                            "name": value.name
                        });

                        if (value._id == response.data.promotion.id) {

                            $scope.promotion.selected = $scope.promotion.option[key + 1];

                        }

                    });

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

                        if (value._id == response.data.to_bank.account.id) {

                            $scope.toBankAccount.selected = $scope.toBankAccount.option[key + 1];

                        }

                    });

                    if (response.data.type == "Deposit") {

                        $scope.fromPlayer.view = true;
                        $scope.fromPlayerBankAccount.view = true;
                        $scope.promotion.view = true;
                        $scope.toBank.view = true;
                        $scope.toBankAccount.view = true;

                    } else {

                        $scope.toPlayer.view = true;
                        $scope.toPlayerBankAccount.view = true;

                    }

                }

                angular.forEach(response.bank, function (value, key) {

                    $scope.toBank.option.push({
                        "id": value._id,
                        "name": value.name
                    });

                    if (response.hasOwnProperty("data")) {

                        if (value._id == response.data.to_bank.id) {

                            $scope.toBank.selected = $scope.toBank.option[key + 1];

                        }

                    }

                });

                angular.forEach(response.gameType, function (value, key) {

                    $scope.gameType.option.push({
                        "id": value._id,
                        "name": value.name
                    });

                    if (response.hasOwnProperty("data")) {

                        if (value._id == response.data.game.type.id) {

                            $scope.gameType.selected = $scope.gameType.option[key + 1];

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/transaction/request/initialize-pagination"
        };
        transactionRequest.rest(rest, function (response) {

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

                angular.forEach(response.game, function (value, key) {

                    $scope.filter.game.option.push({
                        "id": value._id,
                        "name": value.type.name + " - " + value.name,
                    });

                    if (response.hasOwnProperty("filter")) {

                        if (value._id == response.filter.game_id[1]) {

                            $scope.filter.game.selected = $scope.filter.game.option[key + 1];

                        }

                    }

                });

                angular.forEach(response.player, function (value, key) {

                    $scope.filter.fromPlayer.option.push({
                        "id": value._id,
                        "username": value.username,
                    });

                    $scope.filter.toPlayer.option.push({
                        "id": value._id,
                        "username": value.username,
                    });

                    if (response.hasOwnProperty("filter")) {

                        if (value._id == response.filter.from_player_id[1]) {

                            $scope.filter.fromPlayer.selected = $scope.filter.fromPlayer.option[key + 1];

                        }

                        if (value._id == response.filter.to_player_id) {

                            $scope.filter.toPlayer.selected = $scope.filter.toPlayer.option[key + 1];

                        }

                    }

                });

                angular.forEach(response.promotion, function (value, key) {

                    $scope.filter.promotion.option.push({
                        "id": value._id,
                        "name": value.name,
                    });

                    if (response.hasOwnProperty("filter")) {

                        if (value._id == response.filter.promotion_id) {

                            $scope.filter.promotion.selected = $scope.filter.promotion.option[key + 1];

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

            var fromPlayerBankAccountNameArray = $scope.fromPlayerBankAccount.selected.name.split(" - ");

            var fromPlayerBankAccountName = "";

            if (fromPlayerBankAccountNameArray.length > 1) {

                fromPlayerBankAccountName = fromPlayerBankAccountNameArray[fromPlayerBankAccountNameArray.length - 1];

            }

            var toBankAccountNameArray = $scope.toBankAccount.selected.name.split(" - ");

            var toBankAccountName = "";

            if (toBankAccountNameArray.length > 1) {

                toBankAccountName = toBankAccountNameArray[toBankAccountNameArray.length - 1];

            }

            var toPlayerBankAccountNameArray = $scope.toPlayerBankAccount.selected.name.split(" - ");

            var toPlayerBankAccountName = "";

            if (toPlayerBankAccountNameArray.length > 1) {

                toPlayerBankAccountName = toPlayerBankAccountNameArray[toPlayerBankAccountNameArray.length - 1];

            }

            var rest = {
                "data": {
                    "amount": $scope.amount.value,
                    "description": $scope.description.value,
                    "file": $scope.file.value,
                    "from_player": {
                        "bank": {
                            "account": {
                                "id": $scope.fromPlayerBankAccount.selected.id,
                                "name": fromPlayerBankAccountName,
                                "number": $scope.fromPlayerBankAccount.selected.number
                            },
                            "id": $scope.fromPlayerBankAccount.selected.bankId,
                            "name": $scope.fromPlayerBankAccount.selected.bankName
                        },
                        "id": $scope.fromPlayer.selected.id,
                        "username": $scope.fromPlayer.selected.username
                    },
                    "game": {
                        "id": $scope.game.selected.id,
                        "name": $scope.game.selected.name,
                        "type": {
                            "id": $scope.gameType.selected.id,
                            "name": $scope.gameType.selected.name
                        }
                    },
                    "promotion": {
                        "id": $scope.promotion.selected.id,
                        "name": $scope.promotion.selected.name
                    },
                    "to_bank": {
                        "account": {
                            "id": $scope.toBankAccount.selected.id,
                            "name": toBankAccountName,
                            "number": $scope.toBankAccount.selected.number
                        },
                        "id": $scope.toBank.selected.id,
                        "name": $scope.toBank.selected.name
                    },
                    "to_player": {
                        "bank": {
                            "account": {
                                "id": $scope.toPlayerBankAccount.selected.id,
                                "name": toPlayerBankAccountName,
                                "number": $scope.toPlayerBankAccount.selected.number
                            },
                            "id": $scope.toPlayerBankAccount.selected.bankId,
                            "name": $scope.toPlayerBankAccount.selected.bankName
                        },
                        "id": $scope.toPlayer.selected.id,
                        "username": $scope.toPlayer.selected.username
                    },
                    "type": $scope.type.selected.name
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/transaction/request/insert"
            };
            transactionRequest.rest(rest, function (response) {

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


    $scope.loadBankAccount = function (id, playerGroupId, type) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "bankId": id,
                "playerGroupId": playerGroupId,
                "type": type
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/transaction/request/load-bank-account"
        }
        transactionRequest.rest(rest, function (response) {

            if (response.result) {

                $scope.toBankAccount.option = [
                    {"id": "", "name": "To Bank Account", "number": ""}
                ];

                $scope.toBankAccount.selected = $scope.toBankAccount.option[0];

                if (response.hasOwnProperty("bankAccount")) {

                    angular.forEach(response.bankAccount, function (value, key) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/transaction/request/initialize-data"
        }
        transactionRequest.rest(rest, function (response) {

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


    $scope.loadGame = function (id) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "typeId": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/transaction/request/load-game"
        }
        transactionRequest.rest(rest, function (response) {

            if (response.result) {

                $scope.game.option = [
                    {"id": "", "name": "Game"}
                ];

                $scope.game.selected = $scope.game.option[0];

                if (response.hasOwnProperty("game")) {

                    angular.forEach(response.game, function (value, key) {

                        $scope.game.option.push({
                            "id": value._id,
                            "name": value.name
                        });

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


    $scope.loadPlayer = function (id) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "gameId": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/transaction/request/load-player"
        }
        transactionRequest.rest(rest, function (response) {

            if (response.result) {

                $scope.fromPlayer.option = [
                    {"groupId": "", "id": "", "username": "From Player"}
                ];

                $scope.fromPlayer.selected = $scope.fromPlayer.option[0];

                $scope.toPlayer.option = [
                    {"groupId": "", "id": "", "username": "To Player"}
                ];

                $scope.toPlayer.selected = $scope.toPlayer.option[0];

                if (response.hasOwnProperty("player")) {

                    angular.forEach(response.player, function (value, key) {

                        $scope.fromPlayer.option.push({
                            "groupId": value.group.id,
                            "id": value._id,
                            "username": value.username
                        });

                        $scope.toPlayer.option.push({
                            "groupId": value.group.id,
                            "id": value._id,
                            "username": value.username
                        });

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


    $scope.loadPlayerBankAccount = function (field, id) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "playerId": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/transaction/request/load-player-bank-account"
        }
        transactionRequest.rest(rest, function (response) {

            if (response.result) {

                if (field == "fromPlayerBankAccount") {

                    $scope.fromPlayerBankAccount.option = [
                        {"bankId": "", "bankName": "", "id": "", "name": "From Player Bank Account", "number": ""}
                    ];

                    $scope.fromPlayerBankAccount.selected = $scope.fromPlayerBankAccount.option[0];

                } else {

                    $scope.toPlayerBankAccount.option = [
                        {"bankId": "", "bankName": "", "id": "", "name": "To Player Bank Account", "number": ""}
                    ];

                    $scope.toPlayerBankAccount.selected = $scope.toPlayerBankAccount.option[0];

                }

                if (response.hasOwnProperty("playerBank")) {

                    for (var i = 0; i < response.playerBank.id.length; i++) {

                        var name = response.playerBank.name[i] + " - " + response.playerBank.account.number[i] + " - " + response.playerBank.account.name[i];

                        if (field == "fromPlayerBankAccount") {

                            $scope.fromPlayerBankAccount.option.push({
                                "bankId": response.playerBank.id[i],
                                "bankName": response.playerBank.name[i],
                                "id": response.playerBank.account.id[i],
                                "name": name,
                                "number": response.playerBank.account.number[i]
                            });

                        } else {

                            $scope.toPlayerBankAccount.option.push({
                                "bankId": response.playerBank.id[i],
                                "bankName": response.playerBank.name[i],
                                "id": response.playerBank.account.id[i],
                                "name": name,
                                "number": response.playerBank.account.number[i]
                            });

                        }

                    }

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


    $scope.loadPromotion = function (amount, id) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "amount": amount,
                "gameId": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/transaction/request/load-promotion"
        }
        transactionRequest.rest(rest, function (response) {

            if (response.result) {

                $scope.promotion.option = [
                    {"id": "", "name": "Promotion"}
                ];

                $scope.promotion.selected = $scope.promotion.option[0];

                if (response.hasOwnProperty("promotion")) {

                    angular.forEach(response.promotion, function (value, key) {

                        $scope.promotion.option.push({
                            "id": value._id,
                            "name": value.name
                        });

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


    $scope.removeFilterPagination = function (event) {

        $scope.loading.view = true;

        var rest = {
            "data": {},
            "url": document.getElementById("config").getAttribute("data-base-url") + "/transaction/request/remove-filter-pagination"
        };
        transactionRequest.rest(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/transaction/request/set-pagination"
        };
        transactionRequest.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/transaction/request/";

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/transaction/request/upload-file"
        };
        transactionRequest.restMultipart(rest, function (response) {

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


app.provider("transactionRequest", function () {


    this.$get = ["$http", function ($http) {


        var transactionRequest = {};


        transactionRequest.rest = function (rest, callback) {

            $http({
                "data": rest.data,
                "headers": {"Content-Type": "application/json"},
                "method": "POST",
                "url": rest.url
            }).then(function (response) {

                callback(response.data);

            });

        }


        transactionRequest.restMultipart = function (rest, callback) {

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


        return transactionRequest;


    }];


});


app.directive("transactionRequestDetail", function () {


    var transactionRequest = {};


    transactionRequest.templateUrl = document.getElementById("config").getAttribute("data-base-url") + "/resource/html/transaction-request-detail-popup.html";


    return transactionRequest;


});


app.directive("transactionRequestFilePreview", function () {


    var transactionRequest = {};


    transactionRequest.template = "<img class=\"responsive\" ng-src=\"" + document.getElementById("config").getAttribute("data-image-url") + "/transaction/request/{{file.upload.file}}\" />";


    return transactionRequest;


});
