# Modern Developer Portfolio

Live link : https://navanee-s-portfolio.vercel.app/

A responsive, high-performance developer portfolio website featuring a premium dark-glass UI, interactive modules, micro-animations, and a serverless contact email system.

## ✨ Features

- **Interactive Panel Layout**: A smooth desktop layout featuring glassmorphism and modern UI components.
- **Dynamic Greetings**: Welcomes visitors with personalized greetings based on their local time of day.
- **Micro-Animations**: Hover-triggered scales, glowing gradients, count-up animation statistics, and organic button ripples.
- **Education Timeline**: A responsive marker vertical timeline highlighting academic achievements.
- **Skills Grid**: Dynamic hover tiles showcasing core technical proficiencies.
- **Responsive Navigation**: Adapts from a sleek sidebar menu on desktop to an elegant floating tab bar on mobile devices.
- **White & Orange Contact Form Emailer**: Sends secure emails through Nodemailer via a Vercel Serverless Function (`api/sendEmail.js`) formatted in a customized orange/white HTML email layout.

## 🛠️ Built With

- **HTML5 & CSS3**: Structured semantically and styled using modern CSS variables, Flexbox, CSS Grid, and custom animations.
- **Vanilla JavaScript**: Lightweight, framework-free interactive logic.
- **Nodemailer & Node.js**: Secure mail delivery implementation.

## 🚀 Getting Started

### Prerequisites

- Node.js installed locally.
- A Gmail account with an App Password enabled (if using Gmail SMTP).

### Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/deadpool2003/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your credentials:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   ```

4. **Run Serverless Function locally (if using Vercel CLI):**
   ```bash
   vercel dev
   ```

## 📂 Project Structure

```
├── api/
│   └── sendEmail.js      # Serverless Node.js mail handling function
├── css/
│   └── style.css         # Modern styling and responsive declarations
├── images/               # Image resources
├── index.html            # Primary structure & metadata layout
├── script.js             # Core interactive logic (slider, animations, forms)
├── package.json          # Node dependencies and build tasks
└── README.md             # Project documentation
```
