<template>
  <nuxt-link tag="div" :to="`songs/${song.id}`" class="card">
    <!-- <header class="card-header">
      <p class="card-header-title has-text-grey">
        {{ title }}
      </p>
    </header> -->
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <b-icon
              icon="music"
              size="is-large"
              type="is-primary"
            />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-5">{{song.name}}</p>
          <p class="subtitle is-6">by <b class="has-text-success">{{song.artists}}</b></p>
        </div>
        <div class="media-right">
          <p class="subtitle is-6 has-text-weight-bold">#{{song.rank}}</p>
        </div>
      </div>
    </div>
    <!-- <footer class="card-footer">
      <div class="card-footer-item">
        <slot />
      </div>
    </footer> -->
  </nuxt-link>
</template>

<script>
export default {
  props: {
    song: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="sass" scoped>
.card
  cursor: pointer
  &:hover
    transform: scale(1.01)
    transition: all .5s
</style>
