/*!
 * Sai 0.1 - Sproutcore oriented - Low level JavaScript Vector Library based off of Raphael JS
 *
 * Copyright (c) 2010 Evin Grano
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
/*globals Sai */

/*
 * SC.BUNDLE_INFO is added dynamically by the build tools and is used to dynamically load the
 * required frameworks.  Right now, however, it's breaking combined files...
 */
SC.BUNDLE_INFO = {};

Sai = SC.Object.create({
  
  version: "0.1.0",
  vectorType: "UNK",
  // SVG Specifics
  svgns: 'http://www.w3.org/2000/svg',
  xlink: "http://www.w3.org/1999/xlink",
  evnts: "http://www.w3.org/2001/xml-events",
  
  // VML Specifics  
  init: function(){
    sc_super();
    var type = (window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML");
    // If VML do some specific stuff...
    if (type === "VML") {
      this._vml = YES; 
      var d = document.createElement("div");
      d.innerHTML = '<!--[if vml]><br><br><![endif]-->';
      if (d.childNodes.length !== 2) { type = null; }
      else { d = null; }
      document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
    }
    else
    {
      this._svg = YES;
      this.svgns = "http://www.w3.org/2000/svg";
      this.xlink = "http://www.w3.org/1999/xlink";
    }
    this.vectorType = type;
  },
  
  // ..........................................................
  // General proxy function for creating Drawing Elements
  // 
  canvas_create: function(type){
    var i, nArgs = [], len = arguments.length,
        t = Sai.vectorType, fName;
    for(i = 1; len > 1 && i < len; i++){ nArgs.push(arguments[i]); }
    fName = '%@_%@_create'.fmt(t.toLowerCase(), type);
    return Sai[fName].apply(Sai, nArgs);
  },
  
  // ..........................................................
  // General proxy function for creating Drawing Elements
  // 
  canvas_clear: function(canvas){
    var t = Sai.vectorType, fName;
    fName = '%@_clear'.fmt(t.toLowerCase());
    return Sai[fName].call(Sai, canvas);
  },

  colors: function() {
    var colours = [];
    var hues = [.6, .2, .05, .1333, .75, 0];
    for (var i = 0; i < 10; i++) {
      if (i < hues.length) {
        colours.push("hsb(" + hues[i] + ", .75, .75)");
      } else {
        colours.push("hsb(" + hues[i - hues.length] + ", 1, .5)");
      }
    }
    return colours ;
  }.property().cacheable()
});

