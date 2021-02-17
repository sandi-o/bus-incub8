<template>
<v-app>
    <app-snackbar></app-snackbar>
    <v-main>
        <v-container fluid>
            <v-card class="mx-auto my-12" max-width="600">
                <v-form ref="email-password-form" v-model="valid" lazy-validation @submit.prevent="reset">
                <v-img class="white--text align-end" src="../background.jpg" height="200px">
                    <v-card-title>Reset Password</v-card-title>
                </v-img>        
                <v-card-text>
                     <v-text-field
                        label="E-mail Address"
                        v-model="email"
                        prepend-icon="mdi-email"
                        :rules="emailRules"
                        type="text"
                        clearable
                        autofocus
                        required                                        
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="!valid" type="submit" color="primary" :loading="loading">Send Password Reset Link</v-btn>
                </v-card-actions>
                </v-form>
            </v-card>
        </v-container>
    </v-main>
</v-app>
</template>

<script>
export default {
    data: () => ({
        valid: true,
        loading: false,
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
    }),
    methods: {
        reset() {
            if(this.$refs['email-password-form'].validate()) {
                this.loading = true;
                this.$store.dispatch('user/resetPassword', {'email': this.email}).then(() => {
                    this.loading = false;
                    window.location.replace('/login')
                }).catch(err => {
                    this.loading = false;
                    setTimeout(() => { this.$store.commit('snackbar/CLEAR_SNACKBAR');},4000); 
                });
            }           
        }
    }
}
</script>