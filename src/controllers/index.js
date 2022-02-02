require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})

const getTemplates = async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM templates");
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
    }
}

const createTemplate = async (req, res) => {
    const { name, author, firstColor, secondColor, type, direction } = req.body;
    if (await templateExists(name)) {
        res.status(200).send({
            message: 'DUPLICATE'
        });
    } else {
        try {
            const response = await pool.query('INSERT INTO templates VALUES ($1, $2, $3, $4, $5, $6)', [name, author, firstColor, secondColor, direction, type]);
            res.status(200).send({
                message: 'OK'
            });
        } catch (error) {
            console.log(error);
        }
    }
}

const getTemplate = async (req, res) => {
    const name = req.params.name;
    try {
        const response = await pool.query(`SELECT * FROM templates WHERE name= $1`, [name]);
        res.status(200).json(response.rows[0]);
    } catch (error) {
        console.log(error);
    }
}

const templateExists = async (name) => {
    try {
        const response = await pool.query(`SELECT * FROM templates WHERE name= $1`, [name]);
        return response.rows[0] ? true : false;
    } catch (error) {
        console.log(error);
    }
    return false;
}

module.exports = {
    getTemplates,
    createTemplate,
    getTemplate
}