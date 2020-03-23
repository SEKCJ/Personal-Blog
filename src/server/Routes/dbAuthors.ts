import * as express from 'express';
import DbAuthors from './Db/authors';

const router = express.Router();

router.get('/:id?', async (req, res) => {
    let id: number = parseInt(req.params.id);
    if (id) {
        try {
            res.json((await DbAuthors.one(id))[0])
        } catch (err) {
            if (err) throw err;
            res.sendStatus(500);
        }
    } else {
        try {
            res.json(await DbAuthors.all())
        } catch (err) {
            if (err) throw err;
            res.sendStatus(500);
        }
    }
})

router.post('/', async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    try {
        res.json(await DbAuthors.post(name, email))
    } catch (err) {
        if (err) throw err;

        res.sendStatus(500);
    }

})

router.put('/:id?', async (req, res) => {
    let id = parseInt(req.params.id, 10);
    let name = req.body.name;
    let email = req.body.email;
    if (id) {
        try {
            res.json(await DbAuthors.put(id, name, email));
        } catch (err) {
            if (err) throw err;
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(500).json("id not provided")
    }
})

router.delete('/:id?', async (req, res) => {
    let id = parseInt(req.params.id, 10);
    if (id) {
        try {
            res.json(await DbAuthors.del(id))
        } catch (err) {
            if (err) throw err;
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(500).json("id not provided");
    }
})


export default router