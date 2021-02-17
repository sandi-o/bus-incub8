<template>
    <v-app>
        <app-snackbar></app-snackbar>
        <v-main>
            <v-container fluid>
                  <v-card class="mx-auto my-12" max-width="600">                    
                    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="login">
                    <v-img class="white--text align-end" src="background.jpg" height="200px">
                        <v-card-title>Bus</v-card-title>
                    </v-img>
                    <v-card-text>
                            <v-text-field
                                label="E-mail"
                                v-model="email"
                                prepend-icon="mdi-email"
                                type="text"
                                clearable
                                autofocus
                                required                                        
                            ></v-text-field>
                            <v-text-field
                                label="Password"
                                v-model="password"
                                prepend-icon="mdi-lock"
                                type="password"
                                clearable
                                required
                            >
                            </v-text-field>
                            <v-checkbox
                                v-model="remember"
                                label="Remember Me"
                            >
                            </v-checkbox>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text @click="forgot">Forgot Password</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn type="submit" color="primary" :loading="loading">Login</v-btn>
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
        password: '',
        remember: false,
    }),
    methods: {
        forgot() {
            window.location.replace('/password/reset')
        },
        login () {
            this.loading = true;
            const {email, password, remember} = this;
            this.$store.dispatch('user/authRequest', {
                email, password, remember
            }).then(() => {
                this.loading = false;
                window.location.replace('/home')
            }).catch(err => {
                this.loading = false;
                setTimeout(() => { this.$store.commit('snackbar/CLEAR_SNACKBAR');},4000); 
            });
        },
    },
}
</script>