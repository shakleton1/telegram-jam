import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from './components/Layout';
import Home from './pages/Home';
import Room from './pages/Room';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/room/:id" element={<Room />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Layout>
    );
};

export default App; 