export default {
    state: {
        current_package: false,
        table_data: [],
    },
    mutations: {
        resetCurrentPackage(state){
            state.current_package = false
        },
        resetTableData(state){
            state.table_data = []
        },
        setVideoSpeed(state, payload){
            state.videoSpeed = payload
        },
        setCurrentPackage(state, payload){
            state.current_package = payload
        },
        setTableData(state, payload){
            state.table_data = payload
        } 
    },
    actions: {
        resetCurrentPackage({commit}){
            commit('resetCurrentPackage')
        },
        resetTableData({commit}){
            commit('resetTableData')
        },
        setCurrentPackage({commit} , payload){
            commit('setCurrentPackage', payload)
        },
        setTableData({commit}, payload){
            commit('setTableData', payload)
        }
    },
    getters: {
        current_package: state => state.current_package,
        table_data: state => state.table_data
    }
}