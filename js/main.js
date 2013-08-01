/*!
 * romainberger.com
 */

!function($) {

  'use strict';

  var trigger = document.querySelector('#resume-trigger')
    , resume  = document.querySelector('#resume')

  if (typeof trigger != 'undefined' && trigger !== null &&
      typeof resume != 'undefined' && resume !== null) {
    trigger.addEventListener('click', function() {
      this.style.display = 'none'
      resume.style.display = 'block'
    }, false)
  }

  // Navigation panel for small screens
  var navTrigger
    , sideNav
    , body
    , container
    , opened

  /**
   * action: open if true else close
   */
  function animateNav(action) {
    container.animate({
      left: action ? '200px' : 0
    }, 150)
    sideNav.animate({
      left: action ? 0 : '-200px'
    }, 150, function() {
      if (action) {
        body.addClass('no-scroll')
        opened = true
      }
      else {
        body.removeClass('no-scroll')
        opened = false
      }
    })
  }

  function resizeSideNav() {
    sideNav.css('height', $('body').height())
  }

  $(document).ready(function() {
      navTrigger = $('.nav-trigger')
    , sideNav = $('.side-nav')
    , body = $('body')
    , container = $('.main-content')
    , opened = false

    resizeSideNav()

    $(window).resize(resizeSideNav)

    navTrigger.click(function() {
      if (opened) {
        animateNav(false)
      }
      else {
        animateNav(true)
      }
    })

    sideNav.find('a').click(function() {
      animateNav(false)
    })

    $(window).bind({
        keydown: function(e) {
          e.keyCode === 27 && animateNav(false)
        }

      , click: function(e) {
          container.has(e.target).length && opened && animateNav(false)
        }
    })

  })

}(window.jQuery);