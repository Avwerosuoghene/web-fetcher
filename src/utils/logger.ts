import { blue, green, yellow, red, magenta } from 'colorette';

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

  static ongoing(message: string) {
    console.log(magenta(`[ONGOING] ${message}`));
  }
}

export default Logger;