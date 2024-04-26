const express=require("express");
const fs=require("fs");
const path=require("path");
const app=express();
app.get('/files', (req, res) => {
    fs.readdir(path.join(__dirname, './files'), (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed' });
        } else {
            res.json(files);
        }
    });
});

app.get('/files/:filename', (req, res) => {
    const fp = path.join(__dirname, './files/', req.params.filename);
    fs.readFile(fp, 'utf-8', (err, data) => {
        if (err) {
            res.status(404).send('File not found');
        } else {
            res.send(data);
        }
    });
});

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports=app;