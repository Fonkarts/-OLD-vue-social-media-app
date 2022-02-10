<template>
    <div class="signUp logSign">
        <div class="logSign__mainContainer signUp__mainContainer">
            <p>Inscrivez-vous en quelques secondes !</p>

            <div class="logSign__inputsContainer">
                <label for="signUp__nameInput">Nom</label>
                <input id="signUp__nameInput" class="logSignInput" type="text">

                <label for="signUp__mailInput">Adresse e-mail</label>
                <input id="signUp__mailInput" class="logSignInput" type="text">

                <label for="signUp__roleInput">Profession</label>
                <input id="signUp__roleInput" class="logSignInput" type="text">

                <label for="signUp__passwordInput">Mot de passe</label>
                <input id="signUp__passwordInput" class="logSignInput" type="text">

                <label for="signUp__confirmPasswordInput">Confirmation du mot de passe</label>
                <input id="signUp__confirmPasswordInput" class="logSignInput" type="text">

                <button class="logSign__buttonMain">S'enregister</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SignUp',
//   component: {

//   }
}
</script>

<style lang="scss" scoped>
@import "../variables.scss";

.signUp {
    &__mainContainer {
        height: 104vh; // conserver
    }
}
</style>