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
			:items="stops"
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
                    <v-toolbar-title>Stops</v-toolbar-title>
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
						<stop-form
							v-if="dialog"
							:dialog.sync="dialog"
							:index.sync ="editedIndex"
							@refresh="initialize"
						></stop-form>                                       		
					</v-dialog>
                    <remove-form 
                        v-if = 'removeDialog' 
                        :dialog.sync = "removeDialog" 
                        :index.sync = "editedIndex" 
                        @reload="initialize"
                    ></remove-form>	     
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
							@click="remove(item)"
						>
							mdi-delete
						</v-icon>
					</template>
					<span>Delete</span>
        		</v-tooltip>
			</template>
        </v-data-table>
    </v-container>
</template>

<script>
import StopForm from '@/js/components/stops/form';
import RemoveForm from '@/js/components/stops/delete';

export default {
    components: {
		StopForm,
        RemoveForm,
	},
    data () {
		return {
			dialog: false,
			editedIndex: -1,
            removeDialog: false,
			search: '',			
			tableLoader: false,	
		}
    },
    computed: {
        stops() {
          	return this.$store.getters['stop/stops'];
        },
        headers () {
           	return [
				{ text: 'Id', value: 'id',},
                { text: 'Name', value: 'name'},
				{ text: 'Code', value: 'code'},
                { text: 'Description', value: 'description' },              
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
			this.editedIndex = this.stops.indexOf(rowItem)
        	this.$store.commit('stop/SET_STOP',rowItem);
        	this.dialog = true
		},
		initialize() {
			this.tableLoader = true
			this.$store.dispatch('stop/fetchData')
				.then(response => {
					this.tableLoader = false
				})
				.catch(err => {
					this.tableLoader = false
				}) 
		},	
		remove(rowItem) {
			this.editedIndex = this.stops.indexOf(rowItem)
        	this.$store.commit('stop/SET_STOP',rowItem);
        	this.removeDialog = true
        },   
	}
}
</script>