/**
 * Track CV download event
 */
export async function trackDownload(source: string = 'website') {
  try {
    // Track with your analytics service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cv_download', {
        event_category: 'engagement',
        event_label: source,
      });
    }
    
    // You can also send to your own analytics endpoint
    await fetch('/api/analytics/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'cv_download',
        source,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {
      // Fail silently if analytics endpoint is not available
    });
  } catch (error) {
    console.error('Failed to track download:', error);
  }
}

/**
 * Download CV file
 */
export async function downloadCV() {
  try {
    // Track the download
    await trackDownload('button');
    
    // Create download link
    const link = document.createElement('a');
    link.href = '/cv/Kareem-AbdulBaset-FlowCV-Resume-20251111.pdf';
    link.download = 'Kareem-AbdulBaset-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return { success: true };
  } catch (error) {
    console.error('Failed to download CV:', error);
    return { success: false, error: 'Failed to download CV' };
  }
}

/**
 * Get CV file info
 */
export function getCVInfo() {
  return {
    filename: 'Kareem-AbdulBaset-Resume.pdf',
    path: '/cv/Kareem-AbdulBaset-FlowCV-Resume-20251111.pdf',
    size: '~150KB',
    lastUpdated: '2024-11',
  };
}