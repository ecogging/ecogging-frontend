import { BrowserRouter,Route, Routes } from 'react-router-dom';
import EventList from './components/plogging/event/EventList';
import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import store from './persist-store';

const persister = persistStore(store);

function App() {
  return (
    <div>
      <EventList/>
      {/* <Provider store={store}>
        <PersistGate persistor={persister}>
          <BrowserRouter>
            <Main/>
            <Routes>
              <Route exact path='/' element={<Login/>}/>
              <Route exact path='/join' element={<Join/>}/>            
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider> */}
    </div>
  );
}

export default App;
