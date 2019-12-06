const { fetchBreedDescription } = require("./breedFetcher");
const breedName = process.argv[2];
//const breedName = "sibe";

const callbackForFetchFunction = (error, desc) => {
  if (error) {
    //console.log('Error fetch details:', error);
    return error
  } else {
    //console.log(desc);
    return desc
  }
};

fetchBreedDescription(breedName, (error, desc)=>{
    if(error){
        console.log('error', error)
    }else{
        let a = "The Siberians dog like temperament and affection makes the ideal lap cat and will live quite happily indoors. Very agile and powerful, the Siberian cat can easily leap and reach high places, including the tops of refrigerators and even doors. ";
        //console.log(desc)
        let b = desc;
        console.log(a === b)
        console.log(a + 'x')
        console.log(b + 'x')
    }
});