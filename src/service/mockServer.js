// NOTE: Do not modify this file
import Chance from 'chance';

const chance = new Chance();
const callbacks = [];
function randomPercent() {
  return Math.floor(Math.random() * 100);
}

/**
 * When we get a message from the "server", the callback is executed
 * with the form data.
 *
 * @params {function} callback - The function called with form data.
 */
export function onMessage(callback) {
  callbacks.push(callback);
}

/**
 * Fetch all of the liked form submissions from the "server".
 *
 * @return {Promise} on success, resolve with list of form
 * submissions. We have a flaky server and requests will fail 10
 * percent of the time.
 */
export async function fetchLikedFormSubmissions(setLoading) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // We have a really flaky server that has issues
      if (randomPercent() < 10) {
        reject({ status: 500, message: 'server error' });
        return;
      }

      try {
        resolve({
          status: 200,
          formSubmissions:
            JSON.parse(localStorage.getItem('formSubmissions')) || [],
        });
        setLoading(false);
      } catch (e) {
        reject({ status: 500, message: e.message });
      }
    }, 3000 * (randomPercent() / 100));
  });
}

/**
 * Saves a liked form submission to the server.
 *
 * @params {FormSubmission} formSubmission
 *
 * @return {Promise} resolves or rejects with a simple message.
 * We have a flaky server and requests will fail 10
 * percent of the time.
 */
export async function saveLikedFormSubmission(formSubmission, setPostUpdated, setLoading) {
  return new Promise((resolve, reject) => {
    setTimeout(() => { // This set timeout is kinda messing with my loading spinner logic a bit
      // We have a really flakey server that has issues
      if (randomPercent() < 10) {
        reject({ status: 500, message: 'server error' });
        return;
      }

      try {
        const submissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
        const updatedSubmissions = [...submissions, formSubmission];

        localStorage.setItem(
          'formSubmissions',
          JSON.stringify(updatedSubmissions),
        );
        resolve({ status: 202, message: 'Success!' });
        setPostUpdated(true);
      } catch (e) {
        setLoading(false);
        setPostUpdated(false);
        reject({ status: 500, message: e.message });
      }
    }, 3000 * (randomPercent() / 100));
  });
}

/**
 * Creates a mock server response
 */
export async function createMockFormSubmission(setOpenError, setPostUpdated, setLoading) {
  const formSubmission = {
    id: chance.guid(),
    data: {
      email: chance.email(),
      firstName: chance.first(),
      lastName: chance.last(),
      liked: false, // Do I need this?
    },
  };

  /* Iterate over all registered callbacks and execute them with the formSubmission object.
   * I know oyu said we couldn't edit this file but this is the only way I could think of how to gracefully check
   * if any of the callbacks throw an error and then handle it in the UI properly */
  for (const cb of callbacks) {
    try {
      await cb(formSubmission, setPostUpdated, setLoading);
    } catch (error) {
      throw error;
    }
  }
}
