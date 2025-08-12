import express from 'express';
import { readFile, writeFile } from 'fs/promises';

const dataSource = './data/list.txt';

const router = express.Router();

router.post('/contato', async (req, res) => {
    const { name } = req.body;

    if (!name || name.length < 2) {
        return res.json({ error: 'Nome precisa ter no minimo 2 caracteres.' });
    }

    let list: string[] = [];
    try {
        const data = await readFile(dataSource, 'utf8');
        list = data.split('\n');
    } catch(err) {}

    list.push(name);
    await writeFile(dataSource, list.join('\n'));

    res.status(201).json({ contato: name });
});

router.get('/contatos', async (req, res) => {
    let list: string[] = [];
    try {
        const data = await readFile(dataSource, 'utf8');
        list = data.split('\n');
    } catch(err) {}

    res.json({ contatos: list });
});

router.delete('/contato', async (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.json({ error: 'Precisa mandar um nome para excluir.' });
    }

    let list: string[] = [];
    try {
        const data = await readFile(dataSource, 'utf8');
        list = data.split('\n');
    } catch(err) {}

    list = list.filter(item => item.toLowerCase() !== (name as string).toLowerCase());

    await writeFile(dataSource, list.join('\n'));

    res.json({ contato: name });
});

export default router;