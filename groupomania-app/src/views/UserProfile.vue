<template>
    <div class="userProfile">
        <div class="mainContainer">
            <p class="disclaimer">Voici votre page de profil depuis laquelle vous pouvez vérifier/modifier vos informations.</p>
            
            <div class="contentContainer logSign__contentContainer userProfile__contentContainer">
                <h2>Vos Informations</h2>

                <div class="userProfile__photoContainer">
                    <img v-show="this.showUserPhoto" src="*" alt="Photo de profil" class="userProfile__photo">
                </div>
                <button class="photoChangeButton" @click="showFileSelector">Ajouter/Modifier votre photo</button>
                
                <div v-if="this.userModifiesPhoto" class="fileSelectorContainer">
                    <label for="fileSelector">Sélectionnez votre nouvelle photo :</label>
                    <input type="file" id="fileSelector" class="input userProfile__fileSelector" @change="getFileName()">
                    <button class="confirmPhotoChangeButton" @click="sendNewPhoto()">Confirmer</button>
                </div>

                <p class="userProfile__name">Nom: {{ username }}</p>
                <button class="usernameChangeButton" @click="showUsernameModification()">Modifier votre nom</button>
                <label for="newUsername" v-show="this.userModifiesUsername">Entrez votre nouveau nom :</label>
                <input v-model="modifiedUsername" v-show="this.userModifiesUsername" type="text" id="newUsername" class="input userProfile__newUsernameInput" @change="usernameCheck()"> 
                <p :class="{successMsg : usernameChecked, failMsg: !usernameChecked}"></p>
                <button v-show="this.userModifiesUsername" class="confirmPhotoChangeButton" @click="sendNewUsername()">Confirmer</button>

                <p class="userProfile__email">Adresse mail : {{ userEmail }}</p>
                <button class="emailChangeButton"  @click="showEmailModification()">Modifier votre adresse mail</button>
                <label for="newUserEmail" v-show="this.userModifiesEmail">Entrez votre nouvelle adresse mail :</label>
                <input v-model="modifiedEmail" v-show="this.userModifiesEmail" type="text" id="newUserEmail" class="input userProfile__newUserEmailInput" @change="emailCheck()"> 
                <p :class="{successMsg : emailChecked, failMsg: !emailChecked}"></p>
                <button v-show="this.userModifiesEmail" class="confirmPhotoChangeButton" @click="sendNewEmail()">Confirmer</button>

                <br>
                <button class="pwChangeButton">Modifier votre mot de passe</button>
                <br>

                <button class="displayDeleteUserButton" @click="showDeleteAccountContainer()">Supprimer le compte</button>
                <div v-show="this.userDeletesAccount" class="userProfile__deleteAccountContainer">
                    <p class="deleteAccountWarning">Êtes-vous sûr(e) de vouloir supprimer votre compte ? Cette action est définitive.</p>
                    <button class="confirmDeleteAccountButton" @click="deleteUserAccount()">Confirmer</button>
                    <button class="cancelDeleteAccountButton" @click="cancelDeleteAccount()">Annuler</button>
                </div>
            </div>
        </div>
    </div>

</template>


<script>
import axios from "axios";
export default {
    data: function() {
        return {
            username: "",
            userId: "",
            userEmail: "",
            userPhoto: "",

            showUserPhoto: "",
            userModifiesPhoto: false,
            userModifiesUsername: false,
            userModifiesEmail: false,
            userDeletesAccount: false,

            modifiedUsername: "",
            modifiedEmail: "",

            usernameChecked: "",
            emailChecked: "",
        }
    },
    methods: {
        // Affiche l'espace de modification de la photo utilisateur
        showFileSelector() {
            if(this.userModifiesPhoto == false) {
                this.userModifiesPhoto = true;
            } else {
                this.userModifiesPhoto = false;
            }
        },
        // Récupération du nom du fichier photo, stockage et utilisation
        getFileName() {
            let fileSelector = document.querySelector("#fileSelector");
            let newUserPhoto = document.querySelector(".userProfile__photo");
            this.userPhoto = fileSelector.files[0].name;
            newUserPhoto.src = "http://localhost:3000/images/" + this.userPhoto;
            if(newUserPhoto.src !="*") {
            this.showUserPhoto = true;
            }
        },
        // Requête de modification de la photo utilisateur
        sendNewPhoto() {
            axios.put("http://localhost:3000/api/users/" + this.userId, {data: {
                photo: this.userPhoto
            }})
            .then(() => {
                this.$router.go(this.$router.currentRoute)
            })
            .catch(error => console.log(error));
        },
        // Affichage de l'espace de modification du nom de l'utilisateur
        showUsernameModification() {
            if(this.userModifiesUsername == false) {
                this.userModifiesUsername = true;
            } else {
                this.userModifiesUsername = false;
            }
        },
        // Vérification par Expression Régulière
        usernameCheck: function() {
            let userNameInput = document.querySelector(".userProfile__newUsernameInput");
            let textRegex = new RegExp("^((([A-za-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ']+[ | -]{1}[A-za-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ']+)+)|([A-Za-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ']+))$", "g", "i");
            if(textRegex.test(this.username)) {
                userNameInput.nextElementSibling.innerHTML= "Nom valide";
                
                this.usernameChecked = true;
            } else {
                userNameInput.nextElementSibling.innerHTML= "Nom invalide";
                this.usernameChecked = false;
            }
        },
        // Requête de modification du nom de l'utilisateur
        sendNewUsername() {
            if(this.usernameChecked == true) {
                axios.put("http://localhost:3000/api/users/" + this.userId, {data: {
                    username: document.querySelector(".userProfile__newUsernameInput").value
                }})
                .then(() => {
                    localStorage.setItem("username", document.querySelector(".userProfile__newUsernameInput").value)
                    this.$router.go(this.$router.currentRoute)
                })
                .catch(error => console.log(error));
            }
        },
        // Affichage de l'espace de modification de l'adresse mail de l'utilisateur
        showEmailModification() {
            if(this.userModifiesEmail == false) {
                this.userModifiesEmail = true;
            } else {
                this.userModifiesEmail = false;
            }
        },
        // Vérification par Expression Régulière
        emailCheck: function() {
            let emailInput = document.querySelector(".userProfile__newUserEmailInput");
            let emailRegex = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g");
            if(emailRegex.test(this.modifiedEmail)) {
                emailInput.nextElementSibling.innerText= "Adresse mail valide"
                this.emailChecked = true
            } else {
                emailInput.nextElementSibling.innerText= "Adressse mail invalide"
                this.emailChecked = false
            }
        },
        // Requête de modification de l'adresse mail de l'utilisateur
        sendNewEmail() {
            if(this.emailChecked == true) {
                axios.put("http://localhost:3000/api/users/" + this.userId, {data: {
                    email: document.querySelector(".userProfile__newUserEmailInput").value
                }})
                .then(() => {
                    this.$router.go(this.$router.currentRoute)
                })
                .catch(error => console.log(error));
            }
        },
        // Affichage de l'espace de suppression du compte utilisateur
        showDeleteAccountContainer() {
            if(this.userDeletesAccount == false) {
                this.userDeletesAccount = true;
            } else {
                this.userDeletesAccount = false;
            }
        },
        // Fermeture de l'espace de suppression de compte utilisateur
        cancelDeleteAccount() {
            if(this.userDeletesAccount == true) {
                this.userDeletesAccount = false;
            }
        },
        // Requête de suppression de compte utilisateur
        deleteUserAccount() {
            if(localStorage.getItem("userStatus") == "Online") {
                axios.delete("http://localhost:3000/api/users/" + this.userId, {data: {
                    username: this.username
                }})
                .then(() => {
                    alert("Votre compte a bien été supprimé !")
                    this.$emit("user-account-deleted");
                    window.location.replace("/#/");
                })
                .catch(error => console.log(error));
            }
        }
    },
    mounted() {
        // Récupération des données utilisateur afin de rendre la connexion persistante
        if(localStorage.getItem("userStatus") === "Online") {
            this.username = localStorage.getItem("username");
            this.userId = localStorage.getItem("userId");
            axios.get("http://localhost:3000/api/users/" + this.userId)
            .then(res => {
                this.userEmail = res.data.userEmail;
                let userProfileMail = document.querySelector(".userProfile__email");
                userProfileMail.innerHTML = "Adresse e-mail: " + this.email;
                let userProfilePhoto = document.querySelector(".userProfile__photo");
                if(res.data.userPhoto != "" && res.data.userPhoto != null) {
                    this.userPhoto = res.data.userPhoto;
                    this.showUserPhoto = true;
                    userProfilePhoto.setAttribute("src", "http://localhost:3000/images/" + this.userPhoto);
                }
            })
            .catch(error => console.log(error));
        }
        if(this.userPhoto != "" && this.userPhoto != null) {
            this.showUserPhoto = true;
        } else {
            this.showUserPhoto = false;
        }
    },
}
</script>


<style lang="scss" scoped>
@import "../variables.scss";
.userProfile {
    &__contentContainer {
        max-width: 20em;
    }
    &__photoContainer {
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;
    }
    &__photo {
      object-fit: cover;
      width: 39vw;
      height: 37vw;
      min-width: 10em;
      min-height: 10em;
      max-width: 13em;
      max-height: 13em;
      border-radius: 0.4em;
    }
    &__fileSelector {
        width: 8em;
        height: 2em;
    }
    & p {
        margin: 0.9em auto 0 auto;
    }
    & label {
        display: block;
    }
    & .confirmPhotoChangeButton {
        @include button-secondary;
        width: 7em;
        height: 1.5em;
    }
    & .pwChangeButton,
    & .photoChangeButton,
    & .usernameChangeButton,
    & .emailChangeButton {
        @include button-secondary;
        width: 13em;
        max-width: 13em;
        height: 1.5em;
    }
    & .confirmDeleteAccountButton,
    & .cancelDeleteAccountButton {
        @include button-secondary;
        width: 11em;
        max-width: 13em;
        height: 2em;
    }
    & .confirmDeleteAccountButton {
        background-color: $color-primary;
    }
    & .displayDeleteUserButton {
        @include button-secondary;
        background-color: $color-primary;
    }
    &__deleteAccountContainer {
        background-color: rgb(235, 235, 235);
        margin: 0 0.8em;
        padding: 0.2em;
        border-radius: 0.4em;
        & p {
            color: black;
        }
    }
}
</style>