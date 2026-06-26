import { Link } from 'react-router-dom'
import { urlFor } from '../lib/sanity'

export default function MindCard({ mind }) {
  const { title, slug, publishedAt, mainImage } = mind
  const date = publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Draft'

  return (
    <div className="mind-card">
      <div className="mind-card-image">
        {mainImage ? (
          <img src={urlFor(mainImage).auto('format').width(600).url()} alt={title} loading="lazy" />
        ) : (
          <div className="mind-card-fallback" />
        )}
      </div>
      <div className="mind-card-content">
        <span className="mind-card-date">{date}</span>
        <h3 className="mind-card-title">{title}</h3>
        <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
          <Link to={`/minds/${slug?.current}`} className="btn-secondary cursor-target" style={{ fontSize: '0.9rem', padding: '0.6rem 1.4rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            Read Article <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
