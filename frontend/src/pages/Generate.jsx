import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FileTree from '../components/FileTree';
import { CodeViewer } from '../components/CodeViewer';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, WandSparkles, ExternalLink } from 'lucide-react';

export default function Generate() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('⚠️ Please describe your website idea.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (data.success) {
        setGeneratedData(data);
        setSelectedFile(data.files[0]);
      } else {
        alert('❌ Failed to generate.');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Server error.');
    } finally {
      setLoading(false);
    }
  };

  const handleLivePreview = () => {
    if (generatedData?.projectName) {
      const url = `http://localhost:5000/sites/${generatedData.projectName}/index.html`;
      window.open(url, '_blank');
    } else {
      alert('⚠️ No project to preview.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navbar />

      <main className="flex-grow p-6 flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-6 text-center text-indigo-800">CodeDrishti🚀</h2>

        <div className="flex flex-col md:flex-row items-start gap-4 mb-8 w-full max-w-5xl">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your website idea (e.g., Portfolio for a Graphic Designer)"
            className="w-full flex-1 min-h-[100px]"
          />

          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-3 rounded shadow-md hover:bg-indigo-700"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><WandSparkles className="mr-2" /> Generate</>}
          </Button>
        </div>

        {generatedData && (
          <>
            <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl">
              {/* 📁 Left: File Tree (30%) */}
              <div className="lg:w-1/3 bg-white rounded-lg shadow p-4 overflow-auto max-h-[600px]">
                <h3 className="font-semibold mb-2 text-indigo-700">📁 Files</h3>
                <FileTree files={generatedData.files} onSelect={setSelectedFile} />
              </div>

              {/* 📝 Right: Code Viewer (70%) */}
              <div className="lg:w-2/3 bg-white rounded-lg shadow p-4 overflow-auto max-h-[600px]">
                <h3 className="font-semibold mb-2 text-indigo-700">📝 Code Viewer</h3>
                <CodeViewer file={selectedFile} />
              </div>
            </div>

            <Button
              onClick={handleLivePreview}
              className="mt-6 bg-green-600 text-white px-5 py-3 rounded-full shadow hover:bg-green-700 flex items-center"
            >
              <ExternalLink className="mr-2" />
              Live Preview
            </Button>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
