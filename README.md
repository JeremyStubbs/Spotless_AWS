# AWS_seed
This code was used to insert items item my dynamodb table. 

The original file "seedData.json" is a regular json. 

In order to convert it into a usable json format which the AWS CLI could use to seed the "Spotless" database, I had to add keys to each element of each item in the file - see the file named "template" for explanation. 

Unfortunately the CLI batch write function only handles 25 at a time. So I converted the json 25 items at a time and stored them in a temporary file called "anotherfile.json". This file was used to perform the CLI batch-write operation using the OS module.
