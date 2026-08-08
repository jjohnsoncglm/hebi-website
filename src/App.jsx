import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import WhoWeServe from './components/WhoWeServe'
import Services from './components/Services'
import WhyHebi from './components/WhyHebi'
import ServiceArea from './components/ServiceArea'
import Contact from './components/Contact'

export default function App() {
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