<%@ include file="head.jsp" %>
<%@ include file="header.jsp" %>
<div id="content" ng-controller="bankAccount">
    <div id="loading" ng-show="loading.view">
        <div class="wrapper">
            <div class="circle"></div>
            <div class="circle-1"></div>
        </div>
    </div>
    <div id="response" ng-if="response.view" ng-class="response.class"><p>{{response.message}}</p></div>
    <div class="wrapper">
        <div class="navigation">
            <div class="breadcrumb">
                <p><a href="${url.base}/">Home</a><i class="next-white square-10 margin-left-5"></i></p>
                <p><a href="${url.base}/bank/">Bank</a><i class="next-white square-10 margin-left-5"></i></p>
                <p><a href="${url.base}/bank/account/">Account</a><i class="next-white square-10 margin-left-5"></i></p>
                <p>Entry</p>
                <div class="clearfix"></div>
            </div>
        </div>
        <form method="POST" action="" ng-init="initializeData('${entry._id}')">
            <div class="accordion">
                <p class="accordion-navigation" data-index="1">Detail<span><i class="plus-white square-10"></i></span>
                </p>
                <div class="accordion-content data-entry" data-index="1">
                    <div class="title">
                        <p><span class="required">* </span>First Name</p>
                    </div>
                    <div class="data">
                        <input name="bank-account-first-name" type="text" placeholder="First Name"
                               ng-keyup="checkFirstName()" ng-model="firstName.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="firstName.response.view" ng-class="firstName.response.class">
                            {{firstName.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Middle Name</p>
                    </div>
                    <div class="data">
                        <input name="bank-account-middle-name" type="text" placeholder="Middle Name"
                               ng-keyup="checkMiddleName()" ng-model="middleName.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="middleName.response.view" ng-class="middleName.response.class">
                            {{middleName.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Last Name</p>
                    </div>
                    <div class="data">
                        <input name="bank-account-last-name" type="text" placeholder="Last Name"
                               ng-keyup="checkLastName()" ng-model="lastName.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="lastName.response.view" ng-class="lastName.response.class">
                            {{lastName.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required">* </span>Number</p>
                    </div>
                    <div class="data">
                        <input name="bank-account-number" type="text" placeholder="Number" ng-keyup="checkNumber()"
                               ng-model="number.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="number.response.view" ng-class="number.response.class">{{number.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required">* </span>Bank</p>
                    </div>
                    <div class="data">
                        <md-input-container>
                            <md-select ng-change="checkBank()" ng-model="bank.selected" placeholder="Bank">
                                <md-option ng-repeat="option in status.option" ng-value="option">
                                    {{option.name}}
                                </md-option>
                            </md-select>
                        </md-input-container>
                    </div>
                    <div class="response">
                        <p ng-show="bank.response.view" ng-class="bank.response.class">{{bank.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required">* </span>Type</p>
                    </div>
                    <div class="data">
                        <div class="select-all">
                            <md-checkbox aria-label="Select All" ng-checked="type.status == 'Checked All'"
                                         md-indeterminate="type.status == 'Checked In Part'"
                                         ng-click="typeToggleAllCheckbox()"><span ng-if="type.status != 'Checked All'">Select All</span><span
                                    ng-if="type.status == 'Checked All'">Unselect All</span></md-checkbox>
                        </div>
                        <div class="checkbox" ng-repeat="typeOption in type.option">
                            <md-checkbox ng-checked="type.value.indexOf(typeOption.name) > -1"
                                         ng-click="typeToggleCheckbox(typeOption, type.value)">{{typeOption.name}}
                            </md-checkbox>
                        </div>
                    </div>
                    <div class="response">
                        <p ng-show="type.response.view" ng-class="type.response.class">{{type.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required">* </span>Gender</p>
                    </div>
                    <div class="data">
                        <md-input-container>
                            <md-select ng-change="checkGender()" ng-model="gender.selected" placeholder="Gender">
                                <md-option ng-repeat="option in gender.option" ng-value="option">
                                    {{option.name}}
                                </md-option>
                            </md-select>
                        </md-input-container>
                    </div>
                    <div class="response">
                        <p ng-show="gender.response.view" ng-class="gender.response.class">{{gender.response.value}}</p>
                    </div>
                    <div class="title file">
                        <p><span class="required"></span>File</p>
                    </div>
                    <div class="data">
                        <input class="bank-account-file" name="bank-account-file" type="file" file-input="files"/>
                        <div class="file-list" ng-show="file.upload.result">
                            <bank-account-file-preview></bank-account-file-preview>
                        </div>
                        <div class="upload-file" ng-click="forceUpload()"><i
                                class="cloud-white square-15 margin-right-5"></i>Upload
                        </div>
                    </div>
                    <div class="response">
                        <p ng-show="file.response.view" ng-class="file.response.class">{{file.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Street Address</p>
                    </div>
                    <div class="data">
                        <input name="bank-account-street-address" type="text" placeholder="Street Address"
                               ng-keyup="checkStreetAddress()" ng-model="streetAddress.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="streetAddress.response.view" ng-class="streetAddress.response.class">
                            {{streetAddress.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>City</p>
                    </div>
                    <div class="data">
                        <input name="bank-account-city" type="text" placeholder="City" ng-keyup="checkCity()"
                               ng-model="city.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="city.response.view" ng-class="city.response.class">{{city.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Province</p>
                    </div>
                    <div class="data">
                        <input name="bank-account-province" type="text" placeholder="Province"
                               ng-keyup="checkProvince()" ng-model="province.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="province.response.view" ng-class="province.response.class">
                            {{province.response.value}}</p>
                    </div>
                    <div class="title">
                        <p class="title"><span class="required"></span>ZIP code</p>
                    </div>
                    <div class="data">
                        <input name="bank-account-zip-code" type="text" placeholder="ZIP Code" ng-keyup="checkZipCode()"
                               ng-model="zipCode.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="zipCode.response.view" ng-class="zipCode.response.class">
                            {{zipCode.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required">* </span>Country</p>
                    </div>
                    <div class="data">
                        <md-input-container>
                            <md-select ng-change="checkCountry()" ng-model="country.selected" placeholder="Country">
                                <md-option ng-repeat="option in country.option" ng-value="option">
                                    {{option.name}}
                                </md-option>
                            </md-select>
                        </md-input-container>
                    </div>
                    <div class="response">
                        <p ng-show="country.response.view" ng-class="country.response.class">
                            {{country.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Phone Number</p>
                    </div>
                    <div class="data">
                        <div class="country-code">
                            <md-input-container>
                                <md-select ng-model="phoneNumber.countryCode.selected" placeholder="Country Code">
                                    <md-option ng-repeat="option in phoneNumber.countryCode.option" ng-value="option">
                                        {{option.number}}
                                    </md-option>
                                </md-select>
                            </md-input-container>
                        </div>
                        <div class="number">
                            <input name="bank-account-phone-number" type="text" placeholder="Phone Number"
                                   ng-keyup="checkPhoneNumber()" ng-model="phoneNumber.value"/>
                        </div>
                    </div>
                    <div class="response">
                        <p ng-show="phoneNumber.response.view" ng-class="phoneNumber.response.class">
                            {{phoneNumber.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Email Address</p>
                    </div>
                    <div class="data">
                        <input name="bank-account-email-address" type="text" placeholder="Email Address"
                               ng-keyup="checkEmailAddress()" ng-model="emailAddress.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="emailAddress.response.view" ng-class="emailAddress.response.class">
                            {{emailAddress.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Sequence</p>
                    </div>
                    <div class="data">
                        <input name="bank-account-sequence" type="text" placeholder="Sequence"
                               ng-keyup="checkSequence()" ng-model="sequence.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="sequence.response.view" ng-class="sequence.response.class">
                            {{sequence.response.value}}</p>
                    </div>
                    <div class="title">
                        <p><span class="required">* </span>Status</p>
                    </div>
                    <div class="data">
                        <md-input-container>
                            <md-select ng-change="checkStatus()" ng-model="status.selected" placeholder="Status">
                                <md-option ng-repeat="option in status.option" ng-value="option">
                                    {{option.name}}
                                </md-option>
                            </md-select>
                        </md-input-container>
                    </div>
                    <div class="response">
                        <p ng-show="status.response.view" ng-class="status.response.class">{{status.response.value}}</p>
                    </div>
                    <div class="title" ng-show="createdDate.view">
                        <p><span class="required"></span>Created Date</p>
                    </div>
                    <div class="data" ng-show="createdDate.view">
                        <input name="bank-account-created-date" type="text" placeholder="Created Date" readonly
                               ng-model="createdDate.value"/>
                    </div>
                    <div class="response" ng-show="createdDate.view"></div>
                    <div class="title" ng-show="modifiedDate.view">
                        <p><span class="required"></span>Modified Date</p>
                    </div>
                    <div class="data" ng-show="modifiedDate.view">
                        <input name="bank-account-modified-date" type="text" placeholder="Modified Date" readonly
                               ng-model="modifiedDate.value"/>
                    </div>
                    <div class="response" ng-show="modifiedDate.view"></div>
                </div>
            </div>
            <div class="button">
                <c:choose>
                    <c:when test="${!empty entry._id}">
                        <button class="edit" name="bank-account-edit" ng-click="edit($event)"><i
                                class="pencil-white square-15 margin-right-5"></i>Edit
                        </button>
                    </c:when>
                    <c:otherwise>
                        <button class="add" name="bank-account-insert" ng-click="insert($event)"><i
                                class="plus-white square-15 margin-right-5"></i>Add
                        </button>
                    </c:otherwise>
                </c:choose>
            </div>
        </form>
    </div>
</div>
<%@ include file="footer.jsp" %>
