if (true || window.localStorage['eventPlanner/Event'] === undefined) {
  window.localStorage['eventPlanner/Event'] = JSON.stringify([{
    name: 'Michael\'s Retirement Party',
    type: 'Office Party',
    host: 'Dunder Mifflin',
    start: "2016-09-01T20:00:00",
    end: "2016-09-01T21:00:00",
    guestlist: 'Michael Scott, Dwight Schrute, Jim Halpert, Pam Beesly, Ryan Howard, Andy Bernard, Angela Martin, Kelly Kapoor, Oscar Martinez',
    capacity: 30,
    location: 'Dunder Mifflin Paper Company, Scranton, PA',
    description: 'The best retirement party ever'
  }]);
}
