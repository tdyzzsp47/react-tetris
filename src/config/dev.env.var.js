const TEMPLATE_FIELD = [
    [-8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -8],
    [-8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -8],
    [-8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -8],
    [-8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -8],
    [-8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -8],
    [-8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -8],
    [-8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -8],
    [-8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -8],
    [-8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -8],
    [-8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -8],
    [-8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -8],
    [-8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -8],
    [-8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -8],
    [-8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -8],
    [-8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -8],
    [-8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -8],
    [-8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -8],
    [-8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -8],
    [-8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -8],
    [-8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -8],
    [-8, -8, -8, -8, -8, -8, -8, -8, -8, -8, -8, -8],
]

const MINO = {
    I: {
      id: 1, 
      shape:[
        [[-1, -1], [0, -1], [1, -1], [2, -1]],
        [[0, -1], [0, 0], [0, 1], [0, 2]],
        [[-1, -1], [0, -1], [1, -1], [2, -1]],
        [[0, -1], [0, 0], [0, 1], [0, 2]],
      ],
    },
    O: {
      id: 2,
      shape: [
        [[0, 0], [0, -1], [1, 0], [1, -1]],
        [[0, 0], [0, -1], [1, 0], [1, -1]],
        [[0, 0], [0, -1], [1, 0], [1, -1]],
        [[0, 0], [0, -1], [1, 0], [1, -1]],
      ]
    },
    S: {
      id: 3,
      shape: [
        [[-1, 0], [0, 0], [0, -1], [1, -1]],
        [[0, 0], [0, -1], [1, 0], [1, 1]],
        [[-1, 0], [0, 0], [0, -1], [1, -1]],
        [[0, 0], [0, -1], [1, 0], [1, 1]]
      ]
    },
    Z: {
      id: 4,
      shape: [
        [[-1, -1], [0, -1], [0, 0], [1, 0]],
        [[0, 0], [0, 1], [1, 0], [1, -1]],
        [[-1, -1], [0, -1], [0, 0], [1, 0]],
        [[0, 0], [0, 1], [1, 0], [1, -1]],
      ]
    },
    J: {
      id: 5,
      shape: [
        [[-1, -1], [-1, 0], [0, 0], [1, 0]],
        [[1, -1], [0, 1], [0, 0], [0, -1]],
        [[-1, 0], [0, 0], [1, 0], [1, 1]],
        [[-1, 1], [0, 1], [0, 0], [0, -1]]
      ]
    },
    L: {
      id: 6,
      shape: [
        [[-1, 0], [0, 0], [1, 0], [1, -1]],
        [[0, -1], [0, 0], [0, 1], [1, 1]],
        [[-1, 0], [0, 0], [1, 0], [-1, 1]],
        [[0, -1], [0, 0], [0, 1], [-1, -1]]
      ]
    },
    T: {
      id: 7,
      shape: [
        [[0, 0], [-1, 0], [0, -1], [1, 0]],
        [[0, 0], [0, 1], [0, -1], [1, 0]],
        [[0, 0], [0, 1], [-1, 0], [1, 0]],
        [[0, 0], [0, 1], [-1, 0], [0, -1]]
      ]
    }
}

const GENERATE_MINO_POS = [5, 1]  // ミノを生成する座標

export {
    TEMPLATE_FIELD,
    MINO,
    GENERATE_MINO_POS
}