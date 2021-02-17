<template>
<v-app id="inspire">
        <app-snackbar></app-snackbar>
        <v-navigation-drawer v-model="drawer" app>
            <template v-slot:prepend>
                <v-list-item two-line>
                    <v-list-item-avatar color="primary">
                        <v-icon dark>mdi-account-circle</v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>{{user.name}}</v-list-item-title>
                        <v-list-item-subtitle>Last Login: </v-list-item-subtitle>                             
                        <v-list-item-subtitle>{{user.last_login_at}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>

            <v-divider></v-divider>
            <v-list dense nav>
                <template v-for="item in items">
                <v-list-group                
                    v-if="item.children"                 
                    :key="item.title" 
                    :prepend-icon="item.icon" 
                    :append-icon="item['icon-alt'] ? item['icon-alt'] : ''"
                >
                    <template v-slot:activator>                    
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </template>
                    <v-list-item class="ml-5" v-for="(child, i) in item.children" :key="i" router :to="child.link">
                        <v-list-item-icon  v-if="child.icon" >
                            <v-icon v-text="child.icon"></v-icon>
                        </v-list-item-icon>       
                        <v-list-item-title v-text="child.title"></v-list-item-title>                            
                    </v-list-item>
                </v-list-group>

                <v-list-item v-else :key="item.title" link router :to="item.link" >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                </template>
            </v-list>

            <template v-slot:append>
                <div class="pa-1">
                    <v-btn text block color="primary" @click="changePasswordDialog = true">
                        Change Password
                    </v-btn>
                <div class="pa-1">
                </div>
                <v-btn text block color="info" @click="logout">
                    Logout
                </v-btn>
                </div>
            </template>
        </v-navigation-drawer>

        <v-app-bar app class="primary" dark>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Bus</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>
        <v-footer padless class="font-weight-medium secondary" dark>
            <v-col class="text-center" cols="12">
                <span class="px-4">&copy; {{ new Date().getFullYear() }} - Bus (incub8)</span>
            </v-col>
        </v-footer>
  </v-app>
</template>

<script>
    export default {
        data: () => ({ 
            changePasswordDialog: false,
            drawer: null ,
             items: [
                { title: 'Locate', icon: 'mdi-bus-marker',link: '/locate', slug: '' },
                { title: 'Buses', icon: 'mdi-bus',link: '/buses', slug: '' },
                { title: 'Stops', icon: 'mdi-bus-stop',link: '/stops', slug: '' },
            ],
        
        }),
        computed: {
            user() {
                return this.$store.getters['user/profile']
            }
        },
        mounted() {            
            this.getUser();
        },
        methods: {
            logout() {
                this.$store.dispatch('user/authLogout')
                .then(() => {
                    window.location.replace('/login')
                }).catch((err) => {
                    console.log(err)
                    window.location.replace('/login')
                });
            },
            getUser() {
                 this.$store.dispatch('user/userRequest')
                 .then(() => {
                }).catch((err) => {
                    console.log(err)
                    //window.location.replace('/login')
                });
            },          
        }
    }</script>
