import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ViewNote() {
    const { id } = useParams(); // Get the note ID from the URL
    const navigate = useNavigate();
    const [note, setNote] = useState(null);

    // Load the specific note by ID from localStorage
    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        const foundNote = savedNotes.find(note => note.id.toString() === id);
        setNote(foundNote);
    }, [id]);

    if (!note) {
        return (
            <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
                <p className="text-xl text-center text-red-600">Note not found</p>
                <button
                    onClick={() => navigate('/notes')}
                    className="mt-4 block mx-auto bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Back to Notes List
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
            <button
                onClick={() => navigate('/notes')}
                className="bg-blue-500 text-white px-6 py-2 rounded-md mb-4 hover:bg-blue-600 transition-colors"
            >
                Back to Notes List
            </button>

            <div className="mb-6">
                <h2 className="text-3xl font-semibold text-gray-800">{note.title}</h2>
                <p className="mt-4 text-lg text-gray-700">{note.content}</p>
            </div>

            
        </div>
    );
}

export default ViewNote;
