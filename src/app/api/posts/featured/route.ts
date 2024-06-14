import { NextRequest, NextResponse } from "next/server"
import prisma from "@/libs/prismadb"

// GET FEATURED POSTS

export const GET = async (req: NextRequest) => {
  try {
    const posts = await prisma.post.findMany({
      where: { featured: true },
    })
    return new NextResponse(JSON.stringify({ posts }), { status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 },
    )
  }
}
