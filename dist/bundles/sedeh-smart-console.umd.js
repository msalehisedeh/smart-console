(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@sedeh/smart-console', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = global || self, factory((global.sedeh = global.sedeh || {}, global.sedeh['smart-console'] = {}), global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    var SmartConsoleService = /** @class */ (function () {
        function SmartConsoleService() {
            this.defaultLog = console.log;
            this.defaultInfo = console.info;
            this.defaultWarn = console.warn;
            this.defaultError = console.error;
            this.defaultTable = console.table;
            this.defaultTrace = console.trace;
            this.defaultAssert = console.assert;
            this.defaultException = console.exception;
            this.defaultDebug = console.debug;
            this.output = new core.EventEmitter();
            this.watchList = {};
        }
        SmartConsoleService.prototype._argsToString = function (args) {
            var result = [];
            args.map(function (arg) {
                if (typeof arg === 'object') {
                    try {
                        result.push(JSON.stringify(arg));
                    }
                    catch (e) {
                        if (arg.message) {
                            result.push(arg.message);
                        }
                        else {
                            result.push(arg);
                        }
                    }
                }
                else {
                    result.push(arg);
                }
            });
            return result.join(',');
        };
        SmartConsoleService.prototype._suppressed = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var result = false;
            if (this.options.suppress) {
                var x_1 = this._argsToString(args);
                this.options.suppress.map(function (item) {
                    if (x_1.indexOf(item) > -1) {
                        result = true;
                    }
                });
            }
            return result;
        };
        SmartConsoleService.prototype._filtered = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var result = !this.options.filter || this.options.filter.length === 0;
            if (this.options.filter) {
                var x_2 = this._argsToString(args);
                this.options.filter.map(function (item) {
                    if (x_2.indexOf(item) > -1) {
                        result = true;
                    }
                });
            }
            return result;
        };
        SmartConsoleService.prototype._getStack = function () {
            // this method purpose is only to fix IE issue. 
            // in IE, new Error().stack  will be undefined
            // unless it is caugth in try block statement.
            var stack = '';
            try {
                throw new Error('getStack');
            }
            catch (e) {
                stack = e.stack;
                stack = stack.indexOf('\r') > 0 ? stack.indexOf('\r') : stack.split('\n');
                stack = stack[4];
            }
            return stack;
        };
        SmartConsoleService.prototype._blocked = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var result = false;
            if (this.options.blockCaller) {
                var stack_1 = this._getStack();
                this.options.blockCaller.map(function (item) {
                    if (stack_1.indexOf(item) > -1) {
                        result = true;
                    }
                });
            }
            return result;
        };
        SmartConsoleService.prototype._throttle = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var result = false;
            if (this.options.throttleOn && (args instanceof Array)) {
                args.map(function (arg) {
                    if (arg instanceof Array) {
                        arg.map(function (item) {
                            var l = (typeof item === 'string') ? item.indexOf('level_') : -1;
                            if (l === 0) {
                                if (parseInt(item.substring(6), 10) <= _this.options.throttleOn) {
                                    result = true;
                                }
                            }
                        });
                    }
                    else {
                        var l = arg.indexOf('level_');
                        if (l === 0) {
                            if (parseInt(arg.substring(6), 10) <= _this.options.throttleOn) {
                                result = true;
                            }
                        }
                    }
                });
            }
            return result;
        };
        SmartConsoleService.prototype._reportWatch = function (args) {
            var _this = this;
            var list = Object.keys(this.watchList);
            if (list.length) {
                try {
                    var logStr_1 = this._argsToString(args);
                    list.map(function (key) {
                        if (logStr_1.indexOf(key) > -1) {
                            _this.watchList[key].emit(args);
                        }
                        ;
                    });
                }
                catch (e) { }
            }
        };
        SmartConsoleService.prototype._upscale = function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var stack = this._getStack();
            var re = /([^(]+)@|at ([^(]+) \(/g;
            var m = re.exec(stack);
            var i = stack.lastIndexOf('/');
            var n = i > 0 ? stack.substring(i + 1).split(':')[0] : stack;
            var t = m ? (m[1] || m[2]) : stack;
            var caller = (t.indexOf('/') > 0 ? t.substring(0, t.indexOf('/')) : '');
            var _date = new Date();
            var _time = (_date.getMonth() + 1) + "/" +
                _date.getDay() + "/" +
                _date.getFullYear() + " " +
                _date.getHours() + ":" +
                _date.getMinutes() + ":" +
                _date.getSeconds() + ":" +
                _date.getMilliseconds();
            return (_a = [_time + " [" + n + (caller ? " | " + caller : '') + "] "]).concat.apply(_a, __spread(args));
        };
        SmartConsoleService.prototype._info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if ((this.options.infoDisabled === undefined || !this.options.infoDisabled) &&
                this._filtered(args) && !this._suppressed(args) &&
                !this._throttle(args) && !this._blocked(args)) {
                var newArgs = this.options.upscale ?
                    this._upscale(args) : args;
                if (this.options.upgrade) {
                    if (this.options.emitOutput) {
                        this.output.emit(__spread(["[log]"], newArgs));
                        if (this.options.logAfterEmit) {
                            this.defaultLog.apply(this, __spread(newArgs));
                        }
                    }
                    else {
                        this.defaultLog.apply(this, __spread(newArgs));
                    }
                }
                else {
                    if (this.options.emitOutput) {
                        this.output.emit(__spread(["[info]"], newArgs));
                        if (this.options.logAfterEmit) {
                            this.defaultLog.apply(this, __spread(newArgs));
                        }
                    }
                    else {
                        this.defaultInfo.apply(this, __spread(newArgs));
                    }
                }
            }
            this._reportWatch(args);
        };
        SmartConsoleService.prototype._log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if ((this.options.logDisabled === undefined || !this.options.logDisabled) &&
                this._filtered(args) && !this._suppressed(args) &&
                !this._throttle(args) && !this._blocked(args)) {
                var newArgs = this.options.upscale ?
                    this._upscale(args) : args;
                if (this.options.downGrade) {
                    if (this.options.emitOutput) {
                        this.output.emit(__spread(["[info]"], newArgs));
                        if (this.options.logAfterEmit) {
                            this.defaultLog.apply(this, __spread(newArgs));
                        }
                    }
                    else {
                        this.defaultInfo.apply(this, __spread(newArgs));
                    }
                }
                else if (this.options.upgrade) {
                    if (this.options.emitOutput) {
                        this.output.emit(__spread(["[warn]"], newArgs));
                        if (this.options.logAfterEmit) {
                            this.defaultWarn.apply(this, __spread(newArgs));
                        }
                    }
                    else {
                        this.defaultWarn.apply(this, __spread(newArgs));
                    }
                }
                else {
                    if (this.options.emitOutput) {
                        this.output.emit(__spread(["[log]"], newArgs));
                        if (this.options.logAfterEmit) {
                            this.defaultLog.apply(this, __spread(newArgs));
                        }
                    }
                    else {
                        this.defaultLog.apply(this, __spread(newArgs));
                    }
                }
            }
            this._reportWatch(args);
        };
        SmartConsoleService.prototype._warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if ((this.options.warnDisabled === undefined || !this.options.warnDisabled) &&
                this._filtered(args) && !this._suppressed(args) &&
                !this._throttle(args) && !this._blocked(args)) {
                var newArgs = this.options.upscale ?
                    this._upscale(args) : args;
                if (this.options.downGrade) {
                    if (this.options.emitOutput) {
                        this.output.emit(__spread(["[log]"], newArgs));
                        if (this.options.logAfterEmit) {
                            this.defaultLog.apply(this, __spread(newArgs));
                        }
                    }
                    else {
                        this.defaultLog.apply(this, __spread(newArgs));
                    }
                }
                else if (this.options.upgrade) {
                    if (this.options.emitOutput) {
                        this.output.emit(__spread(["[error]"], newArgs));
                        if (this.options.logAfterEmit) {
                            this.defaultError.apply(this, __spread(newArgs));
                        }
                    }
                    else {
                        this.defaultError.apply(this, __spread(newArgs));
                    }
                }
                else {
                    if (this.options.emitOutput) {
                        this.output.emit(__spread(["[warn]"], newArgs));
                        if (this.options.logAfterEmit) {
                            this.defaultWarn.apply(this, __spread(newArgs));
                        }
                    }
                    else {
                        this.defaultWarn.apply(this, __spread(newArgs));
                    }
                }
            }
            this._reportWatch(args);
        };
        SmartConsoleService.prototype._error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if ((this.options.errorDisabled === undefined || !this.options.errorDisabled) &&
                this._filtered(args) && !this._suppressed(args) &&
                !this._throttle(args) && !this._blocked(args)) {
                var newArgs = this.options.upscale ?
                    this._upscale(args) : args;
                if (this.options.downGrade) {
                    if (this.options.emitOutput) {
                        this.output.emit(__spread(["[log]"], newArgs));
                        if (this.options.logAfterEmit) {
                            this.defaultLog.apply(this, __spread(newArgs));
                        }
                    }
                    else {
                        this.defaultLog.apply(this, __spread(newArgs));
                    }
                }
                else {
                    if (this.options.emitOutput) {
                        this.output.emit(__spread(["[error]"], newArgs));
                        if (this.options.logAfterEmit) {
                            this.defaultError.apply(this, __spread(newArgs));
                        }
                    }
                    else {
                        this.defaultError.apply(this, __spread(newArgs));
                    }
                }
            }
            this._reportWatch(args);
        };
        SmartConsoleService.prototype._table = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if ((this.options.tableDisabled === undefined || !this.options.errorDisabled) &&
                this._filtered(args) && !this._suppressed(args) &&
                !this._throttle(args) && !this._blocked(args)) {
                if (this.options.emitOutput) {
                    var newArgs = this.options.upscale ?
                        this._upscale(args) : args;
                    this.output.emit(__spread(["[table]"], newArgs));
                    if (this.options.logAfterEmit) {
                        this.defaultTable.apply(this, __spread(args));
                    }
                }
                else {
                    this.defaultTable.apply(this, __spread(args));
                }
            }
            this._reportWatch(args);
        };
        SmartConsoleService.prototype._trace = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if ((this.options.traceDisabled === undefined || !this.options.traceDisabled) &&
                this._filtered(args) && !this._throttle(args)) {
                var newArgs = this.options.upscale ?
                    this._upscale(args) : args;
                if (this.options.emitOutput) {
                    this.output.emit(__spread(["[trace]"], newArgs));
                    if (this.options.logAfterEmit) {
                        this.defaultTrace.apply(this, __spread(newArgs));
                    }
                }
                else {
                    this.defaultTrace.apply(this, __spread(newArgs));
                }
            }
            this._reportWatch(args);
        };
        SmartConsoleService.prototype._exception = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if ((this.options.exceptionDisabled === undefined || !this.options.exceptionDisabled) &&
                this._filtered(args) && !this._throttle(args)) {
                if (this.options.emitOutput) {
                    this.output.emit(__spread(["[exception]"], args));
                    if (this.options.logAfterEmit) {
                        this.defaultException.apply(this, __spread(args));
                    }
                }
                else {
                    this.defaultException.apply(this, __spread(args));
                }
            }
            this._reportWatch(args);
        };
        SmartConsoleService.prototype._debug = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if ((this.options.debugDisabled === undefined || !this.options.debugDisabled) &&
                this._filtered(args) && !this._throttle(args)) {
                if (this.options.emitOutput) {
                    this.output.emit(__spread(["[debug]"], args));
                    if (this.options.logAfterEmit) {
                        this.defaultDebug.apply(this, __spread(args));
                    }
                }
                else {
                    this.defaultDebug.apply(this, __spread(args));
                }
            }
            this._reportWatch(args);
        };
        SmartConsoleService.prototype._assert = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if ((this.options.assertDisabled === undefined || !this.options.assertDisabled) &&
                this._filtered(args) && !this._throttle(args)) {
                if (this.options.emitOutput) {
                    this.output.emit(__spread(["[assert]"], args));
                    if (this.options.logAfterEmit) {
                        this.defaultAssert.apply(this, __spread(args));
                    }
                }
                else {
                    this.defaultAssert.apply(this, __spread(args));
                }
            }
            this._reportWatch(args);
        };
        /*
        * Will initialize smart logger.
        * @instructions instructions to direct this service to suppress logs.
        */
        SmartConsoleService.prototype.makeSmartLogs = function (instructions) {
            this.options = instructions;
            if (console.log) {
                console.log = this._log.bind(this);
            }
            if (console.info) {
                console.info = this._info.bind(this);
            }
            if (console.warn) {
                console.warn = this._warn.bind(this);
            }
            if (console.error) {
                console.error = this._error.bind(this);
            }
            else {
                console.error = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                };
            }
            if (console.table) {
                console.table = this._table.bind(this);
            }
            else {
                console.table = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                };
            }
            if (console.trace) {
                console.trace = this._trace.bind(this);
            }
            else {
                console.trace = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                };
            }
            if (console.debug) {
                console.debug = this._debug.bind(this);
            }
            else {
                console.debug = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                };
            }
            if (console.assert) {
                console.assert = this._assert.bind(this);
            }
            else {
                console.assert = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                };
            }
            if (console.exception) {
                console.exception = this._exception.bind(this);
            }
            else {
                console.exception = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                };
            }
        };
        /*
        * @return Event Emitter that may publisg logs.
        */
        SmartConsoleService.prototype.redirectedOutput = function () {
            return this.output;
        };
        /*
        * Will add a key to the warch list.
        * @args key to be added.
        */
        SmartConsoleService.prototype.addWatch = function (key) {
            if (!this.watchList[key]) {
                this.watchList[key] = new core.EventEmitter();
            }
            return this.watchList[key];
        };
        /*
        * Will remove a key from the warch list.
        * @args key to be removed. it will be wise to remove subscriptions to this key before calling this method.
        */
        SmartConsoleService.prototype.removeWatch = function (key) {
            delete this.watchList[key];
        };
        /*
        * Will clear warch list.
        * @args list is a list of subscribers to the items in watchlist.
        * It could be empty, but to avoid leaks, it will be wise to keep a record of your subscriptions.
        */
        SmartConsoleService.prototype.clearWatchList = function (list) {
            list.map(function (sbc) { return sbc.unsubscribe(); });
            this.watchList = {};
        };
        /*
        * Will markup stack trace to provide HTML fragment with anchors foe every trace.
        * @args argument that may contail stack trace.
        * @return A more formal content with html fragment if stack travce applied ib advance.
        */
        SmartConsoleService.prototype.markupTrace = function (args) {
            var result = args;
            if (args instanceof Array) {
                result = [];
                args.map(function (item) {
                    if (typeof item === 'string') {
                        var breakOn = (item.indexOf('\n') > 0) ? '\n' : ((item.indexOf('\r') > 0) ? '\r' : undefined);
                        if (breakOn && (item.indexOf('@') > -1 || item.indexOf('(') > -1) && item.indexOf(':') > 0) {
                            var list_1 = [];
                            item.split(breakOn).map(function (line) {
                                var x = line.indexOf('@');
                                var z = line.indexOf('(');
                                if (z > 0) {
                                    var sublist = line.substring(z + 1, line.length - 1).split(':');
                                    var len = sublist.length;
                                    var name_1 = line.substring(0, z) + ':' + sublist[len - 2] + ':' + sublist[len - 1];
                                    var ref = sublist.slice(0, len - 2).join(':');
                                    list_1.push('<a href="' + ref + '">' + name_1 + '</a>');
                                }
                                else if (x >= 0) {
                                    var y = line.indexOf(':');
                                    if (y < 0) {
                                        list_1.push('<a href="' + line.substring(x + 1) + '">' +
                                            line.substring(0, x) +
                                            '</a>');
                                    }
                                    else {
                                        var sublist = line.substring(x + 1, line.length).split(':');
                                        var len = sublist.length;
                                        var name_2 = line.substring(0, x) + ':' + sublist[len - 2] + ':' + sublist[len - 1];
                                        var ref = sublist.slice(0, len - 2).join(':');
                                        list_1.push('<a href="' + ref + '">' + name_2 + '</a>');
                                    }
                                }
                                else {
                                    list_1.push(line);
                                }
                            });
                            result.push(list_1.join('<br />'));
                        }
                        else if (breakOn) {
                            result.push(item.split(breakOn).join('<br />'));
                        }
                        else {
                            result.push(item);
                        }
                    }
                    else if (typeof item === 'object') {
                        try {
                            result.push(JSON.stringify(item));
                        }
                        catch (e) {
                            if (item.message) {
                                result.push(item.message);
                            }
                            else {
                                result.push(item);
                            }
                        }
                    }
                    else {
                        result.push(item);
                    }
                });
            }
            return result;
        };
        SmartConsoleService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function SmartConsoleService_Factory() { return new SmartConsoleService(); }, token: SmartConsoleService, providedIn: "root" });
        SmartConsoleService = __decorate([
            core.Injectable({
                providedIn: 'root'
            })
        ], SmartConsoleService);
        return SmartConsoleService;
    }());

    var SmartConsoleModule = /** @class */ (function () {
        function SmartConsoleModule() {
        }
        SmartConsoleModule_1 = SmartConsoleModule;
        SmartConsoleModule.forRoot = function () {
            return {
                ngModule: SmartConsoleModule_1,
                providers: [
                    SmartConsoleService
                ]
            };
        };
        var SmartConsoleModule_1;
        SmartConsoleModule = SmartConsoleModule_1 = __decorate([
            core.NgModule({
                declarations: [],
                exports: [],
                imports: [common.CommonModule],
                providers: [SmartConsoleService],
                schemas: [core.CUSTOM_ELEMENTS_SCHEMA]
            })
        ], SmartConsoleModule);
        return SmartConsoleModule;
    }());

    exports.SmartConsoleModule = SmartConsoleModule;
    exports.SmartConsoleService = SmartConsoleService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sedeh-smart-console.umd.js.map
