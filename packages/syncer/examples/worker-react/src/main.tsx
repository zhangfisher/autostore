/**
 * Worker React 示例 - 入口文件
 */

import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
