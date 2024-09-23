const colors = {
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
}

type Color = keyof typeof colors

const ESCAPE_CHAR = '\x1b[0m'

export default class Logger {
  public static printWithColor(color: Color, ...strings: string[]) {
    const colorCode = colors[color]

    console.log(colorCode, ...strings, ESCAPE_CHAR)
  }

  public static error(...strings: string[]) {
    this.printWithColor('red', '!>', ...strings)
  }

  public static success(...strings: string[]) {
    this.printWithColor('green', '>>', ...strings)
  }

  public static info(...strings: string[]) {
    this.printWithColor('cyan', '#>', ...strings)
  }

  public static warning(...strings: string[]) {
    this.printWithColor('yellow', '?>', ...strings)
  }

  public static newline() {
    console.log()
  }
}
