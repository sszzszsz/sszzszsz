$(function() {
  // 対象となる要素を変数に格納しておく
  var slider = $('.loopslider'),
    slideInr = slider.find('.slide_inr'),
    slideItem = slideInr.children('.slide_item').not('copy'),
    slideItemW = slideItem.width(),
    firstChild = slideItem.filter(':first-child'),
    lastChild = slideItem.filter(':last-child'),
    slidCentering = ($(window).width() - slideItemW) / 2 - slideItemW;

  lastChild.clone().prependTo(slideInr).addClass('copy');

  var slideNum = slideItem.length,
    slideSetWidth = slideItemW * (slideNum + 1);

  slideInr.css({
    'width': slideSetWidth,
    'left': ($(window).width() - slideItemW) / 2 - slideItemW
  });

  var slideCurrent = 0; // 現在地を示す変数

  //自動アニメーション
  // var loop = setInterval(function() {
  //   //li先頭要素のマージンleftにマイナスを指定しアニメーションさせる
  //   $(".slide_inr li:first").animate({
  //     marginLeft: "-800px"
  //   }, {
  //     duration: 1000,
  //     complete: function() {
  //       // //処理完了時に先頭要素を削除
  //       // $(".slide_inr li:first").remove();
  //       // //クローンをliの最後に追加
  //       // clone.clone(true).insertAfter($(".slide_inr li:last"));
  //       slideCurrent++
  //     }
  //   });
  // }, 3000);


  // 右のボタンを押したときの挙動
  var slidingNext = function() {
    // slideCurrentが0以下だったら
    if (slideNum > slideCurrent) {
      //左にスライド
      $(slideInr).stop().animate({
        left: Number(slideInr.css('left').replace('px', '')) + -slideItemW
      });

      //最後のスライド表示時の右側に一番最初のスライドをチラ見せさせ、初期表示の左のチョイ見せを削除
      if (slideCurrent == slideNum - 1) {
        $(slideInr).css({
          'width': Number(slideInr.css('width').replace('px', '')) + slideItemW
        }, 500)
        firstChild.clone().appendTo(slideInr).addClass('copy');
        slideItem.filter(':first-child').remove();
      } else {
        return false;
      }

      // 最後のスライドを超えたら
    } else if (slideCurrent >= slideNum) {
      $('.slide_inr').filter(':last-child').remove();
      firstChild.css('left', slideItemW * slideNum);
      $(slideInr).animate({
        left: Number(slideInr.css('left').replace('px', '')) + -slideItemW
      }, 500, function() {
        // スライドしていったコンテナ自体も元の場所に戻す
        firstChild.css('left', 0);
        slideInr.css('left', ($(window).width() - slideItemW) / 2 - slideItemW);
      });
      slideCurrent = 0;
      return false;
    }
  }
  
  // 戻るのボタンを押したときの挙動
  var slidingPrev = function() {
    // slideCurrentが0以下だったら
    if (slideCurrent > 0) {
      //右にスライド
      $(slideInr).stop().animate({
        left: Number(slideInr.css('left').replace('px', '')) + slideItemW
      });

      //最初のスライド表示時の左側に一番最後のスライドをチラ見せさせ、初期表示の左のチョイ見せを削除
      if (slideCurrent == 0) {
        $(slideInr).css({
          'width': Number(slideInr.css('width').replace('px', '')) + slideItemW
        }, 500)
        lastChild.clone().prependTo(slideInr).addClass('copy');
        slideItem.filter(':first-child').remove();
      } else {
      }

      // 最初のスライドを超えたら
    } else if (slideCurrent >= -1) {
      var lastChildPos = $('.slide_item').filter(':last-child').offset().left;
      $('.slide_item').filter(':first-child').remove();
      
      lastChild.css({
      'left': -slideItem*slideNum,
      'postion' : 'absolute'
      });
      
      $(slideInr).animate({
        left: Number(slideInr.css('left').replace('px', '')) + slideItemW
      }, 500, function() {
        // スライドしていったコンテナ自体も元の場所に戻す
        lastChild.css('left', -slideItem*slideNum);
        slideInr.css('left', ($(window).width() - slideItemW) / 2)+ slideItemW;
      });
      slideCurrent = slideNum;
      return false;
    }
  }

  // 前へボタンが押されたとき
  $('#prev').click(function() {
    slideCurrent--;
    slidingPrev();
  });

  // 次へボタンが押されたとき
  $('#next').click(function() {
    slideCurrent++;
    slidingNext();
  });
});