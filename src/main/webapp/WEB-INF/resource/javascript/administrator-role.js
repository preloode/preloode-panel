app.controller("administratorRole", ["$scope", "$window", "$log", "administratorRole", function ($scope, $window, $log, administratorRole) {


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

    $scope.privilege = {
        "administrator": {
            "name": "Administrator",
            "option": [
                {"name": "View"},
                {"name": "Insert"},
                {"name": "Edit"},
                {"name": "Delete"}
            ],
            "response": {
                "class": "",
                "value": "",
                "view": false
            },
            "status": "Unchecked All",
            "value": "0000"
        },
        "administratorRole": {
            "name": "Administrator Role",
            "option": [
                {"name": "View"},
                {"name": "Insert"},
                {"name": "Edit"},
                {"name": "Delete"}
            ],
            "response": {
                "class": "",
                "value": "",
                "view": false
            },
            "status": "Unchecked All",
            "value": "0000"
        },
        "bank": {
            "name": "Bank",
            "option": [
                {"name": "View"},
                {"name": "Insert"},
                {"name": "Edit"},
                {"name": "Delete"}
            ],
            "response": {
                "class": "",
                "value": "",
                "view": false
            },
            "status": "Unchecked All",
            "value": "0000"
        },
        "bankAccount": {
            "name": "Bank Account",
            "option": [
                {"name": "View"},
                {"name": "Insert"},
                {"name": "Edit"},
                {"name": "Delete"}
            ],
            "response": {
                "class": "",
                "value": "",
                "view": false
            },
            "status": "Unchecked All",
            "value": "0000"
        },
        "blog": {
            "name": "Blog",
            "option": [
                {"name": "View"},
                {"name": "Insert"},
                {"name": "Edit"},
                {"name": "Delete"}
            ],
            "response": {
                "class": "",
                "value": "",
                "view": false
            },
            "status": "Unchecked All",
            "value": "0000"
        },
        "blogCategory": {
            "name": "Blog Category",
            "option": [
                {"name": "View"},
                {"name": "Insert"},
                {"name": "Edit"},
                {"name": "Delete"}
            ],
            "response": {
                "class": "",
                "value": "",
                "view": false
            },
            "status": "Unchecked All",
            "value": "0000"
        },
        "blogStar": {
            "name": "Blog Star",
            "option": [
                {"name": "View"},
                {"name": "Insert"},
                {"name": "Edit"},
                {"name": "Delete"}
            ],
            "response": {
                "class": "",
                "value": "",
                "view": false
            },
            "status": "Unchecked All",
            "value": "0000"
        },
        "gallery": {
            "name": "Gallery",
            "option": [
                {"name": "View"},
                {"name": "Insert"},
                {"name": "Edit"},
                {"name": "Delete"}
            ],
            "response": {
                "class": "",
                "value": "",
                "view": false
            },
            "status": "Unchecked All",
            "value": "0000"
        },
        "game": {
            "name": "Game",
            "option": [
                {"name": "View"},
                {"name": "Insert"},
                {"name": "Edit"},
                {"name": "Delete"}
            ],
            "response": {
                "class": "",
                "value": "",
                "view": false
            },
            "status": "Unchecked All",
            "value": "0000"
        },
        "gameTransaction": {
            "name": "Game Transaction",
            "option": [
                {"name": "View"},
                {"name": "Insert"},
                {"name": "Edit"},
                {"name": "Delete"}
            ],
            "response": {
                "class": "",
                "value": "",
                "view": false
            },
            "status": "Unchecked All",
            "value": "0000"
        },
        "gameType": {
            "name": "Game Type",
            "option": [
                {"name": "View"},
                {"name": "Insert"},
                {"name": "Edit"},
                {"name": "Delete"}
            ],
            "response": {
                "class": "",
                "value": "",
                "view": false
            },
            "status": "Unchecked All",
            "value": "0000"
        },
        "lottery": {
            "name": "Lottery",
            "option": [
                {"name": "View"},
                {"name": "Insert"},
                {"name": "Edit"},
                {"name": "Delete"}
            ],
            "response": {
                "class": "",
                "value": "",
                "view": false
            },
            "status": "Unchecked All",
            "value": "0000"
        },
        "member": {
            "name": "Member",
            "option": [
                {"name": "View"},
                {"name": "Insert"},
                {"name": "Edit"},
                {"name": "Delete"}
            ],
            "response": {
                "class": "",
                "value": "",
                "view": false
            },
            "status": "Unchecked All",
            "value": "0000"
        },
        "memberGroup": {
            "name": "Member Group",
            "option": [
                {"name": "View"},
                {"name": "Insert"},
                {"name": "Edit"},
                {"name": "Delete"}
            ],
            "response": {
                "class": "",
                "value": "",
                "view": false
            },
            "status": "Unchecked All",
            "value": "0000"
        },
        "memberTransaction": {
            "name": "Member Transaction",
            "option": [
                {"name": "View"},
                {"name": "Insert"},
                {"name": "Edit"},
                {"name": "Delete"}
            ],
            "response": {
                "class": "",
                "value": "",
                "view": false
            },
            "status": "Unchecked All",
            "value": "0000"
        },
        "promotion": {
            "name": "Promotion",
            "option": [
                {"name": "View"},
                {"name": "Insert"},
                {"name": "Edit"},
                {"name": "Delete"}
            ],
            "response": {
                "class": "",
                "value": "",
                "view": false
            },
            "status": "Unchecked All",
            "value": "0000"
        },
        "report": {
            "name": "Report",
            "option": [
                {"name": "View"},
                {"name": "Insert"},
                {"name": "Edit"},
                {"name": "Delete"}
            ],
            "response": {
                "class": "",
                "value": "",
                "view": false
            },
            "status": "Unchecked All",
            "value": "0000"
        },
        "setting": {
            "name": "Setting",
            "option": [
                {"name": "View"},
                {"name": "Insert"},
                {"name": "Edit"},
                {"name": "Delete"}
            ],
            "response": {
                "class": "",
                "value": "",
                "view": false
            },
            "status": "Unchecked All",
            "value": "0000"
        },
        "settingPage": {
            "name": "Setting Page",
            "option": [
                {"name": "View"},
                {"name": "Insert"},
                {"name": "Edit"},
                {"name": "Delete"}
            ],
            "response": {
                "class": "",
                "value": "",
                "view": false
            },
            "status": "Unchecked All",
            "value": "0000"
        },
        "settingSlider": {
            "name": "Setting Slider",
            "option": [
                {"name": "View"},
                {"name": "Insert"},
                {"name": "Edit"},
                {"name": "Delete"}
            ],
            "response": {
                "class": "",
                "value": "",
                "view": false
            },
            "status": "Unchecked All",
            "value": "0000"
        },
        "settingUrl": {
            "name": "Setting URL",
            "option": [
                {"name": "View"},
                {"name": "Insert"},
                {"name": "Edit"},
                {"name": "Delete"}
            ],
            "response": {
                "class": "",
                "value": "",
                "view": false
            },
            "status": "Unchecked All",
            "value": "0000"
        },
        "sportsbook": {
            "name": "Sportsbook",
            "option": [
                {"name": "View"},
                {"name": "Insert"},
                {"name": "Edit"},
                {"name": "Delete"}
            ],
            "response": {
                "class": "",
                "value": "",
                "view": false
            },
            "status": "Unchecked All",
            "value": "0000"
        },
        "transaction": {
            "name": "Transaction",
            "option": [
                {"name": "View"},
                {"name": "Insert"},
                {"name": "Edit"},
                {"name": "Delete"}
            ],
            "response": {
                "class": "",
                "value": "",
                "view": false
            },
            "status": "Unchecked All",
            "value": "0000"
        },
        "transactionRequest": {
            "name": "Transaction Request",
            "option": [
                {"name": "View"},
                {"name": "Insert"},
                {"name": "Edit"},
                {"name": "Delete"}
            ],
            "response": {
                "class": "",
                "value": "",
                "view": false
            },
            "status": "Unchecked All",
            "value": "0000"
        }
    };

    $scope.privilegeAll = {
        "option": [
            {"name": "View", "status": "Unchecked All"},
            {"name": "Insert", "status": "Unchecked All"},
            {"name": "Edit", "status": "Unchecked All"},
            {"name": "Delete", "status": "Unchecked All"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "status": "Unchecked All",
        "value": "0000"
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

    $scope.valid = {
        "name": false,
        "sequence": false,
        "status": false
    };


    $scope.checkData = function () {

        $scope.checkName();

        $scope.checkSequence();

        $scope.checkStatus();

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

            $scope.status.response.value = "Please select administrator role status";
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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/administrator/role/delete"
        };
        administratorRole.rest(rest, function (response) {

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
                    "id": $scope.id.value,
                    "name": $scope.name.value,
                    "privilege": {
                        "administrator": $scope.privilege.administrator.value,
                        "administrator_role": $scope.privilege.administratorRole.value,
                        "bank": $scope.privilege.bank.value,
                        "bank_account": $scope.privilege.bankAccount.value,
                        "blog": $scope.privilege.blog.value,
                        "blog_category": $scope.privilege.blogCategory.value,
                        "blog_star": $scope.privilege.blogStar.value,
                        "gallery": $scope.privilege.gallery.value,
                        "game": $scope.privilege.game.value,
                        "game_transaction": $scope.privilege.gameTransaction.value,
                        "game_type": $scope.privilege.gameType.value,
                        "lottery": $scope.privilege.lottery.value,
                        "member": $scope.privilege.member.value,
                        "member_group": $scope.privilege.memberGroup.value,
                        "member_transaction": $scope.privilege.memberTransaction.value,
                        "promotion": $scope.privilege.promotion.value,
                        "report": $scope.privilege.report.value,
                        "setting": $scope.privilege.setting.value,
                        "setting_page": $scope.privilege.settingPage.value,
                        "setting_slider": $scope.privilege.settingSlider.value,
                        "setting_url": $scope.privilege.settingUrl.value,
                        "sportsbook": $scope.privilege.sportsbook.value,
                        "transaction": $scope.privilege.transaction.value,
                        "transaction_request": $scope.privilege.transactionRequest.value
                    },
                    "sequence": $scope.sequence.value,
                    "status": $scope.status.selected.name
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/administrator/role/update"
            };
            administratorRole.rest(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/administrator/role/filter-pagination"
        };
        administratorRole.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/administrator/role/";

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

            $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/administrator/role/page-" + $scope.site.page + "/";

        }

        event.preventDefault();

    }


    $scope.initializeData = function (id) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "id": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/administrator/role/initialize-data"
        }
        administratorRole.rest(rest, function (response) {

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

                    $scope.initializePrivilege(response.data.privilege);

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


    $scope.initializePagination = function () {

        $scope.loading.view = true;

        var rest = {
            "data": {},
            "url": document.getElementById("config").getAttribute("data-base-url") + "/administrator/role/initialize-pagination"
        };
        administratorRole.rest(rest, function (response) {

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


    $scope.initializePrivilege = function (privilege) {

        var checkedAll = {
            "all": true,
            "view": true,
            "insert": true,
            "edit": true,
            "delete": true
        };
        var uncheckedAll = {
            "all": true,
            "view": true,
            "insert": true,
            "edit": true,
            "delete": true
        };

        angular.forEach(privilege, function (value, key) {

            var key = key.split("_");
            var name = "";

            angular.forEach(key, function (valueLevel1, keyLevel1) {

                name += valueLevel1.slice(0, 1).toUpperCase() + valueLevel1.slice(1).toLowerCase();

            });

            name = name.slice(0, 1).toLowerCase() + name.slice(1);
            $scope.privilege[name].value = value;

            if (value == "7777") {

                $scope.privilege[name].status = "Checked All";

            } else if (value == "0000") {

                $scope.privilege[name].status = "Unchecked All";

            } else {

                $scope.privilege[name].status = "Checked In Part";

            }

            if (value != "7777") {

                checkedAll.all = false;

            }

            if (value != "0000") {

                uncheckedAll.all = false;

            }

            if (value.slice(0, 1) != "7") {

                checkedAll.view = false;

            }

            if (value.slice(0, 1) != "0") {

                uncheckedAll.view = false;

            }

            if (value.slice(1, 2) != "7") {

                checkedAll.insert = false;

            }

            if (value.slice(1, 2) != "0") {

                uncheckedAll.insert = false;

            }

            if (value.slice(2, 3) != "7") {

                checkedAll.edit = false;

            }

            if (value.slice(2, 3) != "0") {

                uncheckedAll.edit = false;

            }

            if (value.slice(3) != "7") {

                checkedAll.delete = false;

            }

            if (value.slice(3) != "0") {

                uncheckedAll.delete = false;

            }

        });

        if (checkedAll.all && !uncheckedAll.all) {

            $scope.privilegeAll.status = "Checked All";
            $scope.privilegeAll.value = "7777";

        } else if (!checkedAll.all && uncheckedAll.all) {

            $scope.privilegeAll.status = "Unchecked All";
            $scope.privilegeAll.value = "0000";

        } else if (!checkedAll.all && !uncheckedAll.all) {

            $scope.privilegeAll.status = "Checked In Part";

        }

        if (checkedAll.view && !uncheckedAll.view) {

            $scope.privilegeAll.option[0].status = "Checked All";
            $scope.privilegeAll.value = "7" + $scope.privilegeAll.value.slice(1);

        } else if (!checkedAll.view && uncheckedAll.view) {

            $scope.privilegeAll.option[0].status = "Unchecked All";
            $scope.privilegeAll.value = "0" + $scope.privilegeAll.value.slice(1);

        } else if (!checkedAll.view && !uncheckedAll.view) {

            $scope.privilegeAll.option[0].status = "Checked In Part";
            $scope.privilegeAll.value = "0" + $scope.privilegeAll.value.slice(1);

        }

        if (checkedAll.insert && !uncheckedAll.insert) {

            $scope.privilegeAll.option[1].status = "Checked All";
            $scope.privilegeAll.value = $scope.privilegeAll.value.slice(0, 1) + "7" + $scope.privilegeAll.value.slice(2);

        } else if (!checkedAll.insert && uncheckedAll.insert) {

            $scope.privilegeAll.option[1].status = "Unchecked All";
            $scope.privilegeAll.value = $scope.privilegeAll.value.slice(0, 1) + "0" + $scope.privilegeAll.value.slice(2);

        } else if (!checkedAll.insert && !uncheckedAll.insert) {

            $scope.privilegeAll.option[1].status = "Checked In Part";
            $scope.privilegeAll.value = $scope.privilegeAll.value.slice(0, 1) + "0" + $scope.privilegeAll.value.slice(2);

        }

        if (checkedAll.edit && !uncheckedAll.edit) {

            $scope.privilegeAll.option[2].status = "Checked All";
            $scope.privilegeAll.value = $scope.privilegeAll.value.slice(0, 2) + "7" + $scope.privilegeAll.value.slice(3);

        } else if (!checkedAll.edit && uncheckedAll.edit) {

            $scope.privilegeAll.option[2].status = "Unchecked All";
            $scope.privilegeAll.value = $scope.privilegeAll.value.slice(0, 2) + "0" + $scope.privilegeAll.value.slice(3);

        } else if (!checkedAll.edit && !uncheckedAll.edit) {

            $scope.privilegeAll.option[2].status = "Checked In Part";
            $scope.privilegeAll.value = $scope.privilegeAll.value.slice(0, 2) + "0" + $scope.privilegeAll.value.slice(3);

        }

        if (checkedAll.delete && !uncheckedAll.delete) {

            $scope.privilegeAll.option[3].status = "Checked All";
            $scope.privilegeAll.value = $scope.privilegeAll.value.slice(0, 3) + "7";

        } else if (!checkedAll.delete && uncheckedAll.delete) {

            $scope.privilegeAll.option[3].status = "Unchecked All";
            $scope.privilegeAll.value = $scope.privilegeAll.value.slice(0, 3) + "0";

        } else if (!checkedAll.delete && !uncheckedAll.delete) {

            $scope.privilegeAll.option[3].status = "Checked In Part";
            $scope.privilegeAll.value = $scope.privilegeAll.value.slice(0, 3) + "0";

        }

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
                    "privilege": {
                        "administrator": $scope.privilege.administrator.value,
                        "administrator_role": $scope.privilege.administratorRole.value,
                        "bank": $scope.privilege.bank.value,
                        "bank_account": $scope.privilege.bankAccount.value,
                        "blog": $scope.privilege.blog.value,
                        "blog_category": $scope.privilege.blogCategory.value,
                        "blog_star": $scope.privilege.blogStar.value,
                        "gallery": $scope.privilege.gallery.value,
                        "game": $scope.privilege.game.value,
                        "game_transaction": $scope.privilege.gameTransaction.value,
                        "game_type": $scope.privilege.gameType.value,
                        "lottery": $scope.privilege.lottery.value,
                        "member": $scope.privilege.member.value,
                        "member_group": $scope.privilege.memberGroup.value,
                        "member_transaction": $scope.privilege.memberTransaction.value,
                        "promotion": $scope.privilege.promotion.value,
                        "report": $scope.privilege.report.value,
                        "setting": $scope.privilege.setting.value,
                        "setting_page": $scope.privilege.settingPage.value,
                        "setting_slider": $scope.privilege.settingSlider.value,
                        "setting_url": $scope.privilege.settingUrl.value,
                        "sportsbook": $scope.privilege.sportsbook.value,
                        "transaction": $scope.privilege.transaction.value,
                        "transaction_request": $scope.privilege.transactionRequest.value
                    },
                    "sequence": $scope.sequence.value,
                    "status": $scope.status.selected.name
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/administrator/role/insert"
            };
            administratorRole.rest(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/administrator/role/initialize-data"
        }
        administratorRole.rest(rest, function (response) {

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

                    $scope.initializePrivilege(response.data.privilege);

                }

                $scope.popup.view = true;
                $scope.popup.administratorRole = true;

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


    $scope.privilegeAllToggleAllCheckbox = function (privilege) {

        var checkedAll = true;

        angular.forEach($scope.privilege, function (value, key) {

            if (value.value != "7777") {

                checkedAll = false;

                return false;

            }

        });

        if (checkedAll) {

            $scope.privilegeAll.status = "Unchecked All";
            $scope.privilegeAll.value = "0000";

        } else {

            $scope.privilegeAll.status = "Checked All";
            $scope.privilegeAll.value = "7777";

        }

        angular.forEach($scope.privilegeAll.option, function (value, key) {

            if (checkedAll) {

                $scope.privilegeAll.option[key].status = "Unchecked All";

            } else {

                $scope.privilegeAll.option[key].status = "Checked All";

            }

        });

        angular.forEach($scope.privilege, function (value, key) {

            if (checkedAll) {

                $scope.privilege[key].status = "Unchecked All";
                $scope.privilege[key].value = "0000";

            } else {

                $scope.privilege[key].status = "Checked All";
                $scope.privilege[key].value = "7777";

            }

        });

    }


    $scope.privilegeAllToggleCheckbox = function (privilegeItem, selected) {

        var status = "0";
        var index = 0;

        if (privilegeItem.name == "View") {

            status = selected.slice(0, 1);
            index = 0;

        } else if (privilegeItem.name == "Insert") {

            status = selected.slice(1, 2);
            index = 1;

        } else if (privilegeItem.name == "Edit") {

            status = selected.slice(2, 3);
            index = 2;

        } else if (privilegeItem.name == "Delete") {

            status = selected.slice(3, 4);
            index = 3;

        }

        if (status == "0") {

            status = "7";

        } else {

            status = "0";

        }

        if (privilegeItem.name == "View") {

            selected = status + selected.slice(1);

        } else if (privilegeItem.name == "Insert") {

            selected = selected.slice(0, 1) + status + selected.slice(2);

        } else if (privilegeItem.name == "Edit") {

            selected = selected.slice(0, 2) + status + selected.slice(3);

        } else if (privilegeItem.name == "Delete") {

            selected = selected.slice(0, 3) + status;

        }

        $scope.privilegeAll.value = selected;

        if (status == "7") {

            $scope.privilegeAll.option[index].status = "Checked All"

        } else {

            $scope.privilegeAll.option[index].status = "Unchecked All";

        }

        if (selected == "0000") {

            $scope.privilegeAll.status = "Unchecked All";

        } else if (selected == "7777") {

            $scope.privilegeAll.status = "Checked All";

        } else {

            $scope.privilegeAll.status = "Checked In Part";

        }

        angular.forEach($scope.privilege, function (value, key) {

            if (privilegeItem.name == "View") {

                $scope.privilege[key].value = status + value.value.slice(1);

            } else if (privilegeItem.name == "Insert") {

                $scope.privilege[key].value = value.value.slice(0, 1) + status + value.value.slice(2);

            } else if (privilegeItem.name == "Edit") {

                $scope.privilege[key].value = value.value.slice(0, 2) + status + value.value.slice(3);

            } else if (privilegeItem.name == "Delete") {

                $scope.privilege[key].value = value.value.slice(0, 3) + status;

            }

            if ($scope.privilege[key].value == "0000") {

                $scope.privilege[key].status = "Unchecked All";

            } else if ($scope.privilege[key].value == "7777") {

                $scope.privilege[key].status = "Checked All";

            } else {

                $scope.privilege[key].status = "Checked In Part";

            }

        });

    }


    $scope.privilegeToggleAllCheckbox = function (privilegeName, selected) {

        var checkedAll = {
            "all": true,
            "view": true,
            "insert": true,
            "edit": true,
            "delete": true
        };
        var uncheckedAll = {
            "all": true,
            "view": true,
            "insert": true,
            "edit": true,
            "delete": true
        };

        angular.forEach($scope.privilege, function (value, key) {

            if (value.name == privilegeName) {

                if (selected == "7777") {

                    $scope.privilege[key].status = "Unchecked All";
                    $scope.privilege[key].value = "0000";

                } else {

                    $scope.privilege[key].status = "Checked All";
                    $scope.privilege[key].value = "7777";

                }

            }

            if (value.value != "7777") {

                checkedAll.all = false;

            }

            if (value.value != "0000") {

                uncheckedAll.all = false;

            }

            if (value.value.slice(0, 1) != "7") {

                checkedAll.view = false;

            }

            if (value.value.slice(0, 1) != "0") {

                uncheckedAll.view = false;

            }

            if (value.value.slice(1, 2) != "7") {

                checkedAll.insert = false;

            }

            if (value.value.slice(1, 2) != "0") {

                uncheckedAll.insert = false;

            }

            if (value.value.slice(2, 3) != "7") {

                checkedAll.edit = false;

            }

            if (value.value.slice(2, 3) != "0") {

                uncheckedAll.edit = false;

            }

            if (value.value.slice(3, 4) != "7") {

                checkedAll.delete = false;

            }

            if (value.value.slice(3, 4) != "0") {

                uncheckedAll.delete = false;

            }

        });

        if (checkedAll.all && !uncheckedAll.all) {

            $scope.privilegeAll.status = "Checked All";
            $scope.privilegeAll.value = "7777";

        } else if (!checkedAll.all && uncheckedAll.all) {

            $scope.privilegeAll.status = "Unchecked All";
            $scope.privilegeAll.value = "0000";

        } else if (!checkedAll.all && !uncheckedAll.all) {

            $scope.privilegeAll.status = "Checked In Part";

        }

        if (checkedAll.view && !uncheckedAll.view) {

            $scope.privilegeAll.option[0].status = "Checked All";
            $scope.privilegeAll.value = "7777";

        } else if (!checkedAll.view && uncheckedAll.view) {

            $scope.privilegeAll.option[0].status = "Unchecked All";
            $scope.privilegeAll.value = "0000";

        } else if (!checkedAll.view && !uncheckedAll.view) {

            $scope.privilegeAll.option[0].status = "Checked In Part";

        }

        if (checkedAll.insert && !uncheckedAll.insert) {

            $scope.privilegeAll.option[1].status = "Checked All";
            $scope.privilegeAll.value = "7777";

        } else if (!checkedAll.insert && uncheckedAll.insert) {

            $scope.privilegeAll.option[1].status = "Unchecked All";
            $scope.privilegeAll.value = "0000";

        } else if (!checkedAll.insert && !uncheckedAll.insert) {

            $scope.privilegeAll.option[1].status = "Checked In Part";

        }

        if (checkedAll.edit && !uncheckedAll.edit) {

            $scope.privilegeAll.option[2].status = "Checked All";
            $scope.privilegeAll.value = "7777";

        } else if (!checkedAll.edit && uncheckedAll.edit) {

            $scope.privilegeAll.option[2].status = "Unchecked All";
            $scope.privilegeAll.value = "0000";

        } else if (!checkedAll.edit && !uncheckedAll.edit) {

            $scope.privilegeAll.option[2].status = "Checked In Part";

        }

        if (checkedAll.delete && !uncheckedAll.delete) {

            $scope.privilegeAll.option[3].status = "Checked All";
            $scope.privilegeAll.value = "7777";

        } else if (!checkedAll.delete && uncheckedAll.delete) {

            $scope.privilegeAll.option[3].status = "Unchecked All";
            $scope.privilegeAll.value = "0000";

        } else if (!checkedAll.delete && !uncheckedAll.delete) {

            $scope.privilegeAll.option[3].status = "Checked In Part";

        }

    }


    $scope.privilegeToggleCheckbox = function (privilegeName, privilegeItem, selected) {

        var status = "0";
        var index = 0;

        if (privilegeItem.name == "View") {

            status = selected.slice(0, 1);
            index = 0;

        } else if (privilegeItem.name == "Insert") {

            status = selected.slice(1, 2);
            index = 1;

        } else if (privilegeItem.name == "Edit") {

            status = selected.slice(2, 3);
            index = 2;

        } else if (privilegeItem.name == "Delete") {

            status = selected.slice(3, 4);
            index = 3;

        }

        if (status == "0") {

            status = "7";

        } else {

            status = "0";

        }

        if (privilegeItem.name == "View") {

            selected = status + selected.slice(1);

        } else if (privilegeItem.name == "Insert") {

            selected = selected.slice(0, 1) + status + selected.slice(2);

        } else if (privilegeItem.name == "Edit") {

            selected = selected.slice(0, 2) + status + selected.slice(3);

        } else if (privilegeItem.name == "Delete") {

            selected = selected.slice(0, 3) + status;

        }

        var checkedAll = {
            "all": true,
            "option": true
        };
        var uncheckedAll = {
            "all": true,
            "option": true
        };
        var i = 0;

        angular.forEach($scope.privilege, function (value, key) {

            if (value.name == privilegeName) {

                $scope.privilege[key].value = selected;

                if (selected == "0000") {

                    $scope.privilege[key].status = "Unchecked All";

                } else if (selected == "7777") {

                    $scope.privilege[key].status = "Checked All";

                } else {

                    $scope.privilege[key].status = "Checked In Part";

                }

            }

            if (value.value != "7777") {

                checkedAll.all = false;

            }

            if (value.value != "0000") {

                uncheckedAll.all = false;

            }

            status = "0";

            if (privilegeItem.name == "View") {

                status = value.value.slice(0, 1);

            } else if (privilegeItem.name == "Insert") {

                status = value.value.slice(1, 2);

            } else if (privilegeItem.name == "Edit") {

                status = value.value.slice(2, 3);

            } else if (privilegeItem.name == "Delete") {

                status = value.value.slice(3, 4);

            }

            if (status != "7") {

                checkedAll.option = false;

            }

            if (status != "0") {

                uncheckedAll.option = false;

            }

            i++;

        });

        if (checkedAll.all && !uncheckedAll.all) {

            $scope.privilegeAll.status = "Checked All";
            $scope.privilegeAll.value = "7777";

        } else if (!checkedAll.all && uncheckedAll.all) {

            $scope.privilegeAll.status = "Unchecked All";
            $scope.privilegeAll.value = "0000";

        } else if (!checkedAll.all && !uncheckedAll.all) {

            $scope.privilegeAll.status = "Checked In Part";

        }

        if (checkedAll.option && !uncheckedAll.option) {

            $scope.privilegeAll.option[index].status = "Checked All";

        } else if (!checkedAll.option && uncheckedAll.option) {

            $scope.privilegeAll.option[index].status = "Unchecked All";

        } else if (!checkedAll.option && !uncheckedAll.option) {

            $scope.privilegeAll.option[index].status = "Checked In Part";

        }

    }


    $scope.removeFilterPagination = function (event) {

        $scope.loading.view = true;

        var rest = {
            "data": {},
            "url": document.getElementById("config").getAttribute("data-base-url") + "/administrator/role/remove-filter-pagination"
        };
        administratorRole.rest(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/administrator/role/set-pagination"
        };
        administratorRole.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/administrator/role/";

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


app.provider("administratorRole", function () {


    this.$get = ["$http", function ($http) {


        var administratorRole = {};


        administratorRole.rest = function (rest, callback) {

            $http({
                "data": rest.data,
                "headers": {"Content-Type": "application/json"},
                "method": "POST",
                "url": rest.url
            }).then(function (response) {

                callback(response.data);

            });

        }


        return administratorRole;


    }];


});


app.directive("administratorRoleDetail", function () {


    var administratorRole = {};


    administratorRole.templateUrl = document.getElementById("config").getAttribute("data-base-url") + "/resource/html/administrator-role-detail-popup.html";


    return administratorRole;


});
