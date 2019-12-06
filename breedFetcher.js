const request = require("request");


const fetchBreedDescription = function(breedName, callback) {
  const modifyInputParam = function(str) {
    let arr = str.split("");
    if (arr.length < 4) {
      return str;
    } else {
      let temp = [];
      for (let i = 0; i < 4; i++) {
        temp.push(arr[i]);
      }
      return temp.join("");
    }
  };
  if(breedName === null){return}
  breedNameInput = modifyInputParam(breedName);

  let endpoint = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedNameInput}`;
  request(endpoint, (error, response, body) => {
    if (error) {
      callback(error);
    } else {
      const leng = (JSON.parse(body)).length;
      let noResults = false;
      if(leng === 0){
        noResults = true;   // Returns an empty array and hence returns true.
      }  
      if (noResults) {
        callback("Data not Found!!")
      } else {
        const catObj = (JSON.parse(body))[0];
        const desc = catObj.breeds[0].description    // TODO: replace with something from response (or from body)
        callback(null, desc);
      }
    }
  });
}

const callbackForFetchFunction = (error, desc) => {
  if (error) {
    //console.log('Error fetch details:', error);
    return error;
  } else {
    //console.log(desc);
    return error
  }
}
//fetchBreedDescription(breedName, callbackForFetchFunction);
module.exports = {fetchBreedDescription};