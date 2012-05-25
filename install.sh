#! /bin/bash

# installing git
sudo apt-get install

# Rvm installation
curl -L get.rvm.io | bash -s stable
source ~/.bash_profile

rvm requirements
rvm install 1.9.3
