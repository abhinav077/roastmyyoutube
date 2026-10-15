# Roast My YouTube 🔥

An automated, viral web application that connects to a user's Google account with one click, analyzes their YouTube viewing engagement (Subscriptions, Liked Videos, and Playlists), and generates a savage, personalized AI roast with a downloadable social-media receipt card.

---

## ⚡ Features
- **1-Click Google OAuth**: Automatic authentication using Google OAuth 2.0 with read-only YouTube scopes (`youtube.readonly`).
- **100% Zero-Friction Flow**: No manual file downloads or Google Takeout needed. Once logged in, the app automatically fetches liked videos, subscriptions, and playlists in under 2 seconds.
- **Savage AI Roasting Engine**: Powered by **Google Gemini 2.0 Flash** (with an intelligent fallback heuristic engine if no API key is provided).
- **Diagnosed Archetypes & Cringe Meter**: Assigns a satirical persona (e.g. *The Over-Optimized Tech Bro*, *The 3 AM Rabbit Hole Addict*, *The Chronically Online Brainrot Streamer*) with an animated 1-100 cringe score.
- **Shareable Taste Receipt**: Thermal supermarket-receipt style card formatted with barcodes, itemized sins, and sarcastic metrics, with a 1-click **"Save Receipt (PNG)"** button for X/Twitter, Instagram Stories, and Discord.
- **Roast Spice Selector**: Switch between `MILD`, `SAVAGE`, and `💀 EMOTIONAL DAMAGE`.
- **Instant Demo Profiles**: Test the app immediately without any credentials using 3 pre-built personas.

---

## 🚀 Quick Start (Local Development)

### 1. Clone & Install
```bash
git clone <repo-url>
cd "roast my youtube"
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Google OAuth Credentials (for live account login)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth Config
NEXTAUTH_SECRET=a_random_32_character_string
NEXTAUTH_URL=http://localhost:3000

# Gemini AI API Key (optional - works with fallback if not provided)
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Google Cloud Setup for Multiple / Public Users

Follow these steps so **different users from anywhere** can sign in:

### Step 1: Create Project & Enable YouTube API
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (e.g., `Roast My YouTube`).
3. Navigate to **APIs & Services > Library**, search for **YouTube Data API v3**, and click **Enable**.

### Step 2: Configure OAuth Consent Screen
1. Go to **APIs & Services > OAuth consent screen**.
2. Select User Type: **External** (required for outside users to log in).
3. Fill in:
   - App Name: `Roast My YouTube`
   - User support email: your email
   - Developer contact info: your email
4. Click **Save and Continue**.
5. In **Scopes**, click **Add or Remove Scopes** and add:
   - `.../auth/youtube.readonly`
6. Click **Save and Continue**.

### Step 3: Enable Public Users (Crucial!)
Google OAuth projects have two publishing states:
- **Testing (Default)**: Only emails manually added under "Test Users" can log in. Anyone else gets an `access_denied` error.
- **In Production (For Any User to Log In)**:
  - On the **OAuth consent screen** page, under **Publishing status**, click **"Publish App"**.
  - A modal will warn you about app verification. Confirm to publish.
  - **Note on the "Unverified App" Screen**: Because `youtube.readonly` is a sensitive scope, users will see a screen saying *"Google hasn't verified this app"*. Users simply click **Advanced > Go to Roast My YouTube (unsafe)** to proceed. This is standard for indie/side projects and allows up to 100 new users before full verification!

### Step 4: Create OAuth Client ID
1. Go to **APIs & Services > Credentials**.
2. Click **Create Credentials > OAuth client ID**.
3. Application type: **Web application**.
4. Set Authorized origins and redirect URIs:
   - **For Local Testing**:
     - Authorized JavaScript origins: `http://localhost:3000`
     - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
   - **For Vercel Deployment** (add your Vercel URL once deployed):
     - Authorized JavaScript origins: `https://your-app-name.vercel.app`
     - Authorized redirect URIs: `https://your-app-name.vercel.app/api/auth/callback/google`
5. Copy the **Client ID** and **Client Secret**.

---

## 🌐 Deploying to Vercel

Deploying to Vercel is seamless:

### 1. Push code to GitHub
```bash
git init
git add .
git commit -m "Initial commit - Roast My YouTube"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Import into Vercel
1. Log in to [Vercel](https://vercel.com/) and click **Add New > Project**.
2. Import your GitHub repository.
3. In **Environment Variables**, add the following 5 variables:

| Variable Name | Value | Note |
| :--- | :--- | :--- |
| `GOOGLE_CLIENT_ID` | `xxx.apps.googleusercontent.com` | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | `GOCSPX-xxx` | From Google Cloud Console |
| `NEXTAUTH_SECRET` | Any strong 32+ char string | e.g. run `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` | Your actual Vercel domain |
| `GEMINI_API_KEY` | `AIzaSy...` | From [Google AI Studio](https://aistudio.google.com/app/apikey) |

4. Click **Deploy**.

### 3. Update Google Cloud with your Vercel Domain
Once Vercel gives you your live URL (e.g., `https://roast-my-youtube-xyz.vercel.app`):
1. Head back to **Google Cloud Console > Credentials**.
2. Click to edit your **OAuth 2.0 Client ID**.
3. Under **Authorized JavaScript origins**, add:
   ```text
   https://roast-my-youtube-xyz.vercel.app
   ```
4. Under **Authorized redirect URIs**, add:
   ```text
   https://roast-my-youtube-xyz.vercel.app/api/auth/callback/google
   ```
5. Click **Save**.

Now anyone with a Google account can visit your live Vercel link, sign in, and get roasted!

---

## 📊 API Quota & Costs (Completely Free)
- **YouTube Data API v3**: Google gives **10,000 free quota units per day**. Our app consumes **4 units** per user audit. That means you can roast **~2,500 users every single day for free** before hitting limits.
- **Gemini API**: Google AI Studio provides a free tier with high rate limits for `gemini-2.0-flash`. Even without an API key, our app has an automatic built-in fallback roast engine.

---

## 🛠 Tech Stack
- **Framework**: Next.js 15 (App Router, React 19, TypeScript)
- **Styling**: Tailwind CSS & Lucide React
- **Authentication**: NextAuth.js v4 (Google Provider)
- **AI Engine**: Google Generative AI SDK (`@google/generative-ai`)
- **Card Exporting**: `html-to-image` for crisp 2x PNG receipts
- **Celebration**: `canvas-confetti`
