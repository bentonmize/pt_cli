import type {Arguments, CommandBuilder, CommandModule} from 'yargs';
import {Me} from "../interfaces";

interface IMeCommandArguments extends Arguments {
  debug?: boolean
}

const meCommandBuilder: CommandBuilder<IMeCommandArguments, IMeCommandArguments> = (yargs) =>
  yargs.options({
    debug: {alias: 'D', type: 'boolean', default: false, description: "Debug on/off"},
  })


const meCommand: CommandModule<IMeCommandArguments, IMeCommandArguments> = {
  handler: async (argv: IMeCommandArguments) => {
    if(argv.debug) {
      console.log(argv)
    }

    const PT_TOKEN = process.env.PT_TOKEN;

    try {
      const response = await fetch('https://www.pivotaltracker.com/services/v5/me', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'X-TrackerToken': PT_TOKEN
        }
      })

      if(!response.ok) {
        throw new Error(`Error: ${response.status})`);
      }

      const result = await response.json() as Me;
      console.log(result.name + " (" + result.username + ") - "+result.id)
      console.log("Projects: " + result.projects.flatMap(p => p.project_name).join(", "))

      if(argv.debug) {
        console.log(result);
      }
    } catch (error) {
      if(error instanceof Error) {
        console.error(error.message)
      }
    }
  },
  describe: 'Get my PT profile and associated projects',
  builder: meCommandBuilder,
  command: 'me'
}

export = meCommand;
