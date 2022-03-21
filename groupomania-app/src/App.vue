<template>
  
    <div id="nav" class="nav" >

      <img class="nav__logo" alt="Logo Groupomania" src="./assets/icon-left-font-monochrome-white.svg"><br>

      <router-link v-if="!this.userIsLogged" to="/signup">Inscription</router-link> 
      <span v-if="!this.userIsLogged"> | </span>
      <router-link v-if="!this.userIsLogged" to="/">Connexion</router-link>

      <router-link v-if="this.userIsLogged" to="/home">Accueil</router-link> 
      <span v-if="this.userIsLogged"> | </span>
      <router-link v-if="this.userIsLogged" to="/userprofile">Profil</router-link>
      <span v-if="this.userIsLogged"> | </span>
      <router-link v-if="this.userIsLogged" @click="userIsLoggingOut()" to="/">Déconnexion</router-link>
      <br><br>
      <router-link v-if="this.userIsModerator" to="/moderator">Modération</router-link>
  </div>

  <router-view 
  @user-incoming="userStatusCheck"
  @user-account-deleted="userIsLoggingOut" 
  />

  <div class="copyrights"> 
    <p>Copyrights Groupomania, Fonkarts 2022. Made with <img src="./assets/logo.png" alt="Logo de Vue.js" class="vueLogo"></p> 
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "App",
  data: function () {
    return {
      accessToken: "",
      userIsLogged: "",
      username: "",
      userId: "",
      userEmail: "",
      userPhoto: "",
      userIsModerator: false,
      moderatorIsLogged: false,
    }
  },

  methods: {
    userStatusCheck(res) {
      this.userEmail = res.userEmail;
      this.accessToken = res.userToken;
      this.username = res.userName;
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`
      if(localStorage.getItem("userStatus") === "Online") {
        localStorage.setItem("username", this.username);
        this.userIsLogged = true;
      } else {
        this.userIsLogged = false;
      }
    },
    userIsLoggingOut() {
      localStorage.clear();
      localStorage.setItem("userStatus", "Offline");
      this.userIsLogged = false;
      this.username = "";
      this.userIsModerator = false;
      window.location.replace("/#/");
    },
  },
  mounted() {
    
    // CONDITION ONLINE !!!!
    if(localStorage.getItem("userStatus") === "Online") {
      this.userIsLogged = true;
    } else if (localStorage.getItem("userStatus") === "Offline") {
      this.userIsLogged = false;
    } 
    //  PREMIERE CONDITION CI DESSOUS CHANGéE, LENGHT VIRé !
    if(localStorage.getItem("temp") && localStorage.getItem("userStatus") === "Online") {
      this.accessToken = localStorage.getItem("temp");
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
    } else {
      console.log("temp vide");
    }
    if(localStorage.getItem("userId") && localStorage.getItem("userStatus") === "Online") {
      this.userId = JSON.parse(localStorage.getItem("userId"));
      this.username = localStorage.getItem("username");
    }
    if(this.userIsLogged === true && localStorage.getItem("userRole") === "moderator") {
      this.userIsModerator = true;
    }
    
    
  },
  updated() {
    if(localStorage.getItem("userId") && localStorage.getItem("userStatus") === "Online") {
      this.username = localStorage.getItem("username");
    }
    if(this.userIsLogged === true && localStorage.getItem("userRole") === "moderator") {
      this.userIsModerator = true;
    }
  },
  beforeUpdate() {
    if(localStorage.getItem("userStatus") === "Online") {
      localStorage.setItem("temp", this.accessToken);
    }
  },
}

</script>

<style lang="scss">
@import "./variables.scss";

html {
  max-height: 100%;
}

body {
  margin: 0;
  padding:0;
}

.app {
  @include gradient-main;
  font-family: $font-primary, Helvetica, Arial, sans-serif;
  font-size: 1.2em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  position: relative;

}

.nav {
  padding: 2vw 3vw 3vw 3vw;
  background-color: #333;
  @include desktop-only {
    padding: 1.5vw 3vw 1vw 3vw;
  }
  
  &__logo {
    height: 2em;
    display: inline;
    padding: 0 0.7em 0.5em 0;
  }

  & span {
    color: white;
  }

  & a {
    font-weight: bold;
    color: white;
    margin: 0 1em;
    &.router-link-exact-active {
      color: $color-secondary;
    }
  }
}

.disclaimer {
  padding: 3vw 2vw;
  font-style: italic;
  font-size: 0.8em;
  background-color: #333;
  color: white;
  width: 17em;
  margin: 1em auto;
  border-radius: 0.9em;
  border: 0.15em solid white;
  @include desktop-only {
    padding: 1vw 0;
  }
  @include inter-only {
  padding: 2vw 0;
  }
}

h2 {
  font-size: 1.1em;
  font-family: $font-primary;
  margin: 0 auto 0.5em auto;
  padding: 0.2em 0.2em 0.4em 0.2em;
  color: white;
  width: 56vw;
  max-width: 8em;
}

.home__title {
  border-bottom: 0.1em solid white;
}

.mainContainer { // Englobe le contenu entre le nav et le footer.
  border-top: 0.2em solid white;
  padding-bottom: 5em;
  min-height: 70vh;
}

.contentContainer {
    background-color:  #333;
    color: white;
    border: 0.15em solid white;
    border-radius: 1.5em;
}

.successMsg,
.failMsg {
    font-size: 0.8em;
    margin-top: 0;
}
.successMsg {
    
    color: rgb(149, 241, 188);
}
.failMsg {
    color: rgb(238, 103, 103);
}

input, label {
  margin: 0.4em auto 0.2em auto;
}

input {
  display: block;
  width: 13em;
  height: 1.35em;
  border-radius: 0.5em;
  max-width: 14em;
  max-height: 1.4em;
  font-size: 1em;
  font-family: $font-primary;
  text-align: center;
  padding: 0.35em;
  @include desktop-only {
      padding: 0.35vw 0.6vw;
  }
  @include inter-only {
      padding: 0.5vw 1vw;
  }
}

.logSign { // Concerne les Vues "SignUp" et "LogIn"
  background-color: #333;

  &__mainContainer {
    @include gradient-main;
  }

  &__contentContainer {
    margin: 3vw auto;
    padding: 3vw 0;
    max-width: 18em;
    @include desktop-only {
      width: 30vw;
      max-width: 30em;
      padding: 1vw 1vw 1.2vw 1vw;
    }
    @include inter-only {
      padding: 1.5vw 1.5vw 1.7vw 1.5vw;
      width: 49vw;
    }
  }

  &__buttonMain {
    @include button-main;
  }
  & label {
    border-bottom: 0.1em solid $color-secondary;
  }
}



.copyrights {
  margin: 0 auto;
  bottom:0;
  position: fixed;
  width: 100%;
  background-color: #333;
  padding: 1em 0;
  max-height: 3em;
  border-top: 0.15em solid white;
  & p {
    font-size: 0.8em;
    color: white;
  }
  .vueLogo {
    width: 0.8em;
    height: 0.8em;
  }
}
</style>
