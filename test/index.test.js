/* globals describe, it, before */

'use strict';

var LightEmitter = require( '..' );

describe( 'LightEmitter', function () {
  before( function () {
    this.lightEmitter = new LightEmitter();
    this.listener = function () {};
  } );

  describe( 'new LightEmitter', function () {
    describe( 'methods', function () {
      describe( 'new LightEmitter.on', function () {
        it( 'works', function () {
          this.lightEmitter.on( 'Event #1', this.listener );
        } );
      } );

      describe( 'new LightEmitter.once', function () {
        it( 'works', function () {
          this.lightEmitter.once( 'Event #1', this.listener );
        } );
      } );

      describe( 'new LightEmitter.off', function () {
        it( 'works #1', function () {
          this.lightEmitter.off( 'Event #1', this.listener );
        } );

        it( 'works #2', function () {
          this.lightEmitter.off( 'Event #1' );
        } );

        it( 'works #3', function () {
          this.lightEmitter.off();
        } );
      } );

      describe( 'new LightEmitter.emit', function () {
        it( 'works', function () {
          this.lightEmitter.emit( 'Event #1' );
        } );
      } );
    } );
  } );
} );
