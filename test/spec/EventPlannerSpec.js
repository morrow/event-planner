describe('Event Planner', function(){
  var testEventData = {
    name: 'Test Event',
    type: 'Test Type',
    host: 'Test Host',
    start: "2016-06-01T20:00:00",
    end: "2016-06-01T22:00:00",
    guestlist: 'Guest 1, Guest 2, Guest 3',
    capacity: 30,
    location: 'New York, NY',
    description: 'Test Description'
  };
  var testEventData2 = {
    name: 'Test Event 2',
    type: 'Test Type',
    host: 'Test Host',
    start: "2016-11-01T20:00:00",
    end: "2016-11-01T22:00:00",
    guestlist: 'Guest 1, Guest 2, Guest 3',
    capacity: 10,
    location: 'New York, NY',
    description: 'Test Description'
  };
  var testUserData = {
    name:                  'Test User',
    email:                 'testuser@example.com',
    password:              'changeme',
    password_confirmation: 'changeme',
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

      it('should have required name, email, and password attributes', function(){
        eventPlanner.createUser(testUser);
        ['name', 'email', 'password'].forEach(function(attribute){
          expect(eventPlanner.getUser(0)[attribute]).toBeDefined();
          expect(eventPlanner.getUser(0)[attribute]).toBe(testUser[attribute]);
        });
      });

      it('should allow creation of optional employer and biography attributes', function(){
        eventPlanner.createUser(testUser);
        ['employer', 'biography'].forEach(function(attribute){
          eventPlanner.getUser(0)[attribute] = 'test' + attribute;
        });
        expect(eventPlanner.getUser(0).employer).toBeDefined();
        expect(eventPlanner.getUser(0).biography).toBeDefined();
      });
    });

    describe('Event Planner Event', function(){
      var eventPlanner, testEvent, testUser;

      beforeEach(function(){
        testUser = new User(testUserData);
        eventPlanner = new EventPlanner();
        testEvent = new EventPlannerEvent(testEventData);
      });

      it('should let a user create an event', function(){
        eventPlanner.createEvent(testEvent);
        expect(eventPlanner.getEvent(0)).toBe(testEvent);
      });

      it('should have name, type, host, start, end, guestlist, location attributes', function(){
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
        testEvent = new EventPlannerEvent(testEventData);
        testEvent2 = new EventPlannerEvent(testEventData2);
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
