import { program } from 'commander';
import pkg from '../package.json'
import {build} from "./build"

program
  .command('build [pattern]', {isDefault: true})
  .action(build)

program.version(pkg.version);
program.parse(process.argv);

// console.log("Hello, World!")