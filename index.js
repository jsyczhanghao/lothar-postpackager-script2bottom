'use strict';

var REG = /<script( [^>]*?\b(?:script2)?bottom[^>]*)>([\s\S]*?)<\/script>/g;

module.exports = function(ret){
    feather.util.map(ret.src, function(subpath, file){
        if(file.isHtmlLike){
            var content = file.getContent();

            content = content.replace(REG, function(all, _1, _2){
                return '@section(\'__script2bottom__\')\n<script' + _1.replace(/\s*(?:script2)?bottom\s*/, ' ').replace(/\s*$/, '') + '>' + _2 + '</script>\n@append\n';
            });

            if(!file.isPagelet && /<!--(?:FEATHER )?STATIC POSITION:BOTTOM-->|<\/body>/i.test(content)){
                content = content.replace(/<!--(?:FEATHER )?STATIC POSITION:BOTTOM-->|(<\/body>)/i, function(all, tag){
                    return "@if(!$__env->shared('FEATHER_BOTTOM_SCRIPT_LOADED'))\n@yield('__script2bottom__')\n<?php $__env->share('FEATHER_BOTTOM_SCRIPT_LOADED', true);?>\n@endif\n" + (tag || '');
                });
            }else if(file.isPagelet || file.isWidget && lothar.isPreviewMode){
                content += "@if(!isset($__isRef) && !$__env->shared('FEATHER_BOTTOM_SCRIPT_LOADED'))\n@yield('__script2bottom__')\n<?php $__env->share('FEATHER_BOTTOM_SCRIPT_LOADED', true);?>\n@endif\n";
            }

            file.setContent(content);

        }
    });
};