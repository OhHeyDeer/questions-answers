const faker = require('faker');


// Create Photos
const createPhoto = (answerId) => {
    const url = faker.image.imageUrl(800, 600, 'business', true);
    const answer_id = answerId;

    return `${url},${answer_id}`
}


// Create Answers
const createAnswer = (questionId) => {
    const body = faker.lorem.paragraph();
    const date = faker.date.between('2019-01-01', '2020-09-11');

    const first = faker.name.firstName;
    const last = faker.name.lastName;
    const name = `${first} ${last}`;

    const helpfulness = faker.random.number(20);
    const question_id = questionId;
    
    return `${body}, ${date}, ${name}, ${helpfulness}, ${question_id}`;
}


// Create Questions -- Create 10-20 per product
const createQuestion = (productId) => {
    const body = faker.lorem.paragraph(5);
    const date = faker.date.between('2019-01-01', '2020-09-11');
    const first = faker.name.firstName;
    const last = faker.name.lastName;
    const asker_name = `${first} ${last}`;
    const helpfulness = faker.random.number(20);
    const reported = faker.random.number(1); // Could generate only reported questions
    const email = faker.internet.exampleEmail(first, last);
    const product_id = productId;

    return `${body},${date},${asker_name},${helpfulness},${reported},${email},${product_id}`
}

// Create Products -- create 100,000
const createProduct = () => {
    const name = faker.hacker.noun();


    return `${name}`
}

module.exports = {
    createPhoto,
    createAnswer,
    createQuestion,
    createProduct
}
