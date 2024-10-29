import styles from './App.module.css';
import MainRoutes from './routes/MainRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className={styles.App}>
      <MainRoutes/>
      <ToastContainer />
    </div>
  );
}

export default App;
