import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import OAuthCallback from './pages/OAuthCallback.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import Layout from './components/Layout.jsx';
import BookList from './pages/BookList.jsx';
import AddBook from './pages/AddBook.jsx';
import EditBook from './pages/EditBook.jsx';
import StudentList from './pages/StudentList.jsx';
import AddStudent from './pages/AddStudent.jsx';
import EditStudent from './pages/EditStudent.jsx';
import IssueList from './pages/IssueList.jsx';
import IssueBook from './pages/IssueBook.jsx';

function RequireAuth({ children }) {
  const token = localStorage.getItem('lms_token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<OAuthCallback />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/books" replace />} />
        <Route path="books" element={<BookList />} />
        <Route path="books/add" element={<AddBook />} />
        <Route path="books/:id/edit" element={<EditBook />} />
        <Route path="students" element={<StudentList />} />
        <Route path="students/add" element={<AddStudent />} />
        <Route path="students/:id/edit" element={<EditStudent />} />
        <Route path="issues" element={<IssueList />} />
        <Route path="issues/new" element={<IssueBook />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
