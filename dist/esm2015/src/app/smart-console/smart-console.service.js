/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
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
/** @type {?|undefined} */
SmartOptions.prototype.filter;
export class SmartConsoleService {
    constructor() {
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
    _argsToString(args) {
        /** @type {?} */
        let result = [];
        args.map((arg) => {
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
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _suppressed(...args) {
        /** @type {?} */
        let result = false;
        if (this.options.suppress) {
            /** @type {?} */
            const x = this._argsToString(args);
            this.options.suppress.map((item) => {
                if (x.indexOf(item) > -1) {
                    result = true;
                }
            });
        }
        return result;
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _filtered(...args) {
        /** @type {?} */
        let result = !this.options.filter || this.options.filter.length === 0;
        if (this.options.filter) {
            /** @type {?} */
            const x = this._argsToString(args);
            this.options.filter.map((item) => {
                if (x.indexOf(item) > -1) {
                    result = true;
                }
            });
        }
        return result;
    }
    /**
     * @return {?}
     */
    _getStack() {
        /** @type {?} */
        let stack = '';
        try {
            throw new Error('getStack');
        }
        catch (e) {
            stack = e.stack;
            stack = stack.indexOf('\r') > 0 ? stack.indexOf('\r') : stack.split('\n');
            stack = stack[4];
        }
        return stack;
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _blocked(...args) {
        /** @type {?} */
        let result = false;
        if (this.options.blockCaller) {
            /** @type {?} */
            const stack = this._getStack();
            this.options.blockCaller.map((item) => {
                if (stack.indexOf(item) > -1) {
                    result = true;
                }
            });
        }
        return result;
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _throttle(...args) {
        /** @type {?} */
        let result = false;
        if (this.options.throttleOn && (args instanceof Array)) {
            args.map((arg) => {
                if (arg instanceof Array) {
                    arg.map((item) => {
                        /** @type {?} */
                        const l = (typeof item === 'string') ? item.indexOf('level_') : -1;
                        if (l === 0) {
                            if (parseInt(item.substring(6), 10) <= this.options.throttleOn) {
                                result = true;
                            }
                        }
                    });
                }
                else {
                    /** @type {?} */
                    const l = arg.indexOf('level_');
                    if (l === 0) {
                        if (parseInt(arg.substring(6), 10) <= this.options.throttleOn) {
                            result = true;
                        }
                    }
                }
            });
        }
        return result;
    }
    /**
     * @param {?} args
     * @return {?}
     */
    _reportWatch(args) {
        /** @type {?} */
        const list = Object.keys(this.watchList);
        if (list.length) {
            try {
                /** @type {?} */
                const logStr = this._argsToString(args);
                list.map((key) => {
                    if (logStr.indexOf(key) > -1) {
                        this.watchList[key].emit(args);
                    }
                    ;
                });
            }
            catch (e) { }
        }
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _upscale(...args) {
        /** @type {?} */
        const stack = this._getStack();
        /** @type {?} */
        const re = /([^(]+)@|at ([^(]+) \(/g;
        /** @type {?} */
        const m = re.exec(stack);
        /** @type {?} */
        const i = stack.lastIndexOf('/');
        /** @type {?} */
        const n = i > 0 ? stack.substring(i + 1).split(':')[0] : stack;
        /** @type {?} */
        const t = m ? (m[1] || m[2]) : stack;
        /** @type {?} */
        const caller = (t.indexOf('/') > 0 ? t.substring(0, t.indexOf('/')) : '');
        /** @type {?} */
        const _date = new Date();
        /** @type {?} */
        const _time = (_date.getMonth() + 1) + "/" +
            _date.getDay() + "/" +
            _date.getFullYear() + " " +
            _date.getHours() + ":" +
            _date.getMinutes() + ":" +
            _date.getSeconds() + ":" +
            _date.getMilliseconds();
        return [_time + " [" + n + (caller ? " | " + caller : '') + "] "].concat(...args);
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _info(...args) {
        if ((this.options.infoDisabled === undefined || !this.options.infoDisabled) &&
            this._filtered(args) && !this._suppressed &&
            !this._throttle(args) && !this._blocked(args)) {
            /** @type {?} */
            const newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.upgrade) {
                if (this.options.emitOutput) {
                    this.output.emit(["[log]", ...newArgs]);
                    if (this.options.logAfterEmit) {
                        this.defaultLog(...newArgs);
                    }
                }
                else {
                    this.defaultLog(...newArgs);
                }
            }
            else {
                if (this.options.emitOutput) {
                    this.output.emit(["[info]", ...newArgs]);
                    if (this.options.logAfterEmit) {
                        this.defaultLog(...newArgs);
                    }
                }
                else {
                    this.defaultInfo(...newArgs);
                }
            }
        }
        this._reportWatch(args);
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _log(...args) {
        if ((this.options.logDisabled === undefined || !this.options.logDisabled) &&
            this._filtered(args) && !this._suppressed &&
            !this._throttle(args) && !this._blocked(args)) {
            /** @type {?} */
            const newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.downGrade) {
                if (this.options.emitOutput) {
                    this.output.emit(["[info]", ...newArgs]);
                    if (this.options.logAfterEmit) {
                        this.defaultLog(...newArgs);
                    }
                }
                else {
                    this.defaultInfo(...newArgs);
                }
            }
            else if (this.options.upgrade) {
                if (this.options.emitOutput) {
                    this.output.emit(["[warn]", ...newArgs]);
                    if (this.options.logAfterEmit) {
                        this.defaultWarn(...newArgs);
                    }
                }
                else {
                    this.defaultWarn(...newArgs);
                }
            }
            else {
                if (this.options.emitOutput) {
                    this.output.emit(["[log]", ...newArgs]);
                    if (this.options.logAfterEmit) {
                        this.defaultLog(...newArgs);
                    }
                }
                else {
                    this.defaultLog(...newArgs);
                }
            }
        }
        this._reportWatch(args);
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _warn(...args) {
        if ((this.options.warnDisabled === undefined || !this.options.warnDisabled) &&
            this._filtered(args) && !this._suppressed(args) &&
            !this._throttle(args) && !this._blocked(args)) {
            /** @type {?} */
            const newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.downGrade) {
                if (this.options.emitOutput) {
                    this.output.emit(["[log]", ...newArgs]);
                    if (this.options.logAfterEmit) {
                        this.defaultLog(...newArgs);
                    }
                }
                else {
                    this.defaultLog(...newArgs);
                }
            }
            else if (this.options.upgrade) {
                if (this.options.emitOutput) {
                    this.output.emit(["[error]", ...newArgs]);
                    if (this.options.logAfterEmit) {
                        this.defaultError(...newArgs);
                    }
                }
                else {
                    this.defaultError(...newArgs);
                }
            }
            else {
                if (this.options.emitOutput) {
                    this.output.emit(["[warn]", ...newArgs]);
                    if (this.options.logAfterEmit) {
                        this.defaultWarn(...newArgs);
                    }
                }
                else {
                    this.defaultWarn(...newArgs);
                }
            }
        }
        this._reportWatch(args);
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _error(...args) {
        if ((this.options.errorDisabled === undefined || !this.options.errorDisabled) &&
            this._filtered(args) && !this._suppressed(args) &&
            !this._throttle(args) && !this._blocked(args)) {
            /** @type {?} */
            const newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.downGrade) {
                if (this.options.emitOutput) {
                    this.output.emit(["[log]", ...newArgs]);
                    if (this.options.logAfterEmit) {
                        this.defaultLog(...newArgs);
                    }
                }
                else {
                    this.defaultLog(...newArgs);
                }
            }
            else {
                if (this.options.emitOutput) {
                    this.output.emit(["[error]", ...newArgs]);
                    if (this.options.logAfterEmit) {
                        this.defaultError(...newArgs);
                    }
                }
                else {
                    this.defaultError(...newArgs);
                }
            }
        }
        this._reportWatch(args);
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _table(...args) {
        if ((this.options.tableDisabled === undefined || !this.options.errorDisabled) &&
            this._filtered(args) && !this._suppressed &&
            !this._throttle(args) && !this._blocked(args)) {
            if (this.options.emitOutput) {
                /** @type {?} */
                const newArgs = this.options.upscale ?
                    this._upscale(args) : args;
                this.output.emit(["[table]", ...newArgs]);
                if (this.options.logAfterEmit) {
                    this.defaultTable(...args);
                }
            }
            else {
                this.defaultTable(...args);
            }
        }
        this._reportWatch(args);
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _trace(...args) {
        if ((this.options.traceDisabled === undefined || !this.options.traceDisabled) &&
            this._filtered(args) && !this._throttle(args)) {
            /** @type {?} */
            const newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.emitOutput) {
                this.output.emit(["[trace]", ...newArgs]);
                if (this.options.logAfterEmit) {
                    this.defaultTrace(...newArgs);
                }
            }
            else {
                this.defaultTrace(...newArgs);
            }
        }
        this._reportWatch(args);
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _exception(...args) {
        if ((this.options.exceptionDisabled === undefined || !this.options.exceptionDisabled) &&
            this._filtered(args) && !this._throttle(args)) {
            if (this.options.emitOutput) {
                this.output.emit(["[exception]", ...args]);
                if (this.options.logAfterEmit) {
                    this.defaultException(...args);
                }
            }
            else {
                this.defaultException(...args);
            }
        }
        this._reportWatch(args);
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _debug(...args) {
        if ((this.options.debugDisabled === undefined || !this.options.debugDisabled) &&
            this._filtered(args) && !this._throttle(args)) {
            if (this.options.emitOutput) {
                this.output.emit(["[debug]", ...args]);
                if (this.options.logAfterEmit) {
                    this.defaultDebug(...args);
                }
            }
            else {
                this.defaultDebug(...args);
            }
        }
        this._reportWatch(args);
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _assert(...args) {
        if ((this.options.assertDisabled === undefined || !this.options.assertDisabled) &&
            this._filtered(args) && !this._throttle(args)) {
            if (this.options.emitOutput) {
                this.output.emit(["[assert]", ...args]);
                if (this.options.logAfterEmit) {
                    this.defaultAssert(...args);
                }
            }
            else {
                this.defaultAssert(...args);
            }
        }
        this._reportWatch(args);
    }
    /**
     * @param {?} instructions
     * @return {?}
     */
    makeSmartLogs(instructions) {
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
            console.error = (...args) => { };
        }
        if (console.table) {
            console.table = this._table.bind(this);
        }
        else {
            console.table = (...args) => { };
        }
        if (console.trace) {
            console.trace = this._trace.bind(this);
        }
        else {
            console.trace = (...args) => { };
        }
        if (console.debug) {
            console.debug = this._debug.bind(this);
        }
        else {
            console.debug = (...args) => { };
        }
        if (console.assert) {
            console.assert = this._assert.bind(this);
        }
        else {
            console.assert = (...args) => { };
        }
        if (console.exception) {
            console.exception = this._exception.bind(this);
        }
        else {
            console.exception = (...args) => { };
        }
    }
    /**
     * @return {?}
     */
    redirectedOutput() {
        return this.output;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    addWatch(key) {
        if (!this.watchList[key]) {
            this.watchList[key] = new EventEmitter();
        }
        return this.watchList[key];
    }
    /**
     * @param {?} key
     * @return {?}
     */
    removeWatch(key) {
        delete this.watchList[key];
    }
    /**
     * @param {?} list
     * @return {?}
     */
    clearWatchList(list) {
        list.map((sbc) => sbc.unsubscribe());
        this.watchList = {};
    }
    /**
     * @param {?} args
     * @return {?}
     */
    markupTrace(args) {
        /** @type {?} */
        let result = args;
        if (args instanceof Array) {
            result = [];
            args.map((item) => {
                if (typeof item === 'string') {
                    /** @type {?} */
                    const breakOn = (item.indexOf('\n') > 0) ? '\n' : ((item.indexOf('\r') > 0) ? '\r' : undefined);
                    if (breakOn && (item.indexOf('@') > -1 || item.indexOf('(') > -1) && item.indexOf(':') > 0) {
                        /** @type {?} */
                        const list = [];
                        item.split(breakOn).map((line) => {
                            /** @type {?} */
                            const x = line.indexOf('@');
                            /** @type {?} */
                            const z = line.indexOf('(');
                            if (z > 0) {
                                /** @type {?} */
                                const sublist = line.substring(z + 1, line.length - 1).split(':');
                                /** @type {?} */
                                const len = sublist.length;
                                /** @type {?} */
                                const name = line.substring(0, z) + ':' + sublist[len - 2] + ':' + sublist[len - 1];
                                /** @type {?} */
                                const ref = sublist.slice(0, len - 2).join(':');
                                list.push('<a href="' + ref + '">' + name + '</a>');
                            }
                            else if (x >= 0) {
                                /** @type {?} */
                                const y = line.indexOf(':');
                                if (y < 0) {
                                    list.push('<a href="' + line.substring(x + 1) + '">' +
                                        line.substring(0, x) +
                                        '</a>');
                                }
                                else {
                                    /** @type {?} */
                                    const sublist = line.substring(x + 1, line.length).split(':');
                                    /** @type {?} */
                                    const len = sublist.length;
                                    /** @type {?} */
                                    const name = line.substring(0, x) + ':' + sublist[len - 2] + ':' + sublist[len - 1];
                                    /** @type {?} */
                                    const ref = sublist.slice(0, len - 2).join(':');
                                    list.push('<a href="' + ref + '">' + name + '</a>');
                                }
                            }
                            else {
                                list.push(line);
                            }
                        });
                        result.push(list.join('<br />'));
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
    }
}
SmartConsoleService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */ SmartConsoleService.ngInjectableDef = i0.defineInjectable({ factory: function SmartConsoleService_Factory() { return new SmartConsoleService(); }, token: SmartConsoleService, providedIn: "root" });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnQtY29uc29sZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL3NtYXJ0LWNvbnNvbGUvIiwic291cmNlcyI6WyJzcmMvYXBwL3NtYXJ0LWNvbnNvbGUvc21hcnQtY29uc29sZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNkJ2RCxNQUFNOzswQkFFZ0IsT0FBTyxDQUFDLEdBQUc7MkJBQ1YsT0FBTyxDQUFDLElBQUk7MkJBQ1osT0FBTyxDQUFDLElBQUk7NEJBQ1gsT0FBTyxDQUFDLEtBQUs7NEJBQ2IsT0FBTyxDQUFDLEtBQUs7NEJBQ2IsT0FBTyxDQUFDLEtBQUs7NkJBQ1osT0FBTyxDQUFDLE1BQU07Z0NBQ1gsT0FBTyxDQUFDLFNBQVM7NEJBQ3JCLE9BQU8sQ0FBQyxLQUFLO3NCQUNuQixJQUFJLFlBQVksRUFBRTt5QkFDZixFQUFFOzs7Ozs7SUFFZCxhQUFhLENBQUMsSUFBSTs7UUFDekIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxHQUFHLENBQ1AsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNQLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQztvQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDakM7Z0JBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQ1gsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUN6QjtvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUNqQjtpQkFDRDthQUNEO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNqQjtTQUNELENBQ0QsQ0FBQztRQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7SUFFakIsV0FBVyxDQUFDLEdBQUcsSUFBSTs7UUFDMUIsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7WUFDM0IsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQ3hCLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLE1BQU0sR0FBRyxJQUFJLENBQUM7aUJBQ2Q7YUFDRCxDQUNELENBQUM7U0FDRjtRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7Ozs7OztJQUVQLFNBQVMsQ0FBQyxHQUFHLElBQUk7O1FBQ3hCLElBQUksTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztRQUN0RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7O1lBQ3pCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUN0QixDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNSLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQixNQUFNLEdBQUcsSUFBSSxDQUFDO2lCQUNkO2FBQ0QsQ0FDRCxDQUFDO1NBQ0Y7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDOzs7OztJQUVQLFNBQVM7O1FBSWhCLElBQUksS0FBSyxHQUFRLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUM7WUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzdCO1FBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDWCxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNoQixLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUUsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNqQjtRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7Ozs7OztJQUVOLFFBQVEsQ0FBQyxHQUFHLElBQUk7O1FBQ3ZCLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztRQUVuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7O1lBQzlCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQzNCLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlCLE1BQU0sR0FBRyxJQUFJLENBQUM7aUJBQ2Q7YUFDRCxDQUNELENBQUM7U0FDRjtRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7Ozs7OztJQUVQLFNBQVMsQ0FBQyxHQUFHLElBQUk7O1FBQ3hCLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLEdBQUcsQ0FDUCxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNQLEVBQUUsQ0FBQyxDQUFDLEdBQUcsWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUMxQixHQUFHLENBQUMsR0FBRyxDQUNOLENBQUMsSUFBSSxFQUFFLEVBQUU7O3dCQUNSLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuRSxFQUFFLENBQUMsQ0FBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDZCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0NBQ2hFLE1BQU0sR0FBRyxJQUFJLENBQUM7NkJBQ2Q7eUJBQ0Q7cUJBQ0QsQ0FDRCxDQUFBO2lCQUNEO2dCQUFDLElBQUksQ0FBQyxDQUFDOztvQkFDUCxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNoQyxFQUFFLENBQUMsQ0FBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDZCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7NEJBQy9ELE1BQU0sR0FBRyxJQUFJLENBQUM7eUJBQ2Q7cUJBQ0Q7aUJBQ0Q7YUFDRCxDQUNELENBQUM7U0FDRjtRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7Ozs7OztJQUVQLFlBQVksQ0FBQyxJQUFJOztRQUN4QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUM7O2dCQUNKLE1BQU0sTUFBTSxHQUFXLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hELElBQUksQ0FBQyxHQUFHLENBQ1AsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDUCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQy9CO29CQUFBLENBQUM7aUJBQ0YsQ0FDRCxDQUFDO2FBQ0Y7WUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDO1NBQ2Q7Ozs7OztJQUdNLFFBQVEsQ0FBQyxHQUFHLElBQUk7O1FBQ3ZCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7UUFDL0IsTUFBTSxFQUFFLEdBQUcseUJBQXlCLENBQUM7O1FBQ3JDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O1FBQ3pCLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7O1FBQ2pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDOztRQUM3RCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7O1FBQ3JDLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7O1FBQ3pFLE1BQU0sS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7O1FBQ3pCLE1BQU0sS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUc7WUFDckMsS0FBSyxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUc7WUFDcEIsS0FBSyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUc7WUFDekIsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUc7WUFDdEIsS0FBSyxDQUFDLFVBQVUsRUFBRSxHQUFHLEdBQUc7WUFDeEIsS0FBSyxDQUFDLFVBQVUsRUFBRSxHQUFHLEdBQUc7WUFDeEIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FB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RyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsSUFBRyxDQUFBO1NBQy9CO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbkIsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsSUFBRyxDQUFBO1NBQy9CO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbkIsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsSUFBRyxDQUFBO1NBQy9CO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDcEIsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsSUFBRyxDQUFBO1NBQ2hDO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMvQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsSUFBRyxDQUFBO1NBQ25DO0tBQ0Q7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Q0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbEI7YUFDRCxDQUNELENBQUM7U0FDRjtRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7S0FDZDs7O1lBOWZELFVBQVUsU0FBQztnQkFDWCxVQUFVLEVBQUUsTUFBTTthQUNsQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4qL1xuaW1wb3J0IHtJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNtYXJ0T3B0aW9ucyB7XG5cdGVtaXRPdXRwdXQ/OiBib29sZWFuLC8vIGxvZyByZXN1bHQgaW4gdG8gb3V0cHV0IGluc3RlZCBvZiBjb25zb2xlLlxuXHRsb2dBZnRlckVtaXQ/OiBib29sZWFuLCAvLyBjb250aW51ZSBsb2dnaW5nIGludG8gYnJvd3NlciBjb25zb2xlIGFmdGVyIGVtaXR0aW5nIHRoZSBsb2dcblx0bG9nRGlzYWJsZWQ/OiBib29sZWFuLCAgIC8vIGRpc2FibGVzIGFsbCBsb2cgbGV2ZWwgY29uc29sZSBsb2dzXG5cdGluZm9EaXNhYmxlZD86IGJvb2xlYW4sICAvLyBkaXNhYmxlcyBhbGwgaW5mbyBsZXZlbCBjb25zb2xlIGxvZ3Ncblx0d2FybkRpc2FibGVkPzogYm9vbGVhbiwgIC8vIGRpc2FibGVzIGFsbCB3YXJuIGxldmVsIGNvbnNvbGUgbG9nc1xuXHRlcnJvckRpc2FibGVkPzogYm9vbGVhbiwgLy8gZGlzYWJsZXMgYWxsIGVycm9yIGxldmVsIGNvbnNvbGUgbG9nc1xuXHR0YWJsZURpc2FibGVkPzogYm9vbGVhbiwgLy8gZGlzYWJsZXMgYWxsIHRhYmxlIGNvbnNvbGUgbG9nc1xuXHR0cmFjZURpc2FibGVkPzogYm9vbGVhbiwgLy8gZGlzYWJsZXMgYWxsIHRyYWNlIGxldmVsIGNvbnNvbGUgbG9nc1xuXHRleGNlcHRpb25EaXNhYmxlZD86IGJvb2xlYW4sIC8vIGRpc2FibGVzIGFsbCBleGNlcHRpb24gbGV2ZWwgY29uc29sZSBsb2dzXG5cdGRlYnVnRGlzYWJsZWQ/OiBib29sZWFuLCAvLyBkaXNhYmxlcyBhbGwgZGVidWcgbGV2ZWwgY29uc29sZSBsb2dzXG5cdGFzc2VydERpc2FibGVkPzpib29sZWFuLCAvLyBkaXNhYmxlcyBhc3NlcnQgbG9ncyBvbiBjb25zb2xlXG5cdGRvd25HcmFkZT86IGJvb2xlYW4sICAgICAvLyBkb3duZ3JhZGUgYSBsb2cgZnJvbSB3YXJuaW5nIHRvIGluZm8gb3IgbG9nIHRvIHdhcm5pbmcsIG9yIGVycm9yIHRvIGxvZy5cblx0dXBncmFkZT86IGJvb2xlYW4sICAgICAgIC8vIHVwZ3JhZGVzIGEgbG9nIGZyb20gaW5mbyB0byB3YXJuaW5nIG9yIHdhcm5pbmcgdG8gbG9nLCBvciBsb2cgdG8gZXJyb3Jcblx0dXBzY2FsZT86IGJvb2xlYW4sICAgICAgIC8vIHNob3dzIGFkZGl0aW9uYWwgaW5mbyBvbiBlYWNoIGxvZ1xuXHR0aHJvdHRsZU9uPzogbnVtYmVyLCAgICAgLy8gYmxvY2sgbG9ncyBsZXNzIHRoYW4gcHJvdmlkZWQgbWVzc2FnZSBsZXZlbCAoZS5nLiwgbGV2ZWxfMyBvciBsZXZlbF81KSBpbiBhIGxvZ1xuXHRibG9ja0NhbGxlcj86IGFueVtdLCAgICAgLy8gYmxvY2tzIHRoZSBjYWxsZXJcblx0c3VwcHJlc3M/OiBhbnlbXSwgICAgICAgIC8vIGJsb2NrcyBwZXIgYSBrZXl3b3JkXG5cdGZpbHRlcj86IGFueVtdICAgICAgICAgICAvLyB3aWxsIGVsaW1pbmF0ZSBhbnkgbG9nIHRoYXQgaXMgbm90IGluIHRoZSBmaWx0ZXIgbGlzdC4gdm9pZCBpZiBsaXN0IGlzIGVtcHR5IG9yIFxuXHRcdFx0XHRcdFx0XHQgLy8gdW5kZWZpbmVkLiBvcHBvc2l0IG9mIHN1cHByZXNzLiBpZiBzdXBwbGllZCwgc3VwcHJlc3Mgd2lsbCBvbmx5IGJlIGVmZmVjdGl2ZSB3aGVuIFxuXHRcdFx0XHRcdFx0XHQgLy8gb25lIG9mIHRoZSBrZXl3b3JkcyBoYXMgcGFzc2VkIGZpbHRlcmluZyBhbmQgYW5vdGhlciBrZXl3b3JkIGluIHRoZSBzYW1lIGxvZyBpcyBcblx0XHRcdFx0XHRcdFx0IC8vIGluIHN1cHByZXNzIGxpc3QuIEZpbHRlciBhcHBsaWVzIHRvIGFsbCBsb2dzLlxufVxuXG5ASW5qZWN0YWJsZSh7XG5cdHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTbWFydENvbnNvbGVTZXJ2aWNlIHtcblx0cHJpdmF0ZSBvcHRpb25zOiBTbWFydE9wdGlvbnM7XG5cdHByaXZhdGUgZGVmYXVsdExvZyA9IGNvbnNvbGUubG9nO1xuXHRwcml2YXRlIGRlZmF1bHRJbmZvID0gY29uc29sZS5pbmZvO1xuXHRwcml2YXRlIGRlZmF1bHRXYXJuID0gY29uc29sZS53YXJuO1xuXHRwcml2YXRlIGRlZmF1bHRFcnJvciA9IGNvbnNvbGUuZXJyb3I7XG5cdHByaXZhdGUgZGVmYXVsdFRhYmxlID0gY29uc29sZS50YWJsZTtcblx0cHJpdmF0ZSBkZWZhdWx0VHJhY2UgPSBjb25zb2xlLnRyYWNlO1xuXHRwcml2YXRlIGRlZmF1bHRBc3NlcnQgPSBjb25zb2xlLmFzc2VydDtcblx0cHJpdmF0ZSBkZWZhdWx0RXhjZXB0aW9uID0gY29uc29sZS5leGNlcHRpb247XG5cdHByaXZhdGUgZGVmYXVsdERlYnVnID0gY29uc29sZS5kZWJ1Zztcblx0cHJpdmF0ZSBvdXRwdXQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cdHByaXZhdGUgd2F0Y2hMaXN0ID0ge307XG5cblx0cHJpdmF0ZSBfYXJnc1RvU3RyaW5nKGFyZ3MpOiBzdHJpbmcge1xuXHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRhcmdzLm1hcChcblx0XHRcdChhcmcpID0+IHtcblx0XHRcdFx0aWYgKHR5cGVvZiBhcmcgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKEpTT04uc3RyaW5naWZ5KGFyZykpO1xuXHRcdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdFx0aWYgKGFyZy5tZXNzYWdlKSB7XG5cdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKGFyZy5tZXNzYWdlKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKGFyZyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKGFyZyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHQpO1xuXHRcdHJldHVybiByZXN1bHQuam9pbignLCcpO1xuXHR9XG5cdHByaXZhdGUgX3N1cHByZXNzZWQoLi4uYXJncykge1xuXHRcdGxldCByZXN1bHQgPSBmYWxzZTtcblx0XHRpZiAodGhpcy5vcHRpb25zLnN1cHByZXNzKSB7XG5cdFx0XHRjb25zdCB4ID0gdGhpcy5fYXJnc1RvU3RyaW5nKGFyZ3MpO1xuXHRcdFx0dGhpcy5vcHRpb25zLnN1cHByZXNzLm1hcChcblx0XHRcdFx0KGl0ZW0pID0+IHtcblx0XHRcdFx0XHRpZiAoeC5pbmRleE9mKGl0ZW0pID4gLTEpIHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cdHByaXZhdGUgX2ZpbHRlcmVkKC4uLmFyZ3MpIHtcblx0XHRsZXQgcmVzdWx0ID0gIXRoaXMub3B0aW9ucy5maWx0ZXIgfHwgdGhpcy5vcHRpb25zLmZpbHRlci5sZW5ndGggPT09IDA7XG5cdFx0aWYgKHRoaXMub3B0aW9ucy5maWx0ZXIpIHtcblx0XHRcdGNvbnN0IHggPSB0aGlzLl9hcmdzVG9TdHJpbmcoYXJncyk7XG5cdFx0XHR0aGlzLm9wdGlvbnMuZmlsdGVyLm1hcChcblx0XHRcdFx0KGl0ZW0pID0+IHtcblx0XHRcdFx0XHRpZiAoeC5pbmRleE9mKGl0ZW0pID4gLTEpIHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cdHByaXZhdGUgX2dldFN0YWNrKCkge1xuXHRcdC8vIHRoaXMgbWV0aG9kIHB1cnBvc2UgaXMgb25seSB0byBmaXggSUUgaXNzdWUuIFxuXHRcdC8vIGluIElFLCBuZXcgRXJyb3IoKS5zdGFjayAgd2lsbCBiZSB1bmRlZmluZWRcblx0XHQvLyB1bmxlc3MgaXQgaXMgY2F1Z3RoIGluIHRyeSBibG9jayBzdGF0ZW1lbnQuXG5cdFx0bGV0IHN0YWNrOiBhbnkgPSAnJztcblx0XHR0cnkge1xuXHRcdCAgdGhyb3cgbmV3IEVycm9yKCdnZXRTdGFjaycpO1xuXHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0c3RhY2sgPSBlLnN0YWNrO1xuXHRcdFx0c3RhY2sgPSBzdGFjay5pbmRleE9mKCdcXHInKSA+IDAgPyBzdGFjay5pbmRleE9mKCdcXHInKSA6IHN0YWNrLnNwbGl0KCdcXG4nKTtcblx0XHRcdHN0YWNrID0gc3RhY2tbNF07XG5cdFx0fVxuXHRcdHJldHVybiBzdGFjaztcblx0fVxuXHRwcml2YXRlIF9ibG9ja2VkKC4uLmFyZ3MpIHtcblx0XHRsZXQgcmVzdWx0ID0gZmFsc2U7XG5cblx0XHRpZiAodGhpcy5vcHRpb25zLmJsb2NrQ2FsbGVyKSB7XG5cdFx0XHRjb25zdCBzdGFjayA9IHRoaXMuX2dldFN0YWNrKCk7XG5cdFx0XHR0aGlzLm9wdGlvbnMuYmxvY2tDYWxsZXIubWFwKFxuXHRcdFx0XHQoaXRlbSkgPT4ge1xuXHRcdFx0XHRcdGlmIChzdGFjay5pbmRleE9mKGl0ZW0pID4gLTEpIHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cdHByaXZhdGUgX3Rocm90dGxlKC4uLmFyZ3MpIHtcblx0XHRsZXQgcmVzdWx0ID0gZmFsc2U7XG5cdFx0aWYgKHRoaXMub3B0aW9ucy50aHJvdHRsZU9uICYmIChhcmdzIGluc3RhbmNlb2YgQXJyYXkpKSB7XG5cdFx0XHRhcmdzLm1hcChcblx0XHRcdFx0KGFyZykgPT4ge1xuXHRcdFx0XHRcdGlmIChhcmcgaW5zdGFuY2VvZiBBcnJheSkge1xuXHRcdFx0XHRcdFx0YXJnLm1hcChcblx0XHRcdFx0XHRcdFx0KGl0ZW0pID0+IHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBsID0gKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykgPyBpdGVtLmluZGV4T2YoJ2xldmVsXycpIDogLTE7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBsID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAocGFyc2VJbnQoaXRlbS5zdWJzdHJpbmcoNiksIDEwKSA8PSB0aGlzLm9wdGlvbnMudGhyb3R0bGVPbikge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb25zdCBsID0gYXJnLmluZGV4T2YoJ2xldmVsXycpO1xuXHRcdFx0XHRcdFx0aWYgKCBsID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChwYXJzZUludChhcmcuc3Vic3RyaW5nKDYpLCAxMCkgPD0gdGhpcy5vcHRpb25zLnRocm90dGxlT24pIHtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cdHByaXZhdGUgX3JlcG9ydFdhdGNoKGFyZ3MpIHtcblx0XHRjb25zdCBsaXN0ID0gT2JqZWN0LmtleXModGhpcy53YXRjaExpc3QpO1xuXHRcdGlmIChsaXN0Lmxlbmd0aCkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3QgbG9nU3RyOiBzdHJpbmcgPSB0aGlzLl9hcmdzVG9TdHJpbmcoYXJncyk7XG5cdFx0XHRcdGxpc3QubWFwKFxuXHRcdFx0XHRcdChrZXkpID0+IHtcblx0XHRcdFx0XHRcdGlmIChsb2dTdHIuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy53YXRjaExpc3Rba2V5XS5lbWl0KGFyZ3MpO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cdFx0XHR9IGNhdGNoIChlKSB7fVxuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgX3Vwc2NhbGUoLi4uYXJncykge1xuXHRcdGNvbnN0IHN0YWNrID0gdGhpcy5fZ2V0U3RhY2soKTtcblx0XHRjb25zdCByZSA9IC8oW14oXSspQHxhdCAoW14oXSspIFxcKC9nO1xuXHRcdGNvbnN0IG0gPSByZS5leGVjKHN0YWNrKTtcblx0XHRjb25zdCBpID0gc3RhY2subGFzdEluZGV4T2YoJy8nKTtcblx0XHRjb25zdCBuID0gaSA+IDAgPyBzdGFjay5zdWJzdHJpbmcoaSsxKS5zcGxpdCgnOicpWzBdIDogc3RhY2s7XG5cdFx0Y29uc3QgdCA9IG0gPyAobVsxXSB8fCBtWzJdKSA6IHN0YWNrO1xuXHRcdGNvbnN0IGNhbGxlciA9ICh0LmluZGV4T2YoJy8nKSA+IDAgPyB0LnN1YnN0cmluZygwLHQuaW5kZXhPZignLycpKSA6ICcnKTtcblx0XHRjb25zdCBfZGF0ZSA9IG5ldyBEYXRlKCk7XG5cdFx0Y29uc3QgX3RpbWUgPSAoX2RhdGUuZ2V0TW9udGgoKSArIDEpICsgXCIvXCIgK1xuXHRcdFx0XHRcdCAgX2RhdGUuZ2V0RGF5KCkgKyBcIi9cIiArXG5cdFx0XHRcdFx0ICBfZGF0ZS5nZXRGdWxsWWVhcigpICsgXCIgXCIgK1xuXHRcdFx0XHRcdCAgX2RhdGUuZ2V0SG91cnMoKSArIFwiOlwiICtcblx0XHRcdFx0XHQgIF9kYXRlLmdldE1pbnV0ZXMoKSArIFwiOlwiICtcblx0XHRcdFx0XHQgIF9kYXRlLmdldFNlY29uZHMoKSArIFwiOlwiICtcblx0XHRcdFx0XHQgIF9kYXRlLmdldE1pbGxpc2Vjb25kcygpO1xuXHRcdHJldHVybiBbX3RpbWUgKyBcIiBbXCIgKyBuICsgKGNhbGxlciA/IFwiIHwgXCIgKyBjYWxsZXIgOiAnJykgKyBcIl0gXCJdLmNvbmNhdCguLi5hcmdzKTtcblx0fVxuXHRwcml2YXRlIF9pbmZvKC4uLmFyZ3MpIHtcblx0XHRpZiAoKHRoaXMub3B0aW9ucy5pbmZvRGlzYWJsZWQgPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5vcHRpb25zLmluZm9EaXNhYmxlZCkgJiZcblx0XHRcdHRoaXMuX2ZpbHRlcmVkKGFyZ3MpICYmICF0aGlzLl9zdXBwcmVzc2VkICYmIFxuXHRcdFx0IXRoaXMuX3Rocm90dGxlKGFyZ3MpICYmICF0aGlzLl9ibG9ja2VkKGFyZ3MpKSB7XG5cdFx0XHRjb25zdCBuZXdBcmdzID0gdGhpcy5vcHRpb25zLnVwc2NhbGUgP1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cHNjYWxlKGFyZ3MpIDogYXJncztcblx0XHRcdFxuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy51cGdyYWRlKSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiW2xvZ11cIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdExvZyguLi5uZXdBcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJbaW5mb11cIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdEluZm8oLi4ubmV3QXJncyk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3JlcG9ydFdhdGNoKGFyZ3MpO1xuXHR9XG5cdHByaXZhdGUgX2xvZyguLi5hcmdzKSB7XG5cdFx0aWYgKCh0aGlzLm9wdGlvbnMubG9nRGlzYWJsZWQgPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5vcHRpb25zLmxvZ0Rpc2FibGVkKSAmJlxuXHRcdFx0dGhpcy5fZmlsdGVyZWQoYXJncykgJiYgIXRoaXMuX3N1cHByZXNzZWQgJiYgXG5cdFx0XHQhdGhpcy5fdGhyb3R0bGUoYXJncykgJiYgIXRoaXMuX2Jsb2NrZWQoYXJncykpIHtcblx0XHRcdGNvbnN0IG5ld0FyZ3MgPSB0aGlzLm9wdGlvbnMudXBzY2FsZSA/XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3Vwc2NhbGUoYXJncykgOiBhcmdzO1xuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5kb3duR3JhZGUpIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJbaW5mb11cIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdEluZm8oLi4ubmV3QXJncyk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy51cGdyYWRlKSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiW3dhcm5dXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0V2FybiguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0V2FybiguLi5uZXdBcmdzKTtcdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiW2xvZ11cIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdExvZyguLi5uZXdBcmdzKTtcdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5fcmVwb3J0V2F0Y2goYXJncyk7XG5cdH1cblx0cHJpdmF0ZSBfd2FybiguLi5hcmdzKSB7XG5cdFx0aWYgKCh0aGlzLm9wdGlvbnMud2FybkRpc2FibGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMub3B0aW9ucy53YXJuRGlzYWJsZWQpICYmXG5cdFx0XHR0aGlzLl9maWx0ZXJlZChhcmdzKSAmJiAhdGhpcy5fc3VwcHJlc3NlZChhcmdzKSAmJiBcblx0XHRcdCF0aGlzLl90aHJvdHRsZShhcmdzKSAmJiAhdGhpcy5fYmxvY2tlZChhcmdzKSkge1xuXHRcdFx0Y29uc3QgbmV3QXJncyA9IHRoaXMub3B0aW9ucy51cHNjYWxlID9cblx0XHRcdFx0XHRcdFx0dGhpcy5fdXBzY2FsZShhcmdzKSA6IGFyZ3M7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmRvd25HcmFkZSkge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcIltsb2ddXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy51cGdyYWRlKSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiW2Vycm9yXVwiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVmYXVsdEVycm9yKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRFcnJvciguLi5uZXdBcmdzKTtcdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiW3dhcm5dXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0V2FybiguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0V2FybiguLi5uZXdBcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9yZXBvcnRXYXRjaChhcmdzKTtcblx0fVxuXHRwcml2YXRlIF9lcnJvciguLi5hcmdzKSB7XG5cdFx0aWYgKCh0aGlzLm9wdGlvbnMuZXJyb3JEaXNhYmxlZCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLm9wdGlvbnMuZXJyb3JEaXNhYmxlZCkgJiZcblx0XHRcdHRoaXMuX2ZpbHRlcmVkKGFyZ3MpICYmICF0aGlzLl9zdXBwcmVzc2VkKGFyZ3MpICYmIFxuXHRcdFx0IXRoaXMuX3Rocm90dGxlKGFyZ3MpICYmICF0aGlzLl9ibG9ja2VkKGFyZ3MpKSB7XG5cdFx0XHRjb25zdCBuZXdBcmdzID0gdGhpcy5vcHRpb25zLnVwc2NhbGUgP1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cHNjYWxlKGFyZ3MpIDogYXJncztcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZG93bkdyYWRlKSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiW2xvZ11cIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdExvZyguLi5uZXdBcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJbZXJyb3JdXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0RXJyb3IoLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdEVycm9yKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3JlcG9ydFdhdGNoKGFyZ3MpO1xuXHR9XG5cdHByaXZhdGUgX3RhYmxlKC4uLmFyZ3MpIHtcblx0XHRpZiAoKHRoaXMub3B0aW9ucy50YWJsZURpc2FibGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMub3B0aW9ucy5lcnJvckRpc2FibGVkKSAmJlxuXHRcdFx0dGhpcy5fZmlsdGVyZWQoYXJncykgJiYgIXRoaXMuX3N1cHByZXNzZWQgJiYgXG5cdFx0XHQhdGhpcy5fdGhyb3R0bGUoYXJncykgJiYgIXRoaXMuX2Jsb2NrZWQoYXJncykpIHtcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRjb25zdCBuZXdBcmdzID0gdGhpcy5vcHRpb25zLnVwc2NhbGUgP1xuXHRcdFx0XHR0aGlzLl91cHNjYWxlKGFyZ3MpIDogYXJncztcblx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJbdGFibGVdXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRUYWJsZSguLi5hcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5kZWZhdWx0VGFibGUoLi4uYXJncyk7XHRcdFxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9yZXBvcnRXYXRjaChhcmdzKTtcblx0fVxuXHRwcml2YXRlIF90cmFjZSguLi5hcmdzKSB7XG5cdFx0aWYgKCh0aGlzLm9wdGlvbnMudHJhY2VEaXNhYmxlZCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLm9wdGlvbnMudHJhY2VEaXNhYmxlZCkgJiYgXG5cdFx0XHR0aGlzLl9maWx0ZXJlZChhcmdzKSAmJiAhdGhpcy5fdGhyb3R0bGUoYXJncykgKSB7XG5cdFx0XHRjb25zdCBuZXdBcmdzID0gdGhpcy5vcHRpb25zLnVwc2NhbGUgP1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cHNjYWxlKGFyZ3MpIDogYXJncztcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcIlt0cmFjZV1cIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdFRyYWNlKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmRlZmF1bHRUcmFjZSguLi5uZXdBcmdzKTtcdFx0XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3JlcG9ydFdhdGNoKGFyZ3MpO1xuXHR9XG5cdHByaXZhdGUgX2V4Y2VwdGlvbiguLi5hcmdzKSB7XG5cdFx0aWYgKCh0aGlzLm9wdGlvbnMuZXhjZXB0aW9uRGlzYWJsZWQgPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5vcHRpb25zLmV4Y2VwdGlvbkRpc2FibGVkKSAmJiBcblx0XHRcdHRoaXMuX2ZpbHRlcmVkKGFyZ3MpICYmICF0aGlzLl90aHJvdHRsZShhcmdzKSApIHtcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcIltleGNlcHRpb25dXCIsIC4uLmFyZ3NdKTtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRFeGNlcHRpb24oLi4uYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuZGVmYXVsdEV4Y2VwdGlvbiguLi5hcmdzKTtcdFx0XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3JlcG9ydFdhdGNoKGFyZ3MpO1xuXHR9XG5cdHByaXZhdGUgX2RlYnVnKC4uLmFyZ3MpIHtcblx0XHRpZiAoKHRoaXMub3B0aW9ucy5kZWJ1Z0Rpc2FibGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMub3B0aW9ucy5kZWJ1Z0Rpc2FibGVkKSAmJiBcblx0XHRcdHRoaXMuX2ZpbHRlcmVkKGFyZ3MpICYmICF0aGlzLl90aHJvdHRsZShhcmdzKSApIHtcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcIltkZWJ1Z11cIiwgLi4uYXJnc10pO1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdERlYnVnKC4uLmFyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmRlZmF1bHREZWJ1ZyguLi5hcmdzKTtcdFx0XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3JlcG9ydFdhdGNoKGFyZ3MpO1xuXHR9XG5cdHByaXZhdGUgX2Fzc2VydCguLi5hcmdzKSB7XG5cdFx0aWYgKCh0aGlzLm9wdGlvbnMuYXNzZXJ0RGlzYWJsZWQgPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5vcHRpb25zLmFzc2VydERpc2FibGVkKSAmJiBcblx0XHRcdHRoaXMuX2ZpbHRlcmVkKGFyZ3MpICYmICF0aGlzLl90aHJvdHRsZShhcmdzKSApIHtcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcIlthc3NlcnRdXCIsIC4uLmFyZ3NdKTtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRBc3NlcnQoLi4uYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuZGVmYXVsdEFzc2VydCguLi5hcmdzKTtcdFx0XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3JlcG9ydFdhdGNoKGFyZ3MpO1xuXHR9XG5cdC8qXG5cdCogV2lsbCBpbml0aWFsaXplIHNtYXJ0IGxvZ2dlci5cblx0KiBAaW5zdHJ1Y3Rpb25zIGluc3RydWN0aW9ucyB0byBkaXJlY3QgdGhpcyBzZXJ2aWNlIHRvIHN1cHByZXNzIGxvZ3MuXG5cdCovXG5cdG1ha2VTbWFydExvZ3MoIGluc3RydWN0aW9uczogU21hcnRPcHRpb25zICkge1xuXHRcdHRoaXMub3B0aW9ucyA9IGluc3RydWN0aW9ucztcblx0XHRpZiAoY29uc29sZS5sb2cpIHtcblx0XHRcdGNvbnNvbGUubG9nID0gdGhpcy5fbG9nLmJpbmQodGhpcyk7XG5cdFx0fVxuXHRcdGlmIChjb25zb2xlLmluZm8pIHtcblx0XHRcdGNvbnNvbGUuaW5mbyA9IHRoaXMuX2luZm8uYmluZCh0aGlzKTtcblx0XHR9XG5cdFx0aWYgKGNvbnNvbGUud2Fybikge1xuXHRcdFx0Y29uc29sZS53YXJuID0gdGhpcy5fd2Fybi5iaW5kKHRoaXMpO1xuXHRcdH1cblx0XHRpZiAoY29uc29sZS5lcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvciA9IHRoaXMuX2Vycm9yLmJpbmQodGhpcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IgPSAoLi4uYXJncykgPT4ge31cblx0XHR9XG5cdFx0aWYgKGNvbnNvbGUudGFibGUpIHtcblx0XHRcdGNvbnNvbGUudGFibGUgPSB0aGlzLl90YWJsZS5iaW5kKHRoaXMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLnRhYmxlID0gKC4uLmFyZ3MpID0+IHt9XG5cdFx0fVxuXHRcdGlmIChjb25zb2xlLnRyYWNlKSB7XG5cdFx0XHRjb25zb2xlLnRyYWNlID0gdGhpcy5fdHJhY2UuYmluZCh0aGlzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS50cmFjZSA9ICguLi5hcmdzKSA9PiB7fVxuXHRcdH1cblx0XHRpZiAoY29uc29sZS5kZWJ1Zykge1xuXHRcdFx0Y29uc29sZS5kZWJ1ZyA9IHRoaXMuX2RlYnVnLmJpbmQodGhpcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnNvbGUuZGVidWcgPSAoLi4uYXJncykgPT4ge31cblx0XHR9XG5cdFx0aWYgKGNvbnNvbGUuYXNzZXJ0KSB7XG5cdFx0XHRjb25zb2xlLmFzc2VydCA9IHRoaXMuX2Fzc2VydC5iaW5kKHRoaXMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLmFzc2VydCA9ICguLi5hcmdzKSA9PiB7fVxuXHRcdH1cblx0XHRpZiAoY29uc29sZS5leGNlcHRpb24pIHtcblx0XHRcdGNvbnNvbGUuZXhjZXB0aW9uID0gdGhpcy5fZXhjZXB0aW9uLmJpbmQodGhpcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnNvbGUuZXhjZXB0aW9uID0gKC4uLmFyZ3MpID0+IHt9XG5cdFx0fVxuXHR9XG5cdC8qXG5cdCogQHJldHVybiBFdmVudCBFbWl0dGVyIHRoYXQgbWF5IHB1Ymxpc2cgbG9ncy5cblx0Ki9cblx0cmVkaXJlY3RlZE91dHB1dCgpIHtcblx0XHRyZXR1cm4gdGhpcy5vdXRwdXQ7XG5cdH1cblx0Lypcblx0KiBXaWxsIGFkZCBhIGtleSB0byB0aGUgd2FyY2ggbGlzdC5cblx0KiBAYXJncyBrZXkgdG8gYmUgYWRkZWQuXG5cdCovXG5cdGFkZFdhdGNoKGtleSkge1xuXHRcdGlmICghdGhpcy53YXRjaExpc3Rba2V5XSkge1xuXHRcdFx0dGhpcy53YXRjaExpc3Rba2V5XSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMud2F0Y2hMaXN0W2tleV07XG5cdH1cblx0Lypcblx0KiBXaWxsIHJlbW92ZSBhIGtleSBmcm9tIHRoZSB3YXJjaCBsaXN0LlxuXHQqIEBhcmdzIGtleSB0byBiZSByZW1vdmVkLiBpdCB3aWxsIGJlIHdpc2UgdG8gcmVtb3ZlIHN1YnNjcmlwdGlvbnMgdG8gdGhpcyBrZXkgYmVmb3JlIGNhbGxpbmcgdGhpcyBtZXRob2QuXG5cdCovXG5cdHJlbW92ZVdhdGNoKGtleSkge1xuXHRcdGRlbGV0ZSB0aGlzLndhdGNoTGlzdFtrZXldO1xuXHR9XG5cdC8qXG5cdCogV2lsbCBjbGVhciB3YXJjaCBsaXN0LlxuXHQqIEBhcmdzIGxpc3QgaXMgYSBsaXN0IG9mIHN1YnNjcmliZXJzIHRvIHRoZSBpdGVtcyBpbiB3YXRjaGxpc3QuIFxuXHQqIEl0IGNvdWxkIGJlIGVtcHR5LCBidXQgdG8gYXZvaWQgbGVha3MsIGl0IHdpbGwgYmUgd2lzZSB0byBrZWVwIGEgcmVjb3JkIG9mIHlvdXIgc3Vic2NyaXB0aW9ucy5cblx0Ki9cblx0Y2xlYXJXYXRjaExpc3QobGlzdDogYW55W10pIHtcblx0XHRsaXN0Lm1hcCgoc2JjKSA9PiBzYmMudW5zdWJzY3JpYmUoKSk7XG5cdFx0dGhpcy53YXRjaExpc3QgPSB7fTtcblx0fVxuXHQvKlxuXHQqIFdpbGwgbWFya3VwIHN0YWNrIHRyYWNlIHRvIHByb3ZpZGUgSFRNTCBmcmFnbWVudCB3aXRoIGFuY2hvcnMgZm9lIGV2ZXJ5IHRyYWNlLlxuXHQqIEBhcmdzIGFyZ3VtZW50IHRoYXQgbWF5IGNvbnRhaWwgc3RhY2sgdHJhY2UuXG5cdCogQHJldHVybiBBIG1vcmUgZm9ybWFsIGNvbnRlbnQgd2l0aCBodG1sIGZyYWdtZW50IGlmIHN0YWNrIHRyYXZjZSBhcHBsaWVkIGliIGFkdmFuY2UuXG5cdCovXG5cdG1hcmt1cFRyYWNlKGFyZ3M6IGFueSkge1xuXHRcdGxldCByZXN1bHQgPSBhcmdzO1xuXHRcdGlmIChhcmdzIGluc3RhbmNlb2YgQXJyYXkpIHtcblx0XHRcdHJlc3VsdCA9IFtdO1xuXHRcdFx0YXJncy5tYXAoXG5cdFx0XHRcdChpdGVtOiBhbnkpID0+IHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBicmVha09uID0gKGl0ZW0uaW5kZXhPZignXFxuJykgPiAwKSA/ICdcXG4nIDogKChpdGVtLmluZGV4T2YoJ1xccicpID4gMCkgPyAnXFxyJyA6IHVuZGVmaW5lZCk7XG5cdFx0XHRcdFx0XHRpZiAoYnJlYWtPbiAmJiAoaXRlbS5pbmRleE9mKCdAJykgPiAtMSB8fCBpdGVtLmluZGV4T2YoJygnKSA+IC0xKSAmJiBpdGVtLmluZGV4T2YoJzonKSA+IDApIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgbGlzdCA9IFtdO1xuXHRcdFx0XHRcdFx0XHRpdGVtLnNwbGl0KGJyZWFrT24pLm1hcChcblx0XHRcdFx0XHRcdFx0XHQobGluZTogc3RyaW5nKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCB4ID0gbGluZS5pbmRleE9mKCdAJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCB6ID0gbGluZS5pbmRleE9mKCcoJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoeiA+IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3Qgc3VibGlzdCA9IGxpbmUuc3Vic3RyaW5nKHorMSwgbGluZS5sZW5ndGggLSAxKS5zcGxpdCgnOicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBsZW4gPSBzdWJsaXN0Lmxlbmd0aDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgbmFtZSA9IGxpbmUuc3Vic3RyaW5nKDAsIHopICsgJzonICsgc3VibGlzdFtsZW4gLSAyXSArICc6JyArIHN1Ymxpc3RbbGVuIC0gMV07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHJlZiA9IHN1Ymxpc3Quc2xpY2UoMCwgbGVuIC0gMikuam9pbignOicpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxpc3QucHVzaCgnPGEgaHJlZj1cIicgKyByZWYgKyAgJ1wiPicgKyBuYW1lICsgJzwvYT4nKTtcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoeCA+PSAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHkgPSBsaW5lLmluZGV4T2YoJzonKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHkgPCAwICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxpc3QucHVzaCgnPGEgaHJlZj1cIicgKyBsaW5lLnN1YnN0cmluZyh4KzEpICsgICdcIj4nICtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsaW5lLnN1YnN0cmluZygwLCB4KSArXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzwvYT4nKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBzdWJsaXN0ID0gbGluZS5zdWJzdHJpbmcoeCsxLCBsaW5lLmxlbmd0aCkuc3BsaXQoJzonKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBsZW4gPSBzdWJsaXN0Lmxlbmd0aDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBuYW1lID0gbGluZS5zdWJzdHJpbmcoMCwgeCkgKyAnOicgKyBzdWJsaXN0W2xlbiAtIDJdICsgJzonICsgc3VibGlzdFtsZW4gLSAxXTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCByZWYgPSBzdWJsaXN0LnNsaWNlKDAsIGxlbiAtIDIpLmpvaW4oJzonKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsaXN0LnB1c2goJzxhIGhyZWY9XCInICsgcmVmICsgICdcIj4nICsgbmFtZSArICc8L2E+Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxpc3QucHVzaChsaW5lKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKGxpc3Quam9pbignPGJyIC8+JykpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChicmVha09uKSB7XG5cdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW0uc3BsaXQoYnJlYWtPbikuam9pbignPGJyIC8+JykpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKEpTT04uc3RyaW5naWZ5KGl0ZW0pKTtcblx0XHRcdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdFx0XHRpZiAoaXRlbS5tZXNzYWdlKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbS5tZXNzYWdlKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucHVzaChpdGVtKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQucHVzaChpdGVtKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cbn1cbiJdfQ==