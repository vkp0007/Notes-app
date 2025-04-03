import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AddNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);
  const { id } = useParams();  // Retrieve the note ID for update
  const navigate = useNavigate();

  // Load notes from localStorage when the component mounts
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);

    // If an id exists (meaning we're in "update" mode), find and pre-fill the note
    if (id) {
      const noteToUpdate = savedNotes.find((note) => note.id.toString() === id);
      if (noteToUpdate) {
        setTitle(noteToUpdate.title);
        setContent(noteToUpdate.content);
      }
    }
  }, [id]);

  // Save the notes to localStorage
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes]);

  // Function to handle form submission (either add or update)
  const submitNote = () => {
    if (!title.trim() || !content.trim()) {
      alert('Title and Content cannot be empty!');
      return;
    }

    const newNote = {
      id: Date.now(),  // Use the current timestamp as the ID for new notes
      title,
      content,
    };

    if (id) {
      // If an id exists, update the existing note
      const updatedNotes = notes.map((note) =>
        note.id.toString() === id ? { ...note, title, content } : note
      );
      setNotes(updatedNotes);
    } else {
      // Otherwise, add a new note
      setNotes([...notes, newNote]);
    }

    // Clear the form fields after submission
    setTitle('');
    setContent('');

    // Redirect back to the notes list
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">
        {id ? 'Edit Note' : 'Create a New Note'}
      </h1>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          id="content"
          cols="50"
          rows="10"
          placeholder="Enter content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>
      </div>
      <div className="text-center">
        <button
          onClick={submitNote}
          className="px-6 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {id ? 'Save Changes' : 'Create Note'}
        </button>
      </div>
    </div>
  );
}

export default AddNote;
