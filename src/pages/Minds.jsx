import { useState, useEffect } from 'react'
import { m as motion } from 'framer-motion'
import MindCard from '../components/MindCard'
import PageTransition from '../components/PageTransition'
import { client } from '../lib/sanity'

export default function Minds() {
  const [minds, setMinds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMinds() {
      try {
        const query = '*[_type == "mind"] | order(publishedAt desc)'
        const fetchedMinds = await client.fetch(query)
        setMinds(fetchedMinds)
      } catch (err) {
        console.error("Failed to fetch minds from Sanity:", err)
        setMinds([])
      } finally {
        setLoading(false)
      }
    }
    fetchMinds()
  }, [])

  return (
    <PageTransition className="page minds-page">
      <div className="minds-container">
        {/* Section header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-eyebrow">// Binary Minds Archive</div>
          <h2 className="section-title">
            Previous <span className="accent">Minds</span>
          </h2>
        </motion.div>

        {/* Layout */}
        <div className="minds-grid">
          {loading ? (
            // Skeleton loaders
            [1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="mind-card-skeleton" style={{ animationDelay: `${i * 0.1}s` }} />
            ))
          ) : minds.length > 0 ? (
            minds.map((mind, i) => (
              <motion.div 
                key={mind._id || mind.slug?.current || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <MindCard mind={mind} />
              </motion.div>
            ))
          ) : (
            <div className="empty-state" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0', color: 'var(--muted)' }}>
              <h3>No minds found</h3>
              <p>Check back later for new editions.</p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
