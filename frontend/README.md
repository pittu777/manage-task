git checkout main
git pull origin main
2️⃣ Create New Branch From Main

Example:

git checkout -b feature/auth-backend

Now you are working on a new branch.

Check:

git branch

You should see:

- feature/auth-backend
  main
  3️⃣ Do Your Work

Code.
Test.
Make changes.

4️⃣ Commit
git add .
git commit -m "feat: implement login and signup backend"
5️⃣ Push That Branch
git push -u origin feature/auth-backend
