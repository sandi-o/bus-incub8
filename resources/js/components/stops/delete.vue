<template>
    <v-dialog v-model="dialog" max-width="500" persistent scrollable>
        <v-card>
            <v-card-title>{{title}}</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="6">
                            <div class="caption">Name</div>
                            <div class="body-1">{{stop.name}}</div>
                        </v-col>
                          <v-col cols="12" md="6">
                            <div class="caption">Code</div>
                            <div class="body-1">{{stop.code}}</div>
                        </v-col>                  
                        <v-col cols="12">
                            <div class="caption">Description</div>
                            <div class="body-1">{{stop.description}}</div>
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
                <v-btn color="primary" outlined @click="remove" :loading = "loading">
                    <v-icon right dark>mdi-delete-circle</v-icon>
                    Delete
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        dialog: Boolean,
        index : {type: Number, default: -1}
    },
    data: () => ({
        disabled: false,
        loading: false,
    }),
    computed: {
        stop () {
            return this.$store.getters['stop/stop']
        },
        title() {
            return "Delete this Stop / Location: " + this.stop.id
        }
    },
    methods: {
        close() {
            this.$store.commit('stop/CLEAR_STOP');
            this.$emit('update:index', -1)    
            this.$emit('reload')
            this.$emit('update:dialog', false)
        },
        remove() {
            this.loading = true
            this.disabled = true
            this.$store.dispatch('stop/remove',{'id':this.stop.id})
                .then(response => {
                    this.loading = false
                    this.disabled = false                    
                    this.close()
                    setTimeout(() => {                
                        this.$store.commit('snackbar/CLEAR_SNACKBAR');
                    },4000);
                })
                .catch(err => {
                    this.loading = false
                    this.disabled = false
                    setTimeout(() => {                
                        this.$store.commit('snackbar/CLEAR_SNACKBAR');
                    },4000);
                })
        }
    }
}
</script>