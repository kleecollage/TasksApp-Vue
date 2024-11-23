<template>
  <h1 class="text-center my-4">User Registration</h1>
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
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: 'johndoe@mail.com',
      password: '123456',
      repassword: '123456',
    }
  },
  computed: {
    block() {
      if (this.email.includes('@') && this.password.length > 5 && this.password == this.repassword)
        return false
      return true
    }
  },
  methods: {
    ...mapActions(['registerUser']),
    processForm() {
      this.registerUser({ email: this.email, password: this.password })
      this.email='',
      this.password='',
      this.repassword=''
    }
  }
}
</script>