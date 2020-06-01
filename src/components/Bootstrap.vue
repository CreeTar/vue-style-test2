<template>
  <div id="content" class="pt-3">
    <div id="app">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          <span class="logo">&#x1f68a;</span>
          <span class="logoleft">OEV</span>
          <span class="logoright">Tools</span>
        </a>

        <div class="ml-auto">
          <div>{{ subTitle }}</div>
        </div>

        <button class="ml-2 btn btn-danger btn-sm">Logout</button>
      </nav>

      <div>
        <form @submit="onSubmit">
          <div
            class="form-group mt-4"
            id="input-group-file"
            label="Verbund auswählen:"
            label-for="verbund-name"
          >
            <select
              id="verbund-name"
              v-model="form.verbund"
              :options="form.verbuende"
              :disabled="form.verbuende.length === 1"
              required
            ></select>
          </div>

          <div
            class="form-group mt-3"
            id="input-group-file"
            label="TXT-Datei auswählen:"
            label-for="txt-file"
          >
            <select
              class="form-control"
              id="txt-file"
              v-model="form.file"
              :options="filesByVerbund"
              required
              :disabled="form.verbund === ''"
            ></select>
          </div>

          <alert v-bind:show="stateLastChange">
            <b-icon class="mr-3" icon="info-circle-fill"></b-icon>
            {{lastChange}}
          </alert>

          <button
            class="mt-1 btn btn-primary"
            type="submit"
            :disabled="form.file.length === 0"
            variant="primary"
          >Konvertieren</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/de";

export default {
  name: "Bootstrap",
  data() {
    return {
      subTitle: "DigiVerbund - MapInfo-CSV-Konverter",
      form: {
        file: "",
        verbund: "",
        files: {
          undefined: [{ value: "", text: "Bitte TXT-Datei auswählen" }]
        },
        verbuende: [{ value: "", text: "Bitte Verbund auswählen" }]
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
      return this.form.file !== "";
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
      let entries = this.form.files["undefined"];
      if (this.form.verbund === "") {
        return entries;
      } else {
        let key = this.form.verbund;
        return entries.concat(this.form.files[key]);
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
    this.form.files = { ...getTxtFiles(), ...this.form.files };
    this.form.verbuende = this.form.verbuende.concat(getVerbuende());
  }
};

function getVerbuende() {
  return [{ value: "avv", text: "avv" }, { value: "rmv", text: "rmv" }];
}

function getTxtFiles() {
  return {
    avv: [
      {
        value: { name: "avv1.txt", lastchange: "2020-05-02 12:32" },
        text: "avv1.txt"
      },
      {
        value: { name: "avv2.txt", lastchange: "2020-04-01 11:55" },
        text: "avv2.txt"
      }
    ],
    rmv: [
      {
        value: { name: "rmv1.txt", lastchange: "2020-05-29 08:14" },
        text: "rmv1.txt"
      },
      {
        value: { name: "rmv2.txt", lastchange: "2020-05-28 16:09" },
        text: "rmv2.txt"
      }
    ]
  };
}
</script>

<style scoped src="bootstrap/dist/css/bootstrap.min.css"></style>
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
