import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: (username, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return api.post('/auth/login', formData);
  },
};

export const studentService = {
  getAll: () => api.get('/students'),
  create: (data) => api.post('/students', data),
};

// ── Class Config ────────────────────────────────────────────────────────────
export const classService = {
  getAll:  ()         => api.get('/classes/'),
  create:  (data)     => api.post('/classes/', data),
  update:  (id, data) => api.put(`/classes/${id}`, data),
  remove:  (id)       => api.delete(`/classes/${id}`),
};

// ── Exam Timetable ──────────────────────────────────────────────────────────
export const examTimetableService = {
  getAll:  (className, term) =>
    api.get('/exam-timetable/', { params: { class_name: className, term } }),
  create:  (data) => api.post('/exam-timetable/', data),
  update:  (id, data) => api.put(`/exam-timetable/${id}`, data),
  remove:  (id) => api.delete(`/exam-timetable/${id}`),
};

// ── Lecture Timetable ───────────────────────────────────────────────────────
export const lectureTimetableService = {
  getAll:  (className) =>
    api.get('/lecture-timetable/', { params: { class_name: className } }),
  upsert:  (data) => api.post('/lecture-timetable/', data),
  remove:  (className, day, period) =>
    api.delete('/lecture-timetable/', { params: { class_name: className, day, period } }),
};

export default api;

