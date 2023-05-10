import pytube from 'pytube';

export default async function handler(req, res) {

  const { url } = req.query;

  

  try {

    const video = await pytube.getInfo(url);

    const stream = video.streams.first();

    const fileUrl = stream.url;

    res.status(200).json({ fileUrl });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

}
