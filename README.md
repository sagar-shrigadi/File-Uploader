## File Uploader

A full-stack file management application built with Node.js, Express.js and EJS as view engine. It allows users to create folders and upload files in them.

# Links

- Live site can be found [here](https://file-uploader-ewzt.onrender.com/)

## Features

- **Authentication:** Secure session-based authentication using Passport.js Local Strategy and Prisma session store.
- **Folder Management:** Full CRUD operations for organizing files into folders.
- **File Uploads:** Local file handling via Multer, integrated with cloud storage.
- **Cloud Storage:** Secure file storage hosted on Supabase Storage.
- **File Metadata:** View detailed information including file name, size, and upload timestamp.
- **File Downloading:** Direct download capability for uploaded files.
- **Validation:** File size restrictions and file-type filtering for security.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database & ORM:** PostgreSQL, Prisma ORM
- **Authentication:** Passport.js (Local Strategy)
- **File Handling:** Multer
- **Cloud Storage:** Supabase Storage
- **Frontend:** EJS

## Prerequisites

Ensure you have the following installed:

- Node.js (v18 or higher)
- PostgreSQL
- A Supabase account and storage bucket

## Installation

1.  Clone the repository:

```bash
git clone https://github.com
cd file-uploader
```

2.  Install dependencies:

```bash
npm install
```

3.  Create a .env file in the root directory and Set up your environment variables exactly like as shown in .env.example file.

4.  Run Prisma migrations to set up your database schema and generate the prisma client.

```bash
npx prisma migrate dev --name init
npx prisma generate
```

5.  Start the server:

```bash
npm start
```
