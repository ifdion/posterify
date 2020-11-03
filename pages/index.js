import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Resizer from 'react-image-file-resizer';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

import Dropzone from '../components/Dropzone';

export default function Home() {
  const [image, setImage] = useState(null);
  const canvasRef = useRef(null);
  const posterRef = useRef(null);

  function resizeFile(file) {
    return new Promise(resolve => {
      Resizer.imageFileResizer(
        file,
        1200,
        1200,
        'JPEG',
        100,
        0,
        uri => {
          resolve(uri);
        },
        'base64'
      );
    });
  }

  function handleDownload(type) {
    const input = document.getElementById('poster-container');
    window.scrollTo(0, 0)
    html2canvas(input).then(canvas => {
      canvas.toBlob(blob => {
        saveAs(blob, `${image.name.split('.')[0]}.png`);
      });
    });
  }

  async function handleDrop(files) {
    const src = await resizeFile(files[0]);
    setImage({
      name: files[0].name,
      src,
    });
  }

  return (
    <div className="container">
      <Head>
        <title>Posterify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Welcome to Posterify</h1>

        <Dropzone onDrop={handleDrop} />

        {image && (
          <>
            <button className="button" onClick={handleDownload}>Download</button>
            <div id="poster-container" ref={posterRef}>
                <div className="poster">
                  <img src={image.src} alt={image.name}></img>
                </div>
            </div>
            <div ref={canvasRef}></div>
          </>
        )}
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .logo {
          height: 1em;
        }

        .button {
          background: #888;
          color: #fff;
          font-size: 15px;
          font-weight: bold;
          border: none;
          padding: 10px 20px;
          margin-bottom: 20px;
          border-radius: 10px;
        }

        .poster {
          // width: 300px;
          padding: 10px;
          position: relative;
          box-sizing: border-box;
          background-color: #fff;
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
          -webkit-filter: saturate(70%) contrast(85%);
          filter: saturate(70%) contrast(85%);
        }
        .poster img {
          width: 100%;
          display: block;
          z-index: 1;
        }
        .poster:before,
        .poster:after {
          content: '';
          width: 100%;
          left: 0;
          position: absolute;
        }
        .poster:before {
          height: 4%;
          bottom: -4%;
          background-repeat: no-repeat;
          background-image: linear-gradient(
              177deg,
              rgba(0, 0, 0, 0.22) 10%,
              transparent 50%
            ),
            linear-gradient(-177deg, rgba(0, 0, 0, 0.22) 10%, transparent 50%);
          background-size: 49% 100%;
          background-position: 2% 0, 98% 0;
        }
        .poster:after {
          height: 100%;
          top: 0;
          z-index: 2;
          background-repeat: no-repeat;
          background-image: linear-gradient(
              to right,
              rgba(255, 255, 255, 0.1) 0.5%,
              rgba(0, 0, 0, 0.15) 1.2%,
              transparent 1.2%
            ),
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.1) 0.5%,
              rgba(0, 0, 0, 0.15) 1.2%,
              transparent 1.2%
            ),
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.1) 0.5%,
              rgba(0, 0, 0, 0.15) 1.2%,
              transparent 1.2%
            ),
            linear-gradient(265deg, rgba(0, 0, 0, 0.2), transparent 10%),
            linear-gradient(5deg, rgba(0, 0, 0, 0.2), transparent 15%),
            linear-gradient(-5deg, rgba(0, 0, 0, 0.1), transparent 10%),
            linear-gradient(5deg, rgba(0, 0, 0, 0.1), transparent 10%),
            linear-gradient(-265deg, rgba(0, 0, 0, 0.2), transparent 10%),
            linear-gradient(-5deg, rgba(0, 0, 0, 0.2), transparent 15%),
            linear-gradient(266deg, rgba(0, 0, 0, 0.2), transparent 10%);
          background-size: 50% 100%, 100% 33.3333%, 100% 33.3333%, 50% 33.3333%,
            50% 33.3333%, 50% 33.3333%, 50% 33.3333%, 50% 33.3333%, 50% 33.3333%,
            50% 33.3333%;
          background-position: right top, left center, left bottom, left top,
            left top, right top, left center, right center, right center,
            left bottom;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
