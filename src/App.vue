<template lang="pug">
  #app
    app-header
    router-view
</template>

<script>
import AppHeader from './components/AppHeader'

export default {
  components: {
    AppHeader
  },
  name: 'App'
}
</script>

<style lang="sass">
body
  margin: 0

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
</style>
