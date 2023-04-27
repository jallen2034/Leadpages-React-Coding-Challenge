// submit this cb function to  send the message to the API
import {onMessage, saveLikedFormSubmission} from "../../service/mockServer";

/* This callback function is submitted to the mock server to handle saving the generated form submission.
 * We first add it to the array of pending callbacks in 'mockServer.js' by calling the 'onMessage' function.
 * Later, after the 'createMockFormSubmissionCB' function has been called and generates a random form submission, we then call
 * the 'saveLikedFormSubmission' callback function stored in our callbacks array to then send the generated form data to our server. */
onMessage(saveLikedFormSubmission);

export const submitForm = async (createMockFormSubmissionCB) => {
  if (!createMockFormSubmissionCB) {
    return;
  }
  try {
    await createMockFormSubmissionCB(); // call the createMockFormSubmission cb function
  } catch (error) {
    console.log("Error: ", error)
  }
}