/* sample xapi statement */

var player = GetPlayer();
var uNamejs = player.GetVar("uName");
var uEmailjs = player.GetVar("uEmail");


{
   "actor": {
       "name": uNamejs,
       "mbox": "mailto:" + uEmailjs
   }, 
   "verb": {
       "id":"http://activitystrea.ms/schema/1.0/complete",
       "dispay": { "en-US": "completed" }
   }, 
   "object": {
       "id": "http://www.devlinpeck.com/write-xapi-statement",
       "definition": {
           "name": { "en-US": "Write xAPI Statement Tutorial" }
       }
   }
}