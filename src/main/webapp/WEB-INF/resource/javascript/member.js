app.controller("member", ["$scope", "$window", "$log", "member", function ($scope, $window, $log, member) {


    $scope.bbmPin = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

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
            {"name": "Indonesia"},
            {"name": "Malaysia"},
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
                {"name": "Indonesia"},
                {"name": "Malaysia"},
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
        "game": {
            "option": [
                {
                    "id": "",
                    "name": "Game",
                    "type": {
                        "id": "",
                        "name": ""
                    }
                }
            ],
            "value": ""
        },
        "gameUsername": {
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
        "group": {
            "option": [
                {"id": "", "name": "Group"}
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
        "paymentBank": {
            "option": [
                {"id": "", "name": "Bank"}
            ],
            "value": ""
        },
        "paymentBankAccountName": {
            "value": ""
        },
        "paymentBankAccountNumber": {
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
                {"name": "Member"},
                {"name": "Referral"},
                {"name": "Affiliate"}
            ],
            "value": ""
        },
        "username": {
            "value": ""
        }
    };

    $scope.filter.paymentBank.selected = $scope.filter.paymentBank.option[0];

    $scope.filter.country.selected = $scope.filter.country.option[0];

    $scope.filter.game.selected = $scope.filter.game.option[0];

    $scope.filter.gender.selected = $scope.filter.gender.option[0];

    $scope.filter.group.selected = $scope.filter.group.option[0];

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

    $scope.game = {
        "option": [],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "status": "Unchecked All",
        "value": {
            "account": {
                "password": [],
                "username": []
            },
            "id": [],
            "name": [],
            "type": {
                "id": [],
                "name": []
            }
        }
    };

    $scope.gender = {
        "option": [
            {"name": "Gender"},
            {"name": "Male"},
            {"name": "Female"},
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

    $scope.group = {
        "option": [
            {"id": "", "name": "Group"}
        ],
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.group.selected = $scope.group.option[0];

    $scope.id = {
        "value": ""
    };

    $scope.identity = {
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

    $scope.paymentBankAccountName = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.paymentBankAccountNumber = {
        "response": {
            "class": "",
            "value": "",
            "view": false
        },
        "value": ""
    };

    $scope.paymentBankAccountValid = {
        "bank": false,
        "bankAccountName": false,
        "bankAccountNumber": false
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

    $scope.province = {
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

    $scope.type = {
        "option": [
            {"name": "Member"},
            {"name": "Referral"},
            {"name": "Affiliate"}
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
        "bbmPin": false,
        "city": false,
        "confirmPassword": false,
        "country": false,
        "emailAddress": false,
        "file": false,
        "firstName": false,
        "game": false,
        "gender": false,
        "group": false,
        "identity": false,
        "language": false,
        "lastName": false,
        "lineId": false,
        "listPaymentBankAccount": false,
        "middleName": false,
        "password": false,
        "phoneNumber": false,
        "province": false,
        "status": false,
        "streetAddress": false,
        "type": false,
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


    $scope.checkBbmPin = function () {

        if ($scope.bbmPin.value != "") {

            if (!$scope.bbmPin.value.match(/^[0-9a-fA-F]+$/) || $scope.bbmPin.value.length != 8) {

                $scope.bbmPin.response.value = "Please enter valid BBM PIN";
                $scope.bbmPin.response.class = "error";
                $scope.bbmPin.response.view = true;
                $scope.valid.bbmPin = false;

            } else {

                $scope.bbmPin.response.view = false;
                $scope.valid.bbmPin = true;

            }

        } else {

            $scope.bbmPin.response.view = false;
            $scope.valid.bbmPin = true;

        }

        $scope.bbmPin.value = $scope.bbmPin.value.trim();

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

            $scope.country.response.value = "Please select member country";
            $scope.country.response.class = "error";
            $scope.country.response.view = true;
            $scope.valid.country = false;

        } else {

            $scope.country.response.view = false;
            $scope.valid.country = true;

        }

    }


    $scope.checkData = function () {

        $scope.checkBbmPin();

        $scope.checkCity();

        $scope.checkConfirmPassword();

        $scope.checkCountry();

        $scope.checkEmailAddress();

        $scope.checkFile();

        $scope.checkFirstName();

        $scope.checkGame();

        $scope.checkGender();

        $scope.checkGroup();

        $scope.checkIdentity();

        $scope.checkLanguage();

        $scope.checkLastName();

        $scope.checkLineId();

        $scope.checkListPaymentBankAccount();

        $scope.checkMiddleName();

        $scope.checkPassword();

        $scope.checkPhoneNumber();

        $scope.checkProvince();

        $scope.checkStatus();

        $scope.checkStreetAddress();

        $scope.checkType();

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


    $scope.checkGame = function () {

        if ($scope.game.value.length > 0) {

            if ($scope.game.value.length == 0) {

                $scope.game.response.value = "Please select at least 1 member game";
                $scope.game.response.class = "error";
                $scope.game.response.view = true;
                $scope.valid.game = false;

            } else {

                $scope.game.response.view = false;
                $scope.valid.game = true;

            }

        } else {

            $scope.game.response.view = false;
            $scope.valid.game = true;

        }

    }


    $scope.checkGender = function () {

        if ($scope.gender.selected.name == "Gender") {

            $scope.gender.response.value = "Please select member gender";
            $scope.gender.response.class = "error";
            $scope.gender.response.view = true;
            $scope.valid.gender = false;

        } else {

            $scope.gender.response.view = false;
            $scope.valid.gender = true;

        }

    }


    $scope.checkGroup = function () {

        if ($scope.group.selected.id == "") {

            $scope.group.response.value = "Please select member group";
            $scope.group.response.class = "error";
            $scope.group.response.view = true;
            $scope.valid.group = false;

        } else {

            $scope.group.response.view = false;
            $scope.valid.group = true;

        }

    }


    $scope.checkIdentity = function () {

        if ($scope.identity.value != "") {

            if ($scope.identity.value.length > 255) {

                $scope.identity.response.value = "Please enter maximum 255 characters";
                $scope.identity.response.class = "error";
                $scope.identity.response.view = true;
                $scope.valid.identity = false;

            } else {

                $scope.identity.response.view = false;
                $scope.valid.identity = true;

            }

        } else {

            $scope.identity.response.view = false;
            $scope.valid.identity = true;

        }

    }


    $scope.checkLanguage = function () {

        if ($scope.language.selected.name == "Language") {

            $scope.language.response.value = "Please select member language";
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


    $scope.checkListPaymentBankAccount = function () {

        if ($scope.listPaymentBankAccount.value.account.id.length > 0) {

            if ($scope.listPaymentBankAccount.value.account.id.length == 0) {

                $scope.listPaymentBankAccount.response.value = "Please insert at least 1 member bank account";
                $scope.listPaymentBankAccount.response.class = "error";
                $scope.listPaymentBankAccount.response.view = true;
                $scope.valid.listPaymentBankAccount = false;

            } else {

                $scope.listPaymentBankAccount.response.view = false;
                $scope.valid.listPaymentBankAccount = true;

            }

        } else {

            $scope.listPaymentBankAccount.response.view = false;
            $scope.valid.listPaymentBankAccount = true;

        }

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


    $scope.checkPaymentBank = function () {

        if ($scope.paymentBank.selected.id == "") {

            $scope.paymentBank.response.value = "Please select member bank";
            $scope.paymentBank.response.class = "error";
            $scope.paymentBank.response.view = true;
            $scope.paymentBankAccountValid.bank = false;

        } else {

            $scope.paymentBank.response.view = false;
            $scope.paymentBankAccountValid.bank = true;

        }

    }


    $scope.checkPaymentBankAccountData = function () {

        $scope.checkPaymentBank();

        $scope.checkPaymentBankAccountName();

        $scope.checkPaymentBankAccountNumber();

    }


    $scope.checkPaymentBankAccountName = function () {

        if ($scope.paymentBankAccountName.value.length < 2 || $scope.paymentBankAccountName.value.length > 20) {

            $scope.paymentBankAccountName.response.value = "Please enter between 2 - 20 characters";
            $scope.paymentBankAccountName.response.class = "error";
            $scope.paymentBankAccountName.response.view = true;
            $scope.paymentBankAccountValid.bankAccountName = false;

        } else {

            $scope.paymentBankAccountName.response.view = false;
            $scope.paymentBankAccountValid.bankAccountName = true;

        }

        $scope.paymentBankAccountName.value = $scope.paymentBankAccountName.value.trim();

    }


    $scope.checkPaymentBankAccountNumber = function () {

        if (!/[0-9]/.test($scope.paymentBankAccountNumber.value) || $scope.paymentBankAccountNumber.value.length < 10 || $scope.paymentBankAccountNumber.value.length > 16) {

            $scope.paymentBankAccountNumber.response.value = "Please enter between 10 - 16 numbers";
            $scope.paymentBankAccountNumber.response.class = "error";
            $scope.paymentBankAccountNumber.response.view = true;
            $scope.paymentBankAccountValid.bankAccountNumber = false;

        } else {

            $scope.paymentBankAccountNumber.response.view = false;
            $scope.paymentBankAccountValid.bankAccountNumber = true;

        }

        $scope.paymentBankAccountNumber.value = $scope.paymentBankAccountNumber.value.trim();

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


    $scope.checkStatus = function () {

        if ($scope.status.selected.name == "Status") {

            $scope.status.response.value = "Please select member status";
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

            $scope.type.response.value = "Please select at least 1 member type";
            $scope.type.response.class = "error";
            $scope.type.response.view = true;
            $scope.valid.type = false;

        } else {

            $scope.type.response.view = false;
            $scope.valid.type = true;

        }

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

            if (!$scope.zipCode.value.match(/^[0-9]+$/) || $scope.zipCode.value.length != 5) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/member/delete"
        };
        member.rest(rest, function (response) {

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

        $scope.listPaymentBankAccount.value.id.splice(index, 1);
        $scope.listPaymentBankAccount.value.name.splice(index, 1);
        $scope.listPaymentBankAccount.value.account.id.splice(index, 1);
        $scope.listPaymentBankAccount.value.account.name.splice(index, 1);
        $scope.listPaymentBankAccount.value.account.number.splice(index, 1);

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
                        "bbm_pin": $scope.bbmPin.value,
                        "email_address": $scope.emailAddress.value,
                        "line_id": $scope.lineId.value,
                        "phone_number": input.phoneNumber,
                        "wechat_id": $scope.wechatId.value,
                        "whatsapp_number": input.whatsappNumber
                    },
                    "country": $scope.country.selected.name,
                    "file": $scope.file.value,
                    "game": $scope.game.value,
                    "gender": $scope.gender.selected.name,
                    "group": {
                        "id": $scope.group.selected.id,
                        "name": $scope.group.selected.name
                    },
                    "id": $scope.id.value,
                    "identity": $scope.identity.value,
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
                    "payment": {
                        "bank": $scope.listPaymentBankAccount.value,
                        "method": "Bank Account Transfer"
                    },
                    "province": $scope.province.value,
                    "status": $scope.status.selected.name,
                    "street_address": $scope.streetAddress.value,
                    "type": $scope.type.value,
                    "username": $scope.username.value,
                    "zip_code": $scope.zipCode.value
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/member/update"
            };
            member.rest(rest, function (response) {

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
            "game.id": ["equal", $scope.filter.game.selected.id],
            "game.account.username": ["equal", $scope.filter.gameUsername.value],
            "gender": ["equal", ""],
            "group.id": ["equal", $scope.filter.group.selected.id],
            "name.first": ["like", $scope.filter.firstName.value],
            "name.last": ["like", $scope.filter.lastName.value],
            "name.middle": ["like", $scope.filter.middleName.value],
            "payment.bank.account.name": ["equal", $scope.filter.paymentBankAccountName.value],
            "payment.bank.account.number": ["equal", $scope.filter.paymentBankAccountNumber.value],
            "payment.bank.id": ["equal", $scope.filter.paymentBank.selected.id],
            "status": ["equal", ""],
            "type": ["equal", ""],
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

        if ($scope.filter.type.selected.name != "Type") {

            data["type"][1] = $scope.filter.type.selected.name;

        }

        var rest = {
            "data": data,
            "url": document.getElementById("config").getAttribute("data-base-url") + "/member/filter-pagination"
        };
        member.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/member/";

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

        document.getElementsByClassName("member-file")[0].click();

    }


    $scope.forceUploadIdentity = function () {

        document.getElementsByClassName("member-identity")[0].click();

    }


    $scope.gameToggleCheckbox = function (game, selected) {

        var index = selected.id.indexOf(game.id);

        if (index > -1) {

            selected.account.password.splice(index, 1);
            selected.account.username.splice(index, 1);
            selected.id.splice(index, 1);
            selected.name.splice(index, 1);
            selected.type.id.splice(index, 1);
            selected.type.name.splice(index, 1);

        } else {

            selected.account.password.push(game.account.password);
            selected.account.username.push(game.account.username);
            selected.id.push(game.id);
            selected.type.id.push(game.type.id);
            selected.type.name.push(game.type.name);

        }

        if ($scope.game.value.id.length == 0) {

            $scope.game.status = "Unchecked All";

        } else if ($scope.game.value.id.length > 0 && $scope.game.value.id.length < $scope.game.option.length) {

            $scope.game.status = "Checked In Part";

        } else if ($scope.game.value.id.length == $scope.game.option.length) {

            $scope.game.status = "Checked All";

        }

    }


    $scope.gameToggleAllCheckbox = function () {

        if ($scope.game.value.id.length == $scope.game.option.length) {

            $scope.game.value = {
                "account": {
                    "password": [],
                    "username": []
                },
                "id": [],
                "name": [],
                "type": {
                    "id": [],
                    "name": []
                }
            };
            $scope.game.status = "Unchecked All";

        } else if ($scope.game.value.id.length >= 0) {

            $scope.game.value = {
                "account": {
                    "password": [],
                    "username": []
                },
                "id": [],
                "name": [],
                "type": {
                    "id": [],
                    "name": []
                }
            };

            angular.forEach($scope.game.option, function (value, key) {

                $scope.game.value.account.password.push(value.account.password);
                $scope.game.value.account.username.push(value.account.username);
                $scope.game.value.id.push(value.id);
                $scope.game.value.type.id.push(value.type.id);
                $scope.game.value.type.name.push(value.type.name);

            });

            $scope.game.status = "Checked All";

        }

    }


    $scope.goToPage = function (event) {

        if (event.which == 13) {

            $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/member/page-" + $scope.site.page;

        }

        event.preventDefault();

    }


    $scope.initializeData = function (id) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "id": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/member/initialize-data"
        }
        member.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("data")) {

                    $scope.bbmPin.value = response.data.contact.bbm_pin;
                    $scope.city.value = response.data.city;
                    $scope.confirmPassword.value = library.rsaEncryption.decrypt(response.data.password);

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
                    $scope.game.value = response.data.game;
                    $scope.id.value = response.data._id;

                    if (response.data.identity != "") {

                        $scope.identity.upload.file = response.data.identity;
                        $scope.identity.upload.result = true;
                        $scope.identity.value = response.data.identity;

                    }

                    $scope.lastName.value = response.data.name.last;
                    $scope.lineId.value = response.data.contact.line_id;
                    $scope.middleName.value = response.data.name.middle;

                    var modifiedTimestamp = new Date(response.data.modified.timestamp);
                    $scope.modifiedDate.value = modifiedTimestamp.getFullYear() + "-" + ("0" + (modifiedTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + modifiedTimestamp.getDate()).slice(-2) + " " + ("0" + modifiedTimestamp.getHours()).slice(-2) + ":" + ("0" + modifiedTimestamp.getMinutes()).slice(-2) + ":" + ("0" + modifiedTimestamp.getSeconds()).slice(-2);
                    $scope.modifiedDate.view = true;

                    $scope.password.value = library.rsaEncryption.decrypt(response.data.password);
                    $scope.phoneNumber.value = response.data.contact.phone_number.slice(3);
                    $scope.province.value = response.data.province;
                    $scope.streetAddress.value = response.data.street_address;
                    $scope.type.value = response.data.type;
                    $scope.username.value = response.data.username;
                    $scope.wechatId.value = response.data.contact.wechat_id;
                    $scope.whatsappNumber.value = response.data.contact.whatsapp_number.slice(3);
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

                    angular.forEach($scope.language.option, function (value, key) {

                        if (value.name == response.data.language) {

                            $scope.language.selected = $scope.language.option[key];

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

                    angular.forEach($scope.whatsappNumber.countryCode.option, function (value, key) {

                        if (value.number == response.data.contact.whatsapp_number.slice(0, 3)) {

                            $scope.whatsappNumber.countryCode.selected = $scope.whatsappNumber.countryCode.option[key];

                            return false;

                        }

                    });

                    for (var i = 0; i < response.data.payment.bank.account.id.length; i++) {

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

                angular.forEach(response.game, function (value, key) {

                    $scope.game.option.push({
                        "account": {
                            "password": "",
                            "username": ""
                        },
                        "id": value._id,
                        "name": value.name,
                        "type": {
                            "id": value.type.id,
                            "name": value.type.name
                        }
                    });

                    if (response.hasOwnProperty("data")) {

                        for (var i = 0; i < response.data.game.id.length; i++) {

                            if (value._id == response.data.game.id[i]) {

                                $scope.game.option[key].account.username = response.data.game.account.username[i];

                                return false;

                            }

                        }

                    }

                });

                angular.forEach(response.group, function (value, key) {

                    $scope.group.option.push({
                        "id": value._id,
                        "name": value.name
                    });

                    if (response.hasOwnProperty("data")) {

                        if (value._id == response.data.group.id) {

                            $scope.group.selected = $scope.group.option[key + 1];

                        }

                    }

                });

                if ($scope.game.value.id.length == 0) {

                    $scope.game.status = "Unchecked All";

                } else if ($scope.game.value.id.length > 0 && $scope.game.value.id.length < $scope.game.option.length) {

                    $scope.game.status = "Checked In Part";

                } else if ($scope.game.value.id.length == $scope.game.option.length) {

                    $scope.game.status = "Checked All";

                }

                if ($scope.type.value.length == 0) {

                    $scope.type.status = "Unchecked All";

                } else if ($scope.type.value.length > 0 && $scope.type.value.length < $scope.type.option.length) {

                    $scope.type.status = "Checked In Part";

                } else if ($scope.type.value.length == $scope.type.option.length) {

                    $scope.type.status = "Checked All";

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/member/initialize-pagination"
        };
        member.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("filter")) {

                    $scope.filter.id.value = response.filter._id[1];
                    $scope.filter.firstName.value = response.filter.name_first[1];
                    $scope.filter.gameUsername.value = response.filter.game_account_username[1];
                    $scope.filter.lastName.value = response.filter.name_last[1];
                    $scope.filter.middleName.value = response.filter.name_middle[1];
                    $scope.filter.paymentBankAccountName.value = response.filter.payment_bank_account_name[1];
                    $scope.filter.paymentBankAccountNumber.value = response.filter.payment_bank_account_number[1];
                    $scope.filter.username.value = response.filter.username[1];

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

                angular.forEach(response.bank, function (value, key) {

                    $scope.filter.paymentBank.option.push({
                        "id": value._id,
                        "name": value.name
                    });

                    if (response.hasOwnProperty("filter")) {

                        if (value._id == response.filter.payment_bank_id[1]) {

                            $scope.filter.paymentBank.selected = $scope.filter.paymentBank.option[key + 1];

                        }

                    }

                });

                angular.forEach(response.game, function (value, key) {

                    $scope.filter.game.option.push({
                        "id": value._id,
                        "name": " - " + value.name,
                        "type": {
                            "id": value.type.id,
                            "name": value.type.name
                        }
                    });

                    if (response.hasOwnProperty("filter")) {

                        if (value._id == response.filter.game_id[1]) {

                            $scope.filter.game.selected = $scope.filter.game.option[key + 1];

                        }

                    }

                });

                angular.forEach(response.group, function (value, key) {

                    $scope.filter.group.option.push({
                        "id": value._id,
                        "name": value.name
                    });

                    if (response.hasOwnProperty("filter")) {

                        if (value._id == response.filter.group_id[1]) {

                            $scope.filter.group.selected = $scope.filter.group.option[key + 1];

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

            var input = $scope.initializeInput();

            var rest = {
                "data": {
                    "city": $scope.city.value,
                    "contact": {
                        "bbm_pin": $scope.bbmPin.value,
                        "email_address": $scope.emailAddress.value,
                        "line_id": $scope.lineId.value,
                        "phone_number": input.phoneNumber,
                        "wechat_id": $scope.wechatId.value,
                        "whatsapp_number": input.whatsappNumber
                    },
                    "country": $scope.country.selected.name,
                    "file": $scope.file.value,
                    "game": $scope.game.value,
                    "gender": $scope.gender.selected.name,
                    "group": {
                        "id": $scope.group.selected.id,
                        "name": $scope.group.selected.name
                    },
                    "identity": $scope.identity.value,
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
                    "payment": {
                        "bank": $scope.listPaymentBankAccount.value,
                        "method": "Bank Account Transfer"
                    },
                    "province": $scope.province.value,
                    "status": $scope.status.selected.name,
                    "street_address": $scope.streetAddress.value,
                    "type": $scope.type.value,
                    "username": $scope.username.value,
                    "zip_code": $scope.zipCode.value
                },
                "url": document.getElementById("config").getAttribute("data-base-url") + "/member/insert"
            };
            member.rest(rest, function (response) {

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

                if ($scope.listPaymentBankAccount.value.id[i] == $scope.bank.selected.id && $scope.listPaymentBankAccount.value.account.name[i] == $scope.paymentBankAccountName.value && $scope.listPaymentBankAccount.value.account.number[i] == $scope.paymentBankAccountNumber.value) {

                    $scope.listPaymentBankAccount.response.value = "Bank account already exist";
                    $scope.listPaymentBankAccount.response.class = "error";
                    $scope.listPaymentBankAccount.response.view = true;

                    valid = false;

                    break;

                }

            }

            if (valid) {

                var rest = {
                    "data": {
                        "bankId": $scope.paymentBank.selected.id,
                        "name": $scope.paymentBankAccountName.value,
                        "number": $scope.paymentBankAccountNumber.value
                    },
                    "url": document.getElementById("config").getAttribute("data-base-url") + "/member/check-bank-account"
                };
                member.rest(rest, function (response) {

                    if (response.result) {

                        $scope.listPaymentBankAccount.value.account.id.push(response.id);
                        $scope.listPaymentBankAccount.value.account.name.push($scope.paymentBankAccountName.value);
                        $scope.listPaymentBankAccount.value.account.number.push($scope.paymentBankAccountNumber.value);
                        $scope.listPaymentBankAccount.value.id.push($scope.paymentBank.selected.id);
                        $scope.listPaymentBankAccount.value.name.push($scope.paymentBank.selected.name);

                        if (!$scope.listPaymentBankAccount.view) {

                            $scope.listPaymentBankAccount.view = true;

                        }

                        $scope.paymentBank.selected = $scope.paymentBank.option[0];
                        $scope.paymentBankAccountName.value = "";
                        $scope.paymentBankAccountNumber.value = "";
                        $scope.listPaymentBankAccount.response.view = false;

                    } else {

                        $scope.listPaymentBankAccount.response.value = "Bank account already exist";
                        $scope.listPaymentBankAccount.response.class = "error";
                        $scope.listPaymentBankAccount.response.view = true;

                    }

                });

            }

        }

        $scope.loading.view = false;

        event.preventDefault();

    }


    $scope.loadDetail = function (id) {

        $scope.loading.view = true;

        var rest = {
            "data": {
                "id": id
            },
            "url": document.getElementById("config").getAttribute("data-base-url") + "/member/initialize-data"
        };
        member.rest(rest, function (response) {

            if (response.result) {

                if (response.hasOwnProperty("data")) {

                    $scope.bbmPin.value = response.data.contact.bbm_pin;
                    $scope.city.value = response.data.city;
                    $scope.country.value = response.data.country;

                    var createdTimestamp = new Date(response.data.created.timestamp);
                    $scope.createdDate.value = createdTimestamp.getFullYear() + "-" + ("0" + (createdTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + createdTimestamp.getDate()).slice(-2) + " " + ("0" + createdTimestamp.getHours()).slice(-2) + ":" + ("0" + createdTimestamp.getMinutes()).slice(-2) + ":" + ("0" + createdTimestamp.getSeconds()).slice(-2);

                    $scope.emailAddress.value = response.data.contact.email_address;

                    if (response.data.file != "") {

                        $scope.file.upload.file = response.data.file;
                        $scope.file.upload.result = true;
                        $scope.file.value = document.getElementById("config").getAttribute("data-image-url") + "/member/" + response.data.file;

                    }

                    $scope.firstName.value = response.data.name.first;
                    $scope.game.value = response.data.game;
                    $scope.gender.value = response.data.gender;
                    $scope.group.value = response.data.group.name;
                    $scope.id.value = response.data._id;
                    $scope.language.value = response.data.language;
                    $scope.lastName.value = response.data.name.last;
                    $scope.lineId.value = response.data.contact.line_id;
                    $scope.middleName.value = response.data.name.middle;

                    var modifiedTimestamp = new Date(response.data.modified.timestamp);
                    $scope.modifiedDate.value = modifiedTimestamp.getFullYear() + "-" + ("0" + (modifiedTimestamp.getMonth() + 1)).slice(-2) + "-" + ("0" + modifiedTimestamp.getDate()).slice(-2) + " " + ("0" + modifiedTimestamp.getHours()).slice(-2) + ":" + ("0" + modifiedTimestamp.getMinutes()).slice(-2) + ":" + ("0" + modifiedTimestamp.getSeconds()).slice(-2);

                    $scope.password.value = library.rsaEncryption.decrypt(response.data.password);
                    $scope.phoneNumber.value = response.data.contact.phone_number;
                    $scope.province.value = response.data.province;
                    $scope.status.value = response.data.status;
                    $scope.streetAddress.value = response.data.street_address;
                    $scope.type.value = response.data.type;
                    $scope.username.value = response.data.username;
                    $scope.wechatId.value = response.data.contact.wechat_id;
                    $scope.whatsappNumber.value = response.data.contact.whatsapp_number;
                    $scope.zipCode.value = response.data.zip_code;

                    angular.forEach(response.game, function (value, key) {

                        $scope.game.option.push({
                            "account": {
                                "password": "",
                                "username": ""
                            },
                            "id": value._id,
                            "name": value.name,
                            "type": {
                                "id": value.type.id,
                                "name": value.type.name
                            }
                        });

                        if (response.hasOwnProperty("data")) {

                            for (var i = 0; i < response.data.game.id.length; i++) {

                                if (value._id == response.data.game.id[i]) {

                                    $scope.game.option[key].account.username = response.data.game.account.username[i];

                                    return false;

                                }

                            }

                        }

                    });

                    for (var i = 0; i < response.data.payment.bank.account.id.length; i++) {

                        $scope.listPaymentBankAccount.value.account.id.push(response.data.payment.bank.account.id[i]);
                        $scope.listPaymentBankAccount.value.account.name.push(response.data.payment.bank.account.name[i]);
                        $scope.listPaymentBankAccount.value.account.number.push(response.data.payment.bank.account.number[i]);
                        $scope.listPaymentBankAccount.value.id.push(response.data.payment.bank.id[i]);
                        $scope.listPaymentBankAccount.value.name.push(response.data.payment.bank.name[i]);

                    }

                    if ($scope.listPaymentBankAccount.value.length > 0) {

                        $scope.listPaymentBankAccount.view = true;

                    }

                    if ($scope.game.value.id.length == 0) {

                        $scope.game.status = "Unchecked All";

                    } else if ($scope.game.value.id.length > 0 && $scope.game.value.id.length < $scope.game.option.length) {

                        $scope.game.status = "Checked In Part";

                    } else if ($scope.game.value.id.length == $scope.game.option.length) {

                        $scope.game.status = "Checked All";

                    }

                    if ($scope.type.value.length == 0) {

                        $scope.type.status = "Unchecked All";

                    } else if ($scope.type.value.length > 0 && $scope.type.value.length < $scope.type.option.length) {

                        $scope.type.status = "Checked In Part";

                    } else if ($scope.type.value.length == $scope.type.option.length) {

                        $scope.type.status = "Checked All";

                    }

                }

                $scope.popup.view = true;
                $scope.popup.member = true;

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/member/remove-filter-pagination"
        };
        member.rest(rest, function (response) {

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
            "url": document.getElementById("config").getAttribute("data-base-url") + "/member/set-pagination"
        };
        member.rest(rest, function (response) {

            if (response.result) {

                $window.location.href = document.getElementById("config").getAttribute("data-base-url") + "/member/";

            } else {

                $scope.response.class = "error";
                $scope.response.message = response.response;
                $scope.response.view = true;

            }

            $scope.hideResponse();

        });

        event.preventDefault();

    }


    $scope.typeCheckbox = function (type, selected) {

        if (selected.indexOf(type.name) > -1) {

            return true;

        }

        return false;

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

        angular.forEach($scope.files, function (value, key) {

            formData.append("file", value);

        });

        var rest = {
            "data": formData,
            "url": document.getElementById("config").getAttribute("data-base-url") + "/member/upload-file"
        };
        member.restMultipart(rest, function (response) {

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


    $scope.uploadIdentity = function () {

        $scope.loading.view = true;

        var formData = new FormData();

        angular.forEach($scope.files, function (value, key) {

            formData.append("file", value);

        });

        var rest = {
            "data": formData,
            "url": document.getElementById("config").getAttribute("data-base-url") + "/member/upload-identity"
        };
        member.restMultipart(rest, function (response) {

            if (response.result) {

                $scope.response.class = "success";
                $scope.identity.value = response.file[0];
                $scope.identity.upload.file = response.file[0];
                $scope.identity.upload.result = true;

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


app.provider("member", function () {


    this.$get = ["$http", function ($http) {


        var member = {};


        member.rest = function (rest, callback) {

            $http({
                "data": rest.data,
                "headers": {"Content-Type": "application/json"},
                "method": "POST",
                "url": rest.url
            }).then(function (response) {

                callback(response.data);

            });

        }


        member.restMultipart = function (rest, callback) {

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


        return member;


    }];


});


app.directive("identityInput", function ($parse) {


    var identityInput = {};


    identityInput.link = function ($scope, element, attrs) {

        element.on("change", function (event) {

            $parse(attrs.identityInput).assign($scope, element[0].files);
            $scope.$digest();

            $scope.uploadIdentity();

        })

    }


    return identityInput;


});


app.directive("memberDetail", function () {


    var member = {};


    member.templateUrl = document.getElementById("config").getAttribute("data-base-url") + "/resource/html/member-detail-popup.html";


    return member;


});


app.directive("memberFilePreview", function () {


    var member = {};


    member.template = "<img class=\"responsive\" ng-src=\"" + document.getElementById("config").getAttribute("data-image-url") + "/member/{{file.upload.file}}\" />";


    return member;


});


app.directive("memberIdentityPreview", function () {


    var member = {};


    member.template = "<img class=\"responsive\" ng-src=\"" + document.getElementById("config").getAttribute("data-image-url") + "/member/identity/{{identity.upload.file}}\" />";


    return member;


});
