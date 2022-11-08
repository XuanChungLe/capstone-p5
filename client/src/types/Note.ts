export interface Note {
  noteId: string
  createdAt: string
  note: string
  dueDate: string
  done: boolean
  attachmentUrl?: string
}
