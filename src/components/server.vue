<template>
	<transition name="slide" mode="out-in">
		<div v-if="server">		
			<div class="server" v-if="logged">			
				<p>login successful</p>
				<button @click="logout()">show form</button>
			</div>			
			<div v-else>
				<p>invalid email or password</p>	
			</div>			
		</div>
	</transition>
</template>

<script>
export default {
	computed: {
        logged(){
            return this.$store.getters.logged;
        },
        server(){
        	return this.$store.getters.server;
        }
    },
    methods: {
    	logout(){
    		this.$store.dispatch('logout');
    	}
    }
}
</script>


<style scoped>
  .server {
    margin: 45vh auto 0;
  }

  p, button {  	
  	font-size: 1.2em;
  	text-transform: capitalize;
  }

  button {
  	color: black;
  	text-transform: capitalize;
  	border-radius: 5px;
  	margin-bottom: 20px;  	
  	padding: 10px;
  	cursor: pointer;
  }
</style>