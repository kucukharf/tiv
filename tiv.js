/**
 * 
 * @author  Burak Arslan
 * @requires 
 * @name TIValidation
 * @description Turkish Identification Number Validation
 * @param  {string} 
 * Usage -- 
 * instance ex      : var TCNO  = new TIValidation();
 * validate ex      :             TCNO.validate('argument'));
 * 
 */


TIValidation.prototype = {

    /**
     * @name                         validate
     * @description                  Validate Incoming Arguement
     * @Usage                        {$MethodName}.validate(param);
     * @param  {string, integer}     argument   
     * @return {boolean}             true or false
     */

    validate: function(argument) {

        return (this.checkIdentificationNumber(argument) ? this.CalculateLastDigits(argument) : false);
    },


    /**
     * @name                         checkIdentificationNumber
     * @description                  Validate Incoming Arguement
     * @Usage                        {$MethodName}.checkIdentificationNumber(param);
     * @param  {string, integer}     argument   
     * @return {boolean}             ex: true or false
     */

    checkIdentificationNumber: function(argument) {

        var _length = argument.trim().toString().length;
        return (_length > 8 &&  _length < 12 ? this.checkIsNumeric(argument) : false);
    },

    /**
     * @name                         checkIsNumeric
     * @description                  checks param is numeric
     * @Usage                        {$MethodName}.checkIsNumeric(param);
     * @param  {string, integer}     argument   
     * @return {boolean}             ex: true or false
     */

    checkIsNumeric: function(argument) {
        return (/^\d+$/.test(argument) ? true : false);
    },

    /**
     * @name                         CalculateLastDigits
     * @description                  Calculating 10th and 11th digits of number with algorythm
     * @Usage                        {$MethodName}.CalculateLastDigits(param);
     * @param  {string, integer}     argument   
     * @return {boolean}             ex: true or false
     */

    CalculateLastDigits: function(argument) {

        var _argument = argument.substring(0, 9).split('').map(parseFloat);
        var _firstGroup = this.sumArrayValues(this.getIndiceArray(this.algorythm._firstG, _argument));
        var _secondGroup = this.sumArrayValues(this.getIndiceArray(this.algorythm._secondG, _argument));

        _argument.push(((_firstGroup * 7) - _secondGroup) % 10);
        _argument.push(this.sumArrayValues(_argument) % 10);
        return (_argument.length === 11 ? this.ValidateResults(_argument, argument.split('').map(parseFloat)) : false);
    },

    /**
     * @name                         ValidateResults
     * @description                  Validate the results are equal and is it a valid number
     * @Usage                        {$MethodName}.ValidateResults([a, b, c], [a, b, c]);
     * @param  {array, array}        argumentCalculated and argumentBase
     * @return {boolean}             ex: true or false
     */
    ValidateResults: function(_argument, argument) {
        return (!![_argument.join(''), argument.join('')].reduce(function(a, b) {
            return (a === b) ? a : NaN;
        }));
    },

    /**
     * @name                         sumArrayValues
     * @description                  Validate Incoming Arguement
     * @Usage                        {$MethodName}.sumArrayValues([1,3,4,5]);
     * @param  {array}               argument   
     * @return {boolean}             ex: true or false
     */
    sumArrayValues: function(argument) {
        return argument.reduceRight(function(a, b) {
            return a + b;
        })
    },


    /**
     * @name                         getIndiceArray
     * @description                  Splice array on Multiple Indices multisplice with pattern
     * @Usage                        {$MethodName}.getIndiceArray([1, 4, 8], [1, 2, 3, 4, 5, 6, 7, 8]);
     * @param  {pattern, array}      pattern and argument   
     * @return {boolean}             ex: true or false
     */
    getIndiceArray: function(pattern, arguments) {
        var indices = [];
        for (var i = 0; i < pattern.length; i++) {
            var arg = pattern[i];
            var index = arguments[arg - 1];
            indices.push(index);
        }
        return indices;
    }
};



function TIValidation() {
    this.algorythm = {
        _firstG: [1, 3, 5, 7, 9],
        _secondG: [2, 4, 6, 8]
    };

    this.debug = false;
}