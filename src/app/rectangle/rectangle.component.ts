import { Component, OnInit } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.css']
})
export class RectangleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const $ = go.GraphObject.make;
    let myDiagram: go.Diagram ;
    
    let myPalette;
      myPalette =
        $(go.Palette, "rectPallette",  // must name or refer to the DIV HTML element
          {
            maxSelectionCount: 1,
           
            model: new go.GraphLinksModel([  // specify the contents of the Palette
              { figure: "RoundedRectangle"}
              
            ])
          });
       
        
        var nodeSelectionAdornmentTemplate =
        $(go.Adornment, "Auto",
          $(go.Shape, { fill: null, stroke: "deepskyblue", strokeWidth: 1.5, strokeDashArray: [4, 2] }),
          $(go.Placeholder)
        );

      

          myPalette.nodeTemplate =
        $(go.Node, "Spot",
          { locationSpot: go.Spot.Center },
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
          { selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate },
          // { resizable: true, resizeObjectName: "PANEL", resizeAdornmentTemplate: nodeResizeAdornmentTemplate },
          // { rotatable: true, rotateAdornmentTemplate: nodeRotateAdornmentTemplate },
          new go.Binding("angle").makeTwoWay(),
          // the main object is a Panel that surrounds a TextBlock with a Shape
          $(go.Panel, "Auto",
            { name: "PANEL" },
            new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
            $(go.Shape, "Rectangle",  // default figure
              {
                portId: "", // the default port: if no spot on link data, use closest side
                fromLinkable: true, toLinkable: true, cursor: "pointer",
                fill: "white",  // default color
                strokeWidth: 2
              },
              new go.Binding("figure"),
              new go.Binding("fill")),
            $(go.TextBlock,
              {
                font: "bold 11pt Helvetica, Arial, sans-serif",
                margin: 8,
                maxSize: new go.Size(160, NaN),
                wrap: go.TextBlock.WrapFit,
                editable: true
              },
              new go.Binding("text").makeTwoWay())
          ),
         
        );

  }

}