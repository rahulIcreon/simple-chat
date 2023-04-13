import { User } from "firebase/auth";
import produce from "immer";

interface UserState {
  loggedInUser: User | null;
}

export enum USER_ACTION_TYPE {
  SET_LOGGEDIN_USER = "SET_LOGGEDIN_USER",
}

export interface UserAction {
  type: USER_ACTION_TYPE;
  payload: User | null;
}

const initUserState: UserState = {
  loggedInUser: null,
};

export const UserAuthReducer = (state = initUserState, action: UserAction) => {
  switch (action.type) {
    case USER_ACTION_TYPE.SET_LOGGEDIN_USER:
      const apiLoggedInUser = action.payload as User | null;
      return produce(state, (draft) => {
        draft.loggedInUser = apiLoggedInUser;
      });
    default:
      return state;
  }
};
