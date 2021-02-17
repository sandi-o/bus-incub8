import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const opts = {
    theme: { 
        themes: {
            light: {
                primary: '#3f51b5',
                secondary: '#2196f3',
                accent: '#00bcd4',
                error: '#f44336',
                warning: '#ffc107',
                info: '#607d8b',
                success: '#4caf50'
              },
        }
    },
}

export default new Vuetify(opts)