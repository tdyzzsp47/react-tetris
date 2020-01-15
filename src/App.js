import React, { Component } from 'react'
// import './App.css'

import {TEMPLATE_FIELD, MINO, GENERATE_MINO_POS} from './config/dev.env.var'

import Field from './components/Field'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      template_field: TEMPLATE_FIELD,
      field: TEMPLATE_FIELD,
      mino: MINO,
      generateMinoPos: GENERATE_MINO_POS, 
      minoCoordinate: GENERATE_MINO_POS,
      currentMino: null,
      minoIdx: 0,
      angle: 0,
      end_flag: false,
      delete_lines: 0,
    }

    window.onkeydown = (e) => {
      if (e.keyCode === 37) {
        this.moveLeft();
      } else if (e.keyCode === 32) {
        this.drop();
      } else if (e.keyCode === 39) {
        this.moveRight();
      } else if (e.keyCode === 40) {
        this.fall();
      } else if (e.keyCode === 38) {
        this.rotate();
      } else {
        // console.log(e.keyCode)
      }
    }
  }

  componentDidMount() {
    this.gameStart()
  }

  gameStart = () => {
    this.createNewMino()
    setInterval(this.mainLoop, 1000);
  }

  mainLoop = () => {
    // this.cleanField()
    this.fall()
    // this.createNewMino()
  }

  checkDeleteLine = (field) => {
    field.reverse()
    let delete_line_count = 0
    let new_field = []
    for (let row of field) {
      let flag = 0
      for (let val of row) {
        if (val >= 0) {flag = 1}
      }
      if (flag) {
        new_field.push(row)
      } else {
        delete_line_count += 1
      }
    }
    for (let i = 0; i < delete_line_count-1; i++) {
      new_field.push([-8,0,0,0,0,0,0,0,0,0,0,-8])
    }
    new_field.reverse()
    new_field.push([-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8])
    const delete_lines = this.state.delete_lines
    this.setState({delete_lines: delete_lines + delete_line_count-1})
    return new_field
  }

  isCollision = (direction) => {
    let field = this.state.field
    let x = this.state.minoCoordinate[0]
    let y = this.state.minoCoordinate[1]
    let mino = this.state.mino[this.state.currentMino]
    let shape = mino.shape[this.state.angle]
    switch (direction) {
      case 'down':
        for (let coordinate of shape) {
          if (field[y+coordinate[1]+1][x+coordinate[0]] < 0) {
            return true
          }
        }
        return false
      case 'left':
        if (x <= 1) { return true }
        for (let coordinate of shape) {
          if (field[y+coordinate[1]][x+coordinate[0]-1] < 0) {
            return true
          }
        }
        return false
      case 'right':
          if (x >= 10) { return true }
          for (let coordinate of shape) {
            if (field[y+coordinate[1]][x+coordinate[0]+1] < 0) {
              return true
            }
          }
          return false
      case 'rotate':
        let angle = (this.state.angle + 1) % 4
        let shape_ = mino.shape[angle]
        for (let coordinate of shape_) {
          if (field[y+coordinate[1]][x+coordinate[0]] < 0) {
            return true
          }
        }
        return false
      default:
        break
    }
  }

  fall = () => {
    if (!this.isCollision('down')) {
      let field = this.generateField()
      let x = this.state.minoCoordinate[0]
      let y = this.state.minoCoordinate[1] + 1
      let mino = this.state.mino[this.state.currentMino]
      let shape = mino.shape[this.state.angle]
      for (let coordinate of shape) {
        field[y+coordinate[1]][x+coordinate[0]] = mino.id
      }
      this.setState({
        field: field,
        minoCoordinate: [x,y]      
      })
    } else {
      let field = this.generateField()
      let x = this.state.minoCoordinate[0]
      let y = this.state.minoCoordinate[1]
      let mino = this.state.mino[this.state.currentMino]
      let shape = mino.shape[this.state.angle]
      for (let coordinate of shape) {
        field[y+coordinate[1]][x+coordinate[0]] = 0 - mino.id
      }
      field = this.checkDeleteLine(field)
      const deafultCoordinate = this.state.generateMinoPos
      this.setState({
        template_field: field,
        minoCoordinate: deafultCoordinate,
        angle: 0
      })
      this.createNewMino()
    }
  }

  moveLeft = () => {
    if (!this.isCollision('left')) {
      let field = this.generateField()
      let x = this.state.minoCoordinate[0] - 1
      let y = this.state.minoCoordinate[1]
      let mino = this.state.mino[this.state.currentMino]
      let shape = mino.shape[this.state.angle]
      for (let coordinate of shape) {
        field[y+coordinate[1]][x+coordinate[0]] = mino.id
      }
      this.setState({
        field: field,
        minoCoordinate: [x,y]      
      })
    }
  }

  moveRight = () => {
    if (!this.isCollision('right')) {
      let field = this.generateField()
      let x = this.state.minoCoordinate[0] + 1
      let y = this.state.minoCoordinate[1]
      let mino = this.state.mino[this.state.currentMino]
      let shape = mino.shape[this.state.angle]
      for (let coordinate of shape) {
        field[y+coordinate[1]][x+coordinate[0]] = mino.id
      }
      this.setState({
        field: field,
        minoCoordinate: [x,y]      
      })
    }
  }

  drop = () => {

    let field = this.generateField()
    let x = this.state.minoCoordinate[0]
    let y = this.state.minoCoordinate[1]
    let mino = this.state.mino[this.state.currentMino]
    let shape = mino.shape[this.state.angle]

    for (let i = 0; i < 20; i++) {
      let flag = 0
      y += 1
      for (let coordinate of shape) {
        if (field[y+coordinate[1]][x+coordinate[0]] < 0) {
          flag = 1
        }
      }
      if (flag) {
        y -= 1
        break
      }
    }
    for (let coordinate of shape) {
      field[y+coordinate[1]][x+coordinate[0]] = 0 - mino.id
    }
    field = this.checkDeleteLine(field)
    const deafultCoordinate = this.state.generateMinoPos
    this.setState({
      template_field: field,
      minoCoordinate: deafultCoordinate,
      angle: 0
    })
    this.createNewMino()
  }

  rotate = () => {
    if (!this.isCollision('rotate')) {
      let field = this.generateField()
      let x = this.state.minoCoordinate[0]
      let y = this.state.minoCoordinate[1]
      let angle = (this.state.angle + 1) % 4
      let mino = this.state.mino[this.state.currentMino]
      let shape = mino.shape[angle]
      for (let coordinate of shape) {
        field[y+coordinate[1]][x+coordinate[0]] = mino.id
      }
      this.setState({
        field: field,
        angle: angle
      })
    }
  }


  createNewMino = () => {
    let mino_queue = ['I','O','S','Z','J','L','T']
    const idx = this.state.minoIdx
    const mino = this.state.mino[mino_queue[idx]]
    let field = this.generateField()
    
    mino.shape[0].forEach((coordinate, index) => {
      let x = this.state.generateMinoPos[0] + coordinate[0]
      let y = this.state.generateMinoPos[1] + coordinate[1]
      
      if (field[y][x] < 0) {
        this.setState({end_flag: true})
      }
      field[y][x] = mino.id
    })
    if (idx >= 6) {
      this.setState({
        currentMino: mino_queue[idx],
        field: field,
        minoIdx: 0
      })
    } else {
      this.setState({
        currentMino: mino_queue[idx],
        field: field,
        minoIdx: idx + 1
      })
    }
  }

  generateField = () => {
    let field = []
    for (var j = 0; j <= 20; j++) {
      let row = []
      for (var i = 0; i <= 11; i++) {
        row.push(this.state.template_field[j][i])
      }
      field.push(row)
    }
    return field
  }

  cleanField = () => {
    let field = this.state.field
    for (var j = 0; j < 20; j++) {
      for (var i = 1; i <= 10; i++) {
        field[j][i] = 0
      }
    }
    this.setState({field: field})
  }

  renderScreen = () => {
    if (this.state.end_flag) {
      return (
        <div>
          <div>Game Over（再プレイにはページを更新してください）</div>
        </div>
      )
    } else {
      return <Field field={this.state.field}/>
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderScreen()}
        <div>消した行数：{this.state.delete_lines}</div>
      </div>
    )
  }
}

export default App
