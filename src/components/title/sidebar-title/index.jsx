const SidebarTitle = ({ children }) => {
  return (
    <div className="pt-[20px] pb-1 first:pt-0">
      <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[#A0AEC0] dark:text-gray-400">
        {children}
      </h2>
    </div>
  )
}

export default SidebarTitle
