"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, MouseEvent } from "react";
import { startViewTransition } from "./view-transition";

interface ViewTransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Replace current history instead of push */
  replace?: boolean;
  /** Open in new tab */
  target?: string;
  rel?: string;
}

/**
 * View Transition Link
 * 
 * Enhanced Next.js Link with View Transitions API support.
 * Automatically uses view transitions in supported browsers,
 * falls back to normal navigation otherwise.
 * 
 * @example
 * <ViewTransitionLink href="/about">
 *   About Page
 * </ViewTransitionLink>
 * 
 * @example
 * <ViewTransitionLink href="/projects" className="text-accent">
 *   View Projects
 * </ViewTransitionLink>
 */
export function ViewTransitionLink({
  href,
  children,
  className,
  replace = false,
  target,
  rel,
}: ViewTransitionLinkProps) {
  const router = useRouter();

  /**
   * Handle Click
   * 
   * Intercepts navigation to use View Transitions API
   */
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Allow normal behavior for external links or new tabs
    if (target === "_blank" || href.startsWith("http")) {
      return;
    }

    // Prevent default navigation
    e.preventDefault();

    // Use View Transition if supported
    startViewTransition(() => {
      if (replace) {
        router.replace(href);
      } else {
        router.push(href);
      }
    });
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      target={target}
      rel={rel}
    >
      {children}
    </Link>
  );
}
