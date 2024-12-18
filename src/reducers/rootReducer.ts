import { combineReducers } from "redux";
import accountReducer from "./accountSlice";
import customerReducer from "./customerSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
