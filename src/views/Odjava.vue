<template>
  <div></div>
</template>

<script>
import { mapActions,mapState } from 'vuex'
export default {
mounted(){
this.odjavaAcc()
this.$router.push('/login')
},
computed:{
...mapState(['isAuthenticated'])
},
methods:{
...mapActions(['setBool']),
odjavaAcc(){
    this.setBool(false)
    localStorage.removeItem('storeSid')
    localStorage.removeItem('previewUnamels')
    localStorage.removeItem('isAuthenticatedLS')
   
}
}
}
</script>

<style>

</style>