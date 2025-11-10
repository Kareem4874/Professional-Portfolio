import { ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Custom Alert Component for MDX
function Callout({ 
  type = "info", 
  title, 
  children 
}: { 
  type?: "info" | "warning" | "success" | "error";
  title?: string;
  children: ReactNode;
}) {
  const icons = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle2,
    error: XCircle,
  };

  const Icon = icons[type];

  return (
    <Alert variant={type === "error" ? "destructive" : type} className="my-6">
      <Icon className="h-4 w-4" />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}

// Custom Image Component
function MDXImage({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) {
  return (
    <div className="my-8 rounded-lg overflow-hidden border border-border">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={400}
        className="w-full h-auto"
        {...props}
      />
    </div>
  );
}

// Custom Link Component
function MDXLink({ href, children, ...props }: { href: string; children: ReactNode; [key: string]: unknown }) {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:underline font-semibold"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className="text-accent hover:underline font-semibold" {...props}>
      {children}
    </Link>
  );
}

// Export all custom components
export const mdxComponents = {
  // Typography
  h1: ({ children, ...props }: { children: ReactNode; [key: string]: unknown }) => (
    <h1 className="text-4xl font-heading font-bold mt-12 mb-6 scroll-mt-20" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: { children: ReactNode; [key: string]: unknown }) => (
    <h2 className="text-3xl font-heading font-bold mt-10 mb-4 scroll-mt-20" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: { children: ReactNode; [key: string]: unknown }) => (
    <h3 className="text-2xl font-heading font-semibold mt-8 mb-3 scroll-mt-20" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: { children: ReactNode; [key: string]: unknown }) => (
    <h4 className="text-xl font-heading font-semibold mt-6 mb-2 scroll-mt-20" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }: { children: ReactNode; [key: string]: unknown }) => (
    <p className="my-4 leading-7 text-muted-foreground" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: { children: ReactNode; [key: string]: unknown }) => (
    <ul className="my-4 ml-6 list-disc space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: { children: ReactNode; [key: string]: unknown }) => (
    <ol className="my-4 ml-6 list-decimal space-y-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: { children: ReactNode; [key: string]: unknown }) => (
    <li className="leading-7 text-muted-foreground" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: { children: ReactNode; [key: string]: unknown }) => (
    <blockquote 
      className="my-6 border-l-4 border-accent pl-6 italic text-muted-foreground" 
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: (props: { [key: string]: unknown }) => <hr className="my-8 border-border" {...props} />,
  
  // Custom components
  Callout,
  Image: MDXImage,
  a: MDXLink,
};