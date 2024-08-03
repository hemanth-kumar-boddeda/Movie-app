import axios from 'axios'
import router from '../../router'

// initial state
const state = () => ({
  actors: [],
  page: 1,
  actor: {},
  maxPagination: false
})

// getters
const getters = {
  actors(state) {
    return state.actors
  },
  actor(state) {
    return state.actor
  },
  page(state) {
    return state.page
  }
}

// actions
const actions = {
  getActors({ commit, state }) {
    const apiKey = process.env.VUE_APP_AUTH_KEY;
    if (!state.maxPagination) {
      axios
        .get(`https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&page=${state.page}`)
        .then(res => {
          if (state.page < res.data.total_pages) {
            commit('setActors', res.data.results)
            commit('setPage', state.page + 1)
          } else {
            commit('setMaxPagination', true)
          }
        })
        .catch(err => {
          console.error('Error fetching actors:', err.response ? err.response.data : err);
        });
    }
  },
  getActorDetail({ commit }, id) {
    const apiKey = process.env.VUE_APP_AUTH_KEY;
    axios
      .get(`https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&append_to_response=external_ids,combined_credits`)
      .then(res => {
        commit('setActorDetail', res.data)
      })
      .catch(err => {
        if (err.response && err.response.status === 404) {
          router.push({ name: 'NotFound' })
        } else {
          console.error('Error fetching actor details:', err.response ? err.response.data : err);
        }
      });
  }
}

// mutations
const mutations = {
  setPage(state, page) {
    state.page = page
  },
  setActors(state, data) {
    state.actors = [...state.actors, ...data]
  },
  setActorDetail(state, actor) {
    state.actor = actor
  },
  setMaxPagination(state, value) {
    state.maxPagination = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
