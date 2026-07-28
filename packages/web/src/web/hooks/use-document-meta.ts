import { useEffect } from "react";

const DEFAULT_TITLE = "Chris B Hustling — Fix your credit. Buy the house. Build the business.";
const DEFAULT_DESCRIPTION =
  "Chris B Hustling LLC — credit restoration, real estate, business building, mentorship, and wealth consultation across Western PA and New Jersey. Blue-collar origin, white-collar outcome.";

/** Sets the document title and meta description for the current page, restoring the site defaults on unmount. */
export function useDocumentMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — Chris B Hustling` : DEFAULT_TITLE;

    const meta = document.querySelector('meta[name="description"]');
    meta?.setAttribute("content", description ?? DEFAULT_DESCRIPTION);

    return () => {
      document.title = DEFAULT_TITLE;
      meta?.setAttribute("content", DEFAULT_DESCRIPTION);
    };
  }, [title, description]);
}
