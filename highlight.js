/**
 * Highlight Code
 * @param  {String} [string=''] Code goes in
 * @return {String}             Highlighted goes comes out
 */
function highlight(string = '') {

    /**
     * Use RX to pattern match the symptoms of using the language
     * @param  {String} [string=''] The code to cut into
     * @return {String}             Highlighted code
     */
    function sliceAndDice(string = '') {

        // Convert HTML tags to entities
        let syntax = string.replace(/[\u00A0-\u9999<>\&]/gim, (i) => `&#${i.charCodeAt(0)};`);

        // Primitives... a few todos here
        const STRINGS = /'[^']*'|"[^"]*"|`[^`]*`/igm;
        // const NUMBER = /'[^']*'|"[^"]*"|`[^`]*`/igm;
        // const BOOLEAN = /'[^']*'|"[^"]*"|`[^`]*`/igm;

        const COMMENTS = /\/\/.*|\/\*[\w\W]*?\*\//gm;

        const GLOBALS = /\b(document|window|Array|String|Number|Object|Math|Date|Error|Function|JSON|Promise|RegExp|Symbol|WeakMap|WeakSet)(?=[^\w])/gm;
        const DECLARATIONS = /\b(var|let|const)(?=[^\w])/gm;
        // const OPERATORS = /\b(!|~|-|\+|\+\+|--|typeof|void|delete|\*|\/|%|\+|-|<<|>>|>>>|<|<=|>|>=|in|instanceof|==|!=|===|!==|&|\^|\||&&|\|\||\?|:|=|\+=|-=|\*=|\/=|%=|<<=|>>=|>>>=|&=|^=|\|=)(?=[^\w])(?=[^\w])/gm;
        const CONTROL_FLOW = /\b(break|continue|if|else|switch|throw|try|catch)(?=[^\w])/gm;
        const ITERATION = /\b(do|while|for|in|of|while)(?=[^\w])/gm;
        const MODULES =  /\b(require|import|export|default|as)(?=[^\w])/gm;

        const FUNCTION = /\b(function)(?=[^\w])/gm;

        syntax = syntax.replace(STRINGS, match => template(match, 'string'))
        syntax = syntax.replace(COMMENTS, match => template(match, 'comment'))
        syntax = syntax.replace(GLOBALS, match => template(match, 'global'))
        syntax = syntax.replace(DECLARATIONS, match => template(match, 'declaration'))
        syntax = syntax.replace(CONTROL_FLOW, match => template(match, 'control'))
        syntax = syntax.replace(MODULES, match => template(match, 'module'))
        syntax = syntax.replace(ITERATION, match => template(match, 'iteration'))
        syntax = syntax.replace(FUNCTION, match => template(match, 'function'))

        return syntax;
    }

    function template(value, type = 'undefined;') {
        return `<span class="highlight highlight-${type}">${value}</span>`;
    }

    return sliceAndDice(string);

}
