import { NextRequest, NextResponse } from "next/server"
import prisma from "@/libs/prismadb"

//GET SEARCH RESULTS

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("q")

  if (typeof query !== "string") {
    throw new Error("Invalid request")
  }

  try {
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            body: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            author: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        authorNameRel: true,
      },
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
