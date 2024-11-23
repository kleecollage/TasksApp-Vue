<template>
  <h1 class="text-center my-4">Access</h1>
  <form @submit.prevent="loginUser({ email: email, password: password })">
    <input
      class="form-control my-2"
      type="email"
      placeholder="email"
      v-model.trim="email"
    >
    <input
      class="form-control my-2"
      type="password"
      placeholder="password"
      v-model="password"
    >
    <button class="btn btn-primary w-100" type="submit" :disabled="block">Login</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

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
    }
  },
  methods: {
    ...mapActions(['loginUser']),
  }
}
</script>