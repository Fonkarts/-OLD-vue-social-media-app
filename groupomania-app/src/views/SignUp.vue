<template>
    <div class="signUp logSign">
        <div class="logSign__mainContainer signUp__mainContainer mainContainer">
            <p class="disclaimer">Inscrivez-vous en quelques secondes !</p>

            <div class="logSign__contentContainer contentContainer">
                <label for="signUp__nameInput">Nom</label>
                <input v-model="username" @change="nameCheck" id="signUp__nameInput" class="logSignInput" type="text">
                <p :class="{successMsg : usernameChecked, failMsg: !usernameChecked}"></p>

                <label for="signUp__mailInput">Adresse e-mail</label>
                <input v-model="email" @change="emailCheck()" id="signUp__mailInput" class="logSignInput" type="text">
                <p :class="{successMsg : emailChecked, failMsg: !emailChecked}"></p>

                <label for="signUp__passwordInput">Mot de passe</label>
                <input v-model="password" @change="pwCheck()" id="signUp__passwordInput" class="logSignInput" type="text">
                <p :class="{successMsg : pwChecked, failMsg: !pwChecked}"></p>

                <label for="signUp__confirmPasswordInput">Confirmation du mot de passe</label>
                <input @change="confirmPwCheck()" id="signUp__confirmPasswordInput" class="logSignInput" type="text">
                <p :class="{successMsg : confirmPwChecked, failMsg: !confirmPwChecked}"></p>

                <button class="logSign__buttonMain" @click="sendSignUpData()">
                Créer mon compte
                </button>
                
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: 'SignUp',
    data: function() {
        return {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            photo: "",

            usernameChecked: "",
            emailChecked: "",
            pwChecked: "",
            confirmPwChecked: "",
        }
    },
    methods: {
        // Vérification du Nom entré à l'aide d'une Expression Régulière
        nameCheck: function () {
            let userNameInput = document.querySelector("#signUp__nameInput");
            let textRegex = new RegExp("^((([A-za-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ']+[ | -]{1}[A-za-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ']+)+)|([A-Za-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ']+))$", "g", "i");
            if(textRegex.test(this.username)) {
                userNameInput.nextElementSibling.innerText= "Nom valide";
                this.usernameChecked = true;
            } else {
                userNameInput.nextElementSibling.innerText= "Nom invalide";
                this.usernameChecked = false;
            }
        },
        // Vérification de l'Adresse Mail entrée à l'aide d'une Expression Régulière
        emailCheck: function () {
            let emailInput = document.querySelector("#signUp__mailInput");
            let emailRegex = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g");
            if(emailRegex.test(this.email)) {
                emailInput.nextElementSibling.innerText= "Adresse mail valide"
                this.emailChecked = true
            } else {
                emailInput.nextElementSibling.innerText= "Adressse mail invalide"
                this.emailChecked = false
            }
        },
        // Vérification du Mot de Passe entré à l'aide d'une Expression Régulière
        pwCheck: function () {
            let pwInput = document.querySelector("#signUp__passwordInput");
            let textRegex = new RegExp("([A-za-z0-9àáâãäåçèéêëìíîïðòóôõöùúûüýÿ']+)", "g", "i");
            if(textRegex.test(this.password)) {
                pwInput.nextElementSibling.innerText= "Mot de passe valide"
                this.pwChecked = true
            } else {
                pwInput.nextElementSibling.innerText= "Mot de passe invalide"
                this.pwChecked = false
            }
        },
        // Vérification de la Confirmation du Mot de Passe à l'aide d'une Expression Régulière
        confirmPwCheck: function () {
            let confirmPwInput = document.querySelector("#signUp__confirmPasswordInput");
            if(confirmPwInput.value === document.querySelector("#signUp__passwordInput").value) {
                confirmPwInput.nextElementSibling.innerText= "Mot de passe confirmé"
                this.confirmPwChecked = true
            } else {
                confirmPwInput.nextElementSibling.innerText= "Mot de passe non confirmé"
                this.confirmPwChecked = false
            }
        },
        // Requête SignUp
        sendSignUpData: function() {
            if(this.usernameChecked && this.emailChecked && this.pwChecked && this.confirmPwChecked) {
                axios.post("http://localhost:3000/api/auth/signup", {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    photo: this.photo
                })
                .then(() => {
                    alert("Votre compte a bien été créé, utilisez maintenant vos identifiants pour vous connecter !")
                    window.location.replace("/#/")
                })
                .catch(error => {
                        alert("Ce nom ou cette adresse mail n'est plus disponible !");
                        console.log(error);
                });
            } else {
                alert("Veuillez vérifier les champs du formulaire ;)");
            }
        }
    }
}
</script>

<style lang="scss" scoped>
</style>