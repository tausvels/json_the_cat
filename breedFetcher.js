console.clear();
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const request = require("request");

const query = {};
const fetchCat = function(endpoint, callback) {
  request(endpoint, (error, response, body) => {
    if (error) {
      console.log('error:', error);
    } // Print the error if one occurred}
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body); // Print the HTML for the Google homepage.
    callback(body);
  });
};
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
rl.question("Enter breed name ", answer => {
  let userInput = modifyInputParam(answer);
  query["Breed"] = userInput;
  let endpoint = `https://api.thecatapi.com/v1/images/search?breed_ids=${query["Breed"]}`;
  rl.close();
  fetchCat(endpoint, catData => {
    //console.log(catData.length)
    const result = JSON.parse(catData);
    if (result.length === 0) {
      console.log("Data not found!!");
    } else {
      let cat = (result.pop()); //console.log(cat);
      //let name = cat.breeds[0].name;
      let description = cat.breeds[0].description;
      console.log(description);
    }
  });
});
