/* effect.js — Birthday Interactive Controller */

$(window).load(function () {
  $('.loading').fadeOut('fast');
  $('.container').fadeIn('fast');
});

$(document).ready(function () {

  /* ── Balloon resize: keep HBDADITH balloons aligned under banner ── */
  var vw;

  $(window).resize(function () {
    vw = $(window).width() / 2;
    relineBalloons(vw);
  });

  function relineBalloons(center) {
    var offsets = [-350, -250, -150, -50, 50, 150, 250, 350];
    ['b11','b22','b33','b44','b55','b66','b77','b88'].forEach(function (id, i) {
      $('#' + id).animate({ top: bannerLineY(), left: center + offsets[i] }, 500);
    });
  }

  function bannerLineY() {
    var $b = $('.bannar');
    if ($b.length && $b.offset()) {
      return $b.offset().top - $(window).scrollTop() + $b.outerHeight() + 20;
    }
    return 280;
  }

  /* ── Step 1: Turn On Lights ── */
$('#turn_on').click(function () {

  var $fl = $('#fairy-lights');

  $fl.css('display', 'block');

  $('body').css(
    'background',
    'radial-gradient(circle at center, #b3002d 0%, #73001c 15%, #32000b 40%, #0a0003 75%, #000000 100%)'
  );

  $('.hearts-container').css({
    'opacity': '1',
    'transition': 'opacity 2s ease'
  });

  setTimeout(function () {
    $fl.css('opacity', '1').addClass('bright');
  }, 50);

  $(this).fadeOut('slow').delay(2000).promise().done(function () {
    $('#play').fadeIn('slow');
  });

});

  /* ── Step 2: Play Music ── */
  $('#play').click(function () {
    $('.song')[0].play();
    $(this).fadeOut('slow').delay(3000).promise().done(function () {
      $('#bannar_coming').fadeIn('slow');
    });
  });

  /* ── Step 3: Decorate (banner drops in) ── */
  $('#bannar_coming').click(function () {
    $('.bannar').addClass('bannar-come');
    $(this).fadeOut('slow').delay(3000).promise().done(function () {
      $('#balloons_flying').fadeIn('slow');
    });
  });

  /* ── Step 4: Fly Balloons + small balloons ── */
  function randomPos() {
  return {
    l: (window.innerWidth - 200) * Math.random(),
    t: (window.innerHeight - 200) * Math.random()
  };
}

  function loopBalloon(id) {
    var r = randomPos();
    $('#' + id).animate({ left: r.l, bottom: r.t }, 10000, function () { loopBalloon(id); });
  }

  var smallBalloonInterval = null;
  var smallBalloonColors = [
    '#F2B300', '#0719D4', '#D14D39', '#8FAD00',
    '#8377E4', '#99C96A', '#20CFB4', '#E84393',
    '#FF6B6B', '#FFD700', '#00CED1', '#FF69B4'
  ];

  function spawnSmallBalloon() {
    var color  = smallBalloonColors[Math.floor(Math.random() * smallBalloonColors.length)];
    var size   = 28 + Math.random() * 26;
    var startX = Math.random() * (window.innerWidth - size);

    var $b = $('<div class="small-balloon"></div>').css({
      width:    size + 'px',
      height:   size * 1.3 + 'px',
      background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.45), ' + color + ' 60%)',
      left:     startX + 'px',
      bottom:   -size * 1.5 + 'px',
      '--drift': (Math.random() > 0.5 ? '' : '-') + (30 + Math.random() * 80) + 'px',
      animationDuration: (5 + Math.random() * 6) + 's',
      animationDelay:    (Math.random() * 1.5) + 's'
    });

    var $str = $('<div class="small-balloon-string"></div>').css({ height: size * 0.55 + 'px' });
    $b.append($str);
    $('.small-balloons-layer').append($b);
    setTimeout(function () { $b.remove(); }, 12000);
  }

  function startSmallBalloons() {
    if (!$('.small-balloons-layer').length) {
      $('body').append('<div class="small-balloons-layer"></div>');
    }
    smallBalloonInterval = setInterval(spawnSmallBalloon, 280);
    setTimeout(function () {
      clearInterval(smallBalloonInterval);
      smallBalloonInterval = null;
    }, 30000);
  }

  $('#balloons_flying').click(function () {
    $('.balloon-border').animate({ top: -500 }, 8000);
    $('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
    $('#b2,#b3,#b6,#b8').addClass('balloons-rotate-behaviour-two');
    ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8'].forEach(loopBalloon);
    startSmallBalloons();
    $(this).fadeOut('slow').delay(3000).promise().done(function () {
      $('#cake_fadein').fadeIn('slow');
    });
  });

  /* ── Step 5: Cake falls from top ── */
  $('#cake_fadein').click(function () {
    var svg = document.getElementById('cake-svg');
    if (svg) {
      var clone = svg.cloneNode(true);
      svg.parentNode.replaceChild(clone, svg);
    }

    $('.velas').removeClass('dropping lit').css({ top: '-120px', opacity: 0 });
    $('.cake-wrapper').removeClass('cake-fall').css('transform', 'translateY(-150vh)');
    $('.cake').show();
    $('html').css('overflow', 'hidden');

    setTimeout(function () { $('.cake-wrapper').addClass('cake-fall'); }, 50);
    setTimeout(function () { $('html').css('overflow', ''); }, 1600);

    // SVG sequence total ≈ 6.6s; candle drops at 7.2s
    setTimeout(function () {
      $('.velas').css('opacity', 1).addClass('dropping');
    }, 7200);

    $(this).fadeOut('slow').delay(8000).promise().done(function () {
      $('#light_candle').fadeIn('slow');
    });
  });

  /* ── Step 6: Light Candle ── */
  $('#light_candle').click(function () {
    $('.velas').css('opacity', 1).addClass('lit');
    $(this).fadeOut('slow').promise().done(function () {
      $('#wish_message').fadeIn('slow');
    });
  });

  /* ── Step 7: Happy Birthday — balloons line up under banner ── */
  $('#wish_message').click(function () {
    vw = $(window).width() / 2;

    $('#b1,#b2,#b3,#b4,#b5,#b6,#b7,#b8').stop();

    ['b1','b2','b3','b4','b5','b6','b7','b8'].forEach(function (id, i) {
      $('#' + id).attr('id', ['b11','b22','b33','b44','b55','b66','b77','b88'][i]);
    });

    var targetTop = bannerLineY() + 190 - 155;
    var offsets   = [-390, -290, -190, -90, 10, 110, 210, 310];
    ['b11','b22','b33','b44','b55','b66','b77','b88'].forEach(function (id, i) {
      $('#' + id).animate({ top: targetTop, left: vw + offsets[i] }, 600);
    });

    $('.balloons').css('opacity', '0.9');
    $('.balloons h2').fadeIn(3000);

    $(this).fadeOut('slow').delay(3000).promise().done(function () {
      $('#story').fadeIn('slow');
    });
  });

  /* ── Step 8: Final message with typewriter ── */
  var TYPING_SPEED = 22;
  var PAUSE_AFTER  = 140;

  function startMessageTypewriter() {
    var $elements = $('.message-box-full').children();

    function typeEl(idx) {
      if (idx >= $elements.length) return;

      var $el      = $($elements[idx]);
      var fullHtml = $el.html();
      var plain    = $('<div>').html(fullHtml).text();
      var i        = 0;
      var lockedH  = $el.outerHeight(true);

      $el.css({ 'min-height': lockedH + 'px', visibility: 'visible' }).html('');

      var tick = setInterval(function () {
        i++;
        $el.text(plain.substring(0, i));
        if (i >= plain.length) {
          clearInterval(tick);
          $el.html(fullHtml).css('min-height', '');
          setTimeout(function () { typeEl(idx + 1); }, PAUSE_AFTER);
        }
      }, TYPING_SPEED);
    }

    typeEl(0);
  }

  $('#story').click(function () {
    $(this).fadeOut('slow');
    $('.cake, .balloons, .balloon-border, .bannar, .navbar').fadeOut('fast');
    $('#message-page').fadeIn('slow', function () {
      startMessageTypewriter();
    });
  });

});

/* ── Floating hearts ── */
function createHeart() {
  var heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerHTML = '❤️';
  heart.style.left = (-10 + Math.random() * 120) + 'vw';
  heart.style.animationDuration = (4 + Math.random() * 4) + 's';
  document.querySelector('.hearts-container').appendChild(heart);
  setTimeout(function () { heart.remove(); }, 8000);
}

setInterval(createHeart, 120);

/* ── Fairy lights: place teardrop bulbs along SVG wire path ── */
function initFairyLights() {
  var container  = document.getElementById('fairy-lights');
  var path       = document.getElementById('wire-path');
  if (!container || !path) return;

  var pathLength = path.getTotalLength();
  var bulbCount  = 25;

  for (var i = 0; i <= bulbCount; i++) {
    var point = path.getPointAtLength((i / bulbCount) * pathLength);
    var bulb  = document.createElement('div');
    bulb.classList.add('bulb-teardrop');
    bulb.style.left = ((point.x / 1000) * 100) + '%';
    bulb.style.top  = point.y + 'px';
    bulb.style.setProperty('--d', (0.5 + Math.random() * 2) + 's');
    container.appendChild(bulb);
  }
}

window.addEventListener('load', initFairyLights);