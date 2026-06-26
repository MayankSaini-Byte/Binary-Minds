import React, { Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { m as motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
import ParticleCanvas from './components/ParticleCanvas'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'
import TargetCursor from './components/TargetCursor'
import LoadingSkeleton from './components/LoadingSkeleton'

const Hero = React.lazy(() => import('./pages/Hero'))
const Minds = React.lazy(() => import('./pages/Minds'))
const MindDetail = React.lazy(() => import('./pages/MindDetail'))
const Events = React.lazy(() => import('./pages/Events'))
const Blitz = React.lazy(() => import('./pages/Blitz'))

function App() {
  const location = useLocation()
  
  return (
    <LazyMotion features={domAnimation}>
      <SmoothScroll>
        <TargetCursor />
        <Navbar />
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingSkeleton />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Hero />} />
              <Route path="/minds" element={<Minds />} />
              <Route path="/minds/:slug" element={<MindDetail />} />
              <Route path="/events" element={<Events />} />
              <Route path="/blitz" element={<Blitz />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
        <Footer />
      </SmoothScroll>
    </LazyMotion>
  )
}

export default App
