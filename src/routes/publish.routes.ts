import { Router } from "express";
import { v4 as uuid} from "uuid"
import multer from 'multer'
import { publish } from "@prisma/client";
import publishService from "../controllers/publish.service";
import { handlerError } from "../utils/error.utils";

const router = Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/news')
    },
    filename: (req,file, cb) => {
        cb(null, uuid() + '.png')
    }
})

const upload = multer({ storage })


router.post('/', upload.single('image'), (req,res) => {
    let file = req.file!
    let publish: publish = {
        id: 0,
        image: file.filename,
        title: req.body.title,
        sub_title: req.body.sub_title,
        message: req.body.message
    }
    publishService.publishMessage(publish)
        .then(published => res.send( { message: 'Your image and message has been upload!', published}))
        .catch(err => res.status(500).send(handlerError(err)))
    
})

router.get('/', (req,res) => {
    publishService.GetAllPublished()
        .then(published => res.send( { message: 'All Published News in here!', published}))
        .catch(err => res.status(500).send(handlerError(err)))
})

router.put('/:id', (req,res) => {
    publishService.UpdatePublishedById(+req.params.id, req.body)
        .then(updated => res.send( { message: 'Updated!', updated}))
        .catch(err => res.status(500).send(handlerError(err)))
})

router.delete('/:id', (req,res) => {
    publishService.DeletePublishMessage(+req.params.id)
        .then(published => res.send( { message: 'New Publish Deleted!!', published}))
        .catch(err => res.status(500).send(handlerError(err)))
})

export default router