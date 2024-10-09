const express = require('express');
const router = express.Router();
const NoteModel = require('../models/note.js');

//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save

router.post('/notes', async (req, res) => {
    try {
        // Validate request
        if(!req.body.content) {
            return res.status(400).send({
                message: "Note content cannot be empty"
            });
        }
        //TODO - Write your code here to save the note
        const newNote = new NoteModel(req.body);
        await newNote.save();

        res.status(201).json({
            message: "Employee created successfully", 
            title: newNote.noteTitle,
            description: newNote.noteDescription,
            id: newNote._id
        });

    } catch (err){
        console.error(err);
    }
    
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
router.get('/notes', async (req, res) => {
    try {
        // Validate request
        if(!req.body.content) {
            return res.status(400).send({
                message: "Note content can not be empty"
            });
        }
        //TODO - Write your code here to returns all note
        const notes = await NoteModel.find({});
        res.status(200).send(notes);

    } catch (err){
        console.error(err);
    }
    
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
router.get('/notes/:noteId', async (req, res) => {
    try {
    
        // Validate request
        if(!req.body.content) {
            return res.status(400).send({
                message: "Note content can not be empty"
            });
        }

        //TODO - Write your code here to return onlt one note using noteid
        const note = await NoteModel.findById(req.body.noteid);
        if(!note)
            res.status(404).send({message: "No notes found by that id."});
            
        res.status(200).send(note);

    } catch (err){
        console.error(err);
    }
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
router.put('/notes/:noteId', async (req, res) => {

    try {
        // Validate request
        if(!req.body.content) {
            return res.status(400).send({
                message: "Note content can not be empty"
            });
        }

        //TODO - Write your code here to update the note using noteid
        const updatedNote = await NoteModel.findOneAndUpdate({_id: req.body.noteid}, req.body, {new: true});
        if (!updatedNote)
            res.status(404).send({message: "No notes found by that id."});

        res.status(200).send({message: "Note updated.", note: updatedNote});

    } catch (err){
        console.error(err);
    }
    

});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
router.delete('/notes/:noteId', async (req, res) => {
    try {
    
        // Validate request
        if(!req.body.content) {
            return res.status(400).send({
                message: "Note content can not be empty"
            });
        }
        //TODO - Write your code here to delete the note using noteid
        const note = await NoteModel.findOneAndDelete({_id: req.body.noteid});
        if (!note)
            res.status(404).send({message: "No notes found by that id."});

        res.status(200).send({message: "Note deleted."});
        

    } catch (err){
        console.error(err);
    }
});

module.exports = router;