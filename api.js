// Замени на свой, чтобы получить независимый от других набор данных.
// "боевая" версия инстапро лежит в ключе prod
const personalKey = "regina-zaets";
const baseHost = "https://wedev-api.sky.pro";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

export function getPosts({ token }) {
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

// https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md#%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F
export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    if (response.status === 400) {
      alert("Картинка слишком большая");
    }
    return response.json();
  });
}

//новый пост

export function postNewPosts({ description, imageUrl, token }) {
  return fetch(postsHost, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      description,
      imageUrl,
    })
  })
    .then((response) => {
      if (response.status === 500) {
        throw new Error("ошибка сервера");
      }
      if (response.status === 401) {
        throw new Error("не авторизован");
      }
      if (response.status === 400) {
        throw new Error("не введено описание картинки");
      }
      return response.json();
    })
}

//посты пользователя

// export function userPost({ id }) {
//   return fetch(postsHost + `/user-posts/${id}`, {
//     method: "GET",
//     headers: {
//       Authorization: token,
//       id: userId,
//     },
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data.posts)
//       return data.posts.map((post) => {
//         return {
//           id: post.id,
//           imageUrl: post.imageUrl,
//           date: post.createdAt,
//           description: post.description,
//           login: post.user.login,
//           isLiked: false,
//           userId: post.user.id,
//           imageAvatar: post.user.imageUrl,
//           name: post.user.name,
//           createdAt: 34,
//         }
//       });
//     });
// }

export function userPost({ token, id }) {
  return fetch(postsHost + `/user-posts/${id}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      return response.json();
    })
}

export function addLike({ id, token }) {
  console.log(id);
  return fetch(postsHost + `/${id}/like`,
    {
      method: "POST",
      headers: {
        Authorization: token,
      },
    });
}


export function deleteLike({ id, token }) {
  return fetch(postsHost + `/${id}/dislike`,
    {
      method: "POST",
      headers: {
        Authorization: token,
      },
    });
}