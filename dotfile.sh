#!/usr/bin/env bash

#sudo chmod +x dotfile.sh
#colors for text
GREEN=$(tput setaf 2)
RESET=$(tput sgr0)
#vars to store commands issued and args
COMMAND=""
SUBCOMMAND=""
ARGUMENTS=""


setCommand() {
  if [ "$1" == "up" ] || [ "$1" == "down" ];
  then
    COMMAND=$1
  elif [ "$1" != "" ]; then
    COMMAND="help"
  fi
}

setCommand "$@"

if [ "$COMMAND" != "" ]; then
  if [ "$COMMAND" == "up" ]; then
  	echo "${GREEN}"
    echo  "************* Updating Files *************"
	cp ~/.config/starship.toml .
    cp ~/.config/kitty/kitty.conf .
    cp ~/.oh-my-zsh/themes/bureau.zsh-theme .
    cp ~/.zshrc .
    cp -r ~/.vscode .
    echo "${RESET}"
  elif [ "$COMMAND" == "deploy" ]; then
  	echo "${GREEN}"
    echo "************* Deploying Files *************"
 	cp starship.toml ~/.config/
    cp kitty.conf ~/.config/kitty/
    cp bureau.zsh-theme ~/.oh-my-zsh/themes/
    cp .zshrc ~/
    cp .vscode ~/
    git clone https://github.com/dexpota/kitty-themes.git ~/.config/kitty/
    ln -s ~/.config/kitty/kitty-themes/themes/ayu_mirage.conf ~/.config/kitty/theme.conf
    echo "${RESET}"
  fi
fi
