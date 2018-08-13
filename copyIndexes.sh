#!/bin/bash
  
mongo [any params needed to connect to mongo] --quiet < getIndexes.js > out
# on the destination mongo
mongo [any params needed to connect to mongo] < out
rm out
