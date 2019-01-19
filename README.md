# Welcome to Smart Console!

Have you ever been in need of suppressing console logs? Have you thought of a tool that can help you suppress logs based on type, caller, level, or anything else that I cannot think of? Or maybe you DO NOT want to disable a log but want to throttle it! And what if you just want to watch for occurrence of a log? 
You can use this tool to have your application do all of that and maybe a bit more! 

**NOTE:** http related 403, 500, ... logs are issued natively by zon.js as a result they are out of JavaScript reach and this tool do not have any control over them.

**I appreciate comments and ideas to make this tool versatile.**

[Live Demo](https://smart-console.stackblitz.io) | [Source code](https://github.com/msalehisedeh/smart-console/tree/master/src/app) | [Comments/Requests](https://github.com/msalehisedeh/smart-console/issues)

## How to use?
Inject the SmartConsoleService and give it the criteria you have for your application and let it all flow the way you have envisioned it.

| Method           | arguments     |Description                                                          |
|------------------|---------|---------------------------------------------------------------------------|
| makeSmartLogs    | options | Will override console log with given options. You could set-up options in your environment variables and call this method to set your logs based on deployment stage. Or set-up any one of the option attributes at any-time. But remember that the setting is global per application. |
| redirectedOutput | -       | Will return event emitter that emits logs if redirectOutput flag of options is set. |
| markupTrace      | event   | Will mark-up stack trace from list of plain text to a list of click-able links. |
| addWatch         | key     | Will watch for existence of a particular key in a log.                          |
| removeWatch      | key     | Will remove a key from watch list. It will be wise to remove subscriptions to this key before calling this method. |
| clearWatch       | -       | Will clear watch list. To avoid leaks, it will be wise to keep a record of your subscriptions and pass them to this method to unsubscribe them for you. |


### Options
```javascript
SmartOptions {
	emitOutput?: boolean,   // log result in to output instead of console.
	logAfterEmit?: boolean, // continue logging into browser console after emitting the log
	logDisabled?: boolean,  // disables all log level console logs
	infoDisabled?: boolean, // disables all info level console logs
	warnDisabled?: boolean, // disables all warn level console logs
	errorDisabled?: boolean,// disables all error level console logs
	tableDisabled?: boolean,// disables all table console logs
	traceDisabled?: boolean,// disables all trace level console logs
	exceptionDisabled?: boolean, // disables all exception level console logs
	debugDisabled?: boolean,// disables all debug level console logs
	assertDisabled?:boolean,// disables assert logs on console
	downGrade?: boolean,    // downgrade a log from warning to info or log to warning, or error to log.
	upgrade?: boolean,      // upgrades a log from info to warning or warning to log, or log to error
	upscale?: boolean,      // shows additional info on each log
	throttleOn?: number,     // block logs less than provided message level (e.g., level_3 or level_5) in a log
	blockCaller?: any[],    // blocks the caller
	suppress?: any[]        // blocks per a keyword
}
```

### Examples
```javascript
import { SmartConsoleService } from '@sedeh/smart-console';
import { environment } from '../../environments/environment';

	// Example of configuring log service based on environment where 
	// options is configured. Alternatively, options could be defined 
	// locally in app component instead of environment.
	constructor(private smartService: SmartConsoleService) {
		this.smartService.makeSmartLogs(environment.options);
	}
	
	// Example of providing listener if emitOutput of 
	// options is configure as true.
	this.smartService.redirectedOutput().subscribe(
		(event) => {
			this.myLogView.push(this.smartService.markupTrace(event));
		}
	);

	// Example of adding a watch on logs
	const sbc = this.smartService
					.addWatch(key)
					.subscribe(
						(event) => {
						// do something with the event
						}
					);
	this.watchSubscribers.push(sbc);
	
	// maybe onDestroy or somewhere else you need to clear the watch list.
	this.smartService.clearWatchList(this.watchSubscribers);

	// Example for throttling logs if throttleOn of options
	// is configured to 5, then all logs less than or equal to
	// level_5 will be blocked (the order of 'level_' location in 
	// log is not important but if it is first, will be noticeable)
	console.log('level_3', 'message that may not be as important', 'additional info');
	console.log('level_6', 'message that may be important', 'additional info');
	console.info('level_6', 'message that may be important', 'additional info');
	console.trace('level_5', 'message that may or may not be as important', 'additional info');
	console.warn('level_5', 'message that may or may not be as important', 'additional info');

```

## Releases

| Version | Description                                                          |
|---------|----------------------------------------------------------------------|
|1.2.2    | fixed dependencies.                                                  |
|1.2.1    | Updated Readme file.                                                 |
|1.2.0    | Added throttling option in logs.                                     |
|1.1.2    | Added debug and exception methods.                                   |
|1.1.1    | Fixed the watch code if a JSON is logged.                            |
|1.1.0    | Added watch methods to make it possible for knowing if log is performed containing a particular key. |
|1.0.4    | break lines on trace for Safari.                                     |
|1.0.3    | Fixed issues on Safari and IE11 browsers.                            |
|1.0.2    | Added functionality to convert stack trace to a link.                |
|1.0.1    | Added functionality to log to console after emitting it.             |
|1.0.0    | initial functionality.                                               |


![alt text](https://raw.githubusercontent.com/msalehisedeh/smart-console/master/sample.png  "What you would see when a smart-console sampler is used")
