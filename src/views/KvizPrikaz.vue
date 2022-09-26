
<template>

<div class="main-container" >
  <div v-if="isEmpty" class="container2">
        
    <div v-if="isEmpty" class="record1">
      <div class="kategorija istorija">
        <button @click="istorija" class="button">Istorija</button>
      </div>
      <div class="kategorija sport">
        <button @click="sport" class="button">Sport</button>
      </div>
    </div>
    <div v-if="isEmpty" class="record2">
      <div class="kategorija geografija">
        <button @click="geografija" class="button">Geografija</button>
      </div>
      <div class="kategorija film">
        <button @click="film" class="button">Film</button>  
      </div>        
    </div>
  </div>

  <div v-if="!isEmpty" class="container">
    <div class="divuNameKvizPrikaz">
         <i class="fa-solid fa-user fa-xs" style="padding-right:5px"></i>
         <p>{{ uNameKvizPrikaz }}</p>
       </div>
    <div class="rezultat"  style="color:aliceblue;padding-left: 5px;" :disabled="disableResults">
      <i class='fas fa-coins' style='font-size:16px;color: gold;' ></i>
      <p>{{rezultatBr}}</p>
      <i class="fa-solid fa-stopwatch" style='font-size:16px;color: gold'></i>
      <p>{{ time }}</p>
    </div>
    <div class="question-picture">
      <Transition name="slike">
        <img v-if="!isEmpty && showPitanja" :src="'http://654h122.e2.mars-hosting.com/slike2?slike_za_pitanja='+idSlikeZapitanja" alt="">
      </Transition>  
    </div>


    <div class="stopericaIrezultat" >
      <div class="stopericaIrestart">
        <div class="samoStoperica" style="color:aliceblue">
          <div class="main-circle">
            <p v-if="!countStop" >{{countDown}}</p>
            <div :class="[isZero ? 'small-circle-red-bg' : '']" class="small-circle"></div>
            <ul  class="circle">
              <li>
                <div class="text" v-show="this.countDownTimerCss12" :class="[boolForOrange?'small-circle-orange-bg':'',boolForRed?'small-circle-red-bg':'']"></div>
              </li>
              <li>
                <div class="text" v-show="this.countDownTimerCss11" :class="[boolForOrange?'small-circle-orange-bg':'',boolForRed?'small-circle-red-bg':'']"></div>
              </li>
              <li>
              <div class="text" v-show="this.countDownTimerCss10" :class="[boolForOrange?'small-circle-orange-bg':'',boolForRed?'small-circle-red-bg':'']"></div>
              </li>
              <li>
                <div class="text" v-show="this.countDownTimerCss9" :class="[boolForOrange?'small-circle-orange-bg':'',boolForRed?'small-circle-red-bg':'']"></div>
              </li>
              <li>
                <div  class="text" v-show="this.countDownTimerCss8" :class="boolForOrange?'small-circle-orange-bg':''"></div>
              </li>
              <li>
                <div  class="text" v-show="this.countDownTimerCss7" :class="boolForOrange?'small-circle-orange-bg':''"></div>
              </li>
              <li>
                <div  class="text" v-show="this.countDownTimerCss6" :class="boolForOrange?'small-circle-orange-bg':''"></div>
              </li>
              <li>
                <div  class="text" v-show="this.countDownTimerCss5" :class="boolForOrange?'small-circle-orange-bg':''"></div>
              </li>
              <li>
                <div  class="text" v-show="this.countDownTimerCss4" ></div>
              </li>
              <li>
                <div  class="text" v-show="this.countDownTimerCss3"></div>
              </li>
              <li>
                <div  class="text" v-show="this.countDownTimerCss2"></div>
              </li>
              <li>
                <div  class="text" v-show="this.countDownTimerCss1"></div>
              </li>
            </ul>
          </div>
        </div>

        <div class="rezultat-modal" :disabled="disableResults" v-if="previewGameOver"> 
          
          <h2>Kraj</h2>
          <h4 v-if="uf">Idi citaj wikipediu</h4>
          <h4 v-if="uf2">Mozes ti to bolje</h4>
          <h4 v-if="uf3">Jako dobro</h4>
          <h4 v-if="uf4">Savrseno</h4>
          <h4>Rezultat: {{ rezultatBr }}</h4>
          <h4>Tačni odgovori: {{  brojTačnihOdgovora }}</h4> 
          <h4>Netačni odgovori: {{ brojNetačnihOdgovora }}</h4> 
          <h4>Ukupno vreme: {{ukupnoVreme}}</h4>
          <button class="restartBtn" @click="restartQuiz">Igraj ponovo</button>
          <button class="restartBtn" @click="backToCategories">Nazad na kategorije</button>
        </div>
      </div>
    </div>
  
    <div  id="question-container"> 
      <Transition name="pitanja">
      <p  v-if="!isEmpty && showPitanja">{{samoPitanja}}</p> 
      </Transition>
    </div>
    <div class="container-absolute">
      <div id="answer-buttons" class="btn-grid">
        <TransitionGroup name="odgovori" >
        <button class="blue-btn" v-for="(answer,idx) in odgovoriPitanja" :key="idx"  :disabled="disabled"  @click="getAnswers(answer,$event),countStop=true" >{{answer.odg_naziv}}</button>
      </TransitionGroup>
      </div>
        
    </div>
  </div>
</div>
  <div class="score">
    <span id="right-answers"></span>
  </div>
</template>

<script>
import axios from "axios";
import sound from "../assets/tacan-odgovor.mp3";
import sound2 from "../assets/netacan-odgovor.mp3";
import { mapState } from "vuex";
export default {
  data() {
    return {
      sucString: "",
      unsucSting: "",
      isScoreVisible: false,
      questionCount: 0,
      selectAnswers: [],
      correctAnswers: [],

      questionsArray: [],
      randQuestion: [],
      rezultat: [],
      samoPitanja: [],
      idSlikeZapitanja: [],
      odgovoriPitanja: [],
      idOdgovoriPitanja: [],
      selectedAnswers: [],
      computedBoolean: [],
      getItemSid: "",
      rezultatBr: 0,
      disabled: false,
      countStop: false,
      countDown: 12,
      previewGameOver: false,
      pocniIspocetka: false,
      startBtnBoolean: true,
      disableResults: false,
      brojTačnihOdgovora: 0,
      brojNetačnihOdgovora: 0,
      time: "00:00:00.000",
      ukupnoVreme: null,
      timeBegan: null,
      timeStopped: null,
      stoppedDuration: 0,
      started: null,
      running: false,
      countDownTimerClear: null,
      countDownTimerClearRestart: null,
      countDownTimerCss1: true,
      countDownTimerCss2: true,
      countDownTimerCss3: true,
      countDownTimerCss4: true,
      countDownTimerCss5: true,
      countDownTimerCss6: true,
      countDownTimerCss7: true,
      countDownTimerCss8: true,
      countDownTimerCss9: true,
      countDownTimerCss10: true,
      countDownTimerCss11: true,
      countDownTimerCss12: true,
      isZero: false,
      boolForOrange: false,
      boolForRed: false,
      uNameKvizPrikaz: "",
      triggerShake:false,
      showPitanja:false
    };
  },
  mounted() {
    this.uNameKvizPrikaz = localStorage.getItem("previewUnamels");
    this.countStop = true;
  },
  beforeUnmount() {
    clearTimeout(this.countDownTimerClearRestart)
    clearTimeout(this.countDownTimerClear)
  },
  watch: {
    countDown() {
      this.countDownTimerCSS();
    },
  },
  computed: {
    isEmpty: ({ questionsArray }) => questionsArray.length === 0,
    ...mapState(["storedUname", "idKorisnikaLoginStore"]),
    uf: ({ rezultatBr }) => rezultatBr < 50,
    uf2: ({ rezultatBr }) => rezultatBr >= 50 && rezultatBr < 100,
    uf3: ({ rezultatBr }) => rezultatBr >= 100 && rezultatBr < 150,
    uf4: ({ rezultatBr }) => rezultatBr === 150, 
  },

  methods: {
    triggerShakeAnimation(){
       this.triggerShake = true
      setTimeout(() => {
        this.triggerShake = false
      }, 1000)},

    backToCategories(){
      this.rezultatBr=0;
      this.questionsArray = [];
      this.questionCount=0;
      this.countDown=12;
      this.odgovoriPitanja=[],
      this.previewGameOver=false;
      this.pocniIspocetka=false;
      this.brojTačnihOdgovora=0
      this.brojNetačnihOdgovora=0
    },

    async sport(){
      let sveKategorije = await axios.get('http://654h122.e2.mars-hosting.com/kategorije')
      this.kategorija = sveKategorije.data.data[2].kat_naziv
      this.kat_id = sveKategorije.data.data[2].kat_id
      this.getQuestions()
    },
    async istorija(){
      let sveKategorije = await axios.get('http://654h122.e2.mars-hosting.com/kategorije')
      this.kategorija = sveKategorije.data.data[0].kat_naziv
      //console.log(this.kategorija)
      this.kat_id = sveKategorije.data.data[0].kat_id
      this.getQuestions()
    },
    async geografija(){
      let sveKategorije = await axios.get('http://654h122.e2.mars-hosting.com/kategorije')
      this.kategorija = sveKategorije.data.data[1].kat_naziv
      this.kat_id = sveKategorije.data.data[1].kat_id
      this.getQuestions()
    },

    async film(){
      let sveKategorije = await axios.get('http://654h122.e2.mars-hosting.com/kategorije')
      this.kategorija = sveKategorije.data.data[3].kat_naziv
      this.kat_id = sveKategorije.data.data[3].kat_id
      this.getQuestions()
    },

    tacanOdgovorZvuk() {
      const audio = new Audio(sound);
      audio.play();
    },
    netacanOdgovorZvuk() {
      const audio = new Audio(sound2);
      audio.play();
    },
    start() {
      if (this.running) return;

      if (this.timeBegan === null) {
        this.reset();
        this.timeBegan = new Date();
      }

      if (this.timeStopped !== null) {
        this.stoppedDuration += new Date() - this.timeStopped;
      }
      this.started = setInterval(this.clockRunning, 10);
      this.running = true;
    },
    stop() {
      this.running = false;
      this.ukupnoVreme = this.time;
      this.timeStopped = new Date();
      clearInterval(this.started);
    },

    reset() {
      this.running = false;
      clearInterval(this.started);
      this.stoppedDuration = 0;
      this.timeBegan = null;
      this.timeStopped = null;

      this.time = "00:00:00.000";
    },

    clockRunning() {
      let currentTime = new Date();
      let timeElapsed = new Date(
        currentTime - this.timeBegan - this.stoppedDuration
      );
      let hour = timeElapsed.getUTCHours();
      let min = timeElapsed.getUTCMinutes();
      let sec = timeElapsed.getUTCSeconds();
      let ms = timeElapsed.getUTCMilliseconds();

      this.time =
        this.zeroPrefix(hour, 2) +
        ":" +
        this.zeroPrefix(min, 2) +
        ":" +
        this.zeroPrefix(sec, 2) +
        "." +
        this.zeroPrefix(ms, 3);
    },
    zeroPrefix(num, digit) {
      let zero = "";
      for (let i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
    restartQuiz() {
      this.rezultatBr = 0;
      this.questionsArray = [];
      this.questionCount = 0;
      this.countDown = 12;
      (this.odgovoriPitanja = []), (this.previewGameOver = false);
      this.pocniIspocetka = false;
      this.getQuestions();
      this.brojTačnihOdgovora = 0;
      this.brojNetačnihOdgovora = 0;
    },
    countDownTimerCSS() {
      if (this.countDown === 12) {
        this.countDownTimerCss1 = true;
        this.countDownTimerCss2 = true;
        this.countDownTimerCss3 = true;
        this.countDownTimerCss4 = true;
        this.countDownTimerCss5 = true;
        this.countDownTimerCss6 = true;
        this.countDownTimerCss7 = true;
        this.countDownTimerCss8 = true;
        this.countDownTimerCss9 = true;
        this.countDownTimerCss10 = true;
        this.countDownTimerCss11 = true;
        this.countDownTimerCss12 = true;
      }
      if (this.countDown === 11) {
        this.countDownTimerCss1 = false;
        this.countDownTimerCss2 = true;
        this.countDownTimerCss3 = true;
        this.countDownTimerCss4 = true;
        this.countDownTimerCss5 = true;
        this.countDownTimerCss6 = true;
        this.countDownTimerCss7 = true;
        this.countDownTimerCss8 = true;
        this.countDownTimerCss9 = true;
        this.countDownTimerCss10 = true;
        this.countDownTimerCss11 = true;
        this.countDownTimerCss12 = true;
      }
      if (this.countDown === 10) {
        this.countDownTimerCss1 = false;
        this.countDownTimerCss2 = false;
        this.countDownTimerCss3 = true;
        this.countDownTimerCss4 = true;
        this.countDownTimerCss5 = true;
        this.countDownTimerCss6 = true;
        this.countDownTimerCss7 = true;
        this.countDownTimerCss8 = true;
        this.countDownTimerCss9 = true;
        this.countDownTimerCss10 = true;
        this.countDownTimerCss11 = true;
        this.countDownTimerCss12 = true;
      }
      if (this.countDown === 9) {
        this.countDownTimerCss1 = false;
        this.countDownTimerCss2 = false;
        this.countDownTimerCss3 = false;
        this.countDownTimerCss4 = true;
        this.countDownTimerCss5 = true;
        this.countDownTimerCss6 = true;
        this.countDownTimerCss7 = true;
        this.countDownTimerCss8 = true;
        this.countDownTimerCss9 = true;
        this.countDownTimerCss10 = true;
        this.countDownTimerCss11 = true;
        this.countDownTimerCss12 = true;
      }
      if (this.countDown === 8) {
        this.countDownTimerCss1 = false;
        this.countDownTimerCss2 = false;
        this.countDownTimerCss3 = false;
        this.countDownTimerCss4 = false;
        this.countDownTimerCss5 = true;
        this.countDownTimerCss6 = true;
        this.countDownTimerCss7 = true;
        this.countDownTimerCss8 = true;
        this.countDownTimerCss9 = true;
        this.countDownTimerCss10 = true;
        this.countDownTimerCss11 = true;
        this.countDownTimerCss12 = true;
        this.boolForOrange = true;
      }
      if (this.countDown === 7) {
        this.countDownTimerCss1 = false;
        this.countDownTimerCss2 = false;
        this.countDownTimerCss3 = false;
        this.countDownTimerCss4 = false;
        this.countDownTimerCss5 = false;
        this.countDownTimerCss6 = true;
        this.countDownTimerCss7 = true;
        this.countDownTimerCss8 = true;
        this.countDownTimerCss9 = true;
        this.countDownTimerCss10 = true;
        this.countDownTimerCss11 = true;
        this.countDownTimerCss12 = true;
      }
      if (this.countDown === 6) {
        this.countDownTimerCss1 = false;
        this.countDownTimerCss2 = false;
        this.countDownTimerCss3 = false;
        this.countDownTimerCss4 = false;
        this.countDownTimerCss5 = false;
        this.countDownTimerCss6 = false;
        this.countDownTimerCss7 = true;
        this.countDownTimerCss8 = true;
        this.countDownTimerCss9 = true;
        this.countDownTimerCss10 = true;
        this.countDownTimerCss11 = true;
        this.countDownTimerCss12 = true;
      }
      if (this.countDown === 5) {
        this.countDownTimerCss1 = false;
        this.countDownTimerCss2 = false;
        this.countDownTimerCss3 = false;
        this.countDownTimerCss4 = false;
        this.countDownTimerCss5 = false;
        this.countDownTimerCss6 = false;
        this.countDownTimerCss7 = false;
        this.countDownTimerCss8 = true;
        this.countDownTimerCss9 = true;
        this.countDownTimerCss10 = true;
        this.countDownTimerCss11 = true;
        this.countDownTimerCss12 = true;
      }
      if (this.countDown === 4) {
        this.countDownTimerCss1 = false;
        this.countDownTimerCss2 = false;
        this.countDownTimerCss3 = false;
        this.countDownTimerCss4 = false;
        this.countDownTimerCss5 = false;
        this.countDownTimerCss6 = false;
        this.countDownTimerCss7 = false;
        this.countDownTimerCss8 = false;
        this.countDownTimerCss9 = true;
        this.countDownTimerCss10 = true;
        this.countDownTimerCss11 = true;
        this.countDownTimerCss12 = true;
        this.boolForRed = true;
      }
      if (this.countDown === 3) {
        this.countDownTimerCss1 = false;
        this.countDownTimerCss2 = false;
        this.countDownTimerCss3 = false;
        this.countDownTimerCss4 = false;
        this.countDownTimerCss5 = false;
        this.countDownTimerCss6 = false;
        this.countDownTimerCss7 = false;
        this.countDownTimerCss8 = false;
        this.countDownTimerCss9 = false;
        this.countDownTimerCss10 = true;
        this.countDownTimerCss11 = true;
        this.countDownTimerCss12 = true;
      }
      if (this.countDown === 2) {
        this.countDownTimerCss1 = false;
        this.countDownTimerCss2 = false;
        this.countDownTimerCss3 = false;
        this.countDownTimerCss4 = false;
        this.countDownTimerCss5 = false;
        this.countDownTimerCss6 = false;
        this.countDownTimerCss7 = false;
        this.countDownTimerCss8 = false;
        this.countDownTimerCss9 = false;
        this.countDownTimerCss10 = false;
        this.countDownTimerCss11 = true;
        this.countDownTimerCss12 = true;
      }
      if (this.countDown === 1) {
        this.countDownTimerCss1 = false;
        this.countDownTimerCss2 = false;
        this.countDownTimerCss3 = false;
        this.countDownTimerCss4 = false;
        this.countDownTimerCss5 = false;
        this.countDownTimerCss6 = false;
        this.countDownTimerCss7 = false;
        this.countDownTimerCss8 = false;
        this.countDownTimerCss9 = false;
        this.countDownTimerCss10 = false;
        this.countDownTimerCss11 = false;
        this.countDownTimerCss12 = true;

        setTimeout(() => {
          this.countDownTimerCss12 = false;
        }, 1000);
      }
    },
    countDownTimer() {
      if (this.countDown > 0) {
        this.isZero = false;

        this.countDownTimerClear = setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
      if (this.countDown === 0) {
        this.boolForRed = false;
        this.boolForOrange = false;
        this.netacanOdgovorZvuk();
          
        setTimeout(() => {
          this.getAnswers(), (this.countDown = 12), (this.isZero = false);
        }, 1000);
        this.countDownTimerClearRestart = setTimeout(() => {
          this.countDownTimer();
        }, 2000);
        setTimeout(() => {
          this.countDownTimerCssNaTrue();
        }, 1000);
        this.isZero = true;
      }

      if (this.countDown === 12) {
        this.boolForRed = false;
        this.boolForOrange = false;
      }
    },
    countDownTimerCssNaTrue() {
      this.countDownTimerCss1 = true;
      this.countDownTimerCss2 = true;
      this.countDownTimerCss3 = true;
      this.countDownTimerCss4 = true;
      this.countDownTimerCss5 = true;
      this.countDownTimerCss6 = true;
      this.countDownTimerCss7 = true;
      this.countDownTimerCss8 = true;
      this.countDownTimerCss9 = true;
      this.countDownTimerCss10 = true;
      this.countDownTimerCss11 = true;
      this.countDownTimerCss12 = true;
    },

    async getQuestions() {
      try {
         let res = await axios.get('http://654h122.e2.mars-hosting.com/pitanja', {
        params : {
          kategorija: this.kategorija
        }
      });

        this.questionsArray = res.data.data;
        this.idOdgovoriPitanja = this.questionsArray.map((x) => x.pit_id);
        this.idSlikeZapitanja = this.questionsArray[this.questionCount].slk_id;
        let resOdgovori = await axios.get(
          "http://654h122.e2.mars-hosting.com/odgovoriD",
          {
            params: {
              id_odg_pit: this.idOdgovoriPitanja[this.questionCount],
            },
          }
        );

        this.odgovoriPitanja = resOdgovori.data.data;

        // this.tacnostOdgovora = this.odgovoriPitanja.map(x=>x.odg_je_tacan)
        //  console.log(this.odgovoriPitanja);
        this.samoPitanja = this.questionsArray[this.questionCount].pit_pitanje;
        this.countDownTimer();
        this.reset();
        this.start();
        this.countStop = false;
        this.startBtnBoolean = false;
        this.disabled = false;
        this.showPitanja=true
      
      } catch (error) {
        console.log(error);
      }
    },

    async getAnswers(answer, event) {
      if (this.questionCount < this.questionsArray.length - 1) {
        setTimeout(() => {
          this.countDown = 12;
        }, 1000);
        this.questionCount++;
        console.log(this.questionCount);
        setTimeout(() => {
          this.idSlikeZapitanja =
            this.questionsArray[this.questionCount].slk_id;
          this.samoPitanja =
            this.questionsArray[this.questionCount].pit_pitanje;
          this.odgovoriPitanja = resOdgovori.data.data;
        }, 1000);
        if (this.countDown === 0) {
          this.brojNetačnihOdgovora++;
          // this.netacanOdgovorZvuk();
        }
        if (this.questionCount === 14 && this.countDown === 0) {
          this.brojNetačnihOdgovora++;
          this.netacanOdgovorZvuk();
        }
        let resOdgovori = await axios.get(
          "http://654h122.e2.mars-hosting.com/odgovoriD",
          {
            params: {
              id_odg_pit: this.idOdgovoriPitanja[this.questionCount],
            },
          }
        );
        if (answer !== undefined) {
          this.computedBoolean = answer.odg_je_tacan;
        }

        if (this.computedBoolean === true) {
          event.target.classList.add("success");
          setTimeout(() => {
            event.target.classList.remove("success");
          }, 1000);
          event.target.classList.add("heartbeat")
           setTimeout(() => {
          event.target.classList.remove("heartbeat");
        }, 1000);

          this.tacanOdgovorZvuk();
          this.rezultatBr += 10;
          this.brojTačnihOdgovora++;
        } else if (this.computedBoolean === false) {
          event.target.classList.add("unsuccess");
          event.target.classList.add("shake")
          setTimeout(() => {
            event.target.classList.remove("unsuccess");
          }, 1000);
          setTimeout(() => {
          event.target.classList.remove("shake");
        }, 1000);

          this.brojNetačnihOdgovora++;
          this.netacanOdgovorZvuk();
        }

        this.disabled = true;

        setTimeout(() => {
          (this.disabled = false), (this.countStop = false);
        }, 1000);

        clearTimeout(this.countDownTimerClear);

        clearTimeout(this.countDownTimerClearRestart);
        setTimeout(() => {
          this.countDownTimer();
        }, 1000);
      } else {
        // if (this.computedBoolean){
        //   this.rezultatBr += 10;

        //   event.target.classList.add("success");
        //   setTimeout(() => {
        //     event.target.classList.remove("success");
        //   }, 1000);
        // }

        if (this.countDown === 0) {
          this.previewGameOver = true;
          this.pocniIspocetka = true;
          this.stop();
          this.countStop = true;
          this.disableResults = true;
          this.disabled = true;
          this.brojNetačnihOdgovora++;
          clearTimeout(this.countDownTimerClear);
          clearTimeout(this.countDownTimerClearRestart);
          this.upisRezultata();
         
          return;
        }

        if (this.computedBoolean === true) {
          this.rezultatBr += 10;
          this.brojTačnihOdgovora++;
          event.target.classList.add("success");
          setTimeout(() => {
            event.target.classList.remove("success");
          }, 1000);
           event.target.classList.add("heartbeat")
           setTimeout(() => {
          event.target.classList.remove("heartbeat");
        }, 1000);

        }
        if (this.computedBoolean === false) {
          event.target.classList.add("unsuccess");
          setTimeout(() => {
            event.target.classList.remove("unsuccess");
            this.brojNetačnihOdgovora++;
          }, 1000);
        }

        // event.target.classList.add("unsuccess");
        // setTimeout(() => {
        //   event.target.classList.remove("unsuccess");
        // }, 1000);

        this.previewGameOver = true;
        this.pocniIspocetka = true;
        this.stop();
        this.countStop = true;
        this.disableResults = true;
        this.disabled = true;
        clearTimeout(this.countDownTimerClear);
        this.upisRezultata();

        return;
      }
    },

   async upisRezultata(){
    try{
      await axios.put('http://654h122.e2.mars-hosting.com/partija', {
        sid:localStorage.getItem('storeSid'),
        "par_poeni":this.rezultatBr,
        "kat_id": this.kat_id,
        "par_vreme":this.time})
    }
    catch(error){
      console.log(error)
    }
    
  },

  },
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}
.modal-enter-from{
  opacity: 0;
}
.modal-enter-to{
  opacity: 1;
}
.modal-leave-from{
  opacity: 1;
}
.modal-leave-to{
  opacity: 0;
}


.pitanja-enter-active,
.pitanja-leave-active {
  transition: all 0.6s ease;
}


.pitanja-enter-from{
  transform: translateX(-400px);
  opacity: 0;
}
.pitanja-enter-to{
  transform: translateX(0px);
  opacity: 1;
}

.pitanja-leave-from{
  transform: translateX(0px);
}
.pitanja-leave-to{
  transform: translateX(400px);
}

.odgovori-enter-active,
.odgovori-leave-active {
  transition: all 0.6s ease;
}


.odgovori-enter-from{
  transform: translateX(-400px);
  opacity: 0;
}
.odgovori-enter-to{
  transform: translateX(0px);
  opacity: 1;
}

.odgovori-leave-from{
  transform: translateX(0px);
  opacity: 1;
}
.odgovori-leave-to{
  transform: translateX(400px);
  opacity: 0;
}

.slike-enter-active,
.slike-leave-active {
  transition: all 0.6s ease;
}


.slike-enter-from{
  transform: translateX(-400px);
  opacity: 0;
}
.slike-enter-to{
  transform: translateX(0px);
  opacity: 1;
}

.slike-leave-from{
  transform: translateX(0px);
  opacity: 1;
}
.slike-leave-to{
  transform: translateX(400px);
  opacity: 0;
}

.container2{
  margin: 50px auto;
  position: relative;
  padding-top: 42px;
  max-width: 1150px;
  width: 80%;
  min-height: 500px;
  background-image: url('~@/assets/blue-black-gradient-linear-1440x1920-c2-00008b-000000-a-315-f-14.svg');
  background-size: cover cover;
  background-position: center;
  border-radius: 25px;

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
.record1, .record2 {
    display: flex;
    justify-content: space-evenly;
}
.kategorija {
    width: 500px;
    height: 260px;
    text-align: center;
    margin: 10px;
}
.button {
  margin-top: 200px;
  width: 180px;
  height: 40px;
  background: #babbbd;
  cursor: pointer;
  border-radius: 5px;
  color: #141313;
  font-weight: 700;
  font-size: 20px;
  transition: ease-in-out .3s;

}
.button:hover {
  background: #080447;
  color: #fbfbfb;
  letter-spacing: .2rem;
  transform: scale(1.2);
}


.shake{
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

.heartbeat{
 animation:heartbeat 0.8s 
}


@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

/* @keyframes heartbeat
{
  0%
  {
    transform: scale( .75 );
  }
  20%
  {
    transform: scale( 1 );
  }
  40%
  {
    transform: scale( .75 );
  }
  60%
  {
    transform: scale( 1 );
  }
  80%
  {
    transform: scale( .75 );
  }
  100%
  {
    transform: scale( .75 );
  }
} */

 @keyframes heartbeat
{
  0%
  {
    transform: scale( 1 );
  }
  20%
  {
    transform: scale( 1.1 );
  }
  40%
  {
    transform: scale( 1 );
  }
  60%
  {
    transform: scale( 1.1 );
  }
  80%
  {
    transform: scale( 1 );
  }
  100%
  {
    transform: scale( 1 );
  }
} 


.divuNameKvizPrikaz {
  display: flex;
  flex-direction: row;
  position: absolute;
  left: 0;
  top: 0;
  justify-content: center;
  align-items: center;
  height: 30px;
  padding: 5px 10px;
  color: white;
  font-size: 20px;
}

.small-circle-orange-bg {
  background-color: rgb(183, 83, 11) !important;
}
.small-circle-red-bg {
  background-color: rgb(179, 14, 1) !important;
}
.rezultat p {
  padding: 5px;
}
.rezultat-modal {
  width: 400px;
  padding: 20px;
  margin: -100px auto;
  background: rgb(8, 14, 49);
  color: #fbfbfb;
  z-index: 10;
  border: 3px solid #1ca1df;
  border-radius: 10px;
  position: absolute;
}
.rezultat-modal h2 {
  text-align: center;
}

#answer-buttons {
  font-size: 16px;
}
.main-container {
  font-size: 30px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  background-color: #000000;
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
}
.question-picture {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  /* overflow: hidden; */
  border: 2px solid #fbfbfb;
  /* margin-top: 32px; */
  width: 50%;

}
.question-picture img {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
}
.container {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */

  /* border: 2px solid rgb(202, 201, 220); */
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 50px auto;
  flex-direction: column;
  position: relative;
  padding-top: 42px;
  max-width: 1150px;
  width: 80%;
  height: 80%;
  background-image: url("~@/assets/blue-black-gradient-linear-1440x1920-c2-00008b-000000-a-315-f-14.svg");
  background-size: cover cover;
  background-position: center;
  border-radius: 25px;
  z-index: 4;
}
#question-container {
  position: relative;

  bottom: 40px;
  height: 100px;
  padding-right: 5px;
  font-weight: bold;
  color: white;
  z-index: 4;
}
.container-absolute {
  margin: 0 auto;
  box-sizing: border-box;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  max-width: 100%;
  min-width: 100%;
 
  padding: 15px;
  z-index: 4;
}
.btn-grid {
  display: grid;
  justify-content: center;

  grid-auto-rows: 60px;
  /* grid-template-columns: 1fr 1fr; */
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  /* margin: 20px 5px; */
}
.blue-btn {
  border: 1px solid rgb(128, 212, 246);
  background-color: rgb(197, 227, 238);
  border-radius: 5px;
  padding: 0px 5px;
  color: rgb(0, 0, 0);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  cursor: pointer;
  font-size: 23px;
  font-weight: 700;
}

.blue-btn:hover {
  border-color: black;
}

.restartBtn {
  background: #1ca1df;
  color: #090909;
  height: 30px;
  width: 50%;
  display: block;
  margin: 5px auto;
  font-weight: 700;
}
.restartBtn:hover {
  transform: scale(1.2);
  cursor: pointer;
  font-weight: 900;
}

.stopericaIrestart {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.rezultat {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 21px;
  flex-direction: row;
  cursor: pointer;
  font-size: 20px;
  position: absolute;
  /* left: 230px; */
  top: 6px;
  right: 2%;
  z-index: 9;
  color: aliceblue;
}
.samoStoperica p {
  display: flex;
  position: absolute;

  justify-content: center;
  align-items: center;
  z-index: 11;
}
.samoStoperica {
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 40px;
}
.main-circle {
  display: flex;
  justify-content: center;
  align-items: center;
}
.small-circle {
  position: absolute;

  background: black;
  padding: 0;

  width: 2em;
  height: 2em;
  border-radius: 50%;

  z-index: 10;
}
.circle {
  position: relative;
  border: 1px solid black;
  padding: 0;
  margin: 1em auto;
  width: 3em;
  height: 3em;
  border-radius: 50%;
  list-style: none;
  overflow: hidden;
}
li {
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 50%;
  transform-origin: 0% 100%;
}
.text {
  position: absolute;
  left: -100%;
  width: 200%;
  height: 200%;
  text-align: center;
  transform: skewY(0deg) rotate(0deg);
  padding-top: 20px;
  background: green;
}
li:first-child {
  transform: rotate(0deg) skewY(-60deg);
}
li:nth-child(2) {
  transform: rotate(30deg) skewY(-60deg);
}
li:nth-child(3) {
  transform: rotate(60deg) skewY(-60deg);
}
li:nth-child(4) {
  transform: rotate(90deg) skewY(-60deg);
}
li:nth-child(5) {
  transform: rotate(120deg) skewY(-60deg);
}
li:nth-child(6) {
  transform: rotate(150deg) skewY(-60deg);
}
li:nth-child(7) {
  transform: rotate(180deg) skewY(-60deg);
}
li:nth-child(8) {
  transform: rotate(210deg) skewY(-60deg);
}
li:nth-child(9) {
  transform: rotate(240deg) skewY(-60deg);
}
li:nth-child(10) {
  transform: rotate(270deg) skewY(-60deg);
}
li:nth-child(11) {
  transform: rotate(300deg) skewY(-60deg);
}
li:nth-child(12) {
  transform: rotate(330deg) skewY(-60deg);
}

.start-btn {
  position: absolute;
  margin-bottom: 80px;
}
.start-btn:focus {
  border: none;
  outline: none;
}
.success {
  background-color: #28a745 !important;
  color: white;
}
.unsuccess {
  background-color: #a34545 !important;
  color: white;
}
.question-picture {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 2px solid #fbfbfb;
}

@media screen and (max-width: 600px) {
  
.button {
  margin-top: 110px;
  width: 130px;
  height: 30px;
  background: #babbbd;
  cursor: pointer;
  border-radius: 5px;
  color: #141313;
  font-weight: 600;
  font-size: 16px;
  transition: ease-in-out .3s;

}
.button:hover {
  letter-spacing: .1rem;
}

  .divuNameKvizPrikaz {
  display: flex;
  flex-direction: row;
  position: absolute;
  left: 31px;
  top: 0;
  justify-content: center;
  align-items: center;
  height: 30px;

  padding: 2px 10px;
  color: white;
  font-size: 14px;
}
  .rezultat {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 21px;
    flex-direction: row;
    cursor: pointer;
    font-size: 14px;
    position: absolute;
    /* left: 230px; */
    top: 6px;
    right: 2%;
    z-index: 9;
    color: aliceblue;
  }
  .klasaZaUname {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    cursor: pointer;
    font-size: 18px;
    position: absolute;
    margin-left: 20px;
    margin-top: -45px;
    z-index: 9;
    color: aliceblue;
    height: 20px;
  }

  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .question-picture {
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 25px;
    margin-top: 35px;
    overflow: hidden;
    border: 2px solid #fbfbfb;
    width: 80%;

    /* border: 1px solid #fbfbfb; */
  }
  .question-picture img {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
  }

  .main-container {
    font-size: 30px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
 width: 100%;
  background-color: #000000;
   
  }
  .container {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */

    display: flex;
    align-items: center;
    justify-content: flex-start;

    flex-direction: column;
    position: relative;
    padding-top: 0;
    margin-top: 0;
    width: 100%;
    height: 100%;
    background-size: cover cover;
    background-position: center;
    z-index: 4;
  }
  .container2{
    margin: 0 auto;
    position: absolute;
    /* padding-top: 42px; */
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    min-height: 100vh;
    background-image: url('~@/assets/blue-black-gradient-linear-1440x1920-c2-00008b-000000-a-315-f-14.svg');
    background-size: cover cover;
    background-position: center;
    border-radius: 25px;
    padding-top: 0;
  }
  .record1, .record2 {
    display: flex;
    flex-direction: column;
    align-items: center;
  } 
  .kategorija {
    position: relative;
    width: 250px;
    height: 150px;
    text-align: center;
    margin: 10px;
  }
  .istorija {
    margin-top: 50px;
  }
  #question-container {
    position: relative;
    bottom: 0;

    font-size: 16px;
    margin-bottom: 110px;
    padding: 0 5px;
    font-weight: bold;
    color: white;
  }
  .container-absolute {
    font-family: 'Roboto';
    margin: 0 auto;
    box-sizing: border-box;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0);
    position: absolute;
    max-width: 100%;
    min-width: 100%;
    font-size: 17px;
    z-index: 4;
  }
  .btn-grid {
    display: grid;
    justify-content: center;

    grid-auto-rows: 40px;
    /* grid-template-columns: 1fr 1fr; */
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    /* margin: 20px 5px; */
  }
  .blue-btn {
    border: 1px solid rgb(128, 212, 246);
    background-color: rgb(197, 227, 238);
    border-radius: 5px;
    padding: 0px 5px;
    color: rgb(0, 0, 0);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    cursor: pointer;
    font-size: 15px;
  }

  .blue-btn:hover {
    border-color: black;
  }

  .restartBtn {
    background: #1ca1df;
    color: #fbfbfb;
  }

  .main-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2em;
  padding-top: 15px;
}
.small-circle {
  position: absolute;

  background: black;
  padding: 0;

  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;

  z-index: 10;
}
.circle {
  position: relative;
  border: 1px solid black;
  padding: 0;
  margin: 1em auto;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  list-style: none;
  overflow: hidden;
}
}
</style>