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
      // localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    remove(state, payload) {
      state.tasks = state.tasks.filter(item => item.id !== payload)
      // localStorage.setItem('tasks', JSON.stringify(state.tasks))
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
      // localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    upload(state, payload) {
      state.tasks = payload
    }
  },
  actions: {
    async setTasks({ commit }, task ) {
      try {
        const res = await fetch(`https://tasksapp-vue3-default-rtdb.firebaseio.com/tasks/${task.id}.json`, {
          // POST method generate automatic id 's
          // method: 'GET' // GET is default
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(task)
        })
        const dataDB = await res.json()
        console.log(dataDB)
      } catch (error) {
        console.log(error)
      }
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
    },
    async uploadRealTimeDb({ commit }) {
      try {
        const res = await fetch('https://tasksapp-vue3-default-rtdb.firebaseio.com/tasks.json')
        const dataDb = await res.json()
        const arrayTasks = []

        for(let id in dataDb) {
          // console.log(dataDb[id])
          arrayTasks.push(dataDb[id])
          commit('upload', arrayTasks)
        }
      } catch (error) {
        console.log(error)
      }
    },
    uploadLocalStorage({ commit }) {
      if(localStorage.getItem('tasks')) {
        const tasks = JSON.parse(localStorage.getItem('tasks'))
        commit('upload', tasks)

        return
      }
      localStorage.setItem( 'tasks', JSON.stringify([]) )
    }
  },
  modules: {
  }
})
