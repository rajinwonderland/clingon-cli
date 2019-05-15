import chalk from 'chalk';
import gradient from 'gradient-string';
import Authors from './authors';

export function validateName(input: string): true | string {
  const exists = Authors.find((x) => x.author === input);
  return exists ? `"${input}" already exists as an author.` : true;
}

export function getIntro(columns: number | undefined): string {
  const ascii = gradient['mind'](`
  /$$$$$$  /$$      /$$$$$$                      /$$$$$$  /$$   /$$
 /$$__  $$| $$     |_  $$_/                     /$$__  $$| $$$ | $$
| $$  \__/| $$       | $$   /$$$$$$$   /$$$$$$ | $$  \ $$| $$$$| $$
| $$      | $$       | $$  | $$__  $$ /$$__  $$| $$  | $$| $$ $$ $$
| $$      | $$       | $$  | $$  \ $$| $$  \ $$| $$  | $$| $$  $$$$
| $$    $$| $$       | $$  | $$  | $$| $$  | $$| $$  | $$| $$\  $$$
|  $$$$$$/| $$$$$$$$/$$$$$$| $$  | $$|  $$$$$$$|  $$$$$$/| $$ \  $$
 \______/ |________/______/|__/  |__/ \____  $$ \______/ |__/  \__/
                                      /$$  \ $$
                                     |  $$$$$$/
                                      \______/                     `);

  const asciiMedium = `

 ██████╗██╗     ██╗███╗   ██╗ ██████╗  ██████╗ ███╗   ██╗
██╔════╝██║     ██║████╗  ██║██╔════╝ ██╔═══██╗████╗  ██║
██║     ██║     ██║██╔██╗ ██║██║  ███╗██║   ██║██╔██╗ ██║
██║     ██║     ██║██║╚██╗██║██║   ██║██║   ██║██║╚██╗██║
╚██████╗███████╗██║██║ ╚████║╚██████╔╝╚██████╔╝██║ ╚████║
 ╚═════╝╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝
`;

  return columns && columns >= 85
    ? c.text(ascii)
    : c.text.bold(gradient['mind'](asciiMedium));
  // : `\n${c.cyan.bold.underline('CLIngON')}\n`
}

export enum LayoutOptions {
  'alt',
  'default'
}
export type FrontMatterOptions = {
  title: string;
  date: Date;
  author: string;
  bio: string;
  twitter?: string;
  github?: string;
  piclink: string;
  banner: string;
  layout: LayoutOptions;
  tags: string[];
};

export enum CreateOptions {
  'blog',
  'author'
}

export enum ListOptions {
  'authors'
}

export interface CLIOptions {
  create: CreateOptions;
  list: ListOptions;
}

export interface CLIFlags {
  path?: string;
  title?: string;
  author?: string;
  tags?: string;
  date?: string;
  layout?: string;
  banner?: string;
}

export enum Extension {
  'md',
  'mdx'
}
export const c = {
  blue: chalk.hex('#bd93f9'),
  brightBlack: chalk.hex('#6272a4'),
  brightBlue: chalk.hex('#d6acff'),
  brightCyan: chalk.hex('#a4ffff'),
  brightGreen: chalk.hex('#69ff94'),
  brightMagenta: chalk.hex('#ff92df'),
  brightRed: chalk.hex('#ff6e6e'),
  brightWhite: chalk.hex('#ffffff'),
  brightYellow: chalk.hex('#ffffa5'),
  cyan: chalk.hex('#8be9fd'),
  green: chalk.hex('#50fa7b'),
  magenta: chalk.hex('#ff79c6'),
  red: chalk.hex('#ff5555'),
  white: chalk.hex('#f8f8f2'),
  yellow: chalk.hex('#f1fa8c'),
  text: chalk.hex('#f8f8f2')
};
