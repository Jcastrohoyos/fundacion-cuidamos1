import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import SobreNosotros from './components/SobreNosotros/SobreNosotros'
import StatsBanner from './components/StatsBanner/StatsBanner'
import NuestroTrabajo from './components/NuestroTrabajo/NuestroTrabajo'
import Impacto from './components/Impacto/Impacto'
import Datos from './components/Datos/Datos'
import ComoApoyarnos from './components/ComoApoyarnos/ComoApoyarnos'
import Donaciones from './components/Donaciones/Donaciones'
import Empresa from './components/Empresa/Empresa'
import Galeria from './components/Galeria/Galeria'
import Contacto from './components/Contacto/Contacto'
import Aliados from './components/Aliados/Aliados'
import Footer from './components/Footer/Footer'
import BackToTop from './components/BackToTop/BackToTop'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SobreNosotros />
      <StatsBanner />
      <NuestroTrabajo />
      <Impacto />
      <Datos />
      <ComoApoyarnos />
      <Donaciones />
      <Empresa />
      <Galeria />
      <Contacto />
      <Aliados />
      <Footer />
      <BackToTop />
    </>
  )
}
