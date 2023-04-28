import {fetchLikedFormSubmissions} from "../../service/mockServer";

export const fetchUpToDatePosts = async (
  setMostRecentSubmission,
  setPostUpdated,
  setOpen
) => {
  const updatedFormSubmissions = await fetchLikedFormSubmissions(); // API call to get Form Submissions
  if (updatedFormSubmissions.formSubmissions.length > 0) { // Safety check
    setMostRecentSubmission(updatedFormSubmissions.formSubmissions[updatedFormSubmissions.length - 1]);
    setPostUpdated(false);
    setOpen(true);
  }
}