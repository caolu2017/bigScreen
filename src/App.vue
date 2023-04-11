

<template>
  <div>
    <img class="logo" src="@/assets/img/logo.png" alt="">
    <div class="routeJump-prev icon" @click="handleJumpRoute(0)">
        <img src="@/assets/img/routePrev.svg" alt="" />
      </div>
      <div class="routeJump-next icon" @click="handleJumpRoute(1)">
        <img src="@/assets/img/routeNext.svg" alt="" />
      </div>
  </div>
  <router-view></router-view>
</template>


<script setup>
// import { useMainStore } from '@/store'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import routes from '@/router/routes.js'
const currentIndex = ref(0)
const router = useRouter()
console.log('routes', routes)
// watch(
//   () => router,
//   newval => {
//     targetPath.value = newval.currentRoute.value.path
//     routeJumpList.value = mainStore.userAuthRoutes

//     currentIndex.value = routeJumpList.value.findIndex(el => el.path === targetPath.value)
//     showRouteJump.value = routeJumpList.value.findIndex(el => el.path === newval.currentRoute.value.path) >= 0
//   },
//   { deep: true }
// )


const handleJumpRoute = next => {
  console.log('routes', routes, currentIndex.value, next)
  if (next) {
    if (currentIndex.value === routes.length - 1) {
      currentIndex.value = 0
    } else {
      currentIndex.value++
    }
  } else {
    if (currentIndex.value == 0) {
      currentIndex.value = routes.length - 1
    } else {
      currentIndex.value--
    }
  }

  console.log('index', currentIndex.value)

  let toPath = routes[currentIndex.value].path
  router.push(toPath)
}

</script>
<style scoped lang="scss">
.logo{
  height: 36px;
  position: fixed;
  top: 60px;
  left: 66px;
  z-index: 1000;
}
// img {
//   width: 100%;
//   height: 100%;
// }
.main {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
.routeJump-prev,
.routeJump-next {
  width: 40px;
  height: 200px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 9999;
  cursor: pointer;
  opacity: 0.6;

  img{
    width: 40px;
    height: 200px;
  }
}

.routeJump-prev:hover,
.routeJump-next:hover {
  opacity: 1;
}
.routeJump-prev {
  left: 18px;
}

.routeJump-next {
  right: 18px;
}

.fade-enter-active {
  animation: fade-in 0.5s;
}
.fade-leave-active {
  animation: fade-out 0.5s;
}

.icon{
  opacity: 0;

  &::hover{
    opacity: 1;
  }
}
@keyframes fade-in {
  0% {
    transform: translateX(-200px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes fade-out {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(200px);
    opacity: 0;
  }
}
</style>
