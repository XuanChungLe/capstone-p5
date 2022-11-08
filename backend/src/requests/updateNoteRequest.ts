/**
 * Fields in a request to update a single item.
 */
export interface UpdateNoteRequest {
  note: string
  dueDate: string
  done: boolean
}