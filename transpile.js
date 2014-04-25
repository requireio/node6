var traceur = require('traceur')
var defaults = require('defaults')

module.exports = function compile(content, filename, options) {
    options = defaults(options, {
      experimental: true,
      modules: false
    })
    traceur.options = defaults(traceur.options, options)
    var sourceFile = new traceur.syntax.SourceFile(filename, content);
    var parser = new traceur.syntax.Parser(sourceFile);
    var tree = parser.parseScript();
    var reporter = new traceur.util.ErrorReporter();
    var transformer = new traceur.codegeneration.FromOptionsTransformer(reporter);
    var transformedTree = transformer.transform(tree);

    if (reporter.hadError()) {
        var errors = reporter.errors.map(function(error) { return "    " + error; }).join("\n");
        throw "traceur compilation failed: \n" + errors;
    }
    return traceur.outputgeneration.TreeWriter.write(transformedTree);
}
