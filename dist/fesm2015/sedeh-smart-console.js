import { Injectable, EventEmitter, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class SmartConsoleService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class SmartConsoleModule {
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