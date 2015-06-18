# Frontend Nanodegree Project 4 
## Website Optimization

### To run this application
<ul>
  <li>For part 1, 
    <ol>
      <li>Install ngrok (https://ngrok.com/download), grunt CLI(http://gruntjs.com/getting-started)</li>
      <li>In <tt>build</tt> directory, type <tt>python -m SimpleHTTPServer 8000</tt></li>
      <li>In another termianl, type <tt>ngrok 8000</tt>
      <li>In project root directory, type <tt>npm install</tt> in your terminal.</li>
      <li>Run grunt by typing <tt>grunt</tt>
    </ol>
  </li>
  <li>For part 2,
    <ol>
      <li>Open <tt>views/pizza.html</tt> in python local host, or with ngrok.</li>
    </ol>
  </li>
</ul>

### Changes that I've made for part 2
<ul>
  <li>Reduced the number of <tt>mover</tt> class elements to how many pizzas can fit in a screen.</li>
  <li>In <tt>changePizzaSizes</tt>, calculated <tt>newwidth</tt> only once since all the elements use the same new width. </li>
  <li>Refactored <tt>updatePositions</tt> so that DOM elements are only accessed once outside of the for loop.</li>
  <li>Use <tt>translateX</tt> in <tt>updatePositions</tt> to move pizzas.</li>
  <li>Access elements using <tt>getElementsByClassName</tt> or <tt>getElementsById</tt> instead of <tt>querySelectorAll</tt></li>
</ul>




