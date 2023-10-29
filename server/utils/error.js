//4- Error best practice => regarder dans get all dans routes/hotels.js
export const createError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;
  return err;
};

export const uploadErrors = (err) => {
  let errors = { format: '', maxSize: ""};

  if (err.message.includes('invalid file'))
    errors.format = "Format incompatabile";

  if (err.message.includes('max size'))
    errors.maxSize = "Le fichier dépasse 500ko";

  return errors
}