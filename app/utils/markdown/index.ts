// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {Platform, StyleSheet} from 'react-native';

import {changeOpacity, makeStyleSheetFromTheme} from '@utils/theme';

import {getViewPortWidth} from '../images';

type LanguageObject = {
    [key: string]: {
        name: string;
        extensions: string[];
        aliases?: Set<string>;
    };
}

export function getCodeFont() {
    return Platform.OS === 'ios' ? 'Menlo' : 'monospace';
}

export const getMarkdownTextStyles = makeStyleSheetFromTheme((theme: Theme) => {
    const codeFont = getCodeFont();

    return {
        emph: {
            fontFamily: 'OpenSans-Italic',
        },
        strong: {
            fontFamily: 'OpenSans-SemiBold',
        },
        del: {
            textDecorationLine: 'line-through',
        },
        link: {
            color: theme.linkColor,
            fontFamily: 'OpenSans',
        },
        heading1: {
            fontFamily: 'OpenSans-Bold',
            fontSize: 24,
            lineHeight: 25,
        },
        heading1Text: {
            paddingVertical: 8,
        },
        heading2: {
            fontFamily: 'OpenSans-Bold',
            fontSize: 22,
            lineHeight: 25,
        },
        heading2Text: {
            paddingVertical: 6,
        },
        heading3: {
            fontFamily: 'OpenSans-Bold',
            fontSize: 21,
            lineHeight: 25,
        },
        heading3Text: {
            paddingVertical: 6,
        },
        heading4: {
            fontFamily: 'OpenSans-Bold',
            fontSize: 20,
            lineHeight: 25,
        },
        heading4Text: {
            paddingVertical: 5,
        },
        heading5: {
            fontFamily: 'OpenSans-Bold',
            fontSize: 19,
            lineHeight: 25,
        },
        heading5Text: {
            paddingVertical: 5,
        },
        heading6: {
            fontFamily: 'OpenSans-Bold',
            fontSize: 18,
            lineHeight: 25,
        },
        heading6Text: {
            paddingVertical: 4,
        },
        code: {
            alignSelf: 'center',
            backgroundColor: changeOpacity(theme.centerChannelColor, 0.07),
            fontFamily: codeFont,
        },
        codeBlock: {
            fontFamily: codeFont,
        },
        mention: {
            fontFamily: 'OpenSans',
            color: theme.linkColor,
        },
        error: {
            fontFamily: 'OpenSans',
            color: theme.errorTextColor,
        },
        table_header_row: {
            fontFamily: 'OpenSans-Bold',
        },
        mention_highlight: {
            fontFamily: 'OpenSans',
            backgroundColor: theme.mentionHighlightBg,
            color: theme.mentionHighlightLink,
        },
    };
});

export const getMarkdownBlockStyles = makeStyleSheetFromTheme((theme: Theme) => {
    return {
        adjacentParagraph: {
            marginTop: 6,
        },
        horizontalRule: {
            backgroundColor: theme.centerChannelColor,
            height: StyleSheet.hairlineWidth,
            marginVertical: 10,
        },
        quoteBlockIcon: {
            color: changeOpacity(theme.centerChannelColor, 0.5),
        },
    };
});

const highlightedLanguages: LanguageObject = {
    actionscript: {name: 'ActionScript', extensions: ['as'], aliases: new Set(['as', 'as3'])},
    applescript: {name: 'AppleScript', extensions: ['applescript', 'osascript', 'scpt']},
    bash: {name: 'Bash', extensions: ['sh'], aliases: new Set('sh')},
    clojure: {name: 'Clojure', extensions: ['clj', 'boot', 'cl2', 'cljc', 'cljs', 'cljs.hl', 'cljscm', 'cljx', 'hic']},
    coffeescript: {name: 'CoffeeScript', extensions: ['coffee', '_coffee', 'cake', 'cjsx', 'cson', 'iced'], aliases: new Set(['coffee', 'coffee-script'])},
    cpp: {name: 'C/C++', extensions: ['cpp', 'c', 'cc', 'h', 'c++', 'h++', 'hpp'], aliases: new Set(['c++', 'c'])},
    cs: {name: 'C#', extensions: ['cs', 'csharp'], aliases: new Set(['c#', 'csharp'])},
    css: {name: 'CSS', extensions: ['css']},
    d: {name: 'D', extensions: ['d', 'di'], aliases: new Set('dlang')},
    dart: {name: 'Dart', extensions: ['dart']},
    delphi: {name: 'Delphi', extensions: ['delphi', 'dpr', 'dfm', 'pas', 'pascal', 'freepascal', 'lazarus', 'lpr', 'lfm']},
    diff: {name: 'Diff', extensions: ['diff', 'patch'], aliases: new Set(['patch', 'udiff'])},
    django: {name: 'Django', extensions: ['django', 'jinja']},
    dockerfile: {name: 'Dockerfile', extensions: ['dockerfile', 'docker'], aliases: new Set('docker')},
    elixir: {name: 'Elixir', extensions: ['ex', 'exs'], aliases: new Set(['ex', 'exs'])},
    erlang: {name: 'Erlang', extensions: ['erl'], aliases: new Set('erl')},
    fortran: {name: 'Fortran', extensions: ['f90', 'f95']},
    fsharp: {name: 'F#', extensions: ['fsharp', 'fs']},
    gcode: {name: 'G-Code', extensions: ['gcode', 'nc']},
    go: {name: 'Go', extensions: ['go'], aliases: new Set('golang')},
    groovy: {name: 'Groovy', extensions: ['groovy']},
    handlebars: {name: 'Handlebars', extensions: ['handlebars', 'hbs', 'html.hbs', 'html.handlebars'], aliases: new Set(['hbs', 'mustache'])},
    haskell: {name: 'Haskell', extensions: ['hs'], aliases: new Set('hs')},
    haxe: {name: 'Haxe', extensions: ['hx']},
    java: {name: 'Java', extensions: ['java', 'jsp']},
    javascript: {name: 'JavaScript', extensions: ['js', 'jsx'], aliases: new Set(['js', 'jsx'])},
    json: {name: 'JSON', extensions: ['json']},
    julia: {name: 'Julia', extensions: ['jl'], aliases: new Set('jl')},
    kotlin: {name: 'Kotlin', extensions: ['kt', 'ktm', 'kts']},
    latex: {name: 'LaTeX', extensions: ['tex'], aliases: new Set('tex')},
    less: {name: 'Less', extensions: ['less']},
    lisp: {name: 'Lisp', extensions: ['lisp']},
    lua: {name: 'Lua', extensions: ['lua']},
    makefile: {name: 'Makefile', extensions: ['mk', 'mak'], aliases: new Set(['make', 'mf', 'gnumake', 'bsdmake'])},
    markdown: {name: 'Markdown', extensions: ['md', 'mkdown', 'mkd'], aliases: new Set(['md', 'mkd'])},
    matlab: {name: 'Matlab', extensions: ['matlab', 'm'], aliases: new Set('m')},
    objectivec: {name: 'Objective C', extensions: ['mm', 'objc', 'obj-c'], aliases: new Set(['objective_c', 'objc'])},
    ocaml: {name: 'OCaml', extensions: ['ml']},
    perl: {name: 'Perl', extensions: ['perl', 'pl'], aliases: new Set('pl')},
    pgsql: {name: 'PostgreSQL', extensions: ['pgsql', 'postgres', 'postgresql'], aliases: new Set(['postgres', 'postgresql'])},
    php: {name: 'PHP', extensions: ['php', 'php3', 'php4', 'php5', 'php6'], aliases: new Set(['php3', 'php4', 'php5'])},
    powershell: {name: 'PowerShell', extensions: ['ps', 'ps1'], aliases: new Set('posh')},
    puppet: {name: 'Puppet', extensions: ['pp'], aliases: new Set('pp')},
    python: {name: 'Python', extensions: ['py', 'gyp'], aliases: new Set('py')},
    r: {name: 'R', extensions: ['r'], aliases: new Set(['r', 's'])},
    ruby: {name: 'Ruby', extensions: ['ruby', 'rb', 'gemspec', 'podspec', 'thor', 'irb'], aliases: new Set('rb')},
    rust: {name: 'Rust', extensions: ['rs'], aliases: new Set('rs')},
    scala: {name: 'Scala', extensions: ['scala']},
    scheme: {name: 'Scheme', extensions: ['scm', 'sld']},
    scss: {name: 'SCSS', extensions: ['scss']},
    smalltalk: {name: 'Smalltalk', extensions: ['st'], aliases: new Set(['st', 'squeak'])},
    sql: {name: 'SQL', extensions: ['sql']},
    stylus: {name: 'Stylus', extensions: ['styl'], aliases: new Set('styl')},
    swift: {name: 'Swift', extensions: ['swift']},
    text: {name: 'Text', extensions: ['txt', 'log']},
    typescript: {name: 'TypeScript', extensions: ['ts', 'tsx'], aliases: new Set(['ts', 'tsx'])},
    vbnet: {name: 'VB.Net', extensions: ['vbnet', 'vb', 'bas'], aliases: new Set(['vb', 'visualbasic'])},
    vbscript: {name: 'VBScript', extensions: ['vbs']},
    verilog: {name: 'Verilog', extensions: ['v', 'veo', 'sv', 'svh']},
    vhdl: {name: 'VHDL', extensions: ['vhd', 'vhdl']},
    xml: {name: 'HTML, XML', extensions: ['xml', 'html', 'xhtml', 'rss', 'atom', 'xsl', 'plist']},
    yaml: {name: 'YAML', extensions: ['yaml'], aliases: new Set('yml')},
};

export function getHighlightLanguageFromNameOrAlias(name: string) {
    const langName: string = name.toLowerCase();
    if (highlightedLanguages[langName]) {
        return langName;
    }

    return Object.keys(highlightedLanguages).find((key) => {
        return highlightedLanguages[key].aliases?.has(langName);
    }) || '';
}

export function getHighlightLanguageName(language: string): string {
    const name: string | undefined = getHighlightLanguageFromNameOrAlias(language);
    if (!name) {
        return '';
    }
    return highlightedLanguages[name].name || '';
}

export function escapeRegex(text: string) {
    return text.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

export function switchKeyboardForCodeBlocks(value: string, cursorPosition: number) {
    if (Platform.OS === 'ios' && parseInt(Platform.Version, 10) >= 12) {
        const regexForCodeBlock = /^```$(.*?)^```$|^```$(.*)/gms;

        const matches = [];
        let nextMatch;
        while ((nextMatch = regexForCodeBlock.exec(value)) !== null) {
            matches.push({
                startOfMatch: regexForCodeBlock.lastIndex - nextMatch[0].length,
                endOfMatch: regexForCodeBlock.lastIndex + 1,
            });
        }

        const cursorIsInsideCodeBlock = matches.some((match) => cursorPosition >= match.startOfMatch && cursorPosition <= match.endOfMatch);

        // 'email-address' keyboardType prevents iOS emdash autocorrect
        if (cursorIsInsideCodeBlock) {
            return 'email-address';
        }
    }

    return 'default';
}

export const getMarkdownImageSize = (
    isReplyPost: boolean,
    isTablet: boolean,
    sourceSize?: SourceSize,
    knownSize?: PostImage,
    layoutWidth?: number,
) => {
    let ratioW;
    let ratioH;

    if (sourceSize?.width && sourceSize?.height) {
        // if the source image is set with HxW
        return {width: sourceSize.width, height: sourceSize.height};
    } else if (knownSize?.width && knownSize.height) {
        // If the metadata size is set calculate the ratio
        ratioW = knownSize.width > 0 ? knownSize.height / knownSize.width : 1;
        ratioH = knownSize.height > 0 ? knownSize.width / knownSize.height : 1;
    }

    if (sourceSize?.width && !sourceSize.height && ratioW) {
        // If source Width is set calculate the height using the ratio
        return {width: sourceSize.width, height: sourceSize.width * ratioW};
    } else if (sourceSize?.height && !sourceSize.width && ratioH) {
        // If source Height is set calculate the width using the ratio
        return {width: sourceSize.height * ratioH, height: sourceSize.height};
    }

    if (sourceSize?.width || sourceSize?.height) {
        // if at least one size is set and we do not have metadata (svg's)
        const width = sourceSize.width;
        const height = sourceSize.height;
        return {width: width || height, height: height || width};
    }

    if (knownSize?.width && knownSize.height) {
        // When metadata values are set
        return {width: knownSize.width, height: knownSize.height};
    }

    // When no metadata and source size is not specified (full size svg's)
    const width = layoutWidth || getViewPortWidth(isReplyPost, isTablet);
    return {width, height: width};
};