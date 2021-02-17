<template>
<v-app>
    <app-snackbar></app-snackbar>
    <v-main>
        <v-container fluid>
              <v-card class="mx-auto my-12" max-width="600">
                <v-form ref="reset-password-form" v-model="valid" lazy-validation @submit.prevent="update">
                <v-img class="white--text align-end" src="../../background.jpg" height="200px">
                    <v-card-title>Reset Password</v-card-title>
                </v-img>  
                <v-card-text>
                    <v-text-field
                        label="E-mail Address"
                        v-model="email"
                        prepend-icon="mdi-email"
                        type="text"
                        :rules="emailRules"
                        clearable
                        required                                        
                    ></v-text-field>
                    <v-text-field
                        label="Password"
                        v-model="password"
                        prepend-icon="mdi-lock"
                        :type="showPassword ? 'text' : 'password'"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="() => (showPassword = !showPassword)"
                        clearable
                        required
                    ></v-text-field>
                    <v-text-field
                        label="Confirm Password"
                        v-model="password_confirmation"
                        prepend-icon="mdi-lock-check"
                        :type="showPasswordConfirmation ? 'text' : 'password'"
                        :append-icon="showPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="() => (showPasswordConfirmation = !showPasswordConfirmation)"
                        clearable
                        required
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="!valid" type="submit" color="primary" :loading="loading">Reset Password</v-btn>
                </v-card-actions>
                </v-form>
            </v-card>
        </v-container>
    </v-main>
</v-app>
</template>

<script>
export default {
    props: {
        email_address: String,
        token: String,
    },
    data: () => ({
        showPassword: false,
        showPasswordConfirmation: false,        
        valid: true,
        loading: false,
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        password: '',
        password_confirmation: '',
    }),
    created() {
        this.email = this.email_address
    },
    methods: {
        update() {
            if(this.$refs['reset-password-form'].validate()) {
                this.loading = true;
                this.$store.dispatch('user/authRequest', {
                    'action': 'password-reset',
                    'email': this.email,
                    'password': this.password,
                    'password_confirmation': this.password_confirmation,
                    'token': this.token
                }).then(() => {
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