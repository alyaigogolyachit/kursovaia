import { NextResponse, NextRequest } from "next/server"
import prisma from "@/libs/prismadb"

//GET SINGLE POST + BOOST VISIT PARAM

type Params = {
  slug: string
}
export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  const { slug } = params
  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: { authorNameRel: true },
    })
    return new NextResponse(JSON.stringify({ post }), { status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 },
    )
  }
}
