/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
            !this._suppressed(args) && !this._throttle(args) && !this._blocked(args)) {
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
            !this._suppressed(args) && !this._throttle(args) && !this._blocked(args)) {
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
            !this._suppressed(args) && !this._throttle(args) && !this._blocked(args)) {
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
            !this._suppressed(args) && !this._throttle(args) && !this._blocked(args)) {
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
            !this._suppressed(args) && !this._throttle(args) && !this._blocked(args)) {
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
            !this._throttle(args)) {
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
            !this._throttle(args)) {
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
            !this._throttle(args)) {
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
            !this._throttle(args)) {
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
    { type: Injectable }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnQtY29uc29sZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL3NtYXJ0LWNvbnNvbGUvIiwic291cmNlcyI6WyJzcmMvYXBwL3NtYXJ0LWNvbnNvbGUvc21hcnQtY29uc29sZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJ2RCxNQUFNOzswQkFFZ0IsT0FBTyxDQUFDLEdBQUc7MkJBQ1YsT0FBTyxDQUFDLElBQUk7MkJBQ1osT0FBTyxDQUFDLElBQUk7NEJBQ1gsT0FBTyxDQUFDLEtBQUs7NEJBQ2IsT0FBTyxDQUFDLEtBQUs7NEJBQ2IsT0FBTyxDQUFDLEtBQUs7NkJBQ1osT0FBTyxDQUFDLE1BQU07Z0NBQ1gsT0FBTyxDQUFDLFNBQVM7NEJBQ3JCLE9BQU8sQ0FBQyxLQUFLO3NCQUNuQixJQUFJLFlBQVksRUFBRTt5QkFDZixFQUFFOzs7Ozs7SUFFZCxhQUFhLENBQUMsSUFBSTs7UUFDekIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxHQUFHLENBQ1AsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNQLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQztvQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDakM7Z0JBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQ1gsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUN6QjtvQkFB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LEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbkIsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsSUFBRyxDQUFBO1NBQy9CO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbkIsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsSUFBRyxDQUFBO1NBQy9CO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbkIsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsSUFBRyxDQUFBO1NBQy9CO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDcEIsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsSUFBRyxDQUFBO1NBQ2hDO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsT0FBTyxDQUFDLFNBQVMsR0FBRyxJ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LENBQUMsQ0FBQzt5QkFDMUI7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDbEI7cUJBQ0Q7aUJBQ0Q7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbEI7YUFDRCxDQUNELENBQUM7U0FDRjtRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7S0FDZDs7O1lBemVELFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuKi9cbmltcG9ydCB7SW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBTbWFydE9wdGlvbnMge1xuXHRlbWl0T3V0cHV0PzogYm9vbGVhbiwvLyBsb2cgcmVzdWx0IGluIHRvIG91dHB1dCBpbnN0ZWQgb2YgY29uc29sZS5cblx0bG9nQWZ0ZXJFbWl0PzogYm9vbGVhbiwgLy8gY29udGludWUgbG9nZ2luZyBpbnRvIGJyb3dzZXIgY29uc29sZSBhZnRlciBlbWl0dGluZyB0aGUgbG9nXG5cdGxvZ0Rpc2FibGVkPzogYm9vbGVhbiwgICAvLyBkaXNhYmxlcyBhbGwgbG9nIGxldmVsIGNvbnNvbGUgbG9nc1xuXHRpbmZvRGlzYWJsZWQ/OiBib29sZWFuLCAgLy8gZGlzYWJsZXMgYWxsIGluZm8gbGV2ZWwgY29uc29sZSBsb2dzXG5cdHdhcm5EaXNhYmxlZD86IGJvb2xlYW4sICAvLyBkaXNhYmxlcyBhbGwgd2FybiBsZXZlbCBjb25zb2xlIGxvZ3Ncblx0ZXJyb3JEaXNhYmxlZD86IGJvb2xlYW4sIC8vIGRpc2FibGVzIGFsbCBlcnJvciBsZXZlbCBjb25zb2xlIGxvZ3Ncblx0dGFibGVEaXNhYmxlZD86IGJvb2xlYW4sIC8vIGRpc2FibGVzIGFsbCB0YWJsZSBjb25zb2xlIGxvZ3Ncblx0dHJhY2VEaXNhYmxlZD86IGJvb2xlYW4sIC8vIGRpc2FibGVzIGFsbCB0cmFjZSBsZXZlbCBjb25zb2xlIGxvZ3Ncblx0ZXhjZXB0aW9uRGlzYWJsZWQ/OiBib29sZWFuLCAvLyBkaXNhYmxlcyBhbGwgZXhjZXB0aW9uIGxldmVsIGNvbnNvbGUgbG9nc1xuXHRkZWJ1Z0Rpc2FibGVkPzogYm9vbGVhbiwgLy8gZGlzYWJsZXMgYWxsIGRlYnVnIGxldmVsIGNvbnNvbGUgbG9nc1xuXHRhc3NlcnREaXNhYmxlZD86Ym9vbGVhbiwgLy8gZGlzYWJsZXMgYXNzZXJ0IGxvZ3Mgb24gY29uc29sZVxuXHRkb3duR3JhZGU/OiBib29sZWFuLCAgICAgLy8gZG93bmdyYWRlIGEgbG9nIGZyb20gd2FybmluZyB0byBpbmZvIG9yIGxvZyB0byB3YXJuaW5nLCBvciBlcnJvciB0byBsb2cuXG5cdHVwZ3JhZGU/OiBib29sZWFuLCAgICAgICAvLyB1cGdyYWRlcyBhIGxvZyBmcm9tIGluZm8gdG8gd2FybmluZyBvciB3YXJuaW5nIHRvIGxvZywgb3IgbG9nIHRvIGVycm9yXG5cdHVwc2NhbGU/OiBib29sZWFuLCAgICAgICAvLyBzaG93cyBhZGRpdGlvbmFsIGluZm8gb24gZWFjaCBsb2dcblx0dGhyb3R0bGVPbj86IG51bWJlciwgICAgIC8vIGJsb2NrIGxvZ3MgbGVzcyB0aGFuIHByb3ZpZGVkIG1lc3NhZ2UgbGV2ZWwgKGUuZy4sIGxldmVsXzMgb3IgbGV2ZWxfNSkgaW4gYSBsb2dcblx0YmxvY2tDYWxsZXI/OiBhbnlbXSwgICAgIC8vIGJsb2NrcyB0aGUgY2FsbGVyXG5cdHN1cHByZXNzPzogYW55W10gICAgICAgICAvLyBibG9ja3MgcGVyIGEga2V5d29yZFxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU21hcnRDb25zb2xlU2VydmljZSB7XG5cdHByaXZhdGUgb3B0aW9uczogU21hcnRPcHRpb25zO1xuXHRwcml2YXRlIGRlZmF1bHRMb2cgPSBjb25zb2xlLmxvZztcblx0cHJpdmF0ZSBkZWZhdWx0SW5mbyA9IGNvbnNvbGUuaW5mbztcblx0cHJpdmF0ZSBkZWZhdWx0V2FybiA9IGNvbnNvbGUud2Fybjtcblx0cHJpdmF0ZSBkZWZhdWx0RXJyb3IgPSBjb25zb2xlLmVycm9yO1xuXHRwcml2YXRlIGRlZmF1bHRUYWJsZSA9IGNvbnNvbGUudGFibGU7XG5cdHByaXZhdGUgZGVmYXVsdFRyYWNlID0gY29uc29sZS50cmFjZTtcblx0cHJpdmF0ZSBkZWZhdWx0QXNzZXJ0ID0gY29uc29sZS5hc3NlcnQ7XG5cdHByaXZhdGUgZGVmYXVsdEV4Y2VwdGlvbiA9IGNvbnNvbGUuZXhjZXB0aW9uO1xuXHRwcml2YXRlIGRlZmF1bHREZWJ1ZyA9IGNvbnNvbGUuZGVidWc7XG5cdHByaXZhdGUgb3V0cHV0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXHRwcml2YXRlIHdhdGNoTGlzdCA9IHt9O1xuXG5cdHByaXZhdGUgX2FyZ3NUb1N0cmluZyhhcmdzKTogc3RyaW5nIHtcblx0XHRsZXQgcmVzdWx0ID0gW107XG5cdFx0YXJncy5tYXAoXG5cdFx0XHQoYXJnKSA9PiB7XG5cdFx0XHRcdGlmICh0eXBlb2YgYXJnID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQucHVzaChKU09OLnN0cmluZ2lmeShhcmcpKTtcblx0XHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRcdGlmIChhcmcubWVzc2FnZSkge1xuXHRcdFx0XHRcdFx0XHRyZXN1bHQucHVzaChhcmcubWVzc2FnZSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRyZXN1bHQucHVzaChhcmcpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChhcmcpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0KTtcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oJywnKTtcblx0fVxuXHRwcml2YXRlIF9zdXBwcmVzc2VkKC4uLmFyZ3MpIHtcblx0XHRsZXQgcmVzdWx0ID0gZmFsc2U7XG5cdFx0aWYgKHRoaXMub3B0aW9ucy5zdXBwcmVzcykge1xuXHRcdFx0Y29uc3QgeCA9IHRoaXMuX2FyZ3NUb1N0cmluZyhhcmdzKTtcblx0XHRcdHRoaXMub3B0aW9ucy5zdXBwcmVzcy5tYXAoXG5cdFx0XHRcdChpdGVtKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHguaW5kZXhPZihpdGVtKSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXHRwcml2YXRlIF9nZXRTdGFjaygpIHtcblx0XHQvLyB0aGlzIG1ldGhvZCBwdXJwb3NlIGlzIG9ubHkgdG8gZml4IElFIGlzc3VlLiBcblx0XHQvLyBpbiBJRSwgbmV3IEVycm9yKCkuc3RhY2sgIHdpbGwgYmUgdW5kZWZpbmVkXG5cdFx0Ly8gdW5sZXNzIGl0IGlzIGNhdWd0aCBpbiB0cnkgYmxvY2sgc3RhdGVtZW50LlxuXHRcdGxldCBzdGFjazogYW55ID0gJyc7XG5cdFx0dHJ5IHtcblx0XHQgIHRocm93IG5ldyBFcnJvcignZ2V0U3RhY2snKTtcblx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdHN0YWNrID0gZS5zdGFjaztcblx0XHRcdHN0YWNrID0gc3RhY2suaW5kZXhPZignXFxyJykgPiAwID8gc3RhY2suaW5kZXhPZignXFxyJykgOiBzdGFjay5zcGxpdCgnXFxuJyk7XG5cdFx0XHRzdGFjayA9IHN0YWNrWzRdO1xuXHRcdH1cblx0XHRyZXR1cm4gc3RhY2s7XG5cdH1cblx0cHJpdmF0ZSBfYmxvY2tlZCguLi5hcmdzKSB7XG5cdFx0bGV0IHJlc3VsdCA9IGZhbHNlO1xuXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5ibG9ja0NhbGxlcikge1xuXHRcdFx0Y29uc3Qgc3RhY2sgPSB0aGlzLl9nZXRTdGFjaygpO1xuXHRcdFx0dGhpcy5vcHRpb25zLmJsb2NrQ2FsbGVyLm1hcChcblx0XHRcdFx0KGl0ZW0pID0+IHtcblx0XHRcdFx0XHRpZiAoc3RhY2suaW5kZXhPZihpdGVtKSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXHRwcml2YXRlIF90aHJvdHRsZSguLi5hcmdzKSB7XG5cdFx0bGV0IHJlc3VsdCA9IGZhbHNlO1xuXHRcdGlmICh0aGlzLm9wdGlvbnMudGhyb3R0bGVPbiAmJiAoYXJncyBpbnN0YW5jZW9mIEFycmF5KSkge1xuXHRcdFx0YXJncy5tYXAoXG5cdFx0XHRcdChhcmcpID0+IHtcblx0XHRcdFx0XHRpZiAoYXJnIGluc3RhbmNlb2YgQXJyYXkpIHtcblx0XHRcdFx0XHRcdGFyZy5tYXAoXG5cdFx0XHRcdFx0XHRcdChpdGVtKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgbCA9ICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpID8gaXRlbS5pbmRleE9mKCdsZXZlbF8nKSA6IC0xO1xuXHRcdFx0XHRcdFx0XHRcdGlmICggbCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHBhcnNlSW50KGl0ZW0uc3Vic3RyaW5nKDYpLCAxMCkgPD0gdGhpcy5vcHRpb25zLnRocm90dGxlT24pIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0ID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29uc3QgbCA9IGFyZy5pbmRleE9mKCdsZXZlbF8nKTtcblx0XHRcdFx0XHRcdGlmICggbCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRpZiAocGFyc2VJbnQoYXJnLnN1YnN0cmluZyg2KSwgMTApIDw9IHRoaXMub3B0aW9ucy50aHJvdHRsZU9uKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0ID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXHRwcml2YXRlIF9yZXBvcnRXYXRjaChhcmdzKSB7XG5cdFx0Y29uc3QgbGlzdCA9IE9iamVjdC5rZXlzKHRoaXMud2F0Y2hMaXN0KTtcblx0XHRpZiAobGlzdC5sZW5ndGgpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IGxvZ1N0cjogc3RyaW5nID0gdGhpcy5fYXJnc1RvU3RyaW5nKGFyZ3MpO1xuXHRcdFx0XHRsaXN0Lm1hcChcblx0XHRcdFx0XHQoa2V5KSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAobG9nU3RyLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMud2F0Y2hMaXN0W2tleV0uZW1pdChhcmdzKTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdFx0fSBjYXRjaCAoZSkge31cblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF91cHNjYWxlKC4uLmFyZ3MpIHtcblx0XHRjb25zdCBzdGFjayA9IHRoaXMuX2dldFN0YWNrKCk7XG5cdFx0Y29uc3QgcmUgPSAvKFteKF0rKUB8YXQgKFteKF0rKSBcXCgvZztcblx0XHRjb25zdCBtID0gcmUuZXhlYyhzdGFjayk7XG5cdFx0Y29uc3QgaSA9IHN0YWNrLmxhc3RJbmRleE9mKCcvJyk7XG5cdFx0Y29uc3QgbiA9IGkgPiAwID8gc3RhY2suc3Vic3RyaW5nKGkrMSkuc3BsaXQoJzonKVswXSA6IHN0YWNrO1xuXHRcdGNvbnN0IHQgPSBtID8gKG1bMV0gfHwgbVsyXSkgOiBzdGFjaztcblx0XHRjb25zdCBjYWxsZXIgPSAodC5pbmRleE9mKCcvJykgPiAwID8gdC5zdWJzdHJpbmcoMCx0LmluZGV4T2YoJy8nKSkgOiAnJyk7XG5cdFx0Y29uc3QgX2RhdGUgPSBuZXcgRGF0ZSgpO1xuXHRcdGNvbnN0IF90aW1lID0gKF9kYXRlLmdldE1vbnRoKCkgKyAxKSArIFwiL1wiICtcblx0XHRcdFx0XHQgIF9kYXRlLmdldERheSgpICsgXCIvXCIgK1xuXHRcdFx0XHRcdCAgX2RhdGUuZ2V0RnVsbFllYXIoKSArIFwiIFwiICtcblx0XHRcdFx0XHQgIF9kYXRlLmdldEhvdXJzKCkgKyBcIjpcIiArXG5cdFx0XHRcdFx0ICBfZGF0ZS5nZXRNaW51dGVzKCkgKyBcIjpcIiArXG5cdFx0XHRcdFx0ICBfZGF0ZS5nZXRTZWNvbmRzKCkgKyBcIjpcIiArXG5cdFx0XHRcdFx0ICBfZGF0ZS5nZXRNaWxsaXNlY29uZHMoKTtcblx0XHRyZXR1cm4gW190aW1lICsgXCIgW1wiICsgbiArIChjYWxsZXIgPyBcIiB8IFwiICsgY2FsbGVyIDogJycpICsgXCJdIFwiXS5jb25jYXQoLi4uYXJncyk7XG5cdH1cblx0cHJpdmF0ZSBfaW5mbyguLi5hcmdzKSB7XG5cdFx0aWYgKCh0aGlzLm9wdGlvbnMuaW5mb0Rpc2FibGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMub3B0aW9ucy5pbmZvRGlzYWJsZWQpICYmXG5cdFx0XHQhdGhpcy5fc3VwcHJlc3NlZChhcmdzKSAmJiAhdGhpcy5fdGhyb3R0bGUoYXJncykgJiYgIXRoaXMuX2Jsb2NrZWQoYXJncykpIHtcblx0XHRcdGNvbnN0IG5ld0FyZ3MgPSB0aGlzLm9wdGlvbnMudXBzY2FsZSA/XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3Vwc2NhbGUoYXJncykgOiBhcmdzO1xuXHRcdFx0XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLnVwZ3JhZGUpIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJbbG9nXVwiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVmYXVsdExvZyguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcIltpbmZvXVwiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVmYXVsdExvZyguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0SW5mbyguLi5uZXdBcmdzKTtcdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5fcmVwb3J0V2F0Y2goYXJncyk7XG5cdH1cblx0cHJpdmF0ZSBfbG9nKC4uLmFyZ3MpIHtcblx0XHRpZiAoKHRoaXMub3B0aW9ucy5sb2dEaXNhYmxlZCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLm9wdGlvbnMubG9nRGlzYWJsZWQpICYmXG5cdFx0XHQhdGhpcy5fc3VwcHJlc3NlZChhcmdzKSAmJiAhdGhpcy5fdGhyb3R0bGUoYXJncykgJiYgIXRoaXMuX2Jsb2NrZWQoYXJncykpIHtcblx0XHRcdGNvbnN0IG5ld0FyZ3MgPSB0aGlzLm9wdGlvbnMudXBzY2FsZSA/XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3Vwc2NhbGUoYXJncykgOiBhcmdzO1xuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5kb3duR3JhZGUpIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJbaW5mb11cIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdEluZm8oLi4ubmV3QXJncyk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy51cGdyYWRlKSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiW3dhcm5dXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0V2FybiguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0V2FybiguLi5uZXdBcmdzKTtcdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiW2xvZ11cIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdExvZyguLi5uZXdBcmdzKTtcdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5fcmVwb3J0V2F0Y2goYXJncyk7XG5cdH1cblx0cHJpdmF0ZSBfd2FybiguLi5hcmdzKSB7XG5cdFx0aWYgKCh0aGlzLm9wdGlvbnMud2FybkRpc2FibGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMub3B0aW9ucy53YXJuRGlzYWJsZWQpICYmXG5cdFx0XHQhdGhpcy5fc3VwcHJlc3NlZChhcmdzKSAmJiAhdGhpcy5fdGhyb3R0bGUoYXJncykgJiYgIXRoaXMuX2Jsb2NrZWQoYXJncykpIHtcblx0XHRcdGNvbnN0IG5ld0FyZ3MgPSB0aGlzLm9wdGlvbnMudXBzY2FsZSA/XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3Vwc2NhbGUoYXJncykgOiBhcmdzO1xuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5kb3duR3JhZGUpIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJbbG9nXVwiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVmYXVsdExvZyguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1x0XHRcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLm9wdGlvbnMudXBncmFkZSkge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcIltlcnJvcl1cIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRFcnJvciguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0RXJyb3IoLi4ubmV3QXJncyk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcIlt3YXJuXVwiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVmYXVsdFdhcm4oLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdFdhcm4oLi4ubmV3QXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5fcmVwb3J0V2F0Y2goYXJncyk7XG5cdH1cblx0cHJpdmF0ZSBfZXJyb3IoLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLmVycm9yRGlzYWJsZWQgPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5vcHRpb25zLmVycm9yRGlzYWJsZWQpICYmXG5cdFx0XHQhdGhpcy5fc3VwcHJlc3NlZChhcmdzKSAmJiAhdGhpcy5fdGhyb3R0bGUoYXJncykgJiYgIXRoaXMuX2Jsb2NrZWQoYXJncykpIHtcblx0XHRcdGNvbnN0IG5ld0FyZ3MgPSB0aGlzLm9wdGlvbnMudXBzY2FsZSA/XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3Vwc2NhbGUoYXJncykgOiBhcmdzO1xuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5kb3duR3JhZGUpIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJbbG9nXVwiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVmYXVsdExvZyguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcIltlcnJvcl1cIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRFcnJvciguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0RXJyb3IoLi4ubmV3QXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5fcmVwb3J0V2F0Y2goYXJncyk7XG5cdH1cblx0cHJpdmF0ZSBfdGFibGUoLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLnRhYmxlRGlzYWJsZWQgPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5vcHRpb25zLmVycm9yRGlzYWJsZWQpICYmXG5cdFx0XHQhdGhpcy5fc3VwcHJlc3NlZChhcmdzKSAmJiAhdGhpcy5fdGhyb3R0bGUoYXJncykgJiYgIXRoaXMuX2Jsb2NrZWQoYXJncykpIHtcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRjb25zdCBuZXdBcmdzID0gdGhpcy5vcHRpb25zLnVwc2NhbGUgP1xuXHRcdFx0XHR0aGlzLl91cHNjYWxlKGFyZ3MpIDogYXJncztcblx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJbdGFibGVdXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRUYWJsZSguLi5hcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5kZWZhdWx0VGFibGUoLi4uYXJncyk7XHRcdFxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9yZXBvcnRXYXRjaChhcmdzKTtcblx0fVxuXHRwcml2YXRlIF90cmFjZSguLi5hcmdzKSB7XG5cdFx0aWYgKCh0aGlzLm9wdGlvbnMudHJhY2VEaXNhYmxlZCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLm9wdGlvbnMudHJhY2VEaXNhYmxlZCkgJiYgXG5cdFx0XHQhdGhpcy5fdGhyb3R0bGUoYXJncykgKSB7XG5cdFx0XHRjb25zdCBuZXdBcmdzID0gdGhpcy5vcHRpb25zLnVwc2NhbGUgP1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cHNjYWxlKGFyZ3MpIDogYXJncztcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcIlt0cmFjZV1cIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdFRyYWNlKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmRlZmF1bHRUcmFjZSguLi5uZXdBcmdzKTtcdFx0XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3JlcG9ydFdhdGNoKGFyZ3MpO1xuXHR9XG5cdHByaXZhdGUgX2V4Y2VwdGlvbiguLi5hcmdzKSB7XG5cdFx0aWYgKCh0aGlzLm9wdGlvbnMuZXhjZXB0aW9uRGlzYWJsZWQgPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5vcHRpb25zLmV4Y2VwdGlvbkRpc2FibGVkKSAmJiBcblx0XHRcdCF0aGlzLl90aHJvdHRsZShhcmdzKSApIHtcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcIltleGNlcHRpb25dXCIsIC4uLmFyZ3NdKTtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRFeGNlcHRpb24oLi4uYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuZGVmYXVsdEV4Y2VwdGlvbiguLi5hcmdzKTtcdFx0XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3JlcG9ydFdhdGNoKGFyZ3MpO1xuXHR9XG5cdHByaXZhdGUgX2RlYnVnKC4uLmFyZ3MpIHtcblx0XHRpZiAoKHRoaXMub3B0aW9ucy5kZWJ1Z0Rpc2FibGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMub3B0aW9ucy5kZWJ1Z0Rpc2FibGVkKSAmJiBcblx0XHRcdCF0aGlzLl90aHJvdHRsZShhcmdzKSApIHtcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcIltkZWJ1Z11cIiwgLi4uYXJnc10pO1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdERlYnVnKC4uLmFyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmRlZmF1bHREZWJ1ZyguLi5hcmdzKTtcdFx0XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3JlcG9ydFdhdGNoKGFyZ3MpO1xuXHR9XG5cdHByaXZhdGUgX2Fzc2VydCguLi5hcmdzKSB7XG5cdFx0aWYgKCh0aGlzLm9wdGlvbnMuYXNzZXJ0RGlzYWJsZWQgPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5vcHRpb25zLmFzc2VydERpc2FibGVkKSAmJiBcblx0XHRcdCF0aGlzLl90aHJvdHRsZShhcmdzKSApIHtcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcIlthc3NlcnRdXCIsIC4uLmFyZ3NdKTtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRBc3NlcnQoLi4uYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuZGVmYXVsdEFzc2VydCguLi5hcmdzKTtcdFx0XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3JlcG9ydFdhdGNoKGFyZ3MpO1xuXHR9XG5cdC8qXG5cdCogV2lsbCBpbml0aWFsaXplIHNtYXJ0IGxvZ2dlci5cblx0KiBAaW5zdHJ1Y3Rpb25zIGluc3RydWN0aW9ucyB0byBkaXJlY3QgdGhpcyBzZXJ2aWNlIHRvIHN1cHByZXNzIGxvZ3MuXG5cdCovXG5cdG1ha2VTbWFydExvZ3MoIGluc3RydWN0aW9uczogU21hcnRPcHRpb25zICkge1xuXHRcdHRoaXMub3B0aW9ucyA9IGluc3RydWN0aW9ucztcblx0XHRpZiAoY29uc29sZS5sb2cpIHtcblx0XHRcdGNvbnNvbGUubG9nID0gdGhpcy5fbG9nLmJpbmQodGhpcyk7XG5cdFx0fVxuXHRcdGlmIChjb25zb2xlLmluZm8pIHtcblx0XHRcdGNvbnNvbGUuaW5mbyA9IHRoaXMuX2luZm8uYmluZCh0aGlzKTtcblx0XHR9XG5cdFx0aWYgKGNvbnNvbGUud2Fybikge1xuXHRcdFx0Y29uc29sZS53YXJuID0gdGhpcy5fd2Fybi5iaW5kKHRoaXMpO1xuXHRcdH1cblx0XHRpZiAoY29uc29sZS5lcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvciA9IHRoaXMuX2Vycm9yLmJpbmQodGhpcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IgPSAoLi4uYXJncykgPT4ge31cblx0XHR9XG5cdFx0aWYgKGNvbnNvbGUudGFibGUpIHtcblx0XHRcdGNvbnNvbGUudGFibGUgPSB0aGlzLl90YWJsZS5iaW5kKHRoaXMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLnRhYmxlID0gKC4uLmFyZ3MpID0+IHt9XG5cdFx0fVxuXHRcdGlmIChjb25zb2xlLnRyYWNlKSB7XG5cdFx0XHRjb25zb2xlLnRyYWNlID0gdGhpcy5fdHJhY2UuYmluZCh0aGlzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS50cmFjZSA9ICguLi5hcmdzKSA9PiB7fVxuXHRcdH1cblx0XHRpZiAoY29uc29sZS5kZWJ1Zykge1xuXHRcdFx0Y29uc29sZS5kZWJ1ZyA9IHRoaXMuX2RlYnVnLmJpbmQodGhpcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnNvbGUuZGVidWcgPSAoLi4uYXJncykgPT4ge31cblx0XHR9XG5cdFx0aWYgKGNvbnNvbGUuYXNzZXJ0KSB7XG5cdFx0XHRjb25zb2xlLmFzc2VydCA9IHRoaXMuX2Fzc2VydC5iaW5kKHRoaXMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLmFzc2VydCA9ICguLi5hcmdzKSA9PiB7fVxuXHRcdH1cblx0XHRpZiAoY29uc29sZS5leGNlcHRpb24pIHtcblx0XHRcdGNvbnNvbGUuZXhjZXB0aW9uID0gdGhpcy5fZXhjZXB0aW9uLmJpbmQodGhpcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnNvbGUuZXhjZXB0aW9uID0gKC4uLmFyZ3MpID0+IHt9XG5cdFx0fVxuXHR9XG5cdC8qXG5cdCogQHJldHVybiBFdmVudCBFbWl0dGVyIHRoYXQgbWF5IHB1Ymxpc2cgbG9ncy5cblx0Ki9cblx0cmVkaXJlY3RlZE91dHB1dCgpIHtcblx0XHRyZXR1cm4gdGhpcy5vdXRwdXQ7XG5cdH1cblx0Lypcblx0KiBXaWxsIGFkZCBhIGtleSB0byB0aGUgd2FyY2ggbGlzdC5cblx0KiBAYXJncyBrZXkgdG8gYmUgYWRkZWQuXG5cdCovXG5cdGFkZFdhdGNoKGtleSkge1xuXHRcdGlmICghdGhpcy53YXRjaExpc3Rba2V5XSkge1xuXHRcdFx0dGhpcy53YXRjaExpc3Rba2V5XSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMud2F0Y2hMaXN0W2tleV07XG5cdH1cblx0Lypcblx0KiBXaWxsIHJlbW92ZSBhIGtleSBmcm9tIHRoZSB3YXJjaCBsaXN0LlxuXHQqIEBhcmdzIGtleSB0byBiZSByZW1vdmVkLiBpdCB3aWxsIGJlIHdpc2UgdG8gcmVtb3ZlIHN1YnNjcmlwdGlvbnMgdG8gdGhpcyBrZXkgYmVmb3JlIGNhbGxpbmcgdGhpcyBtZXRob2QuXG5cdCovXG5cdHJlbW92ZVdhdGNoKGtleSkge1xuXHRcdGRlbGV0ZSB0aGlzLndhdGNoTGlzdFtrZXldO1xuXHR9XG5cdC8qXG5cdCogV2lsbCBjbGVhciB3YXJjaCBsaXN0LlxuXHQqIEBhcmdzIGxpc3QgaXMgYSBsaXN0IG9mIHN1YnNjcmliZXJzIHRvIHRoZSBpdGVtcyBpbiB3YXRjaGxpc3QuIFxuXHQqIEl0IGNvdWxkIGJlIGVtcHR5LCBidXQgdG8gYXZvaWQgbGVha3MsIGl0IHdpbGwgYmUgd2lzZSB0byBrZWVwIGEgcmVjb3JkIG9mIHlvdXIgc3Vic2NyaXB0aW9ucy5cblx0Ki9cblx0Y2xlYXJXYXRjaExpc3QobGlzdDogYW55W10pIHtcblx0XHRsaXN0Lm1hcCgoc2JjKSA9PiBzYmMudW5zdWJzY3JpYmUoKSk7XG5cdFx0dGhpcy53YXRjaExpc3QgPSB7fTtcblx0fVxuXHQvKlxuXHQqIFdpbGwgbWFya3VwIHN0YWNrIHRyYWNlIHRvIHByb3ZpZGUgSFRNTCBmcmFnbWVudCB3aXRoIGFuY2hvcnMgZm9lIGV2ZXJ5IHRyYWNlLlxuXHQqIEBhcmdzIGFyZ3VtZW50IHRoYXQgbWF5IGNvbnRhaWwgc3RhY2sgdHJhY2UuXG5cdCogQHJldHVybiBBIG1vcmUgZm9ybWFsIGNvbnRlbnQgd2l0aCBodG1sIGZyYWdtZW50IGlmIHN0YWNrIHRyYXZjZSBhcHBsaWVkIGliIGFkdmFuY2UuXG5cdCovXG5cdG1hcmt1cFRyYWNlKGFyZ3M6IGFueSkge1xuXHRcdGxldCByZXN1bHQgPSBhcmdzO1xuXHRcdGlmIChhcmdzIGluc3RhbmNlb2YgQXJyYXkpIHtcblx0XHRcdHJlc3VsdCA9IFtdO1xuXHRcdFx0YXJncy5tYXAoXG5cdFx0XHRcdChpdGVtOiBhbnkpID0+IHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBicmVha09uID0gKGl0ZW0uaW5kZXhPZignXFxuJykgPiAwKSA/ICdcXG4nIDogKChpdGVtLmluZGV4T2YoJ1xccicpID4gMCkgPyAnXFxyJyA6IHVuZGVmaW5lZCk7XG5cdFx0XHRcdFx0XHRpZiAoYnJlYWtPbiAmJiAoaXRlbS5pbmRleE9mKCdAJykgPiAtMSB8fCBpdGVtLmluZGV4T2YoJygnKSA+IC0xKSAmJiBpdGVtLmluZGV4T2YoJzonKSA+IDApIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgbGlzdCA9IFtdO1xuXHRcdFx0XHRcdFx0XHRpdGVtLnNwbGl0KGJyZWFrT24pLm1hcChcblx0XHRcdFx0XHRcdFx0XHQobGluZTogc3RyaW5nKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCB4ID0gbGluZS5pbmRleE9mKCdAJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCB6ID0gbGluZS5pbmRleE9mKCcoJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoeiA+IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3Qgc3VibGlzdCA9IGxpbmUuc3Vic3RyaW5nKHorMSwgbGluZS5sZW5ndGggLSAxKS5zcGxpdCgnOicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBsZW4gPSBzdWJsaXN0Lmxlbmd0aDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgbmFtZSA9IGxpbmUuc3Vic3RyaW5nKDAsIHopICsgJzonICsgc3VibGlzdFtsZW4gLSAyXSArICc6JyArIHN1Ymxpc3RbbGVuIC0gMV07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHJlZiA9IHN1Ymxpc3Quc2xpY2UoMCwgbGVuIC0gMikuam9pbignOicpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxpc3QucHVzaCgnPGEgaHJlZj1cIicgKyByZWYgKyAgJ1wiPicgKyBuYW1lICsgJzwvYT4nKTtcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoeCA+PSAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHkgPSBsaW5lLmluZGV4T2YoJzonKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHkgPCAwICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxpc3QucHVzaCgnPGEgaHJlZj1cIicgKyBsaW5lLnN1YnN0cmluZyh4KzEpICsgICdcIj4nICtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsaW5lLnN1YnN0cmluZygwLCB4KSArXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzwvYT4nKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBzdWJsaXN0ID0gbGluZS5zdWJzdHJpbmcoeCsxLCBsaW5lLmxlbmd0aCkuc3BsaXQoJzonKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBsZW4gPSBzdWJsaXN0Lmxlbmd0aDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBuYW1lID0gbGluZS5zdWJzdHJpbmcoMCwgeCkgKyAnOicgKyBzdWJsaXN0W2xlbiAtIDJdICsgJzonICsgc3VibGlzdFtsZW4gLSAxXTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCByZWYgPSBzdWJsaXN0LnNsaWNlKDAsIGxlbiAtIDIpLmpvaW4oJzonKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsaXN0LnB1c2goJzxhIGhyZWY9XCInICsgcmVmICsgICdcIj4nICsgbmFtZSArICc8L2E+Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxpc3QucHVzaChsaW5lKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKGxpc3Quam9pbignPGJyIC8+JykpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChicmVha09uKSB7XG5cdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW0uc3BsaXQoYnJlYWtPbikuam9pbignPGJyIC8+JykpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKEpTT04uc3RyaW5naWZ5KGl0ZW0pKTtcblx0XHRcdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdFx0XHRpZiAoaXRlbS5tZXNzYWdlKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbS5tZXNzYWdlKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucHVzaChpdGVtKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQucHVzaChpdGVtKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cbn1cbiJdfQ==