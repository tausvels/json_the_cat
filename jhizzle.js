const request = require("request");

const fetchBreedDescription = function(breedName, callback) {
  let endpoint = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedName}`;
  request(endpoint, (error, response, body) => {
    if (error) {
      callback(error);
    } else {
      const leng = (JSON.parse(body)).length;
      let noResults = false;
      if(leng === 0){
        noResults = true
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
    console.log('Error fetch details:', error);
  } else {
    console.log(desc);
  }
}
const breedName = process.argv[2];
fetchBreedDescription(breedName, callbackForFetchFunction);