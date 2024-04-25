"use strict";

$(document).ready(function () {
	/* Video Lightbox */
	if (!!$.prototype.simpleLightboxVideo) {
		$('.video').simpleLightboxVideo();
	}

	/*ScrollUp*/
	if (!!$.prototype.scrollUp) {
		$.scrollUp();
	}

	/*Responsive Navigation*/
	$("#nav-mobile").html($("#nav-main").html());
	$("#nav-trigger span").on("click",function() {
		if ($("nav#nav-mobile ul").hasClass("expanded")) {
			$("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
			$(this).removeClass("open");
		} else {
			$("nav#nav-mobile ul").addClass("expanded").slideDown(250);
			$(this).addClass("open");
		}
	});

	$("#nav-mobile").html($("#nav-main").html());
	$("#nav-mobile ul a").on("click",function() {
		if ($("nav#nav-mobile ul").hasClass("expanded")) {
			$("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
			$("#nav-trigger span").removeClass("open");
		}
	});

	/* Sticky Navigation */
	if (!!$.prototype.stickyNavbar) {
		$('#header').stickyNavbar();
	}

	$('#content').waypoint(function (direction) {
		if (direction === 'down') {
			$('#header').addClass('nav-solid fadeInDown');
		}
		else {
			$('#header').removeClass('nav-solid fadeInDown');
		}
	});

});


/* Preloader and animations */
$(window).load(function () { // makes sure the whole site is loaded
	$('#status').fadeOut(); // will first fade out the loading animation
	$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
	$('body').delay(350).css({'overflow-y': 'visible'});

	/* WOW Elements */
	if (typeof WOW == 'function') {
		new WOW().init();
	}

	/* Parallax Effects */
	if (!!$.prototype.enllax) {
		$(window).enllax();
	}

});

document.addEventListener('mousemove', function(e) {
    var follower = document.getElementById('cursor-follower');
    // Position the center of the follower to the cursor location
    follower.style.left = e.pageX + 'px';
    follower.style.top = e.pageY + 'px';

    // Throttle bill creation to avoid excessive DOM manipulation
    if (!follower.lastBillTime || Date.now() - follower.lastBillTime > 100) {
        follower.lastBillTime = Date.now();

        var bill = document.createElement('img');
        bill.src = 'images/money.png'; 
        bill.className = 'bill';
        // Center the bill on the cursor
        bill.style.left = '-25px'; 
        bill.style.top = '-25px'; 
        follower.appendChild(bill);

        // Remove the bill after animation ends to clean up the DOM
        setTimeout(function() {
            if (follower.contains(bill)) {
                follower.removeChild(bill);
            }
        }, 2000); // Matches the duration of the CSS animation
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('raining-bills');
    setInterval(() => {
        const bill = document.createElement('div');
        bill.className = 'bill';
        bill.style.left = Math.random() * 100 + '%'; // Random horizontal start
        bill.style.animationDuration = (Math.random() * 3 + 3) + 's'; // Randomize duration between 3 and 6 seconds

        container.appendChild(bill);

        // Remove bill after it finishes animating to prevent DOM bloat
        setTimeout(() => {
            container.removeChild(bill);
        }, (Math.random() * 3 + 3) * 1000); // Match duration in milliseconds
    }, 200); // Create a new bill every 200 milliseconds
});

var canvas;
var context;
var screenH;
var screenW;
var stars = [];
var fps = 100;
var numStars = 300;

$('document').ready(function() {
  
  // Calculate the screen size
  screenH = 300;
  screenW = $(window).width();
  
  // Get the canvas
  canvas = $('#space');
  
  // Fill out the canvas
  canvas.attr('height', screenH);
  canvas.attr('width', screenW);
  context = canvas[0].getContext('2d');
  
  // Create all the stars
  for(var i = 0; i < numStars; i++) {
    var x = Math.round(Math.random() * screenW);
    var y = Math.round(Math.random() * screenH);
    var length = 1 + Math.random() * 2;
    var opacity = Math.random();
    
    // Create a new star and draw
    var star = new Star(x, y, length, opacity);
    
    // Add the the stars array
    stars.push(star);
  }
  
  setInterval(animate, 3000 / fps);
});

/**
 * Animate the canvas
 */
function animate() {
  context.clearRect(0, 0, screenW, screenH);
  $.each(stars, function() {
    this.draw(context);
  })
}

/**
 * Star
 * 
 * @param int x
 * @param int y
 * @param int length
 * @param opacity
 */
function Star(x, y, length, opacity) {
  this.x = parseInt(x);
  this.y = parseInt(y);
  this.length = parseInt(length);
  this.opacity = opacity;
  this.factor = 1;
  this.increment = Math.random() * .03;
}

/**
 * Draw a star
 * 
 * This function draws a start.
 * You need to give the contaxt as a parameter 
 * 
 * @param context
 */
Star.prototype.draw = function() {
  context.rotate((Math.PI * 1 / 10));
  
  // Save the context
  context.save();
  
  // move into the middle of the canvas, just to make room
  context.translate(this.x, this.y);
  
  // Change the opacity
  if(this.opacity > 1) {
    this.factor = -1;
  }
  else if(this.opacity <= 0) {
    this.factor = 1;
    
    this.x = Math.round(Math.random() * screenW);
    this.y = Math.round(Math.random() * screenH);
  }
    
  this.opacity += this.increment * this.factor;
  
  context.beginPath();
  context.arc(0, 0, this.length, 0, 2 * Math.PI, false);
  context.fillStyle = "rgba(255, 255, 255, " + this.opacity + ")"; // Set color to white
  context.fill();
  
  context.restore();
}





