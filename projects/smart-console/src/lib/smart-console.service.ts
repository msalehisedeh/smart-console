/*
*/
import {Injectable, EventEmitter} from '@angular/core';

export interface SmartOptions {
	emitOutput?: boolean,// log result in to output insted of console.
	logAfterEmit?: boolean, // continue logging into browser console after emitting the log
	logDisabled?: boolean,   // disables all log level console logs
	infoDisabled?: boolean,  // disables all info level console logs
	warnDisabled?: boolean,  // disables all warn level console logs
	errorDisabled?: boolean, // disables all error level console logs
	tableDisabled?: boolean, // disables all table console logs
	traceDisabled?: boolean, // disables all trace level console logs
	exceptionDisabled?: boolean, // disables all exception level console logs
	debugDisabled?: boolean, // disables all debug level console logs
	assertDisabled?:boolean, // disables assert logs on console
	downGrade?: boolean,     // downgrade a log from warning to info or log to warning, or error to log.
	upgrade?: boolean,       // upgrades a log from info to warning or warning to log, or log to error
	upscale?: boolean,       // shows additional info on each log
	throttleOn?: number,     // block logs less than provided message level (e.g., level_3 or level_5) in a log
	blockCaller?: any[],     // blocks the caller
	suppress?: any[],        // blocks per a keyword
	filter?: any[]           // will eliminate any log that is not in the filter list. void if list is empty or 
							 // undefined. opposit of suppress. if supplied, suppress will only be effective when 
							 // one of the keywords has passed filtering and another keyword in the same log is 
							 // in suppress list. Filter applies to all logs.
}

@Injectable({
	providedIn: 'root'
})
export class SmartConsoleService {
	private options!: SmartOptions;
	private defaultLog = console.log;
	private defaultInfo = console.info;
	private defaultWarn = console.warn;
	private defaultError = console.error;
	private defaultTable = console.table;
	private defaultTrace = console.trace;
	private defaultAssert = console.assert;
	private defaultDebug = console.debug;
	private output = new EventEmitter();
	private watchList: any = {};

	private _argsToString(args: any): string {
		let result: any[] = [];
		args.map(
			(arg: any) => {
				if (typeof arg === 'object') {
					try {
						result.push(JSON.stringify(arg));
					} catch(e) {
						if (arg.message) {
							result.push(arg.message);
						} else {
							result.push(arg);
						}
					}
				} else {
					result.push(arg);
				}
			}
		);
		return result.join(',');
	}
	private _suppressed(...args: any) {
		let result = false;
		if (this.options.suppress) {
			const x = this._argsToString(args);
			this.options.suppress.map(
				(item) => {
					if (x.indexOf(item) > -1) {
						result = true;
					}
				}
			);
		}
		return result;
	}
	private _filtered(...args: any) {
		let result = !this.options.filter || this.options.filter.length === 0;
		if (this.options.filter) {
			const x = this._argsToString(args);
			this.options.filter.map(
				(item) => {
					if (x.indexOf(item) > -1) {
						result = true;
					}
				}
			);
		}
		return result;
	}
	private _getStack() {
		// this method purpose is only to fix IE issue. 
		// in IE, new Error().stack  will be undefined
		// unless it is caugth in try block statement.
		let stack: any = '';
		try {
		  throw new Error('getStack');
		} catch(e: any) {
			stack = e.stack;
			stack = stack.indexOf('\r') > 0 ? stack.indexOf('\r') : stack.split('\n');
			stack = stack[4];
		}
		return stack;
	}
	private _blocked(...args: any) {
		let result = false;

		if (this.options.blockCaller) {
			const stack = this._getStack();
			this.options.blockCaller.map(
				(item) => {
					if (stack.indexOf(item) > -1) {
						result = true;
					}
				}
			);
		}
		return result;
	}
	private _throttle(...args: any) {
		let result = false;
		if (this.options.throttleOn && (args instanceof Array)) {
			args.map(
				(arg) => {
					if (arg instanceof Array) {
						arg.map(
							(item) => {
								if (item) {
									const l = (typeof item === 'string') ? item.indexOf('level_') : -1;
									if ( l === 0) {
										const sub = item.length > 6 ? item.substring(6) : '0';
										const y = this.options.throttleOn ?  this.options.throttleOn : 0;
										if (y >= parseInt(sub, 10)) {
											result = true;
										}
									}
								}
							}
						)
					} else if (arg) {
						const l = arg.indexOf('level_');
						if ( l === 0) {
							const sub = arg.length > 6 ? arg.substring(6) : '0';
							const y = this.options.throttleOn ?  this.options.throttleOn : 0;
							if (parseInt(sub, 10) <= y) {
								result = true;
							}
						}
					}
				}
			);
		}
		return result;
	}
	private _reportWatch(args: any) {
		const list = Object.keys(this.watchList);
		if (list.length) {
			try {
				const logStr: string = this._argsToString(args);
				list.map(
					(key) => {
						if (logStr.indexOf(key) > -1) {
							this.watchList[key].emit(args);
						};
					}
				);
			} catch (e) {}
		}
	}

	private _upscale(...args: any) {
		const stack = this._getStack();
		const re = /([^(]+)@|at ([^(]+) \(/g;
		const m = re.exec(stack);
		const i = stack.lastIndexOf('/');
		const n = i > 0 ? stack.substring(i+1).split(':')[0] : stack;
		const t = m ? (m[1] || m[2]) : stack;
		const caller = (t.indexOf('/') > 0 ? t.substring(0,t.indexOf('/')) : '');
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
	private _info(...args: any) {
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
				} else {
					this.defaultLog(...newArgs);
				}
			} else {
				if (this.options.emitOutput) {
					this.output.emit(["[info]", ...newArgs]);
					if (this.options.logAfterEmit) {
						this.defaultLog(...newArgs);
					}
				} else {
					this.defaultInfo(...newArgs);					
				}
			}
		}
		this._reportWatch(args);
	}
	private _log(...args: any) {
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
				} else {
					this.defaultInfo(...newArgs);					
				}
			} else if (this.options.upgrade) {
				if (this.options.emitOutput) {
					this.output.emit(["[warn]", ...newArgs]);
					if (this.options.logAfterEmit) {
						this.defaultWarn(...newArgs);
					}
				} else {
					this.defaultWarn(...newArgs);					
				}
			} else {
				if (this.options.emitOutput) {
					this.output.emit(["[log]", ...newArgs]);
					if (this.options.logAfterEmit) {
						this.defaultLog(...newArgs);
					}
				} else {
					this.defaultLog(...newArgs);					
				}
			}
		}
		this._reportWatch(args);
	}
	private _warn(...args: any) {
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
				} else {
					this.defaultLog(...newArgs);					
				}
			} else if (this.options.upgrade) {
				if (this.options.emitOutput) {
					this.output.emit(["[error]", ...newArgs]);
					if (this.options.logAfterEmit) {
						this.defaultError(...newArgs);
					}
				} else {
					this.defaultError(...newArgs);					
				}
			} else {
				if (this.options.emitOutput) {
					this.output.emit(["[warn]", ...newArgs]);
					if (this.options.logAfterEmit) {
						this.defaultWarn(...newArgs);
					}
				} else {
					this.defaultWarn(...newArgs);
				}
			}
		}
		this._reportWatch(args);
	}
	private _error(...args: any) {
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
				} else {
					this.defaultLog(...newArgs);
				}
			} else {
				if (this.options.emitOutput) {
					this.output.emit(["[error]", ...newArgs]);
					if (this.options.logAfterEmit) {
						this.defaultError(...newArgs);
					}
				} else {
					this.defaultError(...newArgs);
				}
			}
		}
		this._reportWatch(args);
	}
	private _table(...args: any) {
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
			} else {
				this.defaultTable(...args);		
			}
		}
		this._reportWatch(args);
	}
	private _trace(...args: any) {
		if ((this.options.traceDisabled === undefined || !this.options.traceDisabled) && 
			this._filtered(args) && !this._throttle(args) ) {
			const newArgs = this.options.upscale ?
							this._upscale(args) : args;
			if (this.options.emitOutput) {
				this.output.emit(["[trace]", ...newArgs]);
				if (this.options.logAfterEmit) {
					this.defaultTrace(...newArgs);
				}
			} else {
				this.defaultTrace(...newArgs);		
			}
		}
		this._reportWatch(args);
	}
	private _debug(...args: any) {
		if ((this.options.debugDisabled === undefined || !this.options.debugDisabled) && 
			this._filtered(args) && !this._throttle(args) ) {
			if (this.options.emitOutput) {
				this.output.emit(["[debug]", ...args]);
				if (this.options.logAfterEmit) {
					this.defaultDebug(...args);
				}
			} else {
				this.defaultDebug(...args);		
			}
		}
		this._reportWatch(args);
	}
	private _assert(...args: any) {
		if ((this.options.assertDisabled === undefined || !this.options.assertDisabled) && 
			this._filtered(args) && !this._throttle(args) ) {
			if (this.options.emitOutput) {
				this.output.emit(["[assert]", ...args]);
				if (this.options.logAfterEmit) {
					this.defaultAssert(...args);
				}
			} else {
				this.defaultAssert(...args);		
			}
		}
		this._reportWatch(args);
	}
	/*
	* Will initialize smart logger.
	* @instructions instructions to direct this service to suppress logs.
	*/
	makeSmartLogs( instructions: SmartOptions ) {
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
		} else {
			console.error = (...args: any) => {}
		}
		if (console.table) {
			console.table = this._table.bind(this);
		} else {
			console.table = (...args: any) => {}
		}
		if (console.trace) {
			console.trace = this._trace.bind(this);
		} else {
			console.trace = (...args: any) => {}
		}
		if (console.debug) {
			console.debug = this._debug.bind(this);
		} else {
			console.debug = (...args: any) => {}
		}
		if (console.assert) {
			console.assert = this._assert.bind(this);
		} else {
			console.assert = (...args: any) => {}
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
	addWatch(key: any) {
		if (!this.watchList[key]) {
			this.watchList[key] = new EventEmitter();
		}
		return this.watchList[key];
	}
	/*
	* Will remove a key from the warch list.
	* @args key to be removed. it will be wise to remove subscriptions to this key before calling this method.
	*/
	removeWatch(key: any) {
		delete this.watchList[key];
	}
	/*
	* Will clear warch list.
	* @args list is a list of subscribers to the items in watchlist. 
	* It could be empty, but to avoid leaks, it will be wise to keep a record of your subscriptions.
	*/
	clearWatchList(list: any[]) {
		list.map((sbc) => sbc.unsubscribe());
		this.watchList = {};
	}
	/*
	* Will markup stack trace to provide HTML fragment with anchors foe every trace.
	* @args argument that may contail stack trace.
	* @return A more formal content with html fragment if stack travce applied ib advance.
	*/
	markupTrace(args: any) {
		let result = args;
		if (args instanceof Array) {
			result = [];
			args.map(
				(item: any) => {
					if (typeof item === 'string') {
						const breakOn = (item.indexOf('\n') > 0) ? '\n' : ((item.indexOf('\r') > 0) ? '\r' : undefined);
						if (breakOn && (item.indexOf('@') > -1 || item.indexOf('(') > -1) && item.indexOf(':') > 0) {
							const list: any[] = [];
							item.split(breakOn).map(
								(line: string) => {
									const x = line.indexOf('@');
									const z = line.indexOf('(');
									if (z > 0) {
										const sublist = line.substring(z+1, line.length - 1).split(':');
										const len = sublist.length;
										const name = line.substring(0, z) + ':' + sublist[len - 2] + ':' + sublist[len - 1];
										const ref = sublist.slice(0, len - 2).join(':');

										list.push('<a href="' + ref +  '">' + name + '</a>');
									} else if (x >= 0) {
										const y = line.indexOf(':');
										if (y < 0 ) {
											list.push('<a href="' + line.substring(x+1) +  '">' +
											line.substring(0, x) +
											'</a>');
										} else {
											const sublist = line.substring(x+1, line.length).split(':');
											const len = sublist.length;
											const name = line.substring(0, x) + ':' + sublist[len - 2] + ':' + sublist[len - 1];
											const ref = sublist.slice(0, len - 2).join(':');
											
											list.push('<a href="' + ref +  '">' + name + '</a>');
										}
									} else {
										list.push(line);
									}
								}
							);
							result.push(list.join('<br />'));
						} else if (breakOn) {
							result.push(item.split(breakOn).join('<br />'));
						} else {
							result.push(item);
						}
					} else if (typeof item === 'object') {
						try {
							result.push(JSON.stringify(item));
						} catch(e) {
							if (item.message) {
								result.push(item.message);
							} else {
								result.push(item);
							}
						}
					} else {
						result.push(item);
					}
				}
			);
		}
		return result;
	}
}
