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

        /*-------- PUBLIC METHODS ----------------------------------------------------------*/

        Gallery.rotateL = function (callback) {

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
                   },800);

        }

        Gallery.rotateR = function (callback) {

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
                  },800);

}

        Gallery.init = function(options){
               $.extend(priv.options, defaults, options);
               priv.options.id =  "#" + priv.options.id;
               priv.template = "<div class='flip-container'><div class='flipper'><div class='front'>"+priv.options.template+"<div class='back'></div></div></div>";
               for(var i=0; i<5;i++){
                    $(priv.options.id).append(priv.template)
               }
               priv.nextViewL = $(priv.options.id+" .flip-container").first().clone();
               priv.nextViewR = $(priv.options.id+" .flip-container").last().clone();


               priv.nextViewL.css('width', 0 ).children().css('transform', 'rotateY(90deg)');
               priv.nextViewR.css('width', 0 ).children().css('transform', 'rotateY(-90deg)');

               $.each($(priv.options.id+" .flip-container"), function( index, value) {
                    $(value).css('width', priv.getWidth(index) );
                    $(value).children().css('transform', 'rotateY('+priv.getDegree(index)+'deg)')
               });

               $(priv.options.id).on('click', '.flip-container', function(){
                    if($(this).index()== 2|| active == true ){
                    return;
                    }
                    active = true;
                    if($(this).index() > 2){
                    Gallery.rotateR(function(){active = false});
                    }
                    if($(this).index() < 2){
                     Gallery.rotateL(function(){active = false});
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


jQuery(document).ready( function()
{
    console.log('doc rdy');

    // EXAMPLE OF CREATING PLUGIN OBJECTS WITH CUSTOM SETTINGS

    console.log('--------------------------------------------');

    var myGallery1 = new Gallery;
    myGallery1.init(
    {
        /* custom options */
        id : 'blog-gallery',

    });

    // console.log('--------------------------------------------');

});