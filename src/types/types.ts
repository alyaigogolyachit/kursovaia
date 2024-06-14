export interface Category {
  id: string
  slug: string
  title: string
  img: string
  featured: boolean
  posts: []
}

export interface User {
  id: string
  name: string
  email: string
  image: string
  hashedPassword: string
  createdAt: Date
  updatedAt: Date
  posts: Post[]
  comments: Comment[]
}

export interface Comment {
  id: string
  content: string
  createdAt: Date
  authorName: string
  author: User
  postSlug: string
  post: Post[]
}
export interface Post {
  id: string
  slug: string
  views: number
  createdAt: Date
  updatedAt: Date
  image?: string
  description: string
  title: string
  body: string
  author: string
  authorNameRel: User
  categorySlug: string
  category: Category
  comment: Comment[]
}
