import router from '@/router';
import { createStore } from 'vuex';

export default createStore({
  state: {
    tasks: [],
    task: {
      id: '',
      name: '',
      category: [],
      state: '',
      number: 0
    }
  },
  getters: {
  },
  mutations: {
    set(state, payload) {
      state.tasks.push(payload)
    },
    remove(state, payload) {
      state.tasks = state.tasks.filter(item => item.id !== payload)
    },
    get(state, payload) {
      if (!state.tasks.find(item => item.id == payload)) {
        router.push('/')

        return
      }
      state.task = state.tasks.find(item => item.id == payload);
    },
    update(state, payload) {
      state.tasks = state.tasks.map(item => item.id == payload.id ? payload : item)
      router.push('/')
    },
  },
  actions: {
    setTasks({ commit }, task ) {
      commit('set', task)
    },
    removeTask({ commit }, id) {
      commit('remove', id)
    },
    getTask({ commit }, id) {
      commit('get', id)
    },
    updateTask({ commit }, task) {
      commit('update', task)
    }
  },
  modules: {
  }
})
