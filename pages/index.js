import { useState } from 'react';

import axios from 'axios';

export default function Home() {

  const [videoUrl, setVideoUrl] = useState('');

  const [downloadUrl, setDownloadUrl] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.get(`/api/download?url=${videoUrl}`);

      setDownloadUrl(response.data.fileUrl);

      setError('');

    } catch (error) {

      setError(error.response.data.error);

      setDownloadUrl('');

    }

  };

  return (

    <div>

      <h1>YouTube Downloader</h1>

      <form onSubmit={handleSubmit}>

        <input

          type="text"

          placeholder="Enter YouTube video URL"

          value={videoUrl}

          onChange={(e) => setVideoUrl(e.target.value)}

        />

        <button type="submit">Download</button>

      </form>

      {error && <p>{error}</p>}

      {downloadUrl && (

        <a href={downloadUrl} download>

          Download

        </a>

      )}

    </div>

  );

}

