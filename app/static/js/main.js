/*!
 * romainberger.com
 */

!function() {

  var trigger = document.querySelector('#resume-trigger')
    , resume  = document.querySelector('#resume')

  if (typeof trigger != 'undefined' && trigger != null
      && typeof resume != 'undefined' && resume != null) {
    trigger.addEventListener('click', function() {
      this.style.display = 'none'
      resume.style.display = 'block'
    }, false)
  }

}();
