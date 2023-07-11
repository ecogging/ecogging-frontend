import { BrowserRouter,Route, Routes } from 'react-router-dom';
import EventList from './components/plogging/event/EventList';
import EventDetail from './components/plogging/event/EventDetail';
import EventWrite from './components/plogging/event/EventWrite'
import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import store from './persist-store';

const persister = persistStore(store);

function App() {
  return (
    <div>
      <Provider store={store}>
        <PersistGate persistor={persister}>
          <BrowserRouter>
            <Routes>
              <Route exact path='/eventDetail' element={<EventDetail/>}/>
              <Route exact path='/eventList' element={<EventList/>}/> 
              <Route exact path='/eventWrite' element={<EventWrite/>}/>          
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
