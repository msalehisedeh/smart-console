import { __spread } from 'tslib';
import { Injectable, EventEmitter, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
        return (_a = [_time + " [" + n + (caller ? " | " + caller : '') + "] "]).concat.apply(_a, __spread(args));
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
            !this._suppressed(args) &&
            !this._blocked(args)) {
            /** @type {?} */
            var newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.upgrade) {
                if (this.options.emitOutput) {
                    this.output.emit(__spread(["log"], newArgs));
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
                    this.output.emit(__spread(["info"], newArgs));
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
            !this._suppressed(args) &&
            !this._blocked(args)) {
            /** @type {?} */
            var newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.downGrade) {
                if (this.options.emitOutput) {
                    this.output.emit(__spread(["info"], newArgs));
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
                    this.output.emit(__spread(["warn"], newArgs));
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
                    this.output.emit(__spread(["log"], newArgs));
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
            !this._suppressed(args) &&
            !this._blocked(args)) {
            /** @type {?} */
            var newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.downGrade) {
                if (this.options.emitOutput) {
                    this.output.emit(__spread(["log"], newArgs));
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
                    this.output.emit(__spread(["error"], newArgs));
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
                    this.output.emit(__spread(["warn"], newArgs));
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
            !this._suppressed(args) &&
            !this._blocked(args)) {
            /** @type {?} */
            var newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.downGrade) {
                if (this.options.emitOutput) {
                    this.output.emit(__spread(["log"], newArgs));
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
                    this.output.emit(__spread(["error"], newArgs));
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
            !this._suppressed(args) &&
            !this._blocked(args)) {
            /** @type {?} */
            var newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.emitOutput) {
                this.output.emit(__spread(["table"], newArgs));
                if (this.options.logAfterEmit) {
                    this.defaultTable.apply(this, __spread(newArgs));
                }
            }
            else {
                this.defaultTable.apply(this, __spread(newArgs));
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
        if ((this.options.traceDisabled === undefined || !this.options.traceDisabled)) {
            /** @type {?} */
            var newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.emitOutput) {
                this.output.emit(__spread(["trace"], newArgs));
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
        if ((this.options.exceptionDisabled === undefined || !this.options.exceptionDisabled)) {
            if (this.options.emitOutput) {
                this.output.emit(__spread(["exception"], args));
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
        if ((this.options.debugDisabled === undefined || !this.options.debugDisabled)) {
            if (this.options.emitOutput) {
                this.output.emit(__spread(["debug"], args));
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
        if ((this.options.assertDisabled === undefined || !this.options.assertDisabled)) {
            if (this.options.emitOutput) {
                this.output.emit(__spread(["assert"], args));
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
        if (console.table) {
            console.table = this._table.bind(this);
        }
        if (console.trace) {
            console.trace = this._trace.bind(this);
        }
        if (console.debug) {
            console.debug = this._debug.bind(this);
        }
        if (console.assert) {
            console.assert = this._assert.bind(this);
        }
        if (console.exception) {
            console.exception = this._exception.bind(this);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var SmartConsoleModule = /** @class */ (function () {
    function SmartConsoleModule() {
    }
    SmartConsoleModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [],
                    exports: [],
                    imports: [CommonModule],
                    providers: [SmartConsoleService],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
                },] }
    ];
    return SmartConsoleModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { SmartConsoleService, SmartConsoleModule };

//# sourceMappingURL=sedeh-smart-console.js.map