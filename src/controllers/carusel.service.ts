import { PrismaClient, carusel } from "@prisma/client";

const client = new PrismaClient()

async function CreateCarusel(carusel: carusel): Promise<carusel> {
    return client.carusel.create({
        data: {
            image: carusel.image,
            name: carusel.name,
            teamPosition: carusel.teamPosition
        }
    })
}

async function GetAllCreatedCarusels(): Promise<carusel[]> {
    return client.carusel.findMany()
}

async function UpdateCreatedCarusels(incomingId: number, carusel: carusel): Promise<carusel> {
    return client.carusel.update({
        data: {
            image: carusel.image,
            name: carusel.name,
            teamPosition: carusel.teamPosition
        },
        where: {
            id: incomingId
        }
    })
}

async function DeleteCreatedCarusel(incomingId: number): Promise<carusel> {
    return client.carusel.delete({
        where: {
            id: incomingId
        }
    })
}

export default {
    CreateCarusel,
    GetAllCreatedCarusels,
    UpdateCreatedCarusels,
    DeleteCreatedCarusel
}