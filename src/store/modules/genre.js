import axios from 'axios'

// initial state
const state = () => ({
  genres: [],
  tvShowGenres: [],
})

// getters
const getters = {
  genres(state) {
    return state.genres
  },
  tvShowGenres(state) {
    return state.tvShowGenres
  }
}

// actions
const actions = {
  getGenre({ commit }) {
    axios
      .get('https://api.themoviedb.org/3/genre/movie/list')
      .then(res => {
        commit('setGenre', res.data.genres)
      })
      .catch(err => {
        console.error('get genre error:', err);
      });
  },
  getTvShowGenre({ commit }) {
    axios
      .get('/genre/tv/list')
      .then(res => {
        commit('setTvShowGenre', res.data.genres)
      })
      .catch(err => {
        console.error('get tv show genre error:', err);
      });
  },
}

// mutations
const mutations = {
  setGenre(state, genres) {
    state.genres = genres
  },
  setTvShowGenre(state, genres) {
    state.tvShowGenres = genres
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
