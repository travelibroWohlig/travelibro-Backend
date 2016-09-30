// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ui.router',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice',
    'pascalprecht.translate',
    'angulartics',
    'angulartics.google.analytics',
    'imageupload',
    "ngMap"

]);

firstapp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    // for http request with session
    $httpProvider.defaults.withCredentials = true;
    $stateProvider
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "views/template.html",
            controller: 'DashboardCtrl'
        })

    .state('login', {
        url: "/login",
        templateUrl: "views/template.html",
        controller: 'LoginCtrl'
    })

    .state('country-list', {
        url: "/country-list/{page:.*}/{keyword:.*}",
        templateUrl: "views/template.html",
        controller: 'CountryCtrl',
        params: {
            page: "1",
            keyword: ""
        }
    })

    .state('createcountry', {
        url: "/country-create",
        templateUrl: "views/template.html",
        controller: 'CreateCountryCtrl'
    })

    .state('editcountry', {
        url: "/country-edit/:id",
        templateUrl: "views/template.html",
        controller: 'EditCountryCtrl'
    })

    .state('countryMustDo-list', {
        url: "/countryMustDo-list/{page:.*}/{keyword:.*}",
        templateUrl: "views/template.html",
        controller: 'CountryMustDoCtrl',
        params: {
            page: "1",
            keyword: ""
        }
    })

    .state('createCountryMustDo', {
        url: "/countryMustDo-detail",
        templateUrl: "views/template.html",
        controller: 'CreateCountryMustDoCtrl'
    })

    .state('editCountryMustDo', {
        url: "/countryMustDo-edit/:id",
        templateUrl: "views/template.html",
        controller: 'EditCountryMustDoCtrl'
    })

    .state('city-list', {
        url: "/city-list/{page:.*}/{keyword:.*}",
        templateUrl: "views/template.html",
        controller: 'CityCtrl',
        params: {
            page: "1",
            keyword: ""
        }
    })

    .state('createcity', {
        url: "/city-create",
        templateUrl: "views/template.html",
        controller: 'CreateCityCtrl'
    })

    .state('editcity', {
        url: "/city-edit/:id",
        templateUrl: "views/template.html",
        controller: 'EditCityCtrl'
    })

    .state('cityMustDo-list', {
        url: "/cityMustDo-list/{page:.*}/{keyword:.*}",
        templateUrl: "views/template.html",
        controller: 'CityMustDoCtrl',
        params: {
            page: "1",
            keyword: ""
        }
    })

    .state('createCityMustDo', {
        url: "/cityMustDo-detail",
        templateUrl: "views/template.html",
        controller: 'CreateCityMustDoCtrl'
    })

    .state('editCityMustDo', {
        url: "/cityMustDo-edit/:id",
        templateUrl: "views/template.html",
        controller: 'EditCityMustDoCtrl'
    })

    .state('cityHotel-list', {
        url: "/cityHotel-list/{page:.*}/{keyword:.*}",
        templateUrl: "views/template.html",
        controller: 'CityHotelCtrl',
        params: {
            page: "1",
            keyword: ""
        }
    })

    .state('createCityHotel', {
        url: "/cityHotel-detail",
        templateUrl: "views/template.html",
        controller: 'CreateCityHotelCtrl'
    })

    .state('editCityHotel', {
        url: "/cityHotel-edit/:id",
        templateUrl: "views/template.html",
        controller: 'EditCityHotelCtrl'
    })

    .state('cityRestaurant-list', {
        url: "/cityRestaurant-list/{page:.*}/{keyword:.*}",
        templateUrl: "views/template.html",
        controller: 'CityRestaurantCtrl',
        params: {
            page: "1",
            keyword: ""
        }
    })

    .state('createCityRestaurant', {
        url: "/cityRestaurant-detail",
        templateUrl: "views/template.html",
        controller: 'CreateCityRestaurantCtrl'
    })

    .state('editCityRestaurant', {
        url: "/cityRestaurant-edit/:id",
        templateUrl: "views/template.html",
        controller: 'EditCityRestaurantCtrl'
    })

    ;
    $urlRouterProvider.otherwise("/login");
    $locationProvider.html5Mode(isproduction);

});


firstapp.filter('uploadpath', function() {
    return function(input, width, height, style) {
        var other = "";
        if (width && width !== "") {
            other += "&width=" + width;
        }
        if (height && height !== "") {
            other += "&height=" + height;
        }
        if (style && style !== "") {
            other += "&style=" + style;
        }
        if (input) {
            if (input.indexOf('https://') == -1) {
                return imgpath + "?file=" + input + other;
            } else {
                return input;
            }
        }
    };
});
firstapp.directive('imageonload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                scope.$apply(attrs.imageonload);
            });
        }
    };
});


firstapp.directive('uploadImage', function($http, $filter) {
    return {
        templateUrl: 'views/directive/uploadFile.html',
        scope: {
            model: '=ngModel',
            callback: "=ngCallback"
        },
        link: function($scope, element, attrs) {

            $scope.showImage = function() {
                console.log($scope.image);
            };


            $scope.isMultiple = false;
            $scope.inObject = false;
            if (attrs.multiple || attrs.multiple === "") {
                $scope.isMultiple = true;
                $("#inputImage").attr("multiple", "ADD");
            }
            if (attrs.noView || attrs.noView === "") {
                $scope.noShow = true;
            }

            $scope.$watch("image", function(newVal, oldVal) {
                if (newVal && newVal.file) {
                    $scope.uploadNow(newVal);
                }
            });

            if ($scope.model) {
                if (_.isArray($scope.model)) {
                    $scope.image = [];
                    _.each($scope.model, function(n) {
                        $scope.image.push({
                            url: n
                        });
                    });
                }

            }
            if (attrs.inobj || attrs.inobj === "") {
                $scope.inObject = true;
            }
            $scope.clearOld = function() {
                $scope.model = [];
            };
            $scope.uploadNow = function(image) {
                $scope.uploadStatus = "uploading";

                var Template = this;
                image.hide = true;
                var formData = new FormData();
                formData.append('file', image.file, image.name);
                $http.post(uploadurl, formData, {
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: angular.identity
                }).success(function(data) {
                    if ($scope.callback) {
                        $scope.callback(data);
                    } else {
                        $scope.uploadStatus = "uploaded";
                        if ($scope.isMultiple) {
                            if ($scope.inObject) {
                                $scope.model.push({
                                    "image": data.data[0]
                                });
                            } else {
                                $scope.model.push(data.data[0]);
                            }
                        } else {
                            $scope.model = data.data[0];
                        }
                    }
                });
            };
        }
    };
});


firstapp.directive('onlyDigits', function() {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, element, attr, ctrl) {
            var digits;

            function inputValue(val) {
                if (val) {
                    if (attr.type == "text") {
                        digits = val.replace(/[^0-9\-\\]/g, '');
                    } else {
                        digits = val.replace(/[^0-9\-\\]/g, '');
                    }


                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return parseInt(digits, 10);
                }
                return undefined;
            }
            ctrl.$parsers.push(inputValue);
        }
    };
});

firstapp.filter('propsFilter', function() {
    return function(items, props) {
        var out = [];

        if (angular.isArray(items)) {
            items.forEach(function(item) {
                var itemMatches = false;

                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});

firstapp.directive('img', function($compile, $parse) {
    return {
        restrict: 'E',
        replace: false,
        link: function($scope, element, attrs) {
            var $element = $(element);
            if (!attrs.noloading) {
                $element.after("<img src='img/loading.gif' class='loading' />");
                var $loading = $element.next(".loading");
                $element.load(function() {
                    $loading.remove();
                    $(this).addClass("doneLoading");
                });
            } else {
                $($element).addClass("doneLoading");
            }
        }
    };
});

firstapp.directive('fancyboxBox', function($document) {
    return {
        restrict: 'EA',
        replace: false,
        link: function(scope, element, attr) {
            var $element = $(element);
            var target;
            if (attr.rel) {
                target = $("[rel='" + attr.rel + "']");
            } else {
                target = element;
            }

            target.fancybox({
                openEffect: 'fade',
                closeEffect: 'fade',
                closeBtn: true,
                helpers: {
                    media: {}
                }
            });
        }
    };
});

firstapp.directive('menuOptions', function($document) {
    return {
        restrict: 'C',
        replace: false,
        link: function(scope, element, attr) {
            var $element = $(element);
            $(element).on("click", function() {
                $(".side-header.opened-menu").toggleClass('slide-menu');
                $(".main-content").toggleClass('wide-content');
                $("footer").toggleClass('wide-footer');
                $(".menu-options").toggleClass('active');
            });

        }
    };
});

firstapp.filter('serverimage', function() {
    return function(input) {
        if (input) {
            return imgpath + input;
        } else {
            return "img/logo.png";
        }
    };
});

firstapp.filter('downloadImage', function() {
    return function(input) {
        if (input) {
            return adminurl + "download/" + input;
        } else {
            return "img/logo.png";
        }
    };
});

firstapp.directive('oI', function($document) {
    return {
        restrict: 'C',
        replace: false,
        link: function(scope, element, attr) {
            var $element = $(element);
            $element.click(function() {
                $element.parent().siblings().children("ul").slideUp();
                $element.parent().siblings().removeClass("active");
                $element.parent().children("ul").slideToggle();
                $element.parent().toggleClass("active");
                return false;
            });

        }
    };
});
firstapp.directive('slimscroll', function($document) {
    return {
        restrict: 'EA',
        replace: false,
        link: function(scope, element, attr) {
            var $element = $(element);
            $element.slimScroll({
                height: '400px',
                wheelStep: 10,
                size: '2px'
            });
        }
    };
});

firstapp.directive('addressForm', function($document) {
    return {
        templateUrl: 'views/directive/address-form.html',
        scope: {
            formData: "=ngModel",
            demoForm: "=ngValid"
        },
        restrict: 'EA',
        replace: false,
        controller: function($scope, NgMap, NavigationService) {

            $scope.map = {};
            $scope.change = function() {
                NgMap.getMap().then(function(map) {
                    var latLng = {
                        lat: map.markers[0].position.lat(),
                        lng: map.markers[0].position.lng()
                    };
                    _.assign($scope.formData, latLng);
                });
            };
            var LatLongi = 0;
            $scope.getLatLng = function(address) {

                NavigationService.getLatLng(address, ++LatLongi, function(data, i) {

                    if (i == LatLongi) {
                        $scope.formData = _.assign($scope.formData, data.results[0].geometry.location);
                    }
                });
                // $http.get("http://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCn9ypqFNxdXt9Zu2YqLcdD1Xdt2wNul9s&address="+address);
            };

        },
        // link: function($scope, element, attr, NgMap) {
        //     var $element = $(element);
        //     $scope.demoForm = {};
        //     $scope.demoForm.lat = 19.0760;
        //     $scope.demoForm.long = 72.8777;
        //     $scope.map = {};
        //     $scope.change = function() {
        //       NgMap.getMap().then(function(map) {
        //         console.log(map);
        //       });
        //
        //     };
        //
        // }
    };
});
var aa = {};
firstapp.directive('multipleSelect', function($document, $timeout) {
    return {
        templateUrl: 'views/directive/multiple-select.html',
        scope: {
            model: '=ngModel',
            api: "@api",
            name: "@name",
            required: "@required",
            filter: "@filter",
            ngName: "=ngName",
            create: "@ngCreate",

        },
        restrict: 'EA',
        replace: false,
        controller: 'MultipleSelectCtrl',
        link: function(scope, element, attr, NavigationService) {
            var $element = $(element);
            scope.activeKey = 0;
            scope.isRequired = true;
            if (scope.required === undefined) {
                scope.isRequired = false;
            }
            scope.typeselect = attr.typeselect;
            // $scope.searchNew()
            aa = $element;
            var maxItemLength = 40;
            var maxBoxLength = 200;
            $timeout(function() {

                $element.find(".typeText").keyup(function(event) {
                    var scrollTop = $element.find("ul.allOptions").scrollTop();
                    var optionLength = $element.find("ul.allOptions li").length;
                    if (event.keyCode == 40) {
                        scope.activeKey++;
                    } else if (event.keyCode == 38) {
                        scope.activeKey--;
                    } else if (event.keyCode == 13) {
                        $element.find("ul.allOptions li").eq(scope.activeKey).trigger("click");
                    }
                    if (scope.activeKey < 0) {
                        scope.activeKey = optionLength - 1;
                    }
                    if (scope.activeKey >= optionLength) {
                        scope.activeKey = 0;
                    }
                    var newScroll = -1;
                    var scrollVisibility = (scrollTop + maxBoxLength) - maxItemLength;
                    var currentItemPosition = scope.activeKey * maxItemLength;
                    if (currentItemPosition < scrollTop) {
                        newScroll = (maxItemLength * scope.activeKey);

                    } else if (currentItemPosition > scrollVisibility) {
                        newScroll = (maxItemLength * scope.activeKey);

                    }
                    if (newScroll != -1) {
                        $element.find("ul.allOptions").scrollTop(newScroll);
                    }

                    scope.$apply();
                });

            }, 100);

        }
    };
});

firstapp.filter('ageFilter', function() {
    function calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return function(birthdate) {
        return calculateAge(birthdate);
    };
});
firstapp.filter('capitalize', function() {
    return function(input, all) {
        var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
        return (!!input) ? input.replace(reg, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }) : '';
    };
});

firstapp.config(function($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});

firstapp.directive('alphaNumeric', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                var transformedInput = text.replace(/[^0-9a-zA-Z]/g, '');
                if (transformedInput !== text) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput; // or return Number(transformedInput)
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
