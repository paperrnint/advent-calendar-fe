export const envelopeContentStyles = {
  expanded: {
    top: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    maxHeight: 'none',
    overflow: 'visible' as const,
    zIndex: 50,
    transition:
      'top 0.6s ease-out, transform 0.6s ease-out, max-height 0.6s ease-out, overflow 0.6s ease-out',
  },
  collapsed: {
    top: '12px',
    transform: 'translateX(-50%) translateY(0)',
    maxHeight: '200px',
    overflow: 'hidden' as const,
    zIndex: 1,
    transition: 'none',
  },
} as const;
