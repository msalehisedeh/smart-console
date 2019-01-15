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
        this.watchList = {};
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
     * @param {?} args
     * @return {?}
     */
    _reportWatch(args) {
        /** @type {?} */
        const list = Object.keys(this.watchList);
        if (list.length) {
            /** @type {?} */
            const logStr = [...args].join(',');
            list.map((key) => {
                if (logStr.indexOf(key) > -1) {
                    this.watchList[key].emit([...args]);
                }
                ;
            });
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
        this._reportWatch(args);
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
        this._reportWatch(args);
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
        this._reportWatch(args);
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
        this._reportWatch(args);
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
        this._reportWatch(args);
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
        this._reportWatch(args);
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
        this._reportWatch(args);
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
                        args[index] = item.split(breakOn).join('<br />');
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
    /** @type {?} */
    SmartConsoleService.prototype.watchList;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnQtY29uc29sZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL3NtYXJ0LWNvbnNvbGUvIiwic291cmNlcyI6WyJzcmMvYXBwL3NtYXJ0LWNvbnNvbGUvc21hcnQtY29uc29sZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0J2RCxNQUFNOzswQkFFZ0IsT0FBTyxDQUFDLEdBQUc7MkJBQ1YsT0FBTyxDQUFDLElBQUk7MkJBQ1osT0FBTyxDQUFDLElBQUk7NEJBQ1gsT0FBTyxDQUFDLEtBQUs7NEJBQ2IsT0FBTyxDQUFDLEtBQUs7NEJBQ2IsT0FBTyxDQUFDLEtBQUs7NkJBQ1osT0FBTyxDQUFDLE1BQU07c0JBQ3JCLElBQUksWUFBWSxFQUFFO3lCQUNmLEVBQUU7Ozs7OztJQUVkLFdBQVcsQ0FBQyxHQUFHLElBQUk7O1FBQzFCLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7O1lBQzNCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDaEIsQ0FBQyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FDeEIsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDUixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUIsTUFBTSxHQUFHLElBQUksQ0FBQztpQkFDZDthQUNELENBQ0QsQ0FBQztTQUNGO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7Ozs7SUFFUCxTQUFTOztRQUloQixJQUFJLEtBQUssR0FBUSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDO1lBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM3QjtRQUFDLEtBQUssQ0FBQSxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ1gsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDaEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFFLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakI7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDOzs7Ozs7SUFFTixRQUFRLENBQUMsR0FBRyxJQUFJOztRQUN2QixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOztZQUM5QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUMzQixDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNSLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM5QixNQUFNLEdBQUcsSUFBSSxDQUFDO2lCQUNkO2FBQ0QsQ0FDRCxDQUFDO1NBQ0Y7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDOzs7Ozs7SUFFUCxZQUFZLENBQUMsSUFBSTs7UUFDeEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7O1lBQ2pCLE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLEdBQUcsQ0FDUCxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNQLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDcEM7Z0JBQUEsQ0FBQzthQUNGLENBQ0QsQ0FBQztTQUNGOzs7Ozs7SUFHTSxRQUFRLENBQUMsR0FBRyxJQUFJOztRQUN2QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7O1FBQy9CLE1BQU0sRUFBRSxHQUFHLHlCQUF5QixDQUFDOztRQUNyQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOztRQUN6QixNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztRQUNqQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQzs7UUFDN0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDOztRQUNyQyxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztRQUN6RSxNQUFNLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDOztRQUN6QixNQUFNLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHO1lBQ3JDLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHO1lBQ3BCLEtBQUssQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHO1lBQ3pCLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHO1lBQ3RCLEtBQUssQ0FBQyxVQUFVLEVBQUUsR0FBRyxHQUFHO1lBQ3hCLEtBQUssQ0FBQyxVQUFVLEVBQUUsR0FBRyxHQUFHO1lBQ3hCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUM3QixNQUFNLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7Ozs7OztJQUUzRSxLQUFLLENBQUMsR0FBRyxJQUFJO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEtBQUssU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7WUFDMUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUN2QixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUN2QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFFL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDdEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO3dCQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7cUJBQzVCO2lCQUNEO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNQLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztpQkFDNUI7YUFDRDtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNQLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7d0JBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztxQkFDNUI7aUJBQ0Q7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ1AsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO2lCQUM3QjthQUNEO1NBQ0Q7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7SUFFakIsSUFBSSxDQUFDLEdBQUcsSUFBSTtRQUNuQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxLQUFLLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1lBQ3hFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDdkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDdkIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3ZDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzt3QkFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO3FCQUM1QjtpQkFDRDtnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDUCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7aUJBQzdCO2FBQ0Q7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO3dCQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7cUJBQzdCO2lCQUNEO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNQLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztpQkFDN0I7YUFDRDtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNQLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUN0QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7d0JBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztxQkFDNUI7aUJBQ0Q7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ1AsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO2lCQUM1QjthQUNEO1NBQ0Q7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7SUFFakIsS0FBSyxDQUFDLEdBQUcsSUFBSTtRQUNwQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxLQUFLLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO1lBQzFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDdkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDdkIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3RDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzt3QkFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO3FCQUM1QjtpQkFDRDtnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7aUJBQzVCO2FBQ0Q7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDeEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO3dCQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7cUJBQzlCO2lCQUNEO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNQLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztpQkFDOUI7YUFDRDtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNQLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7d0JBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztxQkFDN0I7aUJBQ0Q7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ1AsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO2lCQUM3QjthQUNEO1NBQ0Q7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7SUFFakIsTUFBTSxDQUFDLEdBQUcsSUFBSTtRQUNyQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxLQUFLLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQzVFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDdkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDdkIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3RDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzt3QkFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO3FCQUM1QjtpQkFDRDtnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7aUJBQzVCO2FBQ0Q7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDUCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDeEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO3dCQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7cUJBQzlCO2lCQUNEO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNQLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztpQkFDOUI7YUFDRDtTQUNEO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7O0lBRWpCLE1BQU0sQ0FBQyxHQUFHLElBQUk7UUFDckIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsS0FBSyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztZQUM1RSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQ3ZCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUMvQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDeEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7aUJBQzlCO2FBQ0Q7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDUCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7YUFDOUI7U0FDRDtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7OztJQUVqQixNQUFNLENBQUMsR0FBRyxJQUFJO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEtBQUssU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQy9FLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUMvQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDeEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7aUJBQzlCO2FBQ0Q7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDUCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7YUFDOUI7U0FDRDtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7OztJQUVqQixPQUFPLENBQUMsR0FBRyxJQUFJO1FBQ3RCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEtBQUssU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztvQkFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO2lCQUM1QjthQUNEO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO2FBQzVCO1NBQ0Q7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7SUFNekIsYUFBYSxDQUFFLFlBQTBCO1FBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekM7Ozs7SUFJRCxnQkFBZ0I7UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztLQUNuQjs7Ozs7SUFLRCxRQUFRLENBQUMsR0FBRztRQUNYLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1NBQ3pDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDM0I7Ozs7O0lBS0QsV0FBVyxDQUFDLEdBQUc7UUFDZCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDM0I7Ozs7O0lBTUQsY0FBYyxDQUFDLElBQVc7UUFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7S0FDcEI7Ozs7O0lBTUQsV0FBVyxDQUFDLElBQVM7UUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FDUCxDQUFDLElBQVMsRUFBRSxLQUFhLEVBQUUsRUFBRTtnQkFDNUIsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQzs7b0JBQzlCLE1BQU0sT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDaEcsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzt3QkFDNUYsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO3dCQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FDdEIsQ0FBQyxJQUFZLEVBQUUsRUFBRTs7NEJBQ2hCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7OzRCQUM1QixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUM1QixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0NBQ1gsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztnQ0FDaEUsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQzs7Z0NBQzNCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDOztnQ0FDcEYsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FFaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxHQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUM7NkJBQ3JEOzRCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0NBQ25CLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQzVCLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFFLENBQUMsQ0FBQyxDQUFDO29DQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFJLElBQUk7d0NBQ25ELElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3Q0FDcEIsTUFBTSxDQUFDLENBQUM7aUNBQ1I7Z0NBQUMsSUFBSSxDQUFDLENBQUM7O29DQUNQLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztvQ0FDNUQsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQzs7b0NBQzNCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDOztvQ0FDcEYsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQ0FFaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxHQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUM7aUNBQ3JEOzZCQUNEOzRCQUFDLElBQUksQ0FBQyxDQUFDO2dDQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7NkJBQ2hCO3lCQUNELENBQ0QsQ0FBQzt3QkFDRixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztxQkFDbEM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztxQkFDakQ7aUJBQ0Q7YUFDRCxDQUNELENBQUM7U0FDRjtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDWjs7O1lBN1dELFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuKi9cbmltcG9ydCB7SW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBTbWFydE9wdGlvbnMge1xuXHRlbWl0T3V0cHV0PzogYm9vbGVhbiwvLyBsb2cgcmVzdWx0IGluIHRvIG91dHB1dCBpbnN0ZWQgb2YgY29uc29sZS5cblx0bG9nQWZ0ZXJFbWl0PzogYm9vbGVhbiwgLy8gY29udGludWUgbG9nZ2luZyBpbnRvIGJyb3dzZXIgY29uc29sZSBhZnRlciBlbWl0dGluZyB0aGUgbG9nXG5cdGxvZ0Rpc2FibGVkPzogYm9vbGVhbiwgICAvLyBkaXNhYmxlcyBhbGwgbG9nIGxldmVsIGNvbnNvbGUgbG9nc1xuXHRpbmZvRGlzYWJsZWQ/OiBib29sZWFuLCAgLy8gZGlzYWJsZXMgYWxsIGluZm8gbGV2ZWwgY29uc29sZSBsb2dzXG5cdHdhcm5EaXNhYmxlZD86IGJvb2xlYW4sICAvLyBkaXNhYmxlcyBhbGwgd2FybiBsZXZlbCBjb25zb2xlIGxvZ3Ncblx0ZXJyb3JEaXNhYmxlZD86IGJvb2xlYW4sIC8vIGRpc2FibGVzIGFsbCBlcnJvciBsZXZlbCBjb25zb2xlIGxvZ3Ncblx0dGFibGVEaXNhYmxlZD86IGJvb2xlYW4sIC8vIGRpc2FibGVzIGFsbCB0YWJsZSBjb25zb2xlIGxvZ3Ncblx0dHJhY2VEaXNhYmxlZD86IGJvb2xlYW4sIC8vIGRpc2FibGVzIGFsbCB0cmFjZSBsZXZlbCBjb25zb2xlIGxvZ3Ncblx0YXNzZXJ0RGlzYWJsZWQ/OmJvb2xlYW4sIC8vIGRpc2FibGVzIGFzc2VydCBsb2dzIG9uIGNvbnNvbGVcblx0ZG93bkdyYWRlPzogYm9vbGVhbiwgICAgIC8vIGRvd25ncmFkZSBhIGxvZyBmcm9tIHdhcm5pbmcgdG8gaW5mbyBvciBsb2cgdG8gd2FybmluZywgb3IgZXJyb3IgdG8gbG9nLlxuXHR1cGdyYWRlPzogYm9vbGVhbiwgICAgICAgLy8gdXBncmFkZXMgYSBsb2cgZnJvbSBpbmZvIHRvIHdhcm5pbmcgb3Igd2FybmluZyB0byBsb2csIG9yIGxvZyB0byBlcnJvclxuXHR1cHNjYWxlPzogYm9vbGVhbiwgICAgICAgLy8gc2hvd3MgYWRkaXRpb25hbCBpbmZvIG9uIGVhY2ggbG9nXG5cdGJsb2NrQ2FsbGVyPzogYW55W10sICAgICAvLyBibG9ja3MgdGhlIGNhbGxlclxuXHRzdXBwcmVzcz86IGFueVtdICAgICAgICAgLy8gYmxvY2tzIHBlciBhIGtleXdvcmRcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNtYXJ0Q29uc29sZVNlcnZpY2Uge1xuXHRwcml2YXRlIG9wdGlvbnM6IFNtYXJ0T3B0aW9ucztcblx0cHJpdmF0ZSBkZWZhdWx0TG9nID0gY29uc29sZS5sb2c7XG5cdHByaXZhdGUgZGVmYXVsdEluZm8gPSBjb25zb2xlLmluZm87XG5cdHByaXZhdGUgZGVmYXVsdFdhcm4gPSBjb25zb2xlLndhcm47XG5cdHByaXZhdGUgZGVmYXVsdEVycm9yID0gY29uc29sZS5lcnJvcjtcblx0cHJpdmF0ZSBkZWZhdWx0VGFibGUgPSBjb25zb2xlLnRhYmxlO1xuXHRwcml2YXRlIGRlZmF1bHRUcmFjZSA9IGNvbnNvbGUudHJhY2U7XG5cdHByaXZhdGUgZGVmYXVsdEFzc2VydCA9IGNvbnNvbGUuYXNzZXJ0O1xuXHRwcml2YXRlIG91dHB1dCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblx0cHJpdmF0ZSB3YXRjaExpc3QgPSB7fTtcblxuXHRwcml2YXRlIF9zdXBwcmVzc2VkKC4uLmFyZ3MpIHtcblx0XHRsZXQgcmVzdWx0ID0gZmFsc2U7XG5cdFx0aWYgKHRoaXMub3B0aW9ucy5zdXBwcmVzcykge1xuXHRcdFx0Y29uc3QgeCA9IChhcmdzIGluc3RhbmNlb2YgQXJyYXkpID9cblx0XHRcdFx0XHRcdFx0YXJncy5qb2luKCcsJykgOiBcblx0XHRcdFx0XHRcdFx0KHR5cGVvZiBhcmdzID09PSAnb2JqZWN0JykgP1xuXHRcdFx0XHRcdFx0XHRKU09OLnN0cmluZ2lmeShhcmdzKSA6IFwiXCIgKyBhcmdzO1xuXHRcdFx0dGhpcy5vcHRpb25zLnN1cHByZXNzLm1hcChcblx0XHRcdFx0KGl0ZW0pID0+IHtcblx0XHRcdFx0XHRpZiAoeC5pbmRleE9mKGl0ZW0pID4gLTEpIHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cdHByaXZhdGUgX2dldFN0YWNrKCkge1xuXHRcdC8vIHRoaXMgbWV0aG9kIHB1cnBvc2UgaXMgb25seSB0byBmaXggSUUgaXNzdWUuIFxuXHRcdC8vIGluIElFLCBuZXcgRXJyb3IoKS5zdGFjayAgd2lsbCBiZSB1bmRlZmluZWRcblx0XHQvLyB1bmxlc3MgaXQgaXMgY2F1Z3RoIGluIHRyeSBibG9jayBzdGF0ZW1lbnQuXG5cdFx0bGV0IHN0YWNrOiBhbnkgPSAnJztcblx0XHR0cnkge1xuXHRcdCAgdGhyb3cgbmV3IEVycm9yKCdnZXRTdGFjaycpO1xuXHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0c3RhY2sgPSBlLnN0YWNrO1xuXHRcdFx0c3RhY2sgPSBzdGFjay5pbmRleE9mKCdcXHInKSA+IDAgPyBzdGFjay5pbmRleE9mKCdcXHInKSA6IHN0YWNrLnNwbGl0KCdcXG4nKTtcblx0XHRcdHN0YWNrID0gc3RhY2tbNF07XG5cdFx0fVxuXHRcdHJldHVybiBzdGFjaztcblx0fVxuXHRwcml2YXRlIF9ibG9ja2VkKC4uLmFyZ3MpIHtcblx0XHRsZXQgcmVzdWx0ID0gZmFsc2U7XG5cblx0XHRpZiAodGhpcy5vcHRpb25zLmJsb2NrQ2FsbGVyKSB7XG5cdFx0XHRjb25zdCBzdGFjayA9IHRoaXMuX2dldFN0YWNrKCk7XG5cdFx0XHR0aGlzLm9wdGlvbnMuYmxvY2tDYWxsZXIubWFwKFxuXHRcdFx0XHQoaXRlbSkgPT4ge1xuXHRcdFx0XHRcdGlmIChzdGFjay5pbmRleE9mKGl0ZW0pID4gLTEpIHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cdHByaXZhdGUgX3JlcG9ydFdhdGNoKGFyZ3MpIHtcblx0XHRjb25zdCBsaXN0ID0gT2JqZWN0LmtleXModGhpcy53YXRjaExpc3QpO1xuXHRcdGlmIChsaXN0Lmxlbmd0aCkge1xuXHRcdFx0Y29uc3QgbG9nU3RyID0gWy4uLmFyZ3NdLmpvaW4oJywnKTtcblx0XHRcdGxpc3QubWFwKFxuXHRcdFx0XHQoa2V5KSA9PiB7XG5cdFx0XHRcdFx0aWYgKGxvZ1N0ci5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHRcdFx0dGhpcy53YXRjaExpc3Rba2V5XS5lbWl0KFsuLi5hcmdzXSk7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF91cHNjYWxlKC4uLmFyZ3MpIHtcblx0XHRjb25zdCBzdGFjayA9IHRoaXMuX2dldFN0YWNrKCk7XG5cdFx0Y29uc3QgcmUgPSAvKFteKF0rKUB8YXQgKFteKF0rKSBcXCgvZztcblx0XHRjb25zdCBtID0gcmUuZXhlYyhzdGFjayk7XG5cdFx0Y29uc3QgaSA9IHN0YWNrLmxhc3RJbmRleE9mKCcvJyk7XG5cdFx0Y29uc3QgbiA9IGkgPiAwID8gc3RhY2suc3Vic3RyaW5nKGkrMSkuc3BsaXQoJzonKVswXSA6IHN0YWNrO1xuXHRcdGNvbnN0IHQgPSBtID8gKG1bMV0gfHwgbVsyXSkgOiBzdGFjaztcblx0XHRjb25zdCBjYWxsZXIgPSAodC5pbmRleE9mKCcvJykgPiAwID8gdC5zdWJzdHJpbmcoMCx0LmluZGV4T2YoJy8nKSkgOiAnJyk7XG5cdFx0Y29uc3QgX2RhdGUgPSBuZXcgRGF0ZSgpO1xuXHRcdGNvbnN0IF90aW1lID0gKF9kYXRlLmdldE1vbnRoKCkgKyAxKSArIFwiL1wiICtcblx0XHRcdFx0XHQgIF9kYXRlLmdldERheSgpICsgXCIvXCIgK1xuXHRcdFx0XHRcdCAgX2RhdGUuZ2V0RnVsbFllYXIoKSArIFwiIFwiICtcblx0XHRcdFx0XHQgIF9kYXRlLmdldEhvdXJzKCkgKyBcIjpcIiArXG5cdFx0XHRcdFx0ICBfZGF0ZS5nZXRNaW51dGVzKCkgKyBcIjpcIiArXG5cdFx0XHRcdFx0ICBfZGF0ZS5nZXRTZWNvbmRzKCkgKyBcIjpcIiArXG5cdFx0XHRcdFx0ICBfZGF0ZS5nZXRNaWxsaXNlY29uZHMoKTtcblx0XHRyZXR1cm4gW190aW1lICsgXCIgW1wiICsgbiArIChjYWxsZXIgPyBcIiB8IFwiICsgY2FsbGVyIDogJycpICsgXCJdIFwiXS5jb25jYXQoLi4uYXJncyk7XG5cdH1cblx0cHJpdmF0ZSBfaW5mbyguLi5hcmdzKSB7XG5cdFx0aWYgKCh0aGlzLm9wdGlvbnMuaW5mb0Rpc2FibGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMub3B0aW9ucy5pbmZvRGlzYWJsZWQpICYmXG5cdFx0XHQhdGhpcy5fc3VwcHJlc3NlZChhcmdzKSAmJlxuXHRcdFx0IXRoaXMuX2Jsb2NrZWQoYXJncykpIHtcblx0XHRcdGNvbnN0IG5ld0FyZ3MgPSB0aGlzLm9wdGlvbnMudXBzY2FsZSA/XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3Vwc2NhbGUoYXJncykgOiBhcmdzO1xuXHRcdFx0XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLnVwZ3JhZGUpIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJsb2dcIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdExvZyguLi5uZXdBcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJpbmZvXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRJbmZvKC4uLm5ld0FyZ3MpO1x0XHRcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9yZXBvcnRXYXRjaChhcmdzKTtcblx0fVxuXHRwcml2YXRlIF9sb2coLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLmxvZ0Rpc2FibGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMub3B0aW9ucy5sb2dEaXNhYmxlZCkgJiZcblx0XHRcdCF0aGlzLl9zdXBwcmVzc2VkKGFyZ3MpICYmXG5cdFx0XHQhdGhpcy5fYmxvY2tlZChhcmdzKSkge1xuXHRcdFx0Y29uc3QgbmV3QXJncyA9IHRoaXMub3B0aW9ucy51cHNjYWxlID9cblx0XHRcdFx0XHRcdFx0dGhpcy5fdXBzY2FsZShhcmdzKSA6IGFyZ3M7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmRvd25HcmFkZSkge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcImluZm9cIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdEluZm8oLi4ubmV3QXJncyk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy51cGdyYWRlKSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wid2FyblwiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVmYXVsdFdhcm4oLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdFdhcm4oLi4ubmV3QXJncyk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcImxvZ1wiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVmYXVsdExvZyguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1x0XHRcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9yZXBvcnRXYXRjaChhcmdzKTtcblx0fVxuXHRwcml2YXRlIF93YXJuKC4uLmFyZ3MpIHtcblx0XHRpZiAoKHRoaXMub3B0aW9ucy53YXJuRGlzYWJsZWQgPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5vcHRpb25zLndhcm5EaXNhYmxlZCkgJiZcblx0XHRcdCF0aGlzLl9zdXBwcmVzc2VkKGFyZ3MpICYmXG5cdFx0XHQhdGhpcy5fYmxvY2tlZChhcmdzKSkge1xuXHRcdFx0Y29uc3QgbmV3QXJncyA9IHRoaXMub3B0aW9ucy51cHNjYWxlID9cblx0XHRcdFx0XHRcdFx0dGhpcy5fdXBzY2FsZShhcmdzKSA6IGFyZ3M7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmRvd25HcmFkZSkge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcImxvZ1wiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVmYXVsdExvZyguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1x0XHRcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLm9wdGlvbnMudXBncmFkZSkge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcImVycm9yXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0RXJyb3IoLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdEVycm9yKC4uLm5ld0FyZ3MpO1x0XHRcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJ3YXJuXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0V2FybiguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0V2FybiguLi5uZXdBcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9yZXBvcnRXYXRjaChhcmdzKTtcblx0fVxuXHRwcml2YXRlIF9lcnJvciguLi5hcmdzKSB7XG5cdFx0aWYgKCh0aGlzLm9wdGlvbnMuZXJyb3JEaXNhYmxlZCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLm9wdGlvbnMuZXJyb3JEaXNhYmxlZCkgJiZcblx0XHRcdCF0aGlzLl9zdXBwcmVzc2VkKGFyZ3MpICYmXG5cdFx0XHQhdGhpcy5fYmxvY2tlZChhcmdzKSkge1xuXHRcdFx0Y29uc3QgbmV3QXJncyA9IHRoaXMub3B0aW9ucy51cHNjYWxlID9cblx0XHRcdFx0XHRcdFx0dGhpcy5fdXBzY2FsZShhcmdzKSA6IGFyZ3M7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmRvd25HcmFkZSkge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcImxvZ1wiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVmYXVsdExvZyguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcImVycm9yXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0RXJyb3IoLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdEVycm9yKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3JlcG9ydFdhdGNoKGFyZ3MpO1xuXHR9XG5cdHByaXZhdGUgX3RhYmxlKC4uLmFyZ3MpIHtcblx0XHRpZiAoKHRoaXMub3B0aW9ucy50YWJsZURpc2FibGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMub3B0aW9ucy5lcnJvckRpc2FibGVkKSAmJlxuXHRcdFx0IXRoaXMuX3N1cHByZXNzZWQoYXJncykgJiZcblx0XHRcdCF0aGlzLl9ibG9ja2VkKGFyZ3MpKSB7XG5cdFx0XHRjb25zdCBuZXdBcmdzID0gdGhpcy5vcHRpb25zLnVwc2NhbGUgP1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cHNjYWxlKGFyZ3MpIDogYXJncztcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcInRhYmxlXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRUYWJsZSguLi5uZXdBcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5kZWZhdWx0VGFibGUoLi4ubmV3QXJncyk7XHRcdFxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9yZXBvcnRXYXRjaChhcmdzKTtcblx0fVxuXHRwcml2YXRlIF90cmFjZSguLi5hcmdzKSB7XG5cdFx0aWYgKCh0aGlzLm9wdGlvbnMudHJhY2VEaXNhYmxlZCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLm9wdGlvbnMudHJhY2VEaXNhYmxlZCkpIHtcblx0XHRcdGNvbnN0IG5ld0FyZ3MgPSB0aGlzLm9wdGlvbnMudXBzY2FsZSA/XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3Vwc2NhbGUoYXJncykgOiBhcmdzO1xuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1widHJhY2VcIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdFRyYWNlKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmRlZmF1bHRUcmFjZSguLi5uZXdBcmdzKTtcdFx0XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3JlcG9ydFdhdGNoKGFyZ3MpO1xuXHR9XG5cdHByaXZhdGUgX2Fzc2VydCguLi5hcmdzKSB7XG5cdFx0aWYgKCh0aGlzLm9wdGlvbnMuYXNzZXJ0RGlzYWJsZWQgPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5vcHRpb25zLmFzc2VydERpc2FibGVkKSkge1xuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiYXNzZXJ0XCIsIC4uLmFyZ3NdKTtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRBc3NlcnQoLi4uYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuZGVmYXVsdEFzc2VydCguLi5hcmdzKTtcdFx0XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3JlcG9ydFdhdGNoKGFyZ3MpO1xuXHR9XG5cdC8qXG5cdCogV2lsbCBpbml0aWFsaXplIHNtYXJ0IGxvZ2dlci5cblx0KiBAaW5zdHJ1Y3Rpb25zIGluc3RydWN0aW9ucyB0byBkaXJlY3QgdGhpcyBzZXJ2aWNlIHRvIHN1cHByZXNzIGxvZ3MuXG5cdCovXG5cdG1ha2VTbWFydExvZ3MoIGluc3RydWN0aW9uczogU21hcnRPcHRpb25zICkge1xuXHRcdHRoaXMub3B0aW9ucyA9IGluc3RydWN0aW9ucztcblx0XHRjb25zb2xlLmxvZyA9IHRoaXMuX2xvZy5iaW5kKHRoaXMpO1xuXHRcdGNvbnNvbGUuaW5mbyA9IHRoaXMuX2luZm8uYmluZCh0aGlzKTtcblx0XHRjb25zb2xlLndhcm4gPSB0aGlzLl93YXJuLmJpbmQodGhpcyk7XG5cdFx0Y29uc29sZS5lcnJvciA9IHRoaXMuX2Vycm9yLmJpbmQodGhpcyk7XG5cdFx0Y29uc29sZS50YWJsZSA9IHRoaXMuX3RhYmxlLmJpbmQodGhpcyk7XG5cdFx0Y29uc29sZS50cmFjZSA9IHRoaXMuX3RyYWNlLmJpbmQodGhpcyk7XG5cdFx0Y29uc29sZS5hc3NlcnQgPSB0aGlzLl9hc3NlcnQuYmluZCh0aGlzKTtcblx0fVxuXHQvKlxuXHQqIEByZXR1cm4gRXZlbnQgRW1pdHRlciB0aGF0IG1heSBwdWJsaXNnIGxvZ3MuXG5cdCovXG5cdHJlZGlyZWN0ZWRPdXRwdXQoKSB7XG5cdFx0cmV0dXJuIHRoaXMub3V0cHV0O1xuXHR9XG5cdC8qXG5cdCogV2lsbCBhZGQgYSBrZXkgdG8gdGhlIHdhcmNoIGxpc3QuXG5cdCogQGFyZ3Mga2V5IHRvIGJlIGFkZGVkLlxuXHQqL1xuXHRhZGRXYXRjaChrZXkpIHtcblx0XHRpZiAoIXRoaXMud2F0Y2hMaXN0W2tleV0pIHtcblx0XHRcdHRoaXMud2F0Y2hMaXN0W2tleV0gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLndhdGNoTGlzdFtrZXldO1xuXHR9XG5cdC8qXG5cdCogV2lsbCByZW1vdmUgYSBrZXkgZnJvbSB0aGUgd2FyY2ggbGlzdC5cblx0KiBAYXJncyBrZXkgdG8gYmUgcmVtb3ZlZC4gaXQgd2lsbCBiZSB3aXNlIHRvIHJlbW92ZSBzdWJzY3JpcHRpb25zIHRvIHRoaXMga2V5IGJlZm9yZSBjYWxsaW5nIHRoaXMgbWV0aG9kLlxuXHQqL1xuXHRyZW1vdmVXYXRjaChrZXkpIHtcblx0XHRkZWxldGUgdGhpcy53YXRjaExpc3Rba2V5XTtcblx0fVxuXHQvKlxuXHQqIFdpbGwgY2xlYXIgd2FyY2ggbGlzdC5cblx0KiBAYXJncyBsaXN0IGlzIGEgbGlzdCBvZiBzdWJzY3JpYmVycyB0byB0aGUgaXRlbXMgaW4gd2F0Y2hsaXN0LiBcblx0KiBJdCBjb3VsZCBiZSBlbXB0eSwgYnV0IHRvIGF2b2lkIGxlYWtzLCBpdCB3aWxsIGJlIHdpc2UgdG8ga2VlcCBhIHJlY29yZCBvZiB5b3VyIHN1YnNjcmlwdGlvbnMuXG5cdCovXG5cdGNsZWFyV2F0Y2hMaXN0KGxpc3Q6IGFueVtdKSB7XG5cdFx0bGlzdC5tYXAoKHNiYykgPT4gc2JjLnVuc3Vic2NyaWJlKCkpO1xuXHRcdHRoaXMud2F0Y2hMaXN0ID0ge307XG5cdH1cblx0Lypcblx0KiBXaWxsIG1hcmt1cCBzdGFjayB0cmFjZSB0byBwcm92aWRlIEhUTUwgZnJhZ21lbnQgd2l0aCBhbmNob3JzIGZvZSBldmVyeSB0cmFjZS5cblx0KiBAYXJncyBhcmd1bWVudCB0aGF0IG1heSBjb250YWlsIHN0YWNrIHRyYWNlLlxuXHQqIEByZXR1cm4gQSBtb3JlIGZvcm1hbCBjb250ZW50IHdpdGggaHRtbCBmcmFnbWVudCBpZiBzdGFjayB0cmF2Y2UgYXBwbGllZCBpYiBhZHZhbmNlLlxuXHQqL1xuXHRtYXJrdXBUcmFjZShhcmdzOiBhbnkpIHtcblx0XHRpZiAoYXJncyBpbnN0YW5jZW9mIEFycmF5KSB7XG5cdFx0XHRhcmdzLm1hcChcblx0XHRcdFx0KGl0ZW06IGFueSwgaW5kZXg6IG51bWJlcikgPT4ge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGJyZWFrT24gPSAoaXRlbS5pbmRleE9mKCdcXG4nKSA+IDApID8gJ1xcbicgOiAoKGl0ZW0uaW5kZXhPZignXFxyJykgPiAwKSA/ICdcXHInIDogdW5kZWZpbmVkKTtcblx0XHRcdFx0XHRcdGlmIChicmVha09uICYmIChpdGVtLmluZGV4T2YoJ0AnKSA+IC0xIHx8IGl0ZW0uaW5kZXhPZignKCcpID4gLTEpICYmIGl0ZW0uaW5kZXhPZignOicpID4gMCkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBsaXN0ID0gW107XG5cdFx0XHRcdFx0XHRcdGl0ZW0uc3BsaXQoYnJlYWtPbikubWFwKFxuXHRcdFx0XHRcdFx0XHRcdChsaW5lOiBzdHJpbmcpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHggPSBsaW5lLmluZGV4T2YoJ0AnKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHogPSBsaW5lLmluZGV4T2YoJygnKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh6ID4gMCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBzdWJsaXN0ID0gbGluZS5zdWJzdHJpbmcoeisxLCBsaW5lLmxlbmd0aCAtIDEpLnNwbGl0KCc6Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGxlbiA9IHN1Ymxpc3QubGVuZ3RoO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBuYW1lID0gbGluZS5zdWJzdHJpbmcoMCwgeikgKyAnOicgKyBzdWJsaXN0W2xlbiAtIDJdICsgJzonICsgc3VibGlzdFtsZW4gLSAxXTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgcmVmID0gc3VibGlzdC5zbGljZSgwLCBsZW4gLSAyKS5qb2luKCc6Jyk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0bGlzdC5wdXNoKCc8YSBocmVmPVwiJyArIHJlZiArICAnXCI+JyArIG5hbWUgKyAnPC9hPicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICh4ID49IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgeSA9IGxpbmUuaW5kZXhPZignOicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoeSA8IDAgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGlzdC5wdXNoKCc8YSBocmVmPVwiJyArIGxpbmUuc3Vic3RyaW5nKHgrMSkgKyAgJ1wiPicgK1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxpbmUuc3Vic3RyaW5nKDAsIHgpICtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPC9hPicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHN1Ymxpc3QgPSBsaW5lLnN1YnN0cmluZyh4KzEsIGxpbmUubGVuZ3RoKS5zcGxpdCgnOicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGxlbiA9IHN1Ymxpc3QubGVuZ3RoO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBsaW5lLnN1YnN0cmluZygwLCB4KSArICc6JyArIHN1Ymxpc3RbbGVuIC0gMl0gKyAnOicgKyBzdWJsaXN0W2xlbiAtIDFdO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHJlZiA9IHN1Ymxpc3Quc2xpY2UoMCwgbGVuIC0gMikuam9pbignOicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxpc3QucHVzaCgnPGEgaHJlZj1cIicgKyByZWYgKyAgJ1wiPicgKyBuYW1lICsgJzwvYT4nKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0bGlzdC5wdXNoKGxpbmUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0YXJnc1tpbmRleF0gPSBsaXN0LmpvaW4oJzxiciAvPicpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChicmVha09uKSB7XG5cdFx0XHRcdFx0XHRcdGFyZ3NbaW5kZXhdID0gaXRlbS5zcGxpdChicmVha09uKS5qb2luKCc8YnIgLz4nKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiBhcmdzO1xuXHR9XG59XG4iXX0=