app.controller("memberGroup", ["$scope", "$window", "$log", "memberGroup", function ($scope, $window, $log, memberGroup) {


    $scope.createdDate = {
        "value": "",
        "view": false
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

    $scope.listPaymentBankAccount = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": {
            "account": {
                "id": [],
                "name": [],
                "number": []
            },
            "id": [],
            "name": []
        },
        "view": false
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

    $scope.paymentBank = {
        "option": [
            {"id": "", "name": "Bank"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.paymentBank.selected = $scope.paymentBank.option[0];

    $scope.paymentBankAccount = {
        "option": [
            {"bankName": "", "id": "", "name": "Bank Account", "number": ""}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        }
    };

    $scope.paymentBankAccount.selected = $scope.paymentBankAccount.option[0];

    $scope.paymentBankAccountValid = {
        "bank": false,
        "bankAccount": false
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

    $scope.valid = {
        "listPaymentBankAccount": false,
        "name": false,
        "sequence": false,
        "status": false
    };


    $scope.checkData = function () {

        $scope.checkListPaymentBankAccount();

        $scope.checkName();

        $scope.checkSequence();

        $scope.checkStatus();

    }


    $scope.checkListPaymentBankAccount = function () {

        if ($scope.listPaymentBankAccount.value.account.id.length == 0) {

            $scope.listPaymentBankAccount.response.value = "Please insert at least 1 member group bank account";
            $scope.listPaymentBankAccount.response.class = "error";
            $scope.listPaymentBankAccount.response.view = true;
            $scope.valid.listPaymentBankAccount = false;

        } else {

            $scope.listPaymentBankAccount.response.view = false;
            $scope.valid.listPaymentBankAccount = true;

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


    $scope.checkPaymentBank = function () {

        if ($scope.paymentBank.selected.id == "") {

            $scope.paymentBank.response.value = "Please select member group bank";
            $scope.paymentBank.response.class = "error";
            $scope.paymentBank.response.view = true;
            $scope.paymentBankAccountValid.bank = false;

        } else {

            $scope.paymentBank.response.view = false;
            $scope.paymentBankAccountValid.bank = true;

        }

    }


    $scope.checkPaymentBankAccount = function () {

        if ($scope.paymentBankAccount.selected.id == "") {

            $scope.paymentBankAccount.response.value = "Please select member group bank account";
            $scope.paymentBankAccount.response.class = "error";
            $scope.paymentBankAccount.response.view = true;
            $scope.paymentBankAccountValid.bankAccount = false;

        } else {

            $scope.paymentBankAccount.response.view = false;
            $scope.paymentBankAccountValid.bankAccount = true;

        }

    }


    $scope.checkPaymentBankAccountData = function () {

        $scope.checkPaymentBank();

        $scope.checkPaymentBankAccount();

    }


    $scope.checkSequence = function () {

        if ($scope.sequence.value != "") {

            if (!$scope.sequence.value.match(/^[0-9,]+$/)) {

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

            $scope.status.response.value = "Please select member group status";
            $scope.status.response.class = "error";
            $scope.status.response.view = true;
            $scope.valid.status = false;

        } else {

            $scope.status.response.view = false;
            $scope.valid.status = true;

        }

    }


    $scope.delete = function (id, event) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "id": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/member/group/delete"
        };
        memberGroup.rest(rest, function (response) {

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


    $scope.deletePaymentBankAccount = function (index, event) {

        $scope.listPaymentBankAccount.selected.splice(index, 1);

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
                    "id": $scope.id.value,
                    "name": $scope.name.value,
                    "payment": {
                        "bank": $scope.listPaymentBankAccount.value,
                        "method": "Bank Account Transfer"
                    },
                    "sequence": $scope.sequence.value,
                    "status": $scope.status.selected.name,
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/member/group/update"
            };
            memberGroup.rest(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/member/group/filter-pagination"
        };
        memberGroup.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/member/group/";

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

            $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/member/group/page-" + $scope.site.page;

        }

        event.preventDefault();

    }


    $scope.initializeData = function (id) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "id": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/member/group/initialize-data"
        }
        memberGroup.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("data")) {

                    var createdTimestamp = new Date(response.data.created.timestamp);
                    $scope.createdDate.value = createdTimestamp.getFullYear() + "-" + ("0" + (createdTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + createdTimestamp.getDate()).slice(-2) + " " + ("0" + createdTimestamp.getHours()).slice(-2) + ":" + ("0" + createdTimestamp.getMinutes()).slice(-2) + ":" + ("0" + createdTimestamp.getSeconds()).slice(-2);
                    $scope.createdDate.view = true;

                    $scope.id.value = response.data._id;

                    var modifiedTimestamp = new Date(response.data.modified.timestamp);
                    $scope.modifiedDate.value = modifiedTimestamp.getFullYear() + "-" + ("0" + (modifiedTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + modifiedTimestamp.getDate()).slice(-2) + " " + ("0" + modifiedTimestamp.getHours()).slice(-2) + ":" + ("0" + modifiedTimestamp.getMinutes()).slice(-2) + ":" + ("0" + modifiedTimestamp.getSeconds()).slice(-2);
                    $scope.modifiedDate.view = true;

                    $scope.name.value = response.data.name;
                    $scope.sequence.value = response.data.sequence;

                    angular.forEach($scope.status.option, function (value, key) {

                        if (value.name == response.data.status) {

                            $scope.status.selected = $scope.status.option[key];

                            return false;

                        }

                    });

                    for (var i = 0; i < response.data.payment.bank.id.length; i++) {

                        $scope.listPaymentBankAccount.value.account.id.push(response.data.payment.bank.account.id[i]);
                        $scope.listPaymentBankAccount.value.account.name.push(response.data.payment.bank.account.name[i]);
                        $scope.listPaymentBankAccount.value.account.number.push(response.data.payment.bank.account.number[i]);
                        $scope.listPaymentBankAccount.value.id.push(response.data.payment.bank.id[i]);
                        $scope.listPaymentBankAccount.value.name.push(response.data.payment.bank.name[i]);

                    }

                    if ($scope.listPaymentBankAccount.value.account.id.length > 0) {

                        $scope.listPaymentBankAccount.view = true;

                    }

                }

                angular.forEach(response.bank, function (value, key) {

                    $scope.paymentBank.option.push({
                        "id": value._id,
                        "name": value.name
                    });

                    if (response.hasOwnProperty("data")) {

                        if (value._id == response.data.payment.bank.id) {

                            $scope.paymentBank.selected = $scope.paymentBank.option[key + 1];

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/member/group/initialize-pagination"
        };
        memberGroup.rest(rest, function (response) {

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

            var rest = {
                "data": {
                    "name": $scope.name.value,
                    "payment": {
                        "bank": $scope.listPaymentBankAccount.value,
                        "method": "Bank Account Transfer"
                    },
                    "sequence": $scope.sequence.value,
                    "status": $scope.status.selected.name
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/member/group/insert"
            };
            memberGroup.rest(rest, function (response) {

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


    $scope.insertPaymentBankAccount = function (event) {

        $scope.loading.view = true;

        $scope.checkPaymentBankAccountData();

        var valid = true;

        angular.forEach($scope.paymentBankAccountValid, function (value, key) {

            if (!value) {

                valid = false;

                return false;

            }

        });

        if (valid) {

            for (var i = 0; i < $scope.listPaymentBankAccount.value.account.id.length; i++) {

                if ($scope.listPaymentBankAccount.value.id[i] == $scope.paymentBank.selected.id && $scope.listPaymentBankAccount.value.account.name[i] == $scope.paymentBankAccountName.value && $scope.listPaymentBankAccount.value.account.number[i] == $scope.paymentBankAccountNumber.value) {

                    $scope.listPaymentBankAccount.response.value = "Bank account already exist";
                    $scope.listPaymentBankAccount.response.class = "error";
                    $scope.listPaymentBankAccount.response.view = true;

                    valid = false;

                    break;

                }

            }

            if (valid) {

                $scope.listPaymentBankAccount.value.account.id.push($scope.paymentBankAccount.selected.id);
                $scope.listPaymentBankAccount.value.account.name.push($scope.paymentBankAccount.selected.name.slice(3));
                $scope.listPaymentBankAccount.value.account.number.push($scope.paymentBankAccount.selected.number.slice(3));
                $scope.listPaymentBankAccount.value.id.push($scope.paymentBank.selected.id);
                $scope.listPaymentBankAccount.value.name.push($scope.paymentBank.selected.name);

                if (!$scope.listPaymentBankAccount.view) {

                    $scope.listPaymentBankAccount.view = true;

                }

                $scope.paymentBank.selected = $scope.paymentBank.option[0];

                $scope.paymentBankAccount.option = [
                    {"bankName": "", "id": "", "name": "Bank Account", "number": ""}
                ];
                $scope.paymentBankAccount.selected = $scope.paymentBankAccount.option[0];

                $scope.listPaymentBankAccount.response.view = false;

            } else {

                $scope.listPaymentBankAccount.response.value = "Bank account already exist";
                $scope.listPaymentBankAccount.response.class = "error";
                $scope.listPaymentBankAccount.response.view = true;

            }

        }

        $scope.loading.view = false;

        event.preventDefault();

    }


    $scope.loadPaymentBankAccount = function (id) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "bankId": $scope.paymentBank.selected.id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/member/group/load-payment-bank-account"
        }
        memberGroup.rest(rest, function (response) {

            if (response.result) {

                $scope.paymentBankAccount.option = [
                    {"bankName": "", "id": "", "name": "Bank Account", "number": ""}
                ];
                $scope.paymentBankAccount.selected = $scope.paymentBankAccount.option[0];

                if (response.hasOwnProperty("bankAccount")) {

                    angular.forEach(response.bankAccount, function (value, key) {

                        var name = value.name.first;

                        if (value.name.middle != "") {

                            name += " " + value.name.middle;

                        }

                        if (value.name.last != "") {

                            name += " " + value.name.last;

                        }

                        $scope.paymentBankAccount.option.push({
                            "bankName": value.bank.name,
                            "id": value._id,
                            "name": " - " + name,
                            "number": " - " + value.number
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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/member/group/initialize-data"
        }
        memberGroup.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("data")) {

                    var createdTimestamp = new Date(response.data.created.timestamp);
                    $scope.createdDate.value = createdTimestamp.getFullYear() + "-" + ("0" + (createdTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + createdTimestamp.getDate()).slice(-2) + " " + ("0" + createdTimestamp.getHours()).slice(-2) + ":" + ("0" + createdTimestamp.getMinutes()).slice(-2) + ":" + ("0" + createdTimestamp.getSeconds()).slice(-2);

                    $scope.id.value = response.data._id;

                    var modifiedTimestamp = new Date(response.data.modified.timestamp);
                    $scope.modifiedDate.value = modifiedTimestamp.getFullYear() + "-" + ("0" + (modifiedTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + modifiedTimestamp.getDate()).slice(-2) + " " + ("0" + modifiedTimestamp.getHours()).slice(-2) + ":" + ("0" + modifiedTimestamp.getMinutes()).slice(-2) + ":" + ("0" + modifiedTimestamp.getSeconds()).slice(-2);

                    $scope.name.value = response.data.name;
                    $scope.sequence.value = response.data.sequence;
                    $scope.status.value = response.data.status;

                    for (var i = 0; i < response.data.payment.bank.id.length; i++) {

                        $scope.listPaymentBankAccount.value.account.id.push(response.data.payment.bank.account.id[i]);
                        $scope.listPaymentBankAccount.value.account.name.push(response.data.payment.bank.account.name[i]);
                        $scope.listPaymentBankAccount.value.account.number.push(response.data.payment.bank.account.number[i]);
                        $scope.listPaymentBankAccount.value.id.push(response.data.payment.bank.id[i]);
                        $scope.listPaymentBankAccount.value.name.push(response.data.payment.bank.name[i]);

                    }

                    if ($scope.listPaymentBankAccount.value.length > 0) {

                        $scope.listPaymentBankAccount.view = true;

                    }

                }

                $scope.popup.view = true;
                $scope.popup.memberGroup = true;

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/member/group/remove-filter-pagination"
        };
        memberGroup.rest(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/member/group/set-pagination"
        };
        memberGroup.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/member/group/";

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


app.provider("memberGroup", function () {


    this.$get = ["$http", function ($http) {


        var memberGroup = {};


        memberGroup.rest = function (rest, callback) {

            $http({
                "data": rest.data,
                "headers": {"Content-Type": "application/json"},
                "method": "POST",
                "url": rest.url
            }).then(function (response) {

                callback(response.data);

            });

        }


        return memberGroup;


    }];


});


app.directive("memberGroupDetail", function () {


    var memberGroup = {};


    memberGroup.templateUrl = document.getElementById("config").getAttribute("data-base-url") + "/resource/html/member-group-detail-popup.html";


    return memberGroup;


});
