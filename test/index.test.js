/* globals describe, it */

'use strict';

var LightEmitter = require( '..' );

describe( "require('light_emitter')", function () {
  it( 'works', function () {
    LightEmitter.should.be.a( 'function' );
  } );
} );
