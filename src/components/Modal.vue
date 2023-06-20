<template>
  <div>
    <v-dialog v-if="showDialog" v-model="showDialog" max-width="1400">
      <v-card>
        <v-card-title class="text-h4 mb-6"
          >{{ dialog_capt }} <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="showDialog = false">
            Close
          </v-btn>
        </v-card-title>
        <v-card-text class="black--text">
          <v-row>
            <v-col cols="12" lg="5">
              <div v-if="current_package != false">
                <p class="text-subtitle-1 font-weight-medium mb-0 mt-3">
                  Files
                </p>
                <div>
                  <list :data="current_package.files.files" />
                </div>
              </div>
            </v-col>
            <v-col cols="12" lg="7">
              <v-card class="mx-auto text-center pb-6 cyan darken-1">
                <div class="text-h6 white--text py-3 font-weight-light">
                  Using {{ dialog_capt }} via JSdelivr
                </div>
                <v-sheet
                  v-if="version_values != false"
                  class="v-sheet--offset mx-auto"
                  color="cyan accent-4"
                  max-width="calc(100% - 32px)"
                >
                  <v-sparkline
                    :labels="version_labels"
                    :value="version_values"
                    color="white"
                    line-width="1"
                    stroke-linecap="round"
                    width="400"
                    padding="16"
                    label-size="6"
                    :auto-draw="true"
                  >
                  </v-sparkline>
                </v-sheet>
                <div v-else class="white--text">
                  This version does not have analytics from CDN
                </div>
              </v-card>
              <div v-if="current_package != false">
                <p class="text-subtitle-1 font-weight-medium mb-0 mt-3">
                  CDN link:
                </p>
                <a
                  :href="
                    'https://cdn.jsdelivr.net/npm/' +
                    current_package.name +
                    '@' +
                    current_package.version +
                    current_package.files.default
                  "
                  target="_blank"
                  class="mb-0 text-body-2"
                  v-if="current_package.files.default != null"
                >
                  https://cdn.jsdelivr.net/npm/{{
                    current_package.name +
                    "@" +
                    current_package.version +
                    current_package.files.default
                  }}
                </a>
                <p class="mb-0 text-body-2" v-else>no link :(</p>
                <p class="text-subtitle-1 font-weight-medium mb-0 mt-3">
                  Author:
                </p>
                <a
                  :href="
                    'https://www.npmjs.com/~' + current_package.author.username
                  "
                  target="_blank"
                  >{{ current_package.author.username }}</a
                >
                <br />
                <a :href="'mailto:' + current_package.author.email">{{
                  current_package.author.email
                }}</a>
                <p class="text-subtitle-1 font-weight-medium mb-0 mt-3">
                  Description:
                </p>
                <p class="mb-0 text-body-2">{{ current_package.desc }}</p>
                <p class="text-subtitle-1 font-weight-medium mb-0 mt-3">
                  Links:
                </p>
                <div v-for="(link, name) in current_package.links" :key="name">
                  <a :href="link" target="_blank">{{ name }}</a>
                </div>
                <p class="text-subtitle-1 font-weight-medium mb-0 mt-3">
                  Other versions:
                </p>
                <div
                  v-for="(version, type) in current_package.versions"
                  :key="type"
                >
                  <span class="text-body-2 mb-0">{{ type }}</span> :
                  {{ version }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import List from "./List.vue";

export default {
  name: "Modal",
  components: { List },
  data: () => ({}),
  props: {
    show: Boolean,
    overlay: Boolean,
  },
  computed: {
    ...mapGetters(["current_package"]),
    showDialog: {
      get: function () {
        return this.show;
      },
      set: function (value) {
        this.$emit("update:show", value);
      },
    },
    showOverlay: {
      get: function () {
        return this.overlay;
      },
      set: function (value) {
        this.$emit("update:overlay", value);
      },
    },
    version_values() {
      return this.current_package != false &&
        Object.prototype.hasOwnProperty.call(
          this.current_package.stats.versions,
          this.current_package.version
        )
        ? Object.values(
            this.current_package.stats.versions[this.current_package.version]
              .dates
          )
        : false;
    },
    version_labels() {
      return this.current_package != false &&
        Object.prototype.hasOwnProperty.call(
          this.current_package.stats.versions,
          this.current_package.version
        )
        ? Object.keys(
            this.current_package.stats.versions[this.current_package.version]
              .dates
          )
        : false;
    },
    dialog_capt() {
      return this.current_package !== false
        ? this.current_package.name + " " + this.current_package.version
        : "";
    },
  },
};
</script>