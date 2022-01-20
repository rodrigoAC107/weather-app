<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <p class="navbar-brand p-0 m-0 mx-2">Weather App</p>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" @click="changeUnits('imperial')">
            <p class="nav-link p-0 m-0 mx-2">Fahrenheit</p>
          </li>
          <li class="nav-item" @click="changeUnits('metric')">
            <p class="nav-link p-0 m-0 mx-2">Celsius</p>
          </li>
          <li class="nav-item" @click="changeUnits('standard')">
            <p class="nav-link p-0 m-0 mx-2">Kelvin</p>
          </li>
        </ul>
        <div class="d-flex">
          <input
            @keyup.enter="setCountry"
            v-model="country"
            class="form-control me-2"
            type="search"
            placeholder="Madrid, ES"
            aria-label="Search"
          />
          <button class="btn btn-outline-secondary" @click="setCountry">
            Search
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>


<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "NavBar",
  data() {
    return {
      country: "Salta, AR",
      degree: "metric",
    };
  },
  computed: {
    ...mapGetters(["getDegree"]),
  },
  async mounted() {
    this.getDataWeather({"country": this.country, "degree": this.degree});
  },
  methods: {
    ...mapActions(["getDataWeather"]),
    ...mapMutations(['SET_DEGREE']),
    setCountry() {
      this.getDataWeather({"country": this.country, "degree": this.degree})
    },
    changeUnits(item){
        this.SET_DEGREE(item);
        this.degree = item;
        this.getDataWeather({"country": this.country, "degree": this.degree})
    }
  },
};
</script>

<style lang="scss">
.navbar {
  opacity: 0.8;
  .nav-item .nav-link:hover,
  .navbar-brand:hover {
    cursor: pointer;
    color: #000000;
  }
}
</style>