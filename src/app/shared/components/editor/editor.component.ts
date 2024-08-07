import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  signal,
} from '@angular/core';
import EditorJS, { OutputData } from '@editorjs/editorjs';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';
//@ts-ignore
import SimpleImage from '@editorjs/simple-image';
//@ts-ignore
import RawTool from '@editorjs/raw';
//@ts-ignore
import LinkTool from '@editorjs/link';
//@ts-ignore
import Embed from '@editorjs/embed';
//@ts-ignore
import Checklist from '@editorjs/checklist';
//@ts-ignore
import Quote from '@editorjs/quote';
//@ts-ignore
import CodeTool from '@editorjs/code';
//@ts-ignore
import NestedList from '@editorjs/nested-list';
//@ts-ignore
import InlineCode from '@editorjs/inline-code';
//@ts-ignore
import Underline from '@editorjs/underline';
//@ts-ignore
import Marker from '@editorjs/marker';
// @ts-ignore
import ImageTool from '@editorjs/image';
// @ts-ignore
import DragDrop from 'editorjs-drag-drop';
// @ts-ignore
import Paragraph from '@editorjs/paragraph';
// @ts-ignore
import ChangeCase from 'editorjs-change-case';
// @ts-ignore
import Strikthrough from '@sotaproject/strikethrough';
// @ts-ignore
import ColorPlugin from 'editorjs-text-color-plugin';
// @ts-ignore
import AlignmentBlockTune from 'editorjs-text-alignment-blocktune';

import { JsonPipe } from '@angular/common';
import axios from 'axios';

@Component({
  selector: 'App-editor',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {
  @ViewChild('editor') editorEl?: ElementRef;
  @ViewChild('.ce-block') blockEl?: ElementRef;

  editor?: EditorJS;
  outputData = signal<OutputData | undefined>(undefined);

  userDummyData = {
    name: 'Jing Wei',
    username: '@dreamingalone',
  };

  // @HostListener('click', ['$event']) onFocus(event: any) {
  //   if (event.target.classList.contains('ce-paragraph')) {
  //     event.target.classList.add('ce-paragraph');
  //   }
  // }

  ngAfterViewInit() {
    this.editor = new EditorJS({
      minHeight: 0,
      holder: this.editorEl?.nativeElement,
      placeholder: 'Click here to start writing...',
      autofocus: false,

      /**
       * Available Tools list.
       * Pass Tool's class or Settings object for each Tool you want to use
       */
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
          tunes: ['textAlignment'],
          config: {
            placeholder: 'Enter a header',
            levels: [1, 2, 3, 4, 5],
            default: 2,
          },
        },
        underline: Underline,
        raw: RawTool,
        code: CodeTool,
        Marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M',
        },
        strikethrough: {
          class: Strikthrough,
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              codepen: true,
            },
          },
        },
        list: {
          class: NestedList,
          inlineToolbar: true,
          config: {
            defaultStyle: 'ordered',
          },
        },
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file: any) {
                const reader = new FileReader();
                return new Promise((resolve) => {
                  reader.readAsDataURL(file);
                  reader.onload = (event) => {
                    resolve({
                      success: 1,
                      file: {
                        url: event?.target?.result, // Base64 encoded data
                      },
                    });
                  };
                });
              },
            },
            inlineToolbar: true,
          },
        },

        linkTool: {
          class: LinkTool,
          config: {
            services: {
              endpoint: '',
            },
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+O',
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: "Quote's author",
          },
        },
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+M',
        },

        textAlignment: {
          class: AlignmentBlockTune,
          config: {
            default: 'left',
            block: {
              header: 'center',
            },
          },
        },
        paragraph: {
          class: Paragraph,
          tunes: ['textAlignment'],
          config: {
            placeholder: 'Enter a paragraph',
          },
        },
        changeCase: {
          class: ChangeCase,
        },
        color: {
          class: ColorPlugin,
          config: {
            colorCollections: [
              '#EC7878',
              '#9C27B0',
              '#673AB7',
              '#3F51B5',
              '#0070FF',
              '#03A9F4',
              '#00BCD4',
              '#4CAF50',
              '#8BC24A',
              '#CDDC39',
              '#FFF',
            ],
            defaultColor: '#FF1300',
            customPicker: true,
          },
        },
      },
      data: {
        blocks: [
          // {
          //   type: 'header',
          //   data: {
          //     text: 'Why Telegram is the best messenger',
          //     level: 2,
          //   },
          // },
          // {
          //   type: 'image',
          //   data: {
          //     url: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Tesla/Model-3/5251/1693556345148/front-left-side-47.jpg?impolicy=resize&imwidth=420',
          //     caption: '',
          //     stretched: false,
          //     withBorder: true,
          //     withBackground: false,
          //   },
          // },
        ],
      },
      onReady: () => {
        new DragDrop(this.editor);
        console.log('Editor.js is ready to work!');
      },
    });
  }

  saveData() {
    this.editor
      ?.save()
      .then((outputData) => {
        console.log('Article data: ', outputData.time);

        const newOutputData = { id: 1, ...outputData };

        console.log(newOutputData);

        this.outputData.set(outputData);
      })
      .catch((error) => {
        console.log('Saving failed: ', error);
      });
  }
}
