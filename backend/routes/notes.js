const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Route 1: Fetch all notes for the logged-in user
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    // Fetch all notes for the logged-in user
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});

// Route 2: Add a new note
router.post('/addnote', fetchuser, [
  body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'Enter at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create a new note
    const note = new Notes({
      title,
      description,
      tag,
      user: req.user.id
    });
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});

// Route 3: Update an existing note
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // Create a new note object
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // Find the note to be updated
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    // Allow update only if the user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not authorized");
    }

    // Update the note
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true } 
    );

    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});


// Route 4: delete an existing note
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
   
    // Find the note to be updated
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    // Allow update only if the user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not authorized");
    }

    // Update the note
    note = await Notes.findByIdAndDelete(
      req.params.id,
     
    );

    res.json({"Success" : "Note has been deleted"});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});


module.exports = router;
