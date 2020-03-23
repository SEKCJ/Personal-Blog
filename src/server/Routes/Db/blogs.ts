import { Query } from './query';

const all = async () => {
    return Query('SELECT * FROM blogs');
}

const one = async (id: number) => {
    return Query('SELECT * FROM blogs WHERE id = ?', [id]);
}

const post = async (title: string, content: string, authorid: number) => {
    let values = [title, content, authorid];
    let tempQuery: any =  await Query('INSERT INTO blogs (title, content, authorid) VALUES(?,?,?)', values)
    let insertId = Object.entries(tempQuery)[2][1];
    
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