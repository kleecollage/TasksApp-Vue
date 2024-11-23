<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Category</th>
        <th scope="col">State</th>
        <th scope="col">Number</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(task, index) in tasks" :key="task.id">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ task.name }}</td>
        <td>{{ task.category.join(' | ') }}</td>
        <td>{{ task.state }}</td>
        <td>{{ task.number }}</td>
        <td>
          <button class="btn btn-danger btn-sm" @click="removeTask(task.id)">Delete</button>
          <router-link
            class="btn btn-warning btn-sm ms-2"
            :to="{
              name: 'edit',
              params: { id: task.id }
            }"
          >
            Edit
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['tasks']),
  },
  methods: {
    ...mapActions(['removeTask'])
  }
}
</script>