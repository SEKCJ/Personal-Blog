import { Query } from './query';

const all = async () => {
    return Query(`SELECT *, 
    b._created as datecreated, 
    c.name AS tagName 
    from blogtags a 
    JOIN blogs b ON b.id = a.blogid 
    JOIN tags c ON c.id = a.tagid 
    JOIN authors d ON d.id = b.authorid 
    ORDER BY a.blogid ASC`);
}

const one = async (id: number) => {
    return Query(`SELECT *, 
    b._created as datecreated, 
    c.name AS tagName 
    from blogtags a 
    JOIN blogs b ON b.id = a.blogid 
    JOIN tags c ON c.id = a.tagid 
    JOIN authors d ON d.id = b.authorid 
    WHERE b.id = ?`, [id]);
}

const post = async (title: string, content: string, authorid: number, tagid: number) => {
    let values = [title, content, authorid];
    let tempQuery: any = await Query('INSERT INTO blogs (title, content, authorid) VALUES(?,?,?)', values)
    let insertId: any = Object.entries(tempQuery)[2][1];
    return Query('INSERT INTO blogtags(blogid, tagid) VALUES(?,?); CALL spBlogTags(?)', [insertId, tagid, insertId])
}

const put = async (id: number, title: string, content: string, authorid: number) => {
    let values = [title, content, authorid, id];
    return Query("UPDATE blogs SET title = ?, content = ?, authorid = ? WHERE id = ?", values)
}

const del = async (id: number) => {
    return Query('DELETE FROM blogs WHERE id = ?', [id])
}

const DbBlogs = {
    all,
    one,
    post,
    put,
    del
}

export default DbBlogs;