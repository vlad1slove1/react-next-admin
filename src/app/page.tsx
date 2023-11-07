'use client'

import React from 'react'

import Image from 'next/image'
import { Link, Code } from '@nextui-org/react'

import homePageBackground from '../../public/homePageBackground.jpeg'

export default function Home (): React.JSX.Element {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="z-0">
        <Image
          src={homePageBackground}
          alt="Home page background"
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover'
          }}
        />
      </div>

      <div className="z-10 max-w-5xl w-full items-center justify-between align-center font-mono lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center bg-gradient-to-b pb-6 pt-8 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:p-4">
          You&apos;re on a root page. To manage admin data, link to&nbsp;
          {' '}
          <Link href={'/admin'} underline="hover">admin page</Link>
        </p>

        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Created on{' '}
            <Image
              src="/next.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="z-10 max-w-3xl w-full items-center justify-center align-center font-semibold lg:flex md:w-fit">
        <p className="mt-40 justify-center text-justify border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          This is a simple admin panel, used to improve my skills at creating fullstack app.<br/><br/>
          I tried to combine different technologies all by one application, maintained by Next.js.
          Main data stored at <Link href={'https://supabase.com/'} color="foreground" className="underline decoration-2 decoration-sky-500 text-white">supabase</Link> - this is Postgres database, with Authentication, instant APIs and Realtime subscriptions. Supabase works seamlessly with Next.js and React applications.
          App fetch data with <Link href={'https://redux-toolkit.js.org/rtk-query/overview'} color="foreground" className="underline decoration-2 decoration-sky-500 text-white">Redux RTK Query</Link> and store it to <Link href={'https://redux-toolkit.js.org/tutorials/typescript'} color="foreground" className="underline decoration-2 decoration-sky-500 text-white">Redux Store</Link>.
          Represented data wrapped and visualized by <Link href={'https://mui.com/x/react-data-grid/'} color="foreground" className="underline decoration-2 decoration-sky-500 text-white">Material UI Data Grid</Link> component.
          <br/><br/>
          <Code size="sm">
            TypeScript / Next.js / React / Redux / Supabase / Material UI / Tailwind
          </Code>
        </p>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
    </main>
  )
}
