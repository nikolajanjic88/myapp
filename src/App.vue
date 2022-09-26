<template>
  <div style="color: aliceblue" class="klasaZaUname" v-if="this.proveraSid">
    <!-- <p class="uName">{{appUname}}</p> -->
  </div>

  <div class="wrapp-hamburger">
    <div class="wrapp-zaDesktopNav">
      <div v-show="!isMobile" class="zaDesktopNav">
        <router-link
          exact-active-class="exact-active-link"
          class="kalasa-za-linkove"
          to="/"
          >Startuj kviz</router-link
        >
        <router-link
          exact-active-class="exact-active-link"
          class="kalasa-za-linkove"
          v-if="!isAuthenticated"
          to="/register"
        >
          Registruj se</router-link
        >
        <router-link
          exact-active-class="exact-active-link"
          class="kalasa-za-linkove"
          v-if="!isAuthenticated"
          to="/login"
        >
          Prijavi se</router-link
        >
        <router-link
          exact-active-class="exact-active-link"
          class="kalasa-za-linkove"
          to="/profile"
        >
          Rezultati</router-link
        >
        <router-link
          exact-active-class="exact-active-link"
          class="kalasa-za-linkove"
          v-if="isAuthenticated"
          to="/odjava"
        >
          Odjavi se</router-link
        >
      </div>
    </div>
  </div>
  <div v-show="isMobile" class="hamburger-icon" @click="toggleSidebar">
    <i class="fa-solid fa-bars"></i>
  </div>

  <!-- <p style="color:aliceblue">{{storedUname}}</p> -->
  <transition name="mobile-nav">
    <div v-show="sidebar" class="sidebar">
      <ul @click="sidebar = false">
        <li>
          <router-link
            exact-active-class="exact-active-link"
            class="kalasa-za-linkove"
            to="/"
            >Startuj kviz</router-link
          >
        </li>
        <li>
          <router-link
            exact-active-class="exact-active-link"
            class="kalasa-za-linkove"
            to="/register"
            v-if="!isAuthenticated"
          >
            Registruj se</router-link
          >
        </li>
        <li>
          <router-link
            exact-active-class="exact-active-link"
            class="kalasa-za-linkove"
            to="/login"
            v-if="!isAuthenticated"
          >
            Prijavi se</router-link
          >
        </li>
        <li>
          <router-link
            exact-active-class="exact-active-link"
            class="kalasa-za-linkove"
            to="/profile"
          >
            Rezultati</router-link
          >
        </li>
        <li>
          <router-link
            exact-active-class="exact-active-link"
            class="kalasa-za-linkove"
            v-if="isAuthenticated"
            to="/odjava"
          >
            Odjavi se</router-link
          >
        </li>
      </ul>
    </div>
  </transition>

  <router-view />
</template>
<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      proveraSid: "",
      isMobile: false,
      sidebar: false,
      windowWidth: null,
      appUname: "",
    };
  },
  mounted() {
    this.checkSession();
      this.proveraUname();

    setInterval(() => {
    }, 1000);

    setInterval(() => {
      this.checkSession();
    }, 20000);
  },
  computed: {
    ...mapState(["isAuthenticated", "storedSid", "storedUname"]),
  },
  created() {
    window.addEventListener("resize", this.checkScreen);

    this.checkScreen();
  },
  methods: {
    ...mapActions(["setBool"]),
    toggleSidebar() {
      this.sidebar = !this.sidebar;
    },

    proveraUname() {
      this.proveraSid = this.isAuthenticated;
      this.appUname = localStorage.getItem("previewUnamels");
    },

    async checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 768) {
        this.isMobile = true;
        return;
      }
      this.isMobile = false;
      this.sidebar = false;
      return;
    },
    async checkSession() {
      try {
        let slStoreSid = localStorage.getItem("storeSid");
        const res = await axios.get(
          "http://654h122.e2.mars-hosting.com/provera",
          { params: { sid: slStoreSid } }
        );
        

        this.setBool(true);
  console.log(res)
       
      } catch (error) {
        console.log(error);
        this.setBool(false);
        localStorage.removeItem('isAuthenticatedLS')
        localStorage.removeItem("storeSid");
        localStorage.removeItem("uname");
        // console.log(this.isAuthenticated)
      }
    },
  },
};
</script>

<style >
#app {
  font-family: 'Roboto';
    
    font-weight: 200;
    
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #614f7c;
}
.wrapp-zaDesktopNav {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  top: 0;
  /* background-color: #4574c4; */
  z-index: 9;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

.zaDesktopNav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* position: absolute; */
  /* margin-left: 10%; */
  /* margin-left: 33%; */

  height: 28px;
  cursor: pointer;
  font-size: 30px;
  /* position: absolute; */
  left: 20px;
  top: 25px;
  z-index: 9;

  text-shadow: 1px 3px 0 #000000, 2px 13px 4px #000000;
  color: #ffffff;
  background: #1d5fb6;
  padding: 7px;
  margin-top: 5px;
  box-sizing: content-box;
}
.uName {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding-left: 5px;
}
.klasaZaUname {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  cursor: pointer;
  font-size: 25px;
  position: absolute;
  left: 11%;
  top: 50px;
  z-index: 9;
  color: aliceblue;
  height: 20px;
}
.wrapp-hamburger {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.exact-active-link {
  display: flex;
  justify-content: center;

  margin-top: 1px;
  color: #a3d2f0 !important;
}

.kalasa-za-linkove:hover {
  color: #a3d2f0 !important;
}
.kalasa-za-linkove {
  color: rgb(255, 255, 255);

  padding: 0 20px;
  text-decoration: none;
}
.hidden {
  display: none;
}

.hamburger-icon {
  cursor: pointer;
  font-size: 20px;
  position: absolute;
  left: 20px;
  top: 5px;
  z-index: 9;
  color: aliceblue;
}

@media screen and (max-width: 600px) {
  .exact-active-link {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: rgb(163, 159, 159);
    padding: 7px;
    border-radius: 14px;
    color: rgb(255, 255, 255) !important;
  }

  .kalasa-za-linkove {
    text-decoration: none;
    color: #232323;
  }
  .hidden {
    display: none;
  }

  .hamburger-icon {
    cursor: pointer;
    font-size: 20px;
    position: absolute;
    left: 13px;
    top: 6px;
    z-index: 9;
    color: aliceblue;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #ededed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }

  .sidebar ul {
    margin-left: 15px;
    margin-top: 10px;
    font-size: 1.4rem;
  }

  .sidebar ul li {
    display: flex;
    justify-content: center;
    margin-left: 0;
    color: #000;
    list-style: none;
    margin-bottom: 18px;
    width: 150px;
  }
  .sidebar ul li:nth-child(1) {
    display: flex;
    justify-content: center;
    margin-left: 0;
    color: #000;
    list-style: none;
    margin-bottom: 0;
    width: 150px;
  }
  .sidebar ul li:nth-child(2) {
    display: flex;
    justify-content: center;
    margin-left: 0;
    color: #000;
    list-style: none;
    margin-bottom: 0;
    width: 150px;
  }

  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  }

  .mobile-nav-enter-from,
  .mobile-nav-leave-to {
    transform: translateX(-100%);
  }

  .mobile-nav-enter-to {
    transform: translateX(0);
  }
}

/* #nav a {
  font-weight: bold;
  color: whitesmoke;
 
} */

/* #nav a.router-link-exact-active {
  color: white;
  
} */
</style>
