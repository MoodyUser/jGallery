/**
 *  A basic jQuery plugin using the Module Pattern
 * *
 *  @author      Yoni Mood
 *  @since       Version 1.0
 *
 */

!function(exports, $, undefined)
{

"use strict";

    var Gallery = function()
    {

        /*-------- PLUGIN VARS ------------------------------------------------------------*/


    var priv = {},Gallery = {},
            // Gallery defaults
    defaults = {
            id : '',
            name : '',
            url : '',
            speed : 600,
            template :  '<img src="assets/img1.jpg" width="300px">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book... <button class="btn btn-info"> Read More</button>'
    },
    widths = [0,100,300,320,300,160,0],
    active = false;
        /*-------- PRIVATE METHODS --------------------------------------------------------*/

        priv.options = {}; //private options

        priv.getDegree = function(index){
            return (index-2)*-35;
        }
        priv.getWidth = function(index){
            return widths[index+1];
        }

        priv.rotate = function (direction, duration,callback) {

                  if(duration <= 0){
                        callback();
                        return;
                  }
                  if(direction=='right'){
                         priv.rotateR(function(){
                         priv.rotate(direction, duration-1,callback)
                         });
                  }
                  if(direction=='left'){
                         priv.rotateL(function(){
                         priv.rotate(direction, duration-1,callback)
                         });
                  }

        }


        priv.rotateL = function (callback) {

                  var last = $(priv.options.id+" .flip-container").last();
                  last.css('padding', '0 -5px' ).css('width', 0 ).children().css('transform', 'rotateY(-90deg)');//.after(function(){});
                  $(priv.options.id).prepend(priv.nextViewL);
                  //last.delay(2000).detach();
                  priv.nextViewL = last;
                  setTimeout(function(){
                                    $.each($(priv.options.id+" .flip-container"), function( index, value) {
                                                         $(value).css('width', priv.getWidth(index) );
                                                         $(value).children().css('transform', 'rotateY('+priv.getDegree(index)+'deg)')
                                                         });
                                    },100);
                  setTimeout(function(){
                               priv.nextViewL.detach();
                               priv.nextViewL.css('padding', '0 -5px' ).css('width', 0 ).children().css('transform', 'rotateY(90deg)');
                               callback();
                   },priv.options.speed);

        }

        priv.rotateR = function (callback) {
                  var first = $(priv.options.id+" .flip-container").first();
                  first.css('width', 0 ).children().css('transform', 'rotateY(90deg)');//.after(function(){});
                  $(priv.options.id).append(priv.nextViewR);
                  //last.delay(2000).detach();
                  var prev = priv.nextViewR;
                  priv.nextViewR = first;
                  setTimeout(function(){
                               while(prev.length){
                                      var index = prev.index();
                                      prev.css('width', priv.getWidth(index-1) );
                                      prev.children().css('transform', 'rotateY('+priv.getDegree(index-1)+'deg)')
                                      prev = prev.prev();
                  }
                  },100);

                  setTimeout(function(){
                               priv.nextViewR.detach();
                               priv.nextViewR.css('width', 0 ).children().css('transform', 'rotateY(-90deg)');
                               callback();
                  },priv.options.speed);

        }


/*-------- PUBLIC METHODS ----------------------------------------------------------*/
        Gallery.rotate = function (direction,callback) {

                    priv.rotate(direction, 1,callback)
        }

        Gallery.rotateFast = function (direction, duration,callback) {
                  if(duration > 0){
                    var tmp = priv.options.speed;
                    priv.options.speed = 100;
                    $(priv.options.id+" .flip-container").addClass('fast').children().addClass('fast');
                    priv.nextViewL.addClass('fast').children().addClass('fast');
                    priv.nextViewR.addClass('fast').children().addClass('fast');
                    var result = priv.rotate(direction, duration,function(){
                        $(priv.options.id+" .flip-container").removeClass('fast').children().removeClass('fast');
                        priv.nextViewL.removeClass('fast').children().removeClass('fast');
                        priv.nextViewR.removeClass('fast').children().removeClass('fast');
                        priv.options.speed = tmp;
                        callback();
                    });
                  }
        }

        Gallery.init = function(options){
               $.extend(priv.options, defaults, options);
               priv.options.id =  "#" + priv.options.id;
               priv.template = "<div class='flip-container'><div class='flipper'><div class='front'>"+priv.options.template+"<div class='back'></div></div></div>";
               for(var i=0; i<5;i++){
                    $(priv.options.id).append(priv.template);
               }
               var items = $(priv.options.id+" .flip-container");
               var s = (priv.options.speed/1000);
               items.children().css('transition', s + 's');
               items.css('transition', s + 's');
               priv.nextViewL = items.first().clone();
               priv.nextViewR = items.last().clone();


               priv.nextViewL.css('width', 0 ).children().css('transform', 'rotateY(90deg)');
               priv.nextViewR.css('width', 0 ).children().css('transform', 'rotateY(-90deg)');

               $.each(items, function( index, value) {
                    $(value).css('width', priv.getWidth(index) );
                    $(value).children().css('transform', 'rotateY('+priv.getDegree(index)+'deg)')
               });

               $(priv.options.id).on('click', '.flip-container', function(){
                    if($(this).index()== 2|| active == true ){
                    return;
                    }
                    active = true;
                    if($(this).index() > 2){
                    Gallery.rotate('right',function(){active = false});
                    }
                    if($(this).index() < 2){
                    Gallery.rotate('left',function(){active = false});
                    }

                });
               return Gallery;
        }

        // Return the Public API (Gallery) we want
        // to expose

        return Gallery;
    }

    exports.Gallery = Gallery;

}(this, jQuery);
