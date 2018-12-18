<template>
  <div class="row">
    <div class="col-8 offset-2">
      <h2>New Example</h2>
      <form class="clearfix mb-4" @submit.prevent="createExample">
        <div class="form-group">
          <label for="example-text">Example Text</label>
          <input v-model="text" type="text" id="example-text" class="form-control" aria-describedby="example-text" placeholder="Enter Example Text">
        </div>
        <div class="form-group">
          <label for="example-description">Example Description</label>
          <textarea v-model="description" class="form-control" id="example-description" aria-describedby="example-description" placeholder="Enter Example Description"></textarea>
        </div>
        <button id="submit" class="btn btn-primary float-right">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import UserService from '@/services/UserService'

export default {
  name: 'ExampleForm',
  data: () => ({
    text: '',
    description: ''
  }),
  computed: {
    newExample () {
      return {
        text: this.text,
        description: this.description
      }
    }
  },
  methods: {
    createExample () {
      UserService.create(this.newExample).then((res) => {
        this.$router.push({ name: 'home' })
      })
    }
  }
}
</script>

<style scoped>

</style>
