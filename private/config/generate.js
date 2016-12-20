var generate = {
    0 : {
        'ext' : 'php',
        'path' : './public/langs/',
        'start': "<?php\n\nreturn array(\n",
        'example': "  '{key}' => '{value}',\n",
        'end': "\n);"
    },
    1 : {
        'ext' : 'js',
        'path' : './public/langs/',
        'start': "if(!lang) lang = {};\n\n",
        'example': "lang['{key}'] = '{value}';\n",
        'end': "\n"
    }

};
module.exports = generate;
