import styles from './App.module.css';
import MainRoutes from './routes/MainRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  console.log(window.screen.width)
  console.log(window.screen.height)

  return (
    <div className={styles.App}>
      <MainRoutes/>
      <ToastContainer />
    </div>
  );
}

export default App;
