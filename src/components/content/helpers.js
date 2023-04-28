import {fetchLikedFormSubmissions} from "../../service/mockServer";

export const fetchUpToDatePosts = async (
  setMostRecentSubmission,
  setPostUpdated,
  setOpen
) => {
  const data = await fetchLikedFormSubmissions(); // API call to get Form Submissions
  if (data.formSubmissions.length > 0) { // Safety check
    setMostRecentSubmission(
      data.formSubmissions[data.formSubmissions.length - 1]
    );
    setPostUpdated(false);
    setOpen(true);
  }
}