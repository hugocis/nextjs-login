// app/page.tsx
import { useEffect, useState } from 'react';
import { NoteForm } from '@/app/components/NoteForm';

interface Note {
  id: string; // or number depending on your schema
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
  const [notes, setNotes] = useState<Note[]>([]); // Specify Note type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await loadNotes();
        setNotes(data);
      } catch (err) {
        if(err instanceof Error)
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <NoteForm />
        <div>
          {notes.map((note) => (
            <div key={note.id} className="bg-slate-900 p-4 my-2">
              <h1>{note.title}</h1>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
