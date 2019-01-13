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
	assertDisabled?:boolean, // disables assert logs on console
	downGrade?: boolean,     // downgrade a log from warning to info or log to warning, or error to log.
	upgrade?: boolean,       // upgrades a log from info to warning or warning to log, or log to error
	upscale?: boolean,       // shows additional info on each log
	blockCaller?: any[],     // blocks the caller
	suppress?: any[]         // blocks per a keyword
}

@Injectable()
export class SmartConsoleService {
	private options: SmartOptions;
	private defaultLog = console.log;
	private defaultInfo = console.info;
	private defaultWarn = console.warn;
	private defaultError = console.error;
	private defaultTable = console.table;
	private defaultTrace = console.trace;
	private defaultAssert = console.assert;
	private output = new EventEmitter();

	private _suppressed(...args) {
		let result = false;
		if (this.options.suppress) {
			const x = (args instanceof Array) ?
							args.join(',') : 
							(typeof args === 'object') ?
							JSON.stringify(args) : "" + args;
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
	private _blocked(...args) {
		let result = false;

		if (this.options.blockCaller) {
			const stack = new Error().stack.split('\n');
			this.options.blockCaller.map(
				(item) => {
					if (stack[3].indexOf(item) > -1) {
						result = true;
					}
				}
			);
		}
		return result;
	}
	private _upscale(...args) {
		const stack = new Error().stack.split('\n');
		const re = /([^(]+)@|at ([^(]+) \(/g;
		const m = re.exec(stack[3]);
		const i = stack[3].lastIndexOf('/');
		const n = i > 0 ? stack[3].substring(i+1).split(':')[0] : '';
		const t = (m[1] || m[2]);
		const caller = (t.indexOf('/') > 0 ? t.substring(0,t.indexOf('/')) : t);
		const _date = new Date();
		const _time = (_date.getMonth() + 1) + "/" +
					  _date.getDay() + "/" +
					  _date.getFullYear() + " " +
					  _date.getHours() + ":" +
					  _date.getMinutes() + ":" +
					  _date.getSeconds() + ":" +
					  _date.getMilliseconds();
		return [_time + " [" + n + " | " + caller + "] "].concat(...args);
	}
	private _info(...args) {
		if ((this.options.infoDisabled === undefined || !this.options.infoDisabled) &&
			!this._suppressed(args) &&
			!this._blocked(args)) {
			const newArgs = this.options.upscale ?
							this._upscale(args) : args;
			if (this.options.upgrade) {
				if (this.options.emitOutput) {
					this.output.emit(["log", ...newArgs]);
					if (this.options.logAfterEmit) {
						this.defaultLog(...newArgs);
					}
				} else {
					this.defaultLog(...newArgs);
				}
			} else {
				if (this.options.emitOutput) {
					this.output.emit(["info", ...newArgs]);
					if (this.options.logAfterEmit) {
						this.defaultLog(...newArgs);
					}
				} else {
					this.defaultInfo(...newArgs);					
				}
			}
		}
	}
	private _log(...args) {
		if ((this.options.logDisabled === undefined || !this.options.logDisabled) &&
			!this._suppressed(args) &&
			!this._blocked(args)) {
			const newArgs = this.options.upscale ?
							this._upscale(args) : args;
			if (this.options.downGrade) {
				if (this.options.emitOutput) {
					this.output.emit(["info", ...newArgs]);
					if (this.options.logAfterEmit) {
						this.defaultLog(...newArgs);
					}
				} else {
					this.defaultInfo(...newArgs);					
				}
			} else if (this.options.upgrade) {
				if (this.options.emitOutput) {
					this.output.emit(["warn", ...newArgs]);
					if (this.options.logAfterEmit) {
						this.defaultWarn(...newArgs);
					}
				} else {
					this.defaultWarn(...newArgs);					
				}
			} else {
				if (this.options.emitOutput) {
					this.output.emit(["log", ...newArgs]);
					if (this.options.logAfterEmit) {
						this.defaultLog(...newArgs);
					}
				} else {
					this.defaultLog(...newArgs);					
				}
			}
		}
	}
	private _warn(...args) {
		if ((this.options.warnDisabled === undefined || !this.options.warnDisabled) &&
			!this._suppressed(args) &&
			!this._blocked(args)) {
			const newArgs = this.options.upscale ?
							this._upscale(args) : args;
			if (this.options.downGrade) {
				if (this.options.emitOutput) {
					this.output.emit(["log", ...newArgs]);
					if (this.options.logAfterEmit) {
						this.defaultLog(...newArgs);
					}
				} else {
					this.defaultLog(...newArgs);					
				}
			} else if (this.options.upgrade) {
				if (this.options.emitOutput) {
					this.output.emit(["error", ...newArgs]);
					if (this.options.logAfterEmit) {
						this.defaultError(...newArgs);
					}
				} else {
					this.defaultError(...newArgs);					
				}
			} else {
				if (this.options.emitOutput) {
					this.output.emit(["warn", ...newArgs]);
					if (this.options.logAfterEmit) {
						this.defaultWarn(...newArgs);
					}
				} else {
					this.defaultWarn(...newArgs);
				}
			}
		}
	}
	private _error(...args) {
		if ((this.options.errorDisabled === undefined || !this.options.errorDisabled) &&
			!this._suppressed(args) &&
			!this._blocked(args)) {
			const newArgs = this.options.upscale ?
							this._upscale(args) : args;
			if (this.options.downGrade) {
				if (this.options.emitOutput) {
					this.output.emit(["log", ...newArgs]);
					if (this.options.logAfterEmit) {
						this.defaultLog(...newArgs);
					}
				} else {
					this.defaultLog(...newArgs);
				}
			} else {
				if (this.options.emitOutput) {
					this.output.emit(["error", ...newArgs]);
					if (this.options.logAfterEmit) {
						this.defaultError(...newArgs);
					}
				} else {
					this.defaultError(...newArgs);
				}
			}
		}
	}
	private _table(...args) {
		if ((this.options.tableDisabled === undefined || !this.options.errorDisabled) &&
			!this._suppressed(args) &&
			!this._blocked(args)) {
			const newArgs = this.options.upscale ?
							this._upscale(args) : args;
			if (this.options.emitOutput) {
				this.output.emit(["table", ...newArgs]);
				if (this.options.logAfterEmit) {
					this.defaultTable(...newArgs);
				}
			} else {
				this.defaultTable(...newArgs);		
			}
		}
	}
	private _trace(...args) {
		if ((this.options.traceDisabled === undefined || !this.options.traceDisabled)) {
			const newArgs = this.options.upscale ?
							this._upscale(args) : args;
			if (this.options.emitOutput) {
				this.output.emit(["trace", ...newArgs]);
				if (this.options.logAfterEmit) {
					this.defaultTrace(...newArgs);
				}
			} else {
				this.defaultTrace(...newArgs);		
			}
		}
	}
	private _assert(...args) {
		if ((this.options.assertDisabled === undefined || !this.options.assertDisabled)) {
			if (this.options.emitOutput) {
				this.output.emit(["assert", ...args]);
				if (this.options.logAfterEmit) {
					this.defaultAssert(...args);
				}
			} else {
				this.defaultAssert(...args);		
			}
		}
	}
	/*
	* Will initialize smart logger.
	* @instructions instructions to direct this service to suppress logs.
	*/
	makeSmartLogs( instructions: SmartOptions ) {
		this.options = instructions;
		console.log = this._log.bind(this);
		console.info = this._info.bind(this);
		console.warn = this._warn.bind(this);
		console.error = this._error.bind(this);
		console.table = this._table.bind(this);
		console.trace = this._trace.bind(this);
		console.assert = this._assert.bind(this);
	}
	/*
	* @return Event Emitter that may publisg logs.
	*/
	redirectedOutput() {
		return this.output;
	}
	/*
	* Will markup stack trace to provide HTML fragment with anchors foe every trace.
	* @args argument that may contail stack trace.
	* @return A more formal content with html fragment if stack travce applied ib advance.
	*/
	markupTrace(args: any) {
		if (args instanceof Array) {
			args.map(
				(item: any, index: number) => {
					if (typeof item === 'string') {
						if ((item.indexOf('@') > -1 || item.indexOf('(') > -1) && item.indexOf(':') > 0 && item.indexOf('\n') > 0) {
							const list = [];
							item.split('\n').map(
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
							args[index] = list.join('<br />');
						}
					}
				}
			);
		}
		return args;
	}
}
