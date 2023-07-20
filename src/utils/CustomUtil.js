function isValidAxiosResponse(response) {
  if(response.data == null)
    return false;
  if(response.data.length === 0)
    return false;
  if(!response.data)
    return false;
  return true;
}

function getMaxValueOfKeyInArrayObect(array, key) {
  if (array.length == 0)
    return 0;
    
  const maxId = array.reduce((max, obj) => {
    return Math.max(max, obj[key]);
  }, -Infinity);

  return maxId;
}

export { isValidAxiosResponse, getMaxValueOfKeyInArrayObect };