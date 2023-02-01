import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Gallery from './components/Gallery';
import ImageList from './components/ImageList';
import { Navbar } from './components/Navbar';
import { MyGallery } from './Pages/MyGallery';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar/>
      <div>
     
          <Routes>
            <Route index element={<ImageList />} exact />
            <Route path='/gallery' element={<ImageList />} exact />
            <Route path='/upload' element={<MyGallery/>} exact />
            <Route path='/uploadw' element={<Gallery />} />
          </Routes>

      </div>

    </div>
      </BrowserRouter>

  );
}
export default App;