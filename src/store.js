import Vue from 'vue';
import Vuex from 'vuex';

import Vuelidate from 'vuelidate';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		correctUser: 'test@test.pl',
		correctPassword: 'Password1',
		loggedIn: false,
		server: false,
		localData: {
			email: '',
			password: ''
		}
	},
	mutations: {
		LOGIN(state, formData) {
			this.state.loggedIn = (formData.email === this.state.correctUser && formData.password === this.state.correctPassword);
		},
		LOGOUT(state) {
			this.state.loggedIn = false;
			this.state.server = false;
		},
		SERVER_RESPONSE(state) {
			this.state.server = true;
		},
		REMEMBER_ME(state, formData) {
			localStorage.setItem('email', formData.email);
			localStorage.setItem('password', formData.password);
		},
		FORGET_ME() {
			localStorage.removeItem('email');
			localStorage.removeItem('password');
		},
		REMEMBER_WAS_CHECKED(state) {			
			this.state.localData.email = localStorage.getItem('email');
			this.state.localData.password = localStorage.getItem('password');
		}
	},
	actions: {
		login({commit}, formData) {
			commit('LOGIN', formData);
		},
		logout({commit}) {
			commit('LOGOUT');
		},
		serverResponse({commit}) {
			commit('SERVER_RESPONSE');
		},
		rememberMe({commit}, formData) {
			commit('REMEMBER_ME', formData);
		},
		forgetMe({commit}) {
			commit('FORGET_ME');
		},
		rememberWasChecked({commit}) {
			commit('REMEMBER_WAS_CHECKED');
		}
	},
	getters: {
		logged: state => {
			return state.loggedIn;
		},
		server: state => {
			return state.server;
		},
		local: state => {
			return state.localData;
		}
	}
})