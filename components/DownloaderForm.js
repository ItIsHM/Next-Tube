import { useState } from 'react';

export default function DownloaderForm() {
  const [url, setUrl] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsDownloading(true);
      setDownloaded(false);
      setErrorMessage('');

      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        setDownloaded(true);
        setUrl('');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={handleInputChange}
        />
        <button type="submit" disabled={isDownloading || !url}>
          {isDownloading ? 'Downloading...' : 'Download'}
        </button>
      </form>
      {downloaded && <p>Video downloaded successfully!</p>}
      {errorMessage && <p>Error: {errorMessage}</p>}
    </div>
  );
}
