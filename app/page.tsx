import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Impacto from './components/Impacto/Impacto'
import Datos from './components/Datos/Datos'
import ComoApoyarnos from './components/ComoApoyarnos/ComoApoyarnos'
import Empresa from './components/Empresa/Empresa'
import Galeria from './components/Galeria/Galeria'
import Contacto from './components/Contacto/Contacto'
import Aliados from './components/Aliados/Aliados'
import Footer from './components/Footer/Footer'
import BackToTop from './components/BackToTop/BackToTop'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Impacto />
      <Datos />
      <ComoApoyarnos />
      <Empresa />
      <Galeria />
      <Contacto />
      <Aliados />
      <Footer />
      <BackToTop />
    </main>
  )
}
