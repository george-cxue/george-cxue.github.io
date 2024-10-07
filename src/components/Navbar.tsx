'use client';

import React from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const NAV_ITEMS = {
  '/': {
    name: 'home',
  },
  '/music': {
    name: 'music',
  },
  '/gallery': {
    name: 'gallery',
  },
};

function Navbar() {
  let pathname = usePathname() || '/';
  // if (pathname.includes('/music/')) {
  //   pathname = '/music';
  // }
  // if (pathname.includes('/gallery/')) {
  //   pathname = '/gallery';
  // }

  return (
    <header className="-ml-[8px] mb-16 tracking-tight">
      <div className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative">
        <div className="flex flex-row space-x-0 pr-10">
          {Object.entries(NAV_ITEMS).map(([path, { name }]) => {
            const isActive = path === pathname;
            return (
              <Link
                key={path}
                href={path}
                className={clsx('transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle', {
                  'text-neutral-500': !isActive,
                })}
              >
                <span className="relative py-1 px-2">
                  {name}
                  {path === pathname ? (
                    <div className="absolute h-[1px] top-7 mx-2 inset-0 bg-neutral-200 dark:bg-neutral-800 z-[-1] dark:bg-gradient-to-r from-transparent to-neutral-900" />
                  ) : null}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
