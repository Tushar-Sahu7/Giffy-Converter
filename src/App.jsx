import React, { useEffect, useState, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();
  const [isConverting, setIsConverting] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const fileInputRef = useRef(null);

  const load = async () => {
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.load();
    setLoaded(true);
  };

  const convertToGif = async () => {
    if (!video) return;
    setIsConverting(true);
    try {
      const ffmpeg = ffmpegRef.current;
      await ffmpeg.writeFile("input.mp4", await fetchFile(video));
      await ffmpeg.exec(["-i", "input.mp4", "-t", "3", "-ss", "1.0", "-f", "gif", "output.gif"]);
      const data = await ffmpeg.readFile("output.gif");
      const url = URL.createObjectURL(new Blob([data.buffer], { type: "image/gif" }));
      setGif(url);
    } finally {
      setIsConverting(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.item(0);
    if (file) {
      setVideo(file);
      setGif(null);
    }
  };

  return (
    <div className="bg-gradient-to-tr from-slate-900 to-slate-700 min-h-screen flex flex-col items-center justify-center text-white font-sans p-4">
      <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-4xl w-full space-y-6 border border-slate-700">
        {loaded ? (
          <>
            <h1 className="text-3xl font-bold text-center mb-2">Giffy Converter</h1>
            <p className="text-center text-slate-400 mb-6">Create animated GIFs from your videos in seconds.</p>

            <div className="flex items-center justify-center space-x-8">
              {/* Video Player Column */}
              <div className="w-1/2 space-y-4">
                {video && (
                  <video controls muted className="rounded-lg shadow-md w-full" src={URL.createObjectURL(video)}></video>
                )}
                <input
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="video/*"
                />
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  {video ? "Change Video" : "Select Video"}
                </button>

                {video && (
                  <button
                    onClick={convertToGif}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center disabled:bg-green-800 disabled:cursor-not-allowed"
                    disabled={isConverting}
                  >
                    {isConverting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Converting...
                      </>
                    ) : (
                      "Convert to GIF"
                    )}
                  </button>
                )}
              </div>

              {/* GIF Result Column */}
              <div className="w-1/2 flex flex-col items-center justify-center bg-slate-900/50 rounded-lg min-h-[200px] border-2 border-dashed border-slate-600">
                {gif ? (
                  <div className="text-center p-4">
                    <h3 className="text-xl font-semibold mb-4">Your GIF!</h3>
                    <img className="rounded-lg shadow-lg mx-auto border-4 border-slate-700" src={gif} alt="Converted GIF" />
                    <a
                      href={gif}
                      download="converted.gif"
                      className="inline-block mt-4 bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300"
                    >
                      Download GIF
                    </a>
                  </div>
                ) : (
                  <p className="text-slate-400">Your GIF will appear here</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4">
            <svg className="animate-spin h-10 w-10 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-xl font-semibold text-slate-300">Warming up the converter...</p>
          </div>
        )}
      </div>
      <footer className="text-center mt-8 text-slate-500 text-sm">
        <p>Made with ❤️ by <a className="no-underline" href="https://github.com/Tushar-Sahu7/Giffy-Converter/">Tushar Sahu</a> | Powered by FFmpeg & React</p>
      </footer>
    </div>
  );
}

export default App;