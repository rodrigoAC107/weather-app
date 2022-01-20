<template>
  <div class="weather" :style="{ 'background-image': 'url(' + img + ')' }">
    <nav-bar />
    <div
      class="d-flex justify-content-center align-items-center"
      style="height: 80vh"
    >
      <information />
    </div>
  </div>
</template>

<script>
import Information from "../components/Information.vue";
import NavBar from "../components/NavBar.vue";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  components: { NavBar, Information },
  name: "Weather",
  data() {
    return {
      img: require("../assets/img/Verano-Invierno.jpg"),
    };
  },
  computed: {
    ...mapGetters(["getDataWeather", "getDegree"]),
  },
  watch: {
    getDataWeather() {
      this.changeImage();
    },
  },
  methods: {
    async changeImage() {
      const URL_GEONAME = process.env.VUE_APP_GEONMES;
      let lat = this.getDataWeather.coord.lat;
      let lon = this.getDataWeather.coord.lon;
      const { data } = await axios.get(
        `${URL_GEONAME}?lat=${lat}&lng=${lon}&username=arodrigo`
      );
      let newHour = new Date(data.time);

      let temp =
        this.getDegree === "imperial"
          ? (this.getDataWeather.main.temp - 32) * (5 / 9)
          : this.getDegree === "standard"
          ? this.getDataWeather.main.temp - 273.15
          : this.getDataWeather.main.temp;

      if (
        Math.abs(temp) > 20 &&
        (newHour.getHours() > 18 || newHour.getHours() < 5)
      ) {
        this.img = require("../assets/img/Verano-Noche.jpg");
      } else if (
        Math.abs(temp) > 20 &&
        (newHour.getHours() < 18 || newHour.getHours() > 5)
      ) {
        this.img = require("../assets/img/Verano-Dia.jpg");
      } else if (
        Math.abs(temp) < 20 &&
        (newHour.getHours() > 18 || newHour.getHours() < 5)
      ) {
        this.img = require("../assets/img/Invierno-Noche.jpg");
      } else if (
        Math.abs(temp) < 20 &&
        (newHour.getHours() < 18 || newHour.getHours() > 5)
      ) {
        this.img = require("../assets/img/Invierno-Dia.jpg");
      }
    },
  },
};
</script>

<style lang="scss">
.weather {
  height: 100vh;
  max-height: 100%;
  background: no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>