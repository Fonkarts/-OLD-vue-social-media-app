<template>
  <div class="home">
    <div class="home__mainContainer mainContainer">
      <p class="disclaimer"></p>

      <div class="home__contentContainer contentContainer">

        <div class="home__newArticleContainer article">
          <p class="home__newArticleText">Envie de partager quelque chose ?</p>
          
          <button class="home__newArticleButton" v-if="!this.userCreatesNewArticle" @click="deployNewArticleContainer()">
            Poster un article
          </button>
          
          <div class="home__newArticle article" v-if="this.userCreatesNewArticle">  
            <form ref="newArticleTitle">
              <textarea v-model="newArticle.title" type="text" class="input home__newArticleTitle" ref="newArticleTitle" placeholder="Renseignez un titre..."></textarea>
            
              <div class="article__photoContainer">
                <img v-show="this.showNewArticlePhoto" src=" " class="home__newArticlePhoto article__photo">
              </div>

              <label for="fileSelector">Ajouter une image/photo/gif</label>
              <input type="file" id="fileSelector" class="input home__newArticleFileSelector" @change="getFileName()">

              <textarea v-model="newArticle.description" type="text" class="input article__writeCommentSection" placeholder="Écrivez une description..."></textarea>
            </form>          
          
            <button class="home__cancelNewArticleButton" @click="deployNewArticleContainer()">Annuler</button>
            <button class="home__confirmNewArticleButton" @click="sendNewArticleData()">Envoyer</button>
          </div>
        </div>

        <br>
        <h2 class="home__title">Votre fil d'actus</h2>

        <article class="article articlesOnly">
          <h3 class="article__title"></h3>
          <p class="article__author"></p>
        
          <div class="article__photoContainer">
            <img class="article__photo" src="">
          </div>

          <button class="likeButton">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M96 191.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V223.1C128 206.3 113.7 191.1 96 191.1zM512 227c0-36.89-30.05-66.92-66.97-66.92h-99.86C354.7 135.1 360 113.5 360 100.8c0-33.8-26.2-68.78-70.06-68.78c-46.61 0-59.36 32.44-69.61 58.5c-31.66 80.5-60.33 66.39-60.33 93.47c0 12.84 10.36 23.99 24.02 23.99c5.256 0 10.55-1.721 14.97-5.26c76.76-61.37 57.97-122.7 90.95-122.7c16.08 0 22.06 12.75 22.06 20.79c0 7.404-7.594 39.55-25.55 71.59c-2.046 3.646-3.066 7.686-3.066 11.72c0 13.92 11.43 23.1 24 23.1h137.6C455.5 208.1 464 216.6 464 227c0 9.809-7.766 18.03-17.67 18.71c-12.66 .8593-22.36 11.4-22.36 23.94c0 15.47 11.39 15.95 11.39 28.91c0 25.37-35.03 12.34-35.03 42.15c0 11.22 6.392 13.03 6.392 22.25c0 22.66-29.77 13.76-29.77 40.64c0 4.515 1.11 5.961 1.11 9.456c0 10.45-8.516 18.95-18.97 18.95h-52.53c-25.62 0-51.02-8.466-71.5-23.81l-36.66-27.51c-4.315-3.245-9.37-4.811-14.38-4.811c-13.85 0-24.03 11.38-24.03 24.04c0 7.287 3.312 14.42 9.596 19.13l36.67 27.52C235 468.1 270.6 480 306.6 480h52.53c35.33 0 64.36-27.49 66.8-62.2c17.77-12.23 28.83-32.51 28.83-54.83c0-3.046-.2187-6.107-.6406-9.122c17.84-12.15 29.28-32.58 29.28-55.28c0-5.311-.6406-10.54-1.875-15.64C499.9 270.1 512 250.2 512 227z"/></svg>            
            <p class="likesCount"></p>
          </button>

          <button class="dislikeButton">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M128 288V64.03c0-17.67-14.33-31.1-32-31.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64C113.7 320 128 305.7 128 288zM481.5 229.1c1.234-5.092 1.875-10.32 1.875-15.64c0-22.7-11.44-43.13-29.28-55.28c.4219-3.015 .6406-6.076 .6406-9.122c0-22.32-11.06-42.6-28.83-54.83c-2.438-34.71-31.47-62.2-66.8-62.2h-52.53c-35.94 0-71.55 11.87-100.3 33.41L169.6 92.93c-6.285 4.71-9.596 11.85-9.596 19.13c0 12.76 10.29 24.04 24.03 24.04c5.013 0 10.07-1.565 14.38-4.811l36.66-27.51c20.48-15.34 45.88-23.81 71.5-23.81h52.53c10.45 0 18.97 8.497 18.97 18.95c0 3.5-1.11 4.94-1.11 9.456c0 26.97 29.77 17.91 29.77 40.64c0 9.254-6.392 10.96-6.392 22.25c0 13.97 10.85 21.95 19.58 23.59c8.953 1.671 15.45 9.481 15.45 18.56c0 13.04-11.39 13.37-11.39 28.91c0 12.54 9.702 23.08 22.36 23.94C456.2 266.1 464 275.2 464 284.1c0 10.43-8.516 18.93-18.97 18.93H307.4c-12.44 0-24 10.02-24 23.1c0 4.038 1.02 8.078 3.066 11.72C304.4 371.7 312 403.8 312 411.2c0 8.044-5.984 20.79-22.06 20.79c-12.53 0-14.27-.9059-24.94-28.07c-24.75-62.91-61.74-99.9-80.98-99.9c-13.8 0-24.02 11.27-24.02 23.99c0 7.041 3.083 14.02 9.016 18.76C238.1 402 211.4 480 289.9 480C333.8 480 360 445 360 411.2c0-12.7-5.328-35.21-14.83-59.33h99.86C481.1 351.9 512 321.9 512 284.1C512 261.8 499.9 241 481.5 229.1z"/></svg>
            <p class="dislikesCount"></p>
          </button>

          <button class="shareButton">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M448 127.1C448 181 405 223.1 352 223.1C326.1 223.1 302.6 213.8 285.4 197.1L191.3 244.1C191.8 248 191.1 251.1 191.1 256C191.1 260 191.8 263.1 191.3 267.9L285.4 314.9C302.6 298.2 326.1 288 352 288C405 288 448 330.1 448 384C448 437 405 480 352 480C298.1 480 256 437 256 384C256 379.1 256.2 376 256.7 372.1L162.6 325.1C145.4 341.8 121.9 352 96 352C42.98 352 0 309 0 256C0 202.1 42.98 160 96 160C121.9 160 145.4 170.2 162.6 186.9L256.7 139.9C256.2 135.1 256 132 256 128C256 74.98 298.1 32 352 32C405 32 448 74.98 448 128L448 127.1zM95.1 287.1C113.7 287.1 127.1 273.7 127.1 255.1C127.1 238.3 113.7 223.1 95.1 223.1C78.33 223.1 63.1 238.3 63.1 255.1C63.1 273.7 78.33 287.1 95.1 287.1zM352 95.1C334.3 95.1 320 110.3 320 127.1C320 145.7 334.3 159.1 352 159.1C369.7 159.1 384 145.7 384 127.1C384 110.3 369.7 95.1 352 95.1zM352 416C369.7 416 384 401.7 384 384C384 366.3 369.7 352 352 352C334.3 352 320 366.3 320 384C320 401.7 334.3 416 352 416z"/></svg>
            <!-- Partager -->
          </button> 

          <p class="article__description"></p>

          <div class="article__commentsSection">
            <button class="article__displayCommentsButton">Afficher les commentaires</button>
            <div class="article__readCommentsSection"> 
            </div>

            <textarea type="text" class="input article__writeCommentSection" placeholder="Écrivez un commentaire..."></textarea>
            <button class="article__sendCommentButton home__confirmNewArticleButton">Envoyer</button>
            <br>
          </div>
          <button class="deleteArticleButton">Supprimer l'article</button>
          <button class="modifyArticleButton">Modifier l'article</button>

          <div class="article__modify home__newArticle">  
            <form class="article__modifyForm">
              <p class="article__modifyDisclaimer">Merci de renseigner à nouveau ces champs :</p>
              <textarea type="text" class="input home__newArticleTitle" ref="newArticleTitle" placeholder="Renseignez un nouveau titre..."></textarea>
            
              <!-- <div class="article__photoContainer">
                <img src=" " class="article__modifyPhoto home__newArticlePhoto article__photo">
              </div> -->

              <label for="fileSelector">Modifier votre image/photo/gif</label>
              <input type="file" id="fileSelector" class="input article__modifyArticleFileSelector home__newArticleFileSelector">

              <textarea type="text" class="input article__writeCommentSection" placeholder="Écrivez une nouvelle description..."></textarea>
            </form>          
          
            <button class="home__cancelNewArticleButton">Annuler</button>
            <button class="home__confirmNewArticleButton">Envoyer</button>
          </div> 

        </article>

      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'Home',
  data: function() {
    return {
      username: "",
      userCreatesNewArticle: false,
      showNewArticlePhoto: false,
      userModifiesArticle: false,
      userReadsComments: false,
      userModifiesComment: false,
      userEverVotedArray: [],
      userLikesArray: [],
      userDislikesArray: [],

      // newComment: "",
      newArticle: {
        title: "",
        description: "",
        imageUrl: "",
        userId: "",
        username: "",
      },
      article: {
        id: "",
        title: "",
        description: "",
        imageUrl: "",
        userId: ""
      },
      comment: {
        // id: "",
        text: "",
        userId: "",
        username: "",
        articleId: "",
      }
    }
  },
  methods: { 

    deployNewArticleContainer() {
      if(this.userCreatesNewArticle == false) {
        this.userCreatesNewArticle = true;
      } else if(this.userCreatesNewArticle == true) {
        this.userCreatesNewArticle = false;
      }
    },
    getFileName() {
      let fileSelector = document.querySelector("#fileSelector");
      let newArticlePhoto = document.querySelector(".home__newArticlePhoto");
      this.newArticle.imageUrl = fileSelector.files[0].name;
      newArticlePhoto.src = "http://localhost:3000/images/" + this.newArticle.imageUrl;
      if(newArticlePhoto.src !="*") {
      this.showNewArticlePhoto = true;
      }
    },
    sendNewArticleData() {
      this.newArticle.userId = this.userId;
      this.newArticle.username = this.username;
      axios.post("http://localhost:3000/api/articles", this.newArticle)
      .then(() => {
          this.newArticle.title = "";
          this.newArticle.description = "";
          this.newArticle.imageUrl = "";
          this.userCreatesNewArticle = false;
          console.log(this.article);
          this.$router.go(this.$router.currentRoute)

      })
      .catch(error => console.log(error));
    },
    async sendArticleLike(event) {
      let currentArticleId = event.target.closest(".article").getAttribute("id");
      let userId = localStorage.getItem("userId");

      if(event.target.nextElementSibling.classList.contains("hasDislikedButton")) {
        alert("Veuillez retirer votre Dislike avant de soumettre un Like ;) !");
      } else {
        // Si l'utilisateur retire son like
        if(event.target.classList.contains("hasLikedButton")) {
          // Modification des likes de l'article et des valeurs de la table des likes/dislikes utilisateurs
          try {
            const removeLike = await axios.put("http://localhost:3000/api/articles/likes/" + currentArticleId, {data:{ 
              userId: userId,
              like: 0,
              likeEntries: {
                userLikes: 0,
                userDislikes: 0
              }
            }})
            if(removeLike) {
              event.target.classList.remove("hasLikedButton");
              event.target.classList.add("hasNotLikedButton");
              this.$router.go(this.$router.currentRoute);
              console.log(removeLike);
              console.log("like retiré de likeEntries (modif)");
              console.log("like retiré d'articles");
            }
          } catch(error) {
              console.log(error);
          }
        } 
        // Si l'utilisateur soumet un like...
        else if(event.target.classList.contains("hasNotLikedButton")){
          // ... et qu'il n'avait pas encore voté pour cet article...
          if(event.target.nextElementSibling.classList.contains("hasNotDislikedButton") 
            && this.userLikesArray.indexOf(currentArticleId) == -1
            && this.userDislikesArray.indexOf(currentArticleId) == -1
            && this.userEverVotedArray.indexOf(currentArticleId) == -1) {
              // Modification des likes de l'article et création d'une entrée dans la table des likes/dislikes utilisateurs
            try {
              const sendFirstLike = await axios.put("http://localhost:3000/api/articles/likes/" + currentArticleId, {data:{ 
                userId: userId,
                like: 1,
                likeEntries: {
                  userLikes: 1,
                  userDislikes: 0 
                }
              }})
              if(sendFirstLike) {
                event.target.classList.remove("hasNotLikedButton");
                event.target.classList.add("hasLikedButton");
                this.$router.go(this.$router.currentRoute);
                console.log("entrée likesEntries créée: like !");
                console.log("like ajouté à articles !");
              }
            } catch(error) {
              console.log(error);
            }
          } else { // ... ou s'il avait déjà voté auparavant...
            // Modification des likes de l'article et des valeurs de la table des likes/dislikes utilisateurs
            try {
              const sendAnotherLike = await axios.put("http://localhost:3000/api/articles/likes/" + currentArticleId, {data:{ 
                userId: userId,
                like: 1,
                likeEntries: {
                  userLikes: 1,
                  userDislikes: 0
                }
              }})
              if(sendAnotherLike) {
                event.target.classList.remove("hasNotLikedButton");
                event.target.classList.add("hasLikedButton");
                this.$router.go(this.$router.currentRoute);
                console.log("entrée likesEntries créée: like !");
                console.log("like ajouté à articles !");
              }
            } catch(error) {
              console.log(error);
            }
          }
        }
      }
    },
    async sendArticleDislike(event) {
      let currentArticleId = event.target.closest(".article").getAttribute("id");
      let userId = localStorage.getItem("userId");
      
      if(event.target.previousElementSibling.classList.contains("hasLikedButton")) {
        alert("Veuillez retirer votre Like avant de soumettre un Dislike ;) !");
      } else {
        // Si l'utilisateur retire son like
        if(event.target.classList.contains("hasDislikedButton")) {
          // Modification des dislikes de l'article et des valeurs de la table des likes/dislikes utilisateurs
          try {
            const removeDislike = await axios.put("http://localhost:3000/api/articles/likes/" + currentArticleId, {data:{ 
              userId: userId,
              dislike: 0,
              likeEntries: {
                userLikes: 0,
                userDislikes: 0
              }
            }})
            if(removeDislike) {
              event.target.classList.remove("hasDisikedButton");
              event.target.classList.add("hasNotDikedButton");
              this.$router.go(this.$router.currentRoute);
              console.log(removeDislike);
              console.log("dislike retiré de likeEntries (modif)");
              console.log("dislike retiré d'articles");
            }
          } catch(error) {
              console.log(error);
          }
        } 
        // Si l'utilisateur soumet un dislike...
        else if(event.target.classList.contains("hasNotDislikedButton")){
          // ... et qu'il n'avait pas encore voté pour cet article...
          if(event.target.previousElementSibling.classList.contains("hasNotLikedButton") 
            && this.userLikesArray.indexOf(currentArticleId) == -1
            && this.userDislikesArray.indexOf(currentArticleId) == -1
            && this.userEverVotedArray.indexOf(currentArticleId) == -1) {
              // Modification des dislikes de l'article et création d'une entrée dans la table des likes/dislikes utilisateurs
            try {
              const sendFirstDislike = await axios.put("http://localhost:3000/api/articles/likes/" + currentArticleId, {data:{ 
                userId: userId,
                dislike: 1,
                likeEntries: {
                  userLikes: 0,
                  userDislikes: 1 
                }
              }})
              if(sendFirstDislike) {
                event.target.classList.remove("hasNotDislikedButton");
                event.target.classList.add("hasDislikedButton");
                this.$router.go(this.$router.currentRoute);
                console.log("entrée likesEntries créée: dislike !");
                console.log("dislike ajouté à articles !");
              }
            } catch(error) {
              console.log(error);
            }
          } else { // ... ou s'il avait déjà voté auparavant...
            // Modification des likes de l'article et des valeurs de la table des likes/dislikes utilisateurs
            try {
              const sendAnotherDislike = await axios.put("http://localhost:3000/api/articles/likes/" + currentArticleId, {data:{ 
                userId: userId,
                dislike: 1,
                likeEntries: {
                  userLikes: 0,
                  userDislikes: 1
                }
              }})
              if(sendAnotherDislike) {
                event.target.classList.remove("hasNotDislikedButton");
                event.target.classList.add("hasDislikedButton");
                this.$router.go(this.$router.currentRoute);
                console.log("entrée likesEntries créée: dislike !");
                console.log("dislike ajouté à articles !");
              }
            } catch(error) {
              console.log(error);
            }
          }
        }
      }
    },

    // ------------------------   TEST DISLIKE ORIGINAL ----------------------------

    // sendArticleDislike(event) {
    //   let currentArticleId = event.target.closest(".article").getAttribute("id");
    //   let userId = localStorage.getItem("userId");

    //   if(event.target.previousElementSibling.classList.contains("hasLikedButton")) {
    //     alert("Veuillez retirer votre Like avant de soumettre un Dislike ;) !");
    //   } else {
    //     // Si l'utilisateur retire son dislike
    //     if(event.target.classList.contains("hasDislikedButton")) { 

    //       // Modification de la table des likes/dislikes utilisateurs
    //       axios.put("http://localhost:3000/api/likes/" + userId, {data:{
    //         articleId: currentArticleId,
    //         userDislikes: 0
    //       }})
    //         .then(() => {
    //           console.log("dislike retiré de likesEntries (modif)");
    //         })
    //         .catch(error => console.log(error));

    //       // Modification des dislikes de l'article 
    //       axios.put("http://localhost:3000/api/articles/likes/" + currentArticleId, {data:{ 
    //         userId: userId,
    //         dislike: 0 
    //       }})
    //         .then(() => {
    //           event.target.classList.remove("hasDislikedButton");
    //           event.target.classList.add("hasNotDislikedButton");
    //           console.log("dislike retiré d'articles !");
    //         })
    //         .catch(error => console.log(error));
    //     } 
    //     // Si l'utilisateur soumet un dislike...
    //     else if(event.target.classList.contains("hasNotDislikedButton")){
    //       // ... et qu'il n'avait pas encore voté pour cet article...
    //       if(event.target.previousElementSibling.classList.contains("hasNotLikedButton") 
    //         && this.userLikesArray.indexOf(currentArticleId) == -1
    //         && this.userDislikesArray.indexOf(currentArticleId) == -1
    //         && this.userEverVotedArray.indexOf(currentArticleId) == -1) {
    //         // Création d'une entrée dans la table des likes/dislikes utilisateurs
    //         axios.post("http://localhost:3000/api/likes", {data: {
    //           articleId: currentArticleId,
    //           userId: userId,
    //           userLikes: 0,
    //           userDislikes: 1
    //         }})
    //         .then(res => {
    //           console.log(res);
    //           console.log("entrée de likesEntries créée : dislike !");
    //         })
    //         .catch(error => console.log(error));
    //       } else { // ... ou s'il avait déjà voté auparavant...
    //         // Modification de la table des likes/dislikes utilisateurs
    //         axios.put("http://localhost:3000/api/likes/" + userId, {data:{
    //           articleId: currentArticleId,
    //           userDislikes: 1
    //         }})
    //           .then(() => {
    //             console.log("dislike ajouté à likeEntries (modif)");
    //           })
    //           .catch(error => console.log(error));
    //       }
    //       // Modification des dislikes de l'article 
    //       axios.put("http://localhost:3000/api/articles/likes/" + currentArticleId, {data:{ 
    //         userId: userId,
    //         dislike: 1 
    //         }})
    //           .then(() => {
    //             event.target.classList.remove("hasNotDislikedButton");
    //             event.target.classList.add("hasDislikedButton");
    //             console.log("dislike ajouté à article");
    //           })
    //           .catch(error => console.log(error));
    //     }
    //   }
    // },

    displayCommentsContainer(event) {
      let currentDisplayCommentsButton = event.target;
      let currentArticleId = event.target.closest(".article").getAttribute("id");
      let currentCommentsSection = event.target.nextElementSibling;
      currentCommentsSection.setAttribute("id", "cs" + currentArticleId);
      if(this.userReadsComments == false) {
        axios.get("http://localhost:3000/api/comments/" + currentArticleId)
        .then(res => {
          for(let i=0; i<res.data.length; i++) {
            // Création du conteneur du commentaire
            let currentComment = document.createElement("div");
            currentCommentsSection.appendChild(currentComment);
            currentComment.className = "article__comment";
            currentComment.setAttribute("id", res.data[i].id)

            currentComment.style.border = "0.1em solid #FF5F6D";
            currentComment.style.borderRadius = "0.5em";
            currentComment.style.textAlign = "left";
            currentComment.style.padding = "0.4em";
            currentComment.style.margin = "0.2em 0";

            // Création du "titre" du commentaire
            let currentCommentAuthor = document.createElement("h4");
            currentComment.appendChild(currentCommentAuthor);
            currentCommentAuthor.className = "article__commentAuthor";
            currentCommentAuthor.innerHTML = res.data[i].username + " a écrit : ";

            currentCommentAuthor.style.margin = "0.1em 0";

            // Création du contenu du commentaire
            let currentCommentText = document.createElement("p");
            currentComment.appendChild(currentCommentText);
            currentCommentText.className = "article__commentText";
            currentCommentText.innerHTML = res.data[i].text;

            currentCommentText.style.margin = "0 0 0.4em 0";

            if(res.data[i].userId == this.userId) {
            // Création du bouton de suppression du commentaire
            
              let deleteCommentButton = document.createElement("button");
              currentComment.appendChild(deleteCommentButton);
              // deleteCommentButton.classList.add("smallCommentsButtons");
              deleteCommentButton.innerHTML = "Supprimer";
              deleteCommentButton.addEventListener("click", this.deleteComment);

              deleteCommentButton.style.fontSize = "0.8em";
              deleteCommentButton.style.fontWeight = "bold";
              deleteCommentButton.style.fontFamily = "Roboto Condensed";
              deleteCommentButton.style.width = "auto";
              deleteCommentButton.style.height = "auto";
              deleteCommentButton.style.color = "black";
              deleteCommentButton.style.backgroundColor = "#f7db80";
              deleteCommentButton.style.border = "0.1 em black solid";
              deleteCommentButton.style.borderRadius = "0.7em";
              deleteCommentButton.style.cursor = "pointer";

            // Création du bouton de modification du commentaire
              let modifyCommentButton = document.createElement("button");
              currentComment.appendChild(modifyCommentButton);
              // modifyCommentButton.classList.add("smallCommentsButtons");
              modifyCommentButton.innerHTML = "Modifier";
              modifyCommentButton.addEventListener("click", this.modifyComment);

              modifyCommentButton.style.fontSize = "0.8em";
              modifyCommentButton.style.fontWeight = "bold";
              modifyCommentButton.style.fontFamily = "Roboto Condensed";
              modifyCommentButton.style.width = "auto";
              modifyCommentButton.style.height = "auto";
              modifyCommentButton.style.color = "black";
              modifyCommentButton.style.backgroundColor = "#f7db80";
              modifyCommentButton.style.border = "0.1 em black solid";
              modifyCommentButton.style.borderRadius = "0.7em";
              modifyCommentButton.style.cursor = "pointer";
            }
          }
        })
        .catch(error => console.log(error));
        this.userReadsComments = true;
        currentCommentsSection.style.display = "block";
        currentDisplayCommentsButton.innerHTML = "Fermer les commentaires";
      } 
      else if(this.userReadsComments == true) {
        this.userReadsComments = false;
        currentCommentsSection.style.display = "none";
        currentDisplayCommentsButton.innerHTML = "Afficher les commentaires";
        document.getElementById("cs" + currentArticleId).innerHTML = " ";
      }
    },
    modifyComment(event) {
      if(this.userModifiesComment == false) {
        this.userModifiesComment = true;
        let modifyCommentInput = document.createElement("input");
        let currentComment = event.target.closest(".article__comment");
        let currentCommentId = currentComment.getAttribute("id");
        currentComment.appendChild(modifyCommentInput);
        modifyCommentInput.style.textAlign = "left";
        modifyCommentInput.style.width = "50vw";
        modifyCommentInput.style.minWidth = "8em";
        modifyCommentInput.style.maxWidth = "20em";

        let confirmCommentModificationButton = document.createElement("button");
        currentComment.appendChild(confirmCommentModificationButton);
        confirmCommentModificationButton.innerHTML = "Envoyer";
        // confirmCommentModificationButton.classList.add("smallCommentsButtons");

        confirmCommentModificationButton.style.fontSize = "0.8em";
        confirmCommentModificationButton.style.fontWeight = "bold";
        confirmCommentModificationButton.style.fontFamily = "Roboto Condensed";
        confirmCommentModificationButton.style.width = "auto";
        confirmCommentModificationButton.style.height = "auto";
        confirmCommentModificationButton.style.color = "black";
        confirmCommentModificationButton.style.backgroundColor = "#f7db80";
        confirmCommentModificationButton.style.border = "0.1 em black solid";
        confirmCommentModificationButton.style.borderRadius = "0.7em";
        confirmCommentModificationButton.style.cursor = "pointer";
        let username = this.username;
        let userId = this.userId;
        const reloadPage= () => {this.$router.go(this.$router.currentRoute)};

        confirmCommentModificationButton.addEventListener("click", function() {
          if(modifyCommentInput.value != "") {
            axios.put("http://localhost:3000/api/comments/" + currentCommentId, {data:{
              userId: userId,
              username: username,
              text: modifyCommentInput.value
              }})
              .then(() => {
                  reloadPage();
                })
              .catch(error => console.log(error));
          }
        })
      }
    },
    deleteComment(event) {
      let currentCommentId = event.target.closest(".article__comment").getAttribute("id");
      axios.delete("http://localhost:3000/api/comments/" + currentCommentId, {data:{
        userId: this.userId
        }})
       .then(() => {
          this.$router.go(this.$router.currentRoute)
        })
      .catch(error => console.log(error));    
    },
    sendComment(event) {
      if(this.newComment != "") {
        this.comment.articleId =  event.target.closest(".article").getAttribute("id");
        this.comment.text = event.target.previousElementSibling.value;
        this.comment.username = this.username;
        this.comment.userId = this.userId;
        axios.post("http://localhost:3000/api/comments", this.comment)
        .then(() => {
          this.$router.go(this.$router.currentRoute)
        })
        .catch(error => console.log(error));
      } else {
        alert("Votre commentaire ne peut pas être vide !");
      }
    },
    deleteArticle(event) {
      let currentArticleId = event.target.closest(".article").getAttribute("id");
      axios.delete("http://localhost:3000/api/articles/" + currentArticleId,{data: {userId: this.userId}})
       .then(() => {
          this.$router.go(this.$router.currentRoute)
        })
      .catch(error => console.log(error));
    },
    modifyArticle(event) {
      
      if(this.userModifiesArticle == false) {
        this.userIsModifyingArticle = true;
        let modifyContainer = event.target.nextElementSibling;
        modifyContainer.style.borderRadius = "0.7em";
        modifyContainer.style.display = "block";
        let currentArticleId = event.target.closest(".article").getAttribute("id");

        let modifyForm = document.querySelector("#modifyForm" + currentArticleId);
        modifyForm.children[1].style.margin = "0.2em auto 0.5em auto";
        modifyForm.children[1].style.display = "block";

        let userId = this.userId;     
        const reloadPage= () => {this.$router.go(this.$router.currentRoute)};

        let cancelArticleModificationButton = modifyContainer.children[1];
        cancelArticleModificationButton.addEventListener("click", function() {
          reloadPage();
        });

        let confirmModifiedArticleButton = modifyContainer.children[2];
        confirmModifiedArticleButton.addEventListener("click", function() {
          axios.put("http://localhost:3000/api/articles/" + currentArticleId, {data:{
            userId: userId,
            title: modifyForm.children[1].value,
            imageUrl: modifyForm.children[3].files[0].name,
            description: modifyForm.children[4].value
          }})
          .then(() => {
            reloadPage();
          })
          .catch(error => console.log(error));
        })
      }
    }
  },
  mounted() {
    this.username = localStorage.getItem("username"); 
    this.userId = JSON.parse(localStorage.getItem("userId"));   
    document.querySelector(".disclaimer").innerHTML = "Bienvenue " + this.username + " !";
    axios.get("http://localhost:3000/api/articles")
    .then(res => {
      if(res.status == 200) {
        let n=1; 
        while(n < res.data.length) {
          const clonedArticle = document.querySelector(".contentContainer > article").cloneNode(true);
          document.querySelector(".contentContainer").appendChild(clonedArticle);
          n++;
          // Création d'articles supplémentaires selon le nombre de produits sélectionnés (article pré-existant dans HTML conservé, d'où n=1)
        }
        for(let i=0; i < res.data.length; i++) {
          // Attribution d'un articleId correspondant à l'id de l'article dans le BDD
          // let articles = document.querySelectorAll(".articlesOnly")[i];
          
          document.querySelectorAll(".articlesOnly")[i].setAttribute("id", res.data[i].id);
          // Titre et description de l'article
          this.article.title = res.data[i].title;
          document.querySelectorAll(".article__title")[i].textContent = this.article.title;
          this.article.userId = res.data[i].userId;
          this.article.username = res.data[i].username;
          document.querySelectorAll(".article__author")[i].textContent = " publié par " + this.article.username;
          this.article.description = res.data[i].description;
          document.querySelectorAll(".article__description")[i].textContent = this.article.description;
          
          // Affichage de la photo de l'article
          let articlePhoto = document.querySelectorAll(".article__photo");
          this.article.imageUrl = res.data[i].imageUrl;
          if(res.data[i].imageUrl === "") {
            articlePhoto[i].style.display = "none";
          } else {
            articlePhoto[i].setAttribute("src", "http://localhost:3000/images/" + this.article.imageUrl);
          }

          // Bouton d'affichage des commentaires
          const displayCommentsButton = document.querySelectorAll(".article__displayCommentsButton");
          displayCommentsButton[i].setAttribute("id", "displayCommentButton" + res.data[i].id);
          displayCommentsButton[i].addEventListener("click", this.displayCommentsContainer);

          // Bouton d'envoi des commentaires
          const sendCommentButton = document.querySelectorAll(".article__sendCommentButton");
          sendCommentButton[i].setAttribute("id", "sendCommentButton" + res.data[i].id);
          sendCommentButton[i].addEventListener("click", this.sendComment);

          // Bouton de suppression de l'article
          const deleteButtons = document.querySelectorAll(".deleteArticleButton");
          deleteButtons[i].setAttribute("id", "deleteButton" + res.data[i].id);
          deleteButtons[i].addEventListener("click", this.deleteArticle);
          if(res.data[i].userId != this.userId) {
            deleteButtons[i].style.display = "none";
          } 
          // Bouton de modification de l'article
          const modifyButtons = document.querySelectorAll(".modifyArticleButton");
          modifyButtons[i].setAttribute("id", "modifyButton" + res.data[i].id);
          modifyButtons[i].addEventListener("click", this.modifyArticle);
          if(res.data[i].userId != this.userId) {
            modifyButtons[i].style.display = "none";
          } 
          document.querySelectorAll(".article__modifyForm")[i].setAttribute("id", "modifyForm"+ res.data[i].id);
        }
      }
    })
    .catch(error => console.log(error));

    // Likes et Dislikes de l'utilisateur
    const userId = localStorage.getItem("userId");
    axios.get("http://localhost:3000/api/likes/" + userId)
    .then(res => {
      // console.log(res);
      let likesDislikesArray = res.data.articlesLiked;
      for(let i=0; i<likesDislikesArray.length; i++) {

        if(likesDislikesArray[i].userId == userId) {
          this.userEverVotedArray.push(likesDislikesArray[i].articleId);
          console.log("id article ajouté au tableau userEverVoted");
        }
        if(likesDislikesArray[i].userId == userId 
        && likesDislikesArray[i].userLikes == 1) {
          this.userLikesArray.push(likesDislikesArray[i].articleId);
          console.log("id article ajouté au tableau userLikes");
        } 
        else if (likesDislikesArray[i].userId == userId 
        && likesDislikesArray[i].userDislikes == 1) {
          this.userDislikesArray.push(likesDislikesArray[i].articleId);
          console.log("id article ajouté au tableau userDislikes");
        }
        else {
          console.log("userLikesArray et userDislikesArray vides !");
        }
      }
      // console.log(likesDislikesArray);
      // console.log(this.userLikesArray);
      console.log(this.userEverVotedArray);
    })
    .catch(error => console.log(error));

    axios.get("http://localhost:3000/api/articles")
    .then(res => {
      if(res.status == 200) {
        for(let i=0; i<res.data.length; i++) {
          // Bouton like
          const likeButton = document.querySelectorAll(".likeButton");
          likeButton[i].addEventListener("click", this.sendArticleLike);

          // Bouton dislike
          const dislikeButton = document.querySelectorAll(".dislikeButton");
          dislikeButton[i].addEventListener("click", this.sendArticleDislike);

          // Affichage des likes et dislikes
          const likesCounter = document.querySelectorAll(".likesCount");
          const dislikesCounter = document.querySelectorAll(".dislikesCount");
          likesCounter[i].textContent = res.data[i].likes;
          dislikesCounter[i].textContent = res.data[i].dislikes;

          let likedArticlesId = JSON.stringify(res.data[i].id);
          // Si l'utilisateur a liké cet article (id de l'article dans tableau userLikes)
          if(this.userLikesArray.indexOf(likedArticlesId) != -1 && this.userDislikesArray.indexOf(likedArticlesId) == -1) {
            likeButton[i].classList.add("hasLikedButton");
            dislikeButton[i].classList.add("hasNotDislikedButton");
          } 
          // Si l'utilisateur a disliké cet article (id de l'article dans tableau userDislikes)
          else if(this.userLikesArray.indexOf(likedArticlesId) == -1 && this.userDislikesArray.indexOf(likedArticlesId) != -1) {
            likeButton[i].classList.add("hasNotLikedButton");
            dislikeButton[i].classList.add("hasDislikedButton");
          } 
          // Si l'utilisateur n'a pas voté pour cet article (id de l'article absent des tableaux userLikes et userDislikes)
          else if(this.userLikesArray.indexOf(likedArticlesId) == -1 && this.userDislikesArray.indexOf(likedArticlesId) == -1) {
            dislikeButton[i].classList.add("hasNotDislikedButton");
            likeButton[i].classList.add("hasNotLikedButton");
          }
          else {
            console.log("Alors là il y a un problème -_- !");
          }
        }
      }
    })
    .catch(error => console.log(error));
  }, 
}
</script>


<style lang="scss" scoped>
@import "../variables.scss";

.home {
  &__contentContainer {
    min-width: 12em;
    width: 87vw;
    min-height: 60vh;
    max-width: 35em;
    margin: 1em auto;
    padding: 0.6em 0.2em;
  }
  &__newArticle {
    transition: all 500ms ease-in-out;
    border: 0.1em solid black;
  }
  &__newArticleText {
    margin: 0;
    font-weight: bold;
  }
  &__newArticleTitle {
      font-family: $font-primary;
      font-size: 1em;
      color: black;
      text-align: left;
      width: 65vw;
      min-width: 9em;
      height: 1.2em;
      margin: 1em auto;
      padding: 0.4em;
      border-radius: 0.6em;
      @include desktop-only {
        max-width: 23em;
      }
      @include inter-only {
        max-width: 23em;
    }
  }
  &__newArticleButton {
    @include button-secondary;
  
  }
  &__newArticleFileSelector {
    width: 8em;
    height: 2em;
  }
  &__cancelNewArticleButton,
  &__confirmNewArticleButton {
    @include button-secondary;
    margin: 0.2em 0.3em;
    width: 5em;
    height: 1.65em;
  }
  & .hasLikedButton {
    background-color: rgb(76, 212, 149);
  }
  & .hasDislikedButton {
    // background-color: rgb(230, 105, 105);
    background-color: lighten($color-primary, 5);
  }
  & .shareButton {
    background-color: $color-secondary;
    color: black;
    border: 0.1em solid black;
  }
  & .likeButton,
  & .dislikeButton,
  & .shareButton {
    width: 4em;
    height: 1.8em;
    border-radius: 3em;
    margin: 0.2em 0.3em;
    border: 0.1em black solid;
    cursor: pointer;
    & p {
      margin: 0 0.4em;
      padding-bottom: 0.2em;
      font-weight: bold;
      color: black;
      display: inline-block;
      pointer-events: none;
    }
  }
  & .deleteArticleButton,
  & .modifyArticleButton {
    @include button-secondary;
    // background-color: rgb(235, 235, 235);
    background-color: lighten($color-primary, 5);
    margin: 0.8em 0.4em;
    width: 8.4em;
    height: 1.5em;
  }

  & .article {
    min-width: 9em;
    padding: 0.5em;
    margin: 1em auto;
    background-color: rgb(235, 235, 235); 
    color: black;
    border-radius: 0.8em;
    position: relative;
    @include desktop-only {
      max-width: 28em;
    }
    @include inter-only {
      max-width: 28em;
    }
    & h3 {
      margin: 0 auto 0.1em auto;
      padding: 0 0.8em;
    }
    &__author {
      font-size: 0.8em;
      margin: 0.1em 0 0.2em 0;
    }
    & svg {
      height: 1.35em;
      fill:black;
      pointer-events: none;
    }
    &__photoContainer {
      @include full-width;
      margin-bottom: 0.5em;
    }
    &__photo {
      object-fit: cover;
      width: 72vw;
      height: 65vw;
      min-width: 9em;
      min-height: 10em;
      border-radius: 0.4em;
      @include desktop-only {
        max-width: 23em;
        max-height: 18em;
      }
      @include inter-only {
        max-width: 23em;
        max-height: 18em;
      }
    }
    &__description {
      padding: 0.5em;
      margin: 0.5em auto;
    }
    &__displayCommentsButton {
      @include button-secondary;
      width: 12em;
      max-width: 12em;
      height: 1.5em;
      font-size: 0.8em;
      margin-top: 0;
    }
    &__readCommentsSection {
      font-family: $font-primary;
      font-size: 0.9em;
      color: black;
      width: 65vw;
      min-width: 9em;
      max-width: 23em;
      background-color: white;
      border: 0.1em #333 solid;
      padding: 0.4em;
      margin: 0 auto;
      border-radius: 0.4em;
      display: none;
    }
    &__writeCommentSection {
      font-family: $font-primary;
      font-size: 1em;
      color: black;
      width: 66vw;
      min-width: 9em;
      // height: 2.5em;
      margin-top: 0.3em;
      padding: 0.4em;
      border-radius: 0.8em;
      @include desktop-only {
        max-width: 23em;
      }
      @include inter-only {
        max-width: 23em;
      }
      // & .smallCommentsButtons {
      //   font-size: 0.8em;
      //   font-weight: bold;
      //   font-family: $font-primary;
      //   width: auto;
      //   height: auto;
      //   color: black;
      //   background-color: $color-secondary;
      //   border: 0.1em solid black;
      //   border-radius: 0.7em;
      //   cursor: pointer;
      // }
    }
    &__modify {
      display: none;
    }
  }
}
</style>