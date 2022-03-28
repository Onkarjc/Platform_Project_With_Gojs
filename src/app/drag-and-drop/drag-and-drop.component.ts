// import { partitionArray } from '@angular/compiler/src/util';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as go from 'gojs'

//import 'jqueryui'
@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {

  constructor() { }

  @Output()
  public nodeClicked = new EventEmitter();
  public selectedNode: any;
  public node: any;
  public dragid: any;
  public key : any;
  public loc : any;
  public flag = false;
  public xaxis : number = 0;
  public yaxis : number = 0;
  public ag : number = 0;
  public flag1 : any;

  // public jid : JSON ={ };


  ngOnInit(): void {
   
    const $ = go.GraphObject.make;
    let myDiagram: go.Diagram;// for conciseness in defining templates

    myDiagram =
      $(go.Diagram, "myDiagramDiv",  // must name or refer to the DIV HTML element
        {
          grid: $(go.Panel, "Grid",
            $(go.Shape, "LineH", { stroke: "lightgray", strokeWidth: 0.5 }),
            $(go.Shape, "LineH", { stroke: "gray", strokeWidth: 0.5, interval: 10 }),
            $(go.Shape, "LineV", { stroke: "lightgray", strokeWidth: 0.5 }),
            $(go.Shape, "LineV", { stroke: "gray", strokeWidth: 0.5, interval: 10 })
          ),
          "draggingTool.dragsLink": true,
          "draggingTool.isGridSnapEnabled": true,
          "linkingTool.isUnconnectedLinkValid": true,
          "linkingTool.portGravity": 20,
          "relinkingTool.isUnconnectedLinkValid": true,
          "relinkingTool.portGravity": 20,
          "relinkingTool.fromHandleArchetype":
            $(go.Shape, "Diamond", { segmentIndex: 0, cursor: "pointer", desiredSize: new go.Size(8, 8), fill: "tomato", stroke: "darkred" }),
          "relinkingTool.toHandleArchetype":
            $(go.Shape, "Diamond", { segmentIndex: -1, cursor: "pointer", desiredSize: new go.Size(8, 8), fill: "darkred", stroke: "tomato" }),
          "linkReshapingTool.handleArchetype":
            $(go.Shape, "Diamond", { desiredSize: new go.Size(7, 7), fill: "lightblue", stroke: "deepskyblue" }),
          "rotatingTool.handleAngle": 270,
          "rotatingTool.handleDistance": 30,
          "rotatingTool.snapAngleMultiple": 15,
          "rotatingTool.snapAngleEpsilon": 15,
          "undoManager.isEnabled": true,
          "clickCreatingTool.archetypeNodeData": { text: "Node", color: "white" },
          "commandHandler.archetypeGroupData": { text: "Group", isGroup: true, color: "blue" },


        });

   
    // Define a function for creating a "port" that is normally transparent.
    // The "name" is used as the GraphObject.portId, the "spot" is used to control how links connect
    // and where the port is positioned on the node, and the boolean "output" and "input" arguments
    // control whether the user can draw links from or to the port.
    function makePort(name: any, spot: any, output: any, input: any) {
      // the port is basically just a small transparent circle
      return $(go.Shape, "Circle",
        {
          fill: null,  // not seen, by default; set to a translucent gray by showSmallPorts, defined below
          stroke: null,
          desiredSize: new go.Size(7, 7),
          alignment: spot,  // align the port on the main Shape
          alignmentFocus: spot,  // just inside the Shape
          portId: name,  // declare this object to be a "port"
          fromSpot: spot, toSpot: spot,  // declare where links may connect at this port
          fromLinkable: output, toLinkable: input,  // declare whether the user may draw links to/from here
          cursor: "pointer"  // show a different cursor to indicate potential link point
        
        });
    }

    var nodeSelectionAdornmentTemplate =
      $(go.Adornment, "Auto",
        $(go.Shape, { fill: null, stroke: "deepskyblue", strokeWidth: 1.5, strokeDashArray: [4, 2] }),
        $(go.Placeholder)
      );

    var nodeResizeAdornmentTemplate =
      $(go.Adornment, "Spot",
        { locationSpot: go.Spot.Right },
        $(go.Placeholder),
        $(go.Shape, { alignment: go.Spot.TopLeft, cursor: "nw-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
        $(go.Shape, { alignment: go.Spot.Top, cursor: "n-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
        $(go.Shape, { alignment: go.Spot.TopRight, cursor: "ne-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),

        $(go.Shape, { alignment: go.Spot.Left, cursor: "w-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
        $(go.Shape, { alignment: go.Spot.Right, cursor: "e-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),

        $(go.Shape, { alignment: go.Spot.BottomLeft, cursor: "se-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
        $(go.Shape, { alignment: go.Spot.Bottom, cursor: "s-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
        $(go.Shape, { alignment: go.Spot.BottomRight, cursor: "sw-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" })
      );
    var nodeRotateAdornmentTemplate =
      $(go.Adornment,
        { locationSpot: go.Spot.Center, locationObjectName: "ELLIPSE" },
        $(go.Shape, "Ellipse", { name: "ELLIPSE", cursor: "pointer", desiredSize: new go.Size(7, 7), fill: "lightblue", stroke: "deepskyblue" }),
        $(go.Shape, { geometryString: "M3.5 7 L3.5 30", isGeometryPositioned: true, stroke: "deepskyblue", strokeWidth: 1.5, strokeDashArray: [4, 2] })
      );

    myDiagram.nodeTemplate =
      $(go.Node, "Spot",
        { locationSpot: go.Spot.Center },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        { selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate },
        { resizable: true, resizeObjectName: "PANEL", resizeAdornmentTemplate: nodeResizeAdornmentTemplate },
        { rotatable: true, rotateAdornmentTemplate: nodeRotateAdornmentTemplate },
        
        
        
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
              strokeWidth: 2,
              
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
        // four small named ports, one on each side:
        makePort("T", go.Spot.Top, false, true),
        makePort("L", go.Spot.Left, true, true),
        makePort("R", go.Spot.Right, true, true),
        makePort("B", go.Spot.Bottom, true, false),
        { // handle mouse enter/leave events to show/hide the ports
          mouseEnter: (e: any, node: any) => showSmallPorts(node, true),
          mouseLeave: (e: any, node: any) => showSmallPorts(node, false)
          ,
        },
        // {
        //   contextMenu:     // define a context menu for each node
        //     $("ContextMenu",  // that has one button
        //       $("ContextMenuButton",
        //         {
        //           "ButtonBorder.fill": "white",
        //           "_buttonFillOver": "skyblue"
        //         },
        //         $(go.TextBlock, "Delete Node"),
        //         {
        //           click: (e, obj) => e.diagram.commandHandler.deleteSelection()
        //         }), $("ContextMenuButton",
        //           {
        //             "ButtonBorder.fill": "white",
        //             "_buttonFillOver": "skyblue"
        //           },
        //           $(go.TextBlock, "Delete Node"),
        //           {
        //             click: (e, obj) => e.diagram.commandHandler.canUndo()
        //           })
        //       // more ContextMenuButtons would go here
        //     )  // end Adornment
        // }
      );

     

    // //Trying OUt my own context menu
    function CMButton(options: any) {
      return $(go.Shape,
        {
          fill: "orange", stroke: "gray", background: "transparent",
          geometryString: "F1 M0 0 M0 4h4v4h-4z M6 4h4v4h-4z M12 4h4v4h-4z M0 12",
          isActionable: true, cursor: "context-menu",
          click: (e: any, shape: any) => {
            e.diagram.commandHandler.showContextMenu(shape.part.adornedPart);
          }
        },
        options || {});
    }

    myDiagram.nodeTemplate.selectionAdornmentTemplate =
      $(go.Adornment, "Spot",
        $(go.Placeholder, { padding: 10 }),

        CMButton({ alignment: new go.Spot(0.75, 0) })
      );

    function ClickFunction(propname: any, value: any) {
      return (e: any, obj: any) => {
        e.handled = true;  // don't let the click bubble up
        e.diagram.model.commit((m: { set: (arg0: any, arg1: any, arg2: any) => void; }) => {
          m.set(obj.part.adornedPart.data, propname, value);
        });
      };
    }

    // Create a context menu button for setting a data property with a color value.
    


    function ColorButton(color: any, propname: any) {
      if (!propname) propname = "color";
      return $(go.Shape,
        {
          width: 16, height: 16, stroke: "lightgray", fill: color,
          margin: 1, background: "transparent",
          mouseEnter: (e: any, shape: any) => shape.stroke = "dodgerblue",
          mouseLeave: (e: any, shape: any) => shape.stroke = "lightgray",
          click: ClickFunction(propname, color), contextClick: ClickFunction(propname, color)
        });
    }

    function LightFillButtons() {  // used by multiple context menus
      return [
        $("ContextMenuButton",
          $(go.Panel, "Horizontal",
            ColorButton("white", "fill"), ColorButton("beige", "fill"), ColorButton("aliceblue", "fill"), ColorButton("lightyellow", "fill")
          )
        ),
        $("ContextMenuButton",
          $(go.Panel, "Horizontal",
            ColorButton("lightgray", "fill"), ColorButton("lightgreen", "fill"), ColorButton("lightblue", "fill"), ColorButton("pink", "fill")
          )
        )
      ];
    }

   


    



    myDiagram.nodeTemplate.contextMenu =
      $("ContextMenu",

        $("ContextMenuButton",
          {
            "ButtonBorder.fill": "white",
            "_buttonFillOver": "skyblue"
          },
          $(go.TextBlock, "Delete"),
          {
            click: (e, obj) => e.diagram.commandHandler.deleteSelection()
          }),
        $("ContextMenuButton",
          {
            "ButtonBorder.fill": "white",
            "_buttonFillOver": "skyblue"
          },
          $(go.TextBlock, "Cut"),
          {
            click: (e, obj) => e.diagram.commandHandler.cutSelection()
          }),
        $("ContextMenuButton",
          {
            "ButtonBorder.fill": "white",
            "_buttonFillOver": "skyblue"
          },
          $(go.TextBlock, "Paste"),
          {
            click: (e, obj) => e.diagram.commandHandler.pasteSelection()
          }),
          $("ContextMenuButton",
          {
            "ButtonBorder.fill": "white",
            "_buttonFillOver": "skyblue"
          },
          $(go.TextBlock, "Undo"),
          {
            click: (e, obj) => e.diagram.commandHandler.undo()
          }),
          $("ContextMenuButton",
          {
            "ButtonBorder.fill": "white",
            "_buttonFillOver": "skyblue"
          },
          $(go.TextBlock, "Redo"),
          {
            click: (e, obj) => e.diagram.commandHandler.redo()
          }),
          $("ContextMenuButton",
          {
            "ButtonBorder.fill": "white",
            "_buttonFillOver": "skyblue"
          },
          $(go.TextBlock, "GroupSelection"),
          {
            click: (e, obj) => e.diagram.commandHandler.groupSelection()
          }),
          $("ContextMenuButton",
          {
            "ButtonBorder.fill": "white",
            "_buttonFillOver": "skyblue"
          },
          $(go.TextBlock, "Property"),
          {
            click: (e, obj) => {
              this.flag = true;
            }
          }),
          
          $("ContextMenuButton",
          {
            "ButtonBorder.fill": "white",
            "_buttonFillOver": "skyblue"
            
          },
          $(go.TextBlock, "Change"),
          {
            click: (e, obj) => {   
              
              this.flag=false 
               var x = this.xaxis    
               var y = this.yaxis  
               var a = this.ag     
              myDiagram.model.setDataProperty(this.node, 'location', new go.Point(x, y));
              this.node.angle = a;              
            }
          }),
        LightFillButtons(),
      );
    myDiagram.contextMenu =
      $("ContextMenu",
        $("ContextMenuButton",
          {
            "ButtonBorder.fill": "white",
            "_buttonFillOver": "skyblue"
          },
          $(go.TextBlock, "Paste"),
          {
            click: (e, obj) => e.diagram.commandHandler.pasteSelection()
          }),
        $("ContextMenuButton",
          {
            "ButtonBorder.fill": "white",
            "_buttonFillOver": "skyblue"
          },
          $(go.TextBlock, "Undo"),
          {
            click: (e, obj) => e.diagram.commandHandler.undo()
          }),
        $("ContextMenuButton",
          {
            "ButtonBorder.fill": "white",
            "_buttonFillOver": "skyblue"
          },
          $(go.TextBlock, "Redo"),
          {
            click: (e, obj) => e.diagram.commandHandler.redo()
          }),
      );

    //end of my own custome menu



    function showSmallPorts(node: any, show: any) {
      node.ports.each((port: { portId: string; fill: string | null; }) => {
        if (port.portId !== "") {  // don't change the default port, which is the big shape
          port.fill = show ? "rgba(0,0,0,.3)" : null;
        }
      });
    }

    var linkSelectionAdornmentTemplate =
      $(go.Adornment, "Link",
        $(go.Shape,
          // isPanelMain declares that this Shape shares the Link.geometry
          { isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0 })  // use selection object's strokeWidth
      );

    myDiagram.linkTemplate =
      $(go.Link,  // the whole link panel
        { selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate },
        { relinkableFrom: true, relinkableTo: true, reshapable: true },
        {
          routing: go.Link.AvoidsNodes,
          curve: go.Link.JumpOver,
          corner: 5,
          toShortLength: 4
        },
        new go.Binding("points").makeTwoWay(),
        $(go.Shape,  // the link path shape
          { isPanelMain: true, strokeWidth: 2 }),
        $(go.Shape,  // the arrowhead
          { toArrow: "Standard", stroke: null }),
        $(go.Panel, "Auto",
          new go.Binding("visible", "isSelected").ofObject(),
          $(go.Shape, "RoundedRectangle",  // the link shape
            { fill: "#F8F8F8", stroke: null }),
          $(go.TextBlock,
            {
              textAlign: "center",
              font: "10pt helvetica, arial, sans-serif",
              stroke: "#919191",
              margin: 2,
              minSize: new go.Size(10, NaN),
              editable: true
            },
            new go.Binding("text").makeTwoWay())
        ),
        {
          contextMenu:     // define a context menu for each node
            $("ContextMenu",  // that has one button
              $("ContextMenuButton",
                {
                  "ButtonBorder.fill": "white",
                  "_buttonFillOver": "skyblue"
                },
                $(go.TextBlock, "Delete Link"),
                {
                  click: (e, obj) => e.diagram.commandHandler.deleteSelection()
                }),
              // more ContextMenuButtons would go here
            )  // end Adornment
        }
      );

    myDiagram.addDiagramListener('ChangedSelection', (e) => {
      this.node = e.diagram.selection.filter(p => p instanceof go.Node).first();
      const link = e.diagram.selection.filter(p => p instanceof go.Link).first();
      this.nodeClicked.emit(this.node);
      console.log("node angle:" + this.node?.angle);
      console.log("node name:" + link?.data);
      

    });

    // if(this.flag1 == 1){
      
    //   this.flag=false 
    //        var x = this.xaxis    
    //        var y = this.yaxis  
    //        var a = this.ag     
    //       myDiagram.model.setDataProperty(this.node, 'location', new go.Point(x, y));
    //       this.node.angle = a; 
    //     }
    

    // var inspector2 = new Inspector('myInspectorDiv2', myDiagram,
    // {
    //   // By default the inspector works on the Diagram selection.
    //   // This property lets us inspect a specific object by calling Inspector.inspectObject.
    //   inspectSelection: false,
    //   properties: {
    //     "text": {},
    //     // This property we want to declare as a color, to show a color-picker:
    //     "color": { type: 'color' },
    //     // key would be automatically added for node data, but we want to declare it read-only also:
    //     "key": { readOnly: true, show: Inspector.showIfPresent }
    //   }
    // });
    // inspector2.inspectObject(myDiagram.nodes.first().data);


    // load();

    // function save() {
    //   document.getElementById("mySavedModel").value = myDiagram.model.toJson();
    //   myDiagram.isModified = false;
    // }
    // function load() {
    //   myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
    // }
    // window.addEventListener('DOMContentLoaded', init);

  //  load();

  // function save() {
  //   this.jid = myDiagram.model.toJson();
  //   myDiagram.isModified = false;
  // }
  // function load() {
  //   myDiagram.model = go.Model.fromJson(this.jid);
  // }
  
  }

 

  
  // getloc(val : any){
  //   this.xaxis = parseInt(val); 
  // }
  
  // getkey(val : any){
  //   this.yaxis = parseInt(val);
  // }
  // getangle(val : any){
  //   this.ag = parseInt(val);
  
  // }

  getproperty(val : any, val1:any, val2:any){
     this.xaxis = parseInt(val); 
     this.yaxis = parseInt(val1);
     this.ag = parseInt(val2)
     this.flag1 = 1;
   }
  
  
 
}


