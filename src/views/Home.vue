<template>
<div class="main-home">
  <div class="home">
   <button class="noselect blue" @click="redirect">Startuj kviz</button>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  methods:{
    redirect(){
      this.$router.push({path:"/kvizPrikaz"})
    }
  },
  name: 'Home',
  
}
</script>

<style scoped>

.home{
  display: flex;
  justify-content: center;
  align-items: center;
 
 

}


.noselect {
  -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
		-webkit-tap-highlight-color: transparent;
}
button {
  
  position: absolute;
	width: 100px;
	height: 50px;
	cursor: pointer;
	background: rgb(85, 133, 165);
   margin-top:500px;
	border: none;
	border-radius: 10px;
	box-shadow: -5px -5px 15px rgb(101, 126, 182), 5px 5px 15px rgb(101, 126, 182), inset 5px 5px 10px rgb(101, 126, 182), inset -5px -5px 10px rgb(101, 126, 182);
	color: #222;
	font-size: 16px;
  z-index: 5;
}

button:hover {
	box-shadow: -5px -5px 15px #444, 5px 5px 15px #222, inset 5px 5px 10px #222, inset -5px -5px 10px #444;
	font-size: 15px;
	transition: 500ms;
  color: #71b7f0;
	text-shadow: 0px 0px 10px #71b7f0;
}

button:focus {
	outline: none;
}

@media screen and (max-width: 600px){
  .main-home{
    border: 2px solid rgb(202, 201, 220);
    height: 100vh;
  width: 100vw;
  margin:0 auto;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  position: absolute;
 
  background-image: url('~@/assets/starry-sky-2675322_960_720.jpg');
    
    background-size: cover cover;
    background-position: center;
    
   
  background-color: rgb(255, 255, 255);
  border-radius: 25px;
  padding: 10px;
  box-shadow: 0 0 10px 2px;

  
  z-index: 4;
  
  }
}
</style>
