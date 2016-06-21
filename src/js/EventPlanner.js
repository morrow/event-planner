function EventPlanner(output){
  this.users = [];
  this.events = [];
  this.output = output;
  this.initialize();
}

EventPlanner.prototype.initialize = function(){
  if(this.output !== undefined){
    this.attachEventListeners();
    this.loadSavedData();
    this.renderEvents();
  }
  this.initialized = true;
};

EventPlanner.prototype.filterEvents = function(query){
  [].forEach.call(document.querySelectorAll('.event'), function(_event){
    if(query == '' || query == ' '){
      document.querySelector('#events h1').innerHTML = 'Events';
      _event.className = _event.className.replace(' highlighted', '');
      _event.style.display = '';
    }
    else {
      document.querySelector('#events h1').innerHTML = 'Search Results for '  + ': ' + query;
      try {
        if(_event.textContent.match((new RegExp(query, 'i')))){
          if(!_event.className.match(/highlighted/)){
            _event.className += ' highlighted';
          }
          _event.style.display = '';
        } else {
          _event.style.display = 'none';
        }
      } catch(e){
        _event.style.display = '';
        console.log(e);
      }
    }
  });
};

EventPlanner.prototype.attachEventListeners = function(){
  var self = this;
  // handle search event
  document.querySelector('#search-input').addEventListener('input', function(e){
    self.filterEvents(e.target.value);
  });
  // handle form form submit event
  [].forEach.call(document.querySelectorAll('form'), function(form){
    form.addEventListener('submit', function(e){
      try {
        // submit form if validated
        if(self.validateForm(this)){
          self.submitForm(this);
        }
      } catch(e){
        // show error dialog if necessary
        self.showErrorDialog(e);
      }
      // prevent form from natively submitting
      e.preventDefault();
      return false;
    });
  });
  // validate form elements on input
  [].forEach.call(document.querySelectorAll('form input, form textarea'), function(element){
    element.addEventListener('input', function(){
      self.validateElement(element);
    });
  });
  // click/touch events
  ['onclick', 'touchstart'].forEach(function(listener){
    // login
    if(document.querySelector('#login') && document.querySelector('#logout') && document.querySelector('#register')) {
      document.querySelector('#login')[listener] = function(){
        self.showDialog('login');
      };
      // logout
      document.querySelector('#logout')[listener] = function(){
        self.setCurrentUser(undefined);
      };
      // register
      document.querySelector('#register')[listener] = function(){
        self.showDialog('register');
      };
    }
    // create event
    [].forEach.call(document.querySelectorAll('.new-event'), function(button){
      button[listener] = function(){
        if(self.current_user){
          if(self.events[self.events.length - 1] && self.events[self.events.length - 1].name === undefined){
            self.editEvent(self.events[self.events.length - 1]);
          } else {
            self.createEvent({});
          }
          self.showDialog(['create-edit-event', 'create-event']);
        }
        else {
          self.showDialog(['login', 'unauthorized']);
        }
      };
    });
    // delete event
    if(document.querySelector('#create-edit-event-delete')){
      document.querySelector('#create-edit-event-delete')[listener] = function(e){
        var id = document.querySelector('#create-edit-event-id').value;
        self.events.splice(parseInt(id), 1);
        self.events.slice(id).forEach(function(_event){
          _event.id -=1;
        });
        self.renderEvents();
        self.saveData();
        self.closeDialog();
        e.preventDefault();
        return false;
      };
    }
    // show registration
    if(document.querySelector('#show-registration-dialog')){
      document.querySelector('#show-registration-dialog')[listener] = function(){
        self.showDialog('register');
      };
    }
    if(document.querySelector('#show-login-dialog')){
      // show registration
      document.querySelector('#show-login-dialog')[listener] = function(){
        self.showDialog('login');
      };
    }
    // close overlay
    if(document.querySelector('#overlay')){
      document.querySelector('#overlay')[listener] = function(e){
        if(e.target.id == 'overlay'){
          self.closeDialog();
        }
      };
    }
  });
};

EventPlanner.prototype.initializeAutocomplete = function(){
  this.autocomplete = new google.maps.places.Autocomplete((document.querySelector('#create-edit-event-location')));
};

EventPlanner.prototype.saveData = function(){
  var self = this;
  if(this.initialized){
    ['users', 'events'].forEach(function(item){
      if(self[item] !== undefined){
        window.localStorage['eventPlanner/' + item[0].toUpperCase() + item.slice(1, item.length - 1)] = JSON.stringify(self[item]);
      }
    });
  }
};

EventPlanner.prototype.sortElements = function(){
  // get all event elements
  var events = document.querySelectorAll('.event');
  // sort elements by event id
  var sorted_elements = [].map.call(events, function(x){ return x; }).sort(function(a,b){ return parseInt(a.id) > parseInt(b.id); });
  // if all events are rendered, replace existing event list with sorted event list
  if(events.length == this.events.length){
    this.output.innerHTML = sorted_elements.map(function(element){ return element.outerHTML; }).join('');
  }
};

EventPlanner.prototype.loadSavedData = function(){
  var self = this;
  ['User', 'Event'].forEach(function(category){
    if(window.localStorage['eventPlanner/' + category] !== undefined){
      try {
        self['create' + category + 's'](JSON.parse(window.localStorage['eventPlanner/' + category]));
      } catch(e){
        window.console.log(e);
      }
    }
  });
  // if current user is not loaded, set to first user
  if(this.current_user === undefined){
    this.setCurrentUser(this.users[0]);
  }
};

EventPlanner.prototype.createUsers = function(users){
  var self = this;
  users.forEach(function(user){
    self.createUser(user);
  });
};

EventPlanner.prototype.createEvent = function(_event){
  _event.id = this.events.length;
  if(!(_event instanceof EventPlannerEvent) && typeof(_event) === 'object'){
    _event = new EventPlannerEvent(_event);
  }
  this.events.push(_event);
  this.editEvent(_event);
  this.saveData();
};

EventPlanner.prototype.createEvents = function(events){
  var self = this;
  events.forEach(function(_event){
    self.createEvent(_event);
  });
};

EventPlanner.prototype.createUser = function(user){
  if(!(user instanceof User) && typeof(user) === 'object'){
    user = new User(user);
  }
  this.users.push(user);
  if(user.current_user){
    this.setCurrentUser(user);
  }
  this.saveData();
};

EventPlanner.prototype.getUser = function(index){
  return this.users[index];
};

EventPlanner.prototype.getEvent = function(index){
  return this.events[index];
};

EventPlanner.prototype.renderEvents = function(output){
  var self = this;
  if(output === undefined){
    output = this.output;
  }
  output.innerHTML = '';
  this.events.forEach(function(_event){
    _event.render(output);
  });
  // sort elements
  this.sortElements(this.output);
};

EventPlanner.prototype.submitForm = function (form){
  var self = this;
  if(form.id === 'register-form'){
    var user_obj = {};
    ['name', 'email', 'password'].forEach(function(attribute){
      user_obj[attribute] = form.querySelector('#register-' + attribute).value;
    });
    var user = new User(user_obj);
    user.password = user.encryptPassword(user.password);
    this.users.push(user);
    this.saveData();
    this.setCurrentUser(user);
    this.showDialog('session-start');
    window.setTimeout(function(){ self.closeDialog(); }, 750);
  }
  else if(form.id === 'login-form'){
    this.users.forEach(function(user){
      if(user.email == form.elements['login-email'].value){
        self.saveData();
        self.setCurrentUser(user);
        self.showDialog('session-start');
        window.setTimeout(function(){ self.closeDialog(); }, 750);
      }
    });
  }
  else if(form.id === 'create-edit-event-form'){
    var index = parseInt(form.elements['create-edit-event-id'].value);
    var _event = this.events[index];
    _event.attributes.forEach(function(attribute){
      _event[attribute] = form.elements['create-edit-event-' + attribute].value;
    });
    this.saveData();
    this.closeDialog();
    this.renderEvents();
  }
};

EventPlanner.prototype.setCurrentUser = function(user){
  this.current_user = user;
  [].forEach.call(document.querySelectorAll('#user button'), function(button){
    button.style.display = 'none';
    if(user !== undefined){
      if(button.id.match(/user|logout/)){
        if(button.id == 'current_user'){
          button.innerHTML = user.email;
        }
        button.style.display = '';
      }
    } else {
      if(button.id.match(/register|login/)){
        button.style.display = '';
      }
    }
  });
};

EventPlanner.prototype.validateElement = function(element){
  if(element.id.match(/register/)){
    if(element.type == 'password'){
      return this.validatePasswords(element.parentNode.parentNode);
    }
    if(element.type == 'email'){
      return this.validateEmail(element);
    }
    if(element.type == 'text' && element.id.match(/name/)){
      return this.validateName(element);
    }
  }
};

EventPlanner.prototype.validatePasswords = function (form) {
  // get password elements
  var password_a_element = form.querySelectorAll('[type=password]')[0];
  var password_b_element = form.querySelectorAll('[type=password]')[1];
  // get password values
  var password_a = password_a_element.value;
  var password_b = password_b_element.value;
  // return true if blank passwords
  if(password_a == password_b && password_a == ''){ return true; }
  // messages
  var messages = ['Passwords must', 'be longer than 6 characters', 'contain a symbol ($!&)', 'contain a number', 'contain a lowercase letter', 'contain an uppercase letter'];
  // tests
  var tests = [
    function(a){ return a.length > 6; },
    function(a){ return a.match(/[\!\@\#\$\%\^\&\*]/g); },
    function(a){ return a.match(/[0-9]/g); },
    function(a){ return a.match(/[a-z]/g); },
    function(a){ return a.match(/[A-Z]/g); }
  ];
  this.evaluateRequirements(password_a_element, tests, messages);
  this.evaluateRequirements(password_b_element, [function(){ return password_a == password_b; }], ['match']);
};

EventPlanner.prototype.validateLogin = function(form){
  var self = this;
  var email_element = form.elements['login-email'];
  var password_element = form.elements['login-password'];
  var passing = false;
  [].forEach.call(self.users, function(user){
    if(user.email === email_element.value && user.login(password_element.value)){
      passing = true;
    }
  });
  if(!passing){ this.evaluateRequirements(password_element, [function(){ return false; }], ['E-mail or Password incorrect']); }
  return passing;
};

EventPlanner.prototype.validateEmail = function(element){
  var messages = ['E-mail', 'Must be valid e-mail address', 'Must not be already registered'];
  var tests = [
    function(a){ return a.match(/^\S+@\S+$/); }
  ];
  this.evaluateRequirements(element, tests, messages);
};

EventPlanner.prototype.validateName = function(element){
  var messages = ['Name', 'is required'];
  var tests = [
    function(a){ return a.match(/\w*/); }
  ];
  this.evaluateRequirements(element, tests, messages);
};

EventPlanner.prototype.validateForm = function(form){
  var validated = true;
  if(form.id.match(/login/)){
    return this.validateLogin(form);
  }
  [].forEach.call(form.querySelectorAll('input'), function(input){
    if(input.getAttribute('data-validated') == 'false'){
      input.style.border = '3px solid red';
      input.onkeydown = function(){
        this.style.border='';
        this.onkeydown = function(){};
      };
      validated = false;
    }
  });
  return validated;
};

EventPlanner.prototype.evaluateRequirements = function(element, tests, messages){
  // reset failing status for element
  element.setAttribute('data-validated', true);
  // create requirements element
  var requirements = document.createElement('div');
  requirements.className = 'requirements';
  if(messages.length > 1){
    requirements.innerHTML = '<h4>' + messages.shift() + '<h4>';
  }
  requirements.setAttribute('id', element.id + '-requirements');
  // run each test and add result to requirements element
  for(var i = 0; i < tests.length; i++){
    var requirement = document.createElement('div');
    requirement.textContent = messages[i];
    requirement.className = 'requirement';
    requirement.setAttribute('data-validated', true);
    if(!tests[i](element.value)){
      requirement.setAttribute('data-validated', false);
      element.setAttribute('data-validated', false);
    }
    requirements.appendChild(requirement);
  }
  var _requirements = document.querySelector('#' + element.id + '-requirements');
  if(_requirements){
    _requirements.innerHTML = requirements.innerHTML;
  } else{
    element.parentNode.insertBefore(requirements, this.nextSibling);
  }
};

EventPlanner.prototype.editEvent = function(_event, show_dialog){
  if(this.output === undefined){ return false; }
  if(typeof(_event) == "number" || typeof(_event) == "string"){
    if(typeof(_event) == "string"){
      _event = parseInt(_event);
    }
    _event = this.events[_event];
  }
  _event.attributes.forEach(function(attribute){
    if(_event[attribute] !== undefined){
      document.querySelector('#create-edit-event-' + attribute).value = _event[attribute];
    } else {
      document.querySelector('#create-edit-event-' + attribute).value = '';
    }
  });
  if(show_dialog){
    this.showEditDialog();
  }
};

EventPlanner.prototype.closeDialog = function(){
  document.querySelector('body').className = document.querySelector('body').className.replace('overlay-active', '');
};

EventPlanner.prototype.showDialog = function(action){
  // hide all dialog actions
  var elements = document.querySelectorAll('#dialog [data-dialog-action]');
  [].forEach.call(elements, function(element){
    element.style.display = 'none';
  });
  // get list of elements
  if(typeof(action) === 'object'){
    // parse query selector if action is list of actions
    var selectors = [];
    action.forEach(function(a){
      selectors.push('#dialog [data-dialog-action=' + a + ']');
    });
    // grab elements associated with the actions input
    elements = document.querySelectorAll(selectors.join(', '));
  } else {
    // grab elements associated with the action input
    elements = document.querySelectorAll('#dialog [data-dialog-action=' + action + ']');
  }
  // display elements
  [].forEach.call(elements, function(element){
    element.style.display = 'block';
  });
  // show overlay
  document.querySelector('body').className = 'overlay-active';
};

EventPlanner.prototype.showEditDialog = function(){
  if(this.current_user){
    this.showDialog(['create-edit-event', 'edit-event']);
  }
  else {
    this.showDialog(['login', 'unauthorized']);
  }
};

EventPlanner.prototype.showErrorDialog = function(error){
  if(error === undefined){
    error = 'Sorry, something went wrong. Please try your request again.';
  }
  document.querySelector('#error').innerHTML = error;
  this.showDialog(['error']);
};
