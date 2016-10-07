var globalfunction = {};
angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ui.select', 'ngAnimate', 'toastr', 'ngSanitize', 'angular-flexslider', 'ui.tinymce', 'imageupload', 'ngMap', 'toggle-switch', 'cfp.hotkeys'])

.controller('DashboardCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("dashboard");
    $scope.menutitle = NavigationService.makeactive("Dashboard");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    NavigationService.dashboardCount({}, function(data) {
        $scope.count = data.data;
    });
})

.controller('LoginCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("login");
    $scope.menutitle = NavigationService.makeactive("Login");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
})

.controller('CountryCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("country-list");
    $scope.menutitle = NavigationService.makeactive("Country");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.currentPage = $stateParams.page;
    var i = 0;
    $scope.search = {
        keyword: ""
    };
    if ($stateParams.keyword) {
        $scope.search.keyword = $stateParams.keyword;
    }
    $scope.showAllCountries = function(keywordChange) {
        $scope.totalItems = undefined;
        if (keywordChange) {
            $scope.currentPage = 1;
        }
        NavigationService.searchCountry({
            page: $scope.currentPage,
            keyword: $scope.search.keyword
        }, ++i, function(data, ini) {
            if (ini == i) {
                $scope.countries = data.data.results;
                $scope.totalItems = data.data.total;
                $scope.maxRow = data.data.options.count;
            }
        });
    };

    $scope.changePage = function(page) {
        var goTo = "country-list";
        if ($scope.search.keyword) {
            goTo = "country-list";
        }
        $state.go(goTo, {
            page: page,
            keyword: $scope.search.keyword
        });
    };
    $scope.showAllCountries();
    $scope.deleteCountry = function(id) {
        globalfunction.confDel(function(value) {
            console.log(value);
            if (value) {
                NavigationService.deleteCountry(id, function(data) {
                    if (data.value) {
                        $scope.showAllCountries();
                        toastr.success("Country deleted successfully.", "Country deleted");
                    } else {
                        toastr.error("There was an error while deleting country", "Country deleting error");
                    }
                });
            }
        });
    };
})

.controller('CreateCountryCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("country-detail");
    $scope.menutitle = NavigationService.makeactive("Country");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.header = {
        "name": "Create Country"
    };
    $scope.formData = {};

    $scope.addMustDo = function() {
        if ($scope.formData.mustDo && $scope.formData.mustDo.length > 0) {
            $scope.formData.mustDo.push({
                sequenceNo: "",
                name: "",
                description: "",
                mainPhoto: "",
                imageCredit: ""
            });
        } else {
            $scope.formData.mustDo = [];
            $scope.formData.mustDo.push({
                sequenceNo: "",
                name: "",
                description: "",
                mainPhoto: "",
                imageCredit: ""
            });
        }
    }
    $scope.deleteMustDo = function(index) {
        globalfunction.confDel(function(value) {
            if (value) {
                var abc = _.pullAt($scope.formData.mustDo, [index]);
            }
        });
    }

    $scope.saveCountry = function(formData) {
        NavigationService.countrySave($scope.formData, function(data) {
            if (data.value === true) {
                $state.go('country-list');
                toastr.success("Country " + formData.name + " created successfully.", "Country Created");
            } else {
                toastr.error("Country creation failed.", "Country creation error");
            }
        });
    };
})

.controller('EditCountryCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("country-detail");
    $scope.menutitle = NavigationService.makeactive("Country");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.header = {
        "name": "Edit Country"
    };
    $scope.formData = [];
    $scope.removeArr = [];
    $scope.search = {
        page: $stateParams.page,
        keyword: $stateParams.keyword
    };
    NavigationService.getOneCountry($stateParams.id, function(data) {
        $scope.formData = data.data;
    });
    $scope.addMustDo = function() {
        if ($scope.formData.mustDo && $scope.formData.mustDo.length > 0) {
            $scope.formData.mustDo.push({
                sequenceNo: "",
                name: "",
                description: "",
                mainPhoto: "",
                imageCredit: ""
            });
        } else {
            $scope.formData.mustDo = [];
            $scope.formData.mustDo.push({
                sequenceNo: "",
                name: "",
                description: "",
                mainPhoto: "",
                imageCredit: ""
            });
        }
    }
    $scope.deleteMustDo = function(index) {
        globalfunction.confDel(function(value) {
            console.log(value);
            if (value) {
                var abc = _.pullAt($scope.formData.mustDo, [index]);
                if (abc[0]._id) {
                    $scope.removeArr.push(abc[0]._id);
                } else {
                    abc = {};
                }
            }
        });
    }
    $scope.saveCountry = function(formValid) {
        $scope.formData.removeArr = $scope.removeArr;
        NavigationService.countryEditSave($scope.formData, function(data) {
            if (data.value === true) {
                $state.go('country-list', {
                    page: $scope.search.page,
                    keyword: $scope.search.keyword
                });
                console.log("Check this one");
                toastr.success("Country " + $scope.formData.name + " edited successfully.", "Country Edited");
            } else {
                toastr.error("Country edition failed.", "Country editing error");
            }
        });
    };
})

.controller('CityCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("city-list");
    $scope.menutitle = NavigationService.makeactive("City");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.currentPage = $stateParams.page;
    var i = 0;
    $scope.search = {
        keyword: "",
        country: "",
        name: ""
    };
    if ($stateParams.keyword) {
        $scope.search.keyword = $stateParams.keyword;
    }
    if ($stateParams.country) {
        $scope.search.country = $stateParams.country;
    }
    if ($stateParams.name) {
        $scope.search.name = $stateParams.name;
    }
    $scope.countries = [];
    NavigationService.getAllCountries(function(data) {
        $scope.countries = data.data;
        $scope.countries.unshift({ _id: "", name: "Select Country" });
    });
    $scope.callSelect = function(value) {
        $scope.search.country = value._id;
        $scope.search.name = value.name;
        $scope.showAllCities(true);
    }
    $scope.showAllCities = function(keywordChange) {
        $scope.totalItems = undefined;
        if (keywordChange) {
            $scope.currentPage = 1;
        }
        var filters = {
            filter: { country: $scope.search.country },
            page: $scope.currentPage,
            keyword: $scope.search.keyword
        };
        if ($scope.search.country === "") {
            filters.filter = {};
        }
        NavigationService.searchCity(filters, ++i, function(data, ini) {
            if (ini == i) {
                $scope.allCities = data.data.results;
                $scope.totalItems = data.data.total;
                $scope.maxRow = data.data.options.count;
            }
        });
    };

    $scope.changePage = function(page) {
        $scope.currentPage = page;
        $scope.showAllCities();
    };
    $scope.showAllCities();

    $scope.deleteCity = function(id) {
        globalfunction.confDel(function(value) {
            console.log(value);
            if (value) {
                NavigationService.deleteCity(id, function(data) {
                    if (data.value) {
                        $scope.showAllCities();
                        toastr.success("City deleted successfully.", "City deleted");
                    } else {
                        toastr.error("There was an error while deleting City", "City deleting error");
                    }
                });
            }
        });
    };
})

.controller('CreateCityCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("city-detail");
    $scope.menutitle = NavigationService.makeactive("City");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.header = {
        "name": "Create City"
    };
    $scope.formData = {};
    $scope.addMustDo = function() {
        if ($scope.formData.mustDo && $scope.formData.mustDo.length > 0) {
            $scope.formData.mustDo.push({
                sequenceNo: "",
                name: "",
                description: "",
                mainPhoto: "",
                imageCredit: ""
            });
        } else {
            $scope.formData.mustDo = [];
            $scope.formData.mustDo.push({
                sequenceNo: "",
                name: "",
                description: "",
                mainPhoto: "",
                imageCredit: ""
            });
        }
    }
    $scope.deleteMustDo = function(index) {
        globalfunction.confDel(function(value) {
            if (value) {
                var abc = _.pullAt($scope.formData.mustDo, [index]);
            }
        });
    }
    $scope.saveCity = function(formData) {
        NavigationService.citySave($scope.formData, function(data) {
            if (data.value === true) {
                $state.go('city-list');
                toastr.success("City " + formData.name + " created successfully.", "City Created");
            } else {
                toastr.error("City creation failed.", "City creation error");
            }
        });
    };
})

.controller('EditCityCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("city-detail");
    $scope.menutitle = NavigationService.makeactive("City");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.removeArrMustDo = [];
    $scope.search = {
        page: $stateParams.page,
        keyword: $stateParams.keyword,
        country: $stateParams.country,
        name: $stateParams.name
    };
    $scope.header = {
        "name": "Edit City"
    };
    $scope.values = [{ value: "", name: "Select Status" }, { value: false, name: "Not Closed" }, { value: true, name: "Closed" }];
    NavigationService.getOneCity($stateParams.id, function(data) {
        $scope.formData = data.data;
        $scope.formData.country = data.data.country._id;
    });
    $scope.addMustDo = function() {
        if ($scope.formData.mustDo && $scope.formData.mustDo.length > 0) {
            $scope.formData.mustDo.push({
                sequenceNo: "",
                name: "",
                description: "",
                mainPhoto: "",
                imageCredit: ""
            });
        } else {
            $scope.formData.mustDo = [];
            $scope.formData.mustDo.push({
                sequenceNo: "",
                name: "",
                description: "",
                mainPhoto: "",
                imageCredit: ""
            });
        }
    }
    $scope.deleteMustDo = function(index) {
        globalfunction.confDel(function(value) {
            console.log(value);
            if (value) {
                var abc = _.pullAt($scope.formData.mustDo, [index]);
                if (abc[0]._id) {
                    $scope.removeArrMustDo.push(abc[0]._id);
                } else {
                    abc = {};
                }
            }
        });
    }
    $scope.addHotel = function() {
        if ($scope.formData.hotel && $scope.formData.hotel.length > 0) {
            $scope.formData.hotel.push({
                sequenceNo: "",
                name: "",
                description: "",
                mainPhoto: "",
                imageCredit: ""
            });
        } else {
            $scope.formData.hotel = [];
            $scope.formData.hotel.push({
                sequenceNo: "",
                name: "",
                description: "",
                mainPhoto: "",
                imageCredit: ""
            });
        }
    }
    $scope.deleteHotel = function(index) {
        globalfunction.confDel(function(value) {
            console.log(value);
            if (value) {
                var abc = _.pullAt($scope.formData.hotel, [index]);
                if (abc[0]._id) {
                    $scope.removeArrMustDo.push(abc[0]._id);
                } else {
                    abc = {};
                }
            }
        });
    }
    $scope.saveCity = function(formValid) {
        $scope.formData.removeArrMustDo = $scope.removeArrMustDo;
        NavigationService.cityEditSave($scope.formData, function(data) {
            if (data.value === true) {
                $state.go('city-list', {
                    page: $scope.search.page,
                    keyword: $scope.search.keyword,
                    country: $scope.search.country,
                    name: $scope.search.name
                });
                toastr.success("City " + $scope.formData.name + " edited successfully.", "City Edited");
            } else {
                toastr.error("City edition failed.", "City editing error");
            }
        });
    };
})

.controller('UserCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("user-list");
    $scope.menutitle = NavigationService.makeactive("User List");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.UserType = ['internal', 'external'];
    $scope.showAllUsers = function() {
        NavigationService.getAllUsers(function(data) {
            $scope.allUsers = data.data;
            console.log('$scope.allUsers', $scope.allZones);
        });

    };
    $scope.showAllUsers();


    $scope.deleteUser = function(id) {

        NavigationService.deleteUser({
            id: id
        }, function(data) {
            $scope.showAllUsers();

        });
    }
})

.controller('CreateUserCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("user-detail");
    $scope.menutitle = NavigationService.makeactive("User");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.UserType = ['internal', 'external'];
    $scope.header = {
        "name": "Create User"
    };
    $scope.UserType = ['internal', 'external'];
    $scope.userStatus = [{
        "name": "Active",
        "value": true
    }, {
        "name": "Inactive",
        "value": false
    }];
    $scope.formData = {};
    $scope.UserType = ['internal', 'external'];
    $scope.saveUser = function(formData) {

        NavigationService.userSave($scope.formData, function(data) {
            console.log(data);
            if (data.value == true) {
                $state.go('user-list');
            }
            // console.log('$scope.allCountriessave', $scope.data);

        });
    }

    NavigationService.getAllMenus(function(data) {
        $scope.allMenus = data.data;
        console.log('$scope.allMenus', $scope.allZones);
    });
    NavigationService.getAllRoles(function(data) {
        $scope.allRoles = data.data;
        console.log('$scope.allRoles', $scope.allZones);
    });
    NavigationService.getAllDepartments(function(data) {
        $scope.allDepartments = data.data;

    });
})

.controller('EditUserCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("user-detail");
    $scope.menutitle = NavigationService.makeactive("User");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.UserType = ['internal', 'external'];
    $scope.header = {
        "name": "Edit User"
    };

    $scope.UserRole = [{
        user_type: '',
        roleName: '',
        menu: '',
        roleDescription: ''
    }];
    console.log('addd', $scope.UserRole);

    $scope.UserType = ['internal', 'external'];
    $scope.userStatus = [{
        "name": "Active",
        "value": true
    }, {
        "name": "Inactive",
        "value": false
    }];
    $scope.UserType = ['internal', 'external'];
    NavigationService.getOneUser($stateParams.id, function(data) {
        $scope.UserRole = data.data.role;
        console.log('inside', $scope.UserRole);
        $scope.formData = data.data;
        console.log('$scope.formData', $scope.formData);

    });

    $scope.saveUser = function(formValid) {

        //  if (formValid.$valid) {
        //  $scope.formComplete = true;
        NavigationService.userEditSave($scope.formData, function(data) {
            if (data.value == true) {
                $state.go('user-list');
            }
        });
        //  }
    };

    NavigationService.getAllMenus(function(data) {
        $scope.allMenus = data.data;
        console.log('$scope.allMenus', $scope.allZones);
    });
    NavigationService.getAllRoles(function(data) {
        $scope.allRoles = data.data;
        console.log('$scope.allRoles', $scope.allZones);
    });
    NavigationService.getAllDepartments(function(data) {
        $scope.allDepartments = data.data;

    });
})

.controller('MultipleSelectCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, $filter, toastr) {
    var i = 0;
    $scope.getValues = function(filter, insertFirst) {
        var dataSend = {
            keyword: $scope.search.modelData,
            filter: filter,
            page: 1
        };
        NavigationService[$scope.api](dataSend, ++i, function(data) {
            if (data.value) {
                $scope.list = data.data.results;
                if ($scope.search.modelData) {
                    $scope.showCreate = true;
                    _.each($scope.list, function(n) {
                        // if (n.name) {
                        if (_.lowerCase(n.name) == _.lowerCase($scope.search.modelData)) {
                            $scope.showCreate = false;
                            return 0;
                        }
                        // }else{
                        //     if (_.lowerCase(n.officeCode) == _.lowerCase($scope.search.modelData)) {
                        //       $scope.showCreate = false;
                        //       return 0;
                        //   }
                        // }

                    });
                } else {
                    $scope.showCreate = false;

                }
                if (insertFirst) {
                    if ($scope.list[0] && $scope.list[0]._id) {
                        // if ($scope.list[0].name) {
                        $scope.sendData($scope.list[0]._id, $scope.list[0].name);
                        // }else{
                        //   $scope.sendData($scope.list[0]._id, $scope.list[0].officeCode);
                        // }
                    } else {
                        console.log("Making this happen");
                        $scope.sendData("", "");
                    }
                }
            } else {
                console.log("Making this happen2");
                $scope.sendData("", "");
            }


        });
    };

    $scope.$watch('model', function(newVal, oldVal) {
        if (newVal && oldVal === undefined) {
            $scope.getValues({
                _id: $scope.model
            }, true);
        }
    });


    $scope.$watch('filter', function(newVal, oldVal) {
        var filter = {};
        if ($scope.filter) {
            filter = JSON.parse($scope.filter);
        }
        var dataSend = {
            keyword: $scope.search.modelData,
            filter: filter,
            page: 1
        };

        NavigationService[$scope.api](dataSend, ++i, function(data) {
            if (data.value) {
                $scope.list = data.data.results;
                $scope.showCreate = false;

            }
        });
    });


    $scope.search = {
        modelData: ""
    };
    if ($scope.model) {
        $scope.getValues({
            _id: $scope.model
        }, true);
    } else {
        $scope.getValues();
    }





    $scope.listview = false;
    $scope.showCreate = false;
    $scope.typeselect = "";
    $scope.showList = function() {
        $scope.listview = true;
        $scope.searchNew(true);
    };
    $scope.closeList = function() {
        $scope.listview = false;
    };
    $scope.closeListSlow = function() {
        $timeout(function() {
            $scope.closeList();
        }, 500);
    };
    $scope.searchNew = function(dontFlush) {
        if (!dontFlush) {
            $scope.model = "";
        }
        var filter = {};
        if ($scope.filter) {
            filter = JSON.parse($scope.filter);
        }
        $scope.getValues(filter);
    };
    $scope.createNew = function(create) {
        var newCreate = $filter("capitalize")(create);
        var data = {
            name: newCreate
        };
        if ($scope.filter) {
            data = _.assign(data, JSON.parse($scope.filter));
        }
        console.log(data);
        NavigationService[$scope.create](data, function(data) {
            if (data.value) {
                toastr.success($scope.name + " Created Successfully", "Creation Success");
                $scope.model = data.data._id;
                $scope.ngName = data.data.name;
            } else {
                toastr.error("Error while creating " + $scope.name, "Error");
            }
        });
        $scope.listview = false;
    };
    $scope.sendData = function(val, name) {
        $scope.search.modelData = name;
        $scope.ngName = name;
        $scope.model = val;
        $scope.listview = false;
    };
})

.controller('headerctrl', function($scope, TemplateService, $uibModal, $state) {
    $scope.template = TemplateService;
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });
    // $scope.samePageClick = function(current) {
    //     if ($state.current.name == current) {
    //         $state.reload();
    //     } else {
    //         console.log(current);
    //         console.log($state.current.name);
    //         $state.go(current);
    //     }
    // };
    globalfunction.confDel = function(callback) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/conf-delete.html',
            size: 'sm',
            scope: $scope
        });
        $scope.close = function(value) {
            callback(value);
            modalInstance.close("cancel");
        };
    };
})

.controller('languageCtrl', function($scope, TemplateService, $translate, $rootScope) {

    $scope.changeLanguage = function() {
        console.log("Language Clicked");

        if (!$.jStorage.get("language")) {
            $translate.use("hi");
            $.jStorage.set("language", "hi");
        } else {
            if ($.jStorage.get("language") == "en") {
                $translate.use("hi");
                $.jStorage.set("language", "hi");
            } else {
                $translate.use("en");
                $.jStorage.set("language", "en");
            }
        }
        //  $rootScope.$apply();
    };
})
