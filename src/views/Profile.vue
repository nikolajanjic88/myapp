<template>

  <div class="recordWrap">
    <div class="kategorije">
        <div class="kategorija istorija" @click="istorija">Istorija</div>
        <div class="kategorija sport" @click="sport">Sport</div>
        <div class="kategorija geografija" @click="geografija">Geografija</div>
        <div class="kategorija film" @click="film">Film</div>
    </div>
      <div v-if="!prazno" class="wrappnaziviKolona">
          <input type="text" v-model="pretraga" v-on:keyup='this.getZaProfile'>
      <div class="naziviKolona">
            <p class="plasman-klasa">Plasman</p>
            <p class="korisnik-klasa">Korisnik</p>
            <p class="rezultat-klasa">Rezultat</p>
            <p class="profilna-slika-klasa">Vreme</p>
        </div>
        </div>
    <div class="wrappslikaIimena"> 
        
<div class="slikaIimena" v-for="(record,index) in recordsArray" :key="record.kor_id">
    
        <p class="index-klasa">{{index+1}}.</p>
    <div class="korime ime-klasa">
        <p>{{record.kor_korime}}</p>
        <div class="wrapSlika">
            <img v-if='record.slk_id===null' src="../assets/avatar.jpg" alt="" class="avatar">
            <img v-else :src="'http://654h122.e2.mars-hosting.com/slike?idSlike='+record.slk_id" alt="" class="avatar">
    </div>
    </div>
    
   
    
     <p class="poeni-klasa">{{record.par_poeni}}</p>
     <p class="poeni-klasa">{{record.par_vreme}}</p>

    

</div>

</div> 
  </div>
 

</template>

<script>
import axios from 'axios'

export default {
data(){
    return{
        recordsArray:[],
        profilePictureFile:'',
        profilePicture:'',
        kategorija: '',
        pretraga: '',
        prazno: true
    }
},


methods:{
    
    async getZaProfile(){
        try{
            let res = await axios.get('http://654h122.e2.mars-hosting.com/ranglista', {
                params : {
                    kategorija : this.kategorija,
                    pretraga: this.pretraga,
                }
            });
             this.recordsArray =await res.data.data
        }
        catch(error){
            console.log(error)
    
        }
    },
    async istorija(){
        let sveKategorije = await axios.get('http://654h122.e2.mars-hosting.com/kategorije')
        this.kategorija = sveKategorije.data.data[0].kat_naziv
        this.getZaProfile()
        this.prazno = false
    },
    async geografija(){
        let sveKategorije = await axios.get('http://654h122.e2.mars-hosting.com/kategorije')
        this.kategorija = sveKategorije.data.data[1].kat_naziv
        this.getZaProfile()
        this.prazno = false
    },
    async sport(){
        let sveKategorije = await axios.get('http://654h122.e2.mars-hosting.com/kategorije')
        this.kategorija = sveKategorije.data.data[2].kat_naziv
        this.getZaProfile()
        this.prazno = false
    },
    async film(){
        let sveKategorije = await axios.get('http://654h122.e2.mars-hosting.com/kategorije')
        this.kategorija = sveKategorije.data.data[3].kat_naziv
        this.getZaProfile()
        this.prazno = false
    },

    
    
}

}
</script>

<style scoped>
.korime{
    display: flex;
    justify-content: space-between;
}
.avatar {
    width: 70px;
    height: 70px;
    
    
}
.kategorije {
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
    align-items: center;
}
.kategorija {
    color: #960a0a;
    font-weight: 500;
    width: 120px;
    height: 70px;
    text-align: center;
    margin: 10px;
}
.kategorija:hover {
    box-sizing: border-box;
    border: 2px solid #960a0a;
    cursor: pointer;
    
}
.istorija {
    background: url("../assets/history.jpg");
    background-size: cover;
}
.sport {
    background: url("../assets/sport.jpg");
    background-size: cover;
}
.film {
    background: url("../assets/cinema.jpg");
    background-size: cover;
}
.geografija {
    background: url("../assets/geografija.jpg");
    background-size: cover;
}
.wrappnaziviKolona{
    display: flex;
    
    flex-direction: column;
    justify-content:center;
    align-items: center;
    
    
   
}

.wrapSlika{
    display: flex;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid rgb(214, 205, 205);
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-size: cover;
    margin: 0 auto;
}
.plasman-klasa{
display: grid;
 width: 100%;
    height: 100%;
  align-items: center;
 margin: 0;

    justify-content: center;
}

.korisnik-klasa{
display: grid;
border-left:0.5px solid white;
 border-right: 0.5px solid white;
 
    height: 100%;
 margin: 0;
 align-items: center;
    justify-content: center;
}
.profilna-slika-klasa{
display: grid;
align-items: center;
 width: 100%;
    height: 100%;
   
  
 margin: 0;

 
    justify-content: center;
}
.rezultat-klasa{
display: grid;
 width: 100%;
    height: 100%;
 margin: 0;
  border-left: 0.5px solid white;
    justify-content: center;
align-items: center;
border-right: 0.5px solid white;
}
.naziviKolona{
   display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  grid-auto-rows: 100%; 
  justify-content: center;
  align-items: center;
  background-color: #1d5fb6;
  color: rgb(255, 254, 254)!important;
 
  
   border: 1px solid white;
    /* width: 200px;
    height: 100px; */
    
    color: rgb(216, 223, 230);
    width: 400px;
    
   
}
.mainwrapSlika{
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
}
.index-klasa{
    display: grid;
 
 margin: 0;
 align-items: center;
    justify-content: center;
    
}
.ime-klasa{
    display: grid;
 border-left:0.5px solid white;
 
 margin: 0;
 align-items: center;
    justify-content: center;
    padding-bottom: 7px;
}
.poeni-klasa{
    display: grid;
 
 border-left:0.5px solid white;
  margin: 0;
 align-items: center;
    justify-content: center;
}

.recordWrap{
     background-color: rgb(0, 0, 0);
   left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  margin:0 auto;
  
  position: absolute;
    
  
  
  padding: 60px 10px;
overflow-y: auto;
 z-index: 4;

}
.wrappslikaIimena{
    display: flex;
    
    flex-direction: column;
  
    align-items: center;
    /* border: 1px solid white; */
}
.slikaIimena{
   display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  grid-auto-rows: 100%; 
  /* grid-auto-rows: 100%;  */
  /* grid-template-columns: 1fr 1fr; */
  
  
   border: 1px solid white;
    /* width: 200px;
    height: 100px; */
    
    color: rgb(216, 223, 230);
    width: 400px;
    min-width: 400px;
   
}


@media screen and (max-width: 600px){
  
  .wrappnaziviKolona{
    display: flex;
    
    flex-direction: column;
    justify-content:center;
    align-items: center;
 
    
   
}
.plasman-klasa{
display: grid;
 width: 100%;
    height: 100%;
  align-items: center;
 margin: 0;

    justify-content: center;
}

.korisnik-klasa{
display: grid;
/* border-left: solid white;
 border-right: solid white; */
 
    height: 100%;
 margin: 0;
 align-items: center;
    justify-content: center;
}
.profilna-slika-klasa{
display: grid;
align-items: center;
 width: 100%;
    height: 100%;
    
    /* padding-top: 4px; */
 margin: 0;

 
    justify-content: center;
}
.rezultat-klasa{
display: grid;
 width: 100%;
    height: 100%;
 margin: 0;
  /* border-left: solid white; */
    justify-content: center;
align-items: center;
}
.naziviKolona{
   display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  grid-auto-rows: 100%; 
  justify-content: center;
  align-items: center;
  background-color: rgb(156, 155, 155);
  color: rgb(0, 0, 0)!important;
 
  
   border: 1px solid white;
    /* width: 200px;
    height: 100px; */
    
    color: rgb(216, 223, 230);
     width: 300px;
    min-width: 200px;
    
   
}
.mainwrapSlika{
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
}
.index-klasa{
    display: grid;
 
 margin: 0;
 align-items: center;
    justify-content: center;
    
}
.ime-klasa{
    display: grid;
 border-left: 0.5px solid white;
 
 margin: 0;
 align-items: center;
    justify-content: center;
}
.poeni-klasa{
    display: grid;
 
 border-left: 0.5px solid white;
  margin: 0;
 align-items: center;
    justify-content: center;
}
.recordWrap{
    margin:0 auto;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  position: absolute;
 
  background-color: rgb(0, 0, 0);
  
  padding: 60px 10px;


  
  
  z-index: 4;


}
.wrappslikaIimena{
    display: flex;
    
    flex-direction: column;
    
    align-items: center;
    
}
.slikaIimena{
   display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  grid-auto-rows: 100%; 
  /* grid-auto-rows: 100%;  */
  /* grid-template-columns: 1fr 1fr; */
  
  
   border: 1px solid white;
    /* width: 200px;
    height: 100px; */
    
    color: rgb(216, 223, 230);
    width: 300px;
    min-width: 200px;
   
}


}
</style>
