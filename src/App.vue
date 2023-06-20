<template>
  <v-app>
    <v-main>
      <Home/>
    </v-main>
    <v-footer color="cyan darken-4">
      <Footer/>
    </v-footer>
  </v-app>
</template>

<script>
import Home from './components/Home';
import Footer from './components/Footer';
export default {
  name: 'App',

  components: {
    Home,
    Footer
  },

  data: () => ({
    //
  }),
};
</script>
