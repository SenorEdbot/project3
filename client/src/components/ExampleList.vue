<template>
  <div class="row">
    <div class="col-8 offset-2">
      <h3>Examples:</h3>
      <ul id="example-list" class="list-group">
        <li v-for="example in examples" :key="example.id">
          {{example.text}}
          <button @click="deleteExample(example.id)" class="btn btn-danger float-right delete">x</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import UserService from '@/services/UserService'

export default {
  name: 'ExampleList',
  data: () => ({
    examples: []
  }),
  created () {
    this.updateExamples()
  },
  methods: {
    updateExamples () {
      UserService.all().then((res) => {
        this.examples = res.data
      })
    },
    deleteExample (id) {
      UserService.delete(id).then((res) => {
        this.updateExamples()
      })
    }
  }
}
</script>

<style scoped>

</style>
