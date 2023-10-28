import './style.css'
import Experience from './Experience/Experience.js'
import { Analytics } from '@vercel/analytics/react';
window.experience = new Experience({
    targetElement: document.querySelector('.experience')
})

