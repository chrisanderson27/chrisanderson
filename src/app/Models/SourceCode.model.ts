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
    todoList: {
        SwipeTableViewController : `//
        //  SwipeTableViewController.swift
        //  Todo
        //
        //  Created by Chris Anderson on 1/12/19.
        //  Copyright © 2019 Chris Anderson. All rights reserved.
        //
        
        import UIKit
        import SwipeCellKit
        
        class SwipeTableViewController: UITableViewController, SwipeTableViewCellDelegate {
            
            override func viewDidLoad() {
                super.viewDidLoad()
                tableView.rowHeight = 80
                tableView.separatorStyle = .none
            }
            
            //Tableview datasource methods\
            
            override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
                let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath) as! SwipeTableViewCell
                
                cell.delegate = self
                
                return cell
            }
            
            func tableView(_ tableView: UITableView, editActionsForRowAt indexPath: IndexPath, for orientation: SwipeActionsOrientation) -> [SwipeAction]? {
                guard orientation == .right else { return nil }
                
                let deleteAction = SwipeAction(style: .destructive, title: "Delete") { action, indexPath in
                    
                    self.updateModel(at: indexPath)
                }
                
                // customize the action appearance
                deleteAction.image = UIImage(named: "trash-icon")
                
                return [deleteAction]
            }
            
            func tableView(_ tableView: UITableView, editActionsOptionsForRowAt indexPath: IndexPath, for orientation: SwipeActionsOrientation) -> SwipeOptions {
                var options = SwipeOptions()
                options.expansionStyle = .destructive
                //        options.transitionStyle = .border
                return options
            }
            
            func updateModel(at indexPath: IndexPath) {
                // update our data model
            }
            
        }
        
        `,
        TodoListViewController : `//
        //  ViewController.swift
        //  Todo
        //
        //  Created by Chris Anderson on 1/10/19.
        //  Copyright © 2019 Chris Anderson. All rights reserved.
        //
        
        import UIKit
        import RealmSwift
        import ChameleonFramework
        
        class TodoListViewController: SwipeTableViewController {
            
            @IBOutlet weak var searchBar: UISearchBar!
        
            
            let realm = try! Realm()
            var myTodos: Results<Item>?
            
            var selectedCategory: Category? {
                didSet {
                    loadItems()
                }
            }
            
            override func viewDidLoad() {
                super.viewDidLoad()
              
                // Do any additional setup after loading the view, typically from a nib.
            }
            
            override func viewWillAppear(_ animated: Bool) {
                if let colorHex = selectedCategory?.color{
                    
                    title = selectedCategory!.name
                    
                    guard let navBar = navigationController?.navigationBar else {
                    fatalError("Navigation control dos not exist")
                        }
                    
                    let navBarColor = UIColor(hexString: colorHex)
                    
                    
                    navBar.largeTitleTextAttributes = [NSAttributedString.Key.foregroundColor : UIColor(contrastingBlackOrWhiteColorOn: UIColor(hexString: colorHex), isFlat: true)]
                    
                    searchBar.barTintColor = navBarColor
                    navBar.barTintColor = navBarColor
                    navBar.tintColor = UIColor(contrastingBlackOrWhiteColorOn: navBarColor, isFlat: true)
                }
            }
            
            override func viewWillDisappear(_ animated: Bool) {
                guard let originalColor = UIColor(hexString: selectedCategory?.color) else {fatalError()}
                
                navigationController?.navigationBar.barTintColor = originalColor
                navigationController?.navigationBar.tintColor = UIColor(contrastingBlackOrWhiteColorOn: originalColor, isFlat: true)
                navigationController?.navigationBar.largeTitleTextAttributes = [NSAttributedString.Key.foregroundColor : UIColor(contrastingBlackOrWhiteColorOn: originalColor, isFlat: true)]
        
            }
            
            //MARK: - TABLEVIEW DATASOUCE METHODS
            
            override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
                return myTodos?.count ?? 1
            }
            
            override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
                
                let cell = super.tableView(tableView, cellForRowAt: indexPath)
                
                if let item = myTodos?[indexPath.row] {
                    cell.textLabel?.text = item.title
                    if let color = UIColor(hexString: selectedCategory!.color).darken(byPercentage: CGFloat(indexPath.row) / CGFloat( myTodos!.count)) {
                        cell.backgroundColor = color
                        cell.textLabel?.textColor = UIColor(contrastingBlackOrWhiteColorOn: color, isFlat: true)
                        
                    }
                    cell.accessoryType = item.done == true ? .checkmark : .none
                }
                    
                else {
                    cell.textLabel?.text = "No items added yet"
                }
                return cell
                
            }
            
            override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
                tableView.deselectRow(at: indexPath, animated: true)
                
                if let item = myTodos?[indexPath.row] {
                    do {
                        try realm.write {
                            item.done.toggle()
                        }
                    } catch {
                        print("ERROR: \(error)")
                    }
                }
                tableView.reloadData()
                
                // sets boolean to opposite
                //        myTodos[indexPath.row].done.toggle()
                
                
                //        if tableView.cellForRow(at: indexPath)?.accessoryType == .checkmark {
                //            tableView.cellForRow(at: indexPath)?.accessoryType = .none
                //        }
                //        else {
                //        tableView.cellForRow(at: indexPath)?.accessoryType = .checkmark
                //    }
            }
            
            @IBAction func addItemPressed(_ sender: Any) {
                var textField = UITextField()
                
                let alert = UIAlertController(title: "Add New Todo Item", message: "", preferredStyle: .alert)
                let action = UIAlertAction(title: "Add Item", style: .default) { (action) in
                    //what will happen when the user clicks add item bar button
                    
                    if let currentCategory = self.selectedCategory {
                        
                        do {
                            try self.realm.write() {
                                let item = Item()
                                item.dateCreated = Date()
                                item.title = textField.text!
                                self.selectedCategory?.items.append(item)
                            }
                        }catch {
                            print("Error saving context: \(error)")
                        }
                        
                        
                        
                    }
                    self.tableView.reloadData()
                    
                }
                
                
                
                alert.addTextField { (alertTextField) in
                    alertTextField.placeholder = "Create new item"
                    textField = alertTextField
                }
                
                alert.addAction(action)
                
                present(alert, animated: true, completion: nil)
            }
            
            
            func loadItems(){
                
                myTodos = selectedCategory?.items.sorted(byKeyPath: "title", ascending: true)
                tableView.reloadData()
            }
            
            override func updateModel(at indexPath: IndexPath) {
                if let deletedItemSelected = myTodos?[indexPath.row] {
                    do {
                        try realm.write {
                            realm.delete(deletedItemSelected)
                        }
                    } catch {
                        print("ERROR: \(error)")
                    }
                }
            }
        }
        
        
        //MARK: Search Bar Methods
        
        extension TodoListViewController: UISearchBarDelegate {
            
            func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
                
                //if its not empty, set the predicate and sort
                if(!(searchBar.text?.isEmpty)!){
                    myTodos = myTodos?.filter("title CONTAINS[cd] %@", searchBar.text!).sorted(byKeyPath: "dateCreated", ascending: false)
                }
                else {
                    loadItems()
                }
                tableView.reloadData()
            }
            
            
            func searchBarSearchButtonClicked(_ searchBar: UISearchBar) {
                
                searchBar.resignFirstResponder()
                print("search button clicked")
            }
        }
        
        `,
        CategoryTableViewController : `//
        //  CategoryTableViewController.swift
        //  Todo
        //
        //  Created by Chris Anderson on 1/11/19.
        //  Copyright © 2019 Chris Anderson. All rights reserved.
        //
        
        import UIKit
        import RealmSwift
        import ChameleonFramework
        
        class CategoryTableViewController: SwipeTableViewController  {
            //valid in Realm documentation
            let realm = try! Realm()
            var categoryList: Results<Category>?
            
            //    let context = (UIApplication.shared.delegate as! AppDelegate).persistentContainer.viewContext
            
            override func viewDidLoad() {
                super.viewDidLoad()
                loadData()
            }
            
            @IBAction func addButtonPressed(_ sender: Any) {
                var textField = UITextField()
                
                let alert = UIAlertController(title: "Add New Category", message: "", preferredStyle: .alert)
                let action = UIAlertAction(title: "Add Item", style: .default) { (action) in
                    let newCategory = Category()
                    newCategory.name = textField.text!
                    newCategory.color = (UIColor.randomFlat()?.hexValue())!
                    self.saveData(category: newCategory)
                }
                alert.addTextField { (alertTextField) in
                    alertTextField.placeholder = "New Category Name"
                    textField = alertTextField
                }
                
                alert.addAction(action)
                
                present(alert, animated: true, completion: nil)
            }
            
            //MARK: CRUD
            func saveData(category: Category) {
                do {
                    try realm.write {
                        realm.add(category)
                    }
                    print("saved.")
                } catch {
                    print("ERROR: \(error)")
                }
                tableView.reloadData();
            }
            
            func loadData() {
                categoryList = realm.objects(Category.self)
                tableView.reloadData();
            }
            
            //delete from swipe
            
            override func updateModel(at indexPath: IndexPath) {
                if let categoryForDeletion = categoryList?[indexPath.row] {
                    do {
                        try realm.write {
                            realm.delete(categoryForDeletion)
                        }
                    } catch {
                        print("ERROR: \(error)")
                    }
                }
                
            }
            
            
            //MARK: Tableview actions
            
            override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
                performSegue(withIdentifier: "goToItems", sender: self)
            }
            
            override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
                print("prepare")
                let destinationVC = segue.destination as! TodoListViewController
                
                if let indexPath = tableView.indexPathForSelectedRow {
                    destinationVC.selectedCategory = categoryList?[indexPath.row]
                }
            }
            
            override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
                let cell = super.tableView(tableView, cellForRowAt: indexPath)
                
                cell.textLabel?.text = categoryList?[indexPath.row].name ?? "No categories added yet!"
                cell.backgroundColor = UIColor(hexString: categoryList?[indexPath.row].color ?? "9EFFC3")
        
                return cell
            }
            
            override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
                return categoryList?.count ?? 1
            }
            
        }
        
        `
    },
    HQtracker: {
        colorChangeChecker : `
        import java.awt.Color;
        import java.awt.Robot;
        
        class ColorChecker extends Thread {
            public static Color controlColor;
        
            public ColorChecker(Color controlColor) {
        
                this.controlColor = controlColor;
            }
        
            @Override
            synchronized public void run() {
                System.out.println("Color Checker Thread running...");
                Robot r;
                try {
                    r = new Robot();
                    while (true) {
                        // background color for HQ questionAlert
        //				Color whiteBase = new Color(255, 253, 255);
                        Color whiteBase1 = new Color(255, 254, 255);
        //				Color whiteBase2 = new Color(255, 253, 255);
                        // 3 spaced out points on the screen, all equal to whiteBase during quizAlert
                        Color whitePoint1 = r.getPixelColor(Driver.bottomMouseX, Driver.bottomMouseY - 5 );
                        Color whitePoint2 = r.getPixelColor(Driver.bottomMouseX + 10, Driver.bottomMouseY);
                        Color whitePoint3 = r.getPixelColor(Driver.bottomMouseX - 10, Driver.bottomMouseY);
        
        //				System.out.println(whitePoint1);
        
                        Driver.lblControlColorPoint.setText("Control: " + controlColor.getRGB() + "/" + whiteBase1.getRGB());
                        Driver.lblControlColorPoint.paintImmediately(Driver.lblControlColorPoint.getVisibleRect());
                        Driver.lblColorPoint1.setText("1: " + whitePoint1.getRGB() + "");
                        Driver.lblColorPoint1.paintImmediately(Driver.lblColorPoint1.getVisibleRect());
                        
                        Driver.lblColorPoint2.setText("2: " + whitePoint2.getRGB() + "");
                        Driver.lblColorPoint2.paintImmediately(Driver.lblColorPoint2.getVisibleRect());
        
                        Driver.lblColorPoint3.setText("3: " + whitePoint3.getRGB() + "");
                        Driver.lblColorPoint3.paintImmediately(Driver.lblColorPoint3.getVisibleRect());
        
                        // if they are all equal, return this thread and start the program
        
                        if (whitePoint1.getRGB() == controlColor.getRGB()
                                && whitePoint2.getRGB() == controlColor.getRGB()
                                && whitePoint3.getRGB() == controlColor.getRGB()) {
                            System.out.println("Basline colors detected... Main thread notifed.");
                            return;
                        }
        
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }`,
        Driver : `The Driver.java class was the more complex area of the application, containing the implementations of the search algorithm and screen awareness. 
        To prevent others from cheating in the game by using my code, I've decided to omit this file. `,
        GoogleScraper : `
        import java.io.IOException;
        import java.util.ArrayList;
        
        import org.jsoup.Jsoup;
        import org.jsoup.nodes.Document;
        import org.jsoup.nodes.Element;
        
        public class GoogleScraper {
            public static final String googlePrefix = "https://www.google.com/search?q=";
            public static String userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36";
            public static String userAgent2 = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.38 Safari/537.36";
            public static int numOfPagesToSearch = 2;
            public String searchTerm;
            public ArrayList<String> searchResults;
        
            public GoogleScraper(String searchTerm) {
                this.searchTerm = searchTerm;
        
            }
        
            public ArrayList<String> fetchResults() throws IOException {
                searchResults = new ArrayList<String>();
        
                // format and create the URL
                String[] questionWords = searchTerm.split(" ");
                String url = googlePrefix;
                for (int j = 0; j < questionWords.length; j++) {
                    // not the last word
        
                    if (j < questionWords.length - 1)
        //				.replaceAll("\"[^A-Za-z0-9]\"", " ")
                        url += (questionWords[j].replaceAll("’S", "").replaceAll(",", "").replaceAll("”", "")
                                .replaceAll("“", "").replaceAll("\n", " ").replaceAll("\t", "").replaceAll(" ", "")
                                .replaceAll("’", "").replaceAll("'", "").replaceAll("‘", "").replaceAll("É", "E").replaceAll("\"", "").replaceAll("/", "")
                                .replaceAll("-", " ") + "+").trim();
        //				url += questionWords[j].replaceAll("”", "").replaceAll("“", "").replaceAll(" ", "").replaceAll("\n", "").replaceAll("\t", "") + "+";
                    // dont add a '+' after the last word
                    else
                        url += (questionWords[j].replaceAll("’S", "").replaceAll(",", "").replaceAll("”", "")
                                .replaceAll("“", "").replaceAll("\n", " ").replaceAll("\t", "").replaceAll(" ", "")
                                .replaceAll("’", "").replaceAll("'", "").replaceAll("‘", "").replaceAll("É", "E").replaceAll("\"", "")
                                .replaceAll("-", " ").replaceAll("/", "")).trim();
        
                    
        //				url += questionWords[j].replace("”", "").replace("“", "").replace("?", "").replace(" ", "").replaceAll("\n", "").replaceAll("\t", "");
                }
        
                Document document;
                // searches mulitple pages
                for (int i = 0; i < numOfPagesToSearch; i++) {
                    System.out.println("URL: " + url);
        
        // create the connection and get the document
                    try {
        //				String testUrl = "https://www.google.com/search?q=WHAT+COMEDIC+ACTOR\n" + "SHARES+HIS+NAME+WITH+THE\n"
        //						+ "EVIL+VILLAIN+OF+THE\n" + "HALLOWEEN+FILMSj";
        
                        document = Jsoup.connect(url).userAgent(userAgent).ignoreHttpErrors(true).timeout(0).get();
        //				document = Jsoup.connect(url).ignoreHttpErrors(false).get();
                    } catch (Exception e) {
                        System.out.println("WARNING" + url);
                        e.printStackTrace();
                        return null;
        
                    }
        
                    // store the results (div .s is the CSS id for the small paragraphs returned for
                    // Google results)
                    for (Element el : document.select("div .s")) {
                        searchResults.add(el.text().toUpperCase());
                    }
        
                    // set next page URL
                    if (i != 2) {
                        url = googlePrefix + document.select("a.pn").attr("href");
                    }
                }
                Driver.lblTotalArticlesSearched.setText("Total Seached Articles: " + searchResults.size());
                Driver.lblTotalArticlesSearched.paintImmediately(Driver.lblTotalArticlesSearched.getVisibleRect());
        
                return searchResults;
            }
        
            public void print() {
                for (String string : searchResults) {
                    System.out.println(string);
                }
        
                System.out.println("\n\nTotal number of articles: " + searchResults.size());
            }
        
        }
        `,
        ScreenData : `
        import java.awt.Rectangle;
        
        class ScreenData {
            Rectangle dimensions;
            String fileName, fileContent;
            boolean isNegate = false;
        
            public ScreenData(Rectangle dimensions, String fileName) {
                super();
                this.dimensions = dimensions;
                this.fileName = fileName;
            }
        
            public Rectangle getDimensions() {
                Rectangle updated = new Rectangle();
                return dimensions;
            }
        
            public void setDimensions(Rectangle dimensions) {
                this.dimensions = dimensions;
            }
            
            
        
            public boolean isNegate() {
                return isNegate;
            }
        
            public void setNegate(boolean isNegate) {
                this.isNegate = isNegate;
            }
        
            public String getFileName() {
                return fileName;
            }
        
            public void setFileName(String fileName) {
                this.fileName = fileName;
            }
        
            public void setFileContent(String content) {
                fileContent = content;
            }
        
            public String getFileContent() {
                return this.fileContent;
            }
        
            @Override
            public String toString() {
                return dimensions.x + ", " + dimensions.y + ", " + dimensions.width + ", "
                        + dimensions.height;
            }
        
        }`,
        TextRegions : `import java.awt.*;
        import java.awt.Rectangle;
        import java.awt.Robot;
        import java.awt.image.BufferedImage;
        import java.io.File;
        import java.io.IOException;
        import java.util.ArrayList;
        import java.util.List;
        
        import javax.imageio.ImageIO;
        
        import marvin.image.MarvinImage;
        import marvin.image.MarvinSegment;
        import marvin.io.MarvinImageIO;
        import net.sourceforge.tess4j.ITesseract;
        import net.sourceforge.tess4j.Tesseract;
        
        import static marvin.MarvinPluginCollection.*;
        
        public class TextRegions extends Robot {
            public static int hardCodeCounter = 0;
            public static int hardCodeCounterLimit = 0;
        
            public static Rectangle questionDimenstions, o1Dimensions, o2Dimensions, o3Dimensions;
            public ArrayList<ScreenData> screenDataList = new ArrayList<ScreenData>();
            static File fileDirectory = new File("/Users/chris/Desktop/HQ");
            ITesseract instance = new Tesseract(); // JNA Interface Mapping
            static MarvinImage image;
        
            public TextRegions() throws QuickException, IOException, AWTException {
        
                System.out.println("MY SIZE: " + screenDataList.size());
        
                instance.setDatapath("/Users/chris/tesseract/tessdata");
                ScreenData wholeImage = new ScreenData(new Rectangle(Driver.questionTopLeftX, Driver.questionTopLeftY,
                        Driver.questionWidth, Driver.questionHeight), "wholeimage.png");
                BufferedImage wholeImg = this.createScreenCapture(wholeImage.getDimensions());
        
                questionDimenstions = new Rectangle(Driver.questionTopLeftX, Driver.questionTopLeftY, Driver.questionWidth,
                    Driver.questionHeight);
        
                File file = new File(fileDirectory, wholeImage.fileName);
                try {
                    file.createNewFile();
                } catch (IOException e2) {
                    e2.printStackTrace();
                }
                // save the image to the file
                ImageIO.write(wholeImg, "png", file);
                file.createNewFile();
        
                // extractImageText(wholeImage);
        
                if (hardCodeCounter < hardCodeCounterLimit) {
                    try {
        
                        image = MarvinImageIO.loadImage("/Users/chris/Desktop/HQ/wholeImage.png");
        //			image = findText(image, 14, 8, 29, 150);
                        image = findText(image, 10, 20, 70, 150);
        
                        MarvinImageIO.saveImage(image, "/Users/chris/Desktop/HQ/wholeImage.png");
                        fileDirectory.mkdirs();
                        hardCodeCounter++;
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
        
                } else {
        
                    extractImageText2();
        
                }
        
            }
            
            private void extractImageText2() throws QuickException, IOException {
        
                ScreenData screenQuestion = null, screen1 = null, screen2 = null, screen3 = null;
                
                //cinema [reflector=full screen, left edge]
                
                //cinema display left edge, setter.png (native to setter.png)
        //		Rectangle questionRect = new Rectangle(98, 36, 380, 200);
        //		Rectangle option1Rect = new Rectangle(53, 209, 240, 35);
        //		Rectangle option2Rect = new Rectangle(54, 272, 240, 35);
        //		Rectangle option3Rect = new Rectangle(52,335, 240, 35);
                
                //native fullscreen left edge, setter.png
        //		Rectangle questionRect = new Rectangle(99, 36, 355, 185);
        //		Rectangle option1Rect = new Rectangle(53, 209, 245, 40);
        //		Rectangle option2Rect = new Rectangle(54, 272, 245, 40);
        //		Rectangle option3Rect = new Rectangle(53,335, 245, 40);
                
                //reflector full, left edge
                Rectangle questionRect = new Rectangle(102, 36, 375, 210);
                Rectangle option1Rect = new Rectangle(50, 220, 245, 45);
                Rectangle option2Rect = new Rectangle(50, 280, 245, 45);
                Rectangle option3Rect = new Rectangle(50,350, 245, 45);
        
                screenQuestion = new ScreenData(questionRect, "question.png");
                screen1 = new ScreenData(option1Rect, "option1.png");
                screen2 = new ScreenData(option2Rect, "option2.png");
                screen3 = new ScreenData(option3Rect, "option3.png");
        
        //		BufferedImage newImage = this.createScreenCapture(screenData.getDimensions());
                BufferedImage newImage2 = ImageIO.read(new File(fileDirectory, "wholeimage.png"));
        
        //		BufferedImage question = newImage2.getSubimage(0, 0, questionDimenstions.width, questionDimenstions.height);
        //		BufferedImage o1 = newImage2.getSubimage(o1Dimensions.x, o1Dimensions.y, o1Dimensions.width,
        //				o1Dimensions.height);
        //		BufferedImage o2 = newImage2.getSubimage(o2Dimensions.x, o2Dimensions.y, o2Dimensions.width,
        //				o2Dimensions.height);
        //		BufferedImage o3 = newImage2.getSubimage(o3Dimensions.x, o3Dimensions.y, o3Dimensions.width,
        //				o3Dimensions.height);
                
                BufferedImage question = newImage2.getSubimage(0, 0, questionRect.width, questionRect.height);
                BufferedImage o1 = newImage2.getSubimage(option1Rect.x, option1Rect.y, option1Rect.width,
                        option1Rect.height);
                BufferedImage o2 = newImage2.getSubimage(option2Rect.x, option2Rect.y, option2Rect.width,
                        option2Rect.height);
                BufferedImage o3 = newImage2.getSubimage(option3Rect.x, option3Rect.y, option3Rect.width,
                        option3Rect.height);
        
        //		MarvinImageIO.saveImage(image, "/Users/chris/Desktop/HQ/question.png");
        
                // set up file
                File file = new File(fileDirectory, "question.png");
                try {
                    file.createNewFile();
                } catch (IOException e2) {
                    e2.printStackTrace();
                }
                // save the image to the file
                ImageIO.write(question, "png", file);
                file.createNewFile();
        
        // OCR Phase - Optical Character Recogniztion from the file
                // .replaceAll("\"[^A-Za-z0-9]\"", " ")
                try {
                    String result = instance.doOCR(question).toUpperCase();
                    System.out.println("Before: " + result);
                    result = (result.replaceAll("’S", "").replaceAll(",", "").replaceAll("”", "").replaceAll("“", "")
                            .replaceAll("\n", " ").replaceAll("\t", "").replaceAll("", "").replaceAll("’", "")
                            .replaceAll("'", "").replaceAll("‘", "").replaceAll("\"", "").replaceAll("-", "").replace("%", "")
                            .replaceAll("»", "").replaceAll("—", "").replaceAll("/", "")).trim();
                    
        //			if contains "NOT", remove it
                    for (String word : result.split(" ")) {
        ////			System.err.println(word);
                    if (word.equalsIgnoreCase("NOT") || word.equalsIgnoreCase("EXCEPT")) {
                        result.replace(" NOT ", " ");
                        result.replace(" EXCEPT ", " ");
                        screenQuestion.setNegate(true);
                    }
                }
                    
                    
                    
                    System.out.println("After: " + result);
                    screenQuestion.setFileContent(result);
        
                } catch (Exception e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
        
                file = new File(fileDirectory, "o1.png");
                try {
                    file.createNewFile();
                } catch (IOException e2) {
                    e2.printStackTrace();
                }
                // save the image to the file
                ImageIO.write(o1, "png", file);
                file.createNewFile();
        
        // OCR Phase - Optical Character Recogniztion from the file
                // .replaceAll("\"[^A-Za-z0-9]\"", " ")
                try {
                    String result = instance.doOCR(o1).toUpperCase();
                    System.out.println("Before: " + result);
                    result = (result.replaceAll("’S", "").replaceAll(",", "").replaceAll("”", "").replaceAll("“", "")
                            .replaceAll("\n", " ").replaceAll("\t", "").replaceAll("", "").replaceAll("’", "")
                            .replaceAll("'", "").replaceAll("‘", "").replaceAll("\"", "").replaceAll("-", "").replace("%", "")
                            .replaceAll("»", "").replaceAll("—", "").replaceAll("/", "")).trim();
                    System.out.println("After: " + result);
                    screen1.setFileContent(result);
        
                } catch (Exception e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
                file = new File(fileDirectory, "o2.png");
                try {
                    file.createNewFile();
                } catch (IOException e2) {
                    e2.printStackTrace();
                }
                // save the image to the file
                ImageIO.write(o2, "png", file);
                file.createNewFile();
        
        // OCR Phase - Optical Character Recogniztion from the file
                // .replaceAll("\"[^A-Za-z0-9]\"", " ")
                try {
                    String result = instance.doOCR(o2).toUpperCase();
                    System.out.println("Before: " + result);
                    result = (result.replaceAll("’S", "").replaceAll(",", "").replaceAll("”", "").replaceAll("“", "")
                            .replaceAll("\n", " ").replaceAll("\t", "").replaceAll("", "").replaceAll("’", "")
                            .replaceAll("'", "").replaceAll("‘", "").replaceAll("\"", "").replaceAll("-", "").replace("%", "")
                            .replaceAll("»", "").replaceAll("—", "").replaceAll("/", "")).trim();
                    System.out.println("After: " + result);
                    screen2.setFileContent(result);
        
                } catch (Exception e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
                file = new File(fileDirectory, "o3.png");
                try {
                    file.createNewFile();
                } catch (IOException e2) {
                    e2.printStackTrace();
                }
                // save the image to the file
                ImageIO.write(o3, "png", file);
                file.createNewFile();
        
        // OCR Phase - Optical Character Recogniztion from the file
                // .replaceAll("\"[^A-Za-z0-9]\"", " ")
                try {
                    String result = instance.doOCR(o3).toUpperCase();
                    System.out.println("Before: " + result);
                    result = (result.replaceAll("’S", "").replaceAll(",", "").replaceAll("”", "").replaceAll("“", "")
                            .replaceAll("\n", " ").replaceAll("\t", "").replaceAll("", "").replaceAll("’", "")
                            .replaceAll("'", "").replaceAll("‘", "").replaceAll("\"", "").replaceAll("-", "").replace("%", "")
                            .replaceAll("»", "").replaceAll("—", "").replaceAll("/", "")).trim();
                    System.out.println("After: " + result);
                    screen3.setFileContent(result);
        
                } catch (Exception e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
        
                screenDataList.add(0, screenQuestion);
                screenDataList.add(1, screen1);
                screenDataList.add(2, screen2);
                screenDataList.add(3, screen3);
        
                Driver.screenDataList = this.screenDataList;
                Driver.question1 = screenDataList.get(0).getFileContent();
                Driver.option1 = screenDataList.get(1).getFileContent();
                Driver.option2 = screenDataList.get(2).getFileContent();
                Driver.option3 = screenDataList.get(3).getFileContent();
        
                for (ScreenData screenData : screenDataList) {
                    System.out.println("Name: " + screenData.getFileName());
                    System.out.println("Content:" + screenData.getFileContent());
                }
        
            }
        
            public MarvinImage findText(MarvinImage image, int maxWhiteSpace, int maxFontLineWidth, int minTextWidth,
                    int grayScaleThreshold) throws QuickException, IOException {
                try {
                    List<MarvinSegment> segments = findTextRegions(image, maxWhiteSpace, maxFontLineWidth, minTextWidth,
                            grayScaleThreshold);
                    List<Rectangle> myRectangles = new ArrayList<Rectangle>();
                    ScreenData screenQuestion = null, screen1 = null, screen2 = null, screen3 = null;
        
                    for (MarvinSegment s : segments) {
                        if (s.height >= 5) {
                            System.out.println("Added");
                            Rectangle thisSegmentsRectangle = new Rectangle(s.x1 - 10, s.y1 - 10, (s.x2 - s.x1) + 10,
                                    (s.y2 - s.y1) + 15);
                            s.y1 -= 5;
                            s.y2 += 5;
        //				image.drawRect(s.x1, s.y1, s.x2-s.x1, s.y2-s.y1, Color.red);
        //				image.drawRect(s.x1-10, s.y1-10, (s.x2-s.x1)+10, (s.y2-s.y1)+10, Color.red);
        
                            myRectangles.add(thisSegmentsRectangle);
                        }
        
                    }
                    String question = "";
                    System.out.println("myRectanglesSize: " + myRectangles.size());
                    int end = myRectangles.size() - 1;
                    for (int i = myRectangles.size() - 1; i >= 0; i--) {
                        Rectangle thisSegmentsRectangle = myRectangles.get(i);
        
                        // option3
                        if (i == end) {
                            image.drawRect(thisSegmentsRectangle.x, thisSegmentsRectangle.y, thisSegmentsRectangle.width,
                                    thisSegmentsRectangle.height, Color.blue);
                            o3Dimensions = (new Rectangle(thisSegmentsRectangle.x, thisSegmentsRectangle.y, 240,
                                    thisSegmentsRectangle.height));
                            screen3 = new ScreenData(o3Dimensions, "option3.png");
        
                        }
                        // option2
                        else if (i == end - 1) {
                            image.drawRect(thisSegmentsRectangle.x, thisSegmentsRectangle.y, thisSegmentsRectangle.width,
                                    thisSegmentsRectangle.height, Color.green);
                            o2Dimensions = new Rectangle(thisSegmentsRectangle.x, thisSegmentsRectangle.y, 240,
                                    thisSegmentsRectangle.height);
                            screen2 = new ScreenData(o2Dimensions, "option2.png");
                        }
                        // option1
                        else if (i == end - 2) {
                            image.drawRect(thisSegmentsRectangle.x, thisSegmentsRectangle.y, thisSegmentsRectangle.width,
                                    thisSegmentsRectangle.height, Color.orange);
                            o1Dimensions = new Rectangle(thisSegmentsRectangle.x, thisSegmentsRectangle.y, 240,
                                    thisSegmentsRectangle.height);
                            screen1 = new ScreenData(o1Dimensions, "option1.png");
                        }
        
                        else {
                            image.drawRect(thisSegmentsRectangle.x, thisSegmentsRectangle.y, thisSegmentsRectangle.width,
                                    thisSegmentsRectangle.height, Color.red);
                            screenQuestion = new ScreenData(new Rectangle(thisSegmentsRectangle.x, thisSegmentsRectangle.y,
                                    thisSegmentsRectangle.width, thisSegmentsRectangle.height), "question.png");
        
                            question = " " + extractImageText(screenQuestion).concat(question);
                        }
                    }
        
                    screenQuestion.setFileContent(question);
                    screenDataList.add(0, screenQuestion);
                    screen1.setFileContent(extractImageText(screen1));
                    screenDataList.add(1, screen1);
                    screen2.setFileContent(extractImageText(screen2));
                    screenDataList.add(2, screen2);
                    screen3.setFileContent(extractImageText(screen3));
                    screenDataList.add(3, screen3);
        
                    cleanUp();
                    return image;
                } catch (Exception e) {
                    e.printStackTrace();
                }
                return null;
            }
        
            private String extractImageText(ScreenData screenData) throws QuickException, IOException {
        
                try {
        //		BufferedImage newImage = this.createScreenCapture(screenData.getDimensions());
                    BufferedImage newImage2 = ImageIO.read(new File(fileDirectory, "wholeimage.png"));
                    newImage2 = newImage2.getSubimage(screenData.getDimensions().x, screenData.getDimensions().y,
                            screenData.getDimensions().width, screenData.getDimensions().height);
        
        //		MarvinImageIO.saveImage(image, "/Users/chris/Desktop/HQ/question.png");
        
                    // set up file
                    File file = new File(fileDirectory, screenData.fileName);
                    try {
                        file.createNewFile();
                    } catch (IOException e2) {
                        e2.printStackTrace();
                    }
                    // save the image to the file
                    ImageIO.write(newImage2, "png", file);
                    file.createNewFile();
        
        // OCR Phase - Optical Character Recogniztion from the file
                    // .replaceAll("\"[^A-Za-z0-9]\"", " ")
                    try {
                        String result = instance.doOCR(newImage2).toUpperCase();
                        System.out.println("Before: " + result);
                        result = (result.replaceAll("’S", "").replaceAll(",", "").replaceAll("”", "").replaceAll("“", "")
                                .replaceAll("\n", " ").replaceAll("\t", "").replaceAll("", "").replaceAll("’", "")
                                .replaceAll("'", "").replaceAll("‘", "").replaceAll("\"", "").replaceAll("-", "")
                                .replace("%", "").replaceAll("»", "").replaceAll("—", "").replaceAll("/", "")).trim();
                        System.out.println("After: " + result);
                        return result.trim();
        
                    } catch (Exception e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
        
                } catch (Exception e) {
                    // TODO: handle exception
                    System.out.println("Error creating sub images");
                    return null;
        
                }
                return null;
        
            }
        
            
        
            public void cleanUp() {
                Driver.screenDataList = this.screenDataList;
                Driver.question1 = screenDataList.get(0).getFileContent();
                Driver.option1 = screenDataList.get(1).getFileContent();
                Driver.option2 = screenDataList.get(2).getFileContent();
                Driver.option3 = screenDataList.get(3).getFileContent();
        
                for (ScreenData screenData : screenDataList) {
                    System.out.println("Name: " + screenData.getFileName());
                    System.out.println("Content:" + screenData.getFileContent());
                }
        
            }
        
        }`,

    }

}