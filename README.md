# OMPA

> A lightweight utility packed with personal quality-of-life (QoL) scripts and subcommands for improved command-line productivity!

## Features (more to come)

- Easy configuration of Git profiles, local and global.
- Open source

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

`gitconf`

A simple script for managing Git configurations. It reads profiles from a specified config file and updates your Git settings accordingly.

### Usage

`gitconf {profile} [(--global)]`

- `{profile}` Name of profile, read from config file
- `--global` (Optional) Use this flag to set the configuration globally instead of locally.
