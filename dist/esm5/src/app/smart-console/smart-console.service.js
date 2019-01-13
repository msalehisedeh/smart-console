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
            var stack_1 = new Error().stack.split('\n');
            this.options.blockCaller.map(function (item) {
                if (stack_1[3].indexOf(item) > -1) {
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
        var stack = new Error().stack.split('\n');
        /** @type {?} */
        var re = /([^(]+)@|at ([^(]+) \(/g;
        /** @type {?} */
        var m = re.exec(stack[3]);
        /** @type {?} */
        var i = stack[3].lastIndexOf('/');
        /** @type {?} */
        var n = i > 0 ? stack[3].substring(i + 1).split(':')[0] : '';
        /** @type {?} */
        var t = (m[1] || m[2]);
        /** @type {?} */
        var caller = (t.indexOf('/') > 0 ? t.substring(0, t.indexOf('/')) : t);
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
        return (_a = [_time + " [" + n + " | " + caller + "] "]).concat.apply(_a, tslib_1.__spread(args));
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
                    if ((item.indexOf('@') > -1 || item.indexOf('(') > -1) && item.indexOf(':') > 0 && item.indexOf('\n') > 0) {
                        /** @type {?} */
                        var list_1 = [];
                        item.split('\n').map(function (line) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnQtY29uc29sZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL3NtYXJ0LWNvbnNvbGUvIiwic291cmNlcyI6WyJzcmMvYXBwL3NtYXJ0LWNvbnNvbGUvc21hcnQtY29uc29sZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQXNCakMsT0FBTyxDQUFDLEdBQUc7MkJBQ1YsT0FBTyxDQUFDLElBQUk7MkJBQ1osT0FBTyxDQUFDLElBQUk7NEJBQ1gsT0FBTyxDQUFDLEtBQUs7NEJBQ2IsT0FBTyxDQUFDLEtBQUs7NEJBQ2IsT0FBTyxDQUFDLEtBQUs7NkJBQ1osT0FBTyxDQUFDLE1BQU07c0JBQ3JCLElBQUksWUFBWSxFQUFFOzs7Ozs7SUFFM0IseUNBQVc7Ozs7O1FBQUMsY0FBTzthQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87WUFBUCx5QkFBTzs7O1FBQzFCLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7O1lBQzNCLElBQU0sR0FBQyxHQUFHLENBQUMsSUFBSSxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDaEIsQ0FBQyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FDeEIsVUFBQyxJQUFJO2dCQUNKLEVBQUUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQixNQUFNLEdBQUcsSUFBSSxDQUFDO2lCQUNkO2FBQ0QsQ0FDRCxDQUFDO1NBQ0Y7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDOzs7Ozs7SUFFUCxzQ0FBUTs7Ozs7UUFBQyxjQUFPO2FBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztZQUFQLHlCQUFPOzs7UUFDdkIsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRW5CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzs7WUFDOUIsSUFBTSxPQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDM0IsVUFBQyxJQUFJO2dCQUNKLEVBQUUsQ0FBQyxDQUFDLE9BQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2lCQUNkO2FBQ0QsQ0FDRCxDQUFDO1NBQ0Y7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDOzs7Ozs7SUFFUCxzQ0FBUTs7Ozs7UUFBQyxjQUFPO2FBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztZQUFQLHlCQUFPOzs7UUFDdkIsSUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDOztRQUM1QyxJQUFNLEVBQUUsR0FBRyx5QkFBeUIsQ0FBQzs7UUFDckMsSUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7UUFDNUIsSUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7UUFDcEMsSUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7O1FBQzdELElBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztRQUN6QixJQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztRQUN4RSxJQUFNLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDOztRQUN6QixJQUFNLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHO1lBQ3JDLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHO1lBQ3BCLEtBQUssQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHO1lBQ3pCLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHO1lBQ3RCLEtBQUssQ0FBQyxVQUFVLEVBQUUsR0FBRyxHQUFHO1lBQ3hCLEtBQUssQ0FBQyxVQUFVLEVBQUUsR0FBRyxHQUFHO1lBQ3hCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUM3QixNQUFNLENBQUMsQ0FBQSxLQUFBLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQSxDQUFDLE1B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QUFXLEdBQUcsR0FBRyxHQUFJLElBQUksR0FBRyxNQUFJLEdBQUcsTUFBTSxDQUFDLENBQUM7aUNBQ3JEOzZCQUNEOzRCQUFDLElBQUksQ0FBQyxDQUFDO2dDQUNQLE1BQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7NkJBQ2hCO3lCQUNELENBQ0QsQ0FBQzt3QkFDRixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztxQkFDbEM7aUJBQ0Q7YUFDRCxDQUNELENBQUM7U0FDRjtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDWjs7Z0JBM1NELFVBQVU7OzhCQXJCWDs7U0FzQmEsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiovXG5pbXBvcnQge0luamVjdGFibGUsIEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU21hcnRPcHRpb25zIHtcblx0ZW1pdE91dHB1dD86IGJvb2xlYW4sLy8gbG9nIHJlc3VsdCBpbiB0byBvdXRwdXQgaW5zdGVkIG9mIGNvbnNvbGUuXG5cdGxvZ0FmdGVyRW1pdD86IGJvb2xlYW4sIC8vIGNvbnRpbnVlIGxvZ2dpbmcgaW50byBicm93c2VyIGNvbnNvbGUgYWZ0ZXIgZW1pdHRpbmcgdGhlIGxvZ1xuXHRsb2dEaXNhYmxlZD86IGJvb2xlYW4sICAgLy8gZGlzYWJsZXMgYWxsIGxvZyBsZXZlbCBjb25zb2xlIGxvZ3Ncblx0aW5mb0Rpc2FibGVkPzogYm9vbGVhbiwgIC8vIGRpc2FibGVzIGFsbCBpbmZvIGxldmVsIGNvbnNvbGUgbG9nc1xuXHR3YXJuRGlzYWJsZWQ/OiBib29sZWFuLCAgLy8gZGlzYWJsZXMgYWxsIHdhcm4gbGV2ZWwgY29uc29sZSBsb2dzXG5cdGVycm9yRGlzYWJsZWQ/OiBib29sZWFuLCAvLyBkaXNhYmxlcyBhbGwgZXJyb3IgbGV2ZWwgY29uc29sZSBsb2dzXG5cdHRhYmxlRGlzYWJsZWQ/OiBib29sZWFuLCAvLyBkaXNhYmxlcyBhbGwgdGFibGUgY29uc29sZSBsb2dzXG5cdHRyYWNlRGlzYWJsZWQ/OiBib29sZWFuLCAvLyBkaXNhYmxlcyBhbGwgdHJhY2UgbGV2ZWwgY29uc29sZSBsb2dzXG5cdGFzc2VydERpc2FibGVkPzpib29sZWFuLCAvLyBkaXNhYmxlcyBhc3NlcnQgbG9ncyBvbiBjb25zb2xlXG5cdGRvd25HcmFkZT86IGJvb2xlYW4sICAgICAvLyBkb3duZ3JhZGUgYSBsb2cgZnJvbSB3YXJuaW5nIHRvIGluZm8gb3IgbG9nIHRvIHdhcm5pbmcsIG9yIGVycm9yIHRvIGxvZy5cblx0dXBncmFkZT86IGJvb2xlYW4sICAgICAgIC8vIHVwZ3JhZGVzIGEgbG9nIGZyb20gaW5mbyB0byB3YXJuaW5nIG9yIHdhcm5pbmcgdG8gbG9nLCBvciBsb2cgdG8gZXJyb3Jcblx0dXBzY2FsZT86IGJvb2xlYW4sICAgICAgIC8vIHNob3dzIGFkZGl0aW9uYWwgaW5mbyBvbiBlYWNoIGxvZ1xuXHRibG9ja0NhbGxlcj86IGFueVtdLCAgICAgLy8gYmxvY2tzIHRoZSBjYWxsZXJcblx0c3VwcHJlc3M/OiBhbnlbXSAgICAgICAgIC8vIGJsb2NrcyBwZXIgYSBrZXl3b3JkXG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTbWFydENvbnNvbGVTZXJ2aWNlIHtcblx0cHJpdmF0ZSBvcHRpb25zOiBTbWFydE9wdGlvbnM7XG5cdHByaXZhdGUgZGVmYXVsdExvZyA9IGNvbnNvbGUubG9nO1xuXHRwcml2YXRlIGRlZmF1bHRJbmZvID0gY29uc29sZS5pbmZvO1xuXHRwcml2YXRlIGRlZmF1bHRXYXJuID0gY29uc29sZS53YXJuO1xuXHRwcml2YXRlIGRlZmF1bHRFcnJvciA9IGNvbnNvbGUuZXJyb3I7XG5cdHByaXZhdGUgZGVmYXVsdFRhYmxlID0gY29uc29sZS50YWJsZTtcblx0cHJpdmF0ZSBkZWZhdWx0VHJhY2UgPSBjb25zb2xlLnRyYWNlO1xuXHRwcml2YXRlIGRlZmF1bHRBc3NlcnQgPSBjb25zb2xlLmFzc2VydDtcblx0cHJpdmF0ZSBvdXRwdXQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblx0cHJpdmF0ZSBfc3VwcHJlc3NlZCguLi5hcmdzKSB7XG5cdFx0bGV0IHJlc3VsdCA9IGZhbHNlO1xuXHRcdGlmICh0aGlzLm9wdGlvbnMuc3VwcHJlc3MpIHtcblx0XHRcdGNvbnN0IHggPSAoYXJncyBpbnN0YW5jZW9mIEFycmF5KSA/XG5cdFx0XHRcdFx0XHRcdGFyZ3Muam9pbignLCcpIDogXG5cdFx0XHRcdFx0XHRcdCh0eXBlb2YgYXJncyA9PT0gJ29iamVjdCcpID9cblx0XHRcdFx0XHRcdFx0SlNPTi5zdHJpbmdpZnkoYXJncykgOiBcIlwiICsgYXJncztcblx0XHRcdHRoaXMub3B0aW9ucy5zdXBwcmVzcy5tYXAoXG5cdFx0XHRcdChpdGVtKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHguaW5kZXhPZihpdGVtKSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXHRwcml2YXRlIF9ibG9ja2VkKC4uLmFyZ3MpIHtcblx0XHRsZXQgcmVzdWx0ID0gZmFsc2U7XG5cblx0XHRpZiAodGhpcy5vcHRpb25zLmJsb2NrQ2FsbGVyKSB7XG5cdFx0XHRjb25zdCBzdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrLnNwbGl0KCdcXG4nKTtcblx0XHRcdHRoaXMub3B0aW9ucy5ibG9ja0NhbGxlci5tYXAoXG5cdFx0XHRcdChpdGVtKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHN0YWNrWzNdLmluZGV4T2YoaXRlbSkgPiAtMSkge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblx0cHJpdmF0ZSBfdXBzY2FsZSguLi5hcmdzKSB7XG5cdFx0Y29uc3Qgc3RhY2sgPSBuZXcgRXJyb3IoKS5zdGFjay5zcGxpdCgnXFxuJyk7XG5cdFx0Y29uc3QgcmUgPSAvKFteKF0rKUB8YXQgKFteKF0rKSBcXCgvZztcblx0XHRjb25zdCBtID0gcmUuZXhlYyhzdGFja1szXSk7XG5cdFx0Y29uc3QgaSA9IHN0YWNrWzNdLmxhc3RJbmRleE9mKCcvJyk7XG5cdFx0Y29uc3QgbiA9IGkgPiAwID8gc3RhY2tbM10uc3Vic3RyaW5nKGkrMSkuc3BsaXQoJzonKVswXSA6ICcnO1xuXHRcdGNvbnN0IHQgPSAobVsxXSB8fCBtWzJdKTtcblx0XHRjb25zdCBjYWxsZXIgPSAodC5pbmRleE9mKCcvJykgPiAwID8gdC5zdWJzdHJpbmcoMCx0LmluZGV4T2YoJy8nKSkgOiB0KTtcblx0XHRjb25zdCBfZGF0ZSA9IG5ldyBEYXRlKCk7XG5cdFx0Y29uc3QgX3RpbWUgPSAoX2RhdGUuZ2V0TW9udGgoKSArIDEpICsgXCIvXCIgK1xuXHRcdFx0XHRcdCAgX2RhdGUuZ2V0RGF5KCkgKyBcIi9cIiArXG5cdFx0XHRcdFx0ICBfZGF0ZS5nZXRGdWxsWWVhcigpICsgXCIgXCIgK1xuXHRcdFx0XHRcdCAgX2RhdGUuZ2V0SG91cnMoKSArIFwiOlwiICtcblx0XHRcdFx0XHQgIF9kYXRlLmdldE1pbnV0ZXMoKSArIFwiOlwiICtcblx0XHRcdFx0XHQgIF9kYXRlLmdldFNlY29uZHMoKSArIFwiOlwiICtcblx0XHRcdFx0XHQgIF9kYXRlLmdldE1pbGxpc2Vjb25kcygpO1xuXHRcdHJldHVybiBbX3RpbWUgKyBcIiBbXCIgKyBuICsgXCIgfCBcIiArIGNhbGxlciArIFwiXSBcIl0uY29uY2F0KC4uLmFyZ3MpO1xuXHR9XG5cdHByaXZhdGUgX2luZm8oLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLmluZm9EaXNhYmxlZCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLm9wdGlvbnMuaW5mb0Rpc2FibGVkKSAmJlxuXHRcdFx0IXRoaXMuX3N1cHByZXNzZWQoYXJncykgJiZcblx0XHRcdCF0aGlzLl9ibG9ja2VkKGFyZ3MpKSB7XG5cdFx0XHRjb25zdCBuZXdBcmdzID0gdGhpcy5vcHRpb25zLnVwc2NhbGUgP1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cHNjYWxlKGFyZ3MpIDogYXJncztcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMudXBncmFkZSkge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcImxvZ1wiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVmYXVsdExvZyguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcImluZm9cIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdEluZm8oLi4ubmV3QXJncyk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgX2xvZyguLi5hcmdzKSB7XG5cdFx0aWYgKCh0aGlzLm9wdGlvbnMubG9nRGlzYWJsZWQgPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5vcHRpb25zLmxvZ0Rpc2FibGVkKSAmJlxuXHRcdFx0IXRoaXMuX3N1cHByZXNzZWQoYXJncykgJiZcblx0XHRcdCF0aGlzLl9ibG9ja2VkKGFyZ3MpKSB7XG5cdFx0XHRjb25zdCBuZXdBcmdzID0gdGhpcy5vcHRpb25zLnVwc2NhbGUgP1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cHNjYWxlKGFyZ3MpIDogYXJncztcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZG93bkdyYWRlKSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiaW5mb1wiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVmYXVsdExvZyguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0SW5mbyguLi5uZXdBcmdzKTtcdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLnVwZ3JhZGUpIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJ3YXJuXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0V2FybiguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0V2FybiguLi5uZXdBcmdzKTtcdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wibG9nXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgX3dhcm4oLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLndhcm5EaXNhYmxlZCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLm9wdGlvbnMud2FybkRpc2FibGVkKSAmJlxuXHRcdFx0IXRoaXMuX3N1cHByZXNzZWQoYXJncykgJiZcblx0XHRcdCF0aGlzLl9ibG9ja2VkKGFyZ3MpKSB7XG5cdFx0XHRjb25zdCBuZXdBcmdzID0gdGhpcy5vcHRpb25zLnVwc2NhbGUgP1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cHNjYWxlKGFyZ3MpIDogYXJncztcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZG93bkdyYWRlKSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wibG9nXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy51cGdyYWRlKSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiZXJyb3JcIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRFcnJvciguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0RXJyb3IoLi4ubmV3QXJncyk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcIndhcm5cIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRXYXJuKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRXYXJuKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgX2Vycm9yKC4uLmFyZ3MpIHtcblx0XHRpZiAoKHRoaXMub3B0aW9ucy5lcnJvckRpc2FibGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMub3B0aW9ucy5lcnJvckRpc2FibGVkKSAmJlxuXHRcdFx0IXRoaXMuX3N1cHByZXNzZWQoYXJncykgJiZcblx0XHRcdCF0aGlzLl9ibG9ja2VkKGFyZ3MpKSB7XG5cdFx0XHRjb25zdCBuZXdBcmdzID0gdGhpcy5vcHRpb25zLnVwc2NhbGUgP1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cHNjYWxlKGFyZ3MpIDogYXJncztcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZG93bkdyYWRlKSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wibG9nXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiZXJyb3JcIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRFcnJvciguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0RXJyb3IoLi4ubmV3QXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cHJpdmF0ZSBfdGFibGUoLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLnRhYmxlRGlzYWJsZWQgPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5vcHRpb25zLmVycm9yRGlzYWJsZWQpICYmXG5cdFx0XHQhdGhpcy5fc3VwcHJlc3NlZChhcmdzKSAmJlxuXHRcdFx0IXRoaXMuX2Jsb2NrZWQoYXJncykpIHtcblx0XHRcdGNvbnN0IG5ld0FyZ3MgPSB0aGlzLm9wdGlvbnMudXBzY2FsZSA/XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3Vwc2NhbGUoYXJncykgOiBhcmdzO1xuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1widGFibGVcIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdFRhYmxlKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmRlZmF1bHRUYWJsZSguLi5uZXdBcmdzKTtcdFx0XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgX3RyYWNlKC4uLmFyZ3MpIHtcblx0XHRpZiAoKHRoaXMub3B0aW9ucy50cmFjZURpc2FibGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMub3B0aW9ucy50cmFjZURpc2FibGVkKSkge1xuXHRcdFx0Y29uc3QgbmV3QXJncyA9IHRoaXMub3B0aW9ucy51cHNjYWxlID9cblx0XHRcdFx0XHRcdFx0dGhpcy5fdXBzY2FsZShhcmdzKSA6IGFyZ3M7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJ0cmFjZVwiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0VHJhY2UoLi4ubmV3QXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuZGVmYXVsdFRyYWNlKC4uLm5ld0FyZ3MpO1x0XHRcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cHJpdmF0ZSBfYXNzZXJ0KC4uLmFyZ3MpIHtcblx0XHRpZiAoKHRoaXMub3B0aW9ucy5hc3NlcnREaXNhYmxlZCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLm9wdGlvbnMuYXNzZXJ0RGlzYWJsZWQpKSB7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJhc3NlcnRcIiwgLi4uYXJnc10pO1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdEFzc2VydCguLi5hcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5kZWZhdWx0QXNzZXJ0KC4uLmFyZ3MpO1x0XHRcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0Lypcblx0KiBXaWxsIGluaXRpYWxpemUgc21hcnQgbG9nZ2VyLlxuXHQqIEBpbnN0cnVjdGlvbnMgaW5zdHJ1Y3Rpb25zIHRvIGRpcmVjdCB0aGlzIHNlcnZpY2UgdG8gc3VwcHJlc3MgbG9ncy5cblx0Ki9cblx0bWFrZVNtYXJ0TG9ncyggaW5zdHJ1Y3Rpb25zOiBTbWFydE9wdGlvbnMgKSB7XG5cdFx0dGhpcy5vcHRpb25zID0gaW5zdHJ1Y3Rpb25zO1xuXHRcdGNvbnNvbGUubG9nID0gdGhpcy5fbG9nLmJpbmQodGhpcyk7XG5cdFx0Y29uc29sZS5pbmZvID0gdGhpcy5faW5mby5iaW5kKHRoaXMpO1xuXHRcdGNvbnNvbGUud2FybiA9IHRoaXMuX3dhcm4uYmluZCh0aGlzKTtcblx0XHRjb25zb2xlLmVycm9yID0gdGhpcy5fZXJyb3IuYmluZCh0aGlzKTtcblx0XHRjb25zb2xlLnRhYmxlID0gdGhpcy5fdGFibGUuYmluZCh0aGlzKTtcblx0XHRjb25zb2xlLnRyYWNlID0gdGhpcy5fdHJhY2UuYmluZCh0aGlzKTtcblx0XHRjb25zb2xlLmFzc2VydCA9IHRoaXMuX2Fzc2VydC5iaW5kKHRoaXMpO1xuXHR9XG5cdC8qXG5cdCogQHJldHVybiBFdmVudCBFbWl0dGVyIHRoYXQgbWF5IHB1Ymxpc2cgbG9ncy5cblx0Ki9cblx0cmVkaXJlY3RlZE91dHB1dCgpIHtcblx0XHRyZXR1cm4gdGhpcy5vdXRwdXQ7XG5cdH1cblx0Lypcblx0KiBXaWxsIG1hcmt1cCBzdGFjayB0cmFjZSB0byBwcm92aWRlIEhUTUwgZnJhZ21lbnQgd2l0aCBhbmNob3JzIGZvZSBldmVyeSB0cmFjZS5cblx0KiBAYXJncyBhcmd1bWVudCB0aGF0IG1heSBjb250YWlsIHN0YWNrIHRyYWNlLlxuXHQqIEByZXR1cm4gQSBtb3JlIGZvcm1hbCBjb250ZW50IHdpdGggaHRtbCBmcmFnbWVudCBpZiBzdGFjayB0cmF2Y2UgYXBwbGllZCBpYiBhZHZhbmNlLlxuXHQqL1xuXHRtYXJrdXBUcmFjZShhcmdzOiBhbnkpIHtcblx0XHRpZiAoYXJncyBpbnN0YW5jZW9mIEFycmF5KSB7XG5cdFx0XHRhcmdzLm1hcChcblx0XHRcdFx0KGl0ZW06IGFueSwgaW5kZXg6IG51bWJlcikgPT4ge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRcdGlmICgoaXRlbS5pbmRleE9mKCdAJykgPiAtMSB8fCBpdGVtLmluZGV4T2YoJygnKSA+IC0xKSAmJiBpdGVtLmluZGV4T2YoJzonKSA+IDAgJiYgaXRlbS5pbmRleE9mKCdcXG4nKSA+IDApIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgbGlzdCA9IFtdO1xuXHRcdFx0XHRcdFx0XHRpdGVtLnNwbGl0KCdcXG4nKS5tYXAoXG5cdFx0XHRcdFx0XHRcdFx0KGxpbmU6IHN0cmluZykgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgeCA9IGxpbmUuaW5kZXhPZignQCcpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgeiA9IGxpbmUuaW5kZXhPZignKCcpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHogPiAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHN1Ymxpc3QgPSBsaW5lLnN1YnN0cmluZyh6KzEsIGxpbmUubGVuZ3RoIC0gMSkuc3BsaXQoJzonKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgbGVuID0gc3VibGlzdC5sZW5ndGg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBsaW5lLnN1YnN0cmluZygwLCB6KSArICc6JyArIHN1Ymxpc3RbbGVuIC0gMl0gKyAnOicgKyBzdWJsaXN0W2xlbiAtIDFdO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCByZWYgPSBzdWJsaXN0LnNsaWNlKDAsIGxlbiAtIDIpLmpvaW4oJzonKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRsaXN0LnB1c2goJzxhIGhyZWY9XCInICsgcmVmICsgICdcIj4nICsgbmFtZSArICc8L2E+Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHggPj0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCB5ID0gbGluZS5pbmRleE9mKCc6Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICh5IDwgMCApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsaXN0LnB1c2goJzxhIGhyZWY9XCInICsgbGluZS5zdWJzdHJpbmcoeCsxKSArICAnXCI+JyArXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGluZS5zdWJzdHJpbmcoMCwgeCkgK1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8L2E+Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3Qgc3VibGlzdCA9IGxpbmUuc3Vic3RyaW5nKHgrMSwgbGluZS5sZW5ndGgpLnNwbGl0KCc6Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgbGVuID0gc3VibGlzdC5sZW5ndGg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgbmFtZSA9IGxpbmUuc3Vic3RyaW5nKDAsIHgpICsgJzonICsgc3VibGlzdFtsZW4gLSAyXSArICc6JyArIHN1Ymxpc3RbbGVuIC0gMV07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgcmVmID0gc3VibGlzdC5zbGljZSgwLCBsZW4gLSAyKS5qb2luKCc6Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGlzdC5wdXNoKCc8YSBocmVmPVwiJyArIHJlZiArICAnXCI+JyArIG5hbWUgKyAnPC9hPicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRsaXN0LnB1c2gobGluZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRhcmdzW2luZGV4XSA9IGxpc3Quam9pbignPGJyIC8+Jyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gYXJncztcblx0fVxufVxuIl19