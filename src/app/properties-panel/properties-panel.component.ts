import { Component, OnInit,Input,Output } from '@angular/core';

@Component({
  selector: 'app-properties-panel',
  templateUrl: './properties-panel.component.html',
  styleUrls: ['./properties-panel.component.css']
})
export class PropertiesPanelComponent implements OnInit {

  @Input()
 public selectedNode : any;

  constructor() { }

  ngOnInit(): void {
  }

}
