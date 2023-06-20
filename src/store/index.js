import Vue from 'vue'
import Vuex from 'vuex'
import state from "./modules/state";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        state
    }
})

export default store