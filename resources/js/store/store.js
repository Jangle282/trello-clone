import Vue from 'vue';
import Vuex from 'vuex';
import column from './modules/column'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        column : column
    }
})

export default {
    store
}
