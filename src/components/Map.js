import React from "react";
import { useRef } from "react";
import { loadModules } from "esri-loader";
function Maps(props) {
  const num = props.num;
  const mapRef = useRef(null);
  React.useEffect(()=> {
    loadModules(
      [
        "esri/widgets/Search",
        "esri/Map",
        "esri/views/MapView",
        "esri/rest/locator",
        "esri/config",
        "esri/widgets/BasemapGallery",
        "esri/widgets/Expand",
        "esri/geometry/support/webMercatorUtils"
      ],
      {
        css: true
      }
    ).then(
      ([
        Search,
        Map,
        MapView,
        locator,
        esriConfig,
        BasemapGallery,
        Expand,
        webMercatorUtils
        ]) => {
        //const serviceUrl = "http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";

        const map = new Map({
          basemap: "arcgis-navigation"
        });

        esriConfig.apiKey = "AAPKc299fdea835641dd9348a853988d63168l5eW0o90eVgK6I5TXTdV1beR8AfCAhpfVYB9Mn9jE7VsTkoi_bv6yZkMzg4TUaX";

        let view = new MapView({
          container: mapRef.current,
          map: map,
          center: [76.057852574651, 17.145581642251],
          zoom: 3
        });

        const search = new Search({  //Add Search widget
          view: view
        });

        view.ui.add(search, "top-leading");

        var basemapGallery = new BasemapGallery({
          view: view
        });

        const bgExpand = new Expand({
          view: view,
          content: basemapGallery
        });


        view.ui.add(bgExpand, "bottom-left");

        function showCoordinates(evt) {
          var point = view.toMap({x: evt.x, y: evt.y});
          
          var mp = webMercatorUtils.webMercatorToGeographic(point);

          view.popup.open({
              title: "Ширина: " + mp.x.toFixed(3) + "   Долгота:" + mp.y.toFixed(3),
              location: point
            });
        }
  
        view.when(function(){
          
          view.on("pointer-move", showCoordinates);
        });

        view.on("click", function(event) {
          // api.getInfo(event.mapPoint.latitude.toFixed(12),event.mapPoint.longitude.toFixed(12), props.epoha, props.year)
          // .then((res) => {
          //   console.log(res);
          //   props.onClickMap(res);
          // })
          // .catch(err => {
          //   console.log(err);
          // });
          props.onClick(event.mapPoint.latitude.toFixed(12),event.mapPoint.longitude.toFixed(12));
        });
      })
    },[num]);

      return (
        <div className="webmap" ref={mapRef} />
      );
}

  export default Maps;