import { EventEmitter } from '@angular/core';
export interface SmartOptions {
    emitOutput?: boolean;
    logAfterEmit?: boolean;
    logDisabled?: boolean;
    infoDisabled?: boolean;
    warnDisabled?: boolean;
    errorDisabled?: boolean;
    tableDisabled?: boolean;
    traceDisabled?: boolean;
    assertDisabled?: boolean;
    downGrade?: boolean;
    upgrade?: boolean;
    upscale?: boolean;
    blockCaller?: any[];
    suppress?: any[];
}
export declare class SmartConsoleService {
    private options;
    private defaultLog;
    private defaultInfo;
    private defaultWarn;
    private defaultError;
    private defaultTable;
    private defaultTrace;
    private defaultAssert;
    private output;
    private _suppressed(...args);
    private _blocked(...args);
    private _upscale(...args);
    private _info(...args);
    private _log(...args);
    private _warn(...args);
    private _error(...args);
    private _table(...args);
    private _trace(...args);
    private _assert(...args);
    makeSmartLogs(instructions: SmartOptions): void;
    redirectedOutput(): EventEmitter<{}>;
    markupTrace(args: any): any;
}
