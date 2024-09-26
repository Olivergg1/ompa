# OMPA

> A lightweight utility packed with personal quality-of-life (QoL) scripts and subcommands for improved command-line productivity!

## Features (more to come)

- Easy configuration of Git profiles, local and global.
- Create projects with ease.
- Random, strong password generator.
- Open source.

## Setup

Setting up the project requires that pnpm is installed globally.

If you have not already installed pnpm, run the following command before proceeding:

```bash
npm install -g pnpm
```

After ensuring `pnpm` is installed, run the following command to build, set up, and link the project for CLI usage:

```bash
pnpm ompa:setup
```

This setup script will build the package and link it to the global npm bin, allowing you to run OMPA commands from any CLI.

## Usage

After setup, you can run OMPA commands directly in your terminal. Here’s how to use the included commands:

### `gitconf`

A simple script for managing Git configurations. It reads profiles from a specified config file and updates your Git settings accordingly.

#### Usage

`gitconf {profile} [(--global)]`

- `{profile}` Name of profile, read from config file
- `--global` (Optional) Use this flag to set the configuration globally instead of locally.

### `create`

A simple script for creating projects. Currently supports `Node.js` and `React` (create-react-app).

#### Usage

`create {framework|project} [arguments]`

- `{profile|project}` Framework or project to create
- `arguments` Arguments required to setup the specified project

#### Example

To create a node.js project with typescript, one can run the following command:

```bash
ompa create node ./path/to/project express dotenv
```

The above will generate a project at the relative path from where the command is executed. To create the project in the current directory, use `.` or `./`.

Additional PNPM packages can also be installed by specifying them after the path/name of the project, separated by blankspaces. In the above example, express and dotenv will be added to the project as production dependencies.

If you just want to create a project with a name (similar to 'create-react-app App'), replace the path with your project name. See the example below:

```bash
ompa create node My-Awesome-App express vite ts-jest
```

Note: _this is equivalent to writing "./My-Awesome-App"_

### `password`

Generates a random, strong password with a fixed size of 16 characters.

#### Usage

`password (--verbose|--no-copy)`

- `--verbose` Logs the password to the console.
- `--no-copy` Will not copy password to clipboard, but instead log the password to the console.

#### Example

To generate a random, strong password:

```bash
ompa password
```

The command above will generate a 16-characters long password and copy it to your clipboard.

If you are on an unsupported platform, the copy to clipboard will fail. Instead, you can use the flag `--no-copy` to skip copying to clipboard and log the password to the console. This works similary to `--verbose`, however, `--verbose` will still try to copy your generated password to the clipboard.

To skip the copying to clipboard, run the command below instead of the previous command:

```bash
ompa password --no-copy
```
