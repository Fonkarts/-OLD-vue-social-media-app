<template>
  <div id="nav" class="nav">
    <!-- <div class="nav__logoContainer"> -->
      <img class="nav__logo" alt="Logo Groupomania" src="./assets/icon-left-font-monochrome-white.svg"><br>
    <!-- </div> -->
    <router-link to="/signup">S'enregistrer</router-link> <span> | </span>
    <router-link to="/">Se connecter</router-link> <span> | </span>
    <router-link to="/home">Accueil</router-link> <span> | </span>
    <router-link to="/userprofile">Profil</router-link>
  </div>

  <router-view/>

  <div class="copyrights"> 
    <p>Copyrights Groupomania, Fonkarts 2022. Made with <img src="./assets/logo.png" alt="Logo de Vue.js" class="vueLogo"></p> 
  </div>
</template>


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
  margin: 0 auto 0.5em auto;
  color: $color-secondary;
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

  & input, label {
    margin: 0.4em auto 0.2em auto;
  }

  & input {
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

  & label {
    border-bottom: 0.1em solid $color-secondary;
  }

  &__buttonMain {
    @include button-main;
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
