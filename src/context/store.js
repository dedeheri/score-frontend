import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import combine from "./reducers";

const store = createStore(combine, compose(applyMiddleware(thunk)));

export default store;
