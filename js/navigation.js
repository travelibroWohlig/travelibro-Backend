var adminurl = "http://localhost:92/api/";
// var adminurl = "http://104.155.238.145/api/";
var imgurl = adminurl + "upload/";

var imgpath = imgurl + "readFile";
var uploadurl = imgurl;

var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function($http) {
    var navigation = [{
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
        getInsurer: function(callback) {
            $http.post(adminurl + 'customerCompany/getInsurer', {}).success(callback);
        },
        searchEmployee: function(formData, i, callback) {
            $http.post(adminurl + 'Employee/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchNatureLoss: function(formData, i, callback) {
            $http.post(adminurl + 'NatureLoss/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        getMembership: function(formData, i, callback) {
            $http.post(adminurl + 'Membership/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchInsuredOffice: function(formData, i, callback) {
            formData.segment = "Insured";
            $http.post(adminurl + 'Customer/getSegmented', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchInsurerOffice: function(formData, i, callback) {
            formData.segment = "Insurer";
            $http.post(adminurl + 'Customer/getSegmented', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchBroker: function(formData, i, callback) {
            formData.segment = "Broker";
            $http.post(adminurl + 'Customer/getSegmented', formData).success(function(data) {
                callback(data, i);
            });
        },
        getNature: function(formData, i, callback) {
            $http.post(adminurl + 'NatureLoss/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        saveNature: function(data, callback) {
            $http.post(adminurl + 'NatureLoss/save', data).success(callback);
        },
        saveOfficer: function(data, callback) {
            $http.post(adminurl + 'Officer/save', data).success(callback);
        },
        assignmentSave: function(data, callback) {
            $http.post(adminurl + 'Assignment/save', data).success(callback);
        },
        searchModel: function(model, formData, i, callback) {
            $http.post(adminurl + model + '/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        getDepartment: function(callback) {
            $http.post(adminurl + 'Department/search', {}).success(callback);
        },
        searchCustomer: function(formData, i, callback) {
            $http.post(adminurl + 'Customer/search', formData).success(function(data) {
                // _.each(data.data.results, function(n) {
                //     n.name = n.officeCode;
                // });
                callback(data, i);
            });
        },
        searchSegment: function(formData, i, callback) {
            $http.post(adminurl + 'Segment/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchInsured: function(formData, i, callback) {
            $http.post(adminurl + 'CustomerCompany/getInsured', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchInsurer: function(formData, i, callback) {
            $http.post(adminurl + 'CustomerCompany/getInsurer', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchInsurerCustomerCompany: function(formData, i, callback) {
            formData.segment = "Insurer";
            $http.post(adminurl + 'CustomerCompany/getSegmented', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchPolicyType: function(formData, i, callback) {
            $http.post(adminurl + 'PolicyType/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchCountry: function(formData, i, callback) {
            $http.post(adminurl + 'country/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchCustomerSegment: function(formData, i, callback) {
            $http.post(adminurl + 'CustomerSegment/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchCustomerCompany: function(formData, i, callback) {
            $http.post(adminurl + 'CustomerCompany/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchOffice: function(formData, i, callback) {
            $http.post(adminurl + 'office/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchOfficer: function(formData, i, callback) {
            $http.post(adminurl + 'officer/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchGetOfficer: function(formData, i, callback) {
            $http.post(adminurl + 'Customer/getOfficer', formData).success(function(data) {
                callback(data, i);
            });
        },
        getNatureLoss: function(formData, i, callback) {
            $http.post(adminurl + 'CauseLoss/getNatureLoss', formData).success(function(data) {
                callback(data, i);
            });
        },
        getPolicyDoc: function(formData, i, callback) {
            console.log(formData);
            $http.post(adminurl + 'PolicyDoc/getPolicyDoc', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchProduct: function(formData, i, callback) {
            $http.post(adminurl + 'Product/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchBranch: function(formData, i, callback) {
            $http.post(adminurl + 'branch/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchAppointedBy: function(formData, i, callback) {
            $http.post(adminurl + 'Employee/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchTypeOfOffice: function(formData, i, callback) {
            $http.post(adminurl + 'typeOfOffice/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchCompany: function(formData, i, callback) {
            $http.post(adminurl + 'company/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchCauseLoss: function(formData, i, callback) {
            $http.post(adminurl + 'CauseLoss/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchTypeOfClaim: function(formData, i, callback) {
            $http.post(adminurl + 'Claims/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchNatureOfSurvey: function(formData, i, callback) {
            $http.post(adminurl + 'SurveyCode/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchDepartment: function(formData, i, callback) {
            $http.post(adminurl + 'department/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchGrade: function(formData, i, callback) {
            $http.post(adminurl + 'grade/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchFunc: function(formData, i, callback) {
            $http.post(adminurl + 'func/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchCategory: function(formData, i, callback) {
            $http.post(adminurl + 'category/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchIndustry: function(formData, i, callback) {
            $http.post(adminurl + 'industry/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchBank: function(formData, i, callback) {
            $http.post(adminurl + 'bank/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchCurrency: function(formData, i, callback) {
            $http.post(adminurl + 'currencies/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        allSearch: function(api, formData, callback) {
            $http.post(adminurl + api, formData).success(function(data) {
                callback(data);
            });
        },
        countrySave: function(formData, callback) {
            $http.post(adminurl + 'country/save', formData).success(callback);
        },
        claimSave: function(formData, callback) {
            $http.post(adminurl + 'Claims/save', formData).success(callback);
        },
        modelSave: function(modal, formData, callback) {
            $http.post(adminurl + modal + '/save', formData).success(callback);
        },
        branchSave: function(formData, callback) {
            $http.post(adminurl + 'branch/save', formData).success(callback);
        },
        customerSegmentSave: function(formData, callback) {
            $http.post(adminurl + 'CustomerSegment/save', formData).success(callback);
        },
        getAllCountries: function(callback) {
            $http.post(adminurl + 'country/getAll', {}).success(callback);
        },
        getOneCountry: function(id, callback) {
            $http.post(adminurl + 'country/getOne', {
                _id: id
            }).success(callback);
        },
        getOneTypeOfOffice: function(id, callback) {
            $http.post(adminurl + 'TypeOfOffice/getOne', {
                _id: id
            }).success(callback);
        },
        getOneModel: function(model, id, callback) {
            console.log(id);
            $http.post(adminurl + model + '/getOne', {
                _id: id
            }).success(callback);
        },
        getOneBranch: function(id, callback) {
            $http.post(adminurl + 'branch/getOne', {
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
        deleteBranch: function(id, callback) {
            $http.post(adminurl + 'branch/delete', {
                _id: id
            }).success(callback);

        },
        deleteOffice: function(id, callback) {
            $http.post(adminurl + 'office/delete', {
                _id: id
            }).success(callback);

        },
        searchZone: function(formData, i, callback) {
            $http.post(adminurl + 'zone/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchState: function(formData, i, callback) {
            $http.post(adminurl + 'state/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchDistrict: function(formData, i, callback) {
            $http.post(adminurl + 'district/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        searchCity: function(formData, i, callback) {
            $http.post(adminurl + 'city/search', formData).success(function(data) {
                callback(data, i);
            });
        },
        zoneSave: function(formData, callback) {
            console.log(formData);
            $http.post(adminurl + 'zone/save', formData).success(callback);
        },
        getOneZone: function(id, callback) {
            $http.post(adminurl + 'zone/getOne', {
                "_id": id
            }).success(callback);
        },
        zoneEditSave: function(id, callback) {
            $http.post(adminurl + 'zone/saveData', {
                _id: id
            }).success(callback);
        },
        deleteZone: function(id, callback) {
            $http.post(adminurl + 'zone/delete', {
                "_id": id,
            }).success(callback);
        },


        getAllStates: function(callback) {
            $http.post(adminurl + 'state/getAll', {}).success(callback);
        },
        stateSave: function(formData, callback) {
            $http.post(adminurl + 'state/save', formData).success(callback);
        },
        getOneState: function(id, callback) {
            $http.post(adminurl + 'state/getOne', {
                "_id": id
            }).success(callback);
        },
        stateEditSave: function(formData, callback) {
            $http.post(adminurl + 'state/saveData', formData).success(callback);
        },
        deleteState: function(id, callback) {
            $http.post(adminurl + 'state/delete', {
                "_id": id,
            }).success(callback);
        },
        getAllDistricts: function(callback) {
            $http({
                url: adminurl + 'district/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        districtSave: function(formData, callback) {
            $http.post(adminurl + 'district/save', formData).success(callback);
        },
        getOneDistrict: function(id, callback) {
            $http.post(adminurl + 'district/getOne', {
                "_id": id
            }).success(callback);
        },
        districtEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'district/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteDistrict: function(id, callback) {
            $http.post(adminurl + 'district/delete', {
                "_id": id,
            }).success(callback);
        },
        getAllCurrencies: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'currencies/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        currencySave: function(formData, callback) {
            $http.post(adminurl + 'currencies/save', formData).success(callback);
        },
        getOneCurrency: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'currencies/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        currencyEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'currencies/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteCurrency: function(id, callback) {
            $http.post(adminurl + 'currencies/delete', {
                "_id": id,
            }).success(callback);
        },

        getAllCities: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'city/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        citySave: function(formData, callback) {
            $http.post(adminurl + 'city/save', formData).success(callback);
        },
        getOneCity: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'city/getOne',
                method: 'POST',
                withCredentials: true,
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
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteCity: function(id, callback) {
            $http.post(adminurl + 'city/delete', {
                _id: id
            }).success(callback);
        },



        getAllOffices: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'office/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        typeofofficeSave: function(formData, callback) {
            $http.post(adminurl + 'typeOfOffice/save', formData).success(callback);
        },
        getOneOffice: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'office/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        officeEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'office/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteTypeOfOffice: function(id, callback) {
            $http.post(adminurl + 'typeOfOffice/delete', {
                "_id": id,
            }).success(callback);
        },
        getAllTypeOfOffices: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'TypeOfOffice/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        officeSave: function(formData, callback) {
            $http.post(adminurl + 'office/save', formData).success(callback);
        },

        typeOfOfficeEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'TypeOfOffice/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        getAllDepartments: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'department/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        departmentSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'department/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneDepartment: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'department/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        departmentEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'department/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteDepartment: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'department/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },

        getAllUniqueTypes: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'UniqueTypes/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        uniquetypeSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'UniqueTypes/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneUniqueType: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'UniqueTypes/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        UniqueTypeEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'UniqueTypes/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteUniqueType: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'UniqueTypes/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },
        getAllCustomerSegments: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'CustomerSegment/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        customersegmentSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'CustomerSegment/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneCustomerSegment: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'CustomerSegment/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        CustomerSegmentEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'CustomerSegment/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteCustomerSegment: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'CustomerSegment/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },

        getAllPolicyTypes: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policyname/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        policynameSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policyname/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOnePolicyType: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policyname/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        PolicyTypeEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policyname/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deletePolicyType: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policyname/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },

        getAllPolicies: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policy/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        policySave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policy/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOnePolicy: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policy/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        PolicyEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policy/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deletePolicy: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policy/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },
        getAllPolicyDocs: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policydoc/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        policydocSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policydoc/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOnePolicyDoc: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policydoc/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        PolicyDocEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policydoc/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deletePolicyDoc: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policydoc/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },
        getAllIndustries: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'industry/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        industrySave: function(formData, callback) {
            $http.post(adminurl + 'industry/save', formData).success(callback);
        },
        getOneIndustry: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'industry/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        IndustryEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'industry/save',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteIndustry: function(id, callback) {
            $http.post(adminurl + 'industry/delete', {
                _id: id
            }).success(callback);
        },
        getAllCategories: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'category/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        categorySave: function(formData, callback) {
            $http.post(adminurl + 'category/save', formData).success(callback);
        },
        getOneCategory: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'category/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        CategoryEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'category/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteCategory: function(id, callback) {
            $http.post(adminurl + 'category/delete', {
                "_id": id,
            }).success(callback);
        },
        getAllFunc: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'func/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        funcSave: function(formData, callback) {
            $http.post(adminurl + 'func/save', formData).success(callback);
        },
        gradeSave: function(formData, callback) {
            $http.post(adminurl + 'grade/save', formData).success(callback);
        },
        getOneFunc: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'func/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        FuncEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'func/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteFunc: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'func/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },
        getAllCauseLoss: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'causeloss/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        causelossSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'causeloss/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneCauseLoss: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'causeloss/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        CauseLossEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'causeloss/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteCauseLoss: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'causeloss/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },
        getAllNatureLoss: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'natureloss/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        naturelossSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'natureloss/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneNatureLoss: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'natureloss/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        NatureLossEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'natureloss/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteNatureLoss: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'natureloss/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },

        getAllBusinessBranch: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'businessbranch/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        businessbranchSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'businessbranch/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneBusinessBranch: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'businessbranch/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        BusinessBranchEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'businessbranch/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteBusinessBranch: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'businessbranch/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },
        getAllMenus: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'menu/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        menuSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'menu/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneMenu: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'menu/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        menuEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'menu/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteMenu: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'menu/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },
        getAllRoles: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'role/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        roleSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'role/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneRole: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'role/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        roleEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'role/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteRole: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'role/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },
        deleteModel: function(model, id, callback) {
            $http.post(adminurl + model + '/delete', {
                "_id": id,
            }).success(callback);
        },
        getAllUsers: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'user/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        userSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'user/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneUser: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'user/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        userEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'user/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteUser: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'user/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },
        getAllCustomerCompanies: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'customerCompany/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        customerCompanySave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'customerCompany/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        companySave: function(formData, callback) {
            $http.post(adminurl + 'company/save', formData).success(callback);
        },
        getOneCustomerCompany: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'customerCompany/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        customerCompanyEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'customerCompany/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteCustomerCompany: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'customerCompany/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },


        getAllCompanies: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'company/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        customerSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'company/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneCompany: function(id, callback) {
            $http.post(adminurl + 'company/getOne', {
                "_id": id
            }).success(callback);
        },
        companyEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'company/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteCompany: function(id, callback) {
            $http.post(adminurl + 'company/delete', {
                "_id": id,
            }).success(callback);
        },

        getAllCustomers: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'customer/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },

        getOneCustomer: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'customer/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        customerEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'customer/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteCustomer: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'customer/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },
        getAllEmployees: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'employee/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        employeeSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'employee/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneEmployee: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'employee/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        employeeEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'employee/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteEmployee: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'employee/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },
        getAllSalvage: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'salvage/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        salvageSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'salvage/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneSalvage: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'salvage/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        salvageEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'salvage/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteSalvage: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'salvage/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },
        getAllProduct: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'product/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        productSave: function(formData, callback) {
            $http.post(adminurl + 'product/save', formData).success(callback);
        },
        getOneProduct: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'product/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        productEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'product/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteProduct: function(id, callback) {
            $http.post(adminurl + 'product/delete', {
                "_id": id,
            }).success(callback);
        },
        getOneBank: function(id, callback) {
            $http.post(adminurl + 'bank/getOne', {
                "_id": id
            }).success(callback);
        },
        bankSave: function(formData, callback) {
            $http.post(adminurl + 'bank/save', formData).success(callback);
        },
        deleteBank: function(id, callback) {
            $http.post(adminurl + 'bank/delete', {
                "_id": id,
            }).success(callback);
        },
        getLatLng: function(address, i, callback) {
            $http({
                url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyC62zlixVsjaq4zDaL4cefNCubjCgxkte4",
                method: 'GET',
                withCredentials: false,
            }).success(function(data) {
                callback(data, i);
            });
        }

    };
});
