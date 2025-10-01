# Git & GitHub Workflow Handbook
*Your Complete Guide to Professional Git Workflow*

---

## 🚀 GitHub Workflow Cheat Sheet for Future Work

### **1. Starting a New Feature**

```bash
# Switch to main and get latest changes
git checkout main
git pull origin main

# Create and switch to new feature branch
git checkout -b feature/your-feature-name

# Start coding...
```

### **2. Daily Development Workflow**

```bash
# Check current status
git status

# Stage your changes
git add .

# Commit with meaningful message
git commit -m "feat(component): description of what you did"

# Keep your branch updated (do this daily!)
git fetch origin
git rebase origin/main
```

### **3. Before Creating PR**

```bash
# Get latest changes from main
git fetch origin
git rebase origin/main

# Squash commits into one (optional but recommended)
git reset --soft origin/main
git commit -m "feat(component): complete feature description"

# Push to GitHub
git push origin feature/your-feature-name

# Create PR via GitHub UI
```

### **4. After PR is Merged**

```bash
# Switch back to main
git checkout main

# Pull the latest (including your merged changes)
git pull origin main

# Delete the feature branch (cleanup)
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

---

## 🔄 Why Your Lead Wants You to Use Rebase (Not Merge)

### **The Problem with Merge Commits**

When you use `git pull` (which creates merge commits), your Git history looks like this:

```
* Merge branch 'main' into feature/my-feature
|\
| * Someone else's commit
| * Another commit
* | Your commit
* | Your other commit
|/
* Base commit
```

This creates a "diamond" shape that clutters the history.

### **The Beauty of Rebase**

With `git pull --rebase` or `git rebase`, your history looks clean:

```
* Your commit (moved on top)
* Your other commit (moved on top)
* Someone else's commit (from main)
* Another commit (from main)
* Base commit
```

This creates a **linear history** that's easy to read.

---

## 🎯 Benefits of Rebasing

### **1. Clean History**
```bash
# Bad (merge commits)
git log --oneline
a1b2c3d Merge branch 'main' into feature
d4e5f6g My actual change
g7h8i9j Merge branch 'main' into feature
j1k2l3m Another actual change

# Good (rebased)
git log --oneline
a1b2c3d My actual change
d4e5f6g Another actual change
g7h8i9j Someone else's work
```

### **2. Easier Code Reviews**
- Reviewers see only your actual changes
- No confusing merge commits to ignore
- Each commit represents real work

### **3. Better Git Blame**
- When you search for who changed a line, you see the actual author
- Not someone who just merged branches

### **4. Easier Debugging**
- `git bisect` works better with linear history
- Easier to find when bugs were introduced

---

## 📋 Daily Commands Cheat Sheet

### **Morning Routine (Start of Day)**
```bash
git checkout main
git pull origin main --rebase
git checkout your-feature-branch
git rebase main
```

### **During Development**
```bash
# Save your work frequently
git add .
git commit -m "wip: working on component"

# Update with latest main (do this often!)
git fetch origin
git rebase origin/main
```

### **Before Going Home**
```bash
# Push your work (backup)
git push origin your-feature-branch
```

### **When Feature is Complete**
```bash
# Clean up commits (squash)
git reset --soft origin/main
git commit -m "feat(component): complete feature with tests"

# Final rebase
git rebase origin/main

# Push and create PR
git push origin your-feature-branch --force-with-lease
```

---

## ⚠️ Important Rebase Rules

### **DO's**
✅ Always rebase feature branches onto main  
✅ Use `git pull --rebase` instead of `git pull`  
✅ Rebase daily to stay current  
✅ Use `--force-with-lease` when force pushing  

### **DON'Ts**
❌ Never rebase shared/public branches (like main)  
❌ Don't rebase if others are working on your branch  
❌ Don't use `git pull` without `--rebase` flag  

---

## 🛠️ Configure Git for Rebase by Default

Run these once to make rebase the default:

```bash
# Make pull always rebase
git config --global pull.rebase true

# Make new branches track remote automatically
git config --global branch.autoSetupRebase always

# Better conflict resolution during rebase
git config --global rerere.enabled true

# Set your identity
git config --global user.name "Your Name"
git config --global user.email "your.email@wsp.com"

# Use VS Code as default editor
git config --global core.editor "code --wait"
```

---

## 🚨 Handling Rebase Conflicts

When you get conflicts during rebase:

```bash
# 1. Fix conflicts in VS Code (resolve the <<<< >>>> markers)

# 2. Stage the resolved files
git add .

# 3. Continue the rebase
git rebase --continue

# If too many conflicts, you can abort
git rebase --abort
```

---

## 🔧 Repository Migration Process

*If you ever need to migrate from one repository to another:*

```bash
# 1. Rename old remote
git remote rename origin old-repo

# 2. Add new remote
git remote add origin https://github.com/new-repo.git

# 3. Fetch from new repo
git fetch origin

# 4. Create local main branch
git checkout -b main origin/main

# 5. Switch to your feature branch
git checkout your-feature-branch

# 6. Rebase on new main
git rebase main

# 7. Squash commits (if needed)
git reset --soft main
git commit -m "Your commit message"

# 8. Push to new repo
git push origin your-feature-branch
```

---

## 📊 Quick Comparison

| Merge Approach | Rebase Approach |
|---|---|
| `git pull` | `git pull --rebase` |
| Creates merge commits | Linear history |
| Cluttered git log | Clean git log |
| Hard to code review | Easy to code review |
| Complex bisecting | Simple bisecting |

---

## 🎯 Commit Message Best Practices

### **Format:**
```
type(scope): description

- feat(nav): add new navigation component
- fix(auth): resolve login timeout issue
- docs(readme): update installation instructions
- style(css): fix button alignment
- refactor(utils): simplify date formatting
- test(auth): add unit tests for login
```

### **Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

---

## 🆘 Emergency Commands

### **Undo Last Commit (Keep Changes)**
```bash
git reset --soft HEAD~1
```

### **Undo Last Commit (Lose Changes)**
```bash
git reset --hard HEAD~1
```

### **Abort Current Rebase**
```bash
git rebase --abort
```

### **Force Push Safely**
```bash
git push origin branch-name --force-with-lease
```

### **Stash Current Work**
```bash
git stash push -m "work in progress"
git stash pop  # to get it back
```

---

## 🎓 Summary for Your Lead

Your lead wants rebase because it:

1. **Keeps history clean** - easier for team to understand
2. **Makes code reviews better** - only see real changes
3. **Follows industry best practices** - most professional teams use this
4. **Makes debugging easier** - linear history is easier to navigate
5. **Reduces noise** - no unnecessary merge commits

**Remember**: The goal is to make your commits look like they were written on top of the latest main branch, even if you started them days ago!

---

## 📱 Quick Reference Card

### **Most Used Commands**
```bash
# Daily workflow
git status
git add .
git commit -m "message"
git fetch origin
git rebase origin/main
git push origin branch-name

# Starting new work
git checkout main
git pull origin main --rebase
git checkout -b feature/new-feature

# Finishing work
git reset --soft origin/main
git commit -m "feat: complete feature"
git push origin feature-name
```

### **Useful Aliases**
Add these to your git config:
```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.lg "log --oneline --graph --decorate"
```

---

*This handbook was created during the migration from Azure DevOps to GitHub on October 1, 2025.*

**Keep this handy for all your future Git work! 📚**
