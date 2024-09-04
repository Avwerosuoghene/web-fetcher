import { blue, green, yellow, red } from 'colorette';

class Logger {
  static info(message: string) {
    console.log(blue(`[INFO] ${message}`));
  }

  static success(message: string) {
    console.log(green(`[SUCCESS] ${message}`));
  }

  static warn(message: string) {
    console.log(yellow(`[WARN] ${message}`));
  }

  static error(message: string) {
    console.log(red(`[ERROR] ${message}`));
  }
}

export default Logger;
