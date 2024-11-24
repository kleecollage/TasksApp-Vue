<template>
  <h1 class="text-center my-4">User Registration</h1>
  <div class="alert alert-danger" v-if="error.type != null">
    {{ error.message }}
  </div>
  <form @submit.prevent="processForm">
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
    <input
      class="form-control my-2"
      type="password"
      placeholder="password"
      v-model="repassword"
    >
    <button class="btn btn-primary w-100" type="submit" :disabled="block">Register</button>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      repassword: '',
    }
  },
  computed: {
    block() {
      if (this.email.includes('@') && this.password.length > 5 && this.password == this.repassword)
        return false
      return true
    },
    ...mapState(['error'])
  },
  methods: {
    ...mapActions(['registerUser']),
    async processForm() {
      await this.registerUser({ email: this.email, password: this.password })
      this.email='',
      this.password='',
      this.repassword=''
    }
  }
}
</script>