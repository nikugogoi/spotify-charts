<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="container">
        <div class="navbar-brand">
          <a
            class="navbar-item"
            href="/"
          >
            <!-- <span class="icon">
              <i class="fas fa-utensils fa-lg"></i>
            </span> -->
            <img width="112" src="~/assets/images/spotify.svg">
            <b>Chart Busters</b>
            <!-- <img
              src="~assets/buefy.png"
              alt="Buefy"
              height="28"
            > -->
          </a>
          <div @click="showMenu=!showMenu" class="navbar-burger">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div class="navbar-menu is-hidden-desktop" :class="{'is-active': showMenu}">
          <songs-control class="navbar-start">
          </songs-control>
        </div>
      </div>
    </nav>

    <section class="main-content section">
      <div class="container">
        <div class="columns">
          <aside class="column is-2 is-hidden-touch">
            <!-- <p class="menu-label is-hidden-touch">General</p> -->
            <songs-control class="menu-list">
            </songs-control>
          </aside>
          <div class="column">
            <nuxt />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import songsControl from '~/components/songsControl'

export default {
  components : { songsControl },

  data() {
    return {
      showMenu: false
    }
  }
}
</script>
