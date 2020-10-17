const { createPhoto, createAnswer, createQuestion, createProduct } = require('./fake_data');
const fs = require('fs');

// const writeStream = fs.createWriteStream('./data/productData.csv');
// The scripts to generate CSV files for each table

// Products Generation -- 100,000 Records
const generateProducts = () => {
    const writeProductStream = fs.createWriteStream('./data/productData.csv');
    let i = 100000;
    const write = () => {
        let status = true;
        while (i > 0 && status) {
            const newProduct = createProduct();
            if (i === 0) {
                writeProductStream.write(newProduct, 'utf-8');
                writeProductStream.end();
            } else {
                status = writeProductStream.write(newProduct, 'utf-8');
            }
            i--; // Could need to be first
        }
        if (i > 0) {
            writeProductStream.once('drain', write);
        }
    }
    write();
};

// Questions Generation -- 1,000,000 Records
const generateQuestions = () => {
    const writeQuestionStream = fs.createWriteStream('./data/questionData.csv');
    let i = 1000000;
    const write = () => {
        let status = true;
        let currentProduct = 1;
        let questionsPerProductTotal = Math.random() * Math.floor(20);
        let qPerPCount = 0;
        while (i > 0 && status) {
            if (qPerPCount === questionsPerProductTotal) {
                if (currentProduct === 100000 || currentProduct === 99999) {
                    currentProduct = 1;
                } else {
                    currentProduct++;
                }
                questionsPerProductTotal = Math.random() * Math.floor(20);
                qPerPCount = 0;
            } else {
                qPerPCount++;
            }
            const newQuestion = createQuestion(currentProduct);
            if (i === 0) {
                writeQuestionStream.write(newQuestion, 'utf-8');
                writeQuestionStream.end();
            } else {
                status = writeQuestionStream.write(newQuestion, 'utf-8');
            }
            i--; // Could need to be first
        }
        if (i > 0) {
            writeQuestionStream.once('drain', write);
        }
    }
    write();
};

// Answers Generation -- 1,000,000 Records
const generateAnswers = () => {
    const writeAnswersStream = fs.createWriteStream('./data/answersData.csv');
    let i = 1000000;
    const write = () => {
        let status = true;
        let currentQuestion = 1;
        let answersPerQuestionsTotal = Math.random() * Math.floor(20);
        let aPerQCount = 0;
        while (i > 0 && status) {
            if (aPerQCount === answersPerQuestionsTotal) {
                // In the event that there are multiple questions that get 0 answers, handle the max being hit
                if (currentQuestion === 1000000 || currentQuestion === 999999) {
                    currentQuestion = 1;
                } else {
                    currentQuestion++;
                }
                answersPerQuestionsTotal = Math.random() * Math.floor(20);
                aPerQCount = 0;
            } else {
                aPerQCount++;
            }
            const newAnswer = createAnswer(currentQuestion);
            if (i === 0) {
                writeAnswersStream.write(newAnswer, 'utf-8');
                writeAnswersStream.end();
            } else {
                status = writeAnswersStream.write(newAnswer, 'utf-8');
            }
            i--; // Could need to be first
        }
        if (i > 0) {
            writeAnswersStream.once('drain', write);
        }
    }
    write();
};

// Photos Generation -- 1,000,000
const generatePhotos = () => {
    const writePhotosStream = fs.createWriteStream('./data/photosData.csv');
    let i = 1000000;
    const write = () => {
        let status = true;
        let currentAnswer = 1;
        let photosPerAnswerTotal = Math.random() * Math.floor(20);
        let pPerACount = 0;
        while (i > 0 && status) {
            if (pPerACount === photosPerAnswerTotal) {
                // In the event that there are multiple answers that get 0 photos, handle the max being hit
                if (currentAnswer === 1000000 || currentAnswer === 999999) {
                    currentAnswer = 1;
                } else {
                    currentAnswer++;
                }
                photosPerAnswerTotal = Math.random() * Math.floor(20);
                pPerACount = 0;
            } else {
                pPerACount++;
            }
            const newPhoto = createPhoto(currentAnswer);
            if (i === 0) {
                writePhotosStream.write(newPhoto, 'utf-8');
                writePhotosStream.end();
            } else {
                status = writePhotosStream.write(newPhoto, 'utf-8');
            }
            i--; // Could need to be first
        }
        if (i > 0) {
            writePhotosStream.once('drain', write);
        }
    }
    write();
};

module.exports = {
    generateProducts,
    generateQuestions,
    generateAnswers,
    generatePhotos
}