const getErrorMessage = (error) => {
  const msg =
    (error.message && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();
  return msg;
};
export default getErrorMessage;
