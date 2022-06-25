import { Router } from "express";
import { v4 as uuid} from "uuid"
import multer from 'multer'
import { carusel, publish } from "@prisma/client";
import caruselService from "../controllers/carusel.service";
import { handlerError } from "../utils/error.utils";

const router = Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/carusel/')
    },
    filename: (req,file, cb) => {
        cb(null, uuid() + '.png')
    }
})

const upload = multer({storage})

router.post('/', upload.single('image'), (req,res) => {
    let file = req.file!
    let carusel: carusel = {
        id: 0,
        image: file.filename,
        name: req.body.name,
        teamPosition: req.body.teamPosition
    }

    caruselService.CreateCarusel(carusel)
        .then(published => res.send( { message: 'Your image and carusel message has been upload!', published}))
        .catch(err => res.status(500).send(handlerError(err)))
})

router.get('/', (req,res) => {
    caruselService.GetAllCreatedCarusels()
        .then(published => res.send( { message: 'All carusel details!', published}))
        .catch(err => res.status(500).send(handlerError(err)))
})

router.put('/:id', (req,res) => {
    caruselService.UpdateCreatedCarusels(+req.params.id, req.body)
        .then(published => res.send( { message: 'This carusel updated!', published}))
        .catch(err => res.status(500).send(handlerError(err)))
})

router.delete('/:id', (req,res) => {
    caruselService.DeleteCreatedCarusel(+req.params.id)
        .then(published => res.send( { message: "This carusel deleted!", published}))
        .catch(err => res.status(500).send(handlerError(err)))
})

export default router