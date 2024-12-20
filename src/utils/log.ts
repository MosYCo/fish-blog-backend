import { ConsoleLogger } from '@nestjs/common';
import chalk from 'chalk';
import { formatNow } from './date';

const SUCCESS_COLOR = '#67C23A' as const;
const WARNING_COLOR = '#E6A23C' as const;
const ERROR_COLOR = '#F56C6C' as const;
const INFO_COLOR = '#909399' as const;

export class LogUtil extends ConsoleLogger {
  static info(...args) {
    console.log(
      chalk.hex(INFO_COLOR)('[Mos]'),
      `- ${formatNow()} -`,
      chalk.hex(INFO_COLOR)('[INFO]'),
      ...args,
    );
  }

  static success(...args) {
    console.log(
      chalk.hex(SUCCESS_COLOR)('[Mos]'),
      `- ${formatNow()} -`,
      chalk.hex(SUCCESS_COLOR)('[SUCCESS]'),
      ...args,
    );
  }

  static error(...args) {
    console.log(
      chalk.hex(ERROR_COLOR)('[Mos]'),
      `- ${formatNow()} -`,
      chalk.hex(ERROR_COLOR)('[ERROR]'),
      ...args,
    );
  }

  static warn(...args) {
    console.log(
      chalk.hex(WARNING_COLOR)('[Mos]'),
      `- ${formatNow()} -`,
      chalk.hex(WARNING_COLOR)('[WARN]'),
      ...args,
    );
  }
}
