<template>
	<form method="POST" action="" v-show="!logged">
	    <fieldset>
	    	<legend>Please log in</legend>
	    	<div :class="{invalid: $v.email.$error}">
		        <label 
		        	for="email"
		        	>email</label>
		        <i class="fa fa-user" aria-hidden="true"></i>
		        <input
		        	type="text" 
		        	name="email" 
		        	id="email"
		        	placeholder="email"
		        	v-model="email"
		        	@blur="$v.email.$touch()"
		        	>
		        <transition name="slide">
		    		<p v-if="$v.email.$error">Please provide a valid email adress.</p>
		    	</transition>
		    </div>
		    <div :class="{invalid: $v.password.$error}">
		        <label
		        	for="password"
		        	>password</label>
		        <i class="fa fa-lock" aria-hidden="true"></i>
		        <input
		        	type="password"
		        	name="password"
		        	id="password"
		        	placeholder="password"
		        	v-model="password"
		        	@blur="$v.password.$touch()"
		        	>
		        <transition name="slide">
					<p v-if="$v.password.$error">Password must be at least 6 letters long, contain 1 capital, 1 lower case letter and 1 digit</p>
				</transition>
	        </div>
	        <div>
		        <i class="fa fa-pencil" aria-hidden="true"></i>
		        <label for="remember">Rember me</label>
		        <input type="checkbox" name="remember" id="remember" v-model="remember">
		    </div>
		    <div>
		    	<i class="fa fa-sign-in" aria-hidden="true"></i>
		      	<input type="submit" value="login" @click.prevent="[$v.email.$touch(), $v.password.$touch(), onSubmit()]">
		    </div>
	    </fieldset> 
	</form>
</template>

<script>
import {required, email, minLength} from 'vuelidate/lib/validators';

export default {
	data () {
		return {
			email: '',
			password: '',
			remember: false
		}
	},
	validations: {
		email: {
			required,
			email
		},
		password: {
			required,
			minLen: minLength(6),
			containCapital: val => {
				return val !== val.toLowerCase();
			},
			containSmall: val => {
				return val !== val.toUpperCase();
			},
			containDigit: val => {
				return /\d/.test(val);
			}
		}
	},
	computed: {
        logged(){
            return this.$store.getters.logged;
        }
    },
	methods: {
		onSubmit() {
			const formData = {
				email: this.email,
				password: this.password
			}
			this.$store.dispatch('serverResponse', formData);
			this.$store.dispatch('login', formData);
			if(this.remember && this.email && this.password) {
				this.$store.dispatch('rememberMe', formData);
			} else {
				this.$store.dispatch('forgetMe');
			}
		}
	},
    created() {
    	this.$store.dispatch('rememberWasChecked');
    	const localData = this.$store.getters.local;
    	if (localData.email || localData.password) {
	    	this.email = localData.email;
	    	this.password = localData.password;
	    }
    }
}
</script>

<style scoped>
  fieldset {
  	margin: 0 auto;
  	max-width: 400px;
  	border-radius: 5px;
  	box-shadow: 0 0 30px 2px black;
  }

  legend {
  	font-size: 2em;
  	text-shadow: 0 0 20px black, 0 0 10px black;
  }

  div:not(:last-child) {
  	margin-top: 20px;
  	margin-bottom: 40px;
  }

  input {
  	font-size: 1.1em;
  	padding: 10px;
  	width: 90%;
  	border-radius: 5px;
  	color: black;
  }

  label {
  	text-transform: capitalize;
  	margin-bottom: 4px;
  	display: block;
  	text-shadow: 0 0 5px black;
  }

  .fa {
  	display: none;
  	font-size: 1.5em;
  	transform: translateY(2px);
  	padding-right: 8px;
  }

  label[for="remember"] {
  	display: inline;
  }

  #remember {
  	width: initial;
  	transform: scale(1.5);
  	margin-left: 10px;
  	cursor: pointer;
  }

  input[type="submit"] {
  	width: 120px;
  	margin-bottom: 20px;
  	text-transform: capitalize;
  	cursor: pointer;
  }

  p {
  	font-size: 0.8em;
  	max-width: 80%;
  	padding-left: 25px;
  	margin: 2px auto 0;
  }

  .invalid label {
    color: red;
  }

  .invalid input {
    border: 2px solid red;
    background-color: $ffc9aa;
  }

  .invalid input {
  	animation: shake .5s;
  }

  @keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
  }

  .slide-leave-active {
    animation: slide-out .5s;
    transition: opacity .2s;
    opacity: 1;
  }

  .slide-leave {
    opacity: 0;
  }

  @keyframes slide-out {
    from {
      transform: translateY(0) scaleY(1);
    }
    to {
      transform: translateY(-25px) scaleY(0);
    }
  }

  @media only screen and (min-width: 340px) {
    .fa {
      display: initial;
    }

    input {
  	  width: 240px;
  	}
  }

  @media only screen and (min-width: 400px) {
  	input {
  	  width: 280px;
  	}
  }

  @media only screen and (min-height: 768px) {
    fieldset {
  	  margin: 25vh auto 0;
  	}
  }
</style>