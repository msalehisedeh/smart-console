(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@sedeh/smart-console', ['exports', '@angular/core', '@angular/common'], factory) :
    (factory((global.sedeh = global.sedeh || {}, global.sedeh['smart-console'] = {}),global.ng.core,global.ng.common));
}(this, (function (exports,core,common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SmartConsoleService = (function () {
        function SmartConsoleService() {
            this.defaultLog = console.log;
            this.defaultInfo = console.info;
            this.defaultWarn = console.warn;
            this.defaultError = console.error;
            this.defaultTable = console.table;
            this.defaultTrace = console.trace;
            this.defaultAssert = console.assert;
            this.output = new core.EventEmitter();
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
                                args[index] = item.split(breakOn).join('<br />');
                            }
                        }
                    });
                }
                return args;
            };
        SmartConsoleService.decorators = [
            { type: core.Injectable }
        ];
        return SmartConsoleService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SmartConsoleModule = (function () {
        function SmartConsoleModule() {
        }
        SmartConsoleModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [],
                        exports: [],
                        imports: [common.CommonModule],
                        providers: [SmartConsoleService],
                        schemas: [core.CUSTOM_ELEMENTS_SCHEMA]
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

    exports.SmartConsoleService = SmartConsoleService;
    exports.SmartConsoleModule = SmartConsoleModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=sedeh-smart-console.umd.js.map