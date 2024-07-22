// src/app/_app.tsx (or pages/_app.tsx)
import type { AppProps } from 'next/app'; // Import the AppProps type
import '../styles/globals.css';
// src/pages/_app.tsx
import '@fortawesome/fontawesome-free/css/all.min.css';


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
