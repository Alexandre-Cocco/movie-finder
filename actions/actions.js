export const ADD_USER = 'ADD_USER'

export function addUser(id, email, accessRight, token) {
  return { type: ADD_USER, id: id, email: email, accessRight: accessRight, token: token }
}

export const ADD_MOVIE = 'ADD_MOVIE'

export function addMovie(id, title, picture, releaseDate) {
  return { type: ADD_MOVIE, id: id, title: title, picture: picture, releaseDate: releaseDate }
}