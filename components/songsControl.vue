<template>
    <div>
        <div class="navbar-item is-block">
            <b-field label="Sort By">
                <b-select @input="fireQuery" v-model="query.order_by" placeholder="Select a name">
                    <option
                        v-for="(field, key) in fields"
                        :value="key"
                        :key="key">
                        {{ field }}
                    </option>
                </b-select>
            </b-field>
            <div class="field">
                <b-radio @input="fireQuery" v-model="query.order_direction" native-value="ASC">
                    Low to High
                </b-radio>
            </div>
            <div class="field">
                <b-radio @input="fireQuery" v-model="query.order_direction" native-value="DESC">
                    High to Low
                </b-radio>
            </div>
        </div>
        <div class="navbar-item is-block">
            <b-field label="Time Signature" :addons="false">
                <b-checkbox @input="fireQuery" v-model="query.filters.time_signature"
                    native-value="3">
                    3
                </b-checkbox>
                <b-checkbox @input="fireQuery" v-model="query.filters.time_signature"
                    native-value="4">
                    4
                </b-checkbox>
                <b-checkbox @input="fireQuery" v-model="query.filters.time_signature"
                    native-value="5">
                    5
                </b-checkbox>
            </b-field>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            query:{
                order_by: 'rank',
                order_direction: 'ASC',
                filters: {
                    time_signature: []
                }
            },
            fields : {
                rank: 'rank',
                duration_ms: 'Duration',
                tempo: 'Tempo',
                valence: 'Valence',
                liveness: 'Liveness',
                instrumentalness: 'Instrumentalness',
                acousticness: 'Acousticness',
                speechiness: 'Speechiness',
                loudness: 'Loudness',
                energy: 'Energy',
                danceability: 'Danceability'
            }
        }
    },

    methods: {
        fireQuery(){
            let {filters, ...query} = this.query
            filters = Object.entries(filters)
                            .reduce((acc, [key, val])=>{
                                acc[`filters[${key}]`]=JSON.stringify(val)
                                return acc
                            }, {})
            query = {...query, ...filters}
            this.$router.push({path: '/', query: {...this.$route.query, ...query}})
        }
    }
}
</script>

<style>

</style>
