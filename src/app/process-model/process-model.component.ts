import { Component, OnInit,Input,Output } from '@angular/core';

@Component({
  selector: 'app-process-model',
  templateUrl: './process-model.component.html',
  styleUrls: ['./process-model.component.css']
})
export class ProcessModelComponent implements OnInit {

  
  public selectedNode = null;

  constructor() { }

  ngOnInit(): void {
  }
  public setSelectedNode(node: any)
  {
    this.selectedNode = node;
  }

}
