import {Cookies} from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name, value, options) => {
 	return cookies.set(name, value, {...options}); 
}

export const getCookie = (name) => {
  let result = cookies.get(name);
  if (!result)
    result = localStorage.getItem(name);

  return result; 
}

export const removeCookie = (name) => {
  cookies.remove(name);
}