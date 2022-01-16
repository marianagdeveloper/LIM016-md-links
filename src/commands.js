import {program} from 'commander';

program.version('0.1.0')
  .description('MD-LINKS: A command line tool for which reads and parses Markdown files, to verify the links they contain and to report some statistics.');

program.parse(process.argv)
