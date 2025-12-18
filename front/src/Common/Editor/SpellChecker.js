import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

const SpellCheckerPluginKey = new PluginKey('spellChecker');

export const SpellChecker = Extension.create({
  name: 'spellChecker',

  addOptions() {
    return {
      dictionary: new Set(),
      dictionaryUrl: '/teny_malagasy_clean.json',
      useJson: true,
    };
  },

  addStorage() {
    return {
      dictionary: new Set(),
    };
  },

  onCreate() {
    const extension = this;
    fetch(extension.options.dictionaryUrl)
      .then((response) => {
        if (extension.options.useJson) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then((data) => {
        let words = [];
        
        if (extension.options.useJson) {
          if (Array.isArray(data)) {
            words = data
              .map((entry) => entry.word)
              .filter((word) => word && word.trim().length > 0)
              .map((word) => word.trim().toLowerCase());
          } else {
            return;
          }
        } else {
          words = data
            .split('\n')
            .map((word) => word.trim().toLowerCase())
            .filter((word) => word.length > 0);
        }
        
        const dictionary = new Set(words);
        extension.storage.dictionary = dictionary;
        
        if (extension.editor) {
          const { state, dispatch } = extension.editor.view;
          const tr = state.tr.setMeta('spellCheckUpdate', true);
          dispatch(tr);
        }
      })
      .catch(() => {
      });
  },

  addProseMirrorPlugins() {
    const self = this;
    
    const createDecorations = (state) => {
      const dict = self.storage.dictionary;
      
      if (!dict || dict.size === 0) {
        return DecorationSet.empty;
      }

      const decorations = [];
      const { doc } = state;

      doc.descendants((node, pos) => {
        if (node.isText && node.text) {
          const text = node.text;
          const wordRegex = /\b\w+\b/g;
          let match;

          while ((match = wordRegex.exec(text)) !== null) {
            const word = match[0];
            const normalizedWord = word.toLowerCase();
            
            if (!dict.has(normalizedWord)) {
              const from = pos + match.index;
              const to = from + word.length;
              decorations.push(
                Decoration.inline(from, to, {
                  class: 'spell-check-error',
                })
              );
            }
          }
        }
      });

      return DecorationSet.create(doc, decorations);
    };

    return [
      new Plugin({
        key: SpellCheckerPluginKey,
        state: {
          init(config, state) {
            return createDecorations(state);
          },
          apply(tr, value, oldState, newState) {
            return createDecorations(newState);
          },
        },
        props: {
          decorations(state) {
            return this.getState(state);
          },
        },
      }),
    ];
  },
});

