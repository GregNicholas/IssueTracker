# Issue tracking app with React and firebase

## Overview

This app is an issue tracking system, created so that an individual or members of a team can keep track of issues related to a project they are working on.

**_NOTE on refactoring_** After a review of the app, I realized I had not fixed an issue with state management. When the IssuesContext was added to the app, I just used a bare bones functionality, and a very "hacky" way of updating data while I worked on firebase management and other things. I have now added the reducer and refactored IssuesContext to make the code cleaner.

## Requirements/Features

- In the app, a user must be able sign up/login in order to view or add issues. - Authentication is set up using firebase, email, username and password sign up, log in
  with email, log out, and update profile.

- User must be able to create new issues, and edit/delete issues they have created.
  -There is a popup modal to confirm deletions.
- A user may comment on other issues as well, and only delete their own comments.
- Admin users may edit or delete any issues
- Issue form has fields for title and description. There are select dropdowns list to select issue type, category, and assignee. Radio buttons to set prioriity. Due date can be chosen
- Issues are displayed in a sortable table. Key info is visible on the table with color coding for urgency. Items are clickable to display more detail.
- There are simple charts to display quick statistics
- Data is updated in real time and stored in the firebase firestore database.
- The app is responsive to work on desktop or mobile devices. Collapsable navbar for smaller screens
- The form component is reusable for both Add and Edit functions.

### Built with

- [React](https://reactjs.org/) - JS library

- Custom hooks: useWindowWidthAndHeight to determine window size and either show the navbar
  at the top of the screen or in a closable side nav

- Context: AuthContext for all authentication functions, including current user's info
  IssuesContext fetches issues related data for use in the app.
- useReducer: issuesReducer is used with context to handle state

- Using css for a responsive design

### More dependencies

react-router-dom version 6.2.1 to implement component routing
react-bootstrap for some cards and buttons setup
react-table to build the sortable table
react-datepicker for setting due date in the form
react-minimal-pie-chart used to show stats
react-fontawesome icons

### Links

- Live Site URL: [Issue Tracker](https://csb-b1wuh3.netlify.app/)

### by Greg Schoenberg
