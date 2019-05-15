import { Command, flags } from '@oclif/command';
import { c, getIntro } from '../utils/utils';
import { join } from 'path';
import { newAuthor, newBlog } from '../utils/inquire';
import { createBlog } from '../utils/createBlog';

export default class Create extends Command {
  static description = c.brightMagenta(
    'Scaffold metadata or frontmatter for your mdx or md content'
  );

  static examples = [
    c.text(`$ clingon create`),
    c.text(`clingon create -p=/path/to/content`),
    c.text(`clingon create -e=mdx`)
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    output: flags.string({
      char: 'o',
      description: c.cyan(`The desired output file for the scaffolded metadata`)
    })
    // flag with no value (-f, --force)
  };

  static args = [
    {
      name: 'type',
      required: false, // make the arg required with `required: true`
      description: c.text('scaffold metadata for a blog'), // help description
      hidden: true, // hide this arg from help
      default: 'blog', // default value if no arg input
      options: ['blog', 'author']
    },
    {
      name: 'extension',
      required: false, // make the arg required with `required: true`
      description: c.text(
        `The output extension of the blog (e.g. 'md' or 'mdx')`
      ), // help description
      hidden: true, // hide this arg from help
      default: 'mdx', // default value if no arg input
      options: ['md', 'mdx']
    }
  ];

  getIntro() {
    this.log(getIntro(process.stdout.columns));
  }

  async newMetadata(output: string, extension: 'md' | 'mdx') {
    this.getIntro();
    const options = await newBlog();
    return await createBlog(options, output, extension);
  }
  async newAuthor() {
    this.getIntro();
    return await newAuthor();
  }

  async run() {
    const { args, flags } = this.parse(Create);
    const type = args.type;
    const extension = args.extension;
    const output = flags.output || join(__dirname, 'clients/blog/content/blog');

    if (type === 'author') {
      return await this.newAuthor();
    }
    return await this.newMetadata(output, extension);
  }
}
