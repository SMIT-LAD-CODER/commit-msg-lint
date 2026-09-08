import { CommitLinter } from '../linter';

describe('CommitLinter', () => {
  let linter: CommitLinter;

  beforeEach(() => {
    linter = new CommitLinter();
  });

  test('should validate valid commit message', () => {
    const result = linter.validate('feat: add new feature');
    expect(result.valid).toBe(true);
    expect(result.type).toBe('feat');
    expect(result.subject).toBe('add new feature');
  });

  test('should validate message with scope', () => {
    const result = linter.validate('fix(auth): resolve login issue');
    expect(result.valid).toBe(true);
    expect(result.type).toBe('fix');
    expect(result.scope).toBe('auth');
  });

  test('should reject empty message', () => {
    const result = linter.validate('');
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  test('should reject invalid type', () => {
    const result = linter.validate('invalid: something');
    expect(result.valid).toBe(false);
  });

  test('should reject missing colon', () => {
    const result = linter.validate('feat something');
    expect(result.valid).toBe(false);
  });

  test('should reject missing subject', () => {
    const result = linter.validate('feat: ');
    expect(result.valid).toBe(false);
  });

  test('should reject subject ending with period', () => {
    const result = linter.validate('feat: add feature.');
    expect(result.valid).toBe(false);
  });

  test('should validate breaking change', () => {
    const result = linter.validate('feat!: breaking change');
    expect(result.valid).toBe(true);
  });

  test('should validate message with body', () => {
    const message = 'feat: add feature\n\nThis is the body';
    const result = linter.validate(message);
    expect(result.valid).toBe(true);
  });

  test('should reject message with no blank line before body', () => {
    const message = 'feat: add feature\nThis is the body';
    const result = linter.validate(message);
    expect(result.valid).toBe(false);
  });
});
