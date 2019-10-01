<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark" class="mb-5">
      <router-link class="navbar-brand" tag="b-navbar-brand" exact :to="{ name: 'home' }">My-library</router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link
            v-if="isLogin"
            class="nav-link"
            tag="b-nav-item"
            exact
            :to="{ name: 'books' }"
            active-class="active"
          >Kitaplar</router-link>

          <router-link
            v-if="isLogin"
            class="nav-link"
            tag="b-nav-item"
            exact
            :to="{ name: 'new-book' }"
            active-class="active"
          >Yeni Kitap Ekle</router-link>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <router-link
            v-if="!isLogin"
            class="nav-link"
            tag="b-nav-item"
            exact
            :to="{ name: 'sign-up' }"
            active-class="active"
          >Kayıt Ol</router-link>

          <router-link
            v-if="!isLogin"
            class="nav-link"
            tag="b-nav-item"
            exact
            :to="{ name: 'log-in' }"
            active-class="active"
          >Giriş Yap</router-link>

          <b-nav-item v-if="isLogin" @click.prevent="logOut" class="nav-link">Oturumu Kapat</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container>
      <transition enter-active-class="animated fadeIn">
        <router-view :id="$route.path"></router-view>
      </transition>
    </b-container>
  </div>
</template>

<script>
export default {
  methods: {
    logOut() {
      this.$store.dispatch('logOut');
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
};
</script>
