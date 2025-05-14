import Auth from '../../auth/Auth'

function BannerHeader() {
  return (
    <section
      className="bg-[#ecf2ff] w-full flex justify-center items-center"
      style={{
        height: 'calc(100vh - 60px)',
        backgroundImage: 'url("/images/bg-main-img.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="w-full h-full py-6 pb-24  flex justify-center items-center bg-black/30">
        <Auth />
      </div>
    </section>
  )
}

export default BannerHeader
