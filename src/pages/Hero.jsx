import { Link } from 'react-router-dom'
import { m as motion } from 'framer-motion'
import { useRef, useState, useEffect, lazy, Suspense } from 'react'
import gsap from '../lib/gsap'
import { useGSAP } from '@gsap/react'
import LogoLoop from '../components/LogoLoop'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { 
  SiPandas, SiNumpy, SiScikitlearn, SiTensorflow, SiKeras, SiJupyter, SiPytorch, SiPython,
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiJavascript
} from 'react-icons/si'

const techLogos = [
  // Data Science Tools
  { node: <SiPython />, title: "Python", href: "https://www.python.org/" },
  { node: <SiPandas />, title: "Pandas", href: "https://pandas.pydata.org/" },
  { node: <SiNumpy />, title: "NumPy", href: "https://numpy.org/" },
  { node: <SiScikitlearn />, title: "Scikit-Learn", href: "https://scikit-learn.org/" },
  { node: <SiTensorflow />, title: "TensorFlow", href: "https://www.tensorflow.org/" },
  { node: <SiKeras />, title: "Keras", href: "https://keras.io/" },
  { node: <SiPytorch />, title: "PyTorch", href: "https://pytorch.org/" },
  { node: <SiJupyter />, title: "Jupyter", href: "https://jupyter.org/" },
  // Web Development Tools
  { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org/" },
  { node: <SiReact />, title: "React", href: "https://react.dev/" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org/" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com/" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org/" },
];
const Antigravity = lazy(() => import('../components/Antigravity'))
import PageTransition from '../components/PageTransition'
import { client, urlFor } from '../lib/sanity'

/* ─── Framer Motion variants for Hero entrance ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
})

export default function Hero() {
  const container = useRef(null);
  const [recentMinds, setRecentMinds] = useState([]);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    async function fetchRecentMinds() {
      try {
        const query = '*[_type == "mind"] | order(publishedAt desc)[0...1]';
        const minds = await client.fetch(query);
        setRecentMinds(minds);
      } catch (err) {
        console.error("Failed to fetch recent minds:", err);
      }
    }
    fetchRecentMinds();
  }, []);

  useGSAP(() => {
    // Select all elements with the 'gsap-reveal' class
    const reveals = gsap.utils.toArray('.gsap-reveal');
    
    reveals.forEach((element) => {
      gsap.fromTo(element, 
        { opacity: 0, y: 60 },
        {
          opacity: 1, 
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%', // Trigger when the top of the element hits 85% of viewport
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, { scope: container });

  return (
    <PageTransition className="page" ref={container}>
      <section className="hero">
        {/* Antigravity Background */}
        <div className="hero-bg-antigravity">
          <Suspense fallback={<div style={{ width: '100%', height: '100%', background: '#0D0D0D' }} />}>
            <Antigravity
              count={200}
              magnetRadius={6}
              ringRadius={7}
              waveSpeed={0.3}
              waveAmplitude={0.8}
              particleSize={1}
              lerpSpeed={0.03}
              color={'#888888'}
              autoAnimate={true}
              particleVariance={0.6}
            />
          </Suspense>
        </div>
        {/* Dark vignette so text stays readable */}
        <div className="hero-vignette" />

        {/* Title */}
        <motion.h1 className="hero-title" {...fadeUp(0.5)} style={{ fontWeight: 'bold' }}>
          <span className="line1" style={{ display: 'inline', fontWeight: 'bold' }}>Binary </span>
          <span className="line2" style={{ display: 'inline', fontWeight: 'bold' }}>Minds</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p className="hero-tagline" {...fadeUp(0.7)} style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', fontFamily: 'Space Grotesk, sans-serif', marginTop: '1rem', textTransform: 'none', letterSpacing: '0' }}>
          Code. Create. Innovate.
        </motion.p>

        {/* Buttons */}
        <motion.div className="hero-buttons" {...fadeUp(0.9)}>
          <Link to="/minds" className="btn-primary interactive cursor-target" style={{ background: '#ffffff', color: '#000000', borderRadius: '4px' }}>
            Read the Minds
          </Link>
          <Link to="https://forms.gle/9o3EBp7mH5Hq6BpGA" className="btn-secondary interactive cursor-target" style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#ffffff', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }}>
            Join the Community
          </Link>
        </motion.div>

        {/* Trusted By Section */}
        <motion.div 
          className="trusted-by"
          {...fadeUp(1.1)}
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '100%',
            padding: '1.5rem 4rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            background: 'rgba(5, 5, 5, 0.4)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 -20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="trusted-by-info" style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <span className="trusted-by-label" style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: '600' }}>Trusted By</span>
            <span className="trusted-by-community" style={{ fontSize: '1.1rem', fontWeight: '600', color: '#fff', letterSpacing: '-0.01em', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div className="trusted-by-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)' }} />
              Kaziranga Community
            </span>
          </div>
          
          <div className="trusted-by-divider" style={{ width: '1px', height: '40px', background: 'rgba(255, 255, 255, 0.1)', marginLeft: '1rem', marginRight: '1rem' }} />
          
          {!isMobile && (
            <div style={{ flex: 1, overflow: 'hidden', height: '40px', display: 'flex', alignItems: 'center' }}>
              <LogoLoop
                logos={techLogos}
                speed={100}
                direction="left"
                logoHeight={24}
                gap={50}
                hoverSpeed={0}
                scaleOnHover
                fadeOut
                fadeOutColor="#030008"
                ariaLabel="Data Science Tools"
              />
            </div>
          )}
        </motion.div>
      </section>

      {/* About Community Section */}
      <section className="about-section">
        <div className="about-content gsap-reveal">
          <span className="section-eyebrow">About Us</span>
          <h2 className="section-title" style={{ textAlign: 'left' }}>What is <span className="accent">Binary Minds?</span></h2>
          <div style={{ color: 'var(--muted)', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              Binary Minds is a passionate community of developers, innovators, and tech enthusiasts. We collaborate on cutting-edge projects, host hackathons, and share knowledge to push the boundaries of what's possible.
            </p>
            <p>
              Whether you are a beginner taking your first steps in coding or a seasoned pro looking for new challenges, you'll find a place here to learn, build, and grow together.
            </p>
          </div>
        </div>
        
        <motion.div 
          className="about-image-container gsap-reveal interactive"
          whileHover={{ y: -10, scale: 1.02 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            background: 'var(--surface)',
            borderRadius: '24px',
            border: '1px solid var(--border)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            overflow: 'hidden',
            padding: '1.5rem',
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto'
          }}
        >
          <img src="/7587df77ef521cf98057d0028ee983f1.gif" alt="Binary Minds Community" style={{ width: '100%', borderRadius: '16px', display: 'block', filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.05))' }} />
        </motion.div>
      </section>

      {/* Minds Preview Section */}
      <section className="minds-container" style={{ paddingTop: '2rem' }}>
        <div className="section-header gsap-reveal">
          <span className="section-eyebrow">Latest Updates</span>
          <h2 className="section-title">Minds <span className="accent">Preview</span></h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {recentMinds.length > 0 ? recentMinds.map((mind, index) => (
            <motion.div 
              key={mind.slug?.current || index}
              className="preview-card interactive gsap-reveal"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              style={{ 
                background: 'var(--surface)', 
                borderRadius: '16px', 
                border: '1px solid var(--border)', 
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {mind.mainImage && (
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img 
                    src={urlFor(mind.mainImage).width(600).height(400).url()} 
                    alt={mind.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
              )}
              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.8rem', color: 'var(--cyan)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {mind.publishedAt ? new Date(mind.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recent'}
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: '1.3' }}>
                  {mind.title}
                </h3>
                <div style={{ marginTop: 'auto' }}>
                  <Link to={`/minds/${mind.slug?.current}`} className="btn-secondary cursor-target" style={{ fontSize: '0.9rem', padding: '0.6rem 1.4rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                    Read Article <span>→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="gsap-reveal" style={{ padding: '4rem', textAlign: 'center', color: 'var(--muted)', gridColumn: '1 / -1', border: '1px dashed var(--border)', borderRadius: '16px' }}>
              <p>Fetching the latest minds from Sanity...</p>
            </div>
          )}

        </div>
      </section>

    </PageTransition>
  )
}
