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
                    <label for="fileSelector"></label>
                    <input type="file" id="fileSelector" class="input userProfile__fileSelector" @change="getFileName()">
                    <button class="confirmPhotoChangeButton" @click="sendNewPhoto()">Confirmer</button>
                </div>

                <p class="userProfile__name">Nom: {{ username }}</p>
                <button class="usernameChangeButton" @click="showUsernameModification()">Modifier votre nom</button>
                <label for="newUsername"></label>
                <input v-model="modifiedUsername" v-show="this.userModifiesUsername" type="text" id="newUsername" class="input userProfile__newUsernameInput" @change="usernameCheck()"> 
                <p :class="{successMsg : usernameChecked, failMsg: !usernameChecked}"></p>
                <button v-show="this.userModifiesUsername" class="confirmPhotoChangeButton" @click="sendNewUsername()">Confirmer</button>

                <p class="userProfile__email">Adresse mail : {{ userEmail }}</p>
                <button class="emailChangeButton"  @click="showEmailModification()">Modifier votre adresse mail</button>
                <label for="newUserEmail"></label>
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
    // computed: function() {
    //     return {

    //     }

    // },
    methods: {
        showFileSelector() {
            if(this.userModifiesPhoto == false) {
                this.userModifiesPhoto = true;
            } else {
                this.userModifiesPhoto = false;
            }
        },
        getFileName() {
            let fileSelector = document.querySelector("#fileSelector");
            let newUserPhoto = document.querySelector(".userProfile__photo");
            this.userPhoto = fileSelector.files[0].name;
            newUserPhoto.src = "http://localhost:3000/images/" + this.userPhoto;
            if(newUserPhoto.src !="*") {
            this.showUserPhoto = true;
            }
        },
        sendNewPhoto() {
            axios.put("http://localhost:3000/api/users/" + this.username, {data: {
                userId: this.username,
                photo: this.userPhoto
            }})
            .then(() => {
                this.$router.go(this.$router.currentRoute)
            })
            .catch(error => console.log(error));
        },
        showUsernameModification() {
            if(this.userModifiesUsername == false) {
                this.userModifiesUsername = true;
            } else {
                this.userModifiesUsername = false;
            }
        },
        usernameCheck: function() {
            let userNameInput = document.querySelector(".userProfile__newUsernameInput");
            let textRegex = new RegExp("^((([A-za-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ']+[ | -]{1}[A-za-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ']+)+)|([A-Za-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ']+))$", "g", "i");
            console.log(this.modifiedUsername);
            if(textRegex.test(this.username)) {
                userNameInput.nextElementSibling.innerHTML= "Nom valide";
                
                this.usernameChecked = true;
            } else {
                userNameInput.nextElementSibling.innerHTML= "Nom invalide";
                this.usernameChecked = false;
            }
        },
        sendNewUsername() {
            if(this.usernameChecked == true) {
                axios.put("http://localhost:3000/api/users/" + this.username, {data: {
                    userId: this.username,
                    username: document.querySelector(".userProfile__newUsernameInput").value
                }})
                .then(() => {
                    this.$router.go(this.$router.currentRoute)
                })
                .catch(error => console.log(error));
            }
        },
        showEmailModification() {
            if(this.userModifiesEmail == false) {
                this.userModifiesEmail = true;
            } else {
                this.userModifiesEmail = false;
            }
        },
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
        sendNewEmail() {
            if(this.emailChecked == true) {
                axios.put("http://localhost:3000/api/users/" + this.username, {data: {
                    userId: this.username,
                    email: document.querySelector(".userProfile__newUserEmailInput").value
                }})
                .then(() => {
                    this.$router.go(this.$router.currentRoute)
                })
                .catch(error => console.log(error));
            }
        },
        showDeleteAccountContainer() {
            if(this.userDeletesAccount == false) {
                this.userDeletesAccount = true;
            } else {
                this.userDeletesAccount = false;
            }
        },
        cancelDeleteAccount() {
            if(this.userDeletesAccount == true) {
                this.userDeletesAccount = false;
            }
        },
        deleteUserAccount() {
            // if localStorage status online...
            axios.delete("http://localhost:3000/api/users/" + this.username, {data:{userId: this.username}})
            .then(() => {
                alert("Votre compte a bien été supprimé !")
                window.location.replace("/#/");
            })
        }
    },
    mounted() {
        this.username = localStorage.getItem("username");
        console.log(this.username);
        axios.get("http://localhost:3000/api/users/" + this.username)
        .then(res => {
            console.log(res);
            this.username = localStorage.getItem("username");
            this.userEmail = res.data.userEmail;
            let userProfileMail = document.querySelector(".userProfile__email");
            userProfileMail.innerHTML = "Adresse e-mail: " + this.email;
            let userProfilePhoto = document.querySelector(".userProfile__photo");
            // if(res.data.userPhoto != "") {
                this.userPhoto = res.data.userPhoto;
                this.showUserPhoto = true;
                console.log(this.userPhoto);
                userProfilePhoto.setAttribute("src", "http://localhost:3000/images/" + this.userPhoto);
            // } else {
                // this.userPhoto = "";
            // }
        })
        .catch(error => console.log(error));

        if(this.userPhoto != "") {
            this.showUserPhoto = true;
        } else {
            this.showUserPhoto = false;
        }
    },
    updated() {
        // this.username = localStorage.getItem("username");
        // console.log(this.username);
        // axios.get("http://localhost:3000/api/users/" + this.username)
        // .then(res => {
        //     this.email = res.data.userEmail;
        //     this.userPhoto = res.data.userPhoto;
        //     // let userProfileMail = document.querySelector(".userProfile__email");
        //     // userProfileMail.innerHTML = "Adresse e-mail: " + this.email;
        //     let userProfilePhoto = document.querySelector(".userProfile__photo");
        //     userProfilePhoto.setAttribute("src", "http://localhost:3000/images/" + this.userPhoto);
        // })
        // .catch(error => console.log(error));
    }
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