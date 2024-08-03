// src/store/modules/banner.js

// initial state
const state = () => ({
    message: '',
    visible: false,
    type: '' // could be 'info', 'warning', 'error', etc.
  })
  
  // getters
  const getters = {
    bannerMessage(state) {
      return state.message;
    },
    isBannerVisible(state) {
      return state.visible;
    },
    bannerType(state) {
      return state.type;
    }
  }
  
  // actions
  const actions = {
    showBanner({ commit }, { message, type = 'info' }) {
      commit('setBanner', { message, visible: true, type });
    },
    hideBanner({ commit }) {
      commit('setBanner', { message: '', visible: false, type: '' });
    }
  }
  
  // mutations
  const mutations = {
    setBanner(state, { message, visible, type }) {
      state.message = message;
      state.visible = visible;
      state.type = type;
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
  