export interface AuthorInfo {
  id: string;
  author: string;
  bio: string;
  piclink: string;
  twitter?: string;
  github?: string;
}
const authors = require('./authors.json');
const Authors: AuthorInfo[] = authors;

export default Authors;
