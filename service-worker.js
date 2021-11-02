importScripts('assets/vendor/workbox-6.3.0/workbox-sw.js');

workbox.setConfig({
  debug: false,
  modulePathPrefix: 'assets/vendor/workbox-6.3.0/'
});

workbox.precaching.precacheAndRoute([
  {url: 'index.html', revision: '10.01.21.1'},
  {url: 'manifest.json', revision: '10.01.21.1'},
  {url: 'assets/js/app.js', revision: '10.28.21.1'},
  {url: 'assets/css/app.css', revision: '10.01.21.1'},
  {url: 'assets/img/apple-touch-icon.png', revision: '10.01.21.1'},
  {url: 'assets/img/favicon-32x32.png', revision: '10.01.21.1'},
  {url: 'assets/img/favicon-16x16.png', revision: '10.01.21.1'},
  {url: 'assets/vendor/icomoon/style.css', revision: '10.01.21.1'},
  {url: 'assets/vendor/icomoon/fonts/icomoon.ttf', revision: '10.01.21.1'},
  {url: 'assets/vendor/icomoon/fonts/icomoon.woff', revision: '10.01.21.1'},
  {url: 'assets/vendor/sqljs-1.6.2/sql-wasm.js', revision: '10.01.21.1'},
  {url: 'assets/vendor/sqljs-1.6.2/sql-wasm.wasm', revision: '10.01.21.1'},
  {url: 'assets/vendor/leaflet-1.7.1/images/layers.png', revision: '10.01.21.1'},
  {url: 'assets/vendor/leaflet-1.7.1/images/layers-2x.png', revision: '10.01.21.1'},
  {url: 'assets/vendor/leaflet-1.7.1/images/marker-icon.png', revision: '10.01.21.1'},
  {url: 'assets/vendor/leaflet-1.7.1/images/marker-icon-2x.png', revision: '10.01.21.1'},
  {url: 'assets/vendor/leaflet-1.7.1/images/marker-shadow.png', revision: '10.01.21.1'},
  {url: 'assets/vendor/leaflet-1.7.1/leaflet.css', revision: '10.01.21.1'},
  {url: 'assets/vendor/leaflet-1.7.1/leaflet.js', revision: '10.01.21.1'},
  {url: 'assets/vendor/leaflet-locatecontrol-0.74.0/L.Control.Locate.min.css', revision: '10.01.21.1'},
  {url: 'assets/vendor/leaflet-locatecontrol-0.74.0/L.Control.Locate.min.js', revision: '10.01.21.1'},
  {url: 'assets/vendor/leaflet-mbtiles/Leaflet.TileLayer.MBTiles.js', revision: '10.01.21.1'},
  {url: 'data/trail_map.mbtiles', revision: '11.2.21.1'}
], {
  // Ignore all URL parameters.
  ignoreURLParametersMatching: [/.*/]
});