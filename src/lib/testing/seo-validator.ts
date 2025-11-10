export interface SEOCheck {
  name: string;
  passed: boolean;
  message: string;
}

export function validatePageSEO(
  title?: string,
  description?: string,
  heading?: string
): SEOCheck[] {
  const checks: SEOCheck[] = [];

  // Title check
  checks.push({
    name: "Title Length",
    passed: title ? title.length >= 30 && title.length <= 60 : false,
    message: title
      ? `Title is ${title.length} characters (recommended: 30-60)`
      : "No title found",
  });

  // Description check
  checks.push({
    name: "Meta Description Length",
    passed: description
      ? description.length >= 120 && description.length <= 160
      : false,
    message: description
      ? `Description is ${description.length} characters (recommended: 120-160)`
      : "No description found",
  });

  // H1 check
  checks.push({
    name: "H1 Heading",
    passed: !!heading,
    message: heading ? "H1 heading present" : "No H1 heading found",
  });

  return checks;
}

export function logSEOChecks(checks: SEOCheck[]) {
  if (process.env.NODE_ENV === "development") {
    console.group("🔍 SEO Validation");
    checks.forEach((check) => {
      const icon = check.passed ? "✅" : "❌";
      console.log(`${icon} ${check.name}: ${check.message}`);
    });
    console.groupEnd();
  }
}