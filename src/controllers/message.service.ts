import { message, PrismaClient } from "@prisma/client";

const client = new PrismaClient()

async function messageSection(message: message): Promise<message> {
    return client.message.create({
        data: {
            name: message.name,
            companyName: message.companyName,
            phoneNumber: message.phoneNumber
        }
    })
}

async function remmoveMessage(incomingId: number): Promise<message> {
    return client.message.delete({
        where: { id: incomingId }
    })
}

async function remmoveAllMessage() {
    return client.message.deleteMany()
}


async function findByNameMessage (searchMessage: string): Promise<message[]> {
    return client.message.findMany({
        where: {
            name: {
                contains: searchMessage
            }
        }
    })
}


async function findByNumber (searchMessage: string): Promise<message[]> {
    return client.message.findMany({
        where: {
            phoneNumber: {
                contains: searchMessage
            }
        }
    })
}

export default {
    messageSection,
    remmoveMessage,
    remmoveAllMessage,
    findByNameMessage,
    findByNumber
}