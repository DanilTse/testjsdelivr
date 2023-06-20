<template>
  <div>
    <v-card>
      <v-card-text >
        <v-treeview :items="data" item-children="files" open-on-click>
          <template v-slot:prepend="{ item, open }">
            <v-icon color="cyan darken-1" v-if="item.type == 'directory'">
              {{ open ? "mdi-folder-open" : "mdi-folder" }}
            </v-icon>
            <v-icon color="cyan" v-else> mdi-file-document-outline </v-icon>
          </template>
        </v-treeview>
        </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "List",
  data: () => ({}),
  props: ["data"],
};
</script>