var adminurl = "http://localhost:8090/api/";
// var adminurl = "http://104.155.238.145/api/";
var imgurl = adminurl + "upload/";

var imgpath = imgurl + "readFile";
var uploadurl = imgurl;
var openTab = adminurl + "user/showUser?user=";

var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function($http) {
    var navigation = [{
        name: "Dashboard",
        classis: "active",
        anchor: "dashboard",
        icon: "globe",
        subnav: []
    }, {
        name: "Country",
        classis: "active",
        anchor: "country-list",
        icon: "globe",
        subnav: []
    }, {
        name: "City",
        classis: "active",
        anchor: "city-list",
        icon: "puzzle-piece",
        subnav: []
    }, {
        name: "User",
        classis: "active",
        anchor: "user-list",
        icon: "puzzle-piece",
        subnav: []
    }];
    var membershipLevel = [{
        name: "Student",
        id: "Student"
    }, {
        name: "Licentiate",
        id: "Licentiate"
    }, {
        name: "Associate",
        id: "Associate"
    }];

    return {
        getnav: function() {
            return navigation;
        },
        makeactive: function(menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },
        login: function(data, callback) {
            $http.post(adminurl + 'admin/login', data).success(callback);
        },
        dashboardCount: function(data, callback) {
            $http.post(adminurl + 'config/dashboardCount', data).success(callback);
        },
        searchCountry: function(formData, i, callback) {
            $http.post(adminurl + 'country/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        countrySave: function(formData, callback) {
            $http.post(adminurl + 'country/saveForBackend', formData).success(callback);
        },
        getOneCountry: function(id, callback) {
            $http.post(adminurl + 'country/getOne', {
                _id: id
            }).success(callback);
        },
        countryEditSave: function(formData, callback) {
            $http.post(adminurl + 'country/editForBackend', formData).success(callback);
        },
        deleteCountry: function(id, callback) {
            $http.post(adminurl + 'country/delete', {
                _id: id
            }).success(callback);

        },
        getAllCountries: function(callback) {
            $http.post(adminurl + 'country/getAll', {}).success(callback);
        },
        searchCountryMustDo: function(formData, i, callback) {
            $http.post(adminurl + 'mustdocountry/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        countryMustDoSave: function(formData, callback) {
            $http.post(adminurl + 'mustdocountry/save', formData).success(callback);
        },
        getOneCountryMustDo: function(id, callback) {
            $http.post(adminurl + 'mustdocountry/getOne', {
                _id: id
            }).success(callback);
        },
        countryMustDoEdit: function(formData, callback) {
            $http.post(adminurl + 'mustdocountry/save', formData).success(callback);
        },
        deleteCountryMustDo: function(id, callback) {
            $http.post(adminurl + 'mustdocountry/delete', {
                _id: id
            }).success(callback);
        },
        searchCity: function(formData, i, callback) {
            $http.post(adminurl + 'city/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        citySave: function(formData, callback) {
            $http.post(adminurl + 'city/saveForBackend', formData).success(callback);
        },
        getOneCity: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'city/getOne',
                method: 'POST',
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        cityEditSave: function(formData, callback) {
            $http.post(adminurl + 'city/editForBackend', formData).success(callback);
        },
        deleteCity: function(id, callback) {
            $http.post(adminurl + 'city/delete', {
                _id: id
            }).success(callback);
        },
        searchUser: function(formData, i, callback) {
            $http.post(adminurl + 'user/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        userSave: function(formData, callback) {
            $http.post(adminurl + 'user/save', formData).success(callback);
        },
        getOneUser: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'user/getOne',
                method: 'POST',
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        userEditSave: function(formData, callback) {
            $http.post(adminurl + 'user/save', formData).success(callback);
        },
        deleteUser: function(id, callback) {
            $http.post(adminurl + 'user/delete', {
                _id: id
            }).success(callback);
        },
    };
});
