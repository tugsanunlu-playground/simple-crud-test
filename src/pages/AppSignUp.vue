<template>
  <b-card tag="article">
    <strong slot="header">Kayıt Ol</strong>
    <b-card-text>
      <div v-if="isAlert" class="alert alert-danger">{{ alertMessage }}</div>

      <b-form-group label="E-Posta Adresi:" label-for="email">
        <b-form-input
          v-model="user.email"
          @input="$v.user.email.$touch()"
          :class="{ 'border-danger' : $v.user.email.$error }"
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
          @input="$v.user.pass.$touch()"
          :class="{ 'border-danger' : $v.user.pass.$error }"
          id="password"
        ></b-form-input>
        <small
          class="text-danger"
          v-if="$v.user.pass.$error"
        >Bu alan zorunludur. En az 6 karakter uzunluğunda olmalıdır.</small>
      </b-form-group>

      <b-form-group label="Parola (Tekrar):" label-for="password-confirm">
        <b-form-input
          type="password"
          v-model="user.passConfirm"
          @input="$v.user.passConfirm.$touch()"
          :class="{ 'border-danger' : $v.user.passConfirm.$error }"
          id="password-confirm"
        ></b-form-input>
        <small class="text-danger" v-if="$v.user.passConfirm.$error">Parolalar eşleşmelidir.</small>
      </b-form-group>

      <b-button @click="signUp()" :disabled="isSubmitted" variant="primary">
        Kayıt Ol
        <b-spinner small v-if="isSubmitted"></b-spinner>
      </b-button>

      <hr />

      <router-link :to="{ name: 'log-in' }" class="link" tag="a">Hesabın varsa giriş yap.</router-link>
    </b-card-text>
  </b-card>
</template>

<script>
import firebase from 'firebase';
import { required, minLength, sameAs, email } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      user: {
        email: '',
        pass: '',
        passConfirm: '',
      },
      alertMessage: 'Kayıt yapılamadı. Tekrar deneyin.',
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
      passConfirm: {
        sameAsPassword: sameAs('pass'),
      },
    },
  },
  methods: {
    signUp() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.isSubmitted = true;
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.user.email, this.user.pass)
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
