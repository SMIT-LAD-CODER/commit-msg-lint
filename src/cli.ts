#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import { CommitLinter } from './linter.js';
import fs from 'fs';

program
  .name('commit-msg-lint')
  .description('🔍 Validate commit messages against conventional commit format')
  .version('1.0.0')
  .argument('[message]', 'Commit message to validate')
  .option('-f, --file <path>', 'Read commit message from file')
  .option('--strict', 'Strict mode: enforce all rules', false)
  .action((message, options) => {
    try {
      let commitMessage = message;

      if (options.file) {
        commitMessage = fs.readFileSync(options.file, 'utf-8').trim();
      } else if (!commitMessage) {
        console.error(
          chalk.red('❌ Error: Please provide a commit message or use --file option'),
        );
        process.exit(1);
      }

      const linter = new CommitLinter(options.strict);
      const result = linter.validate(commitMessage);

      if (result.valid) {
        console.log(chalk.green('✅ Commit message is valid!'));
        console.log(chalk.gray(`   Type: ${result.type}`));
        if (result.scope) console.log(chalk.gray(`   Scope: ${result.scope}`));
        console.log(chalk.gray(`   Subject: ${result.subject}`));
      } else {
        console.error(chalk.red('❌ Commit message validation failed!'));
        result.errors.forEach((error) => {
          console.error(chalk.red(`   • ${error}`));
        });
        process.exit(1);
      }
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

program.parse();
