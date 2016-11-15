![circleci](https://circleci.com/gh/arpentnoir/legislation-search.svg?style=shield&circle-token=:circle-token)

# Consolidated Legislation Search

This repository was created specifically for my application for the Full Stack Developer position with CSIRO. It is intended to demonstrate some of the technologies and practices outlined in the position description and selection criteria. 

## Overview of the Application

The application itself is very simple, and is not intended to demonstrate any sophisticated functionality. The main page displays a list of all consolidated Acts from the [AustLii](http://www.austlii.edu.au/au/legis/cth/consol_act/) website. The list can be filtered by title, and clicking on the title of an act takes you to a page displaying the content of the Act in plain text. 

You can see the application deployed to Heroku [here](https://warm-wildwood-45332.herokuapp.com)

## Development
The application is built on the [MEAN](http://mean.io/) stack, deployed to [Heroku](https://www.heroku.com/) with test automation utilising [Mocha](https://mochajs.org/) test framework and [Chai](chaijs.com/) assertion library. Continuous integration is implemented using [CircleCI](https://circleci.com).

Data was taken from the AustLii website via a series of Python scripts, converted to JSON and uploaded via web service to a MongoDB database hosted on Heroku. 


