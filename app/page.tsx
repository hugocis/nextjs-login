// app/page.tsx
"use client"; // Marca el componente como Client Component

import { useEffect, useState } from 'react';
import { NoteForm } from '@/app/components/NoteForm';

interface Note {
  id: string; // o número dependiendo de tu esquema
  title: string;
  content: string;
}

async function loadNotes(): Promise<Note[]> {
  const baseUrl = process.env.VERCEL_URL || 'http://localhost:3000';
  const url = typeof window === 'undefined' ? `${baseUrl}/api/notes` : '/api/notes';

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error fetching notes: ${res.status} - ${res.statusText}`);
  }
  const data = await res.json();
  return data;
}

function HomePage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await loadNotes();
        setNotes(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotes();
  }, []);

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
  };

  const handleDeleteNote = async (id: string) => {
    await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
    });
    setNotes(notes.filter(note => note.id !== id));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-5xl p-4 bg-white rounded-lg shadow-md">
        <NoteForm onNoteCreated={(newNote) => setNotes((prev) => [...prev, newNote])} />

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div key={note.id} className="bg-slate-100 p-4 rounded-lg shadow hover:bg-slate-200 transition duration-200">
              <h3 className="text-lg font-semibold">{note.title}</h3>
              <p className="text-gray-600">{note.content}</p>
              <div className="flex justify-between mt-2">
                <button onClick={() => handleEditNote(note)} className="text-blue-500 hover:underline">Edit</button>
                <button onClick={() => handleDeleteNote(note.id)} className="text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>

        {editingNote && (
          <NoteForm
            initialData={editingNote}
            onNoteUpdated={(updatedNote) => {
              setNotes(notes.map(note => (note.id === updatedNote.id ? updatedNote : note)));
              setEditingNote(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;
