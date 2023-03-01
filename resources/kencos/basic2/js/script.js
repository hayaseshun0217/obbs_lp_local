$(function() {
  var codes = {
    'K41': {
      'KF01': 'SK411',
      'KF02': 'SK412',
      'KF03': 'SK413',
      'KF04': 'SK414'
    },
    'K42': {
      'KF01': 'SK421',
      'KF02': 'SK422',
      'KF03': 'SK423',
      'KF04': 'SK424'
    },
    'K43': {
      'KF01': 'SK431',
      'KF02': 'SK432',
      'KF03': 'SK433',
      'KF04': 'SK434'
    },
    'K44': {
      'KF01': 'SK441',
      'KF02': 'SK442',
      'KF03': 'SK443',
      'KF04': 'SK444'
    },
    'K45': {
      'KF01': 'SK451',
      'KF02': 'SK452',
      'KF03': 'SK453',
      'KF04': 'SK454'
    },
  };

  $('#cart_form').submit(function(e) {
    e.preventDefault();
    var color = $(this).find('select[name=color] option:selected').val();
    var flavor = $(this).find('select[name=flavor] option:selected').val();
    var quantity = $(this).find('select[name=quantity] option:selected').val();
    var code = codes[color][flavor];
    var url = $(this).attr('action');
    url = url + '?code=' + code + '&quantity=' + quantity;
    location.href = url;
  });
  $('#cart_form2').submit(function(e) {
    e.preventDefault();
    var color = $(this).find('select[name=color] option:selected').val();
    var flavor = $(this).find('select[name=flavor] option:selected').val();
    var quantity = $(this).find('select[name=quantity] option:selected').val();
    var code = codes[color][flavor];
    var url = $(this).attr('action');
    url = url + '?code=' + code + '&quantity=' + quantity;
    location.href = url;
  });
  $('#cart_form3').submit(function(e) {
    e.preventDefault();
    var color = $(this).find('select[name=color] option:selected').val();
    var flavor = $(this).find('select[name=flavor] option:selected').val();
    var quantity = $(this).find('select[name=quantity] option:selected').val();
    var code = codes[color][flavor];
    var url = $(this).attr('action');
    url = url + '?code=' + code + '&quantity=' + quantity;
    location.href = url;
  });
});