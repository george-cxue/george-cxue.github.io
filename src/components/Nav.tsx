'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const NAV_ITEMS = [
  { name: 'about', path: '/' },
  { name: 'thoughts', path: '/thoughts' },
  { name: 'people', path: '/people' },
  { name: 'projects', path: '/projects' },
  { name: 'quotes', path: '/quotes' },
];

export default function Nav() {
  const pathname = usePathname() || '/';

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <nav className="mb-6 border-b border-neutral-200 pb-4 text-base leading-5 xs:mb-0 xs:mr-6 xs:border-none xs:pb-0 sm:mr-8 md:mr-12">
      <menu className="flex flex-wrap justify-end gap-4 xs:sticky xs:top-6 xs:flex-col xs:justify-start xs:gap-1 xs:text-right sm:top-12 md:top-24">
        {NAV_ITEMS.map(({ name, path }) => (
          <li key={path}>
            <Link
              href={path}
              className={clsx(
                'font-serif italic transition-colors',
                isActive(path)
                  ? 'text-neutral-900'
                  : 'text-neutral-400 hover:text-neutral-900'
              )}
            >
              {name}
            </Link>
          </li>
        ))}
      </menu>
    </nav>
  );
}
