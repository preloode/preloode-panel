app.controller("playerTransaction", ["$scope", "$window", "$log", "playerTransaction", function ($scope, $window, $log, playerTransaction) {


    $scope.amount = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.betInput = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.betResult = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.betType = {
        "option": [
            {"name": "Bet Type"},
            {"name": "Handicap"},
            {"name": "Over Under"},
            {"name": "Odd / Even"},
            {"name": "1 x 2"},
            {"name": "4D"},
            {"name": "3D"},
            {"name": "2D"},
            {"name": "2D Depan"},
            {"name": "2D Tengah"},
            {"name": "2D Belakang"},
            {"name": "Bolak Balik"},
            {"name": "Colok Macau"},
            {"name": "Colok Bebas"},
            {"name": "Colok Jitu"},
            {"name": "50-50 Umum"},
            {"name": "50-50 Special"},
            {"name": "50-50 Kombinasi"},
            {"name": "Macau / Kombinasi"},
            {"name": "Dasar"},
            {"name": "Shio"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.betType.selected = $scope.betType.option[0];

    $scope.commission = {
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

    $scope.creditType = {
        "option": [
            {"name": "Credit Type"},
            {"name": "Affiliate Commission"},
            {"name": "Game"},
            {"name": "Promotion"},
            {"name": "Referral Commission"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

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

    $scope.game.selected = $scope.game.option[0];

    $scope.id = {
        "value": ""
    };

    $scope.modifiedDate = {
        "value": "",
        "view": false
    };

    $scope.odds = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.oddsType = {
        "option": [
            {"name": "Odds Type"},
            {"name": "HK"},
            {"name": "ID"},
            {"name": "US"},
            {"name": "Decimal"},
            {"name": "MY"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.oddsType.selected = $scope.oddsType.option[0];

    $scope.player = {
        "option": [
            {"id": "", "username": "Player"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.player.selected = $scope.player.option[0];

    $scope.point = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.pools = {
        "option": [
            {"id": "", "name": "Pools"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        }
    };

    $scope.pools.selected = $scope.pools.option[0];

    $scope.promotion = {
        "option": [
            {"id": "", "name": "Promotion"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        }
    };

    $scope.promotion.selected = $scope.promotion.option[0];

    $scope.rake = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.status = {
        "option": [
            {"name": "Status"},
            {"name": "Confirmed"},
            {"name": "Pending"},
            {"name": "Win"},
            {"name": "Draw"},
            {"name": "Lose"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.status.selected = $scope.status.option[0];

    $scope.valid = {
        "amount": false,
        "betInput": false,
        "betResult": false,
        "betType": false,
        "commission": false,
        "creditType": false,
        "game": false,
        "gameType": false,
        "odds": false,
        "oddsType": false,
        "player": false,
        "point": false,
        "pools": false,
        "promotion": false,
        "rake": false,
        "status": false
    };


    $scope.checkAmount = function () {

        $scope.amount.value = $scope.amount.value.replace(/[^0-9.]/g, "");

        if (!/[0-9.]/.test($scope.amount.value)) {

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


    $scope.checkBetInput = function () {

        if ($scope.betInput.value == "") {

            $scope.bet.response.value = "Please enter player transaction bet input";
            $scope.bet.response.class = "error";
            $scope.bet.response.view = true;
            $scope.valid.bet = false;

        } else {

            $scope.bet.response.view = false;
            $scope.valid.bet = true;

        }

    }


    $scope.checkBetType = function () {

        if ($scope.betType.selected.name == "Bet Type") {

            $scope.betType.response.value = "Please select player transaction bet type";
            $scope.betType.response.class = "error";
            $scope.betType.response.view = true;
            $scope.valid.betType = false;

        } else {

            $scope.betType.response.view = false;
            $scope.valid.betType = true;

        }

    }


    $scope.checkCommission = function () {

        if ($scope.commission.value != "") {

            $scope.commission.value = $scope.commission.value.replace(/[^0-9.]/g, "");

            if (!/[0-9.]/.test($scope.commission.value)) {

                $scope.commission.response.value = "Please enter only number";
                $scope.commission.response.class = "error";
                $scope.commission.response.view = true;
                $scope.valid.commission = false;

            } else {

                $scope.commission.response.view = false;
                $scope.valid.commission = true;

            }

            $scope.commission.value = library.numeral.initializeSeparator($scope.commission.value).format("0,0.00");

        } else {

            $scope.commission.response.view = false;
            $scope.valid.commission = true;

        }

    }


    $scope.checkData = function () {

        $scope.checkAmount();

        $scope.checkBet();

        $scope.checkBetType();

        $scope.checkCommission();

        $scope.checkGame();

        $scope.checkOdds();

        $scope.checkOddsType();

        $scope.checkPlayer();

        $scope.checkPoint();

        $scope.checkRake();

        $scope.checkResult();

        $scope.checkStatus();

        $scope.checkType();

    }


    $scope.checkGame = function () {

        if ($scope.game.selected.name == "Game") {

            $scope.game.response.value = "Please select player transaction game";
            $scope.game.response.class = "error";
            $scope.game.response.view = true;
            $scope.valid.game = false;

        } else {

            $scope.game.response.view = false;
            $scope.valid.game = true;

        }

    }


    $scope.checkOdds = function () {

        if ($scope.odds.value != "") {

            $scope.odds.value = $scope.odds.value.replace(/[^0-9.]/g, "");

            if (!/[0-9.]/.test($scope.odds.value)) {

                $scope.odds.response.value = "Please enter only number";
                $scope.odds.response.class = "error";
                $scope.odds.response.view = true;
                $scope.valid.odds = false;

            } else {

                $scope.odds.response.view = false;
                $scope.valid.odds = true;

            }

            $scope.odds.value = library.numeral.initializeSeparator($scope.odds.value).format("0,0.00");

        } else {

            $scope.odds.response.view = false;
            $scope.valid.odds = true;

        }

    }


    $scope.checkOddsType = function () {

        if ($scope.oddsType.selected.name == "Odds Type") {

            $scope.oddsType.response.value = "Please select player transaction odds type";
            $scope.oddsType.response.class = "error";
            $scope.oddsType.response.view = true;
            $scope.valid.oddsType = false;

        } else {

            $scope.oddsType.response.view = false;
            $scope.valid.oddsType = true;

        }

    }


    $scope.checkPlayer = function () {

        if ($scope.player.selected.name == "Player") {

            $scope.player.response.value = "Please select player transaction player";
            $scope.player.response.class = "error";
            $scope.player.response.view = true;
            $scope.valid.player = false;

        } else {

            $scope.player.response.view = false;
            $scope.valid.player = true;

        }

    }


    $scope.checkPoInteger = function () {

        if ($scope.point.value != "") {

            $scope.point.value = $scope.point.value.replace(/[^0-9.]/g, "");

            if (!/[0-9.]/.test($scope.point.value)) {

                $scope.point.response.value = "Please enter only number";
                $scope.point.response.class = "error";
                $scope.point.response.view = true;
                $scope.valid.poInteger = false;

            } else {

                $scope.point.response.view = false;
                $scope.valid.poInteger = true;

            }

            $scope.point.value = library.numeral.initializeSeparator($scope.point.value).format("0,0.00");

        } else {

            $scope.point.response.view = false;
            $scope.valid.poInteger = true;

        }

    }


    $scope.checkRake = function () {

        if ($scope.rake.value != "") {

            $scope.rake.value = $scope.rake.value.replace(/[^0-9.]/g, "");

            if (!/[0-9.]/.test($scope.rake.value)) {

                $scope.rake.response.value = "Please enter only number";
                $scope.rake.response.class = "error";
                $scope.rake.response.view = true;
                $scope.valid.rake = false;

            } else {

                $scope.rake.response.view = false;
                $scope.valid.rake = true;

            }

            $scope.rake.value = library.numeral.initializeSeparator($scope.rake.value).format("0,0.00");

        } else {

            $scope.rake.response.view = false;
            $scope.valid.rake = true;

        }

    }


    $scope.checkResult = function () {

        if ($scope.result.value == "") {

            $scope.result.response.value = "Please enter player transaction result";
            $scope.result.response.class = "error";
            $scope.result.response.view = true;
            $scope.valid.result = false;

        } else {

            $scope.result.response.view = false;
            $scope.valid.result = true;

        }

    }


    $scope.checkStatus = function () {

        if ($scope.status.selected.name == "Status") {

            $scope.status.response.value = "Please select player transaction status";
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

            $scope.type.response.value = "Please select player transaction type";
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
            "url": "/player/transaction/delete"
        };
        playerTransaction.rest(rest, function (response) {

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

            }

        });

        if (valid) {

            $scope.loading.view = true;

            var rest = {
                "data": {
                    "amount": $scope.amount.value,
                    "bet": $scope.bet.value,
                    "betType": $scope.betType.selected.name,
                    "commission": $scope.commission.value,
                    "game": $scope.game.value,
                    "id": $scope.id.value,
                    "odds": $scope.odds.value,
                    "oddsType": $scope.oddsType.value,
                    "point": $scope.point.value,
                    "rake": $scope.rake.value,
                    "result": $scope.result.value,
                    "status": $scope.status.value,
                    "type": $scope.type.value
                },
                "url": "/player/transaction/update"
            };
            playerTransaction.rest(rest, function (response) {

                if (response.result) {

                    $scope.response.class = "success";
                    $scope.response.message = response.response;

                } else {

                    $scope.response.class = "error";
                    $scope.response.message = response.response;

                }

                $scope.loading.view = false;

                $scope.response.view = true;

            });

        } else {

            $scope.response.class = "error";
            $scope.response.message = "Please enter a valid data";
            $scope.response.view = true;

        }

        $timeout(function () {

            $scope.response.view = false;
            $scope.$digest();

        }, 7000);

        event.preventDefault();

    }


    $scope.initializeData = function (id) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "id": id
            },
            "url": "/player/transaction/initialize-data"
        }
        playerTransaction.rest(rest, function (response) {

            if (response.result) {

                if (response.data != "") {

                    $scope.amount.value = response.data.amount;
                    $scope.bet.value = response.data.bet;
                    $scope.betId.value = response.data.bet_id;
                    $scope.commission.value = response.data.commission;
                    $scope.createdDate.value = response.data.created_timestamp;
                    $scope.createdDate.view = true;
                    $scope.modifiedDate.value = response.data.modified_timestamp;
                    $scope.modifiedDate.view = true;
                    $scope.odds.value = response.data.odds;
                    $scope.point.value = response.data.point;
                    $scope.rake.value = response.data.rake;
                    $scope.result.value = response.data.result;
                    $scope.type.value = response.data.type;

                }

                angular.forEach($scope.betType.option, function (value, key) {

                    if (value.name == response.data.bet_type) {

                        $scope.betType.selected = $scope.betType.option[key];

                    }

                });

                angular.forEach(response.game, function (value, key) {

                    $scope.game.option.push({
                        "id": value._id,
                        "name": value.name
                    });

                    if (value._id == response.data.game_id) {

                        $scope.game.selected = $scope.game.option[key + 1];

                    }

                });

                angular.forEach($scope.oddsType.option, function (value, key) {

                    if (value.name == response.data.odds_type) {

                        $scope.oddsType.selected = $scope.oddsType.option[key];

                    }

                });

                angular.forEach(response.player, function (value, key) {

                    var name = value.first_name;

                    if (value.middle_name != "") {

                        name += " " + value.middle_name;

                    }

                    if (value.last_name != "") {

                        name += " " + value.last_name;

                    }

                    $scope.player.option.push({
                        "id": value._id,
                        "name": name
                    });

                    if (value._id == response.data.player_id) {

                        $scope.player.selected = $scope.player.option[key + 1];

                    }

                });

                angular.forEach($scope.status.option, function (value, key) {

                    if (value.name == response.data.status) {

                        $scope.status.selected = $scope.status.option[key];

                    }

                });

            } else {

                $scope.response.class = "error";
                $scope.response.message = response.response;
                $scope.response.view = true;

                $timeout(function () {

                    $scope.response.view = false;
                    $scope.$digest();

                }, 7000);

            }

            $scope.loading.view = false;

        });

    }


    $scope.insert = function (event) {

        $scope.checkData();

        var valid = true;

        angular.forEach($scope.valid, function (value, key) {

            if (!value) {

                valid = false;

            }

        });

        if (valid) {

            $scope.loading.view = true;

            var rest = {
                "data": {
                    "amount": $scope.amount.value,
                    "bet": $scope.bet.value,
                    "betType": $scope.betType.selected.name,
                    "commission": $scope.commission.value,
                    "game": $scope.game.value,
                    "odds": $scope.odds.value,
                    "oddsType": $scope.oddsType.value,
                    "point": $scope.point.value,
                    "rake": $scope.rake.value,
                    "result": $scope.result.value,
                    "status": $scope.status.value,
                    "type": $scope.type.value
                },
                "url": "/player/transaction/insert"
            };
            playerTransaction.rest(rest, function (response) {

                if (response.result) {

                    $scope.response.class = "success";
                    $scope.response.message = response.response;

                } else {

                    $scope.response.class = "error";
                    $scope.response.message = response.response;

                }

                $scope.loading.view = false;

                $scope.response.view = true;

            });

        } else {

            $scope.response.class = "error";
            $scope.response.message = "Please enter a valid data";
            $scope.response.view = true;

        }

        $timeout(function () {

            $scope.response.view = false;
            $scope.$digest();

        }, 7000);

        event.preventDefault();

    }


}]);


app.provider("playerTransaction", function () {


    var baseUrl = "";


    this.config = function (url) {

        baseUrl = url;

    }


    this.$get = ["$http", function ($http) {


        var playerTransaction = {};


        playerTransaction.rest = function (rest, callback) {

            $http({
                "data": rest.data,
                "headers": {"Content-Type": "application/json"},
                "method": "POST",
                "url": baseUrl + rest.url
            }).then(function (response) {

                callback(response.data);

            });

        }


        return playerTransaction;


    }];


});
