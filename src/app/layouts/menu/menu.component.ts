import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as pdfMake from "pdfmake/build/pdfmake"; 
import * as pdfFonts from "pdfmake/build/vfs_fonts"; 
import { Margins } from 'pdfmake/interfaces';  


(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;




@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  isMenuOpened: boolean = false;

  toggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }


  rapport(){
    let docDefinition:any = { 
    pageSize: 'a8',
    //   header : {
    //     columns: [
    //       { text: 'Logo', alignment: 'center' },
    //     ]
    // },


    // footer :  {
    //     columns: [
      
    //       { text: 'Right part', alignment: 'center' }
    //     ]
    // },

    footer: function(currentPage:any, pageCount:any) { 
      return [
        {text: currentPage.toString() + ' sur ' + pageCount,alignment: 'center',style:'header'}
      ]
     },
    header: function(currentPage:any, pageCount:any, pageSize:any) {
      // you can apply any logic and return any valid pdfmake element
  
      return [
        { 
          text: 'MINISTERE DE LA DEFENSE NATIONALE ET ANCIENS COMBATTANTS', 
          alignment: (currentPage % 2) ? 
          'center' : 'center'
        },
        { 
          text: 'INSPECTORAT GENERAL DES FORCES ARMEES DE LA REPUBLIQUE DEMOCRATIQUE DU CONGO', 
          alignment: (currentPage % 2) ? 
          'center' : 'center'
        },
       
        { canvas: [ { type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 } ] }
      ]
    },

    styles: {
      header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
          //background:'blue',
          color: 'black',
          padding: [100, 100, 100, 100],
          alignment:'center'
      }
  },
  defaultStyle: {
      // alignment: 'justify'
  },

      
      content: [
        {text: 'LISTE DES EQUIPEMENTS ET LEURS DETENTEURS',style:'header'},
        {
          image: 'images/select.png',
          width: 150
        },
      

        {
        
         
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*' ],
    
            body: [
              [ 'First', 'Second', 'Third', 'The last one' ],
              [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
              [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
              [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
              [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4']
            ]
          }
        }
      ]
      // content: [
      //   {
      //    table: {
      //     body: [
      //      [{text:'11111'},{text:'222222'},{text:'333333'}], //row1
      //      [                                                   //row2
      //       {ul: ['item 1','item 2']},
      //       { 
      //        // text:'22'
      //        table: {
      //         body: [['Col1', 'Col2', 'Col3'],['1', '2', '3'],['1', '2', '3']]
      //        }
      //        ,rowSpan:2
      //       },
      //       {text: "123123123"}
      //      ],
      //      [{text:'1'},{text:'2'},{text:'3'}]        
      //     ]
      //    },
      //   },
      //  ]
    };  
   
    pdfMake.createPdf(docDefinition).open(); 
  }
 r(){
  // let dd:any = {
  //   pageSize: 'a7',
  //   content: [
  //     {text: 'Tables', style: 'header'},
  //     'Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.',
  //     {text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'subheader'},
  //     'The following table has nothing more than a body array',
  //     {
  //       style: 'tableExample',
  //       table: {
  //         body: [
  //           ['Column 1', 'Column 2', 'Column 3'],
  //           ['One value goes here', 'Another one here', 'OK?']
  //         ]
  //       }
  //     },
  //     {text: 'A simple table with nested elements', style: 'subheader'},
  //     'It is of course possible to nest any other type of nodes available in pdfmake inside table cells',
  //     {
  //       style: 'tableExample',
  //       table: {
  //         body: [
  //           ['Column 1', 'Column 2', 'Column 3'],
  //           [
  //             {
  //               stack: [
  //                 'Let\'s try an unordered list',
  //                 {
  //                   ul: [
  //                     'item 1',
  //                     'item 2'
  //                   ]
  //                 }
  //               ]
  //             },
  //             [
  //               'or a nested table',
  //               {
  //                 table: {
  //                   body: [
  //                     ['Col1', 'Col2', 'Col3'],
  //                     ['1', '2', '3'],
  //                     ['1', '2', '3']
  //                   ]
  //                 },
  //               }
  //             ],
  //             {text: [
  //                 'Inlines can be ',
  //                 {text: 'styled\n', italics: true},
  //                 {text: 'easily as everywhere else', fontSize: 10}]
  //             }
  //           ]
  //         ]
  //       }
  //     },
  //     {text: 'Defining column widths', style: 'subheader'},
  //     'Tables support the same width definitions as standard columns:',
  //     {
  //       bold: true,
  //       ul: [
  //         'auto',
  //         'star',
  //         'fixed value'
  //       ]
  //     },
  //     {
  //       style: 'tableExample',
  //       table: {
  //         widths: [100, '*', 200, '*'],
  //         body: [
  //           ['width=100', 'star-sized', 'width=200', 'star-sized'],
  //           ['fixed-width cells have exactly the specified width', {text: 'nothing interesting here', italics: true, color: 'gray'}, {text: 'nothing interesting here', italics: true, color: 'gray'}, {text: 'nothing interesting here', italics: true, color: 'gray'}]
  //         ]
  //       }
  //     },
  //     {
  //       style: 'tableExample',
  //       table: {
  //         widths: ['*', 'auto'],
  //         body: [
  //           ['This is a star-sized column. The next column over, an auto-sized column, will wrap to accomodate all the text in this cell.', 'I am auto sized.'],
  //         ]
  //       }
  //     },
  //     {
  //       style: 'tableExample',
  //       table: {
  //         widths: ['*', 'auto'],
  //         body: [
  //           ['This is a star-sized column. The next column over, an auto-sized column, will not wrap to accomodate all the text in this cell, because it has been given the noWrap style.', {text: 'I am auto sized.', noWrap: true}],
  //         ]
  //       }
  //     },
  //     {text: 'Defining row heights', style: 'subheader'},
  //     {
  //       style: 'tableExample',
  //       table: {
  //         heights: [20, 50, 70],
  //         body: [
  //           ['row 1 with height 20', 'column B'],
  //           ['row 2 with height 50', 'column B'],
  //           ['row 3 with height 70', 'column B']
  //         ]
  //       }
  //     },
  //     'With same height:',
  //     {
  //       style: 'tableExample',
  //       table: {
  //         heights: 40,
  //         body: [
  //           ['row 1', 'column B'],
  //           ['row 2', 'column B'],
  //           ['row 3', 'column B']
  //         ]
  //       }
  //     },
  //     'With height from function:',
  //     {
  //       style: 'tableExample',
  //       table: {
  //         heights: function (row:any) {
  //           return (row + 1) * 25;
  //         },
  //         body: [
  //           ['row 1', 'column B'],
  //           ['row 2', 'column B'],
  //           ['row 3', 'column B']
  //         ]
  //       }
  //     },
  //     {text: 'Column/row spans', pageBreak: 'before', style: 'subheader'},
  //     'Each cell-element can set a rowSpan or colSpan',
  //     {
  //       style: 'tableExample',
  //       color: '#444',
  //       table: {
  //         widths: [200, 'auto', 'auto'],
  //         headerRows: 2,
  //         // keepWithHeaderRows: 1,
  //         body: [
  //           [{text: 'Header with Colspan = 2', style: 'tableHeader', colSpan: 2, alignment: 'center'}, {}, {text: 'Header 3', style: 'tableHeader', alignment: 'center'}],
  //           [{text: 'Header 1', style: 'tableHeader', alignment: 'center'}, {text: 'Header 2', style: 'tableHeader', alignment: 'center'}, {text: 'Header 3', style: 'tableHeader', alignment: 'center'}],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //           [{rowSpan: 3, text: 'rowSpan set to 3\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor'}, 'Sample value 2', 'Sample value 3'],
  //           ['', 'Sample value 2', 'Sample value 3'],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //           ['Sample value 1', {colSpan: 2, rowSpan: 2, text: 'Both:\nrowSpan and colSpan\ncan be defined at the same time'}, ''],
  //           ['Sample value 1', '', ''],
  //         ]
  //       }
  //     },
  //     {text: 'Headers', pageBreak: 'before', style: 'subheader'},
  //     'You can declare how many rows should be treated as a header. Headers are automatically repeated on the following pages',
  //     {text: ['It is also possible to set keepWithHeaderRows to make sure there will be no page-break between the header and these rows. Take a look at the document-definition and play with it. If you set it to one, the following table will automatically start on the next page, since there\'s not enough space for the first row to be rendered here'], color: 'gray', italics: true},
  //     {
  //       style: 'tableExample',
  //       table: {
  //         headerRows: 1,
  //         // dontBreakRows: true,
  //         // keepWithHeaderRows: 1,
  //         body: [
  //           [{text: 'Header 1', style: 'tableHeader'}, {text: 'Header 2', style: 'tableHeader'}, {text: 'Header 3', style: 'tableHeader'}],
  //           [
  //             'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //             'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //             'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //           ]
  //         ]
  //       }
  //     },
  //     {text: 'Styling tables', style: 'subheader'},
  //     'You can provide a custom styler for the table. Currently it supports:',
  //     {
  //       ul: [
  //         'line widths',
  //         'line colors',
  //         'cell paddings',
  //       ]
  //     },
  //     'with more options coming soon...\n\npdfmake currently has a few predefined styles (see them on the next page)',
  //     {text: 'noBorders:', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8]},
  //     {
  //       style: 'tableExample',
  //       table: {
  //         headerRows: 1,
  //         body: [
  //           [{text: 'Header 1', style: 'tableHeader'}, {text: 'Header 2', style: 'tableHeader'}, {text: 'Header 3', style: 'tableHeader'}],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //         ]
  //       },
  //       layout: 'noBorders'
  //     },
  //     {text: 'headerLineOnly:', fontSize: 14, bold: true, margin: [0, 20, 0, 8]},
  //     {
  //       style: 'tableExample',
  //       table: {
  //         headerRows: 1,
  //         body: [
  //           [{text: 'Header 1', style: 'tableHeader'}, {text: 'Header 2', style: 'tableHeader'}, {text: 'Header 3', style: 'tableHeader'}],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //         ]
  //       },
  //       layout: 'headerLineOnly'
  //     },
  //     {text: 'lightHorizontalLines:', fontSize: 14, bold: true, margin: [0, 20, 0, 8]},
  //     {
  //       style: 'tableExample',
  //       table: {
  //         headerRows: 1,
  //         body: [
  //           [{text: 'Header 1', style: 'tableHeader'}, {text: 'Header 2', style: 'tableHeader'}, {text: 'Header 3', style: 'tableHeader'}],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //         ]
  //       },
  //       layout: 'lightHorizontalLines'
  //     },
  //     {text: 'but you can provide a custom styler as well', margin: [0, 20, 0, 8]},
  //     {
  //       style: 'tableExample',
  //       table: {
  //         headerRows: 1,
  //         body: [
  //           [{text: 'Header 1', style: 'tableHeader'}, {text: 'Header 2', style: 'tableHeader'}, {text: 'Header 3', style: 'tableHeader'}],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //         ]
  //       },
  //       layout: {
  //         hLineWidth: function (i:any, node:any) {
  //           return (i === 0 || i === node.table.body.length) ? 2 : 1;
  //         },
  //         vLineWidth: function (i:any, node:any) {
  //           return (i === 0 || i === node.table.widths.length) ? 2 : 1;
  //         },
  //         hLineColor: function (i:any, node:any) {
  //           return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
  //         },
  //         vLineColor: function (i:any, node:any) {
  //           return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
  //         },
  //         // hLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
  //         // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
  //         // paddingLeft: function(i, node) { return 4; },
  //         // paddingRight: function(i, node) { return 4; },
  //         // paddingTop: function(i, node) { return 2; },
  //         // paddingBottom: function(i, node) { return 2; },
  //         // fillColor: function (rowIndex, node, columnIndex) { return null; }
  //       }
  //     },
  //     {text: 'zebra style', margin: [0, 20, 0, 8]},
  //     {
  //       style: 'tableExample',
  //       table: {
  //         body: [
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //         ]
  //       },
  //       layout: {
  //         fillColor: function (rowIndex:any, node:any, columnIndex:any) {
  //           return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
  //         }
  //       }
  //     },
  //     {text: 'and can be used dash border', margin: [0, 20, 0, 8]},
  //     {
  //       style: 'tableExample',
  //       table: {
  //         headerRows: 1,
  //         body: [
  //           [{text: 'Header 1', style: 'tableHeader'}, {text: 'Header 2', style: 'tableHeader'}, {text: 'Header 3', style: 'tableHeader'}],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //           ['Sample value 1', 'Sample value 2', 'Sample value 3'],
  //         ]
  //       },
  //       layout:  {
  //         hLineWidth: function (i:any, node:any) {
  //           return (i === 0 || i === node.table.body.length) ? 2 : 1;
  //         },
  //         vLineWidth: function (i:any, node:any) {
  //           return (i === 0 || i === node.table.widths.length) ? 2 : 1;
  //         },
  //         hLineColor: function (i:any, node:any) {
  //           return 'black';
  //         },
  //         vLineColor: function (i:any, node:any) {
  //           return 'black';
  //         },
  //         hLineStyle: function (i:any, node:any) {
  //           if (i === 0 || i === node.table.body.length) {
  //             return null;
  //           }
  //           return {dash: {length: 10, space: 4}};
  //         },
  //         vLineStyle: function (i:any, node:any) {
  //           if (i === 0 || i === node.table.widths.length) {
  //             return null;
  //           }
  //           return {dash: {length: 4}};
  //         },
  //         // paddingLeft: function(i, node) { return 4; },
  //         // paddingRight: function(i, node) { return 4; },
  //         // paddingTop: function(i, node) { return 2; },
  //         // paddingBottom: function(i, node) { return 2; },
  //         // fillColor: function (i, node) { return null; }
  //       }
  //     },
  //     {text: 'Optional border', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8]},
  //     'Each cell contains an optional border property: an array of 4 booleans for left border, top border, right border, bottom border.',
  //     {
  //       style: 'tableExample',
  //       table: {
  //         body: [
  //           [
  //             {
  //               border: [false, true, false, false],
  //               fillColor: '#eeeeee',
  //               text: 'border:\n[false, true, false, false]'
  //             },
  //             {
  //               border: [false, false, false, false],
  //               fillColor: '#dddddd',
  //               text: 'border:\n[false, false, false, false]'
  //             },
  //             {
  //               border: [true, true, true, true],
  //               fillColor: '#eeeeee',
  //               text: 'border:\n[true, true, true, true]'
  //             }
  //           ],
  //           [
  //             {
  //               rowSpan: 3,
  //               border: [true, true, true, true],
  //               fillColor: '#eeeeff',
  //               text: 'rowSpan: 3\n\nborder:\n[true, true, true, true]'
  //             },
  //             {
  //               border: undefined,
  //               fillColor: '#eeeeee',
  //               text: 'border:\nundefined'
  //             },
  //             {
  //               border: [true, false, false, false],
  //               fillColor: '#dddddd',
  //               text: 'border:\n[true, false, false, false]'
  //             }
  //           ],
  //           [
  //             '',
  //             {
  //               colSpan: 2,
  //               border: [true, true, true, true],
  //               fillColor: '#eeffee',
  //               text: 'colSpan: 2\n\nborder:\n[true, true, true, true]'
  //             },
  //             ''
  //           ],
  //           [
  //             '',
  //             {
  //               border: undefined,
  //               fillColor: '#eeeeee',
  //               text: 'border:\nundefined'
  //             },
  //             {
  //               border: [false, false, true, true],
  //               fillColor: '#dddddd',
  //               text: 'border:\n[false, false, true, true]'
  //             }
  //           ]
  //         ]
  //       },
  //       layout: {
  //         defaultBorder: false,
  //       }
  //     },
  //     'For every cell without a border property, whether it has all borders or not is determined by layout.defaultBorder, which is false in the table above and true (by default) in the table below.',
  //     {
  //       style: 'tableExample',
  //       table: {
  //         body: [
  //           [
  //             {
  //               border: [false, false, false, false],
  //               fillColor: '#eeeeee',
  //               text: 'border:\n[false, false, false, false]'
  //             },
  //             {
  //               fillColor: '#dddddd',
  //               text: 'border:\nundefined'
  //             },
  //             {
  //               fillColor: '#eeeeee',
  //               text: 'border:\nundefined'
  //             },
  //           ],
  //           [
  //             {
  //               fillColor: '#dddddd',
  //               text: 'border:\nundefined'
  //             },
  //             {
  //               fillColor: '#eeeeee',
  //               text: 'border:\nundefined'
  //             },
  //             {
  //               border: [true, true, false, false],
  //               fillColor: '#dddddd',
  //               text: 'border:\n[true, true, false, false]'
  //             },
  //           ]
  //         ]
  //       }
  //     },
  //     'And some other examples with rowSpan/colSpan...',
  //     {
  //       style: 'tableExample',
  //       table: {
  //         body: [
  //           [
  //             '',
  //             'column 1',
  //             'column 2',
  //             'column 3'
  //           ],
  //           [
  //             'row 1',
  //             {
  //               rowSpan: 3,
  //               colSpan: 3,
  //               border: [true, true, true, true],
  //               fillColor: '#cccccc',
  //               text: 'rowSpan: 3\ncolSpan: 3\n\nborder:\n[true, true, true, true]'
  //             },
  //             '',
  //             ''
  //           ],
  //           [
  //             'row 2',
  //             '',
  //             '',
  //             ''
  //           ],
  //           [
  //             'row 3',
  //             '',
  //             '',
  //             ''
  //           ]
  //         ]
  //       },
  //       layout: {
  //         defaultBorder: false,
  //       }
  //     },
  //     {
  //       style: 'tableExample',
  //       table: {
  //         body: [
  //           [
  //             {
  //               colSpan: 3,
  //               text: 'colSpan: 3\n\nborder:\n[false, false, false, false]',
  //               fillColor: '#eeeeee',
  //               border: [false, false, false, false]
  //             },
  //             '',
  //             ''
  //           ],
  //           [
  //             'border:\nundefined',
  //             'border:\nundefined',
  //             'border:\nundefined'
  //           ]
  //         ]
  //       }
  //     },
  //     {
  //       style: 'tableExample',
  //       table: {
  //         body: [
  //           [
  //             {rowSpan: 3, text: 'rowSpan: 3\n\nborder:\n[false, false, false, false]', fillColor: '#eeeeee', border: [false, false, false, false]},
  //             'border:\nundefined',
  //             'border:\nundefined'
  //           ],
  //           [
  //             '',
  //             'border:\nundefined',
  //             'border:\nundefined'
  //           ],
  //           [
  //             '',
  //             'border:\nundefined',
  //             'border:\nundefined'
  //           ]
  //         ]
  //       }
  //     }
  //   ],
  //   styles: {
  //     header: {
  //       fontSize: 18,
  //       bold: true,
  //       margin: [0, 0, 0, 10]
  //     },
  //     subheader: {
  //       fontSize: 16,
  //       bold: true,
  //       margin: [0, 10, 0, 5]
  //     },
  //     tableExample: {
  //       margin: [0, 5, 0, 15]
  //     },
  //     tableHeader: {
  //       bold: true,
  //       fontSize: 13,
  //       color: 'black'
  //     }
  //   },
  //   defaultStyle: {
  //     // alignment: 'justify'
  //   }

  // };
  // pdfMake.createPdf(dd).open(); 
  var docDefinition:any = {
    // a string or { width: number, height: number }
    pageSize: 'A10',
  
    // by default we use portrait, you can change it to landscape if you wish
    pageOrientation: 'landscape',
  
    // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
    pageMargins: [ 40, 60, 40, 60 ],
  };
  pdfMake.createPdf(docDefinition).open(); 
    
  } 


}


