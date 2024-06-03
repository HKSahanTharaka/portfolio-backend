const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

// Connect to MongoDB Atlas
const dbURI = 'mongodb+srv://H_K_Sahan_Tharaka:AdtiRLaYfuK2Qax8@cluster0.8a9ujrh.mongodb.net/portfolio?';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Failed to connect to MongoDB Atlas', err));

// Project model
const projectSchema = new mongoose.Schema({
    name: String,
    description: String
});
const Project = mongoose.model('Project', projectSchema);

// Blog model
const blogSchema = new mongoose.Schema({
    title: String,
    content: String
});
const Blog = mongoose.model('Blog', blogSchema);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Get all projects
app.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all blogs
app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new project
app.post('/projects', async (req, res) => {
    const project = new Project({
        name: req.body.name,
        description: req.body.description
    });
    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a project
app.patch('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            project.name = req.body.name || project.name;
            project.description = req.body.description || project.description;
            const updatedProject = await project.save();
            res.json(updatedProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a project
app.delete('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (project) {
            res.json({ message: 'Project deleted' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
