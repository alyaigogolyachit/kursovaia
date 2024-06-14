import { NextResponse } from "next/server"
import prisma from "@/libs/prismadb"
export const GET = async () => {
  try {
    const categories = await prisma.category.findMany({
      where: { featured: true },
    })
    return new NextResponse(JSON.stringify(categories), { status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 },
    )
  }
}
