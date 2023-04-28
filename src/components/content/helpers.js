import {fetchLikedFormSubmissions} from "../../service/mockServer";

export const fetchUpToDatePosts = async (
  setMostRecentSubmission,
  setPostUpdated,
  setOpen,
  setOpenError,
  setLoading
) => {
  try {
    const data = await fetchLikedFormSubmissions(setLoading); // API call to get Form Submissions
    if (data.formSubmissions.length > 0) { // Safety check
      setMostRecentSubmission(
        data.formSubmissions[data.formSubmissions.length - 1]
      );
      setPostUpdated(false);
      setOpen(true);
    }
  } catch (error) {
    setOpenError(true);
    setLoading(false);
    setPostUpdated(false);
    console.log(error); // Handle error when API cannot be hit
  }
}