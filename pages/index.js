import Head from 'next/head';
import DownloaderForm from '../components/DownloaderForm';

export default function Home() {
  return (
    <div>
      <Head>
        <title>YouTube Downloader</title>
        <meta name="description" content="Download YouTube videos using this app" />
        
      </Head>

      <main>
        <h1>YouTube Downloader</h1>
        <DownloaderForm />
      </main>

      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
}
