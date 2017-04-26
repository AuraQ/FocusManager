# Focus Manager

## Description
Allows browser focus to be controlled via client events using javascript or jQuery.

## Contributing
For more information on contributing to this repository visit Contributing to a GitHub repository

## Typical usage scenario
In specific situations you might want to control user focus.
A few examples:
-	User opens a popup and keyboard focus is lost
-	When typing a sort code in 3 individual boxes you might want focus to be switched from one to the other automatically when the first is filled
-	You want to build custom navigation on your page based on keyboard input
-	You want to change the tabbing order for a few items without changing the tab index on all your page’s focusable items

## Features and Limitations
-	Can be triggered on any jQuery events
-	Multiple HTML elements can be listened by a single widget using CSS selectors
-	Conditions can be applied to the trigger
-	Conditions are written using JavaScript syntax  
-	You can use context entity attributes in your conditions (ex: [%attribute%] ===false)
-	Attributes are formatted as strings within the widget, thus preventing client code injection
-	You can also query any objects returned by the event you’re using (ex: args.keyCode == 32)
-	Besides entity attributes, yours conditions will get interpreted as code, if you want to use a hardcoded string don’t forget to include it in quote marks (ex: [%attribute%] ===”string”)

## Properties
### Event
The event you wish to subscribe to. The subscription is created via a $.on(event,function) call, for more details and examples see jQuery Documentation.
This can be any jQuery event, such as: “click”,”keyup”,”keydown”,”focus”,”mouseover”,etc. for a list of events see jQuery documentation.
### Listened object
This property allows you to select one or more DOM items to which you want to subscribe. 
For example: A click event while listening to cancel buttons will only get triggered when the user clicks a cancel button.
You can target the listened object(s) via selectors (#id, .class, .class[attr=x], etc.). For a guide on selectors see W3Schools.
### Focus target
This contains the object to be targeted, which is selected using the same method as the listened object(s). You will need to use selectors that return a single object in this field.
### Condition
Using a condition, you can specify the circumstances in which the focus change will trigger. 
This is a conditional attribute, but most of the time you will want to use an attribute of the current entity to determine when the focus should be switched. 
For example if you want to change focus in between sort code fields you might use a condition that looks like: [%SortCodePart1%].length>1
The condition gets interpreted as JavaScript language, and attributes as strings, thus you can use any string methods on the attributes. The attributes are also protected against injection by this conversion to string. Do not use

## How to use
### Installation
Import the widget to your project and add it to any view. Configure the properties, using jQuery events, CSS selectors and JavaScript, to determine how the widget will behave in your application.
### Examples
| |	Navigate to section 1 |	Set focus on hover	| Date of birth – Day to Month |
| ---------- |---------- | ---------- |---------- |
| Event	| keyup |	mouseover |	keyup |
| Listened target |	body	| .focusable-element |	.dob-day |
| Target |	.section-one |	.focusable-element |	.dob-month |
| Condition |	args.keyCode == 97 |	|	[%DoBDay%].length>1 |

#### Example 1
The widget will focus the element with a section-one class whenever Numpad 1 is pressed. 
You can use this to navigate from chapter to chapter, or in between form segments.
#### Example 2
Grants the object with a focusable-element class focus when it’s hovered. If there is more than one object with that class, the last one will always be focused.
#### Example 3
Switches focus from items with a class dob-day to the object with a class dob-month after a key is pressed and the attribute DoBDay of the context entity is 2 or more characters long.
## Known errors
-	The widget will error if put into a dataview configured to listen to another view.
