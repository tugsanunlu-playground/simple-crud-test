<template>
  <b-card tag="article">
    <strong slot="header">Giriş Yap</strong>
    <b-card-text>
      <b-alert :show="isAlert" variant="danger">{{ alertMessage }}</b-alert>

      <b-form-group label="E-Posta Adresi:" label-for="email">
        <b-form-input
          v-model="user.email"
          :class="{ 'border-danger' : $v.user.email.$error }"
          @input="$v.user.email.$touch()"
          id="email"
        ></b-form-input>
        <small
          class="text-danger"
          v-if="$v.user.email.$error"
        >Bu alan zorunludur. E-posta formatında olmalıdır.</small>
      </b-form-group>

      <b-form-group label="Parola:" label-for="password">
        <b-form-input
          type="password"
          v-model="user.pass"
          :class="{ 'border-danger' : $v.user.pass.$error }"
          @input="$v.user.pass.$touch()"
          id="password"
        ></b-form-input>
        <small
          class="text-danger"
          v-if="$v.user.pass.$error"
        >Bu alan zorunludur. En az 6 karakter uzunluğunda olmalıdır.</small>
      </b-form-group>

      <b-button @click="logIn()" variant="primary" :disabled="isSubmitted">
        Giriş Yap
        <b-spinner small v-if="isSubmitted"></b-spinner>
      </b-button>

      <hr />

      <router-link :to="{ name: 'sign-up' }" class="link" tag="a">Hesabın yoksa üye ol.</router-link>
    </b-card-text>
  </b-card>
</template>

<script>
import firebase from 'firebase';
import { required, email, minLength } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      user: {
        email: '',
        pass: '',
      },
      alertMessage: 'Giriş yapılamadı. Tekrar deneyin.',
      isAlert: null,
      isSubmitted: null,
    };
  },
  validations: {
    user: {
      email: {
        required,
        email,
      },
      pass: {
        required,
        minLength: minLength(6),
      },
    },
  },
  methods: {
    logIn() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.isSubmitted = true;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.user.email, this.user.pass)
          .then(() => {
            this.$store.dispatch('logIn');
            this.isSubmitted = false;
          })
          .catch(() => {
            this.isAlert = true;
            this.isSubmitted = false;
          });
      }
    },
  },
};
</script>
