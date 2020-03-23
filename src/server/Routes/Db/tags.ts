import { Query } from './query';

const all = async () => {
    return Query('SELECT * FROM tags');
}

const one = async (id: number) => {
    return Query('SELECT * FROM tags WHERE id = ?', [id]);
}

const post = async (name: string) => {
    let values = [name];
    return Query('INSERT INTO tags (name) VALUES(?)', values)
}

const put = async (id: number, name: string) => {
    let values = [name, id];
    return Query("UPDATE tags SET name = ? WHERE id = ?", values)
}

const del = async (id: number) => {
    return Query('DELETE FROM tags WHERE id = ?', [id])
}

const DbAuthors = {
    all,
    one,
    post,
    put,
    del
}

export default DbAuthors;