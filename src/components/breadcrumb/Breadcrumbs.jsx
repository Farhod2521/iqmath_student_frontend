import * as React from 'react'

function BaseBreadcrumbs({ data = [] }) {
  return (
    <div className="mb-[24px]">
      <nav className="flex flex-wrap items-center gap-x-1 text-[14px] max-[400px]:text-[14px] sm:text-sm md:text-base whitespace-normal min-w-0">
        {data.map(({ link, title }, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <span className="mx-1 text-gray-400">/</span>}
            {link ? (
              <a href={link} className="hover:underline text-black break-words">{title}</a>
            ) : (
              <span className="text-black break-words">{title}</span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  )
}

export default BaseBreadcrumbs
