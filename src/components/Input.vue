<template>
  <input type="text" class="form-control my-2" placeholder="Enter name" v-model.trim="task.name" />

  <div class="form-check form-check-inline">
    <input type="checkbox" id="check1" class="form-check-input" v-model="task.category" value="javascript" />
    <label for="check1" class="form-check-label">JavaScript</label>
  </div>

  <div class="form-check form-check-inline">
    <input type="checkbox" id="check2" class="form-check-input" v-model="task.category" value="nodejs" />
    <label for="check2" class="form-check-label">NodeJs</label>
  </div>

  <div class="form-check form-check-inline">
    <input type="checkbox" id="check3" class="form-check-input" v-model="task.category" value="vue" />
    <label for="check3" class="form-check-label">Vue</label>
  </div>

  <div class="mt-2">
    <div class="form-check form-check-inline">
      <input type="radio" id="radio1" class="form-check-input" v-model="task.state" value="urgent" />
      <label for="radio1" class="form-check-label">Urgent</label>
    </div>

    <div class="form-check form-check-inline">
      <input type="radio" id="radio2" class="form-check-input" v-model="task.state" value="relax" />
      <label for="radio2" class="form-check-label">Relax</label>
    </div>
  </div>

  <div class="mt-2">
    <input type="number" class="form-control" v-model.number="task.number" />
  </div>

  <button class="btn btn-dark w-100 my-2" type="submit" :disabled="block">
    Process
  </button>

</template>

<script>
export default {
  props: {
    task: Object
  },
  computed: {
    block() {
      return this.task.name.trim() == "" ? true : false
    }
  }
}
</script>