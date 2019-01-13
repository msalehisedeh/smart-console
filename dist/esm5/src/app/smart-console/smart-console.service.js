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
                        args[index] = item.replace(/\r\n/g, '<br />');
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
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnQtY29uc29sZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL3NtYXJ0LWNvbnNvbGUvIiwic291cmNlcyI6WyJzcmMvYXBwL3NtYXJ0LWNvbnNvbGUvc21hcnQtY29uc29sZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQXNCakMsT0FBTyxDQUFDLEdBQUc7MkJBQ1YsT0FBTyxDQUFDLElBQUk7MkJBQ1osT0FBTyxDQUFDLElBQUk7NEJBQ1gsT0FBTyxDQUFDLEtBQUs7NEJBQ2IsT0FBTyxDQUFDLEtBQUs7NEJBQ2IsT0FBTyxDQUFDLEtBQUs7NkJBQ1osT0FBTyxDQUFDLE1BQU07c0JBQ3JCLElBQUksWUFBWSxFQUFFOzs7Ozs7SUFFM0IseUNBQVc7Ozs7O1FBQUMsY0FBTzthQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87WUFBUCx5QkFBTzs7O1FBQzFCLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7O1lBQzNCLElBQU0sR0FBQyxHQUFHLENBQUMsSUFBSSxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDaEIsQ0FBQyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FDeEIsVUFBQyxJQUFJO2dCQUNKLEVBQUUsQ0FBQyxDQUFD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LENBQUM7cUJBQzdDO2lCQUNEO2FBQ0QsQ0FDRCxDQUFDO1NBQ0Y7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ1o7O2dCQTVURCxVQUFVOzs4QkFyQlg7O1NBc0JhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4qL1xuaW1wb3J0IHtJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNtYXJ0T3B0aW9ucyB7XG5cdGVtaXRPdXRwdXQ/OiBib29sZWFuLC8vIGxvZyByZXN1bHQgaW4gdG8gb3V0cHV0IGluc3RlZCBvZiBjb25zb2xlLlxuXHRsb2dBZnRlckVtaXQ/OiBib29sZWFuLCAvLyBjb250aW51ZSBsb2dnaW5nIGludG8gYnJvd3NlciBjb25zb2xlIGFmdGVyIGVtaXR0aW5nIHRoZSBsb2dcblx0bG9nRGlzYWJsZWQ/OiBib29sZWFuLCAgIC8vIGRpc2FibGVzIGFsbCBsb2cgbGV2ZWwgY29uc29sZSBsb2dzXG5cdGluZm9EaXNhYmxlZD86IGJvb2xlYW4sICAvLyBkaXNhYmxlcyBhbGwgaW5mbyBsZXZlbCBjb25zb2xlIGxvZ3Ncblx0d2FybkRpc2FibGVkPzogYm9vbGVhbiwgIC8vIGRpc2FibGVzIGFsbCB3YXJuIGxldmVsIGNvbnNvbGUgbG9nc1xuXHRlcnJvckRpc2FibGVkPzogYm9vbGVhbiwgLy8gZGlzYWJsZXMgYWxsIGVycm9yIGxldmVsIGNvbnNvbGUgbG9nc1xuXHR0YWJsZURpc2FibGVkPzogYm9vbGVhbiwgLy8gZGlzYWJsZXMgYWxsIHRhYmxlIGNvbnNvbGUgbG9nc1xuXHR0cmFjZURpc2FibGVkPzogYm9vbGVhbiwgLy8gZGlzYWJsZXMgYWxsIHRyYWNlIGxldmVsIGNvbnNvbGUgbG9nc1xuXHRhc3NlcnREaXNhYmxlZD86Ym9vbGVhbiwgLy8gZGlzYWJsZXMgYXNzZXJ0IGxvZ3Mgb24gY29uc29sZVxuXHRkb3duR3JhZGU/OiBib29sZWFuLCAgICAgLy8gZG93bmdyYWRlIGEgbG9nIGZyb20gd2FybmluZyB0byBpbmZvIG9yIGxvZyB0byB3YXJuaW5nLCBvciBlcnJvciB0byBsb2cuXG5cdHVwZ3JhZGU/OiBib29sZWFuLCAgICAgICAvLyB1cGdyYWRlcyBhIGxvZyBmcm9tIGluZm8gdG8gd2FybmluZyBvciB3YXJuaW5nIHRvIGxvZywgb3IgbG9nIHRvIGVycm9yXG5cdHVwc2NhbGU/OiBib29sZWFuLCAgICAgICAvLyBzaG93cyBhZGRpdGlvbmFsIGluZm8gb24gZWFjaCBsb2dcblx0YmxvY2tDYWxsZXI/OiBhbnlbXSwgICAgIC8vIGJsb2NrcyB0aGUgY2FsbGVyXG5cdHN1cHByZXNzPzogYW55W10gICAgICAgICAvLyBibG9ja3MgcGVyIGEga2V5d29yZFxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU21hcnRDb25zb2xlU2VydmljZSB7XG5cdHByaXZhdGUgb3B0aW9uczogU21hcnRPcHRpb25zO1xuXHRwcml2YXRlIGRlZmF1bHRMb2cgPSBjb25zb2xlLmxvZztcblx0cHJpdmF0ZSBkZWZhdWx0SW5mbyA9IGNvbnNvbGUuaW5mbztcblx0cHJpdmF0ZSBkZWZhdWx0V2FybiA9IGNvbnNvbGUud2Fybjtcblx0cHJpdmF0ZSBkZWZhdWx0RXJyb3IgPSBjb25zb2xlLmVycm9yO1xuXHRwcml2YXRlIGRlZmF1bHRUYWJsZSA9IGNvbnNvbGUudGFibGU7XG5cdHByaXZhdGUgZGVmYXVsdFRyYWNlID0gY29uc29sZS50cmFjZTtcblx0cHJpdmF0ZSBkZWZhdWx0QXNzZXJ0ID0gY29uc29sZS5hc3NlcnQ7XG5cdHByaXZhdGUgb3V0cHV0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cdHByaXZhdGUgX3N1cHByZXNzZWQoLi4uYXJncykge1xuXHRcdGxldCByZXN1bHQgPSBmYWxzZTtcblx0XHRpZiAodGhpcy5vcHRpb25zLnN1cHByZXNzKSB7XG5cdFx0XHRjb25zdCB4ID0gKGFyZ3MgaW5zdGFuY2VvZiBBcnJheSkgP1xuXHRcdFx0XHRcdFx0XHRhcmdzLmpvaW4oJywnKSA6IFxuXHRcdFx0XHRcdFx0XHQodHlwZW9mIGFyZ3MgPT09ICdvYmplY3QnKSA/XG5cdFx0XHRcdFx0XHRcdEpTT04uc3RyaW5naWZ5KGFyZ3MpIDogXCJcIiArIGFyZ3M7XG5cdFx0XHR0aGlzLm9wdGlvbnMuc3VwcHJlc3MubWFwKFxuXHRcdFx0XHQoaXRlbSkgPT4ge1xuXHRcdFx0XHRcdGlmICh4LmluZGV4T2YoaXRlbSkgPiAtMSkge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblx0cHJpdmF0ZSBfZ2V0U3RhY2soKSB7XG5cdFx0Ly8gdGhpcyBtZXRob2QgcHVycG9zZSBpcyBvbmx5IHRvIGZpeCBJRSBpc3N1ZS4gXG5cdFx0Ly8gaW4gSUUsIG5ldyBFcnJvcigpLnN0YWNrICB3aWxsIGJlIHVuZGVmaW5lZFxuXHRcdC8vIHVubGVzcyBpdCBpcyBjYXVndGggaW4gdHJ5IGJsb2NrIHN0YXRlbWVudC5cblx0XHRsZXQgc3RhY2s6IGFueSA9ICcnO1xuXHRcdHRyeSB7XG5cdFx0ICB0aHJvdyBuZXcgRXJyb3IoJ2dldFN0YWNrJyk7XG5cdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRzdGFjayA9IGUuc3RhY2s7XG5cdFx0XHRzdGFjayA9IHN0YWNrLmluZGV4T2YoJ1xccicpID4gMCA/IHN0YWNrLmluZGV4T2YoJ1xccicpIDogc3RhY2suc3BsaXQoJ1xcbicpO1xuXHRcdFx0c3RhY2sgPSBzdGFja1s0XTtcblx0XHR9XG5cdFx0cmV0dXJuIHN0YWNrO1xuXHR9XG5cdHByaXZhdGUgX2Jsb2NrZWQoLi4uYXJncykge1xuXHRcdGxldCByZXN1bHQgPSBmYWxzZTtcblxuXHRcdGlmICh0aGlzLm9wdGlvbnMuYmxvY2tDYWxsZXIpIHtcblx0XHRcdGNvbnN0IHN0YWNrID0gdGhpcy5fZ2V0U3RhY2soKTtcblx0XHRcdHRoaXMub3B0aW9ucy5ibG9ja0NhbGxlci5tYXAoXG5cdFx0XHRcdChpdGVtKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHN0YWNrLmluZGV4T2YoaXRlbSkgPiAtMSkge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblx0cHJpdmF0ZSBfdXBzY2FsZSguLi5hcmdzKSB7XG5cdFx0Y29uc3Qgc3RhY2sgPSB0aGlzLl9nZXRTdGFjaygpO1xuXHRcdGNvbnN0IHJlID0gLyhbXihdKylAfGF0IChbXihdKykgXFwoL2c7XG5cdFx0Y29uc3QgbSA9IHJlLmV4ZWMoc3RhY2spO1xuXHRcdGNvbnN0IGkgPSBzdGFjay5sYXN0SW5kZXhPZignLycpO1xuXHRcdGNvbnN0IG4gPSBpID4gMCA/IHN0YWNrLnN1YnN0cmluZyhpKzEpLnNwbGl0KCc6JylbMF0gOiBzdGFjaztcblx0XHRjb25zdCB0ID0gbSA/IChtWzFdIHx8IG1bMl0pIDogc3RhY2s7XG5cdFx0Y29uc3QgY2FsbGVyID0gKHQuaW5kZXhPZignLycpID4gMCA/IHQuc3Vic3RyaW5nKDAsdC5pbmRleE9mKCcvJykpIDogJycpO1xuXHRcdGNvbnN0IF9kYXRlID0gbmV3IERhdGUoKTtcblx0XHRjb25zdCBfdGltZSA9IChfZGF0ZS5nZXRNb250aCgpICsgMSkgKyBcIi9cIiArXG5cdFx0XHRcdFx0ICBfZGF0ZS5nZXREYXkoKSArIFwiL1wiICtcblx0XHRcdFx0XHQgIF9kYXRlLmdldEZ1bGxZZWFyKCkgKyBcIiBcIiArXG5cdFx0XHRcdFx0ICBfZGF0ZS5nZXRIb3VycygpICsgXCI6XCIgK1xuXHRcdFx0XHRcdCAgX2RhdGUuZ2V0TWludXRlcygpICsgXCI6XCIgK1xuXHRcdFx0XHRcdCAgX2RhdGUuZ2V0U2Vjb25kcygpICsgXCI6XCIgK1xuXHRcdFx0XHRcdCAgX2RhdGUuZ2V0TWlsbGlzZWNvbmRzKCk7XG5cdFx0cmV0dXJuIFtfdGltZSArIFwiIFtcIiArIG4gKyAoY2FsbGVyID8gXCIgfCBcIiArIGNhbGxlciA6ICcnKSArIFwiXSBcIl0uY29uY2F0KC4uLmFyZ3MpO1xuXHR9XG5cdHByaXZhdGUgX2luZm8oLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLmluZm9EaXNhYmxlZCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLm9wdGlvbnMuaW5mb0Rpc2FibGVkKSAmJlxuXHRcdFx0IXRoaXMuX3N1cHByZXNzZWQoYXJncykgJiZcblx0XHRcdCF0aGlzLl9ibG9ja2VkKGFyZ3MpKSB7XG5cdFx0XHRjb25zdCBuZXdBcmdzID0gdGhpcy5vcHRpb25zLnVwc2NhbGUgP1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cHNjYWxlKGFyZ3MpIDogYXJncztcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMudXBncmFkZSkge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcImxvZ1wiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVmYXVsdExvZyguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcImluZm9cIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdEluZm8oLi4ubmV3QXJncyk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgX2xvZyguLi5hcmdzKSB7XG5cdFx0aWYgKCh0aGlzLm9wdGlvbnMubG9nRGlzYWJsZWQgPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5vcHRpb25zLmxvZ0Rpc2FibGVkKSAmJlxuXHRcdFx0IXRoaXMuX3N1cHByZXNzZWQoYXJncykgJiZcblx0XHRcdCF0aGlzLl9ibG9ja2VkKGFyZ3MpKSB7XG5cdFx0XHRjb25zdCBuZXdBcmdzID0gdGhpcy5vcHRpb25zLnVwc2NhbGUgP1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cHNjYWxlKGFyZ3MpIDogYXJncztcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZG93bkdyYWRlKSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiaW5mb1wiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVmYXVsdExvZyguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0SW5mbyguLi5uZXdBcmdzKTtcdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLnVwZ3JhZGUpIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJ3YXJuXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0V2FybiguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0V2FybiguLi5uZXdBcmdzKTtcdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wibG9nXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgX3dhcm4oLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLndhcm5EaXNhYmxlZCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLm9wdGlvbnMud2FybkRpc2FibGVkKSAmJlxuXHRcdFx0IXRoaXMuX3N1cHByZXNzZWQoYXJncykgJiZcblx0XHRcdCF0aGlzLl9ibG9ja2VkKGFyZ3MpKSB7XG5cdFx0XHRjb25zdCBuZXdBcmdzID0gdGhpcy5vcHRpb25zLnVwc2NhbGUgP1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cHNjYWxlKGFyZ3MpIDogYXJncztcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZG93bkdyYWRlKSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wibG9nXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy51cGdyYWRlKSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiZXJyb3JcIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRFcnJvciguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0RXJyb3IoLi4ubmV3QXJncyk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcIndhcm5cIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRXYXJuKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRXYXJuKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgX2Vycm9yKC4uLmFyZ3MpIHtcblx0XHRpZiAoKHRoaXMub3B0aW9ucy5lcnJvckRpc2FibGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMub3B0aW9ucy5lcnJvckRpc2FibGVkKSAmJlxuXHRcdFx0IXRoaXMuX3N1cHByZXNzZWQoYXJncykgJiZcblx0XHRcdCF0aGlzLl9ibG9ja2VkKGFyZ3MpKSB7XG5cdFx0XHRjb25zdCBuZXdBcmdzID0gdGhpcy5vcHRpb25zLnVwc2NhbGUgP1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cHNjYWxlKGFyZ3MpIDogYXJncztcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZG93bkdyYWRlKSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wibG9nXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiZXJyb3JcIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRFcnJvciguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0RXJyb3IoLi4ubmV3QXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cHJpdmF0ZSBfdGFibGUoLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLnRhYmxlRGlzYWJsZWQgPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5vcHRpb25zLmVycm9yRGlzYWJsZWQpICYmXG5cdFx0XHQhdGhpcy5fc3VwcHJlc3NlZChhcmdzKSAmJlxuXHRcdFx0IXRoaXMuX2Jsb2NrZWQoYXJncykpIHtcblx0XHRcdGNvbnN0IG5ld0FyZ3MgPSB0aGlzLm9wdGlvbnMudXBzY2FsZSA/XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3Vwc2NhbGUoYXJncykgOiBhcmdzO1xuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1widGFibGVcIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdFRhYmxlKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmRlZmF1bHRUYWJsZSguLi5uZXdBcmdzKTtcdFx0XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgX3RyYWNlKC4uLmFyZ3MpIHtcblx0XHRpZiAoKHRoaXMub3B0aW9ucy50cmFjZURpc2FibGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMub3B0aW9ucy50cmFjZURpc2FibGVkKSkge1xuXHRcdFx0Y29uc3QgbmV3QXJncyA9IHRoaXMub3B0aW9ucy51cHNjYWxlID9cblx0XHRcdFx0XHRcdFx0dGhpcy5fdXBzY2FsZShhcmdzKSA6IGFyZ3M7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJ0cmFjZVwiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0VHJhY2UoLi4ubmV3QXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuZGVmYXVsdFRyYWNlKC4uLm5ld0FyZ3MpO1x0XHRcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cHJpdmF0ZSBfYXNzZXJ0KC4uLmFyZ3MpIHtcblx0XHRpZiAoKHRoaXMub3B0aW9ucy5hc3NlcnREaXNhYmxlZCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLm9wdGlvbnMuYXNzZXJ0RGlzYWJsZWQpKSB7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJhc3NlcnRcIiwgLi4uYXJnc10pO1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdEFzc2VydCguLi5hcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5kZWZhdWx0QXNzZXJ0KC4uLmFyZ3MpO1x0XHRcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0Lypcblx0KiBXaWxsIGluaXRpYWxpemUgc21hcnQgbG9nZ2VyLlxuXHQqIEBpbnN0cnVjdGlvbnMgaW5zdHJ1Y3Rpb25zIHRvIGRpcmVjdCB0aGlzIHNlcnZpY2UgdG8gc3VwcHJlc3MgbG9ncy5cblx0Ki9cblx0bWFrZVNtYXJ0TG9ncyggaW5zdHJ1Y3Rpb25zOiBTbWFydE9wdGlvbnMgKSB7XG5cdFx0dGhpcy5vcHRpb25zID0gaW5zdHJ1Y3Rpb25zO1xuXHRcdGNvbnNvbGUubG9nID0gdGhpcy5fbG9nLmJpbmQodGhpcyk7XG5cdFx0Y29uc29sZS5pbmZvID0gdGhpcy5faW5mby5iaW5kKHRoaXMpO1xuXHRcdGNvbnNvbGUud2FybiA9IHRoaXMuX3dhcm4uYmluZCh0aGlzKTtcblx0XHRjb25zb2xlLmVycm9yID0gdGhpcy5fZXJyb3IuYmluZCh0aGlzKTtcblx0XHRjb25zb2xlLnRhYmxlID0gdGhpcy5fdGFibGUuYmluZCh0aGlzKTtcblx0XHRjb25zb2xlLnRyYWNlID0gdGhpcy5fdHJhY2UuYmluZCh0aGlzKTtcblx0XHRjb25zb2xlLmFzc2VydCA9IHRoaXMuX2Fzc2VydC5iaW5kKHRoaXMpO1xuXHR9XG5cdC8qXG5cdCogQHJldHVybiBFdmVudCBFbWl0dGVyIHRoYXQgbWF5IHB1Ymxpc2cgbG9ncy5cblx0Ki9cblx0cmVkaXJlY3RlZE91dHB1dCgpIHtcblx0XHRyZXR1cm4gdGhpcy5vdXRwdXQ7XG5cdH1cblx0Lypcblx0KiBXaWxsIG1hcmt1cCBzdGFjayB0cmFjZSB0byBwcm92aWRlIEhUTUwgZnJhZ21lbnQgd2l0aCBhbmNob3JzIGZvZSBldmVyeSB0cmFjZS5cblx0KiBAYXJncyBhcmd1bWVudCB0aGF0IG1heSBjb250YWlsIHN0YWNrIHRyYWNlLlxuXHQqIEByZXR1cm4gQSBtb3JlIGZvcm1hbCBjb250ZW50IHdpdGggaHRtbCBmcmFnbWVudCBpZiBzdGFjayB0cmF2Y2UgYXBwbGllZCBpYiBhZHZhbmNlLlxuXHQqL1xuXHRtYXJrdXBUcmFjZShhcmdzOiBhbnkpIHtcblx0XHRpZiAoYXJncyBpbnN0YW5jZW9mIEFycmF5KSB7XG5cdFx0XHRhcmdzLm1hcChcblx0XHRcdFx0KGl0ZW06IGFueSwgaW5kZXg6IG51bWJlcikgPT4ge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGJyZWFrT24gPSAoaXRlbS5pbmRleE9mKCdcXG4nKSA+IDApID8gJ1xcbicgOiAoKGl0ZW0uaW5kZXhPZignXFxyJykgPiAwKSA/ICdcXHInIDogdW5kZWZpbmVkKTtcblx0XHRcdFx0XHRcdGlmIChicmVha09uICYmIChpdGVtLmluZGV4T2YoJ0AnKSA+IC0xIHx8IGl0ZW0uaW5kZXhPZignKCcpID4gLTEpICYmIGl0ZW0uaW5kZXhPZignOicpID4gMCkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBsaXN0ID0gW107XG5cdFx0XHRcdFx0XHRcdGl0ZW0uc3BsaXQoYnJlYWtPbikubWFwKFxuXHRcdFx0XHRcdFx0XHRcdChsaW5lOiBzdHJpbmcpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHggPSBsaW5lLmluZGV4T2YoJ0AnKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHogPSBsaW5lLmluZGV4T2YoJygnKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh6ID4gMCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBzdWJsaXN0ID0gbGluZS5zdWJzdHJpbmcoeisxLCBsaW5lLmxlbmd0aCAtIDEpLnNwbGl0KCc6Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGxlbiA9IHN1Ymxpc3QubGVuZ3RoO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBuYW1lID0gbGluZS5zdWJzdHJpbmcoMCwgeikgKyAnOicgKyBzdWJsaXN0W2xlbiAtIDJdICsgJzonICsgc3VibGlzdFtsZW4gLSAxXTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgcmVmID0gc3VibGlzdC5zbGljZSgwLCBsZW4gLSAyKS5qb2luKCc6Jyk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0bGlzdC5wdXNoKCc8YSBocmVmPVwiJyArIHJlZiArICAnXCI+JyArIG5hbWUgKyAnPC9hPicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICh4ID49IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgeSA9IGxpbmUuaW5kZXhPZignOicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoeSA8IDAgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGlzdC5wdXNoKCc8YSBocmVmPVwiJyArIGxpbmUuc3Vic3RyaW5nKHgrMSkgKyAgJ1wiPicgK1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxpbmUuc3Vic3RyaW5nKDAsIHgpICtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPC9hPicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHN1Ymxpc3QgPSBsaW5lLnN1YnN0cmluZyh4KzEsIGxpbmUubGVuZ3RoKS5zcGxpdCgnOicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGxlbiA9IHN1Ymxpc3QubGVuZ3RoO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBsaW5lLnN1YnN0cmluZygwLCB4KSArICc6JyArIHN1Ymxpc3RbbGVuIC0gMl0gKyAnOicgKyBzdWJsaXN0W2xlbiAtIDFdO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHJlZiA9IHN1Ymxpc3Quc2xpY2UoMCwgbGVuIC0gMikuam9pbignOicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxpc3QucHVzaCgnPGEgaHJlZj1cIicgKyByZWYgKyAgJ1wiPicgKyBuYW1lICsgJzwvYT4nKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0bGlzdC5wdXNoKGxpbmUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0YXJnc1tpbmRleF0gPSBsaXN0LmpvaW4oJzxiciAvPicpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChicmVha09uKSB7XG5cdFx0XHRcdFx0XHRcdGFyZ3NbaW5kZXhdID0gaXRlbS5yZXBsYWNlKC9cXHJcXG4vZywnPGJyIC8+Jyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gYXJncztcblx0fVxufVxuIl19