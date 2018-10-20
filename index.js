'use strict';

/**
 * A lightweight implementation of Node.js EventEmitter.
 * @constructor LightEmitter
 * @example
 * var LightEmitter = require( 'light_emitter' );
 * @example
 * var emitter = new LightEmitter();
 * @example
 * function Chat () {
 *   LightEmitter.call( this );
 * }
 * 
 * Chat.prototype = Object.create( LightEmitter.prototype );
 * Chat.prototype.constructor = Chat;
 */
function LightEmitter () {}

LightEmitter.prototype = {
  /**
   * @method LightEmitter#emit
   * @param  {string} type   A event name.
   * @param  {...any} [data] Arguments that should be passed to all handlers.
   * @return {boolean?} Returns `false` if any handler returned `false` too (stopped propagation).
   * @example
   * if ( chat.emit( 'message', 'Hello LightEmitter!' ) !== false ) {
   *   console.log( 'The message delivered successfully!' );
   * }
   */
  emit: function emit ( type ) {
    var list = _getList( this, type );
    var data, i, l, result;

    if ( ! list ) {
      return this;
    }

    if ( arguments.length > 1 ) {
      data = [].slice.call( arguments, 1 );
    }

    for ( i = 0, l = list.length; i < l; ++i ) {
      if ( ! list[ i ].active ) {
        continue;
      }

      if ( list[ i ].once ) {
        list[ i ].active = false;
      }

      if ( data ) {
        result = list[ i ].listener.apply( this, data );
      } else {
        result = list[ i ].listener.call( this );
      }

      if ( result === false ) {
        return false;
      }
    }
  },

  /**
   * @method LightEmitter#off
   * @param {string}   [type]     A event name.
   * @param {function} [listener] A event handler.
   * @chainable
   * @example
   * // Remove messageHandler.
   * emitter.off( 'message', messageHandler );
   * @example
   * // Remove all 'message' handlers.
   * emitter.off( 'message' );
   * @example
   * // Remove all handlers.
   * emitter.off();
   */
  off: function off ( type, listener ) {
    var list, i;

    if ( ! type ) {
      this._events = null;
    } else if ( ( list = _getList( this, type ) ) ) {
      if ( listener ) {
        for ( i = list.length - 1; i >= 0; --i ) {
          if ( list[ i ].listener === listener && list[ i ].active ) {
            list[ i ].active = false;
          }
        }
      } else {
        list.length = 0;
      }
    }

    return this;
  },

  /**
   * @method LightEmitter#on
   * @param {string}   type     A event name.
   * @param {function} listener A event handler.
   * @chainable
   */
  on: function on ( type, listener ) {
    _on( this, type, listener );
    return this;
  },

  /**
   * @method LightEmitter#once
   * @param {string}   type     A event name.
   * @param {function} listener A event handler.
   * @chainable
   */
  once: function once ( type, listener ) {
    _on( this, type, listener, true );
    return this;
  },

  constructor: LightEmitter
};

/**
 * @private
 * @method _on
 * @param  {LightEmitter} self
 * @param  {string}       type
 * @param  {function}     listener
 * @param  {boolean}      once
 * @return {void}
 */
function _on ( self, type, listener, once ) {
  var entity = {
    listener: listener,
    active:   true,
    type:     type,
    once:     once
  };

  if ( ! self._events ) {
    self._events = Object.create( null );
  }

  if ( ! self._events[ type ] ) {
    self._events[ type ] = [];
  }

  self._events[ type ].push( entity );
}

/**
 * @private
 * @method _getList
 * @param  {LightEmitter}   self
 * @param  {string}         type
 * @return {array<object>?}
 */
function _getList ( self, type ) {
  return self._events && self._events[ type ];
}

module.exports = LightEmitter;
