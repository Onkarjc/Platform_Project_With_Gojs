import { AnimationMetadataType } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  isOpened : boolean = true;
  comp1Toggle: boolean = false;
  comp2Toggle: boolean = false;
  comp3Toggle: boolean = false;
  public selectedNode = null;
  flag : any;
  searchval : any;
  Temp1 : boolean = this.comp1Toggle ;
  Temp2 : boolean = this.comp2Toggle ;
  Temp3 : boolean = this.comp3Toggle ;
 
  
 

  constructor() { }

  ngOnInit(): void {
  }

  comp1ToggleBtn(){
    if(this.comp2Toggle == true || this.comp3Toggle == true)
    {
      this.comp2Toggle = false;
      this.comp3Toggle = false;
    }
    this.comp1Toggle = !this.comp1Toggle;
  }

  comp2ToggleBtn(){
    if(this.comp1Toggle == true || this.comp3Toggle == true)
    {
      this.comp1Toggle = false;
      this.comp3Toggle = false;
    }
    this.comp2Toggle = !this.comp2Toggle;
  }

  comp3ToggleBtn(){
    if(this.comp1Toggle == true || this.comp2Toggle ==true)
    {
      this.comp1Toggle = false;
      this.comp2Toggle = false;
     
      
    }   
    this.comp3Toggle = !this.comp3Toggle;
  }

  public setSelectedNode(node: any)
  {
    this.selectedNode = node;
  }

  getVal(val:any)
  {
    console.warn(val);
    this.searchval = val;
    if(this.searchval == 'circle' || this.searchval == 'rectangle' || this.searchval == 'cast' || this.searchval == 'date' || this.searchval == 'if')
    {      
    this.comp1Toggle = true;
    this.comp2Toggle = false;
    this.comp3Toggle = false;
    }else if(this.searchval == 'order' || this.searchval == 'checkout' || this.searchval == 'confirmation'){
      this.comp2Toggle = true;
      this.comp1Toggle = false;
      this.comp3Toggle = false;
    }
    else if(this.searchval == 'connectors' || this.searchval == 'email' || this.searchval == 'kfka' || this.searchval == 'mq' || this.searchval == 'sap'){
      this.comp3Toggle = true;
      this.comp1Toggle = false;
      this.comp2Toggle = false;
    }
  
  }


  ngAfterViewChecked()
  {
    if(this.searchval == 'circle')
    {
      $('#circle').addClass('selected')
    }
    else if(this.searchval == 'rectangle')
    {
      $('#rectangle').addClass('selected')
    }
    else if(this.searchval == 'cast')
    {
      $('#cast').addClass('selected')
    }
    else if(this.searchval == 'date')
    {
      $('#date').addClass('selected')
    }
    else if(this.searchval == 'if')
    {
      $('#if').addClass('selected')
    }
    else if(this.searchval == 'order')
    {
      $('#order').addClass('selected')
    }
    else if(this.searchval == 'checkout')
    {
      $('#checkout').addClass('selected')
    }
    else if(this.searchval == 'confirmation')
    {
      $('#confirmation').addClass('selected')
    }
    else if(this.searchval == 'connectors')
    {
      $('#connectors').addClass('selected')
    }
    else if(this.searchval == 'email')
    {
      $('#email').addClass('selected')
    }
    else if(this.searchval == 'kfka')
    {
      $('#kfka').addClass('selected')
    }
    else if(this.searchval == 'mq')
    {
      $('#mq').addClass('selected')
    }
    else if(this.searchval == 'sap')
    {
      $('#sap').addClass('selected')
    }
    else if(this.searchval == '')
    {
      $('#circle').removeClass('selected');
      $('#rectangle').removeClass('selected');
      $('#cast').removeClass('selected');
      $('#date').removeClass('selected');
      $('#if').removeClass('selected');
      
      $('#order').removeClass('selected');
      $('#checkout').removeClass('selected');
      $('#confirmation').removeClass('selected');

      $('#connectors').removeClass('selected');
      $('#email').removeClass('selected');
      $('#kfka').removeClass('selected');
      $('#mq').removeClass('selected');
      $('#sap').removeClass('selected');
      
    }
    
 }
 handleClear(){
  this.searchval = '';
  
}


  




}
