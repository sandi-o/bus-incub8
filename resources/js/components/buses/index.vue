<template>
    <v-container fluid>
        <v-text-field
			v-model="search"
			append-icon="mdi-magnify"
			label="Search"
			single-line
			hide-details
			clearable
			outlined
		></v-text-field>    
        <v-data-table
			:headers="headers"
			:items="buses"
			:items-per-page="10"
			class="elevation-1"
			sort-by="id"
			sort-desc
			:loading="tableLoader"
			loading-text="Fetching Data, Please wait..."
			:search="search"
        >
            <template v-slot:top>
				<v-toolbar flat>
                    <v-toolbar-title>Buses</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog
                        v-model="dialog"
                        max-width="700px"
						persistent
						scrollable
                    >
						<template v-slot:activator="{ on, attrs }">
							<v-btn
								color="primary"
								dark
								class="mb-2"
								v-bind="attrs"
								v-on="on"
							>
							New
							</v-btn>
						</template>
						<bus-form
							v-if="dialog"
							:dialog.sync="dialog"
							:index.sync ="editedIndex"
							@refresh="initialize"
						></bus-form>                                       		
					</v-dialog>   
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
			<template v-slot:item.actions="{ item }">
				<v-tooltip bottom>
            		<template v-slot:activator="{ on }">
						<v-icon
							color="accent"
							v-on="on"
							class="ml-1 mr-1"
							@click="edit(item)"
						>
							mdi-pencil
						</v-icon>
					</template>
					<span>Edit</span>
        		</v-tooltip>               
				<v-tooltip bottom>
            		<template v-slot:activator="{ on }">
						<v-icon
							v-on="on"
							color="red"
							class="ml-1 mr-1"
							@click="stops(item)"
						>
							mdi-bus-stop
						</v-icon>
					</template>
					<span>Stops</span>
        		</v-tooltip>
			</template>
        </v-data-table>
        <bus-stop
            v-if='stopDialog' 
            :dialog.sync="stopDialog" 
            :index.sync ="editedIndex" 
            @refresh="initialize"
        ></bus-stop>	
    </v-container>
</template>

<script>
import BusForm from '@/js/components/buses/form';
import BusStop from '@/js/components/bus_stop/index';

export default {
    components: {
		BusForm,
        BusStop
	},
    data () {
		return {
			dialog: false,
			editedIndex: -1,
			search: '',			
			stopDialog: false,
            tableLoader: false,	            
		}
    },
    computed: {
        buses() {
          	return this.$store.getters['bus/buses'];
        },
        headers () {
           	return [
				{ text: 'Id', value: 'id',},
                { text: 'VRN', value: 'plate_no'},
				{ text: 'Model', value: 'model'},
                { text: 'Type', value: 'type'},
                { text: 'Capacity', value: 'capacity' },              
                { text: 'Last Update', value: 'updated_at' },                
				{ text: 'Actions', value: 'actions', sortable: false, filterable: false },
			];
		},	
    },
    created() {
		this.initialize();
	},
	methods: {	
		edit(rowItem) {
			this.editedIndex = this.buses.indexOf(rowItem)
        	this.$store.commit('bus/SET_BUS',rowItem);
        	this.dialog = true
		},
		initialize() {
			this.tableLoader = true
			this.$store.dispatch('bus/fetchData')
				.then(response => {
					this.tableLoader = false
				})
				.catch(err => {
					this.tableLoader = false
				}) 
		},
        stops(rowItem) {
            this.editedIndex = this.buses.indexOf(rowItem)
        	this.$store.commit('bus/SET_BUS',rowItem);
        	this.stopDialog = true
        }	
	}
}
</script>