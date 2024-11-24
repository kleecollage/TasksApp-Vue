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
    },
    user: null,
    error: {type: null, message: null}
  },
  getters: {
    authenticated(state) {
      return !!state.user
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
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
    },
    setError(state, payload) {
      if (payload == null) {
        return state.error= { type: null, message: null }
      }
      if(payload == "INVALID_LOGIN_CREDENTIALS") {
        return state.error= { type: 'credentials', message: 'Incorrect email or password' }
      }
      if(payload == "EMAIL_EXISTS") {
        return state.error= { type: 'email', message: 'This email already exists' }
      }
      if(payload == "INVALID_EMAIL") {
        return state.error= { type: 'email', message: 'Incorrect email format' }
      }
    }
  },
  actions: {
    async registerUser({ commit }, user ) {
      try {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwKz07o1eojW43x31F1YkDtx89swmBlEY', {
          method: 'POST',
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            returnSecureToken: true,
          })
        })
        const userDB = await res.json()
        if (userDB.error) {
          console.log(userDB.error.message)
          return commit('setError', userDB.error.message)
        }
        localStorage.setItem('user', JSON.stringify(userDB))
        commit('setUser', userDB)
        commit('setError', null)
        router.push('/')
      } catch (error) {
        console.log(error)
      }
    },
    async loginUser({ commit }, user) {
      try {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwKz07o1eojW43x31F1YkDtx89swmBlEY', {
          method: 'POST',
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            returnSecureToken: true
          })
        })
        const userDB = await res.json();
        if (userDB.error) {
          console.log(userDB.error);
          return commit('setError', userDB.error.message)
        }
        commit('setUser', userDB)
        commit('setError', null)
        router.push('/')
        localStorage.setItem('user', JSON.stringify(userDB))
      } catch (error) {
        console.log(error)
      }
    },
    logoutUser({ commit }) {
      commit('setUser', null)
      router.push('/login')
      localStorage.removeItem('user')
    },
    async setTasks({ commit, state }, task ) {
      try {
        const res = await fetch(`https://tasksapp-vue3-default-rtdb.firebaseio.com/tasks/${state.user.localId}/${task.id}.json?auth=${state.user.idToken}`, {
          // POST method generate automatic id 's
          // method: 'GET' // GET is default
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(task)
        })
        const dataDB = await res.json()
        commit('set', dataDB)
      } catch (error) {
        console.log(error)
      }
    },
    async removeTask({ commit, state }, id) {
      try {
        await fetch(`https://tasksapp-vue3-default-rtdb.firebaseio.com/tasks/${state.user.localId}/${id}.json?auth=${state.user.idToken}`, {
          method: 'DELETE',
        })
        commit('remove', id)
      } catch (error) {
        console.log(error)
      }
    },
    getTask({ commit }, id) {
      commit('get', id)
    },
    async updateTask({ commit, state }, task) {
      try {
        const res = await fetch(`https://tasksapp-vue3-default-rtdb.firebaseio.com/tasks/${state.user.localId}/${task.id}.json?auth=${state.user.idToken}`, {
          method: 'PATCH',
          body: JSON.stringify(task)
        })
        const dataDB = await res.json()
        commit('update', dataDB)
      } catch (error) {
        console.log(error)
      }
    },
    async uploadRealTimeDb({ commit, state }) {
      if (localStorage.getItem('user')) {
        commit('setUser', JSON.parse(localStorage.getItem('user')))
      } else {
        return commit('setUser', null)
      }
      try {
        const res = await fetch(`https://tasksapp-vue3-default-rtdb.firebaseio.com/tasks/${state.user.localId}.json?auth=${state.user.idToken}`)
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
