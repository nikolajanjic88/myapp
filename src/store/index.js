import { createStore } from 'vuex'

export default createStore({
  state() {
    return{
      isAuthenticated :false,
      Name:'',
      Email:'',
      Password:'',
      ProfileImages:'',
      storedSid:'',
      storedUname:'',
      idKorisnikaLoginStore:''
     
    }
  },
  
  mutations: {
    SET_ID_KORISNIKA_LOGIN_STORE(state,payload){
      state.idKorisnikaLoginStore = payload.idKorisnikaLogin
    },
    SET_STATE(state,payload){
      
      state.Name = payload.korisnickoImeInput,
      state.LastName = payload.emailInput,
      state.Password = payload.lozinkaInput,
      state.ProfileImages = payload.ProfileImages
    },
    SET_BOOLEAN(state,payload){
      state.isAuthenticated=payload
      localStorage.setItem('isAuthenticatedLS',payload)
    },
    SET_SESSION_ID(state,payload){
      state.storedSid=payload
      localStorage.setItem('storeSid',payload)
    },
    PREVIEW_USER_NAME(state,payload){
      state.storedUname=payload
      localStorage.setItem('previewUnamels',payload)
    }
  },
  actions: {
    idKorisnikaLoginStoreAction(store,payload){
      store.commit('SET_ID_KORISNIKA_LOGIN_STORE',payload)
    },
    setState(store,payload){
      store.commit('SET_STATE',payload)
    },
    setBool(store,payload){
      store.commit('SET_BOOLEAN',payload)
    },
    setSessionId(store,payload){
      store.commit('SET_SESSION_ID',payload)
    },
    previewUserName(store,payload){
      store.commit('PREVIEW_USER_NAME',payload)
    }
  },
  modules: {
  }
})
