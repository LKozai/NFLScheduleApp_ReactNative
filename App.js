import React from 'react';
import { Provider } from 'react-redux'; // import Redux Provider to make the store available to the app
import store from './redux/store'; // import the store
import NFLSchedule from './components/NFLSchedule'; // import the main NFL schedule component

const App = () => (
  <Provider store={store}>
    <NFLSchedule />
  </Provider>
);

export default App;
