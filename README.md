# Herbs Book — RoHerb Landing

Botanical recipe book landing page, ready for **GitHub Pages**.

## GitHub Pages

1. **Push this repo** to GitHub (see below if push failed).
2. In the repo: **Settings → Pages**.
3. Under **Source**, choose **Deploy from a branch**.
4. Branch: **main**, folder: **/ (root)**. Save.
5. The site will be at: `https://nickg-hm.github.io/herbs_book/`

The main entry point is **index.html** (RoHerb landing). The `.nojekyll` file ensures GitHub doesn’t run Jekyll and skip assets.

## If push failed (SSH)

Push from your machine after fixing SSH or use HTTPS:

```bash
cd "/Users/elizavetaborisova/Desktop/AI hackathon"

# If SSH fails, use HTTPS instead:
git remote set-url origin https://github.com/NickG-HM/herbs_book.git
git push -u origin main
```

If the repo already exists and has content, you may need to pull first (`git pull origin main --allow-unrelated-histories`) or coordinate with the repo owner.
