import { Question, prompt } from 'inquirer';
import { validateName, FrontMatterOptions, LayoutOptions, c } from './utils';
import Authors, { AuthorInfo } from './authors';
import * as fs from 'fs';
import ora from 'ora';

import * as path from 'path';
const authors = Authors.map((a) => ({
  name: a.author,
  value: a.id
}));

export async function newBlog(): Promise<FrontMatterOptions> {
  var check = require('validator');
  const existingAuthorQuestion: Question = {
    filter: (answer: string) => {
      if (answer === 'no') {
        const author: Promise<AuthorInfo> = newAuthor();
        return author;
      }
      const author = Authors.find((x) => x.id === answer);
      return author;
    },
    type: 'list',
    name: 'author',
    message: c.cyan(
      'Are you an existing author? If so, select your name, otherwise answer No'
    ),
    choices: [...authors, { name: 'No', value: 'no' }]
  };

  const blogTitle: Question = {
    type: 'input',
    name: 'title',
    message: c.cyan('Enter the title of your blog (e.g. Intro to graphql)')
  };

  const blogDate: Question = {
    filter: (answer: string) => {
      return new Date(answer).toISOString();
    },
    type: 'input',
    name: 'date',
    message: c.cyan(
      'Enter the date of your blog(e.g. 05/04/2019). Will default to todays date'
    ),
    default: () => new Date().toISOString()
  };

  const blogBanner: Question = {
    type: 'input',
    name: 'banner',
    message: c.cyan(
      `Enter a url to your blog's banner (e.g. https://cdn-images-1.medium.com/max/2400/1*xaRYfY0AEnDjPHX2yl5h6A.png)`
    ),
    validate: (answer: string) => {
      if (check.isURL(answer)) {
        return true;
      }
      console.log(c.red.bold(`Must be a valid url`));
      return false;
    }
  };

  const blogTags: Question = {
    filter: (answer: string) => answer.trim().split(','),
    type: 'input',
    name: 'tags',
    message: c.cyan(
      `Enter a comma separated list of tags associated with your blog (e.g. GraphQL, Gatsby, React, etc...)`
    )
  };

  const blogLayout: Question = {
    type: 'list',
    name: 'layout',
    message: c.cyan(
      `Enter the type of layout you'd like. Default is a large full width banner, Alt is a smaller banner`
    ),
    choices: [
      { name: 'Default', value: 'default' },
      { name: 'Alt', value: 'alt' }
    ]
  };
  return prompt([
    existingAuthorQuestion,
    blogTitle,
    blogDate,
    blogBanner,
    blogTags,
    blogLayout
  ]).then((answers) => {
    const { author, title, date, banner, tags, layout } = answers as {
      readonly author: AuthorInfo;
      readonly title: string;
      readonly date: Date;
      readonly banner: string;
      readonly tags: Array<string>;
      readonly layout: LayoutOptions;
    };

    return {
      ...author,
      title,
      date,
      banner,
      tags,
      layout
    };
  });
}

export async function newAuthor(): Promise<AuthorInfo> {
  const check = require('validator');
  const newAuthorName: Question = {
    type: 'input',
    name: 'author',
    message: c.cyan('Enter your first and last name (e.g. John Doe)'),
    validate: validateName
  };

  const newAuthorBio: Question = {
    type: 'input',
    name: 'bio',
    message: c.magenta(
      'Enter a brief bio about yourself. You can also put your title (e.g. Full Stack Developer at Novvum)'
    )
  };

  const newAuthorPic: Question = {
    filter: (answer: string) => answer.trim(),
    type: 'input',
    name: 'piclink',
    message: c.cyan(
      'Enter a url to your picture (e.g. https://avatars3.githubusercontent.com/u/15880596?s=40&v=4'
    ),
    validate: (answer: string) => {
      if (check.isURL(answer)) {
        return true;
      }
      console.log(c.red.bold(`Must be a valid url`));
      return false;
    }
  };

  const newAuthorTwitter: Question = {
    filter: (answer: string) => answer.trim(),
    type: 'input',
    name: 'twitter',
    message: c.cyan(
      `Enter your twitter handle (e.g. rajinwonderland). This will default to novvumio aren't comfortable with giving this information out`
    ),
    default: () => 'novvumio'
  };

  const newAuthorGithub: Question = {
    filter: (answer: string) => answer.trim(),
    type: 'input',
    name: 'github',
    message: c.blue(
      `Enter your github handle (e.g. rajinwonderland). This will default to novvum aren't comfortable with giving this information out`
    ),
    default: () => 'novvumio'
  };
  return prompt([
    newAuthorName,
    newAuthorBio,
    newAuthorPic,
    newAuthorTwitter,
    newAuthorGithub
  ]).then(async (answer) => {
    const { author, bio, piclink, twitter, github } = answer as {
      readonly author: string;
      readonly bio: string;
      readonly piclink: string;
      readonly twitter: string;
      readonly github: string;
    };
    const cuid = require('cuid');
    const id = cuid();

    const newAuthor = {
      id,
      author,
      bio,
      piclink,
      twitter,
      github
    };
    const newAuthors: AuthorInfo[] = [...Authors, newAuthor];
    await writeAuthor(newAuthors);
    return newAuthor;
  });
}

async function writeAuthor(newAuthors: AuthorInfo[]) {
  const addingAuthor = ora(
    c.blue('Adding you to the list of existing authors')
  ).start();
  try {
    await fs.writeFileSync(
      path.join(__dirname, 'authors.json'),
      JSON.stringify(newAuthors)
    );
    return addingAuthor.succeed(
      c.green.bold(`Successfully added you as an existing author! 🎉🎊`)
    );
  } catch (e) {
    addingAuthor.warn(e.message);
    throw new Error(e);
  }
}

export async function mediumConversion(
  output?: string
): Promise<{ url: string; output: string }> {
  const check = require('validator');
  const mediumUrl: Question = {
    type: 'input',
    name: 'url',
    message: c.cyan(
      'Enter the url of the specified medium link (e.g. https://medium.com/novvum/some-medium-post)'
    ),
    validate: (answer: string) => {
      if (check.isURL(answer)) {
        return true;
      }
      console.log(c.red.bold(`Must be a valid url`));
      return false;
    }
  };
  const markdownOutput: Question = {
    type: 'input',
    name: 'output',
    message: c.cyan(
      'Enter the destination name of the converted markdown (e.g. how-to-graphql/index.md)'
    ),
    default: output
  };
  return prompt([mediumUrl, markdownOutput]).then((answers) => {
    const { url, output } = answers as {
      readonly url: string;
      readonly output?: string;
    };
    if (!output) {
      return { url, output: 'copy' };
    }
    return { url, output };
  });
}
