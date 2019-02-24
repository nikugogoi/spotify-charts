<template>
  <div class="listing">
    <form @submit.prevent="search()">
      <b-field grouped group-multiline>
          <!-- <b-select placeholder="Currency">
          </b-select> -->
          <b-input v-model="query" expanded type="text" placeholder="Search for songs or artists"></b-input>
          <p class="control">
              <a @click="search('artists')" class="button is-primary">Search by Artist</a>
          </p>
          <p class="control">
              <a @click="search('name')" class="button is-primary">Search by Song</a>
          </p>
      </b-field>
    </form>
    <div class="songs">
      <card
        v-for="song in songs"
        :key="song.rank"
        :song="song"
      >
      </card>
    </div>
    <p class="has-text-centered loader-container" ref="paginate">
      <!-- loading -->
      <b-icon
        v-show="fetching"
        icon="loading"
        size="is-large"
        custom-class="spin">
      </b-icon>
    </p>
  </div>
</template>

<script>
import Card from '~/components/Card'
import throttle from 'lodash/throttle'

export default {
  name: 'HomePage',

  components: {
    Card
  },

  watchQuery: ['type', 'q', 'order_by', 'order_direction', 'filters[time_signature]'],

  async asyncData ({ query, error, $axios }) {
    try{
      const { result:songs, pages} = await $axios.$get('/songs', { params : query })
      return {
        songs,
        pages
      }
    }catch(err){
      error(err)
    }
  },

  data(){
    return {
      query: "",
      fetching: false,
      filters : {
        page : 1
      },
    }
  },

  mounted(){
    document.onscroll = throttle(()=>{
			if(this.fetching)
        return
      if(this.$refs.paginate.getBoundingClientRect().top <= window.innerHeight){
        this.getSongs()
      }
		},500)
  },

  methods : {
    search(type){
      this.$router.push(
        {
          path : '/', 
          query : { ...this.$route.query, q: this.query, type }
        } 
      )
    },
    async getSongs(){
      if(++this.filters.page > this.pages)
  			return
      this.fetching = true
      const { result:songs, pages} = await this.$axios.$get('/songs', { params : { ...this.$route.query, ...this.filters, q: this.query }})
      this.pages = pages
			Array.prototype.push.apply(this.songs, songs);
			this.fetching = false
    }
  },

  destroyed(){
	  document.onscroll = null
  }

}
</script>

<style lang="sass">
.listing
  .search-box
    margin-bottom : 1rem
  .songs
    .card
      margin-top: .5rem
  .loader-container
    margin-top: 1rem
    .icon
      .mdi.spin
        animation-name: spin
        animation-duration: 1000ms
        animation-iteration-count: infinite
        animation-timing-function: linear
@keyframes spin
  from
    transform: rotate(0deg)
  to
    transform: rotate(360deg)
</style>
