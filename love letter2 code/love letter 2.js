$(document).ready(function () {
  var envelope = $("#envelope");
  var btn_open = $("#open");
  var btn_reset = $("#reset");

  // Envelope interactions
  envelope.click(function () {
    open();
  });
  btn_open.click(function () {
    open();
  });
  btn_reset.click(function () {
    close();
  });

  function open() {
    envelope.addClass("open").removeClass("close");
  }
  function close() {
    envelope.addClass("close").removeClass("open");
  }

  // --- Modal Logic ---

  // Open modal on clicking the snippet or hint
  $('#previewLetter, .read-more-hint').click(function (e) {
    // Only open if the envelope is actually open
    if ($('#envelope').hasClass('open')) {
      e.stopPropagation(); // prevent closing or other clicks
      $('#fullLetterModal').addClass('visible');
    }
  });

  // Close modal on X button
  $('.close-modal').click(function () {
    $('#fullLetterModal').removeClass('visible');
  });

  // Close modal on clicking outside
  $('.modal-overlay').click(function (e) {
    if ($(e.target).hasClass('modal-overlay')) {
      $(this).removeClass('visible');
    }
  });
});
