import { NextResponse } from "next/server";
import { prisma } from '@/app/lib/prisma'
import { error } from "console";
import { ErrorMessage} from "@/app/lib/service"

export async function GET() {
    
    try 
    { 
        const notes = await prisma.note.findMany();
        return NextResponse.json(notes);
    } 
    catch (error) 
    {
        ErrorMessage(error, "Error fetching notes")
    }
}

export async function POST(request: Request) {

    try 
    { 
        const { title, content } = await request.json()
        const newNote = await prisma.note.create
        ({
            data: 
            {
                title: title,
                content: content,
    
            }
        })
    
        return NextResponse.json(newNote)
    } 
    catch (error) 
    {
        ErrorMessage(error, "Error posting note with structure: \n" + request.json())
    }
}