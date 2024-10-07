import React from 'react';

function Footer() {
  return (
    <footer className="mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl">
      <hr className="w-full h-0.5 mx-auto mt-8 bg-neutral-200 border-0"></hr>
      <div className="mx-auto p-4 flex text-center text-neutral-900 flex-row justify-between">
        <div className="flex flex-row items-center justify-center space-x-1 text-neutral-900">George Xue</div>
        <div className="flex flex-row items-center justify-center space-x-2 mb-1">© 2023</div>
      </div>
    </footer>
  );
}

export default Footer;
