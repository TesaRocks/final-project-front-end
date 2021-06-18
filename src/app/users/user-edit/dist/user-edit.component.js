"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserEditComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var user_actions_1 = require("../store/user.actions");
var user_selectors_1 = require("../store/user.selectors");
var error_message_1 = require("src/app/shared/error-message");
var UserEditComponent = /** @class */ (function () {
    function UserEditComponent(route, fb, store, router, dialog) {
        this.route = route;
        this.fb = fb;
        this.store = store;
        this.router = router;
        this.dialog = dialog;
        this.hide = true;
        this.editMode = false;
        this.formEditNew = this.fb.group({
            name: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(45)]],
            email: [
                '',
                [forms_1.Validators.required, forms_1.Validators.email, forms_1.Validators.maxLength(45)],
            ],
            password: [
                '',
                [forms_1.Validators.required, forms_1.Validators.minLength(6), forms_1.Validators.maxLength(6)],
            ]
        });
    }
    UserEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id = this.route.snapshot.params.id;
        this.editMode = this.id ? true : false;
        if (this.editMode) {
            this.store.dispatch(user_actions_1.loadUser.begin({ id: this.id }));
            this.store.select(user_selectors_1.selectUser).subscribe(function (user) {
                if (user !== null) {
                    var formUser = {
                        name: user.name,
                        email: user.email,
                        password: user.password
                    };
                    _this.formEditNew.setValue(formUser);
                }
            });
            this.loadUserPending$ = this.store.select(user_selectors_1.loadUserPending);
            this.error = this.store.select(user_selectors_1.error).subscribe(function (error) {
                if (error) {
                    var errorDialog = _this.dialog.open(error_message_1.ErrorMessage, {
                        data: { message: error.message }
                    });
                    errorDialog.afterClosed().subscribe(function () {
                        _this.router.navigate(['']);
                    });
                }
            });
        }
    };
    UserEditComponent.prototype.onSubmit = function () {
        var updatedOrNewUser = {
            id: this.id,
            name: this.formEditNew.value.name,
            email: this.formEditNew.value.email,
            password: this.formEditNew.value.password
        };
        if (this.editMode) {
            var update = {
                id: this.id,
                changes: updatedOrNewUser
            };
            this.store.dispatch(user_actions_1.updateUser.success({ user: update }));
            this.updatePending$ = this.store.select(user_selectors_1.updateUserPending);
        }
        else {
            this.store.dispatch(user_actions_1.addUser.begin({ user: updatedOrNewUser }));
            this.addUserPending$ = this.store.select(user_selectors_1.addUserPending);
        }
    };
    UserEditComponent.prototype.hasError = function (inputName, errorType) {
        var _a;
        return (_a = this.formEditNew.get(inputName)) === null || _a === void 0 ? void 0 : _a.hasError(errorType);
    };
    UserEditComponent.prototype.ngOnDestroy = function () {
        if (this.editMode) {
            this.error.unsubscribe();
        }
    };
    UserEditComponent = __decorate([
        core_1.Component({
            selector: 'app-user-edit',
            templateUrl: './user-edit.component.html',
            styleUrls: ['./user-edit.component.scss']
        })
    ], UserEditComponent);
    return UserEditComponent;
}());
exports.UserEditComponent = UserEditComponent;
