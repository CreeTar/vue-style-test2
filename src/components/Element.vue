<template>
  <div id="content" class="pt-3">
    <div id="app">
      <table style="width: 100%; height: 50px; background-color: #efefef; padding: 5px;">
        <tr>
          <td>
            <span class="logo">&#x1f68a;</span>
            <span class="logoleft">OEV</span>
            <span class="logoright">Tools</span>
          </td>
          <td align="right">
            <span>{{ subTitle }}</span>
          </td>
          <td align="right" valign="center" style="vertical-alignment: top;">
            <el-avatar icon="el-icon-user-solid" class="float: right"></el-avatar>
          </td>
        </tr>
      </table>

      <br>
      <div>
        <el-form @submit="onSubmit">
          <el-container>
            <el-select
              v-model="form.file"
              id="verbund-name"
              required
              filterable
              :disabled="form.verbuende.length === 0"
              placeholder="Datei auswählen"
            >
              <el-option-group v-for="verbund in form.verbuende" :key="verbund" :label="verbund">
                <el-option
                  v-for="file in form.files[verbund]"
                  :key="file.name"
                  :label="file.name"
                  :value="file.name"
                >
                  <span style="float: left">{{ file.name }}</span>
                  <span
                    style="float: right; color: #8492a6; font-size: 13px"
                  >{{lastChange(file.lastchange)}}</span>
                </el-option>
              </el-option-group>
            </el-select>
          </el-container>
          <el-divider></el-divider>
          <el-button
            type="primary"
            :disabled="form.file.length === 0"
            @click="onSubmit"
          >Konvertieren</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/de";

export default {
  name: "Element",
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
      alert(JSON.stringify(this.form.file));
    },
    lastChange(lastchange) {
      let time = moment(lastchange, "YYYY-MM-DD hh:mm");
      return time.from(moment());
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
