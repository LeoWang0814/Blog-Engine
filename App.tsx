
import React, { useEffect } from 'react';
// @ts-ignore
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import About from './pages/About';

const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          {/* 默认首页：确保应用启动时加载 Home */}
          <Route path="/" element={<Home />} />
          
          {/* 存档页面 */}
          <Route path="/posts" element={<Posts />} />
          
          {/* 详情页面 */}
          <Route path="/post/:category/:slug" element={<PostDetail />} />
          
          {/* 关于页面 */}
          <Route path="/about" element={<About />} />
          
          {/* 重定向逻辑 */}
          <Route path="/home" element={<Navigate to="/" replace />} />
          
          {/* 兜底逻辑：所有错误路径重定向回首页 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
