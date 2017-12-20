webpackJsonp([0],{

/***/ 110:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 110;

/***/ }),

/***/ 151:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 151;

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Api; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Api is a generic REST Api handler. Set your API url first.
 */
var Api = (function () {
    function Api(http, alertCtrl, loadingController) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingController = loadingController;
        this.ip = 'http://10.1.50.118:8765';
        this.urlLogin = this.ip + '/mobile-webconsole/apps/';
        this.urlTransaction = this.ip + '/mobile-webconsole/apps/1/pbTransactionAdapter/';
        this.urlNonTransaction = this.ip + '/mobile-webconsole/apps/1/pbNonFinancialAdapter/';
        this.token = '';
        this.metadata = {
            'datetime': '2017-10-06T08:29:47.639Z',
            'deviceId': '',
            'devicePlatform': '',
            'deviceOSVersion': '',
            'deviceType': '',
            'latitude': '',
            'longitude': '',
            'appId': '1',
            'appVersion': '2.0'
        };
    }
    // loading = this.loadingController.create({
    //   content: `
    //     <div class="custom-spinner-container">
    //       <div class="custom-spinner-box"></div>
    //     </div>`,
    // });
    Api.prototype.postBase = function (url, endpoint, body, reqOpts) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log(body);
            if (body == undefined) {
                body = {};
            }
            console.log(body);
            var request = {
                'metadata': _this.metadata,
                'body': body
            };
            reqOpts = {
                'headers': {
                    'x-auth-token': _this.token
                }
            };
            _this.loadingShow();
            return _this.http.post(url + '/' + endpoint, request, reqOpts).subscribe(function (data) {
                var responseWrapper = {
                    code: "",
                    status: "",
                    msg: "",
                    body: {}
                };
                var dataa = data.headers;
                _this.token = dataa.get('x-auth-token');
                if (data.status == 200) {
                    var dataConverted = data.json();
                    var bodyConverted = dataConverted['body'];
                    if (bodyConverted.hasOwnProperty("Fault")) {
                        responseWrapper.msg = bodyConverted.Fault.faultstring.content._text;
                        if (responseWrapper.msg != null) {
                            var codee = _this.getErrorCode(responseWrapper.msg); //get 4 digit error code
                            var msge = _this.errorCodeControl(responseWrapper.msg); //call error code controller
                            responseWrapper.msg = msge;
                            responseWrapper.code = codee;
                            responseWrapper.status = "0";
                            //this.loading.dismiss();
                            _this.errorAlert(responseWrapper.msg);
                            return;
                        }
                        else {
                            var codei = _this.getErrorCode(responseWrapper.msg); //get 4 digit error code
                            var msgi = _this.errorCodeControl(responseWrapper.msg); //call error code controller
                            responseWrapper.msg = msgi;
                            responseWrapper.code = codei;
                            responseWrapper.status = "0";
                            _this.errorAlert(responseWrapper.msg);
                            // this.loading.dismiss(); 
                            reject(responseWrapper);
                            return;
                        }
                    }
                    else {
                        ;
                        // this.loading.dismiss();
                        resolve(bodyConverted);
                    }
                }
                else {
                }
            }, function (error) {
                reject(null);
            });
        });
    };
    Api.prototype.getErrorCode = function (msg) {
        var code = msg.substring(0, 4);
        if (!Number(code)) {
            code = msg;
        }
        return code;
    };
    Api.prototype.errorCodeControl = function (msg) {
        var code = this.getErrorCode(msg);
        return code;
    };
    Api.prototype.errorAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: msg,
            buttons: ['Ok']
        });
        alert.present();
    };
    Api.prototype.loadingShow = function () {
        //  this.loading.present();
    };
    Api.prototype.loadingHide = function () {
        //   this.loading.dismiss();
    };
    Api.prototype.postLogin = function (endpoint, body, reqOpts) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var request = {
                'metadata': _this.metadata,
                'body': body
            };
            _this.http.post(_this.urlLogin + '/' + endpoint, request, reqOpts).subscribe(function (data) {
                var dataa = data.headers;
                _this.token = dataa.get('x-auth-token');
                if (data.status == 200) {
                    var contentResponse = data.json();
                    var bodyJ = contentResponse.body;
                    var code = contentResponse.status['code'];
                    if (code == '200') {
                        resolve(bodyJ);
                    }
                    else {
                        alert(contentResponse.status['description']);
                        reject(data.status);
                    }
                }
                else {
                    reject(data.status);
                }
            }, function (error) {
                reject(null);
            });
        });
    };
    Api.prototype.postTransaction = function (endpoint, body, reqOpts) {
        var request = {
            'metadata': this.metadata,
            'body': body
        };
        reqOpts = {
            'headers': {
                'x-auth-token': this.token
            }
        };
        return this.http.post(this.urlTransaction + '/' + endpoint, request, reqOpts)
            .subscribe(function (data) {
        });
    };
    Api.prototype.postNonTransaction = function (endpoint, body, reqOpts) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (body == undefined) {
                body = {};
            }
            var request = {
                'metadata': _this.metadata,
                'body': body
            };
            reqOpts = {
                'headers': {
                    'x-auth-token': _this.token
                }
            };
            return _this.http.post(_this.urlNonTransaction + '/' + endpoint, request, reqOpts).subscribe(function (data) {
                var dataa = data.headers;
                _this.token = dataa.get('x-auth-token');
                if (data.status == 200) {
                    var contentResponse = data.json();
                    var bodyJ = contentResponse.body;
                    var code = contentResponse.status['code'];
                    if (code == '200') {
                        resolve(bodyJ);
                    }
                    else {
                        alert(contentResponse.status['description']);
                        reject(null);
                    }
                }
                else {
                }
            }, function (error) {
                reject(null);
            });
        });
    };
    Api.prototype.put = function (endpoint, body, reqOpts) {
        return this.http.put(this.urlLogin + '/' + endpoint, body, reqOpts);
    };
    Api.prototype.delete = function (endpoint, reqOpts) {
        return this.http.delete(this.urlLogin + '/' + endpoint, reqOpts);
    };
    Api.prototype.patch = function (endpoint, body, reqOpts) {
        return this.http.put(this.urlLogin + '/' + endpoint, body, reqOpts);
    };
    return Api;
}());
Api = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* LoadingController */]])
], Api);

//# sourceMappingURL=api.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(197);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
        this.labels = 'L O G I N';
    }
    HomePage.prototype.toLogin = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */], 'sukma cantik');
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"D:\Project\ionic3\loginBase\src\pages\home\home.html"*/'<ion-content class="backgroundimg">\n\n  <div class="textLogo"> POCKET BANK<br></div>\n  <div class="textVersion"> Version 3.0 </div>\n  <button class="loginButton" (click)="toLogin()">\n    {{labels}}\n  </button>\n\n</ion-content>\n'/*ion-inline-end:"D:\Project\ionic3\loginBase\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_providers__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboard_dashboard__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = (function () {
    function LoginPage(navCtrl, api, nonfin, formBuilder) {
        this.navCtrl = navCtrl;
        this.api = api;
        this.nonfin = nonfin;
        this.formBuilder = formBuilder;
        this.loginModel = {};
        this.loginForm = this.formBuilder.group({
            'username': ['', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(4)]],
            'password': ['', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(5)]]
        });
    }
    ;
    LoginPage.prototype.doLogin = function (form, loginModel) {
        var _this = this;
        if (this.loginForm.dirty && this.loginForm.valid) {
            console.log(loginModel);
            var postParams = {
                'username': loginModel.username,
                'password': loginModel.password,
                'channel': 'MOB',
                'latitude': '-6.2596093',
                'longitude': '106.663553'
            };
            this.nonfin.login('pocket/login', postParams).then(function (value) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__dashboard_dashboard__["a" /* DashboardPage */], { loginData: value });
            }, function (reason) {
                console.log(reason);
                return false;
            });
        }
    };
    LoginPage.prototype.testInvoke = function () {
        this.api.postNonTransaction('getCompanyList');
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"D:\Project\ionic3\loginBase\src\pages\login\login.html"*/'<ion-content class="backgroundPink">\n    <div class="textLogo">Login<br></div>\n    <div class="textVersion">Enter your login Id and password</div>\n  <div class="formLogin">\n      <form [formGroup]="loginForm" (submit)="doLogin(form, loginModel)">\n        <div class="inputLogin">\n          <input formControlName="username" class="inputField" type="text" [(ngModel)]="loginModel.username" name="username">\n        </div>\n        <div class="inputLogin">\n          <input formControlName="password" class="inputField" type="password" [(ngModel)]="loginModel.password" name="password">\n        </div>\n        <button class="submitButton" [disabled]="!loginForm.valid"> L O G I N </button>\n      </form>\n  </div>\n</ion-content>\n'/*ion-inline-end:"D:\Project\ionic3\loginBase\src\pages\login\login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_providers__["a" /* Api */],
        __WEBPACK_IMPORTED_MODULE_2__providers_providers__["b" /* Nonfin */],
        __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_providers__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__account_account__ = __webpack_require__(199);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var DashboardPage = (function () {
    function DashboardPage(navCtrl, api, navParams, nonfin, alertCtrl) {
        this.navCtrl = navCtrl;
        this.api = api;
        this.nonfin = nonfin;
        this.alertCtrl = alertCtrl;
        this.bankAccount = {};
        this.bankAccountModel = {};
        this.loginData = {};
        this.loginData = navParams.get('loginData');
    }
    DashboardPage.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Information',
            subTitle: 'Sorry, Coming soon.',
            buttons: ['Dismiss']
        });
        alert.present();
    };
    DashboardPage.prototype.goAccount = function () {
        var _this = this;
        // this.navCtrl.push(AccountPage,{loginData:this.loginData});
        this.nonfin.getListAccounts('getListAccounts').then(function (value) {
            console.log(value);
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__account_account__["a" /* AccountPage */], { loginData: _this.loginData, listAccount: value });
        }, function (reason) {
            console.log(reason);
        });
    };
    return DashboardPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Slides */])
], DashboardPage.prototype, "slides", void 0);
DashboardPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-dashboard',template:/*ion-inline-start:"D:\Project\ionic3\loginBase\src\pages\dashboard\dashboard.html"*/'<page-header> </page-header>\n<ion-content class="contentDash">\n  <div class="headerDash">\n        <div class="headerProfile">\n            <div class=""> <img class="imgProfile" src="../assets/icon/profile.png"> </div>\n            <div class="mt10"> Hello, {{loginData.customer.username}} !</div>            \n            <div class="headerNote"> Banking system in your pocket</div>\n        </div>\n  </div>\n  <div class="bodyDash"> \n    <div class="row"> \n        <ion-slides>\n            <ion-slide>\n                <div><img class="imgSlider" src="../assets/img/bg-promo2.png"></div>\n            </ion-slide>\n            <ion-slide>\n                <div><img class="imgSlider" src="../assets/img/bg-promo.png"></div>\n            </ion-slide>\n            <ion-slide>\n                <div><img class="imgSlider" src="../assets/img/bg-promo1.png"></div>\n            </ion-slide>\n        </ion-slides>\n    </div>\n    <div class="row"> \n        <div class="iconContent col" type="button" (click)="goAccount()">\n            <div class="iconLogo"> <ion-icon ios="ion-ios-contact-outline" md="ios-contact-outline"></ion-icon> </div> \n            <div class="iconLabel"> Account</div>\n        </div> \n        <div class="iconContent col lrBorder">\n            <div class="iconLogo"> <ion-icon ios="ios-cash-outline" md="ios-cash-outline"></ion-icon> </div> \n            <div class="iconLabel"> Payment </div>\n        </div> \n        <div class="iconContent col">\n            <div class="iconLogo"> <ion-icon ios="ios-card" md="ios-card"></ion-icon> </div> \n            <div class="iconLabel"> Transfer </div>\n        </div>\n    </div>\n    <div class="row"> \n            <div class="iconContent col tbBorder">\n                <div class="iconLogo "> <ion-icon ios="ios-pricetags-outline" md="ios-pricetags-outline"></ion-icon> </div> \n                <div class="iconLabel"> Buy </div>\n            </div> \n            <div class="iconContent col allborder">\n                <div class="iconLogo"> <ion-icon ios="ios-star-outline" md="ios-star-outline"></ion-icon> </div> \n                <div class="iconLabel"> Favorite</div>\n            </div> \n            <div class="iconContent col tbBorder">\n                <div class="iconLogo"> <ion-icon ios="ios-briefcase-outline" md="ios-briefcase-outline"></ion-icon> </div> \n                <div class="iconLabel"> Apply</div>\n            </div>\n        </div>\n        <div class="row"> \n                <div class="iconContent col">\n                    <div class="iconLogo"> <ion-icon ios="ios-hammer-outline" md="ios-hammer-outline"></ion-icon> </div> \n                    <div class="iconLabel"> Configure </div>\n                </div> \n                <div class="iconContent col lrBorder" >\n                    <div class="iconLogo"> <ion-icon ios="ios-information-circle-outline" md="ios-information-circle-outline"></ion-icon> </div> \n                    <div class="iconLabel"> About </div>\n                </div> \n                <div class="iconContent col">\n                    <div class="iconLogo"> <ion-icon ios="ios-settings-outline" md="ios-settings-outline"></ion-icon> </div> \n                    <div class="iconLabel"> Setting </div>\n                </div>\n            </div>\n  </div>\n</ion-content>\n<page-footer> </page-footer>'/*ion-inline-end:"D:\Project\ionic3\loginBase\src\pages\dashboard\dashboard.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_providers__["a" /* Api */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_providers__["b" /* Nonfin */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], DashboardPage);

//# sourceMappingURL=dashboard.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__accountCode_accountCode__ = __webpack_require__(200);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AccountPage = (function () {
    function AccountPage(navParams, navCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.loginData = {};
        this.listAccount = {};
        this.customer = {};
        this.bankAccounts = [];
        this.loginData = navParams.get('loginData');
        this.customer = this.loginData['customer'];
        this.listAccount = navParams.get('listAccount');
        this.bankAccounts = this.listAccount['bankAccount'];
    }
    AccountPage.prototype.toQR = function () {
        console.log(this.customer);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__accountCode_accountCode__["a" /* AccountCodePage */], { loginData: this.customer });
    };
    return AccountPage;
}());
AccountPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-account',template:/*ion-inline-start:"D:\Project\ionic3\loginBase\src\pages\account\account.html"*/'<page-header-menu> </page-header-menu>\n<ion-content class="contentDash">\n  <div class="headerProfile">\n      \n  </div>\n  <div class="bodyDash"> \n    <div class="boxinfo row">\n      <div class="w25"> <img class="imgAccount" src="../assets/icon/profile.png"> </div>\n      <div class="w50 centerPosition"> \n        <div class="label"> {{customer.username}} </div> <br>\n        <div class="labelChild"> {{customer.reserved01}} | {{customer.firstName}}  {{customer.lastName}}</div>\n      </div>\n      <div class="iconMiddle" type="button" (click)="toQR()"> <ion-icon ios="ios-keypad-outline" md="ios-keypad-outline"></ion-icon> </div>\n    </div>\n    <div class="contentAccount"> \n      <div class="labelBold"> Your list account </div>\n      <div class="listAccount" *ngFor="let bankAccount of bankAccounts">\n        <div class="boxList row">\n          <div class="w80 centerPosition">\n            <div class="labelChild">  {{bankAccount.accountHolderName}}</div>\n            <div class="labelChild">  {{bankAccount.accountNumber}}</div>\n          </div>\n          <div class="iconMiddle">\n              <ion-icon ios="ios-play-outline" md="ios-play-outline"></ion-icon>\n          </div>\n        </div>\n      </div> \n    </div>\n  </div>\n</ion-content>\n<page-footer> </page-footer>\n\n'/*ion-inline-end:"D:\Project\ionic3\loginBase\src\pages\account\account.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], AccountPage);

//# sourceMappingURL=account.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountCodePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_providers__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AccountCodePage = (function () {
    function AccountCodePage(navCtrl, api, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.api = api;
        this.alertCtrl = alertCtrl;
        this.loginData = {};
        this.qr = "";
        var id = navParams.get('id');
        var name = navParams.get('name');
        console.log(id);
        console.log(name);
        this.loginData = navParams.get('loginData');
        this.qr = this.loginData['reserved01'];
        console.log(this.qr);
    }
    return AccountCodePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Slides */])
], AccountCodePage.prototype, "slides", void 0);
AccountCodePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-account-code',template:/*ion-inline-start:"D:\Project\ionic3\loginBase\src\pages\accountCode\accountCode.html"*/'<page-header-menu> </page-header-menu>\n<ion-content class="contentDash">\n  <div class="headerProfile">\n      \n  </div>\n  <div class="bodyDash"> \n    <div class="boxinfo row">\n      <div class="w25"> <img class="imgAccount" src="../assets/icon/profile.png"> </div>\n      <div class="w50 centerPosition"> \n        <div class="label"> CIF : {{qr}} </div>\n      </div>\n    </div>\n    <div class="contentAccount"> \n      <div>\n        <qr-code [value]="qr" [size]="350"></qr-code>\n      </div>\n    </div>\n  </div>\n</ion-content>\n<page-footer> </page-footer>\n\n'/*ion-inline-end:"D:\Project\ionic3\loginBase\src\pages\accountCode\accountCode.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_providers__["a" /* Api */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], AccountCodePage);

//# sourceMappingURL=accountCode.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OurLocationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(195);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OurLocationPage = (function () {
    function OurLocationPage(navCtrl, geolocation) {
        this.navCtrl = navCtrl;
        this.geolocation = geolocation;
    }
    OurLocationPage.prototype.ionViewDidLoad = function () {
        this.loadMap();
    };
    OurLocationPage.prototype.loadMap = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (position) {
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            _this.map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
        }, function (err) {
            console.log(err);
        });
    };
    return OurLocationPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('map'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], OurLocationPage.prototype, "mapElement", void 0);
OurLocationPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-our-location',template:/*ion-inline-start:"D:\Project\ionic3\loginBase\src\pages\ourLocation\ourLocation.html"*/'<ion-header>\n    <ion-navbar>\n      <ion-title>\n        Map\n      </ion-title>\n      <ion-buttons end>\n        <button ion-button (click)="addMarker()"><ion-icon name="add"></ion-icon>Add Marker</button>\n      </ion-buttons> \n    </ion-navbar>\n  </ion-header>\n   \n  <ion-content>\n    <div #map id="map"></div> \n  </ion-content>'/*ion-inline-end:"D:\Project\ionic3\loginBase\src\pages\ourLocation\ourLocation.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]])
], OurLocationPage);

//# sourceMappingURL=ourLocation.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(221);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_api__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_nonfin__ = __webpack_require__(270);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__api_api__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__service_nonfin__["a"]; });



//# sourceMappingURL=providers.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_providers__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__library_globalVariable_globalVariable__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angular2_qrcode__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_component__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_home_home__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_login_login__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_dashboard_dashboard__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_account_account__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_header_header__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_headerMenu_headerMenu__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_footer_footer__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_accountCode_accountCode__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_ourLocation_ourLocation__ = __webpack_require__(201);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_dashboard_dashboard__["a" /* DashboardPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_account_account__["a" /* AccountPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_header_header__["a" /* HeaderPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_footer_footer__["a" /* FooterPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_headerMenu_headerMenu__["a" /* HeaderMenuPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_accountCode_accountCode__["a" /* AccountCodePage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_ourLocation_ourLocation__["a" /* OurLocationPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_7__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_8_angular2_qrcode__["a" /* QRCodeModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */], {}, {
                links: []
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_dashboard_dashboard__["a" /* DashboardPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_account_account__["a" /* AccountPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_header_header__["a" /* HeaderPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_footer_footer__["a" /* FooterPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_headerMenu_headerMenu__["a" /* HeaderMenuPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_accountCode_accountCode__["a" /* AccountCodePage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_ourLocation_ourLocation__["a" /* OurLocationPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__providers_providers__["a" /* Api */],
            __WEBPACK_IMPORTED_MODULE_5__providers_providers__["b" /* Nonfin */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_6__library_globalVariable_globalVariable__["a" /* GlobalVariable */],
            __WEBPACK_IMPORTED_MODULE_7__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__["a" /* Geolocation */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Nonfin; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_api__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Api is a generic REST Api handler. Set your API url first.
 */
var Nonfin = (function () {
    function Nonfin(http, api) {
        this.http = http;
        this.api = api;
        this.ip = 'http://10.1.50.118:8765';
        this.urlLogin = this.ip + '/mobile-webconsole/apps/';
        this.urlTransaction = this.ip + '/mobile-webconsole/apps/1/pbTransactionAdapter/';
        this.urlNonTransaction = this.ip + '/mobile-webconsole/apps/1/pbNonFinancialAdapter/';
        this.token = '';
        this.metadata = {
            'datetime': '2017-10-06T08:29:47.639Z',
            'deviceId': '',
            'devicePlatform': '',
            'deviceOSVersion': '',
            'deviceType': '',
            'latitude': '',
            'longitude': '',
            'appId': '1',
            'appVersion': '2.0'
        };
    }
    Nonfin.prototype.pushArray = function (obj) {
        var isArr = obj instanceof Array;
        if (!isArr) {
            return [obj];
        }
        else if (obj != null) {
            return obj;
        }
        else {
            return null;
        }
    };
    Nonfin.prototype.login = function (endpoint, body, reqOpts) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var response = {};
            _this.api.postBase(_this.urlLogin, endpoint, body, reqOpts).then(function (value) {
                console.log(value);
                response = value;
                resolve(response);
            }, function (reason) {
                reject(reason);
            });
        });
    };
    Nonfin.prototype.getListAccounts = function (endpoint, body, reqOpts) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var response = { bankAccount: [] };
            _this.api.postBase(_this.urlNonTransaction, endpoint, body, reqOpts).then(function (value) {
                var getListAccountResponse = value['GetListAccountResponse'];
                console.log(getListAccountResponse);
                try {
                    if (getListAccountResponse.hasOwnProperty("BankAccount")) {
                        var bankAccountResponse = getListAccountResponse['BankAccount'];
                        var bankAccount = _this.pushArray(bankAccountResponse);
                        bankAccount.forEach(function (element) {
                            response.bankAccount.push({
                                accountHolderName: (typeof element['accountHolderName'] == 'undefined' ? null : element['accountHolderName']['_text']),
                                accountNumber: (typeof element['accountNumber'] == 'undefined' ? null : element['accountNumber']['_text']),
                                accountStatus: (typeof element['accountStatus'] == 'undefined' ? null : element['accountStatus']['_text']),
                                amount: (typeof element['amount'] == 'undefined' ? null : element['amount']['_text']),
                                branchCode: (typeof element['branchCode'] == 'undefined' ? null : element['branchCode']['_text']),
                                customerId: (typeof element['customerId'] == 'undefined' ? null : element['customerId']['_text']),
                                defaultAccount: (typeof element['defaultAccount'] == 'undefined' ? null : element['defaultAccount']['_text']),
                                id: (typeof element['id'] == 'undefined' ? null : element['id']['_text']),
                                isDefaultInAccount: (typeof element['isDefaultInAccount'] == 'undefined' ? null : element['isDefaultInAccount']['_text']),
                                isDefaultOutAccount: (typeof element['isDefaultOutAccount'] == 'undefined' ? null : element['isDefaultOutAccount']['_text']),
                                nickname: (typeof element['nickname'] == 'undefined' ? null : element['nickname']['_text']),
                                productName: (typeof element['productName'] == 'undefined' ? null : element['productName']['_text']),
                                reference: (typeof element['reference'] == 'undefined' ? null : element['reference']['_text']),
                                systemId: (typeof element['systemId'] == 'undefined' ? null : element['systemId']['_text']),
                            });
                        });
                        console.log(response);
                        resolve(response);
                    }
                }
                catch (error) {
                }
            }, function (reason) {
                reject(reason);
            });
        });
    };
    return Nonfin;
}());
Nonfin = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_2__api_api__["a" /* Api */]])
], Nonfin);

//# sourceMappingURL=nonfin.js.map

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalVariable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var GlobalVariable = (function () {
    function GlobalVariable() {
        this.menuName = "menu";
    }
    return GlobalVariable;
}());
GlobalVariable = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
], GlobalVariable);

//# sourceMappingURL=globalVariable.js.map

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(196);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"D:\Project\ionic3\loginBase\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"D:\Project\ionic3\loginBase\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_providers__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HeaderPage = (function () {
    function HeaderPage(navCtrl, api, alertCtrl) {
        this.navCtrl = navCtrl;
        this.api = api;
        this.alertCtrl = alertCtrl;
        this.loginData = {};
    }
    HeaderPage.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Information',
            subTitle: 'Sorry, Coming soon.',
            buttons: ['Dismiss']
        });
        alert.present();
    };
    return HeaderPage;
}());
HeaderPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-header',template:/*ion-inline-start:"D:\Project\ionic3\loginBase\src\pages\header\header.html"*/'<div> \n    <div class="row headermenu">\n        <div class="w15" type="button" (click)="showAlert()"> <img src="../assets/icon/i-menu.png" height="20px" width="20px"> </div>\n        <div class="w70"> Dashboard </div>\n        <div class="w15" type="button" (click)="showAlert()"> <img src="../assets/icon/i-seacrh.png" height="20px" width="20px"> </div>\n    </div>\n</div>'/*ion-inline-end:"D:\Project\ionic3\loginBase\src\pages\header\header.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_providers__["a" /* Api */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], HeaderPage);

//# sourceMappingURL=header.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderMenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HeaderMenuPage = (function () {
    function HeaderMenuPage(alertCtrl, navCtrl) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
    }
    HeaderMenuPage.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Information',
            subTitle: 'Sorry, Coming soon.',
            buttons: ['Dismiss']
        });
        alert.present();
    };
    HeaderMenuPage.prototype.backbutton = function () {
        this.navCtrl.pop();
    };
    return HeaderMenuPage;
}());
HeaderMenuPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-header-menu',template:/*ion-inline-start:"D:\Project\ionic3\loginBase\src\pages\headerMenu\headerMenu.html"*/'<div> \n    <div class="row headermenu">\n        <div class="w15" type="button" (click)="backbutton()"> <img src="../assets/icon/i-back.png" height="20px" width="20px"> </div>\n        <div class="w70"> {{menu}} </div>\n        <div class="w15" type="button" (click)="showAlert()"> <img src="../assets/icon/i-seacrh.png" height="20px" width="20px"> </div>\n    </div>\n</div>'/*ion-inline-end:"D:\Project\ionic3\loginBase\src\pages\headerMenu\headerMenu.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], HeaderMenuPage);

//# sourceMappingURL=headerMenu.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_providers__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ourLocation_ourLocation__ = __webpack_require__(201);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FooterPage = (function () {
    function FooterPage(navCtrl, api, alertCtrl) {
        this.navCtrl = navCtrl;
        this.api = api;
        this.alertCtrl = alertCtrl;
    }
    FooterPage.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Information',
            subTitle: 'Sorry, Coming soon.',
            buttons: ['Dismiss']
        });
        alert.present();
    };
    FooterPage.prototype.toLocation = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__ourLocation_ourLocation__["a" /* OurLocationPage */], {});
    };
    return FooterPage;
}());
FooterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-footer',template:/*ion-inline-start:"D:\Project\ionic3\loginBase\src\pages\footer\footer.html"*/'<div class="footerDashboard row"> \n        <div class="iconFooter" type="button" (click)="toLocation()"> <ion-icon ios="ios-navigate-outline" md="md-navigate"></ion-icon> </div>\n        <div class="iconFooter" type="button" (click)="showAlert()"> <ion-icon ios="ios-settings" md="md-settings"></ion-icon> </div>\n        <div class="iconFooter" type="button" (click)="toHome()"> <ion-icon ios="ios-apps" md="md-apps"></ion-icon> </div>\n        <div class="iconFooter" type="button" (click)="showAlert()"> <ion-icon ios="ios-notifications" md="md-notifications"></ion-icon> </div>\n        <div class="iconFooter" type="button" (click)="showAlert()"> <ion-icon ios="ios-calendar" md="md-calendar"></ion-icon> </div>\n      </div>'/*ion-inline-end:"D:\Project\ionic3\loginBase\src\pages\footer\footer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_providers__["a" /* Api */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], FooterPage);

//# sourceMappingURL=footer.js.map

/***/ })

},[202]);
//# sourceMappingURL=main.js.map