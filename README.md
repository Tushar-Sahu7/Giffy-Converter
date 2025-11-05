# 🎬 Giffy Converter

A modern, browser-based video to GIF converter built with React and FFmpeg.wasm. Convert your videos to animated GIFs instantly without uploading anything to a server - everything runs locally in your browser!

![Giffy Converter - Loading](/public/Loading.png) ![Select Video](/public/Select.png) ![Giffy Converter](/public/Giffy.png)

## ✨ Features

- 🚀 **Client-Side Processing** - All conversion happens in your browser, no server required
- 🎥 **Video Preview** - See your video before converting
- ⚡ **Fast Conversion** - Powered by FFmpeg WebAssembly
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- 📥 **Easy Download** - One-click download of your converted GIF
- 🔒 **Privacy First** - Your videos never leave your device
- 💾 **No File Size Limits** - Process videos of any size (limited only by your device's memory)

## 🎯 Demo

1. Select a video file from your device
2. Preview the video in the left panel
3. Click "Convert to GIF" button
4. Download your animated GIF!

## 🛠️ Tech Stack

- **React** - Frontend framework
- **FFmpeg.wasm** - Video processing in the browser
- **Tailwind CSS** - Utility-first styling
- **Vite** - Build tool and dev server

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/giffy-converter.git
cd giffy-converter
```

2. Install dependencies:
```bash
npm install
```

3. Create a `vite.config.js` file in the root directory:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util']
  }
})
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 🚀 Usage

### Basic Usage

1. **Select Video**: Click "Select Video" and choose a video file from your device
2. **Preview**: The video will appear in the left panel
3. **Convert**: Click "Convert to GIF" to start the conversion process
4. **Download**: Once complete, download your GIF using the "Download GIF" button

### Conversion Settings

By default, the converter:
- Starts at 1 second into the video (`-ss 1.0`)
- Creates a 3-second GIF (`-t 3`)
- Outputs in GIF format (`-f gif`)

To customize these settings, modify the FFmpeg command in `App.jsx`:

```javascript
await ffmpeg.exec([
  "-i", "input.mp4",
  "-t", "3",        // Duration in seconds
  "-ss", "1.0",     // Start time in seconds
  "-f", "gif",
  "output.gif"
]);
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Changing Colors

The app uses Tailwind CSS. To change the color scheme, modify the className values in `App.jsx`:

```javascript
// Current gradient
className="bg-gradient-to-tr from-slate-900 to-slate-700"

// Example: Change to blue gradient
className="bg-gradient-to-tr from-blue-900 to-blue-700"
```

### Adjusting GIF Quality

Add quality parameters to the FFmpeg command:

```javascript
await ffmpeg.exec([
  "-i", "input.mp4",
  "-vf", "fps=10,scale=320:-1",  // 10 FPS, width 320px
  "-t", "3",
  "-ss", "1.0",
  "-f", "gif",
  "output.gif"
]);
```

## ⚠️ Known Limitations

- **Initial Load Time**: FFmpeg.wasm needs to download ~30MB on first load
- **Large Files**: Processing very large videos may take time and use significant memory
- **Browser Support**: Requires a modern browser with WebAssembly support
- **Mobile Performance**: May be slower on mobile devices due to processing power

## 🐛 Troubleshooting

### "File does not exist" error

Make sure `@ffmpeg/ffmpeg` and `@ffmpeg/util` are excluded from Vite's dependency optimization:

```javascript
// vite.config.js
optimizeDeps: {
  exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util']
}
```

### FFmpeg not loading

Check your browser console for errors. Ensure you're using a modern browser that supports:
- WebAssembly
- SharedArrayBuffer
- Cross-Origin Isolation (for some features)

### Memory issues

For large videos, try:
- Reducing the video duration
- Lowering the GIF resolution
- Closing other browser tabs

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [FFmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm) - For making FFmpeg available in the browser
- [React](https://react.dev/) - For the amazing frontend framework
- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework
- [Vite](https://vitejs.dev/) - For the lightning-fast build tool

## 📧 Contact

Your Name - [Tushar Sahu](https://www.linkedin.com/in/tushar-sahu-8b39b4290/)

Project Link: [https://github.com/Tushar-Sahu7/giffy-converter](https://github.com/Tushar-Sahu7/giffy-converter)

---

Made with ❤️ and lots of ☕