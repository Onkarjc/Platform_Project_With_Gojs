import { Component, OnInit } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'app-connectors',
  templateUrl: './connectors.component.html',
  styleUrls: ['./connectors.component.css']
})
export class ConnectorsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const $ = go.GraphObject.make;
    let myDiagram: go.Diagram ;
    let myPalette;
      myPalette =
        $(go.Palette, "connector",  // must name or refer to the DIV HTML element
          {
            maxSelectionCount: 1,
           // nodeTemplateMap: myDiagram.nodeTemplateMap,  // share the templates used by myDiagram
            linkTemplate: // simplify the link template, just in this Palette
              $(go.Link,
                { // because the GridLayout.alignment is Location and the nodes have locationSpot == Spot.Center,
                  // to line up the Link in the same manner we have to pretend the Link has the same location spot
                  locationSpot: go.Spot.Center,
                  selectionAdornmentTemplate:
                    $(go.Adornment, "Link",
                      { locationSpot: go.Spot.Center },
                      $(go.Shape,
                        { isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0 }),
                      $(go.Shape,  // the arrowhead
                        { toArrow: "Standard", stroke: null })
                    )
                },
                {
                  routing: go.Link.AvoidsNodes,
                  curve: go.Link.JumpOver,
                  corner: 5,
                  toShortLength: 4
                },
                new go.Binding("points"),
                $(go.Shape,  // the link path shape
                  { isPanelMain: true, strokeWidth: 2 }),
                $(go.Shape,  // the arrowhead
                  { toArrow: "Standard", stroke: null })
              ),
            model: new go.GraphLinksModel([  // specify the contents of the Palette
              
              
            ],[
              // the Palette also has a disconnected Link, which the user can drag-and-drop
              { points: new go.List(/*go.Point*/).addAll([new go.Point(0, 0), new go.Point(60, 0)]) },
             // { points: new go.List(/go.Point/).addAll([new go.Point(0, 0), new go.Point(60, 0), new go.Point(60, 40),]) },
              //{ points: new go.List(/go.Point/).addAll([new go.Point(0, 0), new go.Point(30, 0), new go.Point(30, 40), new go.Point(60, 40)]) }
            ])
          });
     

          myPalette.nodeTemplate =
        $(go.Node, "Spot",
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