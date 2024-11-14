import fs from 'fs';
import path from 'path';

import { SpotlightItem } from './types';

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
// src/utils/index.ts

/**
 * Check if a given file exists by calling an API route for client-side requests.
 * @param {string} filename - The filename to check in the `public/videos` folder.
 * @returns {Promise<boolean>} - Returns true if the file exists, false otherwise.
 */
export async function fileExists(filename: string): Promise<boolean> {
  if (typeof window === 'undefined') {
    // Server-side: Use `fs.existsSync` for local files
    const fs = await import('fs'); // Dynamically import 'fs' on server
    return fs.existsSync(path.join(process.cwd(), 'public', 'videos', filename));
  } else {
    // Client-side: Use the API route to check file existence
    try {
      const response = await fetch(`/api/checkFileExists?filename=${filename}`);
      console.log(`response from checkFileExists: ${response}`);
      const data = await response.json();
      console.log(`unpacked data from response: ${data}`);
      return data.exists;
    } catch (error) {
      console.error('Error checking file existence:', error);
      return false;
    }
  }
}

/**
* Filter an array of SpotlightItem based on the existence of their `videoUrl`.
* @param {SpotlightItem[]} items - Array of SpotlightItem objects to check.
* @param {boolean} shouldExist - If true, filter for items with existing `videoUrl`; otherwise, filter for non-existing.
* @returns {Promise<SpotlightItem[]>} - Array of SpotlightItem objects matching the existence criteria for `videoUrl`.
*/
export async function filterItemsByVideoExistence(items: SpotlightItem[], shouldExist = true): Promise<SpotlightItem[]> {
  const results = await Promise.all(
    items.map(async (item) => ({
      item,
      exists: await fileExists(item.videoUrl),
    }))
  );
  return results
    .filter(({ exists }) => exists === shouldExist)
    .map(({ item }) => item);
}