const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

const Project = require('./Project');
const Blog = require('./Blog');

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        console.log(projects);
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        console.log(blogs);
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log('Server running at http://localhost:5000/');
});