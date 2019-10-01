/* eslint-disable no-undef */
import Vue from 'vue';
import firebase from 'firebase';
import BootstrapVue from 'bootstrap-vue';
import Axios from 'axios';
import Vuelidate from 'vuelidate';
import store from './store';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

Vue.use(BootstrapVue);
Vue.use(Vuelidate);

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: '',
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

Axios.defaults.baseURL = firebaseConfig.databaseURL;

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(() => {
  new Vue({ // eslint-disable-line no-new
    el: '#app',
    router,
    store,
    render: h => h(App),
  });
});
