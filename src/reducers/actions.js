const initialState = [];

export default function taskAction(state = initialState, action) {
  let newState = [...state];
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action];
    case "EDIT_TASK":
      newState[action.id].name = action.name;
      newState.forEach(item => (item.menuOpen = false));
      return newState;
    case "DELETE_TASK":
      const newArray = newState.filter(item => item.id != action.id);
      newArray.forEach((item, key) => (item.id = key));
      return newArray;
    case "CHANGESTATE_TASK":
      newState[action.id].done = !newState[action.id].done;
      return newState;
    case "TOGGLE_MENU":
      newState[action.id].menuOpen = !newState[action.id].menuOpen;
      return newState;
    default:
      return state;
  }
}
