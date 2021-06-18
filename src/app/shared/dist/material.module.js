"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MaterialModule = void 0;
var core_1 = require("@angular/core");
var toolbar_1 = require("@angular/material/toolbar");
var icon_1 = require("@angular/material/icon");
var button_1 = require("@angular/material/button");
var table_1 = require("@angular/material/table");
var dialog_1 = require("@angular/material/dialog");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var menu_1 = require("@angular/material/menu");
var list_1 = require("@angular/material/list");
var tooltip_1 = require("@angular/material/tooltip");
var sidenav_1 = require("@angular/material/sidenav");
var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = __decorate([
        core_1.NgModule({
            imports: [
                toolbar_1.MatToolbarModule,
                icon_1.MatIconModule,
                button_1.MatButtonModule,
                table_1.MatTableModule,
                dialog_1.MatDialogModule,
                progress_spinner_1.MatProgressSpinnerModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                menu_1.MatMenuModule,
                tooltip_1.MatTooltipModule,
                list_1.MatListModule,
                sidenav_1.MatSidenavModule,
            ],
            exports: [
                toolbar_1.MatToolbarModule,
                icon_1.MatIconModule,
                button_1.MatButtonModule,
                table_1.MatTableModule,
                dialog_1.MatDialogModule,
                progress_spinner_1.MatProgressSpinnerModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                menu_1.MatMenuModule,
                tooltip_1.MatTooltipModule,
                list_1.MatListModule,
                sidenav_1.MatSidenavModule,
            ]
        })
    ], MaterialModule);
    return MaterialModule;
}());
exports.MaterialModule = MaterialModule;
