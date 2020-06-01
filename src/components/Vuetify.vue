<template>
  <v-app>
    <v-content>
      <v-container>
        <v-app-bar flat>
          <v-toolbar-title>
            <span class="logo">&#x1f68a;</span>
            <span class="logoleft">OEV</span>
            <span class="logoright">Tools</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <div class="pr-2">{{ subTitle }}</div>
          <v-avatar color="grey" size="35" dense title="Test-User">
            <v-icon dark dense>person</v-icon>
          </v-avatar>
        </v-app-bar>

        <v-form class="pt-6">
          <v-autocomplete
            label="Verbund auswählen"
            v-model="form.verbund"
            :items="this.form.verbuende"
            :disabled="form.verbuende.length === 0"
            required
            outlined
          ></v-autocomplete>

          <v-select
            label="TXT-Datei auswählen"
            v-model="form.file"
            :items="filesByVerbund"
            item-text="name"
            :disabled="form.verbund === ''"
            required
            outlined
            return-object
          ></v-select>

          <v-alert dense text v-bind:type="stateLastChange">&#160;{{lastChange}}</v-alert>

          <v-btn
            large
            color="primary"
            :disabled="form.file.length === 0"
            @click="onSubmit"
          >Konvertieren</v-btn>
        </v-form>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import moment from "moment";
import "moment/locale/de";

export default {
  name: "Vuetify",
  data() {
    return {
      subTitle: "DigiVerbund - MapInfo-CSV-Konverter",
      form: {
        file: "",
        verbund: "",
        files: {},
        verbuende: []
      }
    };
  },
  watch: {
    filesByVerbund: {
      handler: function() {
        this.form.file = "";
      }
    }
  },
  computed: {
    stateLastChange() {
      return this.form.file !== "" ? "info" : "hide";
    },
    lastChange() {
      if (this.form.file !== "") {
        let time = moment(this.form.file.lastchange, "YYYY-MM-DD hh:mm");
        return (
          "Letzte Änderung: " +
          time.from(moment()) +
          " am " +
          this.form.file.lastchange
        );
      } else {
        return "";
      }
    },
    filesByVerbund() {
      if (this.form.verbund !== "") {
        let key = this.form.verbund;
        return this.form.files[key];
      }
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form.file.name));
    }
  },
  created() {
    moment.locale("de");
    this.$emit("send", this.subTitle);
    this.form.files = getTxtFiles();
    this.form.verbuende = getVerbuende();
  }
};

function getVerbuende() {
  return ["avv", "rmv"];
}

function getTxtFiles() {
  return {
    avv: [
      { name: "avv1.txt", lastchange: "2020-05-02 12:32" },
      { name: "avv2.txt", lastchange: "2020-04-01 11:55" }
    ],
    rmv: [
      { name: "rmv1.txt", lastchange: "2020-05-29 08:14" },
      { name: "rmv2.txt", lastchange: "2020-05-28 16:09" }
    ]
  };
}
</script>
 
<style src="vuetify/dist/vuetify.min.css"></style>  
<style scoped>
.logo {
  font-size: 20pt;
}
.logoleft {
  font-size: 25pt;
  font-weight: 900;
  color: red;
}
.logoright {
  font-size: 25pt;
  font-weight: 600;
  color: #FF6666;
}

#content {
  text-align: center;
}
</style>
