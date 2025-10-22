# Enterprise GitHub Pages Deployment Guide

This guide will help you deploy your Manual Cross Line Count app to GitHub Pages on your enterprise GitHub instance at **code.devsnc.com**.

## Prerequisites
- Access to enterprise GitHub at code.devsnc.com
- Git installed on your computer
- Authentication configured for code.devsnc.com

## Step-by-Step Deployment

### Step 1: Repository Already Exists

Your repository is already set up at:
`https://code.devsnc.com/mahmoud-hassan/manual-cross-line-count.git`

No need to create a new repository!

### Step 2: Verify Remote Configuration

Your git remote is already configured. Verify with:

```bash
git remote -v
```

You should see:
```
origin  https://code.devsnc.com/mahmoud-hassan/manual-cross-line-count.git (fetch)
origin  https://code.devsnc.com/mahmoud-hassan/manual-cross-line-count.git (push)
```

### Step 3: Homepage URL is Configured

The `homepage` in `package.json` is already set to:
```json
"homepage": "https://pages.code.devsnc.com/mahmoud-hassan/manual-cross-line-count"
```

This matches your enterprise GitHub Pages URL format.

### Step 4: Push Code to Enterprise GitHub

```bash
# Check current branch
git branch

# Add all files
git add .

# Commit changes
git commit -m "Prepare for GitHub Pages deployment"

# Push to enterprise GitHub
git push origin main
```

**Note**: If your branch is called `master` instead of `main`, use `master` in the commands above.

### Step 5: Deploy to GitHub Pages

Run the deployment command:

```bash
npm run deploy
```

This command will:
1. Build your app for production
2. Create a `gh-pages` branch
3. Deploy the built files to GitHub Pages

### Step 6: Configure GitHub Pages Settings

1. Go to your repository at: `https://code.devsnc.com/mahmoud-hassan/manual-cross-line-count`
2. Click on "Settings"
3. Look for "Pages" section (location may vary in enterprise GitHub)
4. Under "Source", make sure it's set to deploy from the `gh-pages` branch
5. Click "Save" if needed

### Step 7: Access Your Live App

After a few minutes, your app will be live at:

```
https://pages.code.devsnc.com/mahmoud-hassan/manual-cross-line-count
```

**Note**: The exact URL format may vary depending on your enterprise GitHub configuration. If this URL doesn't work, check with your GitHub administrator for the correct Pages URL format.

## Quick Deploy Commands

After the initial setup, you can deploy updates with just:

```bash
# Make your changes to the code
# Then commit them
git add .
git commit -m "Your commit message"
git push

# Deploy to GitHub Pages
npm run deploy
```

## Troubleshooting

### Issue: 404 Error After Deployment

**Solution**: 
1. Check that the `homepage` URL in `package.json` matches your GitHub username
2. Wait a few minutes for GitHub Pages to process the deployment
3. Clear your browser cache

### Issue: Blank Page After Deployment

**Solution**: 
1. Verify the `homepage` field in `package.json` is correct
2. Rebuild and redeploy: `npm run deploy`

### Issue: Git Push Rejected

**Solution**:
```bash
git pull origin main --rebase
git push origin main
```

### Issue: Permission Denied

**Solution**: 
1. Make sure you have push access to the repository
2. Check your GitHub authentication (SSH keys or personal access token)

## Updating the App

To update your deployed app:

1. Make changes to your code
2. Commit the changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. Deploy:
   ```bash
   npm run deploy
   ```

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file in the `public` folder with your domain name
2. Configure your domain's DNS settings to point to GitHub Pages
3. In GitHub repository settings → Pages, add your custom domain

## Notes

- The `gh-pages` branch is automatically created and managed by the deployment script
- Don't manually edit the `gh-pages` branch
- Always deploy from your main/master branch
- Deployment typically takes 1-5 minutes to go live
- Enterprise GitHub Pages configuration may differ from public GitHub
- Contact your GitHub administrator if you encounter issues

## Enterprise GitHub Specific Notes

- Your enterprise GitHub is at: `code.devsnc.com`
- Pages URL is expected to be: `pages.code.devsnc.com`
- Some features may differ from public GitHub
- Authentication and permissions are managed by your organization

## Support

For more information:
- Contact your enterprise GitHub administrator for Pages configuration
- [Create React App Deployment Guide](https://create-react-app.dev/docs/deployment/#github-pages)
- Check your organization's internal documentation for GitHub Pages
