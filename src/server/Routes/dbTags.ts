import * as express from 'express';
import DbTags from './Db/tags';

const router = express.Router();

router.get('/:id?', async (req, res) => {
    let id: number = parseInt(req.params.id);
    if (id) {
        try {
            res.json((await DbTags.one(id))[0])
        } catch (err) {
            if (err) throw err;
            res.sendStatus(500);
        }
    } else {
        try {
            res.json(await DbTags.all())
        } catch (err) {
            if (err) throw err;
            res.sendStatus(500);
        }
    }
})

router.post('/', async (req, res) => {
    let name = req.body.name;
    try {
        res.json(await DbTags.post(name))
    } catch (err) {
        if (err) throw err;

        res.sendStatus(500);
    }

})

router.put('/:id?', async (req, res) => {
    let id = parseInt(req.params.id, 10);
    let name = req.body.name;
    if (id) {
        try {
            res.json(await DbTags.put(id, name));
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
            res.json(await DbTags.del(id))
        } catch (err) {
            if (err) throw err;
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(500).json("id not provided");
    }
})


export default router