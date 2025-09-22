import { PlanetDetails } from "./pages/PlanetDetails";

// stor
export const initialStore = () => {
  return {
    message: null,
    contacts: [],
    favorites: [],
    characters: [],
    characterDetail: {},
    planets: [],
    planetDetail: {},
    starships: [],
    starshipDetail: {},

    todos: [],
    users: [],
    currentUser: {},
    favorites: ['favorito 1', 'otro favorito', 'uno mas'],
    token: '',
    isLogged: false
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case 'isLogged':
      return { ...store, isLogged: action.payload}
    case 'token':
      return { ...store, token: action.payload}
    
      case 'currentUser':
      return { ...store, currentUser: action.payload }

    case 'users':
      return { ...store, users: action.payload}
      
    case 'getTodos':
      return { ...store, todos: action.payload }

     case 'add_task':
      const { id,  color } = action.payload
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      }; 

    case "getContacts":
      const contacts = action.payload;
      return { ...store, contacts: contacts };

    case "postContact":
      return { ...store, contacts: [...store.contacts, action.payload] };

    case "deleteContacts":
      const remainingContacts = store.contacts.filter(
        (contact) => contact.id !== action.payload.id
      );
      return { ...store, contacts: remainingContacts };

    case "putContact":
      const editedContacts = store.contacts.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );

      return { ...store, contacts: editedContacts };

    case "characters":
      const character = action.payload;
      return { ...store, characters: character };

    case "planets":
      const planet = action.payload;
      return { ...store, planets: planet };

    case "starships":
      const starship = action.payload;
      return { ...store, starships: starship };

    case "planetDetail":
      const planetDetail = action.payload;
      return { ...store, planetDetail: planetDetail };

    case "characterDetail":
      const characterDetail = action.payload;
      return { ...store, characterDetail: characterDetail };

    case "starshipDetail":
      const starshipDetail = action.payload;
      return { ...store, starshipDetail: starshipDetail };

    case "favorite":
      return {
        ...store,
        favorites: store.favorites.find(
          (item) => item.name === action.payload.name && item.uid === action.payload.uid
        )
          ? store.favorites.filter((fav) => fav.name && fav.uid !== action.payload.uid)
          : [...store.favorites, { ...action.payload }],
      };

    default:
      throw Error("Unknown action.");
  }
}

// case "getCharacters":
//   const characters = action.payload
//   return {...store, characters: characters};
// case "getStarships":
//   const starships = action.payload
//   return {...store, starships: starships};

// case 'addFavorite':
// return { ...store, favorites: [...store.favorites, action.payload] };
