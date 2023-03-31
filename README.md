# Job Board Documentation
The Job board is a Next.js-based web application that provides a simple frontend for users to view, search, and filter job listings. It also includes an admin dashboard for managing jobs and tags. This document will guide you through the installation process, provide an overview of the platform, and describe its key features.

## 1. Installation and Running the Application
To install and run the Job Board application, follow these steps:

Ensure that you have Node.js and npm installed on your system. If you don't, visit the Node.js website to download and install the latest version.

Clone the Job Board repository from GitHub:


```
git clone https://github.com/davik20/job-list.git
```
```
cd job-lit
```

```
npm install
```

Run the development server:

```
npm run dev

```
Open your web browser and navigate to http://localhost:3000 to view the running application.


## 2. User Interface and Features

The Job Board provides a clean and simple frontend for users to interact with job listings. The main features include:

##### Job Listings: 
Users can view a list of jobs on the main page, with each job displaying its title, company. Job listings are displayed in a responsive grid layout that adapts to various screen sizes.

##### Search: 
Users can search for jobs using keywords, which will filter the job listings to display only those that contain the search terms in the job title or description.

##### Filtering: 
Users can filter job listings based on tags, date created, or alphabetical order. By selecting one or multiple tags, users can narrow down the list of jobs to those that match the chosen criteria. Filtering by date created will allow users to view jobs in chronological order, while alphabetical order will sort jobs by their titles.



## 3. Admin Dashboard and Features
The Job Board also includes an admin dashboard with additional features for managing job listings and tags. To access the admin dashboard, admins must log in using their credentials. The key features of the admin dashboard include:

##### Login: 
Admins can securely log in to the admin dashboard using their email and password by visiting http://localhost:3000/admin. Once logged in, they can manage job listings and tags. 

##### Job Management:
Admins can create, edit, and delete job listings. When creating or editing a job, they can input the job title, description, company, location, and associated tags. Admins can also view a list of all job listings with options to edit or delete each job.

Tag Management: Admins can create, edit, and delete tags used for filtering job listings. This allows them to maintain a consistent and relevant set of tags for users to filter jobs by.

Analytics: The admin dashboard may also provide basic analytics, such as the number of job listings created and the most popular tags, giving admins insight into
