import { faker } from '@faker-js/faker';

// Common Testing Data
export const createConsumer = {
    email: faker.internet.email(),
    balance: faker.datatype.number(),
}


// E2E Testing Data


/// Unit Testing Data
export const createConsumerResponse = {
    ...createConsumer,
    id: faker.datatype.uuid()
}

export const listOfConsumer = [{ ...createConsumerResponse }]

export const findId = faker.datatype.uuid();
export const findOneResponse = { ...createConsumerResponse }

export const updateData = {
    id: findId,
    email: faker.internet.email(),
}

export const updateResponse = {
    ...updateData,
    id: findId,
    balance: faker.datatype.number(),
}

export const deleteResponse = {
    ...updateResponse
}