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
export class SmartConsoleService {
    constructor() {
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
    _suppressed(...args) {
        /** @type {?} */
        let result = false;
        if (this.options.suppress) {
            /** @type {?} */
            const x = (args instanceof Array) ?
                args.join(',') :
                (typeof args === 'object') ?
                    JSON.stringify(args) : "" + args;
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
            !this._suppressed(args) &&
            !this._blocked(args)) {
            /** @type {?} */
            const newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.upgrade) {
                if (this.options.emitOutput) {
                    this.output.emit(["log", ...newArgs]);
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
                    this.output.emit(["info", ...newArgs]);
                    if (this.options.logAfterEmit) {
                        this.defaultLog(...newArgs);
                    }
                }
                else {
                    this.defaultInfo(...newArgs);
                }
            }
        }
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _log(...args) {
        if ((this.options.logDisabled === undefined || !this.options.logDisabled) &&
            !this._suppressed(args) &&
            !this._blocked(args)) {
            /** @type {?} */
            const newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.downGrade) {
                if (this.options.emitOutput) {
                    this.output.emit(["info", ...newArgs]);
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
                    this.output.emit(["warn", ...newArgs]);
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
                    this.output.emit(["log", ...newArgs]);
                    if (this.options.logAfterEmit) {
                        this.defaultLog(...newArgs);
                    }
                }
                else {
                    this.defaultLog(...newArgs);
                }
            }
        }
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _warn(...args) {
        if ((this.options.warnDisabled === undefined || !this.options.warnDisabled) &&
            !this._suppressed(args) &&
            !this._blocked(args)) {
            /** @type {?} */
            const newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.downGrade) {
                if (this.options.emitOutput) {
                    this.output.emit(["log", ...newArgs]);
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
                    this.output.emit(["error", ...newArgs]);
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
                    this.output.emit(["warn", ...newArgs]);
                    if (this.options.logAfterEmit) {
                        this.defaultWarn(...newArgs);
                    }
                }
                else {
                    this.defaultWarn(...newArgs);
                }
            }
        }
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _error(...args) {
        if ((this.options.errorDisabled === undefined || !this.options.errorDisabled) &&
            !this._suppressed(args) &&
            !this._blocked(args)) {
            /** @type {?} */
            const newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.downGrade) {
                if (this.options.emitOutput) {
                    this.output.emit(["log", ...newArgs]);
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
                    this.output.emit(["error", ...newArgs]);
                    if (this.options.logAfterEmit) {
                        this.defaultError(...newArgs);
                    }
                }
                else {
                    this.defaultError(...newArgs);
                }
            }
        }
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _table(...args) {
        if ((this.options.tableDisabled === undefined || !this.options.errorDisabled) &&
            !this._suppressed(args) &&
            !this._blocked(args)) {
            /** @type {?} */
            const newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.emitOutput) {
                this.output.emit(["table", ...newArgs]);
                if (this.options.logAfterEmit) {
                    this.defaultTable(...newArgs);
                }
            }
            else {
                this.defaultTable(...newArgs);
            }
        }
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _trace(...args) {
        if ((this.options.traceDisabled === undefined || !this.options.traceDisabled)) {
            /** @type {?} */
            const newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.emitOutput) {
                this.output.emit(["trace", ...newArgs]);
                if (this.options.logAfterEmit) {
                    this.defaultTrace(...newArgs);
                }
            }
            else {
                this.defaultTrace(...newArgs);
            }
        }
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _assert(...args) {
        if ((this.options.assertDisabled === undefined || !this.options.assertDisabled)) {
            if (this.options.emitOutput) {
                this.output.emit(["assert", ...args]);
                if (this.options.logAfterEmit) {
                    this.defaultAssert(...args);
                }
            }
            else {
                this.defaultAssert(...args);
            }
        }
    }
    /**
     * @param {?} instructions
     * @return {?}
     */
    makeSmartLogs(instructions) {
        this.options = instructions;
        console.log = this._log.bind(this);
        console.info = this._info.bind(this);
        console.warn = this._warn.bind(this);
        console.error = this._error.bind(this);
        console.table = this._table.bind(this);
        console.trace = this._trace.bind(this);
        console.assert = this._assert.bind(this);
    }
    /**
     * @return {?}
     */
    redirectedOutput() {
        return this.output;
    }
    /**
     * @param {?} args
     * @return {?}
     */
    markupTrace(args) {
        if (args instanceof Array) {
            args.map((item, index) => {
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
                        args[index] = list.join('<br />');
                    }
                    else if (breakOn) {
                        args[index] = item.replace(/\r\n/g, '<br />');
                    }
                }
            });
        }
        return args;
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
    SmartConsoleService.prototype.output;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnQtY29uc29sZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL3NtYXJ0LWNvbnNvbGUvIiwic291cmNlcyI6WyJzcmMvYXBwL3NtYXJ0LWNvbnNvbGUvc21hcnQtY29uc29sZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0J2RCxNQUFNOzswQkFFZ0IsT0FBTyxDQUFDLEdBQUc7MkJBQ1YsT0FBTyxDQUFDLElBQUk7MkJBQ1osT0FBTyxDQUFDLElBQUk7NEJBQ1gsT0FBTyxDQUFDLEtBQUs7NEJBQ2IsT0FBTyxDQUFDLEtBQUs7NEJBQ2IsT0FBTyxDQUFDLEtBQUs7NkJBQ1osT0FBTyxDQUFDLE1BQU07c0JBQ3JCLElBQUksWUFBWSxFQUFFOzs7Ozs7SUFFM0IsV0FBVyxDQUFDLEdBQUcsSUFBSTs7UUFDMUIsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7WUFDM0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixDQUFDLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUN4QixDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNSLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFB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QUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7O29DQUNwRixNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29DQUVoRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLEdBQUksSUFBSSxHQUFHLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQztpQ0FDckQ7NkJBQ0Q7NEJBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs2QkFDaEI7eUJBQ0QsQ0FDRCxDQUFDO3dCQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUNsQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUM3QztpQkFDRDthQUNELENBQ0QsQ0FBQztTQUNGO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNaOzs7WUE1VEQsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4qL1xuaW1wb3J0IHtJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNtYXJ0T3B0aW9ucyB7XG5cdGVtaXRPdXRwdXQ/OiBib29sZWFuLC8vIGxvZyByZXN1bHQgaW4gdG8gb3V0cHV0IGluc3RlZCBvZiBjb25zb2xlLlxuXHRsb2dBZnRlckVtaXQ/OiBib29sZWFuLCAvLyBjb250aW51ZSBsb2dnaW5nIGludG8gYnJvd3NlciBjb25zb2xlIGFmdGVyIGVtaXR0aW5nIHRoZSBsb2dcblx0bG9nRGlzYWJsZWQ/OiBib29sZWFuLCAgIC8vIGRpc2FibGVzIGFsbCBsb2cgbGV2ZWwgY29uc29sZSBsb2dzXG5cdGluZm9EaXNhYmxlZD86IGJvb2xlYW4sICAvLyBkaXNhYmxlcyBhbGwgaW5mbyBsZXZlbCBjb25zb2xlIGxvZ3Ncblx0d2FybkRpc2FibGVkPzogYm9vbGVhbiwgIC8vIGRpc2FibGVzIGFsbCB3YXJuIGxldmVsIGNvbnNvbGUgbG9nc1xuXHRlcnJvckRpc2FibGVkPzogYm9vbGVhbiwgLy8gZGlzYWJsZXMgYWxsIGVycm9yIGxldmVsIGNvbnNvbGUgbG9nc1xuXHR0YWJsZURpc2FibGVkPzogYm9vbGVhbiwgLy8gZGlzYWJsZXMgYWxsIHRhYmxlIGNvbnNvbGUgbG9nc1xuXHR0cmFjZURpc2FibGVkPzogYm9vbGVhbiwgLy8gZGlzYWJsZXMgYWxsIHRyYWNlIGxldmVsIGNvbnNvbGUgbG9nc1xuXHRhc3NlcnREaXNhYmxlZD86Ym9vbGVhbiwgLy8gZGlzYWJsZXMgYXNzZXJ0IGxvZ3Mgb24gY29uc29sZVxuXHRkb3duR3JhZGU/OiBib29sZWFuLCAgICAgLy8gZG93bmdyYWRlIGEgbG9nIGZyb20gd2FybmluZyB0byBpbmZvIG9yIGxvZyB0byB3YXJuaW5nLCBvciBlcnJvciB0byBsb2cuXG5cdHVwZ3JhZGU/OiBib29sZWFuLCAgICAgICAvLyB1cGdyYWRlcyBhIGxvZyBmcm9tIGluZm8gdG8gd2FybmluZyBvciB3YXJuaW5nIHRvIGxvZywgb3IgbG9nIHRvIGVycm9yXG5cdHVwc2NhbGU/OiBib29sZWFuLCAgICAgICAvLyBzaG93cyBhZGRpdGlvbmFsIGluZm8gb24gZWFjaCBsb2dcblx0YmxvY2tDYWxsZXI/OiBhbnlbXSwgICAgIC8vIGJsb2NrcyB0aGUgY2FsbGVyXG5cdHN1cHByZXNzPzogYW55W10gICAgICAgICAvLyBibG9ja3MgcGVyIGEga2V5d29yZFxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU21hcnRDb25zb2xlU2VydmljZSB7XG5cdHByaXZhdGUgb3B0aW9uczogU21hcnRPcHRpb25zO1xuXHRwcml2YXRlIGRlZmF1bHRMb2cgPSBjb25zb2xlLmxvZztcblx0cHJpdmF0ZSBkZWZhdWx0SW5mbyA9IGNvbnNvbGUuaW5mbztcblx0cHJpdmF0ZSBkZWZhdWx0V2FybiA9IGNvbnNvbGUud2Fybjtcblx0cHJpdmF0ZSBkZWZhdWx0RXJyb3IgPSBjb25zb2xlLmVycm9yO1xuXHRwcml2YXRlIGRlZmF1bHRUYWJsZSA9IGNvbnNvbGUudGFibGU7XG5cdHByaXZhdGUgZGVmYXVsdFRyYWNlID0gY29uc29sZS50cmFjZTtcblx0cHJpdmF0ZSBkZWZhdWx0QXNzZXJ0ID0gY29uc29sZS5hc3NlcnQ7XG5cdHByaXZhdGUgb3V0cHV0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cdHByaXZhdGUgX3N1cHByZXNzZWQoLi4uYXJncykge1xuXHRcdGxldCByZXN1bHQgPSBmYWxzZTtcblx0XHRpZiAodGhpcy5vcHRpb25zLnN1cHByZXNzKSB7XG5cdFx0XHRjb25zdCB4ID0gKGFyZ3MgaW5zdGFuY2VvZiBBcnJheSkgP1xuXHRcdFx0XHRcdFx0XHRhcmdzLmpvaW4oJywnKSA6IFxuXHRcdFx0XHRcdFx0XHQodHlwZW9mIGFyZ3MgPT09ICdvYmplY3QnKSA/XG5cdFx0XHRcdFx0XHRcdEpTT04uc3RyaW5naWZ5KGFyZ3MpIDogXCJcIiArIGFyZ3M7XG5cdFx0XHR0aGlzLm9wdGlvbnMuc3VwcHJlc3MubWFwKFxuXHRcdFx0XHQoaXRlbSkgPT4ge1xuXHRcdFx0XHRcdGlmICh4LmluZGV4T2YoaXRlbSkgPiAtMSkge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblx0cHJpdmF0ZSBfZ2V0U3RhY2soKSB7XG5cdFx0Ly8gdGhpcyBtZXRob2QgcHVycG9zZSBpcyBvbmx5IHRvIGZpeCBJRSBpc3N1ZS4gXG5cdFx0Ly8gaW4gSUUsIG5ldyBFcnJvcigpLnN0YWNrICB3aWxsIGJlIHVuZGVmaW5lZFxuXHRcdC8vIHVubGVzcyBpdCBpcyBjYXVndGggaW4gdHJ5IGJsb2NrIHN0YXRlbWVudC5cblx0XHRsZXQgc3RhY2s6IGFueSA9ICcnO1xuXHRcdHRyeSB7XG5cdFx0ICB0aHJvdyBuZXcgRXJyb3IoJ2dldFN0YWNrJyk7XG5cdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRzdGFjayA9IGUuc3RhY2s7XG5cdFx0XHRzdGFjayA9IHN0YWNrLmluZGV4T2YoJ1xccicpID4gMCA/IHN0YWNrLmluZGV4T2YoJ1xccicpIDogc3RhY2suc3BsaXQoJ1xcbicpO1xuXHRcdFx0c3RhY2sgPSBzdGFja1s0XTtcblx0XHR9XG5cdFx0cmV0dXJuIHN0YWNrO1xuXHR9XG5cdHByaXZhdGUgX2Jsb2NrZWQoLi4uYXJncykge1xuXHRcdGxldCByZXN1bHQgPSBmYWxzZTtcblxuXHRcdGlmICh0aGlzLm9wdGlvbnMuYmxvY2tDYWxsZXIpIHtcblx0XHRcdGNvbnN0IHN0YWNrID0gdGhpcy5fZ2V0U3RhY2soKTtcblx0XHRcdHRoaXMub3B0aW9ucy5ibG9ja0NhbGxlci5tYXAoXG5cdFx0XHRcdChpdGVtKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHN0YWNrLmluZGV4T2YoaXRlbSkgPiAtMSkge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblx0cHJpdmF0ZSBfdXBzY2FsZSguLi5hcmdzKSB7XG5cdFx0Y29uc3Qgc3RhY2sgPSB0aGlzLl9nZXRTdGFjaygpO1xuXHRcdGNvbnN0IHJlID0gLyhbXihdKylAfGF0IChbXihdKykgXFwoL2c7XG5cdFx0Y29uc3QgbSA9IHJlLmV4ZWMoc3RhY2spO1xuXHRcdGNvbnN0IGkgPSBzdGFjay5sYXN0SW5kZXhPZignLycpO1xuXHRcdGNvbnN0IG4gPSBpID4gMCA/IHN0YWNrLnN1YnN0cmluZyhpKzEpLnNwbGl0KCc6JylbMF0gOiBzdGFjaztcblx0XHRjb25zdCB0ID0gbSA/IChtWzFdIHx8IG1bMl0pIDogc3RhY2s7XG5cdFx0Y29uc3QgY2FsbGVyID0gKHQuaW5kZXhPZignLycpID4gMCA/IHQuc3Vic3RyaW5nKDAsdC5pbmRleE9mKCcvJykpIDogJycpO1xuXHRcdGNvbnN0IF9kYXRlID0gbmV3IERhdGUoKTtcblx0XHRjb25zdCBfdGltZSA9IChfZGF0ZS5nZXRNb250aCgpICsgMSkgKyBcIi9cIiArXG5cdFx0XHRcdFx0ICBfZGF0ZS5nZXREYXkoKSArIFwiL1wiICtcblx0XHRcdFx0XHQgIF9kYXRlLmdldEZ1bGxZZWFyKCkgKyBcIiBcIiArXG5cdFx0XHRcdFx0ICBfZGF0ZS5nZXRIb3VycygpICsgXCI6XCIgK1xuXHRcdFx0XHRcdCAgX2RhdGUuZ2V0TWludXRlcygpICsgXCI6XCIgK1xuXHRcdFx0XHRcdCAgX2RhdGUuZ2V0U2Vjb25kcygpICsgXCI6XCIgK1xuXHRcdFx0XHRcdCAgX2RhdGUuZ2V0TWlsbGlzZWNvbmRzKCk7XG5cdFx0cmV0dXJuIFtfdGltZSArIFwiIFtcIiArIG4gKyAoY2FsbGVyID8gXCIgfCBcIiArIGNhbGxlciA6ICcnKSArIFwiXSBcIl0uY29uY2F0KC4uLmFyZ3MpO1xuXHR9XG5cdHByaXZhdGUgX2luZm8oLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLmluZm9EaXNhYmxlZCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLm9wdGlvbnMuaW5mb0Rpc2FibGVkKSAmJlxuXHRcdFx0IXRoaXMuX3N1cHByZXNzZWQoYXJncykgJiZcblx0XHRcdCF0aGlzLl9ibG9ja2VkKGFyZ3MpKSB7XG5cdFx0XHRjb25zdCBuZXdBcmdzID0gdGhpcy5vcHRpb25zLnVwc2NhbGUgP1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cHNjYWxlKGFyZ3MpIDogYXJncztcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMudXBncmFkZSkge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcImxvZ1wiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVmYXVsdExvZyguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcImluZm9cIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdEluZm8oLi4ubmV3QXJncyk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgX2xvZyguLi5hcmdzKSB7XG5cdFx0aWYgKCh0aGlzLm9wdGlvbnMubG9nRGlzYWJsZWQgPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5vcHRpb25zLmxvZ0Rpc2FibGVkKSAmJlxuXHRcdFx0IXRoaXMuX3N1cHByZXNzZWQoYXJncykgJiZcblx0XHRcdCF0aGlzLl9ibG9ja2VkKGFyZ3MpKSB7XG5cdFx0XHRjb25zdCBuZXdBcmdzID0gdGhpcy5vcHRpb25zLnVwc2NhbGUgP1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cHNjYWxlKGFyZ3MpIDogYXJncztcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZG93bkdyYWRlKSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiaW5mb1wiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVmYXVsdExvZyguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0SW5mbyguLi5uZXdBcmdzKTtcdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLnVwZ3JhZGUpIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJ3YXJuXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0V2FybiguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0V2FybiguLi5uZXdBcmdzKTtcdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wibG9nXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgX3dhcm4oLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLndhcm5EaXNhYmxlZCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLm9wdGlvbnMud2FybkRpc2FibGVkKSAmJlxuXHRcdFx0IXRoaXMuX3N1cHByZXNzZWQoYXJncykgJiZcblx0XHRcdCF0aGlzLl9ibG9ja2VkKGFyZ3MpKSB7XG5cdFx0XHRjb25zdCBuZXdBcmdzID0gdGhpcy5vcHRpb25zLnVwc2NhbGUgP1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cHNjYWxlKGFyZ3MpIDogYXJncztcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZG93bkdyYWRlKSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wibG9nXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy51cGdyYWRlKSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiZXJyb3JcIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRFcnJvciguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0RXJyb3IoLi4ubmV3QXJncyk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcIndhcm5cIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRXYXJuKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRXYXJuKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgX2Vycm9yKC4uLmFyZ3MpIHtcblx0XHRpZiAoKHRoaXMub3B0aW9ucy5lcnJvckRpc2FibGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMub3B0aW9ucy5lcnJvckRpc2FibGVkKSAmJlxuXHRcdFx0IXRoaXMuX3N1cHByZXNzZWQoYXJncykgJiZcblx0XHRcdCF0aGlzLl9ibG9ja2VkKGFyZ3MpKSB7XG5cdFx0XHRjb25zdCBuZXdBcmdzID0gdGhpcy5vcHRpb25zLnVwc2NhbGUgP1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cHNjYWxlKGFyZ3MpIDogYXJncztcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZG93bkdyYWRlKSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wibG9nXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiZXJyb3JcIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRFcnJvciguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0RXJyb3IoLi4ubmV3QXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cHJpdmF0ZSBfdGFibGUoLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLnRhYmxlRGlzYWJsZWQgPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5vcHRpb25zLmVycm9yRGlzYWJsZWQpICYmXG5cdFx0XHQhdGhpcy5fc3VwcHJlc3NlZChhcmdzKSAmJlxuXHRcdFx0IXRoaXMuX2Jsb2NrZWQoYXJncykpIHtcblx0XHRcdGNvbnN0IG5ld0FyZ3MgPSB0aGlzLm9wdGlvbnMudXBzY2FsZSA/XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3Vwc2NhbGUoYXJncykgOiBhcmdzO1xuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1widGFibGVcIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdFRhYmxlKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmRlZmF1bHRUYWJsZSguLi5uZXdBcmdzKTtcdFx0XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgX3RyYWNlKC4uLmFyZ3MpIHtcblx0XHRpZiAoKHRoaXMub3B0aW9ucy50cmFjZURpc2FibGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMub3B0aW9ucy50cmFjZURpc2FibGVkKSkge1xuXHRcdFx0Y29uc3QgbmV3QXJncyA9IHRoaXMub3B0aW9ucy51cHNjYWxlID9cblx0XHRcdFx0XHRcdFx0dGhpcy5fdXBzY2FsZShhcmdzKSA6IGFyZ3M7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJ0cmFjZVwiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0VHJhY2UoLi4ubmV3QXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuZGVmYXVsdFRyYWNlKC4uLm5ld0FyZ3MpO1x0XHRcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cHJpdmF0ZSBfYXNzZXJ0KC4uLmFyZ3MpIHtcblx0XHRpZiAoKHRoaXMub3B0aW9ucy5hc3NlcnREaXNhYmxlZCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLm9wdGlvbnMuYXNzZXJ0RGlzYWJsZWQpKSB7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJhc3NlcnRcIiwgLi4uYXJnc10pO1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdEFzc2VydCguLi5hcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5kZWZhdWx0QXNzZXJ0KC4uLmFyZ3MpO1x0XHRcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0Lypcblx0KiBXaWxsIGluaXRpYWxpemUgc21hcnQgbG9nZ2VyLlxuXHQqIEBpbnN0cnVjdGlvbnMgaW5zdHJ1Y3Rpb25zIHRvIGRpcmVjdCB0aGlzIHNlcnZpY2UgdG8gc3VwcHJlc3MgbG9ncy5cblx0Ki9cblx0bWFrZVNtYXJ0TG9ncyggaW5zdHJ1Y3Rpb25zOiBTbWFydE9wdGlvbnMgKSB7XG5cdFx0dGhpcy5vcHRpb25zID0gaW5zdHJ1Y3Rpb25zO1xuXHRcdGNvbnNvbGUubG9nID0gdGhpcy5fbG9nLmJpbmQodGhpcyk7XG5cdFx0Y29uc29sZS5pbmZvID0gdGhpcy5faW5mby5iaW5kKHRoaXMpO1xuXHRcdGNvbnNvbGUud2FybiA9IHRoaXMuX3dhcm4uYmluZCh0aGlzKTtcblx0XHRjb25zb2xlLmVycm9yID0gdGhpcy5fZXJyb3IuYmluZCh0aGlzKTtcblx0XHRjb25zb2xlLnRhYmxlID0gdGhpcy5fdGFibGUuYmluZCh0aGlzKTtcblx0XHRjb25zb2xlLnRyYWNlID0gdGhpcy5fdHJhY2UuYmluZCh0aGlzKTtcblx0XHRjb25zb2xlLmFzc2VydCA9IHRoaXMuX2Fzc2VydC5iaW5kKHRoaXMpO1xuXHR9XG5cdC8qXG5cdCogQHJldHVybiBFdmVudCBFbWl0dGVyIHRoYXQgbWF5IHB1Ymxpc2cgbG9ncy5cblx0Ki9cblx0cmVkaXJlY3RlZE91dHB1dCgpIHtcblx0XHRyZXR1cm4gdGhpcy5vdXRwdXQ7XG5cdH1cblx0Lypcblx0KiBXaWxsIG1hcmt1cCBzdGFjayB0cmFjZSB0byBwcm92aWRlIEhUTUwgZnJhZ21lbnQgd2l0aCBhbmNob3JzIGZvZSBldmVyeSB0cmFjZS5cblx0KiBAYXJncyBhcmd1bWVudCB0aGF0IG1heSBjb250YWlsIHN0YWNrIHRyYWNlLlxuXHQqIEByZXR1cm4gQSBtb3JlIGZvcm1hbCBjb250ZW50IHdpdGggaHRtbCBmcmFnbWVudCBpZiBzdGFjayB0cmF2Y2UgYXBwbGllZCBpYiBhZHZhbmNlLlxuXHQqL1xuXHRtYXJrdXBUcmFjZShhcmdzOiBhbnkpIHtcblx0XHRpZiAoYXJncyBpbnN0YW5jZW9mIEFycmF5KSB7XG5cdFx0XHRhcmdzLm1hcChcblx0XHRcdFx0KGl0ZW06IGFueSwgaW5kZXg6IG51bWJlcikgPT4ge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGJyZWFrT24gPSAoaXRlbS5pbmRleE9mKCdcXG4nKSA+IDApID8gJ1xcbicgOiAoKGl0ZW0uaW5kZXhPZignXFxyJykgPiAwKSA/ICdcXHInIDogdW5kZWZpbmVkKTtcblx0XHRcdFx0XHRcdGlmIChicmVha09uICYmIChpdGVtLmluZGV4T2YoJ0AnKSA+IC0xIHx8IGl0ZW0uaW5kZXhPZignKCcpID4gLTEpICYmIGl0ZW0uaW5kZXhPZignOicpID4gMCkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBsaXN0ID0gW107XG5cdFx0XHRcdFx0XHRcdGl0ZW0uc3BsaXQoYnJlYWtPbikubWFwKFxuXHRcdFx0XHRcdFx0XHRcdChsaW5lOiBzdHJpbmcpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHggPSBsaW5lLmluZGV4T2YoJ0AnKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHogPSBsaW5lLmluZGV4T2YoJygnKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh6ID4gMCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBzdWJsaXN0ID0gbGluZS5zdWJzdHJpbmcoeisxLCBsaW5lLmxlbmd0aCAtIDEpLnNwbGl0KCc6Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGxlbiA9IHN1Ymxpc3QubGVuZ3RoO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBuYW1lID0gbGluZS5zdWJzdHJpbmcoMCwgeikgKyAnOicgKyBzdWJsaXN0W2xlbiAtIDJdICsgJzonICsgc3VibGlzdFtsZW4gLSAxXTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgcmVmID0gc3VibGlzdC5zbGljZSgwLCBsZW4gLSAyKS5qb2luKCc6Jyk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0bGlzdC5wdXNoKCc8YSBocmVmPVwiJyArIHJlZiArICAnXCI+JyArIG5hbWUgKyAnPC9hPicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICh4ID49IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgeSA9IGxpbmUuaW5kZXhPZignOicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoeSA8IDAgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGlzdC5wdXNoKCc8YSBocmVmPVwiJyArIGxpbmUuc3Vic3RyaW5nKHgrMSkgKyAgJ1wiPicgK1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxpbmUuc3Vic3RyaW5nKDAsIHgpICtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPC9hPicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHN1Ymxpc3QgPSBsaW5lLnN1YnN0cmluZyh4KzEsIGxpbmUubGVuZ3RoKS5zcGxpdCgnOicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGxlbiA9IHN1Ymxpc3QubGVuZ3RoO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBsaW5lLnN1YnN0cmluZygwLCB4KSArICc6JyArIHN1Ymxpc3RbbGVuIC0gMl0gKyAnOicgKyBzdWJsaXN0W2xlbiAtIDFdO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHJlZiA9IHN1Ymxpc3Quc2xpY2UoMCwgbGVuIC0gMikuam9pbignOicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxpc3QucHVzaCgnPGEgaHJlZj1cIicgKyByZWYgKyAgJ1wiPicgKyBuYW1lICsgJzwvYT4nKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0bGlzdC5wdXNoKGxpbmUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0YXJnc1tpbmRleF0gPSBsaXN0LmpvaW4oJzxiciAvPicpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChicmVha09uKSB7XG5cdFx0XHRcdFx0XHRcdGFyZ3NbaW5kZXhdID0gaXRlbS5yZXBsYWNlKC9cXHJcXG4vZywnPGJyIC8+Jyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gYXJncztcblx0fVxufVxuIl19