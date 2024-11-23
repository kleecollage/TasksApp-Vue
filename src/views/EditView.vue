<template>
  <h1>Edit id: {{ $route.params.id }}</h1>
  <form @submit.prevent="updateTask(task)">
    <Input :task="task" />
  </form>
</template>

<script>
import Input from '@/components/Input.vue';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    Input
  },
  computed: {
    ...mapState(['task'])
  },
  methods: {
    ...mapActions(['getTask', 'updateTask'])
  },
  created(){
    this.getTask(this.$route.params.id);
  }
}
</script>