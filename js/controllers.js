var globalfunction = {};
angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ui.select', 'ngAnimate', 'toastr', 'ngSanitize', 'angular-flexslider', 'ui.tinymce', 'imageupload', 'ngMap', 'toggle-switch', 'cfp.hotkeys'])

.controller('DashboardCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("dashboard");
    $scope.menutitle = NavigationService.makeactive("Dashboard");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
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
    $scope.menutitle = NavigationService.makeactive("Country-List");
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
    $scope.menutitle = NavigationService.makeactive("Country-List");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.header = {
        "name": "Create Country"
    };
    $scope.formData = {};
    $scope.saveCountry = function(formData) {
        console.log($scope.formData);
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
    $scope.menutitle = NavigationService.makeactive("Country-List");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.header = {
        "name": "Edit Country"
    };

    NavigationService.getOneCountry($stateParams.id, function(data) {
        $scope.formData = data.data;
        console.log('$scope.oneCountry', $scope.oneCountry);

    });

    $scope.saveCountry = function(formValid) {
        NavigationService.countryEditSave($scope.formData, function(data) {
            if (data.value === true) {
                $state.go('country-list');
                console.log("Check this one");
                toastr.success("Country " + $scope.formData.name + " edited successfully.", "Country Edited");
            } else {
                toastr.error("Country edition failed.", "Country editing error");
            }
        });
    };
})

.controller('CountryMustDoCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("countryMustDo-list");
    $scope.menutitle = NavigationService.makeactive("Country Must-Do");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.currentPage = $stateParams.page;
    var i = 0;
    $scope.search = {
        keyword: "",
        countryId: ""
    };
    if ($stateParams.keyword) {
        $scope.search.keyword = $stateParams.keyword;
    }
    $scope.countries = [];
    NavigationService.getAllCountries(function(data) {
        $scope.countries = data.data;
        $scope.countries.unshift({ _id: "", name: "Select Country" });
    });
    $scope.showAllMustDo = function(keywordChange) {
        $scope.totalItems = undefined;
        if (keywordChange) {
            $scope.currentPage = 1;
        }
        var filters = {
            filter: { country: $scope.search.countryId },
            page: $scope.currentPage,
            keyword: $scope.search.keyword
        };
        if ($scope.search.countryId === "") {
            filters.filter = {};
        }
        NavigationService.searchCountryMustDo(filters, ++i, function(data, ini) {
            if (ini == i) {
                if (data.value === true) {
                    $scope.mustDos = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;
                } else {
                    $scope.totalItems = 0;
                }
            }
        });
    };
    $scope.callSelect = function(value) {
        $scope.search.countryId = value._id;
        $scope.showAllMustDo();
    }
    $scope.changePage = function(page) {
        var goTo = "countryMustDo-list";
        if ($scope.search.keyword) {
            goTo = "countryMustDo-list";
        }
        $state.go(goTo, {
            page: page,
            keyword: $scope.search.keyword
        });
    };
    $scope.showAllMustDo();
    $scope.deleteCountryMustDo = function(id) {
        globalfunction.confDel(function(value) {
            console.log(value);
            if (value) {
                NavigationService.deleteCountryMustDo(id, function(data) {
                    if (data.value) {
                        $scope.showAllMustDo();
                        toastr.success("Must-Do deleted successfully.", "Must-Do deleted");
                    } else {
                        toastr.error("There was an error while deleting country", "Must-Do deleting error");
                    }
                });
            }
        });
    };
})

.controller('CreateCountryMustDoCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("countryMustDo-detail");
    $scope.menutitle = NavigationService.makeactive("Country Must-Do");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.header = {
        "name": "Create Must-Do Country"
    };
    $scope.formData = {};
    $scope.saveMustDo = function(formData) {
        console.log($scope.formData);
        NavigationService.countryMustDoSave($scope.formData, function(data) {
            if (data.value === true) {
                $state.go('countryMustDo-list');
                toastr.success("Must-Do " + $scope.formData.name + " created successfully.", "Must-Do Created");
            } else {
                toastr.error("Must-Do creation failed.", "Must-Do creation error");
            }
        });
    };
})

.controller('EditCountryMustDoCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("countryMustDo-detail");
    $scope.menutitle = NavigationService.makeactive("Country Must-Do");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.header = {
        "name": "Edit Must-Do Country"
    };

    NavigationService.getOneCountryMustDo($stateParams.id, function(data) {
        $scope.formData = data.data;
    });

    $scope.saveMustDo = function(formValid) {
        NavigationService.countryMustDoEdit($scope.formData, function(data) {
            if (data.value === true) {
                $state.go('countryMustDo-list');
                toastr.success("Must-Do " + $scope.formData.name + " created successfully.", "Must-Do Created");
            } else {
                toastr.error("Must-Do edition failed.", "Must-Do edition error");
            }
        });
    };
})

.controller('CityCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("city-list");
    $scope.menutitle = NavigationService.makeactive("City-List");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.currentPage = $stateParams.page;
    var i = 0;
    $scope.search = {
        keyword: "",
        countryId: ""
    };
    if ($stateParams.keyword) {
        $scope.search.keyword = $stateParams.keyword;
    }
    $scope.countries = [];
    NavigationService.getAllCountries(function(data) {
        $scope.countries = data.data;
        $scope.countries.unshift({ _id: "", name: "Select Country" });
    });
    $scope.callSelect = function(value) {
        $scope.search.countryId = value._id;
        $scope.showAllCities();
    }
    $scope.showAllCities = function(keywordChange) {
        $scope.totalItems = undefined;
        if (keywordChange) {
            $scope.currentPage = 1;
        }
        var filters = {
            filter: { country: $scope.search.countryId },
            page: $scope.currentPage,
            keyword: $scope.search.keyword
        };
        if ($scope.search.countryId === "") {
            filters.filter = {};
        }
        NavigationService.searchCity(filters, ++i, function(data, ini) {
            console.log(data.data);
            if (ini == i) {
                console.log(data.data);
                $scope.allCities = data.data.results;
                $scope.totalItems = data.data.total;
                $scope.maxRow = data.data.options.count;

            }
        });
    };

    $scope.changePage = function(page) {
        var goTo = "city-list";
        if ($scope.search.keyword) {
            goTo = "city-list";
        }
        $state.go(goTo, {
            page: page,
            keyword: $scope.search.keyword
        });
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
    $scope.menutitle = NavigationService.makeactive("City-List");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.header = {
        "name": "Create City"
    };
    $scope.formData = {};
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
    $scope.menutitle = NavigationService.makeactive("City-List");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.header = {
        "name": "Edit City"
    };
    NavigationService.getOneCity($stateParams.id, function(data) {
        $scope.formData = data.data;
        $scope.formData.country = data.data.country._id;
    });

    $scope.saveCity = function(formValid) {

        NavigationService.citySave($scope.formData, function(data) {
            if (data.value === true) {
                $state.go('city-list');
                toastr.success("City " + $scope.formData.name + " edited successfully.", "City Edited");
            } else {
                toastr.error("City edition failed.", "City editing error");
            }
        });
    };
})

.controller('CityMustDoCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("cityMustDo-list");
    $scope.menutitle = NavigationService.makeactive("City Must-Do");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.currentPage = $stateParams.page;
    var i = 0;
    $scope.search = {
        keyword: "",
        cityId: ""
    };
    if ($stateParams.keyword) {
        $scope.search.keyword = $stateParams.keyword;
    }
    $scope.cities = [];
    $scope.showAllMustDo = function(keywordChange) {
        $scope.totalItems = undefined;
        if (keywordChange) {
            $scope.currentPage = 1;
        }
        var filters = {
            filter: { city: $scope.search.cityId },
            page: $scope.currentPage,
            keyword: $scope.search.keyword
        };
        if ($scope.search.cityId === "") {
            filters.filter = {};
        }
        NavigationService.searchCityMustDo(filters, ++i, function(data, ini) {
            if (ini == i) {
                if (data.value === true) {
                    $scope.mustDos = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;
                } else {
                    $scope.totalItems = 0;
                }
            }
        });
    };
    $scope.callSelect = function(value) {
        $scope.search.cityId = value._id;
        $scope.showAllMustDo();
    }
    $scope.getCity = function(value) {
        $scope.search.city = value;
        NavigationService.getCityList($scope.search.city, function(data) {
            if (data.value) {
                $scope.cities = data.data;
                $scope.cities.unshift({ _id: "", name: "Search City" });
            }
        });
    }
    $scope.changePage = function(page) {
        var goTo = "cityMustDo-list";
        if ($scope.search.keyword) {
            goTo = "cityMustDo-list";
        }
        $state.go(goTo, {
            page: page,
            keyword: $scope.search.keyword
        });
    };
    $scope.showAllMustDo();
    $scope.deleteCityMustDo = function(id) {
        globalfunction.confDel(function(value) {
            console.log(value);
            if (value) {
                NavigationService.deleteCityMustDo(id, function(data) {
                    if (data.value) {
                        $scope.showAllMustDo();
                        toastr.success("Must-Do deleted successfully.", "Must-Do deleted");
                    } else {
                        toastr.error("There was an error while deleting must-do", "Must-Do deleting error");
                    }
                });
            }
        });
    };
})

.controller('CreateCityMustDoCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("cityMustDo-detail");
    $scope.menutitle = NavigationService.makeactive("City Must-Do");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.header = {
        "name": "Create Must-Do City"
    };
    $scope.getCity = function(value) {
        NavigationService.getCityList(value, function(data) {
            if (data.value) {
                $scope.cities = data.data;
                $scope.cities.unshift({ _id: "", name: "Search City" });
            }
        });
    }
    $scope.variable = "";
    $scope.callSelect = function(value) {
        $scope.formData.city = value._id;
        $scope.variable = value.name;
    }
    $scope.formData = {};
    $scope.saveMustDo = function(formData) {
        NavigationService.cityMustDoSave($scope.formData, function(data) {
            if (data.value === true) {
                $state.go('cityMustDo-list');
                toastr.success("Must-Do " + $scope.formData.name + " created successfully.", "Must-Do Created");
            } else {
                toastr.error("Must-Do creation failed.", "Must-Do creation error");
            }
        });
    };
})

.controller('EditCityMustDoCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("cityMustDo-detail");
    $scope.menutitle = NavigationService.makeactive("City Must-Do");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.header = {
        "name": "Edit City Must-Do"
    };
    $scope.getCity = function(value) {
        NavigationService.getCityList(value, function(data) {
            if (data.value) {
                $scope.cities = data.data;
                $scope.cities.unshift({ _id: "", name: "Search City" });
            }
        });
    }

    $scope.variable = "";
    NavigationService.getOneCityMustDo($stateParams.id, function(data) {
        $scope.formData = data.data;
        $scope.variable = data.data.city.name;
    });
    $scope.callSelect = function(value) {
        $scope.formData.city = value._id;
        $scope.variable = value.name;
    }
    $scope.formData = {};
    $scope.saveMustDo = function(formData) {
        NavigationService.cityMustDoSave($scope.formData, function(data) {
            if (data.value === true) {
                $state.go('cityMustDo-list');
                toastr.success("Must-Do " + $scope.formData.name + " created successfully.", "Must-Do Created");
            } else {
                toastr.error("Must-Do creation failed.", "Must-Do creation error");
            }
        });
    };
})

.controller('CityHotelCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("cityHotel-list");
    $scope.menutitle = NavigationService.makeactive("City Hotel");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.currentPage = $stateParams.page;
    var i = 0;
    $scope.search = {
        keyword: "",
        cityId: ""
    };
    if ($stateParams.keyword) {
        $scope.search.keyword = $stateParams.keyword;
    }
    $scope.cities = [];
    $scope.showAllHotel = function(keywordChange) {
        $scope.totalItems = undefined;
        if (keywordChange) {
            $scope.currentPage = 1;
        }
        var filters = {
            filter: { city: $scope.search.cityId },
            page: $scope.currentPage,
            keyword: $scope.search.keyword
        };
        if ($scope.search.cityId === "") {
            filters.filter = {};
        }
        NavigationService.searchCityHotel(filters, ++i, function(data, ini) {
            if (ini == i) {
                if (data.value === true) {
                    $scope.hotels = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;
                } else {
                    $scope.totalItems = 0;
                }
            }
        });
    };
    $scope.callSelect = function(value) {
        $scope.search.cityId = value._id;
        $scope.showAllHotel();
    }
    $scope.getCity = function(value) {
        $scope.search.city = value;
        NavigationService.getCityList($scope.search.city, function(data) {
            if (data.value) {
                $scope.cities = data.data;
                $scope.cities.unshift({ _id: "", name: "Search City" });
            }
        });
    }
    $scope.changePage = function(page) {
        var goTo = "cityHotel-list";
        if ($scope.search.keyword) {
            goTo = "cityHotel-list";
        }
        $state.go(goTo, {
            page: page,
            keyword: $scope.search.keyword
        });
    };
    $scope.showAllHotel();
    $scope.deleteCityHotel = function(id) {
        globalfunction.confDel(function(value) {
            console.log(value);
            if (value) {
                NavigationService.deleteCityHotel(id, function(data) {
                    if (data.value) {
                        $scope.showAllHotel();
                        toastr.success("Hotel deleted successfully.", "Hotel deleted");
                    } else {
                        toastr.error("There was an error while deleting hotel", "Hotel deleting error");
                    }
                });
            }
        });
    };
})

.controller('CreateCityHotelCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("cityHotel-detail");
    $scope.menutitle = NavigationService.makeactive("City Hotel");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.header = {
        "name": "Create City Hotel"
    };
    $scope.getCity = function(value) {
        NavigationService.getCityList(value, function(data) {
            if (data.value) {
                $scope.cities = data.data;
                $scope.cities.unshift({ _id: "", name: "Search City" });
            }
        });
    }
    $scope.values = [{ value: "", name: "Select Status" }, { value: false, name: "Not Closed" }, { value: true, name: "Closed" }];
    $scope.variable = "";
    $scope.callSelect = function(value) {
        $scope.formData.city = value._id;
        $scope.variable = value.name;
    }
    $scope.formData = {};
    $scope.saveHotel = function(formData) {
        NavigationService.cityHotelSave($scope.formData, function(data) {
            if (data.value === true) {
                $state.go('cityHotel-list');
                toastr.success("Hotel " + $scope.formData.name + " created successfully.", "Hotel Created");
            } else {
                toastr.error("Hotel creation failed.", "Hotel creation error");
            }
        });
    };
})

.controller('EditCityHotelCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("cityHotel-detail");
    $scope.menutitle = NavigationService.makeactive("City Hotel");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.header = {
        "name": "Edit Hotel City"
    };
    $scope.getCity = function(value) {
        NavigationService.getCityList(value, function(data) {
            if (data.value) {
                $scope.cities = data.data;
                $scope.cities.unshift({ _id: "", name: "Search City" });
            }
        });
    }
    $scope.values = [{ value: "", name: "Select Status" }, { value: false, name: "Not Closed" }, { value: true, name: "Closed" }];
    $scope.variable = "";
    NavigationService.getOneCityHotel($stateParams.id, function(data) {
        $scope.formData = data.data;
        $scope.variable = data.data.city.name;
    });
    $scope.callSelect = function(value) {
        $scope.formData.city = value._id;
        $scope.variable = value.name;
    }
    $scope.formData = {};
    $scope.saveHotel = function(formData) {
        NavigationService.cityHotelSave($scope.formData, function(data) {
            if (data.value === true) {
                $state.go('cityHotel-list');
                toastr.success("Hotel " + $scope.formData.name + " created successfully.", "Hotel Created");
            } else {
                toastr.error("Hotel creation failed.", "Hotel creation error");
            }
        });
    };
})

.controller('CityRestaurantCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("cityRestaurant-list");
    $scope.menutitle = NavigationService.makeactive("City Restaurant");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.currentPage = $stateParams.page;
    var i = 0;
    $scope.search = {
        keyword: "",
        cityId: ""
    };
    if ($stateParams.keyword) {
        $scope.search.keyword = $stateParams.keyword;
    }
    $scope.cities = [];
    $scope.showAllRestaurant = function(keywordChange) {
        $scope.totalItems = undefined;
        if (keywordChange) {
            $scope.currentPage = 1;
        }
        var filters = {
            filter: { city: $scope.search.cityId },
            page: $scope.currentPage,
            keyword: $scope.search.keyword
        };
        if ($scope.search.cityId === "") {
            filters.filter = {};
        }
        NavigationService.searchCityRestaurant(filters, ++i, function(data, ini) {
            if (ini == i) {
                if (data.value === true) {
                    $scope.restaurants = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;
                } else {
                    $scope.totalItems = 0;
                }
            }
        });
    };
    $scope.callSelect = function(value) {
        $scope.search.cityId = value._id;
        $scope.showAllRestaurant();
    }
    $scope.getCity = function(value) {
        $scope.search.city = value;
        NavigationService.getCityList($scope.search.city, function(data) {
            if (data.value) {
                $scope.cities = data.data;
                $scope.cities.unshift({ _id: "", name: "Search City" });
            }
        });
    }
    $scope.changePage = function(page) {
        var goTo = "cityRestaurant-list";
        if ($scope.search.keyword) {
            goTo = "cityRestaurant-list";
        }
        $state.go(goTo, {
            page: page,
            keyword: $scope.search.keyword
        });
    };
    $scope.showAllRestaurant();
    $scope.deleteCityRestaurant = function(id) {
        globalfunction.confDel(function(value) {
            console.log(value);
            if (value) {
                NavigationService.deleteCityRestaurant(id, function(data) {
                    if (data.value) {
                        $scope.showAllRestaurant();
                        toastr.success("Restaurant deleted successfully.", "Restaurant deleted");
                    } else {
                        toastr.error("There was an error while deleting restaurants", "Restaurant deleting error");
                    }
                });
            }
        });
    };
})

.controller('CreateCityRestaurantCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("cityRestaurant-detail");
    $scope.menutitle = NavigationService.makeactive("City Restaurant");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.header = {
        "name": "Create City Restaurant"
    };
    $scope.getCity = function(value) {
        NavigationService.getCityList(value, function(data) {
            if (data.value) {
                $scope.cities = data.data;
                $scope.cities.unshift({ _id: "", name: "Search City" });
            }
        });
    }
    $scope.values = [{ value: "", name: "Select Status" }, { value: false, name: "Not Closed" }, { value: true, name: "Closed" }];
    $scope.variable = "";
    $scope.callSelect = function(value) {
        $scope.formData.city = value._id;
        $scope.variable = value.name;
    }
    $scope.formData = {};
    $scope.saveRestaurant = function(formData) {
        NavigationService.cityRestaurantSave($scope.formData, function(data) {
            if (data.value === true) {
                $state.go('cityRestaurant-list');
                toastr.success("Restaurant " + $scope.formData.name + " created successfully.", "Restaurant Created");
            } else {
                toastr.error("Restaurant creation failed.", "Restaurant creation error");
            }
        });
    };
})

.controller('EditCityRestaurantCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("cityRestaurant-detail");
    $scope.menutitle = NavigationService.makeactive("City Restaurant");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.header = {
        "name": "Edit Restaurant City"
    };
    $scope.getCity = function(value) {
        NavigationService.getCityList(value, function(data) {
            if (data.value) {
                $scope.cities = data.data;
                $scope.cities.unshift({ _id: "", name: "Search City" });
            }
        });
    }
    $scope.values = [{ value: "", name: "Select Status" }, { value: false, name: "Not Closed" }, { value: true, name: "Closed" }];
    $scope.variable = "";
    NavigationService.getOneCityRestaurant($stateParams.id, function(data) {
        $scope.formData = data.data;
        $scope.variable = data.data.city.name;
    });
    $scope.callSelect = function(value) {
        $scope.formData.city = value._id;
        $scope.variable = value.name;
    }
    $scope.formData = {};
    $scope.saveRestaurant = function(formData) {
        NavigationService.cityRestaurantSave($scope.formData, function(data) {
            if (data.value === true) {
                $state.go('cityRestaurant-list');
                toastr.success("Restaurant " + $scope.formData.name + " created successfully.", "Restaurant Created");
            } else {
                toastr.error("Restaurant creation failed.", "Restaurant creation error");
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
