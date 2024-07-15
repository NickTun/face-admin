import "@/styles/globals.css";
import Layout from "./components/layout";
import localFont from 'next/font/local';

const myFont = localFont({
  src: [
    {
      path: './../public/fonts/Halvar Breitschrift-Black-Desktop.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: './../public/fonts/Halvar Breitschrift-ExtraBold-Desktop.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './../public/fonts/Halvar Breitschrift-Bold-Desktop.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './../public/fonts/Halvar Breitschrift-Medium-Desktop.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './../public/fonts/Halvar Breitschrift-Regular-Desktop.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './../public/fonts/Halvar Breitschrift-Light-Desktop.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './../public/fonts/Halvar Breitschrift-ExtraThin-Desktop.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './../public/fonts/Halvar Breitschrift-Hairline-Desktop.otf',
      weight: '100',
      style: 'normal',
    },
  ]
})

export default function App({ Component, pageProps }) {
  return (
    <main className={`min-h-screen ${myFont.className}`} style={{ background: 'linear-gradient(to bottom, #07077f -346.66%, #000 247.89%)'}}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  ); 
}
