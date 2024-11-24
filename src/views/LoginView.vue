<template>
  <h1 class="text-center my-4">Access</h1>
  <div class="alert alert-danger" v-if="error.type != null">
    {{ error.message }}
  </div>
  <form @submit.prevent="loginUser({ email: email, password: password })">
    <input
      class="form-control my-2"
      type="email"
      placeholder="email"
      v-model.trim="email"
      :class="[ error.type == 'credentials' ? 'is-invalid' : '' ]"
    >
    <input
      class="form-control my-2"
      type="password"
      placeholder="password"
      v-model="password"
      :class="[ error.type == 'credentials' ? 'is-invalid' : '' ]"
    >
    <button class="btn btn-primary w-100" type="submit" :disabled="block">Login</button>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    block() {
      if (this.email.includes('@') && this.password.length > 5)
        return false
      return true
    },
    ...mapState(['error'])
  },
  methods: {
    ...mapActions(['loginUser']),
  }
}
</script>