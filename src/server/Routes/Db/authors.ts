import { Query } from './query';

const all = async () => {
    return Query('SELECT * FROM authors');
}

const one = async (id: number) => {
    return Query('SELECT * FROM authors WHERE id = ?', [id]);
}

const post = async (name: string, email: string) => {
    let values = [name, email];
    return Query('INSERT INTO authors (name, email) VALUES(?,?)', values)
}

const put = async (id: number, name: string, email: string) => {
    let values = [name, email, id];
    return Query("UPDATE authors SET name = ?, email = ? WHERE id = ?", values)
}

const del = async (id: number) => {
    return Query('DELETE FROM authors WHERE id = ?', [id])
}

const DbAuthors = {
    all,
    one,
    post,
    put,
    del
}

export default DbAuthors;