<template>
    <div class="logIn logSign">
        <div class="logSign__mainContainer mainContainer">
            <p class="disclaimer">Le réseau social qui vous appartient !</p>

            <div class="logSign__contentContainer contentContainer">
                <label for="logIn__userInput">Identifiant</label>
                <input v-model="username" id="logIn__nameInput" class="logSignInput" type="text">

                <label for="logIn__passwordInput">Mot de Passe</label>
                <input v-model="password" id="logIn__passwordInput" class="logSignInput" type="text">

                <button class="logSign__buttonMain" @click="sendLogInData()">Connexion</button>
                <a href="*" class="logIn__forgot">Mot de passe oublié ?</a>
            </div>
            <div class="logIn__spaceFiller"></div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'LogIn',
  data: function () {
      return {
        username: "",
        password: ""
      }
  },
  methods: {
    sendLogInData: function() {     
        axios.post("http://localhost:3000/api/auth/login", {
            username: this.username,
            password: this.password
        })
        .then(() => {
            localStorage.setItem("userStatus", "Online");
            this.$emit("user-incoming", this.username )
            window.location.replace("/#/home")
        })
        .catch(error => { 
            console.log(error);
            alert("Veuillez vérifier tous les champs du formulaire ;)")
        });
    }
  }
}
</script>

<style scoped lang="scss">
@import "../variables.scss";
.logIn {
    &__forgot {
        display: block;
        text-decoration: none;
        color: white;
        padding-top: 1em;
    }
}
</style>