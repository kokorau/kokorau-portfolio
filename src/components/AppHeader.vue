<template lang="pug">
  header
    .header-body
      .header-logo
        <!--h1 kokorau-->
      .header-link
        router-link.link(:to="{name: 'FirstSample'}") 1
        router-link.link(:to="{name: 'SecondSample'}") 2
        router-link.link(:to="{name: 'ThirdSample'}") 3
        router-link.link(:to="{name: 'ForthSample'}") 4
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style lang="sass">
header
  z-index: 9999
  position: fixed
  width: 100%

.header-body
  text-align: center

.link
  text-decoration: none
  color: #ECEFF1
  font-size: 10em
  padding-right: 10px

.router-link-active
  color: crimson
</style>
