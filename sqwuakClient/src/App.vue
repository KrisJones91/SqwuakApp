<template>
  <header>
    <Navbar />
    <div class="row mb-0 justify-content-start">
      <marquee v-if="state.account.name">
        <h5 class="mb-0 mt-3 text-left">
          Welcome to the Sqwuak <b class="text-danger">{{ state.account.name.split('@')[0] }}!</b>
        </h5>
        <p class="text-left">
          {{ convertUpdate() }}
        </p>
      </marquee>
    </div>
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <div class="text-light text-center p-4">
      <p class="footerName">
        <small>
          Created by K.Jones
        </small>
      </p>
    </div>
  </footer>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      appState: computed(() => AppState),
      state,
      convertUpdate() {
        const newDate = Date()
        const dateDayMonthYear = newDate.slice(0, 10)
        const clockTime = newDate.slice(15, 21)
        const timeZone = newDate.slice(34)
        return dateDayMonthYear + ' - ' + clockTime + ' ' + timeZone
      }
    }
  }
}
</script>
<style lang="scss">
marquee{
font-family: 'Kanit', sans-serif;
background-image: linear-gradient(to left, #434343 0%, black 100%,#434343 0% );
border: none;
box-shadow: 1px 5px 10px gray;
text-align: center;
color: rgb(217, 217, 217);
text-shadow: 1px 1px 5px rgb(32, 32, 32);
}
.footerName{
  font-family: 'Kanit', sans-serif;
  color: white;
}
footer{
  background-image: linear-gradient(to left, #434343 5%, black 100%,#434343 0% );
}
@import "./assets/scss/main.scss";

</style>
