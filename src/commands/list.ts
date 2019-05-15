import { Command, flags } from '@oclif/command';
import { c, getIntro } from '../utils/utils';
import ora = require('ora');
import Authors from '../utils/authors';
export default class List extends Command {
  static description = c.brightMagenta('describe the command here');

  static flags = {
    help: flags.help({ char: 'h' })
    // flag with a value (-n, --name=VALUE)
  };

  async listAuthors() {
    this.getIntro();
    const listing = await ora(c.blue('Fetching Existing Authors')).start();
    const authors = await Authors.map((x) => `- ${x.author}\n`);
    listing.succeed(c.green.bold(`Here's a list of all Existing Authors`));
    this.log(c.blue.bold(authors.toString().replace(/,/g, '')));
    return this.log(
      c.yellow(
        `You can run clingon create author if you don't see yourself in the list!`
      )
    );
  }
  getIntro() {
    this.log(getIntro(process.stdout.columns));
  }
  async run() {
    return await this.listAuthors();
  }
}
