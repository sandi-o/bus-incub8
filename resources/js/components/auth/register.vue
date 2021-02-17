<template>
    <v-app>
        <app-snackbar></app-snackbar>
        <v-main>
            <v-container fluid>
                <v-card class="mx-auto my-12" max-width="600">
                <v-form ref="register-form" v-model="valid" lazy-validation @submit.prevent="register">
                <v-img class="white--text align-end" src="../background.jpg" height="200px">
                    <v-card-title>Register</v-card-title>
                </v-img>        
                <v-card-text>
                    <v-text-field
                        label="Name"
                        v-model="name"
                        prepend-icon="mdi-account"
                        :rules="nameRules"
                        type="text"
                        clearable
                        required                                        
                    ></v-text-field>
                    <v-text-field
                        label="E-mail Address"
                        v-model="email"
                        prepend-icon="mdi-email"
                        :rules="emailRules"
                        type="text"
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
                    <v-btn :disabled="!valid" type="submit" color="primary" :loading="loading">Register</v-btn>
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
        name: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 190) || 'Name must be less than 190 characters',
        ],
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
    methods: {
        register() {
             if(this.$refs['register-form'].validate()) {
                this.loading = true;
                this.$store.dispatch('user/authRequest', {
                    'action': 'register',
                    'email': this.email,
                    'password': this.password,
                    'password_confirmation': this.password_confirmation,
                    'name': this.name
                }).then(() => {
                    this.loading = false;
                    window.location.replace('/home')
                }).catch(err => {
                    this.loading = false;
                    setTimeout(() => { this.$store.commit('snackbar/CLEAR_SNACKBAR');},4000); 
                });
            }
        }
    }
}
</script>