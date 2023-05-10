import { useState } from 'react';

export default function Home() {

  const [url, setUrl] = useState('');

  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {

    setDownloading(true);

    try {

      const response = await fetch(`/api/download?url=${encodeURIComponent(url)}`);

      const data = await response.json();

      if (data.success) {

        // File downloaded successfully

        const downloadLink = document.createElement('a');

        downloadLink.href = `/downloads/${data.filename}`;

        downloadLink.download = data.filename;

        downloadLink.click();

      } else {

        // Handle error

        console.error(data.error);

      }

    } catch (error) {

      // Handle network or server errors

      console.error(error);

    }

    setDownloading(false);

  };

  return (

    <div>

      <h1>YouTube Downloader</h1>

      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter YouTube video URL" />

      <button onClick={handleDownload} disabled={downloading}>

        {downloading ? 'Downloading...' : 'Download'}

      </button>

    </div>

  );

}

