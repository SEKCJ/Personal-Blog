import * as express from 'express';
import DbBlogTags from './Db/blogtags';

const router = express.Router();

router.get('/:id?', async (req, res) => {
    let id: number = parseInt(req.params.id);
    if (id) {
        try {
            res.json((await DbBlogTags.one(id))[0])
        } catch (err) {
            if (err) throw err;
            res.sendStatus(500);
        }
    } else {
        try {
            res.json(await DbBlogTags.all())
        } catch (err) {
            if (err) throw err;
            res.sendStatus(500);
        }
    }
})

router.post('/', async (req, res) => {
    let tagid = parseInt(req.body.tagid, 10);
    
    try {
        res.json(await DbBlogTags.post(tagid))
    } catch (err) {
        if (err) throw err;

        res.sendStatus(500);
    }

})

router.put('/:id?', async (req, res) => {
    let id = parseInt(req.params.id, 10)
    let tagid = parseInt(req.body.tagid, 10);
    if (id) {
        try {
            res.json(await DbBlogTags.put(id, tagid));
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
            res.json(await DbBlogTags.del(id))
        } catch (err) {
            if (err) throw err;
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(500).json("id not provided");
    }
})


export default router