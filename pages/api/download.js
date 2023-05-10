import { execSync } from 'child_process';

import fs from 'fs';

import path from 'path';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { url } = req.query;

  try {

    const outputDir = path.join(process.cwd(), 'public/downloads');

    fs.mkdirSync(outputDir, { recursive: true });

    const outputFilename = `video_${new Date().getTime()}.%(ext)s`;

    const outputFilePath = path.join(outputDir, outputFilename);

    const command = `yt-dlp -o ${outputFilePath} ${url}`;

    execSync(command);

    res.status(200).json({ success: true, filename: outputFilename });

  } catch (error) {

    res.status(500).json({ success: false, error: error.message });

  }

}

