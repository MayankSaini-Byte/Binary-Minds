import { m as motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import { urlFor } from '../lib/sanity'
import { FiFileText } from 'react-icons/fi'

// Custom portable text components to match NextWork aesthetic
const components = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null
      return (
        <div className="article-image-container">
          <img
            alt={value.alt || 'Article Image'}
            loading="lazy"
            src={urlFor(value).auto('format').fit('max').width(800).url()}
            className="article-image"
          />
        </div>
      )
    },
  },
  block: {
    h1: ({ children }) => <h1 className="article-h1">{children}</h1>,
    h2: ({ children }) => <h2 className="article-h2">{children}</h2>,
    h3: ({ children }) => <h3 className="article-h3">{children}</h3>,
    normal: ({ children }) => <p className="article-p">{children}</p>,
    blockquote: ({ children }) => <blockquote className="article-quote">{children}</blockquote>,
  },
  marks: {
    em: ({ children }) => <em className="article-em">{children}</em>,
    strong: ({ children }) => <strong className="article-strong">{children}</strong>,
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a href={value?.href} target={target} rel={target === '_blank' ? 'noindex nofollow' : ''} className="article-link">
          {children}
        </a>
      )
    },
  },
}

export default function MindViewer({ mind, fullWidth = false }) {
  if (!mind) {
    return (
      <div className="mind-viewer empty-state">
        <div className="empty-icon"><FiFileText size={48} color="var(--border)" /></div>
        <h3>No Mind Selected</h3>
        <p>Select a mind from the sidebar to start reading.</p>
      </div>
    )
  }

  const { title, publishedAt, mainImage, body } = mind
  const date = publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Draft'

  return (
    <motion.div
      key={mind.slug?.current || title}
      className={`mind-viewer prose ${fullWidth ? 'full-width' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="article-header">
        <h1 className="article-title">{title}</h1>
        <div className="article-meta">
          <span className="article-date">{date}</span>
        </div>
      </header>

      {mainImage && (
        <div className="article-hero-image">
          <img
            src={urlFor(mainImage).auto('format').width(1000).url()}
            alt={title}
          />
        </div>
      )}

      <div className="article-body">
        {body ? (
          <PortableText value={body} components={components} />
        ) : (
          <p className="article-p">This mind is empty. Ask the author to add some content!</p>
        )}
      </div>
    </motion.div>
  )
}
