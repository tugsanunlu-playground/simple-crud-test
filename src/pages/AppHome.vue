<template>
  <b-card tag="article">
    <strong slot="header">İstatistikler</strong>
    <b-card-text>
      Kitaplıkta toplam
      <strong>{{ totalCount }}</strong> kitap var.
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  computed: {
    totalCount() {
      return this.$store.getters.totalCount;
    },
  },
  created() {
    this.$store.dispatch('totalCount');
  },
};
</script>
