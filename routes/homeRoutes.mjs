import express from "express";
import fs, { readFileSync } from 'fs';

const jobs = JSON.parse (fs.readFileSync('jobs.json', 'utf8'));
const messages = JSON.parse (fs.readFileSync('messages.json', 'utf8'));
const subscribers = JSON.parse (fs.readFileSync('subscribers.json', 'utf8'));
const applications = JSON.parse (fs.readFileSync('applications.json', 'utf8'));

// console.log(jobs)

const router = express.Router()


//GET Home
router.get('/', (req, res) => {

    let marketingJobs;
    let customerServiceJobs;
    let humanResourceJobs;
    let projectManagementJobs;
    let businessDevelopmentJobs;
    let salesAndCommunicationJobs;
    let teachingAndEducationJobs;
    let designAndCreativeJobs;

    marketingJobs = jobs.filter((e) =>{
        return e.category == 'marketing'
    })

    const tmarketingJobs = marketingJobs.length 

    customerServiceJobs = jobs.filter((e) =>{
        return e.category == 'customer service'
    })

    const tcustomerServiceJobs = customerServiceJobs.length

    humanResourceJobs = jobs.filter((e) =>{
        return e.category == 'human resource'
    })

    const thumanResourceJobs = humanResourceJobs.length

    projectManagementJobs = jobs.filter((e) =>{
        return e.category == 'project management'
    })

    const tprojectManagementJobs = projectManagementJobs.length

    businessDevelopmentJobs = jobs.filter((e) =>{
        return e.category == 'business development'
    })
    const tbusinessDevelopmentJobs = businessDevelopmentJobs.length

    salesAndCommunicationJobs = jobs.filter((e) =>{
        return e.category == 'sales & communication'
    })

    const tsalesAndCommunicationJobs = salesAndCommunicationJobs.length

    teachingAndEducationJobs = jobs.filter((e) =>{
        return e.category == 'teaching & education'
    })

     const tteachingAndEducationJobs = teachingAndEducationJobs.length

    designAndCreativeJobs = jobs.filter((e) =>{
        return e.category == 'design & creative'
    })

    const tdesignAndCreativeJobs = designAndCreativeJobs.length

    const fiveJobs = jobs.slice(0,3)
    console.log(fiveJobs)

    res.render('index', {
        tmarketingJobs, 
        tcustomerServiceJobs, 
        thumanResourceJobs, 
        tprojectManagementJobs, 
        tbusinessDevelopmentJobs, 
        tsalesAndCommunicationJobs,
        tteachingAndEducationJobs,
        tdesignAndCreativeJobs,
        fiveJobs
     });
});

//GET About
router.get('/about', (req, res) => {
    res.render('about');
});

//GET Single Category
router.get('/category/:category', (req, res) => {

    const category = req.params.category
    const categoryJobs = jobs.filter((e) => { 
        return e.category == category})
       
    res.render('category', {categoryJobs, category})
});

//GET Contact
router.get('/contact', (req, res) => {
    res.render('contact');
});

//GET Post-A-Job
router.get('/post-a-job', (req, res) => {
    res.render('post-a-job');
});

//GET Latest Jobs
router.get('/latest-jobs', (req, res) => {

    res.render('latest-jobs', {jobs});
});

//GET Job-detail
// router.get('/job-detail/:id', (req, res) => {
//     res.render('job-detail');
// });

//GET Latest-Jobs
router.get('/job-detail/:id', (req, res)=>{

    const jobId = req.params.id
    const foundJob = jobs.find((x)=>{
        return x.jobid == jobId
    })
// console.log(foundJob)
    res.render('job-detail', {foundJob})

})


//POST Job
router.post('/post-a-job', (req, res) => {
    
    const{title, location, salary, category, description} = req.body
    // console.log(req.body)

    let myJobId = Math.trunc(Math.random() * 9999)
    myJobId = myJobId.toString()

    if (myJobId.length < 4){ 
        myJobId = '0' + myJobId
    }

    const newJob = {
    jobid: myJobId,
    title: title,
    location: location,
    salary: salary,
    category: category,
    description: description
}

jobs.unshift(newJob)
const jobStringed = JSON.stringify(jobs)
fs.writeFileSync('jobs.json', jobStringed)
res.render('post-a-job');


    res.render('post-a-job');
});


//POST Messages
router.post('/send-message', (req, res) => {
    
    const{name, email, subject, message} = req.body
   
    const newMessage = {
    name: name,
    email: email,
    subject: subject,
    message: message
}

messages.unshift(newMessage)
const messagesStringed = JSON.stringify(messages)
fs.writeFileSync('messages.json', messagesStringed)
res.render('contact');
});



//POST Subscribers
router.post('/subscribe', (req, res) => {
    
    const {email} = req.body
   
    const newSubscriber = {
    email: email
}

subscribers.unshift(newSubscriber)
const subscribersStringed = JSON.stringify(subscribers)
fs.writeFileSync('subscribers.json', subscribersStringed)
res.redirect('/');

});

//POST Application
router.post('/apply', (req, res) => {
    
    const {name, email, portfolio, jobid, coverletter} = req.body
    const newApplication = {
        name: name,
        email: email,
        portfolio: portfolio,
        jobid: jobid,
        coverletter: coverletter
    }

    applications.unshift(newApplication)
    const applicationsStringed = JSON.stringify(applications)
    fs.writeFileSync('applications.json', applicationsStringed)
    res.redirect('/');

});

router.post('/search', (req, res) =>{

    let searchTerm = req.body.search
    let searchCategory = req.body.category
    let searchLocation = req.body.location

    searchTerm = new RegExp(searchTerm, 'i')

    const searchJobs = jobs.filter((e) => {

        const title = e.title
        const category = e.category
        const location = e.location

        const qualified = title.match(searchTerm) && category == searchCategory && location == searchLocation

        // return title.match(searchTerm)
        return qualified

    })

    res.render('search-page', {searchJobs})
})


export default router