import React, { useEffect } from 'react';

// Bootstrap Integration Component
export function BootstrapIntegration() {
  useEffect(() => {
    // Ensure Bootstrap CSS is loaded
    const bootstrapCSS = document.querySelector('link[href*="bootstrap"]');
    if (!bootstrapCSS) {
      const link = document.createElement('link');
      link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
      link.rel = 'stylesheet';
      link.integrity = 'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }

    // Ensure Bootstrap JS is loaded
    const bootstrapJS = document.querySelector('script[src*="bootstrap"]');
    if (!bootstrapJS) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
      script.integrity = 'sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz';
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);
    }
  }, []);

  return null; // This component only loads scripts/styles
}

// Custom Bootstrap-styled components that work with our luxury theme
export function BootstrapModal({ 
  id, 
  title, 
  children, 
  size = 'lg',
  centered = true 
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'lg' | 'xl';
  centered?: boolean;
}) {
  return (
    <div 
      className={`modal fade luxury-modal ${centered ? 'modal-dialog-centered' : ''}`} 
      id={id} 
      tabIndex={-1}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className={`modal-dialog modal-${size}`}>
        <div className="modal-content bg-gray-900 border-gray-700">
          <div className="modal-header border-gray-700">
            <h5 className="modal-title text-white font-playfair text-xl">{title}</h5>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-gray-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BootstrapToast({
  id,
  title,
  message,
  variant = 'success',
  autohide = true,
  delay = 5000
}: {
  id: string;
  title: string;
  message: string;
  variant?: 'success' | 'danger' | 'warning' | 'info';
  autohide?: boolean;
  delay?: number;
}) {
  const variantColors = {
    success: 'text-success',
    danger: 'text-danger', 
    warning: 'text-warning',
    info: 'text-info'
  };

  return (
    <div 
      className="toast align-items-center bg-gray-800 border-gray-700 text-white" 
      id={id}
      role="alert" 
      aria-live="assertive" 
      aria-atomic="true"
      data-bs-autohide={autohide}
      data-bs-delay={delay}
    >
      <div className="d-flex">
        <div className="toast-body">
          <strong className={`me-2 ${variantColors[variant]}`}>{title}</strong>
          {message}
        </div>
        <button 
          type="button" 
          className="btn-close btn-close-white me-2 m-auto" 
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
}

export function BootstrapCarousel({
  id,
  items,
  indicators = true,
  controls = true,
  autoplay = true,
  interval = 5000
}: {
  id: string;
  items: Array<{ src: string; alt: string; caption?: string; description?: string }>;
  indicators?: boolean;
  controls?: boolean;
  autoplay?: boolean;
  interval?: number;
}) {
  return (
    <div 
      id={id} 
      className="carousel slide luxury-carousel" 
      data-bs-ride={autoplay ? 'carousel' : 'false'}
      data-bs-interval={interval}
    >
      {indicators && (
        <div className="carousel-indicators">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target={`#${id}`}
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-current={index === 0 ? 'true' : 'false'}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
      )}
      
      <div className="carousel-inner rounded-lg overflow-hidden">
        {items.map((item, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <img src={item.src} className="d-block w-100" alt={item.alt} style={{ height: '400px', objectFit: 'cover' }} />
            {(item.caption || item.description) && (
              <div className="carousel-caption d-none d-md-block bg-gray-900/80 rounded p-3">
                {item.caption && <h5 className="text-white font-playfair">{item.caption}</h5>}
                {item.description && <p className="text-gray-300">{item.description}</p>}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {controls && (
        <>
          <button 
            className="carousel-control-prev" 
            type="button" 
            data-bs-target={`#${id}`} 
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button 
            className="carousel-control-next" 
            type="button" 
            data-bs-target={`#${id}`} 
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </>
      )}
    </div>
  );
}

export function BootstrapAccordion({
  id,
  items
}: {
  id: string;
  items: Array<{ title: string; content: React.ReactNode; expanded?: boolean }>;
}) {
  return (
    <div className="accordion luxury-accordion" id={id}>
      {items.map((item, index) => {
        const itemId = `${id}-item-${index}`;
        const collapseId = `${id}-collapse-${index}`;
        
        return (
          <div key={index} className="accordion-item bg-gray-800 border-gray-700">
            <h2 className="accordion-header" id={itemId}>
              <button
                className="accordion-button bg-gray-800 text-white border-gray-700 font-playfair"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${collapseId}`}
                aria-expanded={item.expanded || index === 0}
                aria-controls={collapseId}
              >
                {item.title}
              </button>
            </h2>
            <div
              id={collapseId}
              className={`accordion-collapse collapse ${(item.expanded || index === 0) ? 'show' : ''}`}
              aria-labelledby={itemId}
              data-bs-parent={`#${id}`}
            >
              <div className="accordion-body bg-gray-850 text-gray-300">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}