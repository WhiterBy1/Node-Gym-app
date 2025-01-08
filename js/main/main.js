import {initializeWeekView, setupCalendar} from './calendar.js'
import { initializeCharts } from './charts.js';
document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    setupNavigation();
    initializeWeekView();
    setupCalendar();
});


function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
}