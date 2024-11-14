// src/pages/api/checkFileExists.ts

import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filename } = req.query;

  if (typeof filename !== 'string') {
    res.status(400).json({ exists: false, error: 'Invalid filename parameter' });
    return;
  }

  const filePath = path.join(process.cwd(), 'public', 'videos', filename);
  console.log(`checkFileExists; filePath: ${filePath}`);

  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    console.log(`the file with path ${filePath} exists`);
    res.status(200).json({ exists: true });
  } catch (error) {
    console.error(error);
    console.log(`the file with path ${filePath} does not exist`);
    res.status(200).json({ exists: false });
  }
}
