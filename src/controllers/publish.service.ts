import { publish, PrismaClient } from "@prisma/client";

const client = new PrismaClient()

async function publishMessage(publish:publish): Promise<publish>  {
    return client.publish.create({
        data: {
            image: publish.image,
            title: publish.title,
            sub_title: publish.sub_title,
            message: publish.message
        }
    })
}


async function GetAllPublished(): Promise<publish[]> {
    return client.publish.findMany()
}

async function UpdatePublishedById(incomingId: number, publish: publish): Promise<publish> {
    return client.publish.update({
        data: {
            image: publish.image,
            title: publish.title,
            sub_title: publish.sub_title,
            message: publish.message
        },
        where: {
            id: incomingId
        }
    })
}

async function DeletePublishMessage(id: number): Promise<publish> {
    return client.publish.delete({
        where: {id: id}
    })
}

export default {
    publishMessage,
    DeletePublishMessage,
    GetAllPublished,
    UpdatePublishedById
}