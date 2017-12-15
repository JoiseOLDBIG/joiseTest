const entranceAnimationDuration = 1.5;
var wheelRotationSpeed = 0.5;
var shakingReppetition = 3;
var staggerStrokesDelay = 0.005;
var speedStrokesToFull = 0.5;
var timeForStrokesToBeFull = document.querySelectorAll("#mainpaths path").length * staggerStrokesDelay + speedStrokesToFull;
var staggerFillDelay = 0.04;
var timeForPathToFill = 1;
var timeUntilAnimationOver = timeForStrokesToBeFull + (document.querySelectorAll("#mainpaths path:nth-child(8n+1").length * staggerFillDelay + timeForPathToFill);
var strokeAnimationSpeed = 0.5;
var fillAnimationSpeed = 2;
var fillAnimationDelay = 0.5;
var delayBeforeFillPaths = 0.5;
var delayBeforeAnimationSlow = 2000;
var exitWheelRotationSpeed = 0.5;
var exitAnimationDuration = 0.7;
var exitAnimationDelay = 0.5;
var exitFrontWheelAnimationDelay = exitAnimationDelay;

var slowShakingOverTime = false;


var previousClass;
const bike = document.getElementById("bike");

const timelineEntrance = new TimelineMax({
  paused: true,
  onComplete: triggerAfterEntrance//callback
});

// fromTo(target:Object,duration:Number,fromVars:Object,toVars:Object):TweenMax
timelineEntrance.fromTo("#bike", entranceAnimationDuration, {
  rotation: -50, left: "0%", top: "0%", xPercent: -100, yPercent: -100,
}, {
  rotation:-50, left: "50%", top: "50%", xPercent: -50, yPercent: -50, ease: Back.easeOut.config(1)
});

const timelineWheels = new TimelineMax({
  paused: true,
  repeat: -1
});

//to(target:Object,duration:Number,vars:Object):TweenMax
timelineWheels.to("#bike #wheelb, #bike #wheelf", wheelRotationSpeed,
  {ease: Power0.easeNone, rotation: "+=360", transformOrigin: "50% 50%", yoyo: false}, "0");


const timelineShacking = new TimelineMax({
  paused: true,
  repeat: shakingReppetition,
  repeatDelay: 0,
});

timelineShacking.fromTo("#bike", 0.2, {
  x: 0, y: 0,
}, {
  x: 5, y: -5, repeat: 3, repeatDelay: 0.1, yoyo: true, rotation: -1
}, 0).to("#bike", (timeUntilAnimationOver - timeUntilAnimationOver / 4) / shakingReppetition, {
  rotation: 2
});

function getCurrentDemoColor(cssvar) {
  var demo1customStyles = window.getComputedStyle(bike);
  return demo1customStyles.getPropertyValue(cssvar);
}



const timelineMainAnimation = new TimelineLite({
  paused: true,
});

timelineMainAnimation.set("#bike", {opacity: 0.7}, 0)
.set("#mainpanths path:nth-child(even)", {fill: "none"}, "0")
.staggerFromTo("#mainpaths path", strokeAnimationSpeed, {drawSVG: "0 40%"}, {drawSVG: "60% 100%", yoyo: true, repeat: -1}, 1.2, "0"); 


const timelineMainFillAnimation = new TimelineLite({
  paused: true
});

timelineMainFillAnimation
  .staggerFromTo("#mainpaths path:nth-child(odd)", fillAnimationSpeed, {clearProps: "all"}, {fill: "none", yoyo: true, repeat: -1, repeatDelay: fillAnimationDelay, ease: Power4.easeOut}, 1.2, "0");

var pausetimeout;
var slowingtimeout;
var preslowingtimeout;
var timescale = {vale: 1};
var singleTweens = [];

function triggerAfterEntrance() {
  timelineShacking.play(0);
  preslowingtimeout = window.setTimeout(function() {
    timelineMainAnimation.pause();
    timelineMainFillAnimation.pause();
    TweenLite.to(timescale, timeUntilAnimationOver, {value: 0, ease: Power4.easeInOut});
    for(let i = 0; i <= timeUntilAnimationOver; i += timeUntilAnimationOver/10) {
      slowingtimeout = setTimeout(function() {
        timelineWheels.timeScale(timescale.value);
        if(slowShakingOverTime) {
          timelineShacking.timeScale(timescale.value);
        }
      }, i * 1000);
    }
    pausetimeout = setTimeout(function() {
      timelineWheels.pause();
      timelineShacking.pause();
    }, (timeUntilAnimationOver * 1000) + 1000);
    singleTweens[0] = TweenMax.staggerTo("#mainpaths path", speedStrokesToFull, {drawSVG: true}, staggerStrokesDelay);
    singleTweens[1] = TweenMax.staggerTo("#mainpaths path:nth-child(8n+1)", timeForPathToFill, { delay: timeForStrokesToBeFull - delayBeforeFillPaths, fill: getCurrentDemoColor("--animation-color-1"), clearProps: "all" }, staggerFillDelay);
    singleTweens[2] = TweenMax.staggerTo("#mainpaths path:nth-child(8n+2)", timeForPathToFill, { delay: timeForStrokesToBeFull - delayBeforeFillPaths, fill: getCurrentDemoColor("--animation-color-2"), clearProps: "all" }, staggerFillDelay);
    singleTweens[3] = TweenMax.staggerTo("#mainpaths path:nth-child(8n+3)", timeForPathToFill, { delay: timeForStrokesToBeFull - delayBeforeFillPaths, fill: getCurrentDemoColor("--animation-color-3"), clearProps: "all" }, staggerFillDelay);
    singleTweens[4] = TweenMax.staggerTo("#mainpaths path:nth-child(8n+4)", timeForPathToFill, { delay: timeForStrokesToBeFull - delayBeforeFillPaths, fill: getCurrentDemoColor("--animation-color-4"), clearProps: "all" }, staggerFillDelay);
    singleTweens[5] = TweenMax.staggerTo("#mainpaths path:nth-child(8n+5)", timeForPathToFill, { delay: timeForStrokesToBeFull - delayBeforeFillPaths, fill: getCurrentDemoColor("--animation-color-5"), clearProps: "all" }, staggerFillDelay);
    singleTweens[6] = TweenMax.staggerTo("#mainpaths path:nth-child(8n+6)", timeForPathToFill, { delay: timeForStrokesToBeFull - delayBeforeFillPaths, fill: getCurrentDemoColor("--animation-color-6"), clearProps: "all" }, staggerFillDelay);
    singleTweens[7] = TweenMax.staggerTo("#mainpaths path:nth-child(8n+7)", timeForPathToFill, { delay: timeForStrokesToBeFull - delayBeforeFillPaths, fill: getCurrentDemoColor("--animation-color-7"), clearProps: "all" }, staggerFillDelay);
    singleTweens[8] = TweenMax.staggerTo("#mainpaths path:nth-child(8n+8)", timeForPathToFill, { delay: timeForStrokesToBeFull - delayBeforeFillPaths, fill: getCurrentDemoColor("--animation-color-8"), clearProps: "all" }, staggerFillDelay);
  }, delayBeforeAnimationSlow);
}

/* shacking animation value */
const timelineExit = new TimelineMax({
    paused: true
});

timelineExit
    .to("#bike #wheelb", exitWheelRotationSpeed,
    { ease: Power0.easeNone, rotation: "+=360", transformOrigin: "50% 50%", repeat: (exitAnimationDuration) / exitWheelRotationSpeed, yoyo: false }, "0")
    .to("#bike", 0.4, { rotation: -5, transformOrigin: "30% 50%" }, "0")
    .to("#bike #wheelf", exitWheelRotationSpeed,
    { ease: Power0.easeNone, rotation: "+=360", transformOrigin: "50% 50%", repeat: (exitAnimationDuration - exitFrontWheelAnimationDelay) / exitWheelRotationSpeed, yoyo: false }, exitFrontWheelAnimationDelay)
    .to("#bike", 0.3, { rotation: 10 }, exitAnimationDelay)
    .to("#bike", exitAnimationDuration, { left: "120%", top: "130%" }, exitAnimationDelay);


function startAnimation(currentdemo) {
  if(currentdemo === previousClass)
    return false;
  resetAllTimelines(function() {
    var target = document.querySelectorAll("#mainpaths path");
    Array.prototype.forEach.call(target, function (element) {
      element.removeAttribute('style');
    });
    bike.classList.remove(previousClass);
    previousClass = currentdemo;
    bike.classList.add(previousClass);
    timelineMainAnimation.play(9245);
    timelineMainFillAnimation.play(9245);
    timelineWheels.play(0);
    timelineWheels.timeScale(1);
    timelineEntrance.play(0);
    timelineEntrance.timeScale(1);
  });
}

function resetAllTimelines (callback) {
  timelineExit.kill();
  TweenMax.killTweensOf(timescale);
  Array.prototype.forEach.call(singleTweens, function(elements) {
    Array.prototype.forEach.call(elements, function(element) {
      element.pause();
    });
  });
  timescale = {value: 1};
  clearTimeout(pausetimeout);
  clearTimeout(preslowingtimeout);
  clearTimeout(slowingtimeout);
  timelineShacking.kill();
  timelineWheels.kill();
  timelineMainFillAnimation.pause().invalidate().kill();
  timelineMainAnimation.pause().kill();
  callback();
}

class Slideshow {
  constructor(el) {
    this.items = Array.from(el.querySelectorAll('.bike-nav__item'));
    this.initEvents();
    this.current = 0;
    startAnimation(`bike-${this.current + 1}`);
  }
  initEvents() {
    this.items.forEach((item, pos) => 
      item.addEventListener('click', () => 
        this.navigate(pos)
      )
    );
  }
  navigate(pos = 0) {
    if(this.isAnimating || pos === this.current) return false;
    this.isAnimating = true;
    this.items[this.current].classList.remove('bike-nav__item--current');
    this.current = pos;
    this.items[this.current].classList.add('bike-nav__item--current');
    // endAnimation(() => {
    //   startAnimation(`bike-${this.current + 1}`);
    //   this.isAnimating = true;
    // })
  }
}

new Slideshow(document.querySelector('.bike-nav'));