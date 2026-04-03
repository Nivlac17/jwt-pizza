# Curiosity Report: Automation Using Git Hooks

## Introduction
I chose to do a deep dive into Git Hooks, specifically **pre-commit**, for this report. I had heard of pre-commit before, but I wanted to dive more deeply into why it is so useful and what problems it solves. Git hooks stood out to me because they improve automation and can run important checks and improvements before bad code moves further into the development process.

## Why am I curious about Git Hooks?
My curiosity about Git hooks started in one of my first college coding classes. We were working in Python, and I ran into a problem that felt much bigger than it should have been: whitespace. Python depends heavily on correct spacing and indentation, and our autograder expected everything to match exactly. After spending hours manually fixing tabs and spaces -- long after I had discovered the actual solutions to the homework, I would still be working on formatting issues that were completely time consuming.

Near the end of the class, I was working in a study group when someone introduced me to **pre-commit**. That was the first time I saw how automation could solve an annoying and repetitive coding problem. I was able to use a tool to catch those problems before I submitted code, and in many cases it was able to implement automatic and simple fixes. As I have taken this class, I have been reminded of this experience, and as we have used many similar tools such as the CI workflow, I have become more curious about Git hooks and how they fit into QA and DevOps practices.

## What Are Git Hooks?
Git hooks are scripts that Git runs automatically when certain actions happen. These actions include committing, merging, or pushing code. Hooks allow developers to automate checks and tasks at important points in the development workflow.

Common Functionality includes:
- checking for trailing whitespace
- Run a Code quality program such as a linter
- Run tests before a commit
- Validate commit messages
- Automatically update code to match company standards

Git stores these scripts in a `.git/hooks` directory of your repository. Once the script is correctly named and made executable, Git will run it automatically when the applicable event occurs.


## How To Build a Simple Git Hook
Initialize a Git repository using the command: 
```bash 
git init 
```
Open the **.git** folder in your project and select the **hooks** folder inside **.git**. Inside this folder you should see multiple sample files for Git Hooks. These are ususally in a the format of Bash Scripts.

Find the **pre-commit.sample** file and remove the **.sample** extension so the file is named:**pre-commit**

Make sure the hook is executable:

```bash
chmod +x .git/hooks/pre-commit
```


### Client-Side Hooks
Client-side hooks run on a developer’s machine. These happen during local actions such as: `commit`, `merge`, `checkout`, `rebase`, and `push`.

Some important client-side hooks include:
- **pre-commit**: runs before a commit is finalized
- **commit-msg**: checks the commit message before the commit succeeds
- **pre-push**: runs before code is pushed to a remote repository

These hooks are useful because they provide immediate feedback. A developer can catch problems before code ever leaves their machine.

### Server-Side Hooks
Server-side hooks run on the remote repository when code is pushed. These include:
- **pre-receive**
- **update**
- **post-receive**

These are more useful for team-wide enforcement because they do not depend on each developer configuring tools locally. If the server rejects the push, the rules apply to everyone.

## What is Pre-Commit
The Git hook that I have looked into most is **pre-commit**. This hook runs before a commit is finalized. Its purpose is to inspect the updated code that is about to be committed.

This is a useful tool because it reveals bugs sooner in the development process instead of discovering formatting problems, linting issues, or failing tests later in CI, which can take many minutes to run, pre-commit can block the commit immediately and tell the developer what to fix. It saves time by running local checks before sending code to slower external servers, and as demonstrated by my own experience, it removes tedious manual checking and replaces it with fast automated feedback for simple but common issues like spacing, formatting, and style rules.

## Why Git Hooks Matter for QA
Git hooks are very useful to quality assurance because they help catch problems as early as possible. In QA, the earlier a defect is found, the cheaper and easier it is to fix. Git hooks support this by adding automated checks directly into the development workflow. Instead of waiting for a bug to be found during later testing, some issues can be caught before the code is even committed.

Examples of QA-related uses for hooks include:
- preventing commits with formatting errors
- checking for trailing whitespace
- validating that tests pass before a push
- enforcing commit message structure for cleaner project history

This helps create cleaner code, supports consistency, and reduces simple mistakes -- all major goals of QA.

## Why Git Hooks Matter for DevOps
One of the main ideas in DevOps is that development and operations should work together through repeatable automated processes. Git hooks are an important example of this. They automate tasks that developers might otherwise forget or skip. This makes the workflow more reliable and reduces the chance of human error.

Hooks also support the DevOps idea of shifting quality checks earlier in the pipeline. Instead of relying only on CI/CD systems to detect problems, hooks move some of those checks to the developer’s local environment. That means feedback happens faster, and fewer broken commits reach shared branches.

## What I Learned
While reading and experimenting with Git hooks, I was impressed with how they work both similarly to and in connection with CI pipelines. In class, we relied heavily on a CI pipeline to automatically handle differences between our local development environment and our deployed instance. Similarly, pre-commit can test and validate code before it leaves the development environment.

I also learned that Git hooks have limits. Client-side hooks are excellent for fast feedback, but they do not guarantee team-wide enforcement unless everyone installs them. That makes them most effective when combined with CI pipelines and other shared automation tools.

## Sources
- Pro Git, “Customizing Git - Git Hooks”  
  https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks

- Pro Git, "githooks - Hooks used by Git"
  https://git-scm.com/docs/githooks

- GitGuarian "What are GitHooks? Explained in 5 minutes"
  https://www.youtube.com/watch?v=1OFiiPretCM

- pre-commit documentation  
  https://pre-commit.com/

