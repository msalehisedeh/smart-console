# Welcome to Smart Console!

Have you ever been in need of suppressing console logs? Have you thought of a tool that can help you suppress logs based on type, caller, level, or anything else that I cannot think of? 
You can use this tool to have your application make it all happen. 

**NOTE** This tool is not able to override native logs that are issued by zone.js.

**I appreciate comments and ideas to make this tool versatile.**

[Live Demo](https://smart-console.stackblitz.io) | [Source code](https://github.com/msalehisedeh/smart-console/tree/master/src/app) | [Comments/Requests](https://github.com/msalehisedeh/smart-console/issues)

## How to use?
Inject the SmartConsoleService and give it the criteria you have for your application and let it all flow the way you have envisioned it.

| Method           | Description                                                          |
|------------------|----------------------------------------------------------------------|
| makeSmartLogs    | Will override console log with given optiond. You could setup options in your environment variables and call this method to set your logs based on deployment stage. Or setup any one of the option attributes at anytime. But remember that the setting is global per appllication. |
| redirectedOutput | Will return event emitter that emits logs if redirectOutput flag of options is set. |
| markupTrace      | Will markup stacktrace from list of plain text to a list of clickable links.        |


### Options
```javascript
SmartOptions {
	emitOutput?: boolean,// log result in to output insted of console.
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
|1.0.3    | Fixed issues on Safari and IE11 browsers.                            |
|1.0.2    | Added functionality to convert stack trace to a link.                |
|1.0.1    | Added functionality to log to console after emitting it.             |
|1.0.0    | initial functionality.                                               |


![alt text](https://raw.githubusercontent.com/msalehisedeh/smart-console/master/sample.png  "What you would see when a smart-console sampler is used")
