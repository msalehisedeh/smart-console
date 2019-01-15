import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SmartConsoleService } from './smart-console/smart-console.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Smart Console';

  data = [];

  subscribers = [];
  options = {
    output: true,
    logAfterEmit: false,
    logDisabled: false,
    infoDisabled: false,
    warnDisabled: false,
    errorDisabled: false,
    traceDisabled: false,
    assertDisabled: false,
    tableDisabled: false,
    downGrade: false,
    upgrade: false,
    upscale: true,  
    blockCaller: 'core.js,Zone.ts,MyComponent.ts',
    suppress: 'test3,test4',
    watch: 'sanitizing'
  };

  constructor(
    private http: HttpClient,
    private smartService: SmartConsoleService
  ) {
    this.smartService.makeSmartLogs({
      emitOutput: true,
      upscale: true
    });
    this.smartService.redirectedOutput().subscribe(
      (event) => {
        this.data.push(this.smartService.markupTrace(event));
      }
    );
  }

  update(item: string, event: any) {
    this.options[item] = event.target.checked;
  }

  keyup(item: string, event: any) {
    this.options[item] = event.target.value;
  }

  clear() {
    this.data = [];
  }

  execute() {
    const newOptions = {};

    if (this.options.logDisabled) {
      newOptions['logDisabled'] = true;
    }
    if (this.options.warnDisabled) {
      newOptions['warnDisabled'] = true;
    }
    if (this.options.infoDisabled) {
      newOptions['infoDisabled'] = true;
    }
    if (this.options.errorDisabled) {
      newOptions['errorDisabled'] = true;
    }
    if (this.options.tableDisabled) {
      newOptions['tableDisabled'] = true;
    }
    if (this.options.traceDisabled) {
      newOptions['traceDisabled'] = true;
    }
    if (this.options.assertDisabled){
      newOptions['assertDisabled'] = true;
    }
    if (this.options.downGrade) {
      newOptions['downGrade'] = true;
    }
    if (this.options.upgrade) {
      newOptions['upgrade'] = true;
    }
    if (this.options.upscale) {
      newOptions['upscale'] = true;
    }
    if (this.options.output) {
      newOptions['emitOutput'] = true;
    }
    if (this.options.logAfterEmit) {
      newOptions['logAfterEmit'] = true;
    }
    if (this.options.blockCaller) {
      newOptions['blockCaller'] = this.options.blockCaller.split(',');
    }
    if (this.options.suppress) {
      newOptions['suppress'] = this.options.suppress.split(',');
    }
    this.smartService.makeSmartLogs(newOptions);
    if (this.options.watch) {
      const list = this.options.watch.split(',');
      this.smartService.clearWatchList(this.subscribers);
      this.subscribers = [];
      list.map(
        (key) => {
          const sbc = this.smartService.addWatch(key).subscribe(
            (event) => {
              this.data.push("Watch for '" + key +
                            "' is reporting log:" +
                            (typeof event==='object' ? JSON.stringify(event) : event) 
                        );
            }
          );
          this.subscribers.push(sbc);
        }
      );
    } else {
      this.smartService.clearWatchList(this.subscribers);
      this.subscribers = [];
    }

    console.log("test","1","2");
    console.info("test","1",{'x': 1, 'y': 'sanitizing', 'z': []});
    console.info("test2","1","2");
    console.warn("test","1","2");
    console.warn("test3","1","2");
    console.error("test","1","2");
    console.error("test4","1","2");
    console.table(["test","1","2"]);

    this._trace();
    console.assert(false, "asserting test!");
    this.http.get("https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&format=json&api_key=API_KEY&user_id=USER_ID").subscribe(
      (success) => {

      },
      (error) => {

      }
    );
    this.http.get("https://something.org").subscribe(
      (success) => {

      },
      (error) => {

      }
    )
  }
	private _trace() {
		// this method purpose is only to fix IE issue. 
		// in IE, new Error().stack  will be undefined
		// unless it is caugth in try block statement.
		try {
		  throw new Error('testing trace log');
		} catch(e) {
      console.trace(e.stack);
		}
	  }
}
