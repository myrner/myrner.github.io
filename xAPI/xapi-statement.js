function send_statement(verb, verbId, object, objectId) {
  var player = GetPlayer();
  var uNamejs = player.GetVar("uName");
  var uEmailjs = player.GetVar("uEmail");
  var conf = {
    "endpoint": "https://trial-lrs.yetanalytics.io/xapi/",
    "auth": "Basic " + toBase64("0855df56592e3ea698bdb0ff12d9825c:4fffe16dcac56b04fa4bcd855793cbaf")
  };
  ADL.XAPIWrapper.changeConfig(conf);
  var statement = {
    "actor": {
      "name": uNamejs,
      "mbox": "mailto:" + uEmailjs
    },
    "verb": {
      "id": verbId,
      "display": { "en-US": verb }
    },
    "object": {
      "id": objectId,
      "definition": {
        "name": { "en-US": object }
      }
    }
  };
  var result = ADL.XAPIWrapper.sendStatement(statement);
} 