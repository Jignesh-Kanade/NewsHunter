import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Notes() {
    const [notes, setNotes] = useState(() => {
        // ✅ Load notes from localStorage on first render
        const storedNotes = localStorage.getItem("notes");
        return storedNotes ? JSON.parse(storedNotes) : [];
    });
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // ✅ Save notes to localStorage whenever notes change
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    // Add new note
    const addNote = () => {
        if (!title || !content) return alert("Please enter title and content!");
        const newNote = { id: Date.now(), title, content };
        setNotes([newNote, ...notes]);
        setTitle("");
        setContent("");
    };

    // Delete note
    const deleteNote = (id) => {
        setNotes(notes.filter((note) => note.id !== id));
    };

    // Download note
    const downloadNote = (note) => {
        const element = document.createElement("a");
        const file = new Blob([`Title: ${note.title}\n\n${note.content}`], {
            type: "text/plain",
        });
        element.href = URL.createObjectURL(file);
        element.download = `${note.title}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="w-full p-6 min-h-screen bg-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Notes</h1>
                <Link
                    to="/"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
                >
                    Back to News
                </Link>
            </div>

            {/* New Note Input */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Note Title"
                    className="border p-2 w-full mb-2 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Write your note here..."
                    className="border p-2 w-full mb-2 rounded h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button
                    onClick={addNote}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add Note
                </button>
            </div>

            {/* Notes List */}
            <div>
                {notes.length === 0 ? (
                    <p className="text-gray-500">No notes yet. Create one above.</p>
                ) : (
                    notes.map((note) => (
                        <div
                            key={note.id}
                            className="border p-4 mb-4 rounded shadow-md bg-white"
                        >
                            <h2 className="text-xl font-semibold">{note.title}</h2>
                            <p className="mb-4">{note.content}</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => downloadNote(note)}
                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                                >
                                    Download
                                </button>
                                <button
                                    onClick={() => deleteNote(note.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
