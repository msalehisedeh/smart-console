# Welcome to Smart Console!

Have you ever been in need of suppressing console logs? Have you thought of a tool that can help you suppress logs based on type, caller, level, or anything else that I cannot think of? And what if you just want to watch for occurance of a log?
You can use this tool to have your application do all of that and maybe a bit more! 

**NOTE** http related 403, 500, ... logs are issued natively by zon.js as a result this tool has no control over them.

**I appreciate comments and ideas to make this tool versatile.**

[Live Demo](https://smart-console.stackblitz.io) | [Source code](https://github.com/msalehisedeh/smart-console/tree/master/src/app) | [Comments/Requests](https://github.com/msalehisedeh/smart-console/issues)

## How to use?
Inject the SmartConsoleService and give it the criteria you have for your application and let it all flow the way you have envisioned it.

| Method           | Description                                                          |
|------------------|----------------------------------------------------------------------|
| makeSmartLogs    | Will override console log with given options. You could set-up options in your environment variables and call this method to set your logs based on deployment stage. Or set-up any one of the option attributes at any-time. But remember that the setting is global per application. |
| redirectedOutput | Will return event emitter that emits logs if redirectOutput flag of options is set. |
| markupTrace      | Will mark-up stack trace from list of plain text to a list of click-able links.     |
| addWatch         | Will watch for existance of a particular key in a log.                              |
| removeWatch      | Will remove a key from watch list. It will be wise to remove subscriptions to this key before calling this method. |
| clearWatch       | Will clear watch list. To avoid leaks, it will be wise to keep a record of your subscriptions and pass them to this method to unsubscribe them for you. |


### Options
```javascript
SmartOptions {
	emitOutput?: boolean,// log result in to output instead of console.
	logAfterEmit?: boolean, // continue logging into browser console after emitting the log
	logDisabled?: boolean,  // disables all log level console logs
	infoDisabled?: boolean, // disables all info level console logs
	warnDisabled?: boolean, // disables all warn level console logs
	errorDisabled?: boolean,// disables all error level console logs
	tableDisabled?: boolean,// disables all table console logs
	traceDisabled?: boolean,// disables all trace level console logs
	assertDisabled?:boolean,// disables assert logs on console
	downGrade?: boolean,    // downgrade a log from warning to info or log to warning, or error to log.
	upgrade?: boolean,      // upgrades a log from info to warning or warning to log, or log to error
	upscale?: boolean,      // shows additional info on each log
	blockCaller?: any[],    // blocks the caller
	suppress?: any[]        // blocks per a keyword
}
```

### Examples
```javascript
import { SmartConsoleService } from '@sedeh/smart-console';

  constructor(private smartService: SmartConsoleService) {
    this.smartService.makeSmartLogs(this.options);
    this.smartService.redirectedOutput().subscribe(
      (event) => {
        this.myLogView.push(this.smartService.markupTrace(event));
      }
    );
  }

```

## Releases

| Version | Description                                                          |
|---------|----------------------------------------------------------------------|
|1.1.0    | Added watch methods to make it possible for knowing if log is performed containing a particular key. |
|1.0.4    | break lines on trace for Safari.                                     |
|1.0.3    | Fixed issues on Safari and IE11 browsers.                            |
|1.0.2    | Added functionality to convert stack trace to a link.                |
|1.0.1    | Added functionality to log to console after emitting it.             |
|1.0.0    | initial functionality.                                               |


![alt text](https://raw.githubusercontent.com/msalehisedeh/smart-console/master/sample.png  "What you would see when a smart-console sampler is used")
