import { message, PrismaClient } from "@prisma/client";
import { Router } from "express";
import { handlerError } from "../utils/error.utils";
import messageService from "../controllers/message.service";
import TelegramBot from "node-telegram-bot-api"

const bot = new TelegramBot(process.env.TOKEN!)

const router = Router()

router.post('/', (req,res) => {
    let message: message = {
        id: 0,
        name: req.body.name,
        companyName: req.body.companyName,
        phoneNumber: req.body.phoneNumber,
    }
   
    bot.sendMessage(process.env.ADMIN!,
        "🔔Yangi Mijoz: \n" + 
        '\n👤 F.I.O:  '+ message.name + "\n" + 
        '🏢 Kompaniya:  '+ message.companyName+'\n'+ 
        '☎️ Telefon:  '+ message.phoneNumber)
    
    bot.sendMessage(process.env.ADMIN_2!,
        "🔔Yangi Mijoz: \n" + 
        '\n👤 F.I.O:  '+ message.name + "\n" + 
        '🏢 Kompaniya:  '+ message.companyName+'\n'+ 
        '☎️ Telefon:  '+ message.phoneNumber)
            
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
