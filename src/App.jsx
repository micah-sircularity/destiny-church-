import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import ContentCalendar from './pages/ContentCalendar';
import PostComposer from './pages/PostComposer';
import Analytics from './pages/Analytics';
import Reporting from './pages/Reporting';
import DataManagement from './pages/DataManagement';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/content-calendar" element={<ContentCalendar />} />
          <Route path="/post-composer" element={<PostComposer />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reporting" element={<Reporting />} />
          <Route path="/data-management" element={<DataManagement />} />
        </Routes>
      </Layout>
      <ToastContainer position="bottom-right" />
    </AppProvider>
  );
}

export default App;
