<template>
  <div class="modal">
    <h2>Login</h2>
    <form action="/login" method="POST" >
      <input type="email" class="email" />
      <input type="text" class="name">
      <input type="text" class="password">
      <button type="submit"> Login here</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'HealthAppVueLoginModal',

  data() {
    return {}
  },

  mounted() {},

  methods: {}
}
</script>

<style scoped>
</style>