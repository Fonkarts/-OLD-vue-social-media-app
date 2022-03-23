<template>
    <div class="logIn logSign">
        <div class="logSign__mainContainer mainContainer">
            <p class="disclaimer">Bienvenue dans votre espace de modération !</p>

            <div class="logSign__contentContainer contentContainer">
                <p>En tant que modérateur, vous possédez les privilèges suivants :</p>
                <ul>
                    <li>Supprimer un commentaire utilisateur</li>
                    <li>Supprimer un article utilisateur</li>
                    <li>Obtenir l'adresse mail d'un utilisateur</li>
                </ul>

                <p>Besoin de contacter un utilisateur ? <br> Entrez son identifiant ci-dessous, vous aurez ensuite la possibilité de cliquer sur l'adresse mail renvoyée.</p>
                <br>
                <label for="moderator__usernameInput">Nom de l'utilisateur :</label>
                <input v-model="username" id="moderator__usernameInput" class="moderator_usernameInput logSignInput" type="text">

                <button class="getUserMailButton" @click="getUserMail()">Obtenir l'adresse mail</button>
                <p v-show="this.moderatorSendsMail">Contacter {{ username }} à <a class="moderator__userEmailLink" href="*">{{ userEmail }}</a></p>
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
          userEmail: "",
          moderatorSendsMail: false
      }
  },
  methods: {
    // Requête modérateur en vue d'obtenir l'adresse mail d'un utilisateur
    getUserMail() {
        console.log(this.username);
        axios.get("http://localhost:3000/api/moderator/users/" + this.username)
        .then(res => {
            if(res.status == 200) {
                this.moderatorSendsMail = true;
                this.userEmail = res.data.userEmail;
                document.querySelector(".moderator__userEmailLink").setAttribute("href", "mailto:" + this.userEmail);
            } 
        })
        .catch(error => {
            console.log(error);
            alert("Utilisateur non trouvé !");
        });


    }
  }
}
</script>

<style scoped lang="scss">
@import "../variables.scss";

.getUserMailButton {
    @include button-secondary;
}
a {
    text-decoration: none;
    color: $color-secondary;
}
.contentContainer {
    padding: 0 1em;
}

</style>