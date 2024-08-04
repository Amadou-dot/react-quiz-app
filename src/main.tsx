// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QuestionsProvider } from './context/useQuestions.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
 <QuestionsProvider>
   <App />
 </QuestionsProvider>
)
