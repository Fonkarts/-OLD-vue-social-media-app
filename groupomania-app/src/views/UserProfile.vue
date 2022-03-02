<template>
    <div class="userProfile">
        <div class="mainContainer">
            <p class="disclaimer">Voici votre page de profil depuis laquelle vous pouvez vérifier/modifier vos informations.</p>
            
            <div class="contentContainer logSign__contentContainer userProfile__contentContainer">
                <h2>Vos Informations</h2>

                <div class="userProfile__photoContainer">
                    <img src="../assets/mario.png" alt="Photo de profil" class="userProfile__photo">
                </div>
                <button class="photoChangeButton">Modifier votre photo de profil</button>

                <p class="userProfile__name" :username="username">Nom/Prénom: {{ username }}</p>
                <p class="userProfile__mail">Adresse e-mail: (userMail)</p>
                <p class="userProfile__job">Poste occupé: (userJob)</p>
                <br>
                <button class="pwChangeButton">Changer votre mot de passe</button>
            </div>
        </div>
    </div>

</template>


<script>
export default {
    props: {
        username: String
    },

}
</script>


<style lang="scss" scoped>

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


}

</style>