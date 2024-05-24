import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl pt-5 font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              The Ripple Effect
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Together, let&apos;s rewrite the narrative for the world&apos;s
              children, one act of kindness at a time.
            </p>

            <Link
              className="flex lg:inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              href={"/charities"}
            >
              Check Charities
            </Link>
          </div>
          <div className=" lg:h-80  lg:mt-0 lg:col-span-5 lg:flex lg:items-center lg:pt-72">
            <img src="./leadImg.png" alt="mockup" />
          </div>
        </div>
      </section>
    </main>
  );
}
