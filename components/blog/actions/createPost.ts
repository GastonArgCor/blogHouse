import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

export async function createBlogPost(title: string, description: string) {
  const newPost = await prisma.blog.create({
    data: {
      title: title,
      description: description
    }
  })
  return newPost
}
