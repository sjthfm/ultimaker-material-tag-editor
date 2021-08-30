var myNavigator = document.getElementById('myNavigator');



myNavigator.popPage({animation: 'slide', animationOptions: 'duration:0.3, delay: 0.4, timing: ease-in'});
myNavigator.pushPage('html/assessment-page.html');

{data: {title: 'Page 2'}}

myNavigator
  .pushPage('page2.html', {
    data: {
      title: 'New Page',
      // ...
    },
    // Other options
  });