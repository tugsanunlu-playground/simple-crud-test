<template>
  <b-card tag="article">
    <strong slot="header" v-if="$route.params.id">Kitap Düzenle</strong>
    <strong slot="header" v-else>Yeni Kitap Ekle</strong>
    <b-card-text>
      <b-spinner v-if="isLoader && $route.params.id"></b-spinner>

      <div v-else>
        <b-form-group v-if="$route.params.id" label="Kitap Kodu:" label-for="id">
          <b-form-input id="id" v-model="$route.params.id" readonly disabled></b-form-input>
        </b-form-group>

        <b-form-group label="Kitap Adı:" label-for="title">
          <b-form-input
            id="title"
            v-model="book.title"
            :class="{ 'border-danger' : $v.book.title.$error }"
            @input="$v.book.title.$touch()"
          ></b-form-input>
          <small class="text-danger" v-if="$v.book.title.$error">Bu alan zorunludur.</small>
        </b-form-group>

        <b-form-group label="Yazar Adı:" label-for="author">
          <b-form-input
            id="author"
            v-model="book.author"
            :class="{ 'border-danger' : $v.book.author.$error }"
            @input="$v.book.author.$touch()"
          ></b-form-input>
          <small class="text-danger" v-if="$v.book.author.$error">Bu alan zorunludur.</small>
        </b-form-group>

        <b-form-group label="ISBN:" label-for="isbn">
          <b-form-input
            id="isbn"
            v-model="book.isbn"
            :class="{ 'border-danger' : $v.book.isbn.$error }"
            @input="$v.book.isbn.$touch()"
          ></b-form-input>
          <small
            class="text-danger"
            v-if="$v.book.isbn.$error"
          >Bu alan zorunludur. En fazla 13 karakter uzunluğunda olmalıdır.</small>
        </b-form-group>

        <b-alert v-if="book.meta.date" variant="info" show>
          <strong>{{ book.meta.date }}</strong> tarihinde
          <strong>{{ book.meta.member.email }}</strong> tarafından eklendi.
        </b-alert>

        <b-button
          variant="primary"
          @click="$route.params.id ? actionLibrary('updateLibrary') : actionLibrary('addToLibrary')"
          :disabled="isSubmitted"
        >
          {{ submitBtnText }}
          <b-spinner small v-if="isSubmitted"></b-spinner>
        </b-button>
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      book: {
        title: '',
        author: '',
        isbn: '',
        meta: {
          date: '',
        },
      },
      isLoader: true,
      isSubmitted: false,
      submitBtnText: '',
    };
  },
  validations: {
    book: {
      title: {
        required,
      },
      author: {
        required,
      },
      isbn: {
        required,
        maxLength: maxLength(13),
      },
    },
  },
  methods: {
    actionLibrary(action) {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.isSubmitted = true;
        this.$store.dispatch(action, this.book);
      }
    },
  },
  computed: {
    listInfos() {
      if (this.$route.params.id) return (this.book = this.$store.getters.book);
    },
  },
  watch: {
    listInfos() {
      this.isLoader = false;
    },
  },
  created() {
    if (this.$route.params.id) {
      this.$store.dispatch('getBook', this.$route.params.id);
      this.submitBtnText = 'Düzenle';
    } else {
      this.submitBtnText = 'Ekle';
    }
  },
};
</script>
