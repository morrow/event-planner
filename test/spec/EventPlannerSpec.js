describe('Event Planner', function(){
  var testEventData = {
    name: 'Test Event',
    type: 'Test',
    host: 'Dunder Mifflin',
    start: "2016-06-01T20:00:00",
    end: "2016-06-01T22:00:00",
    guestlist: 'Michael Scott, Dwight Schrute, Jim Halpert, Pam Beesly, Ryan Howard, Andy Bernard, Angela Martin, Kelly Kapoor, Oscar Martinez',
    capacity: 30,
    location: 'Dunder Mifflin Paper Company, Scranton, PA',
    description: 'The best retirement party ever'
  };
  var testEventData2 = {
    name: 'Test Event 2',
    type: 'Office Party',
    host: 'Dunder Mifflin',
    start: "2016-06-01T20:00:00",
    end: "2016-06-01T22:00:00",
    guestlist: 'Michael Scott, Dwight Schrute, Jim Halpert, Pam Beesly, Ryan Howard, Andy Bernard, Angela Martin, Kelly Kapoor, Oscar Martinez',
    capacity: 30,
    location: 'Dunder Mifflin Paper Company, Scranton, PA',
    description: 'The best retirement party ever'
  };
  var testUserData = {
    name:                  'Test User',
    email:                 'testuser@example.com',
    password:              'changeme',
    password_confirmation: 'changeme',
    bio: {
      employer: 'google'
    }
  };

  describe('Required Features for Completion', function(){

    describe('Event Planner User', function(){
      var testUser, eventPlanner;

      beforeEach(function(){
        eventPlanner = new EventPlanner();
        testUser = new User(testUserData);
      });

      it('should let a user create an account', function(){
        eventPlanner.createUser(testUser);
        expect(eventPlanner.getUser(0)).toBe(testUser);
      });

      it('should have name, email, password, and bio attributes', function(){
        eventPlanner.createUser(testUser);
        ['name', 'email', 'password', 'bio'].forEach(function(attribute){
          expect(eventPlanner.getUser(0)[attribute]).toBeDefined();
          expect(eventPlanner.getUser(0)[attribute]).toBe(testUser[attribute]);
        });
      });

    });

    describe('Event Planner Event', function(){
      var eventPlanner, testEvent, testUser;

      beforeEach(function(){
        testUser = new User(testUserData);
        eventPlanner = new EventPlanner();
        testEvent = new EventPlannerEvent(eventPlanner, testEventData);
      });

      it('should let a user create an event', function(){
        eventPlanner.createEvent(testEvent);
        expect(eventPlanner.getEvent(0)).toBe(testEvent);
      });

      it('should have name, type, host, start, end, guest_list, location attributes', function(){
        eventPlanner.createEvent(testEvent);
        ['name', 'type', 'host', 'start', 'end', 'guestlist', 'location'].forEach(function(attribute){
          expect(eventPlanner.getEvent(0)[attribute]).toBeDefined();
          expect(eventPlanner.getEvent(0)[attribute]).toBe(testEvent[attribute]);
        });
      });

    });

    describe('Event Planner Display', function(){
      var testUser, testEvent, eventPlanner;

      beforeEach(function(){
        testUser = new User(testUserData);
        eventPlanner = new EventPlanner();
        testEvent = new EventPlannerEvent(eventPlanner, testEventData);
        testEvent2 = new EventPlannerEvent(eventPlanner, testEventData2);
      });

      it('should display events that have been created', function(done){
        eventPlanner.createEvent(testEvent);
        eventPlanner.createEvent(testEvent2);
        eventPlanner.renderEvents(document.querySelector('#events'));
        setTimeout(function(){
          expect(document.querySelector('#events .event')).not.toBeNull();
          expect(document.querySelectorAll('#events .event').length).toBe(eventPlanner.events.length);
          done();
        }, 500);
      });
    });

  });

});
/*
### User Experience ###
---
- [ ] UX: Mobile Experience
      On mobile, the form is fully functional and reacts to touches naturally.
- [ ] UX: Screen Reader Compatibility
      The form is understandable while using a screen reader.
- [ ] UX: Logical Order of Form
      Form prompts appear in a logical order.

### Responsiveness ###
---
- [ ] Responsiveness: Responsive Design
      Content is responsive and presents all information clearly on a variety of devices (including desktop, tablet, and mobile).

### Form Design ###
---
- [ ] Prompts
      Most form prompts (including labels, placeholders, etc) are designed for users and their goals - they are phrased in friendly, human language.
- [ ] Simplified Design
      There are as few inputs as possible.
- [ ] Validation
      Users cannot submit a form with invalid information. Validation occurs no later than immediately after user focus leaves the input and is obvious.

### Input Design ###
---
- [ ] Auto-Fill Compatible
      Users can pre-fill inputs with existing data.

- [ ] Appropriate Input Types
      All inputs (whether or not as actual <input> elements) have appropriate types.

- [ ] Input Labeling
      All inputs are labeled (even if a placeholder replaces an actual <label>, the label should still exist for screen readers).

- [ ] Auto-Focus
      The autofocus attribute is applied to the first input above-the-fold.

- [ ] Required Attribute
      The required attribute is applied to inputs that are vital to the form’s goal and only to those vital elements.

### App Delivery ###
---
- [ ] App Delivery: Build Process
      App includes a build process (such as Grunt or Gulp). Assets are minimized and concatenated as appropriate. */
