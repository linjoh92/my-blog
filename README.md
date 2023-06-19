# Blog Assignment

Welcome to the final assignment! This repository serves as a starter kit for developing your own blog page, which could become part of your portfolio website.

This task is intended to enhance your understanding of full-stack web development, focusing on aspects like database interaction, authentication, and CRUD (Create, Read, Update, Delete) operations. By the end of this assignment, you'll gain practical experience in managing relational data, structuring and querying a PostgreSQL database, and handling user authentication.

## Technologies

1. **Next.js**: A powerful JavaScript framework developed by Vercel.
   https://nextjs.org/docs

2. **Supabase**: We'll use Supabase for our database (Postgres) and authentication needs.
   https://supabase.com/docs/reference/javascript/installing

3. **PostgreSQL**: An open-source relational database management system, known for its extensibility and SQL compliance.

4. **SWR**: A React Hooks library for data fetching, created by Vercel. SWR automatically manages caching, revalidation, and maintains a real-time, always-synced state. The name "SWR" is derived from the cache invalidation strategy stale-while-revalidate.
   https://swr.vercel.app/docs/getting-started

## Features

- Full-stack application
- Integration with PostgreSQL database
- CRUD functionality
- User authentication

## Getting Started

1. Clone this repository to your local system.
2. Navigate into the cloned repository.
3. Install the required packages using `npm install` or `yarn install`.
4. Create a `.env.local` file and populate it with the necessary Supabase credentials (Supabase URL and Supabase anon key). Refer to the example file (.env.local.example) in the root folder for guidance.
5. Run the development server with `npm run dev` or `yarn dev`.
6. To remove the existing GitHub connection and push to your own repository, execute the following commands in your terminal:
   Replace `<your-new-repository-url>` with the URL of your new repository on GitHub. This will reinitialize the git connection to your new repository.

## Requirements

### Passing Grade (Godkänt)

1. **Authentication**: Implement user registration and login using Supabase Auth. Users should be able to register, login, and logout.

2. **Database Tables and Relational Data**: Establish the following tables in your PostgreSQL database:

   - **Users**: A table for storing user information, managed by Supabase Auth.
   - **Posts**: A table for storing blog posts. Each post should relate to the user who created it (you), implying a one-to-many relationship.
   - **Comments**: A table for storing comments. Each comment should have relations with the user who wrote it and the post it belongs to, necessitating a relationship among the Users, Posts, and Comments tables.

3. **Comments**: Allow anyone to comment on posts. **Detta stämmer inte med text som finns i html kod**

4. **CRUD Operations**:

   - **Posts** Implement the nessecary CRUD operations for posts and comments. An authenticated user (you) should have the ability to create, read, update, and delete their own posts.

   - **Comments**: A visitor should be able to post a comment. An author should be able to delete a comment if it belongs to a post created by them.

5. **Data Sync**: Use SWR for synchronizing client and server data. Changes to the data should reflect immediately in the user interface. // - **Fråga omn denna! just nu har jag att hela sidan uppdateas 1 gpng per sekund**

6. **Image Upload**: Enable authors to upload an image to their post.

7. **Create post page**: Once the Authentication is in place, the create post page should be hidden and not accessable for non authenticated users.

### Excellent Grade (Väl Godkänt)

In addition to fulfilling the requirements for a passing grade, these advanced requirements challenge you to incorporate a higher level of complexity, enhancing your understanding of advanced web development concepts.

1. **Row-level Security**: Ensure that a user can only update or delete their own posts.

2. **Search Functionality**: Implement a search function allowing users to search for posts based on title.

3. **Nested Comments**: Enable users to reply to other comments.

## Assignment Submission

Upon completion of your assignment, please take the following steps to submit your work:

1. **Repository Access**: Share the URL of your GitHub repository with me. Make sure that I have been given access to the repository to review your code.

2. **Deployment**: Deploy your application to Vercel. Share the URL of the deployed application. Ensure that the application is accessible and functioning as expected on the deployed URL.

By sharing both the repository and the deployed URL, it will allow me to review both your code and the live version of your application.

## Tables

Below is the basic structure of the data tables that is the minimum requirement.

### Users:

id: uuid
email: text

### Posts:

id: uuid
title: text
user_id: uuid // foreign key to users table
slug: text // needs to be unique
created_at: timestamptz
body: json

### Comments:

id: uuid
author: text
created_at: timestamptz
post_id: uuid // foreign key to posts table
comment: text

## Deadline

The final deadline for submitting your assignment is **June 26th**. Please ensure your project is completed and submitted before this date. Respecting this deadline will give me a fair chance to review everyone's projects in a timely manner.

## Optional Features

Finished early and looking for a greater challenge? Consider adding these optional features to your blog:

1. **Profile Information**: Enhance your "Home" page and "About" page with your personal profile information. Make it stand out and represent your unique identity!
   This project is inspired by Lee Robinsons portfolio [website](https://leerob.io/). Please take inspiration from his minimalistic home & about page ✨

2. **Personalized Styles**: Bring your blog to life by adding your own styles and making it pop. Show off your skills with CSS and make your blog truly your own.

3. **TypeScript**: The project is already configured with TypeScript. If you're up for a challenge, consider converting the `.js` & `.jsx` files to `.tsx` and `.ts` files. Delve into the world of TypeScript and make your files TypeScript-friendly.

4. **Pagination**: As your blog grows, so does the list of blog posts. Implement pagination to make it easy for your readers to navigate through your posts.

5. **Prevent Bots**: Currently, any user can leave comments, even potential bots! To prevent spam comments, consider implementing reCAPTCHA. Learn more about it [here](https://www.google.com/recaptcha/about/).

Feel free to choose one or more from the list above, or come up with your own ideas to extend the functionality of your blog. Have fun and get creative!

---

Dive into coding, and let's create an impressive blog/portfolio page together! Good luck!
