// app/api/notes/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    const notes = await prisma.note.findMany();
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching notes' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
    const newNote = await prisma.note.create({
      data: {
        title: title,
        content: content,
      },
    });

    return NextResponse.json(newNote);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error posting note' },
      { status: 500 }
    );
  }
}
