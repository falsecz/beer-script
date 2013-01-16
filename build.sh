#!/bin/bash

git checkout lib && bin/cake build:full && bin/cake build:parser
echo --------------------------
bin/coffee -p b.coffee