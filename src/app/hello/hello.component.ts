import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'hello',
  template: `
    <h1>Hello {{ name }}!</h1>
    <hc-data-entry></hc-data-entry>
  `
})
export class HelloComponent implements OnInit {
  name: string;

  constructor(private configService: ConfigService) {}

  ngOnInit() {
    this.configService.get().subscribe(c => (this.name = c.setting1));
  }
}
