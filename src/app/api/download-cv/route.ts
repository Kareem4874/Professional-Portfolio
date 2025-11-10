import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    // Get CV file path - using the actual filename
    const cvPath = path.join(process.cwd(), 'public', 'cv', 'Kareem-AbdulBaset-FlowCV-Resume-20251013.pdf');
    
    // Check if file exists
    if (!fs.existsSync(cvPath)) {
      return NextResponse.json(
        { error: 'CV file not found' },
        { status: 404 }
      );
    }
    
    // Read file
    const fileBuffer = fs.readFileSync(cvPath);
    
    // Get headers for tracking
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || 'unknown';
    const referer = headersList.get('referer') || 'direct';
    
    // Log download (you can save to database)
    console.log('CV Downloaded:', {
      timestamp: new Date().toISOString(),
      userAgent,
      referer,
    });
    
    // Return file with proper headers
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Kareem-AbdulBaset-Resume.pdf"',
        'Content-Length': fileBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error downloading CV:', error);
    return NextResponse.json(
      { error: 'Failed to download CV' },
      { status: 500 }
    );
  }
}

// Analytics tracking endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Log analytics event
    console.log('Download Event:', body);
    
    // Here you can save to database or send to analytics service
    // await saveToDatabase(body);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking download:', error);
    return NextResponse.json(
      { error: 'Failed to track download' },
      { status: 500 }
    );
  }
}