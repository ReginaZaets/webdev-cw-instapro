import { USER_POSTS_PAGE, POSTS_PAGE, LOADING_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken, renderApp, setPosts } from "../index.js";
import { addLike, deleteLike, getPosts } from "../api.js";
import { formatDistanceToNow } from "date-fns";
import ru from "date-fns/locale/ru";

export function renderPostsPageComponent() {
  const appEl = document.getElementById("app");

  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const postHtml = posts
    .map((post, index) => {
      let likes;

      if (post.likes.length === 1) {
        likes = post.likes[0].name;
      } else if (post.likes.length > 1) {
        likes = `${post.likes[0].name} и еще ${post.likes.length - 1}`;
      } else {
        likes = 0;
      }

      return `
        <li class="post">
          <div class="post-header" data-user-id="${post.user.id}">
            <img src="${post.user.imageUrl}" class="post-header__user-image">
            <p class="post-header__user-name">${post.user.name}</p>
          </div>
          <div class="post-image-container">
            <img class="post-image" src="${post.imageUrl}">
          </div>
          <div class="post-likes">
            <button data-post-id="${post.id}" data-is-liked="${
        post.isLiked
      }" class="like-button ${
        post.isLiked ? "-active-like" : ""
      }" data-index="${index}"></button>
            <p class="post-likes-text">
              Нравится: <strong>${likes} </strong>
            </p>
          </div>
          <p class="post-text">
            <span class="user-name">${post.user.name} </span>
              : ${post.description}
          </p>
          <p class="post-date">
            ${(formatDistanceToNow(new Date(post.createdAt)), { locale: ru })}
          </p>
        </li>
    `;
    })
    .join("");

  const appHtml = `<div class="page-container">
  <div class="header-container"></div>
  <ul class="posts">
  ${postHtml}
  </ul>
  </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  

}


export function initEventListerner() {
  const likeButtonElements = document.querySelectorAll(".like-button");

  for (const likeButtonElement of likeButtonElements) {
    likeButtonElement.addEventListener("click", () => {
      if (likeButtonElement.dataset.isLiked === "true") {
        deleteLike({
          id: likeButtonElement.dataset.postId,
          token: getToken(),
        })
        .then(() => {
          getPosts()
          .then((res) => {
            setPosts(res);
            renderApp();
         }) 
        })
            
        
      } else {
        addLike({
          id: likeButtonElement.dataset.postId,
          token: getToken(),
        })
        .then(() => {
          getPosts()
          .then((res) => {
            setPosts(res);
            renderApp();
         }) 
        })    
       
  }})
    
};
}
