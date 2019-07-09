package com.preloode.panel.model;

import javax.enterprise.inject.Model;

@Model
public class AdministratorFilter {


    public String _id;

    public String country;

    public String created.timestamp;
            "created.timestamp": ["between", "date", filterCreatedDate[0], filterCreatedDate[1]],
            "gender": ["equal", ""],
            "name.first": ["like", $scope.filter.firstName.value],
            "name.last": ["like", $scope.filter.lastName.value],
            "name.middle": ["like", $scope.filter.middleName.value],
            "role.id": ["equal", $scope.filter.role.selected.id],
            "status": ["equal", ""],
            "username": ["like", $scope.filter.username.value]


}
