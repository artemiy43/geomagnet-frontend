import React, { useRef } from "react";
import { loadModules } from "esri-loader";

function ZDMap(props) {
  const num = props.num;
  const mapRef = useRef(null);
  
  React.useEffect(()=> {
    loadModules(
      [
        "esri/widgets/Search",
        "esri/Map",
        "esri/views/SceneView",
        "esri/config",
        "esri/geometry/support/webMercatorUtils",
        "esri/Graphic",
        "esri/geometry/Polyline",
        "esri/symbols/SimpleLineSymbol",
        "esri/geometry/Point"
      ],
      {
        css: true
      }
    ).then(
      ([
        Search,
        Map,
        SceneView,
        esriConfig,
        webMercatorUtils,
        Graphic,
        Polyline,
        SimpleLineSymbol,
        Point
        ]) => {

        const map = new Map({
          basemap: "topo-vector",
          ground: "world-elevation"
        });

        esriConfig.apiKey = "AAPKc299fdea835641dd9348a853988d63168l5eW0o90eVgK6I5TXTdV1beR8AfCAhpfVYB9Mn9jE7VsTkoi_bv6yZkMzg4TUaX";

        const view = new SceneView({
          container: "webmap", // Reference to the scene div created in step 5
          map: map, // Reference to the map object created before the scene
          scale: 50000000, // Sets the initial scale to 1:50,000,000
          center: [0, 0],
        });
        

        const search = new Search({  //Add Search widget
          view: view
        });

        var paths = [
          [
            [-180, 0],
            [0, 0],
            [180, 0]
          ]
        ];
         
        var line = new Polyline({
          hasZ: false,
          hasM: true,
          paths: paths,
          spatialReference: { wkid: 4326 }
        });

        var lineSymbol = new SimpleLineSymbol({
          color: [226, 119, 40],  // RGB color values as an array
          width: 3
        });

        var lineAtt = {
          Name: "Equator"
        };

        var polylineGraphic = new Graphic({
          geometry: line,   // Add the geometry created in step 4
          symbol: lineSymbol,   // Add the symbol created in step 5
          attributes: lineAtt   // Add the attributes created in step 6
        });

        let allPoints = [];
        for (let i=-90;i<90;i=i+5)
        {
          var pathss = [
            [
              [-180, i],
              [0, i],
              [180, i]
            ]
          ];
          
          var lines = new Polyline({
            hasZ: false,
            hasM: true,
            paths: pathss,
            spatialReference: { wkid: 4326 }
          });
  
          var lineSymbols = new SimpleLineSymbol({
            color: [226, 119, 40],  // RGB color values as an array
            width: 1
          });
  
          var lineAtts = {
            Name: "Equator"
          };
  
          var polylineGraphics = new Graphic({
            geometry: lines,   // Add the geometry created in step 4
            symbol: lineSymbols,   // Add the symbol created in step 5
            attributes: lineAtts   // Add the attributes created in step 6
          });
          allPoints.push(polylineGraphics);
        }

        let allPointss = [];
        for (let i=-180;i<180;i=i+5)
        {
          var pathsss = [
            [
              [i, -90],
              [i, 0],
              [i, 90]
            ]
          ];
          
          var liness = new Polyline({
            hasZ: false,
            hasM: true,
            paths: pathsss,
            spatialReference: { wkid: 4326 }
          });
  
          var lineSymbolss = new SimpleLineSymbol({
            color: [226, 119, 40],  // RGB color values as an array
            width: 1
          });
  
          var lineAttss = {
            Name: "Equator"
          };
  
          var polylineGraphicss = new Graphic({
            geometry: liness,   // Add the geometry created in step 4
            symbol: lineSymbolss,   // Add the symbol created in step 5
            attributes: lineAttss   // Add the attributes created in step 6
          });
          allPointss.push(polylineGraphicss);
        }

          var pathsPoleS = [
            [
              [-180, -66],
              [0, -66],
              [180, -66]
            ]
          ];
           
          var linePoleS = new Polyline({
            hasZ: false,
            hasM: true,
            paths: pathsPoleS,
            spatialReference: { wkid: 4326 }
          });
  
          var lineSymbolPoleS = new SimpleLineSymbol({
            color: [226, 119, 40],  // RGB color values as an array
            width: 10
          });
  
          var lineAttPoleS = {
            Name: "South Pole"
          };
  
          var polylineGraphicPoleS = new Graphic({
            geometry: linePoleS,   // Add the geometry created in step 4
            symbol: lineSymbolPoleS,   // Add the symbol created in step 5
            attributes: lineAttPoleS   // Add the attributes created in step 6
          });
  
          var pathsPoleN = [
            [
              [-180, 66],
              [0, 66],
              [180, 66]
            ]
          ];
           
          var linePoleN = new Polyline({
            hasZ: false,
            hasM: true,
            paths: pathsPoleN,
            spatialReference: { wkid: 4326 }
          });
  
          var lineSymbolPoleN = new SimpleLineSymbol({
            color: [226, 119, 40],  // RGB color values as an array
            width: 10
          });
  
          var lineAttPoleN = {
            Name: "North Pole"
          };
  
          var polylineGraphicPoleN = new Graphic({
            geometry: linePoleN,   // Add the geometry created in step 4
            symbol: lineSymbolPoleN,   // Add the symbol created in step 5
            attributes: lineAttPoleN   // Add the attributes created in step 6
          });
  
          const point1 = new Point({
            longitude: 0,
            latitude: 1
          });
  
          // Create a symbol for drawing the point
          const textSymbol1 = {
            type: "text", // autocasts as new TextSymbol()
            color: "#7A003C",
            text: "Equator", // esri-icon-map-pin
            font: {
              // autocasts as new Font()
              size: 16,
              family: "CalciteWebCoreIcons"
            }
          };
  
          const point2 = new Point({
            longitude: 0,
            latitude: 68
          });
  
          // Create a symbol for drawing the point
          const textSymbol2 = {
            type: "text", // autocasts as new TextSymbol()
            color: "#7A003C",
            text: "North Pole", // esri-icon-map-pin
            font: {
              // autocasts as new Font()
              size: 16,
              family: "CalciteWebCoreIcons"
            }
          };
  
          const point3 = new Point({
            longitude: 0,
            latitude: -68
          });
  
          // Create a symbol for drawing the point
          const textSymbol3 = {
            type: "text", // autocasts as new TextSymbol()
            color: "#7A003C",
            text: "South Pole", // esri-icon-map-pin
            font: {
              // autocasts as new Font()
              size: 16,
              family: "CalciteWebCoreIcons"
            }
          };
  
          const pointGraphic1 = new Graphic({
            geometry: point1,
            symbol: textSymbol1
          });
  
          const pointGraphic2 = new Graphic({
            geometry: point2,
            symbol: textSymbol2
          });
  
          const pointGraphic3 = new Graphic({
            geometry: point3,
            symbol: textSymbol3
          });
        

        for (let i = 0; i < allPoints.length; i++) {
          view.graphics.add(allPoints[i]);
        }
        for (let i = 0; i < allPointss.length; i++) {
          view.graphics.add(allPointss[i]);
        }
        view.graphics.add(polylineGraphic);
        view.graphics.add(polylineGraphicPoleS);
        view.graphics.add(polylineGraphicPoleN);
        view.graphics.add(pointGraphic1);
        view.graphics.add(pointGraphic2);
        view.graphics.add(pointGraphic3);
        
        view.ui.add(search, "top-leading");

        function showCoordinates(evt) {
          
          var point = view.toMap({x: evt.x, y: evt.y});
          
          if (point!==null) {
            var mp = webMercatorUtils.webMercatorToGeographic(point);

            view.popup.open({
                title: "Ширина: " + mp.x.toFixed(3) + "   Долгота:" + mp.y.toFixed(3),
                location: point
            });
          }
        }
  
        view.when(function(){
          
          view.on("pointer-move", showCoordinates);
        });


        view.on("click", function(event) {
          var point = view.toMap({x: event.x, y: event.y});
          
          if (point!==null) {
            props.onClick(event.mapPoint.latitude.toFixed(12),event.mapPoint.longitude.toFixed(12));
          }
        });
      })
    },[num]);

      return (
        <div id="webmap" className="webmap" ref={mapRef} />
      );
}
export default ZDMap;