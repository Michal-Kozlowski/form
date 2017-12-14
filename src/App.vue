<template>
  <div id="app">
    <app-form></app-form>
    <app-server></app-server>
  </div>
</template>

<script>
  import Form from './components/form.vue';
  import Server from './components/server.vue';
  export default {
    name: 'app',
    components: {
      'app-form': Form,
      'app-server': Server
    }
  }
</script>

<style>
  *{
    color: white;
  }

  body {
    min-height: 100%;
    background: #4B79A1;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #283E51, #4B79A1);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #283E51, #4B79A1); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  #app {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    text-align: center;
  }

  .slide-enter {
    opacity: 0;
  }

  .slide-enter-active {
    animation: slide-in .5s ease-out;
    transition: opacity .5s;
  }

  @keyframes slide-in {
    from {
      transform: translateY(-20px);
    }
    to {
      transform: translateY(0);
    }
  }
</style>