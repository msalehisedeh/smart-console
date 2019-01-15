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
SmartOptions.prototype.assertDisabled;
/** @type {?|undefined} */
SmartOptions.prototype.downGrade;
/** @type {?|undefined} */
SmartOptions.prototype.upgrade;
/** @type {?|undefined} */
SmartOptions.prototype.upscale;
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
        this.output = new EventEmitter();
        this.watchList = {};
    }
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
            var x_1 = (args instanceof Array) ?
                args.join(',') :
                (typeof args === 'object') ?
                    JSON.stringify(args) : "" + args;
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
            /** @type {?} */
            var logStr_1 = tslib_1.__spread(args).join(',');
            list.map(function (key) {
                if (logStr_1.indexOf(key) > -1) {
                    _this.watchList[key].emit(tslib_1.__spread(args));
                }
                ;
            });
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
            !this._suppressed(args) &&
            !this._blocked(args)) {
            /** @type {?} */
            var newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.upgrade) {
                if (this.options.emitOutput) {
                    this.output.emit(tslib_1.__spread(["log"], newArgs));
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
                    this.output.emit(tslib_1.__spread(["info"], newArgs));
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
            !this._suppressed(args) &&
            !this._blocked(args)) {
            /** @type {?} */
            var newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.downGrade) {
                if (this.options.emitOutput) {
                    this.output.emit(tslib_1.__spread(["info"], newArgs));
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
                    this.output.emit(tslib_1.__spread(["warn"], newArgs));
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
                    this.output.emit(tslib_1.__spread(["log"], newArgs));
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
            !this._suppressed(args) &&
            !this._blocked(args)) {
            /** @type {?} */
            var newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.downGrade) {
                if (this.options.emitOutput) {
                    this.output.emit(tslib_1.__spread(["log"], newArgs));
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
                    this.output.emit(tslib_1.__spread(["error"], newArgs));
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
                    this.output.emit(tslib_1.__spread(["warn"], newArgs));
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
            !this._suppressed(args) &&
            !this._blocked(args)) {
            /** @type {?} */
            var newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.downGrade) {
                if (this.options.emitOutput) {
                    this.output.emit(tslib_1.__spread(["log"], newArgs));
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
                    this.output.emit(tslib_1.__spread(["error"], newArgs));
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
            !this._suppressed(args) &&
            !this._blocked(args)) {
            /** @type {?} */
            var newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.emitOutput) {
                this.output.emit(tslib_1.__spread(["table"], newArgs));
                if (this.options.logAfterEmit) {
                    this.defaultTable.apply(this, tslib_1.__spread(newArgs));
                }
            }
            else {
                this.defaultTable.apply(this, tslib_1.__spread(newArgs));
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
                this.output.emit(tslib_1.__spread(["trace"], newArgs));
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
                this.output.emit(tslib_1.__spread(["assert"], args));
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
        console.log = this._log.bind(this);
        console.info = this._info.bind(this);
        console.warn = this._warn.bind(this);
        console.error = this._error.bind(this);
        console.table = this._table.bind(this);
        console.trace = this._trace.bind(this);
        console.assert = this._assert.bind(this);
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
        if (args instanceof Array) {
            args.map(function (item, index) {
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
                        args[index] = list_1.join('<br />');
                    }
                    else if (breakOn) {
                        args[index] = item.split(breakOn).join('<br />');
                    }
                }
            });
        }
        return args;
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
    SmartConsoleService.prototype.output;
    /** @type {?} */
    SmartConsoleService.prototype.watchList;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnQtY29uc29sZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL3NtYXJ0LWNvbnNvbGUvIiwic291cmNlcyI6WyJzcmMvYXBwL3NtYXJ0LWNvbnNvbGUvc21hcnQtY29uc29sZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQXNCakMsT0FBTyxDQUFDLEdBQUc7MkJBQ1YsT0FBTyxDQUFDLElBQUk7MkJBQ1osT0FBTyxDQUFDLElBQUk7NEJBQ1gsT0FBTyxDQUFDLEtBQUs7NEJBQ2IsT0FBTyxDQUFDLEtBQUs7NEJBQ2IsT0FBTyxDQUFDLEtBQUs7NkJBQ1osT0FBTyxDQUFDLE1BQU07c0JBQ3JCLElBQUksWUFBWSxFQUFFO3lCQUNmLEVBQUU7Ozs7OztJQUVkLHlDQUFXOzs7OztRQUFDLGNBQU87YUFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1lBQVAseUJBQU87OztRQUMxQixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOztZQUMzQixJQUFNLEdBQUMsR0FBRyxDQUFDLElBQUksWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztZQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQ3hCLFVBQUMsSUFBSTtnQkFDSixFQUFF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QUcsR0FBRyxHQUFJLElBQUksR0FBRyxNQUFJLEdBQUcsTUFBTSxDQUFDLENBQUM7aUNBQ3JEOzZCQUNEOzRCQUFDLElBQUksQ0FBQyxDQUFDO2dDQUNQLE1BQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7NkJBQ2hCO3lCQUNELENBQ0QsQ0FBQzt3QkFDRixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztxQkFDbEM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztxQkFDakQ7aUJBQ0Q7YUFDRCxDQUNELENBQUM7U0FDRjtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDWjs7Z0JBN1dELFVBQVU7OzhCQXJCWDs7U0FzQmEsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiovXG5pbXBvcnQge0luamVjdGFibGUsIEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU21hcnRPcHRpb25zIHtcblx0ZW1pdE91dHB1dD86IGJvb2xlYW4sLy8gbG9nIHJlc3VsdCBpbiB0byBvdXRwdXQgaW5zdGVkIG9mIGNvbnNvbGUuXG5cdGxvZ0FmdGVyRW1pdD86IGJvb2xlYW4sIC8vIGNvbnRpbnVlIGxvZ2dpbmcgaW50byBicm93c2VyIGNvbnNvbGUgYWZ0ZXIgZW1pdHRpbmcgdGhlIGxvZ1xuXHRsb2dEaXNhYmxlZD86IGJvb2xlYW4sICAgLy8gZGlzYWJsZXMgYWxsIGxvZyBsZXZlbCBjb25zb2xlIGxvZ3Ncblx0aW5mb0Rpc2FibGVkPzogYm9vbGVhbiwgIC8vIGRpc2FibGVzIGFsbCBpbmZvIGxldmVsIGNvbnNvbGUgbG9nc1xuXHR3YXJuRGlzYWJsZWQ/OiBib29sZWFuLCAgLy8gZGlzYWJsZXMgYWxsIHdhcm4gbGV2ZWwgY29uc29sZSBsb2dzXG5cdGVycm9yRGlzYWJsZWQ/OiBib29sZWFuLCAvLyBkaXNhYmxlcyBhbGwgZXJyb3IgbGV2ZWwgY29uc29sZSBsb2dzXG5cdHRhYmxlRGlzYWJsZWQ/OiBib29sZWFuLCAvLyBkaXNhYmxlcyBhbGwgdGFibGUgY29uc29sZSBsb2dzXG5cdHRyYWNlRGlzYWJsZWQ/OiBib29sZWFuLCAvLyBkaXNhYmxlcyBhbGwgdHJhY2UgbGV2ZWwgY29uc29sZSBsb2dzXG5cdGFzc2VydERpc2FibGVkPzpib29sZWFuLCAvLyBkaXNhYmxlcyBhc3NlcnQgbG9ncyBvbiBjb25zb2xlXG5cdGRvd25HcmFkZT86IGJvb2xlYW4sICAgICAvLyBkb3duZ3JhZGUgYSBsb2cgZnJvbSB3YXJuaW5nIHRvIGluZm8gb3IgbG9nIHRvIHdhcm5pbmcsIG9yIGVycm9yIHRvIGxvZy5cblx0dXBncmFkZT86IGJvb2xlYW4sICAgICAgIC8vIHVwZ3JhZGVzIGEgbG9nIGZyb20gaW5mbyB0byB3YXJuaW5nIG9yIHdhcm5pbmcgdG8gbG9nLCBvciBsb2cgdG8gZXJyb3Jcblx0dXBzY2FsZT86IGJvb2xlYW4sICAgICAgIC8vIHNob3dzIGFkZGl0aW9uYWwgaW5mbyBvbiBlYWNoIGxvZ1xuXHRibG9ja0NhbGxlcj86IGFueVtdLCAgICAgLy8gYmxvY2tzIHRoZSBjYWxsZXJcblx0c3VwcHJlc3M/OiBhbnlbXSAgICAgICAgIC8vIGJsb2NrcyBwZXIgYSBrZXl3b3JkXG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTbWFydENvbnNvbGVTZXJ2aWNlIHtcblx0cHJpdmF0ZSBvcHRpb25zOiBTbWFydE9wdGlvbnM7XG5cdHByaXZhdGUgZGVmYXVsdExvZyA9IGNvbnNvbGUubG9nO1xuXHRwcml2YXRlIGRlZmF1bHRJbmZvID0gY29uc29sZS5pbmZvO1xuXHRwcml2YXRlIGRlZmF1bHRXYXJuID0gY29uc29sZS53YXJuO1xuXHRwcml2YXRlIGRlZmF1bHRFcnJvciA9IGNvbnNvbGUuZXJyb3I7XG5cdHByaXZhdGUgZGVmYXVsdFRhYmxlID0gY29uc29sZS50YWJsZTtcblx0cHJpdmF0ZSBkZWZhdWx0VHJhY2UgPSBjb25zb2xlLnRyYWNlO1xuXHRwcml2YXRlIGRlZmF1bHRBc3NlcnQgPSBjb25zb2xlLmFzc2VydDtcblx0cHJpdmF0ZSBvdXRwdXQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cdHByaXZhdGUgd2F0Y2hMaXN0ID0ge307XG5cblx0cHJpdmF0ZSBfc3VwcHJlc3NlZCguLi5hcmdzKSB7XG5cdFx0bGV0IHJlc3VsdCA9IGZhbHNlO1xuXHRcdGlmICh0aGlzLm9wdGlvbnMuc3VwcHJlc3MpIHtcblx0XHRcdGNvbnN0IHggPSAoYXJncyBpbnN0YW5jZW9mIEFycmF5KSA/XG5cdFx0XHRcdFx0XHRcdGFyZ3Muam9pbignLCcpIDogXG5cdFx0XHRcdFx0XHRcdCh0eXBlb2YgYXJncyA9PT0gJ29iamVjdCcpID9cblx0XHRcdFx0XHRcdFx0SlNPTi5zdHJpbmdpZnkoYXJncykgOiBcIlwiICsgYXJncztcblx0XHRcdHRoaXMub3B0aW9ucy5zdXBwcmVzcy5tYXAoXG5cdFx0XHRcdChpdGVtKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHguaW5kZXhPZihpdGVtKSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXHRwcml2YXRlIF9nZXRTdGFjaygpIHtcblx0XHQvLyB0aGlzIG1ldGhvZCBwdXJwb3NlIGlzIG9ubHkgdG8gZml4IElFIGlzc3VlLiBcblx0XHQvLyBpbiBJRSwgbmV3IEVycm9yKCkuc3RhY2sgIHdpbGwgYmUgdW5kZWZpbmVkXG5cdFx0Ly8gdW5sZXNzIGl0IGlzIGNhdWd0aCBpbiB0cnkgYmxvY2sgc3RhdGVtZW50LlxuXHRcdGxldCBzdGFjazogYW55ID0gJyc7XG5cdFx0dHJ5IHtcblx0XHQgIHRocm93IG5ldyBFcnJvcignZ2V0U3RhY2snKTtcblx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdHN0YWNrID0gZS5zdGFjaztcblx0XHRcdHN0YWNrID0gc3RhY2suaW5kZXhPZignXFxyJykgPiAwID8gc3RhY2suaW5kZXhPZignXFxyJykgOiBzdGFjay5zcGxpdCgnXFxuJyk7XG5cdFx0XHRzdGFjayA9IHN0YWNrWzRdO1xuXHRcdH1cblx0XHRyZXR1cm4gc3RhY2s7XG5cdH1cblx0cHJpdmF0ZSBfYmxvY2tlZCguLi5hcmdzKSB7XG5cdFx0bGV0IHJlc3VsdCA9IGZhbHNlO1xuXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5ibG9ja0NhbGxlcikge1xuXHRcdFx0Y29uc3Qgc3RhY2sgPSB0aGlzLl9nZXRTdGFjaygpO1xuXHRcdFx0dGhpcy5vcHRpb25zLmJsb2NrQ2FsbGVyLm1hcChcblx0XHRcdFx0KGl0ZW0pID0+IHtcblx0XHRcdFx0XHRpZiAoc3RhY2suaW5kZXhPZihpdGVtKSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXHRwcml2YXRlIF9yZXBvcnRXYXRjaChhcmdzKSB7XG5cdFx0Y29uc3QgbGlzdCA9IE9iamVjdC5rZXlzKHRoaXMud2F0Y2hMaXN0KTtcblx0XHRpZiAobGlzdC5sZW5ndGgpIHtcblx0XHRcdGNvbnN0IGxvZ1N0ciA9IFsuLi5hcmdzXS5qb2luKCcsJyk7XG5cdFx0XHRsaXN0Lm1hcChcblx0XHRcdFx0KGtleSkgPT4ge1xuXHRcdFx0XHRcdGlmIChsb2dTdHIuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0XHRcdHRoaXMud2F0Y2hMaXN0W2tleV0uZW1pdChbLi4uYXJnc10pO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBfdXBzY2FsZSguLi5hcmdzKSB7XG5cdFx0Y29uc3Qgc3RhY2sgPSB0aGlzLl9nZXRTdGFjaygpO1xuXHRcdGNvbnN0IHJlID0gLyhbXihdKylAfGF0IChbXihdKykgXFwoL2c7XG5cdFx0Y29uc3QgbSA9IHJlLmV4ZWMoc3RhY2spO1xuXHRcdGNvbnN0IGkgPSBzdGFjay5sYXN0SW5kZXhPZignLycpO1xuXHRcdGNvbnN0IG4gPSBpID4gMCA/IHN0YWNrLnN1YnN0cmluZyhpKzEpLnNwbGl0KCc6JylbMF0gOiBzdGFjaztcblx0XHRjb25zdCB0ID0gbSA/IChtWzFdIHx8IG1bMl0pIDogc3RhY2s7XG5cdFx0Y29uc3QgY2FsbGVyID0gKHQuaW5kZXhPZignLycpID4gMCA/IHQuc3Vic3RyaW5nKDAsdC5pbmRleE9mKCcvJykpIDogJycpO1xuXHRcdGNvbnN0IF9kYXRlID0gbmV3IERhdGUoKTtcblx0XHRjb25zdCBfdGltZSA9IChfZGF0ZS5nZXRNb250aCgpICsgMSkgKyBcIi9cIiArXG5cdFx0XHRcdFx0ICBfZGF0ZS5nZXREYXkoKSArIFwiL1wiICtcblx0XHRcdFx0XHQgIF9kYXRlLmdldEZ1bGxZZWFyKCkgKyBcIiBcIiArXG5cdFx0XHRcdFx0ICBfZGF0ZS5nZXRIb3VycygpICsgXCI6XCIgK1xuXHRcdFx0XHRcdCAgX2RhdGUuZ2V0TWludXRlcygpICsgXCI6XCIgK1xuXHRcdFx0XHRcdCAgX2RhdGUuZ2V0U2Vjb25kcygpICsgXCI6XCIgK1xuXHRcdFx0XHRcdCAgX2RhdGUuZ2V0TWlsbGlzZWNvbmRzKCk7XG5cdFx0cmV0dXJuIFtfdGltZSArIFwiIFtcIiArIG4gKyAoY2FsbGVyID8gXCIgfCBcIiArIGNhbGxlciA6ICcnKSArIFwiXSBcIl0uY29uY2F0KC4uLmFyZ3MpO1xuXHR9XG5cdHByaXZhdGUgX2luZm8oLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLmluZm9EaXNhYmxlZCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLm9wdGlvbnMuaW5mb0Rpc2FibGVkKSAmJlxuXHRcdFx0IXRoaXMuX3N1cHByZXNzZWQoYXJncykgJiZcblx0XHRcdCF0aGlzLl9ibG9ja2VkKGFyZ3MpKSB7XG5cdFx0XHRjb25zdCBuZXdBcmdzID0gdGhpcy5vcHRpb25zLnVwc2NhbGUgP1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cHNjYWxlKGFyZ3MpIDogYXJncztcblx0XHRcdFxuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy51cGdyYWRlKSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wibG9nXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiaW5mb1wiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVmYXVsdExvZyguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0SW5mbyguLi5uZXdBcmdzKTtcdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5fcmVwb3J0V2F0Y2goYXJncyk7XG5cdH1cblx0cHJpdmF0ZSBfbG9nKC4uLmFyZ3MpIHtcblx0XHRpZiAoKHRoaXMub3B0aW9ucy5sb2dEaXNhYmxlZCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLm9wdGlvbnMubG9nRGlzYWJsZWQpICYmXG5cdFx0XHQhdGhpcy5fc3VwcHJlc3NlZChhcmdzKSAmJlxuXHRcdFx0IXRoaXMuX2Jsb2NrZWQoYXJncykpIHtcblx0XHRcdGNvbnN0IG5ld0FyZ3MgPSB0aGlzLm9wdGlvbnMudXBzY2FsZSA/XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3Vwc2NhbGUoYXJncykgOiBhcmdzO1xuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5kb3duR3JhZGUpIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJpbmZvXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRJbmZvKC4uLm5ld0FyZ3MpO1x0XHRcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLm9wdGlvbnMudXBncmFkZSkge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcIndhcm5cIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRXYXJuKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRXYXJuKC4uLm5ld0FyZ3MpO1x0XHRcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJsb2dcIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdExvZyguLi5uZXdBcmdzKTtcdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5fcmVwb3J0V2F0Y2goYXJncyk7XG5cdH1cblx0cHJpdmF0ZSBfd2FybiguLi5hcmdzKSB7XG5cdFx0aWYgKCh0aGlzLm9wdGlvbnMud2FybkRpc2FibGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMub3B0aW9ucy53YXJuRGlzYWJsZWQpICYmXG5cdFx0XHQhdGhpcy5fc3VwcHJlc3NlZChhcmdzKSAmJlxuXHRcdFx0IXRoaXMuX2Jsb2NrZWQoYXJncykpIHtcblx0XHRcdGNvbnN0IG5ld0FyZ3MgPSB0aGlzLm9wdGlvbnMudXBzY2FsZSA/XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3Vwc2NhbGUoYXJncykgOiBhcmdzO1xuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5kb3duR3JhZGUpIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJsb2dcIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdExvZyguLi5uZXdBcmdzKTtcdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLnVwZ3JhZGUpIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJlcnJvclwiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVmYXVsdEVycm9yKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRFcnJvciguLi5uZXdBcmdzKTtcdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wid2FyblwiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVmYXVsdFdhcm4oLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdFdhcm4oLi4ubmV3QXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5fcmVwb3J0V2F0Y2goYXJncyk7XG5cdH1cblx0cHJpdmF0ZSBfZXJyb3IoLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLmVycm9yRGlzYWJsZWQgPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5vcHRpb25zLmVycm9yRGlzYWJsZWQpICYmXG5cdFx0XHQhdGhpcy5fc3VwcHJlc3NlZChhcmdzKSAmJlxuXHRcdFx0IXRoaXMuX2Jsb2NrZWQoYXJncykpIHtcblx0XHRcdGNvbnN0IG5ld0FyZ3MgPSB0aGlzLm9wdGlvbnMudXBzY2FsZSA/XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3Vwc2NhbGUoYXJncykgOiBhcmdzO1xuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5kb3duR3JhZGUpIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJsb2dcIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdExvZyguLi5uZXdBcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJlcnJvclwiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVmYXVsdEVycm9yKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRFcnJvciguLi5uZXdBcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9yZXBvcnRXYXRjaChhcmdzKTtcblx0fVxuXHRwcml2YXRlIF90YWJsZSguLi5hcmdzKSB7XG5cdFx0aWYgKCh0aGlzLm9wdGlvbnMudGFibGVEaXNhYmxlZCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLm9wdGlvbnMuZXJyb3JEaXNhYmxlZCkgJiZcblx0XHRcdCF0aGlzLl9zdXBwcmVzc2VkKGFyZ3MpICYmXG5cdFx0XHQhdGhpcy5fYmxvY2tlZChhcmdzKSkge1xuXHRcdFx0Y29uc3QgbmV3QXJncyA9IHRoaXMub3B0aW9ucy51cHNjYWxlID9cblx0XHRcdFx0XHRcdFx0dGhpcy5fdXBzY2FsZShhcmdzKSA6IGFyZ3M7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJ0YWJsZVwiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0VGFibGUoLi4ubmV3QXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuZGVmYXVsdFRhYmxlKC4uLm5ld0FyZ3MpO1x0XHRcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5fcmVwb3J0V2F0Y2goYXJncyk7XG5cdH1cblx0cHJpdmF0ZSBfdHJhY2UoLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLnRyYWNlRGlzYWJsZWQgPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5vcHRpb25zLnRyYWNlRGlzYWJsZWQpKSB7XG5cdFx0XHRjb25zdCBuZXdBcmdzID0gdGhpcy5vcHRpb25zLnVwc2NhbGUgP1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cHNjYWxlKGFyZ3MpIDogYXJncztcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcInRyYWNlXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRUcmFjZSguLi5uZXdBcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5kZWZhdWx0VHJhY2UoLi4ubmV3QXJncyk7XHRcdFxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9yZXBvcnRXYXRjaChhcmdzKTtcblx0fVxuXHRwcml2YXRlIF9hc3NlcnQoLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLmFzc2VydERpc2FibGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMub3B0aW9ucy5hc3NlcnREaXNhYmxlZCkpIHtcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcImFzc2VydFwiLCAuLi5hcmdzXSk7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0QXNzZXJ0KC4uLmFyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmRlZmF1bHRBc3NlcnQoLi4uYXJncyk7XHRcdFxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9yZXBvcnRXYXRjaChhcmdzKTtcblx0fVxuXHQvKlxuXHQqIFdpbGwgaW5pdGlhbGl6ZSBzbWFydCBsb2dnZXIuXG5cdCogQGluc3RydWN0aW9ucyBpbnN0cnVjdGlvbnMgdG8gZGlyZWN0IHRoaXMgc2VydmljZSB0byBzdXBwcmVzcyBsb2dzLlxuXHQqL1xuXHRtYWtlU21hcnRMb2dzKCBpbnN0cnVjdGlvbnM6IFNtYXJ0T3B0aW9ucyApIHtcblx0XHR0aGlzLm9wdGlvbnMgPSBpbnN0cnVjdGlvbnM7XG5cdFx0Y29uc29sZS5sb2cgPSB0aGlzLl9sb2cuYmluZCh0aGlzKTtcblx0XHRjb25zb2xlLmluZm8gPSB0aGlzLl9pbmZvLmJpbmQodGhpcyk7XG5cdFx0Y29uc29sZS53YXJuID0gdGhpcy5fd2Fybi5iaW5kKHRoaXMpO1xuXHRcdGNvbnNvbGUuZXJyb3IgPSB0aGlzLl9lcnJvci5iaW5kKHRoaXMpO1xuXHRcdGNvbnNvbGUudGFibGUgPSB0aGlzLl90YWJsZS5iaW5kKHRoaXMpO1xuXHRcdGNvbnNvbGUudHJhY2UgPSB0aGlzLl90cmFjZS5iaW5kKHRoaXMpO1xuXHRcdGNvbnNvbGUuYXNzZXJ0ID0gdGhpcy5fYXNzZXJ0LmJpbmQodGhpcyk7XG5cdH1cblx0Lypcblx0KiBAcmV0dXJuIEV2ZW50IEVtaXR0ZXIgdGhhdCBtYXkgcHVibGlzZyBsb2dzLlxuXHQqL1xuXHRyZWRpcmVjdGVkT3V0cHV0KCkge1xuXHRcdHJldHVybiB0aGlzLm91dHB1dDtcblx0fVxuXHQvKlxuXHQqIFdpbGwgYWRkIGEga2V5IHRvIHRoZSB3YXJjaCBsaXN0LlxuXHQqIEBhcmdzIGtleSB0byBiZSBhZGRlZC5cblx0Ki9cblx0YWRkV2F0Y2goa2V5KSB7XG5cdFx0aWYgKCF0aGlzLndhdGNoTGlzdFtrZXldKSB7XG5cdFx0XHR0aGlzLndhdGNoTGlzdFtrZXldID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy53YXRjaExpc3Rba2V5XTtcblx0fVxuXHQvKlxuXHQqIFdpbGwgcmVtb3ZlIGEga2V5IGZyb20gdGhlIHdhcmNoIGxpc3QuXG5cdCogQGFyZ3Mga2V5IHRvIGJlIHJlbW92ZWQuIGl0IHdpbGwgYmUgd2lzZSB0byByZW1vdmUgc3Vic2NyaXB0aW9ucyB0byB0aGlzIGtleSBiZWZvcmUgY2FsbGluZyB0aGlzIG1ldGhvZC5cblx0Ki9cblx0cmVtb3ZlV2F0Y2goa2V5KSB7XG5cdFx0ZGVsZXRlIHRoaXMud2F0Y2hMaXN0W2tleV07XG5cdH1cblx0Lypcblx0KiBXaWxsIGNsZWFyIHdhcmNoIGxpc3QuXG5cdCogQGFyZ3MgbGlzdCBpcyBhIGxpc3Qgb2Ygc3Vic2NyaWJlcnMgdG8gdGhlIGl0ZW1zIGluIHdhdGNobGlzdC4gXG5cdCogSXQgY291bGQgYmUgZW1wdHksIGJ1dCB0byBhdm9pZCBsZWFrcywgaXQgd2lsbCBiZSB3aXNlIHRvIGtlZXAgYSByZWNvcmQgb2YgeW91ciBzdWJzY3JpcHRpb25zLlxuXHQqL1xuXHRjbGVhcldhdGNoTGlzdChsaXN0OiBhbnlbXSkge1xuXHRcdGxpc3QubWFwKChzYmMpID0+IHNiYy51bnN1YnNjcmliZSgpKTtcblx0XHR0aGlzLndhdGNoTGlzdCA9IHt9O1xuXHR9XG5cdC8qXG5cdCogV2lsbCBtYXJrdXAgc3RhY2sgdHJhY2UgdG8gcHJvdmlkZSBIVE1MIGZyYWdtZW50IHdpdGggYW5jaG9ycyBmb2UgZXZlcnkgdHJhY2UuXG5cdCogQGFyZ3MgYXJndW1lbnQgdGhhdCBtYXkgY29udGFpbCBzdGFjayB0cmFjZS5cblx0KiBAcmV0dXJuIEEgbW9yZSBmb3JtYWwgY29udGVudCB3aXRoIGh0bWwgZnJhZ21lbnQgaWYgc3RhY2sgdHJhdmNlIGFwcGxpZWQgaWIgYWR2YW5jZS5cblx0Ki9cblx0bWFya3VwVHJhY2UoYXJnczogYW55KSB7XG5cdFx0aWYgKGFyZ3MgaW5zdGFuY2VvZiBBcnJheSkge1xuXHRcdFx0YXJncy5tYXAoXG5cdFx0XHRcdChpdGVtOiBhbnksIGluZGV4OiBudW1iZXIpID0+IHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBicmVha09uID0gKGl0ZW0uaW5kZXhPZignXFxuJykgPiAwKSA/ICdcXG4nIDogKChpdGVtLmluZGV4T2YoJ1xccicpID4gMCkgPyAnXFxyJyA6IHVuZGVmaW5lZCk7XG5cdFx0XHRcdFx0XHRpZiAoYnJlYWtPbiAmJiAoaXRlbS5pbmRleE9mKCdAJykgPiAtMSB8fCBpdGVtLmluZGV4T2YoJygnKSA+IC0xKSAmJiBpdGVtLmluZGV4T2YoJzonKSA+IDApIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgbGlzdCA9IFtdO1xuXHRcdFx0XHRcdFx0XHRpdGVtLnNwbGl0KGJyZWFrT24pLm1hcChcblx0XHRcdFx0XHRcdFx0XHQobGluZTogc3RyaW5nKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCB4ID0gbGluZS5pbmRleE9mKCdAJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCB6ID0gbGluZS5pbmRleE9mKCcoJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoeiA+IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3Qgc3VibGlzdCA9IGxpbmUuc3Vic3RyaW5nKHorMSwgbGluZS5sZW5ndGggLSAxKS5zcGxpdCgnOicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBsZW4gPSBzdWJsaXN0Lmxlbmd0aDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgbmFtZSA9IGxpbmUuc3Vic3RyaW5nKDAsIHopICsgJzonICsgc3VibGlzdFtsZW4gLSAyXSArICc6JyArIHN1Ymxpc3RbbGVuIC0gMV07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHJlZiA9IHN1Ymxpc3Quc2xpY2UoMCwgbGVuIC0gMikuam9pbignOicpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxpc3QucHVzaCgnPGEgaHJlZj1cIicgKyByZWYgKyAgJ1wiPicgKyBuYW1lICsgJzwvYT4nKTtcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoeCA+PSAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHkgPSBsaW5lLmluZGV4T2YoJzonKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHkgPCAwICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxpc3QucHVzaCgnPGEgaHJlZj1cIicgKyBsaW5lLnN1YnN0cmluZyh4KzEpICsgICdcIj4nICtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsaW5lLnN1YnN0cmluZygwLCB4KSArXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzwvYT4nKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBzdWJsaXN0ID0gbGluZS5zdWJzdHJpbmcoeCsxLCBsaW5lLmxlbmd0aCkuc3BsaXQoJzonKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBsZW4gPSBzdWJsaXN0Lmxlbmd0aDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBuYW1lID0gbGluZS5zdWJzdHJpbmcoMCwgeCkgKyAnOicgKyBzdWJsaXN0W2xlbiAtIDJdICsgJzonICsgc3VibGlzdFtsZW4gLSAxXTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCByZWYgPSBzdWJsaXN0LnNsaWNlKDAsIGxlbiAtIDIpLmpvaW4oJzonKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsaXN0LnB1c2goJzxhIGhyZWY9XCInICsgcmVmICsgICdcIj4nICsgbmFtZSArICc8L2E+Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxpc3QucHVzaChsaW5lKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdGFyZ3NbaW5kZXhdID0gbGlzdC5qb2luKCc8YnIgLz4nKTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoYnJlYWtPbikge1xuXHRcdFx0XHRcdFx0XHRhcmdzW2luZGV4XSA9IGl0ZW0uc3BsaXQoYnJlYWtPbikuam9pbignPGJyIC8+Jyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gYXJncztcblx0fVxufVxuIl19