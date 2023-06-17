<template>
   <div class="center">
      <div class="container">
          <div class="spinner"></div>
      </div>
   </div>
</template>
  
<script>
  export default {
    props:{

    },
    setup() {
      return {
  
      }
    }
  }
</script>

<style scoped>
.center{
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   min-height: 65vh;
}
.container{
    height: 5.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
.spinner {
   position: relative;
   width: 22.4px;
   height: 22.4px;
}

.spinner::before,
.spinner::after {
   content: '';
   width: 100%;
   height: 100%;
   display: block;
   animation: spinner-b4c8mmmd 0.5s backwards, spinner-49opz7md 1.25s 0.5s infinite ease;
   border: 5.6px solid #ffffff;
   border-radius: 50%;
   box-shadow: 0 -33.6px 0 -5.6px #ffffff;
   position: absolute;
}

.spinner::after {
   animation-delay: 0s, 1.25s;
}

@keyframes spinner-b4c8mmmd {
   from {
      box-shadow: 0 0 0 -5.6px #ffffff;
   }
}

@keyframes spinner-49opz7md {
   to {
      transform: rotate(360deg);
   }
}
</style>