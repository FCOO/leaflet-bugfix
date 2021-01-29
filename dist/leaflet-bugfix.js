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

    /* First fix by Niels Holt
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
    */

    //Fix by https://github.com/fodor0205:
    L.Polyline.prototype._updateBounds = function () {
          var w = this._clickTolerance(),
              p = new L.Point(w, w);

        if (!this._rawPxBounds) {
            return;
        }


        this._pxBounds = new L.Bounds([
            this._rawPxBounds.min.subtract(p),
            this._rawPxBounds.max.add(p)
        ]);
    };

}(L, this, document));



