import Head from 'next/head';
import AIFeature from './components/AIFeatures';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export default function Home() {
  return (
    <div>
      <Head>
        <title>AI-Driven Features</title>
        <meta name="description" content="Implementing AI-driven features using Google Generative AI" />
      </Head>

      <main className="container">
        <h1 className="text-center my-4">AI-Driven Features</h1>
        <AIFeature />
      </main>
    </div>
  );
}
