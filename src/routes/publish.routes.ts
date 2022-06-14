import { Router } from "express";
import { v4 as uuid} from "uuid"
import multer from 'multer'
import { publish } from "@prisma/client";
import publishService from "../controllers/publish.service";
import { handlerError } from "../utils/error.utils";

const router = Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'temps/')
    },
    filename: (req,file, cb) => {
        cb(null, uuid() + '.png')
    }
})

const upload = multer({ storage })


router.post('/', upload.single('poster'), (req,res) => {
    let file = req.file!
    let publish: publish = {
        id: 0,
        image: file.filename,
        title: req.body.title,
        sub_title: req.body.sub_title,
        message: req.body.message
    }

    publishService.publishMessage(publish)
        .then(published => res.send( { message: 'Your message has been sent!', published}))
        .catch(err => res.status(500).send(handlerError(err)))
    
})


export default router