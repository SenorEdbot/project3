<template>
  <div>
    <example-list />
  </div>
</template>

<script>
// @ is an alias to /src
import ExampleList from '@/components/ExampleList.vue'

export default {
  name: 'Home',
  components: {
    ExampleList
  }
}
</script>
