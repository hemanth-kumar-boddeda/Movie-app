import router from '../../router'

// initial state
const state = () => ({
  popular: [],
  nowPlaying: [],
  movie: {}
})

// getters
const getters = {
  popular(state) {
    return state.popular
  },
  nowPlaying(state) {
    return state.nowPlaying
  },
  movie(state) {
    return state.movie
  }
}

// actions
const actions = {
  getMovies({ commit }, type) {
    const apiKey = process.env.VUE_APP_AUTH_KEY; // Use the API key from environment variables
    window.axios
      .get(`https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}`)
      .then(res => {
        commit('setMovie', { data: res.data.results, type: type })
      })
      .catch(err => {
        console.error('Error fetching movies:', err);
      });
  },
  getMovieDetail({ commit }, id) {
    const apiKey = process.env.VUE_APP_AUTH_KEY; // Use the API key from environment variables
    window.axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=credits,videos,images`)
      .then(res => {
        commit('setMovieDetail', res.data)
      })
      .catch(err => {
        if (err.response && err.response.status === 404) {
          router.push({ name: 'NotFound' })
        } else {
          console.error('Error fetching movie details:', err);
        }
      });
  }
}

const apiKey = process.env.VUE_APP_AUTH_KEY;
console.log('API Key:', apiKey);


// mutations
const mutations = {
  setMovie(state, { data, type }) {
    if (type === 'popular') {
      state.popular = data
    } else if (type === 'now_playing') {
      state.nowPlaying = data
    }
  },
  setMovieDetail(state, movie) {
    state.movie = movie
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
