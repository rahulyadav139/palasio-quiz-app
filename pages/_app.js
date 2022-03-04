import '../styles/globals.css';
import { ThemeProvider } from '../utils/theme-context';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
