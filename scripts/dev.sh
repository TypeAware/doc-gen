#!/usr/bin/env bash

root="$(cd "$(dirname $(dirname "$0"))" && pwd)"

cd "$root";

#gnome-terminal --tab -- './scripts/start-ts-node.sh'

export FORCE_COLOR=1
export force_color_prompt=yes

func=`cat <<EOF

   add_to_history(){
      history -s 'nrestart -- ./scripts/static-server.sh';
   }

   ocmd(){
      add_to_history
      nrestart -- ./scripts/static-server.sh
   }

   export -f ocmd
   export -f add_to_history

EOF`


#gnome-terminal --title="static-server" --tab -- bash -c "$func; export -f ocmd; history -s bar; trap bash EXIT; trap bash SIGINT; ( nrestart -- ./scripts/static-server.sh ) "


#gnome-terminal --title="static-server" \
#               --tab \
#               -- bash -c "$func; trap bash SIGINT; trap bash EXIT; add_to_history; ocmd;"


#gnome-terminal --title="static-server" \
#               --tab \
#               -c "bash -c '$func; trap bash SIGINT; trap bash EXIT; add_to_history; ocmd;'"


gnome-terminal --geometry=73x16+0+0 --window \
  --working-directory="$HOME" --title='Atheists are puppets of the State' -e "bash" \
  --tab --title="tsc-watch" -e "bash" \
  --tab --title="bar" -- bash -c "$func; export -f ocmd; history -s bar; trap bash EXIT; trap bash SIGINT; ( nrestart -- ./scripts/static-server.sh )"


exit 1;

gnome-terminal --title="tsc-watch" --tab -- bash -c  './scripts/tsc-watch-api-dev.sh && read'

gnome-terminal --title="ng-build-watch-dev" --tab -- bash -c  './scripts/dev-api-app.sh && read'

gnome-terminal --title="ts-node" --tab -- bash -c  './scripts/start-ts-node.sh && read'

#gnome-terminal -- 'echo "foo" | bash'