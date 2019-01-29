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
    colorSwitch: {
        gameScene: `
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
        menuScene: `
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
        SwipeTableViewController: `//
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
        TodoListViewController: `//
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
        CategoryTableViewController: `//
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
        colorChangeChecker: `
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
        Driver: `The Driver.java class was the more complex area of the application, containing the implementations of the search algorithm and screen awareness. 
        To prevent others from cheating in the game by using my code, I've decided to omit this file. `,
        GoogleScraper: `package com.chris;

        import java.io.IOException;
        import java.util.ArrayList;
        
        import org.jsoup.Jsoup;
        import org.jsoup.nodes.Document;
        import org.jsoup.nodes.Element;
        
        public class GoogleScraper {
            public static final String googlePrefix = "https://www.google.com/search?q=";
            public static String userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36";
            public static String userAgent2 = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.38 Safari/537.36";
            public static int numOfPagesToSearch = 3;
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
                    if (j < questionWords.length - 1)
                        url += (questionWords[j].replaceAll("[^a-zA-Z]", "") + "+").trim();
                    // dont add a '+' after the last word
                    else
                        url += questionWords[j].replaceAll("[^a-zA-Z]", "").trim();
                }
        
                Document document;
                // searches mulitple pages
                for (int i = 0; i < numOfPagesToSearch; i++) {
                    System.out.println("URL: " + url);
        
                    // create the connection and get the document
                    try {
        
                        document = Jsoup.connect(url).userAgent(userAgent).ignoreHttpErrors(true).timeout(0).get();
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
        ScreenData: `
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
        TextRegions: `import java.awt.*;
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

    },
    Weather: {
        css: `:host /deep/ .container {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-content: space-between;
        }
        
        :host /deep/ .item{
            border: 1px solid black;
            flex-basis: 20%;
            height: 400%;
            /* flex: none; */
            align-content: center;
            text-align: center;
            /* flex-grow: 0; */
        }
        
        :host /deep/ .item:nth-child(odd) {
            background-color: lightblue;
        
        }
        :host /deep/.item:nth-child(even) {
            background-color: darkgray;
        
        }
        .searchDiv {
            text-align: center;
            align-items: center;
            /* width: 10px; */
            align-self: center;
            padding: 20px;
        }
         label, input { 
            margin-bottom: 1%;
            margin-left: 2%;
        } 
        img {
            width: 35%;
            height: 35%;
        }`,
        html: `<button type="button" class="btn btn-info" (click)="openDialog()">Code</button>
        <hr />
        
        <div class='searchDiv'>
          <h3>Weather Search App</h3>
        
          <!-- <label>City:</label> <input type="text" [(ngModel)]="city">
          <button (click)='getByName()' value='atlanta'>Search</button>
          <br>
          <label>Zip:</label> <input type="number" [(ngModel)]="zip">
          <button (click)='getByZipController()'>Search</button>
          <br> -->
          <!-- </div> -->
        
          <form class="zipForm">
            <mat-form-field class="example-full-width">
              <input matInput placeholder="Enter A Zip Code" [(ngModel)]="zip" value="30350" name=test>
            </mat-form-field><br>
            <button class="btn btn-warning" (click)='getByZip()'>Show Five Day Forecast</button>
          </form>
        </div>
        
        
        <!-- <div class=container id='weatherResults'>
          <div class=item id=item1 [hidden]='amIHidden' *ngIf="myWeatherObj">
            <h4>Today</h4>
            <img src={{myWeatherObj.imageUrl}} /><br>
            <h4>{{myWeatherObj.title}},
              {{myWeatherObj.country}}</h4><br>
            Description: <b>{{myWeatherObj.description}}</b><br>
            High of {{myWeatherObj.high}}°F<br>
            Low of {{myWeatherObj.low}}°F<br>
            Pressure: {{myWeatherObj.pressure}}<br>
            Humidity: {{myWeatherObj.humidity}}<br>
            Speed: {{myWeatherObj.speed}}<br>
            <br>
          </div>
        </div> -->
        <div *ngIf=forecast>
          <h1 style="text-align:center">5 Day Forecast  {{currentCityTitle}}</h1>
        
          <div class='chart mx-auto d-block' style="height: 60%; width: 60%;">
            <!-- <h2 style="text-align:center">Highs and Lows of <i>{{myForecastDataList[0].title}}, {{myForecastDataList[0].country}}</i></h2> -->
        
            <canvas  baseChart [datasets]="lineChartData" [colors]="lineChartColors" [labels]="lineChartLabels" [legend]="lineChartLegend"
              [options]="lineChartOptions" [chartType]="lineChartType" (chartHover)="chartHovered($event)" (chartClick)="chartClicked($event)"></canvas>
        
        
            <div class="chartBtn mx-auto d-block" style="margin-top: 10px; height: 50%">
              <button class="btn btn-outline-secondary mx-auto d-block" (click)="randomizeType()" style="display: inline-block">{{currentGraphBtnName}}</button>
            </div>
          </div>
        
          <br>
          <div class=container id='weatherResults'>
            <div class=item id=item1 *ngFor="let weatherObj of myForecastDataList" style="margin: 0px 10px">
              <h4>{{weatherObj.date}}</h4>
              <img src={{weatherObj.imageUrl}} /><br>
              <h4>{{weatherObj.title}},
                {{weatherObj.country}}</h4><br>
              <b>{{weatherObj.description}}</b><br><br>
              Low of {{weatherObj.low}}°F<br>
              High of {{weatherObj.high}}°F<br>
              <!-- {{weatherObj.main}}<br> -->
              <br>
              <br>
            </div>
          </div>
        </div>
        <script src="node_modules/chart.js/src/chart.js"></script>
        
        <!-- <router-outlet></router-outlet> -->
        <br />
        <br />
        <mat-dialog-actions align="end">
          <button mat-button mat-dialog-close class="btn btn-outline-danger" (click)="close()">Close</button>
        </mat-dialog-actions>`,
        ts: `import { Component, OnInit } from '@angular/core';
        import { WeatherService } from '../weather.service';
        import { HttpClient } from '@angular/common/http';
        import { WeatherObj } from './WeatherObj';
        import { Router } from '@angular/router';
        import { MatDialog } from '@angular/material';
        import { SourceCodeViewComponent } from 'src/app/source-code-view/source-code-view.component';
        import { ForecastModel } from './forecast/forecastModel';
        import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';
        import {code} from '../../../Models/SourceCode.model';
        import { SourceCodeService } from 'src/app/Services/source-code.service';
        
        @Component({
          selector: 'app-weather',
          templateUrl: './weather.component.html',
          styleUrls: ['./weather.component.css']
        })
        export class WeatherComponent implements OnInit {
        
          myForecastData;
          currentWeatherModel: ForecastModel;
          myForecastDataList: ForecastModel[] = [];
          currentGraphBtnName = 'Switch to bar graph';
        
          public lineChartData: Array<any> = [];
          public lineChartLabels: Array<any> = [];
          public lineChartType = 'line';
          public lineChartLegend = true;
        
          public lineChartOptions: any = {
            responsive: true
          };
          currentCityTitle = '';
          data;
          zip: number;
          city: string;
          id: string;
          myWeatherObj = new WeatherObj();
          forecast;
          amIHidden = true;
          // date: string = (new Date().toISOString.split('T')[0]); // toISOString().split('T')[0];
          test: string = '2018-12-04 21:00:00'.substring(0, 10);
          forecastDays: WeatherObj[];
        
          sourceCode = [
            ['.html', 'html']
          ];
        
          constructor(private http: HttpClient, 
            private service: WeatherService,
            private router: Router, private dialog: MatDialog,
            private sourceCodeService: SourceCodeService) {
              sourceCodeService.currentSourceCode = this.sourceCode;
        
            this.zip = 30303;
            this.getByZipController();
             // this.date = (this.date);
          }
          ngOnInit() {
            // this.zip = 30303;
            // this.getByZipController();
          }
          getByZipController() {
            this.getByZip();
          }
        
          getByZip() {
            this.amIHidden = false;
            // this.data = (this.service.getByName(name));
            this.service.getByZip(this.zip + '').subscribe(
              res => {
                this.data = (res);
                this.service.myWeather = this.data;
                // this.parseObject(this.myWeather);
                console.log('inside getByZip:(' + JSON.stringify(this.data));
                console.log(':)' + (this.data.main));
        
                this.service.getForecast().subscribe(newRes => {
                  this.forecast = (newRes);
                  this.service.forecast = this.forecast;
                  // this.parseObject(this.myWeather);
                  // console.log(':(' + this.myWeather);
                  // console.log(':)' + (this.myWeather.main));
                  console.log('forcast returned: ' + JSON.stringify(this.forecast.list));
                  console.log('!!: ' + JSON.stringify(this.data.name));
                  this.myWeatherObj = new WeatherObj();
                  this.myWeatherObj.title = this.data.name;
                  this.currentCityTitle = 'for ' + this.data.name;
                  this.myWeatherObj.country = (this.data).sys.country;
                  this.myWeatherObj.description = (this.data).weather[0].description;
                  this.myWeatherObj.main = (this.data).weather[0].main;
                  this.myWeatherObj.imageUrl = this.service.getImage(this.myWeatherObj.main);
                  this.myWeatherObj.low = (this.data).main.temp_min;
                  this.myWeatherObj.high = (this.data).main.temp_max;
                  this.myWeatherObj.pressure = (this.data).main.pressure;
                  this.myWeatherObj.humidity = (this.data).main.humidity;
                  this.myWeatherObj.speed = (this.data).wind.speed;
                  this.showFiveDay();
                });
              });
          }
        
          showFiveDay() {
            this.extractDetails();
          }
          // opens modal
          openDialog() {
            const dialogRef = this.dialog.open(SourceCodeViewComponent, {
              maxWidth: '100vw',
              width: '80%',
              maxHeight: '100vh',
            });
        
            dialogRef.afterClosed().subscribe(result => {
            });
          }
        
          close() {
            this.dialog.closeAll();
            this.router.navigate(['/']);
          }
        
        
        
          public randomizeType(): void {
            this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
            this.currentGraphBtnName = this.lineChartType === 'line' ? 'Switch to bar graph' : 'Switch to line chart';
          }
        
          public chartClicked(e: any): void {
            console.log(e);
          }
        
          public chartHovered(e: any): void {
            console.log(e);
          }
        
          extractDetails() {
            this.myForecastDataList = [];
            let currentDate = new Date().toISOString().split('T')[0];
            // let currentDate = '';
            console.log(currentDate + '...' + this.service.forecast.cnt);
            // let index = 0;
            let currentMin = null;
            let currentMax = null;
            for (let index = 0; index < this.service.forecast.cnt; index++) {
              if (currentMin === null) {
                currentMin = this.service.forecast.list[index].main.temp_min;
                currentMax = this.service.forecast.list[index].main.temp_max;
              }
              // check if mins/maxes should be replaced
        
              if (this.service.forecast.list[index].main.temp_min < currentMin) {
                currentMin = this.service.forecast.list[index].main.temp_min;
                console.log('currentMin : ' + currentMin + ', serviceMin: ' + this.service.forecast.list[index].main.temp_min);
              }
        
              if (this.service.forecast.list[index].main.temp_max > currentMin) {
                currentMax = this.service.forecast.list[index].main.temp_max;
              }
        
              console.log(this.service.forecast.list[index]);
              // console.log('comparing: ' + this.service.forecast.list[index].dt_txt.substring(0, 10) + ' === ' + currentDate.substring(0, 10));
              if (this.service.forecast.list[index].dt_txt.substring(0, 10) === currentDate.substring(0, 10)) {
                // console.log('insideIf');
              } else {
                this.currentWeatherModel = new ForecastModel();
                this.currentWeatherModel.title = (this.service.myWeather).name;
                this.currentWeatherModel.country = (this.service.myWeather).sys.country;
                this.currentWeatherModel.description = this.service.forecast.list[index].weather[0].description;
                this.currentWeatherModel.main = this.service.forecast.list[index].weather[0].main;
                this.currentWeatherModel.imageUrl = this.service.getImage(this.currentWeatherModel.main);
                this.currentWeatherModel.low = currentMin;
                this.currentWeatherModel.high = currentMax;
                this.currentWeatherModel.date = new Date(this.service.forecast.list[index].dt_txt.substring(0, 10)).toDateString().substring(0, 10);
        
                currentDate = this.service.forecast.list[index].dt_txt;
                this.myForecastDataList.push(this.currentWeatherModel);
                // console.log(this.currentWeatherModel.high);
                currentMin = null;
                currentMax = null;
              }
            }
            for (const item of this.myForecastDataList) {
        
            }
            this.populateGraph();
        
          }
        
          populateGraph() {
            let tempMinArray = [];
            let tempMaxArray = [];
            this.lineChartLabels = [];
            console.log(this.myForecastDataList.length);
            for (const item of this.myForecastDataList) {
              tempMinArray.push(item.low);
              tempMaxArray.push(item.high);
              this.lineChartLabels.push(item.date);
              console.log('my Data list lows: ' + item.low);
              // console.log(item.low);
            }
            this.lineChartData = [{ data: tempMaxArray, label: 'Max' }, { data: tempMinArray, label: 'Min' }];
          }
        }
        `,
        service: `import { Injectable } from '@angular/core';
        import { HttpClient } from '@angular/common/http';
        
        @Injectable({
          providedIn: 'root'
        })
        export class WeatherService {
          data;
          apiKey = '&units=imperial&appid=8207e11f4329e85d03fa5d3bd7c9f606';
          zipBase = 'https://api.openweathermap.org/data/2.5/weather?zip=';
          cityBase = 'https://api.openweathermap.org/data/2.5/weather?q=';
          fiveDayForcastBase = 'https://api.openweathermap.org/data/2.5/forecast?id=';
          myWeather;
          forecast;
        
          // goodData;
          constructor(private http: HttpClient) { }
        
          getByName(name: string): any {
            this.http.get(this.cityBase + name + this.apiKey).subscribe(res => {
              this.myWeather = (res);
              // this.parseObject(this.myWeather);
              console.log(':(' + JSON.stringify(this.myWeather));
              console.log(':)' + (this.myWeather.main));
            });
            // this.getForecast();
        
            return this.myWeather;
        
          }
        
          getByZip(zip: string): any {
        
            return this.http.get(this.zipBase + zip + ',us' + this.apiKey);
        
          }
        
           getForecast() {
            // return this.http.get(this.fiveDayForcastBase + this.myWeather.id + this.apiKey);
            return this.http.get(this.fiveDayForcastBase + this.myWeather.id + this.apiKey);
            // return (this.forecast.list);
          }
        
          getImage(main: string): string {
            switch (main) {
              case 'Clear':
                return 'https://openclipart.org/download/170678/sunny.svg';
              case 'Rain':
                return 'https://openclipart.org/download/170675/showers.svg';
              case 'Clouds':
                return 'https://openclipart.org/download/170679/sunny-to-cloudy.svg';
              case 'Snow':
                return 'https://openclipart.org/download/218651/weather-heavy-snow.svg';
              default:
                return 'https://openclipart.org/download/170678/sunny.svg';
            }
          }
        
          parseObject(obj) {
            console.log('parse!');
            for (const key of obj) {
              console.log('key: ' + key + ', value: ' + obj[key]);
              if (obj[key] instanceof Object) {
                this.parseObject(obj[key]);
              }
            }
          }
        }
        `,
        model: `export class WeatherObj {
            title: string;
            country: string;
            description: string;
            high: number;
            low: number;
            pressure: number;
            humidity: number;
            speed: number;
            imageUrl: string;
            main: string;
        
        }
        `,
    },
    space: {
        Empty: `No Source Code to Display`,
    },
    flashChat: {
        login: `//
        //  LogInViewController.swift
        //  Flash Chat
        //
        //  This is the view controller where users login
        
        import UIKit
        import Firebase
        import SVProgressHUD
        
        
        class LogInViewController: UIViewController {
        
            @IBOutlet var emailTextfield: UITextField!
            @IBOutlet var passwordTextfield: UITextField!
            
            override func viewDidLoad() {
                super.viewDidLoad()
                
            }
        
            override func didReceiveMemoryWarning() {
                super.didReceiveMemoryWarning()
            }
        
           
            @IBAction func logInPressed(_ sender: AnyObject) {
                SVProgressHUD.show()
                Auth.auth().signIn(withEmail: emailTextfield.text!, password: passwordTextfield.text!)
                { (user, error) in
                    if error != nil {
                        print("ERROR: \(error)")
                    }
                    else {
                        print("Log in success")
                        SVProgressHUD.dismiss()
                        self.performSegue(withIdentifier: "goToChat", sender: self)
                    }
                }
            
            }
        
        }  
        `,
        register: `//
        //  RegisterViewController.swift
        //  Flash Chat
        //
        //  This is the View Controller which registers new users with Firebase
        //
        
        import UIKit
        import Firebase
        import SVProgressHUD
        
        
        class RegisterViewController: UIViewController {
        
            @IBOutlet var emailTextfield: UITextField!
            @IBOutlet var passwordTextfield: UITextField!
            
            
            override func viewDidLoad() {
                super.viewDidLoad()
            }
        
            override func didReceiveMemoryWarning() {
                super.didReceiveMemoryWarning()
            }
            
        
          
            @IBAction func registerPressed(_ sender: AnyObject) {
                SVProgressHUD.show()
                
                Auth.auth().createUser(withEmail: emailTextfield.text!, password: passwordTextfield.text!) { (user, error) in
                    if error != nil {
                        print("ERROR: \(error!)")
                    }
                    else {
                        //success
                        print("registration success")
                        SVProgressHUD.dismiss()
                        self.performSegue(withIdentifier: "goToChat", sender: self)
                    }
                }
                
            } 
            
            
        }
        `,
        chat: `//
        //  ViewController.swift
        //  Flash Chat
        //
        
        import UIKit
        import Firebase
        import SVProgressHUD
        import ChameleonFramework
        
        
        class ChatViewController: UIViewController, UITableViewDelegate, UITableViewDataSource, UITextFieldDelegate {
            
            
            // Declare instance variables here
            var messageArray: [Message] = [Message]()
            
            // We've pre-linked the IBOutlets
            @IBOutlet var heightConstraint: NSLayoutConstraint!
            @IBOutlet var sendButton: UIButton!
            @IBOutlet var messageTextfield: UITextField!
            @IBOutlet var messageTableView: UITableView!
            
            override func viewDidLoad() {
                super.viewDidLoad()
                SVProgressHUD.show()
                
                //TODO: Set yourself as the delegate and datasource here:
                messageTableView.delegate = self
                messageTableView.dataSource = self
                
                //TODO: Set yourself as the delegate of the text field here:
                messageTextfield.delegate = self
        
                //TODO: Set the tapGesture here:
                let tapGesutre = UITapGestureRecognizer(target: self, action: #selector(tableViewTapped))
                messageTableView.addGestureRecognizer(tapGesutre)
        
                
                //TODO: Register your MessageCell.xib file here:
                messageTableView.register(UINib(nibName: "MessageCell", bundle: nil), forCellReuseIdentifier: "customMessageCell")
                
                configureTableView()
                retrieveMessages()
                
                messageTableView.separatorStyle = .none
                
                
                SVProgressHUD.dismiss()
            }
            
            ///////////////////////////////////////////
            
            //MARK: - TableView DataSource Methods
            
            func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
                
                
                let cell = tableView.dequeueReusableCell(withIdentifier: "customMessageCell", for: indexPath) as! CustomMessageCell
                
                cell.messageBody.text = messageArray[indexPath.row].messageBody
                cell.senderUsername.text = messageArray[indexPath.row].sender
                cell.avatarImageView.image = UIImage(named: "egg")
                
                if cell.senderUsername.text == Auth.auth().currentUser?.email as String! {
                    cell.avatarImageView.backgroundColor = UIColor.flatMint()
                    cell.messageBackground.backgroundColor = UIColor.flatSkyBlue()
                }
                else {
                    cell.avatarImageView.backgroundColor = UIColor.flatWatermelon()
                    cell.messageBackground.backgroundColor = UIColor.flatGray()
        
                }
            
                return cell
            }
            
            
            //TODO: Declare numberOfRowsInSection here:
            
            func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
                return messageArray.count;
            }
            
            //TODO: Declare tableViewTapped here:
            @objc func tableViewTapped() {
                messageTextfield.endEditing(true)
            }
            
            
            //TODO: Declare configureTableView here:
            func configureTableView() {
                messageTableView.rowHeight = UITableView.automaticDimension
                messageTableView.estimatedRowHeight = 110.0
            }
            
            ///////////////////////////////////////////
            
            //MARK:- TextField Delegate Methods
            func textFieldDidBeginEditing(_ textField: UITextField) {
               
                
                UIView.animate(withDuration: 0.75) {
                    self.heightConstraint.constant += 250
                    self.view.layoutIfNeeded()
                }
            }
        
            func textFieldDidEndEditing(_ textField: UITextField) {
                UIView.animate(withDuration: 0.75) {
                    self.heightConstraint.constant -= 250
                    self.view.layoutIfNeeded()
                }
            }
        
            //MARK: - Send & Recieve from Firebase
         
            @IBAction func sendPressed(_ sender: AnyObject) {
                messageTextfield.endEditing(true)
                
                messageTextfield.isEnabled = false
                sendButton.isEnabled = false
                
                let messagesDB = Database.database().reference().child("Messages")
                let messageDictionary = [
                    "Sender" : Auth.auth().currentUser?.email,
                    "MessageBody" : messageTextfield.text!
                ]
                
                messagesDB.childByAutoId().setValue(messageDictionary) {
                    (error, ref) in
                    if error != nil {
                        print(error!)
                    }
                    else{
                        print("Message saved successfully")
                        self.messageTextfield.isEnabled = true
                        self.sendButton.isEnabled = true
                        self.messageTextfield.text = ""
                    }
                }
            }
            
            func retrieveMessages() {
                
                let messageDB = Database.database().reference().child("Messages")
                
                messageDB.observe(.childAdded) { (snapshot) in
                    
                    let snapshotValue = snapshot.value as! Dictionary<String,String>
                    let text = snapshotValue["MessageBody"]!
                    let sender = snapshotValue["Sender"]!
                    
                    let message = Message()
                    message.messageBody = text
                    message.sender = sender
                    
                    self.messageArray.append(message)
                    
                    
                    self.configureTableView()
                    self.messageTableView.reloadData()
                    
                    //scroll to last message
                    let ip = IndexPath(row: self.messageArray.count-1, section: 0)
                    self.messageTableView.scrollToRow(at: ip, at: .bottom , animated: true)
                    
                }
            }
            
            @IBAction func logOutPressed(_ sender: AnyObject) {
                do {
                    try
                        Auth.auth().signOut()
                    navigationController?.popToRootViewController(animated: true)
                    
                } catch  {
                    print("Error!")
                }
            }
        }
        `
    },
    sceneKit: {
        game: `//
        //  GameViewController.swift
        //  HitTheTree
        //
        //  Created by Christopher Anderson on 6/25/18.
        //  Copyright © 2018 Christopher Anderson. All rights reserved.
        //
        import UIKit
        import QuartzCore
        import SceneKit
        
        class GameViewController: UIViewController {
        
            override func viewDidLoad() {
                super.viewDidLoad()
                
                // create a new scene
                let scene = SCNScene(named: "art.scnassets/ship.scn")!
                
                // create and add a camera to the scene
                let cameraNode = SCNNode()
                cameraNode.camera = SCNCamera()
                scene.rootNode.addChildNode(cameraNode)
                
                // place the camera
                cameraNode.position = SCNVector3(x: 0, y: 0, z: 15)
                
                // create and add a light to the scene
                let lightNode = SCNNode()
                lightNode.light = SCNLight()
                lightNode.light!.type = .omni
                lightNode.position = SCNVector3(x: 0, y: 10, z: 10)
                scene.rootNode.addChildNode(lightNode)
                
                // create and add an ambient light to the scene
                let ambientLightNode = SCNNode()
                ambientLightNode.light = SCNLight()
                ambientLightNode.light!.type = .ambient
                ambientLightNode.light!.color = UIColor.darkGray
                scene.rootNode.addChildNode(ambientLightNode)
                
                // retrieve the ship node
                let ship = scene.rootNode.childNode(withName: "ship", recursively: true)!
                
                // animate the 3d object
                ship.runAction(SCNAction.repeatForever(SCNAction.rotateBy(x: 0, y: 2, z: 0, duration: 1)))
                
                // retrieve the SCNView
                let scnView = self.view as! SCNView
                
                // set the scene to the view
                scnView.scene = scene
                
                // allows the user to manipulate the camera
                scnView.allowsCameraControl = true
                
                // show statistics such as fps and timing information
                scnView.showsStatistics = true
                
                // configure the view
                scnView.backgroundColor = UIColor.black
                
                // add a tap gesture recognizer
                let tapGesture = UITapGestureRecognizer(target: self, action: #selector(handleTap(_:)))
                scnView.addGestureRecognizer(tapGesture)
            }
            
            @objc
            func handleTap(_ gestureRecognize: UIGestureRecognizer) {
                // retrieve the SCNView
                let scnView = self.view as! SCNView
                
                // check what nodes are tapped
                let p = gestureRecognize.location(in: scnView)
                let hitResults = scnView.hitTest(p, options: [:])
                // check that we clicked on at least one object
                if hitResults.count > 0 {
                    // retrieved the first clicked object
                    let result = hitResults[0]
                    
                    // get its material
                    let material = result.node.geometry!.firstMaterial!
                    
                    // highlight it
                    SCNTransaction.begin()
                    SCNTransaction.animationDuration = 0.5
                    
                    // on completion - unhighlight
                    SCNTransaction.completionBlock = {
                        SCNTransaction.begin()
                        SCNTransaction.animationDuration = 0.5
                        
                        material.emission.contents = UIColor.black
                        
                        SCNTransaction.commit()
                    }
                    
                    material.emission.contents = UIColor.red
                    
                    SCNTransaction.commit()
                }
            }
            
            override var shouldAutorotate: Bool {
                return true
            }
            
            override var prefersStatusBarHidden: Bool {
                return true
            }
            
            override var supportedInterfaceOrientations: UIInterfaceOrientationMask {
                if UIDevice.current.userInterfaceIdiom == .phone {
                    return .allButUpsideDown
                } else {
                    return .all
                }
            }
            
            override func didReceiveMemoryWarning() {
                super.didReceiveMemoryWarning()
                // Release any cached data, images, etc that aren't in use.
            }
        
        }`
    },
    stickies: {
        html: `<div class="text-center">
        <button (click)="addPost()" class="btn btn-success">Add a Post</button>
      </div>
      
      <cdk-virtual-scroll-viewport  itemSize="100" class="">
        <li [ngStyle]="{'background-color': post.color}" (click)=displayId(i) *cdkVirtualFor="let post of posts | async; let i = index; trackBy: trackByIdx"
          class="container animated flipInX feedPost align-items-end mx-auto">
      
          <div class="row">
            <div class="col-2">
              <img id=profileImg class="" src={{post.profileUrl}} style="max-width: 70px; max-height: 70px;">
            </div>
            <div class="col-7">
              <span id='profileName' class="mx-auto">
                {{post.name}}
              </span>
            </div>
      
            <div class="col-3" style="font-size: 14px;">
              <span class="float-right">
                {{post.date | date:'short'}}
              </span>
            </div>
      
      
      
          </div>
      
          <div class="row mt-3">
            {{post.post}}
       
          </div>
          <div class="row mt-4">
            <div class="col d-flex mx-auto justify-content-center">
              <img src={{post.img}} class="" style="width: auto;
                        max-width: 300px;
                        height: auto;
                        max-height: 150px;">
            </div>
          </div>
       
          <div class="row mt-4 mb-0 mx-auto">
            <div class="col-4 mx-auto text-center">
              <span (click)=liked(i) class="text-center">
                Like
                <i *ngIf="post.liked; else emptyHeart" class="animated heartBeat fas fa-heart fa-1x"></i>
                <ng-template #emptyHeart><i class="animated  far fa-heart"></i>
                </ng-template>
      
              </span>
            </div>
      
            <div class="col-4 mx-auto text-center">
              <div class="dropdown text-center">
                Color <i class="fas fa-bars fa-1x"></i>
                <div class="dropdown-content">
                  <a class="dropdown-item colorOption" (click)="changeColor(i, 'lightcoral')" id='redSelector'></a>
                  <a class="dropdown-item colorOption" (click)="changeColor(i, 'cadetblue')" id='blueSelector'></a>
                  <a class="dropdown-item colorOption" (click)="changeColor(i, 'yellow')" id='yellowSelector'></a>
                  <a class="dropdown-item colorOption" (click)="changeColor(i, 'lightgreen')" id='greenSelector'></a>
                  <a class="dropdown-item colorOption" (click)="changeColor(i, 'pink')" id='pinkSelector'></a>
                </div>
              </div>
            </div>
      
      
            <!-- <div class="col align-self-end"> Comment <i class="far fa-comment fa-1x"></i></div> -->
            <!-- <div class="col-3 mx-auto"> Share <i class="fas fa-share fa-1x"></i></div> -->
            <div class="col-4 mx-auto text-center"> <a class="" (click)=deleteNote(i)>Delete <i class="fas fa-trash-alt fa-1x"></i></a>
            </div>
          </div>
        </li>
      </cdk-virtual-scroll-viewport>`,
        ts: `import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
        import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
        import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
        import { code } from 'src/app/Models/SourceCode.model';
        import { MatDialog } from '@angular/material';
        import { SourceCodeViewComponent } from 'src/app/source-code-view/source-code-view.component';
        import { SourceCodeService } from 'src/app/Services/source-code.service';
        import * as faker from '../../../../../faker.js';
        import { Post } from './post';
        import { AnimationBuilder, style, animate } from '@angular/animations';
        
        
        @Component({
          selector: 'app-simple-stickies',
          templateUrl: './simple-stickies.component.html',
          styleUrls: ['./simple-stickies.component.scss'],
          encapsulation: ViewEncapsulation.None,
        
        })
        export class SimpleStickiesComponent implements OnInit {
          posts: any;
          batch = 20;
          @ViewChild(CdkVirtualScrollViewport)
          viewport: CdkVirtualScrollViewport;
        
          snapshot;
          postDoc: AngularFirestoreDocument<Post>;
        
          postsCollection: AngularFirestoreCollection<Post>;
        
          newContent = "type note here";
        
        
        
          sourceCode = [
            ['notes.component.html', code.stickies.html],
            ['notes.component.scss', code.stickies.scss],
            ['notes.component.ts', code.stickies.ts]];
        
          constructor(private db: AngularFirestore, private dialog: MatDialog, private service: SourceCodeService,
            private _builder: AnimationBuilder) {
            this.service.currentSourceCode = this.sourceCode;
          }
          ngOnInit() {
            this.postsCollection = this.db.collection('posts', ref => ref.orderBy('date', 'desc'));
            this.posts = this.postsCollection.valueChanges();
            this.snapshot = this.postsCollection.snapshotChanges().subscribe(res => {
              this.snapshot = res;
              console.log(this.snapshot);
            });
          }
        
          // used by angular ngFor to compare and re-render only items in the loop which has changed
          trackByIdx(i) {
            return i;
          }
        
          addPost() {
            let randomName = faker.name.findName();
            let paragraph = faker.lorem.paragraph();
            let profileUrl: string = faker.internet.avatar();
            // profileUrl = 'https' + profileUrl.substring(5);
            let postType = faker.random.number() % 2 === 0 ? 'text' : 'img';
            console.log(profileUrl);
            console.log(randomName);
            console.log(paragraph);
            let date = new Date();
            let postToAdd: Post = new Post(randomName, profileUrl, date.toISOString(), paragraph, faker.random.image(), postType, '');
            // "", this.newContent, , 'incomplete', 'yellow');
        
        
            this.postsCollection.add({ ...postToAdd });
            // this.notesCollection.get()
          }
        
          displayId(x) {
            console.log(x);
          }
        
          liked(index) {
            let id = this.snapshot[index].payload.doc.id;
            this.postDoc = this.db.doc('posts/' + id);
            this.postsCollection.doc(id).get().subscribe(res => {
              let post: Post = { ...res.data() } as Post;
              post.liked = !post.liked;
              this.postDoc.set(post);
            }
            );
          }
        
          changeColor(index, color) {
          
        
            // get noteRef at this id
            let id = this.snapshot[index].payload.doc.id;
            this.postDoc = this.db.doc('posts/' + id);
            // subscribe to this note, cast it as a new one, and update it
            let newPost: Post;
            this.postsCollection.doc(id).get().subscribe(res => {
              newPost = res.data() as Post;
              newPost.color = color;
              this.postDoc.set(newPost);
        
            });
        
        
          }
          deleteNote(index) {
            // get noteRef at this id
            let id = this.snapshot[index].payload.doc.id;
            this.postsCollection.doc(id).delete();
          }
        
          updateNote(index, post: Post) {
            console.log('inside updatepost');
            let id = this.snapshot[index].payload.doc.id;
            this.postDoc = this.db.doc('posts/' + id);
            this.postsCollection.doc(id).get().subscribe(res => {
              this.postDoc.set(post);
            });
          }
        
        
          openDialog() {
            const dialogRef = this.dialog.open(SourceCodeViewComponent, {
              maxWidth: '100vw',
              width: '80%',
              maxHeight: '100vh',
            });
            dialogRef.afterClosed().subscribe(result => {            });
          }
        
          close() {
            this.dialog.closeAll();
          }
        
        
        }
        
        `,
        scss: `.feedPost {
            // background-color: #ddd;
            width: 550px;
            height: auto;
            margin: 25px;
            box-shadow: 0 2px 7px #bbb;
            padding: 20px;
            box-sizing: border-box;
          }  
          
          #profileName {
            font-size: 2em;
          }
          
          #profileImg {
            border-radius: 50%;
          }
          
          .imgPost {
            box-shadow: 0 0 8px 8px white inset;
          }
          
          .sticky {
              width: 300px;
              height: 400px;
              background-color: yellow;
              border: 1px solid gray;
              margin: 15px;
              height: auto;
          }
          
          .titleInput {
            // position: fixed;
            top: 5px;
            left: 5px;
            width: 50px;
          }
          
          .colorIcon {
            // position: fixed;
            top: 5px;
            right: 5px;
          }
          
          .stickyDate {
            // position: fixed;
            bottom: 5px;
            right: 5px;
          }
          
          .stickyRow {
            // border: solid 1px green;
            width: 300px;
            height: auto;
          
          }
          
          .dropdown {
            position: relative;
            display: inline-block;
            z-index: 2;
          }
          
          .dropdown-item {
            z-index: 2;
          }
          
          #noteDiv {
            // white-space: pre;
          display: block;
          width: auto;
          height: auto;
          // white-space: pre-line;˜
          }
          
          div, input {
            outline: none;
          }
          
          input {
            border: none;
          }
          
          .dropdown-content {
            display: none;
            position: absolute;
            background-color: transparent;
            min-width: 20px;
            bottom: 10px;
            // max-width: 20px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            // padding: 12px 16px;
            z-index: 2;
          }
          
          .dropdown:hover .dropdown-content {
            display: block;
          }
          
          .colorOption {
            width: 10px;
            height: 25px;
            // margin-bottom: 5px;
          }
          
          #redSelector {
            background-color: lightcoral;
          }
          #blueSelector {
            background-color:cadetblue;
          }
          #yellowSelector {
            background-color:yellow;
          }
          #greenSelector {
            background-color:lightgreen;
          }
          #pinkSelector {
            background-color:pink;
          }
          
          i:hover {
            cursor: pointer;
          }
          
          cdk-virtual-scroll-viewport {
              height: 100vh;
            
              li {
                // height: 300px;
                list-style: none;
                // padding: 3em;
              }
          
              
            
              // Bonus points
              // &::-webkit-scrollbar {
              //   width: 1em;
              // }
            
              // &::-webkit-scrollbar-track {
              //   -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
              // }
            
              // &::-webkit-scrollbar-thumb {
              //   background-color: rgb(238, 169, 79);
              // }
            }
          
            .lds-ring {
              display: inline-block;
              position: relative;
              width: 64px;
              height: 64px;
            }
            .lds-ring div {
              box-sizing: border-box;
              display: block;
              position: absolute;
              width: 51px;
              height: 51px;
              margin: 6px;
              border: 6px solid #cef;
              border-radius: 50%;
              animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
              border-color: #cef transparent transparent transparent;
            }
            .lds-ring div:nth-child(1) {
              animation-delay: -0.45s;
            }
            .lds-ring div:nth-child(2) {
              animation-delay: -0.3s;
            }
            .lds-ring div:nth-child(3) {
              animation-delay: -0.15s;
            }
            @keyframes lds-ring {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
            `
    },
    timeSlots: {
        TimeSlots: `import React, { Component } from 'react';
        import Aux from '../hoc/Aux';
        import * as actionTypes from '../../store/actions';
        import { connect } from 'react-redux';
        import TimeSlot from '../TimeSlot';
        import Modal from '../UI/Modal/Modal';
        
        
        let timeSlotList = []
        
        
        class TimeSlots extends Component {
            state = {
                result: 0
            }
        
            componentWillMount() {
                this.props.populateTimeSlotData();
            }
        
            render() {
        
                let timeSlotItems = null;
                if (this.props.timeSlotData) {
                    timeSlotItems = Object.keys(this.props.timeSlotData).map(item => (
                        <div key={item}>
                            <TimeSlot details={item} timeSlotData={this.props.timeSlotData} itemClicked={this.props.timeSlotItemPressed}></TimeSlot>
                        </div>
                    ));
        
                }
                return (
                    <Aux>
                        <div className='container-fluid d-flex mx-auto justify-content-center m-10'>
                            <div className='row'>
                                <div className='col'>
                                    <div className='text-center'>
                                        <h1>Please select a time slot: </h1>
                                    </div>
        
                                    {timeSlotList}
                                    {timeSlotItems}
                                    <Modal onNameChange={this.props.onNameChange} timeSlotData={this.props.timeSlotData} selectedTime={this.props.selected} onPhoneChange={this.props.onPhoneChange}></Modal>
        
                                </div>
                            </div>
                        </div>
                    </Aux>
                );
            }
        }
        
        const mapStateToProps = state => {
            return {
                res: state.result,
                endTime: state.endTime,
                timeSlotData: state.timeSlots,
                selected: state.selectedTimeSlot
            }
        }
        
        const mapDispathToProps = dispatch => {
            return {
                populateTimeSlotData: () => dispatch({
                    type: actionTypes.POPULATE_INITIAL_DATA
                }),
                onSubPressed: (number) => dispatch({
                    type: actionTypes.SUB,
                    payload: number
                }),
                timeSlotItemPressed: (startTime) => dispatch(
                    {
                        type: actionTypes.TIME_SLOT_ITEM_PRESSED,
                        payload: startTime
                    }),
                onNameChange: (text) => dispatch(
                    {
                        type: actionTypes.ON_NAME_CHANGED,
                        payload: {
                            text: text
                        }
                    }),
                onPhoneChange: (text) => dispatch(
                    {
                        type: actionTypes.ON_PHONE_CHANGED,
                        payload: {
                            text: text,
                        }
                    })
            }
        }
        
        export default connect(mapStateToProps, mapDispathToProps)(TimeSlots);
        `,
        TimeSlot: `import styles from './TimeSlot.module.css'
        import Aux from './hoc/Aux';
        import React, { Component } from 'react';
        
        class TimeSlot extends Component {
        
            render() {
        
                let id = this.props.details;
                let hasAppointment = false;
                let reserved = <div> Available</div>;
        
                if (this.props.timeSlotData[id].reserved) {
                    reserved = <div> Reserved </div>;
                    hasAppointment = true;
                }
                return (
                    <Aux>
        
                        <div className="animated fallDown">
                            <li className={hasAppointment ? styles.Reserved : styles.Open}>
        
                                <div className='container d-flex'>
        
                                    <div className='row'>
                                        <div className='col'>
                                            Time slot from <strong>{this.props.details}:00 </strong>to <strong>{+this.props.details + 1}:00</strong>
                                            <br />
                                            <br />
                                            <h5>{reserved}</h5>
                                        </div>
                                    </div>
        
        
                                    <div className='col align-self-center'>
                                        <button
                                            onClick={() => this.props.itemClicked(this.props.details)}
                                            type="button" className="btn btn-primary float-right" data-toggle="modal" data-target="#timeSlotModal">
                                            Select
                                        </button>
                                    </div>
                                </div>
        
                            </li>
                        </div>
                    </Aux>
                );
            }
        }
        export default TimeSlot;`,
        TimeSlotCSS: `li {
            /* width: 100px; */
            height: 125px;
            width: 500px;
            border: 1px solid #ddd;
            box-shadow: 0 2px 3px #bbb;
            padding: 10px;
            margin: 15px auto;
            box-sizing: border-box;
            list-style: none;
        }
        
        .Reserved {
            background-color: lightcoral;
        }
        
        .Open {
        background-color: whitesmoke;
        }`,
        Modal: `import React, { Component } from 'react';
        import styles from './Modal.module.css';
        import Aux from '../../hoc/Aux';
        let selected = "";
        let phone = null;
        let name = null;
        let timeSlotInfo = null;
        class Modal extends Component {
        
            handleNameChange = (event) => {
                this.props.onNameChange(event.target.value);
            }
            handlePhoneChange = (event) => {
                this.props.onPhoneChange(event.target.value);
            }
        
        
            render() {
                if (this.props.selectedTime) {
                    selected = this.props.selectedTime;
                    let selectedStartTime = (Object.keys(selected)[0]) + '';
                    let endTime = +selectedStartTime + 1;
                    timeSlotInfo = selectedStartTime + ':00 to ' + endTime + ':00';
                    name = <input id="nameField"
                        onChange={this.handleNameChange}
                        onBlur={this.handleNameChange}
                        type='text' value={this.props.timeSlotData[selectedStartTime].person.name} />
                    phone = <input id="phoneField"
                        onChange={this.handlePhoneChange}
                        onBlur={this.handlePhoneChange}
                        type='phone' value={this.props.timeSlotData[selectedStartTime].person.phone} />
                }
                return (
                    <Aux>
                        <div className="modal fade" id="timeSlotModal" tabIndex="-1" role="dialog" aria-labelledby="timeSlotModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                                <div className="modal-content">
                                    <div className="modal-header text-center mx-auto ">
                                        <h4 className="modal-title mx-auto" id="timeSlotModalLabel">You've selected the time slot from <strong>{timeSlotInfo}</strong></h4>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body d-flex align-items-center flex-column bd-highlight mb-3">
                                        <div className='row'>
                                            <div className='col mx-auto text-center'>
                                                <h3 className='mb-4 mx-auto'>To reserve your apointment, please enter your contact information:</h3>
                                            </div>
                                        </div>
        
                                        <div className='row'>
                                            <div className='col'>
        
                                                <div className={styles.ModalInputFields}>
                                                    <label> Name:</label > {name}
                                                    <br />
                                                    <br />
                                                    <label>Phone:</label>  {phone}
                                                </div>
                                                <br />
                                            </div>
                                        </div>
        
                                    </div>
                                    <div className="modal-footer">
                                        <i>*If BOTH your name and phone are not entered, this time slot will not be marked as reserved.</i>
                                        <button type="button" className="btn btn-success" onClick={() => this.close()} data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Aux>
                );
            }
        
            close = () => {
                document.getElementById("phoneField").value = '';
                document.getElementById("nameField").value = '';
            }
        }
        
        
        export default Modal;`,
        Reducer: `import * as actionTypes from './actions';

        const initialState = {
            result: 5,
            startTime: 9,
            endTime: 17,
        }
        
        const reducer = (state = initialState, action) => {
            switch (action.type) {
                case actionTypes.POPULATE_INITIAL_DATA:
                    {
                        console.log('popInitialData')
                        let timeSlots = {};
                        let i = state.startTime
                        while (i < state.endTime) {
                            timeSlots = {
                                ...timeSlots,
                                [i]: {
                                    reserved: false,
                                    person: {
                                        phone: null,
                                        name: null
                                    }
                                }
                            }
                            i++;
                        }
                        console.log('ignore: ' + timeSlots)
        
                        return {
                            ...state,
                            timeSlots: timeSlots
                        }
                    }
        
                case actionTypes.ON_NAME_CHANGED:
                    // console.log(action.payload)
        
                    var reservedBoolean;
                    if (action.payload.text == "") {
                        reservedBoolean = false;
                        console.log('false')
                    }
                    else {reservedBoolean = true;}
        
        
        
                    var index = Object.keys(state.selectedTimeSlot)[0];
        
                    var timeSlots =
                    {
                        ...state.timeSlots
                    };
                    timeSlots[index].person = {
                        ...timeSlots[index].person,
                        name: action.payload.text,
                    }
                    timeSlots[index] = {
                        ...timeSlots[index],
                        reserved: reservedBoolean,
                    }
        
                    // newPhone = action.text;
                    return {
                        ...state,
                        timeSlots
                    };
        
                case actionTypes.ON_PHONE_CHANGED:
                    // console.log('PHONE');
                    console.log(state);
                    var reservedBoolean;
                    if (action.payload.text === "") {
                        reservedBoolean = false;
                    }
                    else {reservedBoolean = true;}
        
                    var index = Object.keys(state.selectedTimeSlot)[0];
        
                    var timeSlots =
                    {
                        ...state.timeSlots
                    };
        
                    timeSlots[index].person = {
                        ...timeSlots[index].person,
                        phone: action.payload.text,
        
                    }
                    timeSlots[index] = {
                        ...timeSlots[index],
                        reserved: reservedBoolean,
                    }
        
                    // newPhone = action.text;
                    return {
                        ...state,
                        timeSlots
                    }
                case actionTypes.TIME_SLOT_ITEM_PRESSED:
        
                    return {
                        ...state,
                        selectedTimeSlot: {
                            [action.payload]: state.timeSlots[action.payload]
                        }
                    };
            }
        
            return state;
        }
        
        export default reducer;`,
    },
    chatApp : {
        html: `<div class="chatContainer text-center">
        <div class="text-center">
          <div class="dropdown text-center ">
            <div class="chatIcon mt-2">
              <h5 class="">Chat <i class="far fa-comment fa-1x"></i> </h5>
            </div>
            <div class="dropdown-content">
              <div class="chatArea">
      
                <cdk-virtual-scroll-viewport #messageChatArea autosize id=chatScroll [itemSize]="20" minBufferPx="1200"
                  maxBufferPx="1200" class="">
                  <div *cdkVirtualFor="let message of messages | async; let i = index; trackBy: trackByIdx">
                    <!-- fadeInUpBig -->
                    <li [ngClass]="message.userId == userId ? 'usersMessage' : 'othersMessage'" class="animated">
                      <div class="container d-flex flex-column" style="">
                        <div *ngIf="message.userId == userId;else otherUser" class="row">
                          <div class="col align-content-start">
                            <span class="float-right">
                              <strong>You</strong> <i class="ml-2 mt-1 fas fa-user-circle fa-2x"></i>
      
                            </span>
      
                          </div>
      
                        </div>
      
                        <ng-template #otherUser>
                          <div class="row">
                            <i class="ml-1 mt-1 fas fa-user-astronaut fa-2x"></i>
                            <!-- <i class="fas fa-user-circle"></i> -->
                            <div class="col align-content-start">
                              <span class="float-left">
                                <strong>{{message.userId}}</strong>
                              </span>
                            </div>
                          </div>
                        </ng-template>
                        <div class="row " style="flex-wrap: nowrap">
                          <div class="col mb-2 mt-1 " style='width: 300px;
                            flex-wrap: nowrap; display: inline-block; text-align: left;'>
                            {{message.message}}
                          </div>
                        </div>
                        <div class="row">
      
                          <div class="col" style=''>
                            <i class="float-right"> {{message.date | date:'short'}}</i>
                          </div>
                        </div>
      
                      </div>
      
      
                    </li>
                    <!-- date: {{message.date | date:'short'}}, message: {{message.message}}, from: {{message.userId}} -->
                  </div>
                </cdk-virtual-scroll-viewport>
      
      
                <input #sendMessageInput id=sendMessageInput (keyup.enter)="sendMessage($event)" type="text" style="width: 70%; height: 30px;">
                Send<i class="fas fa-arrow-up"></i>
                <!-- Username: <input #sendMessageInput id=sendMessageInput [(ngModel)]="userId" type="text" style="width: 70%"> -->
              </div>
            </div>
          </div>
        </div>
      
      </div>`,
        css: `.chatIcon {
            display: flex;
            justify-content:center;
            align-content:center;
            flex-direction:column;
        }
        
        .chatContainer {
            background-color: #ddd;
                position: fixed;
                height: 40px;
                bottom: 0;
                right: 7.5%;
                width: 250px;
            
        }
        
        #messageChatArea {
            width: 300px;
        }
        
        .chatArea {
            width: 300px;
            height: 650px;
            background-color: #fff;
          }
        
        .dropdown-content{
            display: none;
            position: absolute;
            /* background-color: transparent; */
            /* min-width: 20px; */
            bottom: 0px;
            right: 3.75%;
             /* max-width: 20px; */
            /* box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); */
             /* padding: 12px 16px; */
            z-index: 100;
            box-shadow: 0 2px 7px #bbb;
            /* padding: 20px; */
            box-sizing: border-box;
          }
        
          .dropdown {
            position: relative;
            display: inline-block;
            z-index: 100;
          }
          
          .dropdown-item {
            z-index: 100;
          }
          
          .chatContainer:hover .dropdown-content {
            display: block;
          }
        
          #chatScroll {
                height: 610px;
                width: 100%;
          }
          input {
              margin: 1%;
          }
        
          li {
              margin: 2%;
              list-style: none;
          }
        
          .usersMessage {
              /* border: 2px solid green;
               */
               background-color: cornflowerblue;
               color: white;
               
          }
        
          .othersMessage {
              /* border: 2px dashed blue;
               */
               background-color: #ddd;
               color: black;
          }`,
        ts: `import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
        import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
        import { ChatMessage } from './chatMessage';
        import { AnonymousSubject } from 'rxjs/internal/Subject';
        import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
        import { Router } from '@angular/router';
        
        @Component({
          selector: 'chat',
          templateUrl: './chat.component.html',
          styleUrls: ['./chat.component.css'],
          changeDetection: ChangeDetectionStrategy.OnPush,
        
        })
        export class ChatComponent implements OnInit, AfterViewChecked {
          userId = JSON.parse(localStorage.getItem('auth')) ? JSON.parse(localStorage.getItem('auth')).email : 'Anonymous';
          items = Array.from({ length: 100000 }).map((_, i) => 'Item #$i');
          messages: any;
          messagesCollection: AngularFirestoreCollection<ChatMessage>;
          @ViewChild('sendMessageInput')
          sendMessageInput: ElementRef;
          router;
        
          @ViewChild('messageChatArea')
          messageChatArea: CdkVirtualScrollViewport;
        
          constructor(private db: AngularFirestore, router: Router) {
            this.router = router;
          }
        
          ngOnInit() {
        
            this.messagesCollection = this.db.collection('chatMessages', ref => ref.orderBy('date'));
            this.messages = this.messagesCollection.valueChanges();
            this.messageChatArea.setRenderedContentOffset(0, 'to-end');
            // this.messageChatArea.nativeElement.scrollToIndex(this.messages.length);
        
            try {
            } catch (e) {
              // IE Sucks
              console.log(e);
              // window.scrollTo(0, top);
            }
          }
        
          ngAfterViewChecked() {
            this.messageChatArea.scrollToOffset(10000);
          }
        
          trackByIdx(i) {
            return i;
          }
        
          sendMessage(event) {
            const date = new Date();
            const chatMessageToAdd: ChatMessage = new ChatMessage(event.target.value + '', date.toISOString(), this.userId);
            console.log('id: ' + this.userId);
            this.messagesCollection.add({ ...chatMessageToAdd });
            this.sendMessageInput.nativeElement.value = '';
            // this.messageChatArea.setRenderedContentOffset(0);
          }
        }
        `
    },
    backEndProjects: {
        accountHolderJDBC: {
            JDBCTemplate: `package com.chris;

            import java.util.List;
            import javax.sql.DataSource;
            import org.springframework.jdbc.core.JdbcTemplate;
            
            public class AccountHolderJDBCTemplate implements AccountHolderDAO {
                private DataSource dataSource;
                private JdbcTemplate jdbcTemplateObject;
            
                public void setDataSource(DataSource dataSource) {
                    this.dataSource = dataSource;
                    this.jdbcTemplateObject = new JdbcTemplate(dataSource);
                }
            
                public void create(String name, int age, String address, String city) {
                    String SQL = "insert into AccountHolder (id, name, age, address, city) values (seq_accountHolder.nextVal, ?, ?, ?, ?)";
                    jdbcTemplateObject.update(SQL, name, age, address, city);
                    System.out.println("Created ");
                    return;
                }
            
                public AccountHolder getAccountHolder(int id) {
                    String SQL = "select * from AccountHolder where id = ?";
                    AccountHolder AccountHolder = jdbcTemplateObject.queryForObject(SQL, new Object[] { id }, new AccountMapper());
            
                    return AccountHolder;
                }
                
                public List<AccountHolder> getAccountHoldersFromQuery(String sql) {
                    List<AccountHolder> AccountHolders = jdbcTemplateObject.query(sql, new AccountMapper());
            
                    return AccountHolders;
                }
                
                public List<AccountHolder> getAccountHolderWhereAgeOver(int age) {
                    String SQL = "select * from AccountHolder where age > ?";
                    List<AccountHolder> AccountHolders = jdbcTemplateObject.query(SQL, new AccountMapper(), age);
            
                    return AccountHolders;
                }
            
                public List<AccountHolder> listAccountHolders() {
                    String SQL = "select * from AccountHolder";
                    List<AccountHolder> AccountHolders = jdbcTemplateObject.query(SQL, new AccountMapper());
                    return AccountHolders;
                }
            
                public void delete(int id) {
                    String SQL = "delete from AccountHolder where id = ?";
                    jdbcTemplateObject.update(SQL, id);
                    System.out.println("Deleted Record with ID = " + id);
                    return;
                }
            
                public void update(int id, int age, String address, String city, String name) {
                    String SQL = "update AccountHolder set age = ?, address = ?, city = ?, name = ? where id = ?";
                    jdbcTemplateObject.update(SQL, age, address, city, name, id);
                    System.out.println("Updated Record with ID = " + id);
                    return;
                }
            
            }`
            ,
            AccountMapper:
                `package com.chris;
            import java.sql.*;
            import org.springframework.jdbc.core.*;
            
            public class AccountMapper implements RowMapper<AccountHolder>{
            
                public AccountHolder mapRow(ResultSet rs, int rowNum) throws SQLException {
            
                    AccountHolder ah = new AccountHolder();
                    ah.setId(rs.getInt("id"));
                    ah.setAge(rs.getInt("age"));
                    ah.setAddress(rs.getString("address"));
                    ah.setName(rs.getString("name"));
                    ah.setCity(rs.getString("city"));
                    
                    return ah;
                }
            
                
                
            }
            `
            ,
            main: `package com.chris;

    import java.util.List;
    
    import org.springframework.context.*;
    import org.springframework.context.support.ClassPathXmlApplicationContext;
    
    public class main {
    
        public static void main(String[] args) {
            ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
    
            AccountHolderJDBCTemplate accountHolderJDBCTemplate = (AccountHolderJDBCTemplate) context
                    .getBean("accountHolderJDBCTemplate");
    
            System.out.println("------Listing Multiple Records--------");
            List<AccountHolder> accountHolders = accountHolderJDBCTemplate.listAccountHolders();
    
            for (AccountHolder holder : accountHolders) {
                System.out.println(holder.toString());
            }
    
            // get all over 50
            for (AccountHolder accountHolder : accountHolderJDBCTemplate
                    .getAccountHoldersFromQuery("select * from account holders where age > 50")) {
                System.out.println(accountHolder.toString());
            }
    
            // specific city
            for (AccountHolder accountHolder : accountHolderJDBCTemplate
                    .getAccountHoldersFromQuery("select * from account holders where city like 'city1'")) {
                System.out.println(accountHolder.toString());
            }
            
            // f. Delete the record by Id
            accountHolderJDBCTemplate.delete(2);
    //		g. Update the Address and City of specified Account holder id
            AccountHolder uah = accountHolderJDBCTemplate.getAccountHolder(1);
            accountHolderJDBCTemplate.update(uah.getId(), uah.getAge(), "new ADDRESS", "NEW CITY", uah.getName());
            for (AccountHolder accountHolder : accountHolderJDBCTemplate
                    .getAccountHoldersFromQuery("select * from account holders where city like 'city1'")) {
                System.out.println(accountHolder.toString());
            }
    
    //		System.out.println(ah.toString());
        }
    
    }
    `
        },
        mortgageJDBC: {
            Controller: `package com.mortgage.controller;

            import java.util.List;
            
            import org.springframework.beans.factory.annotation.Autowired;
            import org.springframework.stereotype.Controller;
            import org.springframework.web.bind.annotation.GetMapping;
            import org.springframework.web.bind.annotation.PostMapping;
            import org.springframework.web.bind.annotation.RequestBody;
            import org.springframework.web.bind.annotation.ResponseBody;
            
            import com.mortgage.dao.*;
            import com.mortgage.model.*;
            
            @Controller
            public class MortgageController {
            
                @Autowired
                CustomerDao cd;
                
                @Autowired
                UserDao ud;
                
                @Autowired
                EmployeeDao ed;
                
                @Autowired
                LoanDao ld;
                
                //Customer Request Mappings
                
                @PostMapping("/register")
                @ResponseBody
                public int registerCustomer(@RequestBody Customer c)
                {
                    return cd.register(c);
                }
                
                @PostMapping("/deleteCustomer")
                @ResponseBody
                public int deleteCustomer(@RequestBody Customer c)
                {
                    return cd.delete(c);
                }
                
                @GetMapping("/getAllCustomers")
                @ResponseBody
                public List<Customer> getCustomers()
                {
                    return cd.getAllCustomers();
                }
                
                @GetMapping("/getCustBySsn")
                @ResponseBody
                public Customer getCustBySsn()
                {
                    return cd.getCustomerBySsn(234432345);
                }
                
                //Employee Request Mappings
                
                @GetMapping("/getAllEmployees")
                @ResponseBody
                public List<Employee> getEmployees()
                {
                    return ed.getAllEmployees();
                }
                
                @PostMapping("/createEmployee")
                @ResponseBody
                public int createEmployee(@RequestBody Employee e)
                {
                    return ed.createEmployee(e);
                }
                
                @PostMapping("/activeFalse")
                @ResponseBody
                public int setActiveFalse(@RequestBody Employee e)
                {
                    return ed.changeActiveFalse(e.getEid());
                }
                
                @PostMapping("/activeTrue")
                @ResponseBody
                public int setActiveTrue(@RequestBody Employee e)
                {
                    return ed.changeActiveTrue(e.getEid());
                }
                
                //User Request Mappings
                
                @PostMapping("/login")
                @ResponseBody
                public String login(@RequestBody User u)
                {
                    return ud.loginCheck(u);
                }
                
                //Loan Request Mappings
                @GetMapping("/getAllLoans")
                @ResponseBody
                public List<Loan> getAllLoans()
                {
                    return ld.getAllLoans();
                }
            }`,
            CustomerDAO: `package com.mortgage.dao;

            import java.sql.ResultSet;
            import java.sql.SQLException;
            import java.util.List;
            
            import org.springframework.beans.factory.annotation.Autowired;
            import org.springframework.jdbc.core.JdbcTemplate;
            import org.springframework.jdbc.core.RowMapper;
            import org.springframework.jdbc.support.rowset.SqlRowSet;
            import org.springframework.stereotype.Repository;
            
            import com.mortgage.model.Customer;
            
            @Repository
            public class CustomerDao {
                
                @Autowired
                JdbcTemplate jdbc;
                
                public CustomerDao()
                {
                    
                }
                
                public Customer getCustomerBySsn(int ssn)
                {
                    Customer c = null;
                    try {
                        SqlRowSet rs = jdbc.queryForRowSet("select * from mortgagecustomer where ssn = " + ssn);
                        c = new Customer();
                        rs.first();
                        c.setDob(rs.getString(1));
                        c.setEmail(rs.getString(2));
                        c.setFname(rs.getString(3));
                        c.setLname(rs.getString(4));
                        c.setPhone(rs.getString(5));
                        c.setSsn(rs.getInt(6));
                        c.setUsername(rs.getString(7));
                    }catch(Exception e)
                    {
                        c = null;
                    }
                    return c;
                }
                
                public List<Customer> getAllCustomers()
                {
                    List<Customer> cList;
                    try {
                        cList = jdbc.query("select * from mortgagecustomer", new RowMapper<Customer>() {
                            @Override
                            public Customer mapRow(ResultSet rs, int rowNum) throws SQLException {
                                Customer c = new Customer();
                                c.setDob(rs.getString(1));
                                c.setEmail(rs.getString(2));
                                c.setFname(rs.getString(3));
                                c.setLname(rs.getString(4));
                                c.setPhone(rs.getString(5));
                                c.setSsn(rs.getInt(6));
                                c.setUsername(rs.getString(7));
                                return c;
                            }
                        });
                    }catch(Exception e)
                    {
                        cList = null;
                    }
                    return cList;
                    
                }
                
                public int register(Customer c)
                {
                    int ret = 1;
                    try {
                        jdbc.execute("insert into mortgageuser values ( '" + c.getUsername() + "', '" + c.getPassword() + "', 'customer')");
                        jdbc.execute("insert into mortgagecustomer values ( '" + c.getDob() + "', '" + c.getEmail() + "', '" + 
                                    c.getFname() + "', '" + c.getLname() + "', '" + c.getPhone() + "', " + c.getSsn() + ", '" + c.getUsername() + "')");
                    }catch(Exception e)
                    {
                        ret = -1;
                    }
                    return ret;
                }
                
                public int delete(Customer c)
                {
                    int ret = 1;
                    try {
                        jdbc.execute("delete from mortgagecustomer where ssn = " + c.getSsn());
                        jdbc.execute("delete from mortgageuser where username = '" + c.getUsername() + "'");
                    }catch(Exception e)
                    {
                        ret = -1;
                    }
                    return ret;
                }
                
            }`,
            EmployeeDAO: `package com.mortgage.dao;

            import java.sql.Connection;
            import java.sql.PreparedStatement;
            import java.sql.ResultSet;
            import java.sql.SQLException;
            import java.util.List;
            
            import org.springframework.beans.factory.annotation.Autowired;
            import org.springframework.jdbc.core.JdbcTemplate;
            import org.springframework.jdbc.core.RowMapper;
            import org.springframework.stereotype.Repository;
            
            import com.mortgage.model.Customer;
            import com.mortgage.model.Employee;
            
            
            @Repository
            public class EmployeeDao {
            
                @Autowired
                JdbcTemplate jdbc;
                
                public EmployeeDao()
                {
                    
                }
                
                public List<Employee> getAllEmployees()
                {
                    List<Employee> eList;
                    try {
                        eList = jdbc.query("select * from mortgageemployee where role != 'admin'", new RowMapper<Employee>() {
                            @Override
                            public Employee mapRow(ResultSet rs, int rowNum) throws SQLException {
                                Employee e = new Employee();
                                e.setActive(rs.getBoolean(1));
                                e.setEid(rs.getInt(2));
                                e.setFname(rs.getString(3));
                                e.setLname(rs.getString(4));
                                e.setRole(rs.getString(5));
                                e.setUsername(rs.getString(6));
                                return e;
                            }
                        });
                    }catch(Exception e)
                    {
                        eList = null;
                    }
                    return eList;
                }
                
                public int changeActiveFalse(int eid)
                {
                    int ret = 1;
                    try {
                        jdbc.execute("update mortgageemployee set active = 0 where eid = " + eid);
                    }catch(Exception e)
                    {
                        ret = -1;
                    }
                    return ret;
                }
                
                public int changeActiveTrue(int eid)
                {
                    int ret = 1;
                    try {
                        jdbc.execute("update mortgageemployee set active = 1 where eid = " + eid);
                    }catch(Exception e)
                    {
                        ret = -1;
                    }
                    return ret;
                }
                
                public int createEmployee(Employee e)
                {
                    int ret = 1;
                    try {
                        jdbc.execute("insert into mortgageuser values ( '" + e.getUsername() + "', '" + e.getPassword() + "', 'employee')");
                        jdbc.execute("insert into mortgageemployee values (1, mortemp_seq.nextval, '" + e.getFname() + "', '" + e.getLname() + "', '" + e.getRole() + "', '" + e.getUsername() + "')");
                    }catch(Exception ex)
                    {
                        ret = -1;
                    }
                    return ret;
                }
                
                public Employee getEmployeeById(int eId) {
                    Employee employee = null;
                    try {
                        jdbc.query("select * from mortgageemployee where eId =" + eId, new RowMapper<Employee>() {
                        @Override
                        public Employee mapRow(ResultSet rs, int rowNum) throws SQLException {
                            Employee e = new Employee();
                            e.setActive(rs.getBoolean(1));
                            e.setEid(rs.getInt(2));
                            e.setFname(rs.getString(3));
                            e.setLname(rs.getString(4));
                            e.setRole(rs.getString(5));
                            e.setUsername(rs.getString(6));
                            return e;
                            }
                        });
                        }catch (Exception e) {
                            e.printStackTrace();
                        }
                        return employee;
                    }
                }
            `,
            LoanDAO: `package com.mortgage.dao;

            import java.sql.ResultSet;
            import java.sql.SQLException;
            import java.util.List;
            
            import org.springframework.beans.factory.annotation.Autowired;
            import org.springframework.jdbc.core.JdbcTemplate;
            import org.springframework.jdbc.core.RowMapper;
            import org.springframework.stereotype.Repository;
            
            import com.mortgage.model.Customer;
            import com.mortgage.model.Employee;
            import com.mortgage.model.Loan;
            
            @Repository
            public class LoanDao {
                
                @Autowired
                JdbcTemplate jdbc;
                
                @Autowired
                CustomerDao cd;
                
                public LoanDao()
                {
                    
                }
                
                public List<Loan> getAllLoans()
                {
                    List<Loan> lList;
                    try {
                        lList = jdbc.query("select * from mortgageloan", new RowMapper<Loan>() {
                            @Override
                            public Loan mapRow(ResultSet rs, int rowNum) throws SQLException {
                                Loan l = new Loan();
                                l.setLoanId(rs.getInt(1));
                                l.setApprovedAmount(rs.getFloat(2));
                                l.setAskedAmount(rs.getFloat(3));
                                l.setDownPayment(rs.getFloat(4));
                                l.setLocation(rs.getString(5));
                                l.setProofOfIncome(rs.getString(6));
                                l.setPropertyType(rs.getString(7));
                                l.setCust(cd.getCustomerBySsn(rs.getInt(8)));
                                
                                return l;
                            }
                        });
                    }catch(Exception e)
                    {
                        System.out.println(e.getMessage());
                        lList = null;
                    }
                    return lList;
                }
                public Loan getLoanById(int loanId) {
                    Loan loan = null;
                    try {
                        jdbc.query("select * from mortgageloan where loanId =" + loanId, new RowMapper<Loan>() {
                        @Override
                        public Loan mapRow(ResultSet rs, int rowNum) throws SQLException {
                            Loan l = new Loan();
                            l.setLoanId(rs.getInt(1));
                            l.setApprovedAmount(rs.getFloat(2));
                            l.setAskedAmount(rs.getFloat(3));
                            l.setDownPayment(rs.getFloat(4));
                            l.setLocation(rs.getString(5));
                            l.setProofOfIncome(rs.getString(6));
                            l.setPropertyType(rs.getString(7));
                            l.setCust(cd.getCustomerBySsn(rs.getInt(8)));
                            
                            return l;
                            }
                        });
                        }catch (Exception e) {
                            e.printStackTrace();
                        }
                    return loan;
                    }
            }
            `,
            ReportDAO: `package com.mortgage.dao;

            import java.sql.ResultSet;
            import java.sql.SQLException;
            import java.util.List;
            
            import org.springframework.beans.factory.annotation.Autowired;
            import org.springframework.jdbc.core.JdbcTemplate;
            import org.springframework.jdbc.core.RowMapper;
            import org.springframework.stereotype.Repository;
            
            import com.mortgage.model.*;
            
            @Repository
            public class ReportDao {
                @Autowired
                JdbcTemplate jdbc;
                
                @Autowired
                EmployeeDao ed = new EmployeeDao();
                
                @Autowired
                LoanDao ld = new LoanDao();
                
                public List<Report> getAllReports() {
                    List<Report> rList;
                    try {
                        rList = jdbc.query("select * from mortgagereport", new RowMapper<Report>() {
                            @Override
                            public Report mapRow(ResultSet rs, int rowNum) throws SQLException {
                                Report r = new Report();
                                Employee e = new Employee();
                                Loan l = new Loan();
                                e = ed.getEmployeeById(e.getEid());
                                l = ld.getLoanById(l.getLoanId());
                                r.setReportId(rs.getInt(1));
                                r.setReportData(rs.getString(2));
                                r.setE(e);
                                r.setL(l);
                                
                                return r;
                            }
                        });
                    }catch(Exception e)
                    {
                        System.out.println(e.getMessage());
                        rList = null;
                    }
                    return rList;
                }
                public List<Report> getReportById(int reportId, int eId, int loanId) {
                    List<Report> rList;
                    try {
                        rList = jdbc.query("select * from mortgagereport where reportId =" + reportId, new RowMapper<Report>() {
                            @Override
                            public Report mapRow(ResultSet rs, int rowNum) throws SQLException {
                                Report r = new Report();
                                Employee e = new Employee();
                                Loan l = new Loan();
                                e = ed.getEmployeeById(e.getEid());
                                l = ld.getLoanById(l.getLoanId());
                                r.setReportId(rs.getInt(1));
                                r.setReportData(rs.getString(2));
                                r.setE(e);
                                r.setL(l);
                                
                                return r;
                            }
                        });
                    }catch(Exception e)
                    {
                        System.out.println(e.getMessage());
                        rList = null;
                    }
                    return rList;
                }
            }
            `,
            UserDAO: `package com.mortgage.dao;

            import java.sql.ResultSet;
            import java.sql.SQLException;
            import java.util.List;
            
            import org.springframework.beans.factory.annotation.Autowired;
            import org.springframework.jdbc.core.JdbcTemplate;
            import org.springframework.jdbc.core.RowMapper;
            import org.springframework.stereotype.Repository;
            
            import com.mortgage.model.User;
            
            @Repository
            public class UserDao {
                
                @Autowired
                JdbcTemplate jdbc;
                
                public UserDao()
                {
                    
                }
                
                public String loginCheck(User u)
                {
                    String ret = "";
                    try {
                        List<User> uList = jdbc.query("select * from mortgageuser where username = '" + u.getUsername() + "' and password = '" + u.getPassword() + "'", new RowMapper<User>()
                        {
                            public User mapRow(ResultSet r, int numR) throws SQLException
                            {
                                User u = new User();
                                u.setUsername(r.getString(1));
                                u.setPassword(r.getString(2));
                                u.setType(r.getString(3));
                                return u;
                            }
                        });
                        
                        ret = uList.get(0).getType();
                    }catch(Exception e)
                    {
                        ret = "invalid";
                    }
                    return ret;
                }
            }`,

        },
        train: {
            trainDAO: `package com.chris;

            import java.util.*;
            import java.sql.*;
            
            public class TrainDAO {
            
                final String DRIVER_NAME = "oracle.jdbc.OracleDriver";
                final String DB_URL = "jdbc:oracle:thin:@localhost:1521:xe";
                final String USERNAME = "hr";
                final String PASSWORD = "hr";
            
                public Train findTrain(int x) {
            
                    // driver
                    try {
                        String sql = "Select * from trains where train_no = " + x;
                        Class.forName("oracle.jdbc.OracleDriver");
                        Connection conn = DriverManager.getConnection(DB_URL, USERNAME, PASSWORD);
            
                        Statement statement = conn.createStatement();
                        ResultSet result = statement.executeQuery(sql);
                        ResultSetMetaData rsmd = result.getMetaData();
            
                        result.next();
                        printDb(conn);
                        return new Train(Integer.parseInt(result.getString(1)), result.getString(2), result.getString(3),
                                result.getString(4), Integer.parseInt(result.getString(5)));
                    } catch (ClassNotFoundException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    } catch (SQLException e) {
                        // TODO Auto-generated catch block
                    }
            
                    return null;
                }
            
                public void printDb(Connection conn) throws SQLException {
                    Statement s = conn.createStatement();
                    ResultSet rs = s.executeQuery("select * from trains");
                    ResultSetMetaData rsmd = rs.getMetaData();
                    for (int i = 1; i <= rsmd.getColumnCount(); i++) {
                        System.out.printf("%20s", rsmd.getColumnName(i));
                    }
                    System.out.println();
                    for (int i = 0; i < rsmd.getColumnCount(); i++) {
                        System.out.print("--------------------");
                    }
                    System.out.println();
                    int counter = 0;
                    while (rs.next()) {
                        counter++;
            
                        for (int i = 1; i <= rsmd.getColumnCount(); i++) {
            //				System.out.println(rs.getString(3));
                            System.out.printf("%20s", rs.getString(i));
                        }
                        System.out.println();
            
                    }
                    if (counter == 0) {
                        System.out.println("No results found.");
                    }
                }
            
            }
            `,
            train: `package com.chris;

            public class Train {
                int trainNo;
                String trainName, source, destination;
                int ticketPrice;
            
                public Train(int trainNo, String trainName, String source, String destination, int ticketPrice) {
                    super();
                    this.trainNo = trainNo;
                    this.trainName = trainName;
                    this.source = source;
                    this.destination = destination;
                    this.ticketPrice = ticketPrice;
                }
            
                public int getTrainNo() {
                    return trainNo;
                }
            
                public void setTrainNo(int trainNo) {
                    this.trainNo = trainNo;
                }
            
                public String getTrainName() {
                    return trainName;
                }
            
                public void setTrainName(String trainName) {
                    this.trainName = trainName;
                }
            
                public String getSource() {
                    return source;
                }
            
                public void setSource(String source) {
                    this.source = source;
                }
            
                public String getDestination() {
                    return destination;
                }
            
                public void setDestination(String destination) {
                    this.destination = destination;
                }
            
                public double getTicketPrice() {
                    return ticketPrice;
                }
            
                public void setTicketPrice(int ticketPrice) {
                    this.ticketPrice = ticketPrice;
                }
            
            }
            `,
            ticket: `package com.chris;
            import java.io.*;
            import java.time.LocalDate;
            import java.util.*;
            
            public class Ticket {
            
                private static int counter = 100;
                public static final int ticketLineWidth = 81;
                private String pnr;
                private LocalDate travelDate;
                private Train train;
                private TreeMap<Passenger, Integer> passengers = new TreeMap<Passenger, Integer>(new Comparator<Passenger>() {
                    public int compare(Passenger o1, Passenger o2) {
            
                        if (o1.getName().compareTo(o2.getName()) > 0) {
                            return -1;
                        }
                        if (o1.getName().compareTo(o2.getName()) < 0) {
                            return 1;
                        }
                        return 0;
            
                    }
                });
                private int numOfPassengers = 0;
            
                public Ticket(LocalDate travelDate, Train train) {
                    counter++;
                    this.travelDate = travelDate;
                    this.train = train;
                    generatePNR();
                }
            
                private String generatePNR() {
                    String tempDay = travelDate.getDayOfMonth()+"";
                    String tempMonth = travelDate.getMonthValue() + "";
                    //add leading 0's if needed
                    if(tempDay.length()==1) {
                        tempDay = "0" + tempDay;
                    }
                    if(tempMonth.length()==1) {
                        tempMonth = "0" + tempMonth;
                    }
                    
                    pnr = "" + train.getSource().substring(0, 1) + train.getDestination().substring(0, 1) + "_"
                            + travelDate.getYear() + tempDay + tempMonth + "_" + counter;
            //				BM_20170121_100
                    return pnr;
                }
            
                private int calcPassengerFare(Passenger p) {
            //		o For age < = 12, fare is 50% of ticket price regardless of gender
                    if (p.getAge() <= 12) {
                        return (int) (train.getTicketPrice() * .5);
                    }
            //		o For age > = 60, fare is 60% of ticket price regardless of gender
                    else if (p.getAge() >= 60) {
                        return (int) (train.getTicketPrice() * .6);
                    }
            //		o For Females, 25% discount on the ticket price
                    else if (p.getGender() == 'F' || p.getGender() == 'f') {
                        return (int) (train.getTicketPrice() * .75);
                    } else
                        return (int) train.getTicketPrice();
                }
            
                public void addPassenger(String name, int age, char gender) {
                    numOfPassengers++;
                    Passenger p = new Passenger(name, age, gender);
                    passengers.put(p, (calcPassengerFare(p)));
                }
            
                private double calculateTotalTicketPrice() {
                    int total = 0;
            
                    for (Map.Entry<Passenger, Integer> i : passengers.entrySet()) {
            //			Passenger p = i.getKey();
                        total += i.getValue();
                    }
                    return total;
            
                }
            
            
                private StringBuilder generateTicket() {
                    StringBuilder sb = new StringBuilder();
                    sb.append(" --------------------------------------------------------------------------------");
                    sb.append(adjustWidth("\n<br> PRN: " + this.getPnr()));
                    sb.append(adjustWidth("\n<br> Train Number: " + this.getTrain().getTrainNo()));
                    sb.append(adjustWidth("\n<br> Train Name: " + this.getTrain().getTrainName()));
                    sb.append(adjustWidth("\n<br> From: " + this.getTrain().getSource()));
                    sb.append(adjustWidth("\n<br> To: " + this.getTrain().getDestination()));
                    sb.append(adjustWidth("\n<br> Travel Date: " + this.getTravelDate().toString()));
                    sb.append(adjustWidth("\n<br> "));
                    sb.append(adjustWidth("\n<br> "));
                    sb.append(adjustWidth("\n<br> Passengers: "));
            
                    // spacer is used for correctly spacing out and alining passenger info
                    int spacer = ticketLineWidth / 4;
                    String header = "\n|     Name";
                    for (int i = 0; i < spacer - 5; i++) {
                        header += (" ");
                    }
                    header += "Age";
                    for (int i = 0; i < spacer; i++) {
                        header += (" ");
                    }
                    header += "Gender";
                    for (int i = 0; i < spacer; i++) {
                        header += (" ");
                    }
                    header += "Fare";
            
                    sb.append(adjustWidth(header));
            
            //		for (int i = 0; i < plist.size(); i++) {
                    int counter = 0;
                    for (Map.Entry<Passenger, Integer> i : passengers.entrySet()) {
                        counter++;
                        Passenger p = i.getKey();
                        int price = i.getValue();
                        String passengerInfo = "\n| " + counter + ". " + p.getName();
            
            //			sb.append("\n| " + counter +  ".  " + p.getName() + "                " + p.getAge() + "                    " + p.getGender() + "                   " + price);
            //			sb.append("\n| " + counter + ".  " + p.getName() + "                " + p.getAge() + "                    "
            //					+ p.getGender() + "                   " + price);
            
                        for (int j = 0; j < spacer - (p.getName().length()); j++) {
                            passengerInfo += " ";
                        }
                        passengerInfo += p.getAge();
            
                        for (int j = 0; j < spacer + 4; j++) {
                            passengerInfo += " ";
            
                        }
                        passengerInfo += p.getGender();
            
                        for (int j = 0; j < spacer + 1; j++) {
                            passengerInfo += " ";
            
                        }
                        passengerInfo += "$" + price;
            
                        sb.append(adjustWidth(passengerInfo));
            
                    }
            
                    sb.append(adjustWidth("\n| "));
                    sb.append(adjustWidth("\n| Total Price: $" + this.calculateTotalTicketPrice()));
                    sb.append(adjustWidth("\n| "));
                    sb.append("\n --------------------------------------------------------------------------------");
            //		System.out.println("GENERATE TICKET");
            //		System.out.printf("%50s","-");
            
                    return sb;
            
                }
            
                private String adjustWidth(String x) {
                    int difference = ticketLineWidth - x.length();
                    for (int i = 0; i < difference; i++) {
                        x += " ";
                    }
            
                    return x + "|";
                }
            
                public void writeTicket() {
                    System.out.println("Writing ticket...");
                    // clears the screen
                    Thread t = new Thread();
                    t.start();
                    StringBuilder sb = generateTicket();
            
                    char[] ticketWriter = sb.toString().toCharArray();
                    System.out.println("\n\n\n\n\n");
                    try {
                        t.sleep(1000);
                    } catch (InterruptedException e1) {
                        // TODO Auto-generated catch block
                        e1.printStackTrace();
                    }
                    for (char c : ticketWriter) {
                        System.out.print(c);
            
                        try {
                            t.sleep(1);
                        } catch (InterruptedException e) {
                            // TODO Auto-generated catch block
                            e.printStackTrace();
                        }
                    }
            
                    // save ticket to file.
                    // mac os x
                    String filePath = "/Users/chris/Desktop/tickets";
                    String fileName = this.getPnr() + ".txt";
                    File file = new File(filePath, fileName);
                    try {
                        file.createNewFile();
                    } catch (IOException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
            
                    byte[] bytes = sb.toString().getBytes();
                    try {
                        FileOutputStream fos = new FileOutputStream(file);
                        fos.write(bytes);
                    } catch (IOException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
                }
            
                public static int getCounter() {
                    return counter;
                }
            
                public static void setCounter(int counter) {
                    Ticket.counter = counter;
                }
            
                public String getPnr() {
                    return pnr;
                }
            
                public void setPnr(String pnr) {
                    this.pnr = pnr;
                }
            
                public LocalDate getTravelDate() {
                    return travelDate;
                }
            
                public void setTravelDate(LocalDate travelDate) {
                    this.travelDate = travelDate;
                }
            
                public Train getTrain() {
                    return train;
                }
            
                public void setTrain(Train train) {
                    this.train = train;
                }
            
                public TreeMap<Passenger, Integer> getPassengers() {
                    return passengers;
                }
            
                public void setPassengers(TreeMap<Passenger, Integer> passengers) {
                    this.passengers = passengers;
                }
            
            
            
            
            
                public StringBuilder generateHTMLTicket() {
                    StringBuilder sb = new StringBuilder();
                    sb.append("\n PRN: " + this.getPnr());
                    sb.append("\n<br> Train Number: " + this.getTrain().getTrainNo());
                    sb.append("\n<br> Train Name: " + this.getTrain().getTrainName());
                    sb.append("\n<br> From: " + this.getTrain().getSource());
                    sb.append("\n<br> To: " + this.getTrain().getDestination());
                    sb.append("\n<br> Travel Date: " + this.getTravelDate().toString());
                    sb.append("\n<br> ");
                    sb.append("\n<br> Passenger Information: ");
                    // spacer is used for correctly spacing out and alining passenger info
                    String header = " <table id = 'passengerTable' > <tr> <th>Name</th><th>Age</th><th>Gender</th><th>Fare</th></tr>";
                    sb.append(header);
            //		for (int i = 0; i < plist.size(); i++) {
                    int counter = 0;
                    for (Map.Entry<Passenger, Integer> i : passengers.entrySet()) {
                        counter++;
                        Passenger p = i.getKey();
                        int price = i.getValue();
                        sb.append("<tr><td>" + p.getName() + "</td><td>" + p.getAge() + "</td><td>" + p.getGender() + "</td><td>" + price +"</td>");
                    }
                    sb.append("</table><br>Total Price: $" + this.calculateTotalTicketPrice());
            
                    return sb;
            
                }
            
            
            }
            
            //class PassengerNameSort implements Comparator<Passenger> {
            //
            //	@Override
            //	public int compare(Passenger o1, Passenger o2) {
            //		// TODO Auto-generated method stub
            //
            //
            //}
            `,
            passenger: `package com.chris;

            public class Passenger {
            String name;
            int age;
            char gender;
            public Passenger(String name, int age, char gender) {
                super();
                this.name = name;
                this.age = age;
                this.gender = gender;
            }
            public String getName() {
                return name;
            }
            public void setName(String name) {
                this.name = name;
            }
            public int getAge() {
                return age;
            }
            public void setAge(int age) {
                this.age = age;
            }
            public char getGender() {
                return gender;
            }
            public void setGender(char gender) {
                this.gender = gender;
            }
            
            
                
            }
            `,
            ticketServlet: `package com.chris;

            import java.io.IOException;
            import java.time.*;
            import javax.servlet.RequestDispatcher;
            import javax.servlet.ServletException;
            import javax.servlet.annotation.WebServlet;
            import javax.servlet.http.HttpServlet;
            import javax.servlet.http.HttpServletRequest;
            import javax.servlet.http.HttpServletResponse;
            
            /**
             * Servlet implementation class CreateTicketServlet
             */
            @WebServlet("/CreateTicketServlet")
            public class CreateTicketServlet extends HttpServlet {
                static Ticket ticket;
            
                private static final long serialVersionUID = 1L;
            
                /**
                 * @see HttpServlet#HttpServlet()
                 */
                public CreateTicketServlet() {
                    super();
                    // TODO Auto-generated constructor stub
                }
            
                /**
                 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
                 *      response)
                 */
            
                protected void doGet(HttpServletRequest request, HttpServletResponse response)
                        throws ServletException, IOException {
            //		response.getWriter().append("Served at: ").append(request.getContextPath());
                    int trainNum = Integer.parseInt(request.getParameter("trainNum"));
                    String date = request.getParameter("date");
                    int numOfPassengers = Integer.parseInt(request.getParameter("numOfPassengers"));
            
                    System.out.println("train num: "+ trainNum);
                    System.out.println("num of passengers: " + numOfPassengers);
                    TrainDAO trainFinder = new TrainDAO();
                    Train myTrain = trainFinder.findTrain(trainNum);
                    LocalDate newDate = createLocalDate(date);
                    System.out.println(newDate.toString());
                    System.out.println(myTrain.toString());
                    Ticket myTicket = new Ticket(newDate, myTrain);
            
            //		ticket = new Ticket(travelDate, train);
                    for (int i = 1; i <= numOfPassengers; i++) {
            //			String int char
                        String passName = request.getParameter("fname" + i) + " " + request.getParameter("lname" + i);
                        String age = request.getParameter("age" + i);
                        String gender = request.getParameter("gender" + i);
            System.out.println("age: " + age);
                        char genderVar;
            
                        if (gender.equalsIgnoreCase("male")) {
                            genderVar = 'm';
                        } else
                            genderVar = 'f';
            System.out.println(i + " added");
                        myTicket.addPassenger(passName, Integer.parseInt(age), genderVar);
            
                    }
                    request.setAttribute("myTicket", myTicket.generateHTMLTicket());
                    RequestDispatcher rd = request.getRequestDispatcher("showTicket.jsp");
                    rd.forward(request, response);
            
                }
            
                public LocalDate createLocalDate(String d) {
                    System.out.println("d: " + d);
                    int day = Integer.parseInt(d.substring(3, 5));
                    System.out.println("day: " + day);
            
                    int month = Integer.parseInt(d.substring(0, 2));
                    System.out.println("month: " + month);
            
                    int year = Integer.parseInt(d.substring(6, 10));
                    System.out.println("year: " + year);
            
            
                    LocalDate mydate = LocalDate.of(year, month, day);
                    
                    System.out.println(mydate.toString());
                    return mydate;
            
                }
            
                /**
                 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
                 *      response)
                 */
                protected void doPost(HttpServletRequest request, HttpServletResponse response)
                        throws ServletException, IOException {
                    // TODO Auto-generated method stub
                    doGet(request, response);
                }
            
            }
            `
        },
        hibernateMapping: {
            customer: `

            import javax.persistence.Entity;
            import javax.persistence.Id;
            import javax.persistence.JoinColumn;
            import javax.persistence.PrimaryKeyJoinColumn;
            import javax.persistence.Table;
            
            @Entity
            @Table(name="mortgagecustomer")
            @PrimaryKeyJoinColumn(name="username")
            public class Customer extends User {
                
                
                private int ssn;
                private String fname;
                private String lname;
                private String dob;
                private String phone;
                private String email;
                
                public Customer(String username, String password, int ssn, String fname, String lname, String dob, String phone,
                        String email) {
                    super(username, password, "customer");
                    this.ssn = ssn;
                    this.fname = fname;
                    this.lname = lname;
                    this.dob = dob;
                    this.phone = phone;
                    this.email = email;
                }
            
                public Customer(String username, String password) {
                    super(username, password, "customer");
                }
            
                public int getSsn() {
                    return ssn;
                }
            
                public void setSsn(int ssn) {
                    this.ssn = ssn;
                }
            
                public String getFname() {
                    return fname;
                }
            
                public void setFname(String fname) {
                    this.fname = fname;
                }
            
                public String getLname() {
                    return lname;
                }
            
                public void setLname(String lname) {
                    this.lname = lname;
                }
            
                public String getDob() {
                    return dob;
                }
            
                public void setDob(String dob) {
                    this.dob = dob;
                }
            
                public String getPhone() {
                    return phone;
                }
            
                public void setPhone(String phone) {
                    this.phone = phone;
                }
            
                public String getEmail() {
                    return email;
                }
            
                public void setEmail(String email) {
                    this.email = email;
                }
                
                
                
            }
            `,
            employee: `
            import java.util.List;
            
            import javax.persistence.CascadeType;
            import javax.persistence.Entity;
            import javax.persistence.Id;
            import javax.persistence.JoinColumn;
            import javax.persistence.JoinTable;
            import javax.persistence.OneToMany;
            import javax.persistence.OneToOne;
            import javax.persistence.PrimaryKeyJoinColumn;
            import javax.persistence.Table;
            
            @Entity
            @Table(name="mortgageemployee")
            @PrimaryKeyJoinColumn(name="username")
            public class Employee extends User {
                
                private int eid;
                private String role;
                private String fname;
                private String lname;
                
                @OneToMany(cascade=CascadeType.ALL)
                @JoinColumn(name = "eid")
                private List<Report> repList;
                
                private boolean active;
                
                public Employee(String username, String password, int eid, String role, String fname, String lname) {
                    super(username, password, "employee");
                    this.eid = eid;
                    this.role = role;
                    this.fname = fname;
                    this.lname = lname;
                    this.active= true;
                }
            
                public Employee(String username, String password) {
                    super(username, password, "employee");
                }
            
                public int getEid() {
                    return eid;
                }
            
                public void setEid(int eid) {
                    this.eid = eid;
                }
            
                public String getRole() {
                    return role;
                }
            
                public void setRole(String role) {
                    this.role = role;
                }
            
                public String getFname() {
                    return fname;
                }
            
                public void setFname(String fname) {
                    this.fname = fname;
                }
            
                public String getLname() {
                    return lname;
                }
            
                public void setLname(String lname) {
                    this.lname = lname;
                }
            
                public List<Report> getRepList() {
                    return repList;
                }
            
                public void setRepList(List<Report> repList) {
                    this.repList = repList;
                }
            
                public boolean isActive() {
                    return active;
                }
            
                public void setActive(boolean active) {
                    this.active = active;
                }
                
                
            }
            `,
            config: `<?xml version="1.0" encoding="UTF-8"?>
            <!DOCTYPE hibernate-configuration PUBLIC
                    "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
                    "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
            <hibernate-configuration>
                <session-factory>
                    <property name="hibernate.connection.driver_class">oracle.jdbc.driver.OracleDriver</property>
                    <property name="hibernate.connection.password">hr</property>
                    <property name="hibernate.connection.url">jdbc:oracle:thin:@localhost</property>
                    <property name="hibernate.connection.username">hr</property>
                    <property name="hibernate.dialect">org.hibernate.dialect.Oracle10gDialect</property>
                    <property name="hbm2ddl.auto">update</property>
                    <property name="show_sql">true</property>
                    
                    <mapping class="com.digi.model.User"/>
                    <mapping class="com.digi.model.Customer"/>
                    <mapping class="com.digi.model.Employee"/>
                    <mapping class="com.digi.model.Report"/>
                    <mapping class="com.digi.model.Loan"/>
                    
                </session-factory>
            </hibernate-configuration>
            `,
            loan :`

            import javax.persistence.*;
            
            @Entity
            @Table(name="mortgageloan")
            public class Loan {
                
                @Id
                @GeneratedValue(strategy=GenerationType.AUTO)
                private int loanId;
                
                @OneToOne
                @JoinColumn(name = "reportId", referencedColumnName = "reportId", nullable=true)
                private Report rep;
                
                @OneToOne
                @JoinColumn(name="ssn", referencedColumnName = "ssn")
                private Customer cust;
                
                private double askedAmount;
                private double approvedAmount;
                private double downPayment;
                
                private String location;
                private String propertyType;
                private String proofOfIncome;
                
                private String status;
                
                public Loan(Customer cust, double askedAmount, double downPayment,
                        String location, String propertyType, String proofOfIncome) {
                    super();
                    this.cust = cust;
                    this.askedAmount = askedAmount;
                    this.approvedAmount = 0.00;
                    this.downPayment = downPayment;
                    this.location = location;
                    this.propertyType = propertyType;
                    this.proofOfIncome = proofOfIncome;
                }
            
                public Loan() {
                    super();
                }
            
                public int getLoanId() {
                    return loanId;
                }
            
                public void setLoanId(int loanId) {
                    this.loanId = loanId;
                }
            
                public Customer getCust() {
                    return cust;
                }
            
                public void setCust(Customer cust) {
                    this.cust = cust;
                }
            
                public double getAskedAmount() {
                    return askedAmount;
                }
            
                public void setAskedAmount(double askedAmount) {
                    this.askedAmount = askedAmount;
                }
            
                public double getApprovedAmount() {
                    return approvedAmount;
                }
            
                public void setApprovedAmount(double approvedAmount) {
                    this.approvedAmount = approvedAmount;
                }
            
                public double getDownPayment() {
                    return downPayment;
                }
            
                public void setDownPayment(double downPayment) {
                    this.downPayment = downPayment;
                }
            
                public String getLocation() {
                    return location;
                }
            
                public void setLocation(String location) {
                    this.location = location;
                }
            
                public String getPropertyType() {
                    return propertyType;
                }
            
                public void setPropertyType(String propertyType) {
                    this.propertyType = propertyType;
                }
            
                public String getProofOfIncome() {
                    return proofOfIncome;
                }
            
                public void setProofOfIncome(String proofOfIncome) {
                    this.proofOfIncome = proofOfIncome;
                }
            
                public Report getRep() {
                    return rep;
                }
            
                public void setRep(Report rep) {
                    this.rep = rep;
                }
            
                public String getStatus() {
                    return status;
                }
            
                public void setStatus(String status) {
                    this.status = status;
                }
                
                
            }
            `,
            main: `
            import java.util.*;
            
            import javax.persistence.Query;
            
            import org.hibernate.Session;
            import org.hibernate.SessionFactory;
            import org.hibernate.Transaction;
            import org.hibernate.boot.Metadata;
            import org.hibernate.boot.MetadataSources;
            import org.hibernate.boot.registry.StandardServiceRegistry;
            import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
            
            public class Main {
            
                public static void main(String[] args) {
                    // TODO Auto-generated method stub
                    StandardServiceRegistry ssr = new StandardServiceRegistryBuilder().configure("hibernate.cfg.xml").build();
                    Metadata md = new MetadataSources(ssr).getMetadataBuilder().build();
                    SessionFactory sf = md.getSessionFactoryBuilder().build();
                    Session s = sf.openSession();
                    Transaction t = s.beginTransaction();
            
                    
                    
                    Customer c = new Customer("test", "test123", 234432345, "Tom", "Test", "05-05-1970", "555-555-5555", "ttest@gmail.com");
                    Employee e = new Employee("admin", "admin", 001, "admin", "Billy", "Boss");
                    Employee e1 = new Employee("will@gmail.com", "pass123", 002, "io", "Will", "Williams");
                    
                    s.persist(c);
                    s.persist(e);
                    s.persist(e1);
                    
                    Loan l = new Loan(c, 200000.00, 15000.00, "123 Road Way", "apartment", "Self-Employed");
                    
                    Report r = new Report(e, l, "This loan is approved");
                    
                    s.persist(l);
                    s.persist(r);
                    
                    t.commit();
                    
                    s.close();
                    sf.close();
                    
                }
            
            }
            `,
            report: `

            import javax.persistence.Entity;
            import javax.persistence.GeneratedValue;
            import javax.persistence.GenerationType;
            import javax.persistence.Id;
            import javax.persistence.JoinColumn;
            import javax.persistence.JoinTable;
            import javax.persistence.ManyToOne;
            import javax.persistence.OneToOne;
            import javax.persistence.Table;
            
            import org.hibernate.annotations.ForeignKey;
            import org.hibernate.annotations.ManyToAny;
            
            @Entity
            @Table(name="mortgagereport")
            public class Report {
                
                @Id
                @GeneratedValue(strategy=GenerationType.AUTO)
                private int reportId;
                
                private String reportData;
                
                @ManyToOne
                @JoinColumn(name="eid", referencedColumnName="eid")
                private Employee e;
                
                @OneToOne
                @JoinColumn(name="loanId", referencedColumnName="loanId")
                private Loan l;
            
                public Report(Employee e, Loan l, String reportData) {
                    super();
                    this.e = e;
                    this.l = l;
                    this.reportData = reportData;
                }
            
                public Report() {
                    super();
                }
            
                public int getReportId() {
                    return reportId;
                }
            
                public void setReportId(int reportId) {
                    this.reportId = reportId;
                }
                
                public String getReportData() {
                    return reportData;
                }
            
                public void setReportData(String reportData) {
                    this.reportData = reportData;
                }
            
                public Employee getE() {
                    return e;
                }
            
                public void setE(Employee e) {
                    this.e = e;
                }
            
                public Loan getL() {
                    return l;
                }
            
                public void setL(Loan l) {
                    this.l = l;
                }
                
                
                
            }
            `,
            user: `

            import javax.persistence.Entity;
            import javax.persistence.Id;
            import javax.persistence.Inheritance;
            import javax.persistence.InheritanceType;
            import javax.persistence.Table;
            
            @Entity
            @Table(name="mortgageuser")
            @Inheritance(strategy=InheritanceType.JOINED)
            public class User {
                
                @Id
                private String username = "Test";
                private String password;
                private String type;
                
                public User(String username, String password, String type) {
                    super();
                    this.username = username;
                    this.password = password;
                    this.type = type;
                }
            
                public User() {
                    super();
                }
            
                public String getType() {
                    return type;
                }
            
                public void setType(String type) {
                    this.type = type;
                }
            
                public String getUsername() {
                    return username;
                }
            
                public void setUsername(String username) {
                    this.username = username;
                }
            
                public String getPassword() {
                    return password;
                }
            
                public void setPassword(String password) {
                    this.password = password;
                }
                
                
            }
            `,

        },
        SpringMVCHealthCare: {
            drugController: `package com.chris.controller;

            import java.util.Collections;
            import java.util.List;
            
            import javax.servlet.http.HttpServletRequest;
            import javax.servlet.http.HttpServletResponse;
            
            import org.json.JSONObject;
            import org.springframework.beans.factory.BeanFactory;
            import org.springframework.beans.factory.xml.XmlBeanFactory;
            import org.springframework.core.io.ClassPathResource;
            import org.springframework.core.io.Resource;
            import org.springframework.http.MediaType;
            import org.springframework.stereotype.Controller;
            import org.springframework.web.bind.annotation.RequestMapping;
            import org.springframework.web.bind.annotation.ResponseBody;
            import org.springframework.web.servlet.ModelAndView;
            
            import com.chris.DAO.impl.DrugDAOImpl;
            import com.chris.model.Drug;
            import com.chris.service.impl.DrugServiceImpl;
            
            @Controller
            public class DrugController {
                @RequestMapping("/drugController.html")
                public ModelAndView addDrug(HttpServletRequest rq, HttpServletResponse rs) {
                    Resource s = new ClassPathResource("applicationContext.xml");
                    BeanFactory o = new XmlBeanFactory(s);
                    DrugServiceImpl dservice = new DrugServiceImpl();
                    dservice.setDAO((DrugDAOImpl) o.getBean("drugBean"));
            
                    String name = rq.getParameter("name");
                    String date = rq.getParameter("date");
                    int quantity = Integer.parseInt(rq.getParameter("quantity"));
                    Drug newDrug = new Drug();
            
                    newDrug.setName(name);
                    newDrug.setQuantity(quantity);
                    newDrug.setExpireDate(date);
            
                    dservice.save(newDrug);
            
                    JSONObject json = new JSONObject();
            //		return "msg";
                    return new ModelAndView("drugs", "drugsList", dservice.getDrugs());
            
                }
                
                
                @RequestMapping("/displayDrugs.html")
                public ModelAndView showAllDrugs() {
                    Resource s = new ClassPathResource("applicationContext.xml");
                    BeanFactory o = new XmlBeanFactory(s);
                    DrugServiceImpl dservice = new DrugServiceImpl();
                    dservice.setDAO((DrugDAOImpl) o.getBean("drugBean"));
                    List<Drug> list = dservice.getDrugs();
                    
                    String x = "";
                    int y = 0;
                    
                    x.charAt(0);
                    
            
                    return new ModelAndView("RESULTS/showDrugs", "drugsList", list);
            
                }
            
                @RequestMapping("/displaySortedDrugs.html")
                public ModelAndView showSortedDrugs(HttpServletRequest rq, HttpServletResponse rs) {
                    Resource s = new ClassPathResource("applicationContext.xml");
                    BeanFactory o = new XmlBeanFactory(s);
                    DrugServiceImpl dservice = new DrugServiceImpl();
                    dservice.setDAO((DrugDAOImpl) o.getBean("drugBean"));
                    List<Drug> list = dservice.getDrugs();
            
                    String sortParameter = rq.getParameter("sortParameter");
            
                    switch (sortParameter) {
                    case "name":
                        Collections.sort(list, (Drug d1, Drug d2) -> {
                            if (d1.getName().compareTo(d2.getName()) < 0)
                                return -1;
                            else
                                return 1;
                        });
                        break;
                    case "quantity":
                        Collections.sort(list, (Drug d1, Drug d2) -> {
                            if (d1.getQuantity() < d2.getQuantity())
                                return -1;
                            else
                                return 1;
                        });
                    case "expirationDate":
                        Collections.sort(list, (Drug d1, Drug d2) -> {
                            if (d1.getExpireDate().compareTo(d2.getExpireDate()) < 0)
                                return -1;
                            else
                                return 1;
                        });
                        break;
            
                    }
            
                    return new ModelAndView("drugs", "drugsList", list);
            
                }
                
                @RequestMapping("/drugsHome.html")
                public ModelAndView drugsHomeLoad() {
                    Resource s = new ClassPathResource("applicationContext.xml");
                    BeanFactory o = new XmlBeanFactory(s);
                    DrugServiceImpl dservice = new DrugServiceImpl();
                    dservice.setDAO((DrugDAOImpl) o.getBean("drugBean"));
                    List<Drug> list = dservice.getDrugs();
            
                    return new ModelAndView("drugs", "drugsList", list);
            
                }
            }
            `,
            patientController: `package com.chris.controller;

            import java.util.ArrayList;
            import java.util.Collections;
            import java.util.List;
            
            import javax.servlet.http.HttpServletRequest;
            import javax.servlet.http.HttpServletResponse;
            
            import org.json.JSONObject;
            import org.springframework.beans.factory.BeanFactory;
            import org.springframework.beans.factory.xml.XmlBeanFactory;
            import org.springframework.core.io.ClassPathResource;
            import org.springframework.core.io.Resource;
            import org.springframework.stereotype.Controller;
            import org.springframework.web.bind.annotation.RequestMapping;
            import org.springframework.web.servlet.ModelAndView;
            
            import com.chris.DAO.impl.DrugDAOImpl;
            import com.chris.DAO.impl.PatientDAOImpl;
            import com.chris.model.Drug;
            import com.chris.model.Patient;
            import com.chris.service.impl.DrugServiceImpl;
            import com.chris.service.impl.PatientServiceImpl;
            
            @Controller
            public class PatientController {
            
                @RequestMapping("/patientController.html")
                public ModelAndView addPatient(HttpServletRequest rq, HttpServletResponse rs) {
            
                    Resource s = new ClassPathResource("applicationContext.xml");
                    BeanFactory o = new XmlBeanFactory(s);
                    PatientServiceImpl pservice = new PatientServiceImpl();
                    pservice.setDAO((PatientDAOImpl) o.getBean("patientBean"));
            
                    String name = rq.getParameter("name");
                    String dob = rq.getParameter("dob");
                    String category = rq.getParameter("category");
                    String type = rq.getParameter("type");
                    String age = rq.getParameter("age");
                    String gender = rq.getParameter("gender");
                    String address = rq.getParameter("address");
                    String phone = rq.getParameter("phone");
            
                    Patient p = new Patient();
                    p.setName(name);
                    p.setDob(dob);
                    p.setCategory(category);
                    p.setType(type);
                    p.setAge(Integer.parseInt(age));
                    p.setGender(gender);
                    p.setAddress(address);
                    p.setPhone(phone);
                    pservice.save(p);
                    List<Patient> list = pservice.getPatients();
            
                    JSONObject json = new JSONObject();
            //		json.put("newUser", newUser);
            //		Collections.sort(list, (Patient p1, Patient p2) -> {return 0;});
                    Collections.sort(list, (Patient a1, Patient a2) -> {
                        if (a1.getId() < a2.getId())
                            return -1;
                        else
                            return 1;
                    });
            
                    return new ModelAndView("patients", "patientsList", list);
                }
            
                @RequestMapping("/displayPatients.html")
                public ModelAndView showPatients() {
                    Resource s = new ClassPathResource("applicationContext.xml");
                    BeanFactory o = new XmlBeanFactory(s);
                    PatientServiceImpl pservice = new PatientServiceImpl();
                    pservice.setDAO((PatientDAOImpl) o.getBean("patientBean"));
                    List<Patient> list = pservice.getPatients();
            
                    return new ModelAndView("RESULTS/showPatients", "patientsList", list);
            
                }
            
                @RequestMapping("/displaySortedPatients.html")
                public ModelAndView showSortedPatients(HttpServletRequest rq, HttpServletResponse rs) {
                    Resource s = new ClassPathResource("applicationContext.xml");
                    BeanFactory o = new XmlBeanFactory(s);
                    PatientServiceImpl pservice = new PatientServiceImpl();
                    pservice.setDAO((PatientDAOImpl) o.getBean("patientBean"));
                    List<Patient> list = pservice.getPatients();
            
                    String sortParemeter = rq.getParameter("sortParemeter");
            
                    switch (sortParemeter) {
                    case "id":
                        Collections.sort(list, (Patient a1, Patient a2) -> {
                            if (a1.getId() < a2.getId())
                                return -1;
                            else
                                return 1;
                        });
                        break;
                    case "age":
                        Collections.sort(list, (Patient a1, Patient a2) -> {
                            if (a1.getAge() < a2.getAge())
                                return -1;
                            else
                                return 1;
                        });
                        break;
                    case "name":
                        Collections.sort(list, (Patient a1, Patient a2) -> {
                            if (a1.getName().compareTo(a2.getName()) < 0)
                                return -1;
                            else
                                return 1;
                        });
                        break;
                    case "address":
                        Collections.sort(list, (Patient a1, Patient a2) -> {
                            if (a1.getAddress().compareTo(a2.getAddress()) < 0)
                                return -1;
                            else
                                return 1;
                        });
                        break;
                    case "category":
                        Collections.sort(list, (Patient a1, Patient a2) -> {
                            if (a1.getCategory().compareTo(a2.getCategory()) < 0)
                                return -1;
                            else
                                return 1;
                        });
                        break;
                    case "dob":
                        Collections.sort(list, (Patient a1, Patient a2) -> {
                            if (a1.getDob().compareTo(a2.getDob()) < 0)
                                return -1;
                            else
                                return 1;
                        });
                        break;
                    case "gender":
                        Collections.sort(list, (Patient a1, Patient a2) -> {
                            if (a1.getGender().compareTo(a2.getGender()) < 0)
                                return -1;
                            else
                                return 1;
                        });
                        break;
                    case "phone":
                        Collections.sort(list, (Patient a1, Patient a2) -> {
                            if (a1.getId() < a2.getId())
                                return -1;
                            else
                                return 1;
                        });
                        break;
                    case "type":
                        Collections.sort(list, (Patient a1, Patient a2) -> {
                            if (a1.getType().compareTo(a2.getType()) < 0)
                                return -1;
                            else
                                return 1;
                        });
                        break;
                    }
            
                    return new ModelAndView("patients", "patientsList", list);
            
                }
            
                @RequestMapping("/patientsHome.html")
                public ModelAndView patientsHomeLoad() {
                    Resource s = new ClassPathResource("applicationContext.xml");
                    BeanFactory o = new XmlBeanFactory(s);
                    PatientServiceImpl pservice = new PatientServiceImpl();
                    pservice.setDAO((PatientDAOImpl) o.getBean("patientBean"));
                    List<Patient> list = pservice.getPatients();
            
                    return new ModelAndView("patients", "patientsList", list);
            
                }
            
                @RequestMapping("/findPatientById.html")
                public ModelAndView findpatientById(HttpServletRequest rq, HttpServletResponse rs) {
                    Resource s = new ClassPathResource("applicationContext.xml");
                    BeanFactory o = new XmlBeanFactory(s);
                    PatientServiceImpl pservice = new PatientServiceImpl();
                    pservice.setDAO((PatientDAOImpl) o.getBean("patientBean"));
                    Patient p = pservice.get(Integer.parseInt(rq.getParameter("id")));
            
                    DrugServiceImpl dservice = new DrugServiceImpl();
                    dservice.setDAO((DrugDAOImpl) o.getBean("drugBean"));
                    List<Drug> totalDrugList = dservice.getDrugs();
                    rq.setAttribute("drugsList", totalDrugList);
            
            //		
            //		
                    rq.setAttribute("patientsDrugsList", p.getDrugs());
                    
            
                    return new ModelAndView("RESULTS/showPatientRecord", "searchedPatient", p);
            
                }
            
            }
            `,
            DrugPatientDAOs: `package com.chris.DAO;

            import java.util.*;
            
            import org.springframework.orm.hibernate3.HibernateTemplate;
            
            import com.chris.model.Drug;
            
            public interface DrugDAO {
            
                public void setHt(HibernateTemplate ht);
                
                public void save(Drug d);
                public void update(Drug d);
                public void delete(Drug d);
                public Drug get(String name);
                public List<Drug> getDrugs();
                
            
            }


            public interface PatientDAO {

                public void setHt(HibernateTemplate ht);
                
                public void save(Patient p);
                public void update(Patient p);
                public void delete(Patient p);
                public Patient get(int id);
                public List<Patient> getPatients();
                
            
            }
            
            `,

            DrugDAOimpl: `package com.chris.DAO.impl;

            import java.util.List;
            
            import org.springframework.orm.hibernate3.HibernateTemplate;
            import org.springframework.stereotype.Repository;
            
            import com.chris.DAO.DrugDAO;
            import com.chris.model.Drug;
            
            @Repository
            public class DrugDAOImpl implements DrugDAO {
                HibernateTemplate ht;
            
                public void setHt(HibernateTemplate ht) {
                    this.ht = ht;
                }
            
                public void save(Drug d) {
                    ht.save(d);
                }
            
                public void update(Drug d) {
                    ht.update(d);
                }
            
                public void delete(Drug d) {
                    ht.delete(d);
                }
            
                public Drug get(String name) {
                    return ht.get(Drug.class, name);
                }
            
                public List<Drug> getDrugs() {
                    return ht.loadAll(Drug.class);
                }
            
            }
            `,

            PatientDAOImpl: `package com.chris.DAO.impl;

            import java.util.List;
            
            import org.springframework.orm.hibernate3.HibernateTemplate;
            
            import com.chris.DAO.PatientDAO;
            import com.chris.model.Patient;
            
            public class PatientDAOImpl implements PatientDAO {
                HibernateTemplate ht;
            
                public void setHt(HibernateTemplate ht) {
                    this.ht = ht;
                }
            
                public void save(Patient p) {
                    ht.save(p);
                }
            
                public void update(Patient p) {
                    ht.update(p);
                }
            
                public void delete(Patient p) {
                    ht.delete(p);
                }
            
                public Patient get(int id) {
                    return ht.get(Patient.class, id);
                }
            
                public List<Patient> getPatients() {
                    return ht.loadAll(Patient.class);
                }
                
            
            }
            `,
            drugModel: `package com.chris.model;

            import javax.persistence.*;
            import org.springframework.beans.factory.annotation.Autowired;
            import org.springframework.beans.factory.annotation.Qualifier;
            import org.springframework.stereotype.Component;
            //@Component
            //@Qualifier("drugBean")
            @Entity
            @Table(name="drugs")
            public class Drug<myDrug> {
                @Id
                private String name;
                private int quantityInWarehouse;
                private int quantityInStore;
                private String expireDate;
            //	@Autowired
                public Drug() {
                    
                }
            
                public String getName() {
                    return name;
                }
            
                public void setName(String name) {
                    this.name = name;
                }
            
            
                public int getQuantityInWarehouse() {
                    return quantityInWarehouse;
                }
            
                public void setQuantityInWarehouse(int quantityInWarehouse) {
                    this.quantityInWarehouse = quantityInWarehouse;
                }
            
                public int getQuantityInStore() {
                    return quantityInStore;
                }
            
                public void setQuantityInStore(int quantityInStore) {
                    this.quantityInStore = quantityInStore;
                }
            
                public String getExpireDate() {
                    return expireDate;
                }
            
                public void setExpireDate(String expireDate) {
                    this.expireDate = expireDate;
                }
            
            }
            `,
            PatientModel: `package com.chris.model;

            import java.util.List;
            
            import javax.persistence.*;
            
            import org.springframework.beans.factory.annotation.Autowired;
            import org.springframework.stereotype.Component;
            
            //@Component
            @Entity
            @Table(name = "patients")
            public class Patient {
            
                @Id
                @GeneratedValue(strategy = GenerationType.AUTO)
                private int id;
                // type = student, employee, beneficiary
                private String name, dob, category, type, gender, address, phone;
                private int age;
            
                @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
                @JoinColumn(name = "drug_id")
                List<Drug> drugs;
            
                public int getId() {
                    return id;
                }
            
                public void setId(int id) {
                    this.id = id;
                }
            
                public String getGender() {
                    return gender;
                }
            
                public void setGender(String gender) {
                    this.gender = gender;
                }
            
                public String getAddress() {
                    return address;
                }
            
                public void setAddress(String address) {
                    this.address = address;
                }
            
                public String getPhone() {
                    return phone;
                }
            
                public void setPhone(String phone) {
                    this.phone = phone;
                }
            
                public String getName() {
                    return name;
                }
            
                public void setName(String name) {
                    this.name = name;
                }
            
                public String getDob() {
                    return dob;
                }
            
                public void setDob(String dob) {
                    this.dob = dob;
                }
            
                public String getCategory() {
                    return category;
                }
            
                public void setCategory(String category) {
                    this.category = category;
                }
            
                public int getAge() {
                    return age;
                }
            
                public void setAge(int age) {
                    this.age = age;
                }
            
                public String getType() {
                    return type;
                }
            
                public void setType(String type) {
                    this.type = type;
                }
            
                
                public List<Drug> getDrugs() {
                    return drugs;
                }
            //	@Autowired
                public void setDrugs(List<Drug> drugs) {
                    this.drugs = drugs;
                }
            
            }`,
            DrugPatientServiceImpl:    `package com.chris.service.impl;

            import java.util.List;
            
            import com.chris.DAO.impl.DrugDAOImpl;
            import com.chris.model.Drug;
            import com.chris.service.DrugService;
            
            public class DrugServiceImpl implements DrugService {
                DrugDAOImpl dao;
            
                public void setDAO(DrugDAOImpl dao) {
                    this.dao = dao;
                }
            
                public void save(Drug d) {
                    dao.save(d);
                }
            
                public void update(Drug d) {
                    dao.update(d);
                }
            
                public void delete(Drug d) {
                    dao.delete(d);
                }
            
                public Drug get(String name) {
                    return dao.get(name);
                }
            
                public List<Drug> getDrugs() {
                    // TODO Auto-generated method stub
                    return dao.getDrugs();
                }
            
            }
            
            
            package com.chris.service.impl;

import java.util.List;

import com.chris.DAO.impl.PatientDAOImpl;
import com.chris.model.Patient;
import com.chris.service.PatientService;

public class PatientServiceImpl implements PatientService {

	PatientDAOImpl dao;

	public void setDAO(PatientDAOImpl dao) {
		this.dao = dao;
	}

	public void save(Patient p) {
		dao.save(p);
	}

	public void update(Patient p) {
		dao.update(p);
	}

	public void delete(Patient p) {
		dao.delete(p);
	}

	public Patient get(int id) {
		return dao.get(id);
	}

	public List<Patient> getPatients() {
		// TODO Auto-generated method stub
		return dao.getPatients();
	}

}

            
            
            `
        }
    }
}
