# ASK WHY?! — viewer-submitted video questions

A complete static website designed for Netlify. No React, build step, database, or secrets required.

## Publish from GitHub to Netlify (recommended)

1. In [Netlify](https://app.netlify.com/), choose **Add new project → Import an existing project → GitHub**. Select `ask-why-site`, use the repository root as the publish directory (`.`), and leave the build command blank.
2. Under **Forms**, enable form detection if prompted. Netlify scans the static HTML form on deploy. Redeploy if detection was enabled after the first build.
3. Submit a real question from the live site and verify it appears under **Forms → ask-why-questions → Verified submissions**. Check Spam if needed. Configure email alerts under **Forms → Submission notifications** if desired.

From then on, edits pushed to the repository automatically update the site. Keep the public site separate from any existing websites. Add its Netlify URL to your YouTube profile (links in Shorts descriptions are generally not clickable).

## How questions work

The question form submits to Netlify Forms through a URL-encoded POST request. The form is present in actual static HTML so Netlify's deployment parser can register it. A honeypot helps prevent bot spam. Submissions are private by default, and **do not** appear on the public site automatically. You choose which submissions to feature.

Fields: question (required), category, nickname (optional), and consent to be credited (optional). If consent is not checked, **do not credit the nickname in your video**, even if one was submitted. Avoid repeating personal or sensitive information in videos.

## Add an answered video

1. Open `assets/script.js`.
2. Find `const ANSWERED_VIDEOS = [];` at the top.
3. Replace `[]` with a list of objects, like:

```javascript
const ANSWERED_VIDEOS = [
  {
    question: "How does a gas pump know when to stop?",
    category: "ENGINEERING",
    videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID_HERE",
    thumbnail: "https://i.ytimg.com/vi/VIDEO_ID_HERE/hqdefault.jpg",
    credit: "" // only add a handle if the submitter opted in
  }
];
```

4. Commit the change to GitHub. Netlify auto-deploys, and the Why Files cards appear automatically.

## Customize

- Change the site name, text, and footer in `index.html`.
- Main colors are in `assets/style.css` at the top (`--ink`, `--neon`).
- Example question cards are in `index.html` under `class="prompt-grid"`.
- The YouTube Shorts playlist links appear in the navigation, main hero, Why Files section, and thank-you page. To change the playlist URL later, replace `https://www.youtube.com/playlist?list=PLNKoyMrSgZ6s` in `index.html` and `thank-you.html`. Confirm this URL opens your complete playlist before sharing.

## Local preview

Open `index.html` to inspect the design, or in this folder run `python3 -m http.server 8080` and browse http://localhost:8080. **Submissions only become live when hosted on Netlify with Forms enabled.**

## Privacy notes

Keep submitted questions in your Netlify account, don't automatically publish submissions, and periodically delete messages containing personal details. The site asks viewers not to submit sensitive information. Optional nickname and opt-in are used only to decide whether to credit someone. For an audience of minors, avoid collecting email addresses or identifying details.