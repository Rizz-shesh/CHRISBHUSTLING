import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Truncates text to a max length at a word boundary, appending an ellipsis if cut. */
export function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) return text
  const cut = text.slice(0, maxLength)
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`
}
