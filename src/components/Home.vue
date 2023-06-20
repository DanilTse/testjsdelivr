<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-row class="align-center">
              <v-col cols="12" md="6">
                {{ capt }}
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  outlined
                  label="Search npm packages"
                  hide-details=""
                  color="cyan darken-4"
                  v-debounce:400ms="startSearch"
                  v-model="search_query"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-title>
          <v-data-table
            :items="table_data"
            :headers="table_headers"
            :loading="loading"
            hide-default-footer
            height="530"
            @click:row="showDialog"
          >
          </v-data-table>
          <div class="mt-7 pb-7" v-if="page_count > 0">
            <v-pagination
              v-model="page"
              :length="page_count"
              :total-visible="pagination_visible_count"
              color="cyan darken-4"
              @input="startSearch(true)"
            ></v-pagination>
          </div>
        </v-card>
        <modal v-bind:show.sync="dialog" v-bind:overlay.sync="overlay" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import Modal from "./Modal.vue";
export default {
  name: "Home",
  components: { Modal },
  data: () => ({
    dialog: false,
    search_query: null,
    loading: false,
    page_count: 0,
    page: 1,
    step: 10,
    draw: true,
    capt: "Search",
    dialog_capt: "",
    overlay: false,
    windowWidth: window.innerWidth,
    table_headers: [
      {
        text: "Name",
        value: "name",
      },
      {
        text: "Version",
        value: "version",
      },
      {
        text: "Description",
        value: "desc",
      },
    ],
  }),
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  computed: {
    ...mapGetters(["table_data", "current_package"]),
    offset() {
      return this.page == 1 ? 0 : (this.page - 1) * this.step;
    },
    pagination_visible_count() {
      return this.windowWidth >= 768 ? 7 : 4;
    },
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    startSearch(is_paginate) {
      if (typeof is_paginate === "boolean" && is_paginate === false) {
        this.page = 1;
      }
      this.loading = true;
      this.$store.dispatch("resetTableData");
      let query =
        "https://registry.npmjs.org/-/v1/search?text=<" +
        this.search_query +
        ">&size=" +
        this.step;
      if (this.offset != 0) {
        query += "&from=" + this.offset;
      }
      this.axios
        .get(query)
        .then(
          (response) => (
            this.createDataTable(response.data), (this.loading = false)
          )
        );
    },
    createDataTable(data) {
      this.capt = "Finded " + data.total + " packages";
      this.pageCount(data.total);
      let table_data = [];
      data.objects.forEach((element, index) => {
        let newObj = {
          name: element.package.name,
          author: element.package.publisher,
          version: element.package.version,
          desc: element.package.description,
          links: element.package.links,
        };
        this.$set(table_data, index, newObj);
      });
      this.$store.dispatch("setTableData", table_data);
    },
    pageCount(total) {
      this.page_count = Math.ceil(total / 10);
    },
    showDialog(item) {
      this.overlay = true;
      this.axios
        .all([
          this.axios.get(
            "https://data.jsdelivr.com/v1/package/npm/" +
              item.name +
              "/stats/week"
          ),
          this.axios.get(
            "https://data.jsdelivr.com/v1/package/npm/" + item.name
          ),
          this.axios.get(
            "https://data.jsdelivr.com/v1/package/npm/" +
              item.name +
              "@" +
              item.version
          ),
        ])
        .then(
          this.axios.spread((stats, versions, files) => {
            item.stats = stats.data;
            item.versions = versions.data.tags;
            item.files = files.data;
            this.$store.dispatch("setCurrentPackage", item);
            this.overlay = false;
            this.dialog = true;
          })
        )
        .catch((err) => {
          console.log("Упс", err);
        });
    },
  },
};
</script>