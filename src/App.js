import logo from './logo.svg';
import './App.css';
import Header from './client/components/Header';
import Main from './client/components/Main'
import Footer from './client/components/Footer'
function App() {
  return (
   <>
   <section className='todoapp'>
   <Header/>
      <Main/>
      <Footer/>
   </section>
   </>
  );
}

export default App;
