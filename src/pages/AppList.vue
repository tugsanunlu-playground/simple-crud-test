<template>
  <b-card tag="article">
    <strong slot="header">Kitaplar</strong>
    <b-card-text>
      <b-spinner v-if="isListLoader"></b-spinner>

      <div v-else>
        <b-table v-if="books.length > 0" striped bordered :fields="fields" :items="books">
          <template slot="Sıra" slot-scope="data">
            <strong>{{ data.index + 1 }}</strong>
          </template>

          <template slot="Düzenle" slot-scope="data">
            <router-link
              v-if="data.item.id"
              tag="a"
              exact
              :to="{ name: 'update-book', params: { id: data.item.id, book: data.item } }"
            >Düzenle</router-link>
          </template>

          <template slot="Sil" slot-scope="data">
            <b-link @click="removeBook(data.item.id)" variant="link">Sil</b-link>
          </template>
        </b-table>
        <b-alert v-else variant="info" show class="mb-0">Kitap bulunamadı.</b-alert>
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      fields: [
        'Sıra',
        { key: 'title', label: 'Kitap Adı' },
        { key: 'author', label: 'Yazar Adı' },
        { key: 'isbn', label: 'ISBN' },
        'Düzenle',
        'Sil',
      ],
    };
  },
  methods: {
    removeBook(id) {
      if (confirm('Emin misiniz?')) this.$store.dispatch('removeFromLibrary', id);
    },
  },
  computed: {
    ...mapGetters(['books', 'isListLoader']),
  },
  created() {
    this.$store.dispatch('initLibrary');
  },
};
</script>
