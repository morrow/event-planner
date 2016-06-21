# Meet-Up Event Planner #
## Requirements ##
*You do not need to create a functioning back-end or save user information. Only the form components themselves and their performance will be evaluated.*
1) The app must provide a form for users to create an account. Account creation should include, but is not limited to:
  * Name
  * Email address
  * Secure password (with character and length requirements)
  * Optional public biographical information (such as employer, job title, birthday, etc)
2) The app should allow users to create a new event. Each event should, at a minimum, allow a user to set:
  * Name of the event
  * Type of the event (birthday party, conference talk, wedding, etc.)
  * Event host (could be an individual’s name or an organization)
  * Event start date and time
  * Event end date and time
  * Guest list
  * Location
  * Optional message to the guests with additional information about the event
3) The app should display events that have been created.
## Tips, Tricks, and Advice ##
You may find that you want to save user information in some way, as opposed to just hard-coding in a few events to meet the “display events” requirement. You could accomplish this by using localStorage or by using a “back-end as a service” platform like Firebase.
You can use any framework you’d like - or don’t! It’s up to you.
Need some help testing your site with a screen reader? Check out this video from our Responsive Images course for some tips.
Use this checklist as a reference to help you throughout this project.
## Evaluation ##
Your project will be evaluated by a Udacity reviewer according to the rubric below. Be sure to review it thoroughly before you submit. All criteria must "meet specifications" in order to pass.

### Completion ###
---
- [ ] Completion: Required Features
      App includes all requirements - account creation, event creation and event display.
- [ ] Completion: Account Creation
      You do not need to create a real back-end or save user information, but the app must provide a form for users to create an account. Account creation should include the following required and optional fields at a minimum.
      * Required fields:
        * Name
        * Email address
        * Secure password (with character and length requirements)
      * Optional fields:
        * Public biographical information (such as employer, job title, birthday, etc). This field can be optional to the user submitting the form.
- [ ] Completion: Event Creation
      The app should allow users to create a new event. Each event should, at a minimum, allow a user to set the following required and optional fields.
      * Required fields:
        * Name of the event
        * Type of the event (birthday party, conference talk, wedding, etc.)
        * Event host (could be an individual’s name or an organization)
        * Event start date and time
        * Event end date and time
        * Guest list
        * Location
      * Optional fields:
          * Optional message to the guests with additional information about the event
- [ ] Completion: Event Display
      The app should display events that have been created.

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
      App includes a build process (such as Grunt or Gulp). Assets are minimized and concatenated as appropriate.
