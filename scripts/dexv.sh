#!/usr/bin/env bash



#gnome-terminal --geometry=73x16+0+0 --window \
#  --working-directory=/depot --title='A' -e "bash -c ls;bash" \
#  --tab --working-directory=/depot/kn --title='B' -e "bash -c ls;bash"

#gnome-terminal --geometry=73x16+0+0 --window \
#  --working-directory="$HOME" --title='A' -x bash -c ". $HOME/nrestart/foo.sh; ocmd;" \
#  --tab --working-directory=/depot/kn --title='B' -e "bash -c ls;bash"


#gnome-terminal --geometry=73x16+0+0 --window \
# --tab --title="111" -x bash -c ". $HOME/nrestart/foo.sh; add_traps; ocmd; bash;" \
# --tab --title="222" -x bash -c ". $HOME/nrestart/foo.sh; add_traps; ocmd; bash;" \
# --tab --title="333" -x bash -c ". $HOME/nrestart/foo.sh; add_traps; ocmd; bash;" \
# --tab --title="444" -x bash -c ". $HOME/nrestart/foo.sh; add_traps; ocmd; bash;"

foo(){
 ./scripts/foo.sh
}

export -f foo;

gnome-terminal --geometry=73x16+0+0 --window --title="Main Tab" \
 --tab --title="111" -e "bash -c 'foo; add_traps; ocmd;'" \
 --tab --title="222" -e "bash -c 'foo; add_traps; ocmd;'" \
 --tab --title="333" -e "bash -c 'foo; add_traps; ocmd;'" \
 --tab --title="444" -e "bash -c 'foo; add_traps; ocmd;'"