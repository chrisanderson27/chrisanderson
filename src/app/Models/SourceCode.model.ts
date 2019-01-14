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
    },
    colorSwitch : {
      gameScene : `
      //
      //  GameScene.swift
      //  ColorSwitch
      //
      //  Created by Christopher Anderson on 6/25/18.
      //  Copyright © 2018 Christopher Anderson. All rights reserved.
      //
      import SpriteKit
      
      enum PlayColors{
          
          static let colors = [ UIColor( red: 231/255, green: 76/255, blue: 60/255, alpha: 1.0),
                                UIColor( red: 241/255, green: 196/255, blue: 15/255, alpha: 1.0),
                                UIColor( red: 46/255, green: 204/255, blue: 113/255, alpha: 1.0),
                                UIColor( red: 52/255, green: 152/255, blue: 219/255, alpha: 1.0)]
      }
      
      enum SwitchState: Int {
          case red, yellow, green, blue
      }
      
      class GameScene: SKScene {
          
          var colorSwitch: SKSpriteNode!
          var switchState = SwitchState.red
          var currentColorIndex: Int?
          
          let scoreLabel = SKLabelNode(text: "0")
          var score = 0
          
          
          override func didMove(to view: SKView) {
              setupPhysics()
              layoutScene()
          }
          
          func setupPhysics(){
              physicsWorld.gravity = CGVector(dx: 0.0, dy: -1.5)
              physicsWorld.contactDelegate = self
          }
          
          func layoutScene() {
              
              
              
              
              backgroundColor = UIColor(red: 36/255, green: 38/255, blue: 47/255, alpha: 1.0)
              
              colorSwitch = SKSpriteNode(imageNamed: "ColorCircle")
              colorSwitch.size = CGSize(width: frame.size.width/3, height: frame.size.width/3)
              colorSwitch.position = CGPoint(x: frame.midX, y: frame.midY/3)
              
              colorSwitch.zPosition = ZPositions.colorSwitch
              
              colorSwitch.physicsBody = SKPhysicsBody(circleOfRadius: colorSwitch.size.width/2)
              colorSwitch.physicsBody?.categoryBitMask = PhysicsCategories.switchCategory
              colorSwitch.physicsBody?.isDynamic = false
              
              addChild(colorSwitch)
              
              scoreLabel.fontName = "AvenirNext-Bold"
              scoreLabel.fontSize = 60.0
              scoreLabel.color = UIColor.white
              scoreLabel.position = CGPoint(x: frame.midX, y: frame.midY)
              scoreLabel.zPosition = ZPositions.label
              addChild(scoreLabel)
              
              spawnBall()
          }
          
          func updateScoreLabel(){
              scoreLabel.text = "\(score)"
              
              if score <= 9 {
                  physicsWorld.gravity = CGVector(dx: 0.0, dy: -2.0)
              }
              else if score <= 19{
                  physicsWorld.gravity = CGVector(dx: 0.0, dy: -3.0)
              }
              else if score <= 29{
                  physicsWorld.gravity = CGVector(dx: 0.0, dy: -4.0)
              }
              else if score <= 39{
                  physicsWorld.gravity = CGVector(dx: 0.0, dy: -5.0)
              }
              else if score <= 49{
                  physicsWorld.gravity = CGVector(dx: 0.0, dy: -20.0)
              }
           
            
                  
              
              
              }
      
      func spawnBall(){
          //random number 0 - 3
          currentColorIndex = Int(arc4random_uniform(UInt32(4)))
          
          let ball = SKSpriteNode(texture: SKTexture(imageNamed: "ball"), color: PlayColors.colors[currentColorIndex!], size: CGSize(width: 30.0, height: 30.0))
          
          ball.colorBlendFactor = 1.0
          ball.name = "Ball"
          ball.position = CGPoint(x: frame.midX, y: frame.midY*7/4)
          ball.physicsBody = SKPhysicsBody(circleOfRadius: ball.size.width/2)
          ball.physicsBody?.categoryBitMask = PhysicsCategories.ballCategory
          ball.physicsBody?.contactTestBitMask = PhysicsCategories.switchCategory
          ball.physicsBody?.collisionBitMask = PhysicsCategories.none
          ball.zPosition = ZPositions.ball
          
          addChild(ball)
      }
      
      func turnWheel(){
          
          if let newState = SwitchState(rawValue: switchState.rawValue + 1){
              switchState = newState
          }
          else {
              switchState = .red
          }
          
          colorSwitch.run(SKAction.rotate(byAngle: .pi/2, duration: 0.25))
          
      }
      
      override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
          turnWheel()
      }
      
      func gameOver(){
          
          run(SKAction.playSoundFileNamed("lose", waitForCompletion: false))
          print("Game Over.")
          
          UserDefaults.standard.set(score, forKey: "RecentScore")
          if score > UserDefaults.standard.integer(forKey: "HighScore"){
              UserDefaults.standard.set(score, forKey: "HighScore")
          }
          
          
          DispatchQueue.main.asyncAfter(deadline: .now() + .seconds(2), execute: {
              let menuScene = MenuScene(size: self.view!.bounds.size)
              self.view!.presentScene(menuScene)        })
      }
      
      
      }
      
      extension GameScene: SKPhysicsContactDelegate {
          
          // 01
          // 10
          // 11
          
          func didBegin(_ contact: SKPhysicsContact) {
              let contactMask = contact.bodyA.categoryBitMask | contact.bodyB.categoryBitMask
              
              if contactMask == PhysicsCategories.ballCategory | PhysicsCategories.switchCategory {
                  if let ball = contact.bodyA.node?.name == "Ball" ? contact.bodyA.node as? SKSpriteNode : contact.bodyB.node as? SKSpriteNode{
                      if currentColorIndex == switchState.rawValue {
                          print("Correct!")
                          run(SKAction.playSoundFileNamed("beep", waitForCompletion: false))
                          score += 1
                          updateScoreLabel()
                          ball.run(SKAction.fadeOut(withDuration: 0.25)) {
                              ball.removeFromParent()
                              self.spawnBall()
                          }
                      }
                      else{
                          gameOver()
                      }
                  }
              }
          }
          
          
      }`,
      menuScene : `
    //
    //  MenuScene.swift
    //  ColorSwitch
    //
    //  Created by Christopher Anderson on 6/25/18.
    //  Copyright © 2018 Christopher Anderson. All rights reserved.
    //
    import SpriteKit
    
    class MenuScene: SKScene {
        
        override func didMove(to view: SKView) {
            backgroundColor = UIColor(red: 36/255, green: 38/255, blue: 47/255, alpha: 1.0)
            addLogo()
            addLabels()
        }
        
        override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
            let gameScene = GameScene(size: view!.bounds.size)
            view?.presentScene(gameScene)
        }
        
        func animate(label: SKLabelNode){
    //        let fadeOut = SKAction.fadeOut(withDuration: 0.5)
    //        let fadeIn = SKAction.fadeIn(withDuration: 0.5)
            
            let scaleUp = SKAction.scale(to: 1.1, duration: 0.5)
            let scaleDown = SKAction.scale(to: 1.0, duration: 0.5)
            
            let sequence = SKAction.sequence([scaleUp  , scaleDown])
            label.run(SKAction.repeatForever(sequence))
        }
        
        func addLogo(){
            
            let logo = SKSpriteNode(imageNamed: "ColorCircle")
            logo.size = CGSize(width: frame.width/2, height: frame.width/2)
            logo.position = CGPoint(x: frame.midX, y: frame.size.height*0.75)
            addChild(logo)
        }
        
        func addLabels(){
            let playLabel = SKLabelNode(text: "Tap to Play!")
            playLabel.fontName = "AvenirNext-Bold"
            playLabel.fontSize = 50.0
            playLabel.color = UIColor.white
            playLabel.position = CGPoint(x: frame.midX, y: frame.midY)
            addChild(playLabel)
            animate(label: playLabel)
            
            let highScoreLabel = SKLabelNode(text: "Highscore: " + "\(UserDefaults.standard.integer(forKey: "HighScore"))")
            highScoreLabel.fontName = "AvenirNext-Bold"
            highScoreLabel.fontSize = 40.0
            highScoreLabel.color = UIColor.white
            highScoreLabel.position = CGPoint(x: frame.midX, y: frame.midY - highScoreLabel.frame.size.height*4)
            addChild(highScoreLabel)
            
            let recentScoreLabel = SKLabelNode(text: "Recent Score: " + "\(UserDefaults.standard.integer(forKey: "RecentScore"))")
            recentScoreLabel.fontName = "AvenirNext-Bold"
            recentScoreLabel.fontSize = 35.0
            recentScoreLabel.color = UIColor.white
            recentScoreLabel.position = CGPoint(x: frame.midX, y: recentScoreLabel.frame.size.height*2)
            addChild(recentScoreLabel)
        }
    
    }`
    
    }, 
}