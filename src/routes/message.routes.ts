import { message, PrismaClient } from "@prisma/client";
import { Router } from "express";
import { handlerError } from "../utils/error.utils";
import messageService from "../controllers/message.service";

const router = Router()

router.post('/', (req,res) => {
    let message: message = {
        id: 0,
        name: req.body.name,
        companyName: req.body.companyName,
        phoneNumber: req.body.phoneNumber,
    }

    messageService.messageSection(message)
        .then(messages => res.send( { message: 'Your message has been sent!', messages}))
        .catch(err => res.status(500).send(handlerError(err)))

})

router.delete('/:id', (req,res) => {
    messageService.remmoveMessage(+req.params.id)
        .then(deletedMessage => res.send( { message: 'The message has been deleted!', deletedMessage}))
        .catch(err => res.status(500).send(handlerError(err)))
})

router.delete('/', (req, res) => {
    messageService.remmoveAllMessage()
        .then(deletedAll => res.send( { message: 'All deleted!', deletedAll}))
        .catch(err => res.status(500).send(handlerError(err)))  
})

router.get('/findByName/:name', (req,res) => {
    messageService.findByNameMessage(req.params.name)
        .then(findName => res.send( { message: 'The name found!', findName}))
        .catch(err => res.status(500).send(handlerError(err)))  
})


export default router