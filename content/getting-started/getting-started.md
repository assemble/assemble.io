If you can work with HTML, you will be able to use Assemble! If this kind of templating is completely new to you, don't worry if it doesn't make sense right away. Give it time. Once it "clicks", a whole new world of possibilities in front end development will open up for you! Your code will become more modular and reusable, and your projects will become richer, more organized and easier to maintain.

## Getting Started with Grunt.js + Assemble
Glad to see you are interested in using Assemble! If you are developer and familiar with installing packages from npm, skip to the [Developer's Getting Started Guide](#developers).

Before continuing, be sure to have [Yeoman][5], [Bower][3] and the [Grunt CLI][4] installed. If you do not, don't fret, this guide will show you how to install them!

Throughout this process, we will use **Yeoman** as our "scaffolding tool". As explained in the introduction, the scaffold will be a base, foundational set of files that we can use to kickstart each project. **Bower** will be used as a packaged manager. If we need to use jQuery or Twitter Bootstrap, we can use Bower to install it. Lastly, the Grunt CLI is the interface will use to control Grunt from the command line.

To get started with any new Assemble project, we recommend using the [Yeoman generator for Assemble](https://github.com/assemble/generator-assemble).

After you're setup with Yeoman you may install the Assemble generator with:

```bash
npm install -g generator-assemble
```

Next, create a new directory for your project, and in that directory run:

```bash
mkdir /my-new-project
yo assemble
```

If all build success you're well on your way to successfully building your first Assemble project!

## Issues
We're always willing to help new users, so please stop out to [Assemble's GitHub Issues][1] or ask a question on [StackOverflow][2] and someone from the core team or our super-supportive community will help you out!

## Developers

[1]: https://github.com/assemble/assemble/issues "Assemble Issue Tracker"
[2]: http://stackoverflow.com/questions/tagged/assemble "StackOverflow Assemble Tag"

[3]: https://github.com/bower/bower
[4]: https://github.com/gruntjs/grunt-cli
[5]: http://yeoman.io/gettingstarted.html
