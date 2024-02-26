import { call, put, takeLatest } from "redux-saga/effects";
import slice from "./slice";

// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* clearUserAfter1s() {
  // wait for 1 second
  yield call(() => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  });
  console.log("Hello!");
  yield put(slice.actions.clearUser());
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
function* saga() {
  yield takeLatest(slice.actions.setUser.type, clearUserAfter1s);
}

export default saga;
