export default {
  state:{
    tabList:[
      {
        path: '/home',
        name: 'AdminHome',
        label: '基本信息',
      },
    ],
    currentMenu :null
  },
  mutations:{
    selectMenu(state,val){
      if(val.name !== 'home'){
        state.currentMenu = val
        const result = state.tabList.findIndex(item=>item.name === val.name)
        if(result === -1){
          state.tabList.push(val)
        }else{
          state.currentMenu = null
        }
      }
    },
    closeTag(state,val){
      const result =  state.tabList.findIndex(item=> item.name === val.name)
      state.tabList.splice(result,1)
    }
  },

}