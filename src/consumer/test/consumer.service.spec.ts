import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Model } from "mongoose";
import { ConsumerService } from "../consumer.service";
import { Consumer } from "../entities/consumer.entity";

import { createConsumer, createConsumerResponse, deleteResponse, findId, findOneResponse, listOfConsumer, updateData, updateResponse } from './consumer-test-data';


describe('Consumer Service', () => {
    let service: ConsumerService;
    let model: Model<Consumer>;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: getModelToken(Consumer.name),
                    useValue: {
                        find: jest.fn(),
                        findById: jest.fn(),
                        create: jest.fn(),
                        findOneAndUpdate: jest.fn(),
                        findOneAndDelete: jest.fn(),
                        exec: jest.fn(),
                    },
                },
                ConsumerService
            ]
        })
            .compile();

        service = module.get<ConsumerService>(ConsumerService)
        model = module.get<Model<Consumer>>(getModelToken(Consumer.name));
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('create', () => {
        it('should create a new consumer', async () => {
            jest.spyOn(model, 'create').mockImplementationOnce(() =>
                Promise.resolve({
                    ...createConsumerResponse
                }),
            );
            const res = await service.create({
                ...createConsumer
            });

            expect(res).toBeDefined()
            expect(res).toEqual(createConsumerResponse)
            expect(createConsumer.email).toEqual(res.email)
            expect(res.id).toEqual(createConsumerResponse.id)
        })
    })

    describe('findAll', () => {
        it('should return list of consumer', async () => {
            jest.spyOn(model, 'find').mockReturnValue({
                exec: jest.fn().mockResolvedValueOnce(listOfConsumer)
            } as any)

            const res = await service.findAll();
            expect(res).toBeDefined();
            expect(res).toEqual(listOfConsumer)
        })
    })

    describe('findOne', () => {
        it('should return one consumer', async () => {
            jest.spyOn(model, 'findById').mockReturnValue({
                exec: jest.fn().mockResolvedValueOnce(findOneResponse),
            } as any);

            const res = await service.findOne(findId);
            expect(res).toBeDefined();
            expect(res).toEqual(findOneResponse)
        })
    })

    describe('update', () => {
        it('should update single user', async () => {
            jest.spyOn(model, 'findOneAndUpdate').mockReturnValue({
                ...updateResponse
            } as any);
            const res = await service.update(findId, updateData);
            expect(res).toBeDefined();
            expect(res.email).toEqual(updateResponse.email)
            expect(res.id).toEqual(updateResponse.id)
        })
    })

    describe('remove', () => {
        it('should remove one consumer', async () => {
            jest.spyOn(model, 'findOneAndDelete').mockReturnValue({
                ...deleteResponse
            } as any)

            const res = await service.remove(findId);
            expect(res).toBeDefined();
            expect(res).toEqual(deleteResponse)
        })
    })

})