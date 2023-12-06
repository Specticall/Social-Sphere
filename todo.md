# 1. Login
DONE
-> Set activeUserId state to the logged in user object (use find method to search the array with the given id)

DONE
-> Convert user object array to state (so we can update it in the future)

# 2. Feeds
DONE
-> Pass in activeUserId state and get data from user object

DONE
-> get max 5 random person id that is not in the activeUser's friendslist and add them to a state called "recommended"
DONE
-> each recommened ID will get mapped into the user object itself  

-> get friendRequest from user object and add them to a state called "friendReqs"
-> each friendreqs will turn get mapped into a user object too.


-> Check if the person's friend list contains a story, if yes then add them (in story object form, taken from user object) into an array then place on a state called "stories"

    Friends    Incoming   Outgoing
01: 05 03 04 | 07 09    | 08
02: 08 07 06 | 03       |
03: 01 09 04 |          | 02
04: 01 03 05 | 09       |
05: 01 09 04 | 06       |
06: 02 07 08 |          | 05
07: 02 06 09 |          | 01
08: 02 06    | 01       |
09: 03 05 07 |          | 01 04