/*
 * Copyright (c) 2020 Bowser65
 * Licensed under the Open Software License version 3.0
 */

const { readFileSync } = require('fs');
const { join } = require('path');

const script = readFileSync(join(__dirname, 'public/dist/js/index.js'));
const style = readFileSync(join(__dirname, 'public/dist/css/index.css'));

module.exports = { style, script };
