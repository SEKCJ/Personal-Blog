import * as express from 'express';
import DbBlogs from './Db/blogs';

const router = express.Router();

router.get('/:id?', async (req, res) => {
    let id: number = parseInt(req.params.id);
    if (id) {
        try {
            res.json((await DbBlogs.one(id))[0])
        } catch (err) {
            if (err) throw err;
            res.sendStatus(500);
        }
    } else {
        try {
            res.json(await DbBlogs.all())
        } catch (err) {
            if (err) throw err;
            res.sendStatus(500);
        }
    }
})

router.post('/', async (req, res) => {
    let title = req.body.title;
    let content = req.body.content;
    let authorid = parseInt(req.body.authorid, 10);
    let tagid = parseInt(req.body.tagid, 10);
    try {
        res.json(await DbBlogs.post(title, content, authorid, tagid))
    } catch (err) {
        if (err) throw err;

        res.sendStatus(500);
    }   

})

router.put('/:id?', async (req, res) => {
    let id = parseInt(req.params.id, 10);
    let title = req.body.title;
    let content = req.body.content;
    let authorid = parseInt(req.body.authorid, 10);
    if (id) {
        try {
            res.json(await DbBlogs.put(id, title, content, authorid));
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
            res.json(await DbBlogs.del(id))
        } catch (err) {
            if (err) throw err;
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(500).json("id not provided");
    }
})


export default router