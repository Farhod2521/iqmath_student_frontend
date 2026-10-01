import * as React from 'react'

function BaseBreadcrumbs({ data = [] }) {
  return (
    <div className="mb-4 sm:mb-[24px]">
      <nav className="flex flex-wrap items-center gap-x-1 uppercase text-xs sm:text-sm md:text-base whitespace-normal min-w-0">
        {data?.map(({ link, title }, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <span className="mx-1 text-gray-400">/</span>}
            {link ? (
              <a href={link} className="uppercase font-[600] hover:underline text-black break-words">
                {title}
              </a>
            ) : (
              <span className="text-black uppercase font-[600] break-words">{title}</span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  )
}

export default BaseBreadcrumbs
//
