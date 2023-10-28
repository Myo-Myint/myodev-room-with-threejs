import './style.css'
import Experience from './Experience/Experience.js'
import { Analytics } from '@vercel/analytics/react';
window.experience = new Experience({
    targetElement: document.querySelector('.experience')
})

window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
