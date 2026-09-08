# commit-msg-lint 🔍

A fast, lightweight CLI tool that validates commit messages against the [Conventional Commits](https://www.conventionalcommits.org/) standard.

## Features

✨ **Zero config** - Works out of the box
✨ **Git hook integration** - Auto-install as a git hook
✨ **Clear error messages** - Know exactly what's wrong
✨ **Strict mode** - Optional extra validation rules
✨ **Fast** - Minimal dependencies, blazing quick

## Installation

```bash
npm install -g commit-msg-lint
```

## Usage

### Validate a message directly
```bash
commit-msg-lint "feat: add new feature"
```

### Validate from file (useful for git hooks)
```bash
commit-msg-lint --file /path/to/commit/msg
```

### Install as git hook
```bash
commit-msg-lint --install-hook
```

### Strict mode
```bash
commit-msg-lint --strict "feat: add feature"
```

## Conventional Commit Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Valid Types
- `feat` - A new feature
- `fix` - A bug fix
- `docs` - Documentation only changes
- `style` - Changes that don't affect code meaning (formatting, etc)
- `refactor` - Code change that neither fixes bug nor adds feature
- `perf` - Code change that improves performance
- `test` - Adding or updating tests
- `chore` - Changes to build process, dependencies, etc
- `ci` - Changes to CI/CD configuration
- `build` - Changes to build system
- `revert` - Reverts a previous commit

## Examples

```bash
# ✅ Valid
commit-msg-lint "feat: add user authentication"
commit-msg-lint "fix(auth): handle null token"
commit-msg-lint "docs: update README"
commit-msg-lint "feat!: breaking change to API"

# ❌ Invalid
commit-msg-lint "add feature"              # Missing type
commit-msg-lint "feat add feature"         # Missing colon
commit-msg-lint "feat: add feature."       # Ends with period
commit-msg-lint "FEAT: add feature"        # Type must be lowercase
```

## Git Hook Setup

For automatic validation on every commit:

```bash
# Install the hook
commit-msg-lint --install-hook

# Now all commits will be validated automatically
git commit -m "feat: new feature"  # ✅ Accepted
git commit -m "add feature"         # ❌ Rejected
```

## Why Conventional Commits?

- **Automated version bumping** - Tools can determine major/minor/patch
- **Semantic versioning** - Clear changelog generation
- **Better git history** - Easier to understand project evolution
- **IDE support** - Better commit helpers in editors

## License

MIT
