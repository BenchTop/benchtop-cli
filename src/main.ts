import { program } from 'commander';
import pkg from '../package.json'
import {run} from "./run"

program
  .command('run [pattern]', {isDefault: true})
  .action(run)

program.version(pkg.version);
program.parse(process.argv);

// console.log("Hello, World!")