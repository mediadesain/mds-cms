import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../services/conection.service';

@Component({
  selector: 'app-offline',
  template: `
    <p *ngIf="!connection.isConnected">
      <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" style="width: 13px"/> Connecting ...
    </p>
    <a *ngIf="connection.isConnected" href="javascript:void(0)" (click)="backOnline()">Back</a>
  `,
  styles: [
  ]
})
export class OfflineMessageComponent implements OnInit {

  constructor(
    public connection : ConnectionService,
    private location : Location
  ) { }

  ngOnInit(): void {
  }

  backOnline(){
    this.location.back()
  }

}
