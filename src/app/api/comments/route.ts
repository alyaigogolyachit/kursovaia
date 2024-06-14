import { NextResponse, NextRequest } from "next/server"
import prisma from "@/libs/prismadb"
import { getAuthSession } from "../auth/[...nextauth]/options"

//GET 5 COMMENTS OF THE POST

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const NUMBER_PER_ATTEMPT = 5

  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(
    searchParams.get("limit") ?? NUMBER_PER_ATTEMPT.toString(),
  )
  const offset = (page - 1) * limit
  const postSlug = searchParams.get("postSlug")

  const query = {
    take: limit,
    skip: offset,
    where: { ...(postSlug && { postSlug }) },
    include: { author: true },
    orderBy: { createdAt: "desc" } as const,
  }
  try {
    const [comments, count] = await prisma.$transaction([
      prisma.comment.findMany(query),
      prisma.comment.count({
        where: query.where,
      }),
    ])
    return new NextResponse(JSON.stringify({ comments, count }), {
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 },
    )
  }
}

//CREATE A COMMENT

export const POST = async (req: NextRequest) => {
  const session = await getAuthSession()

  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not auth" }), {
      status: 401,
    })
  }

  try {
    const body = await req.json()

    const comment = await prisma.comment.create({
      data: { ...body, authorName: session.user?.name },
    })
    return new NextResponse(JSON.stringify(comment), { status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 },
    )
  }
}
