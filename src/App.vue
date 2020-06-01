<template>
  <div id="app">
    <table>
      <tr>
        <td valign="top">
          <h3 style="background-color: silver; padding: 15px; color: white; ">Element</h3>
          <Element style="border: 1px solid black;" class="mt-3"/>
        </td>
      </tr>

      <tr>
        <td valign="top">
          <h3 style="background-color: silver; padding: 15px; color: white; ">Vuetify</h3>
          <Vuetify style="border: 1px solid black;"/>
        </td>
      </tr>
    </table>
  </div>
</template>
  
<script>
import Element from "./components/Element";
import Vuetify from "./components/Vuetify";

export default {
  name: "App",
  components: {
    Element,
    Vuetify
  }
};
</script>

<style>
#app {
  font-family: "Bahnschrift";
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin: 20px;
  width: 700px;
  display: inline-block;
}
</style>
