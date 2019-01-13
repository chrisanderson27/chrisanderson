export const code = {
    captcha:
    {
        html: `
        <button type="button" class="btn btn-info" (click)="openDialog()">Code</button>
<hr />
<div class=container>
  <div class="d-flex flex-row justify-content-around my-flex-container">

    <div class="p-2 my-flex-item">

      <h1><i>{{controlMessage}}</i></h1>

      <mat-grid-list cols="3" rowHeight=3:3 gutterSize=10px>
        <mat-grid-tile *ngFor="let imageBlock of imageList">

          <div class="background" (click)='imageClick(imageBlock)' [ngStyle]="{'background-image': 'url(' + imageBlock.url + ')'}">
            <div class="layer" *ngIf="imageBlock.hasBeenClicked" [ngStyle]="{'background-color': 'rgba(248, 247, 216, 0.6)'}">
            </div>
          </div>


          <!-- {{imageBlock.name}} -->
        </mat-grid-tile>

      </mat-grid-list>
      <h2 style="text-align: center">{{answerStatus}}</h2>

      <h3 style="text-align: center">Clicked: {{trueCounter}}/{{counterControl}}</h3>

      <div class="text-center">
        <button type="button" class="btn btn-success" (click)='populateImageData()'>Refresh</button>
      </div>
    </div>

  </div>

</div>

<br><br><br>
<div class=btnContainer>

</div>

<!-- <div *ngFor="let imageBlock of imageList">
  <img src={{imageBlock.url}}></div> -->

<mat-dialog-actions align="end">
  <button mat-button mat-dialog-close>Close</button>
</mat-dialog-actions>
        `,
        css: `.my-flex-container {
          /* border: 2px solid green; */
          height: 700px;
          width: 100%;
          margin-bottom: 20px;
        }
      
        .my-flex-container-column {
          /* border: 2px solid green; */
          height: 100%;
          width: 100%;
          margin-bottom: 20px;
        }
      
      .myGrid {
          height: 500px;
          width: 500px;
          /* display: inline; */
          text-align: center;
          justify-content: center;
          size: 50%;
      }
      
      .img2Div {
          background-color: rgba(255, 108, 235, 0.8);
          position: absolute;
          top: 0;
          left: 0;
          width: 90%;
          height: 90%;
      }
      
      .background {
          width: 100%;
          height: 100%;
          position: relative;
          background-size: contain;
      
      }
      
      .layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: contain;
      
      }
      
      `,
        ts: `import { Component, OnInit } from '@angular/core';
        import { MyImageData } from './ImageDate';
        import { ImageSource } from './ImageSource';
        import { MatDialog } from '@angular/material';
        import { SourceCodeViewComponent } from 'src/app/source-code-view/source-code-view.component';
        
        @Component({
          selector: 'app-image-selector',
          templateUrl: './image-selector.component.html',
          styleUrls: ['./image-selector.component.css']
        })
        export class ImageSelectorComponent {
          truthChecker = true;
          trueCounter = 0;
          counterControl: number;
          controlMessage = 'Click all images with birds';
          control = 'birds';
          imageList: MyImageData[] = [];
          sourceList: ImageSource[] = [];
          // myImageUrls: string[] = ['https://openclipart.org/download/88471/bird.svg',
          // 'https://openclipart.org/download/88477/1286138576.svg',
          // 'https://openclipart.org/download/88519/1286146771.svg'];
          myImageUrls: string[] = [];
          answerStatus = '';
          constructor(private dialog: MatDialog) {
            this.pullFromSources();
            this.populateImageData();
          }
        
          //opens modal
          openDialog() {
            const dialogRef = this.dialog.open(SourceCodeViewComponent, {
              maxWidth: '100vw',
              width: '80%',
              maxHeight: '100vh',
            });
            dialogRef.afterClosed().subscribe(result => {
            });
          }
        
          imageClick(imageBlock: MyImageData) {
            console.log('control counter: ' + this.counterControl);
        console.log(imageBlock.value + ' === ' + this.truthChecker );
            if (imageBlock.value === true && imageBlock.hasBeenClicked === false) {
              this.trueCounter++;
            } else if (imageBlock.value === true && imageBlock.hasBeenClicked === true) {
              this.trueCounter--;
            }
            imageBlock.hasBeenClicked = !imageBlock.hasBeenClicked;
        
            console.log(imageBlock.value);
        
            // check if complete
            if (this.trueCounter === this.counterControl) {
              this.answerStatus = 'CORRECT!';
            } else {
              this.answerStatus = 'Incorrect';
            }
        
          }
        
        
          populateImageData() {
            //birds or no birds
            this.truthChecker = true;
            if (Math.round((Math.random() * 2)) === 1 ) {
              this.controlMessage = 'Click all images without birds';
              this.truthChecker = false;
            } else {
              this.controlMessage = 'Click all images with birds';
        
             }
            this.trueCounter = 0;
            this.answerStatus = '';
            // create control
            this.imageList = [];
            let uniqueImageTraker: number[] = [];
             while (uniqueImageTraker.length < 9) {
              let randomNum = Math.round((Math.random() * this.sourceList.length));
              console.log(randomNum);
        
              let myImageData = new MyImageData();
              myImageData.hasBeenClicked = false;
        
        
              if (uniqueImageTraker.indexOf(randomNum) === -1) {
                try {
                  uniqueImageTraker.push(this.sourceList[randomNum].id);
                  //  myImageData.name = this.sourceList[randomNum].value;
                  myImageData.url = this.sourceList[randomNum].url;
                  myImageData.value = this.sourceList[randomNum].value === this.truthChecker ? true : false;
                  // myImageData.value = myImageData.name === this.control ? true : false;
                  console.log(randomNum + ' : ' + myImageData.url);
        
                  this.imageList.push(myImageData);
                } catch (error) {
        
                }
              }
            }
        
            let tempNumber = 0;
            for (const image of this.imageList) {
              // console.log('image name: ' + image.name);
              if (image.value === true) {
                tempNumber++;
              }
            }
        
            this.counterControl = tempNumber;
        
        
          }
        
          pullFromSources() {
        
            let urls: string[] = ['https://lafeber.com/pet-birds/wp-content/uploads/2018/06/Cockatiel-2.jpg',
              'https://nvlupin.blob.core.windows.net/images/van/TSM/TSMAU/1/56490/images/Snowy_Plover_with_chick_MickThompson_Flickr_800x800.jpg',
              'https://jooinn.com/images/bird-103.jpg',
              'https://3pktan2l5dp043gw5f49lvhc-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/Birds_BOTW_thumb_ruby-throated-hummingbird.png',
              'https://lafeber.com/pet-birds/wp-content/uploads/2018/06/Peach-Faced-Lovebird-300x300.jpg',
              'http://www.audubon.org/sites/default/files/np-grid/images/a/Impact_Images_NO_OVERLAY6.jpg',
              'https://static1.squarespace.com/static/5233160ae4b08346f3be204b/t/5661bc2ee4b02bc8dd441ddf/1449245788898/IMG_6224.JPG',
              'https://static1.squarespace.com/static/55259409e4b02b9e39c3a299/58333b4a6a496317255c5a3d/58333b4c893fc0db3e5a6b8b/1479752525285/Birds5.jpeg?format=750w',
              'https://www.thisiscolossal.com/wp-content/uploads/2018/03/bird-2.jpg',
              'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Birds_of_Sweden_2016_37.jpg/220px-Birds_of_Sweden_2016_37.jpg',
              'https://www.fast-growing-trees.com/images/D/Cold-Hardy-Tea-Plant-3-450W.jpg',
              'https://suttons.s3.amazonaws.com/p/250105_2.jpg',
              'https://cdn.shopify.com/s/files/1/0112/5432/products/aglaonemanewportpot_700x.jpg?v=1502130541',
              'https://cdn3.volusion.com/wkav7.pckj3/v/vspfiles/photos/HER-PAT01-2.jpg?1406809798',
              'https://media1.popsugar-assets.com/files/thumbor/vM9BJXsmbJXZjrwNmzVvujWcydY/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2017/09/07/727/n/1922441/aad4d34859b17388575482.62760008_edit_img_image_43986629_1504800373/i/Secret-Waterfall-Bali.jpg',
              'https://img-aws.ehowcdn.com/560x560p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/dd50b3bb14a14178a765253b4ad9c53b'];
        
        
            console.log('url length: ' + urls.length);
        
            for (let index = 0; index < urls.length; index++) {
              let imgSrc = new ImageSource();
              imgSrc.url = urls[index];
              if (index < 10) {
                imgSrc.value = true;
              } else {
                imgSrc.value = false;
              }
              imgSrc.id = index;
              this.sourceList.push(imgSrc);
            }
          }
        
        }
        `
    }
}