import { Command, flags } from '@oclif/command';
import { c, getIntro } from '../utils/utils';
import { mediumConversion } from '../utils/inquire';
import mediumMark from '../utils/fromMedium';

export default class Convert extends Command {
  static description = c.brightMagenta(
    'Convert a medium url into plain old markdown 😎'
  );

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    output: flags.string({
      char: 'o',
      description: c.cyan(
        `The desired destination for the parsed markdown (e.g. path/to/content/index.mdx) or copy to copy the markdown`
      )
    })
  };

  static args = [
    {
      name: 'link',
      required: false, // make the arg required with `required: true`
      description: c.text(`The link to the medium post you'd like to convert`), // help description
      hidden: true // hide this arg from help
    }
  ];

  getIntro() {
    this.log(getIntro(process.stdout.columns));
  }
  async getLink(path: string) {
    this.getIntro();
    const { url, output } = await mediumConversion(path);
    this.convertToMarkdown(url, output);
  }
  async convertToMarkdown(url: string, path: string) {
    return await mediumMark(url, path);
  }
  async run() {
    const { args, flags } = this.parse(Convert);
    const output = flags.output || 'copy';
    if (args.link) {
      this.getIntro();
      return this.convertToMarkdown(args.link, output);
    }
    return await this.getLink(args.output);
  }
}
