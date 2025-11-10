
/**
 * Cache tags for different content types
 */
export const CACHE_TAGS = {
  PROJECTS: 'projects',
  SKILLS: 'skills',
  CERTIFICATIONS: 'certifications',
  ABOUT: 'about',
  BLOG: 'blog',
  ALL: 'all-content',
} as const;

/**
 * Cache durations in seconds
 */
export const CACHE_DURATIONS = {
  SHORT: 60 * 5,        // 5 minutes
  MEDIUM: 60 * 60,      // 1 hour
  LONG: 60 * 60 * 24,   // 24 hours
  WEEK: 60 * 60 * 24 * 7, // 7 days
} as const;

/**
 * Create a cached function with tags
 */
export function createCachedFunction<R>(
  fn: () => Promise<R> | R,
  tags: string[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _revalidate: number = CACHE_DURATIONS.LONG
) {
  // For development, return data directly without cache
  return async () => {
    const result = await fn();
    return result;
  };
  
  // Commented out cache for now to debug
  // return unstable_cache(
  //   async () => {
  //     const result = await fn();
  //     return result;
  //   },
  //   [JSON.stringify({ tags: tags.join('-') })],
  //   {
  //     revalidate,
  //     tags,
  //   }
  // );
}

/**
 * Type for cache configuration
 */
export interface CacheConfig {
  tags: string[];
  revalidate?: number;
}

/**
 * Default cache configurations for different content types
 */
export const DEFAULT_CACHE_CONFIG: Record<string, CacheConfig> = {
  projects: {
    tags: [CACHE_TAGS.PROJECTS, CACHE_TAGS.ALL],
    revalidate: CACHE_DURATIONS.LONG,
  },
  skills: {
    tags: [CACHE_TAGS.SKILLS, CACHE_TAGS.ALL],
    revalidate: CACHE_DURATIONS.WEEK,
  },
  certifications: {
    tags: [CACHE_TAGS.CERTIFICATIONS, CACHE_TAGS.ALL],
    revalidate: CACHE_DURATIONS.WEEK,
  },
  about: {
    tags: [CACHE_TAGS.ABOUT, CACHE_TAGS.ALL],
    revalidate: CACHE_DURATIONS.LONG,
  },
  blog: {
    tags: [CACHE_TAGS.BLOG, CACHE_TAGS.ALL],
    revalidate: CACHE_DURATIONS.MEDIUM,
  },
};