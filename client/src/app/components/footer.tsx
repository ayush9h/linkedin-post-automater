import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="mt-20 text-zinc-900 border-t border-zinc-300 font-funnel">
        <div className="max-w-5xl mx-auto p-6 md:py-10">
          <div className="sm:flex sm:items-center sm:justify-between">

            <Link
              href={"/"}
              className="flex items-center mb-4 sm:mb-0 space-x-3 text-sm md:text-md lg:text-lg xl:text-xl font-semibold"
            >
                Post.ai
            </Link>

            <ul className="flex gap-6 flex-wrap items-center mb-6 text-sm font-medium text-zinc-600 sm:mb-0">
              <li>
                <Link
                  href={"https://github.com/ayush9h/linkedin-post-automater"}
                  className="hover:underline"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href={"https://github.com/ayush9h/linkedin-post-automater"}
                  className="hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
             
            </ul>
          </div>

          <hr className="my-6 border-zinc-200 sm:mx-auto lg:my-8" />
          <span className="block text-sm text-zinc-500 sm:text-center">
            © {new Date().getFullYear()}{" "}
            <Link href={"/"} className="hover:underline">
              Post.ai
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}