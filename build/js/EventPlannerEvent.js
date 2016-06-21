function EventPlannerEvent(eventData){
  var self = this;
  this.attributes = ['id', 'name', 'type', 'host', 'location', 'start', 'end', 'capacity', 'info', 'guestlist'];
  this.attributes.forEach(function(attribute){
    if(eventData[attribute] !== undefined){
      self[attribute] = eventData[attribute];
    }
  });
}

EventPlannerEvent.prototype.render = function(output){
  var self = this;
  // render template if loaded, otherwise load template
  if(this.template){
    // replace handlebar tokens with evaluated result of token code
    output.innerHTML += this.template.replace(/\{\{.*?\}\}/g, function(token){
      return function() {
        try {
          if(eval(token) !== undefined) { return eval(token); }
        } catch(e){
        }
        return '';
      }.call(self);
    });
  } else {
    // load template
    var request = new XMLHttpRequest();
    request.addEventListener('load', function(e){
      self.template = e.target.responseText;
      self.render(output);
    });
    request.open('GET', 'event.hbs.html');
    request.send();
  }
};

EventPlannerEvent.prototype.getIndefiniteArticle = function(noun){
  if(noun !== undefined){
    if(noun[0].match(/a|e|i|o|u/i)){
      return 'An';
    } else {
      return 'A';
    }
  }
};

EventPlannerEvent.prototype.getStartDate = function(){
  return (new Date(this.start)).toLocaleDateString(navigator.language, {weekday: 'long', month:'long', day: 'numeric', year:'numeric'});
};

EventPlannerEvent.prototype.getStartTime = function(){
  return (new Date(this.start)).toLocaleTimeString(navigator.language, {hour:'2-digit', minute: '2-digit'});
};

EventPlannerEvent.prototype.getEndDate = function(){
  return (new Date(this.start)).toLocaleDateString(navigator.language, {weekday: 'long', month:'long', day: 'numeric', year:'numeric'});
};

EventPlannerEvent.prototype.getEndTime = function(){
  return (new Date(this.end)).toLocaleTimeString(navigator.language, {hour:'2-digit', minute: '2-digit'});
};
