<template>
    <ul class="catalog__pagination pagination">
      <li class="pagination__item">
        <a class="pagination__link pagination__link--arrow" href="#" aria-label="Предыдущая страница" :class="{'pagination__link--disabled': page ===  1}" @click.prevent="paginate(page - 1)">
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-left"></use>
          </svg>
        </a>
      </li>
      <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
        <a class="pagination__link" href="#" :class="{'pagination__link--current': pageNumber == page}" @click.prevent="paginate(pageNumber)">
          {{pageNumber}}
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link pagination__link--arrow" href="#" aria-label="Следующая страница" :class="{'pagination__link--disabled': page ===  pages}" @click.prevent="paginate(page + 1)">
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </a>
      </li>
    </ul>
</template>

<script>
export default {
  props: ['page', 'count', 'perPage'],
  computed: {
    pages () {
      return Math.ceil(this.count / this.perPage)
    }
  },
  methods: {
    paginate (page) {
      if (page > this.pages) {
        page = this.pages
      } else if (page < 1) {
        page = 1
      }
      return this.$emit('update:page', page)
    }
  }
}
</script>
