/*
import { ADD_USER, LOGIN_USER, SAVE_BOOK, REMOVE_BOOK } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/react-hooks';



// route to get logged in user's info (needs the token)
export const getMe = () => {
  
  const [queryMe, { queryMeError }] = useQuery(QUERY_ME); 
  return queryMe();
};

export const createUser = (userData) => {
  
  const [addUser, { addError }] = useMutation(ADD_USER);
  return addUser({
    variables: { ...userData }
  });
};

export const loginUser = (userData) => {
  
  const [login, { loginError }] = useMutation(LOGIN_USER);
  return login({
    variables: { ...userData }
  });
};

// save book data for a logged in user
export const saveBook = (bookData) => {
  
const [addBook, { addBookError }] = useMutation(SAVE_BOOK);
  return addBook({
    variables: { ...bookData }
  });
};

// remove saved book data for a logged in user
export const deleteBook = (bookId) => {
  
const [removeBook, { removeBookError }] = useMutation(REMOVE_BOOK);
  return removeBook({
    variables: { ...bookId }
  });
};
*/
// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
