import fetch from 'node-fetch';
import ora from 'ora';
import { c } from './utils';
import mkdirp from 'mkdirp';
import { appendFile, writeFileSync, existsSync } from 'fs';

const baseUrl =
  'https://wt-6233a9ed12487194abb064da22ff3e86-0.sandbox.auth0-extend.com/medium-to-markdown';

export default async function(url: string, output: string) {
  const spin = ora(c.blue(`Fetching and converting medium link`)).start();
  try {
    const markdown = await fetch(`${baseUrl}?url=${url}`).then((res) =>
      res.text()
    );
    spin.succeed(
      c.green.bold(`Successfully Converted Medium Link to Markdown 🎉 🎊 😎`)
    );
    if (output === 'copy') {
      const clipboardy = require('clipboardy');
      const spinner = ora(c.cyan(`Copying markdown files to clipboard`));
      clipboardy.write(unescape(markdown));
      spinner.succeed(`Markdown files successfully copied to clipboard`);
      return console.log(
        c.blue(
          `Head over to https://www.freeformatter.com/json-escape.html#ad-output
- Paste your markdown there
- Then hit the 'Unescape' button
- Copy that text
- Paste it into your file!`
        )
      );
    }
    const spinner = ora(c.cyan(`Writing markdown files to ${output}`));
    return await writeBlogMetaData(output, spinner, markdown);
  } catch (err) {
    spin.warn(c.red(err));
    throw new Error(err);
  }
}

function writeBlogMetaData(filePath, spinner: ora.Ora, markdown: string) {
  const exist = existsSync(filePath);
  if (exist) {
    spinner.info(c.cyan(`File ${filePath} found!`));
    spinner.info(c.cyan('Appending markdown to existing file'));

    return appendFile(filePath, markdown, (err) => {
      if (err) {
        console.error(c.red.bold(err.message));
        spinner.stop();
        spinner.clear();
        throw new Error(err.message);
      }
      return spinner.succeed(
        `Successfully wrote parsed markdown to file: ${filePath}`
      );
    });
  }
  spinner.info(c.cyan(`File ${filePath} does not exist`));
  spinner.info(c.cyan(`Creating new directory`));
  return mkdirp(filePath, (err, made) => {
    if (err) {
      spinner.stop();
      spinner.clear();
      throw Error(err);
    }
    spinner.info(c.cyan(`Writing markdown to new file`));
    return writeFileSync(made, markdown);
  });
}
