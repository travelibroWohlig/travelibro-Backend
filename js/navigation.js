var adminurl = "http://localhost:8090/api/";
// var adminurl = "http://104.155.238.145/api/";
var imgurl = adminurl + "upload/";

var imgpath = imgurl + "readFile";
var uploadurl = imgurl;

var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function($http) {
    var navigation = [{
        name: "Country",
        classis: "active",
        anchor: "country",
        icon: "globe",
        subnav: [{
            name: "Country-List",
            classis: "active",
            anchor: "country-list",
            icon: "globe"
        }, {
            name: "Country Must-Do",
            classis: "active",
            anchor: "countryMustDo-list",
            icon: "globe"
        }]
    }, {
        name: "City-List",
        classis: "active",
        anchor: "city",
        icon: "puzzle-piece",
        subnav: [{
            name: "City-List",
            classis: "active",
            anchor: "city-list",
            icon: "puzzle-piece"
        }, {
            name: "City Must-Do",
            classis: "active",
            anchor: "cityMustDo-list",
            icon: "globe"
        }]
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
        searchCountry: function(formData, i, callback) {
            $http.post(adminurl + 'country/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        countrySave: function(formData, callback) {
            $http.post(adminurl + 'country/save', formData).success(callback);
        },
        getOneCountry: function(id, callback) {
            $http.post(adminurl + 'country/getOne', {
                _id: id
            }).success(callback);
        },
        countryEditSave: function(formData, callback) {
            $http.post(adminurl + 'country/save', formData).success(callback);
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
            $http.post(adminurl + 'city/save', formData).success(callback);
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
        cityEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'city/saveData',
                method: 'POST',
                data: id
            }).success(callback);
        },
        deleteCity: function(id, callback) {
            $http.post(adminurl + 'city/delete', {
                _id: id
            }).success(callback);
        },
        getAllCities: function(callback) {
            $http.post(adminurl + 'city/getAll', {}).success(callback);
        },
        searchCityMustDo: function(formData, i, callback) {
            $http.post(adminurl + 'mustdocity/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        cityMustDoSave: function(formData, callback) {
            $http.post(adminurl + 'mustdocity/save', formData).success(callback);
        },
        getOneCityMustDo: function(id, callback) {
            $http.post(adminurl + 'mustdocity/getOne', {
                _id: id
            }).success(callback);
        },
        cityMustDoEdit: function(formData, callback) {
            $http.post(adminurl + 'mustdocity/save', formData).success(callback);
        },
        deleteCityMustDo: function(id, callback) {
            $http.post(adminurl + 'mustdocity/delete', {
                _id: id
            }).success(callback);
        },
        getCityList: function(search, callback) {
            $http.post(adminurl + 'city/getSearch', {
                search: search
            }).success(callback);
        },
    };
});
