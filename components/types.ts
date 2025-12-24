export interface Email {
  id: string
  from: string
  email: string
  subject: string
  body: string
  date: string
  read: boolean
  category: string
}

export interface GeneratedReply {
  subject: string
  body: string
  tone: string
}
