const mongoose = require('mongoose');
const chai = require('chai');
const sinon = require('sinon');

require('../test/sinon-mongoose');

global.expect = chai.expect;
sinon.stub(mongoose, 'connect').yields(null, true);
