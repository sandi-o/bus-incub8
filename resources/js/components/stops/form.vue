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
                     <v-col cols="12" md="6">
                        <v-text-field
                            v-model="stop.name"
                            label="*Name"
                            :rules="rules.name"
                            outlined
                        ></v-text-field>
                    </v-col>
                     <v-col cols="12"  md="6">
                        <v-text-field
                            v-model="stop.code"
                            label="*Code"
                            required
                            :rules="rules.code"
                            outlined
                        ></v-text-field>
                    </v-col>    
                    <v-col cols="12">
                        <v-textarea 
                            auto-grow 
                            clearable 
                            v-model="stop.description" 
                            outlined
                            no-resize
                            label="Description"
                        >
                        </v-textarea>
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
        stop: {},        
        loading: false,
        rules: {            
            code: [v => !!v || 'Code is required',],
            name: [v => !!v || 'Name is required',],
        },
        valid: true
    }),
    created() {
        this.stop = Object.assign({},  this.$store.getters['stop/stop']);        
    },
    computed: {             
        formTitle () {
            return this.stop.id == undefined ? "New Stop" : "Edit Stop (#"+this.stop.id+")";
        },     
    }, 
    methods: {
        close() {
            if(this.stop.id != undefined) {
                this.stop = {}
                this.$store.commit('stop/CLEAR_STOP');
                this.$emit('update:index', -1)    
            }

            this.$emit('refresh')
            this.$emit('update:dialog', false)
        },
        save() {
            if(this.$refs.form.validate()) {
                let action = 'stop/create'
                if(this.stop.id != undefined) {
                    action = 'stop/update'
                    this.stop._method = 'PATCH'
                }

                this.disabled = true;
                this.loading = true;                
                this.$store.dispatch(action,this.stop)
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