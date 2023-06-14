<template>
  <main>
    <router-view />
  </main>
   <footer>
    <Navbar />
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}

main{
  background-color: #A22C29;
}


footer {
  position: fixed;
  display: block;
  bottom: 0;
  width: 100%;
  z-index: 100;
}
</style>
