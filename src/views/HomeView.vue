<template>
  <form @submit.prevent="processForm">
    <Input :task="task" />
    <TasksList />
  </form>
</template>

<script>
// @ is an alias to /src
import Input from '@/components/Input.vue';
import TasksList from '@/components/TasksList.vue';
import shortid from 'shortid';
import { mapActions } from 'vuex';

export default {
  name: 'HomeView',
  components: {
    Input,
    TasksList
  },
  data() {
    return  {
      task: {
        id: '',
        name: '',
        category: [],
        state: '',
        number: 0
      }
    }
  },
  methods: {
    ...mapActions(['setTasks']),
    processForm() {
      console.log(this.task)
      if (this.task.name.trim() == "") {
        console.log('empty field')
        return
      }
      console.log('data ok')
      // id gen //
      this.task.id = shortid.generate();
      console.log(this.task.id)
      // send data //
      this.setTasks(this.task)
      // clean form //
      this.task = {
        id: '',
        name: '',
        category: [],
        state: '',
        number: 0
      }
    }
  }
}
</script>
