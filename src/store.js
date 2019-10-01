import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import firebase from 'firebase';
import createPersistedState from 'vuex-persistedstate';
import router from './router';

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    books: [],
    book: {},
    isListLoader: true,
    totalCount: 0,
    isLogin: false,
  },
  mutations: {
    initLibrary(state, books) {
      state.isListLoader = false;
      state.books = books;
    },
    addToLibrary(state, book) {
      state.books.push(book);
    },
    removeFromLibrary(state, id) {
      state.books.splice(state.books.findIndex(e => e.id === id), 1);
    },
    updateLibrary(state, book) {
      state.books.splice(state.books.findIndex(e => e.id === book.id), 1, book);
    },
    getBook(state, book) {
      state.book = book;
    },
    totalCount(state, totalCount) {
      state.totalCount = totalCount;
    },
    logIn(state) {
      state.isLogin = true;
    },
    logOut(state) {
      state.isLogin = false;
    },
  },
  actions: {
    initLibrary({ commit }) {
      axios.get('/books.json')
        .then((response) => {
          const { data } = response;
          const commitArr = [];
          if (data) {
            Object.keys(data).forEach((id) => {
              data[id].id = id;
              commitArr.push(data[id]);
            });
          }
          commit('initLibrary', commitArr);
        });
    },
    addToLibrary({ commit }, book) {
      const meta = {
        date: new Date().toLocaleDateString('tr-TR'),
        member: {
          id: firebase.auth().currentUser.uid,
          email: firebase.auth().currentUser.email,
        },
      };
      const bookWithMeta = { ...book, meta };
      axios.post('/books.json', bookWithMeta)
        .then(() => {
          commit('addToLibrary', bookWithMeta);
          router.push({ name: 'books' });
        });
    },
    removeFromLibrary({ commit }, id) {
      axios.delete(`/books/${id}.json`)
        .then(() => {
          commit('removeFromLibrary', id);
        });
    },
    updateLibrary({ commit }, book) {
      axios.put(`/books/${book.id}.json`, book)
        .then(() => {
          commit('updateLibrary', book);
          router.push({ name: 'books' });
        });
    },
    getBook({ commit }, id) {
      axios.get(`/books/${id}.json`)
        .then((response) => {
          commit('getBook', { id, ...response.data });
        });
    },
    totalCount({ commit }) {
      axios.get('/books.json')
        .then((response) => {
          commit('totalCount', Object.keys(response.data).length);
        });
    },
    logIn({ commit }) {
      commit('logIn');
      router.push({ name: 'home' });
    },
    logOut({ commit }) {
      firebase.auth().signOut().then(() => {
        commit('logOut');
        router.push({ name: 'log-in' });
      });
    },
  },
  getters: {
    books: state => state.books,
    book: state => state.book,
    totalCount: state => state.totalCount,
    isListLoader: state => state.isListLoader,
    isLogin: state => state.isLogin,
  },
});

export { store as default };
