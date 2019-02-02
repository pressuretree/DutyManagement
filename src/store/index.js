import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  //存储用户权限信息，初始时为空
  loginuser: {}
}

const getters = {
  getRoles: state => state.loginuser,
}

const mutations = {
  //添加用户权限，如果存在，不添加
  addRoles(state,{loginuser}) {
    state.loginuser = loginuser;
  }
}

const actions = {
  addRoles:({commit},{loginuser}) =>{
    commit('addRoles',{loginuser});
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
