import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// Secret token for authentication
const REVALIDATION_TOKEN = process.env.REVALIDATION_TOKEN || 'your-secret-token';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (token !== REVALIDATION_TOKEN) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get tag from request body
    const body = await request.json();
    const { tag, tags } = body;
    
    if (!tag && !tags) {
      return NextResponse.json(
        { error: 'Tag or tags parameter is required' },
        { status: 400 }
      );
    }
    
    // Revalidate single tag or multiple tags
    if (tag) {
      revalidateTag(tag, 'layout');
    }
    
    if (tags && Array.isArray(tags)) {
      tags.forEach((t) => revalidateTag(t, 'layout'));
    }
    
    return NextResponse.json({
      revalidated: true,
      tag: tag || tags,
      now: Date.now(),
    });
  } catch (error) {
    console.error('Error revalidating:', error);
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500 }
    );
  }
}

// GET endpoint to check available tags
export async function GET() {
  return NextResponse.json({
    availableTags: [
      'projects',
      'skills',
      'certifications',
      'about',
      'blog',
      'all-content',
    ],
    usage: {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_TOKEN',
        'Content-Type': 'application/json',
      },
      body: {
        tag: 'projects', // Single tag
        // OR
        tags: ['projects', 'skills'], // Multiple tags
      },
    },
  });
}