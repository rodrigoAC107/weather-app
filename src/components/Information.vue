<template>
  <div v-if="getDataWeather" class="card">
    <div class="card-header">{{ hours }} - {{ date }}</div>
    <div class="card-body">
      <div
        class="d-flex flex-column justify-content-center align-items-center"
        style="height: 400px"
      >
        <h3 class="card-title text-center mb-2">
          {{ getDataWeather.name }}, {{ getDataWeather.sys.country }}
        </h3>
        <h4 class="card-text text-center my-2">
          Temp.: {{ getDataWeather.main.temp }}
        </h4>
        <h4 class="card-text text-center my-2">
          Temp. Max: {{ getDataWeather.main.temp_max }}
        </h4>
        <h4 class="card-text text-center my-2">
          Temp. Min: {{ getDataWeather.main.temp_min }}
        </h4>
        <div class="d-flex flex-row">
          <h4 class="card-text text-center m-3">
            Lat: {{ getDataWeather.coord.lat }}
          </h4>
          <h4 class="card-text text-center m-3">
            Lon: {{ getDataWeather.coord.lon }}
          </h4>
        </div>
      </div>
    </div>
    <div class="card-footer text-muted text-center p-0">
      <p class="mb-4">{{ getDegree | typeDegree }}</p>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  name: "Information",
  data() {
    return {
      hours: null,
      date: null,
    };
  },
  filters: {
    typeDegree: function (value) {
      return value === "standard"
        ? "Kelvin"
        : value === "metric"
        ? "Celcius"
        : "Fahrenheit";
    },
  },
  mounted() {
    let date = new Date();
    this.date = `${date.getFullYear()}-${this.addZero(date.getMonth() + 1)}-${this.addZero(date.getDate())}`;
    setInterval(() => {
      let hours = new Date();
      this.hours = `${this.addZero(hours.getHours())}:${this.addZero(hours.getMinutes())}:${this.addZero(hours.getSeconds())}`;
    }, 1000);
  },
  computed: {
    ...mapGetters(["getDataWeather", "getDegree"]),
  },
  methods: {
    addZero(value) {
      let data = value < 10 ? "0" + value : value;
      return data;
    },
  },
};
</script>

<style lang="scss">
.card {
  height: 500px;
  width: 500px;
  border-radius: 10px;
  opacity: 0.8;
}
</style>