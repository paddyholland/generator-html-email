'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var HtmlEmailGenerator = module.exports = function HtmlEmailGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(HtmlEmailGenerator, yeoman.generators.Base);

HtmlEmailGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'projectName',
      message: "What is the name of the project?",
      default: "HTML email project"
    },
    {
      type:'confirm',
      name: 'boilerPlate',
      message: "standard HTML email? (no uses Zurb's responsive Ink boilerplate)",
      default: true
    },
    {
      type: 'input',
      name: 'emailWidth',
      message: 'What will be the width of this html email (the default is 600)?',
      default: 600
    },
    {
      type: 'input',
      name: 'tableRows',
      message: 'How many rows will you be needing for the main table structure?',
      default: 3
    }

  ];

  this.prompt(prompts, function (props) {
    this.name = props.name;
    this.boilerPlate = props.boilerPlate;
    this.emailWidth = props.emailWidth;
    this.tableRows = props.tableRows;

    cb();
  }.bind(this));
};

HtmlEmailGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');
  this.mkdir('htmlEmail');
  this.mkdir('img');


  this.copy('email-boilerplate-sean-powell/email.html', 'email.html');
  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

HtmlEmailGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
