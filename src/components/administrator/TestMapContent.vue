<template>
  <span>
    <div class="container mt-3 mt-sm-5">
  <div class="row">
    <div class="col-md-9">
      <div class="map" id="map"></div>
    </div>
    <div class="col-md-3">
      <div
        class="form-check"
        v-for="layer in layers"
        :key="layer.id"
      >
        <label class="form-check-label">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="layer.active"
            @change="layerChanged(layer.id, layer.active)"
          />
          {{ layer.name }}
        </label>
      </div>
    </div>
  </div>
</div>
  </span>
</template>

<script>
  const {restAPI}=require('../../assets/js/setup');
  const {globalSetup}=require('../../assets/js/setup');
  export default {
    name: "konten",
    data(){

      return{
        map: null,
        tileLayer: null,

      }
    },
    components: {

    },
    created(){

    },
    mounted() {
      this.initMap();
      this.initLayers();
    },
    methods: {
      layerChanged(layerId, active) {
        const layer = this.layers.find(layer => layer.id === layerId);

        layer.features.forEach((feature) => {
          if (active) {
            feature.leafletObject.addTo(this.map);
          } else {
            feature.leafletObject.removeFrom(this.map);
          }
        });
      },
      initLayers() {
        this.layers.forEach((layer) => {
          const markerFeatures = layer.features.filter(feature => feature.type === 'marker');
          const polygonFeatures = layer.features.filter(feature => feature.type === 'polygon');

          markerFeatures.forEach((feature) => {
            feature.leafletObject = L.marker(feature.coords)
              .bindPopup(feature.name);
          });

          polygonFeatures.forEach((feature) => {
            feature.leafletObject = L.polygon(feature.coords)
              .bindPopup(feature.name);
          });
        });
      },
      initMap() {
        this.map = L.map('map').setView([38.63, -90.23], 12);
        this.tileLayer = L.tileLayer(
          'http://167.205.7.235:8081/styles/dark-matter/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
          }
        );

        this.tileLayer.addTo(this.map);
      },
    }

  }
</script>

<style scoped>
  .map { height: 600px }
</style>
