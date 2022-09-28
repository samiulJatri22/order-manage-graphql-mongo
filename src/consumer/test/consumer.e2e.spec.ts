import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../app.module";
import request = require("supertest");

import { createConsumer, updateData } from './consumer-test-data';

describe("Consumer e2e", () => {
    const url = "/graphql";
    let app: INestApplication;
    let http;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        http = app.getHttpServer()
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    let id: string;

    describe('Create Consumer', () => {
        it('here we test creating user', () => {
            return request(http)
                .post(url)
                .send({
                    query: `mutation CreateConsumer($createConsumerInput: CreateConsumerInput!) {
                        createConsumer(createConsumerInput: $createConsumerInput) {
                          balance
                          email
                          id
                        }
                      }`,
                    variables: `${JSON.stringify({
                        createConsumerInput: {
                            ...createConsumer
                        }
                    })}`
                })
                .expect(200)
                .expect((res) => {
                    const createData = res.body.data.createConsumer;
                    expect(createData).toBeDefined();
                    expect(createData.id).toBeDefined();
                    expect(createData.email).toEqual(createConsumer.email)

                    id = createData.id;
                })
        })
    })

    describe('Get Consumers', () => {
        it("here we get list of users", () => {
            return request(http)
                .post(url)
                .send({
                    query: `query Consumers {
                        consumers {
                          id
                          email
                          balance
                        }
                      }`,
                    variables: `${JSON.stringify({})}`
                })
                .expect(200)
                .expect((res) => {
                    const data = res.body.data.consumers;
                    expect(data).toBeDefined()
                })
        })
    })

    describe('Get Consumer', () => {
        it('here we get specific user', () => {
            return request(http)
                .post(url)
                .send({
                    query: `query Consumer($consumerId: String!) {
                            consumer(id: $consumerId) {
                              id
                              email
                              balance
                            }
                          }`,
                    variables: `${JSON.stringify({
                        consumerId: id,
                    })}`
                })
                .expect(200)
                .expect((res) => {
                    expect(res.body.data.consumer.id).toEqual(id);
                })
        })
    })

    describe('Update Consumer', () => {
        it('here we update single user', () => {
            return request(http)
                .post(url)
                .send({
                    query: `
                    mutation UpdateConsumer($updateConsumerInput: UpdateConsumerInput!) {
                        updateConsumer(updateConsumerInput: $updateConsumerInput) {
                          id
                          email
                          balance
                        }
                      }`,
                    variables: `${JSON.stringify({
                        updateConsumerInput: {
                            ...updateData,
                            id: id,
                        }
                    })}`
                })
                .expect(200)
                .expect((res) => {
                    expect(res.body.data.updateConsumer).toBeDefined()
                })
        })
    })

    describe('Delete Consumer', () => {
        it('here we delete single user', () => {
            return request(http)
                .post(url)
                .send({
                    query: `
                    mutation RemoveConsumer($removeConsumerId: String!) {
                        removeConsumer(id: $removeConsumerId) {
                          id
                        }
                      }
                    `,
                    variables: `${JSON.stringify({
                        removeConsumerId: id
                    })}`,
                })
                .expect(200)
        })
    })

})