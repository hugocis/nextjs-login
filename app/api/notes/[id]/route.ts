import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { ErrorMessage, NotFoundMessage } from "@/app/lib/service";
interface Params { params: { id: string } }

export async function GET(request: Request, { params }: Params) {
    try {

        const note = await prisma.note.findFirst
            ({
                where:
                {
                    id: Number(params.id)
                }
            })

        if (!note) {
            return NextResponse.json(NotFoundMessage)
        }

        return NextResponse.json({ message: "Getting process of note with id " + params.id + " was succesful. The note is:\n" + note })

    }
    catch (error) {
        ErrorMessage(error, "Error fetching note wiht id " + params.id)
    }

}

export async function DELETE(request: Request, { params }: Params) {
    try {
        const deletedNote = await prisma.note.delete
            ({
                where:
                {
                    id: Number(params.id)
                }
            })

        if (!deletedNote) {
            return NextResponse.json(NotFoundMessage)
        }

        return NextResponse.json({ message: "Deleting procces of note with id " + params.id + " was successful. The note was: \n" + deletedNote })

    }
    catch (error) {
        ErrorMessage(error, "Error fetching note wiht id " + params.id)
    }
}

export async function PUT(request: Request, { params }: Params) {
    return NextResponse.json({ message: "Updating single note..." })
}