
import React from 'react';
// @ts-ignore
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import About from './pages/About';

const App: React.FC = () => {
  return (
    <Router>
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
