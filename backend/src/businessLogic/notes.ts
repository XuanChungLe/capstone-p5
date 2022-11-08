import { getNotes, handleCreateAttachmentPresignedUrl, handleDeleteNote, handleUpdateNote, saveNote } from "../helpers/notes";
import { NoteItem } from "../models/noteItem";
import * as uuid from "uuid";



export async function getNotesForUser( userId: string) {
    return await getNotes( userId );
}

export async function createNote( userId: string, dueDate: string, note: string ) {
  const noteItem = {
    userId: userId,
    noteId: uuid.v4(),
    createdAt: new Date().toISOString(),
    done: false,
    attachmentUrl: null,
    dueDate: dueDate,
    note: note        
  }
  
  return await saveNote( noteItem ); 
}

export async function updateNote( noteItem: NoteItem, noteId: string, userId: string) {
  return await handleUpdateNote( noteId, userId, noteItem );
}

export async function deleteNote( noteId: string, userId: string) {
  return await handleDeleteNote( noteId, userId );
}


export async function createAttachmentPresignedUrl( noteId: string, userId: string) {
  return await handleCreateAttachmentPresignedUrl( noteId, userId );
}


