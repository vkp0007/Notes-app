import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdContentCopy } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";

function NoteList() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const viewNote = (id) => {
    navigate(`/notes/${id}`);
  };

  const copyNote = (content) => {
    navigator.clipboard.writeText(content);
    alert("Note content copied to clipboard!");
  };

  const updateNote = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-12">Your Notes</h1>

      {notes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            >
              <h3 className="text-2xl font-semibold mb-4">{note.title}</h3>
              <p className="text-gray-700 mb-6">
                {note.content.length > 100 ? note.content.slice(0, 100) + '...' : note.content}
              </p>
              <div className="flex justify-between items-center gap-2">
                <button
                  onClick={() => viewNote(note.id)}
                  className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  <AiOutlineEye />
                </button>
                <button
                  onClick={() => updateNote(note.id)}
                  className="bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600 transition-colors"
                >
                 <BiSolidEditAlt />
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                  <MdDelete />
                </button>
                <button
                  onClick={() => copyNote(note.content)}
                  className="bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                 <MdContentCopy />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">No notes available. Start by creating one!</p>
      )}
    </div>
  );
}

export default NoteList;
