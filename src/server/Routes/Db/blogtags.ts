import { Query } from './query';

const all = async () => {
    return Query('SELECT * FROM blogtags');
}

const one = async (id: number) => {
    return Query('SELECT * FROM blogtags WHERE blogid = ?', [id]);
}

const post = async (tagid: number) => {
    let values = [tagid];
    return Query('INSERT INTO blogtags (tagid) VALUES(?)', values)
}

const put = async (id: number, tagid: number) => {
    let values = [tagid, id];
    return Query("UPDATE blogtags SET tagid = ? WHERE blogid = ?", values)
}

const del = async (id: number) => {
    return Query('DELETE FROM blogtags WHERE blogid = ?', [id])
}

const DbAuthors = {
    all,
    one,
    post,
    put,
    del
}

export default DbAuthors;