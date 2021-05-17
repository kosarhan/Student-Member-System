import { Component, OnInit } from '@angular/core';
import { Log } from '../log';
import { LogService } from '../log.service';
import { Location } from '@angular/common';

@Component({
  templateUrl: 'logs.component.html',
  styleUrls: ['logs.component.css'],
})

export class LogComponent implements OnInit {

  logs: Log[];

  constructor(
    private logService: LogService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getLogs();
  }

  getLogs() {
    return this.logService.getLogInfo()
      .subscribe(
        log => {
          this.logs = log
        }
      );
  }
}
