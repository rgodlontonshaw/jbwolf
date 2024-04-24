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





