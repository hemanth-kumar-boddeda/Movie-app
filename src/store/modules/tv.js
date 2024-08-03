import axios from 'axios'
import router from '../../router'

// initial state
const state = () => ({
  popular: [],
  topRated: [],
  tvShow: {}
})

// getters
const getters = {
  popular(state) {
    return state.popular
  },
  topRated(state) {
    return state.topRated
  },
  tvShow(state) {
    return state.tvShow
  }
}

// actions
const actions = {
  getShows({ commit }, type) {
    const apiKey = process.env.VUE_APP_AUTH_KEY;
    axios
      .get(`https://api.themoviedb.org/3/tv/${type}?api_key=${apiKey}`)
      .then(res => {
        commit('setShow', { data: res.data.results, type: type })
      })
      .catch(err => {
        console.error('Error fetching TV shows:', err.response ? err.response.data : err);
      });
  },
  getShowDetail({ commit }, id) {
    const apiKey = process.env.VUE_APP_AUTH_KEY;
    axios
      .get(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&append_to_response=credits,videos,images`)
      .then(res => {
        commit('settvDetail', res.data)
      })
      .catch(err => {
        if (err.response && err.response.status === 404) {
          router.push({ name: 'NotFound' });
        } else {
          console.error('Error fetching TV show details:', err.response ? err.response.data : err);
        }
      });
  }
}

// mutations
const mutations = {
  setShow(state, { data, type }) {
    if (type === 'popular') {
      state.popular = data;
    } else if (type === 'top_rated') {
      state.topRated = data;
    }
  },
  settvDetail(state, tv) {
    state.tvShow = tv;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
