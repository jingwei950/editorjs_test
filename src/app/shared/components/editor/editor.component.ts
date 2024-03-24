import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, signal } from '@angular/core';
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
import Marker from '@editorjs/marker'
// @ts-ignore
import ImageTool from '@editorjs/image';

import { JsonPipe } from '@angular/common';
import axios from 'axios';

@Component({
  selector: 'App-editor',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent {
  @ViewChild('editor') editorEl?: ElementRef;

  editor?: EditorJS;
  outputData = signal<OutputData | undefined>(undefined)

  userDummyData = {
    name: 'Jing Wei',
    username: '@dreamingalone'
  }

  ngAfterViewInit() {
    this.editor = new EditorJS({
      minHeight: 200,
      holder: this.editorEl?.nativeElement,
      placeholder: 'Let`s write an awesome story!',
      autofocus: false,

      /**
       * Available Tools list.
       * Pass Tool's class or Settings object for each Tool you want to use
       */
      tools: {
        header: Header,
        underline: Underline,
        raw: RawTool,
        code: CodeTool,
         Marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M',
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              coub: true
            }
          }
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
              async uploadByFile(file: any){
                const formData = new FormData()
                formData.append('file', file)

                console.log(file)

                const response = await axios.post(`/upload`, 
                formData, 
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                  withCredentials: false
                });

                if(response.data.success === 1){
                  return response.data;
                }
              }
            }
          } 
        },

        linkTool: {
          class: LinkTool,
          config: {
            services: {
              youtube: true
            }
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
        
      },
      data: {
        blocks: [
          {
            type: "header",
            data: {
              text: "Editor.js",
              level: 2
            }
          },
          {
            type : 'paragraph',
            data : {
              text : 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.'
            }
          },
          {
            type: "header",
            data: {
              text: "Key features",
              level: 3
            }
          },
          {
            type : 'list',
            data : {
              items : [
                'It is a block-styled editor',
                'It returns clean data output in JSON',
                'Designed to be extendable and pluggable with a simple API',
              ],
              style: 'unordered'
            }
          },
          {
            type: "header",
            data: {
              text: "What does it mean «block-styled editor»",
              level: 3
            }
          },
          {
            type : 'paragraph',
            data : {
              text : 'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\"cdx-marker\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.'
            }
          },
          {
            type : 'paragraph',
            data : {
              text : `There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.`
            }
          },
          {
            type: "header",
            data: {
              text: "What does it mean clean data output",
              level: 3
            }
          },
          {
            type : 'paragraph',
            data : {
              text : 'Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below'
            }
          },
          {
            type : 'paragraph',
            data : {
              text : `Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.`
            }
          },
          {
            type : 'paragraph',
            data : {
              text : 'Clean data is useful to sanitize, validate and process on the backend.'
            }
          },
          {
            type : 'delimiter',
            data : {}
          },
          {
            type : 'paragraph',
            data : {
              text : 'We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make its core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏'
            }
          },
          {
            type: 'image',
            data: {
              url: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Tesla/Model-3/5251/1693556345148/front-left-side-47.jpg?impolicy=resize&imwidth=420',
              caption: '',
              stretched: false,
              withBorder: true,
              withBackground: false,
            }
          },
        ]
      },
      onReady: () => {
        console.log('Editor.js is ready to work!');
      },
    });
  }

  saveData() {
    this.editor
      ?.save()
      .then((outputData) => {
        console.log('Article data: ', outputData.time);

        const newOutputData = {id: 1, ...outputData}

        console.log(newOutputData)

        this.outputData.set(outputData)
      })
      .catch((error) => {
        console.log('Saving failed: ', error);
      });
  }
}
