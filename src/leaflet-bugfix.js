/****************************************************************************
    leaflet-bugfix.js,

    (c) 2020, FCOO

    https://github.com/FCOO/leaflet-bugfix
    https://github.com/FCOO

****************************************************************************/
(function (L/*, window, document, undefined*/) {
    "use strict";

    /*
    Fix bug intruduced in Leaflet 1.5
    Version 1.7.1 is
    L.Path.prototype.setStyle = function (style) {
          setOptions(this, style);
          if (this._renderer) {
              this._renderer._updateStyle(this);
              if (this.options.stroke && style && Object.prototype.hasOwnProperty.call(style, 'weight')) {
                  this.this._updateBounds();
              }
          }
          return this;
      };
    */

    L.Path.prototype.setStyle = function (style) {
        L.setOptions(this, style);
        if (this._renderer) {
            this._renderer._updateStyle(this);
            if (this.options.stroke && style && Object.prototype.hasOwnProperty.call(style, 'weight')) {
                this._project(); //<- Changed!
            }
        }
        return this;
    };

}(L, this, document));



