app.controller("gameTransaction", ["$scope", "$window", "$log", "gameTransaction", function ($scope, $window, $log, gameTransaction) {


    $scope.amount = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.calculation = {
        "option": [
            {"name": "Calculation"},
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

    $scope.calculation.selected = $scope.calculation.option[0];

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
                {"id": "", "name": "From Bank Account"}
            ],
            value: ""
        },
        "fromPlayer": {
            "option": [
                {"id": "", "name": "From Player"}
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
        "status": {
            "option": [
                {"name": "Status"},
                {"name": "Active"},
                {"name": "Inactive"}
            ],
            "value": ""
        },
        "toPlayer": {
            "option": [
                {"id": "", "name": "To Player"}
            ],
            value: ""
        },
        "type": {
            "option": [
                {"id": "", "name": "Type"}
            ],
            "value": ""
        }
    };

    $scope.filter.fromBank.selected = $scope.filter.fromBank.option[0];

    $scope.filter.fromBankAccount.selected = $scope.filter.fromBankAccount.option[0];

    $scope.filter.fromPlayer.selected = $scope.filter.fromPlayer.option[0];

    $scope.filter.game.selected = $scope.filter.game.option[0];

    $scope.filter.status.selected = $scope.filter.status.option[0];

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
            {"id": "", "username": "From Player"}
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

    $scope.game = {
        "option": [
            {"id": "", "name": "Game"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
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
        "value": ""
    };

    $scope.gameType.selected = $scope.gameType.option[0];

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

    $scope.toPlayer = {
        "option": [
            {"id": "", "username": "To Player"}
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

    $scope.type = {
        "option": [
            {"name": "Type"},
            {"name": "Commission"},
            {"name": "Deposit"},
            {"name": "Promotion"},
            {"name": "Top Up"},
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
        "calculation": false,
        "file": false,
        "fromBank": false,
        "fromBankAccount": false,
        "fromPlayer": false,
        "game": false,
        "gameType": false,
        "status": false,
        "toPlayer": false,
        "type": false
    };


    $scope.checkData = function () {

        if ($scope.type.selected.name == "Commission") {

            $scope.valid.fromBank = true;
            $scope.valid.fromBankAccount = true;
            $scope.valid.fromPlayer = true;
            $scope.valid.toPlayer = true;

        } else if ($scope.type.selected.name == "Deposit" || $scope.type.selected.name == "Promotion") {

            $scope.checkToPlayer();

            $scope.valid.fromBank = true;
            $scope.valid.fromBankAccount = true;
            $scope.valid.fromPlayer = true;

        } else if ($scope.type.selected.name == "Top Up") {

            $scope.checkFromBank();

            $scope.checkFromBankAccount();

            $scope.valid.fromPlayer = true;
            $scope.valid.toPlayer = true;

        } else if ($scope.type.selected.name == "Withdrawal") {

            $scope.checkFromPlayer();

            $scope.valid.fromBank = true;
            $scope.valid.fromBankAccount = true;
            $scope.valid.toPlayer = true;

        }

        $scope.checkAmount();

        $scope.checkCalculation();

        $scope.checkFile();

        $scope.checkGame();

        $scope.checkGameType();

        $scope.checkStatus();

        $scope.checkType();

    }


    $scope.checkAmount = function () {

        if (!$scope.amount.value.match(/^[0-9,.]+$/)) {

            $scope.amount.response.value = "Please enter only number";
            $scope.amount.response.class = "error";
            $scope.amount.response.view = true;
            $scope.valid.amount = false;

        } else {

            $scope.amount.response.view = false;
            $scope.valid.amount = true;

        }

        $scope.amount.value = library.numeral.initializeSeparator($scope.amount.value);

    }


    $scope.checkCalculation = function () {

        if ($scope.calculation.selected.name == "Calculation") {

            $scope.calculation.response.value = "Please select game transaction calculation";
            $scope.calculation.response.class = "error";
            $scope.calculation.response.view = true;
            $scope.valid.calculation = false;

        } else {

            $scope.calculation.response.view = false;
            $scope.valid.calculation = true;

        }

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

            $scope.fromBank.response.value = "Please select game transaction from bank";
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

            $scope.fromBankAccount.response.value = "Please select game transaction from bank account";
            $scope.fromBankAccount.response.class = "error";
            $scope.fromBankAccount.response.view = true;
            $scope.valid.fromBankAccount = false;

        } else {

            $scope.fromBankAccount.response.view = false;
            $scope.valid.fromBankAccount = true;

        }

    }


    $scope.checkFromPlayer = function () {

        if ($scope.fromPlayer.selected.id == "") {

            $scope.fromPlayer.response.value = "Please select game transaction from player";
            $scope.fromPlayer.response.class = "error";
            $scope.fromPlayer.response.view = true;
            $scope.valid.fromPlayer = false;

        } else {

            $scope.fromPlayer.response.view = false;
            $scope.valid.fromPlayer = true;

        }

    }


    $scope.checkGame = function () {

        if ($scope.game.selected.id == "") {

            $scope.game.response.value = "Please select game transaction game";
            $scope.game.response.class = "error";
            $scope.game.response.view = true;
            $scope.valid.game = false;

        } else {

            $scope.game.response.view = false;
            $scope.valid.game = true;

        }

    }


    $scope.checkGameType = function () {

        if ($scope.gameType.selected.id == "") {

            $scope.gameType.response.value = "Please select game transaction game type";
            $scope.gameType.response.class = "error";
            $scope.gameType.response.view = true;
            $scope.valid.gameType = false;

        } else {

            $scope.gameType.response.view = false;
            $scope.valid.gameType = true;

        }

        $scope.loadGame($scope.gameType.selected.id);

    }


    $scope.checkToPlayer = function () {

        if ($scope.toPlayer.selected.id == "") {

            $scope.toPlayer.response.value = "Please select game transaction to player";
            $scope.toPlayer.response.class = "error";
            $scope.toPlayer.response.view = true;
            $scope.valid.toPlayer = false;

        } else {

            $scope.toPlayer.response.view = false;
            $scope.valid.toPlayer = true;

        }

    }


    $scope.checkStatus = function () {

        if ($scope.status.selected.name == "Status") {

            $scope.status.response.value = "Please select game transaction status";
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

            $scope.fromBank.view = false;
            $scope.fromBankAccount.view = false;
            $scope.fromPlayer.view = false;
            $scope.toPlayer.view = false;

            $scope.type.response.value = "Please select game transaction type";
            $scope.type.response.class = "error";
            $scope.type.response.view = true;
            $scope.valid.type = false;

        } else {

            if ($scope.type.selected.name == "Commission") {

                $scope.fromBank.view = false;
                $scope.fromBankAccount.view = false;
                $scope.fromPlayer.view = false;
                $scope.toPlayer.view = false;

            } else if ($scope.type.selected.name == "Deposit" || $scope.type.selected.name == "Promotion") {

                $scope.fromBank.view = false;
                $scope.fromBankAccount.view = false;
                $scope.fromPlayer.view = false;
                $scope.toPlayer.view = true;

            } else if ($scope.type.selected.name == "Top Up") {

                $scope.fromBank.view = true;
                $scope.fromBankAccount.view = true;
                $scope.fromPlayer.view = false;
                $scope.toPlayer.view = false;

            } else if ($scope.type.selected.name == "Withdrawal") {

                $scope.fromBank.view = true;
                $scope.fromBankAccount.view = true;
                $scope.fromPlayer.view = true;
                $scope.toPlayer.view = false;

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/game/transaction/delete"
        };
        gameTransaction.rest(rest, function (response) {

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
                    "calculation": $scope.calculation.selected.name,
                    "description": $scope.description.value,
                    "id": $scope.id.value,
                    "amount": $scope.amount.value,
                    "file": $scope.file.value,
                    "from_bank": {
                        "account": {
                            "id": $scope.fromBankAccount.selected.id,
                            "name": $scope.fromBankAccount.selected.name,
                            "number": $scope.fromBankAccount.selected.number
                        },
                        "id": $scope.fromBank.selected.id,
                        "name": $scope.fromBank.selected.name
                    },
                    "from_player": {
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
                    "status": $scope.status.selected.name,
                    "to_player": {
                        "id": $scope.toPlayer.selected.id,
                        "username": $scope.toPlayer.selected.username
                    },
                    "type": $scope.type.selected.name
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/game/transaction/update"
            };
            gameTransaction.rest(rest, function (response) {

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
            "status": ["equal", ""],
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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/game/transaction/filter-pagination"
        };
        gameTransaction.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/game/transaction/";

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

        document.getElementsByClassName("game-transaction-file")[0].click();

    }


    $scope.goToPage = function (event) {

        if (event.which == 13) {

            $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/game/transaction/page-" + $scope.site.page;

        }

        event.preventDefault();

    }


    $scope.initializeData = function (id) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "id": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/game/transaction/initialize-data"
        }
        gameTransaction.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("data")) {

                    $scope.amount.value = library.numeral.initializeSeparator(String(response.data.amount.low));

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

                    angular.forEach($scope.calculation.option, function (value, key) {

                        if (value.name == response.data.calculation) {

                            $scope.calculation.selected = $scope.calculation.option[key];

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

                            return false;

                        }

                    });

                }

                angular.forEach(response.bank, function (value, key) {

                    $scope.fromBank.option.push({
                        "id": value._id,
                        "name": value.name
                    });

                    if (response.hasOwnProperty("data")) {

                        if (value._id == response.data.bank.id) {

                            $scope.fromBank.selected = $scope.fromBank.option[key + 1];

                        }

                    }

                });

                angular.forEach(response.bankAccount, function (value, key) {

                    var name = value.name.first;

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

                        if (value._id == response.data.bankAccount.id) {

                            $scope.fromBankAccount.selected = $scope.fromBankAccount.option[key + 1];

                        }

                    }

                });

                angular.forEach(response.game, function (value, key) {

                    $scope.game.option.push({
                        "id": value._id,
                        "name": value.name
                    });

                    if (response.hasOwnProperty("data")) {

                        if (value._id == response.data.game.id) {

                            $scope.game.selected = $scope.game.option[key + 1];

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

                angular.forEach(response.player, function (value, key) {

                    $scope.fromPlayer.option.push({
                        "id": value._id,
                        "username": value.username
                    });

                    $scope.toPlayer.option.push({
                        "id": value._id,
                        "username": value.username
                    });

                    if (response.hasOwnProperty("data")) {

                        if (value._id == response.data.player.id) {

                            $scope.fromPlayer.selected = $scope.fromPlayer.option[key + 1];

                        }

                        if (value._id == response.data.player.id) {

                            $scope.toPlayer.selected = $scope.toPlayer.option[key + 1];

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/game/transaction/initialize-pagination"
        };
        gameTransaction.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("filter")) {

                    $scope.filter.id.value = response.filter._id[1];

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

            var rest = {
                "data": {
                    "calculation": $scope.calculation.selected.name,
                    "description": $scope.description.value,
                    "amount": $scope.amount.value,
                    "file": $scope.file.value,
                    "from_bank": {
                        "account": {
                            "id": $scope.fromBankAccount.selected.id,
                            "name": $scope.fromBankAccount.selected.name,
                            "number": $scope.fromBankAccount.selected.number
                        },
                        "id": $scope.fromBank.selected.id,
                        "name": $scope.fromBank.selected.name
                    },
                    "from_player": {
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
                    "status": $scope.status.selected.name,
                    "to_player": {
                        "id": $scope.toPlayer.selected.id,
                        "username": $scope.toPlayer.selected.username
                    },
                    "type": $scope.type.selected.name
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/game/transaction/insert"
            };
            gameTransaction.rest(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/game/transaction/initialize-data"
        }
        gameTransaction.rest(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/game/transaction/load-game"
        }
        gameTransaction.rest(rest, function (response) {

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

                    }, this);

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/game/transaction/remove-filter-pagination"
        };
        gameTransaction.rest(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/game/transaction/set-pagination"
        };
        gameTransaction.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/game/transaction/";

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/game/transaction/upload-file"
        };
        gameTransaction.restMultipart(rest, function (response) {

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


app.provider("gameTransaction", function () {


    this.$get = ["$http", function ($http) {


        var gameTransaction = {};


        gameTransaction.rest = function (rest, callback) {

            $http({
                "data": rest.data,
                "headers": {"Content-Type": "application/json"},
                "method": "POST",
                "url": rest.url
            }).then(function (response) {

                callback(response.data);

            });

        }


        gameTransaction.restMultipart = function (rest, callback) {

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


        return gameTransaction;


    }];


});


app.directive("gameTransactionDetail", function () {


    var gameTransaction = {};


    gameTransaction.templateUrl = document.getElementById("config").getAttribute("data-base-url") + "/resource/html/game-transaction-detail-popup.html";


    return gameTransaction;


});


app.directive("gameTransactionFilePreview", function () {


    var gameTransaction = {};


    gameTransaction.template = "<img class=\"responsive\" ng-src=\"" + document.getElementById("config").getAttribute("data-image-url") + "/game/transaction/{{file.upload.file}}\" />";


    return gameTransaction;


});
