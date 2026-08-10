import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import WhoWeServe from './components/WhoWeServe'
import Services from './components/Services'
import WhyHebi from './components/WhyHebi'
import ServiceArea from './components/ServiceArea'
import Contact from './components/Contact'
import ThankYou from './components/ThankYou'
import ClientPortal from './portal/ClientPortal'
import AdminPortal from './portal/AdminPortal'

export default function App() {
  const isThankYouPage = window.location.pathname === '/thank-you'
  const isClientPortal = window.location.pathname === '/portal'
  const isAdminPortal = window.location.pathname === '/admin'

  if (isThankYouPage) {
    return <ThankYou />
  }

  if (isClientPortal) {
    return <ClientPortal />
  }

  if (isAdminPortal) {
  return <AdminPortal />
  }
  
  return (
    <div className="min-h-screen bg-[#fbfaf7] text-slate-800">
      <Navbar />

      <main>
        <Hero />
        <About />
        <WhoWeServe />
        <Services />
        <WhyHebi />
        <ServiceArea />
        <Contact />
      </main>
    </div>
  )
}