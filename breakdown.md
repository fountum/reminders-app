   ### Week of Nov. 20 2024 (week 1)  
   **Steven Duong**  
   1. Create GitHub repo
   2. Implementing reminder update feature
   3. Import passport starter files
   4. Modified authController and login.ejs to work with passport.js
   
   **Karn**  
   **Milan**  
   1. Milan and Karn implemented the deleting a reminder feature. 

   ### Week of Nov. 27 2024 (week 2)  
   **Steven Duong**  
   All of these changes are visible in the `feature/migrate-db` branch:  
   1. Implement Prisma (Install packages, create models)
   2. Migrate data to Prisma
   3. Modified CRUD operations in ReminderController to use new db
      1. View all reminders or a single for a specific user
      2. Create new reminders
      3. Update reminders
      4. Delete reminders
   4. Fully implemented user authentication and registration using passport js and prisma
   5. Added user authorization for reminders
      1. You must be logged in to use any `/reminders` or `/reminder` routes or methods
      2. You cannot view or modify other user's reminders
   6. Cleaned up branches  
   
   ### Week of Dec. 9 2024 (Week 4)
   **Karn**  
   Implemented admin session task

   1. Created admin dashboard.

   2.Added functionality for the admin to view all user sessions.

   3. Implemented the feature to terminate user sessions.

   4. Added ensureAdmin to restrict regular users from destroying sessions.

   5. Updated index.js to include new routes and middleware for admin session management.

   **Milan**

   1. Made general UI improvements

   2. Helped Karn in implementing the admin features

