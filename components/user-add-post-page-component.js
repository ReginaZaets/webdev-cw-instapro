import { posts } from "../index.js";
import { renderHeaderComponent } from "./header-component.js";

export function renderUserPost() {
    const appEl = document.getElementById("app");
    const postHtml = posts.map((post) => {
        return `
        <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                  <li class="post">
                    <div class="post-header" data-user-id="${post.id}">
                        <img src="${post.imageUrl}" class="post-header__user-image">
                        <p class="post-header__user-name">${post.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="642d00579b190443860c2f32" class="like-button">
                        <img src="./assets/images/like-active.svg">
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>2</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post.name}</span>
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
}