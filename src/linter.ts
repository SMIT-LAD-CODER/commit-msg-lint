export interface ValidationResult {
  valid: boolean;
  type?: string;
  scope?: string;
  subject?: string;
  errors: string[];
}

export class CommitLinter {
  private conventionalCommitRegex =
    /^(feat|fix|docs|style|refactor|perf|test|chore|ci|build|revert)(\(.+\))?!?:\s.+/;
  private typeRegex = /^(feat|fix|docs|style|refactor|perf|test|chore|ci|build|revert)/;
  private scopeRegex = /\(([^)]+)\)/;
  private strict: boolean;

  constructor(strict = false) {
    this.strict = strict;
  }

  validate(message: string): ValidationResult {
    const errors: string[] = [];

    // Check if message is empty
    if (!message || message.trim().length === 0) {
      return { valid: false, errors: ['Commit message cannot be empty'] };
    }

    const lines = message.split('\n');
    const firstLine = lines[0];

    // Check format
    if (!this.conventionalCommitRegex.test(firstLine)) {
      errors.push(
        'Must follow Conventional Commit format: type(scope): subject',
      );
    }

    // Extract components
    const typeMatch = firstLine.match(this.typeRegex);
    const scopeMatch = firstLine.match(this.scopeRegex);
    const colonIndex = firstLine.indexOf(':');
    const subject = colonIndex !== -1 ? firstLine.substring(colonIndex + 2) : '';

    if (!typeMatch) {
      errors.push(
        'Invalid type. Must be one of: feat, fix, docs, style, refactor, perf, test, chore, ci, build, revert',
      );
    }

    // Subject validation
    if (subject.length === 0) {
      errors.push('Subject cannot be empty');
    }
    if (subject.length > 0 && subject[0] === subject[0].toUpperCase() && subject[0] !== subject[0].toLowerCase()) {
      if (this.strict) {
        errors.push('Subject should not start with capital letter');
      }
    }
    if (subject.endsWith('.')) {
      errors.push('Subject should not end with a period');
    }

    // Line length validation
    if (firstLine.length > 100) {
      errors.push('First line (header) must not be longer than 100 characters');
    }

    // Body validation (if present)
    if (lines.length > 1) {
      if (lines[1].trim().length !== 0) {
        errors.push('Second line must be blank');
      }
      if (lines.length > 2) {
        const bodyLines = lines.slice(2);
        bodyLines.forEach((line, index) => {
          if (line.length > 100) {
            errors.push(`Line ${index + 3} exceeds 100 characters`);
          }
        });
      }
    }

    return {
      valid: errors.length === 0,
      type: typeMatch ? typeMatch[0] : undefined,
      scope: scopeMatch ? scopeMatch[1] : undefined,
      subject: subject || undefined,
      errors,
    };
  }
}
