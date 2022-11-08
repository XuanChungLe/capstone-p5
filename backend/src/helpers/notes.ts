import { NotesAccess } from './notesAcess'
import { NoteItem } from '../models/noteItem'
import { UpdateNoteRequest } from '../requests/updateNoteRequest'

// Implement businessLogic

const notesAccess = new NotesAccess()

export async function saveNote(noteItem: NoteItem) {
  return await notesAccess.persistNote(noteItem)
}

export async function getNotes(userId: string) {
  return await notesAccess.getAllNotes(userId)
}

export async function handleUpdateNote(
  noteId: string,
  userId: string,
  noteUpdate: UpdateNoteRequest
) {
  return await notesAccess.updateNote(noteId, userId, noteUpdate)
}

export async function handleDeleteNote(noteId: string, userId: string) {
  return await notesAccess.deleteNote(noteId, userId)
}

export async function handleCreateAttachmentPresignedUrl(
  noteId: string,
  userId: string
) {
  return await notesAccess.updateAttachmentUrl( noteId, userId)
}
