import Hero from '../components/layout/Hero'
import Footer from '../components/common/Footer'
import Features from '../components/layout/Features/Features'
import FAQ from '../components/layout/FAQ/FAQ'
import CTAbanner from '../components/layout/CTAbanner'

const Landing = () => {
  return (
    <div>
        <Hero/>
        <Features/>
        <FAQ/>
        <CTAbanner/>
        <Footer/>
    </div>
  )
}

export default Landing