import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import LatestAITech from './pages/LatestAITech';
import Skills from './pages/Skills';
import SkillDetails from './pages/SkillDetails';
import Notes from './pages/Notes';
import QuizSystem from './pages/QuizSystem';
import Leaderboard from './pages/Leaderboard';
import CompanyPYQs from './pages/CompanyPYQs';
import AIMentor from './pages/AIMentor';
import DailyUpdates from './pages/DailyUpdates';
import GenAITrends from './pages/GenAITrends';
import CodePlayground from './pages/CodePlayground';
import Dashboard from './pages/Dashboard';
import LoginRegister from './pages/LoginRegister';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

import MockInterviews from './pages/MockInterviews';

import RoadmapGenerator from './pages/RoadmapGenerator';

import CareerTools from './pages/CareerTools';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<LoginRegister />} />
          
          {/* Protected Routes */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/latest-ai" element={<ProtectedRoute><LatestAITech /></ProtectedRoute>} />
          <Route path="/skills" element={<ProtectedRoute><Skills /></ProtectedRoute>} />
          <Route path="/skill/:skillId" element={<ProtectedRoute><SkillDetails /></ProtectedRoute>} />
          <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
          <Route path="/quizzes" element={<ProtectedRoute><QuizSystem /></ProtectedRoute>} />
          <Route path="/mock-interviews" element={<ProtectedRoute><MockInterviews /></ProtectedRoute>} />
          <Route path="/roadmap" element={<ProtectedRoute><RoadmapGenerator /></ProtectedRoute>} />
          <Route path="/career-tools" element={<ProtectedRoute><CareerTools /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
          <Route path="/pyqs" element={<ProtectedRoute><CompanyPYQs /></ProtectedRoute>} />
          <Route path="/ai-mentor" element={<ProtectedRoute><AIMentor /></ProtectedRoute>} />
          <Route path="/daily-updates" element={<ProtectedRoute><DailyUpdates /></ProtectedRoute>} />
          <Route path="/gen-ai-trends" element={<ProtectedRoute><GenAITrends /></ProtectedRoute>} />
          <Route path="/playground" element={<ProtectedRoute><CodePlayground /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
