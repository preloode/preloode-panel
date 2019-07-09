app.controller("administrator", ["$scope", "$window", "$log", "administrator", function ($scope, $window, $log, administrator) {


    $scope.city = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.confirmPassword = {
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
        },
        "value": ""
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
                {"name": "Female"},
                {"name": "Male"},
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
        "role": {
            "option": [
                {"id": "", "name": "Role"}
            ],
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
        "username": {
            "value": ""
        }
    };

    $scope.filter.country.selected = $scope.filter.country.option[0];

    $scope.filter.gender.selected = $scope.filter.gender.option[0];

    $scope.filter.role.selected = $scope.filter.role.option[0];

    $scope.filter.status.selected = $scope.filter.status.option[0];

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
            {"name": "Female"},
            {"name": "Male"},
            {"name": "Other"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.gender.selected = $scope.gender.option[0];

    $scope.id = {
        "value": ""
    };

    $scope.language = {
        "option": [
            {"name": "Language"},
            {"name": "Bahasa"},
            {"name": "English"},
            {"name": "Filipino"},
            {"name": "Khmer"},
            {"name": "Mandarin"},
            {"name": "Melayu"},
            {"name": "Thailand"},
            {"name": "Other"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.language.selected = $scope.language.option[0];

    $scope.lastName = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.lineId = {
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
                {"number": "+63"},
                {"number": "+66"},
                {"number": "+855"},
                {"number": "+86"},
                {"number": "+886"}
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

    $scope.province = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.role = {
        "option": [
            {"id": "", "name": "Role"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.role.selected = $scope.role.option[0];

    $scope.site = {
        "page": "",
        "pagination": ""
    };

    $scope.status = {
        "option": [
            {"name": "Status"},
            {"name": "Active"},
            {"name": "Inactive"},
            {"name": "Suspended"}
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

    $scope.username = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.valid = {
        "city": false,
        "confirmPassword": false,
        "country": false,
        "emailAddress": false,
        "file": false,
        "firstName": false,
        "gender": false,
        "language": false,
        "lastName": false,
        "lineId": false,
        "middleName": false,
        "password": false,
        "phoneNumber": false,
        "province": false,
        "role": false,
        "status": false,
        "streetAddress": false,
        "username": false,
        "wechatId": false,
        "whatsappNumber": false,
        "zipCode": false
    };

    $scope.wechatId = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.whatsappNumber = {
        "countryCode": {
            "option": [
                {"number": "+60"},
                {"number": "+62"},
                {"number": "+63"},
                {"number": "+66"},
                {"number": "+855"},
                {"number": "+86"},
                {"number": "+886"}
            ]
        },
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.whatsappNumber.countryCode.selected = $scope.whatsappNumber.countryCode.option[0];

    $scope.zipCode = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };


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


    $scope.checkConfirmPassword = function () {

        if (!$scope.confirmPassword.value.match($scope.password.value)) {

            $scope.confirmPassword.response.value = "Password doesn't match";
            $scope.confirmPassword.response.class = "error";
            $scope.confirmPassword.response.view = true;
            $scope.valid.confirmPassword = false;

        } else {

            $scope.confirmPassword.response.view = false;
            $scope.valid.confirmPassword = true;

        }

        $scope.confirmPassword.value = $scope.confirmPassword.value.trim();

    }


    $scope.checkCountry = function () {

        if ($scope.country.selected.name == "Country") {

            $scope.country.response.value = "Please select administrator country";
            $scope.country.response.class = "error";
            $scope.country.response.view = true;
            $scope.valid.country = false;

        } else {

            $scope.country.response.view = false;
            $scope.valid.country = true;

        }

    }


    $scope.checkData = function () {

        $scope.checkCity();

        $scope.checkConfirmPassword();

        $scope.checkCountry();

        $scope.checkEmailAddress();

        $scope.checkFile();

        $scope.checkFirstName();

        $scope.checkGender();

        $scope.checkLanguage();

        $scope.checkLastName();

        $scope.checkLineId();

        $scope.checkMiddleName();

        $scope.checkPassword();

        $scope.checkPhoneNumber();

        $scope.checkProvince();

        $scope.checkRole();

        $scope.checkStatus();

        $scope.checkStreetAddress();

        $scope.checkUsername();

        $scope.checkWechatId();

        $scope.checkWhatsappNumber();

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

            $scope.gender.response.value = "Please select administrator gender";
            $scope.gender.response.class = "error";
            $scope.gender.response.view = true;
            $scope.valid.gender = false;

        } else {

            $scope.gender.response.view = false;
            $scope.valid.gender = true;

        }

    }


    $scope.checkLanguage = function () {

        if ($scope.language.selected.name == "Language") {

            $scope.language.response.value = "Please select administrator language";
            $scope.language.response.class = "error";
            $scope.language.response.view = true;
            $scope.valid.language = false;

        } else {

            $scope.language.response.view = false;
            $scope.valid.language = true;

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


    $scope.checkLineId = function () {

        if ($scope.lineId.value != "") {

            if (/\s/.test($scope.lineId.value) || $scope.lineId.value.length < 3 || $scope.lineId.value.length > 20) {

                $scope.lineId.response.value = "Please enter valid line ID";
                $scope.lineId.response.class = "error";
                $scope.lineId.response.view = true;
                $scope.valid.lineId = false;

            } else {

                $scope.lineId.response.view = false;
                $scope.valid.lineId = true;

            }

        } else {

            $scope.lineId.response.view = false;
            $scope.valid.lineId = true;

        }

        $scope.lineId.value = $scope.lineId.value.trim();

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


    $scope.checkPassword = function () {

        if ($scope.password.value.length < 3) {

            $scope.password.response.value = "Please enter at least 3 characters";
            $scope.password.response.class = "error";
            $scope.password.response.view = true;
            $scope.valid.password = false;

        } else if (/[a-z]/.test($scope.password.value) && /[A-Z]/.test($scope.password.value) && /[0-9]/.test($scope.password.value) && /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test($scope.password.value)) {

            $scope.password.response.value = "Strong security password";
            $scope.password.response.class = "success";
            $scope.password.response.view = true;
            $scope.valid.password = true;

        } else if (/[A-Z]/.test($scope.password.value) && /[0-9]/.test($scope.password.value) && /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test($scope.password.value)) {

            $scope.password.response.value = "Secured password";
            $scope.password.response.class = "success";
            $scope.password.response.view = true;
            $scope.valid.password = true;

        } else if (/[a-z]/.test($scope.password.value) && /[0-9]/.test($scope.password.value) && /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test($scope.password.value)) {

            $scope.password.response.value = "Secured password";
            $scope.password.response.class = "success";
            $scope.password.response.view = true;
            $scope.valid.password = true;

        } else if (/[a-z]/.test($scope.password.value) && /[A-Z]/.test($scope.password.value) && /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test($scope.password.value)) {

            $scope.password.response.value = "Secured password";
            $scope.password.response.class = "success";
            $scope.password.response.view = true;
            $scope.valid.password = true;

        } else if (/[a-z]/.test($scope.password.value) && /[A-Z]/.test($scope.password.value) && /[0-9]/.test($scope.password.value)) {

            $scope.password.response.value = "Secured password";
            $scope.password.response.class = "success";
            $scope.password.response.view = true;
            $scope.valid.password = true;

        } else if (/[0-9]/.test($scope.password.value) && /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test($scope.password.value)) {

            $scope.password.response.value = "Medium security password";
            $scope.password.response.class = "warning";
            $scope.password.response.view = true;
            $scope.valid.password = true;

        } else if (/[A-Z]/.test($scope.password.value) && /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test($scope.password.value)) {

            $scope.password.response.value = "Medium security password";
            $scope.password.response.class = "warning";
            $scope.password.response.view = true;
            $scope.valid.password = true;

        } else if (/[A-Z]/.test($scope.password.value) && /[0-9]/.test($scope.password.value)) {

            $scope.password.response.value = "Medium security password";
            $scope.password.response.class = "warning";
            $scope.password.response.view = true;
            $scope.valid.password = true;

        } else if (/[a-z]/.test($scope.password.value) && /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test($scope.password.value)) {

            $scope.password.response.value = "Medium security password";
            $scope.password.response.class = "warning";
            $scope.password.response.view = true;
            $scope.valid.password = true;

        } else if (/[a-z]/.test($scope.password.value) && /[0-9]/.test($scope.password.value)) {

            $scope.password.response.value = "Medium security password";
            $scope.password.response.class = "warning";
            $scope.password.response.view = true;
            $scope.valid.password = true;

        } else if (/[a-z]/.test($scope.password.value) && /[A-Z]/.test($scope.password.value)) {

            $scope.password.response.value = "Medium security password";
            $scope.password.response.class = "warning";
            $scope.password.response.view = true;
            $scope.valid.password = true;

        } else if (/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test($scope.password.value)) {

            $scope.password.response.value = "Low security password";
            $scope.password.response.class = "warning";
            $scope.password.response.view = true;
            $scope.valid.password = true;

        } else if (/[0-9]/.test($scope.password.value)) {

            $scope.password.response.value = "Low security password";
            $scope.password.response.class = "warning";
            $scope.password.response.view = true;
            $scope.valid.password = true;

        } else if (/[A-Z]/.test($scope.password.value)) {

            $scope.password.response.value = "Low security password";
            $scope.password.response.class = "warning";
            $scope.password.response.view = true;
            $scope.valid.password = true;

        } else if (/[a-z]/.test($scope.password.value)) {

            $scope.password.response.value = "Low security password";
            $scope.password.response.class = "warning";
            $scope.password.response.view = true;
            $scope.valid.password = true;

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


    $scope.checkRole = function () {

        if ($scope.role.selected.id == "") {

            $scope.role.response.value = "Please select administrator role";
            $scope.role.response.class = "error";
            $scope.role.response.view = true;
            $scope.valid.role = false;

        } else {

            $scope.role.response.view = false;
            $scope.valid.role = true;

        }

    }


    $scope.checkStatus = function () {

        if ($scope.status.selected.name == "Status") {

            $scope.status.response.value = "Please select administrator status";
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


    $scope.checkUsername = function () {

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

        $scope.username.value = $scope.username.value.trim();

    }


    $scope.checkWechatId = function () {

        if ($scope.wechatId.value != "") {

            if (/\s/.test($scope.wechatId.value) || $scope.wechatId.value.length < 3 || $scope.wechatId.value.length > 20) {

                $scope.wechatId.response.value = "Please enter valid wechat ID";
                $scope.wechatId.response.class = "error";
                $scope.wechatId.response.view = true;
                $scope.valid.wechatId = false;

            } else {

                $scope.wechatId.response.view = false;
                $scope.valid.wechatId = true;

            }

        } else {

            $scope.wechatId.response.view = false;
            $scope.valid.wechatId = true;

        }

        $scope.wechatId.value = $scope.wechatId.value.trim();

    }


    $scope.checkWhatsappNumber = function () {

        if ($scope.whatsappNumber.value != "") {

            if (!$scope.whatsappNumber.value.match(/^[0-9]+$/) || $scope.whatsappNumber.value.length < 9 || $scope.whatsappNumber.value.length > 14) {

                $scope.whatsappNumber.response.value = "Please enter valid whatsapp number";
                $scope.whatsappNumber.response.class = "error";
                $scope.whatsappNumber.response.view = true;
                $scope.valid.whatsappNumber = false;

            } else {

                $scope.whatsappNumber.response.view = false;
                $scope.valid.whatsappNumber = true;

            }

        } else {

            $scope.whatsappNumber.response.view = false;
            $scope.valid.whatsappNumber = true;

        }

        $scope.whatsappNumber.value = $scope.whatsappNumber.value.trim();

    }


    $scope.checkZipCode = function () {

        if ($scope.zipCode.value != "") {

            if (!$scope.zipCode.value.match(/^[0-9-]+$/) || $scope.zipCode.value.length > 7) {

                $scope.zipCode.response.value = "Please enter valid zip code";
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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/administrator/delete"
        };
        administrator.rest(rest, function (response) {

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
                    "city": $scope.city.value,
                    "contact": {
                        "email_address": $scope.emailAddress.value,
                        "line_id": $scope.lineId.value,
                        "phone_number": input.phoneNumber,
                        "wechat_id": $scope.wechatId.value,
                        "whatsapp_number": input.whatsappNumber
                    },
                    "country": $scope.country.selected.name,
                    "file": $scope.file.value,
                    "gender": $scope.gender.selected.name,
                    "id": $scope.id.value,
                    "language": $scope.language.selected.name,
                    "name": {
                        "first": $scope.firstName.value,
                        "last": $scope.lastName.value,
                        "middle": $scope.middleName.value
                    },
                    "password": {
                        "main": library.rsaEncryption.encrypt($scope.password.value),
                        "recovery": library.rsaEncryption.encrypt($scope.password.value)
                    },
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
                    "province": $scope.province.value,
                    "role": {
                        "id": $scope.role.selected.id,
                        "name": $scope.role.selected.name
                    },
                    "status": $scope.status.selected.name,
                    "street_address": $scope.streetAddress.value,
                    "username": $scope.username.value,
                    "zip_code": $scope.zipCode.value
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/administrator/update"
            };
            administrator.rest(rest, function (response) {

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
            "role.id": ["equal", $scope.filter.role.selected.id],
            "status": ["equal", ""],
            "username": ["like", $scope.filter.username.value]
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

        var rest = {
            "data": data,
            "url": document.getElementById("config").getAttribute("data-base-url") + "/administrator/filter-pagination"
        };
        administrator.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/administrator/";

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

        document.getElementsByClassName("administrator-file")[0].click();

    }


    $scope.goToPage = function (event) {

        if (event.which == 13) {

            $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/administrator/page-" + $scope.site.page + "/";

        }

        event.preventDefault();

    }


    $scope.initializeData = function (id) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "id": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/administrator/initialize-data"
        }
        administrator.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("data")) {

                    $scope.city.value = response.data.city;
                    $scope.confirmPassword.value = library.rsaEncryption.decrypt(response.data.password.main);

                    angular.forEach($scope.country.option, function (value, key) {

                        if (value.name == response.data.country) {

                            $scope.country.selected = $scope.country.option[key];

                            return false;

                        }

                    });

                    var createdTimestamp = new Date(response.data.created.timestamp);
                    $scope.createdDate.value = createdTimestamp.getFullYear() + "-" + ("0" + (createdTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + createdTimestamp.getDate()).slice(-2) + " " + ("0" + createdTimestamp.getHours()).slice(-2) + ":" + ("0" + createdTimestamp.getMinutes()).slice(-2) + ":" + ("0" + createdTimestamp.getSeconds()).slice(-2);
                    $scope.createdDate.view = true;

                    $scope.emailAddress.value = response.data.contact.email_address;

                    if (response.data.file != "") {

                        $scope.file.upload.file = response.data.file;
                        $scope.file.upload.result = true;
                        $scope.file.value = response.data.file;

                    }

                    $scope.firstName.value = response.data.name.first;

                    angular.forEach($scope.gender.option, function (value, key) {

                        if (value.name == response.data.gender) {

                            $scope.gender.selected = $scope.gender.option[key];

                            return false;

                        }

                    });

                    $scope.id.value = response.data._id;

                    angular.forEach($scope.language.option, function (value, key) {

                        if (value.name == response.data.language) {

                            $scope.language.selected = $scope.language.option[key];

                            return false;

                        }

                    });

                    $scope.lastName.value = response.data.name.last;
                    $scope.lineId.value = response.data.contact.line_id;
                    $scope.middleName.value = response.data.name.middle;

                    var modifiedTimestamp = new Date(response.data.modified.timestamp);
                    $scope.modifiedDate.value = modifiedTimestamp.getFullYear() + "-" + ("0" + (modifiedTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + modifiedTimestamp.getDate()).slice(-2) + " " + ("0" + modifiedTimestamp.getHours()).slice(-2) + ":" + ("0" + modifiedTimestamp.getMinutes()).slice(-2) + ":" + ("0" + modifiedTimestamp.getSeconds()).slice(-2);
                    $scope.modifiedDate.view = true;

                    $scope.password.value = library.rsaEncryption.decrypt(response.data.password.main);

                    angular.forEach($scope.phoneNumber.countryCode.option, function (value, key) {

                        if (value.number == response.data.contact.phone_number.slice(0, 3)) {

                            $scope.phoneNumber.countryCode.selected = $scope.phoneNumber.countryCode.option[key];

                            return false;

                        }

                    });

                    $scope.phoneNumber.value = response.data.contact.phone_number.slice(3);
                    $scope.province.value = response.data.province;

                    angular.forEach($scope.status.option, function (value, key) {

                        if (value.name == response.data.status) {

                            $scope.status.selected = $scope.status.option[key];

                            return false;

                        }

                    });

                    $scope.streetAddress.value = response.data.street_address;
                    $scope.username.value = response.data.username;
                    $scope.wechatId.value = response.data.contact.wechat_id;

                    angular.forEach($scope.whatsappNumber.countryCode.option, function (value, key) {

                        if (value.number == response.data.contact.whatsapp_number.slice(0, 3)) {

                            $scope.whatsappNumber.countryCode.selected = $scope.whatsappNumber.countryCode.option[key];

                            return false;

                        }

                    });

                    $scope.whatsappNumber.value = response.data.contact.whatsapp_number.slice(3);
                    $scope.zipCode.value = response.data.zip_code;

                    $scope.initializePrivilege(response.data.privilege);

                }

                angular.forEach(response.role, function (value, key) {

                    $scope.role.option.push({
                        "id": value._id,
                        "name": value.name
                    });

                    if (response.hasOwnProperty("data")) {

                        if (value._id == response.data.role.id) {

                            $scope.role.selected = $scope.role.option[key + 1];

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
            "whatsappNumber": $scope.whatsappNumber.value
        };

        if ($scope.phoneNumber.value != "") {

            result.phoneNumber = $scope.phoneNumber.countryCode.selected.number + $scope.phoneNumber.value;

        }

        if ($scope.whatsappNumber.value != "") {

            result.whatsappNumber = $scope.whatsappNumber.countryCode.selected.number + $scope.whatsappNumber.value;

        }

        return result;

    }


    $scope.initializePagination = function () {

        $scope.loading.view = true;

        var rest = {
            "data": {},
            "url": document.getElementById("config").getAttribute("data-base-url") + "/administrator/initialize-pagination"
        };
        administrator.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("filter")) {

                    angular.forEach($scope.filter.country.option, function (value, key) {

                        if (value.name == response.filter.country[1]) {

                            $scope.filter.country.selected = $scope.filter.country.option[key];

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

                    $scope.filter.id.value = response.filter._id[1];
                    $scope.filter.firstName.value = response.filter.name_first[1];

                    angular.forEach($scope.filter.gender.option, function (value, key) {

                        if (value.name == response.filter.gender[1]) {

                            $scope.filter.gender.selected = $scope.filter.gender.option[key];

                            return false;

                        }

                    });

                    $scope.filter.lastName.value = response.filter.name_last[1];
                    $scope.filter.middleName.value = response.filter.name_middle[1];

                    angular.forEach($scope.filter.status.option, function (value, key) {

                        if (value.name == response.filter.status[1]) {

                            $scope.filter.status.selected = $scope.filter.status.option[key];

                            return false;

                        }

                    });

                    $scope.filter.username.value = response.filter.username[1];

                }

                angular.forEach(response.role, function (value, key) {

                    $scope.filter.role.option.push({
                        "id": value._id,
                        "name": value.name
                    });

                    if (response.hasOwnProperty("filter")) {

                        if (value._id == response.filter.role_id[1]) {

                            $scope.filter.role.selected = $scope.filter.role.option[key + 1];

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

            var input = $scope.initializeInput();

            var rest = {
                "data": {
                    "city": $scope.city.value,
                    "contact": {
                        "email_address": $scope.emailAddress.value,
                        "line_id": $scope.lineId.value,
                        "phone_number": input.phoneNumber,
                        "wechat_id": $scope.wechatId.value,
                        "whatsapp_number": input.whatsappNumber
                    },
                    "country": $scope.country.selected.name,
                    "file": $scope.file.value,
                    "gender": $scope.gender.selected.name,
                    "language": $scope.language.selected.name,
                    "name": {
                        "first": $scope.firstName.value,
                        "last": $scope.lastName.value,
                        "middle": $scope.middleName.value
                    },
                    "password": {
                        "main": library.rsaEncryption.encrypt($scope.password.value),
                        "recovery": library.rsaEncryption.encrypt($scope.password.value)
                    },
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
                    "province": $scope.province.value,
                    "role": {
                        "id": $scope.role.selected.id,
                        "name": $scope.role.selected.name
                    },
                    "status": $scope.status.selected.name,
                    "street_address": $scope.streetAddress.value,
                    "username": $scope.username.value,
                    "zip_code": $scope.zipCode.value
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/administrator/insert"
            };
            administrator.rest(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/administrator/initialize-data"
        }
        administrator.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("data")) {

                    $scope.city.value = response.data.city;
                    $scope.country.value = response.data.country;

                    var createdTimestamp = new Date(response.data.created.timestamp);
                    $scope.createdDate.value = createdTimestamp.getFullYear() + "-" + ("0" + (createdTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + createdTimestamp.getDate()).slice(-2) + " " + ("0" + createdTimestamp.getHours()).slice(-2) + ":" + ("0" + createdTimestamp.getMinutes()).slice(-2) + ":" + ("0" + createdTimestamp.getSeconds()).slice(-2);

                    $scope.emailAddress.value = response.data.contact.email_address;

                    if (response.data.file != "") {

                        $scope.file.upload.file = response.data.file;
                        $scope.file.upload.result = true;
                        $scope.file.value = document.getElementById("config").getAttribute("data-image-url") + "/administrator/" + response.data.file;

                    }

                    $scope.firstName.value = response.data.name.first;
                    $scope.gender.value = response.data.gender;
                    $scope.id.value = response.data._id;
                    $scope.language.value = response.data.language;
                    $scope.lastName.value = response.data.name.last;
                    $scope.lineId.value = response.data.contact.line_id;
                    $scope.middleName.value = response.data.name.middle;

                    var modifiedTimestamp = new Date(response.data.modified.timestamp);
                    $scope.modifiedDate.value = modifiedTimestamp.getFullYear() + "-" + ("0" + (modifiedTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + modifiedTimestamp.getDate()).slice(-2) + " " + ("0" + modifiedTimestamp.getHours()).slice(-2) + ":" + ("0" + modifiedTimestamp.getMinutes()).slice(-2) + ":" + ("0" + modifiedTimestamp.getSeconds()).slice(-2);
                    $scope.password.value = library.rsaEncryption.decrypt(response.data.password.main).replace("/[A-Za-z0-9-!$%^&*()_+|~=`{}\[\]:\";'<>?,.\/]/", "*");
                    $scope.phoneNumber.value = response.data.contact.phone_number;
                    $scope.province.value = response.data.province;
                    $scope.role.value = response.data.role.name;
                    $scope.status.value = response.data.status;
                    $scope.streetAddress.value = response.data.street_address;
                    $scope.username.value = response.data.username;
                    $scope.wechatId.value = response.data.contact.wechat_id;
                    $scope.whatsappNumber.value = response.data.contact.whatsapp_number;
                    $scope.zipCode.value = response.data.zip_code;

                    $scope.initializePrivilege(response.data.privilege);

                }

                $scope.popup.view = true;
                $scope.popup.administrator = true;

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


    $scope.loadPrivilegeCheckbox = function () {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "id": $scope.role.selected.id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/administrator/load-privilege-checkbox"
        }
        administrator.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("privilege")) {

                    $scope.initializePrivilege(response.privilege.privilege);

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/administrator/remove-filter-pagination"
        };
        administrator.rest(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/administrator/set-pagination"
        };
        administrator.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/administrator/";

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

        angular.forEach($scope.files, function (value, key) {

            formData.append("file", value);

        });

        var rest = {
            "data": formData,
            "url": document.getElementById("config").getAttribute("data-base-url") + "/administrator/upload-file"
        };
        administrator.restMultipart(rest, function (response) {

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


app.provider("administrator", function () {


    this.$get = ["$http", function ($http) {


        var administrator = {};


        administrator.rest = function (rest, callback) {

            $http({
                "data": rest.data,
                "headers": {"Content-Type": "application/json"},
                "method": "POST",
                "url": rest.url
            }).then(function (response) {

                callback(response.data);

            });

        }


        administrator.restMultipart = function (rest, callback) {

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


        return administrator;


    }];


});


app.directive("administratorDetail", function () {


    var administrator = {};


    administrator.templateUrl = document.getElementById("config").getAttribute("data-base-url") + "/resource/html/administrator-detail-popup.html";


    return administrator;


});


app.directive("administratorFilePreview", function () {


    var administrator = {};


    administrator.template = "<img class=\"responsive\" ng-src=\"" + document.getElementById("config").getAttribute("data-image-url") + "/administrator/{{file.upload.file}}\" />";


    return administrator;


});
