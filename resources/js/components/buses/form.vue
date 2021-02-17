<template>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
	<v-card>        
        <v-card-title>{{ formTitle }}</v-card-title>
        <v-card-text>
            <v-container>
                <v-row>                                                     
                    <v-col cols="12">
                        <v-text-field
                            v-model="bus.plate_no"
                            label="*VRN"
                            :rules="rules.plate_no"
                            outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            v-model="bus.model"
                            label="*Model"
                            required
                            :rules="rules.model"
                            outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            v-model="bus.capacity"
                            label="Capacity"
                            type="Number"
                            min=0
                            outlined
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-btn color="error" outlined @click="close" :disabled="disabled">
                <v-icon right dark>mdi-cancel</v-icon>            
                Cancel
            </v-btn>
            <v-spacer></v-spacer>           
            <v-btn color="primary" outlined @click="save" :loading="loading">
                <v-icon right dark>mdi-content-save</v-icon>
                Save
            </v-btn>
        </v-card-actions>
       
    </v-card>
    </v-form>
</template>

<script>
export default {
    props: {
        dialog: Boolean,
        index : {type: Number, default: -1}        
    },
    data: () => ({
        disabled: false,
        bus: {},        
        loading: false,
        rules: {            
            plate_no: [v => !!v || 'VRN is required',],
            model: [v => !!v || 'Model is required',],
        },
        valid: true
    }),
    created() {
        this.bus = Object.assign({},  this.$store.getters['bus/bus']);        
    },
    computed: {             
        formTitle () {
            return this.bus.id == undefined ? "New Bus" : "Edit Bus (#"+this.bus.id+")";
        },     
    }, 
    methods: {
        close() {
            if(this.bus.id != undefined) {
                this.bus = {}
                this.$store.commit('bus/CLEAR_BUS');
                this.$emit('update:index', -1)    
            }

            this.$emit('refresh')
            this.$emit('update:dialog', false)
        },
        save() {
            if(this.$refs.form.validate()) {
                let action = 'bus/create'
                if(this.bus.id != undefined) {
                    action = 'bus/update'
                    this.bus._method = 'PATCH'
                }

                this.disabled = true;
                this.loading = true;                
                this.$store.dispatch(action,this.bus)
                .then(response => {
                    this.close();
                    this.loading = false;
                    this.disabled = false;
                    setTimeout(() => {                
                        this.$store.commit('snackbar/CLEAR_SNACKBAR');
                    },4000);                  
                })
                .catch(err => {
                    this.loading = false;
                    this.disabled = false;
                     setTimeout(() => {                
                        this.$store.commit('snackbar/CLEAR_SNACKBAR');
                    },4000); 
                });
            }
        }

    }
}
</script>