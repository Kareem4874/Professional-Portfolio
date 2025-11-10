'use client';

import { Button } from '@/components/ui/button';
import { Download, CheckCircle, XCircle } from 'lucide-react';
import { downloadCV } from '@/lib/utils/download';
import { useState } from 'react';

export function DownloadCVButton() {
  const [status, setStatus] = useState<'idle' | 'downloading' | 'success' | 'error'>('idle');

  const handleDownload = async () => {
    setStatus('downloading');
    const result = await downloadCV();
    
    if (result.success) {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <Button
      variant="accent"
      size="lg"
      onClick={handleDownload}
      disabled={status === 'downloading'}
      className="gap-2"
    >
      {status === 'idle' && (
        <>
          <Download className="h-5 w-5" />
          Download CV
        </>
      )}
      {status === 'downloading' && (
        <>
          <Download className="h-5 w-5 animate-bounce" />
          Downloading...
        </>
      )}
      {status === 'success' && (
        <>
          <CheckCircle className="h-5 w-5" />
          Downloaded!
        </>
      )}
      {status === 'error' && (
        <>
          <XCircle className="h-5 w-5" />
          Failed
        </>
      )}
    </Button>
  );
}