import * as express from 'express';

import DbAuthorRouter from './dbAuthors';
import DbBlogsRouter from './dbBlogs';
import DbBlogTagsRouter from './dbBlogTags';
import DbTagsRouter from './dbTags';


const router = express.Router();

router.use('/blogs', DbBlogsRouter);

router.use('/authors', DbAuthorRouter);

router.use('/blogtags', DbBlogTagsRouter);

router.use('/tags', DbTagsRouter);


export default router;