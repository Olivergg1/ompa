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

    const joinedStrings = strings.join(' ')

    console.log(`${colorCode}${joinedStrings}${ESCAPE_CHAR}`)
  }

  public static green(...strings: string[]) {
    this.printWithColor('green', ...strings)
  }

  public static cyan(...strings: string[]) {
    this.printWithColor('cyan', ...strings)
  }

  public static red(...strings: string[]) {
    this.printWithColor('red', ...strings)
  }

  public static yellow(...strings: string[]) {
    this.printWithColor('yellow', ...strings)
  }

  public static error(...strings: string[]) {
    this.newline()
    this.red('!>', ...strings)
  }

  public static success(...strings: string[]) {
    this.green('>>', ...strings)
  }

  public static info(...strings: string[]) {
    this.cyan('#>', ...strings)
  }

  public static warning(...strings: string[]) {
    this.yellow('?>', ...strings)
  }

  public static newline() {
    console.log()
    return this
  }
}
