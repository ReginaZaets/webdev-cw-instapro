import { posts } from "../index.js";
import { renderHeaderComponent } from "./header-component.js";

const appEl = document.getElementById("app");

export function renderUserPost() {
    const postHtml = posts.map((post, index) => {
        return `
        <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                  <li class="post">
                    <div class="post-header" data-user-id="${post.user.id}">
                        <img src="${post.user.imageUrl}" class="post-header__user-image">
                        <p class="post-header__user-name">${post.user.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${post.id}" data-is-liked="${post.isLiked}" class="like-button ${post.isLiked ? "-active-like" : ''}" data-index="${index}"></button>
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>${post.user.name}</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${user.name}</span>
                      ${post.description}
                    </p>
                    <p class="post-date">
                      ${post.cratedAt}
                    </p>
                  </li>
                </ul>
        </div>`
    }).join('');

    appEl.innerHTML = postHtml;

    renderHeaderComponent({
        element: document.querySelector(".header-container"),
      });

// initEventListerner(posts[0].user.id);
  
}