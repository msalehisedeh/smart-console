import { __spread, __decorate } from 'tslib';
import { EventEmitter, ɵɵdefineInjectable, Injectable, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

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
        this.output = new EventEmitter();
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
            this.watchList[key] = new EventEmitter();
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
    SmartConsoleService.ngInjectableDef = ɵɵdefineInjectable({ factory: function SmartConsoleService_Factory() { return new SmartConsoleService(); }, token: SmartConsoleService, providedIn: "root" });
    SmartConsoleService = __decorate([
        Injectable({
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
        NgModule({
            declarations: [],
            exports: [],
            imports: [CommonModule],
            providers: [SmartConsoleService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
    ], SmartConsoleModule);
    return SmartConsoleModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { SmartConsoleModule, SmartConsoleService };
//# sourceMappingURL=sedeh-smart-console.js.map
