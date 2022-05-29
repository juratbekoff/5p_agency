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

export default {
    publishMessage
}