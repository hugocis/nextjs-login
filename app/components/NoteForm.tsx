// app/components/NoteForm.tsx
"use client";

import { useEffect, useState } from 'react';

interface Note {
    id: string;
    title: string;
    content: string;
}
// app/components/NoteForm.tsx

interface NoteFormProps {
    initialData?: Note | null; // Permitir null además de undefined
    onNoteCreated?: (note: Note) => void;
    onNoteUpdated?: (note: Note) => void;
}

export function NoteForm({ initialData, onNoteCreated, onNoteUpdated }: NoteFormProps) {
    const [title, setTitle] = useState(initialData ? initialData.title : '');
    const [content, setContent] = useState(initialData ? initialData.content : '');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setContent(initialData.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (initialData) {
            // Actualizar nota existente
            const res = await fetch(`/api/notes/${initialData.id}`, {
                method: 'PUT',
                body: JSON.stringify({ title, content }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const updatedNote = await res.json();
            if (onNoteUpdated) onNoteUpdated(updatedNote);
        } else {
            // Crear nueva nota
            const res = await fetch("/api/notes", {
                method: 'POST',
                body: JSON.stringify({ title, content }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const newNote = await res.json();
            if (onNoteCreated) onNoteCreated(newNote);
        }

        // Reiniciar campos del formulario
        setTitle('');
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
                required
            />
            <textarea
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
                className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
                required
            />
            <button className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                {initialData ? 'Update' : 'Create'}
            </button>
        </form>
    );
}
