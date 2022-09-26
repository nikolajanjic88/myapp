<template>
  <div class="main-box">
  <div class="box">

		<span class="text-center"></span>
	<div class="input-container">
		<input :class="korRedLineBoolean?'redLineBottom':''" type="text" required="" v-model="korisnickoImeInput">
		<label>Korisnicko ime</label>		
	</div>
  <div class="input-container">
    <input :class="emailRedLineBoolean?'redLineBottom':''" type="text" required="" v-model="emailInput">
    <label>Email</label>
  </div>
	<div class="input-container">		
		<input :class="lozinkaRedLineBoolean?'redLineBottom':''" type="password" required="" v-model="lozinkaInput"/>
		<label>Lozinka</label>
	</div>
  <div class="profilnaSlika-container">	
    <button>
    <label for="files">
   Odaberi profilnu sliku
    </label>
    </button>
		<input type="file" ref="file" name="ProfilePicture" required="" id="files" style="visibility:hidden;" @change="autoChooseImg"/>
    <img :src='this.previewImg' class="img_prev">
    <button class="glow-on-hover" style="margin-top:10px" @click="postData">Potvrdi</button>
		<p style="color:white">{{registerMsg}}</p>
		<p style="color:white">{{regMsgRes}}</p>
	</div>
  
	
</div>
</div>
</template>

<script>
import {mapActions,mapState} from 'vuex';
import axios from 'axios';
export default {
data(){
    return{
      payload:{
        korisnickoImeInput : '',
        emailInput : '',
        lozinkaInput : '',
        file:''
        
      },
      registerMsg:'',
      regMsgRes:'',
      previewImg:'',
       korRedLineBoolean:false,
      emailRedLineBoolean:false,
      lozinkaRedLineBoolean:false,
        
    }
},
computed:{
...mapState(['Name','Email',"Password",'ProfileImages'])
},
methods:{
    ...mapActions(['setState']),
    submitForm(){
      
        
        this.setState(this.payload)
        console.log(this.Name,this.ProfileImages)
        // console.log(this.Name,this.LastName,this.ProfileImages )
        
    },
  
    async postData(){
         const formData = new FormData()
         formData.append('kor_korime',this.korisnickoImeInput)
         formData.append('kor_email',this.emailInput)
         formData.append('kor_lozinka',this.lozinkaInput)
         formData.append('slk_slika',this.file)
      try{
       let res = await axios.post('http://654h122.e2.mars-hosting.com/api/login',formData)
       this.regMsgRes = res.data.data
       this.registerMsg = ''
       setTimeout(()=>{ this.$router.push('/Login')},1500)
        console.log(this.regMsgRes)
      }
      catch(error){
        this.registerMsg = error.response.data.poruka
        console.log(this.registerMsg)
        if(this.registerMsg=='Niste uneli korisničko ime' || this.registerMsg=="Korisničko ime ne sme imati više od 15 karaktera" || this.registerMsg==`Korisničko ime ${this.korisnickoImeInput} je zauzeto`){
          this.korRedLineBoolean=true
           this.emailRedLineBoolean=false 
            this.lozinkaRedLineBoolean=false 
        }
        if(this.registerMsg=='email sadrži nedozvoljene karaktere' || this.registerMsg==`Korisnik sa email-om ${this.inputKorisnickogEmaila} već postoji` || this.registerMsg=="Niste uneli email" || this.registerMsg=='email nije validan'){
                   this.emailRedLineBoolean=true 
                    this.lozinkaRedLineBoolean=false 
                     this.korRedLineBoolean=false
                }
                if(this.registerMsg=='Lozinka ne sme imati manje od 5 karaktera ili više od 32' || this.registerMsg=="Niste uneli lozinku"){
                   this.lozinkaRedLineBoolean=true 
                    this.emailRedLineBoolean=false
                    this.korRedLineBoolean=false
                }
      }
   
    },
    autoChooseImg(){
      this.file = this.$refs.file.files[0];
      this.previewImg = URL.createObjectURL(this.file)
    }

}

}
</script>

<style scoped>
.redLineBottom{
    border-bottom:1px solid #e74c3c!important;	
}
 .main-box{
    border: 2px solid rgb(202, 201, 220);
    height: 100vh;
  width: 100vw;
  margin:0 auto;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  position: absolute;
 background-image: url('~@/assets/gradient-soft-solid-color-4k-4e-3840x2160.jpg');
    
    background-size: cover cover;
    background-position: center;
    
   
  background-color: rgb(255, 255, 255);
  border-radius: 25px;
  padding: 10px;
  box-shadow: 0 0 10px 2px;

 
  
  z-index: 4;
  
  }
.img_prev{
  width:100px;
  display:block;
  margin:0 auto;
}
.register{
  color: white;
  padding: 5px;
 
}
.forma input{
   
   margin: 5px 5px;
}


.profilnaSlika-container label{
margin-bottom: 15px;
color: rgb(0, 0, 0);
font-size: 18px;
}
.profilnaSlika-container input{
margin-bottom: 15px;
color: #fff;

}
.input-container input:focus ~ label,
.input-container input:valid ~ label{
	top:-15px;
	font-size:16px;
	
}
.box{
	position:absolute;
	left:50%;
	top:50%;
	transform: translate(-50%,-50%);
    background-color: rgba(8, 41, 124, 0);
	border-radius:3px;
	padding:70px 100px;
}
.input-container{
	position:relative;
	margin-bottom:25px;
}
.input-container label{
	position:absolute;
	top:0px;
	left:0px;
	font-size:23px;
	color:#fff;	
    
	transition: all 0.5s ease-in-out;
}
.input-container input{ 
  border:0;
  border-bottom:1px solid rgb(203, 201, 201);  
  background:transparent;
  width:100%;
  padding:8px 0 5px 0;
  font-size:16px;
  color:#fff;
}
.input-container input:focus{ 
 border:none;	
 outline:none;
 border-bottom:1px solid #ffffff;	
}
.btn{
	color:#fff;
	background-color:#e74c3c;
	outline: none;
    border: 0;
    color: #fff;
	padding:10px 20px;
	text-transform:uppercase;
	margin-top:50px;
	border-radius:2px;
	cursor:pointer;
	position:relative;
}
.input-container{
	position:relative;
	margin-bottom:25px;
}
.glow-on-hover {
    width: 220px;
    height: 50px;
    border: none;
    outline: none;
    color: #fff;
    background: #111;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
}

.glow-on-hover:before {
    content: '';
    background: linear-gradient(45deg, #aabed5, #002bff,rgb(220, 225, 232));
    position: absolute;
    top: -2px;
    left:-2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: opacity .3s ease-in-out;
    border-radius: 10px;
}

.glow-on-hover:active {
    color: #000
}

.glow-on-hover:active:after {
    background: transparent;
}

.glow-on-hover:hover:before {
    opacity: 1;
}

.glow-on-hover:after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #111;
    left: 0;
    top: 0;
    border-radius: 10px;
}

@keyframes glowing {
    0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
}
/* .main-box{
  background-image: url('~@/assets/starry-sky-2675322_960_720.jpg');
   height: 100vh;
    width: 100vw;
    background-size: cover;
    background-position: center;
    background-size: contain;
} */
@media screen and (max-width: 600px){
  .main-box{
    border: 2px solid rgb(202, 201, 220);
    height: 100vh;
  width: 100vw;
  margin:0 auto;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  position: absolute;
  
 background-image: url('~@/assets/gradient-soft-solid-color-4k-4e-3840x2160.jpg');
    
    background-size: cover cover;
    background-position: center;
    
   
  background-color: rgb(255, 255, 255);
  border-radius: 25px;
  padding: 10px;
  box-shadow: 0 0 10px 2px;

 
  
  z-index: 4;
  
  }
  .box{
    display: flex;
    justify-content: center;
    flex-direction: column;
color:white;
position: absolute;
  }
}
</style>