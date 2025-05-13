import Auth from '../../auth/Auth'

function BannerHeader() {
  return (
    <section className="bg-[#ecf2ff] py-12 md:py-20" style={{ height: 'calc(100vh - 100px)' }}>
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0"></div>
        <div className="md:w-1/2  md:pl-10">
          <Auth />
        </div>
      </div>
    </section>
  )
}

export default BannerHeader
