<template>
<div class="main-box">
  <div class="box">

		<span class="text-center">Prijavi se da startujes kviz (registruj se ako vec nisi)</span>
	<div class="input-container">
		<input :class="emailRedLineBoolean?'redLineBottom':''" type="mail" required="" v-model="inputKorisnickogEmaila" />
		<label>Email</label>		
	</div>
	<div class="input-container">		
		<input :class="lozinkaRedLineBoolean?'redLineBottom':''" type="password" required="" v-model="inputSifre"/>
		<label>Lozinka</label>
	</div>
  <button class="glow-on-hover" style="margin-top:10px" @click="loginPotvrda">Potvrdi</button>
	<p :class="isError?'par':'par'" >{{loginMsg}}</p>
    
</div>
</div>
</template>

<script>
import axios from 'axios'
import { mapActions,mapState } from 'vuex'
export default {
data(){
    return{
inputKorisnickogEmaila : '',
inputSifre : '',
loginMsg:'',
isError:false,
sid:'',
uname:'',
emailRedLineBoolean:false,
lozinkaRedLineBoolean:false,
idKorisnikaLogin:''


    }
    
},
mounted(){
this.emailRedLineBoolean=false,
this.lozinkaRedLineBoolean=false
},
computed:{
...mapState(['isAuthenticated','storedSid',"idKorisnikaLoginStore"])
},
methods:{
    ...mapActions(['setBool','setSessionId','previewUserName','idKorisnikaLoginStoreAction']),
   async  loginPotvrda(){
     
            try{
                let res = await axios.get('http://654h122.e2.mars-hosting.com/api/login',{
                params:{
                kor_email : this.inputKorisnickogEmaila,
                kor_lozinka : this.inputSifre
            }
            })
           
                // this.idKorisnikaLogin=res.data.sessionKorisnik.id
                // this.idKorisnikaLoginStoreAction(this.idKorisnikaLogin)
                this.isError=false
                this.loginMsg=res.data.res
                this.sid=res.data.sid
                this.uname=res.data.sessionKorisnik.korime
                this.setSessionId(this.sid)
                console.log(this.sid,'sid iz logina')
                this.setBool(true)
                this.previewUserName(this.uname)
                setTimeout(()=>{ this.$router.push('/')},1500)
               console.log( this.idKorisnikaLogin )
                
               
               
                // console.log(this.sid)
                //  console.log(this.storedSid)
                // localStorage.setItem("uname", this.uname);
                 this.lozinkaRedLineBoolean=false 
                 this.emailRedLineBoolean=false
                
            }catch(error){
                 this.setSessionId(false)
                this.isError=true
                this.loginMsg=error.response.data.poruka
                if(this.loginMsg=='email sadrži nedozvoljene karaktere' || this.loginMsg==`Korisnik sa email-om ${this.inputKorisnickogEmaila} ne postoji`){
                   this.emailRedLineBoolean=true 
                    this.lozinkaRedLineBoolean=false 
                }
                if(this.loginMsg=='neispravna lozinka'){
                   this.lozinkaRedLineBoolean=true 
                    this.emailRedLineBoolean=false
                }
                // console.log('error')
                console.log(this.loginMsg)
            }
           
        
    }
}
}
</script>

<style scope>

.par {
    color:white

}

.body1{
	background-image: url("https://images.pexels.com/photos/891252/pexels-photo-891252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
	background-position: center;
    background-origin: content-box;
    background-repeat: no-repeat;
    background-size: cover;
	min-height:100vh;
	font-family: 'Noto Sans', sans-serif;
    
}
.text-center{
	color:#fff;	
	/* text-transform:uppercase; */
    font-size: 25px;
    margin: -50px 0 80px 0;
    display: block;
    text-align: center;
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
.box{
	position:absolute;
	left:50%;
	top:50%;
	transform: translate(-50%,-50%);
    background-color: rgba(0, 0, 0, 0);
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
   /* pointer-event:none;*/
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
.redLineBottom{
    border-bottom:1px solid #e74c3c!important;	
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
/*.btn:after{
	content:"";
	position:absolute;
	background:rgba(0,0,0,0.50);
	top:0;
	right:0;
	width:100%;
	height:100%;
}*/
.input-container input:focus ~ label,
.input-container input:valid ~ label{
	top:-15px;
	font-size:16px;
	
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
     font-size: 20px;
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
}

</style>