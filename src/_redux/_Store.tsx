import { combineReducers, legacy_createStore as createStore } from "redux";
import { UserAuthReducer } from "./UserAuthReducer";

export type StoreState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  userAuth: UserAuthReducer,
});
const store = createStore(rootReducer);
export default store;
