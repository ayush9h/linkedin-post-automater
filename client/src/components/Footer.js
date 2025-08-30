export default function Footer() {
  return (
    <>
      <footer className="bg-zinc-100 text-black border-t border-gray-200 font-plex">
        <div className="max-w-5xl mx-auto p-6 md:py-10">
          <div className="sm:flex sm:items-center sm:justify-between">

            <a
              href="/"
              className="flex items-center mb-4 sm:mb-0 space-x-3"
            >
              <img
                src="/logo.svg"
                className="h-8"
                alt="Post.ai Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                Post<span className="text-blue-600">.ai</span>
              </span>
            </a>

            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-600 sm:mb-0">
              <li>
                <a href="#faq" className="hover:underline me-6">
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/your-repo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center">
            © {new Date().getFullYear()}{" "}
            <a href="/" className="hover:underline">
              Post.ai
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}
