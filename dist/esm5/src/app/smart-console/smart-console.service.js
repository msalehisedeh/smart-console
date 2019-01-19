/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, EventEmitter } from '@angular/core';
/**
 * @record
 */
export function SmartOptions() { }
/** @type {?|undefined} */
SmartOptions.prototype.emitOutput;
/** @type {?|undefined} */
SmartOptions.prototype.logAfterEmit;
/** @type {?|undefined} */
SmartOptions.prototype.logDisabled;
/** @type {?|undefined} */
SmartOptions.prototype.infoDisabled;
/** @type {?|undefined} */
SmartOptions.prototype.warnDisabled;
/** @type {?|undefined} */
SmartOptions.prototype.errorDisabled;
/** @type {?|undefined} */
SmartOptions.prototype.tableDisabled;
/** @type {?|undefined} */
SmartOptions.prototype.traceDisabled;
/** @type {?|undefined} */
SmartOptions.prototype.exceptionDisabled;
/** @type {?|undefined} */
SmartOptions.prototype.debugDisabled;
/** @type {?|undefined} */
SmartOptions.prototype.assertDisabled;
/** @type {?|undefined} */
SmartOptions.prototype.downGrade;
/** @type {?|undefined} */
SmartOptions.prototype.upgrade;
/** @type {?|undefined} */
SmartOptions.prototype.upscale;
/** @type {?|undefined} */
SmartOptions.prototype.throttleOn;
/** @type {?|undefined} */
SmartOptions.prototype.blockCaller;
/** @type {?|undefined} */
SmartOptions.prototype.suppress;
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
    /**
     * @param {?} args
     * @return {?}
     */
    SmartConsoleService.prototype._argsToString = /**
     * @param {?} args
     * @return {?}
     */
    function (args) {
        /** @type {?} */
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
    /**
     * @param {...?} args
     * @return {?}
     */
    SmartConsoleService.prototype._suppressed = /**
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        /** @type {?} */
        var result = false;
        if (this.options.suppress) {
            /** @type {?} */
            var x_1 = this._argsToString(args);
            this.options.suppress.map(function (item) {
                if (x_1.indexOf(item) > -1) {
                    result = true;
                }
            });
        }
        return result;
    };
    /**
     * @return {?}
     */
    SmartConsoleService.prototype._getStack = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
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
    /**
     * @param {...?} args
     * @return {?}
     */
    SmartConsoleService.prototype._blocked = /**
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        /** @type {?} */
        var result = false;
        if (this.options.blockCaller) {
            /** @type {?} */
            var stack_1 = this._getStack();
            this.options.blockCaller.map(function (item) {
                if (stack_1.indexOf(item) > -1) {
                    result = true;
                }
            });
        }
        return result;
    };
    /**
     * @param {...?} args
     * @return {?}
     */
    SmartConsoleService.prototype._throttle = /**
     * @param {...?} args
     * @return {?}
     */
    function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        /** @type {?} */
        var result = false;
        if (this.options.throttleOn && (args instanceof Array)) {
            args.map(function (arg) {
                if (arg instanceof Array) {
                    arg.map(function (item) {
                        /** @type {?} */
                        var l = (typeof item === 'string') ? item.indexOf('level_') : -1;
                        if (l === 0) {
                            if (parseInt(item.substring(6), 10) <= _this.options.throttleOn) {
                                result = true;
                            }
                        }
                    });
                }
                else {
                    /** @type {?} */
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
    /**
     * @param {?} args
     * @return {?}
     */
    SmartConsoleService.prototype._reportWatch = /**
     * @param {?} args
     * @return {?}
     */
    function (args) {
        var _this = this;
        /** @type {?} */
        var list = Object.keys(this.watchList);
        if (list.length) {
            try {
                /** @type {?} */
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
    /**
     * @param {...?} args
     * @return {?}
     */
    SmartConsoleService.prototype._upscale = /**
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        /** @type {?} */
        var stack = this._getStack();
        /** @type {?} */
        var re = /([^(]+)@|at ([^(]+) \(/g;
        /** @type {?} */
        var m = re.exec(stack);
        /** @type {?} */
        var i = stack.lastIndexOf('/');
        /** @type {?} */
        var n = i > 0 ? stack.substring(i + 1).split(':')[0] : stack;
        /** @type {?} */
        var t = m ? (m[1] || m[2]) : stack;
        /** @type {?} */
        var caller = (t.indexOf('/') > 0 ? t.substring(0, t.indexOf('/')) : '');
        /** @type {?} */
        var _date = new Date();
        /** @type {?} */
        var _time = (_date.getMonth() + 1) + "/" +
            _date.getDay() + "/" +
            _date.getFullYear() + " " +
            _date.getHours() + ":" +
            _date.getMinutes() + ":" +
            _date.getSeconds() + ":" +
            _date.getMilliseconds();
        return (_a = [_time + " [" + n + (caller ? " | " + caller : '') + "] "]).concat.apply(_a, tslib_1.__spread(args));
        var _a;
    };
    /**
     * @param {...?} args
     * @return {?}
     */
    SmartConsoleService.prototype._info = /**
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if ((this.options.infoDisabled === undefined || !this.options.infoDisabled) &&
            !this._suppressed(args) && !this._throttle(args) && !this._blocked(args)) {
            /** @type {?} */
            var newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.upgrade) {
                if (this.options.emitOutput) {
                    this.output.emit(tslib_1.__spread(["[log]"], newArgs));
                    if (this.options.logAfterEmit) {
                        this.defaultLog.apply(this, tslib_1.__spread(newArgs));
                    }
                }
                else {
                    this.defaultLog.apply(this, tslib_1.__spread(newArgs));
                }
            }
            else {
                if (this.options.emitOutput) {
                    this.output.emit(tslib_1.__spread(["[info]"], newArgs));
                    if (this.options.logAfterEmit) {
                        this.defaultLog.apply(this, tslib_1.__spread(newArgs));
                    }
                }
                else {
                    this.defaultInfo.apply(this, tslib_1.__spread(newArgs));
                }
            }
        }
        this._reportWatch(args);
    };
    /**
     * @param {...?} args
     * @return {?}
     */
    SmartConsoleService.prototype._log = /**
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if ((this.options.logDisabled === undefined || !this.options.logDisabled) &&
            !this._suppressed(args) && !this._throttle(args) && !this._blocked(args)) {
            /** @type {?} */
            var newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.downGrade) {
                if (this.options.emitOutput) {
                    this.output.emit(tslib_1.__spread(["[info]"], newArgs));
                    if (this.options.logAfterEmit) {
                        this.defaultLog.apply(this, tslib_1.__spread(newArgs));
                    }
                }
                else {
                    this.defaultInfo.apply(this, tslib_1.__spread(newArgs));
                }
            }
            else if (this.options.upgrade) {
                if (this.options.emitOutput) {
                    this.output.emit(tslib_1.__spread(["[warn]"], newArgs));
                    if (this.options.logAfterEmit) {
                        this.defaultWarn.apply(this, tslib_1.__spread(newArgs));
                    }
                }
                else {
                    this.defaultWarn.apply(this, tslib_1.__spread(newArgs));
                }
            }
            else {
                if (this.options.emitOutput) {
                    this.output.emit(tslib_1.__spread(["[log]"], newArgs));
                    if (this.options.logAfterEmit) {
                        this.defaultLog.apply(this, tslib_1.__spread(newArgs));
                    }
                }
                else {
                    this.defaultLog.apply(this, tslib_1.__spread(newArgs));
                }
            }
        }
        this._reportWatch(args);
    };
    /**
     * @param {...?} args
     * @return {?}
     */
    SmartConsoleService.prototype._warn = /**
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if ((this.options.warnDisabled === undefined || !this.options.warnDisabled) &&
            !this._suppressed(args) && !this._throttle(args) && !this._blocked(args)) {
            /** @type {?} */
            var newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.downGrade) {
                if (this.options.emitOutput) {
                    this.output.emit(tslib_1.__spread(["[log]"], newArgs));
                    if (this.options.logAfterEmit) {
                        this.defaultLog.apply(this, tslib_1.__spread(newArgs));
                    }
                }
                else {
                    this.defaultLog.apply(this, tslib_1.__spread(newArgs));
                }
            }
            else if (this.options.upgrade) {
                if (this.options.emitOutput) {
                    this.output.emit(tslib_1.__spread(["[error]"], newArgs));
                    if (this.options.logAfterEmit) {
                        this.defaultError.apply(this, tslib_1.__spread(newArgs));
                    }
                }
                else {
                    this.defaultError.apply(this, tslib_1.__spread(newArgs));
                }
            }
            else {
                if (this.options.emitOutput) {
                    this.output.emit(tslib_1.__spread(["[warn]"], newArgs));
                    if (this.options.logAfterEmit) {
                        this.defaultWarn.apply(this, tslib_1.__spread(newArgs));
                    }
                }
                else {
                    this.defaultWarn.apply(this, tslib_1.__spread(newArgs));
                }
            }
        }
        this._reportWatch(args);
    };
    /**
     * @param {...?} args
     * @return {?}
     */
    SmartConsoleService.prototype._error = /**
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if ((this.options.errorDisabled === undefined || !this.options.errorDisabled) &&
            !this._suppressed(args) && !this._throttle(args) && !this._blocked(args)) {
            /** @type {?} */
            var newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.downGrade) {
                if (this.options.emitOutput) {
                    this.output.emit(tslib_1.__spread(["[log]"], newArgs));
                    if (this.options.logAfterEmit) {
                        this.defaultLog.apply(this, tslib_1.__spread(newArgs));
                    }
                }
                else {
                    this.defaultLog.apply(this, tslib_1.__spread(newArgs));
                }
            }
            else {
                if (this.options.emitOutput) {
                    this.output.emit(tslib_1.__spread(["[error]"], newArgs));
                    if (this.options.logAfterEmit) {
                        this.defaultError.apply(this, tslib_1.__spread(newArgs));
                    }
                }
                else {
                    this.defaultError.apply(this, tslib_1.__spread(newArgs));
                }
            }
        }
        this._reportWatch(args);
    };
    /**
     * @param {...?} args
     * @return {?}
     */
    SmartConsoleService.prototype._table = /**
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if ((this.options.tableDisabled === undefined || !this.options.errorDisabled) &&
            !this._suppressed(args) && !this._throttle(args) && !this._blocked(args)) {
            if (this.options.emitOutput) {
                /** @type {?} */
                var newArgs = this.options.upscale ?
                    this._upscale(args) : args;
                this.output.emit(tslib_1.__spread(["[table]"], newArgs));
                if (this.options.logAfterEmit) {
                    this.defaultTable.apply(this, tslib_1.__spread(args));
                }
            }
            else {
                this.defaultTable.apply(this, tslib_1.__spread(args));
            }
        }
        this._reportWatch(args);
    };
    /**
     * @param {...?} args
     * @return {?}
     */
    SmartConsoleService.prototype._trace = /**
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if ((this.options.traceDisabled === undefined || !this.options.traceDisabled) &&
            !this._throttle(args)) {
            /** @type {?} */
            var newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.emitOutput) {
                this.output.emit(tslib_1.__spread(["[trace]"], newArgs));
                if (this.options.logAfterEmit) {
                    this.defaultTrace.apply(this, tslib_1.__spread(newArgs));
                }
            }
            else {
                this.defaultTrace.apply(this, tslib_1.__spread(newArgs));
            }
        }
        this._reportWatch(args);
    };
    /**
     * @param {...?} args
     * @return {?}
     */
    SmartConsoleService.prototype._exception = /**
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if ((this.options.exceptionDisabled === undefined || !this.options.exceptionDisabled) &&
            !this._throttle(args)) {
            if (this.options.emitOutput) {
                this.output.emit(tslib_1.__spread(["[exception]"], args));
                if (this.options.logAfterEmit) {
                    this.defaultException.apply(this, tslib_1.__spread(args));
                }
            }
            else {
                this.defaultException.apply(this, tslib_1.__spread(args));
            }
        }
        this._reportWatch(args);
    };
    /**
     * @param {...?} args
     * @return {?}
     */
    SmartConsoleService.prototype._debug = /**
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if ((this.options.debugDisabled === undefined || !this.options.debugDisabled) &&
            !this._throttle(args)) {
            if (this.options.emitOutput) {
                this.output.emit(tslib_1.__spread(["[debug]"], args));
                if (this.options.logAfterEmit) {
                    this.defaultDebug.apply(this, tslib_1.__spread(args));
                }
            }
            else {
                this.defaultDebug.apply(this, tslib_1.__spread(args));
            }
        }
        this._reportWatch(args);
    };
    /**
     * @param {...?} args
     * @return {?}
     */
    SmartConsoleService.prototype._assert = /**
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if ((this.options.assertDisabled === undefined || !this.options.assertDisabled) &&
            !this._throttle(args)) {
            if (this.options.emitOutput) {
                this.output.emit(tslib_1.__spread(["[assert]"], args));
                if (this.options.logAfterEmit) {
                    this.defaultAssert.apply(this, tslib_1.__spread(args));
                }
            }
            else {
                this.defaultAssert.apply(this, tslib_1.__spread(args));
            }
        }
        this._reportWatch(args);
    };
    /*
    * Will initialize smart logger.
    * @instructions instructions to direct this service to suppress logs.
    */
    /**
     * @param {?} instructions
     * @return {?}
     */
    SmartConsoleService.prototype.makeSmartLogs = /**
     * @param {?} instructions
     * @return {?}
     */
    function (instructions) {
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
    /**
     * @return {?}
     */
    SmartConsoleService.prototype.redirectedOutput = /**
     * @return {?}
     */
    function () {
        return this.output;
    };
    /*
    * Will add a key to the warch list.
    * @args key to be added.
    */
    /**
     * @param {?} key
     * @return {?}
     */
    SmartConsoleService.prototype.addWatch = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (!this.watchList[key]) {
            this.watchList[key] = new EventEmitter();
        }
        return this.watchList[key];
    };
    /*
    * Will remove a key from the warch list.
    * @args key to be removed. it will be wise to remove subscriptions to this key before calling this method.
    */
    /**
     * @param {?} key
     * @return {?}
     */
    SmartConsoleService.prototype.removeWatch = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        delete this.watchList[key];
    };
    /*
    * Will clear warch list.
    * @args list is a list of subscribers to the items in watchlist.
    * It could be empty, but to avoid leaks, it will be wise to keep a record of your subscriptions.
    */
    /**
     * @param {?} list
     * @return {?}
     */
    SmartConsoleService.prototype.clearWatchList = /**
     * @param {?} list
     * @return {?}
     */
    function (list) {
        list.map(function (sbc) { return sbc.unsubscribe(); });
        this.watchList = {};
    };
    /*
    * Will markup stack trace to provide HTML fragment with anchors foe every trace.
    * @args argument that may contail stack trace.
    * @return A more formal content with html fragment if stack travce applied ib advance.
    */
    /**
     * @param {?} args
     * @return {?}
     */
    SmartConsoleService.prototype.markupTrace = /**
     * @param {?} args
     * @return {?}
     */
    function (args) {
        /** @type {?} */
        var result = args;
        if (args instanceof Array) {
            result = [];
            args.map(function (item) {
                if (typeof item === 'string') {
                    /** @type {?} */
                    var breakOn = (item.indexOf('\n') > 0) ? '\n' : ((item.indexOf('\r') > 0) ? '\r' : undefined);
                    if (breakOn && (item.indexOf('@') > -1 || item.indexOf('(') > -1) && item.indexOf(':') > 0) {
                        /** @type {?} */
                        var list_1 = [];
                        item.split(breakOn).map(function (line) {
                            /** @type {?} */
                            var x = line.indexOf('@');
                            /** @type {?} */
                            var z = line.indexOf('(');
                            if (z > 0) {
                                /** @type {?} */
                                var sublist = line.substring(z + 1, line.length - 1).split(':');
                                /** @type {?} */
                                var len = sublist.length;
                                /** @type {?} */
                                var name_1 = line.substring(0, z) + ':' + sublist[len - 2] + ':' + sublist[len - 1];
                                /** @type {?} */
                                var ref = sublist.slice(0, len - 2).join(':');
                                list_1.push('<a href="' + ref + '">' + name_1 + '</a>');
                            }
                            else if (x >= 0) {
                                /** @type {?} */
                                var y = line.indexOf(':');
                                if (y < 0) {
                                    list_1.push('<a href="' + line.substring(x + 1) + '">' +
                                        line.substring(0, x) +
                                        '</a>');
                                }
                                else {
                                    /** @type {?} */
                                    var sublist = line.substring(x + 1, line.length).split(':');
                                    /** @type {?} */
                                    var len = sublist.length;
                                    /** @type {?} */
                                    var name_2 = line.substring(0, x) + ':' + sublist[len - 2] + ':' + sublist[len - 1];
                                    /** @type {?} */
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
    SmartConsoleService.decorators = [
        { type: Injectable }
    ];
    return SmartConsoleService;
}());
export { SmartConsoleService };
if (false) {
    /** @type {?} */
    SmartConsoleService.prototype.options;
    /** @type {?} */
    SmartConsoleService.prototype.defaultLog;
    /** @type {?} */
    SmartConsoleService.prototype.defaultInfo;
    /** @type {?} */
    SmartConsoleService.prototype.defaultWarn;
    /** @type {?} */
    SmartConsoleService.prototype.defaultError;
    /** @type {?} */
    SmartConsoleService.prototype.defaultTable;
    /** @type {?} */
    SmartConsoleService.prototype.defaultTrace;
    /** @type {?} */
    SmartConsoleService.prototype.defaultAssert;
    /** @type {?} */
    SmartConsoleService.prototype.defaultException;
    /** @type {?} */
    SmartConsoleService.prototype.defaultDebug;
    /** @type {?} */
    SmartConsoleService.prototype.output;
    /** @type {?} */
    SmartConsoleService.prototype.watchList;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnQtY29uc29sZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL3NtYXJ0LWNvbnNvbGUvIiwic291cmNlcyI6WyJzcmMvYXBwL3NtYXJ0LWNvbnNvbGUvc21hcnQtY29uc29sZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQXlCakMsT0FBTyxDQUFDLEdBQUc7MkJBQ1YsT0FBTyxDQUFDLElBQUk7MkJBQ1osT0FBTyxDQUFDLElBQUk7NEJBQ1gsT0FBTyxDQUFDLEtBQUs7NEJBQ2IsT0FBTyxDQUFDLEtBQUs7NEJBQ2IsT0FBTyxDQUFDLEtBQUs7NkJBQ1osT0FBTyxDQUFDLE1BQU07Z0NBQ1gsT0FBTyxDQUFDLFNBQVM7NEJBQ3JCLE9BQU8sQ0FBQyxLQUFLO3NCQUNuQixJQUFJLFlBQVksRUFBRTt5QkFDZixFQUFFOzs7Ozs7SUFFZCwyQ0FBYTs7OztjQUFDLElBQUk7O1FBQ3pCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsR0FBRyxDQUNQLFVBQUMsR0FBRztZQUNILEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQztvQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDakM7Z0JBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQ1gsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUN6QjtvQkFBQyxJQUFJLENBQUMsQ0FB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OzhCQXhCWDs7U0F5QmEsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiovXG5pbXBvcnQge0luamVjdGFibGUsIEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU21hcnRPcHRpb25zIHtcblx0ZW1pdE91dHB1dD86IGJvb2xlYW4sLy8gbG9nIHJlc3VsdCBpbiB0byBvdXRwdXQgaW5zdGVkIG9mIGNvbnNvbGUuXG5cdGxvZ0FmdGVyRW1pdD86IGJvb2xlYW4sIC8vIGNvbnRpbnVlIGxvZ2dpbmcgaW50byBicm93c2VyIGNvbnNvbGUgYWZ0ZXIgZW1pdHRpbmcgdGhlIGxvZ1xuXHRsb2dEaXNhYmxlZD86IGJvb2xlYW4sICAgLy8gZGlzYWJsZXMgYWxsIGxvZyBsZXZlbCBjb25zb2xlIGxvZ3Ncblx0aW5mb0Rpc2FibGVkPzogYm9vbGVhbiwgIC8vIGRpc2FibGVzIGFsbCBpbmZvIGxldmVsIGNvbnNvbGUgbG9nc1xuXHR3YXJuRGlzYWJsZWQ/OiBib29sZWFuLCAgLy8gZGlzYWJsZXMgYWxsIHdhcm4gbGV2ZWwgY29uc29sZSBsb2dzXG5cdGVycm9yRGlzYWJsZWQ/OiBib29sZWFuLCAvLyBkaXNhYmxlcyBhbGwgZXJyb3IgbGV2ZWwgY29uc29sZSBsb2dzXG5cdHRhYmxlRGlzYWJsZWQ/OiBib29sZWFuLCAvLyBkaXNhYmxlcyBhbGwgdGFibGUgY29uc29sZSBsb2dzXG5cdHRyYWNlRGlzYWJsZWQ/OiBib29sZWFuLCAvLyBkaXNhYmxlcyBhbGwgdHJhY2UgbGV2ZWwgY29uc29sZSBsb2dzXG5cdGV4Y2VwdGlvbkRpc2FibGVkPzogYm9vbGVhbiwgLy8gZGlzYWJsZXMgYWxsIGV4Y2VwdGlvbiBsZXZlbCBjb25zb2xlIGxvZ3Ncblx0ZGVidWdEaXNhYmxlZD86IGJvb2xlYW4sIC8vIGRpc2FibGVzIGFsbCBkZWJ1ZyBsZXZlbCBjb25zb2xlIGxvZ3Ncblx0YXNzZXJ0RGlzYWJsZWQ/OmJvb2xlYW4sIC8vIGRpc2FibGVzIGFzc2VydCBsb2dzIG9uIGNvbnNvbGVcblx0ZG93bkdyYWRlPzogYm9vbGVhbiwgICAgIC8vIGRvd25ncmFkZSBhIGxvZyBmcm9tIHdhcm5pbmcgdG8gaW5mbyBvciBsb2cgdG8gd2FybmluZywgb3IgZXJyb3IgdG8gbG9nLlxuXHR1cGdyYWRlPzogYm9vbGVhbiwgICAgICAgLy8gdXBncmFkZXMgYSBsb2cgZnJvbSBpbmZvIHRvIHdhcm5pbmcgb3Igd2FybmluZyB0byBsb2csIG9yIGxvZyB0byBlcnJvclxuXHR1cHNjYWxlPzogYm9vbGVhbiwgICAgICAgLy8gc2hvd3MgYWRkaXRpb25hbCBpbmZvIG9uIGVhY2ggbG9nXG5cdHRocm90dGxlT24/OiBudW1iZXIsICAgICAvLyBibG9jayBsb2dzIGxlc3MgdGhhbiBwcm92aWRlZCBtZXNzYWdlIGxldmVsIChlLmcuLCBsZXZlbF8zIG9yIGxldmVsXzUpIGluIGEgbG9nXG5cdGJsb2NrQ2FsbGVyPzogYW55W10sICAgICAvLyBibG9ja3MgdGhlIGNhbGxlclxuXHRzdXBwcmVzcz86IGFueVtdICAgICAgICAgLy8gYmxvY2tzIHBlciBhIGtleXdvcmRcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNtYXJ0Q29uc29sZVNlcnZpY2Uge1xuXHRwcml2YXRlIG9wdGlvbnM6IFNtYXJ0T3B0aW9ucztcblx0cHJpdmF0ZSBkZWZhdWx0TG9nID0gY29uc29sZS5sb2c7XG5cdHByaXZhdGUgZGVmYXVsdEluZm8gPSBjb25zb2xlLmluZm87XG5cdHByaXZhdGUgZGVmYXVsdFdhcm4gPSBjb25zb2xlLndhcm47XG5cdHByaXZhdGUgZGVmYXVsdEVycm9yID0gY29uc29sZS5lcnJvcjtcblx0cHJpdmF0ZSBkZWZhdWx0VGFibGUgPSBjb25zb2xlLnRhYmxlO1xuXHRwcml2YXRlIGRlZmF1bHRUcmFjZSA9IGNvbnNvbGUudHJhY2U7XG5cdHByaXZhdGUgZGVmYXVsdEFzc2VydCA9IGNvbnNvbGUuYXNzZXJ0O1xuXHRwcml2YXRlIGRlZmF1bHRFeGNlcHRpb24gPSBjb25zb2xlLmV4Y2VwdGlvbjtcblx0cHJpdmF0ZSBkZWZhdWx0RGVidWcgPSBjb25zb2xlLmRlYnVnO1xuXHRwcml2YXRlIG91dHB1dCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblx0cHJpdmF0ZSB3YXRjaExpc3QgPSB7fTtcblxuXHRwcml2YXRlIF9hcmdzVG9TdHJpbmcoYXJncyk6IHN0cmluZyB7XG5cdFx0bGV0IHJlc3VsdCA9IFtdO1xuXHRcdGFyZ3MubWFwKFxuXHRcdFx0KGFyZykgPT4ge1xuXHRcdFx0XHRpZiAodHlwZW9mIGFyZyA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0cmVzdWx0LnB1c2goSlNPTi5zdHJpbmdpZnkoYXJnKSk7XG5cdFx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0XHRpZiAoYXJnLm1lc3NhZ2UpIHtcblx0XHRcdFx0XHRcdFx0cmVzdWx0LnB1c2goYXJnLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmVzdWx0LnB1c2goYXJnKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goYXJnKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdCk7XG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKCcsJyk7XG5cdH1cblx0cHJpdmF0ZSBfc3VwcHJlc3NlZCguLi5hcmdzKSB7XG5cdFx0bGV0IHJlc3VsdCA9IGZhbHNlO1xuXHRcdGlmICh0aGlzLm9wdGlvbnMuc3VwcHJlc3MpIHtcblx0XHRcdGNvbnN0IHggPSB0aGlzLl9hcmdzVG9TdHJpbmcoYXJncyk7XG5cdFx0XHR0aGlzLm9wdGlvbnMuc3VwcHJlc3MubWFwKFxuXHRcdFx0XHQoaXRlbSkgPT4ge1xuXHRcdFx0XHRcdGlmICh4LmluZGV4T2YoaXRlbSkgPiAtMSkge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblx0cHJpdmF0ZSBfZ2V0U3RhY2soKSB7XG5cdFx0Ly8gdGhpcyBtZXRob2QgcHVycG9zZSBpcyBvbmx5IHRvIGZpeCBJRSBpc3N1ZS4gXG5cdFx0Ly8gaW4gSUUsIG5ldyBFcnJvcigpLnN0YWNrICB3aWxsIGJlIHVuZGVmaW5lZFxuXHRcdC8vIHVubGVzcyBpdCBpcyBjYXVndGggaW4gdHJ5IGJsb2NrIHN0YXRlbWVudC5cblx0XHRsZXQgc3RhY2s6IGFueSA9ICcnO1xuXHRcdHRyeSB7XG5cdFx0ICB0aHJvdyBuZXcgRXJyb3IoJ2dldFN0YWNrJyk7XG5cdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRzdGFjayA9IGUuc3RhY2s7XG5cdFx0XHRzdGFjayA9IHN0YWNrLmluZGV4T2YoJ1xccicpID4gMCA/IHN0YWNrLmluZGV4T2YoJ1xccicpIDogc3RhY2suc3BsaXQoJ1xcbicpO1xuXHRcdFx0c3RhY2sgPSBzdGFja1s0XTtcblx0XHR9XG5cdFx0cmV0dXJuIHN0YWNrO1xuXHR9XG5cdHByaXZhdGUgX2Jsb2NrZWQoLi4uYXJncykge1xuXHRcdGxldCByZXN1bHQgPSBmYWxzZTtcblxuXHRcdGlmICh0aGlzLm9wdGlvbnMuYmxvY2tDYWxsZXIpIHtcblx0XHRcdGNvbnN0IHN0YWNrID0gdGhpcy5fZ2V0U3RhY2soKTtcblx0XHRcdHRoaXMub3B0aW9ucy5ibG9ja0NhbGxlci5tYXAoXG5cdFx0XHRcdChpdGVtKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHN0YWNrLmluZGV4T2YoaXRlbSkgPiAtMSkge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblx0cHJpdmF0ZSBfdGhyb3R0bGUoLi4uYXJncykge1xuXHRcdGxldCByZXN1bHQgPSBmYWxzZTtcblx0XHRpZiAodGhpcy5vcHRpb25zLnRocm90dGxlT24gJiYgKGFyZ3MgaW5zdGFuY2VvZiBBcnJheSkpIHtcblx0XHRcdGFyZ3MubWFwKFxuXHRcdFx0XHQoYXJnKSA9PiB7XG5cdFx0XHRcdFx0aWYgKGFyZyBpbnN0YW5jZW9mIEFycmF5KSB7XG5cdFx0XHRcdFx0XHRhcmcubWFwKFxuXHRcdFx0XHRcdFx0XHQoaXRlbSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGwgPSAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSA/IGl0ZW0uaW5kZXhPZignbGV2ZWxfJykgOiAtMTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIGwgPT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChwYXJzZUludChpdGVtLnN1YnN0cmluZyg2KSwgMTApIDw9IHRoaXMub3B0aW9ucy50aHJvdHRsZU9uKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNvbnN0IGwgPSBhcmcuaW5kZXhPZignbGV2ZWxfJyk7XG5cdFx0XHRcdFx0XHRpZiAoIGwgPT09IDApIHtcblx0XHRcdFx0XHRcdFx0aWYgKHBhcnNlSW50KGFyZy5zdWJzdHJpbmcoNiksIDEwKSA8PSB0aGlzLm9wdGlvbnMudGhyb3R0bGVPbikge1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblx0cHJpdmF0ZSBfcmVwb3J0V2F0Y2goYXJncykge1xuXHRcdGNvbnN0IGxpc3QgPSBPYmplY3Qua2V5cyh0aGlzLndhdGNoTGlzdCk7XG5cdFx0aWYgKGxpc3QubGVuZ3RoKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb25zdCBsb2dTdHI6IHN0cmluZyA9IHRoaXMuX2FyZ3NUb1N0cmluZyhhcmdzKTtcblx0XHRcdFx0bGlzdC5tYXAoXG5cdFx0XHRcdFx0KGtleSkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKGxvZ1N0ci5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLndhdGNoTGlzdFtrZXldLmVtaXQoYXJncyk7XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0KTtcblx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBfdXBzY2FsZSguLi5hcmdzKSB7XG5cdFx0Y29uc3Qgc3RhY2sgPSB0aGlzLl9nZXRTdGFjaygpO1xuXHRcdGNvbnN0IHJlID0gLyhbXihdKylAfGF0IChbXihdKykgXFwoL2c7XG5cdFx0Y29uc3QgbSA9IHJlLmV4ZWMoc3RhY2spO1xuXHRcdGNvbnN0IGkgPSBzdGFjay5sYXN0SW5kZXhPZignLycpO1xuXHRcdGNvbnN0IG4gPSBpID4gMCA/IHN0YWNrLnN1YnN0cmluZyhpKzEpLnNwbGl0KCc6JylbMF0gOiBzdGFjaztcblx0XHRjb25zdCB0ID0gbSA/IChtWzFdIHx8IG1bMl0pIDogc3RhY2s7XG5cdFx0Y29uc3QgY2FsbGVyID0gKHQuaW5kZXhPZignLycpID4gMCA/IHQuc3Vic3RyaW5nKDAsdC5pbmRleE9mKCcvJykpIDogJycpO1xuXHRcdGNvbnN0IF9kYXRlID0gbmV3IERhdGUoKTtcblx0XHRjb25zdCBfdGltZSA9IChfZGF0ZS5nZXRNb250aCgpICsgMSkgKyBcIi9cIiArXG5cdFx0XHRcdFx0ICBfZGF0ZS5nZXREYXkoKSArIFwiL1wiICtcblx0XHRcdFx0XHQgIF9kYXRlLmdldEZ1bGxZZWFyKCkgKyBcIiBcIiArXG5cdFx0XHRcdFx0ICBfZGF0ZS5nZXRIb3VycygpICsgXCI6XCIgK1xuXHRcdFx0XHRcdCAgX2RhdGUuZ2V0TWludXRlcygpICsgXCI6XCIgK1xuXHRcdFx0XHRcdCAgX2RhdGUuZ2V0U2Vjb25kcygpICsgXCI6XCIgK1xuXHRcdFx0XHRcdCAgX2RhdGUuZ2V0TWlsbGlzZWNvbmRzKCk7XG5cdFx0cmV0dXJuIFtfdGltZSArIFwiIFtcIiArIG4gKyAoY2FsbGVyID8gXCIgfCBcIiArIGNhbGxlciA6ICcnKSArIFwiXSBcIl0uY29uY2F0KC4uLmFyZ3MpO1xuXHR9XG5cdHByaXZhdGUgX2luZm8oLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLmluZm9EaXNhYmxlZCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLm9wdGlvbnMuaW5mb0Rpc2FibGVkKSAmJlxuXHRcdFx0IXRoaXMuX3N1cHByZXNzZWQoYXJncykgJiYgIXRoaXMuX3Rocm90dGxlKGFyZ3MpICYmICF0aGlzLl9ibG9ja2VkKGFyZ3MpKSB7XG5cdFx0XHRjb25zdCBuZXdBcmdzID0gdGhpcy5vcHRpb25zLnVwc2NhbGUgP1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cHNjYWxlKGFyZ3MpIDogYXJncztcblx0XHRcdFxuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy51cGdyYWRlKSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiW2xvZ11cIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdExvZyguLi5uZXdBcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJbaW5mb11cIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdEluZm8oLi4ubmV3QXJncyk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3JlcG9ydFdhdGNoKGFyZ3MpO1xuXHR9XG5cdHByaXZhdGUgX2xvZyguLi5hcmdzKSB7XG5cdFx0aWYgKCh0aGlzLm9wdGlvbnMubG9nRGlzYWJsZWQgPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5vcHRpb25zLmxvZ0Rpc2FibGVkKSAmJlxuXHRcdFx0IXRoaXMuX3N1cHByZXNzZWQoYXJncykgJiYgIXRoaXMuX3Rocm90dGxlKGFyZ3MpICYmICF0aGlzLl9ibG9ja2VkKGFyZ3MpKSB7XG5cdFx0XHRjb25zdCBuZXdBcmdzID0gdGhpcy5vcHRpb25zLnVwc2NhbGUgP1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cHNjYWxlKGFyZ3MpIDogYXJncztcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZG93bkdyYWRlKSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiW2luZm9dXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRJbmZvKC4uLm5ld0FyZ3MpO1x0XHRcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLm9wdGlvbnMudXBncmFkZSkge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcIlt3YXJuXVwiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVmYXVsdFdhcm4oLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdFdhcm4oLi4ubmV3QXJncyk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcIltsb2ddXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3JlcG9ydFdhdGNoKGFyZ3MpO1xuXHR9XG5cdHByaXZhdGUgX3dhcm4oLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLndhcm5EaXNhYmxlZCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLm9wdGlvbnMud2FybkRpc2FibGVkKSAmJlxuXHRcdFx0IXRoaXMuX3N1cHByZXNzZWQoYXJncykgJiYgIXRoaXMuX3Rocm90dGxlKGFyZ3MpICYmICF0aGlzLl9ibG9ja2VkKGFyZ3MpKSB7XG5cdFx0XHRjb25zdCBuZXdBcmdzID0gdGhpcy5vcHRpb25zLnVwc2NhbGUgP1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cHNjYWxlKGFyZ3MpIDogYXJncztcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZG93bkdyYWRlKSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiW2xvZ11cIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdExvZyguLi5uZXdBcmdzKTtcdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLnVwZ3JhZGUpIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJbZXJyb3JdXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0RXJyb3IoLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdEVycm9yKC4uLm5ld0FyZ3MpO1x0XHRcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJbd2Fybl1cIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRXYXJuKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRXYXJuKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3JlcG9ydFdhdGNoKGFyZ3MpO1xuXHR9XG5cdHByaXZhdGUgX2Vycm9yKC4uLmFyZ3MpIHtcblx0XHRpZiAoKHRoaXMub3B0aW9ucy5lcnJvckRpc2FibGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMub3B0aW9ucy5lcnJvckRpc2FibGVkKSAmJlxuXHRcdFx0IXRoaXMuX3N1cHByZXNzZWQoYXJncykgJiYgIXRoaXMuX3Rocm90dGxlKGFyZ3MpICYmICF0aGlzLl9ibG9ja2VkKGFyZ3MpKSB7XG5cdFx0XHRjb25zdCBuZXdBcmdzID0gdGhpcy5vcHRpb25zLnVwc2NhbGUgP1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cHNjYWxlKGFyZ3MpIDogYXJncztcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZG93bkdyYWRlKSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiW2xvZ11cIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdExvZyguLi5uZXdBcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJbZXJyb3JdXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0RXJyb3IoLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdEVycm9yKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3JlcG9ydFdhdGNoKGFyZ3MpO1xuXHR9XG5cdHByaXZhdGUgX3RhYmxlKC4uLmFyZ3MpIHtcblx0XHRpZiAoKHRoaXMub3B0aW9ucy50YWJsZURpc2FibGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMub3B0aW9ucy5lcnJvckRpc2FibGVkKSAmJlxuXHRcdFx0IXRoaXMuX3N1cHByZXNzZWQoYXJncykgJiYgIXRoaXMuX3Rocm90dGxlKGFyZ3MpICYmICF0aGlzLl9ibG9ja2VkKGFyZ3MpKSB7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0Y29uc3QgbmV3QXJncyA9IHRoaXMub3B0aW9ucy51cHNjYWxlID9cblx0XHRcdFx0dGhpcy5fdXBzY2FsZShhcmdzKSA6IGFyZ3M7XG5cdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiW3RhYmxlXVwiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0VGFibGUoLi4uYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuZGVmYXVsdFRhYmxlKC4uLmFyZ3MpO1x0XHRcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5fcmVwb3J0V2F0Y2goYXJncyk7XG5cdH1cblx0cHJpdmF0ZSBfdHJhY2UoLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLnRyYWNlRGlzYWJsZWQgPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5vcHRpb25zLnRyYWNlRGlzYWJsZWQpICYmIFxuXHRcdFx0IXRoaXMuX3Rocm90dGxlKGFyZ3MpICkge1xuXHRcdFx0Y29uc3QgbmV3QXJncyA9IHRoaXMub3B0aW9ucy51cHNjYWxlID9cblx0XHRcdFx0XHRcdFx0dGhpcy5fdXBzY2FsZShhcmdzKSA6IGFyZ3M7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJbdHJhY2VdXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRUcmFjZSguLi5uZXdBcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5kZWZhdWx0VHJhY2UoLi4ubmV3QXJncyk7XHRcdFxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9yZXBvcnRXYXRjaChhcmdzKTtcblx0fVxuXHRwcml2YXRlIF9leGNlcHRpb24oLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLmV4Y2VwdGlvbkRpc2FibGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMub3B0aW9ucy5leGNlcHRpb25EaXNhYmxlZCkgJiYgXG5cdFx0XHQhdGhpcy5fdGhyb3R0bGUoYXJncykgKSB7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJbZXhjZXB0aW9uXVwiLCAuLi5hcmdzXSk7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0RXhjZXB0aW9uKC4uLmFyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmRlZmF1bHRFeGNlcHRpb24oLi4uYXJncyk7XHRcdFxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9yZXBvcnRXYXRjaChhcmdzKTtcblx0fVxuXHRwcml2YXRlIF9kZWJ1ZyguLi5hcmdzKSB7XG5cdFx0aWYgKCh0aGlzLm9wdGlvbnMuZGVidWdEaXNhYmxlZCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLm9wdGlvbnMuZGVidWdEaXNhYmxlZCkgJiYgXG5cdFx0XHQhdGhpcy5fdGhyb3R0bGUoYXJncykgKSB7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJbZGVidWddXCIsIC4uLmFyZ3NdKTtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHREZWJ1ZyguLi5hcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5kZWZhdWx0RGVidWcoLi4uYXJncyk7XHRcdFxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9yZXBvcnRXYXRjaChhcmdzKTtcblx0fVxuXHRwcml2YXRlIF9hc3NlcnQoLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLmFzc2VydERpc2FibGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMub3B0aW9ucy5hc3NlcnREaXNhYmxlZCkgJiYgXG5cdFx0XHQhdGhpcy5fdGhyb3R0bGUoYXJncykgKSB7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJbYXNzZXJ0XVwiLCAuLi5hcmdzXSk7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0QXNzZXJ0KC4uLmFyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmRlZmF1bHRBc3NlcnQoLi4uYXJncyk7XHRcdFxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9yZXBvcnRXYXRjaChhcmdzKTtcblx0fVxuXHQvKlxuXHQqIFdpbGwgaW5pdGlhbGl6ZSBzbWFydCBsb2dnZXIuXG5cdCogQGluc3RydWN0aW9ucyBpbnN0cnVjdGlvbnMgdG8gZGlyZWN0IHRoaXMgc2VydmljZSB0byBzdXBwcmVzcyBsb2dzLlxuXHQqL1xuXHRtYWtlU21hcnRMb2dzKCBpbnN0cnVjdGlvbnM6IFNtYXJ0T3B0aW9ucyApIHtcblx0XHR0aGlzLm9wdGlvbnMgPSBpbnN0cnVjdGlvbnM7XG5cdFx0aWYgKGNvbnNvbGUubG9nKSB7XG5cdFx0XHRjb25zb2xlLmxvZyA9IHRoaXMuX2xvZy5iaW5kKHRoaXMpO1xuXHRcdH1cblx0XHRpZiAoY29uc29sZS5pbmZvKSB7XG5cdFx0XHRjb25zb2xlLmluZm8gPSB0aGlzLl9pbmZvLmJpbmQodGhpcyk7XG5cdFx0fVxuXHRcdGlmIChjb25zb2xlLndhcm4pIHtcblx0XHRcdGNvbnNvbGUud2FybiA9IHRoaXMuX3dhcm4uYmluZCh0aGlzKTtcblx0XHR9XG5cdFx0aWYgKGNvbnNvbGUuZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IgPSB0aGlzLl9lcnJvci5iaW5kKHRoaXMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLmVycm9yID0gKC4uLmFyZ3MpID0+IHt9XG5cdFx0fVxuXHRcdGlmIChjb25zb2xlLnRhYmxlKSB7XG5cdFx0XHRjb25zb2xlLnRhYmxlID0gdGhpcy5fdGFibGUuYmluZCh0aGlzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS50YWJsZSA9ICguLi5hcmdzKSA9PiB7fVxuXHRcdH1cblx0XHRpZiAoY29uc29sZS50cmFjZSkge1xuXHRcdFx0Y29uc29sZS50cmFjZSA9IHRoaXMuX3RyYWNlLmJpbmQodGhpcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnNvbGUudHJhY2UgPSAoLi4uYXJncykgPT4ge31cblx0XHR9XG5cdFx0aWYgKGNvbnNvbGUuZGVidWcpIHtcblx0XHRcdGNvbnNvbGUuZGVidWcgPSB0aGlzLl9kZWJ1Zy5iaW5kKHRoaXMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLmRlYnVnID0gKC4uLmFyZ3MpID0+IHt9XG5cdFx0fVxuXHRcdGlmIChjb25zb2xlLmFzc2VydCkge1xuXHRcdFx0Y29uc29sZS5hc3NlcnQgPSB0aGlzLl9hc3NlcnQuYmluZCh0aGlzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS5hc3NlcnQgPSAoLi4uYXJncykgPT4ge31cblx0XHR9XG5cdFx0aWYgKGNvbnNvbGUuZXhjZXB0aW9uKSB7XG5cdFx0XHRjb25zb2xlLmV4Y2VwdGlvbiA9IHRoaXMuX2V4Y2VwdGlvbi5iaW5kKHRoaXMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLmV4Y2VwdGlvbiA9ICguLi5hcmdzKSA9PiB7fVxuXHRcdH1cblx0fVxuXHQvKlxuXHQqIEByZXR1cm4gRXZlbnQgRW1pdHRlciB0aGF0IG1heSBwdWJsaXNnIGxvZ3MuXG5cdCovXG5cdHJlZGlyZWN0ZWRPdXRwdXQoKSB7XG5cdFx0cmV0dXJuIHRoaXMub3V0cHV0O1xuXHR9XG5cdC8qXG5cdCogV2lsbCBhZGQgYSBrZXkgdG8gdGhlIHdhcmNoIGxpc3QuXG5cdCogQGFyZ3Mga2V5IHRvIGJlIGFkZGVkLlxuXHQqL1xuXHRhZGRXYXRjaChrZXkpIHtcblx0XHRpZiAoIXRoaXMud2F0Y2hMaXN0W2tleV0pIHtcblx0XHRcdHRoaXMud2F0Y2hMaXN0W2tleV0gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLndhdGNoTGlzdFtrZXldO1xuXHR9XG5cdC8qXG5cdCogV2lsbCByZW1vdmUgYSBrZXkgZnJvbSB0aGUgd2FyY2ggbGlzdC5cblx0KiBAYXJncyBrZXkgdG8gYmUgcmVtb3ZlZC4gaXQgd2lsbCBiZSB3aXNlIHRvIHJlbW92ZSBzdWJzY3JpcHRpb25zIHRvIHRoaXMga2V5IGJlZm9yZSBjYWxsaW5nIHRoaXMgbWV0aG9kLlxuXHQqL1xuXHRyZW1vdmVXYXRjaChrZXkpIHtcblx0XHRkZWxldGUgdGhpcy53YXRjaExpc3Rba2V5XTtcblx0fVxuXHQvKlxuXHQqIFdpbGwgY2xlYXIgd2FyY2ggbGlzdC5cblx0KiBAYXJncyBsaXN0IGlzIGEgbGlzdCBvZiBzdWJzY3JpYmVycyB0byB0aGUgaXRlbXMgaW4gd2F0Y2hsaXN0LiBcblx0KiBJdCBjb3VsZCBiZSBlbXB0eSwgYnV0IHRvIGF2b2lkIGxlYWtzLCBpdCB3aWxsIGJlIHdpc2UgdG8ga2VlcCBhIHJlY29yZCBvZiB5b3VyIHN1YnNjcmlwdGlvbnMuXG5cdCovXG5cdGNsZWFyV2F0Y2hMaXN0KGxpc3Q6IGFueVtdKSB7XG5cdFx0bGlzdC5tYXAoKHNiYykgPT4gc2JjLnVuc3Vic2NyaWJlKCkpO1xuXHRcdHRoaXMud2F0Y2hMaXN0ID0ge307XG5cdH1cblx0Lypcblx0KiBXaWxsIG1hcmt1cCBzdGFjayB0cmFjZSB0byBwcm92aWRlIEhUTUwgZnJhZ21lbnQgd2l0aCBhbmNob3JzIGZvZSBldmVyeSB0cmFjZS5cblx0KiBAYXJncyBhcmd1bWVudCB0aGF0IG1heSBjb250YWlsIHN0YWNrIHRyYWNlLlxuXHQqIEByZXR1cm4gQSBtb3JlIGZvcm1hbCBjb250ZW50IHdpdGggaHRtbCBmcmFnbWVudCBpZiBzdGFjayB0cmF2Y2UgYXBwbGllZCBpYiBhZHZhbmNlLlxuXHQqL1xuXHRtYXJrdXBUcmFjZShhcmdzOiBhbnkpIHtcblx0XHRsZXQgcmVzdWx0ID0gYXJncztcblx0XHRpZiAoYXJncyBpbnN0YW5jZW9mIEFycmF5KSB7XG5cdFx0XHRyZXN1bHQgPSBbXTtcblx0XHRcdGFyZ3MubWFwKFxuXHRcdFx0XHQoaXRlbTogYW55KSA9PiB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdFx0Y29uc3QgYnJlYWtPbiA9IChpdGVtLmluZGV4T2YoJ1xcbicpID4gMCkgPyAnXFxuJyA6ICgoaXRlbS5pbmRleE9mKCdcXHInKSA+IDApID8gJ1xccicgOiB1bmRlZmluZWQpO1xuXHRcdFx0XHRcdFx0aWYgKGJyZWFrT24gJiYgKGl0ZW0uaW5kZXhPZignQCcpID4gLTEgfHwgaXRlbS5pbmRleE9mKCcoJykgPiAtMSkgJiYgaXRlbS5pbmRleE9mKCc6JykgPiAwKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGxpc3QgPSBbXTtcblx0XHRcdFx0XHRcdFx0aXRlbS5zcGxpdChicmVha09uKS5tYXAoXG5cdFx0XHRcdFx0XHRcdFx0KGxpbmU6IHN0cmluZykgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgeCA9IGxpbmUuaW5kZXhPZignQCcpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgeiA9IGxpbmUuaW5kZXhPZignKCcpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHogPiAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHN1Ymxpc3QgPSBsaW5lLnN1YnN0cmluZyh6KzEsIGxpbmUubGVuZ3RoIC0gMSkuc3BsaXQoJzonKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgbGVuID0gc3VibGlzdC5sZW5ndGg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBsaW5lLnN1YnN0cmluZygwLCB6KSArICc6JyArIHN1Ymxpc3RbbGVuIC0gMl0gKyAnOicgKyBzdWJsaXN0W2xlbiAtIDFdO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCByZWYgPSBzdWJsaXN0LnNsaWNlKDAsIGxlbiAtIDIpLmpvaW4oJzonKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRsaXN0LnB1c2goJzxhIGhyZWY9XCInICsgcmVmICsgICdcIj4nICsgbmFtZSArICc8L2E+Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHggPj0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCB5ID0gbGluZS5pbmRleE9mKCc6Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICh5IDwgMCApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsaXN0LnB1c2goJzxhIGhyZWY9XCInICsgbGluZS5zdWJzdHJpbmcoeCsxKSArICAnXCI+JyArXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGluZS5zdWJzdHJpbmcoMCwgeCkgK1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8L2E+Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3Qgc3VibGlzdCA9IGxpbmUuc3Vic3RyaW5nKHgrMSwgbGluZS5sZW5ndGgpLnNwbGl0KCc6Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgbGVuID0gc3VibGlzdC5sZW5ndGg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgbmFtZSA9IGxpbmUuc3Vic3RyaW5nKDAsIHgpICsgJzonICsgc3VibGlzdFtsZW4gLSAyXSArICc6JyArIHN1Ymxpc3RbbGVuIC0gMV07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgcmVmID0gc3VibGlzdC5zbGljZSgwLCBsZW4gLSAyKS5qb2luKCc6Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGlzdC5wdXNoKCc8YSBocmVmPVwiJyArIHJlZiArICAnXCI+JyArIG5hbWUgKyAnPC9hPicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRsaXN0LnB1c2gobGluZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRyZXN1bHQucHVzaChsaXN0LmpvaW4oJzxiciAvPicpKTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoYnJlYWtPbikge1xuXHRcdFx0XHRcdFx0XHRyZXN1bHQucHVzaChpdGVtLnNwbGl0KGJyZWFrT24pLmpvaW4oJzxiciAvPicpKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRyZXN1bHQucHVzaChKU09OLnN0cmluZ2lmeShpdGVtKSk7XG5cdFx0XHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRcdFx0aWYgKGl0ZW0ubWVzc2FnZSkge1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW0ubWVzc2FnZSk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG59XG4iXX0=