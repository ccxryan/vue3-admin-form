
import { createStore } from "vuex";

export default createStore({
  state: {
    pageData: {},
    activeIndex: null
  },
  getters: {
    activeItem: state => {
      const {list} = state.pageData;
      if(state.activeIndex !== null
        && state.activeIndex !== undefined
        && state.activeIndex > -1
        && list
        && list.length
      ) {
        return list[state.activeIndex];
      }
      return null;
  },
  },
  mutations: {
    SET_ACTIVE_ITEM(state, index) {
      state.activeIndex = index;
    },
    GET_PAGE_DATA(state, payload) {
      state.pageData = payload;
    },
    CONFIRM_EDIT_ITEM(state, item) {
      const {activeIndex, pageData} = state;
      const {list} = pageData;
      if (!list) {
        return;
      }
      if (activeIndex) {
        Object.assign(list[activeIndex], item);
      } else {
        list.push(Object.assign({}, item));
      }
      state.activeIndex = null;
    },
    CLEAR_ACTIVE_ITEM(state) {
      state.activeIndex = null;
    },
    DELETE_ITEM(state, index) {
      const {list} = state.pageData;
      list.splice(index, 1);
    }
  },
  actions: {
    GET_PAGE_DATA({ commit }, payload) {
      commit('GET_PAGE_DATA', payload)
    },
    SET_ACTIVE_ITEM({ commit }, index) {
      commit('SET_ACTIVE_ITEM', index)
    },
    CONFIRM_EDIT_ITEM({ commit }, item) {
      commit('CONFIRM_EDIT_ITEM', item)
    },
    CLEAR_ACTIVE_ITEM({ commit }) {
      commit('CLEAR_ACTIVE_ITEM')
    },
    DELETE_ITEM({commit}, index) {
      commit('DELETE_ITEM', index)
    }
  }
});
