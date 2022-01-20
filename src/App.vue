<template>
  <div id="app">
    <weather />
  </div>
</template>

<script>
import Weather from "./views/Weather.vue";

export default {
  name: "App",
  components: {
    Weather,
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
