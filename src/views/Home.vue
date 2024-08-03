<template>
  <div class="p-8">
    <div class="flex justify-between mt-12">
      <h2 class="text-2xl">Popular Movies</h2>
      <a href="#" class="text-gray-400 text-sm">View all</a>
    </div>

    <MovieCard :movies="popular" />

    <div class="flex justify-between mt-12">
      <h2 class="text-2xl">Now Playing</h2>
      <a href="#" class="text-gray-400 text-sm">View all</a>
    </div>

    <MovieCard :movies="nowPlaying" />
  </div>
</template>

<script>
import MovieCard from "../components/MovieCard";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: { MovieCard },
  mounted() {
    this.$store.dispatch("movie/getMovies", "popular");
    this.$store.dispatch("movie/getMovies", "now_playing");
  },
  computed: {
    ...mapGetters("movie", {
      popular: "popular",
      nowPlaying: "nowPlaying"
    })
  }
};
</script>
