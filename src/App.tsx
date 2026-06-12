import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Reel from './components/Reel'
import Work from './components/Work'
import BTS from './components/BTS'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative">
      <div className="grain-overlay" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Reel />
        <Work />
        <BTS />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
