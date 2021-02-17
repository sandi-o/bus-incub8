<template>
    <v-dialog v-model="dialog" max-width="900px" persistent scrollable>
        <v-card>
            <v-card-title></v-card-title>
            <v-card-text>
                <v-data-table
                    :headers="headers"
                    :items="stops"
                    :items-per-page="10"
                    class="elevation-1"
                    sort-by="id"
                    sort-desc
                    show-select
                    :loading="tableLoader"
                    loading-text="Fetching Data, Please wait..."
                    v-model="selected"
                    @item-selected="row"  
                    @toggle-select-all="rows"  
                >
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title>Add Bus Stops</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>    
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn 
                                        v-on="on"
                                        class="mb-2 ml-1" 
                                        color="info"
                                        fab 
                                        dark 
                                        small
                                        @click="initialize" 
                                        :loading="tableLoader"
                                    ><v-icon dark>mdi-refresh</v-icon>
                                    </v-btn> 
                                </template>
                                <span>Refresh</span>
                            </v-tooltip>
                        </v-toolbar>
                    </template>
                </v-data-table>
            </v-card-text>
            <v-card-actions>
                <v-btn color="error" outlined @click="close" :disabled="disabled">
                    <v-icon right dark>mdi-cancel</v-icon>            
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>        
    </v-dialog>
</template>

<script>

export default {
    props: {
        dialog: Boolean ,
        index : {type: Number, default: -1}              
    },
    data () {
		return {
			disabled: false,
            selected: [],
            tableLoader: false,   
		}
    },
    computed: {
        stops() {
          	return this.$store.getters['stop/stops'];
        },
        bus() {
            return this.$store.getters['bus/bus']
        },
        headers () {
           	return [
				{ text: 'Id', value: 'id',},
                { text: 'Name', value: 'name'},
				{ text: 'Code', value: 'code'},
                { text: 'Description', value: 'description' },
			];
		},	
    },
    created() {
		this.initialize();
	},
	methods: {	
        close() {
            this.selected = []            
            this.$store.commit('bus/CLEAR_BUS');
            this.$emit('refresh')
            this.$emit('update:index', -1)
            this.$emit('update:dialog', false)
        },
		initialize() {
			this.tableLoader = true
			this.$store.dispatch('stop/fetchData')
				.then(response => {
					this.tableLoader = false
                    this.setCheckedValues()
				})
				.catch(err => {
					this.tableLoader = false
				}) 
		},
        row (item) {
            this.$store.dispatch('bus_stop/apply', {id:item.item.id, value: item.value, bus_id: this.bus.id})
            .then(response => {
                setTimeout(() => { this.$store.commit('snackbar/CLEAR_SNACKBAR');},4000);
            }).catch(error => {console.log(error)});
        },
        rows (value){
            this.$store.dispatch('bus_stop/applyAll', {value: value.value, bus_id: this.bus.id})
            .then(response => {
                 setTimeout(() => { this.$store.commit('snackbar/CLEAR_SNACKBAR');},4000);
            }).catch(error => {console.log(error)});
        },        
        setCheckedValues() {
            var stops =  this.stops;
            
            for(var stop of stops) {              
                let result = _.find(this.bus.stops, function (o) {return o.id == stop.id});
                if(result != undefined) {
                    this.selected.push(stop);
                }
            }
        }   	
	}
}
</script>