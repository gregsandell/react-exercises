# Misc React Exercises
## Counter
Original source:  toptal.com code challenge, June 2022.  Simple demonstration 
of a state variable, using the old-fashioned *class* approach to components.
## ToDoList
A pretty standard, bare bones ToDo List.  Clicking on each ToDo toggles
it as done vs in progress, and text at the bottom tallies incomplete
vs complete tasks. Original source:  code challenge from toptal.com, June 2022.

## Autocomplete widget
The idea for this came from a tutorial:  [How To Build an Autocomplete Component in React](https://www.digitalocean.com/community/tutorials/react-react-autocomplete), but I did not 
peek at their solution.  Their sandbox demo is [here](https://codesandbox.io/s/8lyp733pj0).  That solution may also be found
in the present project with name **AutocompleteOnline**.

An array of matches should be provided as a property, for example:
```javascript
"Alligator",
"Bask",
"Crocodilian",
"Death Roll",
"Eggs",
"Jaws",
"Reptile",
"Solitary",
"Tail",
"Wetlands"
```
Substring matches should work.

The UI should have a title, brief instructions, and an &lt;input&gt; field. An initial message appears when there are no matches, or empty input.

Matches should be incremental, results change as you type.

Matches appear as a kind of &lt;select&gt; attached to the bottom of the &lt;input&gt;.

Css styling should apply to the &lt;select&gt; options:

1. The first one is highlighted by default; this is the current selection
2. As the mouse hovers over any others below the first, they also highlight in addition to the current selection
3. The up and down arrow keys will move the current selection up and down.

When clicking on an option, or pressing Return on a highlighted option:
1. The &lt;input&gt; is replaced with the full text of the current selection
2. The options list vanishes


## OrganizeTeams
This challenge comes from [React Coding Interview Challenge 21](https://medium.com/@justin.sherman/react-coding-interview-challenge-21-c4fc68c823a3).

I tweaked the requirements to include clicking on player inside their
team boxes, which make them return to the player pool.

## WordByWord
This challenge comes from [React Coding Interview Challenge 20](https://medium.com/@justin.sherman/react-coding-interview-challenge-20-87d5707ecefe).

My version accomplishes it with DOM manipulation.  It works, but admittedly
direct DOM manipulation is not in the spirit of React.

My version does not require a submit button or RETURN press, it 
automatically starts printing on any newly typed input.

## WordByWordPublished 
The solution published in the original article (see link above).  It
uses state instead of DOM manipulation (which is good React style)
but it is doing more work because it re-renders the whole output,
plus the latest new word, every 500 msec. Their version uses a submit
button, which is a better user experience.

## Pagination 
This challenge comes from [React Coding Interview Challenge 18](https://medium.com/@justin.sherman/react-coding-interview-challenge-18-257bbcb7429a).

## StarRating
This challenge comes from [React Coding Interview Challenge 12](https://medium.com/@justin.sherman/react-coding-interview-challenge-12-b8d7d13c96e6).

My approach uses a <Star> component for each star.  The clicked and hover
states are stored at the parent level and the state variables and setter
are passed down as props.  Although the <Star> component approach is
good React style, the state management is overly busy.  

## StarRatingPublished
The solution published in the original article (see link above). More concise
than my solution, but at the cost of having no <Star> child component.
Also it avoids the use of loops that were in my solution.  But the
hover requirement does not appear to have been met correctly (hovers are
overriding previously clicked stars).

## Quiz 
This challenge comes from [React Coding Interview Challenge 8](https://medium.com/@justin.sherman/react-coding-interview-challenge-8-f852c6d19385).

# Other Sources of challenges

* [9 JavaScript Projects You Can Build to Perfect Your Coding Skills](https://javascript.plainenglish.io/9-javascript-projects-you-can-build-to-perfect-your-coding-skills-1e8b23e53392)
