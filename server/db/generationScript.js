const { generateProducts, generateQuestions, generateAnswers, generatePhotos } = require('./generate_data');
const { client } = require('./clientGeneration');

// Write a script here to asynchronusly (or not) generate each CSV file
const generateOneMillionRecords = () => {
    console.time("Product Generation")
    generateProducts(() => {
        console.timeEnd("Product Generation");
        console.time("Question Generation");
        generateQuestions(() => {
            console.timeEnd("Question Generation");
            console.time("Answer Generation");
            generateAnswers(() => {
                console.timeEnd("Answer Generation");
                console.time("Photo Generation");
                generatePhotos(() => {
                    console.timeEnd("Photo Generation");
                });
            });
        });
    });
}
 
// Write a script here to asynchronusly seed each CSV to the database
const insertOneMillionRecords = () => {
    
    
}

const insertTenMillionRecords = () => {

}

generateOneMillionRecords();