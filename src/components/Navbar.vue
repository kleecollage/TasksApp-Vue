<template>
  <div class="navbar navbar-dark bg-dark">
    <router-link to="#" class="navbar-brand">
      Forms
    </router-link>
    <div class="d-flex">
      <router-link v-if="authenticated" class="btn btn-dark" to="/">
        Tasks
      </router-link>
      <router-link v-if="!authenticated" to="/login" class="btn btn-dark">
        Login
      </router-link>
      <router-link v-if="!authenticated" to="/register" class="btn btn-dark">
        Register
      </router-link>
      <button v-if="authenticated" class="btn btn-dark" @click="logoutUser">Logout</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['authenticated'])
  },
  methods: {
    ...mapActions(['logoutUser'])
  }
}
</script>