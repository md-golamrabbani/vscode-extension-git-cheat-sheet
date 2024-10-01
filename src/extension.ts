import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("gitCheatsheet.show", () => {
    const panel = vscode.window.createWebviewPanel(
      "gitCheatsheet",
      "Git Cheatsheet",
      vscode.ViewColumn.One,
      { enableScripts: true }
    );

    panel.webview.html = getCheatSheetHtml();

    panel.webview.onDidReceiveMessage((message) => {
      if (message.command === "copyToClipboard") {
        vscode.env.clipboard.writeText(message.text).then(() => {
          vscode.window.showInformationMessage("Copied to clipboard!");
        });
      }
    });
  });

  context.subscriptions.push(disposable);
}

function getCheatSheetHtml(): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Git Cheatsheet</title>
        <style>
          .git_cheat_sheet {
            font-family: monospace;
          }

          .toc-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            width: 100%;
            text-decoration: none;
            color: inherit;
          }

          .toc-dots {
            flex: 1;
            border-bottom: 1px dotted #000;
            margin-left: 10px;
            margin-right: 10px;
            margin-bottom: 6px;
          }

          table {
            width: 100%;
          }

          table .command {
            background-color: #0078d7;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.25rem 0.5rem;
            margin-top: 0.25rem;
            margin-bottom: 1rem;
          }

          table .command * {
            all: unset;
          }
        </style>
    </head>
    <body>
        <h1>Git Cheatsheet</h1>

        <div class="git_cheat_sheet">
          <p>
            Here's a comprehensive Git command cheat sheet for commonly used Git operations
          </p>

          <p class="center">
            Table of contents
          </p>

          <div class="toc-container">
            <a href="#1" class="toc-item">
              <span class="toc-title">Basic Git Commands</span>
              <span class="toc-dots"></span>
              <span class="toc-count">14</span>
            </a>

            <a href="#2" class="toc-item">
              <span class="toc-title">Branching</span>
              <span class="toc-dots"></span>
              <span class="toc-count">9</span>
            </a>

            <a href="#3" class="toc-item">
              <span class="toc-title">Pushing and Pulling</span>
              <span class="toc-dots"></span>
              <span class="toc-count">7</span>
            </a>

            <a href="#4" class="toc-item">
              <span class="toc-title">Stashing</span>
              <span class="toc-dots"></span>
              <span class="toc-count">7</span>
            </a>

            <a href="#5" class="toc-item">
              <span class="toc-title">Resetting and Reverting</span>
              <span class="toc-dots"></span>
              <span class="toc-count">5</span>
            </a>

            <a href="#6" class="toc-item">
              <span class="toc-title">Cleaning</span>
              <span class="toc-dots"></span>
              <span class="toc-count">3</span>
            </a>

            <a href="#7" class="toc-item">
              <span class="toc-title">Tagging</span>
              <span class="toc-dots"></span>
              <span class="toc-count">8</span>
            </a>

            <a href="#8" class="toc-item">
              <span class="toc-title">Rebase</span>
              <span class="toc-dots"></span>
              <span class="toc-count">3</span>
            </a>

            <a href="#9" class="toc-item">
              <span class="toc-title">Collaboration (with remotes)</span>
              <span class="toc-dots"></span>
              <span class="toc-count">4</span>
            </a>

            <a href="#10" class="toc-item">
              <span class="toc-title">Viewing and Comparing</span>
              <span class="toc-dots"></span>
              <span class="toc-count">6</span>
            </a>

            <a href="#11" class="toc-item">
              <span class="toc-title">Git Ignore</span>
              <span class="toc-dots"></span>
              <span class="toc-count">1</span>
            </a>

            <a href="#12" class="toc-item">
              <span class="toc-title">Submodules</span>
              <span class="toc-dots"></span>
              <span class="toc-count">4</span>
            </a>
          </div>

          <h3 id="1"># Basic Git Commands</h3>
          <table>
            <tbody>
              <tr>
                <td>
                  Initialize a new Git repository in your directory.
                  <br>
                  <div class="command">
                    <code>git init</code>
                    <button onclick="copyCommand('git init')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Clone a remote repository to your local machine.
                  <br>
                  <div class="command">
                    <code>git clone &lt;repo-url&gt;</code>
                    <button onclick="copyCommand('git clone &lt;repo-url&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Show the status of working directory and staging area.
                  <br>
                  <div class="command">
                    <code>git status</code>
                    <button onclick="copyCommand('git status')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Add a file to the staging area.
                  <br>
                  <div class="command">
                    <code>git add &lt;file&gt;</code>
                    <button onclick="copyCommand('git add &lt;file&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Add all changes to the staging area.
                  <br>
                  <div class="command">
                    <code>git add .</code>
                    <button onclick="copyCommand('git add .')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Commit changes with a message.
                  <br>
                  <div class="command">
                    <code>git commit -m "message"</code>
                    <button onclick="copyCommand('git commit -m &quot;message&quot;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Add and commit tracked files in one step.
                  <br>
                  <div class="command">
                    <code>git commit -am "message"</code>
                    <button onclick="copyCommand('git commit -am &quot;message&quot;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Show the commit history.
                  <br>
                  <div class="command">
                    <code>git log</code>
                    <button onclick="copyCommand('git log')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Show concise commit history (one line per commit).
                  <br>
                  <div class="command">
                    <code>git log --oneline</code>
                    <button onclick="copyCommand('git log --oneline')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Show differences between your working directory and staging area.
                  <br>
                  <div class="command">
                    <code>git diff</code>
                    <button onclick="copyCommand('git diff')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Show differences between the staging area and the last commit.
                  <br>
                  <div class="command">
                    <code>git diff --staged</code>
                    <button onclick="copyCommand('git diff --staged')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Show details of a specific commit.
                  <br>
                  <div class="command">
                    <code>git show &lt;commit&gt;</code>
                    <button onclick="copyCommand('git show &lt;commit&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Discard changes in a file in your working directory.
                  <br>
                  <div class="command">
                    <code>git restore &lt;file&gt;</code>
                    <button onclick="copyCommand('git restore &lt;file&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Unstage a file, keeping the changes.
                  <br>
                  <div class="command">
                    <code>git restore --staged &lt;file&gt;</code>
                    <button onclick="copyCommand('git restore --staged &lt;file&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <h3 id="2"># Branching</h3>
          <table>
            <tbody>
              <tr>
                <td>
                  List all branches in your repository.
                  <br>
                  <div class="command">
                    <code>git branch</code>
                    <button onclick="copyCommand('git branch')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Create a new branch.
                  <br>
                  <div class="command">
                    <code>git branch &lt;branch-name&gt;</code>
                    <button onclick="copyCommand('git branch &lt;branch-name&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Switch to a specific branch.
                  <br>
                  <div class="command">
                    <code>git checkout &lt;branch-name&gt;</code>
                    <button onclick="copyCommand('git checkout &lt;branch-name&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Create and switch to a new branch.
                  <br>
                  <div class="command">
                    <code>git checkout -b &lt;branch-name&gt;</code>
                    <button onclick="copyCommand('git checkout -b &lt;branch-name&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Merge a branch into the current branch.
                  <br>
                  <div class="command">
                    <code>git merge &lt;branch-name&gt;</code>
                    <button onclick="copyCommand('git merge &lt;branch-name&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Delete a branch (only if fully merged).
                  <br>
                  <div class="command">
                    <code>git branch -d &lt;branch-name&gt;</code>
                    <button onclick="copyCommand('git branch -d &lt;branch-name&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Force delete a branch, even if unmerged.
                  <br>
                  <div class="command">
                    <code>git branch -D &lt;branch-name&gt;</code>
                    <button onclick="copyCommand('git branch -D &lt;branch-name&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Switch to another branch (alternative to <code>checkout</code>).
                  <br>
                  <div class="command">
                    <code>git switch &lt;branch-name&gt;</code>
                    <button onclick="copyCommand('git switch &lt;branch-name&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Create and switch to a new branch.
                  <br>
                  <div class="command">
                    <code>git switch -c &lt;branch-name&gt;</code>
                    <button onclick="copyCommand('git switch -c &lt;branch-name&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <h3 id="3"># Pushing and Pulling</h3>
          <table>
            <tbody>
              <tr>
                <td>
                  Fetch and merge changes from the remote repository.
                  <br>
                  <div class="command">
                    <code>git pull</code>
                    <button onclick="copyCommand('git pull')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Rebase the current branch on top of the upstream changes.
                  <br>
                  <div class="command">
                    <code>git pull --rebase</code>
                    <button onclick="copyCommand('git pull --rebase')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Push changes to the remote repository.
                  <br>
                  <div class="command">
                    <code>git push</code>
                    <button onclick="copyCommand('git push')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Push a specific branch to the remote repository.
                  <br>
                  <div class="command">
                    <code>git push origin &lt;branch-name&gt;</code>
                    <button onclick="copyCommand('git push origin &lt;branch-name&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Force push to overwrite remote changes.
                  <br>
                  <div class="command">
                    <code>git push --force</code>
                    <button onclick="copyCommand('git push --force')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Download changes from the remote repository (no merge).
                  <br>
                  <div class="command">
                    <code>git fetch</code>
                    <button onclick="copyCommand('git fetch')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Push the branch and set upstream tracking for future pulls.
                  <br>
                  <div class="command">
                    <code>git push -u origin &lt;branch-name&gt;</code>
                    <button onclick="copyCommand('git push -u origin &lt;branch-name&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <h3 id="4"># Stashing</h3>
          <table>
            <tbody>
              <tr>
                <td>
                  Stash your uncommitted changes to clean your working directory.
                  <br>
                  <div class="command">
                    <code>git stash</code>
                    <button onclick="copyCommand('git stash')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Reapply the last stash to your working directory.
                  <br>
                  <div class="command">
                    <code>git stash apply</code>
                    <button onclick="copyCommand('git stash apply')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Apply the last stash and remove it from the stash list.
                  <br>
                  <div class="command">
                    <code>git stash pop</code>
                    <button onclick="copyCommand('git stash pop')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  List all stashes.
                  <br>
                  <div class="command">
                    <code>git stash list</code>
                    <button onclick="copyCommand('git stash list')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Delete the last stash.
                  <br>
                  <div class="command">
                    <code>git stash drop</code>
                    <button onclick="copyCommand('git stash drop')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Remove all stashes.
                  <br>
                  <div class="command">
                    <code>git stash clear</code>
                    <button onclick="copyCommand('git stash clear')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Stash both tracked and untracked files.
                  <br>
                  <div class="command">
                    <code>git stash --include-untracked</code>
                    <button onclick="copyCommand('git stash --include-untracked')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <h3 id="5"># Resetting and Reverting</h3>
          <table>
            <tbody>
              <tr>
                <td>
                  Unstage a file, keeping the changes in your working directory.
                  <br>
                  <div class="command">
                    <code>git reset &lt;file&gt;</code>
                    <button onclick="copyCommand('git reset &lt;file&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Reset to a commit, keeping all changes staged.
                  <br>
                  <div class="command">
                    <code>git reset --soft &lt;commit&gt;</code>
                    <button onclick="copyCommand('git reset --soft &lt;commit&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Reset to a commit,
                  unstage changes, but keep them in the working directory (default).
                  <br>
                  <div class="command">
                    <code>git reset --mixed &lt;commit&gt;</code>
                    <button onclick="copyCommand('git reset --mixed &lt;commit&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Reset to a commit, discard all changes (both staged and unstaged).
                  <br>
                  <div class="command">
                    <code>git reset --hard &lt;commit&gt;</code>
                    <button onclick="copyCommand('git reset --hard &lt;commit&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Create a new commit that reverses the changes from a previous commit.
                  <br>
                  <div class="command">
                    <code>git revert &lt;commit&gt;</code>
                    <button onclick="copyCommand('git revert &lt;commit&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <h3 id="6"># Cleaning</h3>
          <table>
            <tbody>
              <tr>
                <td>
                  Remove untracked files from the working directory.
                  <br>
                  <div class="command">
                    <code>git clean -f</code>
                    <button onclick="copyCommand('git clean -f')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Remove untracked files and directories.
                  <br>
                  <div class="command">
                    <code>git clean -fd</code>
                    <button onclick="copyCommand('git clean -fd')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Preview what would be removed by <code>git clean</code>.
                  <br>
                  <div class="command">
                    <code>git clean -f -n</code>
                    <button onclick="copyCommand('git clean -f -n')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <h3 id="7"># Tagging</h3>
          <table>
            <tbody>
              <tr>
                <td>
                  Create a new tag.
                  <br>
                  <div class="command">
                    <code>git tag &lt;tag-name&gt;</code>
                    <button onclick="copyCommand('git tag &lt;tag-name&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Create an annotated tag with a message.
                  <br>
                  <div class="command">
                    <code>git tag -a &lt;tag-name&gt; -m "message"</code>
                    <button onclick="copyCommand('git tag -a &lt;tag-name&gt; -m &quot;message&quot;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  List all tags.
                  <br>
                  <div class="command">
                    <code>git tag</code>
                    <button onclick="copyCommand('git tag')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Show details of a specific tag.
                  <br>
                  <div class="command">
                    <code>git show &lt;tag-name&gt;</code>
                    <button onclick="copyCommand('git show &lt;tag-name&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Push a tag to the remote repository.
                  <br>
                  <div class="command">
                    <code>git push origin &lt;tag-name&gt;</code>
                    <button onclick="copyCommand('git push origin &lt;tag-name&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Push all tags to the remote repository.
                  <br>
                  <div class="command">
                    <code>git push origin --tags</code>
                    <button onclick="copyCommand('git push origin --tags')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Delete a local tag.
                  <br>
                  <div class="command">
                    <code>git tag -d &lt;tag-name&gt;</code>
                    <button onclick="copyCommand('git tag -d &lt;tag-name&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Delete a remote tag.
                  <br>
                  <div class="command">
                    <code>git push origin :refs/tags/&lt;tag-name&gt;</code>
                    <button onclick="copyCommand('git push origin :refs/tags/&lt;tag-name&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <h3 id="8"># Rebase</h3>
          <table>
            <tbody>
              <tr>
                <td>
                  Rebase the current branch onto another branch.
                  <br>
                  <div class="command">
                    <code>git rebase &lt;branch-name&gt;</code>
                    <button onclick="copyCommand('git rebase &lt;branch-name&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Continue after resolving conflicts during a rebase.
                  <br>
                  <div class="command">
                    <code>git rebase --continue</code>
                    <button onclick="copyCommand('git rebase --continue')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Abort the rebase and return to the state before it started.
                  <br>
                  <div class="command">
                    <code>git rebase --abort</code>
                    <button onclick="copyCommand('git rebase --abort')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <h3 id="9"># Collaboration (with remotes)</h3>
          <table>
            <tbody>
              <tr>
                <td>
                  List the remote repositories.
                  <br>
                  <div class="command">
                    <code>git remote -v</code>
                    <button onclick="copyCommand('git remote -v')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Add a new remote repository.
                  <br>
                  <div class="command">
                    <code>git remote add &lt;name&gt; &lt;url&gt;</code>
                    <button onclick="copyCommand('git remote add &lt;name&gt; &lt;url&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Remove a remote repository.
                  <br>
                  <div class="command">
                    <code>git remote remove &lt;name&gt;</code>
                    <button onclick="copyCommand('git remote remove &lt;name&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Change the URL of a remote repository.
                  <br>
                  <div class="command">
                    <code>git remote set-url &lt;name&gt; &lt;url&gt;</code>
                    <button onclick="copyCommand('git remote set-url &lt;name&gt; &lt;url&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <h3 id="10"># Viewing and Comparing</h3>
          <table>
            <tbody>
              <tr>
                <td>
                  Show differences between working directory and index (staged changes).
                  <br>
                  <div class="command">
                    <code>git diff</code>
                    <button onclick="copyCommand('git diff')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Show differences between a commit and working directory.
                  <br>
                  <div class="command">
                    <code>git diff &lt;commit&gt;</code>
                    <button onclick="copyCommand('git diff &lt;commit&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Show differences between two commits.
                  <br>
                  <div class="command">
                    <code>git diff &lt;commit1&gt; &lt;commit2&gt;</code>
                    <button onclick="copyCommand('git diff &lt;commit1&gt; &lt;commit2&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Show the commit history.
                  <br>
                  <div class="command">
                    <code>git log</code>
                    <button onclick="copyCommand('git log')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Show the details of a specific commit.
                  <br>
                  <div class="command">
                    <code>git show &lt;commit&gt;</code>
                    <button onclick="copyCommand('git show &lt;commit&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Show who made the last changes to each line of a file.
                  <br>
                  <div class="command">
                    <code>git blame &lt;file&gt;</code>
                    <button onclick="copyCommand('git blame &lt;file&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <h3 id="11"># Git Ignore</h3>
          <table>
            <tbody>
              <tr>
                <td>
                  A file where you can specify patterns for files and directories to ignore.
                  <br>
                  <div class="command">
                    <code>.gitignore</code>
                    <button onclick="copyCommand('.gitignore')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <h3 id="12"># Submodules</h3>
          <table>
            <tbody>
              <tr>
                <td>
                  Add a new Git submodule to your repository.
                  <br>
                  <div class="command">
                    <code>git submodule add &lt;repo-url&gt;</code>
                    <button onclick="copyCommand('git submodule add &lt;repo-url&gt;')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Initialize, fetch and checkout submodule changes.
                  <br>
                  <div class="command">
                    <code>git submodule update --init --recursive</code>
                    <button onclick="copyCommand('git submodule update --init --recursive')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Pull updates for all submodules.
                  <br>
                  <div class="command">
                    <code>git submodule foreach git pull</code>
                    <button onclick="copyCommand('git submodule foreach git pull')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Remove all submodules.
                  <br>
                  <div class="command">
                    <code>git submodule deinit -f --all</code>
                    <button onclick="copyCommand('git submodule deinit -f --all')">
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <p>
            This cheat sheet covers the majority of commonly used Git commands, offering you an efficient
            reference for version
            control management!
          </p>
        </div>

        <script>
            const vscode = acquireVsCodeApi();
            function copyCommand(command) {
                vscode.postMessage({ command: 'copyToClipboard', text: command });
            }
        </script>
    </body>
    </html>
    `;
}

export function deactivate() {}
