import Link from "next/link"
import Image from "next/image"

const TheFooter = () => {
  return (
    <div className="flex flex-col gap-7 mt-12 lg:mx-12 xl:mx-24 2xl:mx-32 py-5 justify-between items-center px-10 md:flex-row md:gap-0">
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="app blog"
            width={50}
            height={50}
            className="drop-shadow-md"
          />
          <h1 className="header text-xl">Blog App</h1>
        </div>
        <p className=" font-light">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim
          necessitatibus similique aspernatur obcaecati veritatis. Aperiam cum
          porro sequi, totam minima consequuntur, aspernatur deleniti vero
          repellendus dorales.
        </p>
        <footer>Created by &copy;КІУКІ-22-2 Акулов Роман</footer>
        <div className=" flex gap-3 items-center">
          <Link
            href="https://web.telegram.org/a/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/socmed/Telegram.svg" alt="" width={22} height={22} />
          </Link>
          <Link
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/socmed/YouTube.svg" alt="" width={22} height={22} />
          </Link>
          <Link
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/socmed/Facebook.svg" alt="" width={22} height={22} />
          </Link>
          <Link
            href="https://www.viber.com/ua/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/socmed/Viber.svg" alt="" width={22} height={22} />
          </Link>
        </div>
      </div>
      <div className="flex-1 flex gap-16 w-full md:w-auto justify-between lg:gap-24 md:justify-end font-light text-sm sm:text-base">
        <div className=" flex flex-col gap-3">
          <span className=" font-normal w-max border-b-[1px]">Links</span>
          <Link href="/Profile" className="hover:text-gray-800">
            Profile
          </Link>
          <Link href="/" className="hover:text-gray-800">
            Blog
          </Link>
          <Link href="/About" className="hover:text-gray-800">
            About
          </Link>
          <Link href="/Contacts" className="hover:text-gray-800">
            Contacts
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <span className="font-normal w-max border-b-[1px]">Tags</span>
          <Link href="/blog?cat=literature" className="hover:text-gray-800">
            Literature
          </Link>
          <Link href="/blog?cat=history" className="hover:text-gray-800">
            History
          </Link>
          <Link href="/blog?cat=music" className="hover:text-gray-800">
            Music
          </Link>
          <Link href="/blog?cat=theology" className="hover:text-gray-800">
            Theology
          </Link>
        </div>
        <div className="flex flex-col gap-3 ">
          <span className="font-normal w-max border-b-[1px]">Social</span>
          <Link
            href="https://web.telegram.org/a/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800"
          >
            Telegram
          </Link>
          <Link
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800"
          >
            Youtube
          </Link>
          <Link
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800"
          >
            Facebook
          </Link>
          <Link
            href="https://www.viber.com/ua/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800"
          >
            Viber
          </Link>
        </div>
      </div>
    </div>
  )
}
export default TheFooter
