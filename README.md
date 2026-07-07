<!-- FRONTEND README -->
<div style="background: #0d1117; color: #c9d1d9; padding: 40px; border-radius: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 100%;">

<h1 style="color: #f0f6fc; font-size: 32px; border-bottom: 1px solid #30363d; padding-bottom: 16px;"> QuickTask – Simple Task Manager with Payment
Unlock</h1>

<p style="color: #8b949e; font-size: 16px; margin-top: 8px;">QuickTask is a minimal full-stack SaaS application that allows users to manage personal
tasks. Users can register and log in, create and manage tasks (with a limit for free users),
and unlock unlimited tasks through a one-time payment using Stripe.</p>

<h2 style="color: #f0f6fc; font-size: 22px; margin-top: 32px;">🌐 Live Demo</h2>
<p><a href="https://quick-task-project.vercel.app" style="color: #58a6ff;">https://quick-task-project.vercel.app</a></p>

<h2 style="color: #f0f6fc; font-size: 22px; margin-top: 32px;">✨ Features</h2>
<ul style="list-style: none; padding: 0;">
<li style="padding: 6px 0;">✅ <strong>JWT Authentication</strong> - Secure login and registration</li>
<li style="padding: 6px 0;">✅ <strong>Task Management</strong> - Create, read, update, and delete tasks</li>
<li style="padding: 6px 0;">✅ <strong>Kanban Board</strong> - Three columns: To Do, In Progress, Done</li>
<li style="padding: 6px 0;">✅ <strong>Stripe Payment</strong> - One-time $5 payment to unlock unlimited tasks</li>
<li style="padding: 6px 0;">✅ <strong>Free Tier</strong> - Create up to 3 tasks for free</li>
<li style="padding: 6px 0;">✅ <strong>Premium Tier</strong> - Unlimited tasks after payment</li>
<li style="padding: 6px 0;">✅ <strong>Fully Responsive</strong> - Works on all devices</li>
</ul>

<h2 style="color: #f0f6fc; font-size: 22px; margin-top: 32px;">🛠️ Tech Stack</h2>
<ul style="list-style: none; padding: 0;">
<li style="padding: 4px 0;">🔹 <strong>Framework:</strong> Next.js 15 (App Router)</li>
<li style="padding: 4px 0;">🔹 <strong>Language:</strong> JavaScript</li>
<li style="padding: 4px 0;">🔹 <strong>Styling:</strong> Tailwind CSS</li>
<li style="padding: 4px 0;">🔹 <strong>Authentication:</strong> JWT (with better-auth)</li>
<li style="padding: 4px 0;">🔹 <strong>Payment:</strong> Stripe</li>
<li style="padding: 4px 0;">🔹 <strong>Icons:</strong> Lucide React</li>
</ul>

<h2 style="color: #f0f6fc; font-size: 22px; margin-top: 32px;">📁 Project Structure</h2>
<pre style="background: #161b22; padding: 16px; border-radius: 8px; color: #c9d1d9; overflow-x: auto;">
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.jsx
│   │   └── register/
│   │       └── page.jsx
│   ├── dashboard/
│   │   └── page.jsx
│   ├── tasks/
│   │   └── page.jsx
│   ├── layout.jsx
│   └── page.jsx
├── components/
│   ├── shared/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ConfirmModal.jsx
│   ├── tasks/
│   │   ├── AddTaskModal.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskColumn.jsx
│   │   └── KanbanBoard.jsx
│   └── homepage/
│       ├── Banner.jsx
│       ├── Featured.jsx
│       └── CallToAction.jsx
├── lib/
│   └── auth-client.js
├── utils/
│   └── api.js
└── middleware.js
</pre>

<h2 style="color: #f0f6fc; font-size: 22px; margin-top: 32px;">🚀 Getting Started</h2>

<h3 style="color: #f0f6fc; font-size: 18px;">Prerequisites</h3>
<ul style="list-style: none; padding: 0;">
<li style="padding: 4px 0;">• Node.js</li>
<li style="padding: 4px 0;">• npm or yarn</li>
<li style="padding: 4px 0;">• Backend server running (see backend README)</li>
</ul>

<h3 style="color: #f0f6fc; font-size: 18px; margin-top: 16px;">Installation</h3>
<pre style="background: #161b22; padding: 16px; border-radius: 8px; color: #c9d1d9; overflow-x: auto;">
git clone -- https://github.com/MHJony1/QuickTask_Project.git
cd quicktask-frontend
npm install
cp .env.example .env.local
</pre>

<h3 style="color: #f0f6fc; font-size: 18px; margin-top: 16px;">Environment Variables</h3>
<pre style="background: #161b22; padding: 16px; border-radius: 8px; color: #c9d1d9; overflow-x: auto;">
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
</pre>

<h3 style="color: #f0f6fc; font-size: 18px; margin-top: 16px;">Run Development Server</h3>
<pre style="background: #161b22; padding: 16px; border-radius: 8px; color: #c9d1d9; overflow-x: auto;">
npm run dev
# Visit http://localhost:3000
</pre>

<h2 style="color: #f0f6fc; font-size: 22px; margin-top: 32px;">📦 Deployment (Vercel)</h2>
<ol style="padding-left: 20px;">
<li>Push code to GitHub</li>
<li>Go to <a href="https://vercel.com" style="color: #58a6ff;">Vercel</a></li>
<li>Click "Add New" → "Project"</li>
<li>Import repository</li>
<li>Add environment variables</li>
<li>Click "Deploy"</li>
</ol>

<h2 style="color: #f0f6fc; font-size: 22px; margin-top: 32px;">🔗 API Endpoints</h2>
<table style="border-collapse: collapse; width: 100%;">
<tr style="background: #161b22;">
<th style="border: 1px solid #30363d; padding: 8px 12px; text-align: left;">Method</th>
<th style="border: 1px solid #30363d; padding: 8px 12px; text-align: left;">Endpoint</th>
<th style="border: 1px solid #30363d; padding: 8px 12px; text-align: left;">Description</th>
</tr>
<tr>
<td style="border: 1px solid #30363d; padding: 8px 12px;">POST</td>
<td style="border: 1px solid #30363d; padding: 8px 12px;">/api/auth/register</td>
<td style="border: 1px solid #30363d; padding: 8px 12px;">Register user</td>
</tr>
<tr>
<td style="border: 1px solid #30363d; padding: 8px 12px;">POST</td>
<td style="border: 1px solid #30363d; padding: 8px 12px;">/api/auth/login</td>
<td style="border: 1px solid #30363d; padding: 8px 12px;">Login user</td>
</tr>
<tr>
<td style="border: 1px solid #30363d; padding: 8px 12px;">GET</td>
<td style="border: 1px solid #30363d; padding: 8px 12px;">/api/tasks</td>
<td style="border: 1px solid #30363d; padding: 8px 12px;">Get all tasks</td>
</tr>
<tr>
<td style="border: 1px solid #30363d; padding: 8px 12px;">POST</td>
<td style="border: 1px solid #30363d; padding: 8px 12px;">/api/tasks</td>
<td style="border: 1px solid #30363d; padding: 8px 12px;">Create task</td>
</tr>
<tr>
<td style="border: 1px solid #30363d; padding: 8px 12px;">PUT</td>
<td style="border: 1px solid #30363d; padding: 8px 12px;">/api/tasks/:id</td>
<td style="border: 1px solid #30363d; padding: 8px 12px;">Update task</td>
</tr>
<tr>
<td style="border: 1px solid #30363d; padding: 8px 12px;">DELETE</td>
<td style="border: 1px solid #30363d; padding: 8px 12px;">/api/tasks/:id</td>
<td style="border: 1px solid #30363d; padding: 8px 12px;">Delete task</td>
</tr>
</table>


</div>
