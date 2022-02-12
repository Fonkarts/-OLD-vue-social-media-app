<template>
    <div class="logIn logSign">
        <div class="logSign__mainContainer mainContainer">
            <p class="disclaimer">Le réseau social qui vous appartient !</p>

            <div class="logSign__contentContainer contentContainer">
                <label for="logIn__userInput">Identifiant</label>
                <input id="logIn__userInput" class="logSignInput" type="text">

                <label for="logIn__passwordInput">Mot de Passe</label>
                <input id="logIn__passwordInput" class="logSignInput" type="text">

                <button class="logSign__buttonMain">Connexion</button>
                <a href="*" class="logIn__forgot">Mot de passe oublié ?</a>
            </div>
            <div class="logIn__spaceFiller"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'LogIn',
//   component: {

//   }
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
    &__spaceFiller {
        height: 12em;
    }
}
</style>