<%@ include file="head.jsp" %>
<%@ include file="header.jsp" %>
<div id="content" ng-controller="administrator">
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
                <p><a href="${url.base}/administrator/">Administrator</a><i
                        class="next-white square-10 margin-left-5"></i></p>
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
                        <p><span class="required">* </span>Username</p>
                    </div>
                    <div class="data">
                        <input name="administrator-username" type="text" placeholder="Username"
                               ng-keyup="checkUsername()" ng-model="username.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="username.response.view" ng-class="username.response.class">
                            {{username.response.value}}</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="title">
                        <p><span class="required">* </span>Password</p>
                    </div>
                    <div class="data">
                        <input name="administrator-password" type="password" placeholder="Password"
                               ng-keyup="checkPassword()" ng-model="password.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="password.response.view" ng-class="password.response.class">
                            {{password.response.value}}</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="title">
                        <p><span class="required">* </span>Confirm Password</p>
                    </div>
                    <div class="data">
                        <input name="administrator-confirm-password" type="password" placeholder="Confirm Password"
                               ng-keyup="checkConfirmPassword()" ng-model="confirmPassword.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="confirmPassword.response.view" ng-class="confirmPassword.response.class">
                            {{confirmPassword.response.value}}</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="title">
                        <p><span class="required">* </span>Role</p>
                    </div>
                    <div class="data">
                        <md-input-container>
                            <md-select ng-change="checkRole(); loadPrivilegeCheckbox()" ng-model="role.selected"
                                       placeholder="Role">
                                <md-option ng-repeat="option in role.option" ng-value="option">
                                    {{option.name}}
                                </md-option>
                            </md-select>
                        </md-input-container>
                    </div>
                    <div class="response">
                        <p ng-show="role.response.view" ng-class="role.response.class">{{role.response.value}}</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="title">
                        <p><span class="required">* </span>First Name</p>
                    </div>
                    <div class="data">
                        <input name="administrator-first-name" type="text" placeholder="First Name"
                               ng-keyup="checkFirstName()" ng-model="firstName.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="firstName.response.view" ng-class="firstName.response.class">
                            {{firstName.response.value}}</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Middle Name</p>
                    </div>
                    <div class="data">
                        <input name="administrator-middle-name" type="text" placeholder="Middle Name"
                               ng-keyup="checkMiddleName()" ng-model="middleName.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="middleName.response.view" ng-class="middleName.response.class">
                            {{middleName.response.value}}</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Last Name</p>
                    </div>
                    <div class="data">
                        <input name="administrator-last-name" type="text" placeholder="Last Name"
                               ng-keyup="checkLastName()" ng-model="lastName.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="lastName.response.view" ng-class="lastName.response.class">
                            {{lastName.response.value}}</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="title">
                        <p><span class="required">* </span>Gender</p>
                    </div>
                    <div class="data select">
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
                        <div class="clearfix"></div>
                    </div>
                    <div class="title file">
                        <p><span class="required"></span>File</p>
                    </div>
                    <div class="data">
                        <input class="administrator-file" name="administrator-file" type="file" file-input="files"/>
                        <div class="file-list" ng-show="file.upload.result">
                            <administrator-file-preview></administrator-file-preview>
                        </div>
                        <div class="upload-file" ng-click="forceUpload()"><i
                                class="cloud-white square-15 margin-right-5"></i>Upload
                        </div>
                    </div>
                    <div class="response">
                        <p ng-show="file.response.view" ng-class="file.response.class">{{file.response.value}}</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="title">
                        <p><span class="required">* </span>Language</p>
                    </div>
                    <div class="data select">
                        <md-input-container>
                            <md-select ng-change="checkLanguage()" ng-model="language.selected" placeholder="Language">
                                <md-option ng-repeat="option in language.option" ng-value="option">
                                    {{option.name}}
                                </md-option>
                            </md-select>
                        </md-input-container>
                    </div>
                    <div class="response">
                        <p ng-show="language.response.view" ng-class="language.response.class">
                            {{language.response.value}}</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Street Address</p>
                    </div>
                    <div class="data">
                        <input name="administrator-street-address" type="text" placeholder="Street Address"
                               ng-keyup="checkStreetAddress()" ng-model="streetAddress.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="streetAddress.response.view" ng-class="streetAddress.response.class">
                            {{streetAddress.response.value}}</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>City</p>
                    </div>
                    <div class="data">
                        <input name="administrator-city" type="text" placeholder="City" ng-keyup="checkCity()"
                               ng-model="city.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="city.response.view" ng-class="city.response.class">{{city.response.value}}</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Province</p>
                    </div>
                    <div class="data">
                        <input name="administrator-province" type="text" placeholder="Province"
                               ng-keyup="checkProvince()" ng-model="province.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="province.response.view" ng-class="province.response.class">
                            {{province.response.value}}</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>ZIP code</p>
                    </div>
                    <div class="data">
                        <input name="administrator-zip-code" type="text" placeholder="ZIP Code"
                               ng-keyup="checkZipCode()" ng-model="zipCode.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="zipCode.response.view" ng-class="zipCode.response.class">
                            {{zipCode.response.value}}</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="title">
                        <p><span class="required">* </span>Country</p>
                    </div>
                    <div class="data select">
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
                        <div class="clearfix"></div>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Phone Number</p>
                    </div>
                    <div class="data select">
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
                            <input name="administrator-phone-number" type="text" placeholder="Phone Number"
                                   ng-keyup="checkPhoneNumber()" ng-model="phoneNumber.value"/>
                        </div>
                    </div>
                    <div class="response">
                        <p ng-show="phoneNumber.response.view" ng-class="phoneNumber.response.class">
                            {{phoneNumber.response.value}}</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Email Address</p>
                    </div>
                    <div class="data">
                        <input name="administrator-email-address" type="text" placeholder="Email Address"
                               ng-keyup="checkEmailAddress()" ng-model="emailAddress.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="emailAddress.response.view" ng-class="emailAddress.response.class">
                            {{emailAddress.response.value}}</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Whatsapp Number</p>
                    </div>
                    <div class="data select">
                        <div class="country-code">
                            <md-input-container>
                                <md-select ng-model="whatsappNumber.countryCode.selected" placeholder="Country Code">
                                    <md-option ng-repeat="option in whatsappNumber.countryCode.option"
                                               ng-value="option">
                                        {{option.number}}
                                    </md-option>
                                </md-select>
                            </md-input-container>
                        </div>
                        <div class="number">
                            <input name="administrator-whatsapp-number" type="text" placeholder="Whatsapp Number"
                                   ng-keyup="checkWhatsappNumber()" ng-model="whatsappNumber.value"/>
                        </div>
                    </div>
                    <div class="response">
                        <p ng-show="whatsappNumber.response.view" ng-class="whatsappNumber.response.class">
                            {{whatsappNumber.response.value}}</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Line ID</p>
                    </div>
                    <div class="data">
                        <input name="administrator-line-id" type="text" placeholder="Line ID" ng-keyup="checkLineId()"
                               ng-model="lineId.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="lineId.response.view" ng-class="lineId.response.class">{{lineId.response.value}}</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="title">
                        <p><span class="required"></span>Wechat ID</p>
                    </div>
                    <div class="data">
                        <input name="administrator-wechat-id" type="text" placeholder="Wechat ID"
                               ng-keyup="checkWechatId()" ng-model="wechatId.value"/>
                    </div>
                    <div class="response">
                        <p ng-show="wechatId.response.view" ng-class="wechatId.response.class">
                            {{wechatId.response.value}}</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="title">
                        <p><span class="required">* </span>Status</p>
                    </div>
                    <div class="data select">
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
                        <div class="clearfix"></div>
                    </div>
                    <div class="title" ng-show="createdDate.view">
                        <p><span class="required"></span>Created Date</p>
                    </div>
                    <div class="data" ng-show="createdDate.view">
                        <input name="administrator-created-date" type="text" placeholder="Created Date" readonly
                               ng-model="createdDate.value"/>
                    </div>
                    <div class="response" ng-show="createdDate.view"></div>
                    <div class="title" ng-show="modifiedDate.view">
                        <p><span class="required"></span>Modified Date</p>
                    </div>
                    <div class="data" ng-show="modifiedDate.view">
                        <input name="administrator-modified-date" type="text" placeholder="Modified Date" readonly
                               ng-model="modifiedDate.value"/>
                    </div>
                    <div class="response" ng-show="modifiedDate.view"></div>
                </div>
                <p class="accordion-navigation" data-index="2">Privilege<span><i
                        class="plus-white square-10"></i></span></p>
                <div class="accordion-content" data-index="2">
                    <div class="data-entry">
                        <div class="title">
                            <p><span class="required"></span>All Privilege</p>
                        </div>
                        <div class="data">
                            <div class="select-all">
                                <md-checkbox aria-label="Select All" ng-checked="privilegeAll.status == 'Checked All'"
                                             md-indeterminate="privilegeAll.status == 'Checked In Part'"
                                             ng-click="privilegeAllToggleAllCheckbox(privilege)"><span
                                        ng-if="privilegeAll.status != 'Checked All'">Select All</span><span
                                        ng-if="privilegeAll.status == 'Checked All'">Unselect All</span></md-checkbox>
                            </div>
                            <div class="checkbox" ng-repeat="privilegeAllOption in privilegeAll.option">
                                <md-checkbox ng-checked="privilegeAllOption.status == 'Checked All'"
                                             md-indeterminate="privilegeAllOption.status == 'Checked In Part'"
                                             ng-click="privilegeAllToggleCheckbox(privilegeAllOption, privilegeAll.value)">
                                    {{privilegeAllOption.name}}
                                </md-checkbox>
                            </div>
                        </div>
                        <div class="response">
                            <p ng-show="privilegeAll.response.view" ng-class="privilegeAll.response.class">
                                {{privilegeAll.response.value}}</p>
                        </div>
                    </div>
                    <div class="data-entry" ng-repeat="privilegeItem in privilege">
                        <div class="title">
                            <p><span class="required"></span>Privilege {{privilegeItem.name}}</p>
                        </div>
                        <div class="data">
                            <div class="select-all">
                                <md-checkbox aria-label="Select All" ng-checked="privilegeItem.status == 'Checked All'"
                                             md-indeterminate="privilegeItem.status == 'Checked In Part'"
                                             ng-click="privilegeToggleAllCheckbox(privilegeItem.name, privilegeItem.value)">
                                    <span ng-if="privilegeItem.status != 'Checked All'">Select All</span><span
                                        ng-if="privilegeItem.status == 'Checked All'">Unselect All</span></md-checkbox>
                            </div>
                            <div class="checkbox" ng-repeat="privilegeItemOption in privilegeItem.option">
                                <md-checkbox ng-checked="privilegeItem.value.slice($index, ($index + 1)) == '7'"
                                             ng-click="privilegeToggleCheckbox(privilegeItem.name, privilegeItemOption, privilegeItem.value)">
                                    {{privilegeItemOption.name}}
                                </md-checkbox>
                            </div>
                        </div>
                        <div class="response">
                            <p ng-show="privilegeItem.response.view" ng-class="privilegeItem.response.class">
                                {{privilegeItem.response.value}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="button">
                <c:choose>
                    <c:when test="${!empty entry._id}">
                        <button class="edit" name="administrator-edit" ng-click="edit($event)"><i
                                class="pencil-white square-15 margin-right-5"></i>Edit
                        </button>
                    </c:when>
                    <c:otherwise>
                        <button class="add" name="administrator-insert" ng-click="insert($event)"><i
                                class="plus-white square-15 margin-right-5"></i>Add
                        </button>
                    </c:otherwise>
                </c:choose>
            </div>
        </form>
    </div>
</div>
<%@ include file="footer.jsp" %>
