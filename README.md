# Shorter

Shorter is a user-friendly link shortening service that allows you to create shortened URLs and track their performance


# Features

- Shorten long URLs to easily shareable links
- User authentication via GitHub or email
- Click tracking for each shortened link
- User dashboard to manage and view link statistics

# Tech Stack

- React
- TypeScript
- Supabase
- TailwindCSS
- Zod
- React Hook Form
- Sonner

# Getting Started

## Prerequisites

- Node.js 22.5.^
- Npm 
- Supabase account

## Setup

1. Clone the repo
    ```bash
    git clone https://github.com/shadinmhd/shorter
    ```

2. Navigate to the cloned directory
    ```bash
    cd shorter
    ```
    
3. install npm dependencies
    ```bash
    npm install
    ```

4. Create a .env file in the root directory and add your Supabase credentials:
    ```bash
    cat .env.example > .env
    ```

5. Start the development server
    ```bash
    npm run dev
    ```

# Usage

1. Sign up or log in using your GitHub account or email.
2. Enter the long URL you want to shorten in the provided input field.
3. Click the "Shorten" button to generate a shortened link.
4. View your shortened links and their click statistics in your dashboard.
