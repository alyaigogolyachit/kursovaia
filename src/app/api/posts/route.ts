import { NextResponse, NextRequest } from "next/server"
import prisma from "@/libs/prismadb"
import { getAuthSession } from "../auth/[...nextauth]/options"
import { revalidatePath } from "next/cache"

//GET 3 POSTS

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)

  const isPopular: string = searchParams.get("popular") || ""
  const page: number = parseInt(searchParams.get("page") || "1")
  const cat: string = searchParams.get("cat") || ""
  const POST_PER_PAGE = 3
  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: { ...(cat && { categorySlug: cat }) },
    orderBy: isPopular
      ? ({ views: "desc" } as const)
      : ({ createdAt: "desc" } as const),
  }
  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ])
    return new NextResponse(JSON.stringify({ posts, count }), { status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 },
    )
  }
}

//CREATE A POST

export const POST = async (req: NextRequest) => {
  const session = await getAuthSession()

  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not auth" }), {
      status: 401,
    })
  }

  try {
    const body = await req.json()

    const categorySlug: string =
      body.categorySlug === "#"
        ? "global"
        : body.categorySlug.toLowerCase().replace(/^#/, "")

    let category = await prisma.category.findUnique({
      where: { slug: categorySlug },
    })

    if (!category) {
      category = await prisma.category.create({
        data: {
          slug: categorySlug,
          title: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1),
        },
      })
    }
    const post = await prisma.post.create({
      data: {
        ...body,
        categorySlug: category.slug,
        author: session.user?.name,
      },
    })

    revalidatePath(`/?page=1`)
    revalidatePath(`/blog?cat=${category.slug}`)
    revalidatePath(`/`)
    return new NextResponse(JSON.stringify(post), { status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 },
    )
  }
}
