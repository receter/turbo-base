import { call, put, takeLatest } from "redux-saga/effects";
import { ratingRequest, ratingSuccess } from "./slice";

// Starts fakeFetchRating on each dispatched ratingRequest
function* saga() {
  yield takeLatest(ratingRequest.type, fakeFetchRating);
}

// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* fakeFetchRating() {
  // wait for 1 second
  yield call(() => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  });

  const rating = Math.floor(Math.random() * 10) + 1;

  yield put(ratingSuccess(rating));
}

export default saga;
