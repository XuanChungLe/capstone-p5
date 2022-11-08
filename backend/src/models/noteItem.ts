export interface NoteItem {
  userId: string
  noteId: string
  createdAt: string
  note: string
  dueDate: string
  done: boolean
  attachmentUrl?: string
}
