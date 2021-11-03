const map = L.map("map", {
  zoomSnap: L.Browser.mobile ? 0 : 1,
  tap: (L.Browser.safari && !L.Browser.mobile) ? false : true,
  maxZoom: 22,
  zoomControl: false
}).fitWorld();
map.attributionControl.setPrefix("");

const layers = {
  basemaps: {
    "Streets": L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.@2xpng", {
      maxNativeZoom: 18,
      maxZoom: map.getMaxZoom(),
      attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a href="https://carto.com/attribution">CARTO</a>',
    }),
    "Aerial": L.tileLayer("https://orthos.its.ny.gov/arcgis/rest/services/wms/2017/MapServer/tile/{z}/{y}/{x}", {
      maxNativeZoom: 18,
      maxZoom: map.getMaxZoom(),
      attribution: "NYS ITS - GPO",
    }),
    "Topo": L.tileLayer("https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}", {
      maxNativeZoom: 16,
      maxZoom: map.getMaxZoom(),
      attribution: "USGS",
    }),
    "Winter Trails Map": L.tileLayer.mbTiles("data/trail_map_winter.mbtiles", {
      autoScale: true,
      updateWhenIdle: false
    }).once("databaseloaded", (e) => {
      layers.basemaps["Winter Trails Map"].bringToFront();
      map.removeLayer(layers.basemaps["Winter Trails Map"])
    }).addTo(map),
    "Summer Trails Map": L.tileLayer.mbTiles("data/trail_map.mbtiles", {
      autoScale: true,
      fitBounds: true,
      updateWhenIdle: false
    }).on("databaseloaded", (e) => {
      map.setMaxBounds(L.latLngBounds(layers.basemaps["Summer Trails Map"].options.bounds).pad(0.1));
      controls.locateCtrl.start();
    })
  }
};

/*** Begin Zoom Extent Control ***/
L.Control.ZoomExtent = L.Control.extend({
  onAdd: function(map) {    
    const div = L.DomUtil.create("div", "leaflet-bar leaflet-control");
    div.innerHTML = `
      <a class='leaflet-bar-part leaflet-bar-part-single zoom-extent-btn' title='Zoom To Map' onclick='ZoomToExtent();'>
        <i class='icon-zoom_out_map'></i>
      </a>
    `;
    L.DomEvent.on(div, "click", function (e) {
      L.DomEvent.stopPropagation(e);
    });
    return div
  }
});

L.control.zoomextent = (opts) => {
  return new L.Control.ZoomExtent(opts);
}
/*** End custom control ***/

const controls = {
  layerCtrl: L.control.layers(layers.basemaps, null, {
    collapsed: true,
    position: "topright"
  }).addTo(map),

  zoomCtrl: L.control.zoomextent({
    position: "bottomright"
  }).addTo(map),

  locateCtrl: L.control.locate({
    icon: "icon-gps_fixed",
    iconLoading: "spinner icon-gps_fixed",
    setView: "untilPan",
    cacheLocation: true,
    position: "bottomright",
    flyTo: false,
    keepCurrentZoomLevel: true,
    circleStyle: {
      interactive: false
    },
    markerStyle: {
      interactive: true
    },
    metric: false,
    strings: {
      title: "My location",
      outsideMapBoundsMsg: "You seem to be located outside the map boundary!",
      popup: (options) => {
        const loc = controls.locateCtrl._marker.getLatLng();
        return `<div style="text-align: center;">You are within ${Number(options.distance).toLocaleString()} ${options.unit}<br>from <strong>${loc.lat.toFixed(6)}</strong>, <strong>${loc.lng.toFixed(6)}</strong></div>`;
      }
    },
    locateOptions: {
      enableHighAccuracy: true,
      maxZoom: 18
    },
    onLocationOutsideMapBounds: function(control) {
      // control.stop();
      // alert(control.options.strings.outsideMapBoundsMsg);
    },
    onLocationError: (e) => {
      hideLoader();
      document.querySelector(".leaflet-control-locate").getElementsByTagName("span")[0].className = "icon-gps_off";
      alert(e.message);
    }
  }).addTo(map),

  scaleCtrl: L.control.scale({
    position: "bottomleft"
  }).addTo(map)
};

function ZoomToExtent() {
  map.fitBounds(layers.basemaps["Summer Trails Map"].options.bounds);
}

function showLoader() {
  document.getElementById("progress-bar").style.display = "block";
}

function hideLoader() {
  document.getElementById("progress-bar").style.display = "none";
}

initSqlJs({
  locateFile: function() {
    return "assets/vendor/sqljs-1.6.2/sql-wasm.wasm";
  }
}).then(function(SQL){
  hideLoader();
  layers.basemaps["Summer Trails Map"].addTo(map);
});