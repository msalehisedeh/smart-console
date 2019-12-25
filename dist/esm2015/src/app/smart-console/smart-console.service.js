import * as tslib_1 from "tslib";
/*
*/
import { Injectable, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
let SmartConsoleService = class SmartConsoleService {
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
    _argsToString(args) {
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
    _suppressed(...args) {
        let result = false;
        if (this.options.suppress) {
            const x = this._argsToString(args);
            this.options.suppress.map((item) => {
                if (x.indexOf(item) > -1) {
                    result = true;
                }
            });
        }
        return result;
    }
    _filtered(...args) {
        let result = !this.options.filter || this.options.filter.length === 0;
        if (this.options.filter) {
            const x = this._argsToString(args);
            this.options.filter.map((item) => {
                if (x.indexOf(item) > -1) {
                    result = true;
                }
            });
        }
        return result;
    }
    _getStack() {
        // this method purpose is only to fix IE issue. 
        // in IE, new Error().stack  will be undefined
        // unless it is caugth in try block statement.
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
    _blocked(...args) {
        let result = false;
        if (this.options.blockCaller) {
            const stack = this._getStack();
            this.options.blockCaller.map((item) => {
                if (stack.indexOf(item) > -1) {
                    result = true;
                }
            });
        }
        return result;
    }
    _throttle(...args) {
        let result = false;
        if (this.options.throttleOn && (args instanceof Array)) {
            args.map((arg) => {
                if (arg instanceof Array) {
                    arg.map((item) => {
                        const l = (typeof item === 'string') ? item.indexOf('level_') : -1;
                        if (l === 0) {
                            if (parseInt(item.substring(6), 10) <= this.options.throttleOn) {
                                result = true;
                            }
                        }
                    });
                }
                else {
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
    _reportWatch(args) {
        const list = Object.keys(this.watchList);
        if (list.length) {
            try {
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
    _upscale(...args) {
        const stack = this._getStack();
        const re = /([^(]+)@|at ([^(]+) \(/g;
        const m = re.exec(stack);
        const i = stack.lastIndexOf('/');
        const n = i > 0 ? stack.substring(i + 1).split(':')[0] : stack;
        const t = m ? (m[1] || m[2]) : stack;
        const caller = (t.indexOf('/') > 0 ? t.substring(0, t.indexOf('/')) : '');
        const _date = new Date();
        const _time = (_date.getMonth() + 1) + "/" +
            _date.getDay() + "/" +
            _date.getFullYear() + " " +
            _date.getHours() + ":" +
            _date.getMinutes() + ":" +
            _date.getSeconds() + ":" +
            _date.getMilliseconds();
        return [_time + " [" + n + (caller ? " | " + caller : '') + "] "].concat(...args);
    }
    _info(...args) {
        if ((this.options.infoDisabled === undefined || !this.options.infoDisabled) &&
            this._filtered(args) && !this._suppressed(args) &&
            !this._throttle(args) && !this._blocked(args)) {
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
    _log(...args) {
        if ((this.options.logDisabled === undefined || !this.options.logDisabled) &&
            this._filtered(args) && !this._suppressed(args) &&
            !this._throttle(args) && !this._blocked(args)) {
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
    _warn(...args) {
        if ((this.options.warnDisabled === undefined || !this.options.warnDisabled) &&
            this._filtered(args) && !this._suppressed(args) &&
            !this._throttle(args) && !this._blocked(args)) {
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
    _error(...args) {
        if ((this.options.errorDisabled === undefined || !this.options.errorDisabled) &&
            this._filtered(args) && !this._suppressed(args) &&
            !this._throttle(args) && !this._blocked(args)) {
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
    _table(...args) {
        if ((this.options.tableDisabled === undefined || !this.options.errorDisabled) &&
            this._filtered(args) && !this._suppressed(args) &&
            !this._throttle(args) && !this._blocked(args)) {
            if (this.options.emitOutput) {
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
    _trace(...args) {
        if ((this.options.traceDisabled === undefined || !this.options.traceDisabled) &&
            this._filtered(args) && !this._throttle(args)) {
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
    /*
    * Will initialize smart logger.
    * @instructions instructions to direct this service to suppress logs.
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
    /*
    * @return Event Emitter that may publisg logs.
    */
    redirectedOutput() {
        return this.output;
    }
    /*
    * Will add a key to the warch list.
    * @args key to be added.
    */
    addWatch(key) {
        if (!this.watchList[key]) {
            this.watchList[key] = new EventEmitter();
        }
        return this.watchList[key];
    }
    /*
    * Will remove a key from the warch list.
    * @args key to be removed. it will be wise to remove subscriptions to this key before calling this method.
    */
    removeWatch(key) {
        delete this.watchList[key];
    }
    /*
    * Will clear warch list.
    * @args list is a list of subscribers to the items in watchlist.
    * It could be empty, but to avoid leaks, it will be wise to keep a record of your subscriptions.
    */
    clearWatchList(list) {
        list.map((sbc) => sbc.unsubscribe());
        this.watchList = {};
    }
    /*
    * Will markup stack trace to provide HTML fragment with anchors foe every trace.
    * @args argument that may contail stack trace.
    * @return A more formal content with html fragment if stack travce applied ib advance.
    */
    markupTrace(args) {
        let result = args;
        if (args instanceof Array) {
            result = [];
            args.map((item) => {
                if (typeof item === 'string') {
                    const breakOn = (item.indexOf('\n') > 0) ? '\n' : ((item.indexOf('\r') > 0) ? '\r' : undefined);
                    if (breakOn && (item.indexOf('@') > -1 || item.indexOf('(') > -1) && item.indexOf(':') > 0) {
                        const list = [];
                        item.split(breakOn).map((line) => {
                            const x = line.indexOf('@');
                            const z = line.indexOf('(');
                            if (z > 0) {
                                const sublist = line.substring(z + 1, line.length - 1).split(':');
                                const len = sublist.length;
                                const name = line.substring(0, z) + ':' + sublist[len - 2] + ':' + sublist[len - 1];
                                const ref = sublist.slice(0, len - 2).join(':');
                                list.push('<a href="' + ref + '">' + name + '</a>');
                            }
                            else if (x >= 0) {
                                const y = line.indexOf(':');
                                if (y < 0) {
                                    list.push('<a href="' + line.substring(x + 1) + '">' +
                                        line.substring(0, x) +
                                        '</a>');
                                }
                                else {
                                    const sublist = line.substring(x + 1, line.length).split(':');
                                    const len = sublist.length;
                                    const name = line.substring(0, x) + ':' + sublist[len - 2] + ':' + sublist[len - 1];
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
};
SmartConsoleService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function SmartConsoleService_Factory() { return new SmartConsoleService(); }, token: SmartConsoleService, providedIn: "root" });
SmartConsoleService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], SmartConsoleService);
export { SmartConsoleService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnQtY29uc29sZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL3NtYXJ0LWNvbnNvbGUvIiwic291cmNlcyI6WyJzcmMvYXBwL3NtYXJ0LWNvbnNvbGUvc21hcnQtY29uc29sZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtFQUNFO0FBQ0YsT0FBTyxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBNkJ2RCxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQUhoQztRQUtTLGVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ3pCLGdCQUFXLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUMzQixnQkFBVyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDM0IsaUJBQVksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzdCLGlCQUFZLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUM3QixpQkFBWSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDN0Isa0JBQWEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQy9CLHFCQUFnQixHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDckMsaUJBQVksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzdCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLGNBQVMsR0FBRyxFQUFFLENBQUM7S0FnZnZCO0lBOWVRLGFBQWEsQ0FBQyxJQUFJO1FBQ3pCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsR0FBRyxDQUNQLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDUCxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtnQkFDNUIsSUFBSTtvQkFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDakM7Z0JBQUMsT0FBTSxDQUFDLEVBQUU7b0JBQ1YsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO3dCQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDekI7eUJBQU07d0JBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDakI7aUJBQ0Q7YUFDRDtpQkFBTTtnQkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2pCO1FBQ0YsQ0FBQyxDQUNELENBQUM7UUFDRixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNPLFdBQVcsQ0FBQyxHQUFHLElBQUk7UUFDMUIsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDMUIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQ3hCLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUN6QixNQUFNLEdBQUcsSUFBSSxDQUFDO2lCQUNkO1lBQ0YsQ0FBQyxDQUNELENBQUM7U0FDRjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2YsQ0FBQztJQUNPLFNBQVMsQ0FBQyxHQUFHLElBQUk7UUFDeEIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO1FBQ3RFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDeEIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQ3RCLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUN6QixNQUFNLEdBQUcsSUFBSSxDQUFDO2lCQUNkO1lBQ0YsQ0FBQyxDQUNELENBQUM7U0FDRjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2YsQ0FBQztJQUNPLFNBQVM7UUFDaEIsZ0RBQWdEO1FBQ2hELDhDQUE4QztRQUM5Qyw4Q0FBOEM7UUFDOUMsSUFBSSxLQUFLLEdBQVEsRUFBRSxDQUFDO1FBQ3BCLElBQUk7WUFDRixNQUFNLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzdCO1FBQUMsT0FBTSxDQUFDLEVBQUU7WUFDVixLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNoQixLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUUsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNqQjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUNPLFFBQVEsQ0FBQyxHQUFHLElBQUk7UUFDdkIsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRW5CLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDN0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDM0IsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDUixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQzdCLE1BQU0sR0FBRyxJQUFJLENBQUM7aUJBQ2Q7WUFDRixDQUFDLENBQ0QsQ0FBQztTQUNGO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDZixDQUFDO0lBQ08sU0FBUyxDQUFDLEdBQUcsSUFBSTtRQUN4QixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksWUFBWSxLQUFLLENBQUMsRUFBRTtZQUN2RCxJQUFJLENBQUMsR0FBRyxDQUNQLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ1AsSUFBSSxHQUFHLFlBQVksS0FBSyxFQUFFO29CQUN6QixHQUFHLENBQUMsR0FBRyxDQUNOLENBQUMsSUFBSSxFQUFFLEVBQUU7d0JBQ1IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ25FLElBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTs0QkFDYixJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFO2dDQUMvRCxNQUFNLEdBQUcsSUFBSSxDQUFDOzZCQUNkO3lCQUNEO29CQUNGLENBQUMsQ0FDRCxDQUFBO2lCQUNEO3FCQUFNO29CQUNOLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ2hDLElBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTt3QkFDYixJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFOzRCQUM5RCxNQUFNLEdBQUcsSUFBSSxDQUFDO3lCQUNkO3FCQUNEO2lCQUNEO1lBQ0YsQ0FBQyxDQUNELENBQUM7U0FDRjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2YsQ0FBQztJQUNPLFlBQVksQ0FBQyxJQUFJO1FBQ3hCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixJQUFJO2dCQUNILE1BQU0sTUFBTSxHQUFXLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hELElBQUksQ0FBQyxHQUFHLENBQ1AsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDUCxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7d0JBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUMvQjtvQkFBQSxDQUFDO2dCQUNILENBQUMsQ0FDRCxDQUFDO2FBQ0Y7WUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO1NBQ2Q7SUFDRixDQUFDO0lBRU8sUUFBUSxDQUFDLEdBQUcsSUFBSTtRQUN2QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDL0IsTUFBTSxFQUFFLEdBQUcseUJBQXlCLENBQUM7UUFDckMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQzdELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNyQyxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pFLE1BQU0sS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDekIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRztZQUNyQyxLQUFLLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRztZQUNwQixLQUFLLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRztZQUN6QixLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsR0FBRztZQUN0QixLQUFLLENBQUMsVUFBVSxFQUFFLEdBQUcsR0FBRztZQUN4QixLQUFLLENBQUMsVUFBVSxFQUFFLEdBQUcsR0FBRztZQUN4QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDN0IsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBQ08sS0FBSyxDQUFDLEdBQUcsSUFBSTtRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEtBQUssU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7WUFDMUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQy9DLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDL0MsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBRS9CLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7Z0JBQ3pCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7b0JBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDeEMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTt3QkFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO3FCQUM1QjtpQkFDRDtxQkFBTTtvQkFDTixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7aUJBQzVCO2FBQ0Q7aUJBQU07Z0JBQ04sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtvQkFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUN6QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFO3dCQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7cUJBQzVCO2lCQUNEO3FCQUFNO29CQUNOLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztpQkFDN0I7YUFDRDtTQUNEO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ08sSUFBSSxDQUFDLEdBQUcsSUFBSTtRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEtBQUssU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7WUFDeEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQy9DLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDL0MsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQy9CLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7Z0JBQzNCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7b0JBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDekMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTt3QkFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO3FCQUM1QjtpQkFDRDtxQkFBTTtvQkFDTixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7aUJBQzdCO2FBQ0Q7aUJBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtnQkFDaEMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtvQkFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUN6QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFO3dCQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7cUJBQzdCO2lCQUNEO3FCQUFNO29CQUNOLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztpQkFDN0I7YUFDRDtpQkFBTTtnQkFDTixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFO29CQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3hDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7d0JBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztxQkFDNUI7aUJBQ0Q7cUJBQU07b0JBQ04sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO2lCQUM1QjthQUNEO1NBQ0Q7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDTyxLQUFLLENBQUMsR0FBRyxJQUFJO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksS0FBSyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztZQUMxRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDL0MsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMvQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDL0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtnQkFDM0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtvQkFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUN4QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFO3dCQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7cUJBQzVCO2lCQUNEO3FCQUFNO29CQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztpQkFDNUI7YUFDRDtpQkFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO2dCQUNoQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFO29CQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQzFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7d0JBQzlCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztxQkFDOUI7aUJBQ0Q7cUJBQU07b0JBQ04sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO2lCQUM5QjthQUNEO2lCQUFNO2dCQUNOLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7b0JBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDekMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTt3QkFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO3FCQUM3QjtpQkFDRDtxQkFBTTtvQkFDTixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7aUJBQzdCO2FBQ0Q7U0FDRDtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNPLE1BQU0sQ0FBQyxHQUFHLElBQUk7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxLQUFLLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQzVFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUMvQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQy9DLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUMvQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO2dCQUMzQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFO29CQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3hDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7d0JBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztxQkFDNUI7aUJBQ0Q7cUJBQU07b0JBQ04sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO2lCQUM1QjthQUNEO2lCQUFNO2dCQUNOLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7b0JBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDMUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTt3QkFDOUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO3FCQUM5QjtpQkFDRDtxQkFBTTtvQkFDTixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7aUJBQzlCO2FBQ0Q7U0FDRDtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNPLE1BQU0sQ0FBQyxHQUFHLElBQUk7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxLQUFLLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQzVFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUMvQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQy9DLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7Z0JBQzVCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFO29CQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7aUJBQzNCO2FBQ0Q7aUJBQU07Z0JBQ04sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO2FBQzNCO1NBQ0Q7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDTyxNQUFNLENBQUMsR0FBRyxJQUFJO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsS0FBSyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztZQUM1RSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRztZQUNoRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDL0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFO29CQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7aUJBQzlCO2FBQ0Q7aUJBQU07Z0JBQ04sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO2FBQzlCO1NBQ0Q7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDTyxVQUFVLENBQUMsR0FBRyxJQUFJO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixLQUFLLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUM7WUFDcEYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUc7WUFDaEQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxhQUFhLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFO29CQUM5QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztpQkFDL0I7YUFDRDtpQkFBTTtnQkFDTixJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQzthQUMvQjtTQUNEO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ08sTUFBTSxDQUFDLEdBQUcsSUFBSTtRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEtBQUssU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFDNUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUc7WUFDaEQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFO29CQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7aUJBQzNCO2FBQ0Q7aUJBQU07Z0JBQ04sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO2FBQzNCO1NBQ0Q7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDTyxPQUFPLENBQUMsR0FBRyxJQUFJO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsS0FBSyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztZQUM5RSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRztZQUNoRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFO2dCQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7b0JBQzlCLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztpQkFDNUI7YUFDRDtpQkFBTTtnQkFDTixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7YUFDNUI7U0FDRDtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNEOzs7TUFHRTtJQUNGLGFBQWEsQ0FBRSxZQUEwQjtRQUN4QyxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztRQUM1QixJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDaEIsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQztRQUNELElBQUksT0FBTyxDQUFDLElBQUksRUFBRTtZQUNqQixPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDckM7UUFDRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDbEIsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QzthQUFNO1lBQ04sT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsR0FBRSxDQUFDLENBQUE7U0FDL0I7UUFDRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDbEIsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QzthQUFNO1lBQ04sT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsR0FBRSxDQUFDLENBQUE7U0FDL0I7UUFDRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDbEIsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QzthQUFNO1lBQ04sT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsR0FBRSxDQUFDLENBQUE7U0FDL0I7UUFDRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDbEIsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QzthQUFNO1lBQ04sT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsR0FBRSxDQUFDLENBQUE7U0FDL0I7UUFDRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDbkIsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6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QUFDLENBQUM7aUJBQ2xCO1lBQ0YsQ0FBQyxDQUNELENBQUM7U0FDRjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2YsQ0FBQztDQUNELENBQUE7O0FBNWZZLG1CQUFtQjtJQUgvQixVQUFVLENBQUM7UUFDWCxVQUFVLEVBQUUsTUFBTTtLQUNsQixDQUFDO0dBQ1csbUJBQW1CLENBNGYvQjtTQTVmWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuKi9cbmltcG9ydCB7SW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBTbWFydE9wdGlvbnMge1xuXHRlbWl0T3V0cHV0PzogYm9vbGVhbiwvLyBsb2cgcmVzdWx0IGluIHRvIG91dHB1dCBpbnN0ZWQgb2YgY29uc29sZS5cblx0bG9nQWZ0ZXJFbWl0PzogYm9vbGVhbiwgLy8gY29udGludWUgbG9nZ2luZyBpbnRvIGJyb3dzZXIgY29uc29sZSBhZnRlciBlbWl0dGluZyB0aGUgbG9nXG5cdGxvZ0Rpc2FibGVkPzogYm9vbGVhbiwgICAvLyBkaXNhYmxlcyBhbGwgbG9nIGxldmVsIGNvbnNvbGUgbG9nc1xuXHRpbmZvRGlzYWJsZWQ/OiBib29sZWFuLCAgLy8gZGlzYWJsZXMgYWxsIGluZm8gbGV2ZWwgY29uc29sZSBsb2dzXG5cdHdhcm5EaXNhYmxlZD86IGJvb2xlYW4sICAvLyBkaXNhYmxlcyBhbGwgd2FybiBsZXZlbCBjb25zb2xlIGxvZ3Ncblx0ZXJyb3JEaXNhYmxlZD86IGJvb2xlYW4sIC8vIGRpc2FibGVzIGFsbCBlcnJvciBsZXZlbCBjb25zb2xlIGxvZ3Ncblx0dGFibGVEaXNhYmxlZD86IGJvb2xlYW4sIC8vIGRpc2FibGVzIGFsbCB0YWJsZSBjb25zb2xlIGxvZ3Ncblx0dHJhY2VEaXNhYmxlZD86IGJvb2xlYW4sIC8vIGRpc2FibGVzIGFsbCB0cmFjZSBsZXZlbCBjb25zb2xlIGxvZ3Ncblx0ZXhjZXB0aW9uRGlzYWJsZWQ/OiBib29sZWFuLCAvLyBkaXNhYmxlcyBhbGwgZXhjZXB0aW9uIGxldmVsIGNvbnNvbGUgbG9nc1xuXHRkZWJ1Z0Rpc2FibGVkPzogYm9vbGVhbiwgLy8gZGlzYWJsZXMgYWxsIGRlYnVnIGxldmVsIGNvbnNvbGUgbG9nc1xuXHRhc3NlcnREaXNhYmxlZD86Ym9vbGVhbiwgLy8gZGlzYWJsZXMgYXNzZXJ0IGxvZ3Mgb24gY29uc29sZVxuXHRkb3duR3JhZGU/OiBib29sZWFuLCAgICAgLy8gZG93bmdyYWRlIGEgbG9nIGZyb20gd2FybmluZyB0byBpbmZvIG9yIGxvZyB0byB3YXJuaW5nLCBvciBlcnJvciB0byBsb2cuXG5cdHVwZ3JhZGU/OiBib29sZWFuLCAgICAgICAvLyB1cGdyYWRlcyBhIGxvZyBmcm9tIGluZm8gdG8gd2FybmluZyBvciB3YXJuaW5nIHRvIGxvZywgb3IgbG9nIHRvIGVycm9yXG5cdHVwc2NhbGU/OiBib29sZWFuLCAgICAgICAvLyBzaG93cyBhZGRpdGlvbmFsIGluZm8gb24gZWFjaCBsb2dcblx0dGhyb3R0bGVPbj86IG51bWJlciwgICAgIC8vIGJsb2NrIGxvZ3MgbGVzcyB0aGFuIHByb3ZpZGVkIG1lc3NhZ2UgbGV2ZWwgKGUuZy4sIGxldmVsXzMgb3IgbGV2ZWxfNSkgaW4gYSBsb2dcblx0YmxvY2tDYWxsZXI/OiBhbnlbXSwgICAgIC8vIGJsb2NrcyB0aGUgY2FsbGVyXG5cdHN1cHByZXNzPzogYW55W10sICAgICAgICAvLyBibG9ja3MgcGVyIGEga2V5d29yZFxuXHRmaWx0ZXI/OiBhbnlbXSAgICAgICAgICAgLy8gd2lsbCBlbGltaW5hdGUgYW55IGxvZyB0aGF0IGlzIG5vdCBpbiB0aGUgZmlsdGVyIGxpc3QuIHZvaWQgaWYgbGlzdCBpcyBlbXB0eSBvciBcblx0XHRcdFx0XHRcdFx0IC8vIHVuZGVmaW5lZC4gb3Bwb3NpdCBvZiBzdXBwcmVzcy4gaWYgc3VwcGxpZWQsIHN1cHByZXNzIHdpbGwgb25seSBiZSBlZmZlY3RpdmUgd2hlbiBcblx0XHRcdFx0XHRcdFx0IC8vIG9uZSBvZiB0aGUga2V5d29yZHMgaGFzIHBhc3NlZCBmaWx0ZXJpbmcgYW5kIGFub3RoZXIga2V5d29yZCBpbiB0aGUgc2FtZSBsb2cgaXMgXG5cdFx0XHRcdFx0XHRcdCAvLyBpbiBzdXBwcmVzcyBsaXN0LiBGaWx0ZXIgYXBwbGllcyB0byBhbGwgbG9ncy5cbn1cblxuQEluamVjdGFibGUoe1xuXHRwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU21hcnRDb25zb2xlU2VydmljZSB7XG5cdHByaXZhdGUgb3B0aW9uczogU21hcnRPcHRpb25zO1xuXHRwcml2YXRlIGRlZmF1bHRMb2cgPSBjb25zb2xlLmxvZztcblx0cHJpdmF0ZSBkZWZhdWx0SW5mbyA9IGNvbnNvbGUuaW5mbztcblx0cHJpdmF0ZSBkZWZhdWx0V2FybiA9IGNvbnNvbGUud2Fybjtcblx0cHJpdmF0ZSBkZWZhdWx0RXJyb3IgPSBjb25zb2xlLmVycm9yO1xuXHRwcml2YXRlIGRlZmF1bHRUYWJsZSA9IGNvbnNvbGUudGFibGU7XG5cdHByaXZhdGUgZGVmYXVsdFRyYWNlID0gY29uc29sZS50cmFjZTtcblx0cHJpdmF0ZSBkZWZhdWx0QXNzZXJ0ID0gY29uc29sZS5hc3NlcnQ7XG5cdHByaXZhdGUgZGVmYXVsdEV4Y2VwdGlvbiA9IGNvbnNvbGUuZXhjZXB0aW9uO1xuXHRwcml2YXRlIGRlZmF1bHREZWJ1ZyA9IGNvbnNvbGUuZGVidWc7XG5cdHByaXZhdGUgb3V0cHV0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXHRwcml2YXRlIHdhdGNoTGlzdCA9IHt9O1xuXG5cdHByaXZhdGUgX2FyZ3NUb1N0cmluZyhhcmdzKTogc3RyaW5nIHtcblx0XHRsZXQgcmVzdWx0ID0gW107XG5cdFx0YXJncy5tYXAoXG5cdFx0XHQoYXJnKSA9PiB7XG5cdFx0XHRcdGlmICh0eXBlb2YgYXJnID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQucHVzaChKU09OLnN0cmluZ2lmeShhcmcpKTtcblx0XHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRcdGlmIChhcmcubWVzc2FnZSkge1xuXHRcdFx0XHRcdFx0XHRyZXN1bHQucHVzaChhcmcubWVzc2FnZSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRyZXN1bHQucHVzaChhcmcpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChhcmcpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0KTtcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oJywnKTtcblx0fVxuXHRwcml2YXRlIF9zdXBwcmVzc2VkKC4uLmFyZ3MpIHtcblx0XHRsZXQgcmVzdWx0ID0gZmFsc2U7XG5cdFx0aWYgKHRoaXMub3B0aW9ucy5zdXBwcmVzcykge1xuXHRcdFx0Y29uc3QgeCA9IHRoaXMuX2FyZ3NUb1N0cmluZyhhcmdzKTtcblx0XHRcdHRoaXMub3B0aW9ucy5zdXBwcmVzcy5tYXAoXG5cdFx0XHRcdChpdGVtKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHguaW5kZXhPZihpdGVtKSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXHRwcml2YXRlIF9maWx0ZXJlZCguLi5hcmdzKSB7XG5cdFx0bGV0IHJlc3VsdCA9ICF0aGlzLm9wdGlvbnMuZmlsdGVyIHx8IHRoaXMub3B0aW9ucy5maWx0ZXIubGVuZ3RoID09PSAwO1xuXHRcdGlmICh0aGlzLm9wdGlvbnMuZmlsdGVyKSB7XG5cdFx0XHRjb25zdCB4ID0gdGhpcy5fYXJnc1RvU3RyaW5nKGFyZ3MpO1xuXHRcdFx0dGhpcy5vcHRpb25zLmZpbHRlci5tYXAoXG5cdFx0XHRcdChpdGVtKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHguaW5kZXhPZihpdGVtKSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXHRwcml2YXRlIF9nZXRTdGFjaygpIHtcblx0XHQvLyB0aGlzIG1ldGhvZCBwdXJwb3NlIGlzIG9ubHkgdG8gZml4IElFIGlzc3VlLiBcblx0XHQvLyBpbiBJRSwgbmV3IEVycm9yKCkuc3RhY2sgIHdpbGwgYmUgdW5kZWZpbmVkXG5cdFx0Ly8gdW5sZXNzIGl0IGlzIGNhdWd0aCBpbiB0cnkgYmxvY2sgc3RhdGVtZW50LlxuXHRcdGxldCBzdGFjazogYW55ID0gJyc7XG5cdFx0dHJ5IHtcblx0XHQgIHRocm93IG5ldyBFcnJvcignZ2V0U3RhY2snKTtcblx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdHN0YWNrID0gZS5zdGFjaztcblx0XHRcdHN0YWNrID0gc3RhY2suaW5kZXhPZignXFxyJykgPiAwID8gc3RhY2suaW5kZXhPZignXFxyJykgOiBzdGFjay5zcGxpdCgnXFxuJyk7XG5cdFx0XHRzdGFjayA9IHN0YWNrWzRdO1xuXHRcdH1cblx0XHRyZXR1cm4gc3RhY2s7XG5cdH1cblx0cHJpdmF0ZSBfYmxvY2tlZCguLi5hcmdzKSB7XG5cdFx0bGV0IHJlc3VsdCA9IGZhbHNlO1xuXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5ibG9ja0NhbGxlcikge1xuXHRcdFx0Y29uc3Qgc3RhY2sgPSB0aGlzLl9nZXRTdGFjaygpO1xuXHRcdFx0dGhpcy5vcHRpb25zLmJsb2NrQ2FsbGVyLm1hcChcblx0XHRcdFx0KGl0ZW0pID0+IHtcblx0XHRcdFx0XHRpZiAoc3RhY2suaW5kZXhPZihpdGVtKSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXHRwcml2YXRlIF90aHJvdHRsZSguLi5hcmdzKSB7XG5cdFx0bGV0IHJlc3VsdCA9IGZhbHNlO1xuXHRcdGlmICh0aGlzLm9wdGlvbnMudGhyb3R0bGVPbiAmJiAoYXJncyBpbnN0YW5jZW9mIEFycmF5KSkge1xuXHRcdFx0YXJncy5tYXAoXG5cdFx0XHRcdChhcmcpID0+IHtcblx0XHRcdFx0XHRpZiAoYXJnIGluc3RhbmNlb2YgQXJyYXkpIHtcblx0XHRcdFx0XHRcdGFyZy5tYXAoXG5cdFx0XHRcdFx0XHRcdChpdGVtKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgbCA9ICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpID8gaXRlbS5pbmRleE9mKCdsZXZlbF8nKSA6IC0xO1xuXHRcdFx0XHRcdFx0XHRcdGlmICggbCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHBhcnNlSW50KGl0ZW0uc3Vic3RyaW5nKDYpLCAxMCkgPD0gdGhpcy5vcHRpb25zLnRocm90dGxlT24pIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0ID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29uc3QgbCA9IGFyZy5pbmRleE9mKCdsZXZlbF8nKTtcblx0XHRcdFx0XHRcdGlmICggbCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRpZiAocGFyc2VJbnQoYXJnLnN1YnN0cmluZyg2KSwgMTApIDw9IHRoaXMub3B0aW9ucy50aHJvdHRsZU9uKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0ID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXHRwcml2YXRlIF9yZXBvcnRXYXRjaChhcmdzKSB7XG5cdFx0Y29uc3QgbGlzdCA9IE9iamVjdC5rZXlzKHRoaXMud2F0Y2hMaXN0KTtcblx0XHRpZiAobGlzdC5sZW5ndGgpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IGxvZ1N0cjogc3RyaW5nID0gdGhpcy5fYXJnc1RvU3RyaW5nKGFyZ3MpO1xuXHRcdFx0XHRsaXN0Lm1hcChcblx0XHRcdFx0XHQoa2V5KSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAobG9nU3RyLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMud2F0Y2hMaXN0W2tleV0uZW1pdChhcmdzKTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdFx0fSBjYXRjaCAoZSkge31cblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF91cHNjYWxlKC4uLmFyZ3MpIHtcblx0XHRjb25zdCBzdGFjayA9IHRoaXMuX2dldFN0YWNrKCk7XG5cdFx0Y29uc3QgcmUgPSAvKFteKF0rKUB8YXQgKFteKF0rKSBcXCgvZztcblx0XHRjb25zdCBtID0gcmUuZXhlYyhzdGFjayk7XG5cdFx0Y29uc3QgaSA9IHN0YWNrLmxhc3RJbmRleE9mKCcvJyk7XG5cdFx0Y29uc3QgbiA9IGkgPiAwID8gc3RhY2suc3Vic3RyaW5nKGkrMSkuc3BsaXQoJzonKVswXSA6IHN0YWNrO1xuXHRcdGNvbnN0IHQgPSBtID8gKG1bMV0gfHwgbVsyXSkgOiBzdGFjaztcblx0XHRjb25zdCBjYWxsZXIgPSAodC5pbmRleE9mKCcvJykgPiAwID8gdC5zdWJzdHJpbmcoMCx0LmluZGV4T2YoJy8nKSkgOiAnJyk7XG5cdFx0Y29uc3QgX2RhdGUgPSBuZXcgRGF0ZSgpO1xuXHRcdGNvbnN0IF90aW1lID0gKF9kYXRlLmdldE1vbnRoKCkgKyAxKSArIFwiL1wiICtcblx0XHRcdFx0XHQgIF9kYXRlLmdldERheSgpICsgXCIvXCIgK1xuXHRcdFx0XHRcdCAgX2RhdGUuZ2V0RnVsbFllYXIoKSArIFwiIFwiICtcblx0XHRcdFx0XHQgIF9kYXRlLmdldEhvdXJzKCkgKyBcIjpcIiArXG5cdFx0XHRcdFx0ICBfZGF0ZS5nZXRNaW51dGVzKCkgKyBcIjpcIiArXG5cdFx0XHRcdFx0ICBfZGF0ZS5nZXRTZWNvbmRzKCkgKyBcIjpcIiArXG5cdFx0XHRcdFx0ICBfZGF0ZS5nZXRNaWxsaXNlY29uZHMoKTtcblx0XHRyZXR1cm4gW190aW1lICsgXCIgW1wiICsgbiArIChjYWxsZXIgPyBcIiB8IFwiICsgY2FsbGVyIDogJycpICsgXCJdIFwiXS5jb25jYXQoLi4uYXJncyk7XG5cdH1cblx0cHJpdmF0ZSBfaW5mbyguLi5hcmdzKSB7XG5cdFx0aWYgKCh0aGlzLm9wdGlvbnMuaW5mb0Rpc2FibGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMub3B0aW9ucy5pbmZvRGlzYWJsZWQpICYmXG5cdFx0XHR0aGlzLl9maWx0ZXJlZChhcmdzKSAmJiAhdGhpcy5fc3VwcHJlc3NlZChhcmdzKSAmJiBcblx0XHRcdCF0aGlzLl90aHJvdHRsZShhcmdzKSAmJiAhdGhpcy5fYmxvY2tlZChhcmdzKSkge1xuXHRcdFx0Y29uc3QgbmV3QXJncyA9IHRoaXMub3B0aW9ucy51cHNjYWxlID9cblx0XHRcdFx0XHRcdFx0dGhpcy5fdXBzY2FsZShhcmdzKSA6IGFyZ3M7XG5cdFx0XHRcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMudXBncmFkZSkge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcIltsb2ddXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiW2luZm9dXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRJbmZvKC4uLm5ld0FyZ3MpO1x0XHRcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9yZXBvcnRXYXRjaChhcmdzKTtcblx0fVxuXHRwcml2YXRlIF9sb2coLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLmxvZ0Rpc2FibGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMub3B0aW9ucy5sb2dEaXNhYmxlZCkgJiZcblx0XHRcdHRoaXMuX2ZpbHRlcmVkKGFyZ3MpICYmICF0aGlzLl9zdXBwcmVzc2VkKGFyZ3MpICYmIFxuXHRcdFx0IXRoaXMuX3Rocm90dGxlKGFyZ3MpICYmICF0aGlzLl9ibG9ja2VkKGFyZ3MpKSB7XG5cdFx0XHRjb25zdCBuZXdBcmdzID0gdGhpcy5vcHRpb25zLnVwc2NhbGUgP1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cHNjYWxlKGFyZ3MpIDogYXJncztcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZG93bkdyYWRlKSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiW2luZm9dXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRJbmZvKC4uLm5ld0FyZ3MpO1x0XHRcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLm9wdGlvbnMudXBncmFkZSkge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcIlt3YXJuXVwiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVmYXVsdFdhcm4oLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdFdhcm4oLi4ubmV3QXJncyk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcIltsb2ddXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3JlcG9ydFdhdGNoKGFyZ3MpO1xuXHR9XG5cdHByaXZhdGUgX3dhcm4oLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLndhcm5EaXNhYmxlZCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLm9wdGlvbnMud2FybkRpc2FibGVkKSAmJlxuXHRcdFx0dGhpcy5fZmlsdGVyZWQoYXJncykgJiYgIXRoaXMuX3N1cHByZXNzZWQoYXJncykgJiYgXG5cdFx0XHQhdGhpcy5fdGhyb3R0bGUoYXJncykgJiYgIXRoaXMuX2Jsb2NrZWQoYXJncykpIHtcblx0XHRcdGNvbnN0IG5ld0FyZ3MgPSB0aGlzLm9wdGlvbnMudXBzY2FsZSA/XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3Vwc2NhbGUoYXJncykgOiBhcmdzO1xuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5kb3duR3JhZGUpIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5lbWl0T3V0cHV0KSB7XG5cdFx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJbbG9nXVwiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVmYXVsdExvZyguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1x0XHRcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLm9wdGlvbnMudXBncmFkZSkge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcIltlcnJvcl1cIiwgLi4ubmV3QXJnc10pO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlZmF1bHRFcnJvciguLi5uZXdBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0RXJyb3IoLi4ubmV3QXJncyk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcIlt3YXJuXVwiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVmYXVsdFdhcm4oLi4ubmV3QXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdFdhcm4oLi4ubmV3QXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5fcmVwb3J0V2F0Y2goYXJncyk7XG5cdH1cblx0cHJpdmF0ZSBfZXJyb3IoLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLmVycm9yRGlzYWJsZWQgPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5vcHRpb25zLmVycm9yRGlzYWJsZWQpICYmXG5cdFx0XHR0aGlzLl9maWx0ZXJlZChhcmdzKSAmJiAhdGhpcy5fc3VwcHJlc3NlZChhcmdzKSAmJiBcblx0XHRcdCF0aGlzLl90aHJvdHRsZShhcmdzKSAmJiAhdGhpcy5fYmxvY2tlZChhcmdzKSkge1xuXHRcdFx0Y29uc3QgbmV3QXJncyA9IHRoaXMub3B0aW9ucy51cHNjYWxlID9cblx0XHRcdFx0XHRcdFx0dGhpcy5fdXBzY2FsZShhcmdzKSA6IGFyZ3M7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmRvd25HcmFkZSkge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dC5lbWl0KFtcIltsb2ddXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmxvZ0FmdGVyRW1pdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0TG9nKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRMb2coLi4ubmV3QXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZW1pdE91dHB1dCkge1xuXHRcdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiW2Vycm9yXVwiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVmYXVsdEVycm9yKC4uLm5ld0FyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRFcnJvciguLi5uZXdBcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9yZXBvcnRXYXRjaChhcmdzKTtcblx0fVxuXHRwcml2YXRlIF90YWJsZSguLi5hcmdzKSB7XG5cdFx0aWYgKCh0aGlzLm9wdGlvbnMudGFibGVEaXNhYmxlZCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLm9wdGlvbnMuZXJyb3JEaXNhYmxlZCkgJiZcblx0XHRcdHRoaXMuX2ZpbHRlcmVkKGFyZ3MpICYmICF0aGlzLl9zdXBwcmVzc2VkKGFyZ3MpICYmIFxuXHRcdFx0IXRoaXMuX3Rocm90dGxlKGFyZ3MpICYmICF0aGlzLl9ibG9ja2VkKGFyZ3MpKSB7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0Y29uc3QgbmV3QXJncyA9IHRoaXMub3B0aW9ucy51cHNjYWxlID9cblx0XHRcdFx0dGhpcy5fdXBzY2FsZShhcmdzKSA6IGFyZ3M7XG5cdFx0XHRcdHRoaXMub3V0cHV0LmVtaXQoW1wiW3RhYmxlXVwiLCAuLi5uZXdBcmdzXSk7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0VGFibGUoLi4uYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuZGVmYXVsdFRhYmxlKC4uLmFyZ3MpO1x0XHRcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5fcmVwb3J0V2F0Y2goYXJncyk7XG5cdH1cblx0cHJpdmF0ZSBfdHJhY2UoLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLnRyYWNlRGlzYWJsZWQgPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5vcHRpb25zLnRyYWNlRGlzYWJsZWQpICYmIFxuXHRcdFx0dGhpcy5fZmlsdGVyZWQoYXJncykgJiYgIXRoaXMuX3Rocm90dGxlKGFyZ3MpICkge1xuXHRcdFx0Y29uc3QgbmV3QXJncyA9IHRoaXMub3B0aW9ucy51cHNjYWxlID9cblx0XHRcdFx0XHRcdFx0dGhpcy5fdXBzY2FsZShhcmdzKSA6IGFyZ3M7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJbdHJhY2VdXCIsIC4uLm5ld0FyZ3NdKTtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRUcmFjZSguLi5uZXdBcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5kZWZhdWx0VHJhY2UoLi4ubmV3QXJncyk7XHRcdFxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9yZXBvcnRXYXRjaChhcmdzKTtcblx0fVxuXHRwcml2YXRlIF9leGNlcHRpb24oLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLmV4Y2VwdGlvbkRpc2FibGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMub3B0aW9ucy5leGNlcHRpb25EaXNhYmxlZCkgJiYgXG5cdFx0XHR0aGlzLl9maWx0ZXJlZChhcmdzKSAmJiAhdGhpcy5fdGhyb3R0bGUoYXJncykgKSB7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJbZXhjZXB0aW9uXVwiLCAuLi5hcmdzXSk7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0RXhjZXB0aW9uKC4uLmFyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmRlZmF1bHRFeGNlcHRpb24oLi4uYXJncyk7XHRcdFxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9yZXBvcnRXYXRjaChhcmdzKTtcblx0fVxuXHRwcml2YXRlIF9kZWJ1ZyguLi5hcmdzKSB7XG5cdFx0aWYgKCh0aGlzLm9wdGlvbnMuZGVidWdEaXNhYmxlZCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLm9wdGlvbnMuZGVidWdEaXNhYmxlZCkgJiYgXG5cdFx0XHR0aGlzLl9maWx0ZXJlZChhcmdzKSAmJiAhdGhpcy5fdGhyb3R0bGUoYXJncykgKSB7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJbZGVidWddXCIsIC4uLmFyZ3NdKTtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5sb2dBZnRlckVtaXQpIHtcblx0XHRcdFx0XHR0aGlzLmRlZmF1bHREZWJ1ZyguLi5hcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5kZWZhdWx0RGVidWcoLi4uYXJncyk7XHRcdFxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9yZXBvcnRXYXRjaChhcmdzKTtcblx0fVxuXHRwcml2YXRlIF9hc3NlcnQoLi4uYXJncykge1xuXHRcdGlmICgodGhpcy5vcHRpb25zLmFzc2VydERpc2FibGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMub3B0aW9ucy5hc3NlcnREaXNhYmxlZCkgJiYgXG5cdFx0XHR0aGlzLl9maWx0ZXJlZChhcmdzKSAmJiAhdGhpcy5fdGhyb3R0bGUoYXJncykgKSB7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmVtaXRPdXRwdXQpIHtcblx0XHRcdFx0dGhpcy5vdXRwdXQuZW1pdChbXCJbYXNzZXJ0XVwiLCAuLi5hcmdzXSk7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubG9nQWZ0ZXJFbWl0KSB7XG5cdFx0XHRcdFx0dGhpcy5kZWZhdWx0QXNzZXJ0KC4uLmFyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmRlZmF1bHRBc3NlcnQoLi4uYXJncyk7XHRcdFxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9yZXBvcnRXYXRjaChhcmdzKTtcblx0fVxuXHQvKlxuXHQqIFdpbGwgaW5pdGlhbGl6ZSBzbWFydCBsb2dnZXIuXG5cdCogQGluc3RydWN0aW9ucyBpbnN0cnVjdGlvbnMgdG8gZGlyZWN0IHRoaXMgc2VydmljZSB0byBzdXBwcmVzcyBsb2dzLlxuXHQqL1xuXHRtYWtlU21hcnRMb2dzKCBpbnN0cnVjdGlvbnM6IFNtYXJ0T3B0aW9ucyApIHtcblx0XHR0aGlzLm9wdGlvbnMgPSBpbnN0cnVjdGlvbnM7XG5cdFx0aWYgKGNvbnNvbGUubG9nKSB7XG5cdFx0XHRjb25zb2xlLmxvZyA9IHRoaXMuX2xvZy5iaW5kKHRoaXMpO1xuXHRcdH1cblx0XHRpZiAoY29uc29sZS5pbmZvKSB7XG5cdFx0XHRjb25zb2xlLmluZm8gPSB0aGlzLl9pbmZvLmJpbmQodGhpcyk7XG5cdFx0fVxuXHRcdGlmIChjb25zb2xlLndhcm4pIHtcblx0XHRcdGNvbnNvbGUud2FybiA9IHRoaXMuX3dhcm4uYmluZCh0aGlzKTtcblx0XHR9XG5cdFx0aWYgKGNvbnNvbGUuZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IgPSB0aGlzLl9lcnJvci5iaW5kKHRoaXMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLmVycm9yID0gKC4uLmFyZ3MpID0+IHt9XG5cdFx0fVxuXHRcdGlmIChjb25zb2xlLnRhYmxlKSB7XG5cdFx0XHRjb25zb2xlLnRhYmxlID0gdGhpcy5fdGFibGUuYmluZCh0aGlzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS50YWJsZSA9ICguLi5hcmdzKSA9PiB7fVxuXHRcdH1cblx0XHRpZiAoY29uc29sZS50cmFjZSkge1xuXHRcdFx0Y29uc29sZS50cmFjZSA9IHRoaXMuX3RyYWNlLmJpbmQodGhpcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnNvbGUudHJhY2UgPSAoLi4uYXJncykgPT4ge31cblx0XHR9XG5cdFx0aWYgKGNvbnNvbGUuZGVidWcpIHtcblx0XHRcdGNvbnNvbGUuZGVidWcgPSB0aGlzLl9kZWJ1Zy5iaW5kKHRoaXMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLmRlYnVnID0gKC4uLmFyZ3MpID0+IHt9XG5cdFx0fVxuXHRcdGlmIChjb25zb2xlLmFzc2VydCkge1xuXHRcdFx0Y29uc29sZS5hc3NlcnQgPSB0aGlzLl9hc3NlcnQuYmluZCh0aGlzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS5hc3NlcnQgPSAoLi4uYXJncykgPT4ge31cblx0XHR9XG5cdFx0aWYgKGNvbnNvbGUuZXhjZXB0aW9uKSB7XG5cdFx0XHRjb25zb2xlLmV4Y2VwdGlvbiA9IHRoaXMuX2V4Y2VwdGlvbi5iaW5kKHRoaXMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLmV4Y2VwdGlvbiA9ICguLi5hcmdzKSA9PiB7fVxuXHRcdH1cblx0fVxuXHQvKlxuXHQqIEByZXR1cm4gRXZlbnQgRW1pdHRlciB0aGF0IG1heSBwdWJsaXNnIGxvZ3MuXG5cdCovXG5cdHJlZGlyZWN0ZWRPdXRwdXQoKSB7XG5cdFx0cmV0dXJuIHRoaXMub3V0cHV0O1xuXHR9XG5cdC8qXG5cdCogV2lsbCBhZGQgYSBrZXkgdG8gdGhlIHdhcmNoIGxpc3QuXG5cdCogQGFyZ3Mga2V5IHRvIGJlIGFkZGVkLlxuXHQqL1xuXHRhZGRXYXRjaChrZXkpIHtcblx0XHRpZiAoIXRoaXMud2F0Y2hMaXN0W2tleV0pIHtcblx0XHRcdHRoaXMud2F0Y2hMaXN0W2tleV0gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLndhdGNoTGlzdFtrZXldO1xuXHR9XG5cdC8qXG5cdCogV2lsbCByZW1vdmUgYSBrZXkgZnJvbSB0aGUgd2FyY2ggbGlzdC5cblx0KiBAYXJncyBrZXkgdG8gYmUgcmVtb3ZlZC4gaXQgd2lsbCBiZSB3aXNlIHRvIHJlbW92ZSBzdWJzY3JpcHRpb25zIHRvIHRoaXMga2V5IGJlZm9yZSBjYWxsaW5nIHRoaXMgbWV0aG9kLlxuXHQqL1xuXHRyZW1vdmVXYXRjaChrZXkpIHtcblx0XHRkZWxldGUgdGhpcy53YXRjaExpc3Rba2V5XTtcblx0fVxuXHQvKlxuXHQqIFdpbGwgY2xlYXIgd2FyY2ggbGlzdC5cblx0KiBAYXJncyBsaXN0IGlzIGEgbGlzdCBvZiBzdWJzY3JpYmVycyB0byB0aGUgaXRlbXMgaW4gd2F0Y2hsaXN0LiBcblx0KiBJdCBjb3VsZCBiZSBlbXB0eSwgYnV0IHRvIGF2b2lkIGxlYWtzLCBpdCB3aWxsIGJlIHdpc2UgdG8ga2VlcCBhIHJlY29yZCBvZiB5b3VyIHN1YnNjcmlwdGlvbnMuXG5cdCovXG5cdGNsZWFyV2F0Y2hMaXN0KGxpc3Q6IGFueVtdKSB7XG5cdFx0bGlzdC5tYXAoKHNiYykgPT4gc2JjLnVuc3Vic2NyaWJlKCkpO1xuXHRcdHRoaXMud2F0Y2hMaXN0ID0ge307XG5cdH1cblx0Lypcblx0KiBXaWxsIG1hcmt1cCBzdGFjayB0cmFjZSB0byBwcm92aWRlIEhUTUwgZnJhZ21lbnQgd2l0aCBhbmNob3JzIGZvZSBldmVyeSB0cmFjZS5cblx0KiBAYXJncyBhcmd1bWVudCB0aGF0IG1heSBjb250YWlsIHN0YWNrIHRyYWNlLlxuXHQqIEByZXR1cm4gQSBtb3JlIGZvcm1hbCBjb250ZW50IHdpdGggaHRtbCBmcmFnbWVudCBpZiBzdGFjayB0cmF2Y2UgYXBwbGllZCBpYiBhZHZhbmNlLlxuXHQqL1xuXHRtYXJrdXBUcmFjZShhcmdzOiBhbnkpIHtcblx0XHRsZXQgcmVzdWx0ID0gYXJncztcblx0XHRpZiAoYXJncyBpbnN0YW5jZW9mIEFycmF5KSB7XG5cdFx0XHRyZXN1bHQgPSBbXTtcblx0XHRcdGFyZ3MubWFwKFxuXHRcdFx0XHQoaXRlbTogYW55KSA9PiB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdFx0Y29uc3QgYnJlYWtPbiA9IChpdGVtLmluZGV4T2YoJ1xcbicpID4gMCkgPyAnXFxuJyA6ICgoaXRlbS5pbmRleE9mKCdcXHInKSA+IDApID8gJ1xccicgOiB1bmRlZmluZWQpO1xuXHRcdFx0XHRcdFx0aWYgKGJyZWFrT24gJiYgKGl0ZW0uaW5kZXhPZignQCcpID4gLTEgfHwgaXRlbS5pbmRleE9mKCcoJykgPiAtMSkgJiYgaXRlbS5pbmRleE9mKCc6JykgPiAwKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGxpc3QgPSBbXTtcblx0XHRcdFx0XHRcdFx0aXRlbS5zcGxpdChicmVha09uKS5tYXAoXG5cdFx0XHRcdFx0XHRcdFx0KGxpbmU6IHN0cmluZykgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgeCA9IGxpbmUuaW5kZXhPZignQCcpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgeiA9IGxpbmUuaW5kZXhPZignKCcpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHogPiAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHN1Ymxpc3QgPSBsaW5lLnN1YnN0cmluZyh6KzEsIGxpbmUubGVuZ3RoIC0gMSkuc3BsaXQoJzonKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgbGVuID0gc3VibGlzdC5sZW5ndGg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBsaW5lLnN1YnN0cmluZygwLCB6KSArICc6JyArIHN1Ymxpc3RbbGVuIC0gMl0gKyAnOicgKyBzdWJsaXN0W2xlbiAtIDFdO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCByZWYgPSBzdWJsaXN0LnNsaWNlKDAsIGxlbiAtIDIpLmpvaW4oJzonKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRsaXN0LnB1c2goJzxhIGhyZWY9XCInICsgcmVmICsgICdcIj4nICsgbmFtZSArICc8L2E+Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHggPj0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCB5ID0gbGluZS5pbmRleE9mKCc6Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICh5IDwgMCApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsaXN0LnB1c2goJzxhIGhyZWY9XCInICsgbGluZS5zdWJzdHJpbmcoeCsxKSArICAnXCI+JyArXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGluZS5zdWJzdHJpbmcoMCwgeCkgK1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8L2E+Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3Qgc3VibGlzdCA9IGxpbmUuc3Vic3RyaW5nKHgrMSwgbGluZS5sZW5ndGgpLnNwbGl0KCc6Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgbGVuID0gc3VibGlzdC5sZW5ndGg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgbmFtZSA9IGxpbmUuc3Vic3RyaW5nKDAsIHgpICsgJzonICsgc3VibGlzdFtsZW4gLSAyXSArICc6JyArIHN1Ymxpc3RbbGVuIC0gMV07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgcmVmID0gc3VibGlzdC5zbGljZSgwLCBsZW4gLSAyKS5qb2luKCc6Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGlzdC5wdXNoKCc8YSBocmVmPVwiJyArIHJlZiArICAnXCI+JyArIG5hbWUgKyAnPC9hPicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRsaXN0LnB1c2gobGluZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRyZXN1bHQucHVzaChsaXN0LmpvaW4oJzxiciAvPicpKTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoYnJlYWtPbikge1xuXHRcdFx0XHRcdFx0XHRyZXN1bHQucHVzaChpdGVtLnNwbGl0KGJyZWFrT24pLmpvaW4oJzxiciAvPicpKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRyZXN1bHQucHVzaChKU09OLnN0cmluZ2lmeShpdGVtKSk7XG5cdFx0XHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRcdFx0aWYgKGl0ZW0ubWVzc2FnZSkge1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW0ubWVzc2FnZSk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG59XG4iXX0=