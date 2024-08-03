<template>
  <div class="bg-gray-900 text-white min-h-screen">
    <Nav />
    <Banner v-if="$route.path === '/'" :movies="popularMovies" />
    <div class="container mx-auto mt-24 md:mt-16">
      <router-view :key="$route.path" />
    </div>
    <vue-progress-bar></vue-progress-bar>
    <Footer></Footer>
  </div>
</template>

<script>
import Nav from "./components/TheNavigation";
import Banner from "./components/Banner";
import Footer from "./components/TheFooter";
import { mapGetters } from "vuex";

export default {
  components: {
    Nav,
    Banner,
    Footer
  },
  computed: {
    ...mapGetters("movie", {
      popularMovies: "popular"
    })
  },
  created() {
    this.$Progress.start();

    this.$router.beforeEach((to, from, next) => {
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress;
        this.$Progress.parseMeta(meta);
      }
      this.$Progress.start();
      next();
    });

    this.$store.dispatch("genre/getGenre");

    this.$router.afterEach(() => {
      this.$Progress.finish();
    });
  },
  mounted() {
    this.$Progress.finish();
  }
};
</script>
