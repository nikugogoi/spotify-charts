<template>
    <div>
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><nuxt-link to="/">Home</nuxt-link></li>
                <li class="is-active"><a href="#" aria-current="page">{{song.name}}</a></li>
            </ul>
        </nav>
        <div class="card">
            <div class="card-content">
                <nav class="level">
                    <div class="level-left">
                        <div class="level-item">
                            <h1 class="title">{{song.name}}</h1>
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="level-item">
                            <b-icon
                                icon="music-box-outline"
                                size="is-large"
                                type="is-primary"
                            />
                        </div>
                    </div>
                </nav>
                <h2 class="subtitle">by <b>{{song.artists}}</b></h2>
                <p>Current Rank : <b>{{song.rank}}</b></p>
                <p>Duration : <b>{{song.duration_ms | toMinutes}}</b></p>
                <div v-show="showExtras">
                    <p v-for="(val,key) in extras" :key="key">
                        {{key}}: <b>{{val}}</b>
                    </p>
                </div>
                <a class="has-text-success" @click="showExtras=!showExtras">{{showExtras?'Show Less':'Show More'}}</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    layout: 'single',

    async asyncData({ query, error, params, $axios }){
        try{
            const { result : song } = await $axios.$get(`/songs/${params.id}`)
            return {
                song
            }
        } catch(err){
            error(err)
        }
    },

    data(){
        return {
            showExtras: false
        }
    },

    filters : {
        toMinutes(val){
            const sec = val/1000
            const min = sec/60
            return `${min.toFixed()} mins ${(sec%60).toFixed()} secs`
        }
    },

    computed:{
        extras(){
            const { id, name, artists, duration_ms, rank, ...filtered } = this.song
            return filtered
        }
    }

}
</script>

<style>

</style>
