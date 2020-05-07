import { ADD_USER } from '../actions/actions'
import { ADD_MOVIE } from '../actions/actions'

const initialState = {
  user: {},
  results: []
}

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_USER:
      return {
          /*
        user: [
          ...state.notes,
          {
            title: action.title,
            content: action.content
          }
        ]
        */
       user: {
          id: action.id,
          email: action.email,
          accessRight: action.accessRight,
          token: action.token
        }
      }
      case ADD_MOVIE:
        return {
          results: {
            id: action.id,
            title: action.title,
            picture: action.picture,
            releaseDate: action.releaseDate
          }
        }
    default:
      return state
  }
}

export default rootReducer