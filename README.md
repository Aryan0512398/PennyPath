# 🪙 PennyPath - Expense Tracker App

**[Live Demo →](https://penny-path-flax.vercel.app/)**  
**[GitHub Repo →](https://github.com/Aryan0512398/PennyPath)**

PennyPath is a modern, intuitive expense tracker that helps you manage your money smartly. From creating budgets to tracking expenses and visualizing your spending—PennyPath makes personal finance simple and efficient.

## 🚀 Features

- 💼 **Create & Manage Budgets** with names, limits, and custom icons
- 💸 **Track Expenses** under each budget with rich UI
- 📊 **Visual Dashboards** including progress rings and animated counters
- 🧠 **AI Tip of the Day** for better money habits (custom feature)
- 🔒 **Authentication** powered by [Clerk](https://clerk.com)
- 🧩 **Component-based UI** using [ShadCN UI](https://ui.shadcn.com)
- ⚙️ **Built with Next.js 15**, App Router & Server Components
- 🛢️ **Database & ORM**: PostgreSQL + Drizzle ORM

## 🛠️ Tech Stack

| Tech            | Description                     |
|-----------------|---------------------------------|
| **Next.js 15**  | App Router, Server Components   |
| **ShadCN/UI**   | Accessible, composable UI       |
| **Tailwind CSS**| Utility-first styling           |
| **Drizzle ORM** | Type-safe SQL ORM               |
| **PostgreSQL**  | Relational database             |
| **Clerk**       | Authentication & user sessions  |
| **Vercel**      | Hosting and deployment          |

## 📦 Getting Started

```bash
git clone https://github.com/Aryan0512398/PennyPath.git
cd PennyPath
npm install
```

Create a `.env.local` file in the root with the following:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Clerk Routing
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/sign-in

# PostgreSQL DB
NEXT_PUBLIC_DATABASE_URL=your_postgres_url
```

> ⚠️ Never commit your `.env.local` to Git.

Then run the app locally:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to start tracking your expenses.

PennyPath uses **Clerk** for secure authentication. Users can sign up, log in, and manage their personal expense data safely and privately.

🚧 Planned Features:
- Add recurring expense support  
- Export budgets/expenses as CSV or PDF  
- In-app notifications & reminders  
- Enhanced mobile experience  
- Analytics by category or time period  

Deployed on **Vercel**: https://penny-path-flax.vercel.app

Made with ❤️ by [Aryan0512398](https://github.com/Aryan0512398)
