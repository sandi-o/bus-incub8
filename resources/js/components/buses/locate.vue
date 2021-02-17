<template>
    <v-container fluid>
        <v-card>
            <v-card-title>Locate Bus</v-card-title>
            <v-card-text>                
                <v-row>
                    <v-col cols="12" md="3" sm="3">
                        <div class="caption">Nearest Bus Stop</div>
                        <div class="body-1">{{nearestStop}}</div>
                    </v-col>
                    <v-col cols="12" md="3" sm="3">
                        <div class="caption">Bus No.</div>
                        <div class="body-1">{{busNo}}</div>
                    </v-col>
                    <v-col cols="12" md="3" sm="3">
                        <div class="caption">Estimated Time of Arrival</div>
                        <div class="body-1">{{eta}} Minute(s)</div>
                    </v-col>
                    <v-col cols="12" md="3" sm="3">
                        <v-btn
                            outlined
                            color="primary"                            
                            :loading = "loading"
                            @click="initialize"
                            fab
                        >
                            <v-icon>mdi-fire</v-icon>
                        </v-btn>                                           
                    </v-col>   
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data () {
		return {
            busNo:'',
            nearestStop: '',			
			loading: false,	
            eta: 0
		}
    },
    computed: {
        buses() {
          	return this.$store.getters['bus/buses'];
        },
    },
    
    created() {
        this.initializeStops();
    },
    methods: {
        initialize() {
            const randomBus = Math.floor(Math.random() * this.buses.length);
            let incomingBus = this.buses[randomBus];
            this.busNo =  incomingBus.plate_no;

            const randomStop = Math.floor(Math.random() * incomingBus.stops.length);
            let nearest = incomingBus.stops[randomStop];
            this.nearestStop = "("+nearest.code+") "+ nearest.name;

            this.eta = Math.floor(Math.random() * 10);
        },	
		initializeStops() {
			this.loading = true
			this.$store.dispatch('bus/fetchData')
				.then(response => {
					this.loading = false
				})
				.catch(err => {
					this.loading = false
				}) 
		},	
	
	}
}
</script>

<style>

</style>