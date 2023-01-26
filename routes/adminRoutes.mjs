import express from "express";
import fs, { readFileSync } from 'fs';

const jobs = JSON.parse (fs.readFileSync('jobs.json', 'utf8'));
const messages = JSON.parse (fs.readFileSync('messages.json', 'utf8'));
const subscribers = JSON.parse (fs.readFileSync('subscribers.json', 'utf8'));
const applications = JSON.parse (fs.readFileSync('applications.json', 'utf8'));
const router = express.Router()

//GET Admin Home
router.get('/', (req, res) => {

    const totalJobs = jobs.length;
    const totalMessages = messages.length;
    const totalSubscribers = subscribers.length;
    const totalApplications = applications.length;


    res.render('admin', {layout: 'plain',
    totalJobs,
    totalMessages,
    totalSubscribers,
    totalApplications
});
});

//GET Admin Messages
router.get('/messages', (req, res) => {
    
    res.render('admin-messages', {layout: 'plain', messages});
});

//GET Admin Jobs
router.get('/jobs', (req, res) => {
    res.render('admin-jobs', {layout:'plain', jobs});
});

//GET Admin-Applications
router.get('/applications', (req, res) => {
    res.render('admin-applications', {layout:'plain', applications});
});

//GET Admin-Subscribers (it's created and wasn't there earlier to house the subscribers)
router.get('/subscribers', (req, res) => {
    res.render('admin-subscribers', {layout:'plain', subscribers});
});



export default router