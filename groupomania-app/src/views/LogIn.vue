<template>
    <div class="logIn logSign">
        <div class="logSign__mainContainer mainContainer">
            <p class="disclaimer">Le réseau social qui vous appartient !</p>

            <div class="logSign__contentContainer contentContainer">
                <label for="logIn__nameInput">Identifiant</label>
                <input v-model="username" id="logIn__nameInput" class="logSignInput" type="text">

                <label for="logIn__passwordInput">Mot de Passe</label>
                <input v-model="password" id="logIn__passwordInput" class="logSignInput" type="text">

                <button class="logSign__buttonMain" @click="sendLogInData()">Connexion</button>

                <!-- Le lien ci-dessous est présent à titre d'exemple et n'est pas fonctionnel. -->
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
    // Requête LogIn, les données utilisateur contenues dans la réponse sont envoyées au fichier App.js
    sendLogInData: function() {     
        axios.post("http://localhost:3000/api/auth/login", {
            username: this.username,
            password: this.password
        })
        .then(res => {
            let userId = res.data.id;
            let userName = res.data.username;
            let userEmail = res.data.email;
            let userPhoto = res.data.photo;
            let userToken = res.data.accessToken;
            localStorage.setItem("userStatus", "Online");
            localStorage.setItem("userId", userId);
            localStorage.setItem("userRole", res.data.role[0])
            this.$emit("user-incoming", {
                userName,
                userToken,
                userEmail,
                userPhoto
            })
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