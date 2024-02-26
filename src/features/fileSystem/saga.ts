import { call, put, takeLatest } from "redux-saga/effects";
import { error, initialize, ready } from "./slice";

// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* sayHello() {
  try {
    // wait for 1 second
    yield call(() => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    });
    console.log("Hello!");
    yield put(ready());
  } catch (e) {
    yield put(error());
  }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
function* saga() {
  yield takeLatest(initialize.type, sayHello);
}

export default saga;
